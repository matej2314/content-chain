import { execFileSync } from 'child_process';
import { join } from 'path';
import { randomUUID } from 'crypto';
import { type INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { GatewayLivenessProbe } from '../src/health/gateway-liveness.probe';
import { LLM_GATEWAY_PORT } from '../src/llm/llm.tokens';
import { configureHttpApp } from '../src/shared/http/configure-http-app';
import { PrismaService } from '../src/shared/persistence/prisma.service';
import {
  GUEST_QUOTA,
  type GuestQuotaPort,
} from '../src/runs/domain/guest-quota.port';
import {
  createAuthenticatedAgent,
  E2E_ADMIN_CREDENTIALS,
  type E2eAgent,
} from './authenticated-agent';
import { FakeLlmGateway, ideasJson, verifierOk } from './fake-llm-gateway';

const completeContextBody = {
  identity: { name: 'Acme', description: 'Robimy X.' },
  offer: {
    items: [
      {
        name: 'Audyt',
        benefit: ['Oszczędność czasu'],
        description: 'Przegląd procesów.',
      },
    ],
  },
  voice: { weDo: 'konkretnie', weDont: 'żargon' },
  cta: { items: [{ label: 'Napisz do nas', target: '/kontakt' }] },
  audience: { profiles: [{ description: 'Founder SaaS B2B' }] },
  extras: { hashtags: ['#acme'] },
};

const GUEST_CREDENTIALS = {
  email: `e2e-guest-${randomUUID()}@content-chain.test`,
  password: 'E2eGuestPass12!',
} as const;

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

function restoreEnv(
  snapshot: Readonly<
    Record<'DEMO_MODE' | 'REDIS_HOST' | 'REDIS_PORT', string | undefined>
  >,
): void {
  (['DEMO_MODE', 'REDIS_HOST', 'REDIS_PORT'] as const).forEach((key) => {
    const previous = snapshot[key];
    if (previous === undefined) {
      delete process.env[key];
      return;
    }
    process.env[key] = previous;
  });
}

describe('DEMO MODE guest HTTP (e2e)', () => {
  let app: INestApplication;
  let admin: E2eAgent;
  let guest: E2eAgent;
  let prisma: PrismaService;
  let envSnapshot: Record<
    'DEMO_MODE' | 'REDIS_HOST' | 'REDIS_PORT',
    string | undefined
  >;
  const fakeLlm = new FakeLlmGateway();
  const quota: GuestQuotaPort = {
    tryAdmitDailyRun: async () => ({ kind: 'ok' }),
    releaseDailyRun: async () => undefined,
    tryAdmitDailyRating: async () => ({ kind: 'ok' }),
  };

  beforeAll(async () => {
    envSnapshot = {
      DEMO_MODE: process.env.DEMO_MODE,
      REDIS_HOST: process.env.REDIS_HOST,
      REDIS_PORT: process.env.REDIS_PORT,
    };
    process.env.DEMO_MODE = 'true';
    process.env.REDIS_HOST = '127.0.0.1';
    process.env.REDIS_PORT = '6379';
    deployTestDb();

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(GUEST_QUOTA)
      .useValue(quota)
      .overrideProvider(LLM_GATEWAY_PORT)
      .useValue(fakeLlm)
      .overrideProvider(GatewayLivenessProbe)
      .useValue({
        probe: jest.fn().mockResolvedValue({ ok: true }),
      })
      .compile();

    app = moduleRef.createNestApplication();
    configureHttpApp(app);
    await app.init();
    prisma = app.get(PrismaService);
    admin = await createAuthenticatedAgent(app);
    await admin
      .put('/api/v1/company-context')
      .send(completeContextBody)
      .expect(200);

    const registered = await request(app.getHttpServer())
      .post('/api/v1/auth/register')
      .send(GUEST_CREDENTIALS)
      .expect(201);
    expect(registered.body.user.role).toBe('guest');
    expect(registered.headers['set-cookie']).toBeUndefined();

    guest = request.agent(app.getHttpServer());
    const login = await guest
      .post('/api/v1/auth/login')
      .send(GUEST_CREDENTIALS)
      .expect(200);
    expect(login.body.user.role).toBe('guest');
  }, 30_000);

  afterAll(async () => {
    await app?.close();
    restoreEnv(envSnapshot);
  }, 15_000);

  it('GET /config is public and returns only demoMode (D-60)', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/config')
      .expect(200);
    expect(response.body).toEqual({ demoMode: true });
    expect(Object.keys(response.body)).toEqual(['demoMode']);
    expect(JSON.stringify(response.body)).not.toMatch(
      /GUEST_|REDIS_|GATEWAY_KEY/,
    );
  });

  it('GET /health/ready stays ready without Redis checks (D-47)', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/health/ready')
      .expect(200);
    expect(response.body.status).toBe('ready');
    expect(Object.keys(response.body.checks)).toEqual(['api', 'gateway']);
    expect(JSON.stringify(response.body)).not.toMatch(/REDIS|ioredis/i);
  });

  it('guest GET company-context 200 and write 403 (D-61)', async () => {
    const get = await guest.get('/api/v1/company-context').expect(200);
    expect(get.body.identity.name).toBe('Acme');

    const put = await guest
      .put('/api/v1/company-context')
      .send(completeContextBody)
      .expect(403);
    expect(put.body.code).toBe('FORBIDDEN');

    const patch = await guest
      .patch('/api/v1/company-context')
      .send({ identity: { name: 'Nope' } })
      .expect(403);
    expect(patch.body.code).toBe('FORBIDDEN');
  });

  it('guest mutations outside AllowGuest return 403 (D-56)', async () => {
    const runId = `run_${randomUUID()}`;

    const email = await guest
      .patch('/api/v1/auth/me/email')
      .send({
        email: 'guest-new@content-chain.test',
        currentPassword: GUEST_CREDENTIALS.password,
      })
      .expect(403);
    expect(email.body.code).toBe('FORBIDDEN');

    const users = await guest.get('/api/v1/users').expect(403);
    expect(users.body.code).toBe('FORBIDDEN');

    const invitations = await guest.get('/api/v1/invitations').expect(403);
    expect(invitations.body.code).toBe('FORBIDDEN');

    const edited = await guest
      .post(`/api/v1/runs/${runId}/output-edited`)
      .send({ result: { ideas: [] } })
      .expect(403);
    expect(edited.body.code).toBe('FORBIDDEN');

    const finalize = await guest
      .post(`/api/v1/runs/${runId}/finalize-review`)
      .expect(403);
    expect(finalize.body.code).toBe('FORBIDDEN');
  });

  it('guest lists all instance runs but cannot read or cancel a foreign one (D-55)', async () => {
    const me = await admin.get('/api/v1/auth/me').expect(200);
    const adminId = me.body.id as string;
    const foreignRunId = `run_${randomUUID()}`;
    await prisma.run.create({
      data: {
        id: foreignRunId,
        conversationId: `conv_${randomUUID()}`,
        taskType: 'post_ideas',
        platform: 'linkedin',
        language: 'pl',
        status: 'completed',
        brief: { topic: 'Admin run' },
        startedByUserId: adminId,
      },
    });

    const list = await guest.get('/api/v1/runs').expect(200);
    const runIds = (list.body.items as Array<{ runId: string }>).map(
      (item) => item.runId,
    );
    expect(runIds).toContain(foreignRunId);

    const detail = await guest.get(`/api/v1/runs/${foreignRunId}`).expect(403);
    expect(detail.body.code).toBe('FORBIDDEN');

    const logs = await guest
      .get(`/api/v1/runs/${foreignRunId}/logs`)
      .expect(403);
    expect(logs.body.code).toBe('FORBIDDEN');

    const cancel = await guest
      .post(`/api/v1/runs/${foreignRunId}/cancel`)
      .expect(403);
    expect(cancel.body.code).toBe('FORBIDDEN');
  });

  it('guest cannot start a disallowed type and cannot start the same type twice (D-54)', async () => {
    fakeLlm.script = [ideasJson(), verifierOk()];
    const disallowed = await guest
      .post('/api/v1/runs')
      .send({
        taskType: 'post_content',
        platform: 'linkedin',
        language: 'pl',
        brief: { topic: 'Guest' },
      })
      .expect(403);
    expect(disallowed.body.code).toBe('GUEST_TYPE_NOT_ALLOWED');

    const first = await guest
      .post('/api/v1/runs')
      .send({
        taskType: 'post_ideas',
        platform: 'linkedin',
        language: 'pl',
        brief: { topic: 'Guest' },
      })
      .expect(202);
    expect(first.body.runId).toMatch(/^run_/);

    const second = await guest
      .post('/api/v1/runs')
      .send({
        taskType: 'post_ideas',
        platform: 'linkedin',
        language: 'pl',
        brief: { topic: 'Guest again' },
      })
      .expect(403);
    expect(second.body.code).toBe('GUEST_TYPE_QUOTA_EXCEEDED');
  });

  it('admin logs in while DEMO_MODE is true (D-59)', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send(E2E_ADMIN_CREDENTIALS)
      .expect(200);
    expect(response.body.user.role).toBe('admin');
    expect(response.body.user.email).toBe(E2E_ADMIN_CREDENTIALS.email);
  });
});
