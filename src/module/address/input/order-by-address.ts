import { Field, InputType } from '@nestjs/graphql';
import { Direction } from 'src/module/shared/enum/direction';
import { OrderByAddressField } from './enum/order-by-address-field';

@InputType()
export class OrderByAddress {
  @Field(() => OrderByAddressField)
  field: OrderByAddressField;

  @Field(() => Direction)
  direction: Direction;
}
