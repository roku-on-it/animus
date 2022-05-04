import {
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Person } from './model/person';
import { plainToInstance } from 'class-transformer';
import { Payload } from '../shared/decorator/param/payload';
import { CreatePerson } from './input/create-person';
import { Id } from '../shared/decorator/param/id';
import { ListPerson } from './input/list-person';
import { CurrentUser } from '../shared/decorator/param/current-user';
import { User } from '../user/model/user';
import { PersonList } from './model/person-list';

@Resolver(() => Person)
export class PersonResolver {
  @Query(() => Person)
  async person(@Id() id): Promise<Person> {
    return Person.findOneOrFail({ id }, { loadRelationIds: true });
  }

  @Query(() => PersonList)
  async persons(
    @Payload('filter', true) filter: ListPerson,
  ): Promise<PersonList> {
    return filter.find();
  }

  @Mutation(() => Person)
  createPerson(
    @CurrentUser() createdBy: User,
    @Payload() payload: CreatePerson,
  ): Promise<Person> {
    return plainToInstance(Person, { createdBy, ...payload }).save();
  }

  @ResolveField(() => [Person])
  async acquaintances(@Parent() { id }: Person): Promise<Person[]> {
    const person = await Person.findOneOrFail(
      { id },
      { relations: ['acquaintances'] },
    );

    return person.acquaintances;
  }

  @ResolveField(() => User)
  async createdBy(@Parent() person: Person): Promise<User> {
    return User.findOneOrFail(person.createdBy);
  }
}
