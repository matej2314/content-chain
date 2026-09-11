import { createUserId } from '@content-chain/shared';
import type { AuthUser, AuthUserContext } from '../domain/auth-user.types';
import type { UserRepository } from '../domain/user-repository.port';
import { MeUseCase } from './me.use-case';

const USER_ID = createUserId('usr_11111111-1111-4111-8111-111111111111');
const CREATED_AT = new Date('2026-01-01T00:00:00.000Z');

const CONTEXT: AuthUserContext = {
  id: USER_ID,
  email: 'stale@example.com',
  role: 'user',
};

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
    isActive: true,
    createdAt: CREATED_AT,
    updatedAt: CREATED_AT,
    ...overrides,
  };
}

describe('MeUseCase', () => {
  it('returns id, email and role from the stored active user', async () => {
    const user = makeUser({ email: 'from-db@example.com', role: 'admin' });
    const useCase = new MeUseCase(
      unusedUsers({
        findById: async () => user,
      }),
    );

    await expect(useCase.execute(CONTEXT)).resolves.toEqual({
      id: USER_ID,
      email: 'from-db@example.com',
      role: 'admin',
    });
  });

  it('rejects a missing user with UNAUTHORIZED', async () => {
    const useCase = new MeUseCase(
      unusedUsers({
        findById: async () => null,
      }),
    );

    await expect(useCase.execute(CONTEXT)).rejects.toMatchObject({
      name: 'DomainException',
      code: 'UNAUTHORIZED',
      httpStatus: 401,
      message: 'User not found or inactive',
    });
  });

  it('rejects an inactive user with the same UNAUTHORIZED as a missing user', async () => {
    const useCase = new MeUseCase(
      unusedUsers({
        findById: async () => makeUser({ isActive: false }),
      }),
    );

    await expect(useCase.execute(CONTEXT)).rejects.toMatchObject({
      name: 'DomainException',
      code: 'UNAUTHORIZED',
      httpStatus: 401,
      message: 'User not found or inactive',
    });
  });
});
