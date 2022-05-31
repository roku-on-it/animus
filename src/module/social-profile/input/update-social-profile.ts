import { InputType } from '@nestjs/graphql';
import { Length } from 'class-validator';
import { OptionalField } from '../../shared/decorator/property/optional-field';
import { Transform } from 'class-transformer';
import { Trim } from '../../shared/decorator/transform/trim';
import { UpdateModel } from '../../shared/input/update-model';

@InputType()
export class UpdateSocialProfile extends UpdateModel {
  @OptionalField()
  @Trim()
  @Length(3, 3)
  referenceLink: string;

  @OptionalField()
  @Trim()
  @Length(3, 3)
  additionalInfo: string;

  @OptionalField()
  @Transform(({ value }) => {
    if ('boolean' === typeof value) {
      return value;
    }

    return !!value;
  })
  verified: boolean;
}
