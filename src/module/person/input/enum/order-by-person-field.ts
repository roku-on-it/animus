import { registerEnumType } from '@nestjs/graphql';

export enum OrderByPersonField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  displayName = 'displayName',
}

registerEnumType(OrderByPersonField, {
  name: 'OrderByPersonField',
});
