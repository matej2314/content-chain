import { Inject, Injectable } from '@nestjs/common';
import { PG_BOSS, type PgBossSendClient } from './pg-boss.tokens';
import { RUN_EXECUTE_QUEUE, RUN_WAKE_QUEUE } from './run-job.constants';
import type { RunId } from '@content-chain/shared';
import type { RunJobEnqueuePort } from '../../domain/run-job-enqueue.port';

@Injectable()
export class PgBossRunJobEnqueue implements RunJobEnqueuePort {
  constructor(@Inject(PG_BOSS) private readonly boss: PgBossSendClient) {}
  async enqueueWake(runId: RunId): Promise<void> {
    await this.boss.send(RUN_WAKE_QUEUE, { runId });
  }
  async enqueueExecute(runId: RunId): Promise<void> {
    await this.boss.send(RUN_EXECUTE_QUEUE, { runId });
  }
}
