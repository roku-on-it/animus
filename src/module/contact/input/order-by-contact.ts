import { Field, InputType } from '@nestjs/graphql';
import { Direction } from 'src/module/shared/enum/direction';
import { OrderByContactField } from './enum/order-by-contact-field';

@InputType()
export class OrderByContact {
  @Field(() => OrderByContactField)
  field: OrderByContactField;

  @Field(() => Direction)
  direction: Direction;
}
