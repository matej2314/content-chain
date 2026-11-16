import { runJobPayloadSchema } from './run-job.schemas';

describe('runJobPayloadSchema', () => {
  it('accepts { runId }', () => {
    expect(runJobPayloadSchema.safeParse({ runId: 'run_1' })).toEqual({
      success: true,
      data: { runId: 'run_1' },
    });
  });

  it('rejects extra keys', () => {
    expect(
      runJobPayloadSchema.safeParse({ runId: 'run_1', extra: true }).success,
    ).toBe(false);
  });

  it('rejects missing runId', () => {
    expect(runJobPayloadSchema.safeParse({}).success).toBe(false);
  });

  it('rejects non-string runId', () => {
    expect(runJobPayloadSchema.safeParse({ runId: 1 }).success).toBe(false);
  });

  it('rejects empty runId', () => {
    expect(runJobPayloadSchema.safeParse({ runId: '' }).success).toBe(false);
  });
});
