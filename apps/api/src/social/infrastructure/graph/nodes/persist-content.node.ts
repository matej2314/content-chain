import type { SocialResultStore } from '../../../domain/social-result.port';
import type { SocialGraphState } from '../state';

export function createPersistContentNode(store: SocialResultStore) {
  return async (
    state: SocialGraphState,
  ): Promise<Partial<SocialGraphState>> => {
    if (state.content == null || state.verdict == null) {
      throw new Error('Content and verdict are required before persist.');
    }
    await store.replaceContent(state.runId, state.content, state.verdict);
    return {};
  };
}
