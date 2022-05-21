import { Mutation, Resolver } from '@nestjs/graphql';
import { Identity } from './model/identity';
import { Payload } from '../shared/decorator/param/payload';
import { UpdateIdentity } from './input/update-identity';

@Resolver(() => Identity)
export class IdentityResolver {
  @Mutation(() => Identity)
  async updateIdentity(@Payload() payload: UpdateIdentity) {
    return Identity.findOneAndUpdate(payload);
  }
}
