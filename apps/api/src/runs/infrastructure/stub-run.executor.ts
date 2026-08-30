import { Injectable } from '@nestjs/common';
import { RunLifecycleService } from '../application/run-lifecycle.service';
import type { RunExecutorPort } from '../domain/run-executor.port';
import type { RunRecord } from '../domain/run.types';

/** Only for testing purposes. Not registered as the production `RUN_EXECUTOR`. */
@Injectable()
export class StubRunExecutor implements RunExecutorPort {
  constructor(private readonly lifeCycleService: RunLifecycleService) {}

  async execute(run: RunRecord): Promise<void> {
    await this.lifeCycleService.appendLog({
      runId: run.id,
      conversationId: run.conversationId,
      level: 'info',
      message: 'pipeline executor: no-op',
      step: 'StubRunExecutor',
    });
    await this.lifeCycleService.transition(run, 'completed', {
      resultSummary: 'stub:',
    });
  }
}
