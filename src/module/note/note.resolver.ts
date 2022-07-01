import {
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Note } from './model/note';
import { Payload } from '../shared/decorator/param/payload';
import { plainToInstance } from 'class-transformer';
import { CreateNote } from './input/create-note';
import { UpdateNote } from './input/update-note';
import { DeleteNote } from './input/delete-note';
import { NoteList } from './model/note-list';
import { ListNote } from './input/list/list-note';
import { Authorize } from '../auth/decorator/authorize';
import { UserRole } from '../user/model/enum/user-role';
import { RateLimit } from '../misc/app-throttle/decorator/rate-limit';
import { Person } from '../person/model/person';

@Resolver(() => Note)
export class NoteResolver {
  @Authorize(UserRole.Guest)
  @Query(() => NoteList)
  async notes(@Payload('filter', true) filter: ListNote): Promise<NoteList> {
    return filter.find();
  }

  @Authorize(UserRole.User)
  @RateLimit(5, 30)
  @Mutation(() => Note)
  async createNote(@Payload() payload: CreateNote): Promise<Note> {
    return plainToInstance(Note, payload).save();
  }

  @Authorize(UserRole.User)
  @RateLimit(5, 30)
  @Mutation(() => Note)
  async updateNote(@Payload() payload: UpdateNote): Promise<Note> {
    return Note.findOneAndUpdate(payload);
  }

  @Authorize(UserRole.Root)
  @RateLimit(5, 30)
  @Mutation(() => Note)
  async deleteNote(@Payload() payload: DeleteNote): Promise<Note> {
    const note = await Note.findOneOrFail(payload.id);
    return note.softRemove();
  }

  @ResolveField(() => Person)
  async person(@Parent() note: Note): Promise<Person> {
    return Person.findOneOrFail(note.person);
  }
}
