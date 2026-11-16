import { newRunId } from '../../../shared/http/new-ids';
import { RUN_ABORT_CHANNEL } from './run-job.constants';
import { PgNotifyAbortSignal } from './pg-notify-abort.signal';
import type { Pool } from 'pg';

describe('PgNotifyAbortSignal', () => {
  it('requestCancel calls pg_notify with run.abort and runId', async () => {
    const query = jest.fn().mockResolvedValue({ rows: [], rowCount: 1 });
    const pool = { query } as unknown as Pool;
    const abort = new PgNotifyAbortSignal(pool);
    const runId = newRunId();

    await abort.requestCancel(runId);

    expect(query).toHaveBeenCalledWith(`SELECT pg_notify($1, $2)`, [
      RUN_ABORT_CHANNEL,
      runId,
    ]);
    expect(RUN_ABORT_CHANNEL).toBe('run.abort');
  });
});
