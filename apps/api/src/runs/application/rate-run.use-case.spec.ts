import { createUserId, type RunId, type UserId } from '@content-chain/shared';
import { validateEnv } from '../../shared/config/env.schema';
import type { Env } from '../../shared/config/env';
import type { AuthUserContext } from '../../shared/types/auth-user-context';
import type {
  GuestQuotaAdmitResult,
  GuestQuotaPort,
} from '../domain/guest-quota.port';
import type { RunRepository } from '../domain/run.port';
import {
  makeSocialSnapshot,
  type SocialRunSnapshot,
} from '../run-record.test-helpers';
import { RateRunUseCase } from './rate-run.use-case';

const ACTOR: AuthUserContext = {
  id: createUserId('usr_11111111-1111-4111-8111-111111111111'),
  email: 'user@example.com',
  role: 'user',
};

const GUEST: AuthUserContext = {
  id: createUserId('usr_33333333-3333-4333-8333-333333333333'),
  email: 'guest@example.com',
  role: 'guest',
};

const ADMIN: AuthUserContext = {
  id: createUserId('usr_44444444-4444-4444-8444-444444444444'),
  email: 'admin@example.com',
  role: 'admin',
};

const NOW = new Date('2026-09-30T11:00:00.000Z');
const ANCHOR_OPEN = new Date('2026-09-30T10:00:00.000Z');
const ANCHOR_EXPIRED = new Date('2026-09-30T08:00:00.000Z');

const BASE_ENV_FIELDS = {
  DATABASE_URL: 'file:./test.db',
  GATEWAY_BASE_URL: 'http://localhost:3100',
  GATEWAY_KEY: 'test-gateway-key',
  JWT_SECRET: 'test-jwt-secret',
  CORS_ORIGIN: 'http://localhost:3000',
  REVIEW_TTL: '2h',
} as const;

const TEST_ENV = validateEnv({
  NODE_ENV: 'test',
  ...BASE_ENV_FIELDS,
  DEMO_MODE: 'false',
});

const ENV_DEMO_ON = validateEnv({
  NODE_ENV: 'test',
  ...BASE_ENV_FIELDS,
  DEMO_MODE: 'true',
  REDIS_HOST: '127.0.0.1',
  REDIS_PORT: 6379,
  GUEST_RATING_CAP_PER_DAY: '10',
});

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
    countByUserAndType: unexpected,
    ...overrides,
  };
}

function unusedQuota(overrides: Partial<GuestQuotaPort> = {}): GuestQuotaPort {
  const unexpected = async () => {
    throw new Error('unexpected quota call');
  };
  return {
    tryAdmitDailyRun: unexpected,
    releaseDailyRun: unexpected,
    tryAdmitDailyRating: unexpected,
    deleteDailyRatings: unexpected,
    ...overrides,
  };
}

function makeUseCase(
  repo: RunRepository,
  env: Env = TEST_ENV,
  quota: GuestQuotaPort = unusedQuota(),
): RateRunUseCase {
  return new RateRunUseCase(repo, env, quota);
}

function snapshot(
  overrides: Partial<SocialRunSnapshot> = {},
): SocialRunSnapshot {
  return makeSocialSnapshot({
    status: 'completed',
    startedByUserId: ACTOR.id,
    startedBy: { id: ACTOR.id, email: ACTOR.email, role: ACTOR.role },
    pipelineFinishedAt: ANCHOR_OPEN,
    ...overrides,
  });
}

function guestSnapshot(
  overrides: Partial<SocialRunSnapshot> = {},
): SocialRunSnapshot {
  return snapshot({
    startedByUserId: GUEST.id,
    startedBy: { id: GUEST.id, email: GUEST.email, role: GUEST.role },
    ...overrides,
  });
}

describe('RateRunUseCase', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(NOW);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('writes rating 1–5 and returns an open review', async () => {
    const run = snapshot();
    const saveRating = jest.fn(
      async (_id: RunId, _rating: number | null): Promise<boolean> => true,
    );
    const useCase = makeUseCase(
      unusedRepo({
        getById: async () => run,
        saveRating,
      }),
    );

    await expect(
      useCase.execute(run.id, { rating: 4 }, ACTOR),
    ).resolves.toEqual({
      runId: run.id,
      userRating: 4,
      reviewFinalizedAt: null,
      pipelineFinishedAt: ANCHOR_OPEN.toISOString(),
      reviewExpiresAt: '2026-09-30T12:00:00.000Z',
    });
    expect(saveRating).toHaveBeenCalledTimes(1);
    expect(saveRating).toHaveBeenCalledWith(run.id, 4);
  });

  it('writes rating null and returns an open review', async () => {
    const run = snapshot({ userRating: 4 });
    const saveRating = jest.fn(
      async (_id: RunId, _rating: number | null): Promise<boolean> => true,
    );
    const useCase = makeUseCase(
      unusedRepo({
        getById: async () => run,
        saveRating,
      }),
    );

    await expect(
      useCase.execute(run.id, { rating: null }, ACTOR),
    ).resolves.toEqual({
      runId: run.id,
      userRating: null,
      reviewFinalizedAt: null,
      pipelineFinishedAt: ANCHOR_OPEN.toISOString(),
      reviewExpiresAt: '2026-09-30T12:00:00.000Z',
    });
    expect(saveRating).toHaveBeenCalledWith(run.id, null);
  });

  it('saves a rating on an own failed run', async () => {
    const run = snapshot({ status: 'failed' });
    const saveRating = jest.fn(
      async (_id: RunId, _rating: number | null): Promise<boolean> => true,
    );
    const useCase = makeUseCase(
      unusedRepo({
        getById: async () => run,
        saveRating,
      }),
    );

    await expect(
      useCase.execute(run.id, { rating: 1 }, ACTOR),
    ).resolves.toMatchObject({ userRating: 1 });
    expect(saveRating).toHaveBeenCalledWith(run.id, 1);
  });

  it.each([{ rating: 0 }, { rating: 6 }, { rating: 1.5 }, {}])(
    'rejects invalid rating %j with VALIDATION_FAILED and skips persist',
    async (input) => {
      const run = snapshot();
      const getById = jest.fn(async () => run);
      const saveRating = jest.fn(
        async (_id: RunId, _rating: number | null): Promise<boolean> => true,
      );
      const useCase = makeUseCase(unusedRepo({ getById, saveRating }));

      await expect(useCase.execute(run.id, input, ACTOR)).rejects.toMatchObject(
        {
          name: 'DomainException',
          code: 'VALIDATION_FAILED',
          httpStatus: 400,
        },
      );
      expect(getById).not.toHaveBeenCalled();
      expect(saveRating).not.toHaveBeenCalled();
    },
  );

  it('maps saveRating false to REVIEW_LOCKED', async () => {
    const run = snapshot();
    const saveRating = jest.fn(
      async (_id: RunId, _rating: number | null): Promise<boolean> => false,
    );
    const useCase = makeUseCase(
      unusedRepo({
        getById: async () => run,
        saveRating,
      }),
    );

    await expect(
      useCase.execute(run.id, { rating: 4 }, ACTOR),
    ).rejects.toMatchObject({
      name: 'DomainException',
      code: 'REVIEW_LOCKED',
      httpStatus: 409,
    });
    expect(saveRating).toHaveBeenCalledTimes(1);
  });

  it('does not call saveRating when the run is not reviewable', async () => {
    const run = snapshot({ status: 'running' });
    const saveRating = jest.fn(
      async (_id: RunId, _rating: number | null): Promise<boolean> => true,
    );
    const useCase = makeUseCase(
      unusedRepo({
        getById: async () => run,
        saveRating,
      }),
    );

    await expect(
      useCase.execute(run.id, { rating: 4 }, ACTOR),
    ).rejects.toMatchObject({
      name: 'DomainException',
      code: 'RUN_NOT_REVIEWABLE',
      httpStatus: 409,
    });
    expect(saveRating).not.toHaveBeenCalled();
  });

  it('rejects cancelled with RUN_NOT_REVIEWABLE and skips saveRating', async () => {
    const run = snapshot({ status: 'cancelled' });
    const saveRating = jest.fn(
      async (_id: RunId, _rating: number | null): Promise<boolean> => true,
    );
    const useCase = makeUseCase(
      unusedRepo({
        getById: async () => run,
        saveRating,
      }),
    );

    await expect(
      useCase.execute(run.id, { rating: 4 }, ACTOR),
    ).rejects.toMatchObject({
      name: 'DomainException',
      code: 'RUN_NOT_REVIEWABLE',
      httpStatus: 409,
    });
    expect(saveRating).not.toHaveBeenCalled();
  });

  it('rejects after TTL with REVIEW_LOCKED and skips saveRating', async () => {
    const run = snapshot({
      pipelineFinishedAt: ANCHOR_EXPIRED,
      reviewFinalizedAt: null,
    });
    const saveRating = jest.fn(
      async (_id: RunId, _rating: number | null): Promise<boolean> => true,
    );
    const useCase = makeUseCase(
      unusedRepo({
        getById: async () => run,
        saveRating,
      }),
    );

    await expect(
      useCase.execute(run.id, { rating: 4 }, ACTOR),
    ).rejects.toMatchObject({
      name: 'DomainException',
      code: 'REVIEW_LOCKED',
      httpStatus: 409,
    });
    expect(saveRating).not.toHaveBeenCalled();
  });

  it('rejects guest rating over daily cap with TOO_MANY_REQUESTS 429 (D-57)', async () => {
    const run = guestSnapshot();
    const saveRating = jest.fn(
      async (_id: RunId, _rating: number | null): Promise<boolean> => true,
    );
    const tryAdmitDailyRating = jest.fn<
      Promise<GuestQuotaAdmitResult>,
      [UserId, number, Date?]
    >(async () => ({ kind: 'exceeded' }));
    const useCase = makeUseCase(
      unusedRepo({
        getById: async () => run,
        saveRating,
      }),
      ENV_DEMO_ON,
      unusedQuota({ tryAdmitDailyRating }),
    );

    await expect(
      useCase.execute(run.id, { rating: 4 }, GUEST),
    ).rejects.toMatchObject({
      name: 'DomainException',
      code: 'TOO_MANY_REQUESTS',
      httpStatus: 429,
    });
    expect(tryAdmitDailyRating).toHaveBeenCalledWith(
      GUEST.id,
      ENV_DEMO_ON.GUEST_RATING_CAP_PER_DAY,
    );
    expect(saveRating).not.toHaveBeenCalled();
  });

  it('saves guest rating when quota is unavailable (D-57 fail open)', async () => {
    const run = guestSnapshot();
    const saveRating = jest.fn(
      async (_id: RunId, _rating: number | null): Promise<boolean> => true,
    );
    const tryAdmitDailyRating = jest.fn<
      Promise<GuestQuotaAdmitResult>,
      [UserId, number, Date?]
    >(async () => ({ kind: 'unavailable' }));
    const useCase = makeUseCase(
      unusedRepo({
        getById: async () => run,
        saveRating,
      }),
      ENV_DEMO_ON,
      unusedQuota({ tryAdmitDailyRating }),
    );

    await expect(
      useCase.execute(run.id, { rating: 5 }, GUEST),
    ).resolves.toMatchObject({ userRating: 5 });
    expect(tryAdmitDailyRating).toHaveBeenCalledTimes(1);
    expect(saveRating).toHaveBeenCalledWith(run.id, 5);
  });

  it('does not call quota for admin when demo is on', async () => {
    const run = snapshot({
      startedByUserId: ADMIN.id,
      startedBy: { id: ADMIN.id, email: ADMIN.email, role: ADMIN.role },
    });
    const saveRating = jest.fn(
      async (_id: RunId, _rating: number | null): Promise<boolean> => true,
    );
    const useCase = makeUseCase(
      unusedRepo({
        getById: async () => run,
        saveRating,
      }),
      ENV_DEMO_ON,
    );

    await expect(
      useCase.execute(run.id, { rating: 3 }, ADMIN),
    ).resolves.toMatchObject({ userRating: 3 });
    expect(saveRating).toHaveBeenCalledWith(run.id, 3);
  });

  it('does not consume rating cap when guest review is already locked', async () => {
    const run = guestSnapshot({
      pipelineFinishedAt: ANCHOR_EXPIRED,
      reviewFinalizedAt: null,
    });
    const saveRating = jest.fn(
      async (_id: RunId, _rating: number | null): Promise<boolean> => true,
    );
    const useCase = makeUseCase(
      unusedRepo({
        getById: async () => run,
        saveRating,
      }),
      ENV_DEMO_ON,
    );

    await expect(
      useCase.execute(run.id, { rating: 4 }, GUEST),
    ).rejects.toMatchObject({
      name: 'DomainException',
      code: 'REVIEW_LOCKED',
      httpStatus: 409,
    });
    expect(saveRating).not.toHaveBeenCalled();
  });
});
