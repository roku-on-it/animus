import { Module } from '@nestjs/common';
import { AppConfigModule } from 'src/module/misc/app-config/app-config.module';
import { AppTypeormModule } from 'src/module/misc/app-typeorm/app-typeorm.module';
import { AppGraphqlModule } from 'src/module/misc/app-graphql/app-graphql.module';
import { AuthModule } from 'src/module/auth/auth.module';
import { AppThrottleModule } from 'src/module/misc/app-throttle/app-throttle.module';
import { UserModule } from './module/user/user.module';
import { TrueBlueModule } from './module/true-blue/true-blue.module';
import { PersonModule } from './module/person/person.module';
import { PhysicalAppearanceModule } from './module/physical-appearance/physical-appearance.module';
import { IdentityModule } from './module/identity/identity.module';
import { AddressModule } from './module/address/address.module';
import { NoteModule } from './module/note/note.module';
import { ContactModule } from './module/contact/contact.module';
import { LastKnownPlaceModule } from './module/last-known-place/last-known-place.module';
import { SocialProfileModule } from './module/social-profile/social-profile.module';

// TODO: Notify the client about operations upon fail.
//  --> Trying to remove Persons with ids [1,2,3,4], managed to remove 1,2 and 4 successfully but operation failed on 3.
//  --> Notify the client about successful or failed operation in response body >>
//  {
//   failedOperations: [{ removeWith: { with: { id: 3 } } }]
//  }

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
    PhysicalAppearanceModule,
    IdentityModule,
    AddressModule,
    NoteModule,
    ContactModule,
    LastKnownPlaceModule,
    SocialProfileModule,
  ],
})
export class AppModule {}
