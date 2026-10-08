import type { Prisma } from '@prisma/client';
import {
  createRunId,
  createUserId,
  type RunId,
  type UserId,
} from '@content-chain/shared';
import type { PrismaService } from '../../shared/persistence/prisma.service';
import type { FeedbackPurgePort } from '../../feedback/domain/feedback-purge.port';
import type { GuestPurgePort } from '../../runs/domain/guest-purge.port';
import type { GuestQuotaPort } from '../../runs/domain/guest-quota.port';
import { RunAbortRegistry } from '../../runs/application/lifecycle/run-abort.registry';
import type { AuthUser, AuthUserContext } from '../domain/auth-user.types';
import type { UserRepository } from '../domain/user-repository.port';
import { DeleteUserUseCase } from './delete-user.use-case';

const USER_ID = createUserId('usr_11111111-1111-4111-8111-111111111111');
const GUEST_ID = createUserId('usr_33333333-3333-4333-8333-333333333333');
const ADMIN_ID = createUserId('usr_22222222-2222-4222-8222-222222222222');
const ACTOR_ADMIN_ID = createUserId('usr_44444444-4444-4444-8444-444444444444');
const RUN_ID = createRunId('run_11111111-1111-4111-8111-111111111111');
const CREATED_AT = new Date('2026-01-01T00:00:00.000Z');

const ACTOR: AuthUserContext = {
  id: ACTOR_ADMIN_ID,
  email: 'admin@example.com',
  role: 'admin',
};

type TxMock = {
  user: {
    update: jest.Mock;
    delete: jest.Mock;
  };
  refreshSession: { deleteMany: jest.Mock };
  accountActivation: { deleteMany: jest.Mock };
};

function mockPrisma(tx: TxMock): PrismaService {
  return {
    $transaction: async <T>(
      fn: (client: Prisma.TransactionClient) => Promise<T>,
    ): Promise<T> => fn(tx as unknown as Prisma.TransactionClient),
  } as unknown as PrismaService;
}

function makeSoftTx(): TxMock {
  return {
    user: {
      update: jest.fn(async () => ({ id: USER_ID })),
      delete: jest.fn(async () => {
        throw new Error('unexpected user.delete on soft path');
      }),
    },
    refreshSession: {
      deleteMany: jest.fn(async () => ({ count: 1 })),
    },
    accountActivation: {
      deleteMany: jest.fn(async () => ({ count: 1 })),
    },
  };
}

function makeHardTx(): TxMock {
  return {
    user: {
      update: jest.fn(async () => {
        throw new Error('unexpected user.update on hard path');
      }),
      delete: jest.fn(async () => ({ id: GUEST_ID })),
    },
    refreshSession: {
      deleteMany: jest.fn(async () => ({ count: 1 })),
    },
    accountActivation: {
      deleteMany: jest.fn(async () => ({ count: 1 })),
    },
  };
}

function unusedUsers(overrides: Partial<UserRepository> = {}): UserRepository {
  const unexpected = async () => {
    throw new Error('unexpected repository call');
  };
  return {
    findForAuth: unexpected,
    findById: unexpected,
    findAdminCount: unexpected,
    create: unexpected,
    createAdminIfNone: unexpected,
    setActive: unexpected,
    setVerifiedAt: unexpected,
    list: unexpected,
    updateEmail: unexpected,
    ...overrides,
  };
}

function unusedGuestPurge(
  overrides: Partial<GuestPurgePort> = {},
): GuestPurgePort {
  const unexpected = async () => {
    throw new Error('unexpected guestPurge call');
  };
  return {
    hasLiveRuns: unexpected,
    listLiveRunIds: unexpected,
    deleteRunTree: unexpected,
    ...overrides,
  };
}

function unusedFeedbackPurge(
  overrides: Partial<FeedbackPurgePort> = {},
): FeedbackPurgePort {
  return {
    deleteForGuest: async () => {
      throw new Error('unexpected feedbackPurge call');
    },
    ...overrides,
  };
}

function unusedGuestQuota(
  overrides: Partial<GuestQuotaPort> = {},
): GuestQuotaPort {
  const unexpected = async () => {
    throw new Error('unexpected guestQuota call');
  };
  return {
    tryAdmitDailyRun: unexpected,
    releaseDailyRun: unexpected,
    tryAdmitDailyRating: unexpected,
    deleteDailyRatings: unexpected,
    ...overrides,
  };
}

function makeUser(overrides: Partial<AuthUser> = {}): AuthUser {
  return {
    id: USER_ID,
    email: 'user@example.com',
    role: 'user',
    isActive: true,
    verifiedAt: CREATED_AT,
    createdAt: CREATED_AT,
    updatedAt: CREATED_AT,
    ...overrides,
  };
}

function makeGuest(overrides: Partial<AuthUser> = {}): AuthUser {
  return makeUser({
    id: GUEST_ID,
    email: 'guest@example.com',
    role: 'guest',
    ...overrides,
  });
}

function makeUseCase(deps: {
  prisma: PrismaService;
  users: UserRepository;
  guestPurge?: GuestPurgePort;
  feedbackPurge?: FeedbackPurgePort;
  guestQuota?: GuestQuotaPort;
  abortRegistry?: RunAbortRegistry;
}): DeleteUserUseCase {
  return new DeleteUserUseCase(
    deps.prisma,
    deps.users,
    deps.guestPurge ?? unusedGuestPurge(),
    deps.feedbackPurge ?? unusedFeedbackPurge(),
    deps.guestQuota ?? unusedGuestQuota(),
    deps.abortRegistry ?? new RunAbortRegistry(),
  );
}

describe('DeleteUserUseCase', () => {
  it('D-25/D-72: soft-deletes a user without calling guest purge ports', async () => {
    const tx = makeSoftTx();
    const hasLiveRuns = jest.fn(async () => true);
    const deleteRunTree = jest.fn(async () => {
      throw new Error('guestPurge.deleteRunTree must not run for role=user');
    });
    const useCase = makeUseCase({
      prisma: mockPrisma(tx),
      users: unusedUsers({ findById: async () => makeUser() }),
      guestPurge: unusedGuestPurge({ hasLiveRuns, deleteRunTree }),
    });

    await expect(
      useCase.execute(USER_ID, ACTOR, { purge: false }),
    ).resolves.toEqual({ ok: true });

    expect(tx.user.update).toHaveBeenCalledWith({
      where: { id: USER_ID },
      data: { isActive: false },
    });
    expect(tx.refreshSession.deleteMany).toHaveBeenCalledWith({
      where: { userId: USER_ID },
    });
    expect(tx.accountActivation.deleteMany).toHaveBeenCalledWith({
      where: { userId: USER_ID },
    });
    expect(tx.user.delete).not.toHaveBeenCalled();
    expect(hasLiveRuns).not.toHaveBeenCalled();
    expect(deleteRunTree).not.toHaveBeenCalled();
  });

  it('soft-deletes a user even when purge=true and never touches guestPurge delete', async () => {
    const tx = makeSoftTx();
    const hasLiveRuns = jest.fn(async () => true);
    const deleteRunTree = jest.fn();
    const deleteDailyRatings = jest.fn(async () => true);
    const useCase = makeUseCase({
      prisma: mockPrisma(tx),
      users: unusedUsers({ findById: async () => makeUser() }),
      guestPurge: unusedGuestPurge({ hasLiveRuns, deleteRunTree }),
      guestQuota: unusedGuestQuota({ deleteDailyRatings }),
    });

    await expect(
      useCase.execute(USER_ID, ACTOR, { purge: true }),
    ).resolves.toEqual({ ok: true });

    expect(hasLiveRuns).not.toHaveBeenCalled();
    expect(deleteRunTree).not.toHaveBeenCalled();
    expect(deleteDailyRatings).not.toHaveBeenCalled();
    expect(tx.user.update).toHaveBeenCalled();
  });

  it('D-63: hard-deletes a guest without live runs and clears redis ratings', async () => {
    const tx = makeHardTx();
    const hasLiveRuns = jest.fn(async () => false);
    const listLiveRunIds = jest.fn(async (): Promise<RunId[]> => []);
    const deleteRunTree = jest.fn(async () => ({
      runIds: [RUN_ID] as readonly string[],
      deletedRuns: 1,
    }));
    const deleteForGuest = jest.fn(async () => 2);
    const deleteDailyRatings = jest.fn(async () => true);
    const abortRegistry = new RunAbortRegistry();
    const requestCancel = jest.spyOn(abortRegistry, 'requestCancel');

    const useCase = makeUseCase({
      prisma: mockPrisma(tx),
      users: unusedUsers({ findById: async () => makeGuest() }),
      guestPurge: unusedGuestPurge({
        hasLiveRuns,
        listLiveRunIds,
        deleteRunTree,
      }),
      feedbackPurge: unusedFeedbackPurge({ deleteForGuest }),
      guestQuota: unusedGuestQuota({ deleteDailyRatings }),
      abortRegistry,
    });

    await expect(
      useCase.execute(GUEST_ID, ACTOR, { purge: false }),
    ).resolves.toEqual({ ok: true });

    expect(hasLiveRuns).toHaveBeenCalledWith(GUEST_ID);
    expect(listLiveRunIds).not.toHaveBeenCalled();
    expect(requestCancel).not.toHaveBeenCalled();
    expect(deleteRunTree).toHaveBeenCalledWith(GUEST_ID, tx);
    expect(deleteForGuest).toHaveBeenCalledWith(GUEST_ID, [RUN_ID], tx);
    expect(tx.refreshSession.deleteMany).toHaveBeenCalledWith({
      where: { userId: GUEST_ID },
    });
    expect(tx.accountActivation.deleteMany).toHaveBeenCalledWith({
      where: { userId: GUEST_ID },
    });
    expect(tx.user.delete).toHaveBeenCalledWith({ where: { id: GUEST_ID } });
    expect(deleteDailyRatings).toHaveBeenCalledWith(GUEST_ID);
  });

  it('D-64: rejects guest with live runs without purge with GUEST_HAS_ACTIVE_RUN and skips delete', async () => {
    const tx = makeHardTx();
    const hasLiveRuns = jest.fn(async () => true);
    const deleteRunTree = jest.fn();
    const deleteDailyRatings = jest.fn(async () => true);
    const useCase = makeUseCase({
      prisma: mockPrisma(tx),
      users: unusedUsers({ findById: async () => makeGuest() }),
      guestPurge: unusedGuestPurge({ hasLiveRuns, deleteRunTree }),
      guestQuota: unusedGuestQuota({ deleteDailyRatings }),
    });

    await expect(
      useCase.execute(GUEST_ID, ACTOR, { purge: false }),
    ).rejects.toMatchObject({
      name: 'DomainException',
      code: 'GUEST_HAS_ACTIVE_RUN',
      httpStatus: 409,
      message: 'Guest has an active run',
    });

    expect(hasLiveRuns).toHaveBeenCalledWith(GUEST_ID);
    expect(deleteRunTree).not.toHaveBeenCalled();
    expect(tx.user.delete).not.toHaveBeenCalled();
    expect(deleteDailyRatings).not.toHaveBeenCalled();
  });

  it('D-65: purges guest with live runs: aborts then hard-deletes tree', async () => {
    const tx = makeHardTx();
    const liveIds = [
      RUN_ID,
      createRunId('run_22222222-2222-4222-8222-222222222222'),
    ];
    const hasLiveRuns = jest.fn(async () => true);
    const listLiveRunIds = jest.fn(async () => liveIds);
    const deleteRunTree = jest.fn(async () => ({
      runIds: liveIds,
      deletedRuns: 2,
    }));
    const deleteForGuest = jest.fn(async () => 0);
    const deleteDailyRatings = jest.fn(async () => false);
    const abortRegistry = new RunAbortRegistry();
    const requestCancel = jest.spyOn(abortRegistry, 'requestCancel');

    const useCase = makeUseCase({
      prisma: mockPrisma(tx),
      users: unusedUsers({ findById: async () => makeGuest() }),
      guestPurge: unusedGuestPurge({
        hasLiveRuns,
        listLiveRunIds,
        deleteRunTree,
      }),
      feedbackPurge: unusedFeedbackPurge({ deleteForGuest }),
      guestQuota: unusedGuestQuota({ deleteDailyRatings }),
      abortRegistry,
    });

    await expect(
      useCase.execute(GUEST_ID, ACTOR, { purge: true }),
    ).resolves.toEqual({ ok: true });

    expect(listLiveRunIds).toHaveBeenCalledWith(GUEST_ID);
    expect(requestCancel).toHaveBeenCalledTimes(2);
    expect(requestCancel).toHaveBeenNthCalledWith(1, liveIds[0]);
    expect(requestCancel).toHaveBeenNthCalledWith(2, liveIds[1]);
    expect(deleteRunTree).toHaveBeenCalledWith(GUEST_ID, tx);
    expect(tx.user.delete).toHaveBeenCalledWith({ where: { id: GUEST_ID } });
    expect(deleteDailyRatings).toHaveBeenCalledWith(GUEST_ID);
  });

  it('D-66: rejects an admin target with FORBIDDEN and skips soft/hard work', async () => {
    const tx = makeSoftTx();
    const hasLiveRuns = jest.fn(async () => false);
    const useCase = makeUseCase({
      prisma: mockPrisma(tx),
      users: unusedUsers({
        findById: async () =>
          makeUser({
            id: ADMIN_ID,
            email: 'admin-target@example.com',
            role: 'admin',
          }),
      }),
      guestPurge: unusedGuestPurge({ hasLiveRuns }),
    });

    await expect(
      useCase.execute(ADMIN_ID, ACTOR, { purge: false }),
    ).rejects.toMatchObject({
      name: 'DomainException',
      code: 'FORBIDDEN',
      httpStatus: 403,
      message: 'Cannot delete the admin account',
    });

    expect(tx.user.update).not.toHaveBeenCalled();
    expect(tx.user.delete).not.toHaveBeenCalled();
    expect(hasLiveRuns).not.toHaveBeenCalled();
  });

  it('rejects an invalid user id format with VALIDATION_FAILED and skips lookup', async () => {
    const findById = jest.fn(async () => makeUser());
    const useCase = makeUseCase({
      prisma: mockPrisma(makeSoftTx()),
      users: unusedUsers({ findById }),
    });

    await expect(
      useCase.execute('not-a-user-id', ACTOR, { purge: false }),
    ).rejects.toMatchObject({
      name: 'DomainException',
      code: 'VALIDATION_FAILED',
      httpStatus: 400,
      message: 'Invalid user ID',
    });
    expect(findById).not.toHaveBeenCalled();
  });

  it('rejects a missing user with USER_NOT_FOUND', async () => {
    const tx = makeSoftTx();
    const useCase = makeUseCase({
      prisma: mockPrisma(tx),
      users: unusedUsers({ findById: async () => null }),
    });

    await expect(
      useCase.execute(USER_ID, ACTOR, { purge: false }),
    ).rejects.toMatchObject({
      name: 'DomainException',
      code: 'USER_NOT_FOUND',
      httpStatus: 404,
      message: 'User not found',
    });
    expect(tx.user.update).not.toHaveBeenCalled();
  });

  it('D-67: hard-deletes a legacy inactive guest without requiring purge', async () => {
    const tx = makeHardTx();
    const hasLiveRuns = jest.fn(async () => false);
    const deleteRunTree = jest.fn(async () => ({
      runIds: [] as readonly string[],
      deletedRuns: 0,
    }));
    const deleteForGuest = jest.fn(async () => 0);
    const deleteDailyRatings = jest.fn(async () => true);

    const useCase = makeUseCase({
      prisma: mockPrisma(tx),
      users: unusedUsers({
        findById: async () => makeGuest({ isActive: false }),
      }),
      guestPurge: unusedGuestPurge({ hasLiveRuns, deleteRunTree }),
      feedbackPurge: unusedFeedbackPurge({ deleteForGuest }),
      guestQuota: unusedGuestQuota({ deleteDailyRatings }),
    });

    await expect(
      useCase.execute(GUEST_ID, ACTOR, { purge: false }),
    ).resolves.toEqual({ ok: true });

    expect(hasLiveRuns).toHaveBeenCalledWith(GUEST_ID);
    expect(deleteRunTree).toHaveBeenCalledWith(GUEST_ID, tx);
    expect(tx.user.delete).toHaveBeenCalledWith({ where: { id: GUEST_ID } });
    expect(deleteDailyRatings).toHaveBeenCalledWith(GUEST_ID);
  });
});
