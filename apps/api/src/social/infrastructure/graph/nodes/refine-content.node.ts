import { contentOutputSchema } from '../../../application/social.schemas';
import { nextRefineCount } from '../../../domain/refine-policy';
import { loadPrompt, renderPrompt } from '../../prompts/load-prompt';
import type { LlmHopService } from '../llm-hop';
import type { SocialGraphState } from '../state';
import type { SocialContent } from '../../../domain/social.types';

export function createRefineContentNode(hop: LlmHopService) {
  const template = loadPrompt('refine-content.prompt.md');
  return async (
    state: SocialGraphState,
  ): Promise<Partial<SocialGraphState>> => {
    const { data } = await hop.chatJson({
      runId: state.runId,
      conversationId: state.conversationId,
      step: 'RefineContent',
      schema: contentOutputSchema,
      userContent: renderPrompt(template, {
        language: state.language,
        company: JSON.stringify(state.company),
        content: JSON.stringify(state.content),
        contextIssues: JSON.stringify(state.verdict?.contextIssues ?? []),
        languageIssues: JSON.stringify(state.verdict?.languageIssues ?? []),
      }),
    });
    const content: SocialContent = {
      body: data.body,
      hashtags: data.hashtags,
      cta: data.cta,
    };

    return {
      content,
      contentRefineCount: nextRefineCount(state.contentRefineCount),
    };
  };
}
