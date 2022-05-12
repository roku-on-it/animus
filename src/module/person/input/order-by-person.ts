import { Field, InputType } from '@nestjs/graphql';
import { Direction } from 'src/module/shared/enum/direction';
import { OrderByPersonField } from './enum/order-by-person-field';

@InputType()
export class OrderByPerson {
  @Field(() => OrderByPersonField)
  field: OrderByPersonField;

  @Field(() => Direction)
  direction: Direction;
}
