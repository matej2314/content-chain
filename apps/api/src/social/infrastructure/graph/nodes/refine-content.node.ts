import {
  contentOutputSchema,
  reelScriptOutputSchema,
} from '../../../application/social.schemas';
import { isReelTaskType } from '../../../domain/reel-task';
import { nextRefineCount } from '../../../domain/refine-policy';
import { loadPrompt, renderPrompt } from '../../prompts/load-prompt';
import type { LlmHopService } from '../../../../shared/llm/llm-hop';
import type { SocialGraphState } from '../state';
import type { ReelScript, SocialContent } from '../../../domain/social.types';

export function createRefineContentNode(hop: LlmHopService) {
  const postTemplate = loadPrompt('refine-content.prompt.md');
  const reelTemplate = loadPrompt('refine-reel-script.prompt.md');
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
        step: 'RefineContent',
        schema: reelScriptOutputSchema,
        userContent: renderPrompt(reelTemplate, {
          ...issueVars,
          content: JSON.stringify(state.reelScript),
        }),
      });
      const reelScript: ReelScript = {
        segments: data.segments,
        cta: data.cta,
        ...(data.notes !== undefined ? { notes: data.notes } : {}),
      };
      return {
        reelScript,
        contentRefineCount: nextRefineCount(state.contentRefineCount),
      };
    }

    const { data } = await hop.chatJson({
      runId: state.runId,
      conversationId: state.conversationId,
      step: 'RefineContent',
      schema: contentOutputSchema,
      userContent: renderPrompt(postTemplate, {
        ...issueVars,
        content: JSON.stringify(state.content),
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
