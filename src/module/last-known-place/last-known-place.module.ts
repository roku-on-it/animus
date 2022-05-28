import { Module } from '@nestjs/common';
import { LastKnownPlaceResolver } from './last-known-place.resolver';

@Module({
  providers: [LastKnownPlaceResolver],
})
export class LastKnownPlaceModule {}
