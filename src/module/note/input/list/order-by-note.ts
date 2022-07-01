import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { OrderBy } from '../../../shared/input/list/order-by';

export enum OrderByNoteField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  position = 'position',
}

registerEnumType(OrderByNoteField, {
  name: 'OrderByNoteField',
});

@InputType()
export class OrderByNote extends OrderBy {
  @Field(() => OrderByNoteField)
  field: OrderByNoteField;
}
