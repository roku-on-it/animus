import { applyDecorators } from '@nestjs/common';
import { Field, FieldOptions } from '@nestjs/graphql';
import { ReturnTypeFunc } from '@nestjs/graphql/dist/interfaces/return-type-func.interface';
import { IsOptional, ValidateIf } from 'class-validator';

interface OptionalFieldOptions extends FieldOptions {
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
): PropertyDecorator;
export function OptionalField(
  returnTypeFunction?: ReturnTypeFunc,
  options?: OptionalFieldOptions,
): PropertyDecorator;
export function OptionalField(
  returnTypeFunction?: ReturnTypeFunc | OptionalFieldOptions,
  options?: OptionalFieldOptions,
): PropertyDecorator {
  if (returnTypeFunction?.['explicitNullCheck']) {
    if ('function' === typeof returnTypeFunction) {
      return applyDecorators(
        Field(returnTypeFunction, { nullable: true, ...returnTypeFunction }),
        ValidateIf((target, value) => 'undefined' !== typeof value),
      );
    }

    return applyDecorators(
      Field({ nullable: true, ...returnTypeFunction }),
      ValidateIf((target, value) => 'undefined' !== typeof value),
    );
  }

  if ('function' === typeof returnTypeFunction) {
    return applyDecorators(
      Field(returnTypeFunction, { nullable: true, ...options }),
      IsOptional(),
    );
  }

  return applyDecorators(Field({ nullable: true, ...options }), IsOptional());
}
