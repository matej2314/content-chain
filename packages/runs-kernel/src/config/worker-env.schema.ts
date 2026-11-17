import { z } from 'zod';
import { parseTtlMs } from '@content-chain/shared';
import type { RuntimeEnv } from './env.token';

/**
 * Narrow env for apps/worker — no CORS / SMTP / JWT surface.
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

export function validateWorkerEnv(
  config: Record<string, unknown>,
): RuntimeEnv {
  const parsed = workerEnvSchema.parse(config);
  return {
    NODE_ENV: parsed.NODE_ENV,
    DATABASE_URL: parsed.DATABASE_URL,
    GATEWAY_BASE_URL: parsed.GATEWAY_BASE_URL,
    GATEWAY_KEY: parsed.GATEWAY_KEY,
    GATEWAY_MODEL_ALIAS: parsed.GATEWAY_MODEL_ALIAS,
    MAX_CONCURRENT_RUNS: parsed.MAX_CONCURRENT_RUNS,
    REVIEW_TTL: parsed.REVIEW_TTL,
    REVIEW_SWEEP_INTERVAL: parsed.REVIEW_SWEEP_INTERVAL,
  };
}
