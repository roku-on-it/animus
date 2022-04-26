import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserRole } from 'src/module/user/model/enum/user-role';
import { User } from 'src/module/user/model/user';
import { Session } from 'src/module/shared/interface/gql-context';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const role = this.reflector.get<UserRole>('role', context.getHandler());
    const session: Session =
      GqlExecutionContext.create(context).getContext().req.session;

    if (null == role) {
      return null != session.userId;
    }

    if (null == session.userId) {
      return false;
    }

    const user = await User.withAuth.findOneOrFail(
      { id: session.userId },
      { select: ['role'] },
    );

    return user.role >= role;
  }
}
