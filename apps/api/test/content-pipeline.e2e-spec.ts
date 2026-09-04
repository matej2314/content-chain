import { execFileSync } from 'child_process';
import { join } from 'path';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { LLM_GATEWAY_PORT } from '../src/llm/llm.tokens';
import { configureHttpApp } from '../src/shared/http/configure-http-app';
import { PrismaService } from '../src/shared/persistence/prisma.service';
import {
  FAKE_LLM_REQUEST_ID,
  FakeLlmGateway,
  pageDocumentJson,
  pageOutlineJson,
  verifierFail,
  verifierOk,
  type FakeLlmScriptItem,
} from './fake-llm-gateway';

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

type PageOutlineSectionBody = {
  id: string;
  heading: string;
  summary: string;
};

type PageOutlineBody = {
  id: string;
  title: string;
  sections: PageOutlineSectionBody[];
};

type PageDocumentBody = {
  title: string;
  lead: string;
  body: string;
  metaTitle?: string;
  metaDescription?: string;
};

type RunSnapshotBody = {
  runId: string;
  taskType: string;
  platform: string;
  contentKind: string | null;
  status: string;
  conversationId: string;
  result: {
    pageOutline: PageOutlineBody | null;
    pageDocument: PageDocumentBody | null;
  };
  hitl: { options: PageOutlineBody[] } | null;
};

type ListRunItem = {
  runId: string;
  taskType: string;
  platform: string;
  contentKind: string | null;
};

type RunLogItem = {
  at: string;
  level: string;
  message: string;
  step?: string;
  requestId?: string | null;
  conversationId?: string | null;
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

async function waitForRunStatus(
  app: INestApplication,
  runId: string,
  expected: string,
  timeoutMs = 15_000,
): Promise<RunSnapshotBody> {
  const deadline = Date.now() + timeoutMs;
  let lastStatus: string | undefined;
  while (Date.now() < deadline) {
    const response = await request(app.getHttpServer())
      .get(`/api/v1/runs/${runId}`)
      .expect(200);
    const body = response.body as RunSnapshotBody;
    lastStatus = body.status;
    if (lastStatus === expected) {
      return body;
    }
    await sleep(25);
  }
  throw new Error(
    `timed out waiting for run ${runId} to become ${expected} (last: ${lastStatus})`,
  );
}

async function putCompleteContext(app: INestApplication): Promise<void> {
  await request(app.getHttpServer())
    .put('/api/v1/company-context')
    .send(completeContextBody)
    .expect(200);
}

async function postPageRun(
  app: INestApplication,
  taskType: 'page_copy' | 'page_outline_then_copy',
): Promise<{ runId: string; conversationId: string; status: string }> {
  const response = await request(app.getHttpServer())
    .post('/api/v1/runs')
    .send({
      taskType,
      contentKind: 'blog',
      language: 'pl',
      brief: { topic: 'Audyt procesów' },
    })
    .expect(202);
  return response.body as {
    runId: string;
    conversationId: string;
    status: string;
  };
}

async function getLogs(
  app: INestApplication,
  runId: string,
): Promise<RunLogItem[]> {
  const response = await request(app.getHttpServer())
    .get(`/api/v1/runs/${runId}/logs`)
    .expect(200);
  return (response.body as { items: RunLogItem[] }).items;
}

function assertNoGatewaySecret(serialized: string): void {
  expect(serialized).not.toMatch(/X-Gateway-Key/i);
  expect(serialized).not.toMatch(/GATEWAY_KEY/i);
  const gatewayKey = process.env.GATEWAY_KEY;
  if (gatewayKey) {
    expect(serialized).not.toContain(gatewayKey);
  }
}

describe('Content pipeline (e2e, fake LLM)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let fakeLlm: FakeLlmGateway;

  beforeAll(async () => {
    deployTestDb();
    fakeLlm = new FakeLlmGateway();

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(LLM_GATEWAY_PORT)
      .useValue(fakeLlm)
      .compile();

    app = moduleRef.createNestApplication();
    configureHttpApp(app);
    await app.init();
    prisma = app.get(PrismaService);
    await putCompleteContext(app);
  }, 30_000);

  afterAll(async () => {
    if (prisma) {
      await wipeRuns(prisma);
    }
    await app?.close();
  }, 15_000);

  beforeEach(async () => {
    fakeLlm.reset();
    const deadline = Date.now() + 15_000;
    while (Date.now() < deadline) {
      const active = await prisma.run.count({
        where: { status: { in: ['queued', 'running'] } },
      });
      if (active === 0) break;
      await sleep(25);
    }
    await wipeRuns(prisma);
  });

  function useScript(items: FakeLlmScriptItem[]): void {
    fakeLlm.script = [...items];
  }

  describe('D-17 page_copy full-auto', () => {
    it('queues, runs, completes with pageDocument and hop logs in DB', async () => {
      useScript([pageDocumentJson(), verifierOk()]);
      const startedAt = Date.now();
      const created = await postPageRun(app, 'page_copy');
      expect(Date.now() - startedAt).toBeLessThan(2_000);
      expect(['queued', 'running']).toContain(created.status);

      const snapshot = await waitForRunStatus(app, created.runId, 'completed');
      expect(snapshot.taskType).toBe('page_copy');
      expect(snapshot.contentKind).toBe('blog');
      expect(snapshot.platform).toBe('web');
      expect(snapshot.result.pageDocument?.title).toBe('Audyt procesów');
      expect(snapshot.result.pageDocument).toEqual({
        title: 'Audyt procesów',
        lead: 'Founderzy odzyskują czas.',
        body: 'Pełny tekst strony na bazie briefu i kontekstu.',
        metaTitle: 'Audyt procesów Acme',
        metaDescription: 'Przegląd ops w 10 dni.',
      });
      expect(snapshot.hitl).toBeNull();
      expect(
        await prisma.contentDocument.count({ where: { runId: created.runId } }),
      ).toBe(1);

      const logs = await getLogs(app, created.runId);
      expect(logs.length).toBeGreaterThan(0);
      expect(logs.some((entry) => entry.step === 'PageWriterAgent')).toBe(true);
      expect(logs.some((entry) => entry.step === 'ConsistencyVerifier')).toBe(
        true,
      );
      assertNoGatewaySecret(JSON.stringify(logs));

      const listedByTask = await request(app.getHttpServer())
        .get('/api/v1/runs')
        .query({ taskType: 'page_copy' })
        .expect(200);
      const taskItems = (listedByTask.body as { items: ListRunItem[] }).items;
      expect(taskItems.every((item) => item.taskType === 'page_copy')).toBe(
        true,
      );
      expect(taskItems.some((item) => item.runId === created.runId)).toBe(true);

      const listedByPlatform = await request(app.getHttpServer())
        .get('/api/v1/runs')
        .query({ platform: 'web' })
        .expect(200);
      const platformItems = (listedByPlatform.body as { items: ListRunItem[] })
        .items;
      expect(platformItems.every((item) => item.platform === 'web')).toBe(true);
      expect(platformItems.some((item) => item.runId === created.runId)).toBe(
        true,
      );
    });
  });

  describe('D-18 page_outline_then_copy HITL', () => {
    it('pauses for HITL, then writes pageDocument and completes', async () => {
      useScript([pageOutlineJson(), verifierOk()]);
      const created = await postPageRun(app, 'page_outline_then_copy');

      const paused = await waitForRunStatus(
        app,
        created.runId,
        'awaiting_hitl',
      );
      const outlineId = paused.hitl?.options[0]?.id;
      if (outlineId == null) {
        throw new Error('expected HITL options[0].id');
      }
      expect(outlineId).toEqual(expect.stringMatching(/^outl_/));
      expect(paused.hitl?.options).toEqual(
        paused.result.pageOutline == null ? [] : [paused.result.pageOutline],
      );
      expect(paused.result.pageDocument).toBeNull();

      useScript([pageDocumentJson(), verifierOk()]);
      const resume = await request(app.getHttpServer())
        .post(`/api/v1/runs/${created.runId}/hitl`)
        .send({ selectedIdeaIds: [outlineId] })
        .expect(202);
      expect(resume.body).toEqual({
        runId: created.runId,
        status: 'running',
      });

      const done = await waitForRunStatus(app, created.runId, 'completed');
      expect(done.hitl).toBeNull();
      expect(done.result.pageDocument?.body).toBe(
        'Pełny tekst strony na bazie briefu i kontekstu.',
      );
      expect(
        await prisma.contentDocument.count({ where: { runId: created.runId } }),
      ).toBe(1);
    });

    it('rejects HITL with a foreign outline id and stays awaiting_hitl', async () => {
      useScript([pageOutlineJson(), verifierOk()]);
      const created = await postPageRun(app, 'page_outline_then_copy');
      const paused = await waitForRunStatus(
        app,
        created.runId,
        'awaiting_hitl',
      );
      expect(paused.hitl?.options[0]?.id).toBeDefined();

      const response = await request(app.getHttpServer())
        .post(`/api/v1/runs/${created.runId}/hitl`)
        .send({ selectedIdeaIds: ['not-the-outline-id'] })
        .expect(400);

      expect(response.body.code).toBe('HITL_INVALID_SELECTION');

      const stillPaused = await request(app.getHttpServer())
        .get(`/api/v1/runs/${created.runId}`)
        .expect(200);
      expect((stillPaused.body as RunSnapshotBody).status).toBe(
        'awaiting_hitl',
      );
    });
  });

  describe('D-19 unknown taskType HTTP', () => {
    it('rejects taskType outside the enum with 400 VALIDATION_FAILED', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/runs')
        .send({
          taskType: 'not-a-task',
          platform: 'linkedin',
          language: 'pl',
          brief: { topic: 'Q3' },
        })
        .expect(400);

      expect(response.body.code).toBe('VALIDATION_FAILED');
    });
  });

  describe('D-19a brief XOR and union', () => {
    it('rejects page_copy with brief.ideaCount', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/runs')
        .send({
          taskType: 'page_copy',
          contentKind: 'blog',
          language: 'pl',
          brief: { topic: 'Audyt procesów', ideaCount: 5 },
        })
        .expect(400);

      expect(response.body.code).toBe('VALIDATION_FAILED');
    });

    it('rejects page_copy with platform linkedin', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/runs')
        .send({
          taskType: 'page_copy',
          contentKind: 'blog',
          platform: 'linkedin',
          language: 'pl',
          brief: { topic: 'Audyt procesów' },
        })
        .expect(400);

      expect(response.body.code).toBe('VALIDATION_FAILED');
    });
  });

  describe('page document refine', () => {
    it('completes after one successful refine', async () => {
      useScript([
        pageDocumentJson(),
        verifierFail(),
        pageDocumentJson(),
        verifierOk(),
      ]);
      const created = await postPageRun(app, 'page_copy');
      const snapshot = await waitForRunStatus(app, created.runId, 'completed');

      expect(snapshot.result.pageDocument?.title).toBe('Audyt procesów');
      const logs = await getLogs(app, created.runId);
      const refineHops = logs.filter(
        (entry) => entry.step === 'RefineDocument' && entry.level === 'info',
      );
      expect(refineHops).toHaveLength(1);
      expect(JSON.stringify(logs)).toContain('off-brand CTA');
    });

    it('fails after two refine attempts (N=2)', async () => {
      useScript([
        pageDocumentJson(),
        verifierFail(),
        pageDocumentJson(),
        verifierFail(),
        pageDocumentJson(),
        verifierFail(),
      ]);
      const created = await postPageRun(app, 'page_copy');
      const snapshot = await waitForRunStatus(app, created.runId, 'failed');

      expect(snapshot.status).toBe('failed');
      const logs = await getLogs(app, created.runId);
      const refineHops = logs.filter(
        (entry) => entry.step === 'RefineDocument' && entry.level === 'info',
      );
      expect(refineHops).toHaveLength(2);
      expect(JSON.stringify(logs)).toContain('off-brand CTA');
      expect(fakeLlm.calls).toHaveLength(6);
    });
  });

  describe('correlation', () => {
    it('sends the run conversationId on every chat and logs the stub requestId', async () => {
      useScript([pageDocumentJson(), verifierOk()]);
      const created = await postPageRun(app, 'page_copy');
      const snapshot = await waitForRunStatus(app, created.runId, 'completed');

      expect(fakeLlm.calls.length).toBeGreaterThanOrEqual(2);
      expect(
        fakeLlm.calls.every(
          (call) => call.conversationId === snapshot.conversationId,
        ),
      ).toBe(true);
      expect(snapshot.conversationId).toBe(created.conversationId);

      const logs = await getLogs(app, created.runId);
      const hopLogs = logs.filter(
        (entry) =>
          entry.step === 'PageWriterAgent' ||
          entry.step === 'ConsistencyVerifier',
      );
      expect(hopLogs.length).toBeGreaterThanOrEqual(2);
      expect(
        hopLogs.every(
          (entry) =>
            entry.conversationId === created.conversationId &&
            entry.requestId === FAKE_LLM_REQUEST_ID,
        ),
      ).toBe(true);
    });
  });
});
