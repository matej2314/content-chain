import { Inject, Injectable } from '@nestjs/common';
import { PG_BOSS, type PgBossSendClient } from './pg-boss.tokens';
import { RUN_EXECUTE_QUEUE, RUN_WAKE_QUEUE } from './run-job.constants';
import type { RunId } from '@content-chain/shared';
import type { RunJobEnqueuePort } from '../../domain/run-job-enqueue.port';

const QUEUE_NOT_FOUND = 'PGBOSS_QUEUE_NOT_FOUND';
const SEND_RETRY_ATTEMPTS = 10;
const SEND_RETRY_DELAY_MS = 200;

function isQueueNotFound(err: unknown): boolean {
  if (typeof err === 'object' && err !== null && 'code' in err) {
    return (err as { code: unknown }).code === QUEUE_NOT_FOUND;
  }
  return err instanceof Error && /Queue .+ does not exist/.test(err.message);
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

@Injectable()
export class PgBossRunJobEnqueue implements RunJobEnqueuePort {
  constructor(@Inject(PG_BOSS) private readonly boss: PgBossSendClient) {}

  async enqueueWake(runId: RunId): Promise<void> {
    await this.sendWithRetry(RUN_WAKE_QUEUE, runId);
  }

  async enqueueExecute(runId: RunId): Promise<void> {
    await this.sendWithRetry(RUN_EXECUTE_QUEUE, runId);
  }

  private async sendWithRetry(queue: string, runId: RunId): Promise<void> {
    let lastErr: unknown;
    for (let attempt = 0; attempt < SEND_RETRY_ATTEMPTS; attempt++) {
      try {
        await this.boss.send(queue, { runId });
        return;
      } catch (err) {
        lastErr = err;
        if (!isQueueNotFound(err) || attempt === SEND_RETRY_ATTEMPTS - 1) {
          throw err;
        }
        await sleep(SEND_RETRY_DELAY_MS);
      }
    }
    throw lastErr;
  }
}
