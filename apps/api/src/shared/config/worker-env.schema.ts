import { z } from 'zod';
import { parseTtlMs } from '@content-chain/shared';
import type { Env } from './env.schema';

/**
 * Narrow env for apps/worker — no CORS / SMTP / JWT surface.
 * Returns full `Env` with safe fillers so shared providers keep typing.
 */
const workerEnvInputSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  DATABASE_URL: z.string().min(1),
  GATEWAY_BASE_URL: z.string().url(),
  GATEWAY_KEY: z.string().min(1),
  GATEWAY_MODEL_ALIAS: z.string().min(1).default('chat-default'),
  MAX_CONCURRENT_RUNS: z.coerce.number().int().positive().default(3),
  REVIEW_TTL: z.string().min(1).default('2h'),
  REVIEW_SWEEP_INTERVAL: z.string().min(1).default('5m'),
});

function assertPositiveTtl(
  ttl: string,
  path: 'REVIEW_TTL' | 'REVIEW_SWEEP_INTERVAL',
  ctx: z.RefinementCtx,
): void {
  const ms = parseTtlMs(ttl);
  if (!Number.isFinite(ms) || ms <= 0) {
    ctx.addIssue({
      code: 'custom',
      path: [path],
      message: `Invalid TTL string: ${ttl}`,
    });
  }
}

export const workerEnvSchema = workerEnvInputSchema.superRefine((value, ctx) => {
  assertPositiveTtl(value.REVIEW_TTL, 'REVIEW_TTL', ctx);
  assertPositiveTtl(value.REVIEW_SWEEP_INTERVAL, 'REVIEW_SWEEP_INTERVAL', ctx);
});

export type WorkerEnvInput = z.infer<typeof workerEnvInputSchema>;

/** Map worker subset → `Env` with fillers for unused api-only keys. */
export function validateWorkerEnv(config: Record<string, unknown>): Env {
  const parsed = workerEnvSchema.parse(config);
  return {
    NODE_ENV: parsed.NODE_ENV,
    PORT: 0,
    APP_PUBLIC_URL: undefined,
    DATABASE_URL: parsed.DATABASE_URL,
    GATEWAY_BASE_URL: parsed.GATEWAY_BASE_URL,
    GATEWAY_KEY: parsed.GATEWAY_KEY,
    GATEWAY_MODEL_ALIAS: parsed.GATEWAY_MODEL_ALIAS,
    SSE_HEARTBEAT_MS: 25_000,
    RUN_SSE_SUBJECT_TTL_MS: 600_000,
    JWT_SECRET: 'unused-in-worker',
    JWT_ACCESS_TTL: '15m',
    JWT_REFRESH_TTL: '1d',
    CORS_ORIGIN: 'http://localhost',
    MAX_CONCURRENT_RUNS: parsed.MAX_CONCURRENT_RUNS,
    MAX_USER_IN_FLIGHT_RUNS: 3,
    INVITE_TTL: '7d',
    ACTIVATION_TTL: '7d',
    EMAIL_CHANGE_TTL: '24h',
    REVIEW_TTL: parsed.REVIEW_TTL,
    REVIEW_SWEEP_INTERVAL: parsed.REVIEW_SWEEP_INTERVAL,
    MAIL_FROM: undefined,
    SMTP_HOST: undefined,
    SMTP_PORT: undefined,
    SMTP_USER: undefined,
    SMTP_PASS: undefined,
    DEMO_MODE: false,
    GUEST_GLOBAL_CAP_PER_DAY: 30,
    GUEST_RATING_CAP_PER_DAY: 10,
    REDIS_HOST: undefined,
    REDIS_PORT: undefined,
    REDIS_PASSWORD: undefined,
  };
}
