import { Inject, Injectable } from '@nestjs/common';
import { isRetryable } from '../domain/is-retryable';
import { RUN_REPOSITORY, type RunRepository } from '../domain/run.port';
import { RunLifecycleService } from './run-lifecycle.service';
import type { RunRecord } from '../domain/run.types';

const RECOVERY_CAP = 3;

@Injectable()
export class RecoverInterruptedRunsUseCase {
  constructor(
    @Inject(RUN_REPOSITORY) private readonly runs: RunRepository,
    private readonly lifeCycle: RunLifecycleService,
  ) {}

  async execute(): Promise<RunRecord[]> {
    const interrupted = await this.runs.findInterruptedRunning();
    const resume: RunRecord[] = [];
    for (const run of interrupted) {
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
          failedMessage: 'recovery exhauster after process interrupt',
        });
        continue;
      }
      await this.runs.saveRecoveryAttempt(run.id, run.recoveryAttempts + 1);
      resume.push({ ...run, recoveryAttempts: run.recoveryAttempts + 1 });
    }
    return resume;
  }
}
