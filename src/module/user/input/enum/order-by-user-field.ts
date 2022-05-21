import { registerEnumType } from '@nestjs/graphql';

export enum OrderByUserField {
  Id = 'id',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
  Username = 'username',
}

registerEnumType(OrderByUserField, {
  name: 'OrderByUserField',
});
