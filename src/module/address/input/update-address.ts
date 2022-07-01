import { UpdateModel } from '../../shared/input/update-model';
import { InputType } from '@nestjs/graphql';
import { Trim } from '../../shared/decorator/transform/trim';
import { IsEnum, Length } from 'class-validator';
import { AddressType } from '../model/enum/address-type';
import { OptionalField } from '../../shared/decorator/property/optional-field';

@InputType()
export class UpdateAddress extends UpdateModel {
  @OptionalField({ explicitNullCheck: true })
  @Trim()
  @Length(3, 300)
  description: string;

  @OptionalField({ explicitNullCheck: true })
  @Trim()
  @Length(3, 150)
  content: string;

  @OptionalField(() => AddressType, { explicitNullCheck: true })
  @IsEnum(AddressType)
  type: AddressType;
}
