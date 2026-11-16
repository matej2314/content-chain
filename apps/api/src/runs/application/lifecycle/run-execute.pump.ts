import { Inject, Injectable, Logger } from '@nestjs/common';
import { ENV, type Env } from '../../../shared/config/env';
import {
  RUN_EXECUTOR,
  type RunExecutorPort,
} from '../../domain/run-executor.port';
import { RUN_REPOSITORY, type RunRepository } from '../../domain/run.port';
import { RUN_SSE_HUB, type RunSseHub } from '../../domain/run-sse.port';
import type { RunRecord } from '../../domain/run.types';
import { RunAbortRegistry } from './run-abort.registry';
import { RunLifecycleService } from './run-lifecycle.service';

const EXECUTOR_FAILED_MESSAGE = 'Run executor failed';

/**
 * Cap claim + HITL-A execute pump. No OnModuleInit drain — Nest runs hooks in
 * parallel; first wake is WorkerRecoverySweepBoot after recover (R-9), then
 * pg-boss run.wake / StartRun until FAZA 2 / KROK 3 cut.
 */
@Injectable()
export class RunExecutePump {
  private readonly logger = new Logger(RunExecutePump.name);
  private inFlight = 0;
  private pumpTail: Promise<void> = Promise.resolve();

  constructor(
    @Inject(ENV) private readonly env: Env,
    @Inject(RUN_REPOSITORY) private readonly runs: RunRepository,
    @Inject(RUN_EXECUTOR) private readonly executor: RunExecutorPort,
    @Inject(RUN_SSE_HUB) private readonly sseHub: RunSseHub,
    private readonly lifecycle: RunLifecycleService,
    private readonly abortRegistry: RunAbortRegistry,
  ) {}

  notifyQueued(): void {
    this.enqueuePump();
  }

  /** HITL-A / run.execute path — may bump inFlight above MAX_CONCURRENT_RUNS. */
  scheduleExistingRunning(run: RunRecord): void {
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
      const claimed =
        (await this.runs.claimNextInterrupted()) ??
        (await this.runs.claimNextQueued());
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
    const signal = this.abortRegistry.begin(run.id);
    try {
      await this.executor.execute(run, { signal });
    } catch {
      try {
        await this.lifecycle.appendLog({
          runId: run.id,
          conversationId: run.conversationId,
          level: 'error',
          message: EXECUTOR_FAILED_MESSAGE,
          step: 'RunExecutePump',
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

        await this.lifecycle.transition(latest, 'failed', {
          failedMessage: EXECUTOR_FAILED_MESSAGE,
        });
      } catch (markError) {
        this.logger.error(
          { runId: run.id, err: markError },
          'could not mark run failed after executor error',
        );
      }
    } finally {
      this.abortRegistry.end(run.id);
    }
  }
}
