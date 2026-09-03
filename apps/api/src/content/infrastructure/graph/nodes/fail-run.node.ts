import type { ContentResultStore } from '../../../domain/content-result.port';
import type { ContentGraphState } from '../state';

export function createFailRunNode(store: ContentResultStore) {
  return async (
    state: ContentGraphState,
  ): Promise<Partial<ContentGraphState>> => {
    const contextIssues = state.verdict?.contextIssues ?? [];
    const languageIssues = state.verdict?.languageIssues ?? [];
    const parts = [
      contextIssues.length > 0
        ? `contextIssues: ${contextIssues.join('; ')}`
        : null,
      languageIssues.length > 0
        ? `languageIssues: ${languageIssues.join('; ')}`
        : null,
    ].filter((part): part is string => part != null);

    await store.savePipelineState(state.runId, {
      phase: state.phase,
      outlineRefineCount: state.outlineRefineCount,
      copyRefineCount: state.copyRefineCount,
    });

    return {
      failedCode: 'VERIFIER_FAILED',
      failedMessage:
        parts.length > 0 ? parts.join(' | ') : 'ConsistencyVerifier failed',
    };
  };
}
