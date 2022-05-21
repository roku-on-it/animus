import { Module } from '@nestjs/common';
import { AuthService } from 'src/module/auth/service/auth.service';
import { AuthResolver } from './auth.resolver';
import { AppQueueModule } from 'src/module/misc/app-queue/app-queue.module';

@Module({
  imports: [AppQueueModule],
  providers: [AuthService, AuthResolver],
  exports: [AuthService],
})
export class AuthModule {}
