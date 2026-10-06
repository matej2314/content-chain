import type { Env } from './env.schema';

export type RedisStandalone = {
  readonly host: string;
  readonly port: number;
  readonly password: string;
};

export function resolveRedisStandalone(env: Env): RedisStandalone | null {
  if (env.REDIS_HOST !== undefined && env.REDIS_PORT !== undefined) {
    return {
      host: env.REDIS_HOST,
      port: env.REDIS_PORT,
      password: env.REDIS_PASSWORD ?? '',
    };
  }
  return null;
}
