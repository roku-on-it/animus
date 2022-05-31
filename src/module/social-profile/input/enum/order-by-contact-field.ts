import { registerEnumType } from '@nestjs/graphql';

export enum OrderBySocialProfileField {
  Id = 'id',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
}

registerEnumType(OrderBySocialProfileField, {
  name: 'OrderBySocialProfileField',
});
