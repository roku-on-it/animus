import { InputType } from '@nestjs/graphql';
import { SexualOrientation } from '../model/enum/sexual-orientation';
import { Gender } from '../model/enum/gender';
import { SkinColor } from '../model/enum/skin-color';
import { EyeColor } from '../model/enum/eye-color';
import { OptionalField } from '../../shared/decorator/property/optional-field';
import { IsPositive, Max, MinLength } from 'class-validator';
import { UpdateModel } from '../../shared/input/update-model';

@InputType()
export class UpdatePhysicalAppearance extends UpdateModel {
  @OptionalField()
  @IsPositive()
  @Max(300)
  height: number;

  @OptionalField()
  @IsPositive()
  @Max(300)
  weight: number;

  @OptionalField()
  hasGlasses: boolean;

  @OptionalField(() => [String])
  @MinLength(3, { each: true })
  disabilities: string[];

  @OptionalField(() => SexualOrientation)
  sexualOrientation: SexualOrientation;

  @OptionalField(() => Gender)
  gender: Gender;

  @OptionalField(() => SkinColor)
  skinColor: SkinColor;

  @OptionalField(() => EyeColor)
  eyeColor: EyeColor;
}
