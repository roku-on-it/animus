import { applyDecorators } from '@nestjs/common';
import { Field, FieldOptions, ReturnTypeFunc } from '@nestjs/graphql';
import { IsOptional, ValidateIf } from 'class-validator';

export interface OptionalFieldOptions extends Omit<FieldOptions, 'nullable'> {
  explicitNullCheck?: boolean;
}

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
  const IsNotNull =
    returnTypeFunction?.explicitNullCheck || options?.explicitNullCheck
      ? ValidateIf((target, value) => undefined !== value)
      : IsOptional();

  if ('function' === typeof returnTypeFunction) {
    return applyDecorators(
      Field(returnTypeFunction, { nullable: true, ...options }),
      IsNotNull,
    );
  }

  return applyDecorators(
    Field({ nullable: true, ...(returnTypeFunction as U) }),
    IsNotNull,
  );
}
