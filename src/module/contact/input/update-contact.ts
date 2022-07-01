import { UpdateModel } from '../../shared/input/update-model';
import { Field, InputType } from '@nestjs/graphql';
import { IsContactContent } from '../../shared/decorator/validator/is-contact-content';
import { ContactType } from '../model/enum/contact-type';
import { OptionalField } from '../../shared/decorator/property/optional-field';
import { IsBoolean } from 'class-validator';

@InputType()
export class UpdateContact extends UpdateModel {
  @OptionalField({ explicitNullCheck: true })
  @IsContactContent()
  content: string;

  @OptionalField({ explicitNullCheck: true })
  @IsBoolean()
  verified: boolean;

  @Field(() => ContactType)
  type: ContactType;
}
