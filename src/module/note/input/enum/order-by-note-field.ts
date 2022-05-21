import { registerEnumType } from '@nestjs/graphql';

export enum OrderByNoteField {
  Id = 'id',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
  Position = 'position',
}

registerEnumType(OrderByNoteField, {
  name: 'OrderByNoteField',
});
