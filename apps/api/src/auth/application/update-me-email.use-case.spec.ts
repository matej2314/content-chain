import { hash as bcryptHash } from 'bcrypt';
import { createUserId } from '@content-chain/shared';
import type { AuthUser } from '../domain/auth-user.types';
import type {
  UserForAuth,
  UserRepository,
} from '../domain/user-repository.port';
import { UpdateMeEmailUseCase } from './update-me-email.use-case';

const ID = createUserId('usr_11111111-1111-4111-8111-111111111111');
const PASSWORD = 'ValidPassword1!';
const WRONG_PASSWORD = 'WrongPassword1!';

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
    ...overrides,
  };
}

describe('UpdateMeEmailUseCase', () => {
  it('updates own email after re-auth and returns { id, email, role }', async () => {
    const current = await userForAuth();
    const updateEmail = jest.fn(async () =>
      user({ email: 'next@example.com' }),
    );
    const uc = new UpdateMeEmailUseCase(
      unusedUsers({
        findForAuth: async (email) => {
          if (email === current.email) return current;
          return null;
        },
        updateEmail,
      }),
    );
    await expect(
      uc.execute(
        { id: ID, email: 'me@example.com', role: 'user' },
        { email: 'next@example.com', currentPassword: PASSWORD },
      ),
    ).resolves.toEqual({
      id: ID,
      email: 'next@example.com',
      role: 'user',
    });
    expect(updateEmail).toHaveBeenCalledWith(ID, 'next@example.com');
  });

  it('same email + valid password → 200 no-op; occupied → 409 after re-auth', async () => {
    const current = await userForAuth();
    const updateEmail = jest.fn(async () => user());
    const same = new UpdateMeEmailUseCase(
      unusedUsers({
        findForAuth: async (email) =>
          email === current.email ? current : null,
        updateEmail,
      }),
    );
    await expect(
      same.execute(
        { id: ID, email: 'me@example.com', role: 'user' },
        { email: 'me@example.com', currentPassword: PASSWORD },
      ),
    ).resolves.toEqual({ id: ID, email: 'me@example.com', role: 'user' });
    expect(updateEmail).not.toHaveBeenCalled();

    const occupied: UserForAuth = {
      ...(await userForAuth({
        id: createUserId('usr_22222222-2222-4222-8222-222222222222'),
        email: 'taken@example.com',
      })),
    };
    const conflict = new UpdateMeEmailUseCase(
      unusedUsers({
        findForAuth: async (email) => {
          if (email === current.email) return current;
          if (email === 'taken@example.com') return occupied;
          return null;
        },
      }),
    );
    await expect(
      conflict.execute(
        { id: ID, email: 'me@example.com', role: 'user' },
        { email: 'taken@example.com', currentPassword: PASSWORD },
      ),
    ).rejects.toMatchObject({ code: 'CONFLICT', httpStatus: 409 });
  });

  it('wrong password → INVALID_PASSWORD even when target email is occupied', async () => {
    const current = await userForAuth();
    const occupied: UserForAuth = {
      ...(await userForAuth({
        id: createUserId('usr_22222222-2222-4222-8222-222222222222'),
        email: 'taken@example.com',
      })),
    };
    const updateEmail = jest.fn(async () => user());
    const uc = new UpdateMeEmailUseCase(
      unusedUsers({
        findForAuth: async (email) => {
          if (email === current.email) return current;
          if (email === 'taken@example.com') return occupied;
          return null;
        },
        updateEmail,
      }),
    );
    await expect(
      uc.execute(
        { id: ID, email: 'me@example.com', role: 'user' },
        { email: 'taken@example.com', currentPassword: WRONG_PASSWORD },
      ),
    ).rejects.toMatchObject({
      code: 'INVALID_PASSWORD',
      message: 'Invalid password',
      httpStatus: 401,
    });
    expect(updateEmail).not.toHaveBeenCalled();
  });

  it('rejects missing currentPassword / bad shape with VALIDATION_FAILED', async () => {
    const current = await userForAuth();
    const uc = new UpdateMeEmailUseCase(
      unusedUsers({
        findForAuth: async () => current,
      }),
    );
    await expect(
      uc.execute(
        { id: ID, email: 'me@example.com', role: 'user' },
        { email: 'next@example.com' },
      ),
    ).rejects.toMatchObject({ code: 'VALIDATION_FAILED' });

    await expect(
      uc.execute(
        { id: ID, email: 'me@example.com', role: 'user' },
        { email: 'next@example.com', currentPassword: '' },
      ),
    ).rejects.toMatchObject({ code: 'VALIDATION_FAILED' });

    await expect(
      uc.execute(
        { id: ID, email: 'me@example.com', role: 'user' },
        {
          email: 'next@example.com',
          currentPassword: PASSWORD,
          role: 'admin',
        },
      ),
    ).rejects.toMatchObject({ code: 'VALIDATION_FAILED' });
  });

  it('rejects inactive or missing session user with 401 UNAUTHORIZED', async () => {
    const updateEmail = jest.fn(async () => user());
    const inactive = await userForAuth({ isActive: false });
    const inactiveUc = new UpdateMeEmailUseCase(
      unusedUsers({
        findForAuth: async () => inactive,
        updateEmail,
      }),
    );
    await expect(
      inactiveUc.execute(
        { id: ID, email: 'me@example.com', role: 'user' },
        { email: 'next@example.com', currentPassword: PASSWORD },
      ),
    ).rejects.toMatchObject({ code: 'UNAUTHORIZED', httpStatus: 401 });
    expect(updateEmail).not.toHaveBeenCalled();

    const missing = new UpdateMeEmailUseCase(
      unusedUsers({
        findForAuth: async () => null,
        updateEmail,
      }),
    );
    await expect(
      missing.execute(
        { id: ID, email: 'me@example.com', role: 'user' },
        { email: 'next@example.com', currentPassword: PASSWORD },
      ),
    ).rejects.toMatchObject({ code: 'UNAUTHORIZED', httpStatus: 401 });
  });

  it('returns 409 when email is occupied by soft-deleted user (after re-auth)', async () => {
    const current = await userForAuth();
    const softDeleted: UserForAuth = {
      ...(await userForAuth({
        id: createUserId('usr_22222222-2222-4222-8222-222222222222'),
        email: 'taken@example.com',
        isActive: false,
      })),
    };
    const updateEmail = jest.fn(async () => user());
    const uc = new UpdateMeEmailUseCase(
      unusedUsers({
        findForAuth: async (email) => {
          if (email === current.email) return current;
          if (email === 'taken@example.com') return softDeleted;
          return null;
        },
        updateEmail,
      }),
    );
    await expect(
      uc.execute(
        { id: ID, email: 'me@example.com', role: 'user' },
        { email: 'taken@example.com', currentPassword: PASSWORD },
      ),
    ).rejects.toMatchObject({ code: 'CONFLICT', httpStatus: 409 });
    expect(updateEmail).not.toHaveBeenCalled();
  });
});
