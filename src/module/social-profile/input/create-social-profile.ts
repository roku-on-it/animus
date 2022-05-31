import { Field, InputType } from '@nestjs/graphql';
import { RefInput } from '../../shared/input/ref-input';
import { Person } from '../../person/model/person';
import { Length } from 'class-validator';
import { OptionalField } from '../../shared/decorator/property/optional-field';

@InputType()
export class CreateSocialProfile {
  @Field()
  @Length(3, 3)
  referenceLink: string;

  @OptionalField()
  @Length(3, 3)
  additionalInfo: string;

  @Field()
  verified: boolean;

  @Field(() => RefInput)
  person: Person;
}
