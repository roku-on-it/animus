import { registerEnumType } from '@nestjs/graphql';

export enum OrderByContactField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}

registerEnumType(OrderByContactField, {
  name: 'OrderByContactField',
});
