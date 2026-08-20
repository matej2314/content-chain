import { v4 as uuidv4 } from 'uuid';
import { ideasOutputSchema } from '../../../application/social.schemas';
import { nextRefineCount } from '../../../domain/refine-policy';
import { loadPrompt, renderPrompt } from '../../prompts/load-prompt';
import type { LlmHopService } from '../llm-hop';
import type { SocialGraphState } from '../state';
import type { SocialIdea } from '../../../domain/social.types';

export function createRefineIdeasNode(hop: LlmHopService) {
  const template = loadPrompt('refine-ideas.prompt.md');
  return async (
    state: SocialGraphState,
  ): Promise<Partial<SocialGraphState>> => {
    const { data } = await hop.chatJson({
      runId: state.runId,
      conversationId: state.conversationId,
      step: 'RefineIdeas',
      schema: ideasOutputSchema,
      userContent: renderPrompt(template, {
        language: state.language,
        company: JSON.stringify(state.company),
        ideas: JSON.stringify(state.ideas),
        contextIssues: JSON.stringify(state.verdict?.contextIssues ?? []),
        languageIssues: JSON.stringify(state.verdict?.languageIssues ?? []),
      }),
    });

    const ideas: SocialIdea[] = data.ideas.map((idea, index) => ({
      id: idea.id ?? state.ideas[index]?.id ?? `idea_${uuidv4()}`,
      title: idea.title,
      angle: idea.angle,
      hook: idea.hook,
    }));

    return {
      ideas,
      ideasRefineCount: nextRefineCount(state.ideasRefineCount),
    };
  };
}
