import { execFileSync } from 'child_process';
import { randomUUID } from 'node:crypto';
import { join } from 'path';
import { hash as bcryptHash } from 'bcrypt';
import { type INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { GatewayLivenessProbe } from '../src/health/gateway-liveness.probe';
import { LLM_GATEWAY_PORT } from '../src/llm/llm.tokens';
import { RUN_EXECUTOR } from '../src/runs/domain/run-executor.port';
import {
  GUEST_QUOTA,
  type GuestQuotaPort,
} from '../src/runs/domain/guest-quota.port';
import { StubRunExecutor } from '../src/runs/infrastructure/dispatch/stub-run.executor';
import { configureHttpApp } from '../src/shared/http/configure-http-app';
import { PrismaService } from '../src/shared/persistence/prisma.service';
import {
  createAuthenticatedAgent,
  E2E_ADMIN_CREDENTIALS,
  type E2eAgent,
} from './authenticated-agent';
import { FakeLlmGateway } from './fake-llm-gateway';

const SUMMARY_KEYS = [
  'windowFrom',
  'windowTo',
  'totalLast30d',
  'successRateLast30d',
  'activeNow',
  'topTaskTypeLast30d',
] as const;

const USER_EMAIL = 'e2e-summary-user@content-chain.test';
const USER_PASSWORD = 'E2eSummaryUser12!';
const METRICS_USER_EMAIL = 'e2e-summary-metrics@content-chain.test';
const METRICS_USER_PASSWORD = 'E2eSummaryMetrics12!';
const GUEST_EMAIL = 'e2e-summary-guest@content-chain.test';
const GUEST_PASSWORD = 'E2eSummaryGuest12!';
const GUEST_OFF_EMAIL = 'e2e-summary-guest-off@content-chain.test';
const GUEST_OFF_PASSWORD = 'E2eSummaryGuestOff12!';

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
  audience: {
    profiles: [{ name: 'Founder SaaS', description: 'Founder SaaS B2B' }],
  },
  extras: { hashtags: ['#acme'] },
};

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

async function wipeRuns(prisma: PrismaService): Promise<void> {
  await prisma.contentDocument.deleteMany();
  await prisma.contentOutline.deleteMany();
  await prisma.socialReelScript.deleteMany();
  await prisma.socialReelIdea.deleteMany();
  await prisma.socialContent.deleteMany();
  await prisma.socialIdea.deleteMany();
  await prisma.runLog.deleteMany();
  await prisma.run.deleteMany();
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function assertSummaryShape(body: unknown): void {
  if (!isRecord(body)) {
    throw new Error('summary body is not an object');
  }
  for (const key of SUMMARY_KEYS) {
    expect(body).toHaveProperty(key);
  }
  expect(typeof body.windowFrom).toBe('string');
  expect(typeof body.windowTo).toBe('string');
  expect(typeof body.totalLast30d).toBe('number');
  expect(typeof body.successRateLast30d).toBe('number');
  expect(typeof body.activeNow).toBe('number');
  expect(
    body.topTaskTypeLast30d === null ||
      typeof body.topTaskTypeLast30d === 'string',
  ).toBe(true);
}

async function seedRun(
  prisma: PrismaService,
  input: {
    startedByUserId: string;
    status: string;
    taskType?: string;
    platform?: string;
    contentKind?: string | null;
    createdAt?: Date;
  },
): Promise<string> {
  const runId = `run_${randomUUID()}`;
  const taskType = input.taskType ?? 'post_ideas';
  const isContent = taskType.startsWith('page_');
  await prisma.run.create({
    data: {
      id: runId,
      conversationId: `conv_${randomUUID()}`,
      taskType,
      platform: input.platform ?? (isContent ? 'web' : 'linkedin'),
      contentKind: input.contentKind ?? (isContent ? 'landing' : null),
      language: 'pl',
      status: input.status,
      brief: { topic: 'runs-summary-e2e' },
      startedByUserId: input.startedByUserId,
      createdAt: input.createdAt,
    },
  });
  return runId;
}

async function upsertPasswordUser(
  prisma: PrismaService,
  input: {
    email: string;
    password: string;
    role: 'user' | 'guest';
  },
): Promise<string> {
  const existing = await prisma.user.findUnique({
    where: { email: input.email },
  });
  if (existing) {
    await prisma.refreshSession.deleteMany({
      where: { userId: existing.id },
    });
    await prisma.run.updateMany({
      where: { startedByUserId: existing.id },
      data: { startedByUserId: null },
    });
    await prisma.user.delete({ where: { id: existing.id } });
  }
  const id = `usr_${randomUUID()}`;
  await prisma.user.create({
    data: {
      id,
      email: input.email,
      passwordHash: await bcryptHash(input.password, 4),
      role: input.role,
      verifiedAt: new Date(),
    },
  });
  return id;
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

describe('GET /api/v1/runs/summary (e2e)', () => {
  let app: INestApplication;
  let admin: E2eAgent;
  let userAgent: E2eAgent;
  let metricsAgent: E2eAgent;
  let prisma: PrismaService;
  let adminId: string;
  let userId: string;
  let metricsUserId: string;

  beforeAll(async () => {
    deployTestDb();

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(RUN_EXECUTOR)
      .useClass(StubRunExecutor)
      .compile();

    app = moduleRef.createNestApplication();
    configureHttpApp(app);
    await app.init();
    prisma = app.get(PrismaService);
    admin = await createAuthenticatedAgent(app);

    const me = await admin.get('/api/v1/auth/me').expect(200);
    adminId = (me.body as { id: string }).id;

    await admin
      .put('/api/v1/company-context')
      .send(completeContextBody)
      .expect(200);

    userId = await upsertPasswordUser(prisma, {
      email: USER_EMAIL,
      password: USER_PASSWORD,
      role: 'user',
    });
    userAgent = request.agent(app.getHttpServer());
    await userAgent
      .post('/api/v1/auth/login')
      .send({ email: USER_EMAIL, password: USER_PASSWORD })
      .expect(200);

    metricsUserId = await upsertPasswordUser(prisma, {
      email: METRICS_USER_EMAIL,
      password: METRICS_USER_PASSWORD,
      role: 'user',
    });
    metricsAgent = request.agent(app.getHttpServer());
    await metricsAgent
      .post('/api/v1/auth/login')
      .send({
        email: METRICS_USER_EMAIL,
        password: METRICS_USER_PASSWORD,
      })
      .expect(200);

    await wipeRuns(prisma);
  }, 30_000);

  afterAll(async () => {
    try {
      if (prisma) {
        await wipeRuns(prisma);
        const emails = [USER_EMAIL, METRICS_USER_EMAIL];
        const users = await prisma.user.findMany({
          where: { email: { in: emails } },
          select: { id: true },
        });
        const userIds = users.map((row) => row.id);
        if (userIds.length > 0) {
          await prisma.refreshSession.deleteMany({
            where: { userId: { in: userIds } },
          });
          await prisma.run.updateMany({
            where: { startedByUserId: { in: userIds } },
            data: { startedByUserId: null },
          });
          await prisma.user.deleteMany({
            where: { id: { in: userIds } },
          });
        }
      }
    } finally {
      await prisma?.$disconnect();
      await app?.close();
    }
  }, 15_000);

  it('D-78: unauthenticated 401; admin 200 shape + instance scope', async () => {
    await wipeRuns(prisma);
    await seedRun(prisma, {
      startedByUserId: userId,
      status: 'completed',
    });

    const unauth = await request(app.getHttpServer())
      .get('/api/v1/runs/summary')
      .expect(401);
    expect(unauth.body.code).toBe('UNAUTHORIZED');

    const response = await admin.get('/api/v1/runs/summary').expect(200);
    assertSummaryShape(response.body);
    expect(response.body.totalLast30d).toBeGreaterThanOrEqual(1);
    expect(typeof response.body.successRateLast30d).toBe('number');
  });

  it('D-79: user summary counts only own runs', async () => {
    await wipeRuns(prisma);
    await seedRun(prisma, {
      startedByUserId: adminId,
      status: 'completed',
      taskType: 'page_copy',
    });
    await seedRun(prisma, {
      startedByUserId: userId,
      status: 'completed',
    });
    await seedRun(prisma, {
      startedByUserId: userId,
      status: 'failed',
    });

    const response = await userAgent.get('/api/v1/runs/summary').expect(200);
    assertSummaryShape(response.body);
    expect(response.body.totalLast30d).toBe(2);
    expect(response.body.successRateLast30d).toBe(50);
    expect(response.body.topTaskTypeLast30d).toBe('post_ideas');
    expect(response.body.activeNow).toBe(0);
  });

  it('D-80: successRate 0 without completed; activeNow ignores 30d window', async () => {
    await wipeRuns(prisma);
    await seedRun(prisma, {
      startedByUserId: metricsUserId,
      status: 'failed',
    });
    await seedRun(prisma, {
      startedByUserId: metricsUserId,
      status: 'cancelled',
    });
    await seedRun(prisma, {
      startedByUserId: metricsUserId,
      status: 'running',
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
    });

    const response = await metricsAgent
      .get('/api/v1/runs/summary')
      .expect(200);
    assertSummaryShape(response.body);
    expect(response.body.successRateLast30d).toBe(0);
    expect(response.body.totalLast30d).toBe(2);
    expect(response.body.activeNow).toBe(1);
  });
});

describe('GET /api/v1/runs/summary guest DEMO on (e2e D-81)', () => {
  let app: INestApplication;
  let guest: E2eAgent;
  let admin: E2eAgent;
  let prisma: PrismaService;
  let guestId: string;
  let adminId: string;
  let envSnapshot: Record<
    'DEMO_MODE' | 'REDIS_HOST' | 'REDIS_PORT',
    string | undefined
  >;
  const fakeLlm = new FakeLlmGateway();
  const quota: GuestQuotaPort = {
    tryAdmitDailyRun: async () => ({ kind: 'ok' }),
    releaseDailyRun: async () => undefined,
    tryAdmitDailyRating: async () => ({ kind: 'ok' }),
    deleteDailyRatings: async () => true,
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

    const me = await admin.get('/api/v1/auth/me').expect(200);
    adminId = (me.body as { id: string }).id;

    await admin
      .put('/api/v1/company-context')
      .send(completeContextBody)
      .expect(200);

    await prisma.user.deleteMany({ where: { email: GUEST_EMAIL } });
    const registered = await request(app.getHttpServer())
      .post('/api/v1/auth/register')
      .send({ email: GUEST_EMAIL, password: GUEST_PASSWORD })
      .expect(201);
    expect(registered.body.user.role).toBe('guest');
    guestId = registered.body.user.id as string;

    guest = request.agent(app.getHttpServer());
    await guest
      .post('/api/v1/auth/login')
      .send({ email: GUEST_EMAIL, password: GUEST_PASSWORD })
      .expect(200);

    await wipeRuns(prisma);
  }, 30_000);

  afterAll(async () => {
    try {
      if (prisma) {
        await wipeRuns(prisma);
        const guest = await prisma.user.findUnique({
          where: { email: GUEST_EMAIL },
        });
        if (guest) {
          await prisma.refreshSession.deleteMany({
            where: { userId: guest.id },
          });
          await prisma.run.updateMany({
            where: { startedByUserId: guest.id },
            data: { startedByUserId: null },
          });
          await prisma.user.delete({ where: { id: guest.id } });
        }
      }
    } finally {
      await prisma?.$disconnect();
      await app?.close();
      restoreEnv(envSnapshot);
    }
  }, 15_000);

  it('guest GET /summary → 200 scoped to own runs', async () => {
    await seedRun(prisma, {
      startedByUserId: adminId,
      status: 'completed',
    });
    await seedRun(prisma, {
      startedByUserId: guestId,
      status: 'completed',
    });

    const response = await guest.get('/api/v1/runs/summary').expect(200);
    assertSummaryShape(response.body);
    expect(response.body.totalLast30d).toBe(1);
    expect(response.body.successRateLast30d).toBe(100);
  });
});

describe('GET /api/v1/runs/summary guest DEMO off (e2e D-81)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let guestId: string;
  let envSnapshot: Record<
    'DEMO_MODE' | 'REDIS_HOST' | 'REDIS_PORT',
    string | undefined
  >;

  beforeAll(async () => {
    // Force off: ConfigModule may have loaded DEMO_MODE=true from apps/api/.env
    // during earlier suites; without an explicit false GuestGuard allows guest → 200.
    envSnapshot = {
      DEMO_MODE: process.env.DEMO_MODE,
      REDIS_HOST: process.env.REDIS_HOST,
      REDIS_PORT: process.env.REDIS_PORT,
    };
    process.env.DEMO_MODE = 'false';

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(RUN_EXECUTOR)
      .useClass(StubRunExecutor)
      .compile();

    app = moduleRef.createNestApplication();
    configureHttpApp(app);
    await app.init();
    prisma = app.get(PrismaService);
    await createAuthenticatedAgent(app);

    guestId = await upsertPasswordUser(prisma, {
      email: GUEST_OFF_EMAIL,
      password: GUEST_OFF_PASSWORD,
      role: 'guest',
    });
  }, 30_000);

  afterAll(async () => {
    try {
      if (prisma) {
        const guest = await prisma.user.findUnique({
          where: { email: GUEST_OFF_EMAIL },
        });
        if (guest) {
          await prisma.refreshSession.deleteMany({
            where: { userId: guest.id },
          });
          await prisma.user.delete({ where: { id: guest.id } });
        }
      }
    } finally {
      await prisma?.$disconnect();
      await app?.close();
      restoreEnv(envSnapshot);
    }
  }, 15_000);

  it('forged guest JWT with DEMO off → 401 on /runs/summary', async () => {
    const jwt = app.get(JwtService);
    const accessToken = await jwt.signAsync({
      sub: guestId,
      email: GUEST_OFF_EMAIL,
      role: 'guest',
    });

    const response = await request(app.getHttpServer())
      .get('/api/v1/runs/summary')
      .set('Cookie', [`cc_access=${accessToken}`])
      .expect(401);
    expect(response.body.code).toBe('UNAUTHORIZED');
  });
});
