import { newRunId } from '../../../shared/http/new-ids';
import { RUN_EXECUTE_QUEUE, RUN_WAKE_QUEUE } from './run-job.constants';
import { PgBossRunJobEnqueue } from './pg-boss.run-job.enqueue';
import type { PgBossSendClient } from './pg-boss.tokens';

describe('PgBossRunJobEnqueue', () => {
  it('enqueueWake sends to run.wake with { runId }', async () => {
    const send = jest.fn<PgBossSendClient['send']>().mockResolvedValue('job-1');
    const enqueue = new PgBossRunJobEnqueue({ send });
    const runId = newRunId();

    await enqueue.enqueueWake(runId);

    expect(send).toHaveBeenCalledWith(RUN_WAKE_QUEUE, { runId });
    expect(send).toHaveBeenCalledWith('run.wake', { runId });
  });

  it('enqueueExecute sends to run.execute with { runId }', async () => {
    const send = jest.fn<PgBossSendClient['send']>().mockResolvedValue(null);
    const enqueue = new PgBossRunJobEnqueue({ send });
    const runId = newRunId();

    await enqueue.enqueueExecute(runId);

    expect(send).toHaveBeenCalledWith(RUN_EXECUTE_QUEUE, { runId });
    expect(send).toHaveBeenCalledWith('run.execute', { runId });
  });
});
