import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { Note } from './model/note';
import { Payload } from '../shared/decorator/param/payload';
import { plainToInstance } from 'class-transformer';
import { CreateNote } from './input/create-note';
import { UpdateNote } from './input/update-note';
import { DeleteNote } from './input/delete-note';
import { NoteList } from './model/note-list';
import { ListNote } from './input/list-note';

@Resolver(() => Note)
export class NoteResolver {
  @Query(() => NoteList)
  async notes(@Payload('filter', true) filter: ListNote): Promise<NoteList> {
    return filter.find();
  }

  @Mutation(() => Note)
  async createNote(@Payload() payload: CreateNote): Promise<Note> {
    return plainToInstance(Note, payload).save();
  }

  @Mutation(() => Note)
  async updateNote(@Payload() payload: UpdateNote): Promise<Note> {
    return Note.findOneAndUpdate(payload);
  }

  @Mutation(() => Note)
  async deleteNote(@Payload() payload: DeleteNote): Promise<Note> {
    const note = await Note.findOneOrFail(payload.id);
    return note.softRemove();
  }
}
