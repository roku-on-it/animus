import { registerEnumType } from '@nestjs/graphql';

export enum OrderByAddressField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}

registerEnumType(OrderByAddressField, {
  name: 'OrderByAddressField',
});
