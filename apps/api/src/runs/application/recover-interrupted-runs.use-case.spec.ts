import type { RunRepository } from '../domain/run.port';
import type { RunLogEntry, RunRecord } from '../domain/run.types';
import { makeSocialRun } from '../run-record.test-helpers';
import { RecoverInterruptedRunsUseCase } from './recover-interrupted-runs.use-case';
import type { RunLifecycleService } from './lifecycle/run-lifecycle.service';

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

describe('RecoverInterruptedRunsUseCase', () => {
  it('does not take an executor dependency', () => {
    expect(RecoverInterruptedRunsUseCase.length).toBe(2);
  });

  it('fails a running run at recovery cap 3 with a log and empty resume list', async () => {
    const exhausted = makeSocialRun({ recoveryAttempts: 3 });
    const saveRecoveryAttempt = jest.fn();
    const appendLog = jest.fn<
      Promise<void>,
      [Omit<RunLogEntry, 'at'> & { at?: Date }]
    >();
    const transition = jest.fn(
      async (run: RunRecord, to: RunRecord['status']) => ({
        ...run,
        status: to,
      }),
    );

    const useCase = new RecoverInterruptedRunsUseCase(
      unusedRepo({
        findCancelRequestedLeftovers: async () => [],
        findInterruptedRunning: async () => [exhausted],
        saveRecoveryAttempt,
      }),
      { appendLog, transition } as unknown as RunLifecycleService,
    );

    await useCase.execute();

    expect(saveRecoveryAttempt).not.toHaveBeenCalled();
    expect(appendLog).toHaveBeenCalledWith(
      expect.objectContaining({
        runId: exhausted.id,
        level: 'error',
        step: 'recovery',
      }),
    );
    expect(transition).toHaveBeenCalledWith(
      exhausted,
      'failed',
      expect.objectContaining({
        failedMessage: expect.any(String),
      }),
    );
  });

  it('increments attempts and returns the run when under the cap', async () => {
    const interrupted = makeSocialRun({ recoveryAttempts: 0 });
    const saveRecoveryAttempt = jest.fn();
    const appendLog = jest.fn();
    const transition = jest.fn();

    const useCase = new RecoverInterruptedRunsUseCase(
      unusedRepo({
        findCancelRequestedLeftovers: async () => [],
        findInterruptedRunning: async () => [interrupted],
        saveRecoveryAttempt,
      }),
      { appendLog, transition } as unknown as RunLifecycleService,
    );

    await useCase.execute();

    expect(saveRecoveryAttempt).toHaveBeenCalledTimes(1);
    expect(saveRecoveryAttempt).toHaveBeenCalledWith(interrupted.id, 1);
    expect(transition).toHaveBeenCalledWith(interrupted, 'interrupted');
    expect(appendLog).not.toHaveBeenCalled();
  });

  it('leaves awaiting_hitl runs untouched when the repo only returns running', async () => {
    const running = makeSocialRun({ recoveryAttempts: 0 });
    const hitl = makeSocialRun({
      status: 'awaiting_hitl',
      recoveryAttempts: 0,
    });
    const store = [running, hitl];
    const saveRecoveryAttempt = jest.fn(
      async (id: RunRecord['id'], attempts: number) => {
        const row = store.find((item) => item.id === id);
        if (row) row.recoveryAttempts = attempts;
      },
    );
    const transition = jest.fn();

    const useCase = new RecoverInterruptedRunsUseCase(
      unusedRepo({
        findCancelRequestedLeftovers: async () => [],
        findInterruptedRunning: async () =>
          store.filter((item) => item.status === 'running'),
        saveRecoveryAttempt,
      }),
      {
        appendLog: jest.fn(),
        transition,
      } as unknown as RunLifecycleService,
    );

    await useCase.execute();

    expect(transition).toHaveBeenCalledWith(running, 'interrupted');
    expect(transition).not.toHaveBeenCalledWith(hitl, expect.anything());
    expect(hitl.status).toBe('awaiting_hitl');
    expect(hitl.recoveryAttempts).toBe(0);
    expect(saveRecoveryAttempt).not.toHaveBeenCalledWith(
      hitl.id,
      expect.anything(),
    );
  });

  it('does not increment recoveryAttempts for leftover already interrupted', async () => {
    const leftoverInterrupted = makeSocialRun({
      status: 'interrupted',
      recoveryAttempts: 1,
    });
    const leftoverRunning = makeSocialRun({
      status: 'running',
      recoveryAttempts: 0,
    });
    const saveRecoveryAttempt = jest.fn();
    const transition = jest.fn(
      async (run: RunRecord, to: RunRecord['status']) => ({
        ...run,
        status: to,
      }),
    );

    const useCase = new RecoverInterruptedRunsUseCase(
      unusedRepo({
        findCancelRequestedLeftovers: async () => [],
        findInterruptedRunning: async () => [leftoverRunning],
        saveRecoveryAttempt,
      }),
      {
        appendLog: jest.fn(),
        transition,
      } as unknown as RunLifecycleService,
    );

    await useCase.execute();

    expect(saveRecoveryAttempt).toHaveBeenCalledWith(leftoverRunning.id, 1);
    expect(saveRecoveryAttempt).not.toHaveBeenCalledWith(
      leftoverInterrupted.id,
      expect.anything(),
    );
    expect(leftoverInterrupted.recoveryAttempts).toBe(1);
    expect(transition).toHaveBeenCalledWith(leftoverRunning, 'interrupted');
    expect(transition).not.toHaveBeenCalledWith(
      leftoverInterrupted,
      expect.anything(),
    );
  });

  it('cancels leftover running with cancelRequested via CAS and publishCancelled', async () => {
    const leftover = makeSocialRun({
      status: 'running',
      cancelRequested: true,
      recoveryAttempts: 2,
    });
    const attemptCancel = jest.fn().mockResolvedValue(true);
    const saveRecoveryAttempt = jest.fn();
    const publishCancelled = jest.fn();
    const transition = jest.fn();

    const useCase = new RecoverInterruptedRunsUseCase(
      unusedRepo({
        findCancelRequestedLeftovers: async () => [leftover],
        findInterruptedRunning: async () => [],
        attemptCancel,
        saveRecoveryAttempt,
      }),
      {
        appendLog: jest.fn(),
        transition,
        publishCancelled,
      } as unknown as RunLifecycleService,
    );

    await useCase.execute();

    expect(attemptCancel).toHaveBeenCalledWith(leftover.id, expect.any(Date));
    expect(publishCancelled).toHaveBeenCalledWith(leftover.id);
    expect(saveRecoveryAttempt).not.toHaveBeenCalled();
    expect(transition).not.toHaveBeenCalled();
  });

  it('cancels leftover interrupted with cancelRequested the same way', async () => {
    const leftover = makeSocialRun({
      status: 'interrupted',
      cancelRequested: true,
      recoveryAttempts: 1,
    });
    const attemptCancel = jest.fn().mockResolvedValue(true);
    const saveRecoveryAttempt = jest.fn();
    const publishCancelled = jest.fn();

    const useCase = new RecoverInterruptedRunsUseCase(
      unusedRepo({
        findCancelRequestedLeftovers: async () => [leftover],
        findInterruptedRunning: async () => [],
        attemptCancel,
        saveRecoveryAttempt,
      }),
      {
        appendLog: jest.fn(),
        transition: jest.fn(),
        publishCancelled,
      } as unknown as RunLifecycleService,
    );

    await useCase.execute();

    expect(attemptCancel).toHaveBeenCalledWith(leftover.id, expect.any(Date));
    expect(publishCancelled).toHaveBeenCalledWith(leftover.id);
    expect(saveRecoveryAttempt).not.toHaveBeenCalled();
  });

  it('skips publishCancelled and recovery when attemptCancel loses the race', async () => {
    const leftover = makeSocialRun({
      status: 'running',
      cancelRequested: true,
    });
    const attemptCancel = jest.fn().mockResolvedValue(false);
    const saveRecoveryAttempt = jest.fn();
    const publishCancelled = jest.fn();

    const useCase = new RecoverInterruptedRunsUseCase(
      unusedRepo({
        findCancelRequestedLeftovers: async () => [leftover],
        findInterruptedRunning: async () => [],
        attemptCancel,
        saveRecoveryAttempt,
      }),
      {
        appendLog: jest.fn(),
        transition: jest.fn(),
        publishCancelled,
      } as unknown as RunLifecycleService,
    );

    await useCase.execute();

    expect(attemptCancel).toHaveBeenCalled();
    expect(publishCancelled).not.toHaveBeenCalled();
    expect(saveRecoveryAttempt).not.toHaveBeenCalled();
  });

  it('still recovers running without flag after empty cancel leftovers', async () => {
    const running = makeSocialRun({
      status: 'running',
      cancelRequested: false,
      recoveryAttempts: 0,
    });
    const saveRecoveryAttempt = jest.fn();
    const transition = jest.fn();
    const publishCancelled = jest.fn();

    const useCase = new RecoverInterruptedRunsUseCase(
      unusedRepo({
        findCancelRequestedLeftovers: async () => [],
        findInterruptedRunning: async () => [running],
        saveRecoveryAttempt,
      }),
      {
        appendLog: jest.fn(),
        transition,
        publishCancelled,
      } as unknown as RunLifecycleService,
    );

    await useCase.execute();

    expect(publishCancelled).not.toHaveBeenCalled();
    expect(saveRecoveryAttempt).toHaveBeenCalledWith(running.id, 1);
    expect(transition).toHaveBeenCalledWith(running, 'interrupted');
  });
});
