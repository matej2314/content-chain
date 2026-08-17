import { isRetryable } from './is-retryable';

describe('isRetryable', () => {
  it('allows retry after process crash', () => {
    expect(isRetryable({ kind: 'process_crash' })).toBe(true);
  });

  it('allows retry for retryable gateway timeout', () => {
    expect(
      isRetryable({
        kind: 'gateway',
        code: 'PROVIDER_TIMEOUT',
        retryable: true,
      }),
    ).toBe(true);
  });

  it('rejects retry for GATEWAY_KEY_INVALID', () => {
    expect(
      isRetryable({
        kind: 'gateway',
        code: 'GATEWAY_KEY_INVALID',
        retryable: false,
      }),
    ).toBe(false);
  });

  it('rejects retry for validation errors', () => {
    expect(isRetryable({ kind: 'validation' })).toBe(false);
  });

  it('rejects retry after refine is exhausted', () => {
    expect(isRetryable({ kind: 'refine_exhausted' })).toBe(false);
  });

  it('rejects retry for config errors', () => {
    expect(isRetryable({ kind: 'config' })).toBe(false);
  });
});
