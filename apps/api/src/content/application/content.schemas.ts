import { z } from 'zod';

export const pageOutlineSectionRoleSchema = z.enum([
  'audience_world',
  'pain',
  'challenger',
  'insight',
  'proof',
  'objection',
  'cta',
  'other',
]);

export const pageOutlineSectionSchema = z.object({
  id: z.string().min(1).optional(),
  heading: z.string().min(1),
  summary: z.string().min(1),
  role: pageOutlineSectionRoleSchema.optional(),
});

export const pageOutlineOutputSchema = z.object({
  title: z.string().min(1),
  sections: z.array(pageOutlineSectionSchema).min(1),
});

export const pageDocumentOutputSchema = z.object({
  title: z.string().min(1),
  lead: z.string().min(1),
  body: z.string().min(1),
  metaTitle: z.string().min(1).optional(),
  metaDescription: z.string().min(1).optional(),
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

export type PageOutlineOutput = z.infer<typeof pageOutlineOutputSchema>;
export type PageDocumentOutput = z.infer<typeof pageDocumentOutputSchema>;
