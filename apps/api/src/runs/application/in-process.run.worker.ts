import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ENV, type Env } from '../../shared/config/env';
import {
  RUN_EXECUTOR,
  type RunExecutorPort,
} from '../domain/run-executor.port';
import { RUN_REPOSITORY, type RunRepository } from '../domain/run.port';
import { RUN_SSE_HUB, type RunSseHub } from '../domain/run-sse.port';
import { RecoverInterruptedRunsUseCase } from './recover-interrupted-runs.use-case';
import { RunLifecycleService } from './run-lifecycle.service';
import type { RunRecord } from '../domain/run.types';

const EXECUTOR_FAILED_MESSAGE = 'Run executor failed';

@Injectable()
export class InProcessRunWorker implements OnModuleInit {
  private readonly logger = new Logger(InProcessRunWorker.name);
  private inFlight = 0;
  private pumpTail: Promise<void> = Promise.resolve();

  constructor(
    @Inject(ENV) private readonly env: Env,
    @Inject(RUN_REPOSITORY) private readonly runs: RunRepository,
    @Inject(RUN_EXECUTOR) private readonly executor: RunExecutorPort,
    @Inject(RUN_SSE_HUB) private readonly sseHub: RunSseHub,
    private readonly recover: RecoverInterruptedRunsUseCase,
    private readonly lifecycle: RunLifecycleService,
  ) {}

  async onModuleInit() {
    const resume = await this.recover.execute();
    for (const run of resume) {
      this.scheduleExistingRunning(run);
    }
    this.enqueuePump();
  }

  notifyQueued(): void {
    this.enqueuePump();
  }

  notifyHitlResumed(run: RunRecord): void {
    this.scheduleExistingRunning(run);
  }

  private scheduleExistingRunning(run: RunRecord): void {
    this.inFlight += 1;
    void this.executeViaExecutor(run).finally(() => {
      this.inFlight -= 1;
      this.enqueuePump();
    });
  }

  private enqueuePump(): void {
    this.pumpTail = this.pumpTail.then(() =>
      this.drain().catch(() => undefined),
    );
  }

  private async drain(): Promise<void> {
    while (this.inFlight < this.env.MAX_CONCURRENT_RUNS) {
      const claimed = await this.runs.claimNextQueued();
      if (!claimed) return;
      this.inFlight += 1;
      void this.executeClaimed(claimed).finally(() => {
        this.inFlight -= 1;
        this.enqueuePump();
      });
    }
  }

  private async executeClaimed(run: RunRecord): Promise<void> {
    this.sseHub.publish({
      event: 'run.status',
      data: { runId: run.id, status: 'running' },
    });
    await this.executeViaExecutor(run);
  }

  private async executeViaExecutor(run: RunRecord): Promise<void> {
    try {
      await this.executor.execute(run);
    } catch {
      try {
        await this.lifecycle.appendLog({
          runId: run.id,
          conversationId: run.conversationId,
          level: 'error',
          message: EXECUTOR_FAILED_MESSAGE,
          step: 'InProcessRunWorker',
        });
      } catch (logError) {
        this.logger.error(
          { runId: run.id, err: logError },
          'failed to append executor error log',
        );
      }
      try {
        const latest = await this.runs.getById(run.id);
        if (latest?.status !== 'running') {
          return;
        }
        try {
          await this.lifecycle.transition(latest, 'failed', {
            failedMessage: EXECUTOR_FAILED_MESSAGE,
          });
        } catch (failError) {
          this.logger.error(
            { runId: run.id, err: failError },
            'lifecycle failed-path failed, falling back to saveStatus',
          );
          await this.runs.saveStatus(run.id, 'failed');
        }
      } catch (markError) {
        this.logger.error(
          { runId: run.id, err: markError },
          'could not mark run failed after executor error',
        );
      }
    }
  }
}
