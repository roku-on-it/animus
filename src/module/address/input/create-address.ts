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
  @Length(3, 255)
  description: string;

  @Field()
  @Trim()
  @Length(3, 255)
  content: string;

  @Field(() => AddressType)
  @Trim()
  type: AddressType;

  @Field(() => RefInput)
  person: Person;
}
