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

@Resolver(() => SocialProfile)
export class SocialProfileResolver {
  @Query(() => SocialProfileList)
  async socialProfiles(
    @Payload('filter', true) filter: ListSocialProfile,
  ): Promise<SocialProfileList> {
    return filter.find();
  }

  @Mutation(() => SocialProfile)
  async createSocialProfile(
    @Payload() payload: CreateSocialProfile,
  ): Promise<SocialProfile> {
    return plainToInstance(SocialProfile, payload).save();
  }

  @Mutation(() => SocialProfile)
  async updateSocialProfile(
    @Payload() payload: UpdateSocialProfile,
  ): Promise<SocialProfile> {
    return SocialProfile.findOneAndUpdate(payload);
  }

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
