import { type INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import {
  GatewayLivenessProbe,
  type GatewayLivenessProbeResult,
} from '../src/health/gateway-liveness.probe';
import { configureHttpApp } from '../src/shared/http/configure-http-app';

describe('Health (e2e)', () => {
  async function bootWithProbe(
    result: GatewayLivenessProbeResult,
  ): Promise<INestApplication> {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(GatewayLivenessProbe)
      .useValue({
        probe: jest.fn().mockResolvedValue(result),
      })
      .compile();

    const app = moduleRef.createNestApplication();
    configureHttpApp(app);
    await app.init();
    return app;
  }

  it('GET /api/v1/health returns liveness without secrets', async () => {
    const app = await bootWithProbe({ ok: true });
    try {
      const response = await request(app.getHttpServer())
        .get('/api/v1/health')
        .expect(200);
      expect(response.body.status).toBe('healthy');
      expect(typeof response.body.timestamp).toBe('string');
      expect(JSON.stringify(response.body)).not.toMatch(
        /GATEWAY_KEY|JWT_SECRET|password|X-Gateway-Key/i,
      );
      expect(response.headers['x-request-id']).toMatch(/^req_/);
    } finally {
      await app.close();
    }
  });

  it('GET /api/v1/health/ready returns ready when gateway liveness probe ok (D-47)', async () => {
    const app = await bootWithProbe({ ok: true });
    try {
      const response = await request(app.getHttpServer())
        .get('/api/v1/health/ready')
        .expect(200);
      expect(response.body.status).toBe('ready');
      expect(response.body.checks.api.status).toBe('healthy');
      expect(response.body.checks.gateway.status).toBe('healthy');
      expect(JSON.stringify(response.body)).not.toMatch(
        /GATEWAY_KEY|X-Gateway-Key|JWT_SECRET|password/i,
      );
    } finally {
      await app.close();
    }
  });

  it('GET /api/v1/health/ready returns not_ready with HTTP 200 when probe fails (D-48)', async () => {
    const app = await bootWithProbe({ ok: false, reason: 'unreachable' });
    try {
      const response = await request(app.getHttpServer())
        .get('/api/v1/health/ready')
        .expect(200);
      expect(response.body.status).toBe('not_ready');
      expect(response.body.checks.api.status).toBe('healthy');
      expect(response.body.checks.gateway.status).toBe('unhealthy');
      expect(JSON.stringify(response.body)).not.toMatch(
        /GATEWAY_KEY|X-Gateway-Key|JWT_SECRET|password|127\.0\.0\.1:3100/i,
      );
    } finally {
      await app.close();
    }
  });
});
