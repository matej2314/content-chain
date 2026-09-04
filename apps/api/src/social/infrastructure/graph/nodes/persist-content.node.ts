import { isReelTaskType } from '../../../domain/reel-task';
import type { SocialResultStore } from '../../../domain/social-result.port';
import type { SocialContent } from '../../../domain/social.types';
import type { SocialGraphState } from '../state';

export function createPersistContentNode(store: SocialResultStore) {
  return async (
    state: SocialGraphState,
  ): Promise<Partial<SocialGraphState>> => {
    if (isReelTaskType(state.taskType)) {
      if (state.reelScript == null || state.verdict == null) {
        throw new Error('Reel script and verdict are required before persist.');
      }
      await store.replaceReelScript(
        state.runId,
        state.reelScript,
        state.verdict,
      );
      return {};
    }
    if (state.content == null || state.verdict == null) {
      throw new Error('Content and verdict are required before persist.');
    }
    const content: SocialContent = {
      ...state.content,
      characterCount: state.content.body.length,
    };
    await store.replaceContent(state.runId, content, state.verdict);
    return {};
  };
}
