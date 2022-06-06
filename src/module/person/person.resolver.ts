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
import { ListPerson } from './input/list/list-person';
import { CurrentUser } from '../shared/decorator/param/current-user';
import { User } from '../user/model/user';
import { PersonList } from './model/person-list';
import { DeletePerson } from './input/delete-person';
import { UpdatePerson } from './input/update-person';
import { PersonService } from './service/person.service';
import { PhysicalAppearance } from '../physical-appearance/model/physical-appearance';
import { Identity } from '../identity/model/identity';
import { Address } from '../address/model/address';
import { Note } from '../note/model/note';
import { Contact } from '../contact/model/contact';
import { LastKnownPlace } from '../last-known-place/model/last-known-place';
import { SocialProfile } from '../social-profile/model/social-profile';
import { Authorize } from '../auth/decorator/authorize';
import { UserRole } from '../user/model/enum/user-role';
import { RateLimit } from '../misc/app-throttle/decorator/rate-limit';

@Resolver(() => Person)
export class PersonResolver {
  constructor(private personService: PersonService) {}

  @Authorize(UserRole.Guest)
  @Query(() => Person)
  async person(@Id() id): Promise<Person> {
    return Person.findOneOrFail({ id }, { loadRelationIds: true });
  }

  @Authorize(UserRole.Guest)
  @Query(() => PersonList)
  async persons(
    @Payload('filter', true) filter: ListPerson,
  ): Promise<PersonList> {
    return filter.find();
  }

  @Authorize(UserRole.User)
  @RateLimit(2, 60)
  @Mutation(() => Person)
  async createPerson(
    @CurrentUser() createdBy: User,
    @Payload() payload: CreatePerson,
  ): Promise<Person> {
    return plainToInstance(Person, { createdBy, ...payload }).save();
  }

  @Authorize(UserRole.Root)
  @RateLimit(2, 10)
  @Mutation(() => Person)
  async updatePerson(@Payload() payload: UpdatePerson): Promise<Person> {
    if (null != payload.actions) {
      await this.personService.handleActions(payload);
    }

    return Person.findOneAndUpdate(payload);
  }

  @Authorize(UserRole.Root)
  @RateLimit(1, 60)
  @Mutation(() => Person)
  async deletePerson(@Payload() payload: DeletePerson): Promise<Person> {
    const person = await Person.findOneOrFail(payload.id);

    return person.softRemove();
  }

  @Authorize(UserRole.Guest)
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

  @ResolveField(() => [Address])
  async addresses(@Parent() person: Person): Promise<Address[]> {
    return Address.find({ where: { person }, loadRelationIds: true });
  }

  @ResolveField(() => [Note])
  async notes(@Parent() person: Person): Promise<Note[]> {
    return Note.find({ where: { person }, loadRelationIds: true });
  }

  @ResolveField(() => [Contact])
  async contacts(@Parent() person: Person): Promise<Contact[]> {
    return Contact.find({ where: { person }, loadRelationIds: true });
  }

  @ResolveField(() => [LastKnownPlace])
  async lastKnownPlaces(@Parent() person: Person): Promise<LastKnownPlace[]> {
    return LastKnownPlace.find({ where: { person }, loadRelationIds: true });
  }

  @ResolveField(() => [SocialProfile])
  async socialProfiles(@Parent() person: Person): Promise<SocialProfile[]> {
    return SocialProfile.find({ where: { person }, loadRelationIds: true });
  }
}
