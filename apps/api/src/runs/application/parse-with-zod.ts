import { z } from 'zod';
import { DomainException } from '../../shared/exceptions/domain.exception';

export function parseWithZod<T extends z.ZodTypeAny>(
  schema: T,
  input: unknown,
): z.output<T> {
  const result = schema.safeParse(input);
  if (result.success) return result.data;
  throw new DomainException(
    'VALIDATION_FAILED',
    'Application command validation failed',
    400,
    result.error.issues.map((issue) => ({
      path: issue.path.join('.'),
      message: issue.message,
    })),
  );
}
