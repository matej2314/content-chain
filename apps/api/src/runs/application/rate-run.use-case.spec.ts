import { createUserId, type RunId } from '@content-chain/shared';
import type { AuthUserContext } from '../../shared/types/auth-user-context';
import type { RunRepository, RunSnapshot } from '../domain/run.port';
import { makeSocialRun } from '../run-record.test-helpers';
import { RateRunUseCase } from './rate-run.use-case';

const ACTOR: AuthUserContext = {
  id: createUserId('usr_11111111-1111-4111-8111-111111111111'),
  email: 'user@example.com',
  role: 'user',
};

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

describe('RateRunUseCase', () => {
  it('writes rating 1–5 and returns an open review', async () => {
    const run = snapshot();
    const saveRating = jest.fn(
      async (_id: RunId, _rating: number | null): Promise<boolean> => true,
    );
    const useCase = new RateRunUseCase(
      unusedRepo({
        getById: async () => run,
        saveRating,
      }),
    );

    await expect(
      useCase.execute(run.id, { rating: 4 }, ACTOR),
    ).resolves.toEqual({
      runId: run.id,
      userRating: 4,
      reviewFinalizedAt: null,
    });
    expect(saveRating).toHaveBeenCalledTimes(1);
    expect(saveRating).toHaveBeenCalledWith(run.id, 4);
  });

  it('writes rating null and returns an open review', async () => {
    const run = snapshot({ userRating: 4 });
    const saveRating = jest.fn(
      async (_id: RunId, _rating: number | null): Promise<boolean> => true,
    );
    const useCase = new RateRunUseCase(
      unusedRepo({
        getById: async () => run,
        saveRating,
      }),
    );

    await expect(
      useCase.execute(run.id, { rating: null }, ACTOR),
    ).resolves.toEqual({
      runId: run.id,
      userRating: null,
      reviewFinalizedAt: null,
    });
    expect(saveRating).toHaveBeenCalledWith(run.id, null);
  });

  it('saves a rating on an own failed run', async () => {
    const run = snapshot({ status: 'failed' });
    const saveRating = jest.fn(
      async (_id: RunId, _rating: number | null): Promise<boolean> => true,
    );
    const useCase = new RateRunUseCase(
      unusedRepo({
        getById: async () => run,
        saveRating,
      }),
    );

    await expect(
      useCase.execute(run.id, { rating: 1 }, ACTOR),
    ).resolves.toMatchObject({ userRating: 1 });
    expect(saveRating).toHaveBeenCalledWith(run.id, 1);
  });

  it.each([
    { rating: 0 },
    { rating: 6 },
    { rating: 1.5 },
    {},
  ])(
    'rejects invalid rating %j with VALIDATION_FAILED and skips persist',
    async (input) => {
      const run = snapshot();
      const getById = jest.fn(async () => run);
      const saveRating = jest.fn(
        async (_id: RunId, _rating: number | null): Promise<boolean> => true,
      );
      const useCase = new RateRunUseCase(unusedRepo({ getById, saveRating }));

      await expect(useCase.execute(run.id, input, ACTOR)).rejects.toMatchObject({
        name: 'DomainException',
        code: 'VALIDATION_FAILED',
        httpStatus: 400,
      });
      expect(getById).not.toHaveBeenCalled();
      expect(saveRating).not.toHaveBeenCalled();
    },
  );

  it('maps saveRating false to REVIEW_LOCKED', async () => {
    const run = snapshot();
    const saveRating = jest.fn(
      async (_id: RunId, _rating: number | null): Promise<boolean> => false,
    );
    const useCase = new RateRunUseCase(
      unusedRepo({
        getById: async () => run,
        saveRating,
      }),
    );

    await expect(
      useCase.execute(run.id, { rating: 4 }, ACTOR),
    ).rejects.toMatchObject({
      name: 'DomainException',
      code: 'REVIEW_LOCKED',
      httpStatus: 409,
    });
    expect(saveRating).toHaveBeenCalledTimes(1);
  });

  it('does not call saveRating when the run is not reviewable', async () => {
    const run = snapshot({ status: 'running' });
    const saveRating = jest.fn(
      async (_id: RunId, _rating: number | null): Promise<boolean> => true,
    );
    const useCase = new RateRunUseCase(
      unusedRepo({
        getById: async () => run,
        saveRating,
      }),
    );

    await expect(
      useCase.execute(run.id, { rating: 4 }, ACTOR),
    ).rejects.toMatchObject({
      name: 'DomainException',
      code: 'RUN_NOT_REVIEWABLE',
      httpStatus: 409,
    });
    expect(saveRating).not.toHaveBeenCalled();
  });
});
