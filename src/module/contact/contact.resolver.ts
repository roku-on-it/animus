import { plainToInstance } from 'class-transformer';
import { CreateContact } from './input/create-contact';
import {
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Contact } from './model/contact';
import { Payload } from '../shared/decorator/param/payload';
import { UpdateContact } from './input/update-contact';
import { DeleteContact } from './input/delete-contact';
import { ContactList } from './model/contact-list';
import { ListContact } from './input/list-contact';
import { Person } from '../person/model/person';

@Resolver(() => Contact)
export class ContactResolver {
  @Query(() => ContactList)
  async contacts(
    @Payload('filter', true) filter: ListContact,
  ): Promise<ContactList> {
    return filter.find();
  }

  @Mutation(() => Contact)
  async createContact(@Payload() payload: CreateContact): Promise<Contact> {
    return plainToInstance(Contact, payload).save();
  }

  @Mutation(() => Contact)
  async updateContact(@Payload() payload: UpdateContact): Promise<Contact> {
    return Contact.findOneAndUpdate(payload);
  }

  @Mutation(() => Contact)
  async deleteContact(@Payload() payload: DeleteContact): Promise<Contact> {
    const contact = await Contact.findOneOrFail(payload.id);
    return contact.softRemove();
  }

  @ResolveField(() => Person)
  async person(@Parent() contact: Contact): Promise<Person> {
    return Person.findOneOrFail(contact.person);
  }
}
