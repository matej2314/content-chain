import { createUserId, type UserId } from '@content-chain/shared';
import { DomainException } from '../../shared/exceptions/domain.exception';
import type { AuthUser } from '../domain/auth-user.types';
import type { UserRepository } from '../domain/user-repository.port';
import { ReactivateUserUseCase } from './reactivate-user.use-case';

const USER_ID = createUserId('usr_11111111-1111-4111-8111-111111111111');
const ADMIN_ID = createUserId('usr_22222222-2222-4222-8222-222222222222');
const CREATED_AT = new Date('2026-01-01T00:00:00.000Z');
const PATCH_BODY = { isActive: true as const };

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

function makeUser(overrides: Partial<AuthUser> = {}): AuthUser {
  return {
    id: USER_ID,
    email: 'user@example.com',
    role: 'user',
    isActive: false,
    createdAt: CREATED_AT,
    updatedAt: CREATED_AT,
    ...overrides,
  };
}

function makeUseCase(users: UserRepository): ReactivateUserUseCase {
  return new ReactivateUserUseCase(users);
}

describe('ReactivateUserUseCase', () => {
  it('reactivates an inactive user and returns isActive true', async () => {
    const user = makeUser({ isActive: false });
    const setActive = jest.fn(
      async (_id: UserId, _isActive: boolean): Promise<void> => undefined,
    );
    const useCase = makeUseCase(
      unusedUsers({
        findById: async () => user,
        setActive,
      }),
    );

    await expect(useCase.execute(USER_ID, PATCH_BODY)).resolves.toEqual({
      id: user.id,
      email: user.email,
      role: user.role,
      isActive: true,
      createdAt: user.createdAt,
    });
    expect(setActive).toHaveBeenCalledTimes(1);
    expect(setActive).toHaveBeenCalledWith(USER_ID, true);
  });

  it('is idempotent for an already active user and skips setActive', async () => {
    const user = makeUser({ isActive: true });
    const setActive = jest.fn(
      async (_id: UserId, _isActive: boolean): Promise<void> => undefined,
    );
    const useCase = makeUseCase(
      unusedUsers({
        findById: async () => user,
        setActive,
      }),
    );

    await expect(useCase.execute(USER_ID, PATCH_BODY)).resolves.toEqual({
      id: user.id,
      email: user.email,
      role: user.role,
      isActive: true,
      createdAt: user.createdAt,
    });
    expect(setActive).not.toHaveBeenCalled();
  });

  it('rejects an admin target with FORBIDDEN and skips setActive', async () => {
    const admin = makeUser({
      id: ADMIN_ID,
      email: 'admin@example.com',
      role: 'admin',
      isActive: false,
    });
    const setActive = jest.fn(
      async (_id: UserId, _isActive: boolean): Promise<void> => undefined,
    );
    const useCase = makeUseCase(
      unusedUsers({
        findById: async () => admin,
        setActive,
      }),
    );

    const error = await useCase
      .execute(ADMIN_ID, PATCH_BODY)
      .catch((err: unknown) => err);

    expect(error).toBeInstanceOf(DomainException);
    expect(error).toMatchObject({
      code: 'FORBIDDEN',
      httpStatus: 403,
      message: 'Cannot update the admin account',
    });
    expect(setActive).not.toHaveBeenCalled();
  });

  it('rejects a missing user with USER_NOT_FOUND', async () => {
    const setActive = jest.fn(
      async (_id: UserId, _isActive: boolean): Promise<void> => undefined,
    );
    const useCase = makeUseCase(
      unusedUsers({
        findById: async () => null,
        setActive,
      }),
    );

    await expect(useCase.execute(USER_ID, PATCH_BODY)).rejects.toMatchObject({
      name: 'DomainException',
      code: 'USER_NOT_FOUND',
      httpStatus: 404,
      message: 'User not found',
    });
    expect(setActive).not.toHaveBeenCalled();
  });

  it('rejects an invalid user id format with VALIDATION_FAILED and skips lookup', async () => {
    const findById = jest.fn(async () => makeUser());
    const setActive = jest.fn(
      async (_id: UserId, _isActive: boolean): Promise<void> => undefined,
    );
    const useCase = makeUseCase(unusedUsers({ findById, setActive }));

    await expect(
      useCase.execute('not-a-user-id', PATCH_BODY),
    ).rejects.toMatchObject({
      name: 'DomainException',
      code: 'VALIDATION_FAILED',
      httpStatus: 400,
      message: 'Invalid user ID',
    });
    expect(findById).not.toHaveBeenCalled();
    expect(setActive).not.toHaveBeenCalled();
  });

  it.each([{ isActive: false }, { isActive: true, role: 'admin' }])(
    'rejects body %j with VALIDATION_FAILED and skips lookup',
    async (body) => {
      const findById = jest.fn(async () => makeUser());
      const setActive = jest.fn(
        async (_id: UserId, _isActive: boolean): Promise<void> => undefined,
      );
      const useCase = makeUseCase(unusedUsers({ findById, setActive }));

      await expect(useCase.execute(USER_ID, body)).rejects.toMatchObject({
        name: 'DomainException',
        code: 'VALIDATION_FAILED',
        httpStatus: 400,
        message: 'Application command validation failed',
      });
      expect(findById).not.toHaveBeenCalled();
      expect(setActive).not.toHaveBeenCalled();
    },
  );
});
