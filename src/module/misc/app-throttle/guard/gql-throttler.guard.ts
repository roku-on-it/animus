import { ExecutionContext, Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { GqlExecutionContext, GraphQLArgumentsHost } from '@nestjs/graphql';

@Injectable()
export class GqlThrottlerGuard extends ThrottlerGuard {
  // Overriding the default error message.
  errorMessage = 'Too many requests';

  getRequestResponse(context: ExecutionContext) {
    const gqlCtx: GraphQLArgumentsHost = GqlExecutionContext.create(context);
    const ctx = gqlCtx.getContext();

    // Overriding the generateKey function to prevent generating md5 hash by default.
    this.generateKey = () => {
      const handlerName = context.getHandler().name;
      return handlerName + (ctx.req.session.userId ?? ctx.req.ip);
    };

    return { req: ctx.req, res: ctx.res };
  }
}
