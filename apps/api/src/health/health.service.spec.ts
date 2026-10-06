import { GATEWAY_PROBE_CACHE_TTL_MS, HealthService } from './health.service';
import type { GatewayLivenessProbe } from './gateway-liveness.probe';

describe('HealthService', () => {
  let probe: { probe: jest.Mock };
  let service: HealthService;

  beforeEach(() => {
    probe = { probe: jest.fn() };
    service = new HealthService(probe as unknown as GatewayLivenessProbe);
  });

  it('returns liveness without secrets', () => {
    const body = service.liveness();
    expect(body.status).toBe('healthy');
    expect(typeof body.timestamp).toBe('string');
    expect(Number.isNaN(Date.parse(body.timestamp))).toBe(false);
    expect(JSON.stringify(body)).not.toMatch(
      /GATEWAY_KEY|JWT_SECRET|password|DATABASE_URL|X-Gateway-Key/i,
    );
  });

  it('aggregates ready when gateway probe ok (D-47)', async () => {
    probe.probe.mockResolvedValue({ ok: true });
    const body = await service.readiness();
    expect(body.status).toBe('ready');
    expect(body.checks.api.status).toBe('healthy');
    expect(body.checks.gateway.status).toBe('healthy');
    expect(Object.keys(body.checks)).toEqual(['api', 'gateway']);
    expect(JSON.stringify(body)).not.toMatch(
      /GATEWAY_KEY|X-Gateway-Key|JWT_SECRET|password|REDIS|ioredis/i,
    );
  });

  it.each([
    {
      reason: 'timeout' as const,
      message: 'Gateway liveness timeout',
    },
    {
      reason: 'unreachable' as const,
      message: 'Gateway process unreachable',
    },
    {
      reason: 'bad-status' as const,
      message: 'Gateway liveness returned non-success status',
    },
  ])(
    'aggregates not_ready when gateway probe fails ($reason) (D-48)',
    async ({ reason, message }) => {
      probe.probe.mockResolvedValue({ ok: false, reason });
      const body = await service.readiness();
      expect(body.status).toBe('not_ready');
      expect(body.checks.gateway.status).toBe('unhealthy');
      expect(body.checks.gateway.message).toBe(message);
      expect(JSON.stringify(body)).not.toMatch(
        /127\.0\.0\.1:3100|GATEWAY_KEY|X-Gateway-Key/i,
      );
    },
  );

  it('caches gateway probe result within TTL', async () => {
    probe.probe.mockResolvedValue({ ok: true });
    await service.readiness();
    await service.readiness();
    expect(probe.probe).toHaveBeenCalledTimes(1);
    expect(GATEWAY_PROBE_CACHE_TTL_MS).toBe(10_000);
  });

  it('re-probes after cache TTL expires', async () => {
    jest.useFakeTimers();
    try {
      probe.probe
        .mockResolvedValueOnce({ ok: true })
        .mockResolvedValueOnce({ ok: false, reason: 'unreachable' });

      const first = await service.readiness();
      expect(first.status).toBe('ready');

      jest.advanceTimersByTime(GATEWAY_PROBE_CACHE_TTL_MS + 1);
      const second = await service.readiness();
      expect(second.status).toBe('not_ready');
      expect(probe.probe).toHaveBeenCalledTimes(2);
    } finally {
      jest.useRealTimers();
    }
  });
});
