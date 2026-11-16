import { createRunId } from '@content-chain/shared';
import type { RunExecutePump } from '../../application/lifecycle/run-execute.pump';
import type { RunRepository } from '../../domain/run.port';
import { makeSocialRun } from '../../run-record.test-helpers';
import { PgBossRunWorker } from './pg-boss-run.worker';
import type { PgBossJob, PgBossWorkerClient } from './pg-boss.tokens';
import { RUN_EXECUTE_QUEUE, RUN_WAKE_QUEUE } from './run-job.constants';

type WorkHandler = (jobs: PgBossJob[]) => Promise<void>;

function makeBoss(): PgBossWorkerClient & {
  handlers: Map<string, WorkHandler>;
} {
  const handlers = new Map<string, WorkHandler>();
  return {
    handlers,
    send: async () => null,
    start: async () => undefined,
    stop: async () => undefined,
    createQueue: async () => undefined,
    work: async (name, handler) => {
      handlers.set(name, handler);
      return `worker:${name}`;
    },
  };
}

describe('PgBossRunWorker', () => {
  it('run.wake → notifyQueued', async () => {
    const boss = makeBoss();
    const notifyQueued = jest.fn();
    const pump = { notifyQueued, scheduleExistingRunning: jest.fn() };
    const runs = { getById: jest.fn() } as unknown as RunRepository;

    const worker = new PgBossRunWorker(
      boss,
      runs,
      pump as unknown as RunExecutePump,
    );
    await worker.onModuleInit();

    const wake = boss.handlers.get(RUN_WAKE_QUEUE);
    expect(wake).toBeDefined();
    await wake!([{ data: { runId: 'run-1' } }]);
    expect(notifyQueued).toHaveBeenCalledTimes(1);
  });

  it('run.execute → load + scheduleExistingRunning when status is running', async () => {
    const boss = makeBoss();
    const scheduleExistingRunning = jest.fn();
    const pump = {
      notifyQueued: jest.fn(),
      scheduleExistingRunning,
    };
    const run = makeSocialRun({ status: 'running' });
    const getById = jest.fn().mockResolvedValue(run);
    const runs = { getById } as unknown as RunRepository;

    const worker = new PgBossRunWorker(
      boss,
      runs,
      pump as unknown as RunExecutePump,
    );
    await worker.onModuleInit();

    const execute = boss.handlers.get(RUN_EXECUTE_QUEUE);
    expect(execute).toBeDefined();
    await execute!([{ data: { runId: run.id } }]);

    expect(getById).toHaveBeenCalledWith(createRunId(run.id));
    expect(scheduleExistingRunning).toHaveBeenCalledWith(run);
  });

  it('run.execute skips schedule when status is not running', async () => {
    const boss = makeBoss();
    const scheduleExistingRunning = jest.fn();
    const pump = {
      notifyQueued: jest.fn(),
      scheduleExistingRunning,
    };
    const run = makeSocialRun({ status: 'queued' });
    const runs = {
      getById: jest.fn().mockResolvedValue(run),
    } as unknown as RunRepository;

    const worker = new PgBossRunWorker(
      boss,
      runs,
      pump as unknown as RunExecutePump,
    );
    await worker.onModuleInit();

    await boss.handlers.get(RUN_EXECUTE_QUEUE)!([
      { data: { runId: run.id } },
    ]);
    expect(scheduleExistingRunning).not.toHaveBeenCalled();
  });

  it('run.execute skips when run is missing', async () => {
    const boss = makeBoss();
    const scheduleExistingRunning = jest.fn();
    const pump = {
      notifyQueued: jest.fn(),
      scheduleExistingRunning,
    };
    const missingId = makeSocialRun().id;
    const runs = {
      getById: jest.fn().mockResolvedValue(null),
    } as unknown as RunRepository;

    const worker = new PgBossRunWorker(
      boss,
      runs,
      pump as unknown as RunExecutePump,
    );
    await worker.onModuleInit();

    await boss.handlers.get(RUN_EXECUTE_QUEUE)!([
      { data: { runId: missingId } },
    ]);
    expect(scheduleExistingRunning).not.toHaveBeenCalled();
  });

  it('payload without runId fails the job (Zod) without claim/schedule', async () => {
    const boss = makeBoss();
    const scheduleExistingRunning = jest.fn();
    const notifyQueued = jest.fn();
    const getById = jest.fn();
    const pump = { notifyQueued, scheduleExistingRunning };
    const runs = { getById } as unknown as RunRepository;

    const worker = new PgBossRunWorker(
      boss,
      runs,
      pump as unknown as RunExecutePump,
    );
    await worker.onModuleInit();

    await expect(
      boss.handlers.get(RUN_WAKE_QUEUE)!([{ data: {} }]),
    ).rejects.toThrow();
    await expect(
      boss.handlers.get(RUN_EXECUTE_QUEUE)!([{ data: { extra: true } }]),
    ).rejects.toThrow();

    expect(notifyQueued).not.toHaveBeenCalled();
    expect(getById).not.toHaveBeenCalled();
    expect(scheduleExistingRunning).not.toHaveBeenCalled();
  });

  it('onModuleDestroy stops pg-boss gracefully', async () => {
    const boss = makeBoss();
    const stop = jest.spyOn(boss, 'stop');
    const worker = new PgBossRunWorker(
      boss,
      { getById: jest.fn() } as unknown as RunRepository,
      {
        notifyQueued: jest.fn(),
        scheduleExistingRunning: jest.fn(),
      } as unknown as RunExecutePump,
    );
    await worker.onModuleDestroy();
    expect(stop).toHaveBeenCalledWith({ graceful: true });
  });
});
