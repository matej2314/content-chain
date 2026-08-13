import { parseCorsOrigins, validateEnv } from './env.schema';

const valid = {
  NODE_ENV: 'development',
  PORT: '3001',
  DATABASE_URL: 'file:./chain.db',
  GATEWAY_BASE_URL: 'http://localhost:3100',
  GATEWAY_KEY: 'change-me-gateway-key',
  JWT_SECRET: 'change-me-jwt-secret',
  CORS_ORIGIN: 'http://localhost:3000',
};

describe('validateEnv', () => {
  it('parses a complete env object', () => {
    const env = validateEnv(valid);
    expect(env.PORT).toBe(3001);
    expect(env.MAX_CONCURRENT_RUNS).toBe(3);
    expect(env.GATEWAY_MODEL_ALIAS).toBe('chat-default');
  });

  it.each([
    'DATABASE_URL',
    'GATEWAY_BASE_URL',
    'GATEWAY_KEY',
    'JWT_SECRET',
    'CORS_ORIGIN',
  ] as const)('throws when %s is missing', (key) => {
    const { [key]: _, ...rest } = valid;
    expect(() => validateEnv(rest)).toThrow();
  });

  it('rejects CORS_ORIGIN=* in production', () => {
    expect(() =>
      validateEnv({ ...valid, NODE_ENV: 'production', CORS_ORIGIN: '*' }),
    ).toThrow();
  });
});

describe('parseCorsOrigins', () => {
  it('splits a comma-separated allowlist', () => {
    expect(
      parseCorsOrigins('http://localhost:3000, http://127.0.0.1:3000'),
    ).toEqual(['http://localhost:3000', 'http://127.0.0.1:3000']);
  });
});
