import { InputType } from '@nestjs/graphql';
import { UpdateModel } from '../../shared/input/update-model';
import { Trim } from '../../shared/decorator/transform/trim';
import { IsDateString, Length, MinLength } from 'class-validator';
import { OptionalField } from '../../shared/decorator/property/optional-field';

@InputType()
export class UpdateIdentity extends UpdateModel {
  @OptionalField()
  @Trim()
  @MinLength(3)
  firstName: string;

  @OptionalField()
  @Trim()
  @MinLength(3)
  lastName: string;

  @OptionalField()
  @Trim()
  @MinLength(3)
  nationalId: string;

  @OptionalField()
  @Trim()
  @MinLength(3)
  placeOfBirth: string;

  @OptionalField()
  @Trim()
  @Length(10, 10, {
    message: '$property must be equal to 10 characters',
  })
  @IsDateString()
  dateOfBirth: string;
}
