import { v4 as uuidv4 } from 'uuid';
import {
  ideasOutputSchema,
  reelIdeasOutputSchema,
} from '../../../application/social.schemas';
import { isReelTaskType } from '../../../domain/reel-task';
import { loadPrompt, renderPrompt } from '../../prompts/load-prompt';
import type { LlmHopService } from '../../../../shared/llm/llm-hop';
import type { SocialGraphState } from '../state';
import type { ReelIdea, SocialIdea } from '../../../domain/social.types';

export function createIdeationNode(hop: LlmHopService) {
  const postTemplate = loadPrompt('ideation.prompt.md');
  const reelTemplate = loadPrompt('reel-ideas.prompt.md');
  return async (
    state: SocialGraphState,
  ): Promise<Partial<SocialGraphState>> => {
    const vars = {
      language: state.language,
      platform: state.platform,
      company: JSON.stringify(state.company),
      brief: JSON.stringify(state.brief),
      ideaCount: String(state.brief.ideaCount ?? 5),
    };

    if (isReelTaskType(state.taskType)) {
      const { data } = await hop.chatJson({
        runId: state.runId,
        conversationId: state.conversationId,
        step: 'IdeationAgent',
        schema: reelIdeasOutputSchema,
        userContent: renderPrompt(reelTemplate, vars),
      });
      const reelIdeas: ReelIdea[] = data.ideas.map((idea) => ({
        id: idea.id ?? `idea_${uuidv4()}`,
        title: idea.title,
        description: idea.description,
        hook: idea.hook,
        durationSeconds: idea.durationSeconds,
        ...(idea.cta !== undefined ? { cta: idea.cta } : {}),
      }));
      return { reelIdeas };
    }

    const { data } = await hop.chatJson({
      runId: state.runId,
      conversationId: state.conversationId,
      step: 'IdeationAgent',
      schema: ideasOutputSchema,
      userContent: renderPrompt(postTemplate, vars),
    });
    const ideas: SocialIdea[] = data.ideas.map((idea) => ({
      id: idea.id ?? `idea_${uuidv4()}`,
      title: idea.title,
      angle: idea.angle,
      hook: idea.hook,
      ...(idea.cta !== undefined ? { cta: idea.cta } : {}),
    }));
    return { ideas };
  };
}
