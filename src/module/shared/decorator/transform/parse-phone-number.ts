import { Transform, TransformOptions } from 'class-transformer';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

export const ParsePhoneNumber = (options?: TransformOptions) =>
  Transform(({ value }) => {
    if ('string' === typeof value) {
      const phoneNumber = parsePhoneNumberFromString(value);

      if (null == phoneNumber) {
        return value;
      }

      return phoneNumber.formatInternational();
    }

    return value;
  }, options);
