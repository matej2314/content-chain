export const ENV = Symbol('ENV');

/** Narrow env surface used by worker + shared lifecycle providers. */
export type RuntimeEnv = {
  NODE_ENV: 'development' | 'production' | 'test';
  DATABASE_URL: string;
  GATEWAY_BASE_URL: string;
  GATEWAY_KEY: string;
  GATEWAY_MODEL_ALIAS: string;
  MAX_CONCURRENT_RUNS: number;
  REVIEW_TTL: string;
  REVIEW_SWEEP_INTERVAL: string;
};
