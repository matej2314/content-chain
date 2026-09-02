import { newConversationId, newRunId } from '../shared/http/new-ids';
import type { ContentRunRecord, SocialRunRecord } from './domain/run.types';

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
