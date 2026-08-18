import { execFileSync } from 'child_process';
import { randomUUID } from 'node:crypto';
import { join } from 'path';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { configureHttpApp } from '../src/shared/http/configure-http-app';
import { PrismaService } from '../src/shared/persistence/prisma.service';

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

type ListRunItem = {
  runId: string;
  taskType: string;
  platform: string;
  language: string;
  status: string;
  createdAt: string;
  startedBy: { id: string; email: string } | null;
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

describe('Runs list (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let createdRunIds: string[];

  beforeAll(async () => {
    deployTestDb();

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    configureHttpApp(app);
    await app.init();
    prisma = app.get(PrismaService);

    await wipeRuns(prisma);
    await request(app.getHttpServer())
      .put('/api/v1/company-context')
      .send(completeContextBody)
      .expect(200);

    createdRunIds = [];
    for (let index = 0; index < 11; index += 1) {
      const created = await request(app.getHttpServer())
        .post('/api/v1/runs')
        .send({
          ...startRunBody,
          brief: { topic: `Q3-${index}` },
        })
        .expect(202);
      createdRunIds.push(created.body.runId as string);
      await sleep(10);
    }

    await waitUntil(async () => {
      const rows = await prisma.run.findMany({
        where: { id: { in: createdRunIds } },
        select: { status: true },
      });
      return (
        rows.length === createdRunIds.length &&
        rows.every((row) => row.status === 'completed')
      );
    }, 'all seeded runs to complete');
  }, 30_000);

  afterAll(async () => {
    if (prisma) {
      await wipeRuns(prisma);
    }
    await app?.close();
  }, 15_000);

  it('GET /api/v1/runs page=1 returns 10 newest items, pageSize 10, total >= 11, startedBy null', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/runs')
      .query({ page: 1 })
      .expect(200);

    expect(response.body.page).toBe(1);
    expect(response.body.pageSize).toBe(10);
    expect(response.body.total).toBeGreaterThanOrEqual(11);
    expect(response.body.items).toHaveLength(10);

    const items = response.body.items as ListRunItem[];
    const createdAtValues = items.map((item) => item.createdAt);
    expect(createdAtValues).toEqual(
      [...createdAtValues].sort((left, right) => right.localeCompare(left)),
    );
    expect(items[0].runId).toBe(createdRunIds[createdRunIds.length - 1]);
    expect(items.every((item) => item.startedBy === null)).toBe(true);

    const pageTwo = await request(app.getHttpServer())
      .get('/api/v1/runs')
      .query({ page: 2 })
      .expect(200);

    expect(pageTwo.body.page).toBe(2);
    expect(pageTwo.body.pageSize).toBe(10);
    expect(pageTwo.body.total).toBe(response.body.total);
    expect(pageTwo.body.items.length).toBeGreaterThanOrEqual(1);
    expect(pageTwo.body.items.length).toBeLessThanOrEqual(10);
  });

  it('filters by status=completed and keeps list meta aligned with GET :runId snapshot', async () => {
    const listed = await request(app.getHttpServer())
      .get('/api/v1/runs')
      .query({ page: 1, status: 'completed' })
      .expect(200);

    expect(listed.body.pageSize).toBe(10);
    expect(listed.body.total).toBeGreaterThanOrEqual(11);
    expect(listed.body.items).toHaveLength(10);
    expect(
      (listed.body.items as ListRunItem[]).every(
        (item) => item.status === 'completed' && item.startedBy === null,
      ),
    ).toBe(true);

    const row = listed.body.items[0] as ListRunItem;
    const snapshot = await request(app.getHttpServer())
      .get(`/api/v1/runs/${row.runId}`)
      .expect(200);

    expect(snapshot.body.runId).toBe(row.runId);
    expect(snapshot.body.createdAt).toBe(row.createdAt);
    expect(snapshot.body.startedBy).toEqual(row.startedBy);
    expect(snapshot.body.taskType).toBe(row.taskType);
    expect(snapshot.body.platform).toBe(row.platform);
    expect(snapshot.body.status).toBe(row.status);
  });

  it('rejects client pageSize/limit override and invalid userId on the HTTP boundary', async () => {
    const pageSize = await request(app.getHttpServer())
      .get('/api/v1/runs')
      .query({ pageSize: 50 })
      .expect(400);
    expect(pageSize.body.code).toBe('VALIDATION_FAILED');

    const limit = await request(app.getHttpServer())
      .get('/api/v1/runs')
      .query({ limit: 20 })
      .expect(400);
    expect(limit.body.code).toBe('VALIDATION_FAILED');

    const userId = await request(app.getHttpServer())
      .get('/api/v1/runs')
      .query({ userId: 'not-a-user-id' })
      .expect(400);
    expect(userId.body.code).toBe('VALIDATION_FAILED');
  });

  it('accepts status=interrupted on GET /api/v1/runs and returns the seeded row', async () => {
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

    const listed = await request(app.getHttpServer())
      .get('/api/v1/runs')
      .query({ page: 1, status: 'interrupted' })
      .expect(200);

    const items = listed.body.items as ListRunItem[];
    expect(listed.body.total).toBe(1);
    expect(items).toHaveLength(1);
    expect(items[0].runId).toBe(interruptedId);
    expect(items.every((item) => item.status === 'interrupted')).toBe(true);

    const rejected = await request(app.getHttpServer())
      .get('/api/v1/runs')
      .query({ status: 'not-a-status' })
      .expect(400);
    expect(rejected.body.code).toBe('VALIDATION_FAILED');
  });
});
