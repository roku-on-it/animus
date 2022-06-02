import { UpdateModel } from '../../shared/input/update-model';
import { Field, InputType } from '@nestjs/graphql';
import { Trim } from '../../shared/decorator/transform/trim';
import { IsInt, IsNotEmpty, MaxLength, ValidateIf } from 'class-validator';
import { OptionalField } from '../../shared/decorator/property/optional-field';

@InputType()
export class UpdateNote extends UpdateModel {
  @OptionalField()
  @Trim()
  @IsNotEmpty()
  @MaxLength(1000)
  content: string;

  @Field({ nullable: true })
  @ValidateIf((target, value) => null === value)
  @IsInt()
  position: number;
}
