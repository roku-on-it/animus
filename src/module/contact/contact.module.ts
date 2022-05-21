import { Module } from '@nestjs/common';
import { ContactResolver } from './contact.resolver';

@Module({
  providers: [ContactResolver],
})
export class ContactModule {}
