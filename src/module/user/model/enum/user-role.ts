import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
  User,
  Root,
}

registerEnumType(UserRole, {
  name: 'UserRole',
});
