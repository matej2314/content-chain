import { z } from 'zod';

export const envSchema = z
  .object({
    NODE_ENV: z
      .enum(['development', 'production', 'test'])
      .default('development'),
    PORT: z.coerce.number().int().positive().default(3001),
    APP_PUBLIC_URL: z.string().url().optional(),
    DATABASE_URL: z.string().min(1),
    GATEWAY_BASE_URL: z.string().url(),
    GATEWAY_KEY: z.string().min(1),
    GATEWAY_MODEL_ALIAS: z.string().min(1).default('chat-default'),
    SSE_HEARTBEAT_MS: z.coerce.number().int().positive().default(25_000),
    RUN_SSE_SUBJECT_TTL_MS: z.coerce.number().int().positive().default(600_000),
    JWT_SECRET: z.string().min(1),
    JWT_ACCESS_TTL: z.string().min(1).default('15m'),
    JWT_REFRESH_TTL: z.string().min(1).default('1d'),
    CORS_ORIGIN: z.string().min(1),
    MAX_CONCURRENT_RUNS: z.coerce.number().int().positive().default(3),
    INVITE_TTL: z.string().min(1).default('7d'),
    ACTIVATION_TTL: z.string().min(1).default('7d'),
    REVIEW_TTL: z.string().min(1).default('2h'),
    REVIEW_SWEEP_INTERVAL: z.string().min(1).default('5m'),
    MAIL_FROM: z.string().min(1).optional(),
    SMTP_HOST: z.string().min(1).optional(),
    SMTP_PORT: z.coerce.number().int().positive().optional(),
    SMTP_USER: z.string().min(1).optional(),
    SMTP_PASS: z.string().min(1).optional(),
    DEMO_MODE: z
      .enum(['true', 'false'])
      .default('false')
      .transform((value) => value === 'true'),
    GUEST_GLOBAL_CAP_PER_DAY: z.coerce.number().int().positive().default(30),
    GUEST_RATING_CAP_PER_DAY: z.coerce.number().int().positive().default(10),
    REDIS_HOST: z.string().min(1).optional(),
    REDIS_PORT: z.coerce.number().int().positive().optional(),
    REDIS_PASSWORD: z.string().optional(),
  })
  .superRefine((value, ctx) => {
    if (value.NODE_ENV === 'production' && value.CORS_ORIGIN.trim() === '*') {
      ctx.addIssue({
        code: 'custom',
        path: ['CORS_ORIGIN'],
        message: 'CORS_ORIGIN cannot be * in production',
      });
    }
    if (value.DEMO_MODE === true) {
      const hasHostPort =
        value.REDIS_HOST !== undefined && value.REDIS_PORT !== undefined;
      if (!hasHostPort) {
        ctx.addIssue({
          code: 'custom',
          path: ['REDIS_HOST'],
          message: 'REDIS_HOST+REDIS_PORT is required when DEMO_MODE=true',
        });
      }
    }
    if (value.NODE_ENV !== 'production') {
      return;
    }
    const required: Array<[string, string | number | undefined]> = [
      ['APP_PUBLIC_URL', value.APP_PUBLIC_URL],
      ['MAIL_FROM', value.MAIL_FROM],
      ['SMTP_HOST', value.SMTP_HOST],
      ['SMTP_PORT', value.SMTP_PORT],
      ['SMTP_USER', value.SMTP_USER],
      ['SMTP_PASS', value.SMTP_PASS],
    ];
    for (const [path, field] of required) {
      if (field === undefined || field === '') {
        ctx.addIssue({
          code: 'custom',
          path: [path],
          message: `${path} is required in production`,
        });
      }
    }
  });

export type Env = z.infer<typeof envSchema>;

export function validateEnv(config: Record<string, unknown>): Env {
  return envSchema.parse(config);
}

export function parseCorsOrigins(corsOrigin: string): string[] {
  return corsOrigin
    .split(',')
    .map((item) => item.trim().replace(/^['"]|['"]$/g, ''))
    .filter((item) => item.length > 0);
}
