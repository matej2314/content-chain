import { createInvitationId, createUserId } from '@content-chain/shared';
import { Prisma } from '@prisma/client';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { validateEnv } from '../../shared/config/env.schema';
import type { AuthUser } from '../domain/auth-user.types';
import type {
  AccountActivationRepository,
  CreatePendingUser,
} from '../domain/account-activation-repository.port';
import type {
  InvitationRecord,
  InvitationRepository,
} from '../domain/invitation-repository.port';
import type {
  TransactionalMailer,
  UserActivationMail,
} from '../domain/transactional-mailer.port';
import type {
  CreateUserData,
  UserForAuth,
  UserRepository,
} from '../domain/user-repository.port';
import { RegisterUserUseCase } from './register-user.use-case';

const USER_ID = createUserId('usr_11111111-1111-4111-8111-111111111111');
const ADMIN_ID = createUserId('usr_22222222-2222-4222-8222-222222222222');
const INVITATION_ID = createInvitationId(
  'inv_11111111-1111-4111-8111-111111111111',
);
const CREATED_AT = new Date('2026-01-01T00:00:00.000Z');
const REGISTER_EMAIL = 'new.user@example.com';
const PASSWORD = 'ValidPassword1!';

const TEST_ENV = validateEnv({
  NODE_ENV: 'test',
  DATABASE_URL: 'file:./test.db',
  GATEWAY_BASE_URL: 'http://localhost:3100',
  GATEWAY_KEY: 'test-gateway-key',
  JWT_SECRET: 'test-jwt-secret',
  CORS_ORIGIN: 'http://localhost:3000',
  APP_PUBLIC_URL: 'http://localhost:3000',
  INVITE_TTL: '7d',
  ACTIVATION_TTL: '7d',
});

const PROD_ENV = validateEnv({
  NODE_ENV: 'production',
  DATABASE_URL: 'file:./test.db',
  GATEWAY_BASE_URL: 'http://localhost:3100',
  GATEWAY_KEY: 'test-gateway-key',
  JWT_SECRET: 'test-jwt-secret',
  CORS_ORIGIN: 'http://localhost:3000',
  APP_PUBLIC_URL: 'http://localhost:3000',
  INVITE_TTL: '7d',
  ACTIVATION_TTL: '7d',
  MAIL_FROM: 'noreply@example.com',
  SMTP_HOST: 'smtp.example.com',
  SMTP_PORT: 587,
  SMTP_USER: 'smtp-user',
  SMTP_PASS: 'smtp-pass',
});

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

function unusedInvitations(
  overrides: Partial<InvitationRepository> = {},
): InvitationRepository {
  const unexpected = async () => {
    throw new Error('unexpected invitation repository call');
  };
  return {
    createPending: unexpected,
    findPendingByEmail: unexpected,
    listPending: unexpected,
    findById: unexpected,
    findPendingByHash: unexpected,
    rotateToken: unexpected,
    revoke: unexpected,
    markAccepted: unexpected,
    acceptAndCreateUser: unexpected,
    ...overrides,
  };
}

function unusedActivations(
  overrides: Partial<AccountActivationRepository> = {},
): AccountActivationRepository {
  const unexpected = async () => {
    throw new Error('unexpected activation repository call');
  };
  return {
    createPendingUser: unexpected,
    findValidByTokenHash: unexpected,
    findValidByUserId: unexpected,
    consumeAndVerify: unexpected,
    rotateToken: unexpected,
    deleteByUserId: unexpected,
    ...overrides,
  };
}

function unusedMailer(
  overrides: Partial<TransactionalMailer> = {},
): TransactionalMailer {
  return {
    send: async () => {
      throw new Error('unexpected mailer call');
    },
    ...overrides,
  };
}

function makeUserForAuth(overrides: Partial<UserForAuth> = {}): UserForAuth {
  return {
    id: USER_ID,
    email: REGISTER_EMAIL,
    role: 'user',
    isActive: true,
    verifiedAt: CREATED_AT,
    createdAt: CREATED_AT,
    updatedAt: CREATED_AT,
    passwordHash: 'hash',
    ...overrides,
  };
}

function makeInvitation(
  overrides: Partial<InvitationRecord> = {},
): InvitationRecord {
  return {
    id: INVITATION_ID,
    email: REGISTER_EMAIL,
    tokenHash: 'hash',
    purpose: 'invite',
    status: 'pending',
    expiresAt: new Date('2026-01-08T00:00:00.000Z'),
    invitedByUserId: ADMIN_ID,
    createdAt: CREATED_AT,
    ...overrides,
  };
}

function makeAuthUser(overrides: Partial<AuthUser> = {}): AuthUser {
  return {
    id: USER_ID,
    email: REGISTER_EMAIL,
    role: 'user',
    isActive: true,
    verifiedAt: CREATED_AT,
    createdAt: CREATED_AT,
    updatedAt: CREATED_AT,
    ...overrides,
  };
}

describe('RegisterUserUseCase', () => {
  it('registers in non-prod via users.create with verifiedAt set and without activation mail (D-42)', async () => {
    const create = jest.fn(
      async (data: CreateUserData): Promise<AuthUser> =>
        makeAuthUser({
          id: data.id,
          email: data.email,
          role: data.role,
          verifiedAt: data.verifiedAt,
        }),
    );
    const createPendingUser = jest.fn(
      async (_input: CreatePendingUser): Promise<AuthUser> =>
        makeAuthUser({ verifiedAt: null }),
    );
    const send = jest.fn(
      async (_mail: UserActivationMail): Promise<void> => undefined,
    );
    const useCase = new RegisterUserUseCase(
      unusedUsers({
        findForAuth: async () => null,
        create,
      }),
      unusedInvitations({
        findPendingByEmail: async () => null,
      }),
      unusedActivations({ createPendingUser }),
      unusedMailer({ send }),
      TEST_ENV,
    );

    const result = await useCase.execute({
      email: REGISTER_EMAIL,
      password: PASSWORD,
    });

    expect(result.user.email).toBe(REGISTER_EMAIL);
    expect(result.user.role).toBe('user');
    expect(result.user.verifiedAt).toEqual(expect.any(Date));
    expect(create).toHaveBeenCalledTimes(1);
    expect(create.mock.calls[0]?.[0]).toMatchObject({
      email: REGISTER_EMAIL,
      role: 'user',
      verifiedAt: expect.any(Date),
    });
    expect(createPendingUser).not.toHaveBeenCalled();
    expect(send).not.toHaveBeenCalled();
  });

  it('registers in production as pending with activation mail (D-41)', async () => {
    const create = jest.fn(
      async (_data: CreateUserData): Promise<AuthUser> => makeAuthUser(),
    );
    const createPendingUser = jest.fn(
      async (input: CreatePendingUser): Promise<AuthUser> =>
        makeAuthUser({
          id: input.user.id,
          email: input.user.email,
          role: input.user.role,
          verifiedAt: null,
        }),
    );
    const send = jest.fn(
      async (_mail: UserActivationMail): Promise<void> => undefined,
    );
    const useCase = new RegisterUserUseCase(
      unusedUsers({
        findForAuth: async () => null,
        create,
      }),
      unusedInvitations({
        findPendingByEmail: async () => null,
      }),
      unusedActivations({ createPendingUser }),
      unusedMailer({ send }),
      PROD_ENV,
    );

    const result = await useCase.execute({
      email: REGISTER_EMAIL,
      password: PASSWORD,
    });

    expect(result.user).toMatchObject({
      email: REGISTER_EMAIL,
      role: 'user',
      verifiedAt: null,
    });
    expect(create).not.toHaveBeenCalled();
    expect(createPendingUser).toHaveBeenCalledTimes(1);
    expect(createPendingUser.mock.calls[0]?.[0]).toMatchObject({
      user: {
        email: REGISTER_EMAIL,
        role: 'user',
        verifiedAt: null,
      },
      activation: {
        tokenHash: expect.any(String),
        expiresAt: expect.any(Date),
      },
    });
    expect(send).toHaveBeenCalledTimes(1);
    const mail = send.mock.calls[0]?.[0];
    expect(mail).toMatchObject({
      kind: 'user_activation',
      to: REGISTER_EMAIL,
    });
    expect(mail?.rawToken.length).toBeGreaterThan(0);
    expect(mail?.activateUrl).toContain('/?activationToken=');
    expect(mail?.activateUrl).toContain(mail?.rawToken);
  });

  it('rejects an existing active email with CONFLICT and does not create (D-43)', async () => {
    const create = jest.fn(
      async (_data: CreateUserData): Promise<AuthUser> => makeAuthUser(),
    );
    const createPendingUser = jest.fn(
      async (_input: CreatePendingUser): Promise<AuthUser> =>
        makeAuthUser({ verifiedAt: null }),
    );
    const useCase = new RegisterUserUseCase(
      unusedUsers({
        findForAuth: async () => makeUserForAuth({ isActive: true }),
        create,
      }),
      unusedInvitations(),
      unusedActivations({ createPendingUser }),
      unusedMailer(),
      TEST_ENV,
    );

    await expect(
      useCase.execute({ email: REGISTER_EMAIL, password: PASSWORD }),
    ).rejects.toMatchObject({
      name: 'DomainException',
      code: 'CONFLICT',
      httpStatus: 409,
      message: 'Email already in use',
    });
    expect(create).not.toHaveBeenCalled();
    expect(createPendingUser).not.toHaveBeenCalled();
  });

  it('rejects a soft-deleted email with CONFLICT and does not create (D-43)', async () => {
    const create = jest.fn(
      async (_data: CreateUserData): Promise<AuthUser> => makeAuthUser(),
    );
    const createPendingUser = jest.fn(
      async (_input: CreatePendingUser): Promise<AuthUser> =>
        makeAuthUser({ verifiedAt: null }),
    );
    const useCase = new RegisterUserUseCase(
      unusedUsers({
        findForAuth: async () => makeUserForAuth({ isActive: false }),
        create,
      }),
      unusedInvitations(),
      unusedActivations({ createPendingUser }),
      unusedMailer(),
      TEST_ENV,
    );

    await expect(
      useCase.execute({ email: REGISTER_EMAIL, password: PASSWORD }),
    ).rejects.toMatchObject({
      name: 'DomainException',
      code: 'CONFLICT',
      httpStatus: 409,
      message: 'Email already in use',
    });
    expect(create).not.toHaveBeenCalled();
    expect(createPendingUser).not.toHaveBeenCalled();
  });

  it('revokes a pending invitation before creating the user (D-46)', async () => {
    const revoke = jest.fn(async () => undefined);
    const create = jest.fn(
      async (data: CreateUserData): Promise<AuthUser> =>
        makeAuthUser({
          id: data.id,
          email: data.email,
          role: data.role,
          verifiedAt: data.verifiedAt,
        }),
    );
    const useCase = new RegisterUserUseCase(
      unusedUsers({
        findForAuth: async () => null,
        create,
      }),
      unusedInvitations({
        findPendingByEmail: async () => makeInvitation(),
        revoke,
      }),
      unusedActivations(),
      unusedMailer(),
      TEST_ENV,
    );

    const result = await useCase.execute({
      email: REGISTER_EMAIL,
      password: PASSWORD,
    });

    expect(revoke).toHaveBeenCalledWith(INVITATION_ID);
    expect(create).toHaveBeenCalledTimes(1);
    expect(result.user.role).toBe('user');
    expect(revoke.mock.invocationCallOrder[0]).toBeLessThan(
      create.mock.invocationCallOrder[0] ?? Number.POSITIVE_INFINITY,
    );
  });

  it('maps production SMTP failure to MAIL_DELIVERY_FAILED with user id; pending user remains', async () => {
    const pendingUser = makeAuthUser({
      id: USER_ID,
      verifiedAt: null,
    });
    const createPendingUser = jest.fn(
      async (_input: CreatePendingUser): Promise<AuthUser> => pendingUser,
    );
    const useCase = new RegisterUserUseCase(
      unusedUsers({
        findForAuth: async () => null,
      }),
      unusedInvitations({
        findPendingByEmail: async () => null,
      }),
      unusedActivations({ createPendingUser }),
      unusedMailer({
        send: async () => {
          throw new Error('smtp down');
        },
      }),
      PROD_ENV,
    );

    const error = await useCase
      .execute({ email: REGISTER_EMAIL, password: PASSWORD })
      .catch((err: unknown) => err);

    expect(error).toBeInstanceOf(DomainException);
    expect(error).toMatchObject({
      code: 'MAIL_DELIVERY_FAILED',
      httpStatus: 503,
      message: 'Mail delivery failed',
      details: [{ id: USER_ID }],
    });
    expect(createPendingUser).toHaveBeenCalledTimes(1);
  });

  it('maps a unique constraint race on create to CONFLICT', async () => {
    const useCase = new RegisterUserUseCase(
      unusedUsers({
        findForAuth: async () => null,
        create: async () => {
          throw new Prisma.PrismaClientKnownRequestError(
            'Unique constraint failed',
            {
              code: 'P2002',
              clientVersion: 'test',
            },
          );
        },
      }),
      unusedInvitations({
        findPendingByEmail: async () => null,
      }),
      unusedActivations(),
      unusedMailer(),
      TEST_ENV,
    );

    await expect(
      useCase.execute({ email: REGISTER_EMAIL, password: PASSWORD }),
    ).rejects.toMatchObject({
      name: 'DomainException',
      code: 'CONFLICT',
      httpStatus: 409,
      message: 'Email already in use',
    });
  });

  it('rejects a weak password with VALIDATION_FAILED and does not create', async () => {
    const create = jest.fn(
      async (_data: CreateUserData): Promise<AuthUser> => makeAuthUser(),
    );
    const findPendingByEmail = jest.fn(async () => null);
    const useCase = new RegisterUserUseCase(
      unusedUsers({
        findForAuth: async () => null,
        create,
      }),
      unusedInvitations({ findPendingByEmail }),
      unusedActivations(),
      unusedMailer(),
      TEST_ENV,
    );

    await expect(
      useCase.execute({ email: REGISTER_EMAIL, password: 'short' }),
    ).rejects.toMatchObject({
      name: 'DomainException',
      code: 'VALIDATION_FAILED',
      httpStatus: 400,
      message: 'Password must be at least 12 characters long',
    });
    expect(findPendingByEmail).not.toHaveBeenCalled();
    expect(create).not.toHaveBeenCalled();
  });

  it('rejects unknown body keys with VALIDATION_FAILED', async () => {
    const findForAuth = jest.fn(async () => null);
    const useCase = new RegisterUserUseCase(
      unusedUsers({ findForAuth }),
      unusedInvitations(),
      unusedActivations(),
      unusedMailer(),
      TEST_ENV,
    );

    await expect(
      useCase.execute({
        email: REGISTER_EMAIL,
        password: PASSWORD,
        role: 'admin',
      }),
    ).rejects.toMatchObject({
      name: 'DomainException',
      code: 'VALIDATION_FAILED',
      httpStatus: 400,
    });
    expect(findForAuth).not.toHaveBeenCalled();
  });
});
