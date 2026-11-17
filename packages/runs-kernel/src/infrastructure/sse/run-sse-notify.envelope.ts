import { z } from 'zod';
import type { RunSseEvent } from '../../domain/run-sse.port';

/** Inline w NOTIFY — bez run.log (treść logu zawsze z DB). */
const runSseInlineEventSchema = z.discriminatedUnion('event', [
  z.object({
    event: z.literal('run.status'),
    data: z.object({
      runId: z.string().min(1),
      status: z.string().min(1),
    }),
  }),
  z.object({
    event: z.literal('run.hitl'),
    data: z.object({
      runId: z.string().min(1),
      options: z.array(z.unknown()),
    }),
  }),
  z.object({
    event: z.literal('run.completed'),
    data: z.object({
      runId: z.string().min(1),
      resultSummary: z.string().optional(),
    }),
  }),
  z.object({
    event: z.literal('run.failed'),
    data: z.object({
      runId: z.string().min(1),
      code: z.string().optional(),
      message: z.string(),
    }),
  }),
  z.object({
    event: z.literal('run.cancelled'),
    data: z.object({ runId: z.string().min(1) }),
  }),
]);

export const runSseNotifyEnvelopeSchema = z.discriminatedUnion('kind', [
  z.object({
    kind: z.literal('publish'),
    event: runSseInlineEventSchema,
  }),
  z.object({
    kind: z.literal('publish-log'),
    logId: z.string().min(1),
    runId: z.string().min(1),
  }),
  z.object({
    kind: z.literal('complete'),
    runId: z.string().min(1),
  }),
]);

export type RunSseNotifyEnvelope = z.infer<typeof runSseNotifyEnvelopeSchema>;

export function parseRunSseNotifyPayload(
  raw: string,
): RunSseNotifyEnvelope | null {
  let json: unknown;
  try {
    json = JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
  const parsed = runSseNotifyEnvelopeSchema.safeParse(json);
  return parsed.success ? parsed.data : null;
}

export function encodePublish(
  event: Exclude<RunSseEvent, { event: 'run.log' }>,
): string {
  return JSON.stringify({
    kind: 'publish',
    event,
  } satisfies RunSseNotifyEnvelope);
}

export function encodePublishLog(logId: string, runId: string): string {
  return JSON.stringify({
    kind: 'publish-log',
    logId,
    runId,
  } satisfies RunSseNotifyEnvelope);
}

export function encodeComplete(runId: string): string {
  return JSON.stringify({
    kind: 'complete',
    runId,
  } satisfies RunSseNotifyEnvelope);
}
