import { Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from 'src/module/auth/service/auth.service';
import { User } from 'src/module/user/model/user';
import { CreateUser } from 'src/module/user/input/create-user';
import { LoginInput } from 'src/module/auth/input/login-input';
import { RegisterProducerService } from 'src/module/auth/service/register.producer.service';
import { GQLContext } from 'src/module/shared/interface/gql-context';
import { Payload } from 'src/module/shared/decorator/param/payload';
import { Authorize } from 'src/module/auth/decorator/authorize';
import { RateLimit } from 'src/module/misc/app-throttle/decorator/rate-limit';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly registerService: RegisterProducerService,
  ) {}

  @Mutation(() => User)
  @RateLimit(3, 15) // limit: 3, ttl: 15
  async register(@Payload() payload: CreateUser): Promise<User> {
    return this.registerService.addToRegisterQueue(payload);
  }

  @Mutation(() => User)
  @RateLimit(5, 15)
  async login(
    @Payload() payload: LoginInput,
    @Context() { req }: GQLContext,
  ): Promise<User> {
    return this.authService.validate(payload).then((user) => {
      req.session.userId = user.id;
      return user;
    });
  }

  @Mutation(() => Boolean)
  @Authorize()
  async logout(@Context() context: GQLContext): Promise<boolean> {
    return this.authService.logoutAndDestroySession(context);
  }
}
