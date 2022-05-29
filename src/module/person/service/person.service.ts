import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { Person } from '../model/person';
import { UpdateAcquaintance } from '../input/action/acquaintance/update-acquaintance';
import { PersonActions } from '../input/action/person-action';

@Injectable()
export class PersonService {
  async handleActions(actions: PersonActions): Promise<void> {
    for (const [action, payload] of Object.entries(actions)) {
      if (payload instanceof UpdateAcquaintance) {
        await this[action]({ person: actions.person, ...payload });
      }
    }
  }

  async addAcquaintance(payload: UpdateAcquaintance): Promise<Person> {
    const person = await Person.findOneOrFail(payload.person, {
      relations: ['acquaintances'],
    });

    payload.acquaintance.id = +payload.acquaintance.id;
    payload.person.id = +payload.person.id;

    const alreadyKnows = person.acquaintances.some(
      (a) => a.id === payload.acquaintance.id,
    );

    if (alreadyKnows) {
      throw new ConflictException(
        'Person(' +
          payload.person.id +
          ') is already acquainted with Person(' +
          payload.acquaintance.id +
          ')',
      );
    }

    const acquaintance = await Person.findOneOrFail(payload.acquaintance);

    person.acquaintances.push(acquaintance);

    return person.save().catch((error) => {
      if ('cannot_know_self' === error.constraint) {
        throw new BadRequestException('Person cannot know themself');
      }

      throw error;
    });
  }

  async removeAcquaintance(payload: UpdateAcquaintance): Promise<Person> {
    const person = await Person.findOneOrFail(payload.person, {
      relations: ['acquaintances'],
    });

    const acquaintance = await Person.findOneOrFail(payload.acquaintance);

    payload.acquaintance.id = +payload.acquaintance.id;
    payload.person.id = +payload.person.id;

    const knowsAcquaintance = person.acquaintances.some(
      (a) => a.id === payload.acquaintance.id,
    );

    if (acquaintance.id == payload.person.id || !knowsAcquaintance) {
      throw new BadRequestException();
    }

    person.acquaintances = person.acquaintances.filter(
      (a) => a.id !== payload.acquaintance.id,
    );

    return person.save();
  }
}
