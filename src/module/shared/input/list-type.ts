import { InputType } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';
import { OptionalField } from '../decorator/property/optional-field';

@InputType()
export class ListType {
  @OptionalField()
  @Min(0)
  pageIndex: number;

  @OptionalField()
  @Max(50)
  @Min(1)
  pageSize: number;
}
