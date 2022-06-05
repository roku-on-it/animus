import { registerEnumType } from '@nestjs/graphql';

export enum OrderByUserField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  username = 'username',
}

registerEnumType(OrderByUserField, {
  name: 'OrderByUserField',
});
