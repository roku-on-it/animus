import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { FluentFlag } from '../../../shared/interface/fluent-flag';
import { User } from '../user';

export class UserWithAuth implements FluentFlag {
  static findOneOrFail(...args) {
    return User.findOneOrFail(...args).catch((error) => {
      if (error instanceof NotFoundException) {
        throw new ForbiddenException();
      }

      throw error;
    });
  }
}
