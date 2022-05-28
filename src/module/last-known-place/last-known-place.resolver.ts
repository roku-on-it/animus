import { Mutation, Resolver } from '@nestjs/graphql';
import { LastKnownPlace } from './model/last-known-place';
import { plainToInstance } from 'class-transformer';
import { Payload } from '../shared/decorator/param/payload';
import { CreateLastKnownPlace } from './input/create-last-known-place';
import { UpdateLastKnownPlace } from './input/update-last-known-place';
import { DeleteLastKnownPlace } from './input/delete-last-known-place';

@Resolver(() => LastKnownPlace)
export class LastKnownPlaceResolver {
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
    return LastKnownPlace.findOneAndUpdate(payload);
  }

  @Mutation(() => LastKnownPlace)
  async deleteLastKnownPlace(
    @Payload() payload: DeleteLastKnownPlace,
  ): Promise<LastKnownPlace> {
    const lastKnownPlace = await LastKnownPlace.findOneOrFail(payload.id);
    return lastKnownPlace.softRemove();
  }
}
