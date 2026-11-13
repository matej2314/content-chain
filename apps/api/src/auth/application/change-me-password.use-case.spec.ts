import { hash as bcryptHash } from 'bcrypt';
import { createUserId } from '@content-chain/shared';
import type { AuthUser } from '../domain/auth-user.types';
import type { RefreshSessionRepository } from '../domain/refresh-session.repository.port';
import type {
  UserForAuth,
  UserRepository,
} from '../domain/user-repository.port';
import { ChangeMePasswordUseCase } from './change-me-password.use-case';

const ID = createUserId('usr_11111111-1111-4111-8111-111111111111');
const PASSWORD = 'ValidPassword1!';
const NEW_PASSWORD = 'AnotherValid1!';
const WRONG_PASSWORD = 'WrongPassword1!';
const WEAK_PASSWORD = 'short';

function user(overrides: Partial<AuthUser> = {}): AuthUser {
  return {
    id: ID,
    email: 'me@example.com',
    role: 'user',
    isActive: true,
    verifiedAt: new Date('2026-01-01T00:00:00.000Z'),
    createdAt: new Date('2026-01-01T00:00:00.000Z'),
    updatedAt: new Date('2026-01-01T00:00:00.000Z'),
    ...overrides,
  };
}

async function userForAuth(
  overrides: Partial<UserForAuth> = {},
): Promise<UserForAuth> {
  const base = user();
  return {
    ...base,
    passwordHash: await bcryptHash(PASSWORD, 4),
    ...overrides,
    id: overrides.id ?? base.id,
    email: overrides.email ?? base.email,
  };
}

function unusedUsers(overrides: Partial<UserRepository> = {}): UserRepository {
  const unexpected = async () => {
    throw new Error('unexpected');
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
    updatePassword: unexpected,
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

describe('ChangeMePasswordUseCase', () => {
  it('success → updatePassword + deleteByUser', async () => {
    const current = await userForAuth();
    const updatePassword = jest.fn(async () => undefined);
    const deleteByUser = jest.fn(async () => undefined);
    const uc = new ChangeMePasswordUseCase(
      unusedUsers({
        findForAuth: async (email) =>
          email === current.email ? current : null,
        updatePassword,
      }),
      unusedSessions({ deleteByUser }),
    );

    await expect(
      uc.execute(
        { id: ID, email: 'me@example.com', role: 'user' },
        { currentPassword: PASSWORD, newPassword: NEW_PASSWORD },
      ),
    ).resolves.toEqual({ ok: true });

    expect(updatePassword).toHaveBeenCalledWith(ID, expect.any(String));
    expect(deleteByUser).toHaveBeenCalledWith(ID);
  });

  it('wrong current → INVALID_PASSWORD without deleteByUser', async () => {
    const current = await userForAuth();
    const updatePassword = jest.fn(async () => undefined);
    const deleteByUser = jest.fn(async () => undefined);
    const uc = new ChangeMePasswordUseCase(
      unusedUsers({
        findForAuth: async (email) =>
          email === current.email ? current : null,
        updatePassword,
      }),
      unusedSessions({ deleteByUser }),
    );

    await expect(
      uc.execute(
        { id: ID, email: 'me@example.com', role: 'user' },
        { currentPassword: WRONG_PASSWORD, newPassword: NEW_PASSWORD },
      ),
    ).rejects.toMatchObject({
      code: 'INVALID_PASSWORD',
      message: 'Invalid password',
      httpStatus: 401,
    });

    expect(updatePassword).not.toHaveBeenCalled();
    expect(deleteByUser).not.toHaveBeenCalled();
  });

  it('weak new → VALIDATION_FAILED without deleteByUser', async () => {
    const current = await userForAuth();
    const updatePassword = jest.fn(async () => undefined);
    const deleteByUser = jest.fn(async () => undefined);
    const uc = new ChangeMePasswordUseCase(
      unusedUsers({
        findForAuth: async (email) =>
          email === current.email ? current : null,
        updatePassword,
      }),
      unusedSessions({ deleteByUser }),
    );

    await expect(
      uc.execute(
        { id: ID, email: 'me@example.com', role: 'user' },
        { currentPassword: PASSWORD, newPassword: WEAK_PASSWORD },
      ),
    ).rejects.toMatchObject({
      code: 'VALIDATION_FAILED',
      httpStatus: 400,
    });

    expect(updatePassword).not.toHaveBeenCalled();
    expect(deleteByUser).not.toHaveBeenCalled();
  });
});
