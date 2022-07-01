import { InputType, OmitType } from '@nestjs/graphql';
import { UpdateIdentity } from '../../../identity/input/update-identity';
import { OptionalField } from '../../../shared/decorator/property/optional-field';
import { IsNotEmptyObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { DateFilter } from '../../../shared/input/list/date-filter';

@InputType()
export class FilterPersonByIdentity extends OmitType(UpdateIdentity, [
  'id',
  'dateOfBirth',
]) {
  @OptionalField({ explicitNullCheck: true })
  @Type(() => DateFilter)
  @ValidateNested()
  @IsNotEmptyObject()
  dateOfBirth: DateFilter;
}
