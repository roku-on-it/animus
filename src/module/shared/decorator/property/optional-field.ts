import { applyDecorators } from '@nestjs/common';
import { Field, FieldOptions } from '@nestjs/graphql';
import { ReturnTypeFunc } from '@nestjs/graphql/dist/interfaces/return-type-func.interface';
import { IsOptional } from 'class-validator';

export const OptionalField = (
  returnTypeFunction?: ReturnTypeFunc,
  options?: FieldOptions,
): PropertyDecorator => {
  if ('function' === typeof returnTypeFunction) {
    return applyDecorators(
      Field(returnTypeFunction, { nullable: true, ...options }),
      IsOptional(),
    );
  }
  return applyDecorators(Field({ nullable: true, ...options }), IsOptional());
};
