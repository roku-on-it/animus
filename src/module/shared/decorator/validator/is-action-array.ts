import { applyDecorators } from '@nestjs/common';
import { OptionalField } from '../property/optional-field';
import { PersonActions } from '../../../person/input/action/person-action';
import { ACTIONS_DESCRIPTION } from '../../constant/input-field-description';
import { ArrayMaxSize, ArrayMinSize, ValidationOptions } from 'class-validator';
import { ObjectMaxPropertySize } from './object-max-property-size';
import { ObjectMinPropertySize } from './object-min-property-size';

export function IsActionArray(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return applyDecorators(
    OptionalField(() => [PersonActions], {
      description: ACTIONS_DESCRIPTION,
    }),
    ArrayMinSize(1, {
      message: '$property must contain at least $constraint1 action',
    }),
    ArrayMaxSize(50, {
      message: '$property must contain not more than $constraint1 actions',
    }),
    ObjectMaxPropertySize(1, { each: true }),
    ObjectMinPropertySize(1, { each: true }),
  );
}
