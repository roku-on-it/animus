import { InputType, OmitType } from '@nestjs/graphql';
import { UpdateIdentity } from '../../../identity/input/update-identity';
import { DateOfBirthFilter } from './date-of-birth-filter';
import { OptionalField } from '../../../shared/decorator/property/optional-field';
import { IsNotEmptyObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class FilterPersonByIdentity extends OmitType(UpdateIdentity, [
  'id',
  'dateOfBirth',
]) {
  @OptionalField({ explicitNullCheck: true })
  @Type(() => DateOfBirthFilter)
  @ValidateNested()
  @IsNotEmptyObject()
  dateOfBirth: DateOfBirthFilter;
}
