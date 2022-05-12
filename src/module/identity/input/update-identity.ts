import { InputType } from '@nestjs/graphql';
import { UpdateModel } from '../../shared/input/update-model';
import { Trim } from '../../shared/decorator/transform/trim';
import { IsString } from 'class-validator';
import { OptionalField } from '../../shared/decorator/property/optional-field';

@InputType()
export class UpdateIdentity extends UpdateModel {
  @OptionalField()
  @Trim()
  firstName: string;

  @OptionalField()
  @Trim()
  lastName: string;

  @Trim()
  @IsString()
  nationalId: string;

  @Trim()
  @OptionalField()
  placeOfBirth: string;
}
