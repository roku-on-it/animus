import { UpdateModel } from '../../shared/input/update-model';
import { InputType } from '@nestjs/graphql';
import { OptionalField } from '../../shared/decorator/property/optional-field';
import { Trim } from '../../shared/decorator/transform/trim';
import { Length } from 'class-validator';

@InputType()
export class UpdatePerson extends UpdateModel {
  @OptionalField()
  @Trim()
  @Length(3, 255)
  displayName: string;

  @OptionalField()
  @Trim()
  @Length(3, 1000)
  description: string;
}
