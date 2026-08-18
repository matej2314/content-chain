import { newConversationId, newRunId } from '../../shared/http/new-ids';
import type { RunRepository } from '../domain/run.port';
import type { RunLogEntry, RunRecord } from '../domain/run.types';
import { RecoverInterruptedRunsUseCase } from './recover-interrupted-runs.use-case';
import type { RunLifecycleService } from './run-lifecycle.service';

function makeRun(overrides: Partial<RunRecord> = {}): RunRecord {
  return {
    id: newRunId(),
    conversationId: newConversationId(),
    taskType: 'post_ideas',
    platform: 'linkedin',
    language: 'pl',
    status: 'running',
    brief: { topic: 'Q3' },
    selectedIdeaIds: null,
    startedByUserId: null,
    recoveryAttempts: 0,
    createdAt: new Date(),
    ...overrides,
  };
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
    appendLog: unexpected,
    listLogs: unexpected,
    list: unexpected,
    saveSelectedIdeaIds: unexpected,
    ...overrides,
  };
}

describe('RecoverInterruptedRunsUseCase', () => {
  it('does not take an executor dependency', () => {
    expect(RecoverInterruptedRunsUseCase.length).toBe(2);
  });

  it('fails a running run at recovery cap 3 with a log and empty resume list', async () => {
    const exhausted = makeRun({ recoveryAttempts: 3 });
    const saveRecoveryAttempt = jest.fn();
    const appendLog = jest.fn<
      Promise<void>,
      [Omit<RunLogEntry, 'at'> & { at?: Date }]
    >();
    const transition = jest.fn(async (run: RunRecord, to: RunRecord['status']) => ({
      ...run,
      status: to,
    }));

    const useCase = new RecoverInterruptedRunsUseCase(
      unusedRepo({
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
    const interrupted = makeRun({ recoveryAttempts: 0 });
    const saveRecoveryAttempt = jest.fn();
    const appendLog = jest.fn();
    const transition = jest.fn();

    const useCase = new RecoverInterruptedRunsUseCase(
      unusedRepo({
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
    const running = makeRun({ recoveryAttempts: 0 });
    const hitl = makeRun({
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
    expect(saveRecoveryAttempt).not.toHaveBeenCalledWith(hitl.id, expect.anything());
  });

  it('does not increment recoveryAttempts for leftover already interrupted', async () => {
    const leftoverInterrupted = makeRun({
      status: 'interrupted',
      recoveryAttempts: 1,
    });
    const leftoverRunning = makeRun({
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
});
