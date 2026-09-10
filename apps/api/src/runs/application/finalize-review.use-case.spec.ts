import { createUserId, type RunId } from '@content-chain/shared';
import type { AuthUserContext } from '../../shared/types/auth-user-context';
import type { RunRepository, RunSnapshot } from '../domain/run.port';
import { makeSocialRun } from '../run-record.test-helpers';
import { FinalizeReviewUseCase } from './finalize-review.use-case';

const ACTOR: AuthUserContext = {
  id: createUserId('usr_11111111-1111-4111-8111-111111111111'),
  email: 'user@example.com',
  role: 'user',
};

const FROZEN_AT = new Date('2026-09-10T12:00:00.000Z');

function unusedRepo(overrides: Partial<RunRepository> = {}): RunRepository {
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

function snapshot(overrides: Partial<RunSnapshot> = {}): RunSnapshot {
  return {
    ...makeSocialRun({
      status: 'completed',
      startedByUserId: ACTOR.id,
    }),
    startedBy: { id: ACTOR.id, email: ACTOR.email },
    userRating: null,
    outputEdited: false,
    reviewFinalizedAt: null,
    ...overrides,
  };
}

describe('FinalizeReviewUseCase', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(FROZEN_AT);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('finalizes with null rating and returns ISO reviewFinalizedAt', async () => {
    const run = snapshot({ userRating: null, outputEdited: true });
    const saveFinalizedAt = jest.fn(
      async (_id: RunId, _at: Date): Promise<boolean> => true,
    );
    const useCase = new FinalizeReviewUseCase(
      unusedRepo({
        getById: async () => run,
        saveFinalizedAt,
      }),
    );

    await expect(useCase.execute(run.id, ACTOR)).resolves.toEqual({
      runId: run.id,
      userRating: null,
      outputEdited: true,
      reviewFinalizedAt: FROZEN_AT.toISOString(),
    });
    expect(saveFinalizedAt).toHaveBeenCalledTimes(1);
    expect(saveFinalizedAt).toHaveBeenCalledWith(run.id, FROZEN_AT);
  });

  it('finalizes with a 1–5 rating from the snapshot', async () => {
    const run = snapshot({ userRating: 5, outputEdited: false });
    const saveFinalizedAt = jest.fn(
      async (_id: RunId, _at: Date): Promise<boolean> => true,
    );
    const useCase = new FinalizeReviewUseCase(
      unusedRepo({
        getById: async () => run,
        saveFinalizedAt,
      }),
    );

    await expect(useCase.execute(run.id, ACTOR)).resolves.toEqual({
      runId: run.id,
      userRating: 5,
      outputEdited: false,
      reviewFinalizedAt: FROZEN_AT.toISOString(),
    });
  });

  it('maps saveFinalizedAt false to REVIEW_LOCKED', async () => {
    const run = snapshot();
    const saveFinalizedAt = jest.fn(
      async (_id: RunId, _at: Date): Promise<boolean> => false,
    );
    const useCase = new FinalizeReviewUseCase(
      unusedRepo({
        getById: async () => run,
        saveFinalizedAt,
      }),
    );

    await expect(useCase.execute(run.id, ACTOR)).rejects.toMatchObject({
      name: 'DomainException',
      code: 'REVIEW_LOCKED',
      httpStatus: 409,
    });
    expect(saveFinalizedAt).toHaveBeenCalledTimes(1);
  });

  it('does not call saveFinalizedAt when the run is not reviewable', async () => {
    const run = snapshot({ status: 'awaiting_hitl' });
    const saveFinalizedAt = jest.fn(
      async (_id: RunId, _at: Date): Promise<boolean> => true,
    );
    const useCase = new FinalizeReviewUseCase(
      unusedRepo({
        getById: async () => run,
        saveFinalizedAt,
      }),
    );

    await expect(useCase.execute(run.id, ACTOR)).rejects.toMatchObject({
      name: 'DomainException',
      code: 'RUN_NOT_REVIEWABLE',
      httpStatus: 409,
    });
    expect(saveFinalizedAt).not.toHaveBeenCalled();
  });
});
