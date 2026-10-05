import type { Env } from './env.schema';

export type RedisStandalone =
  | { readonly kind: 'url'; readonly url: string }
  | { readonly kind: 'host'; readonly host: string; readonly port: number };

export function resolveRedisStandalone(env: Env): RedisStandalone | null {
  if (env.REDIS_URL !== undefined && env.REDIS_URL.length > 0) {
    return { kind: 'url', url: env.REDIS_URL };
  }
  if (env.REDIS_HOST !== undefined && env.REDIS_PORT !== undefined) {
    return { kind: 'host', host: env.REDIS_HOST, port: env.REDIS_PORT };
  }
  return null;
}
