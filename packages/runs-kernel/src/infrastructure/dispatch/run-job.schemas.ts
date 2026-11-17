import { z } from 'zod';

export const runJobPayloadSchema = z
  .object({
    runId: z.string().min(1),
  })
  .strict();

export type RunJobPayload = z.infer<typeof runJobPayloadSchema>;
