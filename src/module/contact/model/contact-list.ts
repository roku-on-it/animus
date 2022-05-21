import { Field, ObjectType } from '@nestjs/graphql';
import { Contact } from './contact';

@ObjectType()
export class ContactList {
  @Field(() => [Contact])
  items: Contact[];

  @Field()
  total: number;
}
