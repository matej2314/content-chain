import { z } from 'zod';
import {
  contentOutputSchema,
  reelIdeaSchema,
  reelScriptOutputSchema,
  socialIdeaSchema,
} from '../../social/application/social.schemas';
import {
  pageDocumentOutputSchema,
  pageOutlineOutputSchema,
} from '../../content/application/content.schemas';
import type { RunTaskType } from '@content-chain/shared';

export const RESULT_KEYS_BY_TASK_TYPE: Record<
  RunTaskType,
  ReadonlySet<string>
> = {
  post_ideas: new Set(['ideas']),
  post_content: new Set(['content']),
  post_ideas_then_content: new Set(['ideas', 'contents']),
  reel_ideas: new Set(['reelIdeas']),
  reel_script: new Set(['reelScript']),
  reel_ideas_then_scripts: new Set(['reelIdeas', 'reelScripts']),
  page_outline_then_copy: new Set(['pageOutline', 'pageDocument']),
  page_copy: new Set(['pageDocument']),
};

const ideaPersistedSchema = socialIdeaSchema.extend({
  id: z.string().min(1),
});

const reelIdeaPersistedSchema = reelIdeaSchema.extend({
  id: z.string().min(1),
});

export const editedContentSchema = contentOutputSchema;

export const editedContentItemSchema = editedContentSchema.extend({
  sourceIdeaId: z.string().min(1),
});

export const editedReelScriptItemSchema = reelScriptOutputSchema.extend({
  sourceIdeaId: z.string().min(1),
});

const pageOutlineSectionPersistedSchema = z.object({
  id: z.string().min(1),
  heading: z.string().min(1),
  summary: z.string().min(1),
  role: z
    .enum([
      'audience_world',
      'pain',
      'challenger',
      'insight',
      'proof',
      'objection',
      'cta',
      'other',
    ])
    .optional(),
});

export const editedPageOutlineSchema = pageOutlineOutputSchema
  .omit({ sections: true })
  .extend({
    id: z.string().min(1),
    sections: z.array(pageOutlineSectionPersistedSchema).min(1),
  });

export const editedPageDocumentSchema = pageDocumentOutputSchema;

export const outputEditedBodySchema = z
  .object({
    result: z.record(z.string(), z.unknown()),
  })
  .strict();

export const ideasArraySchema = z.array(ideaPersistedSchema).min(1);
export const reelIdeasArraySchema = z.array(reelIdeaPersistedSchema).min(1);
export const contentsArraySchema = z.array(editedContentItemSchema).min(1);
export const reelScriptsArraySchema = z
  .array(editedReelScriptItemSchema)
  .min(1);
