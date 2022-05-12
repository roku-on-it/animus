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

  async beforeInsert(event: InsertEvent<Note>): Promise<void> {
    const person = await event.manager
      .getRepository(Person)
      .findOne({ id: event.entity.person.id });

    if (null == person) {
      throw new NotFoundException(Person.name + ' not found');
    }

    const existingNote = await event.manager.getRepository(Note).findOne({
      where: { person },
      order: { position: 'DESC' },
    });

    if (null == existingNote) {
      event.entity.position = 0;
    } else {
      event.entity.position = existingNote.position + 1;
    }
  }
}
