import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Note } from '../note';
import { Person } from '../../../person/model/person';
import { NotFoundException } from '@nestjs/common';

@EventSubscriber()
export class NoteSubscriber implements EntitySubscriberInterface<Note> {
  listenTo() {
    return Note;
  }

  async beforeInsert({
    manager,
    entity: note,
  }: InsertEvent<Note>): Promise<void> {
    const person = await manager
      .getRepository(Person)
      .findOne({ id: note.person.id });

    if (null == person) {
      throw new NotFoundException(Person.name + ' not found');
    }

    const noteWithLargestPosition = await manager.getRepository(Note).findOne({
      where: { person },
      select: ['position'],
      order: { position: 'DESC' },
    });

    if (null == noteWithLargestPosition) {
      note.position = 0;
    } else {
      note.position = noteWithLargestPosition.position + 1;
    }
  }
}
