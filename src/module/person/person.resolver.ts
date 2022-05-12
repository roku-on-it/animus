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
import { DeletePerson } from './input/delete-person';
import { UpdatePerson } from './input/update-person';
import { AddAcquaintance } from './input/add-acquaintance';
import { PersonService } from './service/person.service';
import { RemoveAcquaintance } from './input/remove-acquaintance';
import { PhysicalAppearance } from '../physical-appearance/model/physical-appearance';
import { Identity } from '../identity/model/identity';

@Resolver(() => Person)
export class PersonResolver {
  constructor(private personService: PersonService) {}

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
  async createPerson(
    @CurrentUser() createdBy: User,
    @Payload() payload: CreatePerson,
  ): Promise<Person> {
    return plainToInstance(Person, { createdBy, ...payload }).save();
  }

  @Mutation(() => Person)
  async updatePerson(@Payload() payload: UpdatePerson): Promise<Person> {
    return Person.findOneAndUpdate(payload);
  }

  @Mutation(() => Person)
  async deletePerson(@Payload() payload: DeletePerson): Promise<Person> {
    const person = await Person.findOneOrFail(payload.id);
    return person.softRemove();
  }

  @Mutation(() => Person)
  async addAcquaintance(@Payload() payload: AddAcquaintance): Promise<Person> {
    return this.personService.addAcquaintance(payload);
  }

  @Mutation(() => Person)
  async removeAcquaintance(
    @Payload() payload: RemoveAcquaintance,
  ): Promise<Person> {
    return this.personService.removeAcquaintance(payload);
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

  @ResolveField(() => PhysicalAppearance)
  async physicalAppearance(
    @Parent() person: Person,
  ): Promise<PhysicalAppearance> {
    return PhysicalAppearance.findOneOrFail({
      where: { person },
    });
  }

  @ResolveField(() => Identity)
  async identity(@Parent() person: Person): Promise<Identity> {
    return Identity.findOneOrFail({
      where: { person },
    });
  }
}
