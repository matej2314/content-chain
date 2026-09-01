import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../shared/exceptions/domain.exception';
import {
  RUN_REPOSITORY,
  RunStartedBy,
  type RunRepository,
} from '../domain/run.port';
import {
  RUN_RESULT_READER,
  type RunResultReader,
} from '../domain/run-result-reader.port';
import { parseWithZod } from './parse-with-zod';
import { runIdSchema } from './run.schemas';
import type {
  RunId,
  RunTaskType,
  SocialPlatform,
  ContentLanguage,
  RunStatus,
  ConversationId,
} from '@content-chain/shared';
import type {
  ReelIdea,
  ReelScript,
  SocialContent,
  SocialIdea,
} from '../../social/domain/social.types';

interface GetRunOutput {
  runId: RunId;
  taskType: RunTaskType;
  platform: SocialPlatform;
  language: ContentLanguage;
  status: RunStatus;
  conversationId: ConversationId;
  createdAt: string;
  startedBy: RunStartedBy | null;
  result: {
    ideas: SocialIdea[];
    content: SocialContent | null;
    reelIdeas: ReelIdea[];
    reelScript: ReelScript | null;
  };
  hitl: {
    options: SocialIdea[] | ReelIdea[];
  } | null;
}

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

    const [ideas, reelIdeas, stored, storedReel] = await Promise.all([
      this.results.listIdeas(run.id),
      this.results.listReelIdeas(run.id),
      this.results.getContent(run.id),
      this.results.getReelScript(run.id),
    ]);

    const hitlOptions =
      run.taskType === 'reel_ideas_then_scripts' ? reelIdeas : ideas;
    const hitl =
      run.status === 'awaiting_hitl' ? { options: hitlOptions } : null;
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
        reelIdeas,
        reelScript: storedReel?.script ?? null,
      },
      hitl,
    };
  }
}
