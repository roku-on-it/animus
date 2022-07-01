import { OptionalField } from '../../decorator/property/optional-field';
import { InputType } from '@nestjs/graphql';
import { Between, LessThan, MoreThan } from 'typeorm';
import { IsInt } from 'class-validator';

@InputType()
export class NumberFilter {
  @OptionalField()
  @IsInt()
  lessThan: string;

  @OptionalField()
  @IsInt()
  moreThan: string;

  getFilterObject(filterKey) {
    return this.lessThan && this.moreThan
      ? {
          [filterKey]: Between(this.moreThan, this.lessThan),
        }
      : this.lessThan
      ? { [filterKey]: LessThan(this.lessThan) }
      : { [filterKey]: MoreThan(this.moreThan) };
  }
}
