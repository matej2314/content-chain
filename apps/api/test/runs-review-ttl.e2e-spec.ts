import { execFileSync } from 'child_process';
import { join } from 'path';
import { randomUUID } from 'node:crypto';
import { type INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { AppModule } from '../src/app.module';
import { LLM_GATEWAY_PORT } from '../src/llm/llm.tokens';
import { AutoFinalizeExpiredReviewsUseCase } from '../src/runs/application/auto-finalize-expired-reviews.use-case';
import { ENV, type Env } from '../src/shared/config/env';
import { validateEnv } from '../src/shared/config/env.schema';
import { configureHttpApp } from '../src/shared/http/configure-http-app';
import { PrismaService } from '../src/shared/persistence/prisma.service';
import {
  createAuthenticatedAgent,
  type E2eAgent,
} from './authenticated-agent';
import { FakeLlmGateway } from './fake-llm-gateway';

/** REVIEW_TTL default 2h — anchors older than this are past the review window. */
const TTL_MS = 2 * 60 * 60 * 1000;
const IDEA_ID = 'idea_ttl_1';

const IDEA_PAYLOAD = {
  id: IDEA_ID,
  title: 'TTL idea',
  angle: 'A',
  hook: 'H',
};

const EDITED_RESULT = {
  result: {
    ideas: [
      {
        id: IDEA_ID,
        title: 'TTL edited',
        angle: 'A',
        hook: 'H',
      },
    ],
  },
};

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

type ReviewSnapshotBody = {
  status: string;
  userRating: number | null;
  outputEdited: boolean;
  reviewFinalizedAt: string | null;
  pipelineFinishedAt: string | null;
  reviewExpiresAt: string | null;
  result?: { ideas?: Array<{ id: string; title: string }> };
};

type ErrorBody = { code?: string };

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

function hoursAgo(hours: number): Date {
  return new Date(Date.now() - hours * 60 * 60 * 1000);
}

function expectedAutoFinalizeIso(pipelineFinishedAt: Date): string {
  return new Date(pipelineFinishedAt.getTime() + TTL_MS).toISOString();
}

describe('Runs review TTL (e2e)', () => {
  let app: INestApplication;
  let agent: E2eAgent;
  let prisma: PrismaService;
  let autoFinalize: AutoFinalizeExpiredReviewsUseCase;
  let sessionUserId: string;
  let previousSweep: string | undefined;
  let previousTtl: string | undefined;

  beforeAll(async () => {
    deployTestDb();

    const standalone = new PrismaClient();
    try {
      await standalone.$connect();
      await wipeRuns(standalone);
    } finally {
      await standalone.$disconnect();
    }

    previousSweep = process.env.REVIEW_SWEEP_INTERVAL;
    previousTtl = process.env.REVIEW_TTL;
    // Long interval so boot tick does not race mid-test; TTL stays default 2h.
    process.env.REVIEW_SWEEP_INTERVAL = '1h';
    process.env.REVIEW_TTL = '2h';
    const env: Env = validateEnv(process.env);

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(ENV)
      .useValue(env)
      .overrideProvider(LLM_GATEWAY_PORT)
      .useValue(new FakeLlmGateway())
      .compile();

    app = moduleRef.createNestApplication();
    configureHttpApp(app);
    await app.init();
    prisma = app.get(PrismaService);
    autoFinalize = app.get(AutoFinalizeExpiredReviewsUseCase);
    agent = await createAuthenticatedAgent(app);

    const me = await agent.get('/api/v1/auth/me').expect(200);
    sessionUserId = (me.body as { id: string }).id;

    await agent
      .put('/api/v1/company-context')
      .send(completeContextBody)
      .expect(200);
  }, 30_000);

  beforeEach(async () => {
    await wipeRuns(prisma);
  });

  afterAll(async () => {
    try {
      if (prisma) {
        await wipeRuns(prisma);
      }
      await app?.close();
    } finally {
      process.env.REVIEW_SWEEP_INTERVAL = previousSweep;
      process.env.REVIEW_TTL = previousTtl;
    }
  }, 15_000);

  async function seedCompletedReview(options: {
    pipelineFinishedAt: Date | null;
    userRating?: number | null;
    outputEdited?: boolean;
    reviewFinalizedAt?: Date | null;
    withIdea?: boolean;
  }): Promise<{ runId: string; pipelineFinishedAt: Date | null }> {
    const runId = `run_${randomUUID()}`;
    await prisma.run.create({
      data: {
        id: runId,
        conversationId: `conv_${randomUUID()}`,
        taskType: 'post_ideas',
        platform: 'linkedin',
        language: 'pl',
        status: 'completed',
        brief: { topic: 'review-ttl' },
        startedByUserId: sessionUserId,
        userRating: options.userRating ?? null,
        outputEdited: options.outputEdited ?? false,
        reviewFinalizedAt: options.reviewFinalizedAt ?? null,
        pipelineFinishedAt: options.pipelineFinishedAt,
      },
    });
    if (options.withIdea !== false) {
      await prisma.socialIdea.create({
        data: {
          id: `sid_${randomUUID()}`,
          runId,
          payload: IDEA_PAYLOAD,
        },
      });
    }
    return { runId, pipelineFinishedAt: options.pipelineFinishedAt };
  }

  async function readSnapshot(runId: string): Promise<ReviewSnapshotBody> {
    const response = await agent.get(`/api/v1/runs/${runId}`).expect(200);
    return response.body as ReviewSnapshotBody;
  }

  async function readDbReview(runId: string): Promise<{
    userRating: number | null;
    outputEdited: boolean;
    reviewFinalizedAt: Date | null;
    pipelineFinishedAt: Date | null;
  }> {
    const row = await prisma.run.findUniqueOrThrow({
      where: { id: runId },
      select: {
        userRating: true,
        outputEdited: true,
        reviewFinalizedAt: true,
        pipelineFinishedAt: true,
      },
    });
    return row;
  }

  it('D-12: success rating / output-edited / finalize expose TTL meta', async () => {
    const anchor = new Date();
    const { runId } = await seedCompletedReview({
      pipelineFinishedAt: anchor,
    });

    const rated = await agent
      .patch(`/api/v1/runs/${runId}/rating`)
      .send({ rating: 4 })
      .expect(200);
    expect(rated.body.pipelineFinishedAt).toBe(anchor.toISOString());
    expect(typeof rated.body.reviewExpiresAt).toBe('string');
    expect(rated.body.reviewExpiresAt).toBe(
      new Date(anchor.getTime() + TTL_MS).toISOString(),
    );

    const edited = await agent
      .post(`/api/v1/runs/${runId}/output-edited`)
      .send(EDITED_RESULT)
      .expect(200);
    expect(edited.body.pipelineFinishedAt).toBe(anchor.toISOString());
    expect(edited.body.reviewExpiresAt).toBe(
      new Date(anchor.getTime() + TTL_MS).toISOString(),
    );

    const finalized = await agent
      .post(`/api/v1/runs/${runId}/finalize-review`)
      .expect(200);
    expect(finalized.body.pipelineFinishedAt).toBe(anchor.toISOString());
    expect(finalized.body.reviewExpiresAt).toBeNull();
    expect(typeof finalized.body.reviewFinalizedAt).toBe('string');
  });

  it('D-35: after TTL, mutations → 409 REVIEW_LOCKED without changing review fields', async () => {
    const anchor = hoursAgo(3);
    const { runId } = await seedCompletedReview({
      pipelineFinishedAt: anchor,
      userRating: 3,
      outputEdited: false,
    });

    const before = await readDbReview(runId);
    expect(before.reviewFinalizedAt).toBeNull();
    expect(before.userRating).toBe(3);
    expect(before.outputEdited).toBe(false);

    const rating = await agent
      .patch(`/api/v1/runs/${runId}/rating`)
      .send({ rating: 5 })
      .expect(409);
    expect((rating.body as ErrorBody).code).toBe('REVIEW_LOCKED');

    const edited = await agent
      .post(`/api/v1/runs/${runId}/output-edited`)
      .send(EDITED_RESULT)
      .expect(409);
    expect((edited.body as ErrorBody).code).toBe('REVIEW_LOCKED');

    const finalized = await agent
      .post(`/api/v1/runs/${runId}/finalize-review`)
      .expect(409);
    expect((finalized.body as ErrorBody).code).toBe('REVIEW_LOCKED');

    const after = await readDbReview(runId);
    expect(after.userRating).toBe(3);
    expect(after.outputEdited).toBe(false);
    expect(after.reviewFinalizedAt).toBeNull();

    const snapshot = await readSnapshot(runId);
    expect(snapshot.userRating).toBe(3);
    expect(snapshot.outputEdited).toBe(false);
    expect(snapshot.reviewFinalizedAt).toBeNull();
    expect(snapshot.result?.ideas?.[0]?.title).toBe('TTL idea');
  });

  it('D-38: GET after TTL before sweeper keeps reviewFinalizedAt null and reviewExpiresAt ISO', async () => {
    const anchor = hoursAgo(3);
    const { runId } = await seedCompletedReview({
      pipelineFinishedAt: anchor,
      userRating: 2,
    });

    const snapshot = await readSnapshot(runId);
    expect(snapshot.reviewFinalizedAt).toBeNull();
    expect(snapshot.pipelineFinishedAt).toBe(anchor.toISOString());
    expect(snapshot.reviewExpiresAt).toBe(expectedAutoFinalizeIso(anchor));

    const db = await readDbReview(runId);
    expect(db.reviewFinalizedAt).toBeNull();
    expect(db.userRating).toBe(2);
  });

  it('D-36 + D-37: sweeper locks at pipelineFinishedAt+TTL; restart path stays locked', async () => {
    const anchor = hoursAgo(3);
    const { runId } = await seedCompletedReview({
      pipelineFinishedAt: anchor,
      userRating: 4,
      outputEdited: true,
    });

    const lockedCount = await autoFinalize.execute();
    expect(lockedCount).toBeGreaterThanOrEqual(1);

    const db = await readDbReview(runId);
    expect(db.reviewFinalizedAt?.toISOString()).toBe(
      expectedAutoFinalizeIso(anchor),
    );
    expect(db.userRating).toBe(4);
    expect(db.outputEdited).toBe(true);

    const snapshot = await readSnapshot(runId);
    expect(snapshot.reviewFinalizedAt).toBe(expectedAutoFinalizeIso(anchor));
    expect(snapshot.reviewExpiresAt).toBeNull();
    expect(snapshot.userRating).toBe(4);
    expect(snapshot.outputEdited).toBe(true);

    // D-37: second sweep (restart simulation) + mutation still locked
    const secondSweep = await autoFinalize.execute();
    expect(secondSweep).toBe(0);

    const again = await agent
      .patch(`/api/v1/runs/${runId}/rating`)
      .send({ rating: 1 })
      .expect(409);
    expect((again.body as ErrorBody).code).toBe('REVIEW_LOCKED');

    const unchanged = await readDbReview(runId);
    expect(unchanged.userRating).toBe(4);
    expect(unchanged.reviewFinalizedAt?.toISOString()).toBe(
      expectedAutoFinalizeIso(anchor),
    );
  });

  it('D-39: legacy completed with old anchor locks via sweeper like D-36', async () => {
    const legacyAnchor = hoursAgo(48);
    const { runId } = await seedCompletedReview({
      pipelineFinishedAt: legacyAnchor,
      userRating: null,
      outputEdited: false,
    });

    await autoFinalize.execute();

    const db = await readDbReview(runId);
    expect(db.reviewFinalizedAt?.toISOString()).toBe(
      expectedAutoFinalizeIso(legacyAnchor),
    );
    expect(db.userRating).toBeNull();
    expect(db.outputEdited).toBe(false);
  });

  it('D-40: manual finalize / cancelled / feedback after auto-close', async () => {
    const openAnchor = new Date();
    const { runId: openRunId } = await seedCompletedReview({
      pipelineFinishedAt: openAnchor,
    });

    await agent.post(`/api/v1/runs/${openRunId}/finalize-review`).expect(200);

    const lockedRating = await agent
      .patch(`/api/v1/runs/${openRunId}/rating`)
      .send({ rating: 5 })
      .expect(409);
    expect((lockedRating.body as ErrorBody).code).toBe('REVIEW_LOCKED');

    const cancelledId = `run_${randomUUID()}`;
    await prisma.run.create({
      data: {
        id: cancelledId,
        conversationId: `conv_${randomUUID()}`,
        taskType: 'post_ideas',
        platform: 'linkedin',
        language: 'pl',
        status: 'cancelled',
        brief: { topic: 'cancelled-ttl' },
        startedByUserId: sessionUserId,
        pipelineFinishedAt: null,
        cancelledAt: new Date(),
      },
    });

    const cancelledSnap = await readSnapshot(cancelledId);
    expect(cancelledSnap.status).toBe('cancelled');
    expect(cancelledSnap.pipelineFinishedAt).toBeNull();
    expect(cancelledSnap.reviewExpiresAt).toBeNull();

    const cancelledRate = await agent
      .patch(`/api/v1/runs/${cancelledId}/rating`)
      .send({ rating: 3 })
      .expect(409);
    expect((cancelledRate.body as ErrorBody).code).toBe('RUN_NOT_REVIEWABLE');

    const expiredAnchor = hoursAgo(3);
    const { runId: expiredRunId } = await seedCompletedReview({
      pipelineFinishedAt: expiredAnchor,
      userRating: 1,
    });
    await autoFinalize.execute();

    const feedback = await agent
      .post('/api/v1/feedback')
      .send({
        targetType: 'run',
        runId: expiredRunId,
        body: 'Feedback po auto-close TTL',
      })
      .expect(201);
    expect(typeof (feedback.body as { id?: string }).id).toBe('string');
    expect((feedback.body as { runId?: string }).runId).toBe(expiredRunId);
  });
});
