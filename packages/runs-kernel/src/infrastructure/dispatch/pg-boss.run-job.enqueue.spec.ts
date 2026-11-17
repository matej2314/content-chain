import { newRunId } from '../../testing/new-ids';
import { RUN_EXECUTE_QUEUE, RUN_WAKE_QUEUE } from './run-job.constants';
import { PgBossRunJobEnqueue } from './pg-boss.run-job.enqueue';
import type { PgBossSendClient } from './pg-boss.tokens';

function makeBoss(send: PgBossSendClient['send']): PgBossSendClient {
  return {
    send,
    stop: jest.fn(async () => undefined),
  };
}

describe('PgBossRunJobEnqueue', () => {
  it('enqueueWake sends to run.wake with { runId }', async () => {
    const send = jest.fn(async () => 'job-1' as string | null);
    const enqueue = new PgBossRunJobEnqueue(makeBoss(send));
    const runId = newRunId();

    await enqueue.enqueueWake(runId);

    expect(send).toHaveBeenCalledWith(RUN_WAKE_QUEUE, { runId });
    expect(send).toHaveBeenCalledWith('run.wake', { runId });
  });

  it('enqueueExecute sends to run.execute with { runId }', async () => {
    const send = jest.fn(async () => null as string | null);
    const enqueue = new PgBossRunJobEnqueue(makeBoss(send));
    const runId = newRunId();

    await enqueue.enqueueExecute(runId);

    expect(send).toHaveBeenCalledWith(RUN_EXECUTE_QUEUE, { runId });
    expect(send).toHaveBeenCalledWith('run.execute', { runId });
  });

  it('retries send when queue does not exist yet, then succeeds', async () => {
    jest.useFakeTimers();
    const missing = Object.assign(new Error('Queue run.wake does not exist'), {
      code: 'PGBOSS_QUEUE_NOT_FOUND',
    });
    const send = jest
      .fn(async () => 'job-ok' as string | null)
      .mockRejectedValueOnce(missing)
      .mockRejectedValueOnce(missing)
      .mockResolvedValueOnce('job-ok');
    const enqueue = new PgBossRunJobEnqueue(makeBoss(send));
    const runId = newRunId();

    const done = enqueue.enqueueWake(runId);
    await jest.runAllTimersAsync();
    await done;

    expect(send).toHaveBeenCalledTimes(3);
    jest.useRealTimers();
  });

  it('rethrows non-queue-missing send errors without retry', async () => {
    const send = jest.fn(async (): Promise<string | null> => {
      throw new Error('connection refused');
    });
    const enqueue = new PgBossRunJobEnqueue(makeBoss(send));

    await expect(enqueue.enqueueExecute(newRunId())).rejects.toThrow(
      'connection refused',
    );
    expect(send).toHaveBeenCalledTimes(1);
  });
});
