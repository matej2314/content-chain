import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { RUN_REPOSITORY, type RunRepository } from '../domain/run.port';
import { InProcessRunWorker } from './in-process-run.worker';
import { RunLifecycleService } from './run-lifecycle.service';
import { parseWithZod } from './parse-with-zod';
import { runIdSchema, hitlSelectedIdeaIdsSchema } from './run.schemas';
import type { RunId } from '@content-chain/shared';

@Injectable()
export class ResumeHitlUseCase {
  constructor(
    @Inject(RUN_REPOSITORY) private readonly runs: RunRepository,
    private readonly worker: InProcessRunWorker,
    private readonly lifeCycle: RunLifecycleService,
  ) {}

  async execute(runId: RunId, selectedIdeaIds: string[]) {
    const parsedRunId = parseWithZod(runIdSchema, runId);
    const parsedSelectedIdeaIds = parseWithZod(
      hitlSelectedIdeaIdsSchema,
      selectedIdeaIds,
    );
    const run = await this.runs.getById(parsedRunId);
    if (!run) {
      throw new DomainException('RUN_NOT_FOUND', 'Run not found', 404);
    }
    if (run.status !== 'awaiting_hitl') {
      throw new DomainException(
        'HITL_REQUIRED',
        'Run is to awaiting hitl',
        409,
      );
    }
    await this.runs.saveSelectedIdeaIds(parsedRunId, parsedSelectedIdeaIds);
    const running = await this.lifeCycle.transition(run, 'running');
    this.worker.notifyHitlResumed({
      ...running,
      selectedIdeaIds: parsedSelectedIdeaIds,
    });
    return { runId, status: 'running' as const };
  }
}
