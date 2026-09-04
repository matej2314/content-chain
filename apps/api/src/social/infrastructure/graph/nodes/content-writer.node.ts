import {
  contentOutputSchema,
  reelScriptOutputSchema,
} from '../../../application/social.schemas';
import { isReelTaskType } from '../../../domain/reel-task';
import { loadPrompt, renderPrompt } from '../../prompts/load-prompt';
import type { LlmHopService } from '../../../../shared/llm/llm-hop';
import type { SocialGraphState } from '../state';
import type { ReelScript, SocialContent } from '../../../domain/social.types';

const EMPTY_REEL_IDEAS_INSTRUCTION =
  '[] — brak wybranych pomysłów; generuj scenariusz wyłącznie z brief.topic, brief.goal i kontekstu firmy';

export function createContentWriterNode(hop: LlmHopService) {
  const postTemplate = loadPrompt('content-writer.prompt.md');
  const reelTemplate = loadPrompt('reel-script.prompt.md');
  return async (
    state: SocialGraphState,
  ): Promise<Partial<SocialGraphState>> => {
    const selectedIds = state.selectedIdeaIds;

    if (isReelTaskType(state.taskType)) {
      const source = state.reelIdeas;
      const ideas =
        selectedIds != null && selectedIds.length > 0
          ? source.filter((idea) => selectedIds.includes(idea.id))
          : source;
      const { data } = await hop.chatJson({
        runId: state.runId,
        conversationId: state.conversationId,
        step: 'ContentWriterAgent',
        schema: reelScriptOutputSchema,
        userContent: renderPrompt(reelTemplate, {
          language: state.language,
          platform: state.platform,
          company: JSON.stringify(state.company),
          brief: JSON.stringify(state.brief),
          ideas:
            ideas.length > 0
              ? JSON.stringify(ideas)
              : EMPTY_REEL_IDEAS_INSTRUCTION,
        }),
      });
      const reelScript: ReelScript = {
        segments: data.segments,
        cta: data.cta,
        ...(data.notes !== undefined ? { notes: data.notes } : {}),
      };
      return { reelScript };
    }

    const ideas =
      selectedIds != null && selectedIds.length > 0
        ? state.ideas.filter((idea) => selectedIds.includes(idea.id))
        : state.ideas;

    const { data } = await hop.chatJson({
      runId: state.runId,
      conversationId: state.conversationId,
      step: 'ContentWriterAgent',
      schema: contentOutputSchema,
      userContent: renderPrompt(postTemplate, {
        language: state.language,
        platform: state.platform,
        company: JSON.stringify(state.company),
        brief: JSON.stringify(state.brief),
        ideas:
          ideas.length > 0
            ? JSON.stringify(ideas)
            : '[] - brak wybranych pomysłów; generuj post wyłącznie z brief.topic, brief.goal i kontekstu firmy',
      }),
    });

    const content: SocialContent = {
      body: data.body,
      hashtags: data.hashtags,
      ...(data.cta !== undefined ? { cta: data.cta } : {}),
      characterCount: data.body.length,
    };
    return { content };
  };
}
