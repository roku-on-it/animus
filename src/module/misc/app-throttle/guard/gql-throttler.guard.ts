import { ExecutionContext, Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { GqlExecutionContext } from '@nestjs/graphql';
import { TrueBlue } from '../../../true-blue/model/true-blue';

@Injectable()
export class GqlThrottlerGuard extends ThrottlerGuard {
  // Overriding the default error message.
  errorMessage = 'Too many requests';

  protected async handleRequest(context: ExecutionContext, limit, ttl) {
    const ctx = GqlExecutionContext.create(context).getContext();
    const identifier = ctx.req.session.userId;

    if (null != identifier) {
      const trueBlue = await TrueBlue.findOne({
        where: {
          user: identifier,
        },
        select: ['id'],
      });

      if (null != trueBlue) {
        return true;
      }
    }

    const key = context.getHandler().name + (identifier ?? ctx.req.ip);
    const ttls = await this.storageService.getRecord(key);
    const nearestExpiryTime = 0 !== ttls.length ? Math.min(...ttls) : ttl;

    if (ttls.length >= limit) {
      ctx.res.header('X-Retry-After', nearestExpiryTime);
      this.throwThrottlingException(context);
    }

    ctx.res.header(this.headerPrefix + '-Remaining', limit - ttls.length - 1);
    ctx.res.header(this.headerPrefix + '-Reset', nearestExpiryTime);

    await this.storageService.addRecord(key, ttl);

    return true;
  }
}
