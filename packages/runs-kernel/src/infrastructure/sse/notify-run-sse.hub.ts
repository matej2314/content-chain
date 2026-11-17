import { Inject, Injectable, Logger } from '@nestjs/common';
import type { Observable } from 'rxjs';
import type { Pool } from 'pg';
import type { RunId } from '@content-chain/shared';
import type { RunSseEvent, RunSseHub } from '../../domain/run-sse.port';
import { PG_NOTIFY_POOL } from '../dispatch/pg-boss.tokens';
import { RUN_SSE_CHANNEL } from '../dispatch/run-job.constants';
import {
  encodeComplete,
  encodePublish,
  encodePublishLog,
} from './run-sse-notify.envelope';

@Injectable()
export class NotifyRunSseHub implements RunSseHub {
  private readonly logger = new Logger(NotifyRunSseHub.name);

  constructor(@Inject(PG_NOTIFY_POOL) private readonly pool: Pool) {}

  subscribe(_runId: RunId): Observable<RunSseEvent> {
    throw new Error('NotifyRunSseHub does not support subscribe (api-only)');
  }

  /** Status / HITL / terminal — inline. run.log → użyj publishLog(logId). */
  publish(event: RunSseEvent): void {
    if (event.event === 'run.log') {
      this.logger.error(
        'NotifyRunSseHub.publish(run.log) forbidden — use publishLog(logId)',
      );
      return;
    }
    void this.pool
      .query(`SELECT pg_notify($1, $2)`, [
        RUN_SSE_CHANNEL,
        encodePublish(event),
      ])
      .catch((err: unknown) => {
        this.logger.warn({ err }, 'SSE NOTIFY publish failed');
      });
  }

  publishLog(logId: string, runId: RunId): void {
    void this.pool
      .query(`SELECT pg_notify($1, $2)`, [
        RUN_SSE_CHANNEL,
        encodePublishLog(logId, runId),
      ])
      .catch((err: unknown) => {
        this.logger.warn({ err, logId }, 'SSE NOTIFY publish-log failed');
      });
  }

  complete(runId: RunId): void {
    void this.pool
      .query(`SELECT pg_notify($1, $2)`, [
        RUN_SSE_CHANNEL,
        encodeComplete(runId),
      ])
      .catch((err: unknown) => {
        this.logger.warn({ err, runId }, 'SSE NOTIFY complete failed');
      });
  }
}
