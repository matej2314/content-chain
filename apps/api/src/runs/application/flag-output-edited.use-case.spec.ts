import { createUserId, type RunId } from '@content-chain/shared';
import type { AuthUserContext } from '../../shared/types/auth-user-context';
import type { RunRepository, RunSnapshot } from '../domain/run.port';
import { makeSocialRun } from '../run-record.test-helpers';
import { FlagOutputEditedUseCase } from './flag-output-edited.use-case';

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

describe('FlagOutputEditedUseCase', () => {
  it('sets outputEdited and does not touch SM payload ports', async () => {
    const run = snapshot();
    const saveOutputEdited = jest.fn(
      async (_id: RunId): Promise<boolean> => true,
    );
    const useCase = new FlagOutputEditedUseCase(
      unusedRepo({
        getById: async () => run,
        saveOutputEdited,
      }),
    );

    await expect(useCase.execute(run.id, ACTOR)).resolves.toEqual({
      runId: run.id,
      outputEdited: true,
    });
    expect(saveOutputEdited).toHaveBeenCalledTimes(1);
    expect(saveOutputEdited).toHaveBeenCalledWith(run.id);
  });

  it('maps saveOutputEdited false to REVIEW_LOCKED', async () => {
    const run = snapshot();
    const saveOutputEdited = jest.fn(
      async (_id: RunId): Promise<boolean> => false,
    );
    const useCase = new FlagOutputEditedUseCase(
      unusedRepo({
        getById: async () => run,
        saveOutputEdited,
      }),
    );

    await expect(useCase.execute(run.id, ACTOR)).rejects.toMatchObject({
      name: 'DomainException',
      code: 'REVIEW_LOCKED',
      httpStatus: 409,
    });
    expect(saveOutputEdited).toHaveBeenCalledTimes(1);
  });

  it('does not call saveOutputEdited when the run is not reviewable', async () => {
    const run = snapshot({ status: 'queued' });
    const saveOutputEdited = jest.fn(
      async (_id: RunId): Promise<boolean> => true,
    );
    const useCase = new FlagOutputEditedUseCase(
      unusedRepo({
        getById: async () => run,
        saveOutputEdited,
      }),
    );

    await expect(useCase.execute(run.id, ACTOR)).rejects.toMatchObject({
      name: 'DomainException',
      code: 'RUN_NOT_REVIEWABLE',
      httpStatus: 409,
    });
    expect(saveOutputEdited).not.toHaveBeenCalled();
  });
});
