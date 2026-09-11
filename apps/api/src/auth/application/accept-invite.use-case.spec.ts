import { createInvitationId, createUserId } from '@content-chain/shared';
import { hashRefreshToken } from './auth.helpers';
import type { AuthUser } from '../domain/auth-user.types';
import type {
  AcceptInviteAndCreateUserInput,
  AcceptInviteAndCreateUserResult,
  InvitationRecord,
  InvitationRepository,
} from '../domain/invitation-repository.port';
import { AcceptInviteUseCase } from './accept-invite.use-case';

const USER_ID = createUserId('usr_11111111-1111-4111-8111-111111111111');
const ADMIN_ID = createUserId('usr_22222222-2222-4222-8222-222222222222');
const INVITATION_ID = createInvitationId(
  'inv_11111111-1111-4111-8111-111111111111',
);
const CREATED_AT = new Date('2026-01-01T00:00:00.000Z');
const RAW_TOKEN = 'invite-raw-token';
const PASSWORD = 'ValidPassword1!';
const INVITE_EMAIL = 'new.user@example.com';

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

function makeInvitation(
  overrides: Partial<InvitationRecord> = {},
): InvitationRecord {
  return {
    id: INVITATION_ID,
    email: INVITE_EMAIL,
    tokenHash: hashRefreshToken(RAW_TOKEN),
    purpose: 'invite',
    status: 'pending',
    expiresAt: new Date('2026-12-01T00:00:00.000Z'),
    invitedByUserId: ADMIN_ID,
    createdAt: CREATED_AT,
    ...overrides,
  };
}

function makeCreatedUser(overrides: Partial<AuthUser> = {}): AuthUser {
  return {
    id: USER_ID,
    email: INVITE_EMAIL,
    role: 'user',
    isActive: true,
    createdAt: CREATED_AT,
    updatedAt: CREATED_AT,
    ...overrides,
  };
}

describe('AcceptInviteUseCase', () => {
  it('creates a user with role user from a valid pending token', async () => {
    const created = makeCreatedUser();
    const acceptAndCreateUser = jest.fn(
      async (
        _input: AcceptInviteAndCreateUserInput,
      ): Promise<AcceptInviteAndCreateUserResult> => ({
        ok: true,
        user: created,
      }),
    );
    const useCase = new AcceptInviteUseCase(
      unusedInvitations({
        findPendingByHash: async () => makeInvitation(),
        acceptAndCreateUser,
      }),
    );

    await expect(
      useCase.execute({ token: RAW_TOKEN, password: PASSWORD }),
    ).resolves.toEqual({
      user: {
        id: created.id,
        email: created.email,
        role: 'user',
      },
    });
    expect(acceptAndCreateUser).toHaveBeenCalledTimes(1);
    expect(acceptAndCreateUser.mock.calls[0]?.[0]).toMatchObject({
      invitationId: INVITATION_ID,
      email: INVITE_EMAIL,
    });
    expect(typeof acceptAndCreateUser.mock.calls[0]?.[0].passwordHash).toBe(
      'string',
    );
  });

  it('rejects an unknown or expired token with UNAUTHORIZED', async () => {
    const acceptAndCreateUser = jest.fn(
      async (
        _input: AcceptInviteAndCreateUserInput,
      ): Promise<AcceptInviteAndCreateUserResult> => ({
        ok: false,
        reason: 'email-taken',
      }),
    );
    const useCase = new AcceptInviteUseCase(
      unusedInvitations({
        findPendingByHash: async () => null,
        acceptAndCreateUser,
      }),
    );

    await expect(
      useCase.execute({ token: RAW_TOKEN, password: PASSWORD }),
    ).rejects.toMatchObject({
      name: 'DomainException',
      code: 'UNAUTHORIZED',
      httpStatus: 401,
      message: 'Invalid invitation token',
    });
    expect(acceptAndCreateUser).not.toHaveBeenCalled();
  });

  it('rejects a weak password after resolving the invitation and does not create a user', async () => {
    const acceptAndCreateUser = jest.fn(
      async (
        _input: AcceptInviteAndCreateUserInput,
      ): Promise<AcceptInviteAndCreateUserResult> => ({
        ok: false,
        reason: 'email-taken',
      }),
    );
    const useCase = new AcceptInviteUseCase(
      unusedInvitations({
        findPendingByHash: async () => makeInvitation(),
        acceptAndCreateUser,
      }),
    );

    await expect(
      useCase.execute({ token: RAW_TOKEN, password: 'short' }),
    ).rejects.toMatchObject({
      name: 'DomainException',
      code: 'VALIDATION_FAILED',
      httpStatus: 400,
      message: 'Password must be at least 12 characters long',
    });
    expect(acceptAndCreateUser).not.toHaveBeenCalled();
  });

  it('rejects when acceptAndCreateUser reports email-taken', async () => {
    const useCase = new AcceptInviteUseCase(
      unusedInvitations({
        findPendingByHash: async () => makeInvitation(),
        acceptAndCreateUser: async () => ({
          ok: false,
          reason: 'email-taken',
        }),
      }),
    );

    await expect(
      useCase.execute({ token: RAW_TOKEN, password: PASSWORD }),
    ).rejects.toMatchObject({
      name: 'DomainException',
      code: 'CONFLICT',
      httpStatus: 409,
      message: 'Email already in use',
    });
  });

  it('rejects a missing token with VALIDATION_FAILED', async () => {
    const findPendingByHash = jest.fn(async () => makeInvitation());
    const useCase = new AcceptInviteUseCase(
      unusedInvitations({ findPendingByHash }),
    );

    await expect(useCase.execute({ password: PASSWORD })).rejects.toMatchObject(
      {
        name: 'DomainException',
        code: 'VALIDATION_FAILED',
        httpStatus: 400,
        message: 'Application command validation failed',
      },
    );
    expect(findPendingByHash).not.toHaveBeenCalled();
  });
});
