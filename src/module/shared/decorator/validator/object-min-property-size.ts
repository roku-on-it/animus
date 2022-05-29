import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function ObjectMinPropertySize(
  minSize: number,
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      propertyName,
      name: 'objectMinPropertySize',
      target: object.constructor,
      constraints: [minSize],
      options: validationOptions,
      validator: {
        defaultMessage() {
          const eachPrefix = validationOptions.each ? 'each value in ' : '';
          const pluralSuffix = minSize <= 1 ? 'y' : 'ies';

          return (
            eachPrefix +
            '$property must contain at least $constraint1 propert' +
            pluralSuffix
          );
        },
        validate(value: Record<string, any>, args: ValidationArguments) {
          const [minPropertySize] = args.constraints;

          return Object.keys(value).length >= minPropertySize;
        },
      },
    });
  };
}
