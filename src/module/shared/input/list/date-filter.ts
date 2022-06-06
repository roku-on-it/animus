import { OptionalField } from '../../decorator/property/optional-field';
import { InputType } from '@nestjs/graphql';
import { IsDateField } from '../../decorator/validator/is-date-field';
import { Between, LessThan, MoreThan } from 'typeorm';

@InputType()
export class DateFilter {
  @OptionalField()
  @IsDateField()
  before: string;

  @OptionalField()
  @IsDateField()
  after: string;

  getFilterObject(filterKey) {
    return this.after && this.before
      ? {
          [filterKey]: Between(this.after, this.before),
        }
      : this.before
      ? { [filterKey]: LessThan(this.before) }
      : { [filterKey]: MoreThan(this.after) };
  }
}
