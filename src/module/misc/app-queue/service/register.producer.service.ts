import { ConflictException, Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { QueueType } from 'src/module/misc/app-queue/type/queue-type.enum';
import { JobType } from 'src/module/misc/app-queue/type/job-type.num';
import { CreateUser } from 'src/module/user/input/create-user';
import { User } from '../../../user/model/user';

@Injectable()
export class RegisterProducerService {
  constructor(@InjectQueue(QueueType.REGISTER) private queue: Queue) {}

  async addToRegisterQueue(data: CreateUser): Promise<User> {
    const queue = await this.queue.add(JobType.REGISTER, data, {
      backoff: 1000,
    });

    return queue
      .finished()
      .then((user: User) => {
        user.createdAt = new Date(user.createdAt);
        user.updatedAt = new Date(user.createdAt);

        return user;
      })
      .catch((error) => {
        if ('Conflict' === error.message) {
          throw new ConflictException();
        }

        throw error;
      });
  }
}
