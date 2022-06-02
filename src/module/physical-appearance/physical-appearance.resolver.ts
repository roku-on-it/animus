import { Mutation, Resolver } from '@nestjs/graphql';
import { PhysicalAppearance } from './model/physical-appearance';
import { Payload } from '../shared/decorator/param/payload';
import { UpdatePhysicalAppearance } from './input/update-physical-appearance';
import { Authorize } from '../auth/decorator/authorize';
import { UserRole } from '../user/model/enum/user-role';
import { RateLimit } from '../misc/app-throttle/decorator/rate-limit';

@Resolver(() => PhysicalAppearance)
export class PhysicalAppearanceResolver {
  @Authorize(UserRole.User)
  @RateLimit(2, 10)
  @Mutation(() => PhysicalAppearance)
  async updatePhysicalAppearance(@Payload() payload: UpdatePhysicalAppearance) {
    return PhysicalAppearance.findOneAndUpdate(payload);
  }
}
