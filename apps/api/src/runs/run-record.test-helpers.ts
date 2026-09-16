import { newConversationId, newRunId } from '../shared/http/new-ids';
import type { RunStartedBy } from './domain/run.port';
import type { ContentRunRecord, SocialRunRecord } from './domain/run.types';

export type SocialRunSnapshot = SocialRunRecord & {
  startedBy: RunStartedBy | null;
  userRating: number | null;
  outputEdited: boolean;
  reviewFinalizedAt: Date | null;
};

export function makeSocialRun(
  overrides: Partial<SocialRunRecord> = {},
): SocialRunRecord {
  return {
    id: newRunId(),
    conversationId: newConversationId(),
    taskType: 'post_ideas',
    platform: 'linkedin',
    language: 'pl',
    status: 'running',
    brief: { topic: 'Q3' },
    selectedIdeaIds: null,
    startedByUserId: null,
    contentKind: null,
    pipelinePhase: null,
    ideasRefineCount: 0,
    contentRefineCount: 0,
    outlineRefineCount: 0,
    copyRefineCount: 0,
    recoveryAttempts: 0,
    createdAt: new Date(),
    ...overrides,
  };
}

export function makeContentRun(
  overrides: Partial<ContentRunRecord> = {},
): ContentRunRecord {
  return {
    id: newRunId(),
    conversationId: newConversationId(),
    taskType: 'page_copy',
    platform: 'web',
    language: 'pl',
    status: 'running',
    brief: { topic: 'Audyt procesów' },
    selectedIdeaIds: null,
    startedByUserId: null,
    contentKind: 'blog',
    pipelinePhase: null,
    ideasRefineCount: 0,
    contentRefineCount: 0,
    outlineRefineCount: 0,
    copyRefineCount: 0,
    recoveryAttempts: 0,
    createdAt: new Date(),
    ...overrides,
  };
}

export function makeSocialSnapshot(
  overrides: Partial<SocialRunSnapshot> = {},
): SocialRunSnapshot {
  return {
    ...makeSocialRun(),
    startedBy: null,
    userRating: null,
    outputEdited: false,
    reviewFinalizedAt: null,
    ...overrides,
  };
}
