import type { RunTaskType } from '@content-chain/shared';
import type {
  PageDocument,
  PageOutline,
  ReelScript,
  RunResult,
  SocialContent,
  SocialIdea,
  ReelIdea,
} from '@/modules/runs/api/runs-result.types';

const RESULT_KEYS_BY_TASK_TYPE: Record<RunTaskType, readonly (keyof RunResult)[]> = {
  post_ideas: ['ideas'],
  post_content: ['content'],
  post_ideas_then_content: ['ideas', 'contents'],
  reel_ideas: ['reelIdeas'],
  reel_script: ['reelScript'],
  reel_ideas_then_scripts: ['reelIdeas', 'reelScripts'],
  page_outline_then_copy: ['pageOutline', 'pageDocument'],
  page_copy: ['pageDocument'],
};

function omitEmptyCta<T extends { readonly cta?: string }>(item: T): T {
  const cta = item.cta?.trim();
  if (!cta) {
    const { cta: _dropped, ...rest } = item;
    return rest as T;
  }
  return { ...item, cta };
}

function contentPayload(content: SocialContent): Record<string, unknown> {
  const next: Record<string, unknown> = {
    body: content.body,
    hashtags: [...content.hashtags],
  };
  const cta = content.cta?.trim();
  if (cta) next.cta = cta;
  return next;
}

function scriptPayload(script: ReelScript): Record<string, unknown> {
  const next: Record<string, unknown> = {
    segments: script.segments.map((segment) => ({
      startSeconds: segment.startSeconds,
      endSeconds: segment.endSeconds,
      onScreen: segment.onScreen,
      voiceover: segment.voiceover,
    })),
    cta: script.cta,
  };
  const notes = script.notes?.trim();
  if (notes) next.notes = notes;
  return next;
}

function outlinePayload(outline: PageOutline): Record<string, unknown> {
  return {
    id: outline.id,
    title: outline.title,
    sections: outline.sections.map((section) => ({
      id: section.id,
      heading: section.heading,
      summary: section.summary,
      ...(section.role ? { role: section.role } : {}),
    })),
  };
}

function documentPayload(document: PageDocument): Record<string, unknown> {
  const next: Record<string, unknown> = {
    title: document.title,
    lead: document.lead,
    body: document.body,
  };
  const metaTitle = document.metaTitle?.trim();
  const metaDescription = document.metaDescription?.trim();
  if (metaTitle) next.metaTitle = metaTitle;
  if (metaDescription) next.metaDescription = metaDescription;
  return next;
}

function ideaPayload(idea: SocialIdea): Record<string, unknown> {
  const next = omitEmptyCta(idea);
  return {
    id: next.id,
    title: next.title,
    angle: next.angle,
    hook: next.hook,
    ...(next.cta ? { cta: next.cta } : {}),
  };
}

function reelIdeaPayload(idea: ReelIdea): Record<string, unknown> {
  const next = omitEmptyCta(idea);
  return {
    id: next.id,
    title: next.title,
    description: next.description,
    hook: next.hook,
    durationSeconds: next.durationSeconds,
    ...(next.cta ? { cta: next.cta } : {}),
  };
}

export function buildOutputEditedBody(
  taskType: RunTaskType,
  result: RunResult,
): { readonly result: Record<string, unknown> } {
  const payload: Record<string, unknown> = {};
  for (const key of RESULT_KEYS_BY_TASK_TYPE[taskType]) {
    if (key === 'ideas' && result.ideas.length > 0) {
      payload.ideas = result.ideas.map(ideaPayload);
    }
    if (key === 'content' && result.content !== null) {
      payload.content = contentPayload(result.content);
    }
    if (key === 'contents' && result.contents.length > 0) {
      payload.contents = result.contents.map((item) => ({
        ...contentPayload(item),
        sourceIdeaId: item.sourceIdeaId,
      }));
    }
    if (key === 'reelIdeas' && result.reelIdeas.length > 0) {
      payload.reelIdeas = result.reelIdeas.map(reelIdeaPayload);
    }
    if (key === 'reelScript' && result.reelScript !== null) {
      payload.reelScript = scriptPayload(result.reelScript);
    }
    if (key === 'reelScripts' && result.reelScripts.length > 0) {
      payload.reelScripts = result.reelScripts.map((item) => ({
        ...scriptPayload(item),
        sourceIdeaId: item.sourceIdeaId,
      }));
    }
    if (key === 'pageOutline' && result.pageOutline !== null) {
      payload.pageOutline = outlinePayload(result.pageOutline);
    }
    if (key === 'pageDocument' && result.pageDocument !== null) {
      payload.pageDocument = documentPayload(result.pageDocument);
    }
  }
  return { result: payload };
}

export function canEditResult(taskType: RunTaskType, result: RunResult): boolean {
  return Object.keys(buildOutputEditedBody(taskType, result).result).length > 0;
}
