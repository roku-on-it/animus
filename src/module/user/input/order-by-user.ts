import { Field, InputType } from '@nestjs/graphql';
import { Direction } from 'src/module/shared/enum/direction';
import { OrderByUserField } from './enum/order-by-user-field';

@InputType()
export class OrderByUser {
  @Field(() => OrderByUserField)
  field: OrderByUserField;

  @Field(() => Direction)
  direction: Direction;
}
