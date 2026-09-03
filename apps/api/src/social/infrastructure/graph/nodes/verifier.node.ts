import { unbrand } from '@content-chain/shared';
import { coercePassNoteVerdict } from '../../../application/coerce-pass-note-verdict';
import { verifierOutputSchema } from '../../../application/social.schemas';
import { isReelTaskType } from '../../../domain/reel-task';
import { loadPrompt, renderPrompt } from '../../prompts/load-prompt';
import type { RunLifecyclePort } from '../../../../runs/domain/run-lifecycle.port';
import type { SocialGraphState } from '../state';
import type { LlmHopService } from '../../../../shared/llm/llm-hop';
import type { VerifierVerdict } from '../../../domain/social.types';

function verifierPayload(state: SocialGraphState): unknown {
  if (isReelTaskType(state.taskType)) {
    return state.phase === 'content' ? state.reelScript : state.reelIdeas;
  }
  return state.phase === 'content' ? state.content : state.ideas;
}

export function createVerifierNode(
  hop: LlmHopService,
  appendLog: RunLifecyclePort['appendLog'],
) {
  const template = loadPrompt('verifier.prompt.md');
  return async (
    state: SocialGraphState,
  ): Promise<Partial<SocialGraphState>> => {
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
    const parsed: VerifierVerdict = {
      ok: data.ok,
      contextIssues: data.contextIssues,
      languageIssues: data.languageIssues,
    };
    const { verdict, coerced } = coercePassNoteVerdict(parsed);

    if (coerced) {
      await appendLog({
        runId: state.runId,
        conversationId: state.conversationId,
        level: 'warn',
        message: `ConsistencyVerifier returned ok:false with pass-only issue notes; treating as ok. Context issues: ${JSON.stringify(parsed.contextIssues)}. Language issues: ${JSON.stringify(parsed.languageIssues)}`,
        step: 'ConsistencyVerifier',
        requestId: unbrand(requestId),
      });
    } else if (!verdict.ok) {
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
