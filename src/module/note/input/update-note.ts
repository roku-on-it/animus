import { UpdateModel } from '../../shared/input/update-model';
import { InputType } from '@nestjs/graphql';
import { Trim } from '../../shared/decorator/transform/trim';
import { IsInt, IsNotEmpty, MaxLength, Min } from 'class-validator';
import { OptionalField } from '../../shared/decorator/property/optional-field';

@InputType()
export class UpdateNote extends UpdateModel {
  @OptionalField({ explicitNullCheck: true })
  @Trim()
  @IsNotEmpty()
  @MaxLength(1000)
  content: string;

  @OptionalField({ explicitNullCheck: true })
  @IsInt()
  @Min(0)
  position: number;
}
