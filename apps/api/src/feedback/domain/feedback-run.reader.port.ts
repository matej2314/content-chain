import type { RunId, UserId } from '@content-chain/shared';

export const FEEDBACK_RUN_READER = Symbol('FEEDBACK_RUN_READER');

export type FeedbackRunLookup =
  { kind: 'missing' } | { kind: 'found'; startedBy: UserId | null };

export interface FeedbackRunReader {
  getStartedBy(runId: RunId): Promise<FeedbackRunLookup>;
}
