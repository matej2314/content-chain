import { Inject, Injectable } from '@nestjs/common';
import { GetCompletenessUseCase } from '../../company-context/application/get-completeness.use-case';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { newConversationId, newRunId } from '../../shared/http/new-ids';
import { RUN_REPOSITORY, type RunRepository } from '../domain/run.port';
import { InProcessRunWorker } from './in-process-run.worker';
import { parseWithZod } from './parse-with-zod';
import { startRunCommandSchema } from './run.schemas';
import {
  isSocialTaskType,
  type ContentLanguage,
  type RunTaskType,
  type SocialPlatform,
  type SocialTaskType,
} from '@content-chain/shared';
import type { SocialBrief, SocialRunRecord } from '../domain/run.types';

export type StartRunCommand = {
  taskType: RunTaskType;
  platform: SocialPlatform;
  language: ContentLanguage;
  brief: SocialBrief;
  selectedIdeaIds?: string[];
};

@Injectable()
export class StartRunUseCase {
  constructor(
    private readonly completeness: GetCompletenessUseCase,
    @Inject(RUN_REPOSITORY) private readonly runs: RunRepository,
    private readonly worker: InProcessRunWorker,
  ) {}

  async execute(
    command: StartRunCommand,
  ): Promise<Pick<SocialRunRecord, 'id' | 'conversationId' | 'status'>> {
    const parsedCommand = parseWithZod(startRunCommandSchema, command);
    if (!isSocialTaskType(parsedCommand.taskType)) {
      throw new Error(
        `StartRunUseCase received non-social taskType: ${parsedCommand.taskType}`,
      );
    }
    const gate = await this.completeness.execute();
    if (!gate.complete) {
      throw new DomainException(
        'CONTEXT_INCOMPLETE',
        'Company context is incomplete',
        409,
        gate.missing.map((section) => ({ section })),
      );
    }

    const run = {
      id: newRunId(),
      conversationId: newConversationId(),
      taskType: parsedCommand.taskType,
      platform: parsedCommand.platform,
      contentKind: null,
      language: parsedCommand.language,
      pipelinePhase: null,
      ideasRefineCount: 0,
      contentRefineCount: 0,
      outlineRefineCount: 0,
      copyRefineCount: 0,
      status: 'queued',
      brief: parsedCommand.brief,
      selectedIdeaIds: parsedCommand.selectedIdeaIds ?? null,
      startedByUserId: null,
      recoveryAttempts: 0,
      createdAt: new Date(),
    } satisfies SocialRunRecord;
    await this.runs.create(run);
    this.worker.notifyQueued();
    const fresh = await this.runs.getById(run.id);
    return {
      id: run.id,
      conversationId: run.conversationId,
      status: fresh?.status ?? 'queued',
    };
  }
}
