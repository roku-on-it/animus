import { Field, InputType } from '@nestjs/graphql';
import { Direction } from 'src/module/shared/enum/direction';
import { OrderBySocialProfileField } from './enum/order-by-contact-field';

@InputType()
export class OrderBySocialProfile {
  @Field(() => OrderBySocialProfileField)
  field: OrderBySocialProfileField;

  @Field(() => Direction)
  direction: Direction;
}
