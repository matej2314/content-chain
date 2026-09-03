import type { ContentResultStore } from '../../../domain/content-result.port';
import type { ContentGraphState } from '../state';

export function createPersistOutlineNode(store: ContentResultStore) {
  return async (
    state: ContentGraphState,
  ): Promise<Partial<ContentGraphState>> => {
    if (state.outline == null) {
      throw new Error('Outline is required before persist.');
    }
    await store.replaceOutline(state.runId, state.outline);
    await store.savePipelineState(state.runId, {
      phase: state.phase,
      outlineRefineCount: state.outlineRefineCount,
      copyRefineCount: state.copyRefineCount,
    });
    return {};
  };
}
