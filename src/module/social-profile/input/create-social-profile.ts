import { Field, InputType } from '@nestjs/graphql';
import { RefInput } from '../../shared/input/ref-input';
import { Person } from '../../person/model/person';
import { IsUrl, Length } from 'class-validator';
import { OptionalField } from '../../shared/decorator/property/optional-field';
import { Trim } from '../../shared/decorator/transform/trim';

@InputType()
export class CreateSocialProfile {
  @Field()
  @Trim()
  @IsUrl()
  referenceLink: string;

  @OptionalField()
  @Length(3, 1000)
  additionalInfo: string;

  @Field()
  verified: boolean;

  @Field(() => RefInput)
  person: Person;
}
