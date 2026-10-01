import type { Env } from '../../shared/config/env';
import type { RunRepository } from '../domain/run.port';
import { AutoFinalizeExpiredReviewsUseCase } from './auto-finalize-expired-reviews.use-case';

const TEST_ENV = { REVIEW_TTL: '2h' } as Env;
const TTL_2H_MS = 2 * 60 * 60 * 1000;
const NOW = new Date('2026-09-30T12:00:00.000Z');

function unusedRepo(overrides: Partial<RunRepository> = {}): RunRepository {
  const unexpected = async () => {
    throw new Error('unexpected repository call');
  };
  return {
    create: unexpected,
    getById: unexpected,
    saveStatus: unexpected,
    saveRecoveryAttempt: unexpected,
    claimNextQueued: unexpected,
    claimNextInterrupted: unexpected,
    findInterruptedRunning: unexpected,
    findCancelRequestedLeftovers: unexpected,
    appendLog: unexpected,
    listLogs: unexpected,
    list: unexpected,
    setCancelRequested: unexpected,
    attemptCancel: unexpected,
    saveSelectedIdeaIds: unexpected,
    listByUser: unexpected,
    saveRating: unexpected,
    saveOutputEdited: unexpected,
    saveFinalizedAt: unexpected,
    setPipelineFinishedAt: unexpected,
    finalizeExpiredReviews: unexpected,
    ...overrides,
  };
}

describe('AutoFinalizeExpiredReviewsUseCase', () => {
  it('passes now and parsed REVIEW_TTL; returns locked count for expired reviews', async () => {
    const finalizeExpiredReviews = jest.fn().mockResolvedValue(1);
    const useCase = new AutoFinalizeExpiredReviewsUseCase(
      TEST_ENV,
      unusedRepo({ finalizeExpiredReviews }),
    );

    await expect(useCase.execute(NOW)).resolves.toBe(1);
    expect(finalizeExpiredReviews).toHaveBeenCalledTimes(1);
    expect(finalizeExpiredReviews).toHaveBeenCalledWith(NOW, TTL_2H_MS);
  });

  it('returns 0 when no reviews are past the TTL window', async () => {
    const finalizeExpiredReviews = jest.fn().mockResolvedValue(0);
    const useCase = new AutoFinalizeExpiredReviewsUseCase(
      TEST_ENV,
      unusedRepo({ finalizeExpiredReviews }),
    );

    await expect(useCase.execute(NOW)).resolves.toBe(0);
    expect(finalizeExpiredReviews).toHaveBeenCalledWith(NOW, TTL_2H_MS);
  });

  it('does not touch rating, outputEdited, or manual finalize ports', async () => {
    const finalizeExpiredReviews = jest.fn().mockResolvedValue(2);
    const useCase = new AutoFinalizeExpiredReviewsUseCase(
      TEST_ENV,
      unusedRepo({ finalizeExpiredReviews }),
    );

    await useCase.execute(NOW);

    expect(finalizeExpiredReviews).toHaveBeenCalledTimes(1);
  });

  it('defaults now to current time when omitted', async () => {
    jest.useFakeTimers();
    jest.setSystemTime(NOW);
    try {
      const finalizeExpiredReviews = jest.fn().mockResolvedValue(0);
      const useCase = new AutoFinalizeExpiredReviewsUseCase(
        TEST_ENV,
        unusedRepo({ finalizeExpiredReviews }),
      );

      await useCase.execute();

      expect(finalizeExpiredReviews).toHaveBeenCalledWith(NOW, TTL_2H_MS);
    } finally {
      jest.useRealTimers();
    }
  });

  it('re-running execute only re-delegates finalize (no thaw in use-case)', async () => {
    const finalizeExpiredReviews = jest.fn().mockResolvedValue(0);
    const useCase = new AutoFinalizeExpiredReviewsUseCase(
      TEST_ENV,
      unusedRepo({ finalizeExpiredReviews }),
    );

    await useCase.execute(NOW);
    await useCase.execute(NOW);

    expect(finalizeExpiredReviews).toHaveBeenCalledTimes(2);
    expect(finalizeExpiredReviews).toHaveBeenNthCalledWith(1, NOW, TTL_2H_MS);
    expect(finalizeExpiredReviews).toHaveBeenNthCalledWith(2, NOW, TTL_2H_MS);
  });
});
