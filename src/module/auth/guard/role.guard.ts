import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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

    const user = await User.createQueryBuilder('user')
      .where({ id: session.userId })
      .select(['user.role', 'trueBlue.hasTrueRootPrivilege'])
      .leftJoin('user.trueBlue', 'trueBlue') // bar is the joined table
      .getOne();

    if (null == user) {
      throw new UnauthorizedException();
    }

    return user.role >= role ?? user.trueBlue.hasTrueRootPrivilege;
  }
}
