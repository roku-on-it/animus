import { registerEnumType } from '@nestjs/graphql';

export enum ContactType {
  Email,
  PhoneNumber,
}

registerEnumType(ContactType, {
  name: 'ContactType',
});
