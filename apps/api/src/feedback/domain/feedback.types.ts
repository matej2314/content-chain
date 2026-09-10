import type {
  FeedbackAgentKey,
  FeedbackId,
  FeedbackTargetType,
  RunId,
  UserId,
} from '@content-chain/shared';

export type FeedbackEntry = {
  id: FeedbackId;
  targetType: FeedbackTargetType;
  agentKey: FeedbackAgentKey | null;
  runId: RunId | null;
  body: string;
  authorId: UserId;
  createdAt: Date;
};

export const FEEDBACK_BODY_MAX = 4000;

export const FEEDBACK_REPOSITORY = Symbol('FEEDBACK_REPOSITORY');

export interface FeedbackRepository {
  save(entry: FeedbackEntry): Promise<void>;
}
