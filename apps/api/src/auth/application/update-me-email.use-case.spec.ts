import { createUserId } from '@content-chain/shared';
import type { AuthUser } from '../domain/auth-user.types';
import type {
  UserForAuth,
  UserRepository,
} from '../domain/user-repository.port';
import { UpdateMeEmailUseCase } from './update-me-email.use-case';

const ID = createUserId('usr_11111111-1111-4111-8111-111111111111');

function user(overrides: Partial<AuthUser> = {}): AuthUser {
  return {
    id: ID,
    email: 'me@example.com',
    role: 'user',
    isActive: true,
    createdAt: new Date('2026-01-01T00:00:00.000Z'),
    updatedAt: new Date('2026-01-01T00:00:00.000Z'),
    ...overrides,
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
    list: unexpected,
    updateEmail: unexpected,
    ...overrides,
  };
}

describe('UpdateMeEmailUseCase', () => {
  it('updates own email and returns { id, email, role }', async () => {
    const updateEmail = jest.fn(async () =>
      user({ email: 'next@example.com' }),
    );
    const uc = new UpdateMeEmailUseCase(
      unusedUsers({
        findById: async () => user(),
        findForAuth: async () => null,
        updateEmail,
      }),
    );
    await expect(
      uc.execute(
        { id: ID, email: 'me@example.com', role: 'user' },
        { email: 'next@example.com' },
      ),
    ).resolves.toEqual({
      id: ID,
      email: 'next@example.com',
      role: 'user',
    });
    expect(updateEmail).toHaveBeenCalledWith(ID, 'next@example.com');
  });

  it('returns 200 no-op when email unchanged; 409 when occupied; 400 on bad shape', async () => {
    const updateEmail = jest.fn(async () => user());
    const same = new UpdateMeEmailUseCase(
      unusedUsers({
        findById: async () => user(),
        updateEmail,
      }),
    );
    await expect(
      same.execute(
        { id: ID, email: 'me@example.com', role: 'user' },
        { email: 'me@example.com' },
      ),
    ).resolves.toEqual({ id: ID, email: 'me@example.com', role: 'user' });
    expect(updateEmail).not.toHaveBeenCalled();

    const occupied: UserForAuth = {
      ...user({
        id: createUserId('usr_22222222-2222-4222-8222-222222222222'),
        email: 'taken@example.com',
      }),
      passwordHash: 'hash',
    };
    const conflict = new UpdateMeEmailUseCase(
      unusedUsers({
        findById: async () => user(),
        findForAuth: async () => occupied,
      }),
    );
    await expect(
      conflict.execute(
        { id: ID, email: 'me@example.com', role: 'user' },
        { email: 'taken@example.com' },
      ),
    ).rejects.toMatchObject({ code: 'CONFLICT', httpStatus: 409 });

    const bad = new UpdateMeEmailUseCase(
      unusedUsers({ findById: async () => user() }),
    );
    await expect(
      bad.execute(
        { id: ID, email: 'me@example.com', role: 'user' },
        { email: 'not-an-email', role: 'admin' },
      ),
    ).rejects.toMatchObject({ code: 'VALIDATION_FAILED' });
  });

  it('rejects inactive or missing user with 401', async () => {
    const updateEmail = jest.fn(async () => user());
    const inactive = new UpdateMeEmailUseCase(
      unusedUsers({
        findById: async () => user({ isActive: false }),
        updateEmail,
      }),
    );
    await expect(
      inactive.execute(
        { id: ID, email: 'me@example.com', role: 'user' },
        { email: 'next@example.com' },
      ),
    ).rejects.toMatchObject({ code: 'UNAUTHORIZED', httpStatus: 401 });
    expect(updateEmail).not.toHaveBeenCalled();

    const missing = new UpdateMeEmailUseCase(
      unusedUsers({
        findById: async () => null,
        updateEmail,
      }),
    );
    await expect(
      missing.execute(
        { id: ID, email: 'me@example.com', role: 'user' },
        { email: 'next@example.com' },
      ),
    ).rejects.toMatchObject({ code: 'UNAUTHORIZED', httpStatus: 401 });
    expect(updateEmail).not.toHaveBeenCalled();
  });

  it('returns 409 when email is occupied by soft-deleted user', async () => {
    const updateEmail = jest.fn(async () => user());
    const softDeleted: UserForAuth = {
      ...user({
        id: createUserId('usr_22222222-2222-4222-8222-222222222222'),
        email: 'taken@example.com',
        isActive: false,
      }),
      passwordHash: 'hash',
    };
    const uc = new UpdateMeEmailUseCase(
      unusedUsers({
        findById: async () => user(),
        findForAuth: async () => softDeleted,
        updateEmail,
      }),
    );
    await expect(
      uc.execute(
        { id: ID, email: 'me@example.com', role: 'user' },
        { email: 'taken@example.com' },
      ),
    ).rejects.toMatchObject({ code: 'CONFLICT', httpStatus: 409 });
    expect(updateEmail).not.toHaveBeenCalled();
  });
});
