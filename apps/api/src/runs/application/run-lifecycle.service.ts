import { Inject, Injectable } from '@nestjs/common';
import type { RunLifecyclePort } from '../domain/run-lifecycle.port';
import { RUN_REPOSITORY, type RunRepository } from '../domain/run.port';
import { RUN_SSE_HUB, type RunSseHub } from '../domain/run-sse.port';
import { assertTransition } from '../domain/status-transitions';
import type { RunLogEntry, RunRecord } from '../domain/run.types';
import type { RunStatus } from '@content-chain/shared';

export type TransitionExtras = {
  resultSummary?: string;
  failedCode?: string;
  failedMessage?: string;
  hitlOptions?: unknown[];
};

@Injectable()
export class RunLifecycleService implements RunLifecyclePort {
  constructor(
    @Inject(RUN_REPOSITORY) private readonly runs: RunRepository,
    @Inject(RUN_SSE_HUB) private readonly sseHub: RunSseHub,
  ) {}

  async transition(
    run: RunRecord,
    to: RunStatus,
    extras?: TransitionExtras,
  ): Promise<RunRecord> {
    assertTransition(run.status, to);
    await this.runs.saveStatus(run.id, to);
    this.sseHub.publish({
      event: 'run.status',
      data: { runId: run.id, status: to },
    });
    if (to === 'awaiting_hitl') {
      this.sseHub.publish({
        event: 'run.hitl',
        data: { runId: run.id, options: extras?.hitlOptions ?? [] },
      });
    }
    if (to === 'completed') {
      this.sseHub.publish({
        event: 'run.completed',
        data: { runId: run.id, resultSummary: extras?.resultSummary },
      });
      this.sseHub.complete(run.id);
    }
    if (to === 'failed') {
      this.sseHub.publish({
        event: 'run.failed',
        data: {
          runId: run.id,
          code: extras?.failedCode,
          message: extras?.failedMessage ?? 'run failed',
        },
      });
      this.sseHub.complete(run.id);
    }
    return { ...run, status: to };
  }

  async appendLog(
    entry: Omit<RunLogEntry, 'at'> & { at?: Date },
  ): Promise<void> {
    const saved = await this.runs.appendLog({
      ...entry,
      at: entry.at ?? new Date(),
    });
    this.sseHub.publish({
      event: 'run.log',
      data: { ...saved, runId: saved.runId },
    });
  }
}
