import type { ContentResultStore } from '../../../domain/content-result.port';
import type { ContentGraphState } from '../state';

export function createPersistDocumentNode(store: ContentResultStore) {
  return async (
    state: ContentGraphState,
  ): Promise<Partial<ContentGraphState>> => {
    if (state.document == null || state.verdict == null) {
      throw new Error('Document and verdict are required before persist.');
    }
    await store.replaceDocument(state.runId, state.document, state.verdict);
    await store.savePipelineState(state.runId, {
      phase: state.phase,
      outlineRefineCount: state.outlineRefineCount,
      copyRefineCount: state.copyRefineCount,
    });
    return {};
  };
}
