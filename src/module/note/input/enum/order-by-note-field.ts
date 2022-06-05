import { registerEnumType } from '@nestjs/graphql';

export enum OrderByNoteField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  position = 'position',
}

registerEnumType(OrderByNoteField, {
  name: 'OrderByNoteField',
});
