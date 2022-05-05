import { registerEnumType } from '@nestjs/graphql';

export enum Gender {
  Male,
  Female,
}

registerEnumType(Gender, {
  name: 'Gender',
});
