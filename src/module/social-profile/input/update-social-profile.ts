import { InputType } from '@nestjs/graphql';
import { IsBoolean, IsUrl, Length } from 'class-validator';
import { OptionalField } from '../../shared/decorator/property/optional-field';
import { Trim } from '../../shared/decorator/transform/trim';
import { UpdateModel } from '../../shared/input/update-model';

@InputType()
export class UpdateSocialProfile extends UpdateModel {
  @OptionalField({ explicitNullCheck: true })
  @Trim()
  @IsUrl()
  referenceLink: string;

  @OptionalField()
  @Trim()
  @Length(3, 1000)
  additionalInfo: string;

  @OptionalField({ explicitNullCheck: true })
  @IsBoolean()
  verified: boolean;
}
