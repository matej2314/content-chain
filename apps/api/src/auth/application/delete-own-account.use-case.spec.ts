import { hash as bcryptHash } from 'bcrypt';
import { createUserId } from '@content-chain/shared';
import { DomainException } from '../../shared/exceptions/domain.exception';
import type { AuthUserContext } from '../domain/auth-user.types';
import type {
  UserForAuth,
  UserRepository,
} from '../domain/user-repository.port';
import { DeleteOwnAccountUseCase } from './delete-own-account.use-case';
import type { DeleteUserUseCase } from './delete-user.use-case';

const ID = createUserId('usr_11111111-1111-4111-8111-111111111111');
const ADMIN_ID = createUserId('usr_22222222-2222-4222-8222-222222222222');
const GUEST_ID = createUserId('usr_33333333-3333-4333-8333-333333333333');
const PASSWORD = 'ValidPassword1!';
const WRONG_PASSWORD = 'WrongPassword1!';

const USER_CTX: AuthUserContext = {
  id: ID,
  email: 'me@example.com',
  role: 'user',
};

const ADMIN_CTX: AuthUserContext = {
  id: ADMIN_ID,
  email: 'admin@example.com',
  role: 'admin',
};

const GUEST_CTX: AuthUserContext = {
  id: GUEST_ID,
  email: 'guest@example.com',
  role: 'guest',
};

async function userForAuth(
  overrides: Partial<UserForAuth> = {},
): Promise<UserForAuth> {
  const now = new Date('2026-01-01T00:00:00.000Z');
  return {
    id: ID,
    email: 'me@example.com',
    role: 'user',
    isActive: true,
    verifiedAt: now,
    createdAt: now,
    updatedAt: now,
    passwordHash: await bcryptHash(PASSWORD, 4),
    ...overrides,
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
    updatePassword: unexpected,
    ...overrides,
  };
}

function mockDeleteUser(
  execute: DeleteUserUseCase['execute'] = jest.fn(async () => ({ ok: true })),
): DeleteUserUseCase {
  return { execute } as unknown as DeleteUserUseCase;
}

describe('DeleteOwnAccountUseCase', () => {
  it('D-93: user soft → calls deleteUser with self id and options', async () => {
    const current = await userForAuth();
    const execute = jest.fn(async () => ({ ok: true }));
    const uc = new DeleteOwnAccountUseCase(
      unusedUsers({
        findForAuth: async (email) =>
          email === current.email ? current : null,
      }),
      mockDeleteUser(execute),
    );

    await expect(
      uc.execute(USER_CTX, { currentPassword: PASSWORD }, { purge: false }),
    ).resolves.toEqual({ ok: true });

    expect(execute).toHaveBeenCalledWith(ID, USER_CTX, { purge: false });
  });

  it('D-93: admin → 403 from DeleteUserUseCase without swallowing', async () => {
    const current = await userForAuth({
      id: ADMIN_ID,
      email: 'admin@example.com',
      role: 'admin',
    });
    const execute = jest.fn(async () => {
      throw new DomainException(
        'FORBIDDEN',
        'Cannot delete the admin account',
        403,
      );
    });
    const uc = new DeleteOwnAccountUseCase(
      unusedUsers({
        findForAuth: async (email) =>
          email === current.email ? current : null,
      }),
      mockDeleteUser(execute),
    );

    await expect(
      uc.execute(ADMIN_CTX, { currentPassword: PASSWORD }, { purge: false }),
    ).rejects.toMatchObject({
      name: 'DomainException',
      code: 'FORBIDDEN',
      httpStatus: 403,
    });
    expect(execute).toHaveBeenCalledWith(ADMIN_ID, ADMIN_CTX, {
      purge: false,
    });
  });

  it('D-93: wrong password → INVALID_PASSWORD without deleteUser', async () => {
    const current = await userForAuth();
    const execute = jest.fn(async () => ({ ok: true }));
    const uc = new DeleteOwnAccountUseCase(
      unusedUsers({
        findForAuth: async (email) =>
          email === current.email ? current : null,
      }),
      mockDeleteUser(execute),
    );

    await expect(
      uc.execute(
        USER_CTX,
        { currentPassword: WRONG_PASSWORD },
        { purge: false },
      ),
    ).rejects.toMatchObject({
      name: 'DomainException',
      code: 'INVALID_PASSWORD',
      httpStatus: 401,
      message: 'Invalid password',
    });
    expect(execute).not.toHaveBeenCalled();
  });

  it('D-93: guest live without purge → GUEST_HAS_ACTIVE_RUN via deleteUser', async () => {
    const current = await userForAuth({
      id: GUEST_ID,
      email: 'guest@example.com',
      role: 'guest',
    });
    const execute = jest.fn(async () => {
      throw new DomainException(
        'GUEST_HAS_ACTIVE_RUN',
        'Guest has an active run',
        409,
      );
    });
    const uc = new DeleteOwnAccountUseCase(
      unusedUsers({
        findForAuth: async (email) =>
          email === current.email ? current : null,
      }),
      mockDeleteUser(execute),
    );

    await expect(
      uc.execute(GUEST_CTX, { currentPassword: PASSWORD }, { purge: false }),
    ).rejects.toMatchObject({
      name: 'DomainException',
      code: 'GUEST_HAS_ACTIVE_RUN',
      httpStatus: 409,
    });
    expect(execute).toHaveBeenCalledWith(GUEST_ID, GUEST_CTX, {
      purge: false,
    });
  });
});
