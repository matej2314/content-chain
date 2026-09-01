import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { RUN_REPOSITORY, type RunRepository } from '../domain/run.port';
import { parseWithZod } from './parse-with-zod';
import { runIdSchema } from './run.schemas';
import type { ConversationId, RunId } from '@content-chain/shared';
import { RunLogLevel } from '../domain/run.types';

interface GetRunLogsOutput {
  items: {
    at: string;
    level: RunLogLevel;
    message: string;
    step: string | undefined;
    requestId: string | undefined;
    conversationId: ConversationId | null;
  }[];
}

@Injectable()
export class GetRunLogsUseCase {
  constructor(@Inject(RUN_REPOSITORY) private readonly runs: RunRepository) {}

  async execute(runId: RunId) {
    const parsedRunId = parseWithZod(runIdSchema, runId);
    const run = await this.runs.getById(parsedRunId);
    if (!run) {
      throw new DomainException('RUN_NOT_FOUND', 'Run not found', 404);
    }
    const items = await this.runs.listLogs(parsedRunId);
    return {
      items: items.map((entry) => ({
        at: entry.at.toISOString(),
        level: entry.level,
        message: entry.message,
        step: entry.step,
        requestId: entry.requestId,
        conversationId: entry.conversationId,
      })),
    };
  }
}
