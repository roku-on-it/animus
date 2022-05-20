import { registerEnumType } from '@nestjs/graphql';

export enum OrderByContactField {
  Id = 'id',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
}

registerEnumType(OrderByContactField, {
  name: 'OrderByContactField',
});
