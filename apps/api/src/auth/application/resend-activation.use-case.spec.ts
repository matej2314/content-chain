import {
  createAccountActivationId,
  createUserId,
} from '@content-chain/shared';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { validateEnv } from '../../shared/config/env.schema';
import type {
  AccountActivationRecord,
  AccountActivationRepository,
  RotateActivationTokenInput,
} from '../domain/account-activation-repository.port';
import type {
  TransactionalMailer,
  UserActivationMail,
} from '../domain/transactional-mailer.port';
import type {
  UserForAuth,
  UserRepository,
} from '../domain/user-repository.port';
import { ResendActivationUseCase } from './resend-activation.use-case';
import { SoftEmailRateLimiter } from './soft-email-rate-limiter';

const USER_ID = createUserId('usr_11111111-1111-4111-8111-111111111111');
const ACTIVATION_ID = createAccountActivationId(
  'act_11111111-1111-4111-8111-111111111111',
);
const CREATED_AT = new Date('2026-01-01T00:00:00.000Z');
const EXPIRES_AT = new Date('2026-12-01T00:00:00.000Z');
const PENDING_EMAIL = 'pending.user@example.com';

const SUCCESS = { message: 'Wiadomość wysłana ponownie' as const };

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

function makePendingUser(overrides: Partial<UserForAuth> = {}): UserForAuth {
  return {
    id: USER_ID,
    email: PENDING_EMAIL,
    role: 'user',
    isActive: true,
    verifiedAt: null,
    createdAt: CREATED_AT,
    updatedAt: CREATED_AT,
    passwordHash: 'hash',
    ...overrides,
  };
}

function makeActivation(
  overrides: Partial<AccountActivationRecord> = {},
): AccountActivationRecord {
  return {
    id: ACTIVATION_ID,
    userId: USER_ID,
    tokenHash: 'old-hash',
    expiresAt: EXPIRES_AT,
    createdAt: CREATED_AT,
    ...overrides,
  };
}

function makeUseCase(deps: {
  users?: UserRepository;
  activations?: AccountActivationRepository;
  mailer?: TransactionalMailer;
  rateLimiter?: SoftEmailRateLimiter;
}): ResendActivationUseCase {
  return new ResendActivationUseCase(
    deps.users ?? unusedUsers(),
    deps.activations ?? unusedActivations(),
    deps.mailer ?? unusedMailer(),
    TEST_ENV,
    deps.rateLimiter ?? new SoftEmailRateLimiter(5, 15 * 60 * 1000),
  );
}

describe('ResendActivationUseCase', () => {
  it('rotates token and sends activation mail for a pending account (D-44 / A-13)', async () => {
    const existing = makeActivation();
    const rotateToken = jest.fn(
      async (
        input: RotateActivationTokenInput,
      ): Promise<AccountActivationRecord> => ({
        ...existing,
        tokenHash: input.tokenHash,
        expiresAt: input.expiresAt,
      }),
    );
    const send = jest.fn(
      async (_mail: UserActivationMail): Promise<void> => undefined,
    );
    const useCase = makeUseCase({
      users: unusedUsers({
        findForAuth: async () => makePendingUser(),
      }),
      activations: unusedActivations({
        findValidByUserId: async () => existing,
        rotateToken,
      }),
      mailer: unusedMailer({ send }),
    });

    await expect(
      useCase.execute({ email: PENDING_EMAIL }),
    ).resolves.toEqual(SUCCESS);

    expect(rotateToken).toHaveBeenCalledTimes(1);
    expect(rotateToken.mock.calls[0]?.[0]).toMatchObject({
      userId: USER_ID,
      tokenHash: expect.any(String),
      expiresAt: expect.any(Date),
    });
    expect(send).toHaveBeenCalledTimes(1);
    const mail = send.mock.calls[0]?.[0];
    expect(mail).toMatchObject({
      kind: 'user_activation',
      to: PENDING_EMAIL,
      activationId: ACTIVATION_ID,
    });
    expect(mail?.rawToken.length).toBeGreaterThan(0);
    expect(mail?.activateUrl).toBe(
      `http://localhost:3000/?activationToken=${mail?.rawToken}`,
    );
  });

  it('returns the same SUCCESS when the email has no account (D-44)', async () => {
    const findValidByUserId = jest.fn(async () => makeActivation());
    const send = jest.fn(async () => undefined);
    const useCase = makeUseCase({
      users: unusedUsers({
        findForAuth: async () => null,
      }),
      activations: unusedActivations({ findValidByUserId }),
      mailer: unusedMailer({ send }),
    });

    await expect(
      useCase.execute({ email: 'missing@example.com' }),
    ).resolves.toEqual(SUCCESS);
    expect(findValidByUserId).not.toHaveBeenCalled();
    expect(send).not.toHaveBeenCalled();
  });

  it('returns the same SUCCESS for an inactive (soft-deleted) account (D-44)', async () => {
    const findValidByUserId = jest.fn(async () => makeActivation());
    const send = jest.fn(async () => undefined);
    const useCase = makeUseCase({
      users: unusedUsers({
        findForAuth: async () => makePendingUser({ isActive: false }),
      }),
      activations: unusedActivations({ findValidByUserId }),
      mailer: unusedMailer({ send }),
    });

    await expect(
      useCase.execute({ email: PENDING_EMAIL }),
    ).resolves.toEqual(SUCCESS);
    expect(findValidByUserId).not.toHaveBeenCalled();
    expect(send).not.toHaveBeenCalled();
  });

  it('returns the same SUCCESS when the account is already verified (D-44)', async () => {
    const findValidByUserId = jest.fn(async () => makeActivation());
    const send = jest.fn(async () => undefined);
    const useCase = makeUseCase({
      users: unusedUsers({
        findForAuth: async () =>
          makePendingUser({ verifiedAt: CREATED_AT }),
      }),
      activations: unusedActivations({ findValidByUserId }),
      mailer: unusedMailer({ send }),
    });

    await expect(
      useCase.execute({ email: PENDING_EMAIL }),
    ).resolves.toEqual(SUCCESS);
    expect(findValidByUserId).not.toHaveBeenCalled();
    expect(send).not.toHaveBeenCalled();
  });

  it('returns the same SUCCESS when pending user has no activation row (D-44)', async () => {
    const rotateToken = jest.fn(
      async (
        _input: RotateActivationTokenInput,
      ): Promise<AccountActivationRecord> => makeActivation(),
    );
    const send = jest.fn(async () => undefined);
    const useCase = makeUseCase({
      users: unusedUsers({
        findForAuth: async () => makePendingUser(),
      }),
      activations: unusedActivations({
        findValidByUserId: async () => null,
        rotateToken,
      }),
      mailer: unusedMailer({ send }),
    });

    await expect(
      useCase.execute({ email: PENDING_EMAIL }),
    ).resolves.toEqual(SUCCESS);
    expect(rotateToken).not.toHaveBeenCalled();
    expect(send).not.toHaveBeenCalled();
  });

  it('returns SUCCESS without mail when rotateToken fails (race / missing row)', async () => {
    const send = jest.fn(async () => undefined);
    const useCase = makeUseCase({
      users: unusedUsers({
        findForAuth: async () => makePendingUser(),
      }),
      activations: unusedActivations({
        findValidByUserId: async () => makeActivation(),
        rotateToken: async () => {
          throw new Error('activation gone');
        },
      }),
      mailer: unusedMailer({ send }),
    });

    await expect(
      useCase.execute({ email: PENDING_EMAIL }),
    ).resolves.toEqual(SUCCESS);
    expect(send).not.toHaveBeenCalled();
  });

  it('returns SUCCESS without 503 when SMTP fails after rotation (D-44 / A-13)', async () => {
    const existing = makeActivation();
    const rotateToken = jest.fn(
      async (
        input: RotateActivationTokenInput,
      ): Promise<AccountActivationRecord> => ({
        ...existing,
        tokenHash: input.tokenHash,
        expiresAt: input.expiresAt,
      }),
    );
    const useCase = makeUseCase({
      users: unusedUsers({
        findForAuth: async () => makePendingUser(),
      }),
      activations: unusedActivations({
        findValidByUserId: async () => existing,
        rotateToken,
      }),
      mailer: unusedMailer({
        send: async () => {
          throw new Error('smtp down');
        },
      }),
    });

    await expect(
      useCase.execute({ email: PENDING_EMAIL }),
    ).resolves.toEqual(SUCCESS);
    expect(rotateToken).toHaveBeenCalledTimes(1);
  });

  it('soft rate-limits the 6th call: SUCCESS without mail (D-44)', async () => {
    const existing = makeActivation();
    const findForAuth = jest.fn(async () => makePendingUser());
    const rotateToken = jest.fn(
      async (
        input: RotateActivationTokenInput,
      ): Promise<AccountActivationRecord> => ({
        ...existing,
        tokenHash: input.tokenHash,
        expiresAt: input.expiresAt,
      }),
    );
    const send = jest.fn(
      async (_mail: UserActivationMail): Promise<void> => undefined,
    );
    const useCase = makeUseCase({
      users: unusedUsers({ findForAuth }),
      activations: unusedActivations({
        findValidByUserId: async () => existing,
        rotateToken,
      }),
      mailer: unusedMailer({ send }),
      rateLimiter: new SoftEmailRateLimiter(5, 15 * 60 * 1000),
    });

    for (let i = 0; i < 5; i += 1) {
      await expect(
        useCase.execute({ email: PENDING_EMAIL }),
      ).resolves.toEqual(SUCCESS);
    }
    expect(send).toHaveBeenCalledTimes(5);
    expect(findForAuth).toHaveBeenCalledTimes(5);

    await expect(
      useCase.execute({ email: PENDING_EMAIL }),
    ).resolves.toEqual(SUCCESS);
    expect(send).toHaveBeenCalledTimes(5);
    expect(findForAuth).toHaveBeenCalledTimes(5);
    expect(rotateToken).toHaveBeenCalledTimes(5);
  });

  it('rejects invalid body with VALIDATION_FAILED (not masked as SUCCESS)', async () => {
    const findForAuth = jest.fn(async () => makePendingUser());
    const useCase = makeUseCase({
      users: unusedUsers({ findForAuth }),
    });

    const missing = await useCase.execute({}).catch((err: unknown) => err);
    expect(missing).toBeInstanceOf(DomainException);
    expect(missing).toMatchObject({
      code: 'VALIDATION_FAILED',
      httpStatus: 400,
    });

    const unknownKey = await useCase
      .execute({ email: PENDING_EMAIL, extra: true })
      .catch((err: unknown) => err);
    expect(unknownKey).toBeInstanceOf(DomainException);
    expect(unknownKey).toMatchObject({
      code: 'VALIDATION_FAILED',
      httpStatus: 400,
    });

    expect(findForAuth).not.toHaveBeenCalled();
  });
});
