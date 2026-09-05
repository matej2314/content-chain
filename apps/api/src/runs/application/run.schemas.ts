import { z } from 'zod';
import {
  CONTENT_KINDS,
  CONTENT_LANGUAGES,
  CONTENT_TASK_TYPES,
  SOCIAL_PLATFORMS,
  SOCIAL_TASK_TYPES,
  createRunId,
  isRunId,
} from '@content-chain/shared';

export const runIdSchema = z
  .string()
  .refine(isRunId, { message: 'Invalid runId' })
  .transform((value) => createRunId(value));

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

const socialStartRunSchema = z
  .object({
    taskType: z.enum(SOCIAL_TASK_TYPES),
    platform: z.enum(SOCIAL_PLATFORMS),
    language: z.enum(CONTENT_LANGUAGES),
    brief: socialBriefSchema,
    selectedIdeaIds: z.array(z.string()).optional(),
  })
  .strict();

const pageStartRunSchema = z
  .object({
    taskType: z.enum(CONTENT_TASK_TYPES),
    contentKind: z.enum(CONTENT_KINDS),
    language: z.enum(CONTENT_LANGUAGES),
    brief: contentBriefSchema,
  })
  .strict();

export const startRunCommandSchema = z.discriminatedUnion('taskType', [
  socialStartRunSchema,
  pageStartRunSchema,
]);

/** Długość, unikalność i członkostwo egzekwuje ResumeHitlUseCase → HITL_INVALID_SELECTION. */
export const hitlSelectedIdeaIdsSchema = z.array(z.string());

export type ParsedRunId = z.infer<typeof runIdSchema>;
export type ParsedSocialBrief = z.infer<typeof socialBriefSchema>;
export type ParsedStartRunCommand = z.infer<typeof startRunCommandSchema>;
export type ParsedHitlSelectedIdeaIds = z.infer<
  typeof hitlSelectedIdeaIdsSchema
>;
