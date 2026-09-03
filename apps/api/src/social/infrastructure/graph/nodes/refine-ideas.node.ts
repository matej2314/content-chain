import { v4 as uuidv4 } from 'uuid';
import {
  ideasOutputSchema,
  reelIdeasOutputSchema,
} from '../../../application/social.schemas';
import { isReelTaskType } from '../../../domain/reel-task';
import { nextRefineCount } from '../../../domain/refine-policy';
import { loadPrompt, renderPrompt } from '../../prompts/load-prompt';
import type { LlmHopService } from '../../../../shared/llm/llm-hop';
import type { SocialGraphState } from '../state';
import type { ReelIdea, SocialIdea } from '../../../domain/social.types';

export function createRefineIdeasNode(hop: LlmHopService) {
  const postTemplate = loadPrompt('refine-ideas.prompt.md');
  const reelTemplate = loadPrompt('refine-reel-ideas.prompt.md');
  return async (
    state: SocialGraphState,
  ): Promise<Partial<SocialGraphState>> => {
    const issueVars = {
      language: state.language,
      company: JSON.stringify(state.company),
      contextIssues: JSON.stringify(state.verdict?.contextIssues ?? []),
      languageIssues: JSON.stringify(state.verdict?.languageIssues ?? []),
    };

    if (isReelTaskType(state.taskType)) {
      const { data } = await hop.chatJson({
        runId: state.runId,
        conversationId: state.conversationId,
        step: 'RefineIdeas',
        schema: reelIdeasOutputSchema,
        userContent: renderPrompt(reelTemplate, {
          ...issueVars,
          ideas: JSON.stringify(state.reelIdeas),
        }),
      });
      const reelIdeas: ReelIdea[] = data.ideas.map((idea, index) => ({
        id: idea.id ?? state.reelIdeas[index]?.id ?? `idea_${uuidv4()}`,
        title: idea.title,
        description: idea.description,
        hook: idea.hook,
        durationSeconds: idea.durationSeconds,
      }));
      return {
        reelIdeas,
        ideasRefineCount: nextRefineCount(state.ideasRefineCount),
      };
    }

    const { data } = await hop.chatJson({
      runId: state.runId,
      conversationId: state.conversationId,
      step: 'RefineIdeas',
      schema: ideasOutputSchema,
      userContent: renderPrompt(postTemplate, {
        ...issueVars,
        ideas: JSON.stringify(state.ideas),
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
