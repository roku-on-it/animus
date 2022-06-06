import { OptionalField } from '../../decorator/property/optional-field';
import { InputType } from '@nestjs/graphql';
import { IsDateField } from '../../decorator/validator/is-date-field';

@InputType()
export class DateFilter {
  @OptionalField()
  @IsDateField()
  before: string;

  @OptionalField()
  @IsDateField()
  after: string;
}
