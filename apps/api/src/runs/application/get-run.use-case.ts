import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { RUN_REPOSITORY, type RunRepository } from '../domain/run.port';
import { parseWithZod } from './parse-with-zod';
import { runIdSchema } from './run.schemas';
import type { RunId } from '@content-chain/shared';

@Injectable()
export class GetRunUseCase {
  constructor(@Inject(RUN_REPOSITORY) private readonly runs: RunRepository) {}

  async execute(runId: RunId) {
    const parsedRunId = parseWithZod(runIdSchema, runId);
    const run = await this.runs.getById(parsedRunId);
    if (!run) {
      throw new DomainException('RUN_NOT_FOUND', 'Run not found', 404);
    }
    return {
      runId: run.id,
      taskType: run.taskType,
      platform: run.platform,
      language: run.language,
      status: run.status,
      conversationId: run.conversationId,
      createdAt: run.createdAt.toISOString(),
      startedBy: run.startedBy,
      result: null,
      hitl: null,
    };
  }
}
