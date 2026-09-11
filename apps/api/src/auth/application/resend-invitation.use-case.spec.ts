import { createInvitationId, createUserId } from '@content-chain/shared';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { validateEnv } from '../../shared/config/env.schema';
import type {
  InvitationRecord,
  InvitationRepository,
  RotateInvitationTokenInput,
} from '../domain/invitation-repository.port';
import type {
  TransactionalMailer,
  UserInvitedMail,
} from '../domain/transactional-mailer.port';
import { ResendInvitationUseCase } from './resend-invitation.use-case';

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
    tokenHash: 'old-hash',
    purpose: 'invite',
    status: 'pending',
    expiresAt: new Date('2026-01-08T00:00:00.000Z'),
    invitedByUserId: ADMIN_ID,
    createdAt: CREATED_AT,
    ...overrides,
  };
}

describe('ResendInvitationUseCase', () => {
  it('rotates the token and sends a new invitation mail', async () => {
    const existing = makeInvitation();
    const rotateToken = jest.fn(
      async (input: RotateInvitationTokenInput): Promise<InvitationRecord> => ({
        ...existing,
        tokenHash: input.tokenHash,
        expiresAt: input.expiresAt,
      }),
    );
    const send = jest.fn(
      async (_mail: UserInvitedMail): Promise<void> => undefined,
    );
    const useCase = new ResendInvitationUseCase(
      unusedInvitations({
        findById: async () => existing,
        rotateToken,
      }),
      unusedMailer({ send }),
      TEST_ENV,
    );

    const result = await useCase.execute(INVITATION_ID);

    expect(result).toEqual({
      id: INVITATION_ID,
      email: INVITE_EMAIL,
      expiresAt: expect.any(String),
    });
    expect(result).not.toHaveProperty('rawToken');
    expect(rotateToken).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenCalledTimes(1);
    const mail = send.mock.calls[0]?.[0];
    expect(mail).toMatchObject({
      kind: 'user_invited',
      to: INVITE_EMAIL,
      invitationId: INVITATION_ID,
    });
    expect(mail?.rawToken.length).toBeGreaterThan(0);
    expect(mail?.acceptUrl).toContain(mail?.rawToken);
  });

  it('rejects an invalid invitation id format with VALIDATION_FAILED', async () => {
    const findById = jest.fn(async () => makeInvitation());
    const useCase = new ResendInvitationUseCase(
      unusedInvitations({ findById }),
      unusedMailer(),
      TEST_ENV,
    );

    await expect(useCase.execute('not-an-invitation')).rejects.toMatchObject({
      name: 'DomainException',
      code: 'VALIDATION_FAILED',
      httpStatus: 400,
      message: 'Invalid invitation ID',
    });
    expect(findById).not.toHaveBeenCalled();
  });

  it('rejects a missing invitation with INVITATION_NOT_FOUND', async () => {
    const rotateToken = jest.fn(
      async (_input: RotateInvitationTokenInput): Promise<InvitationRecord> =>
        makeInvitation(),
    );
    const useCase = new ResendInvitationUseCase(
      unusedInvitations({
        findById: async () => null,
        rotateToken,
      }),
      unusedMailer(),
      TEST_ENV,
    );

    await expect(useCase.execute(INVITATION_ID)).rejects.toMatchObject({
      name: 'DomainException',
      code: 'INVITATION_NOT_FOUND',
      httpStatus: 404,
      message: 'Invitation not found',
    });
    expect(rotateToken).not.toHaveBeenCalled();
  });

  it('rejects a non-pending invitation with INVITATION_NOT_FOUND', async () => {
    const rotateToken = jest.fn(
      async (_input: RotateInvitationTokenInput): Promise<InvitationRecord> =>
        makeInvitation(),
    );
    const useCase = new ResendInvitationUseCase(
      unusedInvitations({
        findById: async () => makeInvitation({ status: 'accepted' }),
        rotateToken,
      }),
      unusedMailer(),
      TEST_ENV,
    );

    await expect(useCase.execute(INVITATION_ID)).rejects.toMatchObject({
      name: 'DomainException',
      code: 'INVITATION_NOT_FOUND',
      httpStatus: 404,
      message: 'Invitation not found',
    });
    expect(rotateToken).not.toHaveBeenCalled();
  });

  it('maps a mailer failure to MAIL_DELIVERY_FAILED with invitation id only', async () => {
    const existing = makeInvitation();
    const useCase = new ResendInvitationUseCase(
      unusedInvitations({
        findById: async () => existing,
        rotateToken: async (input) => ({
          ...existing,
          tokenHash: input.tokenHash,
          expiresAt: input.expiresAt,
        }),
      }),
      unusedMailer({
        send: async () => {
          throw new Error('smtp down');
        },
      }),
      TEST_ENV,
    );

    const error = await useCase
      .execute(INVITATION_ID)
      .catch((err: unknown) => err);

    expect(error).toBeInstanceOf(DomainException);
    expect(error).toMatchObject({
      code: 'MAIL_DELIVERY_FAILED',
      httpStatus: 503,
      message: 'Mail delivery failed',
      details: [{ id: INVITATION_ID }],
    });
  });
});
