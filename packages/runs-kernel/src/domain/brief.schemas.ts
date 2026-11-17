import { z } from 'zod';

export const socialBriefSchema = z
  .object({
    topic: z.string(),
    audience: z.string().optional(),
    goal: z.string().optional(),
    ideaCount: z.number().int().min(1).optional(),
  })
  .strict();

export const contentBriefSchema = z
  .object({
    topic: z.string(),
    audience: z.string().optional(),
    goal: z.string().optional(),
    angle: z.string().optional(),
    targetLength: z.number().int().min(1).optional(),
  })
  .strict();

export type ParsedSocialBrief = z.infer<typeof socialBriefSchema>;
export type ParsedContentBrief = z.infer<typeof contentBriefSchema>;
