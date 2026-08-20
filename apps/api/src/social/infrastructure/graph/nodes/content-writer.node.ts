import { contentOutputSchema } from '../../../application/social.schemas';
import { loadPrompt, renderPrompt } from '../../prompts/load-prompt';
import type { LlmHopService } from '../llm-hop';
import type { SocialGraphState } from '../state';
import type { SocialContent } from '../../../domain/social.types';

export function createContentWriterNode(hop: LlmHopService) {
  const template = loadPrompt('content-writer.prompt.md');
  return async (
    state: SocialGraphState,
  ): Promise<Partial<SocialGraphState>> => {
    const selectedIds = state.selectedIdeaIds;
    const ideas =
      selectedIds != null && selectedIds.length > 0
        ? state.ideas.filter((idea) => selectedIds.includes(idea.id))
        : state.ideas;

    const { data } = await hop.chatJson({
      runId: state.runId,
      conversationId: state.conversationId,
      step: 'ContentWriterAgent',
      schema: contentOutputSchema,
      userContent: renderPrompt(template, {
        language: state.language,
        platform: state.platform,
        company: JSON.stringify(state.company),
        brief: JSON.stringify(state.brief),
        ideas: JSON.stringify(ideas),
      }),
    });

    const content: SocialContent = {
      body: data.body,
      hashtags: data.hashtags,
      cta: data.cta,
    };
    return { content };
  };
}
