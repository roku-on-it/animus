import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';
import { User } from 'src/module/user/model/user';
import { GQLContext } from 'src/module/shared/interface/gql-context';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

export const roleCheck: FieldMiddleware = async (
  { info, context }: MiddlewareContext,
  next: NextFn,
) => {
  const {
    extensions: { role },
  } = info.parentType.getFields()[info.fieldName];
  const session = (context as GQLContext).req.session;

  if (null == session.userId) {
    throw new UnauthorizedException(
      'Must be logged in to access ' + info.fieldName,
    );
  }

  const user = await User.createQueryBuilder('user')
    .where({ id: session.userId })
    .select(['user.role', 'trueBlue.id'])
    .leftJoin('user.trueBlue', 'trueBlue')
    .getOne();

  if (null == user) {
    throw new NotFoundException();
  }

  if (null != user.trueBlue) {
    return next();
  }

  if (user.role < role) {
    return null;
  }

  return next();
};
