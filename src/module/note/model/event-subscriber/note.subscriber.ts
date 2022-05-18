import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { Note } from '../note';
import { Person } from '../../../person/model/person';
import { NotFoundException } from '@nestjs/common';

@EventSubscriber()
export class NoteSubscriber implements EntitySubscriberInterface<Note> {
  listenTo() {
    return Note;
  }

  async beforeInsert({ manager, entity }: InsertEvent<Note>): Promise<void> {
    const person = await manager
      .getRepository(Person)
      .findOne({ id: entity.person.id });

    if (null == person) {
      throw new NotFoundException(Person.name + ' not found');
    }

    const noteWithLargestPosition = await manager.getRepository(Note).findOne({
      where: { person },
      select: ['position'],
      order: { position: 'DESC' },
    });

    if (null == noteWithLargestPosition) {
      entity.position = 0;
    } else {
      entity.position = noteWithLargestPosition.position + 1;
    }
  }

  async beforeUpdate({
    entity,
    databaseEntity,
    manager,
  }: UpdateEvent<Note>): Promise<void> {
    if (
      entity.content === databaseEntity.content &&
      entity.position === databaseEntity.position
    ) {
      return;
    }

    const noteToBeSwitched = await manager.getRepository(Note).findOne({
      where: {
        person: entity.person,
        position: entity.position,
      },
      select: ['id'],
    });

    if (null == noteToBeSwitched) {
      throw new NotFoundException('Note to be repositioned could not be found');
    }

    await manager
      .createQueryBuilder()
      .update(Note, { position: databaseEntity.position })
      .where('id = :id', { id: noteToBeSwitched.id })
      .callListeners(false)
      .execute();
  }
}
