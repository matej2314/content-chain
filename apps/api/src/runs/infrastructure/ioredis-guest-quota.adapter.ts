import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';
import { ENV, type Env } from '../../shared/config/env';
import { resolveRedisStandalone } from '../../shared/config/redis-connection';
import type {
  GuestQuotaAdmitResult,
  GuestQuotaPort,
} from '../domain/guest-quota.port';
import type { UserId } from '@content-chain/shared';

const RUNS_PREFIX = 'content-chain:guest:daily:runs:';
const RATINGS_PREFIX = 'content-chain:guest:daily:ratings:';

const REDIS_COMMAND_OPTIONS = {
  enableOfflineQueue: false,
  maxRetriesPerRequest: 1,
  connectTimeout: 1500,
} as const;

function utcDateKey(now: Date): string {
  return now.toISOString().slice(0, 10);
}

function msUntilNextMidnight(now: Date): number {
  const next = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + 1,
  );
  return Math.max(1, next - now.getTime());
}

function createRedis(env: Env): Redis {
  const standalone = resolveRedisStandalone(env);
  if (standalone === null) {
    throw new Error('Redis configuration missing.');
  }
  if (standalone.kind === 'url') {
    return new Redis(standalone.url, REDIS_COMMAND_OPTIONS);
  }
  return new Redis({
    host: standalone.host,
    port: standalone.port,
    ...REDIS_COMMAND_OPTIONS,
  });
}

@Injectable()
export class IoredisGuestQuotaAdapter
  implements GuestQuotaPort, OnModuleDestroy
{
  private readonly redis: Redis;

  constructor(@Inject(ENV) private readonly env: Env) {
    this.redis = createRedis(env);
  }

  onModuleDestroy(): void {
    this.redis.disconnect();
  }

  async tryAdmitDailyRun(
    cap: number,
    now: Date = new Date(),
  ): Promise<GuestQuotaAdmitResult> {
    return this.tryIncr(`${RUNS_PREFIX}${utcDateKey(now)}`, cap, now);
  }

  async releaseDailyRun(now: Date = new Date()): Promise<void> {
    try {
      await this.redis.decr(`${RUNS_PREFIX}${utcDateKey(now)}`);
    } catch {
      return;
    }
  }

  async tryAdmitDailyRating(
    userId: UserId,
    cap: number,
    now: Date = new Date(),
  ): Promise<GuestQuotaAdmitResult> {
    return this.tryIncr(
      `${RATINGS_PREFIX}${userId}:${utcDateKey(now)}`,
      cap,
      now,
    );
  }

  private async tryIncr(
    key: string,
    cap: number,
    now: Date,
  ): Promise<GuestQuotaAdmitResult> {
    try {
      const value = await this.redis.incr(key);
      if (value === 1) {
        await this.redis.pexpire(key, msUntilNextMidnight(now));
      }
      if (value > cap) {
        await this.redis.decr(key);
        return { kind: 'exceeded' };
      }
      return { kind: 'ok' };
    } catch {
      return { kind: 'unavailable' };
    }
  }
}
