import { parseCorsOrigins, validateEnv } from './env.schema';

const valid: Record<string, unknown> = {
  NODE_ENV: 'development',
  PORT: '3001',
  DATABASE_URL: 'file:./chain.db',
  GATEWAY_BASE_URL: 'http://localhost:3100',
  GATEWAY_KEY: 'change-me-gateway-key',
  JWT_SECRET: 'change-me-jwt-secret',
  CORS_ORIGIN: 'http://localhost:3000',
};

const productionInvite: Record<string, unknown> = {
  APP_PUBLIC_URL: 'https://app.example.com',
  MAIL_FROM: 'noreply@example.com',
  SMTP_HOST: 'smtp.example.com',
  SMTP_PORT: '587',
  SMTP_USER: 'mail',
  SMTP_PASS: 'change-me',
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

  it('defaults INVITE_TTL to 7d', () => {
    expect(validateEnv(valid).INVITE_TTL).toBe('7d');
  });

  it('does not require SMTP in development', () => {
    expect(() => validateEnv(valid)).not.toThrow();
  });

  it('does not require SMTP in test', () => {
    expect(() => validateEnv({ ...valid, NODE_ENV: 'test' })).not.toThrow();
  });

  it('requires SMTP, MAIL_FROM and APP_PUBLIC_URL in production', () => {
    expect(() =>
      validateEnv({ ...valid, NODE_ENV: 'production' }),
    ).toThrow();
  });

  it('parses production when invite SMTP fields are set', () => {
    const env = validateEnv({
      ...valid,
      ...productionInvite,
      NODE_ENV: 'production',
    });
    expect(env.INVITE_TTL).toBe('7d');
    expect(env.APP_PUBLIC_URL).toBe('https://app.example.com');
    expect(env.MAIL_FROM).toBe('noreply@example.com');
    expect(env.SMTP_HOST).toBe('smtp.example.com');
    expect(env.SMTP_PORT).toBe(587);
  });

  it('rejects CORS_ORIGIN=* in production', () => {
    expect(() =>
      validateEnv({
        ...valid,
        ...productionInvite,
        NODE_ENV: 'production',
        CORS_ORIGIN: '*',
      }),
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
