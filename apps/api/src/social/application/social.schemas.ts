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

export const verifierOutputSchema = z.object({
  ok: z.boolean(),
  contextIssues: z.array(z.string()).default([]),
  languageIssues: z.array(z.string()).default([]),
});

export type IdeasOutput = z.infer<typeof ideasOutputSchema>;
export type ContentOutput = z.infer<typeof contentOutputSchema>;
export type VerifierOutput = z.infer<typeof verifierOutputSchema>;
