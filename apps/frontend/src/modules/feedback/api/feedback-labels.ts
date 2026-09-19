import type { FeedbackAgentKey, FeedbackTargetType } from '@content-chain/shared';

export const FEEDBACK_TARGET_LABELS = {
  application: 'Aplikacja',
  agent: 'Agent',
  run: 'Run',
} as const satisfies Record<FeedbackTargetType, string>;

export const FEEDBACK_AGENT_LABELS = {
  IdeationAgent: 'Agent pomysłów',
  ContentWriterAgent: 'Agent treści SM',
  ConsistencyVerifier: 'Weryfikator spójności',
  PageWriterAgent: 'Agent copy strony',
} as const satisfies Record<FeedbackAgentKey, string>;
