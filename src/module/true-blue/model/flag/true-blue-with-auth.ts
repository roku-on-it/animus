import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { FluentFlag } from '../../../shared/interface/fluent-flag';
import { TrueBlue } from '../true-blue';

export class TrueBlueWithAuth implements FluentFlag {
  static findOneOrFail(...args): Promise<TrueBlue> {
    return TrueBlue.findOneOrFail(...args).catch((error) => {
      if (error instanceof NotFoundException) {
        throw new ForbiddenException();
      }

      throw error;
    });
  }
}
