import { UpdateModel } from '../../shared/input/update-model';
import { Field, InputType } from '@nestjs/graphql';
import { Trim } from '../../shared/decorator/transform/trim';
import { IsEnum, Length } from 'class-validator';
import { AddressType } from '../model/enum/address-type';
import { OptionalField } from '../../shared/decorator/property/optional-field';

@InputType()
export class UpdateAddress extends UpdateModel {
  @OptionalField()
  @Trim()
  @Length(3, 300)
  description: string;

  @OptionalField()
  @Trim()
  @Length(3, 150)
  content: string;

  @Field(() => AddressType, { nullable: true })
  @IsEnum(AddressType)
  type: AddressType;
}
