import {
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Address } from './model/address';
import { plainToInstance } from 'class-transformer';
import { Payload } from '../shared/decorator/param/payload';
import { CreateAddress } from './input/create-address';
import { UpdateAddress } from './input/update-address';
import { DeleteAddress } from './input/delete-address';
import { AddressList } from './model/address-list';
import { ListAddress } from './input/list-address';
import { Person } from '../person/model/person';

@Resolver(() => Address)
export class AddressResolver {
  @Query(() => AddressList)
  async addresses(
    @Payload('filter', true) filter: ListAddress,
  ): Promise<AddressList> {
    return filter.find();
  }

  @Mutation(() => Address)
  async createAddress(@Payload() payload: CreateAddress): Promise<Address> {
    return plainToInstance(Address, payload).save();
  }

  @Mutation(() => Address)
  async updateAddress(@Payload() payload: UpdateAddress): Promise<Address> {
    return Address.findOneAndUpdate(payload);
  }

  @Mutation(() => Address)
  async deleteAddress(@Payload() payload: DeleteAddress): Promise<Address> {
    const address = await Address.findOneOrFail(payload.id);
    return address.softRemove();
  }

  @ResolveField(() => Person)
  async person(@Parent() address: Address): Promise<Person> {
    return Person.findOneOrFail(address.person);
  }
}
