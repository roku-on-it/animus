import { Field, InputType } from '@nestjs/graphql';
import { OrderBy } from '../../shared/input/list/order-by';
import { registerEnumType } from '@nestjs/graphql';

export enum OrderByAddressField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}

registerEnumType(OrderByAddressField, {
  name: 'OrderByAddressField',
});

@InputType()
export class OrderByAddress extends OrderBy {
  @Field(() => OrderByAddressField)
  field: OrderByAddressField;
}
