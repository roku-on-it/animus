import Redis from 'ioredis';
import { Callback } from 'ioredis/built/types';

export interface ExtendedRedis extends Redis {
  ttls?(pattern: string, callback?: Callback<number[]>): Promise<number[]>;
}
