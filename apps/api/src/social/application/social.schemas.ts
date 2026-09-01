import { z } from 'zod';

export const socialIdeaSchema = z.object({
  id: z.string().min(1).optional(),
  title: z.string().min(1),
  angle: z.string().min(1),
  hook: z.string().min(1),
});

export const ideasOutputSchema = z.object({
  ideas: z.array(socialIdeaSchema).min(1),
});

export const contentOutputSchema = z.object({
  body: z.string().min(1),
  hashtags: z.array(z.string()).default([]),
  cta: z.string().min(1).optional(),
});

export const reelDurationSecondsSchema = z.preprocess(
  (value: unknown) => {
    if (typeof value === 'string' && /^(15|30|90)$/.test(value)) {
      return Number(value);
    }
    return value;
  },
  z.union([z.literal(15), z.literal(30), z.literal(90)]),
);

export const reelIdeaSchema = z.object({
  id: z.string().min(1).optional(),
  title: z.string().min(1),
  description: z.string().min(1),
  hook: z.string().min(1),
  durationSeconds: reelDurationSecondsSchema,
});

export const reelIdeasOutputSchema = z.object({
  ideas: z.array(reelIdeaSchema).min(1),
});

export const reelScriptSegmentSchema = z.object({
  startSeconds: z.number(),
  endSeconds: z.number(),
  onScreen: z.string().min(1),
  voiceover: z.string().min(1),
});

export const reelScriptOutputSchema = z.object({
  segments: z.array(reelScriptSegmentSchema).min(1),
  cta: z.string().min(1),
  notes: z.string().min(1).optional(),
});

function isPlainRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function readNonEmptyString(
  record: Record<string, unknown>,
  key: string,
): string | undefined {
  const value = record[key];
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

/** LLM often returns `{ itemId, issue, quote }` instead of a string. Domain stays `string[]`. */
function coerceVerifierIssue(value: unknown): unknown {
  if (typeof value === 'string') return value;
  if (!isPlainRecord(value)) return value;
  const itemId =
    readNonEmptyString(value, 'itemId') ?? readNonEmptyString(value, 'item');
  const issue = readNonEmptyString(value, 'issue');
  const quote = readNonEmptyString(value, 'quote');
  const parts = [itemId, quote, issue].filter(
    (part): part is string => part != null,
  );
  return parts.length > 0 ? parts.join(' — ') : value;
}

const verifierIssueSchema = z.preprocess(coerceVerifierIssue, z.string());

export const verifierOutputSchema = z.object({
  ok: z.boolean(),
  contextIssues: z.array(verifierIssueSchema).default([]),
  languageIssues: z.array(verifierIssueSchema).default([]),
});

export type IdeasOutput = z.infer<typeof ideasOutputSchema>;
export type ContentOutput = z.infer<typeof contentOutputSchema>;
export type VerifierOutput = z.infer<typeof verifierOutputSchema>;
export type ReelIdeasOutput = z.infer<typeof reelIdeasOutputSchema>;
export type ReelScriptOutput = z.infer<typeof reelScriptOutputSchema>;
