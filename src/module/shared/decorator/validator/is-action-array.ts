import { applyDecorators } from '@nestjs/common';
import { ArrayMaxSize, ArrayMinSize, ValidationOptions } from 'class-validator';
import { ObjectMaxPropertySize } from './object-max-property-size';
import { ObjectMinPropertySize } from './object-min-property-size';

export function IsActionArray(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return applyDecorators(
    ArrayMinSize(1, {
      message: '$property must contain at least $constraint1 action',
      ...validationOptions,
    }),
    ArrayMaxSize(50, {
      message: '$property must contain not more than $constraint1 actions',
      ...validationOptions,
    }),
    ObjectMaxPropertySize(1, { each: true, ...validationOptions }),
    ObjectMinPropertySize(1, { each: true, ...validationOptions }),
  );
}
