import { InputType } from '@nestjs/graphql';
import { UpdateModel } from '../../shared/input/update-model';
import { Trim } from '../../shared/decorator/transform/trim';
import { IsISO8601, Length } from 'class-validator';
import { OptionalField } from '../../shared/decorator/property/optional-field';

@InputType()
export class UpdateIdentity extends UpdateModel {
  @OptionalField()
  @Trim()
  @Length(2, 20)
  firstName: string;

  @OptionalField()
  @Trim()
  @Length(2, 20)
  lastName: string;

  @OptionalField()
  @Trim()
  @Length(3, 20)
  nationalId: string;

  @OptionalField()
  @Trim()
  @Length(3, 150)
  placeOfBirth: string;

  @OptionalField()
  @Trim()
  @Length(10, 10, {
    message: '$property must be equal to $constraint1 characters',
  })
  @IsISO8601()
  dateOfBirth: string;
}
