import { Module } from '@nestjs/common';
import { SocialProfileResolver } from './social-profile.resolver';

@Module({
  providers: [SocialProfileResolver],
})
export class SocialProfileModule {}
