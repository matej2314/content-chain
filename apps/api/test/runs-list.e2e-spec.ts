import { execFileSync } from 'child_process';
import { randomUUID } from 'node:crypto';
import { join } from 'path';
import { type INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { RUN_EXECUTOR } from '../src/runs/domain/run-executor.port';
import { StubRunExecutor } from '../src/runs/infrastructure/stub-run.executor';
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
  audience: { profiles: [{ description: 'Founder SaaS B2B' }] },
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

type ListRunItem = {
  runId: string;
  taskType: string;
  platform: string;
  contentKind: string | null;
  language: string;
  status: string;
  createdAt: string;
  startedBy: SessionIdentity | null;
};

type ListRunsBody = {
  page: number;
  pageSize: number;
  total: number;
  items: ListRunItem[];
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

function readStartedBy(value: unknown): SessionIdentity | null {
  if (value === null) {
    return null;
  }
  return readSessionIdentity(value, 'startedBy');
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

function readListBody(body: unknown): ListRunsBody {
  if (!isRecord(body)) {
    throw new Error('list body is not an object');
  }
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
    items: body.items.map(readListItem),
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
        startedBy: { id: otherUserId, email: OTHER_USER_EMAIL },
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
        startedBy: sessionUser,
      }),
    );
  });

  it('rejects client pageSize/limit override and invalid userId on the HTTP boundary', async () => {
    const pageSize = await agent
      .get('/api/v1/runs')
      .query({ pageSize: 50 })
      .expect(400);
    expect(pageSize.body.code).toBe('VALIDATION_FAILED');

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
});
