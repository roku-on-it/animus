import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { FluentFlag } from '../../../shared/interface/fluent-flag';
import { User } from '../user';

export class UserWithAuth implements FluentFlag {
  static findOneOrFail(...args): Promise<User> {
    return User.findOneOrFail(...args).catch((error) => {
      if (error instanceof NotFoundException) {
        throw new UnauthorizedException();
      }

      throw error;
    });
  }
}
