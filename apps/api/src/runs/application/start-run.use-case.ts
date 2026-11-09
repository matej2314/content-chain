import { Inject, Injectable } from '@nestjs/common';
import {
  isContentTaskType,
  type ContentKind,
  type ContentLanguage,
  type ContentTaskType,
  type RunTaskType,
  type SocialPlatform,
} from '@content-chain/shared';
import { GetCompletenessUseCase } from '../../company-context/application/get-completeness.use-case';
import { ENV, type Env } from '../../shared/config/env';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { newConversationId, newRunId } from '../../shared/http/new-ids';
import { parseWithZod } from '../../shared/parse-with-zod';
import type { AuthUserContext } from '../../shared/types/auth-user-context';
import { RUN_REPOSITORY, type RunRepository } from '../domain/run.port';
import type {
  ContentRunRecord,
  RunRecord,
  SocialRunRecord,
} from '../domain/run.types';
import { GuestRunPolicyService } from './guest/guest-run-policy.service';
import { InProcessRunWorker } from './lifecycle/in-process-run.worker';
import {
  startRunCommandSchema,
  type ParsedStartRunCommand,
} from './run.schemas';

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
    private readonly guestPolicy: GuestRunPolicyService,
    @Inject(ENV) private readonly env: Env,
  ) {}

  async execute(
    command: StartRunCommand,
    actor: AuthUserContext | null = null,
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

    const guestAdmit =
      actor === null
        ? null
        : await this.guestPolicy.admitStart(actor, parsedCommand.taskType);

    if (actor !== null) {
      const inFlight = await this.runs.countInFlightByUser(actor.id);
      if (inFlight >= this.env.MAX_USER_IN_FLIGHT_RUNS) {
        if (guestAdmit !== null) {
          await guestAdmit.release();
        }
        throw new DomainException(
          'USER_IN_FLIGHT_LIMIT_EXCEEDED',
          'User in-flight run limit exceeded',
          409,
        );
      }
    }

    const startedByUserId = actor?.id ?? null;

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
        startedByUserId,
        recoveryAttempts: 0,
        cancelRequested: false,
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
        startedByUserId,
        recoveryAttempts: 0,
        cancelRequested: false,
        createdAt: new Date(),
      } satisfies SocialRunRecord;
    }
    try {
      await this.runs.create(run);
    } catch (error) {
      if (guestAdmit !== null) {
        await guestAdmit.release();
      }
      throw error;
    }
    this.worker.notifyQueued();
    const fresh = await this.runs.getById(run.id);
    return {
      id: run.id,
      conversationId: run.conversationId,
      status: fresh?.status ?? 'queued',
    };
  }
}
