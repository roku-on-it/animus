import { applyDecorators } from '@nestjs/common';
import { Field, ReturnTypeFunc } from '@nestjs/graphql';
import { IsOptional, ValidateIf } from 'class-validator';
import { OptionalFieldOptions } from './interface/optional-field-options';

export function OptionalField(
  options?: OptionalFieldOptions,
): PropertyDecorator;
export function OptionalField(
  returnTypeFunction?: ReturnTypeFunc,
): PropertyDecorator;
export function OptionalField(
  returnTypeFunction?: ReturnTypeFunc,
  options?: OptionalFieldOptions,
): PropertyDecorator;
export function OptionalField<
  T extends ReturnTypeFunc,
  U extends OptionalFieldOptions,
>(
  returnTypeFunction?: T & U,
  options?: OptionalFieldOptions,
): PropertyDecorator {
  if (returnTypeFunction?.explicitNullCheck || options?.explicitNullCheck) {
    if ('function' === typeof returnTypeFunction) {
      return applyDecorators(
        Field(returnTypeFunction, { nullable: true, ...options }),
        ValidateIf((target, value) => 'undefined' !== typeof value),
      );
    }

    return applyDecorators(
      Field({ nullable: true, ...(returnTypeFunction as U) }),
      ValidateIf((target, value) => 'undefined' !== typeof value),
    );
  }

  if ('function' === typeof returnTypeFunction) {
    return applyDecorators(
      Field(returnTypeFunction, { nullable: true, ...options }),
      IsOptional(),
    );
  }

  return applyDecorators(
    Field({ nullable: true, ...(returnTypeFunction as U) }),
    IsOptional(),
  );
}
