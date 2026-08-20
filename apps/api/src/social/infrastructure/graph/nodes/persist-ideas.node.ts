import type { SocialResultStore } from '../../../domain/social-result.port';
import type { SocialGraphState } from '../state';

export function createPersistIdeasNode(store: SocialResultStore) {
  return async (
    state: SocialGraphState,
  ): Promise<Partial<SocialGraphState>> => {
    await store.replaceIdeas(state.runId, state.ideas);
    return {};
  };
}
