import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { RUN_REPOSITORY, type RunRepository } from '../domain/run.port';
import {
  RUN_RESULT_READER,
  type RunResultReader,
} from '../domain/run-result-reader.port';
import { parseWithZod } from './parse-with-zod';
import { runIdSchema } from './run.schemas';
import type { RunId } from '@content-chain/shared';

@Injectable()
export class GetRunUseCase {
  constructor(
    @Inject(RUN_REPOSITORY) private readonly runs: RunRepository,
    @Inject(RUN_RESULT_READER) private readonly results: RunResultReader,
  ) {}

  async execute(runId: RunId) {
    const parsedRunId = parseWithZod(runIdSchema, runId);
    const run = await this.runs.getById(parsedRunId);
    if (!run) {
      throw new DomainException('RUN_NOT_FOUND', 'Run not found', 404);
    }
    const ideas = await this.results.listIdeas(run.id);
    const stored = await this.results.getContent(run.id);
    const hitl = run.status === 'awaiting_hitl' ? { options: ideas } : null;
    return {
      runId: run.id,
      taskType: run.taskType,
      platform: run.platform,
      language: run.language,
      status: run.status,
      conversationId: run.conversationId,
      createdAt: run.createdAt.toISOString(),
      startedBy: run.startedBy,
      result: {
        ideas,
        content: stored?.content ?? null,
      },
      hitl,
    };
  }
}
