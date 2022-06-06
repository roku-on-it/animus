import { InputType } from '@nestjs/graphql';
import { OptionalField } from '../../../shared/decorator/property/optional-field';
import { Trim } from '../../../shared/decorator/transform/trim';
import { IsISO8601, Length } from 'class-validator';

@InputType()
export class DateOfBirthFilter {
  @OptionalField()
  @Trim()
  @Length(10, 10, {
    message: '$property must be equal to $constraint1 characters',
  })
  @IsISO8601()
  before: string;

  @OptionalField()
  @Trim()
  @Length(10, 10, {
    message: '$property must be equal to $constraint1 characters',
  })
  @IsISO8601()
  after: string;
}
