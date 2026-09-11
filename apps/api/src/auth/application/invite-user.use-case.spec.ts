import { createInvitationId, createUserId } from '@content-chain/shared';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { validateEnv } from '../../shared/config/env.schema';
import type {
  CreateInvitationInput,
  CreatePendingResult,
  InvitationRecord,
  InvitationRepository,
} from '../domain/invitation-repository.port';
import type { TransactionalMailer } from '../domain/transactional-mailer.port';
import type {
  UserForAuth,
  UserRepository,
} from '../domain/user-repository.port';
import { InviteUserUseCase } from './invite-user.use-case';

const USER_ID = createUserId('usr_11111111-1111-4111-8111-111111111111');
const ADMIN_ID = createUserId('usr_22222222-2222-4222-8222-222222222222');
const INVITATION_ID = createInvitationId(
  'inv_11111111-1111-4111-8111-111111111111',
);
const CREATED_AT = new Date('2026-01-01T00:00:00.000Z');
const INVITE_EMAIL = 'new.user@example.com';

const TEST_ENV = validateEnv({
  NODE_ENV: 'test',
  DATABASE_URL: 'file:./test.db',
  GATEWAY_BASE_URL: 'http://localhost:3100',
  GATEWAY_KEY: 'test-gateway-key',
  JWT_SECRET: 'test-jwt-secret',
  CORS_ORIGIN: 'http://localhost:3000',
  APP_PUBLIC_URL: 'http://localhost:3000',
  INVITE_TTL: '7d',
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
    list: unexpected,
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

function makeInvitation(
  overrides: Partial<InvitationRecord> = {},
): InvitationRecord {
  return {
    id: INVITATION_ID,
    email: INVITE_EMAIL,
    tokenHash: 'hash',
    purpose: 'invite',
    status: 'pending',
    expiresAt: new Date('2026-01-08T00:00:00.000Z'),
    invitedByUserId: ADMIN_ID,
    createdAt: CREATED_AT,
    ...overrides,
  };
}

function echoPending(input: CreateInvitationInput): CreatePendingResult {
  return {
    ok: true,
    invitation: {
      ...input,
      status: 'pending',
      createdAt: CREATED_AT,
    },
  };
}

describe('InviteUserUseCase', () => {
  it('creates a pending invitation, sends mail, and omits the raw token from the result', async () => {
    const createPending = jest.fn(
      async (input: CreateInvitationInput): Promise<CreatePendingResult> =>
        echoPending(input),
    );
    const send = jest.fn(async (): Promise<void> => undefined);
    const useCase = new InviteUserUseCase(
      unusedUsers({
        findForAuth: async () => null,
      }),
      unusedInvitations({
        findPendingByEmail: async () => null,
        createPending,
      }),
      unusedMailer({ send }),
      TEST_ENV,
    );

    const result = await useCase.execute({ email: INVITE_EMAIL }, ADMIN_ID);

    expect(result.email).toBe(INVITE_EMAIL);
    expect(result.expiresAt).toEqual(expect.any(String));
    expect(result).not.toHaveProperty('token');
    expect(result).not.toHaveProperty('rawToken');
    expect(createPending).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenCalledTimes(1);
    const mail = send.mock.calls[0]?.[0];
    expect(mail).toMatchObject({
      kind: 'user_invited',
      to: INVITE_EMAIL,
    });
    expect(mail?.acceptUrl).toContain('/invite/accept?token=');
    expect(mail?.rawToken.length).toBeGreaterThan(0);
  });

  it('rejects when the email already belongs to a user', async () => {
    const existing: UserForAuth = {
      id: USER_ID,
      email: INVITE_EMAIL,
      role: 'user',
      isActive: false,
      createdAt: CREATED_AT,
      updatedAt: CREATED_AT,
      passwordHash: 'hash',
    };
    const createPending = jest.fn(
      async (_input: CreateInvitationInput): Promise<CreatePendingResult> => ({
        ok: false,
        reason: 'pending-exists',
      }),
    );
    const send = jest.fn(async (): Promise<void> => undefined);
    const useCase = new InviteUserUseCase(
      unusedUsers({
        findForAuth: async () => existing,
      }),
      unusedInvitations({ createPending }),
      unusedMailer({ send }),
      TEST_ENV,
    );

    await expect(
      useCase.execute({ email: INVITE_EMAIL }, ADMIN_ID),
    ).rejects.toMatchObject({
      name: 'DomainException',
      code: 'CONFLICT',
      httpStatus: 409,
      message: 'Email already in use',
    });
    expect(createPending).not.toHaveBeenCalled();
    expect(send).not.toHaveBeenCalled();
  });

  it('rejects when a pending invitation already exists, including an expired one', async () => {
    const createPending = jest.fn(
      async (_input: CreateInvitationInput): Promise<CreatePendingResult> => ({
        ok: false,
        reason: 'pending-exists',
      }),
    );
    const send = jest.fn(async (): Promise<void> => undefined);
    const useCase = new InviteUserUseCase(
      unusedUsers({
        findForAuth: async () => null,
      }),
      unusedInvitations({
        findPendingByEmail: async () =>
          makeInvitation({
            expiresAt: new Date('2020-01-01T00:00:00.000Z'),
          }),
        createPending,
      }),
      unusedMailer({ send }),
      TEST_ENV,
    );

    await expect(
      useCase.execute({ email: INVITE_EMAIL }, ADMIN_ID),
    ).rejects.toMatchObject({
      name: 'DomainException',
      code: 'CONFLICT',
      httpStatus: 409,
      message: 'Pending invitation already exists',
    });
    expect(createPending).not.toHaveBeenCalled();
    expect(send).not.toHaveBeenCalled();
  });

  it('rejects a createPending race with CONFLICT', async () => {
    const send = jest.fn(async (): Promise<void> => undefined);
    const useCase = new InviteUserUseCase(
      unusedUsers({
        findForAuth: async () => null,
      }),
      unusedInvitations({
        findPendingByEmail: async () => null,
        createPending: async () => ({
          ok: false,
          reason: 'pending-exists',
        }),
      }),
      unusedMailer({ send }),
      TEST_ENV,
    );

    await expect(
      useCase.execute({ email: INVITE_EMAIL }, ADMIN_ID),
    ).rejects.toMatchObject({
      name: 'DomainException',
      code: 'CONFLICT',
      httpStatus: 409,
      message: 'Pending invitation already exists',
    });
    expect(send).not.toHaveBeenCalled();
  });

  it('maps a mailer failure to MAIL_DELIVERY_FAILED with invitation id only', async () => {
    const createPending = jest.fn(
      async (input: CreateInvitationInput): Promise<CreatePendingResult> =>
        echoPending(input),
    );
    const useCase = new InviteUserUseCase(
      unusedUsers({
        findForAuth: async () => null,
      }),
      unusedInvitations({
        findPendingByEmail: async () => null,
        createPending,
      }),
      unusedMailer({
        send: async () => {
          throw new Error('smtp down');
        },
      }),
      TEST_ENV,
    );

    const error = await useCase
      .execute({ email: INVITE_EMAIL }, ADMIN_ID)
      .catch((err: unknown) => err);

    expect(error).toBeInstanceOf(DomainException);
    expect(error).toMatchObject({
      code: 'MAIL_DELIVERY_FAILED',
      httpStatus: 503,
      message: 'Mail delivery failed',
    });
    if (!(error instanceof DomainException)) {
      throw new Error('expected DomainException');
    }
    expect(error.details).toEqual([{ id: expect.any(String) }]);
    expect(createPending).toHaveBeenCalled();
  });
});
