import { Module } from '@nestjs/common';
import { IdentityResolver } from './identity.resolver';

@Module({
  providers: [IdentityResolver],
})
export class IdentityModule {}
