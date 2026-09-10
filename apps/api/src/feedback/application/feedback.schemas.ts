import { z } from 'zod';
import { FEEDBACK_AGENT_KEYS } from '@content-chain/shared';
import { FEEDBACK_BODY_MAX } from '../domain/feedback.types';

const [firstAgentKey, ...otherAgentKeys] = FEEDBACK_AGENT_KEYS;

if (firstAgentKey === undefined) {
  throw new Error('FEEDBACK_AGENT_KEYS must not be empty');
}

const agentKeySchema = z.enum([firstAgentKey, ...otherAgentKeys]);

export const createFeedbackSchema = z.discriminatedUnion('targetType', [
  z.object({
    targetType: z.literal('application'),
    body: z.string().min(1).max(FEEDBACK_BODY_MAX),
  }),
  z.object({
    targetType: z.literal('agent'),
    body: z.string().min(1).max(FEEDBACK_BODY_MAX),
    agentKey: agentKeySchema,
  }),
  z.object({
    targetType: z.literal('run'),
    body: z.string().min(1).max(FEEDBACK_BODY_MAX),
    runId: z.string().min(1),
  }),
]);

export type CreateFeedbackCommand = z.infer<typeof createFeedbackSchema>;
