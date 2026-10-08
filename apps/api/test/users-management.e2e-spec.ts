import { execFileSync } from 'child_process';
import { join } from 'path';
import { randomUUID } from 'node:crypto';
import { hash as bcryptHash } from 'bcrypt';
import { type INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
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
import { FakeLlmGateway } from './fake-llm-gateway';

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

const USER_CREDS = {
  email: `e2e-um-user-${randomUUID()}@content-chain.test`,
  password: 'E2eUmUserPass12!',
} as const;

const GUEST_CREDS = {
  email: `e2e-um-guest-${randomUUID()}@content-chain.test`,
  password: 'E2eUmGuestPass12!',
} as const;

const OTHER_USER_CREDS = {
  email: `e2e-um-other-${randomUUID()}@content-chain.test`,
  password: 'E2eUmOtherPass12!',
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

async function wipeRuns(prisma: PrismaClient): Promise<void> {
  await prisma.contentDocument.deleteMany();
  await prisma.contentOutline.deleteMany();
  await prisma.socialReelScript.deleteMany();
  await prisma.socialReelIdea.deleteMany();
  await prisma.socialContent.deleteMany();
  await prisma.socialIdea.deleteMany();
  await prisma.feedback.deleteMany();
  await prisma.runLog.deleteMany();
  await prisma.run.deleteMany();
}

async function createUserRow(
  prisma: PrismaService,
  input: {
    email: string;
    password: string;
    role: 'user' | 'guest';
    isActive?: boolean;
  },
): Promise<string> {
  const id = `usr_${randomUUID()}`;
  await prisma.user.create({
    data: {
      id,
      email: input.email,
      passwordHash: await bcryptHash(input.password, 4),
      role: input.role,
      isActive: input.isActive ?? true,
      verifiedAt: new Date(),
    },
  });
  return id;
}

async function seedRun(
  prisma: PrismaService,
  input: {
    startedByUserId: string;
    status: string;
  },
): Promise<string> {
  const runId = `run_${randomUUID()}`;
  await prisma.run.create({
    data: {
      id: runId,
      conversationId: `conv_${randomUUID()}`,
      taskType: 'post_ideas',
      platform: 'linkedin',
      language: 'pl',
      status: input.status,
      brief: { topic: 'users-management-e2e' },
      startedByUserId: input.startedByUserId,
      pipelineFinishedAt:
        input.status === 'completed' ? new Date() : undefined,
    },
  });
  return runId;
}

async function seedFeedback(
  prisma: PrismaService,
  input: { authorId: string; runId: string },
): Promise<string> {
  const id = `fbk_${randomUUID()}`;
  await prisma.feedback.create({
    data: {
      id,
      targetType: 'application',
      body: 'users-management e2e feedback',
      authorId: input.authorId,
      runId: input.runId,
    },
  });
  return id;
}

describe('Users management delete / reactivate / cancel (e2e)', () => {
  let app: INestApplication;
  let admin: E2eAgent;
  let prisma: PrismaService;
  let adminUserId: string;
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
    deployTestDb();

    const standalone = new PrismaClient();
    try {
      await standalone.$connect();
      await wipeRuns(standalone);
    } finally {
      await standalone.$disconnect();
    }

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
    adminUserId = (me.body as { id: string }).id;

    await admin
      .put('/api/v1/company-context')
      .send(completeContextBody)
      .expect(200);
  }, 45_000);

  beforeEach(async () => {
    await wipeRuns(prisma);
  });

  afterAll(async () => {
    try {
      if (prisma) {
        await wipeRuns(prisma);
        for (const email of [
          USER_CREDS.email,
          GUEST_CREDS.email,
          OTHER_USER_CREDS.email,
        ]) {
          const row = await prisma.user.findUnique({ where: { email } });
          if (row) {
            await prisma.refreshSession.deleteMany({
              where: { userId: row.id },
            });
            await prisma.accountActivation.deleteMany({
              where: { userId: row.id },
            });
            await prisma.user.delete({ where: { id: row.id } });
          }
        }
      }
      await app?.close();
    } finally {
      restoreEnv(envSnapshot);
    }
  }, 20_000);

  it('D-25: soft-delete user → 200; access JWT → 401; runs remain', async () => {
    const userId = await createUserRow(prisma, {
      email: USER_CREDS.email,
      password: USER_CREDS.password,
      role: 'user',
    });
    const runId = await seedRun(prisma, {
      startedByUserId: userId,
      status: 'completed',
    });

    const userAgent = request.agent(app.getHttpServer());
    await userAgent
      .post('/api/v1/auth/login')
      .send(USER_CREDS)
      .expect(200);
    await userAgent.get('/api/v1/auth/me').expect(200);

    const deleted = await admin
      .delete(`/api/v1/users/${userId}`)
      .expect(200);
    expect(deleted.body).toEqual({ ok: true });

    const meAfter = await userAgent.get('/api/v1/auth/me').expect(401);
    expect(meAfter.body.code).toBe('UNAUTHORIZED');

    const row = await prisma.user.findUnique({ where: { id: userId } });
    expect(row?.isActive).toBe(false);

    const run = await prisma.run.findUnique({ where: { id: runId } });
    expect(run).not.toBeNull();
    expect(run?.startedByUserId).toBe(userId);
  });

  it('D-26: PATCH reactivate user OK; PATCH guest → 403', async () => {
    const softUser = await prisma.user.findUnique({
      where: { email: USER_CREDS.email },
    });
    expect(softUser).not.toBeNull();

    const reactivated = await admin
      .patch(`/api/v1/users/${softUser!.id}`)
      .send({ isActive: true })
      .expect(200);
    expect(reactivated.body.isActive).toBe(true);
    expect(reactivated.body.role).toBe('user');

    const guestId = await createUserRow(prisma, {
      email: GUEST_CREDS.email,
      password: GUEST_CREDS.password,
      role: 'guest',
      isActive: false,
    });
    const guestPatch = await admin
      .patch(`/api/v1/users/${guestId}`)
      .send({ isActive: true })
      .expect(403);
    expect(guestPatch.body.code).toBe('FORBIDDEN');
    expect(guestPatch.body.message).toBe('Cannot reactivate a guest account');
  });

  it('D-71: GET /runs/:id detail includes startedBy.role', async () => {
    const runId = await seedRun(prisma, {
      startedByUserId: adminUserId,
      status: 'completed',
    });
    const detail = await admin.get(`/api/v1/runs/${runId}`).expect(200);
    expect(detail.body.startedBy).toEqual(
      expect.objectContaining({
        id: adminUserId,
        email: E2E_ADMIN_CREDENTIALS.email,
        role: 'admin',
      }),
    );
  });

  it('D-69 / D-70: admin cancel guest run OK; admin cancel foreign user → 403', async () => {
    const guest = await prisma.user.findUnique({
      where: { email: GUEST_CREDS.email },
    });
    expect(guest).not.toBeNull();

    const otherUserId = await createUserRow(prisma, {
      email: OTHER_USER_CREDS.email,
      password: OTHER_USER_CREDS.password,
      role: 'user',
    });

    const guestRunId = await seedRun(prisma, {
      startedByUserId: guest!.id,
      status: 'running',
    });
    const userRunId = await seedRun(prisma, {
      startedByUserId: otherUserId,
      status: 'running',
    });

    const cancelled = await admin
      .post(`/api/v1/runs/${guestRunId}/cancel`)
      .expect(200);
    expect(cancelled.body.status).toBe('cancelled');

    const logs = await admin
      .get(`/api/v1/runs/${guestRunId}/logs`)
      .expect(200);
    expect(
      (logs.body.items as Array<{ message?: string; level?: string }>).some(
        (entry) =>
          entry.level === 'info' &&
          entry.message === 'Run cancelled by admin',
      ),
    ).toBe(true);

    const forbidden = await admin
      .post(`/api/v1/runs/${userRunId}/cancel`)
      .expect(403);
    expect(forbidden.body.code).toBe('FORBIDDEN');
  });

  it('D-64: guest + live without purge → 409 GUEST_HAS_ACTIVE_RUN', async () => {
    const guest = await prisma.user.findUnique({
      where: { email: GUEST_CREDS.email },
    });
    expect(guest).not.toBeNull();
    await prisma.user.update({
      where: { id: guest!.id },
      data: { isActive: true },
    });

    await seedRun(prisma, {
      startedByUserId: guest!.id,
      status: 'running',
    });

    const response = await admin
      .delete(`/api/v1/users/${guest!.id}`)
      .expect(409);
    expect(response.body.code).toBe('GUEST_HAS_ACTIVE_RUN');
    expect(response.body.message).toBe('Guest has an active run');

    const stillThere = await prisma.user.findUnique({
      where: { id: guest!.id },
    });
    expect(stillThere).not.toBeNull();
  });

  it('D-65: guest + live + purge=true → 200; no User / runs', async () => {
    const guest = await prisma.user.findUnique({
      where: { email: GUEST_CREDS.email },
    });
    expect(guest).not.toBeNull();

    const liveRunId = await seedRun(prisma, {
      startedByUserId: guest!.id,
      status: 'awaiting_hitl',
    });
    await seedFeedback(prisma, {
      authorId: guest!.id,
      runId: liveRunId,
    });

    const guestAgent = request.agent(app.getHttpServer());
    await guestAgent
      .post('/api/v1/auth/login')
      .send(GUEST_CREDS)
      .expect(200);

    const deleted = await admin
      .delete(`/api/v1/users/${guest!.id}`)
      .query({ purge: 'true' })
      .expect(200);
    expect(deleted.body).toEqual({ ok: true });

    expect(await prisma.user.findUnique({ where: { id: guest!.id } })).toBeNull();
    expect(await prisma.run.findUnique({ where: { id: liveRunId } })).toBeNull();
    expect(await prisma.feedback.count({ where: { authorId: guest!.id } })).toBe(
      0,
    );

    // D-68: access after hard → 401
    const meAfter = await guestAgent.get('/api/v1/auth/me').expect(401);
    expect(meAfter.body.code).toBe('UNAUTHORIZED');
  });

  it('D-63 / D-72: hard guest without live clears User/runs/feedback; soft user keeps feedback', async () => {
    const softUser = await prisma.user.findUnique({
      where: { email: USER_CREDS.email },
    });
    expect(softUser).not.toBeNull();
    await prisma.user.update({
      where: { id: softUser!.id },
      data: { isActive: true },
    });

    const userRunId = await seedRun(prisma, {
      startedByUserId: softUser!.id,
      status: 'completed',
    });
    const userFeedbackId = await seedFeedback(prisma, {
      authorId: softUser!.id,
      runId: userRunId,
    });

    await admin.delete(`/api/v1/users/${softUser!.id}`).expect(200);
    expect(
      await prisma.feedback.findUnique({ where: { id: userFeedbackId } }),
    ).not.toBeNull();
    expect(await prisma.run.findUnique({ where: { id: userRunId } })).not.toBeNull();

    const guestEmail = `e2e-um-guest-hard-${randomUUID()}@content-chain.test`;
    const guestPassword = 'E2eUmGuestHard12!';
    const guestId = await createUserRow(prisma, {
      email: guestEmail,
      password: guestPassword,
      role: 'guest',
    });
    const guestRunId = await seedRun(prisma, {
      startedByUserId: guestId,
      status: 'completed',
    });
    await seedFeedback(prisma, {
      authorId: guestId,
      runId: guestRunId,
    });

    await admin.delete(`/api/v1/users/${guestId}`).expect(200);

    expect(await prisma.user.findUnique({ where: { id: guestId } })).toBeNull();
    expect(await prisma.run.findUnique({ where: { id: guestRunId } })).toBeNull();
    expect(await prisma.feedback.count({ where: { authorId: guestId } })).toBe(
      0,
    );

    const reregister = await request(app.getHttpServer())
      .post('/api/v1/auth/register')
      .send({ email: guestEmail, password: guestPassword })
      .expect(201);
    expect(reregister.body.user.role).toBe('guest');
    expect(reregister.body.user.email).toBe(guestEmail);

    await prisma.refreshSession.deleteMany({
      where: { userId: reregister.body.user.id as string },
    });
    await prisma.user.delete({
      where: { id: reregister.body.user.id as string },
    });
  });

  it('D-66: DELETE admin target → 403; user session DELETE → 403', async () => {
    const againstAdmin = await admin
      .delete(`/api/v1/users/${adminUserId}`)
      .expect(403);
    expect(againstAdmin.body.code).toBe('FORBIDDEN');

    const softUser = await prisma.user.findUnique({
      where: { email: USER_CREDS.email },
    });
    expect(softUser).not.toBeNull();
    await prisma.user.update({
      where: { id: softUser!.id },
      data: { isActive: true },
    });

    const userAgent = request.agent(app.getHttpServer());
    await userAgent
      .post('/api/v1/auth/login')
      .send(USER_CREDS)
      .expect(200);

    const asUser = await userAgent
      .delete(`/api/v1/users/${softUser!.id}`)
      .expect(403);
    expect(asUser.body.code).toBe('FORBIDDEN');
  });

  it('D-67: legacy soft-deleted guest → hard (not 404)', async () => {
    const guestId = await createUserRow(prisma, {
      email: `e2e-um-legacy-guest-${randomUUID()}@content-chain.test`,
      password: 'E2eUmLegacyGuest12!',
      role: 'guest',
      isActive: false,
    });
    const runId = await seedRun(prisma, {
      startedByUserId: guestId,
      status: 'failed',
    });

    const deleted = await admin
      .delete(`/api/v1/users/${guestId}`)
      .expect(200);
    expect(deleted.body).toEqual({ ok: true });
    expect(await prisma.user.findUnique({ where: { id: guestId } })).toBeNull();
    expect(await prisma.run.findUnique({ where: { id: runId } })).toBeNull();
  });
});
