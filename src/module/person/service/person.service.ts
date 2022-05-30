import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { Person } from '../model/person';
import { UpdatePerson } from '../input/update-person';
import { AddAcquaintance } from '../input/action/acquaintance/add-acquaintance';
import { RemoveAcquaintance } from '../input/action/acquaintance/remove-acquaintance';

@Injectable()
export class PersonService {
  async handleActions(payload: UpdatePerson): Promise<void> {
    for (const action of payload.actions) {
      const [[method, actionBody]] = Object.entries(action);
      /**
       * It could be done as the example above.
       * if('addAcquaintance' === method) {
       *   this.addAcquaintance({
       *     person: {
       *       id: payload.id,
       *     },
       *     ...actionBody,
       *   });
       * }
       *
       * Might implement it later if things get too hard to handle that way.
       */
      await this[method]({
        person: {
          id: payload.id,
        },
        ...actionBody,
      });
    }
  }

  async addAcquaintance(payload: AddAcquaintance): Promise<Person> {
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

  async removeAcquaintance(payload: RemoveAcquaintance): Promise<Person> {
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
