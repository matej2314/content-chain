import {
  createFeedbackId,
  createRunId,
  createUserId,
  isFeedbackAgentKey,
  isFeedbackId,
  isFeedbackTargetType,
  isRunId,
  isUserId,
  type FeedbackAgentKey,
  type FeedbackId,
  type FeedbackTargetType,
  type RunId,
  type UserId,
} from '@content-chain/shared';
import { isRecord } from '@/shared/api/envelope';

export const FEEDBACK_BODY_MAX = 4000;

export type CreateFeedbackInput =
  | { readonly targetType: 'application'; readonly body: string }
  | {
      readonly targetType: 'agent';
      readonly agentKey: FeedbackAgentKey;
      readonly body: string;
    }
  | { readonly targetType: 'run'; readonly runId: RunId; readonly body: string };

export type FeedbackCreated = {
  readonly id: FeedbackId;
  readonly targetType: FeedbackTargetType;
  readonly agentKey: FeedbackAgentKey | null;
  readonly runId: RunId | null;
  readonly body: string;
  readonly authorId: UserId;
  readonly createdAt: string;
};

export function feedbackRequestBody(input: CreateFeedbackInput): Record<string, unknown> {
  if (input.targetType === 'application') {
    return { targetType: 'application', body: input.body };
  }
  if (input.targetType === 'agent') {
    return { targetType: 'agent', agentKey: input.agentKey, body: input.body };
  }
  return { targetType: 'run', runId: input.runId, body: input.body };
}

export function parseFeedbackCreated(value: unknown): FeedbackCreated {
  if (
    !isRecord(value) ||
    typeof value.id !== 'string' ||
    !isFeedbackId(value.id) ||
    typeof value.targetType !== 'string' ||
    !isFeedbackTargetType(value.targetType) ||
    typeof value.body !== 'string' ||
    typeof value.authorId !== 'string' ||
    !isUserId(value.authorId) ||
    typeof value.createdAt !== 'string'
  ) {
    throw new Error('Invalid feedback payload');
  }
  const agentKey =
    value.agentKey === null || value.agentKey === undefined
      ? null
      : typeof value.agentKey === 'string' && isFeedbackAgentKey(value.agentKey)
        ? value.agentKey
        : (() => {
            throw new Error('Invalid agentKey');
          })();
  const runId =
    value.runId === null || value.runId === undefined
      ? null
      : typeof value.runId === 'string' && isRunId(value.runId)
        ? createRunId(value.runId)
        : (() => {
            throw new Error('Invalid runId');
          })();
  return {
    id: createFeedbackId(value.id),
    targetType: value.targetType,
    agentKey,
    runId,
    body: value.body,
    authorId: createUserId(value.authorId),
    createdAt: value.createdAt,
  };
}
