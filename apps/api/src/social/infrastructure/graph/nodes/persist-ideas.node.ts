import { isReelTaskType } from '../../../domain/reel-task';
import type { SocialResultStore } from '../../../domain/social-result.port';
import type { SocialGraphState } from '../state';

export function createPersistIdeasNode(store: SocialResultStore) {
  return async (
    state: SocialGraphState,
  ): Promise<Partial<SocialGraphState>> => {
    if (isReelTaskType(state.taskType)) {
      await store.replaceReelIdeas(state.runId, state.reelIdeas);
      return {};
    }
    await store.replaceIdeas(state.runId, state.ideas);
    return {};
  };
}
