import { createUserId, type RunId } from '@content-chain/shared';
import type { AuthUserContext } from '../../shared/types/auth-user-context';
import type { ContentResultStore } from '../../content/domain/content-result.port';
import type { SocialResultStore } from '../../social/domain/social-result.port';
import type {
  OutputEditedWrite,
  OutputEditedWriter,
} from '../domain/output-edited-writer.port';
import type { RunRepository } from '../domain/run.port';
import {
  makeSocialSnapshot,
  type SocialRunSnapshot,
} from '../run-record.test-helpers';
import { SaveOutputEditedUseCase } from './save-output-edited.use-case';

const ACTOR: AuthUserContext = {
  id: createUserId('usr_11111111-1111-4111-8111-111111111111'),
  email: 'user@example.com',
  role: 'user',
};

function unusedRuns(overrides: Partial<RunRepository> = {}): RunRepository {
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
    listByUser: unexpected,
    saveRating: unexpected,
    saveOutputEdited: unexpected,
    saveFinalizedAt: unexpected,
    ...overrides,
  };
}

function unusedSocial(
  overrides: Partial<SocialResultStore> = {},
): SocialResultStore {
  const unexpected = async () => {
    throw new Error('unexpected social store call');
  };
  return {
    replaceIdeas: unexpected,
    replaceReelIdeas: unexpected,
    listIdeas: unexpected,
    listReelIdeas: unexpected,
    replaceContent: unexpected,
    replaceReelScript: unexpected,
    clearContents: unexpected,
    appendContent: unexpected,
    listContents: unexpected,
    clearReelScripts: unexpected,
    appendReelScript: unexpected,
    listReelScripts: unexpected,
    getContent: unexpected,
    getReelScript: unexpected,
    savePipelineState: unexpected,
    getPipelineState: unexpected,
    ...overrides,
  };
}

function unusedContent(
  overrides: Partial<ContentResultStore> = {},
): ContentResultStore {
  const unexpected = async () => {
    throw new Error('unexpected content store call');
  };
  return {
    replaceOutline: unexpected,
    replaceDocument: unexpected,
    getOutline: unexpected,
    getDocument: unexpected,
    savePipelineState: unexpected,
    getPipelineState: unexpected,
    ...overrides,
  };
}

function unusedWriter(
  overrides: Partial<OutputEditedWriter> = {},
): OutputEditedWriter {
  return {
    commit: async () => {
      throw new Error('unexpected output-edited commit');
    },
    ...overrides,
  };
}

function snapshot(
  overrides: Partial<SocialRunSnapshot> = {},
): SocialRunSnapshot {
  return makeSocialSnapshot({
    status: 'completed',
    startedByUserId: ACTOR.id,
    taskType: 'post_content',
    startedBy: { id: ACTOR.id, email: ACTOR.email },
    ...overrides,
  });
}

describe('SaveOutputEditedUseCase', () => {
  it('plans content then commits flag+store together with characterCount from body.length', async () => {
    const run = snapshot();
    const commit = jest.fn(
      async (_id: RunId, _writes: readonly OutputEditedWrite[]) => true,
    );
    const useCase = new SaveOutputEditedUseCase(
      unusedRuns({
        getById: async () => run,
      }),
      unusedSocial({
        getContent: async () => ({
          content: {
            body: 'stary',
            hashtags: [],
            characterCount: 5,
          },
          verification: { ok: true, contextIssues: [], languageIssues: [] },
        }),
      }),
      unusedContent(),
      unusedWriter({ commit }),
    );

    await expect(
      useCase.execute(
        run.id,
        { result: { content: { body: 'nowy tekst', hashtags: ['#a'] } } },
        ACTOR,
      ),
    ).resolves.toEqual({ runId: run.id, outputEdited: true });

    expect(commit).toHaveBeenCalledTimes(1);
    expect(commit).toHaveBeenCalledWith(run.id, [
      {
        kind: 'content',
        content: {
          body: 'nowy tekst',
          hashtags: ['#a'],
          characterCount: 'nowy tekst'.length,
        },
        verification: { ok: true, contextIssues: [], languageIssues: [] },
      },
    ]);
  });

  it('plans contents in stored sourceIdeaId order and commits once', async () => {
    const run = snapshot({ taskType: 'post_ideas_then_content' });
    const commit = jest.fn(async () => true);
    const useCase = new SaveOutputEditedUseCase(
      unusedRuns({
        getById: async () => run,
      }),
      unusedSocial({
        listContents: async () => [
          {
            body: 'stary a',
            hashtags: [],
            characterCount: 7,
            sourceIdeaId: 'idea_1',
          },
          {
            body: 'stary b',
            hashtags: ['#x'],
            characterCount: 7,
            sourceIdeaId: 'idea_2',
          },
        ],
      }),
      unusedContent(),
      unusedWriter({ commit }),
    );

    await expect(
      useCase.execute(
        run.id,
        {
          result: {
            contents: [
              { body: 'nowy b', hashtags: ['#b'], sourceIdeaId: 'idea_2' },
              { body: 'nowy a', hashtags: ['#a'], sourceIdeaId: 'idea_1' },
            ],
          },
        },
        ACTOR,
      ),
    ).resolves.toEqual({ runId: run.id, outputEdited: true });

    expect(commit).toHaveBeenCalledTimes(1);
    expect(commit).toHaveBeenCalledWith(run.id, [
      {
        kind: 'contents',
        items: [
          {
            body: 'nowy a',
            hashtags: ['#a'],
            characterCount: 'nowy a'.length,
            sourceIdeaId: 'idea_1',
          },
          {
            body: 'nowy b',
            hashtags: ['#b'],
            characterCount: 'nowy b'.length,
            sourceIdeaId: 'idea_2',
          },
        ],
        verification: { ok: true, contextIssues: [], languageIssues: [] },
      },
    ]);
  });

  it('rejects empty result, foreign keys, and sourceIdeaId cardinality before commit', async () => {
    const run = snapshot({ taskType: 'post_ideas_then_content' });
    const commit = jest.fn(async () => true);
    const useCase = new SaveOutputEditedUseCase(
      unusedRuns({
        getById: async () => run,
      }),
      unusedSocial({
        listContents: async () => [
          {
            body: 'a',
            hashtags: [],
            characterCount: 1,
            sourceIdeaId: 'idea_1',
          },
        ],
      }),
      unusedContent(),
      unusedWriter({ commit }),
    );

    await expect(
      useCase.execute(run.id, { result: {} }, ACTOR),
    ).rejects.toMatchObject({ code: 'VALIDATION_FAILED' });
    expect(commit).not.toHaveBeenCalled();

    await expect(
      useCase.execute(
        run.id,
        { result: { pageDocument: { title: 'x' } } },
        ACTOR,
      ),
    ).rejects.toMatchObject({ code: 'VALIDATION_FAILED' });
    expect(commit).not.toHaveBeenCalled();

    await expect(
      useCase.execute(
        run.id,
        {
          result: {
            contents: [
              { body: 'a', hashtags: [], sourceIdeaId: 'idea_1' },
              { body: 'b', hashtags: [], sourceIdeaId: 'idea_2' },
            ],
          },
        },
        ACTOR,
      ),
    ).rejects.toMatchObject({ code: 'VALIDATION_FAILED' });
    expect(commit).not.toHaveBeenCalled();
  });

  it('maps commit false to REVIEW_LOCKED after planning and skips store when not reviewable', async () => {
    const locked = snapshot();
    const commit = jest.fn(async () => false);
    const lockedUc = new SaveOutputEditedUseCase(
      unusedRuns({
        getById: async () => locked,
      }),
      unusedSocial({
        getContent: async () => ({
          content: { body: 'x', hashtags: [], characterCount: 1 },
          verification: null,
        }),
      }),
      unusedContent(),
      unusedWriter({ commit }),
    );
    await expect(
      lockedUc.execute(
        locked.id,
        { result: { content: { body: 'y', hashtags: [] } } },
        ACTOR,
      ),
    ).rejects.toMatchObject({ code: 'REVIEW_LOCKED' });
    expect(commit).toHaveBeenCalledWith(locked.id, [
      expect.objectContaining({ kind: 'content' }),
    ]);

    const queued = snapshot({ status: 'queued' });
    const queuedCommit = jest.fn(async () => true);
    const queuedUc = new SaveOutputEditedUseCase(
      unusedRuns({ getById: async () => queued }),
      unusedSocial(),
      unusedContent(),
      unusedWriter({ commit: queuedCommit }),
    );
    await expect(
      queuedUc.execute(
        queued.id,
        { result: { content: { body: 'y', hashtags: [] } } },
        ACTOR,
      ),
    ).rejects.toMatchObject({ code: 'RUN_NOT_REVIEWABLE' });
    expect(queuedCommit).not.toHaveBeenCalled();
  });
});
