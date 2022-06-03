import { registerEnumType } from '@nestjs/graphql';

export enum AddressType {
  Home,
  Business,
  Other,
}

registerEnumType(AddressType, {
  name: 'AddressType',
});
