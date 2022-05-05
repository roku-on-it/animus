import { Mutation, Resolver } from '@nestjs/graphql';
import { PhysicalAppearance } from './model/physical-appearance';
import { Payload } from '../shared/decorator/param/payload';
import { CreatePhysicalAppearance } from './input/create-physical-appearance';
import { plainToInstance } from 'class-transformer';
import { UpdatePhysicalAppearance } from './input/update-physical-appearance';
import { DeletePhysicalAppearance } from './input/delete-physical-appearance';
import { NotFoundException } from '@nestjs/common';

@Resolver(() => PhysicalAppearance)
export class PhysicalAppearanceResolver {
  @Mutation(() => PhysicalAppearance)
  async createPhysicalAppearance(@Payload() payload: CreatePhysicalAppearance) {
    return plainToInstance(PhysicalAppearance, payload)
      .save()
      .catch((error) => {
        if ('23503' === error.code) {
          throw new NotFoundException('Person not found');
        }

        throw error;
      });
  }

  @Mutation(() => PhysicalAppearance)
  async updatePhysicalAppearance(@Payload() payload: UpdatePhysicalAppearance) {
    return PhysicalAppearance.findOneAndUpdate(payload);
  }

  @Mutation(() => PhysicalAppearance)
  async deletePhysicalAppearance(@Payload() payload: DeletePhysicalAppearance) {
    const physicalAppearance = await PhysicalAppearance.findOneOrFail(
      payload.id,
    );

    return physicalAppearance.softRemove();
  }
}
