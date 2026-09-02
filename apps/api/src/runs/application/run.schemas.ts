import { z } from 'zod';
import {
  CONTENT_LANGUAGES,
  RUN_TASK_TYPES,
  SOCIAL_PLATFORMS,
  createRunId,
  isRunId,
} from '@content-chain/shared';

export const runIdSchema = z
  .string()
  .refine(isRunId, { message: 'Invalid runId' })
  .transform((value) => createRunId(value));

export const socialBriefSchema = z.object({
  topic: z.string(),
  audience: z.string().optional(),
  goal: z.string().optional(),
  ideaCount: z.number().int().min(1).optional(),
});

export const startRunCommandSchema = z.object({
  taskType: z.enum(RUN_TASK_TYPES),
  platform: z.enum(SOCIAL_PLATFORMS),
  language: z.enum(CONTENT_LANGUAGES),
  brief: socialBriefSchema,
  selectedIdeaIds: z.array(z.string()).optional(),
});

export const hitlSelectedIdeaIdsSchema = z.array(z.string()).min(1);

export type ParsedRunId = z.infer<typeof runIdSchema>;
export type ParsedSocialBrief = z.infer<typeof socialBriefSchema>;
export type ParsedStartRunCommand = z.infer<typeof startRunCommandSchema>;
export type ParsedHitlSelectedIdeaIds = z.infer<
  typeof hitlSelectedIdeaIdsSchema
>;
