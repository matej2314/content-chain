import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {
  createFeedbackId,
  isRunId,
  createRunId,
  type FeedbackAgentKey,
  type RunId,
} from '@content-chain/shared';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { parseWithZod } from '../../shared/parse-with-zod';
import {
  FEEDBACK_REPOSITORY,
  type FeedbackEntry,
  type FeedbackRepository,
} from '../domain/feedback.types';
import {
  FEEDBACK_RUN_READER,
  type FeedbackRunReader,
} from '../domain/feedback-run.reader.port';
import { createFeedbackSchema } from './feedback.schemas';
import type { AuthUserContext } from '../../shared/types/auth-user-context';

@Injectable()
export class CreateFeedbackUseCase {
  constructor(
    @Inject(FEEDBACK_REPOSITORY) private readonly feedback: FeedbackRepository,
    @Inject(FEEDBACK_RUN_READER) private readonly runReader: FeedbackRunReader,
  ) {}

  async execute(
    input: unknown,
    author: AuthUserContext,
  ): Promise<FeedbackEntry> {
    const command = parseWithZod(createFeedbackSchema, input);

    let runId: RunId | null = null;
    let agentKey: FeedbackAgentKey | null = null;

    if (command.targetType === 'run') {
      if (!isRunId(command.runId)) {
        throw new DomainException(
          'VALIDATION_FAILED',
          'Invalid runId format',
          400,
        );
      }
      runId = createRunId(command.runId);
      const lookup = await this.runReader.getStartedBy(runId);
      if (lookup.kind === 'missing') {
        throw new DomainException('RUN_NOT_FOUND', 'Run not found', 404);
      }
      if (lookup.startedBy === null || lookup.startedBy !== author.id) {
        throw new DomainException(
          'FORBIDDEN',
          'Cannot leave feedback on another user run',
          403,
        );
      }
      if (lookup.status !== 'completed' && lookup.status !== 'failed') {
        throw new DomainException(
          'RUN_NOT_REVIEWABLE',
          'Run is not in a reviewable state',
          409,
        );
      }
    }

    if (command.targetType === 'agent') {
      agentKey = command.agentKey;
    }

    const entry: FeedbackEntry = {
      id: createFeedbackId(`fbk_${uuidv4()}`),
      targetType: command.targetType,
      agentKey,
      runId,
      body: command.body,
      authorId: author.id,
      createdAt: new Date(),
    };
    await this.feedback.save(entry);
    return entry;
  }
}
