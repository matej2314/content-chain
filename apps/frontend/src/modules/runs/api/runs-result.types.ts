import { type RunId, createRunId, isRunId, type RunTaskType } from '@content-chain/shared';
import { isRecord } from '@/shared/api/envelope';

export const PAGE_OUTLINE_SECTION_ROLES = [
  'audience_world',
  'pain',
  'challenger',
  'insight',
  'proof',
  'objection',
  'cta',
  'other',
] as const;

export type PageOutlineSectionRole = (typeof PAGE_OUTLINE_SECTION_ROLES)[number];

export type UserRating = 1 | 2 | 3 | 4 | 5;

export type SocialIdea = {
  readonly id: string;
  readonly title: string;
  readonly angle: string;
  readonly hook: string;
  readonly cta?: string;
};

export type SocialContent = {
  readonly body: string;
  readonly hashtags: readonly string[];
  readonly characterCount: number;
  readonly cta?: string;
};

export type SocialContentItem = SocialContent & {
  readonly sourceIdeaId: string;
};

export type ReelDurationSeconds = 15 | 30 | 90;

export type ReelIdea = {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly hook: string;
  readonly durationSeconds: ReelDurationSeconds;
  readonly cta?: string;
};

export type ReelScriptSegment = {
  readonly startSeconds: number;
  readonly endSeconds: number;
  readonly onScreen: string;
  readonly voiceover: string;
};

export type ReelScript = {
  readonly segments: readonly ReelScriptSegment[];
  readonly cta: string;
  readonly notes?: string;
};

export type ReelScriptItem = ReelScript & {
  readonly sourceIdeaId: string;
};

export type PageOutlineSection = {
  readonly id: string;
  readonly heading: string;
  readonly summary: string;
  readonly role?: PageOutlineSectionRole;
};

export type PageOutline = {
  readonly id: string;
  readonly title: string;
  readonly sections: readonly PageOutlineSection[];
};

export type PageDocument = {
  readonly title: string;
  readonly lead: string;
  readonly body: string;
  readonly metaTitle?: string;
  readonly metaDescription?: string;
};

export type RunResult = {
  readonly ideas: readonly SocialIdea[];
  readonly content: SocialContent | null;
  readonly contents: readonly SocialContentItem[];
  readonly reelIdeas: readonly ReelIdea[];
  readonly reelScript: ReelScript | null;
  readonly reelScripts: readonly ReelScriptItem[];
  readonly pageOutline: PageOutline | null;
  readonly pageDocument: PageDocument | null;
};

export type RunHitl =
  | { readonly kind: 'post_ideas'; readonly options: readonly SocialIdea[] }
  | { readonly kind: 'reel_ideas'; readonly options: readonly ReelIdea[] }
  | { readonly kind: 'page_outline'; readonly options: readonly PageOutline[] };

export type RunReviewFields = {
  readonly userRating: UserRating | null;
  readonly outputEdited: boolean;
  readonly reviewFinalizedAt: string | null;
};

export type HitlAccepted = {
  readonly runId: RunId;
  readonly status: 'running';
};

function parseOptionalCta(value: unknown): string | undefined {
  if (value === undefined) return undefined;
  if (value === '') return undefined;
  if (typeof value !== 'string') {
    throw new Error('Invalid cta');
  }
  return value;
}

function parseStringId(value: unknown, label: string): string {
  if (typeof value !== 'string' || value.length === 0) {
    throw new Error(`Invalid ${label}`);
  }
  return value;
}

function parseHashtags(value: unknown): readonly string[] {
  if (!Array.isArray(value)) throw new Error('Invalid hashtags');
  return value.map((item) => {
    if (typeof item !== 'string') throw new Error('Invalid hashtag');
    return item;
  });
}

function isPageOutlineSectionRole(value: string): value is PageOutlineSectionRole {
  return (PAGE_OUTLINE_SECTION_ROLES as readonly string[]).includes(value);
}

function isReelDuration(value: number): value is ReelDurationSeconds {
  return value === 15 || value === 30 || value === 90;
}

function parseCharacterCount(body: string, raw: unknown): number {
  if (raw === undefined) return body.length;
  if (typeof raw !== 'number' || !Number.isInteger(raw) || raw < 0) {
    throw new Error('Invalid characterCount');
  }
  return raw;
}

export function parseSocialIdea(value: unknown): SocialIdea {
  if (
    !isRecord(value) ||
    typeof value.title !== 'string' ||
    typeof value.angle !== 'string' ||
    typeof value.hook !== 'string'
  ) {
    throw new Error('Invalid SocialIdea');
  }
  const idea: SocialIdea = {
    id: parseStringId(value.id, 'idea.id'),
    title: value.title,
    angle: value.angle,
    hook: value.hook,
  };
  const cta = parseOptionalCta(value.cta);
  return cta === undefined ? idea : { ...idea, cta };
}

export function parseSocialContent(value: unknown): SocialContent {
  if (!isRecord(value) || typeof value.body !== 'string') {
    throw new Error('Invalid SocialContent');
  }
  const content: SocialContent = {
    body: value.body,
    hashtags: parseHashtags(value.hashtags),
    characterCount: parseCharacterCount(value.body, value.characterCount),
  };
  const cta = parseOptionalCta(value.cta);
  return cta === undefined ? content : { ...content, cta };
}

export function parseSocialContentItem(value: unknown): SocialContentItem {
  if (!isRecord(value)) throw new Error('Invalid SocialContentItem');
  return {
    ...parseSocialContent(value),
    sourceIdeaId: parseStringId(value.sourceIdeaId, 'sourceIdeaId'),
  };
}

export function parseReelIdea(value: unknown): ReelIdea {
  if (
    !isRecord(value) ||
    typeof value.title !== 'string' ||
    typeof value.description !== 'string' ||
    typeof value.hook !== 'string' ||
    typeof value.durationSeconds !== 'number' ||
    !isReelDuration(value.durationSeconds)
  ) {
    throw new Error('Invalid ReelIdea');
  }
  const idea: ReelIdea = {
    id: parseStringId(value.id, 'reelIdea.id'),
    title: value.title,
    description: value.description,
    hook: value.hook,
    durationSeconds: value.durationSeconds,
  };
  const cta = parseOptionalCta(value.cta);
  return cta === undefined ? idea : { ...idea, cta };
}

function parseReelScriptSegment(value: unknown): ReelScriptSegment {
  if (
    !isRecord(value) ||
    typeof value.startSeconds !== 'number' ||
    typeof value.endSeconds !== 'number' ||
    typeof value.onScreen !== 'string' ||
    typeof value.voiceover !== 'string'
  ) {
    throw new Error('Invalid ReelScriptSegment');
  }
  return {
    startSeconds: value.startSeconds,
    endSeconds: value.endSeconds,
    onScreen: value.onScreen,
    voiceover: value.voiceover,
  };
}

export function parseReelScript(value: unknown): ReelScript {
  if (!isRecord(value) || !Array.isArray(value.segments) || typeof value.cta !== 'string') {
    throw new Error('Invalid ReelScript');
  }
  const script: ReelScript = {
    segments: value.segments.map(parseReelScriptSegment),
    cta: value.cta,
  };
  if (value.notes === undefined) return script;
  if (typeof value.notes !== 'string') throw new Error('Invalid ReelScript.notes');
  return { ...script, notes: value.notes };
}

export function parseReelScriptItem(value: unknown): ReelScriptItem {
  if (!isRecord(value)) throw new Error('Invalid ReelScriptItem');
  return {
    ...parseReelScript(value),
    sourceIdeaId: parseStringId(value.sourceIdeaId, 'sourceIdeaId'),
  };
}

function parsePageOutlineSection(value: unknown): PageOutlineSection {
  if (!isRecord(value) || typeof value.heading !== 'string' || typeof value.summary !== 'string') {
    throw new Error('Invalid PageOutlineSection');
  }
  const section: PageOutlineSection = {
    id: parseStringId(value.id, 'section.id'),
    heading: value.heading,
    summary: value.summary,
  };
  if (value.role === undefined) return section;
  if (typeof value.role !== 'string' || !isPageOutlineSectionRole(value.role)) {
    throw new Error('Invalid section.role');
  }
  return { ...section, role: value.role };
}

export function parsePageOutline(value: unknown): PageOutline {
  if (!isRecord(value) || typeof value.title !== 'string' || !Array.isArray(value.sections)) {
    throw new Error('Invalid PageOutline');
  }
  return {
    id: parseStringId(value.id, 'outline.id'),
    title: value.title,
    sections: value.sections.map(parsePageOutlineSection),
  };
}

export function parsePageDocument(value: unknown): PageDocument {
  if (
    !isRecord(value) ||
    typeof value.title !== 'string' ||
    typeof value.lead !== 'string' ||
    typeof value.body !== 'string'
  ) {
    throw new Error('Invalid PageDocument');
  }
  const document: PageDocument = {
    title: value.title,
    lead: value.lead,
    body: value.body,
  };
  if (value.metaTitle !== undefined) {
    if (typeof value.metaTitle !== 'string') throw new Error('Invalid metaTitle');
  }
  if (value.metaDescription !== undefined) {
    if (typeof value.metaDescription !== 'string') throw new Error('Invalid metaDescription');
  }
  return {
    ...document,
    ...(typeof value.metaTitle === 'string' ? { metaTitle: value.metaTitle } : {}),
    ...(typeof value.metaDescription === 'string'
      ? { metaDescription: value.metaDescription }
      : {}),
  };
}

function parseArray<T>(
  value: unknown,
  parseItem: (item: unknown) => T,
  label: string,
): readonly T[] {
  if (!Array.isArray(value)) throw new Error(`Invalid ${label}`);
  return value.map(parseItem);
}

export function parseRunResult(value: unknown): RunResult {
  if (!isRecord(value)) throw new Error('Invalid result');
  const content = value.content === null ? null : parseSocialContent(value.content);
  const reelScript = value.reelScript === null ? null : parseReelScript(value.reelScript);
  const pageOutline = value.pageOutline === null ? null : parsePageOutline(value.pageOutline);
  const pageDocument = value.pageDocument === null ? null : parsePageDocument(value.pageDocument);
  return {
    ideas: parseArray(value.ideas, parseSocialIdea, 'ideas'),
    content,
    contents: parseArray(value.contents, parseSocialContentItem, 'contents'),
    reelIdeas: parseArray(value.reelIdeas, parseReelIdea, 'reelIdeas'),
    reelScript,
    reelScripts: parseArray(value.reelScripts, parseReelScriptItem, 'reelScripts'),
    pageOutline,
    pageDocument,
  };
}

export function parseRunHitl(taskType: RunTaskType, value: unknown): RunHitl | null {
  if (value === null) return null;
  if (!isRecord(value) || !Array.isArray(value.options)) {
    throw new Error('Invalid hitl');
  }
  if (taskType === 'post_ideas_then_content') {
    return { kind: 'post_ideas', options: value.options.map(parseSocialIdea) };
  }
  if (taskType === 'reel_ideas_then_scripts') {
    return { kind: 'reel_ideas', options: value.options.map(parseReelIdea) };
  }
  if (taskType === 'page_outline_then_copy') {
    return { kind: 'page_outline', options: value.options.map(parsePageOutline) };
  }
  throw new Error('Unexpected hitl for taskType');
}

export function parseReviewFields(value: unknown): RunReviewFields {
  if (!isRecord(value)) throw new Error('Invalid review fields');
  if (typeof value.outputEdited !== 'boolean') {
    throw new Error('Invalid outputEdited');
  }
  let userRating: UserRating | null;
  if (value.userRating === null) {
    userRating = null;
  } else if (
    value.userRating === 1 ||
    value.userRating === 2 ||
    value.userRating === 3 ||
    value.userRating === 4 ||
    value.userRating === 5
  ) {
    userRating = value.userRating;
  } else {
    throw new Error('Invalid userRating');
  }
  if (value.reviewFinalizedAt === null) {
    return {
      userRating,
      outputEdited: value.outputEdited,
      reviewFinalizedAt: null,
    };
  }
  if (typeof value.reviewFinalizedAt !== 'string') {
    throw new Error('Invalid reviewFinalizedAt');
  }
  return {
    userRating,
    outputEdited: value.outputEdited,
    reviewFinalizedAt: value.reviewFinalizedAt,
  };
}

export function parseHitlAccepted(value: unknown): HitlAccepted {
  if (
    !isRecord(value) ||
    typeof value.runId !== 'string' ||
    !isRunId(value.runId) ||
    value.status !== 'running'
  ) {
    throw new Error('Invalid hitl payload.');
  }
  return { runId: createRunId(value.runId), status: 'running' };
}

export function runResultHasArtifacts(result: RunResult): boolean {
  return (
    result.ideas.length > 0 ||
    result.content !== null ||
    result.contents.length > 0 ||
    result.reelIdeas.length > 0 ||
    result.reelScript !== null ||
    result.reelScripts.length > 0 ||
    result.pageOutline !== null ||
    result.pageDocument !== null
  );
}
