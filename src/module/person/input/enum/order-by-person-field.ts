import { registerEnumType } from '@nestjs/graphql';

export enum OrderByPersonField {
  Id = 'id',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
  DisplayName = 'displayName',
}

registerEnumType(OrderByPersonField, {
  name: 'OrderByPersonField',
});
