import { HealthService } from './health.service';

describe('HealthService', () => {
  const service = new HealthService();

  it('returns liveness without secrets', () => {
    const body = service.liveness();
    expect(body.status).toBe('healthy');
    expect(typeof body.timestamp).toBe('string');
    expect(Number.isNaN(Date.parse(body.timestamp))).toBe(false);
    expect(JSON.stringify(body)).not.toMatch(
      /GATEWAY_KEY|JWT_SECRET|password|DATABASE_URL/i,
    );
  });
});
