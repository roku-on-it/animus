import { Field, InputType } from '@nestjs/graphql';
import { Trim } from '../../shared/decorator/transform/trim';
import { OptionalField } from '../../shared/decorator/property/optional-field';

@InputType()
export class CreatePerson {
  @Field()
  @Trim()
  displayName: string;

  @OptionalField()
  @Trim()
  description: string;
}
