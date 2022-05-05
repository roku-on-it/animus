import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { Person } from '../model/person';
import { AddAcquaintance } from '../input/add-acquaintance';
import { RemoveAcquaintance } from '../input/remove-acquaintance';

@Injectable()
export class PersonService {
  async addAcquaintance(payload: AddAcquaintance): Promise<Person> {
    const person = await Person.findOneOrFail(payload.person, {
      relations: ['acquaintances'],
    });

    const alreadyKnows = person.acquaintances.some(
      (a) => a.id == payload.acquaintance.id,
    );

    if (alreadyKnows) {
      throw new ConflictException();
    }

    const acquaintance = await Person.findOneOrFail(payload.acquaintance);

    person.acquaintances.push(acquaintance);

    return person.save().catch((error) => {
      if ('23514' === error.code) {
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

    if (
      acquaintance.id == payload.person.id ||
      !person.acquaintances.map((a) => a.id).includes(+payload.acquaintance.id)
    ) {
      throw new BadRequestException();
    }

    person.acquaintances = person.acquaintances.filter(
      (a) => a.id != payload.acquaintance.id,
    );

    return person.save();
  }
}