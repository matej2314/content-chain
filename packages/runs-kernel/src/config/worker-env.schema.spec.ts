import { validateWorkerEnv } from './worker-env.schema';

const valid: Record<string, unknown> = {
  NODE_ENV: 'development',
  DATABASE_URL: 'postgresql://cc:cc@127.0.0.1:5432/content_chain?schema=public',
  GATEWAY_BASE_URL: 'http://localhost:3100',
  GATEWAY_KEY: 'change-me-gateway-key',
  MAX_CONCURRENT_RUNS: '3',
  REVIEW_TTL: '2h',
  REVIEW_SWEEP_INTERVAL: '5m',
};

describe('validateWorkerEnv', () => {
  it('parses the worker subset into RuntimeEnv', () => {
    const env = validateWorkerEnv(valid);
    expect(env.DATABASE_URL).toContain('postgresql://');
    expect(env.MAX_CONCURRENT_RUNS).toBe(3);
    expect(env.REVIEW_TTL).toBe('2h');
    expect(env.REVIEW_SWEEP_INTERVAL).toBe('5m');
    expect(env.GATEWAY_MODEL_ALIAS).toBe('chat-default');
  });

  it('does not require CORS_ORIGIN or SMTP', () => {
    expect(() => validateWorkerEnv(valid)).not.toThrow();
  });

  it.each(['DATABASE_URL', 'GATEWAY_BASE_URL', 'GATEWAY_KEY'] as const)(
    'throws when %s is missing',
    (key) => {
      const { [key]: _, ...rest } = valid;
      expect(() => validateWorkerEnv(rest)).toThrow();
    },
  );

  it.each(['0', '-1'] as const)(
    'throws when MAX_CONCURRENT_RUNS is %s',
    (value) => {
      expect(() =>
        validateWorkerEnv({ ...valid, MAX_CONCURRENT_RUNS: value }),
      ).toThrow();
    },
  );

  it.each(['0', '-1h', ''] as const)(
    'throws when REVIEW_TTL is %s',
    (value) => {
      expect(() =>
        validateWorkerEnv({ ...valid, REVIEW_TTL: value }),
      ).toThrow();
    },
  );
});
