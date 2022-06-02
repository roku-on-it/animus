import { Mutation, Resolver } from '@nestjs/graphql';
import { Identity } from './model/identity';
import { Payload } from '../shared/decorator/param/payload';
import { UpdateIdentity } from './input/update-identity';
import { Authorize } from '../auth/decorator/authorize';
import { UserRole } from '../user/model/enum/user-role';
import { RateLimit } from '../misc/app-throttle/decorator/rate-limit';

@Resolver(() => Identity)
export class IdentityResolver {
  @Authorize(UserRole.User)
  @RateLimit(2, 10)
  @Mutation(() => Identity)
  async updateIdentity(@Payload() payload: UpdateIdentity) {
    return Identity.findOneAndUpdate(payload);
  }
}
