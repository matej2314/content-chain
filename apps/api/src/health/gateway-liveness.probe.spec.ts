import { validateEnv } from '../shared/config/env.schema';
import {
  GATEWAY_PROBE_TIMEOUT_MS,
  GatewayLivenessProbe,
} from './gateway-liveness.probe';

const TEST_ENV = validateEnv({
  DATABASE_URL: 'postgresql://user:pass@localhost:5432/db',
  GATEWAY_BASE_URL: 'http://127.0.0.1:3100',
  GATEWAY_KEY: 'test-gateway-key',
  JWT_SECRET: 'test-jwt-secret-at-least-32-chars!!',
  CORS_ORIGIN: 'http://localhost:3000',
});

describe('GatewayLivenessProbe', () => {
  const originalFetch = global.fetch;
  let probe: GatewayLivenessProbe;

  beforeEach(() => {
    probe = new GatewayLivenessProbe(TEST_ENV);
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('returns ok on HTTP 2xx with sensible liveness body and no gateway key header', async () => {
    const fetchMock = jest.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          status: 'healthy',
          timestamp: '2026-10-03T10:00:00.000Z',
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      ),
    );
    global.fetch = fetchMock;

    await expect(probe.probe()).resolves.toEqual({ ok: true });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe('http://127.0.0.1:3100/api/v1/health');
    expect(init.method).toBe('GET');
    const headers = new Headers(init.headers);
    expect(headers.get('X-Gateway-Key')).toBeNull();
    expect(init.signal).toBeInstanceOf(AbortSignal);
    expect(GATEWAY_PROBE_TIMEOUT_MS).toBe(1_500);
  });

  it('maps non-2xx to bad-status', async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValue(new Response('nope', { status: 503 }));
    await expect(probe.probe()).resolves.toEqual({
      ok: false,
      reason: 'bad-status',
    });
  });

  it('maps invalid JSON / wrong shape to bad-body', async () => {
    global.fetch = jest.fn().mockResolvedValue(
      new Response(JSON.stringify({ status: 'degraded' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );
    await expect(probe.probe()).resolves.toEqual({
      ok: false,
      reason: 'bad-body',
    });
  });

  it('maps TimeoutError to timeout', async () => {
    const err = new Error('aborted');
    err.name = 'TimeoutError';
    global.fetch = jest.fn().mockRejectedValue(err);
    await expect(probe.probe()).resolves.toEqual({
      ok: false,
      reason: 'timeout',
    });
  });

  it('maps network failure to unreachable', async () => {
    global.fetch = jest.fn().mockRejectedValue(new TypeError('fetch failed'));
    await expect(probe.probe()).resolves.toEqual({
      ok: false,
      reason: 'unreachable',
    });
  });

  it('does not call upstream /health/ready', async () => {
    const fetchMock = jest.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          status: 'healthy',
          timestamp: '2026-10-03T10:00:00.000Z',
        }),
        { status: 200 },
      ),
    );
    global.fetch = fetchMock;
    await probe.probe();
    expect(String(fetchMock.mock.calls[0]?.[0])).not.toContain('/health/ready');
  });
});
