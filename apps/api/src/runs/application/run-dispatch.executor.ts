import { isContentTaskType, isSocialTaskType } from '@content-chain/shared';
import type { RunExecutorPort } from '../domain/run-executor.port';
import type { RunLifecyclePort } from '../domain/run-lifecycle.port';
import type { RunRecord } from '../domain/run.types';

export class RunDispatchExecutor implements RunExecutorPort {
  constructor(
    private readonly social: RunExecutorPort,
    private readonly content: RunExecutorPort,
    private readonly lifecycle: RunLifecyclePort,
  ) {}

  async execute(run: RunRecord): Promise<void> {
    if (isSocialTaskType(run.taskType)) {
      return this.social.execute(run);
    }
    if (isContentTaskType(run.taskType)) {
      return this.content.execute(run);
    }
    await this.lifecycle.transition(run, 'failed', {
      failedCode: 'UNKNOWN_TASK_TYPE',
      failedMessage: `Unknown taskType: ${run.taskType}`,
    });
  }
}
