import { Logger } from '@nestjs/common';
import type { Env } from '../../shared/config/env.schema';
import { newConversationId, newRunId } from '../../shared/http/new-ids';
import type { RunExecutorPort } from '../domain/run-executor.port';
import type { RunRepository, RunSnapshot } from '../domain/run.port';
import type { RunSseHub } from '../domain/run-sse.port';
import type { RunRecord } from '../domain/run.types';
import { InProcessRunWorker } from './in-process-run.worker';
import type { RecoverInterruptedRunsUseCase } from './recover-interrupted-runs.use-case';
import type { RunLifecycleService } from './run-lifecycle.service';

function makeRun(overrides: Partial<RunRecord> = {}): RunRecord {
  return {
    id: newRunId(),
    conversationId: newConversationId(),
    taskType: 'post_ideas',
    platform: 'linkedin',
    language: 'pl',
    status: 'queued',
    brief: { topic: 'Q3' },
    selectedIdeaIds: null,
    startedByUserId: null,
    contentKind: null,
    pipelinePhase: null,
    ideasRefineCount: 0,
    contentRefineCount: 0,
    outlineRefineCount: 0,
    copyRefineCount: 0,
    recoveryAttempts: 0,
    createdAt: new Date(),
    ...overrides,
  };
}

function deferred(): {
  promise: Promise<void>;
  resolve: () => void;
} {
  let resolve!: () => void;
  const promise = new Promise<void>((res) => {
    resolve = res;
  });
  return { promise, resolve };
}

async function waitUntil(
  predicate: () => boolean,
  label: string,
): Promise<void> {
  for (let i = 0; i < 200; i++) {
    if (predicate()) return;
    await new Promise<void>((resolve) => setImmediate(resolve));
  }
  throw new Error(`timed out waiting for ${label}`);
}

function asSnapshot(run: RunRecord): RunSnapshot {
  return { ...run, startedBy: null };
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

function makeWorker(args: {
  maxConcurrent?: number;
  runs: RunRepository;
  executor: RunExecutorPort;
  lifecycle?: Pick<RunLifecycleService, 'appendLog' | 'transition'>;
}): InProcessRunWorker {
  return new InProcessRunWorker(
    { MAX_CONCURRENT_RUNS: args.maxConcurrent ?? 1 } as Env,
    args.runs,
    args.executor,
    { publish: jest.fn(), subscribe: jest.fn() } as unknown as RunSseHub,
    {
      execute: async () => undefined,
    } as unknown as RecoverInterruptedRunsUseCase,
    {
      appendLog: jest.fn(),
      transition: jest.fn(),
      ...args.lifecycle,
    } as unknown as RunLifecycleService,
  );
}

describe('InProcessRunWorker', () => {
  it('serializes pump so two notifyQueued at MAX=1 claim at most one run while first is inflight', async () => {
    const queued = [makeRun(), makeRun()];
    let claimDepth = 0;
    let maxClaimDepth = 0;
    let claimsWithResult = 0;

    const holdFirst = deferred();
    const started: string[] = [];

    const runs = unusedRepo({
      claimNextInterrupted: async () => null,
      claimNextQueued: async () => {
        claimDepth += 1;
        maxClaimDepth = Math.max(maxClaimDepth, claimDepth);
        try {
          await Promise.resolve();
          const next = queued.shift();
          if (!next) return null;
          claimsWithResult += 1;
          return { ...next, status: 'running' };
        } finally {
          claimDepth -= 1;
        }
      },
    });

    const executor: RunExecutorPort = {
      async execute(run) {
        started.push(run.id);
        if (started.length === 1) {
          await holdFirst.promise;
        }
      },
    };

    const worker = new InProcessRunWorker(
      { MAX_CONCURRENT_RUNS: 1 } as Env,
      runs,
      executor,
      { publish: jest.fn(), subscribe: jest.fn() } as unknown as RunSseHub,
      {
        execute: async () => undefined,
      } as unknown as RecoverInterruptedRunsUseCase,
      {
        appendLog: jest.fn(),
        transition: jest.fn(),
      } as unknown as RunLifecycleService,
    );

    worker.notifyQueued();
    worker.notifyQueued();

    await waitUntil(() => started.length === 1, 'first execute');
    expect(claimsWithResult).toBe(1);
    expect(maxClaimDepth).toBe(1);

    holdFirst.resolve();
    await waitUntil(
      () => started.length === 2,
      'second execute after slot frees',
    );
    expect(claimsWithResult).toBe(2);
    expect(maxClaimDepth).toBe(1);
  });

  it('starts HITL resume execute even when inflight is already at MAX', async () => {
    const queued = [makeRun(), makeRun()];
    let claimsWithResult = 0;
    const holdClaimed = deferred();
    const started: string[] = [];
    const hitlRun = makeRun({ status: 'running' });

    const runs = unusedRepo({
      claimNextInterrupted: async () => null,
      claimNextQueued: async () => {
        const next = queued.shift();
        if (!next) return null;
        claimsWithResult += 1;
        return { ...next, status: 'running' };
      },
    });

    const executor: RunExecutorPort = {
      async execute(run) {
        started.push(run.id);
        if (run.id !== hitlRun.id) {
          await holdClaimed.promise;
        }
      },
    };

    const worker = new InProcessRunWorker(
      { MAX_CONCURRENT_RUNS: 1 } as Env,
      runs,
      executor,
      { publish: jest.fn(), subscribe: jest.fn() } as unknown as RunSseHub,
      {
        execute: async () => undefined,
      } as unknown as RecoverInterruptedRunsUseCase,
      {
        appendLog: jest.fn(),
        transition: jest.fn(),
      } as unknown as RunLifecycleService,
    );

    worker.notifyQueued();
    await waitUntil(() => started.length === 1, 'queued run occupying the cap');
    expect(claimsWithResult).toBe(1);

    worker.notifyHitlResumed(hitlRun);
    await waitUntil(
      () => started.includes(hitlRun.id),
      'HITL execute despite full cap',
    );
    expect(claimsWithResult).toBe(1);

    holdClaimed.resolve();
  });

  it('starts HITL execute while drain is blocked in claimNextQueued so queued does not fill remaining slots first', async () => {
    const queued = [makeRun(), makeRun()];
    let claimStarted = 0;
    let claimsWithResult = 0;
    const holdFirstClaim = deferred();
    const holdHitl = deferred();
    const holdClaimed = deferred();
    const started: string[] = [];
    const hitlRun = makeRun({ status: 'running' });

    const runs = unusedRepo({
      claimNextInterrupted: async () => null,
      claimNextQueued: async () => {
        claimStarted += 1;
        if (claimStarted === 1) {
          await holdFirstClaim.promise;
        }
        const next = queued.shift();
        if (!next) return null;
        claimsWithResult += 1;
        return { ...next, status: 'running' };
      },
    });

    const executor: RunExecutorPort = {
      async execute(run) {
        started.push(run.id);
        if (run.id === hitlRun.id) {
          await holdHitl.promise;
          return;
        }
        await holdClaimed.promise;
      },
    };

    const worker = makeWorker({ maxConcurrent: 2, runs, executor });

    worker.notifyQueued();
    await waitUntil(() => claimStarted === 1, 'drain entered first claim');

    worker.notifyHitlResumed(hitlRun);
    await waitUntil(
      () => started.includes(hitlRun.id),
      'HITL execute before claim resolves',
    );
    expect(claimsWithResult).toBe(0);

    holdFirstClaim.resolve();
    await waitUntil(
      () => started.length >= 2,
      'claimed run starts after HITL occupied a slot',
    );
    expect(claimsWithResult).toBe(1);
    expect(started).toContain(hitlRun.id);

    holdClaimed.resolve();
    holdHitl.resolve();
  });

  it('logs and transitions to failed when the executor throws while the run is still running', async () => {
    const run = makeRun({ status: 'running' });
    const appendLog = jest.fn().mockResolvedValue(undefined);
    const transition = jest
      .fn()
      .mockResolvedValue({ ...run, status: 'failed' });
    const getById = jest.fn().mockResolvedValue(asSnapshot(run));

    const worker = makeWorker({
      runs: unusedRepo({ getById }),
      executor: {
        async execute() {
          throw new Error('boom');
        },
      },
      lifecycle: { appendLog, transition },
    });

    worker.notifyHitlResumed(run);
    await waitUntil(
      () => transition.mock.calls.length === 1,
      'failed transition after executor throw',
    );

    expect(appendLog).toHaveBeenCalledWith(
      expect.objectContaining({
        runId: run.id,
        conversationId: run.conversationId,
        level: 'error',
        step: 'InProcessRunWorker',
      }),
    );
    expect(transition).toHaveBeenCalledWith(
      expect.objectContaining({ id: run.id, status: 'running' }),
      'failed',
      expect.objectContaining({ failedMessage: expect.any(String) }),
    );
  });

  it('does not fail a run that already left running after the executor threw', async () => {
    const run = makeRun({ status: 'running' });
    const appendLog = jest.fn().mockResolvedValue(undefined);
    const transition = jest.fn();
    const getById = jest
      .fn()
      .mockResolvedValue(asSnapshot({ ...run, status: 'completed' }));

    const worker = makeWorker({
      runs: unusedRepo({ getById }),
      executor: {
        async execute() {
          throw new Error('boom after complete');
        },
      },
      lifecycle: { appendLog, transition },
    });

    worker.notifyHitlResumed(run);
    await waitUntil(
      () => getById.mock.calls.length === 1,
      'status re-read after throw',
    );
    await new Promise<void>((resolve) => setImmediate(resolve));

    expect(appendLog).toHaveBeenCalled();
    expect(transition).not.toHaveBeenCalled();
  });

  it('still transitions to failed when appendLog throws', async () => {
    const run = makeRun({ status: 'running' });
    const loggerError = jest
      .spyOn(Logger.prototype, 'error')
      .mockImplementation(() => undefined);
    const appendLog = jest
      .fn()
      .mockRejectedValue(new Error('log write failed'));
    const transition = jest
      .fn()
      .mockResolvedValue({ ...run, status: 'failed' });
    const saveStatus = jest.fn();
    const getById = jest.fn().mockResolvedValue(asSnapshot(run));

    const worker = makeWorker({
      runs: unusedRepo({ getById, saveStatus }),
      executor: {
        async execute() {
          throw new Error('boom');
        },
      },
      lifecycle: { appendLog, transition },
    });

    worker.notifyHitlResumed(run);
    try {
      await waitUntil(
        () => transition.mock.calls.length === 1,
        'failed transition after appendLog throw',
      );

      expect(transition).toHaveBeenCalledWith(
        expect.objectContaining({ id: run.id, status: 'running' }),
        'failed',
        expect.objectContaining({ failedMessage: expect.any(String) }),
      );
      expect(saveStatus).not.toHaveBeenCalled();
      expect(loggerError).toHaveBeenCalled();
    } finally {
      loggerError.mockRestore();
    }
  });

  it('does not bypass lifecycle with saveStatus when transition throws', async () => {
    const run = makeRun({ status: 'running' });
    const loggerError = jest
      .spyOn(Logger.prototype, 'error')
      .mockImplementation(() => undefined);
    const transition = jest.fn().mockRejectedValue(new Error('sse/db failed'));
    const saveStatus = jest.fn();
    const getById = jest.fn().mockResolvedValue(asSnapshot(run));

    const worker = makeWorker({
      runs: unusedRepo({ getById, saveStatus }),
      executor: {
        async execute() {
          throw new Error('boom');
        },
      },
      lifecycle: {
        appendLog: jest.fn().mockResolvedValue(undefined),
        transition,
      },
    });

    worker.notifyHitlResumed(run);
    try {
      await waitUntil(
        () => transition.mock.calls.length === 1,
        'failed transition attempted after executor throw',
      );
      await new Promise<void>((resolve) => setImmediate(resolve));

      expect(saveStatus).not.toHaveBeenCalled();
      expect(loggerError).toHaveBeenCalled();
    } finally {
      loggerError.mockRestore();
    }
  });

  it('D-9b: at MAX=1 executes two interrupted before one queued', async () => {
    const firstInterrupted = makeRun({ status: 'interrupted' });
    const secondInterrupted = makeRun({ status: 'interrupted' });
    const queued = makeRun({ status: 'queued' });
    const interruptedQueue = [firstInterrupted, secondInterrupted];
    const queuedQueue = [queued];
    const holdFirst = deferred();
    const started: string[] = [];

    const runs = unusedRepo({
      claimNextInterrupted: async () => {
        const next = interruptedQueue.shift();
        return next ? { ...next, status: 'running' } : null;
      },
      claimNextQueued: async () => {
        const next = queuedQueue.shift();
        return next ? { ...next, status: 'running' } : null;
      },
    });

    const worker = new InProcessRunWorker(
      { MAX_CONCURRENT_RUNS: 1 } as Env,
      runs,
      {
        async execute(run) {
          started.push(run.id);
          if (started.length === 1) {
            await holdFirst.promise;
          }
        },
      },
      { publish: jest.fn(), subscribe: jest.fn() } as unknown as RunSseHub,
      {
        execute: async () => undefined,
      } as unknown as RecoverInterruptedRunsUseCase,
      {
        appendLog: jest.fn(),
        transition: jest.fn(),
      } as unknown as RunLifecycleService,
    );

    worker.notifyQueued();

    await waitUntil(() => started.length === 1, 'first interrupted execute');
    expect(started).toEqual([firstInterrupted.id]);

    holdFirst.resolve();
    await waitUntil(
      () => started.length === 3,
      'second interrupted then queued',
    );
    expect(started).toEqual([
      firstInterrupted.id,
      secondInterrupted.id,
      queued.id,
    ]);
  });

  it('D-10: onModuleInit recovers before drain and does not burst interrupted execute beyond MAX', async () => {
    const recoverExecute = jest.fn(async () => undefined);
    const first = makeRun({ status: 'interrupted' });
    const second = makeRun({ status: 'interrupted' });
    const pending = [first, second];
    const holdFirst = deferred();
    const started: string[] = [];

    const runs = unusedRepo({
      claimNextInterrupted: async () => {
        expect(recoverExecute).toHaveBeenCalled();
        const next = pending.shift();
        return next ? { ...next, status: 'running' } : null;
      },
      claimNextQueued: async () => null,
    });

    const worker = new InProcessRunWorker(
      { MAX_CONCURRENT_RUNS: 1 } as Env,
      runs,
      {
        async execute(run) {
          started.push(run.id);
          if (started.length === 1) {
            await holdFirst.promise;
          }
        },
      },
      { publish: jest.fn(), subscribe: jest.fn() } as unknown as RunSseHub,
      { execute: recoverExecute } as unknown as RecoverInterruptedRunsUseCase,
      {
        appendLog: jest.fn(),
        transition: jest.fn(),
      } as unknown as RunLifecycleService,
    );

    await worker.onModuleInit();
    await waitUntil(() => started.length === 1, 'first recovered execute');
    expect(started).toEqual([first.id]);

    holdFirst.resolve();
    await waitUntil(() => started.length === 2, 'second after slot frees');
    expect(started).toEqual([first.id, second.id]);
    expect(recoverExecute).toHaveBeenCalledTimes(1);
  });
});
