import { Field, InputType } from '@nestjs/graphql';
import { Direction } from '../../shared/enum/direction';
import { OrderByNoteField } from './enum/order-by-note-field';

@InputType()
export class OrderByNote {
  @Field(() => OrderByNoteField)
  field: OrderByNoteField;

  @Field(() => Direction)
  direction: Direction;
}
