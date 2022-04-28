import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
  Guest,
  User,
  Root,
}

registerEnumType(UserRole, {
  name: 'UserRole',
});
