import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateLastKnownPlace } from '../input/update-last-known-place';
import { AddWith } from '../input/action/with/add-with';
import { LastKnownPlace } from '../model/last-known-place';
import { RemoveWith } from '../input/action/with/remove-with';

@Injectable()
export class LastKnownPlaceService {
  async handleActions(payload: UpdateLastKnownPlace): Promise<void> {
    for (const action of payload.actions) {
      const [[method, actionBody]] = Object.entries(action);

      await this[method]({
        lastKnownPlace: {
          id: payload.id,
        },
        ...actionBody,
      });
    }
  }

  async addWith(payload: AddWith): Promise<LastKnownPlace> {
    const lastKnownPlace = await LastKnownPlace.findOneOrFail(
      payload.lastKnownPlace,
      { relations: ['person', 'with'] },
    );

    const isWithSelf = lastKnownPlace.person.id === +payload.with.id;

    if (isWithSelf) {
      throw new BadRequestException('Person cannot be with themself');
    }

    const isAlreadyWith = lastKnownPlace.with.some(
      (withPerson) => withPerson.id === +payload.with.id,
    );

    if (isAlreadyWith) {
      throw new ConflictException(
        'Person(' +
          payload.with.id +
          ') trying to be added is already with Person(' +
          lastKnownPlace.person.id +
          ')',
      );
    }

    lastKnownPlace.with.push(payload.with);

    return lastKnownPlace.save();
  }

  async removeWith(payload: RemoveWith): Promise<LastKnownPlace> {
    const lastKnownPlace = await LastKnownPlace.findOneOrFail(
      payload.lastKnownPlace,
      {
        relations: ['with', 'person'],
      },
    );

    const isSelf = lastKnownPlace.person.id === +payload.with.id;

    if (isSelf) {
      throw new BadRequestException();
    }

    const isWithPerson = lastKnownPlace.with.some(
      (withPerson) => withPerson.id === +payload.with.id,
    );

    if (!isWithPerson) {
      throw new NotFoundException('Person to remove not found');
    }

    lastKnownPlace.with = lastKnownPlace.with.filter(
      (withPerson) => withPerson.id !== +payload.with.id,
    );

    return lastKnownPlace.save();
  }
}
