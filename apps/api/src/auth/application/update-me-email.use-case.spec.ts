import { hash as bcryptHash } from 'bcrypt';
import {
  createEmailChangeRequestId,
  createUserId,
} from '@content-chain/shared';
import { validateEnv } from '../../shared/config/env.schema';
import type { AuthUser } from '../domain/auth-user.types';
import type {
  EmailChangeRequestRecord,
  EmailChangeRequestRepository,
  UpsertEmailChangeRequestInput,
} from '../domain/email-change-request.repository.port';
import type {
  EmailChangeConfirmMail,
  TransactionalMailer,
} from '../domain/transactional-mailer.port';
import type {
  UserForAuth,
  UserRepository,
} from '../domain/user-repository.port';
import { UpdateMeEmailUseCase } from './update-me-email.use-case';

const ID = createUserId('usr_11111111-1111-4111-8111-111111111111');
const OTHER_ID = createUserId('usr_22222222-2222-4222-8222-222222222222');
const PASSWORD = 'ValidPassword1!';
const WRONG_PASSWORD = 'WrongPassword1!';
const CREATED_AT = new Date('2026-01-01T00:00:00.000Z');

const TEST_ENV = validateEnv({
  NODE_ENV: 'test',
  DATABASE_URL:
    'postgresql://cc:cc@127.0.0.1:5432/content_chain_test?schema=public',
  GATEWAY_BASE_URL: 'http://localhost:3100',
  GATEWAY_KEY: 'test-gateway-key',
  JWT_SECRET: 'test-jwt-secret',
  CORS_ORIGIN: 'http://localhost:3000',
  APP_PUBLIC_URL: 'http://localhost:3000',
  EMAIL_CHANGE_TTL: '24h',
});

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

function unusedEmailChanges(
  overrides: Partial<EmailChangeRequestRepository> = {},
): EmailChangeRequestRepository {
  const unexpected = async () => {
    throw new Error('unexpected email-change repository call');
  };
  return {
    upsertForUser: unexpected,
    findByUserId: unexpected,
    findValidByTokenHash: unexpected,
    findByPendingEmail: unexpected,
    rotateToken: unexpected,
    consumeAndApplyEmail: unexpected,
    deleteByUserId: unexpected,
    ...overrides,
  };
}

function unusedMailer(
  overrides: Partial<TransactionalMailer> = {},
): TransactionalMailer {
  return {
    send: async () => undefined,
    ...overrides,
  };
}

function makePending(
  overrides: Partial<EmailChangeRequestRecord> = {},
): EmailChangeRequestRecord {
  return {
    id: createEmailChangeRequestId(
      'ecr_11111111-1111-4111-8111-111111111111',
    ),
    userId: ID,
    pendingEmail: 'next@example.com',
    tokenHash: 'hash',
    expiresAt: new Date('2026-01-02T00:00:00.000Z'),
    createdAt: CREATED_AT,
    ...overrides,
  };
}

describe('UpdateMeEmailUseCase', () => {
  it('creates pending + sends email_change_confirm; does not update User.email', async () => {
    const current = await userForAuth();
    const updateEmail = jest.fn(async () => user({ email: 'next@example.com' }));
    const upsertForUser = jest.fn(
      async (input: UpsertEmailChangeRequestInput) =>
        makePending({
          id: input.id,
          userId: input.userId,
          pendingEmail: input.pendingEmail,
          tokenHash: input.tokenHash,
          expiresAt: input.expiresAt,
        }),
    );
    const send = jest.fn(async () => undefined);
    const uc = new UpdateMeEmailUseCase(
      unusedUsers({
        findForAuth: async (email) => {
          if (email === current.email) return current;
          return null;
        },
        updateEmail,
      }),
      unusedEmailChanges({
        findByPendingEmail: async () => null,
        upsertForUser,
      }),
      unusedMailer({ send }),
      TEST_ENV,
    );

    await expect(
      uc.execute(
        { id: ID, email: 'me@example.com', role: 'user' },
        { email: 'next@example.com', currentPassword: PASSWORD },
      ),
    ).resolves.toEqual({
      id: ID,
      email: 'me@example.com',
      role: 'user',
      pendingEmail: 'next@example.com',
    });

    expect(updateEmail).not.toHaveBeenCalled();
    expect(upsertForUser).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: ID,
        pendingEmail: 'next@example.com',
      }),
    );
    expect(send).toHaveBeenCalledWith(
      expect.objectContaining({
        kind: 'email_change_confirm',
        to: 'next@example.com',
        confirmUrl: expect.stringContaining('/?emailChangeToken='),
      } satisfies Partial<EmailChangeConfirmMail>),
    );
  });

  it('same email + valid password → 200 with pendingEmail; no upsert', async () => {
    const current = await userForAuth();
    const upsertForUser = jest.fn(async () => makePending());
    const same = new UpdateMeEmailUseCase(
      unusedUsers({
        findForAuth: async (email) =>
          email === current.email ? current : null,
      }),
      unusedEmailChanges({
        findByUserId: async () =>
          makePending({ pendingEmail: 'other-pending@example.com' }),
        upsertForUser,
      }),
      unusedMailer(),
      TEST_ENV,
    );
    await expect(
      same.execute(
        { id: ID, email: 'me@example.com', role: 'user' },
        { email: 'me@example.com', currentPassword: PASSWORD },
      ),
    ).resolves.toEqual({
      id: ID,
      email: 'me@example.com',
      role: 'user',
      pendingEmail: 'other-pending@example.com',
    });
    expect(upsertForUser).not.toHaveBeenCalled();
  });

  it('occupied User.email or foreign pending → 409 after re-auth', async () => {
    const current = await userForAuth();
    const occupied: UserForAuth = {
      ...(await userForAuth({
        id: OTHER_ID,
        email: 'taken@example.com',
      })),
    };
    const conflictUser = new UpdateMeEmailUseCase(
      unusedUsers({
        findForAuth: async (email) => {
          if (email === current.email) return current;
          if (email === 'taken@example.com') return occupied;
          return null;
        },
      }),
      unusedEmailChanges(),
      unusedMailer(),
      TEST_ENV,
    );
    await expect(
      conflictUser.execute(
        { id: ID, email: 'me@example.com', role: 'user' },
        { email: 'taken@example.com', currentPassword: PASSWORD },
      ),
    ).rejects.toMatchObject({ code: 'CONFLICT', httpStatus: 409 });

    const conflictPending = new UpdateMeEmailUseCase(
      unusedUsers({
        findForAuth: async (email) =>
          email === current.email ? current : null,
      }),
      unusedEmailChanges({
        findByPendingEmail: async () =>
          makePending({
            userId: OTHER_ID,
            pendingEmail: 'pending-taken@example.com',
          }),
      }),
      unusedMailer(),
      TEST_ENV,
    );
    await expect(
      conflictPending.execute(
        { id: ID, email: 'me@example.com', role: 'user' },
        { email: 'pending-taken@example.com', currentPassword: PASSWORD },
      ),
    ).rejects.toMatchObject({ code: 'CONFLICT', httpStatus: 409 });
  });

  it('wrong password → INVALID_PASSWORD even when target email is occupied', async () => {
    const current = await userForAuth();
    const occupied: UserForAuth = {
      ...(await userForAuth({
        id: OTHER_ID,
        email: 'taken@example.com',
      })),
    };
    const updateEmail = jest.fn(async () => user());
    const upsertForUser = jest.fn(async () => makePending());
    const uc = new UpdateMeEmailUseCase(
      unusedUsers({
        findForAuth: async (email) => {
          if (email === current.email) return current;
          if (email === 'taken@example.com') return occupied;
          return null;
        },
        updateEmail,
      }),
      unusedEmailChanges({ upsertForUser }),
      unusedMailer(),
      TEST_ENV,
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
    expect(upsertForUser).not.toHaveBeenCalled();
  });

  it('SMTP failure → 503 MAIL_DELIVERY_FAILED; pending upsert already done', async () => {
    const current = await userForAuth();
    const upsertForUser = jest.fn(
      async (input: UpsertEmailChangeRequestInput) =>
        makePending({
          id: input.id,
          pendingEmail: input.pendingEmail,
        }),
    );
    const uc = new UpdateMeEmailUseCase(
      unusedUsers({
        findForAuth: async (email) =>
          email === current.email ? current : null,
      }),
      unusedEmailChanges({
        findByPendingEmail: async () => null,
        upsertForUser,
      }),
      unusedMailer({
        send: async () => {
          throw new Error('smtp down');
        },
      }),
      TEST_ENV,
    );
    await expect(
      uc.execute(
        { id: ID, email: 'me@example.com', role: 'user' },
        { email: 'next@example.com', currentPassword: PASSWORD },
      ),
    ).rejects.toMatchObject({
      code: 'MAIL_DELIVERY_FAILED',
      httpStatus: 503,
      details: [{ id: ID }],
    });
    expect(upsertForUser).toHaveBeenCalled();
  });

  it('rejects missing currentPassword / bad shape with VALIDATION_FAILED', async () => {
    const current = await userForAuth();
    const uc = new UpdateMeEmailUseCase(
      unusedUsers({
        findForAuth: async () => current,
      }),
      unusedEmailChanges(),
      unusedMailer(),
      TEST_ENV,
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
    const upsertForUser = jest.fn(async () => makePending());
    const inactive = await userForAuth({ isActive: false });
    const inactiveUc = new UpdateMeEmailUseCase(
      unusedUsers({
        findForAuth: async () => inactive,
        updateEmail,
      }),
      unusedEmailChanges({ upsertForUser }),
      unusedMailer(),
      TEST_ENV,
    );
    await expect(
      inactiveUc.execute(
        { id: ID, email: 'me@example.com', role: 'user' },
        { email: 'next@example.com', currentPassword: PASSWORD },
      ),
    ).rejects.toMatchObject({ code: 'UNAUTHORIZED', httpStatus: 401 });
    expect(updateEmail).not.toHaveBeenCalled();
    expect(upsertForUser).not.toHaveBeenCalled();

    const missing = new UpdateMeEmailUseCase(
      unusedUsers({
        findForAuth: async () => null,
        updateEmail,
      }),
      unusedEmailChanges({ upsertForUser }),
      unusedMailer(),
      TEST_ENV,
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
        id: OTHER_ID,
        email: 'taken@example.com',
        isActive: false,
      })),
    };
    const updateEmail = jest.fn(async () => user());
    const upsertForUser = jest.fn(async () => makePending());
    const uc = new UpdateMeEmailUseCase(
      unusedUsers({
        findForAuth: async (email) => {
          if (email === current.email) return current;
          if (email === 'taken@example.com') return softDeleted;
          return null;
        },
        updateEmail,
      }),
      unusedEmailChanges({ upsertForUser }),
      unusedMailer(),
      TEST_ENV,
    );
    await expect(
      uc.execute(
        { id: ID, email: 'me@example.com', role: 'user' },
        { email: 'taken@example.com', currentPassword: PASSWORD },
      ),
    ).rejects.toMatchObject({ code: 'CONFLICT', httpStatus: 409 });
    expect(updateEmail).not.toHaveBeenCalled();
    expect(upsertForUser).not.toHaveBeenCalled();
  });
});
