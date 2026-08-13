import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { configureHttpApp } from '../src/shared/http/configure-http-app';

describe('Health (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    configureHttpApp(app);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /api/v1/health returns liveness without secrets', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/health')
      .expect(200);
    expect(response.body.status).toBe('healthy');
    expect(typeof response.body.timestamp).toBe('string');
    expect(JSON.stringify(response.body)).not.toMatch(
      /GATEWAY_KEY|JWT_SECRET|password/i,
    );
    expect(response.headers['x-request-id']).toMatch(/^req_/);
  });
});
