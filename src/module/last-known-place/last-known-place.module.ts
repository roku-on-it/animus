import { Module } from '@nestjs/common';
import { LastKnownPlaceResolver } from './last-known-place.resolver';
import { LastKnownPlaceService } from './service/last-known-place.service';

@Module({
  providers: [LastKnownPlaceResolver, LastKnownPlaceService],
})
export class LastKnownPlaceModule {}
