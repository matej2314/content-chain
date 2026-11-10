const {
  e2eEnvPath,
  isCi,
  loadDotEnv,
  assertTestDatabaseUrl,
} = require('./e2e-env.cjs') as {
  e2eEnvPath: string;
  isCi: () => boolean;
  loadDotEnv: (
    filePath: string,
    options?: { override?: boolean },
  ) => boolean;
  assertTestDatabaseUrl: (
    databaseUrl: string,
    options?: { ci?: boolean },
  ) => void;
};

process.env.NODE_ENV = 'test';

const ci = isCi();

if (!ci) {
  const loaded = loadDotEnv(e2eEnvPath, { override: true });
  if (!loaded) {
    throw new Error(
      `Missing ${e2eEnvPath}. Copy apps/api/.env.test.example → apps/api/.env.test.`,
    );
  }
}

assertTestDatabaseUrl(process.env.DATABASE_URL ?? '', { ci });

process.env.PORT ??= '3001';
process.env.GATEWAY_BASE_URL ??= 'http://127.0.0.1:3100';
process.env.GATEWAY_KEY ??= 'test-gateway-key';
process.env.GATEWAY_MODEL_ALIAS ??= 'chat-default';
process.env.JWT_SECRET ??= 'test-jwt-secret';
process.env.JWT_ACCESS_TTL ??= '15m';
process.env.JWT_REFRESH_TTL ??= '7d';
process.env.CORS_ORIGIN ??= 'http://localhost:3000';
process.env.MAX_CONCURRENT_RUNS ??= '3';
process.env.MAX_USER_IN_FLIGHT_RUNS ??= '3';
