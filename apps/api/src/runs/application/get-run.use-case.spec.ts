import { createUserId } from '@content-chain/shared';
import { DomainException } from '../../shared/exceptions/domain.exception';
import type { Env } from '../../shared/config/env';
import { newRunId } from '../../shared/http/new-ids';
import type { AuthUserContext } from '../../shared/types/auth-user-context';
import type { GuestQuotaPort } from '../domain/guest-quota.port';
import type { RunResultReader } from '../domain/run-result-reader.port';
import type { RunRepository, RunSnapshot } from '../domain/run.port';
import type { RunRecord, SocialRunRecord } from '../domain/run.types';
import { makeContentRun, makeSocialRun } from '../run-record.test-helpers';
import { GuestRunPolicyService } from './guest/guest-run-policy.service';
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

const TEST_ENV = { REVIEW_TTL: '2h' } as Env;
const ANCHOR = new Date('2026-09-30T10:00:00.000Z');
const EXPIRES_ISO = '2026-09-30T12:00:00.000Z';
const ADMIN: AuthUserContext = {
  id: createUserId('usr_aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'),
  email: 'admin@example.com',
  role: 'admin',
};
const GUEST: AuthUserContext = {
  id: createUserId('usr_bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb'),
  email: 'guest@example.com',
  role: 'guest',
};
const OTHER_ID = createUserId('usr_cccccccc-cccc-4ccc-8ccc-cccccccccccc');

function makeGuestPolicy(): GuestRunPolicyService {
  return new GuestRunPolicyService(
    {} as Env,
    {} as RunRepository,
    {} as GuestQuotaPort,
  );
}

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
    findCancelRequestedLeftovers: unexpected,
    appendLog: unexpected,
    listLogs: unexpected,
    list: unexpected,
    setCancelRequested: unexpected,
    attemptCancel: unexpected,
    saveSelectedIdeaIds: unexpected,
    listByUser: unexpected,
    saveRating: unexpected,
    saveOutputEdited: unexpected,
    saveFinalizedAt: unexpected,
    setPipelineFinishedAt: unexpected,
    finalizeExpiredReviews: unexpected,
    countByUserAndType: unexpected,
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

function asSnapshot(
  run: RunRecord,
  review: Partial<
    Pick<
      RunSnapshot,
      | 'userRating'
      | 'outputEdited'
      | 'reviewFinalizedAt'
      | 'pipelineFinishedAt'
      | 'cancelledAt'
      | 'startedBy'
    >
  > = {},
): RunSnapshot {
  return {
    ...run,
    startedBy: null,
    userRating: null,
    outputEdited: false,
    reviewFinalizedAt: null,
    pipelineFinishedAt: null,
    cancelledAt: null,
    ...review,
  };
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

function makeUseCase(
  repo: RunRepository,
  reader: RunResultReader = fakeReader(),
): GetRunUseCase {
  return new GetRunUseCase(repo, reader, TEST_ENV, makeGuestPolicy());
}

const openReviewMeta = {
  pipelineFinishedAt: ANCHOR.toISOString(),
  reviewExpiresAt: EXPIRES_ISO,
} as const;

const nullReviewMeta = {
  pipelineFinishedAt: null,
  reviewExpiresAt: null,
} as const;

describe('GetRunUseCase', () => {
  it('returns hitl.options and result.ideas when awaiting_hitl', async () => {
    const run = makeRun('awaiting_hitl');
    const useCase = makeUseCase(
      unusedRepo({ getById: async () => asSnapshot(run) }),
    );

    await expect(useCase.execute(run.id, ADMIN)).resolves.toEqual({
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
      userRating: null,
      outputEdited: false,
      reviewFinalizedAt: null,
      ...nullReviewMeta,
      cancelledAt: null,
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
    const useCase = makeUseCase(
      unusedRepo({ getById: async () => asSnapshot(run) }),
      fakeReader({
        listIdeas: async () => [],
        listReelIdeas: async () => reelIdeas,
      }),
    );

    await expect(useCase.execute(run.id, ADMIN)).resolves.toEqual({
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
      userRating: null,
      outputEdited: false,
      reviewFinalizedAt: null,
      ...nullReviewMeta,
      cancelledAt: null,
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
    const useCase = makeUseCase(
      unusedRepo({ getById: async () => asSnapshot(run) }),
    );

    const snapshot = await useCase.execute(run.id, ADMIN);
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
    const useCase = makeUseCase(
      unusedRepo({ getById: async () => asSnapshot(run) }),
      fakeReader({
        listContents: async () => contents,
      }),
    );

    const snapshot = await useCase.execute(run.id, ADMIN);
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
    const useCase = makeUseCase(
      unusedRepo({ getById: async () => asSnapshot(run) }),
      fakeReader({
        listContents: async () => [first, second],
      }),
    );

    const snapshot = await useCase.execute(run.id, ADMIN);
    expect(snapshot.result.content).toBeNull();
    expect(snapshot.result.contents).toEqual([second, first]);
    expect(snapshot.result.contents).toHaveLength(2);
    expect(snapshot.result.contents[0]?.sourceIdeaId).toBe('idea_2');
    expect(snapshot.result.contents[1]?.sourceIdeaId).toBe('idea_1');
  });

  it('maps stored reel script into result for one-stage reel_script', async () => {
    const run = makeRun('completed', { taskType: 'reel_script' });
    const useCase = makeUseCase(
      unusedRepo({ getById: async () => asSnapshot(run) }),
      fakeReader({
        listIdeas: async () => [],
        getReelScript: async () => ({
          script: reelScript,
          verification: { ok: true, contextIssues: [], languageIssues: [] },
        }),
      }),
    );

    const snapshot = await useCase.execute(run.id, ADMIN);
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
    const useCase = makeUseCase(
      unusedRepo({ getById: async () => asSnapshot(run) }),
      fakeReader({
        listIdeas: async () => [],
        listReelIdeas: async () => reelIdeas,
        listReelScripts: async () => [scriptIdea2, scriptIdea1],
      }),
    );

    const snapshot = await useCase.execute(run.id, ADMIN);
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
    const useCase = makeUseCase(
      unusedRepo({ getById: async () => asSnapshot(run) }),
      fakeReader({
        getContent: async () => ({
          content,
          verification: { ok: true, contextIssues: [], languageIssues: [] },
        }),
      }),
    );

    const snapshot = await useCase.execute(run.id, ADMIN);
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
    const useCase = makeUseCase(
      unusedRepo({ getById: async () => asSnapshot(run) }),
      fakeReader({
        listIdeas: async () => [],
        getPageOutline: async () => outline,
      }),
    );

    await expect(useCase.execute(run.id, ADMIN)).resolves.toEqual({
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
      userRating: null,
      outputEdited: false,
      reviewFinalizedAt: null,
      ...nullReviewMeta,
      cancelledAt: null,
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
    const useCase = makeUseCase(
      unusedRepo({ getById: async () => asSnapshot(run) }),
      fakeReader({
        listIdeas: async () => [],
        getPageDocument: async () => ({
          document,
          verification: { ok: true, contextIssues: [], languageIssues: [] },
        }),
      }),
    );

    const snapshot = await useCase.execute(run.id, ADMIN);
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

  it('exposes pipelineFinishedAt and reviewExpiresAt for open completed review', async () => {
    const run = makeRun('completed');
    const useCase = makeUseCase(
      unusedRepo({
        getById: async () => asSnapshot(run, { pipelineFinishedAt: ANCHOR }),
      }),
    );

    const snapshot = await useCase.execute(run.id, ADMIN);
    expect(snapshot.reviewFinalizedAt).toBeNull();
    expect(snapshot.pipelineFinishedAt).toBe(openReviewMeta.pipelineFinishedAt);
    expect(snapshot.reviewExpiresAt).toBe(openReviewMeta.reviewExpiresAt);
  });

  it('keeps reviewExpiresAt ISO after TTL when finalize is still null', async () => {
    const run = makeRun('completed');
    const expiredAnchor = new Date('2026-09-30T08:00:00.000Z');
    const useCase = makeUseCase(
      unusedRepo({
        getById: async () =>
          asSnapshot(run, {
            pipelineFinishedAt: expiredAnchor,
            reviewFinalizedAt: null,
          }),
      }),
    );

    const snapshot = await useCase.execute(run.id, ADMIN);
    expect(snapshot.reviewFinalizedAt).toBeNull();
    expect(snapshot.pipelineFinishedAt).toBe(expiredAnchor.toISOString());
    expect(snapshot.reviewExpiresAt).toBe('2026-09-30T10:00:00.000Z');
  });

  it('returns reviewExpiresAt null when review is finalized', async () => {
    const run = makeRun('completed');
    const finalizedAt = new Date('2026-09-30T10:30:00.000Z');
    const useCase = makeUseCase(
      unusedRepo({
        getById: async () =>
          asSnapshot(run, {
            pipelineFinishedAt: ANCHOR,
            reviewFinalizedAt: finalizedAt,
          }),
      }),
    );

    const snapshot = await useCase.execute(run.id, ADMIN);
    expect(snapshot.reviewFinalizedAt).toBe(finalizedAt.toISOString());
    expect(snapshot.pipelineFinishedAt).toBe(ANCHOR.toISOString());
    expect(snapshot.reviewExpiresAt).toBeNull();
  });

  it('does not call review mutation ports on GET', async () => {
    const run = makeRun('completed');
    const saveRating = jest.fn(async () => true);
    const saveOutputEdited = jest.fn(async () => true);
    const saveFinalizedAt = jest.fn(async () => true);
    const setPipelineFinishedAt = jest.fn(async () => undefined);
    const useCase = makeUseCase(
      unusedRepo({
        getById: async () => asSnapshot(run, { pipelineFinishedAt: ANCHOR }),
        saveRating,
        saveOutputEdited,
        saveFinalizedAt,
        setPipelineFinishedAt,
      }),
    );

    await useCase.execute(run.id, ADMIN);
    expect(saveRating).not.toHaveBeenCalled();
    expect(saveOutputEdited).not.toHaveBeenCalled();
    expect(saveFinalizedAt).not.toHaveBeenCalled();
    expect(setPipelineFinishedAt).not.toHaveBeenCalled();
  });

  it('throws RUN_NOT_FOUND when the run is missing', async () => {
    const useCase = makeUseCase(unusedRepo({ getById: async () => null }));

    await expect(useCase.execute(newRunId(), ADMIN)).rejects.toBeInstanceOf(
      DomainException,
    );
    await expect(useCase.execute(newRunId(), ADMIN)).rejects.toMatchObject({
      code: 'RUN_NOT_FOUND',
    });
  });

  it('allows a guest to read their own run', async () => {
    const run = makeRun('completed', { startedByUserId: GUEST.id });
    const useCase = makeUseCase(
      unusedRepo({ getById: async () => asSnapshot(run) }),
    );

    await expect(useCase.execute(run.id, GUEST)).resolves.toMatchObject({
      runId: run.id,
      status: 'completed',
    });
  });

  it('rejects a guest reading a foreign run with FORBIDDEN before loading results', async () => {
    const run = makeRun('completed', { startedByUserId: OTHER_ID });
    const listIdeas = jest.fn(async () => ideas);
    const useCase = makeUseCase(
      unusedRepo({ getById: async () => asSnapshot(run) }),
      fakeReader({ listIdeas }),
    );

    await expect(useCase.execute(run.id, GUEST)).rejects.toMatchObject({
      name: 'DomainException',
      code: 'FORBIDDEN',
      httpStatus: 403,
    });
    expect(listIdeas).not.toHaveBeenCalled();
  });

  it('lets an admin read a run started by someone else', async () => {
    const run = makeRun('completed', { startedByUserId: OTHER_ID });
    const useCase = makeUseCase(
      unusedRepo({ getById: async () => asSnapshot(run) }),
    );

    await expect(useCase.execute(run.id, ADMIN)).resolves.toMatchObject({
      runId: run.id,
      status: 'completed',
    });
  });
});
