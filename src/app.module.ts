import { Module, OnModuleInit } from '@nestjs/common';
import { AppConfigModule } from 'src/module/misc/app-config/app-config.module';
import { AppTypeormModule } from 'src/module/misc/app-typeorm/app-typeorm.module';
import { AppGraphqlModule } from 'src/module/misc/app-graphql/app-graphql.module';
import { AuthModule } from 'src/module/auth/auth.module';
import { AppThrottleModule } from 'src/module/misc/app-throttle/app-throttle.module';
import { UserModule } from './module/user/user.module';
import { TrueBlueModule } from './module/true-blue/true-blue.module';
import { PersonModule } from './module/person/person.module';
import { getManager } from 'typeorm';

@Module({
  imports: [
    AuthModule,
    AppConfigModule,
    AppTypeormModule,
    AppGraphqlModule,
    AppThrottleModule,
    TrueBlueModule,
    UserModule,
    PersonModule,
  ],
})
export class AppModule implements OnModuleInit {
  async onModuleInit(): Promise<void> {
    await getManager().query(`
    ALTER TABLE person_acquaintances_person
    DROP CONSTRAINT IF EXISTS cannot_know_self;
    
    ALTER TABLE person_acquaintances_person
    ADD CONSTRAINT cannot_know_self
    CHECK ("personId_1" <> "personId_2");
     `);
  }
}
