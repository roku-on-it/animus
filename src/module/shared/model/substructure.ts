import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  EntityNotFoundError,
  TypeORMError,
  FindConditions,
  FindOneOptions,
  ObjectID,
  ObjectType as ObjectType$,
  PrimaryGeneratedColumn,
  SaveOptions,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { plainToClassFromExist } from 'class-transformer';
import { UpdateModel } from 'src/module/shared/input/update-model';
import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { GraphQLTimestamp } from '@nestjs/graphql/dist/scalars/timestamp.scalar';
import { snakeToPascal } from '../helper/snake-to-pascal';

@ObjectType()
export class Substructure extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => GraphQLTimestamp)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => GraphQLTimestamp)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => GraphQLTimestamp, { nullable: true })
  @DeleteDateColumn()
  deletedAt: Date;

  static findOneOrFail<T extends BaseEntity>(
    this: ObjectType$<T>,
    id?: string | number | Date | ObjectID,
    options?: FindOneOptions<T>,
  ): Promise<T>;

  /**
   * Finds first entity that matches given options.
   */
  static findOneOrFail<T extends BaseEntity>(
    this: ObjectType$<T>,
    options?: FindOneOptions<T>,
  ): Promise<T>;

  /**
   * Finds first entity that matches given conditions.
   */
  static findOneOrFail<T extends BaseEntity>(
    this: ObjectType$<T>,
    conditions?: FindConditions<T>,
    options?: FindOneOptions<T>,
  ): Promise<T>;

  static findOneOrFail(...args) {
    if (args[0] instanceof Substructure) {
      args[0] = args[0].id;
    }

    return super.findOneOrFail(...args).catch((error) => {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(this.name + ' not found');
      }

      throw error;
    });
  }

  static async findOneAndUpdate<T extends UpdateModel, U extends BaseEntity>({
    id,
    ...payload
  }: T) {
    const entity = await this.findOneOrFail(id, {
      loadRelationIds: {
        disableMixedMap: true,
      },
    });

    await plainToClassFromExist(entity, payload).save();

    return entity as unknown as U;
  }

  save(options?: SaveOptions): Promise<this> {
    return super.save(options).catch((error) => {
      switch (error.code) {
        case '23505':
          throw new ConflictException();
        case '23503':
          throw new NotFoundException(
            snakeToPascal(error.detail.split(' ').at(-1).replace(/\W/g, '')) +
              ' not found',
          );
        case '23502':
          Logger.debug(error, this.constructor.name);

          throw new BadRequestException(error.column + ' should not be null');
        default:
          if (error instanceof TypeORMError) {
            Logger.verbose(JSON.stringify(error), error.constructor.name);

            throw new InternalServerErrorException(error);
          }

          throw error;
      }
    });
  }
}
