import { registerEnumType } from '@nestjs/graphql';

export enum OrderBySocialProfileField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}

registerEnumType(OrderBySocialProfileField, {
  name: 'OrderBySocialProfileField',
});
