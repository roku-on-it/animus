import { Field, InputType } from '@nestjs/graphql';
import { Direction } from 'src/module/shared/enum/direction';

@InputType()
export class OrderBy {
  @Field(() => Direction)
  direction: Direction;
}
