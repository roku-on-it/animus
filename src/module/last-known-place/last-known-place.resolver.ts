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

@Resolver(() => LastKnownPlace)
export class LastKnownPlaceResolver {
  constructor(private lastKnownPlaceService: LastKnownPlaceService) {}

  // More details: We don't have any queries in LastKnownPlace Resolver
  // as it is not necessary because LastKnownPlace is only about the Person entity,
  // and we shouldn't query this field alone because of this.

  @Mutation(() => LastKnownPlace)
  async createLastKnownPlace(
    @Payload() payload: CreateLastKnownPlace,
  ): Promise<LastKnownPlace> {
    return plainToInstance(LastKnownPlace, payload).save();
  }

  @Mutation(() => LastKnownPlace)
  async updateLastKnownPlace(
    @Payload() payload: UpdateLastKnownPlace,
  ): Promise<LastKnownPlace> {
    if (null != payload.actions) {
      await this.lastKnownPlaceService.handleActions(payload);
    }

    return LastKnownPlace.findOneAndUpdate(payload);
  }

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
