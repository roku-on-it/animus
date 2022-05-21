import { registerEnumType } from '@nestjs/graphql';

export enum AddressType {
  Home,
  Business,
}

registerEnumType(AddressType, {
  name: 'AddressType',
});
