import {
  IsEmail,
  IsPhoneNumber,
  validate,
  Validate,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ContactType } from '../../../contact/model/enum/contact-type';
import { Trim } from '../transform/trim';
import { plainToInstance } from 'class-transformer';
import { CreateContact } from '../../../contact/input/create-contact';
import { BadRequestException } from '@nestjs/common';
import { ToLowerCase } from '../transform/to-lower-case';
import { ParsePhoneNumber } from '../transform/parse-phone-number';

abstract class Content {
  abstract content: string;
}

class Email extends Content {
  @Trim()
  @ToLowerCase()
  @IsEmail()
  content: string;
}

class PhoneNumber extends Content {
  @IsPhoneNumber()
  @ParsePhoneNumber()
  content: string;
}

interface ContentValidationArguments extends ValidationArguments {
  object: CreateContact;
}

@ValidatorConstraint({ name: 'content', async: true })
export class ContentValidator implements ValidatorConstraintInterface {
  async validate(
    content: string,
    args: ContentValidationArguments,
  ): Promise<boolean> {
    const cls = this.getValidationClass(args.object.type);
    const instance = plainToInstance(cls, { content });

    await validate(instance as object).then(([validationError]) => {
      if (null != validationError) {
        throw new BadRequestException(
          Object.values(validationError.constraints),
        );
      }
    });

    args.object.content = instance.content;

    return true;
  }

  getValidationClass(type: ContactType): new () => Email | PhoneNumber {
    switch (type) {
      case ContactType.Email:
        return Email;

      case ContactType.PhoneNumber:
        return PhoneNumber;
    }

    throw new Error('Unknown ContactType');
  }
}

export const IsContactContent = (validationOptions?: ValidationOptions) =>
  Validate(ContentValidator, validationOptions);
