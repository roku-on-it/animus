import {
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { TrueBlue } from './model/true-blue';
import { User } from '../user/model/user';
import { Payload } from '../shared/decorator/param/payload';
import { CreateTrueBlue } from './input/create-true-blue';
import { plainToInstance } from 'class-transformer';
import { DeleteTrueBlue } from './input/delete-true-blue';
import { Authorize } from '../auth/decorator/authorize';
import { UserRole } from '../user/model/enum/user-role';
import { CurrentUser } from '../shared/decorator/param/current-user';
import { ForbiddenException } from '@nestjs/common';
import { RateLimit } from '../misc/app-throttle/decorator/rate-limit';

@Resolver(() => TrueBlue)
export class TrueBlueResolver {
  @Authorize(UserRole.Root)
  @Query(() => [TrueBlue])
  async trueBlues(@CurrentUser() currentUser: User): Promise<TrueBlue[]> {
    // Checking if current user has True Blue privilege,
    // if not, findOneOrFail will throw an exception
    // which will prevent returning entities.

    await TrueBlue.withAuth.findOneOrFail({
      where: { user: currentUser.id },
      select: ['id'],
    });

    return TrueBlue.find({ loadRelationIds: true });
  }

  @Authorize(UserRole.Root)
  @RateLimit(1, 60 * 60)
  @Mutation(() => TrueBlue)
  async createTrueBlue(
    @CurrentUser() currentUser: User,
    @Payload() payload: CreateTrueBlue,
  ): Promise<TrueBlue> {
    const userTrueBlue = await TrueBlue.withAuth.findOneOrFail({
      where: { user: { id: currentUser.id } },
    });

    if (!userTrueBlue.hasTrueRootPrivilege) {
      throw new ForbiddenException('Insufficient permission');
    }

    const user = await User.findOneOrFail(payload.user.id);

    return plainToInstance(TrueBlue, { user }).save();
  }

  @Authorize(UserRole.Root)
  @RateLimit(2, 10)
  @Mutation(() => TrueBlue)
  async deleteTrueBlue(
    @CurrentUser() currentUser: User,
    @Payload() payload: DeleteTrueBlue,
  ): Promise<TrueBlue> {
    const currentUserTrueBlue = await TrueBlue.withAuth.findOneOrFail({
      where: { user: { id: currentUser.id } },
    });

    if (!currentUserTrueBlue.hasTrueRootPrivilege) {
      throw new ForbiddenException('Insufficient permission');
    }

    const trueBlueToBeDeleted = await TrueBlue.findOneOrFail(payload.id, {
      relations: ['user'],
    });

    if (
      trueBlueToBeDeleted.user.id === currentUser.id ||
      trueBlueToBeDeleted.hasTrueRootPrivilege
    ) {
      throw new ForbiddenException('Insufficient permission');
    }

    return trueBlueToBeDeleted.softRemove();
  }

  @ResolveField(() => User)
  async user(@Parent() trueBlue: TrueBlue): Promise<User> {
    return User.findOneOrFail(trueBlue.user);
  }
}
