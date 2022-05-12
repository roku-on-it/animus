import { registerEnumType } from '@nestjs/graphql';

export enum OrderByAddressField {
  Id = 'id',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
}

registerEnumType(OrderByAddressField, {
  name: 'OrderByAddressField',
});
