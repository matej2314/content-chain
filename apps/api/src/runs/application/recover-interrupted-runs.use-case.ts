import { Inject, Injectable } from '@nestjs/common';
import { isRetryable } from '../domain/is-retryable';
import { RUN_REPOSITORY, type RunRepository } from '../domain/run.port';
import { RunLifecycleService } from './run-lifecycle.service';

const RECOVERY_CAP = 3;

@Injectable()
export class RecoverInterruptedRunsUseCase {
  constructor(
    @Inject(RUN_REPOSITORY) private readonly runs: RunRepository,
    private readonly lifeCycle: RunLifecycleService,
  ) {}

  async execute(): Promise<void> {
    const leftoverRunning = await this.runs.findInterruptedRunning();
    for (const run of leftoverRunning) {
      if (
        run.recoveryAttempts >= RECOVERY_CAP ||
        !isRetryable({ kind: 'process_crash' })
      ) {
        await this.lifeCycle.appendLog({
          runId: run.id,
          conversationId: run.conversationId,
          level: 'error',
          message: 'recovery exhausted after process interrupt',
          step: 'recovery',
        });
        await this.lifeCycle.transition(run, 'failed', {
          failedMessage: 'recovery exhausted after process interrupt',
        });
        continue;
      }
      await this.runs.saveRecoveryAttempt(run.id, run.recoveryAttempts + 1);
      await this.lifeCycle.transition(run, 'interrupted');
    }
  }
}
