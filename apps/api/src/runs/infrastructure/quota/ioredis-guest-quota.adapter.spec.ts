import { validateEnv } from '../../../shared/config/env.schema';
import { IoredisGuestQuotaAdapter } from './ioredis-guest-quota.adapter';

const mockIncr = jest.fn(async (_key: string): Promise<number> => 0);
const mockDecr = jest.fn(async (_key: string): Promise<number> => 0);
const mockPexpire = jest.fn(
  async (_key: string, _milliseconds: number): Promise<number> => 1,
);
const mockDisconnect = jest.fn((): void => undefined);

jest.mock('ioredis', () =>
  jest.fn().mockImplementation(() => ({
    incr: mockIncr,
    decr: mockDecr,
    pexpire: mockPexpire,
    disconnect: mockDisconnect,
  })),
);

const TEST_ENV = validateEnv({
  NODE_ENV: 'test',
  DATABASE_URL: 'file:./test.db',
  GATEWAY_BASE_URL: 'http://localhost:3100',
  GATEWAY_KEY: 'test-gateway-key',
  JWT_SECRET: 'test-jwt-secret',
  CORS_ORIGIN: 'http://localhost:3000',
  REDIS_HOST: '127.0.0.1',
  REDIS_PORT: '6379',
});

const NOW = new Date('2026-10-03T12:00:00.000Z');
const RUNS_KEY = 'content-chain:guest:daily:runs:2026-10-03';

describe('IoredisGuestQuotaAdapter', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns unavailable when incr throws', async () => {
    mockIncr.mockRejectedValueOnce(new Error('down'));
    const adapter = new IoredisGuestQuotaAdapter(TEST_ENV);

    await expect(adapter.tryAdmitDailyRun(30, NOW)).resolves.toEqual({
      kind: 'unavailable',
    });

    expect(mockDecr).not.toHaveBeenCalled();
    adapter.onModuleDestroy();
  });

  it('returns exceeded and decrs when incr is above cap', async () => {
    mockIncr.mockResolvedValueOnce(31);
    mockDecr.mockResolvedValueOnce(30);
    const adapter = new IoredisGuestQuotaAdapter(TEST_ENV);

    await expect(adapter.tryAdmitDailyRun(30, NOW)).resolves.toEqual({
      kind: 'exceeded',
    });

    expect(mockIncr).toHaveBeenCalledWith(RUNS_KEY);
    expect(mockDecr).toHaveBeenCalledWith(RUNS_KEY);
    expect(mockPexpire).not.toHaveBeenCalled();
    adapter.onModuleDestroy();
  });

  it('uses UTC date in the daily runs key', async () => {
    mockIncr.mockResolvedValueOnce(1);
    mockPexpire.mockResolvedValueOnce(1);
    const adapter = new IoredisGuestQuotaAdapter(TEST_ENV);

    await expect(adapter.tryAdmitDailyRun(30, NOW)).resolves.toEqual({
      kind: 'ok',
    });

    expect(mockIncr).toHaveBeenCalledWith(RUNS_KEY);
    adapter.onModuleDestroy();
  });
});
