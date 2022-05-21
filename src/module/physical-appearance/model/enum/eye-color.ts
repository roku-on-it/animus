import { registerEnumType } from '@nestjs/graphql';

export enum EyeColor {
  Brown,
  Blue,
  Hazel,
  Amber,
  Gray,
  Green,
}

registerEnumType(EyeColor, {
  name: 'EyeColor',
});
