import { execFileSync } from 'child_process';
import { join } from 'path';
import { type INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { configureHttpApp } from '../src/shared/http/configure-http-app';
import {
  createAuthenticatedAgent,
  E2E_ADMIN_CREDENTIALS,
  type E2eAgent,
} from './authenticated-agent';

function deployTestDb(): void {
  execFileSync(
    process.execPath,
    [require.resolve('prisma/build/index.js'), 'migrate', 'deploy'],
    {
      cwd: join(__dirname, '..'),
      env: {
        ...process.env,
        DATABASE_URL: 'file:./test.db',
        CHECKPOINT_DISABLE: '1',
        PRISMA_HIDE_UPDATE_MESSAGE: '1',
      },
      stdio: 'pipe',
    },
  );
}

describe('App HTTP boundary (e2e)', () => {
  let app: INestApplication;
  let agent: E2eAgent;

  beforeAll(async () => {
    deployTestDb();
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    configureHttpApp(app);
    await app.init();
    agent = await createAuthenticatedAgent(app);
  }, 30_000);

  afterAll(async () => {
    await app?.close();
  }, 15_000);

  it('serves public liveness without a session', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/health')
      .expect(200);
    expect(response.body.status).toBe('healthy');
    expect(response.body.code).toBeUndefined();
  });

  it('reports bootstrap-status without a session', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/auth/bootstrap-status')
      .expect(200);
    expect(response.body).toEqual({ available: false });
  });

  it('rejects protected company-context, runs and /auth/me without cookies', async () => {
    const context = await request(app.getHttpServer())
      .get('/api/v1/company-context')
      .expect(401);
    expect(context.body.code).toBe('UNAUTHORIZED');

    const runs = await request(app.getHttpServer())
      .get('/api/v1/runs')
      .expect(401);
    expect(runs.body.code).toBe('UNAUTHORIZED');

    const me = await request(app.getHttpServer())
      .get('/api/v1/auth/me')
      .expect(401);
    expect(me.body.code).toBe('UNAUTHORIZED');
  });

  it('returns the same UNAUTHORIZED envelope for unknown email and wrong password', async () => {
    const unknown = await request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({ email: 'missing@content-chain.test', password: 'WrongPass12!' })
      .expect(401);
    const wrongPassword = await request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({
        email: E2E_ADMIN_CREDENTIALS.email,
        password: 'WrongPass12!',
      })
      .expect(401);

    expect(unknown.body.code).toBe('UNAUTHORIZED');
    expect(wrongPassword.body.code).toBe('UNAUTHORIZED');
    expect(unknown.body.message).toBe(wrongPassword.body.message);
    expect(unknown.body.message).toBe('Invalid credentials');
  });

  it('GET /auth/me with a session cookie returns the logged-in admin', async () => {
    const response = await agent.get('/api/v1/auth/me').expect(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.stringMatching(/^usr_/),
        email: E2E_ADMIN_CREDENTIALS.email,
        role: 'admin',
      }),
    );
  });
});
