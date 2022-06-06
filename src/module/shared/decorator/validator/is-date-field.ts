import { applyDecorators } from '@nestjs/common';
import { IsISO8601, Length } from 'class-validator';
import { Trim } from '../transform/trim';

export function IsDateField(): PropertyDecorator {
  return applyDecorators(
    Trim(),
    Length(10, 10, {
      message: '$property must be equal to $constraint1 characters',
    }),
    IsISO8601(),
  );
}
