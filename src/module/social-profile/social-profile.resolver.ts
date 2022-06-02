import {
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { DeleteSocialProfile } from './input/delete-social-profile';
import { CreateSocialProfile } from './input/create-social-profile';
import { UpdateSocialProfile } from './input/update-social-profile';
import { plainToInstance } from 'class-transformer';
import { SocialProfile } from './model/social-profile';
import { Payload } from '../shared/decorator/param/payload';
import { Person } from '../person/model/person';
import { SocialProfileList } from './model/social-profile-list';
import { ListSocialProfile } from './input/list-social-profile';
import { Authorize } from '../auth/decorator/authorize';
import { UserRole } from '../user/model/enum/user-role';
import { RateLimit } from '../misc/app-throttle/decorator/rate-limit';

@Resolver(() => SocialProfile)
export class SocialProfileResolver {
  @Authorize(UserRole.Guest)
  @Query(() => SocialProfileList)
  async socialProfiles(
    @Payload('filter', true) filter: ListSocialProfile,
  ): Promise<SocialProfileList> {
    return filter.find();
  }

  @Authorize(UserRole.User)
  @RateLimit(2, 10)
  @Mutation(() => SocialProfile)
  async createSocialProfile(
    @Payload() payload: CreateSocialProfile,
  ): Promise<SocialProfile> {
    return plainToInstance(SocialProfile, payload).save();
  }

  @Authorize(UserRole.User)
  @RateLimit(2, 10)
  @Mutation(() => SocialProfile)
  async updateSocialProfile(
    @Payload() payload: UpdateSocialProfile,
  ): Promise<SocialProfile> {
    return SocialProfile.findOneAndUpdate(payload);
  }

  @Authorize(UserRole.Root)
  @RateLimit(1, 30)
  @Mutation(() => SocialProfile)
  async deleteSocialProfile(
    @Payload() payload: DeleteSocialProfile,
  ): Promise<SocialProfile> {
    const socialProfile = await SocialProfile.findOneOrFail(payload.id);
    return socialProfile.softRemove();
  }

  @ResolveField(() => Person)
  async person(@Parent() socialProfile: SocialProfile): Promise<Person> {
    return Person.findOneOrFail(socialProfile.person);
  }
}
