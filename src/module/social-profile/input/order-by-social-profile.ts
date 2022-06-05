import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { OrderBy } from '../../shared/input/list/order-by';

export enum OrderBySocialProfileField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}

registerEnumType(OrderBySocialProfileField, {
  name: 'OrderBySocialProfileField',
});

@InputType()
export class OrderBySocialProfile extends OrderBy {
  @Field(() => OrderBySocialProfileField)
  field: OrderBySocialProfileField;
}
