import { Field, ObjectType } from '@nestjs/graphql';
import { Note } from './note';

@ObjectType()
export class NoteList {
  @Field(() => [Note])
  items: Note[];

  @Field()
  total: number;
}
