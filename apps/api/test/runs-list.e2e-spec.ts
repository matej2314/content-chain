import { execFileSync } from 'child_process';
import { randomUUID } from 'node:crypto';
import { join } from 'path';
import { type INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { isUserRole, type UserRole } from '@content-chain/shared';
import { AppModule } from '../src/app.module';
import { RUN_EXECUTOR } from '../src/runs/domain/run-executor.port';
import { StubRunExecutor } from '../src/runs/infrastructure/dispatch/stub-run.executor';
import { configureHttpApp } from '../src/shared/http/configure-http-app';
import { PrismaService } from '../src/shared/persistence/prisma.service';
import {
  createAuthenticatedAgent,
  E2E_ADMIN_CREDENTIALS,
  type E2eAgent,
} from './authenticated-agent';

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
  audience: { profiles: [{ name: 'Founder SaaS', description: 'Founder SaaS B2B' }] },
  extras: { hashtags: ['#acme'] },
};

const startRunBody = {
  taskType: 'post_ideas',
  platform: 'linkedin',
  language: 'pl',
  brief: { topic: 'Q3' },
};

const OTHER_USER_EMAIL = 'other-e2e@content-chain.test';
const UNKNOWN_USER_ID = 'usr_00000000-0000-4000-8000-000000000000';

type SessionIdentity = {
  id: string;
  email: string;
};

type StartedByIdentity = SessionIdentity & {
  role: UserRole;
};

type ListRunItem = {
  runId: string;
  taskType: string;
  platform: string;
  contentKind: string | null;
  language: string;
  status: string;
  createdAt: string;
  startedBy: StartedByIdentity | null;
};

type ListRunsBody = {
  page: number;
  pageSize: number;
  total: number;
  items: ListRunItem[];
};

type LightUserRunItem = {
  runId: string;
  taskType: string;
  platform: string;
  language: string;
  status: string;
  createdAt: string;
};

type LightUserRunsBody = {
  page: number;
  pageSize: number;
  total: number;
  items: LightUserRunItem[];
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

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitUntil(
  predicate: () => Promise<boolean>,
  label: string,
  timeoutMs = 10_000,
): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (await predicate()) return;
    await sleep(25);
  }
  throw new Error(`timed out waiting for ${label}`);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function readRunId(value: unknown): string {
  if (!isRecord(value) || typeof value.runId !== 'string') {
    throw new Error('start-run body is missing runId');
  }
  return value.runId;
}

function readSessionIdentity(value: unknown, label: string): SessionIdentity {
  if (!isRecord(value)) {
    throw new Error(`${label} is not an object`);
  }
  if (typeof value.id !== 'string' || typeof value.email !== 'string') {
    throw new Error(`${label} is missing id/email`);
  }
  return { id: value.id, email: value.email };
}

function readStartedBy(value: unknown): StartedByIdentity | null {
  if (value === null) {
    return null;
  }
  if (!isRecord(value)) {
    throw new Error('startedBy is not an object');
  }
  if (typeof value.id !== 'string' || typeof value.email !== 'string') {
    throw new Error('startedBy is missing id/email');
  }
  if (typeof value.role !== 'string' || !isUserRole(value.role)) {
    throw new Error('startedBy is missing a valid role');
  }
  return { id: value.id, email: value.email, role: value.role };
}

function readListItem(value: unknown): ListRunItem {
  if (!isRecord(value)) {
    throw new Error('list item is not an object');
  }
  if (typeof value.runId !== 'string') {
    throw new Error('list item.runId is not a string');
  }
  if (typeof value.taskType !== 'string') {
    throw new Error('list item.taskType is not a string');
  }
  if (typeof value.platform !== 'string') {
    throw new Error('list item.platform is not a string');
  }
  if (value.contentKind !== null && typeof value.contentKind !== 'string') {
    throw new Error('list item.contentKind is not string | null');
  }
  if (typeof value.language !== 'string') {
    throw new Error('list item.language is not a string');
  }
  if (typeof value.status !== 'string') {
    throw new Error('list item.status is not a string');
  }
  if (typeof value.createdAt !== 'string') {
    throw new Error('list item.createdAt is not a string');
  }
  return {
    runId: value.runId,
    taskType: value.taskType,
    platform: value.platform,
    contentKind: value.contentKind,
    language: value.language,
    status: value.status,
    createdAt: value.createdAt,
    startedBy: readStartedBy(value.startedBy),
  };
}

function readListMeta(body: Record<string, unknown>): {
  page: number;
  pageSize: number;
  total: number;
  items: unknown[];
} {
  if (typeof body.page !== 'number') {
    throw new Error('list body.page is not a number');
  }
  if (typeof body.pageSize !== 'number') {
    throw new Error('list body.pageSize is not a number');
  }
  if (typeof body.total !== 'number') {
    throw new Error('list body.total is not a number');
  }
  if (!Array.isArray(body.items)) {
    throw new Error('list body.items is not an array');
  }
  return {
    page: body.page,
    pageSize: body.pageSize,
    total: body.total,
    items: body.items,
  };
}

function readListBody(body: unknown): ListRunsBody {
  if (!isRecord(body)) {
    throw new Error('list body is not an object');
  }
  const meta = readListMeta(body);
  return {
    page: meta.page,
    pageSize: meta.pageSize,
    total: meta.total,
    items: meta.items.map(readListItem),
  };
}

function readLightUserRunItem(value: unknown): LightUserRunItem {
  if (!isRecord(value)) {
    throw new Error('light user-run item is not an object');
  }
  if (typeof value.runId !== 'string') {
    throw new Error('light item.runId is not a string');
  }
  if (typeof value.taskType !== 'string') {
    throw new Error('light item.taskType is not a string');
  }
  if (typeof value.platform !== 'string') {
    throw new Error('light item.platform is not a string');
  }
  if (typeof value.language !== 'string') {
    throw new Error('light item.language is not a string');
  }
  if (typeof value.status !== 'string') {
    throw new Error('light item.status is not a string');
  }
  if (typeof value.createdAt !== 'string') {
    throw new Error('light item.createdAt is not a string');
  }
  if ('startedBy' in value || 'userRating' in value || 'contentKind' in value) {
    throw new Error('light user-run item leaked non-light fields');
  }
  return {
    runId: value.runId,
    taskType: value.taskType,
    platform: value.platform,
    language: value.language,
    status: value.status,
    createdAt: value.createdAt,
  };
}

function readLightUserRunsBody(body: unknown): LightUserRunsBody {
  if (!isRecord(body)) {
    throw new Error('user-runs body is not an object');
  }
  const meta = readListMeta(body);
  return {
    page: meta.page,
    pageSize: meta.pageSize,
    total: meta.total,
    items: meta.items.map(readLightUserRunItem),
  };
}

describe('Runs list (e2e)', () => {
  let app: INestApplication;
  let agent: E2eAgent;
  let prisma: PrismaService;
  let sessionUser: SessionIdentity;
  let createdRunIds: string[];
  let otherUserId: string;
  let otherUserRunId: string;
  let historicalRunId: string;
  let pageCopyRunId: string;

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
    agent = await createAuthenticatedAgent(app);

    const me = await agent.get('/api/v1/auth/me').expect(200);
    sessionUser = readSessionIdentity(me.body, '/auth/me');
    expect(sessionUser.email).toBe(E2E_ADMIN_CREDENTIALS.email);

    await wipeRuns(prisma);
    await prisma.user.deleteMany({ where: { email: OTHER_USER_EMAIL } });
    await agent
      .put('/api/v1/company-context')
      .send(completeContextBody)
      .expect(200);

    otherUserId = `usr_${randomUUID()}`;
    await prisma.user.create({
      data: {
        id: otherUserId,
        email: OTHER_USER_EMAIL,
        passwordHash: 'unused-hash',
        role: 'user',
      },
    });

    historicalRunId = `run_${randomUUID()}`;
    await prisma.run.create({
      data: {
        id: historicalRunId,
        conversationId: `conv_${randomUUID()}`,
        taskType: 'post_ideas',
        platform: 'linkedin',
        language: 'pl',
        status: 'interrupted',
        brief: { topic: 'pre-auth-historical' },
        recoveryAttempts: 1,
      },
    });

    otherUserRunId = `run_${randomUUID()}`;
    await prisma.run.create({
      data: {
        id: otherUserRunId,
        conversationId: `conv_${randomUUID()}`,
        taskType: 'post_ideas',
        platform: 'instagram',
        language: 'pl',
        status: 'completed',
        brief: { topic: 'other-user' },
        startedByUserId: otherUserId,
      },
    });

    pageCopyRunId = `run_${randomUUID()}`;
    await prisma.run.create({
      data: {
        id: pageCopyRunId,
        conversationId: `conv_${randomUUID()}`,
        taskType: 'page_copy',
        platform: 'web',
        contentKind: 'landing',
        language: 'pl',
        status: 'completed',
        brief: { topic: 'landing-page' },
        startedByUserId: sessionUser.id,
      },
    });

    createdRunIds = [];
    for (let index = 0; index < 11; index += 1) {
      const created = await agent
        .post('/api/v1/runs')
        .send({
          ...startRunBody,
          brief: { topic: `Q3-${index}` },
        })
        .expect(202);
      createdRunIds.push(readRunId(created.body));
      await sleep(10);
    }

    await waitUntil(async () => {
      const trackedIds = [...createdRunIds, historicalRunId];
      const rows = await prisma.run.findMany({
        where: { id: { in: trackedIds } },
        select: { status: true },
      });
      return (
        rows.length === trackedIds.length &&
        rows.every((row) => row.status === 'completed')
      );
    }, 'all seeded runs to complete');
  }, 30_000);

  afterAll(async () => {
    if (prisma) {
      await wipeRuns(prisma);
      await prisma.user.deleteMany({ where: { email: OTHER_USER_EMAIL } });
    }
    await app?.close();
  }, 15_000);

  it('rejects GET /api/v1/runs without a session cookie', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/runs')
      .expect(401);
    expect(response.body.code).toBe('UNAUTHORIZED');
  });

  it('D-82: without page/pageSize returns the full collection envelope', async () => {
    const response = await agent.get('/api/v1/runs').expect(200);
    const listed = readListBody(response.body);

    expect(listed.page).toBe(1);
    expect(listed.pageSize).toBe(listed.total);
    expect(listed.items).toHaveLength(listed.total);
    expect(listed.total).toBe(14);

    const empty = readListBody(
      (
        await agent
          .get('/api/v1/runs')
          .query({ userId: UNKNOWN_USER_ID })
          .expect(200)
      ).body,
    );
    expect(empty.page).toBe(1);
    expect(empty.pageSize).toBe(0);
    expect(empty.total).toBe(0);
    expect(empty.items).toEqual([]);
  });

  it('GET /api/v1/runs page=1 returns 10 newest items with session startedBy', async () => {
    const response = await agent
      .get('/api/v1/runs')
      .query({ page: 1 })
      .expect(200);
    const listed = readListBody(response.body);

    expect(listed.page).toBe(1);
    expect(listed.pageSize).toBe(10);
    expect(listed.total).toBe(14);
    expect(listed.items).toHaveLength(10);

    const createdAtValues = listed.items.map((item) => item.createdAt);
    expect(createdAtValues).toEqual(
      [...createdAtValues].sort((left, right) => right.localeCompare(left)),
    );
    expect(listed.items[0]?.runId).toBe(
      createdRunIds[createdRunIds.length - 1],
    );
    expect(
      listed.items.every(
        (item) =>
          item.startedBy !== null &&
          item.startedBy.id === sessionUser.id &&
          item.startedBy.email === sessionUser.email,
      ),
    ).toBe(true);

    const pageTwo = await agent
      .get('/api/v1/runs')
      .query({ page: 2 })
      .expect(200);
    const second = readListBody(pageTwo.body);

    expect(second.page).toBe(2);
    expect(second.pageSize).toBe(10);
    expect(second.total).toBe(listed.total);
    expect(second.items.length).toBeGreaterThanOrEqual(1);
    expect(second.items.length).toBeLessThanOrEqual(10);
    expect(second.items.some((item) => item.runId === historicalRunId)).toBe(
      true,
    );
  });

  it('keeps startedBy null after the worker recovers a historical run without an initiator', async () => {
    const listed = readListBody(
      (await agent.get('/api/v1/runs').query({ page: 2 }).expect(200)).body,
    );
    const historical = listed.items.find(
      (item) => item.runId === historicalRunId,
    );
    expect(historical).toBeDefined();
    if (historical === undefined) {
      throw new Error('historical run missing from page 2');
    }
    expect(historical).toEqual(
      expect.objectContaining({
        runId: historicalRunId,
        status: 'completed',
        startedBy: null,
      }),
    );

    const snapshot = await agent
      .get(`/api/v1/runs/${historicalRunId}`)
      .expect(200);
    expect(snapshot.body.startedBy).toBeNull();
    expect(snapshot.body.status).toBe('completed');
    expect(snapshot.body.createdAt).toBe(historical.createdAt);
  });

  it('filters by status=completed and keeps list meta aligned with GET :runId snapshot', async () => {
    const listed = readListBody(
      (
        await agent
          .get('/api/v1/runs')
          .query({ page: 1, status: 'completed' })
          .expect(200)
      ).body,
    );

    expect(listed.pageSize).toBe(10);
    expect(listed.total).toBe(14);
    expect(listed.items).toHaveLength(10);
    expect(
      listed.items.every((item) => item.status === 'completed'),
    ).toBe(true);

    const row = listed.items[0];
    expect(row).toBeDefined();
    if (row === undefined) {
      return;
    }

    const snapshot = await agent
      .get(`/api/v1/runs/${row.runId}`)
      .expect(200);

    expect(snapshot.body.runId).toBe(row.runId);
    expect(snapshot.body.createdAt).toBe(row.createdAt);
    expect(snapshot.body.startedBy).toEqual(row.startedBy);
    expect(snapshot.body.taskType).toBe(row.taskType);
    expect(snapshot.body.platform).toBe(row.platform);
    expect(snapshot.body.status).toBe(row.status);
    expect(snapshot.body.contentKind).toBe(row.contentKind);
  });

  it('filters by userId, taskType and platform without mixing collections', async () => {
    const own = readListBody(
      (
        await agent
          .get('/api/v1/runs')
          .query({ page: 1, userId: sessionUser.id })
          .expect(200)
      ).body,
    );
    expect(own.total).toBe(12);
    expect(
      own.items.every(
        (item) => item.startedBy !== null && item.startedBy.id === sessionUser.id,
      ),
    ).toBe(true);
    expect(own.items.some((item) => item.runId === otherUserRunId)).toBe(false);

    const other = readListBody(
      (
        await agent
          .get('/api/v1/runs')
          .query({ page: 1, userId: otherUserId })
          .expect(200)
      ).body,
    );
    expect(other.total).toBe(1);
    expect(other.items).toHaveLength(1);
    expect(other.items[0]).toEqual(
      expect.objectContaining({
        runId: otherUserRunId,
        platform: 'instagram',
        startedBy: expect.objectContaining({
          id: otherUserId,
          email: OTHER_USER_EMAIL,
          role: expect.stringMatching(/^(admin|user|guest)$/),
        }),
      }),
    );

    const unknown = readListBody(
      (
        await agent
          .get('/api/v1/runs')
          .query({ page: 1, userId: UNKNOWN_USER_ID })
          .expect(200)
      ).body,
    );
    expect(unknown.total).toBe(0);
    expect(unknown.items).toEqual([]);

    const instagram = readListBody(
      (
        await agent
          .get('/api/v1/runs')
          .query({ page: 1, platform: 'instagram' })
          .expect(200)
      ).body,
    );
    expect(instagram.total).toBe(1);
    expect(instagram.items[0]?.runId).toBe(otherUserRunId);

    const linkedin = readListBody(
      (
        await agent
          .get('/api/v1/runs')
          .query({ page: 1, platform: 'linkedin' })
          .expect(200)
      ).body,
    );
    expect(linkedin.total).toBe(12);
    expect(linkedin.items.every((item) => item.platform === 'linkedin')).toBe(
      true,
    );

    const pageCopy = readListBody(
      (
        await agent
          .get('/api/v1/runs')
          .query({ page: 1, taskType: 'page_copy' })
          .expect(200)
      ).body,
    );
    expect(pageCopy.total).toBe(1);
    expect(pageCopy.items[0]).toEqual(
      expect.objectContaining({
        runId: pageCopyRunId,
        taskType: 'page_copy',
        platform: 'web',
        contentKind: 'landing',
        startedBy: expect.objectContaining({
          id: sessionUser.id,
          email: sessionUser.email,
          role: expect.stringMatching(/^(admin|user|guest)$/),
        }),
      }),
    );
  });

  it('D-83: accepts allowlisted pageSize and rejects invalid pagination / filters', async () => {
    for (const pageSize of [10, 15, 25, 50] as const) {
      const allowed = await agent
        .get('/api/v1/runs')
        .query({ page: 1, pageSize })
        .expect(200);
      const allowedBody = readListBody(allowed.body);
      expect(allowedBody.page).toBe(1);
      expect(allowedBody.pageSize).toBe(pageSize);
      expect(allowedBody.items.length).toBeLessThanOrEqual(pageSize);
      expect(typeof allowedBody.total).toBe('number');
      expect(allowedBody.total).toBeGreaterThanOrEqual(allowedBody.items.length);
    }

    const onlyPageSize = readListBody(
      (
        await agent
          .get('/api/v1/runs')
          .query({ pageSize: 15 })
          .expect(200)
      ).body,
    );
    expect(onlyPageSize.page).toBe(1);
    expect(onlyPageSize.pageSize).toBe(15);

    for (const pageSize of [11, 100] as const) {
      const forbiddenSize = await agent
        .get('/api/v1/runs')
        .query({ pageSize })
        .expect(400);
      expect(forbiddenSize.body.code).toBe('VALIDATION_FAILED');
    }

    const pageZero = await agent
      .get('/api/v1/runs')
      .query({ page: 0 })
      .expect(400);
    expect(pageZero.body.code).toBe('VALIDATION_FAILED');

    const pageAbc = await agent
      .get('/api/v1/runs')
      .query({ page: 'abc' })
      .expect(400);
    expect(pageAbc.body.code).toBe('VALIDATION_FAILED');

    const limit = await agent
      .get('/api/v1/runs')
      .query({ limit: 20 })
      .expect(400);
    expect(limit.body.code).toBe('VALIDATION_FAILED');

    const userId = await agent
      .get('/api/v1/runs')
      .query({ userId: 'not-a-user-id' })
      .expect(400);
    expect(userId.body.code).toBe('VALIDATION_FAILED');

    const taskType = await agent
      .get('/api/v1/runs')
      .query({ taskType: 'not-a-task' })
      .expect(400);
    expect(taskType.body.code).toBe('VALIDATION_FAILED');

    const platform = await agent
      .get('/api/v1/runs')
      .query({ platform: 'tiktok' })
      .expect(400);
    expect(platform.body.code).toBe('VALIDATION_FAILED');
  });

  it('D-84: GET /runs/user/:userId supports all vs page modes and forbids foreign id', async () => {
    const allOwn = readLightUserRunsBody(
      (await agent.get(`/api/v1/runs/user/${sessionUser.id}`).expect(200)).body,
    );
    expect(allOwn.page).toBe(1);
    expect(allOwn.pageSize).toBe(allOwn.total);
    expect(allOwn.items).toHaveLength(allOwn.total);
    expect(allOwn.total).toBeGreaterThanOrEqual(12);

    const paged = readLightUserRunsBody(
      (
        await agent
          .get(`/api/v1/runs/user/${sessionUser.id}`)
          .query({ page: 1, pageSize: 10 })
          .expect(200)
      ).body,
    );
    expect(paged.page).toBe(1);
    expect(paged.pageSize).toBe(10);
    expect(paged.items.length).toBeLessThanOrEqual(10);
    expect(paged.total).toBe(allOwn.total);

    const forbiddenSize = await agent
      .get(`/api/v1/runs/user/${sessionUser.id}`)
      .query({ pageSize: 11 })
      .expect(400);
    expect(forbiddenSize.body.code).toBe('VALIDATION_FAILED');

    const foreign = await agent
      .get(`/api/v1/runs/user/${otherUserId}`)
      .expect(403);
    expect(foreign.body.code).toBe('FORBIDDEN');
  });

  it('accepts status=interrupted on GET /api/v1/runs while the worker is idle', async () => {
    const interruptedId = `run_${randomUUID()}`;
    await prisma.run.create({
      data: {
        id: interruptedId,
        conversationId: `conv_${randomUUID()}`,
        taskType: 'post_ideas',
        platform: 'linkedin',
        language: 'pl',
        status: 'interrupted',
        brief: { topic: 'recovery-filter' },
        recoveryAttempts: 1,
      },
    });

    const listed = readListBody(
      (
        await agent
          .get('/api/v1/runs')
          .query({ page: 1, status: 'interrupted' })
          .expect(200)
      ).body,
    );

    expect(listed.total).toBe(1);
    expect(listed.items).toHaveLength(1);
    expect(listed.items[0]?.runId).toBe(interruptedId);
    expect(listed.items[0]?.status).toBe('interrupted');
    expect(listed.items[0]?.startedBy).toBeNull();

    const rejected = await agent
      .get('/api/v1/runs')
      .query({ status: 'not-a-status' })
      .expect(400);
    expect(rejected.body.code).toBe('VALIDATION_FAILED');
  });

  it('D-28: filters status=completed,failed,cancelled; single interrupted; rejects unknown', async () => {
    const failedId = `run_${randomUUID()}`;
    const cancelledId = `run_${randomUUID()}`;
    const interruptedId = `run_${randomUUID()}`;
    await prisma.run.create({
      data: {
        id: failedId,
        conversationId: `conv_${randomUUID()}`,
        taskType: 'post_ideas',
        platform: 'linkedin',
        language: 'pl',
        status: 'failed',
        brief: { topic: 'd28-failed' },
      },
    });
    await prisma.run.create({
      data: {
        id: cancelledId,
        conversationId: `conv_${randomUUID()}`,
        taskType: 'post_ideas',
        platform: 'linkedin',
        language: 'pl',
        status: 'cancelled',
        brief: { topic: 'd28-cancelled' },
        cancelledAt: new Date('2026-09-29T12:00:00.000Z'),
      },
    });
    await prisma.run.create({
      data: {
        id: interruptedId,
        conversationId: `conv_${randomUUID()}`,
        taskType: 'post_ideas',
        platform: 'linkedin',
        language: 'pl',
        status: 'interrupted',
        brief: { topic: 'd28-interrupted' },
        recoveryAttempts: 1,
      },
    });

    const mixed = await agent.get('/api/v1/runs').query({
      status: 'completed,failed,cancelled',
      page: 1,
      pageSize: 10,
    });
    expect(mixed.status).toBe(200);
    const mixedBody = readListBody(mixed.body);
    expect(mixedBody.page).toBe(1);
    expect(mixedBody.pageSize).toBe(10);
    expect(
      mixedBody.items.every(
        (item) =>
          item.status === 'completed' ||
          item.status === 'failed' ||
          item.status === 'cancelled',
      ),
    ).toBe(true);
    for (let i = 1; i < mixedBody.items.length; i += 1) {
      expect(
        Date.parse(mixedBody.items[i - 1].createdAt),
      ).toBeGreaterThanOrEqual(Date.parse(mixedBody.items[i].createdAt));
    }
    expect(mixedBody.items.some((item) => item.runId === failedId)).toBe(true);
    expect(mixedBody.items.some((item) => item.runId === cancelledId)).toBe(
      true,
    );
    expect(
      mixedBody.items.every((item) => item.runId !== interruptedId),
    ).toBe(true);

    const single = await agent.get('/api/v1/runs').query({
      status: 'interrupted',
    });
    expect(single.status).toBe(200);
    const singleBody = readListBody(single.body);
    expect(singleBody.items.every((item) => item.status === 'interrupted')).toBe(
      true,
    );
    expect(singleBody.items.some((item) => item.runId === interruptedId)).toBe(
      true,
    );

    const bad = await agent.get('/api/v1/runs').query({
      status: 'completed,nope',
    });
    expect(bad.status).toBe(400);
    expect(bad.body.code).toBe('VALIDATION_FAILED');
  });
});
