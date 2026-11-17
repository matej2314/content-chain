import {
  Inject,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { createRunId } from '@content-chain/shared';
import { RunExecutePump } from '../../application/lifecycle/run-execute.pump';
import { RUN_REPOSITORY, type RunRepository } from '../../domain/run.port';
import {
  PG_BOSS,
  type PgBossWorkerClient,
} from './pg-boss.tokens';
import { RUN_EXECUTE_QUEUE, RUN_WAKE_QUEUE } from './run-job.constants';
import { runJobPayloadSchema } from './run-job.schemas';

/**
 * Worker-only: registers pg-boss work handlers (queues created in PG_BOSS factory).
 * D6: injects PgBossWorkerClient — no static import from 'pg-boss'.
 */
@Injectable()
export class PgBossRunWorker implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PgBossRunWorker.name);

  constructor(
    @Inject(PG_BOSS) private readonly boss: PgBossWorkerClient,
    @Inject(RUN_REPOSITORY) private readonly runs: RunRepository,
    private readonly pump: RunExecutePump,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.boss.work(RUN_WAKE_QUEUE, async ([job]) => {
      if (!job) return;
      const parsed = runJobPayloadSchema.parse(job.data);
      void parsed.runId;
      this.pump.notifyQueued();
    });

    await this.boss.work(RUN_EXECUTE_QUEUE, async ([job]) => {
      if (!job) return;
      const { runId } = runJobPayloadSchema.parse(job.data);
      const run = await this.runs.getById(createRunId(runId));
      if (!run || run.status !== 'running') return;
      this.pump.scheduleExistingRunning(run);
    });
  }

  async onModuleDestroy(): Promise<void> {
    try {
      await this.boss.stop({ graceful: true });
    } catch (err) {
      this.logger.warn({ err }, 'pg-boss stop failed');
    }
  }
}
