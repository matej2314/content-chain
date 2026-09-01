import { DomainException } from '../../shared/exceptions/domain.exception';
import { newConversationId, newRunId } from '../../shared/http/new-ids';
import type { RunResultReader } from '../domain/run-result-reader.port';
import type { RunRepository, RunSnapshot } from '../domain/run.port';
import type { RunRecord } from '../domain/run.types';
import type {
  ReelIdea,
  ReelScript,
  SocialIdea,
} from '../../social/domain/social.types';
import { GetRunUseCase } from './get-run.use-case';

const ideas: SocialIdea[] = [
  { id: 'idea_1', title: 'T1', angle: 'A1', hook: 'H1' },
];

const reelIdeas: ReelIdea[] = [
  {
    id: 'idea_1',
    title: 'R1',
    description: 'D1',
    hook: 'H1',
    durationSeconds: 15,
  },
];

const reelScript: ReelScript = {
  segments: [
    {
      startSeconds: 0,
      endSeconds: 15,
      onScreen: 'Hook',
      voiceover: 'Powiedz problem.',
    },
  ],
  cta: 'Napisz do nas',
};

function unusedRepo(overrides: Partial<RunRepository>): RunRepository {
  const unexpected = async () => {
    throw new Error('unexpected repository call');
  };
  return {
    create: unexpected,
    getById: unexpected,
    saveStatus: unexpected,
    saveRecoveryAttempt: unexpected,
    claimNextQueued: unexpected,
    claimNextInterrupted: unexpected,
    findInterruptedRunning: unexpected,
    appendLog: unexpected,
    listLogs: unexpected,
    list: unexpected,
    saveSelectedIdeaIds: unexpected,
    ...overrides,
  };
}

function makeRun(
  status: RunRecord['status'],
  overrides: Partial<RunRecord> = {},
): RunRecord {
  return {
    id: newRunId(),
    conversationId: newConversationId(),
    taskType: 'post_ideas_then_content',
    platform: 'linkedin',
    language: 'pl',
    status,
    brief: { topic: 'Q3' },
    selectedIdeaIds: null,
    startedByUserId: null,
    pipelinePhase: 'ideas',
    ideasRefineCount: 0,
    contentRefineCount: 0,
    recoveryAttempts: 0,
    createdAt: new Date('2026-08-18T12:00:00.000Z'),
    ...overrides,
  };
}

function asSnapshot(run: RunRecord): RunSnapshot {
  return { ...run, startedBy: null };
}

function fakeReader(overrides: Partial<RunResultReader> = {}): RunResultReader {
  return {
    listIdeas: async () => ideas,
    getContent: async () => null,
    listReelIdeas: async () => [],
    getReelScript: async () => null,
    ...overrides,
  };
}

describe('GetRunUseCase', () => {
  it('returns hitl.options and result.ideas when awaiting_hitl', async () => {
    const run = makeRun('awaiting_hitl');
    const useCase = new GetRunUseCase(
      unusedRepo({ getById: async () => asSnapshot(run) }),
      fakeReader(),
    );

    await expect(useCase.execute(run.id)).resolves.toEqual({
      runId: run.id,
      taskType: run.taskType,
      platform: run.platform,
      language: run.language,
      status: 'awaiting_hitl',
      conversationId: run.conversationId,
      createdAt: run.createdAt.toISOString(),
      startedBy: null,
      result: { ideas, content: null, reelIdeas: [], reelScript: null },
      hitl: { options: ideas },
    });
  });

  it('returns hitl.options from reelIdeas when reel_ideas_then_scripts awaits HITL', async () => {
    const run = makeRun('awaiting_hitl', {
      taskType: 'reel_ideas_then_scripts',
    });
    const useCase = new GetRunUseCase(
      unusedRepo({ getById: async () => asSnapshot(run) }),
      fakeReader({
        listIdeas: async () => [],
        listReelIdeas: async () => reelIdeas,
      }),
    );

    await expect(useCase.execute(run.id)).resolves.toEqual({
      runId: run.id,
      taskType: 'reel_ideas_then_scripts',
      platform: run.platform,
      language: run.language,
      status: 'awaiting_hitl',
      conversationId: run.conversationId,
      createdAt: run.createdAt.toISOString(),
      startedBy: null,
      result: {
        ideas: [],
        content: null,
        reelIdeas,
        reelScript: null,
      },
      hitl: { options: reelIdeas },
    });
  });

  it('returns hitl null when interrupted even if ideas exist', async () => {
    const run = makeRun('interrupted');
    const useCase = new GetRunUseCase(
      unusedRepo({ getById: async () => asSnapshot(run) }),
      fakeReader(),
    );

    const snapshot = await useCase.execute(run.id);
    expect(snapshot.hitl).toBeNull();
    expect(snapshot.result).toEqual({
      ideas,
      content: null,
      reelIdeas: [],
      reelScript: null,
    });
  });

  it('maps stored content into result', async () => {
    const run = makeRun('completed');
    const content = { body: 'Post', hashtags: ['#acme'], cta: 'CTA' };
    const useCase = new GetRunUseCase(
      unusedRepo({ getById: async () => asSnapshot(run) }),
      fakeReader({
        getContent: async () => ({
          content,
          verification: { ok: true, contextIssues: [], languageIssues: [] },
        }),
      }),
    );

    const snapshot = await useCase.execute(run.id);
    expect(snapshot.result).toEqual({
      ideas,
      content,
      reelIdeas: [],
      reelScript: null,
    });
    expect(snapshot.hitl).toBeNull();
  });

  it('maps stored reel script into result', async () => {
    const run = makeRun('completed', { taskType: 'reel_script' });
    const useCase = new GetRunUseCase(
      unusedRepo({ getById: async () => asSnapshot(run) }),
      fakeReader({
        listIdeas: async () => [],
        getReelScript: async () => ({
          script: reelScript,
          verification: { ok: true, contextIssues: [], languageIssues: [] },
        }),
      }),
    );

    const snapshot = await useCase.execute(run.id);
    expect(snapshot.result).toEqual({
      ideas: [],
      content: null,
      reelIdeas: [],
      reelScript,
    });
    expect(snapshot.hitl).toBeNull();
  });

  it('throws RUN_NOT_FOUND when the run is missing', async () => {
    const useCase = new GetRunUseCase(
      unusedRepo({ getById: async () => null }),
      fakeReader(),
    );

    await expect(useCase.execute(newRunId())).rejects.toBeInstanceOf(
      DomainException,
    );
    await expect(useCase.execute(newRunId())).rejects.toMatchObject({
      code: 'RUN_NOT_FOUND',
    });
  });
});
