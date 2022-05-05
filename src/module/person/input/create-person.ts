import { Field, InputType } from '@nestjs/graphql';
import { Trim } from '../../shared/decorator/transform/trim';
import { OptionalField } from '../../shared/decorator/property/optional-field';
import { Length } from 'class-validator';

@InputType()
export class CreatePerson {
  @Field()
  @Trim()
  @Length(3, 255)
  displayName: string;

  @OptionalField()
  @Trim()
  @Length(3, 1000)
  description: string;
}
