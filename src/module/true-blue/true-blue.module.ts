import { Module } from '@nestjs/common';
import { TrueBlueResolver } from './true-blue.resolver';

@Module({
  providers: [TrueBlueResolver],
})
export class TrueBlueModule {}
