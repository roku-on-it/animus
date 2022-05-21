import { UpdateModel } from '../../shared/input/update-model';
import { InputType } from '@nestjs/graphql';
import { Trim } from '../../shared/decorator/transform/trim';
import { MinLength } from 'class-validator';
import { OptionalField } from '../../shared/decorator/property/optional-field';

@InputType()
export class UpdateNote extends UpdateModel {
  @OptionalField()
  @Trim()
  @MinLength(3)
  content: string;

  @OptionalField()
  position: number;
}
