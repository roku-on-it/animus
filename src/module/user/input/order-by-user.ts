import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { OrderBy } from '../../shared/input/list/order-by';

export enum OrderByUserField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  username = 'username',
}

registerEnumType(OrderByUserField, {
  name: 'OrderByUserField',
});

@InputType()
export class OrderByUser extends OrderBy {
  @Field(() => OrderByUserField)
  field: OrderByUserField;
}
