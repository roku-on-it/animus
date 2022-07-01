import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { OrderBy } from '../../../shared/input/list/order-by';

export enum OrderByContactField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}

registerEnumType(OrderByContactField, {
  name: 'OrderByContactField',
});

@InputType()
export class OrderByContact extends OrderBy {
  @Field(() => OrderByContactField)
  field: OrderByContactField;
}
