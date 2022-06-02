import { FieldOptions } from '@nestjs/graphql';

export interface OptionalFieldOptions extends Omit<FieldOptions, 'nullable'> {
  explicitNullCheck?: boolean;
}
