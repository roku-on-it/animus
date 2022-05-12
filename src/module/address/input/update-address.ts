import { UpdateModel } from '../../shared/input/update-model';
import { InputType } from '@nestjs/graphql';
import { Trim } from '../../shared/decorator/transform/trim';
import { Length } from 'class-validator';
import { AddressType } from '../model/enum/address-type';
import { OptionalField } from '../../shared/decorator/property/optional-field';

@InputType()
export class UpdateAddress extends UpdateModel {
  @OptionalField()
  @Trim()
  @Length(3, 255)
  description: string;

  @OptionalField()
  @Trim()
  @Length(3, 255)
  content: string;

  @OptionalField(() => AddressType)
  @Trim()
  type: AddressType;
}
