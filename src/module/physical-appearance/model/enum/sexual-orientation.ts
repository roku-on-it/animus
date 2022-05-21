import { registerEnumType } from '@nestjs/graphql';

export enum SexualOrientation {
  Heterosexual,
  Homosexual,
  Bisexual,
  Asexual,
}

registerEnumType(SexualOrientation, {
  name: 'SexualOrientation',
});
