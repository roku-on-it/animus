import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Person } from '../person';
import { PhysicalAppearance } from '../../../physical-appearance/model/physical-appearance';
import { Identity } from '../../../identity/model/identity';

@EventSubscriber()
export class PersonSubscriber implements EntitySubscriberInterface<Person> {
  listenTo() {
    return Person;
  }

  async afterInsert({
    entity: person,
    manager,
  }: InsertEvent<Person>): Promise<void> {
    await manager.getRepository(PhysicalAppearance).save({ person });
    await manager.getRepository(Identity).save({ person });
  }
}
