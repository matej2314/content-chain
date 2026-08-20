import { unbrand } from '@content-chain/shared';
import { verifierOutputSchema } from '../../../application/social.schemas';
import { loadPrompt, renderPrompt } from '../../prompts/load-prompt';
import type { RunLifecycleService } from '../../../../runs/application/run-lifecycle.service';
import type { SocialGraphState } from '../state';
import type { LlmHopService } from '../llm-hop';
import type { VerifierVerdict } from '../../../domain/social.types';

export function createVerifierNode(
  hop: LlmHopService,
  lifeCycle: RunLifecycleService,
) {
  const template = loadPrompt('verifier.prompt.md');
  return async (
    state: SocialGraphState,
  ): Promise<Partial<SocialGraphState>> => {
    const payload = state.phase === 'content' ? state.content : state.ideas;
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
      await lifeCycle.appendLog({
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
