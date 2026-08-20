import { v4 as uuidv4 } from 'uuid';
import { ideasOutputSchema } from '../../../application/social.schemas';
import { loadPrompt, renderPrompt } from '../../prompts/load-prompt';
import type { LlmHopService } from '../llm-hop';
import type { SocialGraphState } from '../state';
import type { SocialIdea } from '../../../domain/social.types';

export function createIdeationNode(hop: LlmHopService) {
  const template = loadPrompt('ideation.prompt.md');
  return async (
    state: SocialGraphState,
  ): Promise<Partial<SocialGraphState>> => {
    const { data } = await hop.chatJson({
      runId: state.runId,
      conversationId: state.conversationId,
      step: 'IdeationAgent',
      schema: ideasOutputSchema,
      userContent: renderPrompt(template, {
        language: state.language,
        platform: state.platform,
        company: JSON.stringify(state.company),
        brief: JSON.stringify(state.brief),
        ideaCount: String(state.brief.ideaCount ?? 5),
      }),
    });
    const ideas: SocialIdea[] = data.ideas.map((idea) => ({
      id: idea.id ?? `idea_${uuidv4()}`,
      title: idea.title,
      angle: idea.angle,
      hook: idea.hook,
    }));
    return { ideas };
  };
}
