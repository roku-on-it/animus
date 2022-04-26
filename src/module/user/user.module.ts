import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [UserResolver],
})
export class UserModule {}
