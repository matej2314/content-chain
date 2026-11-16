import { Inject, Injectable, Logger } from '@nestjs/common';
import { PG_NOTIFY_POOL } from './pg-boss.tokens';
import { RUN_ABORT_CHANNEL } from './run-job.constants';
import type { Pool } from 'pg';
import type { RunId } from '@content-chain/shared';
import type { RunAbortSignalPort } from '../../domain/run-abort-signal.port';

@Injectable()
export class PgNotifyAbortSignal implements RunAbortSignalPort {
  private readonly logger = new Logger(PgNotifyAbortSignal.name);
  constructor(@Inject(PG_NOTIFY_POOL) private readonly pool: Pool) {}

  async requestCancel(runId: RunId): Promise<void> {
    try {
      await this.pool.query('SELECT pg_notify($1, $2)', [
        RUN_ABORT_CHANNEL,
        runId,
      ]);
    } catch (err) {
      this.logger.warn({ err, runId }, 'abort NOTIFY failed');
    }
  }
}
