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
  contentJson,
  ideasJson,
  reelIdeasJson,
  reelScriptJson,
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

type SocialIdeaBody = {
  id: string;
  title: string;
  angle: string;
  hook: string;
};

type SocialContentBody = {
  body: string;
  hashtags: string[];
  cta?: string;
};

type ReelIdeaBody = {
  id: string;
  title: string;
  description: string;
  hook: string;
  durationSeconds: 15 | 30 | 90;
};

type ReelScriptBody = {
  segments: Array<{
    startSeconds: number;
    endSeconds: number;
    onScreen: string;
    voiceover: string;
  }>;
  cta: string;
  notes?: string;
};

type RunSnapshotBody = {
  runId: string;
  taskType: string;
  status: string;
  conversationId: string;
  result: {
    ideas: SocialIdeaBody[];
    content: SocialContentBody | null;
    reelIdeas: ReelIdeaBody[];
    reelScript: ReelScriptBody | null;
  };
  hitl: { options: SocialIdeaBody[] | ReelIdeaBody[] } | null;
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

async function postRun(
  app: INestApplication,
  taskType:
    | 'post_ideas'
    | 'post_ideas_then_content'
    | 'reel_ideas'
    | 'reel_script'
    | 'reel_ideas_then_scripts',
): Promise<{ runId: string; conversationId: string; status: string }> {
  const response = await request(app.getHttpServer())
    .post('/api/v1/runs')
    .send({
      taskType,
      platform: 'linkedin',
      language: 'pl',
      brief: { topic: 'Q3' },
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

describe('Social pipeline (e2e, fake LLM)', () => {
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

  describe('D-4 post_ideas full-auto', () => {
    it('queues, runs, completes with ideas and hop logs in DB', async () => {
      useScript([ideasJson(), verifierOk()]);
      const startedAt = Date.now();
      const created = await postRun(app, 'post_ideas');
      expect(Date.now() - startedAt).toBeLessThan(2_000);
      expect(['queued', 'running']).toContain(created.status);

      const snapshot = await waitForRunStatus(app, created.runId, 'completed');
      expect(snapshot.taskType).toBe('post_ideas');
      expect(snapshot.result.ideas).toEqual([
        { id: 'idea_1', title: 'T1', angle: 'A1', hook: 'H1' },
        { id: 'idea_2', title: 'T2', angle: 'A2', hook: 'H2' },
      ]);
      expect(snapshot.result.content).toBeNull();
      expect(snapshot.hitl).toBeNull();
      expect(
        await prisma.socialIdea.count({ where: { runId: created.runId } }),
      ).toBe(2);

      const logs = await getLogs(app, created.runId);
      expect(logs.length).toBeGreaterThan(0);
      expect(logs.some((entry) => entry.step === 'IdeationAgent')).toBe(true);
      expect(logs.some((entry) => entry.step === 'ConsistencyVerifier')).toBe(
        true,
      );
      assertNoGatewaySecret(JSON.stringify(logs));
    });
  });

  describe('D-5 post_ideas_then_content HITL', () => {
    it('pauses for HITL, then writes content and completes', async () => {
      useScript([ideasJson(), verifierOk()]);
      const created = await postRun(app, 'post_ideas_then_content');

      const paused = await waitForRunStatus(
        app,
        created.runId,
        'awaiting_hitl',
      );
      expect(paused.hitl?.options).toEqual(paused.result.ideas);
      expect(paused.result.ideas[0]?.id).toBe('idea_1');
      expect(paused.result.content).toBeNull();

      useScript([contentJson(), verifierOk()]);
      const resume = await request(app.getHttpServer())
        .post(`/api/v1/runs/${created.runId}/hitl`)
        .send({ selectedIdeaIds: ['idea_1'] })
        .expect(202);
      expect(resume.body).toEqual({
        runId: created.runId,
        status: 'running',
      });

      const done = await waitForRunStatus(app, created.runId, 'completed');
      expect(done.hitl).toBeNull();
      expect(done.result.content).toEqual({
        body: 'Gotowy post.',
        hashtags: ['#acme'],
        cta: 'Napisz do nas',
      });
      expect(
        await prisma.socialContent.count({ where: { runId: created.runId } }),
      ).toBe(1);
    });

    it('rejects HITL on a completed run with 409 HITL_REQUIRED', async () => {
      useScript([ideasJson(), verifierOk()]);
      const created = await postRun(app, 'post_ideas');
      await waitForRunStatus(app, created.runId, 'completed');

      const response = await request(app.getHttpServer())
        .post(`/api/v1/runs/${created.runId}/hitl`)
        .send({ selectedIdeaIds: ['idea_1'] })
        .expect(409);

      expect(response.body.code).toBe('HITL_REQUIRED');
    });
  });

  describe('D-6 verifier refine', () => {
    it('completes after one successful refine', async () => {
      useScript([ideasJson(), verifierFail(), ideasJson(), verifierOk()]);
      const created = await postRun(app, 'post_ideas');
      const snapshot = await waitForRunStatus(app, created.runId, 'completed');

      expect(snapshot.result.ideas).toHaveLength(2);
      const logs = await getLogs(app, created.runId);
      const refineHops = logs.filter(
        (entry) => entry.step === 'RefineIdeas' && entry.level === 'info',
      );
      expect(refineHops).toHaveLength(1);
      expect(JSON.stringify(logs)).toContain('off-brand CTA');
    });

    it('fails after two refine attempts (N=2)', async () => {
      useScript([
        ideasJson(),
        verifierFail(),
        ideasJson(),
        verifierFail(),
        ideasJson(),
        verifierFail(),
      ]);
      const created = await postRun(app, 'post_ideas');
      const snapshot = await waitForRunStatus(app, created.runId, 'failed');

      expect(snapshot.status).toBe('failed');
      const logs = await getLogs(app, created.runId);
      const refineHops = logs.filter(
        (entry) => entry.step === 'RefineIdeas' && entry.level === 'info',
      );
      expect(refineHops).toHaveLength(2);
      expect(JSON.stringify(logs)).toContain('off-brand CTA');
      expect(fakeLlm.calls).toHaveLength(6);
    });
  });

  describe('D-7 retryable gateway failure', () => {
    it('retries three times then marks the run failed without leaking GATEWAY_KEY', async () => {
      useScript(['GATEWAY_FAIL', 'GATEWAY_FAIL', 'GATEWAY_FAIL']);
      const created = await postRun(app, 'post_ideas');
      await waitForRunStatus(app, created.runId, 'failed');

      expect(fakeLlm.calls).toHaveLength(3);
      const logs = await getLogs(app, created.runId);
      const serialized = JSON.stringify(logs);
      expect(
        logs.filter((entry) =>
          entry.message.includes('LLM hop IdeationAgent failed (attempt'),
        ),
      ).toHaveLength(3);
      assertNoGatewaySecret(serialized);
    });
  });

  describe('D-8 correlation', () => {
    it('sends the run conversationId on every chat and logs the stub requestId', async () => {
      useScript([ideasJson(), verifierOk()]);
      const created = await postRun(app, 'post_ideas');
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
          entry.step === 'IdeationAgent' ||
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

  describe('D-15 reel_ideas full-auto', () => {
    it('completes with reelIdeas, persists two rows, and lists only reel_ideas', async () => {
      useScript([reelIdeasJson(), verifierOk()]);
      const created = await postRun(app, 'reel_ideas');

      const snapshot = await waitForRunStatus(app, created.runId, 'completed');
      expect(snapshot.taskType).toBe('reel_ideas');
      expect(snapshot.hitl).toBeNull();
      expect(snapshot.result.content).toBeNull();
      expect(snapshot.result.reelScript).toBeNull();
      expect(snapshot.result.reelIdeas[0]?.id).toBe('idea_1');
      expect(snapshot.result.reelIdeas).toEqual([
        {
          id: 'idea_1',
          title: 'R1',
          description: 'D1',
          hook: 'H1',
          durationSeconds: 15,
        },
        {
          id: 'idea_2',
          title: 'R2',
          description: 'D2',
          hook: 'H2',
          durationSeconds: 30,
        },
      ]);
      expect(
        await prisma.socialReelIdea.count({ where: { runId: created.runId } }),
      ).toBe(2);

      const listed = await request(app.getHttpServer())
        .get('/api/v1/runs')
        .query({ taskType: 'reel_ideas' })
        .expect(200);
      const items = (
        listed.body as { items: Array<{ runId: string; taskType: string }> }
      ).items;
      expect(items.every((item) => item.taskType === 'reel_ideas')).toBe(true);
      expect(items.some((item) => item.runId === created.runId)).toBe(true);
    });
  });

  describe('D-16 reel_ideas_then_scripts HITL', () => {
    it('pauses with reel HITL options, then writes reelScript and completes', async () => {
      useScript([reelIdeasJson(), verifierOk()]);
      const created = await postRun(app, 'reel_ideas_then_scripts');

      const paused = await waitForRunStatus(
        app,
        created.runId,
        'awaiting_hitl',
      );
      expect(paused.hitl?.options).toEqual(paused.result.reelIdeas);
      expect(paused.result.reelIdeas[0]?.id).toBe('idea_1');
      expect(paused.result.reelScript).toBeNull();

      useScript([reelScriptJson(), verifierOk()]);
      const resume = await request(app.getHttpServer())
        .post(`/api/v1/runs/${created.runId}/hitl`)
        .send({ selectedIdeaIds: ['idea_1'] })
        .expect(202);
      expect(resume.body).toEqual({
        runId: created.runId,
        status: 'running',
      });

      const done = await waitForRunStatus(app, created.runId, 'completed');
      expect(done.hitl).toBeNull();
      expect(done.result.reelScript?.segments).toEqual([
        {
          startSeconds: 0,
          endSeconds: 15,
          onScreen: 'hook na ekranie',
          voiceover: 'jedno zdanie problemu.',
        },
      ]);
      expect(done.result.reelScript?.cta).toBe('Napisz do nas');
      expect(
        await prisma.socialReelScript.count({
          where: { runId: created.runId },
        }),
      ).toBe(1);
    });
  });

  describe('D-19a brief XOR', () => {
    it('rejects post_ideas with brief.angle', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/runs')
        .send({
          taskType: 'post_ideas',
          platform: 'linkedin',
          language: 'pl',
          brief: { topic: 'Q3', angle: 'ops' },
        })
        .expect(400);

      expect(response.body.code).toBe('VALIDATION_FAILED');
    });
  });

  describe('reel_script solo', () => {
    it('completes with reelScript segments without HITL', async () => {
      useScript([reelScriptJson(), verifierOk()]);
      const created = await postRun(app, 'reel_script');

      const snapshot = await waitForRunStatus(app, created.runId, 'completed');
      expect(snapshot.taskType).toBe('reel_script');
      expect(snapshot.hitl).toBeNull();
      expect(snapshot.result.reelScript?.segments.length).toBeGreaterThan(0);
      expect(snapshot.result.reelScript).toEqual({
        segments: [
          {
            startSeconds: 0,
            endSeconds: 15,
            onScreen: 'hook na ekranie',
            voiceover: 'jedno zdanie problemu.',
          },
        ],
        cta: 'Napisz do nas',
      });
    });
  });
});
