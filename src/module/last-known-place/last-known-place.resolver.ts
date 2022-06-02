import { Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { LastKnownPlace } from './model/last-known-place';
import { plainToInstance } from 'class-transformer';
import { Payload } from '../shared/decorator/param/payload';
import { CreateLastKnownPlace } from './input/create-last-known-place';
import { UpdateLastKnownPlace } from './input/update-last-known-place';
import { DeleteLastKnownPlace } from './input/delete-last-known-place';
import { Person } from '../person/model/person';
import { LastKnownPlaceService } from './service/last-known-place.service';
import { In } from 'typeorm';
import { Authorize } from '../auth/decorator/authorize';
import { UserRole } from '../user/model/enum/user-role';
import { RateLimit } from '../misc/app-throttle/decorator/rate-limit';

@Resolver(() => LastKnownPlace)
export class LastKnownPlaceResolver {
  constructor(private lastKnownPlaceService: LastKnownPlaceService) {}

  @Authorize(UserRole.User)
  @RateLimit(2, 10)
  @Mutation(() => LastKnownPlace)
  async createLastKnownPlace(
    @Payload() payload: CreateLastKnownPlace,
  ): Promise<LastKnownPlace> {
    return plainToInstance(LastKnownPlace, payload).save();
  }

  @Authorize(UserRole.User)
  @RateLimit(2, 10)
  @Mutation(() => LastKnownPlace)
  async updateLastKnownPlace(
    @Payload() payload: UpdateLastKnownPlace,
  ): Promise<LastKnownPlace> {
    if (null != payload.actions) {
      await this.lastKnownPlaceService.handleActions(payload);
    }

    return LastKnownPlace.findOneAndUpdate(payload);
  }

  @Authorize(UserRole.Root)
  @RateLimit(1, 30)
  @Mutation(() => LastKnownPlace)
  async deleteLastKnownPlace(
    @Payload() payload: DeleteLastKnownPlace,
  ): Promise<LastKnownPlace> {
    const lastKnownPlace = await LastKnownPlace.findOneOrFail(payload.id);
    return lastKnownPlace.softRemove();
  }

  @ResolveField(() => [Person])
  async with(@Parent() lastKnownPlace: LastKnownPlace) {
    return Person.find({
      where: {
        // If the field resolved is coming from an update method, "with" property
        // is an object, otherwise its array of number.
        id: In(lastKnownPlace.with.map((person) => person.id ?? person)),
      },
      loadRelationIds: true,
    });
  }
}
