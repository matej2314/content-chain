import { isReelTaskType } from '../../../domain/reel-task';
import type { SocialResultStore } from '../../../domain/social-result.port';
import {
  isTwoStageSocialTask,
  type ReelScript,
  type SocialContent,
} from '../../../domain/social.types';
import type { SocialGraphState } from '../state';

function sourceIdeaIdFromState(state: SocialGraphState): string | undefined {
  const ideaId = state.selectedIdeaIds?.[0];
  if (ideaId === undefined || ideaId.length === 0) {
    return undefined;
  }
  return ideaId;
}

export function createPersistContentNode(store: SocialResultStore) {
  return async (
    state: SocialGraphState,
  ): Promise<Partial<SocialGraphState>> => {
    const twoStage = isTwoStageSocialTask(state.taskType);
    const sourceIdeaId = twoStage ? sourceIdeaIdFromState(state) : undefined;

    if (isReelTaskType(state.taskType)) {
      if (state.reelScript == null || state.verdict == null) {
        throw new Error('Reel script and verdict are required before persist.');
      }
      const reelScript: ReelScript = {
        ...state.reelScript,
        ...(sourceIdeaId !== undefined ? { sourceIdeaId } : {}),
      };
      if (twoStage) {
        await store.appendReelScript(state.runId, reelScript, state.verdict);
      } else {
        await store.replaceReelScript(state.runId, reelScript, state.verdict);
      }
      return {};
    }
    if (state.content == null || state.verdict == null) {
      throw new Error('Content and verdict are required before persist.');
    }
    const content: SocialContent = {
      ...state.content,
      characterCount: state.content.body.length,
      ...(sourceIdeaId !== undefined ? { sourceIdeaId } : {}),
    };
    if (twoStage) {
      await store.appendContent(state.runId, content, state.verdict);
    } else {
      await store.replaceContent(state.runId, content, state.verdict);
    }
    return {};
  };
}
