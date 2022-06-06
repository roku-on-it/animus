import { InputType } from '@nestjs/graphql';
import { FindManyOptions, ILike } from 'typeorm';
import { ListType } from '../../../shared/input/list-type';
import { AddressList } from '../../model/address-list';
import { Address } from '../../model/address';
import { OrderByAddress } from './order-by-address';
import { OptionalField } from '../../../shared/decorator/property/optional-field';
import { AddressType } from '../../model/enum/address-type';
import { IsEnum, IsNotEmptyObject, Length } from 'class-validator';
import { ORDER_BY_DEFAULT } from '../../../shared/constant/order-by-default-value';

@InputType()
export class ListAddress extends ListType {
  @OptionalField({ explicitNullCheck: true })
  @Length(3, 150)
  content: string;

  @OptionalField({ explicitNullCheck: true })
  @Length(3, 300)
  description: string;

  @OptionalField(() => AddressType, { explicitNullCheck: true })
  @IsEnum(AddressType)
  type: AddressType;

  @OptionalField({
    explicitNullCheck: true,
    defaultValue: ORDER_BY_DEFAULT,
  })
  @IsNotEmptyObject()
  orderBy: OrderByAddress;

  async find(options?: FindManyOptions): Promise<AddressList> {
    const [items, total] = await Address.findAndCount({
      order: {
        [this.orderBy.field]: this.orderBy.direction,
      },
      skip: this.pageIndex * this.pageSize,
      take: this.pageSize,
      where: {
        ...(this.content && { content: ILike('%' + this.content + '%') }),
        ...(this.description && {
          description: ILike('%' + this.description + '%'),
        }),
        ...(null != this.type && { type: this.type }),
      },
      loadRelationIds: true,
      ...options,
    });

    return {
      items,
      total,
    };
  }
}
