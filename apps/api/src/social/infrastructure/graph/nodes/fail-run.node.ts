import type { SocialGraphState } from '../state';

export function createFailRunNode() {
  return async (
    state: SocialGraphState,
  ): Promise<Partial<SocialGraphState>> => {
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

    return {
      failedCode: 'VERIFIER_FAILED',
      failedMessage:
        parts.length > 0 ? parts.join(' | ') : 'ConsistencyVerifier failed',
    };
  };
}
