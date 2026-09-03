import { unbrand } from '@content-chain/shared';
import { verifierOutputSchema } from '../../../application/content.schemas';
import { loadPrompt, renderPrompt } from '../../prompts/load-prompt';
import type { RunLifecyclePort } from '../../../../runs/domain/run-lifecycle.port';
import type { ContentGraphState } from '../state';
import type { LlmHopService } from '../../../../shared/llm/llm-hop';
import type { VerifierVerdict } from '../../../domain/content.types';

function verifierPayload(state: ContentGraphState): unknown {
  return state.phase === 'copy' ? state.document : state.outline;
}

export function createVerifierNode(
  hop: LlmHopService,
  appendLog: RunLifecyclePort['appendLog'],
) {
  const template = loadPrompt('verifier.prompt.md');
  return async (
    state: ContentGraphState,
  ): Promise<Partial<ContentGraphState>> => {
    const payload = verifierPayload(state);
    const { data, requestId } = await hop.chatJson({
      runId: state.runId,
      conversationId: state.conversationId,
      step: 'ConsistencyVerifier',
      schema: verifierOutputSchema,
      userContent: renderPrompt(template, {
        language: state.language,
        company: JSON.stringify(state.company),
        payload: JSON.stringify(payload),
      }),
    });
    const verdict: VerifierVerdict = {
      ok: data.ok,
      contextIssues: data.contextIssues,
      languageIssues: data.languageIssues,
    };

    if (!verdict.ok) {
      await appendLog({
        runId: state.runId,
        conversationId: state.conversationId,
        level: 'warn',
        message: `ConsistencyVerifier failed. Context issues: ${JSON.stringify(verdict.contextIssues)}. Language issues: ${JSON.stringify(verdict.languageIssues)}`,
        step: 'ConsistencyVerifier',
        requestId: unbrand(requestId),
      });
    }
    return { verdict };
  };
}
