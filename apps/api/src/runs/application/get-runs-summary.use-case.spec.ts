import { createUserId } from '@content-chain/shared';
import {
  GetRunsSummaryUseCase,
  RUNS_SUMMARY_CACHE_TTL_MS,
} from './get-runs-summary.use-case';
import type { RunRepository, RunSummaryAggregate } from '../domain/run.port';
import type { AuthUserContext } from '../../shared/types/auth-user-context';

function unusedRepo(overrides: Partial<RunRepository>): RunRepository {
  return overrides as RunRepository;
}

const admin: AuthUserContext = {
  id: createUserId('usr_aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'),
  email: 'admin@test',
  role: 'admin',
};

const user: AuthUserContext = {
  id: createUserId('usr_bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb'),
  email: 'user@test',
  role: 'user',
};

const emptyAgg: RunSummaryAggregate = {
  totalLast30d: 0,
  completedLast30d: 0,
  terminalLast30d: 0,
  activeNow: 0,
  topTaskTypeLast30d: null,
};

describe('GetRunsSummaryUseCase', () => {
  it('returns successRate 0 when no terminal runs (D-80)', async () => {
    const aggregateSummary = jest.fn().mockResolvedValue(emptyAgg);
    const uc = new GetRunsSummaryUseCase(
      unusedRepo({ aggregateSummary }),
    );
    const now = new Date('2026-07-14T12:00:00.000Z');
    const result = await uc.execute(admin, now);
    expect(result.successRateLast30d).toBe(0);
    expect(result.topTaskTypeLast30d).toBeNull();
    expect(result.windowTo).toBe(now.toISOString());
  });

  it('computes successRate among terminal with one decimal (D-80)', async () => {
    const aggregateSummary = jest.fn().mockResolvedValue({
      totalLast30d: 4,
      completedLast30d: 3,
      terminalLast30d: 4,
      activeNow: 1,
      topTaskTypeLast30d: 'post_ideas',
    } satisfies RunSummaryAggregate);
    const uc = new GetRunsSummaryUseCase(
      unusedRepo({ aggregateSummary }),
    );
    const result = await uc.execute(user);
    expect(result.successRateLast30d).toBe(75);
    expect(result.topTaskTypeLast30d).toBe('post_ideas');
    expect(aggregateSummary).toHaveBeenCalledWith(
      { startedByUserId: user.id },
      expect.any(Date),
      expect.any(Date),
    );
  });

  it('admin scope has no startedByUserId filter (D-78)', async () => {
    const aggregateSummary = jest.fn().mockResolvedValue(emptyAgg);
    const uc = new GetRunsSummaryUseCase(
      unusedRepo({ aggregateSummary }),
    );
    await uc.execute(admin);
    expect(aggregateSummary).toHaveBeenCalledWith(
      {},
      expect.any(Date),
      expect.any(Date),
    );
  });

  it('caches response for TTL 60s (D-80)', async () => {
    const aggregateSummary = jest.fn().mockResolvedValue(emptyAgg);
    const uc = new GetRunsSummaryUseCase(
      unusedRepo({ aggregateSummary }),
    );
    const t0 = new Date('2026-07-14T12:00:00.000Z');
    await uc.execute(admin, t0);
    await uc.execute(
      admin,
      new Date(t0.getTime() + RUNS_SUMMARY_CACHE_TTL_MS - 1),
    );
    expect(aggregateSummary).toHaveBeenCalledTimes(1);
    await uc.execute(
      admin,
      new Date(t0.getTime() + RUNS_SUMMARY_CACHE_TTL_MS + 1),
    );
    expect(aggregateSummary).toHaveBeenCalledTimes(2);
  });
});
