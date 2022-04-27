import { Injectable } from '@nestjs/common';
import Redis, { RedisOptions } from 'ioredis';
import { ThrottlerStorage } from '@nestjs/throttler';
import { ExtendedRedis } from '../interface/extended-redis';

@Injectable()
export class ThrottlerStorageRedisService implements ThrottlerStorage {
  redis: ExtendedRedis;
  storage: Record<string, number[]>;

  constructor(options: RedisOptions) {
    this.redis = new Redis(options);

    this.redis.defineCommand('ttls', {
      numberOfKeys: 1,
      lua: `
      local keys = redis.call('SCAN', 0, 'MATCH', KEYS[1],'COUNT', 100);
      local result = {}
      for i,k in ipairs(keys[2]) do 
        local ttl = redis.call('ttl', k)
        result[i] = ttl
       end
      return result
      `,
    });
  }

  async getRecord(key: string): Promise<number[]> {
    return this.redis.ttls(key + ':*');
  }

  async addRecord(key: string, ttl: number): Promise<void> {
    await this.redis.set(key + ':' + Date.now(), '', 'EX', ttl);
  }
}
