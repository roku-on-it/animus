import { InputType } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';
import { OptionalField } from '../decorator/property/optional-field';

@InputType()
export class ListType {
  @OptionalField({ defaultValue: 0 })
  @Min(0)
  pageIndex: number;

  @OptionalField({ defaultValue: 20 })
  @Max(50)
  @Min(1)
  pageSize: number;
}
