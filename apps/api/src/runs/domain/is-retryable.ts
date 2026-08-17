export type RetryReason =
  | { kind: 'process_crash' }
  | { kind: 'gateway'; code?: string; retryable: boolean }
  | { kind: 'validation' }
  | { kind: 'refine_exhausted' }
  | { kind: 'config' };

export function isRetryable(reason: RetryReason): boolean {
  switch (reason.kind) {
    case 'process_crash':
      return true;
    case 'gateway':
      return reason.retryable;
    case 'validation':
    case 'refine_exhausted':
    case 'config':
      return false;
  }
}
