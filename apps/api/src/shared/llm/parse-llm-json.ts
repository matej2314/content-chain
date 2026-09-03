import type { z } from 'zod';
import { DomainException } from '../exceptions/domain.exception';

export function extractJsonText(raw: string): string {
  const trimmed = raw.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  return (fenced?.[1] ?? trimmed).trim();
}

export function parseLlmJson<T extends z.ZodTypeAny>(
  schema: T,
  raw: string,
): z.output<T> {
  let parsed: unknown;
  try {
    parsed = JSON.parse(extractJsonText(raw));
  } catch {
    throw new DomainException(
      'STRUCTURED_OUTPUT_INVALID',
      'LLM output is not valid JSON',
      500,
    );
  }
  const result = schema.safeParse(parsed);
  if (!result.success) {
    throw new DomainException(
      'STRUCTURED_OUTPUT_INVALID',
      'LLM output failed schema validation',
      500,
      result.error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      })),
    );
  }
  return result.data;
}
