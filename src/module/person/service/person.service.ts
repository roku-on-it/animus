import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
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

    const isAlreadyAcquainted = person.acquaintances.some(
      (acquaintance) => acquaintance.id === +payload.acquaintance.id,
    );

    if (isAlreadyAcquainted) {
      throw new ConflictException(
        'Person(' +
          payload.person.id +
          ') is already acquainted with Person(' +
          payload.acquaintance.id +
          ')',
      );
    }

    person.acquaintances.push(payload.acquaintance);

    return person.save().catch((error) => {
      if ('cannot_know_self' === error.constraint) {
        throw new BadRequestException(
          'Person cannot be acquainted with themself',
        );
      }

      throw error;
    });
  }

  async removeAcquaintance(payload: RemoveAcquaintance): Promise<Person> {
    const person = await Person.findOneOrFail(payload.person, {
      relations: ['acquaintances'],
    });

    const knowsAcquaintance = person.acquaintances.some(
      (acquaintance) => acquaintance.id === +payload.acquaintance.id,
    );

    const isSelf = payload.acquaintance.id === payload.person.id;

    if (isSelf) {
      throw new BadRequestException();
    }

    if (!knowsAcquaintance) {
      throw new NotFoundException('Acquaintance to remove not found');
    }

    person.acquaintances = person.acquaintances.filter(
      (acquaintance) => acquaintance.id !== +payload.acquaintance.id,
    );

    return person.save();
  }
}
