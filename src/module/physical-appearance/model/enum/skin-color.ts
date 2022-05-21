import { registerEnumType } from '@nestjs/graphql';

export enum SkinColor {
  Tanned,
  Yellow,
  Pale,
  Light,
  Brown,
  DarkBrown,
  Black,
}

registerEnumType(SkinColor, {
  name: 'SkinColor',
});
