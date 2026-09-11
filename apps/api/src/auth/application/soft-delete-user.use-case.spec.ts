import { createUserId, type UserId } from '@content-chain/shared';
import type { AuthUser } from '../domain/auth-user.types';
import type { RefreshSessionRepository } from '../domain/refresh-session.repository.port';
import type { UserRepository } from '../domain/user-repository.port';
import { SoftDeleteUserUseCase } from './soft-delete-user.use-case';

const USER_ID = createUserId('usr_11111111-1111-4111-8111-111111111111');
const ADMIN_ID = createUserId('usr_22222222-2222-4222-8222-222222222222');
const CREATED_AT = new Date('2026-01-01T00:00:00.000Z');

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
    list: unexpected,
    ...overrides,
  };
}

function unusedSessions(
  overrides: Partial<RefreshSessionRepository> = {},
): RefreshSessionRepository {
  const unexpected = async () => {
    throw new Error('unexpected session repository call');
  };
  return {
    create: unexpected,
    findValid: unexpected,
    findValidByHash: unexpected,
    rotate: unexpected,
    deleteById: unexpected,
    deleteByUser: unexpected,
    ...overrides,
  };
}

function makeUser(overrides: Partial<AuthUser> = {}): AuthUser {
  return {
    id: USER_ID,
    email: 'user@example.com',
    role: 'user',
    isActive: true,
    createdAt: CREATED_AT,
    updatedAt: CREATED_AT,
    ...overrides,
  };
}

describe('SoftDeleteUserUseCase', () => {
  it('deactivates a user and deletes refresh sessions', async () => {
    const setActive = jest.fn(
      async (_id: UserId, _isActive: boolean): Promise<void> => undefined,
    );
    const deleteByUser = jest.fn(
      async (_id: UserId): Promise<void> => undefined,
    );
    const useCase = new SoftDeleteUserUseCase(
      unusedUsers({
        findById: async () => makeUser(),
        setActive,
      }),
      unusedSessions({ deleteByUser }),
    );

    await expect(useCase.execute(USER_ID)).resolves.toEqual({ ok: true });
    expect(setActive).toHaveBeenCalledWith(USER_ID, false);
    expect(deleteByUser).toHaveBeenCalledWith(USER_ID);
  });

  it('rejects an invalid user id format with VALIDATION_FAILED and skips lookup', async () => {
    const findById = jest.fn(async () => makeUser());
    const setActive = jest.fn(
      async (_id: UserId, _isActive: boolean): Promise<void> => undefined,
    );
    const deleteByUser = jest.fn(
      async (_id: UserId): Promise<void> => undefined,
    );
    const useCase = new SoftDeleteUserUseCase(
      unusedUsers({ findById, setActive }),
      unusedSessions({ deleteByUser }),
    );

    await expect(useCase.execute('not-a-user-id')).rejects.toMatchObject({
      name: 'DomainException',
      code: 'VALIDATION_FAILED',
      httpStatus: 400,
      message: 'Invalid user ID',
    });
    expect(findById).not.toHaveBeenCalled();
    expect(setActive).not.toHaveBeenCalled();
    expect(deleteByUser).not.toHaveBeenCalled();
  });

  it('rejects a missing user with USER_NOT_FOUND', async () => {
    const setActive = jest.fn(
      async (_id: UserId, _isActive: boolean): Promise<void> => undefined,
    );
    const deleteByUser = jest.fn(
      async (_id: UserId): Promise<void> => undefined,
    );
    const useCase = new SoftDeleteUserUseCase(
      unusedUsers({
        findById: async () => null,
        setActive,
      }),
      unusedSessions({ deleteByUser }),
    );

    await expect(useCase.execute(USER_ID)).rejects.toMatchObject({
      name: 'DomainException',
      code: 'USER_NOT_FOUND',
      httpStatus: 404,
      message: 'User not found',
    });
    expect(setActive).not.toHaveBeenCalled();
    expect(deleteByUser).not.toHaveBeenCalled();
  });

  it('rejects an admin target with FORBIDDEN and skips deactivate', async () => {
    const setActive = jest.fn(
      async (_id: UserId, _isActive: boolean): Promise<void> => undefined,
    );
    const deleteByUser = jest.fn(
      async (_id: UserId): Promise<void> => undefined,
    );
    const useCase = new SoftDeleteUserUseCase(
      unusedUsers({
        findById: async () =>
          makeUser({
            id: ADMIN_ID,
            email: 'admin@example.com',
            role: 'admin',
          }),
        setActive,
      }),
      unusedSessions({ deleteByUser }),
    );

    await expect(useCase.execute(ADMIN_ID)).rejects.toMatchObject({
      name: 'DomainException',
      code: 'FORBIDDEN',
      httpStatus: 403,
      message: 'Cannot deactivate the admin account',
    });
    expect(setActive).not.toHaveBeenCalled();
    expect(deleteByUser).not.toHaveBeenCalled();
  });
});
