import { Field, InputType } from '@nestjs/graphql';
import { AddressType } from '../model/enum/address-type';
import { Person } from '../../person/model/person';
import { RefInput } from '../../shared/input/ref-input';
import { Trim } from '../../shared/decorator/transform/trim';
import { Length } from 'class-validator';

@InputType()
export class CreateAddress {
  @Field()
  @Trim()
  @Length(3, 300)
  description: string;

  @Field()
  @Trim()
  @Length(3, 150)
  content: string;

  @Field(() => AddressType)
  type: AddressType;

  @Field(() => RefInput)
  person: Person;
}
