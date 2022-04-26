import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [ThrottlerModule.forRoot()],
  exports: [ThrottlerModule],
})
export class AppThrottleModule {}
