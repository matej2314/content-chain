import {
  contentOutputSchema,
  reelScriptOutputSchema,
} from '../../../application/social.schemas';
import { isReelTaskType } from '../../../domain/reel-task';
import {
  isTwoStageSocialTask,
  type ReelIdea,
  type ReelScript,
  type SocialContent,
  type SocialIdea,
} from '../../../domain/social.types';
import { loadPrompt, renderPrompt } from '../../prompts/load-prompt';
import type { LlmHopService } from '../../../../shared/llm/llm-hop';
import type { SocialGraphState } from '../state';

const EMPTY_REEL_IDEAS_INSTRUCTION =
  '[] — brak wybranych pomysłów; generuj scenariusz wyłącznie z brief.topic, brief.goal i kontekstu firmy';

const EMPTY_POST_IDEAS_INSTRUCTION =
  '[] - brak wybranych pomysłów; generuj post wyłącznie z brief.topic, brief.goal i kontekstu firmy';

function requireSingleSelectedId(state: SocialGraphState): string {
  const ids = state.selectedIdeaIds;
  if (ids == null || ids.length !== 1) {
    throw new Error(
      'Two-stage content hop requires selectedIdeaIds of length 1',
    );
  }
  const ideaId = ids[0];
  if (ideaId === undefined || ideaId.length === 0) {
    throw new Error(
      'Two-stage content hop requires selectedIdeaIds of length 1',
    );
  }
  return ideaId;
}

function selectedPostIdea(state: SocialGraphState): SocialIdea {
  const ideaId = requireSingleSelectedId(state);
  const idea = state.ideas.find((item) => item.id === ideaId);
  if (idea === undefined) {
    throw new Error(`Selected idea ${ideaId} not found in draft`);
  }
  return idea;
}

function selectedReelIdea(state: SocialGraphState): ReelIdea {
  const ideaId = requireSingleSelectedId(state);
  const idea = state.reelIdeas.find((item) => item.id === ideaId);
  if (idea === undefined) {
    throw new Error(`Selected reel idea ${ideaId} not found in draft`);
  }
  return idea;
}

function filterBySelection<T extends { id: string }>(
  source: T[],
  selectedIds: string[] | null,
): T[] {
  if (selectedIds != null && selectedIds.length > 0) {
    return source.filter((item) => selectedIds.includes(item.id));
  }
  return source;
}

export function createContentWriterNode(hop: LlmHopService) {
  const postTemplate = loadPrompt('content-writer.prompt.md');
  const reelTemplate = loadPrompt('reel-script.prompt.md');
  return async (
    state: SocialGraphState,
  ): Promise<Partial<SocialGraphState>> => {
    const twoStage = isTwoStageSocialTask(state.taskType);

    if (isReelTaskType(state.taskType)) {
      const idea = twoStage ? selectedReelIdea(state) : null;
      const ideas = twoStage
        ? null
        : filterBySelection(state.reelIdeas, state.selectedIdeaIds);
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
            idea != null
              ? JSON.stringify(idea)
              : ideas != null && ideas.length > 0
                ? JSON.stringify(ideas)
                : EMPTY_REEL_IDEAS_INSTRUCTION,
        }),
      });
      const reelScript: ReelScript = {
        segments: data.segments,
        cta: data.cta,
        ...(data.notes !== undefined ? { notes: data.notes } : {}),
        ...(idea != null ? { sourceIdeaId: idea.id } : {}),
      };
      return { reelScript };
    }

    const idea = twoStage ? selectedPostIdea(state) : null;
    const ideas = twoStage
      ? null
      : filterBySelection(state.ideas, state.selectedIdeaIds);

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
          idea != null
            ? JSON.stringify(idea)
            : ideas != null && ideas.length > 0
              ? JSON.stringify(ideas)
              : EMPTY_POST_IDEAS_INSTRUCTION,
      }),
    });

    const content: SocialContent = {
      body: data.body,
      hashtags: data.hashtags,
      ...(data.cta !== undefined ? { cta: data.cta } : {}),
      characterCount: data.body.length,
      ...(idea != null ? { sourceIdeaId: idea.id } : {}),
    };
    return { content };
  };
}
