import { Field, InputType } from '@nestjs/graphql';
import { FindManyOptions, ILike } from 'typeorm';
import { ListType } from '../../shared/input/list-type';
import { MinLength, ValidateIf } from 'class-validator';
import { AddressList } from '../model/address-list';
import { Address } from '../model/address';
import { OrderByAddress } from './order-by-address';

@InputType()
export class ListAddress extends ListType {
  @Field(() => String, { nullable: true })
  @MinLength(3)
  @ValidateIf((target: ListAddress) => target.query.length > 0)
  query = '';

  @Field({ nullable: true })
  orderBy: OrderByAddress;

  async find(options?: FindManyOptions): Promise<AddressList> {
    const [items, total] = await Address.findAndCount({
      order: {
        [this.orderBy?.field ?? 'createdAt']: this.orderBy?.direction ?? 'ASC',
      },
      skip: this.pageIndex * this.pageSize,
      take: this.pageSize ?? 5,
      where: [
        { content: ILike('%' + this.query + '%') },
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
