import { Inject, Injectable } from '@nestjs/common';
import { GetCompletenessUseCase } from '../../company-context/application/get-completeness.use-case';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { newConversationId, newRunId } from '../../shared/http/new-ids';
import { RUN_REPOSITORY, type RunRepository } from '../domain/run.port';
import { InProcessRunWorker } from './in-process-run.worker';
import { parseWithZod } from './parse-with-zod';
import {
  startRunCommandSchema,
  type ParsedStartRunCommand,
} from './run.schemas';
import {
  isContentTaskType,
  type ContentKind,
  type ContentLanguage,
  type ContentTaskType,
  type RunTaskType,
  type SocialPlatform,
} from '@content-chain/shared';
import type {
  ContentRunRecord,
  RunRecord,
  SocialRunRecord,
} from '../domain/run.types';

export type StartRunBriefInput = {
  topic: string;
  audience?: string;
  goal?: string;
  ideaCount?: number;
  angle?: string;
  targetLength?: number;
};

export type StartRunCommand = {
  taskType: RunTaskType;
  platform?: SocialPlatform;
  contentKind?: ContentKind;
  language: ContentLanguage;
  brief: StartRunBriefInput;
  selectedIdeaIds?: string[];
};

function isContentStartCommand(
  command: ParsedStartRunCommand,
): command is Extract<ParsedStartRunCommand, { taskType: ContentTaskType }> {
  return isContentTaskType(command.taskType);
}

function isPlainRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** Nest DTO trzyma opcjonalne pola jako `undefined`; Zod `.strict()` odrzuca sam klucz. */
function omitUndefinedDeep(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(omitUndefinedDeep);
  }
  if (!isPlainRecord(value)) {
    return value;
  }
  const result: Record<string, unknown> = {};
  for (const [key, entry] of Object.entries(value)) {
    if (entry === undefined) continue;
    result[key] = omitUndefinedDeep(entry);
  }
  return result;
}

@Injectable()
export class StartRunUseCase {
  constructor(
    private readonly completeness: GetCompletenessUseCase,
    @Inject(RUN_REPOSITORY) private readonly runs: RunRepository,
    private readonly worker: InProcessRunWorker,
  ) {}

  async execute(
    command: StartRunCommand,
  ): Promise<Pick<RunRecord, 'id' | 'conversationId' | 'status'>> {
    const parsedCommand = parseWithZod(
      startRunCommandSchema,
      omitUndefinedDeep(command),
    );
    const gate = await this.completeness.execute();
    if (!gate.complete) {
      throw new DomainException(
        'CONTEXT_INCOMPLETE',
        'Company context is incomplete',
        409,
        gate.missing.map((section) => ({ section })),
      );
    }

    let run: RunRecord;
    if (isContentStartCommand(parsedCommand)) {
      run = {
        id: newRunId(),
        conversationId: newConversationId(),
        taskType: parsedCommand.taskType,
        platform: 'web',
        contentKind: parsedCommand.contentKind,
        language: parsedCommand.language,
        pipelinePhase: null,
        ideasRefineCount: 0,
        contentRefineCount: 0,
        outlineRefineCount: 0,
        copyRefineCount: 0,
        status: 'queued',
        brief: parsedCommand.brief,
        selectedIdeaIds: null,
        startedByUserId: null,
        recoveryAttempts: 0,
        createdAt: new Date(),
      } satisfies ContentRunRecord;
    } else {
      run = {
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
    }
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
