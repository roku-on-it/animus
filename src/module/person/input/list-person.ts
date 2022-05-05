import { Field, InputType } from '@nestjs/graphql';
import { FindManyOptions, ILike } from 'typeorm';
import { ListType } from '../../shared/input/list-type';
import { PersonList } from '../model/person-list';
import { Person } from '../model/person';
import { MinLength, ValidateIf } from 'class-validator';

@InputType()
export class ListPerson extends ListType {
  @Field(() => String, { nullable: true })
  @MinLength(3)
  @ValidateIf((target: ListPerson) => target.query.length > 0)
  query = '';

  async find(options?: FindManyOptions): Promise<PersonList> {
    const [items, total] = await Person.findAndCount({
      skip: this.pageIndex * this.pageSize,
      take: this.pageSize ?? 5,
      where: [
        { displayName: ILike('%' + this.query + '%') },
        { description: ILike('%' + this.query + '%') },
      ],
      loadRelationIds: true,
      ...options,
    });

    return {
      items,
      total,
    };
  }
}
