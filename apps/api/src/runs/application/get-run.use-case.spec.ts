import { DomainException } from '../../shared/exceptions/domain.exception';
import { newRunId } from '../../shared/http/new-ids';
import type { RunResultReader } from '../domain/run-result-reader.port';
import type { RunRepository, RunSnapshot } from '../domain/run.port';
import type { RunRecord, SocialRunRecord } from '../domain/run.types';
import { makeContentRun, makeSocialRun } from '../run-record.test-helpers';
import type {
  PageDocument,
  PageOutline,
} from '../../content/domain/content.types';
import type {
  ReelIdea,
  ReelScript,
  ReelScriptItem,
  SocialContentItem,
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
  overrides: Partial<SocialRunRecord> = {},
): SocialRunRecord {
  return makeSocialRun({
    status,
    taskType: 'post_ideas_then_content',
    pipelinePhase: 'ideas',
    createdAt: new Date('2026-08-18T12:00:00.000Z'),
    ...overrides,
  });
}

function asSnapshot(run: RunRecord): RunSnapshot {
  return { ...run, startedBy: null };
}

function fakeReader(overrides: Partial<RunResultReader> = {}): RunResultReader {
  return {
    listIdeas: async () => ideas,
    getContent: async () => null,
    listContents: async () => [],
    listReelIdeas: async () => [],
    getReelScript: async () => null,
    listReelScripts: async () => [],
    getPageOutline: async () => null,
    getPageDocument: async () => null,
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
      contentKind: run.contentKind,
      language: run.language,
      brief: run.brief,
      status: 'awaiting_hitl',
      conversationId: run.conversationId,
      createdAt: run.createdAt.toISOString(),
      startedBy: null,
      result: {
        ideas,
        content: null,
        contents: [],
        reelIdeas: [],
        reelScript: null,
        reelScripts: [],
        pageOutline: null,
        pageDocument: null,
      },
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
      contentKind: run.contentKind,
      language: run.language,
      brief: run.brief,
      status: 'awaiting_hitl',
      conversationId: run.conversationId,
      createdAt: run.createdAt.toISOString(),
      startedBy: null,
      result: {
        ideas: [],
        content: null,
        contents: [],
        reelIdeas,
        reelScript: null,
        reelScripts: [],
        pageOutline: null,
        pageDocument: null,
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
      contents: [],
      reelIdeas: [],
      reelScript: null,
      reelScripts: [],
      pageOutline: null,
      pageDocument: null,
    });
  });

  it('maps then_content snapshot to contents and null scalar', async () => {
    const run = makeRun('completed', { selectedIdeaIds: ['idea_1'] });
    const contents: SocialContentItem[] = [
      {
        body: 'Post',
        hashtags: ['#acme'],
        cta: 'CTA',
        characterCount: 4,
        sourceIdeaId: 'idea_1',
      },
    ];
    const useCase = new GetRunUseCase(
      unusedRepo({ getById: async () => asSnapshot(run) }),
      fakeReader({
        listContents: async () => contents,
      }),
    );

    const snapshot = await useCase.execute(run.id);
    expect(snapshot.result).toEqual({
      ideas,
      content: null,
      contents,
      reelIdeas: [],
      reelScript: null,
      reelScripts: [],
      pageOutline: null,
      pageDocument: null,
    });
    expect(snapshot.hitl).toBeNull();
  });

  it('orders two then_content rows by selectedIdeaIds and keeps content null', async () => {
    const run = makeRun('completed', {
      selectedIdeaIds: ['idea_2', 'idea_1'],
    });
    const first: SocialContentItem = {
      body: 'A',
      hashtags: [],
      characterCount: 1,
      sourceIdeaId: 'idea_1',
    };
    const second: SocialContentItem = {
      body: 'B',
      hashtags: [],
      characterCount: 1,
      sourceIdeaId: 'idea_2',
    };
    const useCase = new GetRunUseCase(
      unusedRepo({ getById: async () => asSnapshot(run) }),
      fakeReader({
        listContents: async () => [first, second],
      }),
    );

    const snapshot = await useCase.execute(run.id);
    expect(snapshot.result.content).toBeNull();
    expect(snapshot.result.contents).toEqual([second, first]);
    expect(snapshot.result.contents).toHaveLength(2);
    expect(snapshot.result.contents[0]?.sourceIdeaId).toBe('idea_2');
    expect(snapshot.result.contents[1]?.sourceIdeaId).toBe('idea_1');
  });

  it('maps stored reel script into result for one-stage reel_script', async () => {
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
      contents: [],
      reelIdeas: [],
      reelScript,
      reelScripts: [],
      pageOutline: null,
      pageDocument: null,
    });
    expect(snapshot.hitl).toBeNull();
  });

  it('maps then_scripts snapshot to reelScripts and null scalar', async () => {
    const run = makeRun('completed', {
      taskType: 'reel_ideas_then_scripts',
      selectedIdeaIds: ['idea_1', 'idea_2'],
    });
    const scriptIdea1: ReelScriptItem = {
      ...reelScript,
      sourceIdeaId: 'idea_1',
    };
    const scriptIdea2: ReelScriptItem = {
      ...reelScript,
      cta: 'Drugi',
      sourceIdeaId: 'idea_2',
    };
    const useCase = new GetRunUseCase(
      unusedRepo({ getById: async () => asSnapshot(run) }),
      fakeReader({
        listIdeas: async () => [],
        listReelIdeas: async () => reelIdeas,
        listReelScripts: async () => [scriptIdea2, scriptIdea1],
      }),
    );

    const snapshot = await useCase.execute(run.id);
    expect(snapshot.result.reelScript).toBeNull();
    expect(snapshot.result.reelScripts).toEqual([scriptIdea1, scriptIdea2]);
    expect(snapshot.result.reelScripts[0]?.sourceIdeaId).toBe('idea_1');
    expect(snapshot.result.reelScripts[1]?.sourceIdeaId).toBe('idea_2');
  });

  it('maps one-stage post_content to scalar content and empty contents', async () => {
    const run = makeRun('completed', { taskType: 'post_content' });
    const content = {
      body: 'Post',
      hashtags: ['#acme'],
      cta: 'CTA',
      characterCount: 4,
    };
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
      contents: [],
      reelIdeas: [],
      reelScript: null,
      reelScripts: [],
      pageOutline: null,
      pageDocument: null,
    });
  });

  it('returns hitl.options from page outline when page_outline_then_copy awaits HITL', async () => {
    const run = makeContentRun({
      status: 'awaiting_hitl',
      taskType: 'page_outline_then_copy',
      pipelinePhase: 'outline',
      createdAt: new Date('2026-08-18T12:00:00.000Z'),
    });
    const outline: PageOutline = {
      id: 'outl_1',
      title: 'Audyt w 10 dni',
      sections: [{ id: 'osec_1', heading: 'Problem', summary: 'Chaos ops.' }],
    };
    const useCase = new GetRunUseCase(
      unusedRepo({ getById: async () => asSnapshot(run) }),
      fakeReader({
        listIdeas: async () => [],
        getPageOutline: async () => outline,
      }),
    );

    await expect(useCase.execute(run.id)).resolves.toEqual({
      runId: run.id,
      taskType: 'page_outline_then_copy',
      platform: 'web',
      contentKind: 'blog',
      language: run.language,
      brief: run.brief,
      status: 'awaiting_hitl',
      conversationId: run.conversationId,
      createdAt: run.createdAt.toISOString(),
      startedBy: null,
      result: {
        ideas: [],
        content: null,
        contents: [],
        reelIdeas: [],
        reelScript: null,
        reelScripts: [],
        pageOutline: outline,
        pageDocument: null,
      },
      hitl: { options: [outline] },
    });
  });

  it('maps stored page document into result', async () => {
    const run = makeContentRun({
      status: 'completed',
      taskType: 'page_copy',
      createdAt: new Date('2026-08-18T12:00:00.000Z'),
    });
    const document: PageDocument = {
      title: 'Audyt procesów',
      lead: 'Founderzy odzyskują czas.',
      body: 'Pełny tekst strony.',
    };
    const useCase = new GetRunUseCase(
      unusedRepo({ getById: async () => asSnapshot(run) }),
      fakeReader({
        listIdeas: async () => [],
        getPageDocument: async () => ({
          document,
          verification: { ok: true, contextIssues: [], languageIssues: [] },
        }),
      }),
    );

    const snapshot = await useCase.execute(run.id);
    expect(snapshot.result).toEqual({
      ideas: [],
      content: null,
      contents: [],
      reelIdeas: [],
      reelScript: null,
      reelScripts: [],
      pageOutline: null,
      pageDocument: document,
    });
    expect(snapshot.hitl).toBeNull();
    expect(snapshot.brief).toEqual(run.brief);
    expect(snapshot.contentKind).toBe('blog');
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
