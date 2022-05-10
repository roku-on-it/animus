import { Mutation, Resolver } from '@nestjs/graphql';
import { PhysicalAppearance } from './model/physical-appearance';
import { Payload } from '../shared/decorator/param/payload';
import { UpdatePhysicalAppearance } from './input/update-physical-appearance';

@Resolver(() => PhysicalAppearance)
export class PhysicalAppearanceResolver {
  @Mutation(() => PhysicalAppearance)
  async updatePhysicalAppearance(@Payload() payload: UpdatePhysicalAppearance) {
    return PhysicalAppearance.findOneAndUpdate(payload);
  }
}
