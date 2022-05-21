import { Context, Mutation, Parent, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/module/user/model/user';
import { CurrentUser } from 'src/module/shared/decorator/param/current-user';
import { UpdateUser } from 'src/module/user/input/update-user';
import { ListUser } from 'src/module/user/input/list-user';
import { DeleteUser } from 'src/module/user/input/delete-user';
import { ForbiddenException } from '@nestjs/common';
import { UpdateMyPassword } from 'src/module/user/input/update-my-password';
import { plainToClassFromExist } from 'class-transformer';
import { AuthService } from 'src/module/auth/service/auth.service';
import { hash } from 'bcrypt';
import { Payload } from 'src/module/shared/decorator/param/payload';
import { Id } from 'src/module/shared/decorator/param/id';
import { UpdateMe } from 'src/module/user/input/update-me';
import { RateLimit } from 'src/module/misc/app-throttle/decorator/rate-limit';
import { GQLContext } from 'src/module/shared/interface/gql-context';
import { UserList } from 'src/module/user/model/user-list';
import { Authorize } from '../auth/decorator/authorize';
import { UserRole } from './model/enum/user-role';
import { DeleteMe } from './input/delete-me';
import { PersonList } from '../person/model/person-list';
import { ListPerson } from '../person/input/list-person';
import { ProtectedResolveField } from '../shared/decorator/method/protected-resolve-field';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly authService: AuthService) {}

  @Authorize(UserRole.User)
  @Query(() => User)
  async user(@Id() id: number): Promise<User> {
    return User.findOneOrFail({ id });
  }

  @Authorize(UserRole.User)
  @Query(() => UserList)
  async users(@Payload('filter', true) filter: ListUser): Promise<UserList> {
    return filter.find();
  }

  @Authorize(UserRole.Root)
  @RateLimit(10, 20)
  @Mutation(() => User)
  async updateUser(
    @CurrentUser() currentUser: User,
    @Payload() payload: UpdateUser,
  ): Promise<User> {
    const user = await User.findOneOrFail(payload.id);

    if (currentUser.role <= user.role || currentUser.role <= payload.role) {
      throw new ForbiddenException('Insufficient permission');
    }

    return User.findOneAndUpdate(payload);
  }

  @Authorize(UserRole.Root)
  @RateLimit(2, 10)
  @Mutation(() => User)
  async deleteUser(
    @CurrentUser() currentUser: User,
    @Payload() payload: DeleteUser,
  ): Promise<User> {
    const user = await User.findOneOrFail(payload.id, {
      relations: ['persons', 'trueBlue'],
    });

    if (currentUser.role <= user.role) {
      throw new ForbiddenException('Insufficient permission');
    }

    return user.softRemove();
  }

  // Current user's query & mutations
  @Query(() => User)
  async me(@CurrentUser() currentUser: User): Promise<User> {
    return currentUser;
  }

  @RateLimit(2, 10)
  @Mutation(() => User)
  async updateMyPassword(
    @CurrentUser() currentUser: User,
    @Payload() payload: UpdateMyPassword,
  ): Promise<User> {
    const passMatch = await this.authService.comparePasswords(
      payload.password,
      currentUser.password,
    );

    if (!passMatch) {
      throw new ForbiddenException();
    }

    const newPassword = await hash(payload.newPassword, 12);

    return plainToClassFromExist(currentUser, {
      password: newPassword,
    }).save();
  }

  @Mutation(() => User)
  async deleteMe(
    @CurrentUser() currentUser: User,
    @Context() context: GQLContext,
    @Payload() payload: DeleteMe,
  ): Promise<User> {
    const passMatch = await this.authService.comparePasswords(
      payload.password,
      currentUser.password,
    );

    if (!passMatch) {
      throw new ForbiddenException('Wrong password');
    }

    await this.authService.logoutAndDestroySession(context);
    return currentUser.softRemove();
  }

  // @RateLimit(3, 60)
  @Mutation(() => User)
  async updateMe(
    @CurrentUser() currentUser: User,
    @Payload() payload: UpdateMe,
  ): Promise<User> {
    return plainToClassFromExist(currentUser, payload).save();
  }

  @ProtectedResolveField(() => PersonList)
  async persons(
    @Parent() createdBy: User,
    @Payload('filter', true) filter: ListPerson,
  ): Promise<PersonList> {
    return filter.find({
      where: { createdBy },
      loadRelationIds: true,
    });
  }
}
