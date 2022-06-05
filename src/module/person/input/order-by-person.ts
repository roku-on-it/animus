import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { OrderBy } from '../../shared/input/list/order-by';

export enum OrderByPersonField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  displayName = 'displayName',
}

registerEnumType(OrderByPersonField, {
  name: 'OrderByPersonField',
});

@InputType()
export class OrderByPerson extends OrderBy {
  @Field(() => OrderByPersonField)
  field: OrderByPersonField;
}
