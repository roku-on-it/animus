import { Field, ObjectType } from '@nestjs/graphql';
import { Address } from './address';

@ObjectType()
export class AddressList {
  @Field(() => [Address])
  items: Address[];

  @Field()
  total: number;
}
