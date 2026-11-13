import { Prisma } from '@prisma/client';
import {
  createEmailChangeRequestId,
  createUserId,
} from '@content-chain/shared';
import { PrismaEmailChangeRequestAdapter } from './prisma-email-change-request.adapter';
import type { PrismaService } from '../../../shared/persistence/prisma.service';
import type { UpsertEmailChangeRequestInput } from '../../domain/email-change-request.repository.port';

const USER_ID = createUserId('usr_11111111-1111-4111-8111-111111111111');
const ECR_ID = createEmailChangeRequestId(
  'ecr_22222222-2222-4222-8222-222222222222',
);
const NOW = new Date('2026-06-01T12:00:00.000Z');
const EXPIRES_LATER = new Date('2026-06-02T12:00:00.000Z');

type EmailChangeRequestRow = {
  id: string;
  userId: string;
  pendingEmail: string;
  tokenHash: string;
  expiresAt: Date;
  createdAt: Date;
};

type EmailChangeRequestMock = {
  upsert: jest.Mock;
  findUnique: jest.Mock;
  findFirst: jest.Mock;
  update: jest.Mock;
  deleteMany: jest.Mock;
};

type UserMock = {
  update: jest.Mock;
};

type TxMock = {
  user: UserMock;
  emailChangeRequest: Pick<EmailChangeRequestMock, 'deleteMany'>;
};

function row(
  overrides: Partial<EmailChangeRequestRow> = {},
): EmailChangeRequestRow {
  return {
    id: ECR_ID,
    userId: USER_ID,
    pendingEmail: 'pending@example.com',
    tokenHash: 'hash-1',
    expiresAt: EXPIRES_LATER,
    createdAt: NOW,
    ...overrides,
  };
}

function mockPrisma(opts: {
  emailChangeRequest?: Partial<EmailChangeRequestMock>;
  $transaction?: PrismaService['$transaction'];
}): PrismaService {
  return {
    emailChangeRequest: {
      upsert: jest.fn(),
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
      deleteMany: jest.fn(),
      ...opts.emailChangeRequest,
    },
    $transaction:
      opts.$transaction ??
      (async () => {
        throw new Error('unexpected $transaction');
      }),
  } as unknown as PrismaService;
}

describe('PrismaEmailChangeRequestAdapter', () => {
  it('upsertForUser then findByUserId returns the same pending record', async () => {
    const stored = row();
    const emailChangeRequest: EmailChangeRequestMock = {
      upsert: jest.fn(async () => stored),
      findUnique: jest.fn(async () => stored),
      findFirst: jest.fn(),
      update: jest.fn(),
      deleteMany: jest.fn(),
    };
    const adapter = new PrismaEmailChangeRequestAdapter(
      mockPrisma({ emailChangeRequest }),
    );
    const input: UpsertEmailChangeRequestInput = {
      id: ECR_ID,
      userId: USER_ID,
      pendingEmail: stored.pendingEmail,
      tokenHash: stored.tokenHash,
      expiresAt: stored.expiresAt,
    };

    const upserted = await adapter.upsertForUser(input);
    const found = await adapter.findByUserId(USER_ID);

    expect(emailChangeRequest.upsert).toHaveBeenCalledWith({
      where: { userId: USER_ID },
      create: {
        id: ECR_ID,
        userId: USER_ID,
        pendingEmail: stored.pendingEmail,
        tokenHash: stored.tokenHash,
        expiresAt: stored.expiresAt,
      },
      update: {
        pendingEmail: stored.pendingEmail,
        tokenHash: stored.tokenHash,
        expiresAt: stored.expiresAt,
      },
    });
    expect(upserted).toEqual({
      id: ECR_ID,
      userId: USER_ID,
      pendingEmail: stored.pendingEmail,
      tokenHash: stored.tokenHash,
      expiresAt: stored.expiresAt,
      createdAt: stored.createdAt,
    });
    expect(found).toEqual(upserted);
    expect(emailChangeRequest.findUnique).toHaveBeenCalledWith({
      where: { userId: USER_ID },
    });
  });

  it('upsertForUser maps P2002 to CONFLICT 409', async () => {
    const upsert = jest.fn(async () => {
      throw new Prisma.PrismaClientKnownRequestError(
        'Unique constraint failed',
        {
          code: 'P2002',
          clientVersion: 'test',
        },
      );
    });
    const adapter = new PrismaEmailChangeRequestAdapter(
      mockPrisma({
        emailChangeRequest: { upsert },
      }),
    );
    const input: UpsertEmailChangeRequestInput = {
      id: ECR_ID,
      userId: USER_ID,
      pendingEmail: 'taken@example.com',
      tokenHash: 'hash-race',
      expiresAt: EXPIRES_LATER,
    };

    await expect(adapter.upsertForUser(input)).rejects.toMatchObject({
      name: 'DomainException',
      code: 'CONFLICT',
      httpStatus: 409,
      message: 'Email already in use',
    });
    expect(upsert).toHaveBeenCalledTimes(1);
  });

  it('findValidByTokenHash returns null when Prisma finds no non-expired row', async () => {
    const findFirst = jest.fn(async () => null);
    const adapter = new PrismaEmailChangeRequestAdapter(
      mockPrisma({
        emailChangeRequest: { findFirst },
      }),
    );

    await expect(
      adapter.findValidByTokenHash('expired-hash', NOW),
    ).resolves.toBeNull();

    expect(findFirst).toHaveBeenCalledWith({
      where: { tokenHash: 'expired-hash', expiresAt: { gt: NOW } },
    });
  });

  it('findValidByTokenHash maps a non-expired row to a branded record', async () => {
    const stored = row({
      tokenHash: 'valid-hash',
      expiresAt: EXPIRES_LATER,
    });
    const findFirst = jest.fn(async () => stored);
    const adapter = new PrismaEmailChangeRequestAdapter(
      mockPrisma({
        emailChangeRequest: { findFirst },
      }),
    );

    await expect(
      adapter.findValidByTokenHash('valid-hash', NOW),
    ).resolves.toEqual({
      id: ECR_ID,
      userId: USER_ID,
      pendingEmail: stored.pendingEmail,
      tokenHash: 'valid-hash',
      expiresAt: EXPIRES_LATER,
      createdAt: NOW,
    });
    expect(findFirst).toHaveBeenCalledWith({
      where: { tokenHash: 'valid-hash', expiresAt: { gt: NOW } },
    });
  });

  it('findByPendingEmail maps a row by email without expiry filter', async () => {
    const stored = row({
      pendingEmail: 'taken@example.com',
      expiresAt: EXPIRES_LATER,
    });
    const findFirst = jest.fn(async () => stored);
    const adapter = new PrismaEmailChangeRequestAdapter(
      mockPrisma({
        emailChangeRequest: { findFirst },
      }),
    );

    await expect(
      adapter.findByPendingEmail('taken@example.com'),
    ).resolves.toEqual({
      id: ECR_ID,
      userId: USER_ID,
      pendingEmail: 'taken@example.com',
      tokenHash: stored.tokenHash,
      expiresAt: EXPIRES_LATER,
      createdAt: NOW,
    });
    expect(findFirst).toHaveBeenCalledWith({
      where: { pendingEmail: 'taken@example.com' },
    });
  });

  it('findByPendingEmail returns null when Prisma finds no row', async () => {
    const findFirst = jest.fn(async () => null);
    const adapter = new PrismaEmailChangeRequestAdapter(
      mockPrisma({
        emailChangeRequest: { findFirst },
      }),
    );

    await expect(
      adapter.findByPendingEmail('free@example.com'),
    ).resolves.toBeNull();
    expect(findFirst).toHaveBeenCalledWith({
      where: { pendingEmail: 'free@example.com' },
    });
  });

  it('consumeAndApplyEmail updates user email and deletes pending in one transaction', async () => {
    const tx: TxMock = {
      user: {
        update: jest.fn(async () => ({
          id: USER_ID,
          email: 'next@example.com',
          role: 'user',
        })),
      },
      emailChangeRequest: {
        deleteMany: jest.fn(async () => ({ count: 1 })),
      },
    };
    const $transaction = jest.fn(
      async (fn: (client: Prisma.TransactionClient) => Promise<unknown>) =>
        fn(tx as unknown as Prisma.TransactionClient),
    );
    const adapter = new PrismaEmailChangeRequestAdapter(
      mockPrisma({ $transaction }),
    );

    await expect(
      adapter.consumeAndApplyEmail(USER_ID, 'next@example.com'),
    ).resolves.toEqual({
      id: USER_ID,
      email: 'next@example.com',
      role: 'user',
    });

    expect(tx.user.update).toHaveBeenCalledWith({
      where: { id: USER_ID },
      data: { email: 'next@example.com' },
    });
    expect(tx.emailChangeRequest.deleteMany).toHaveBeenCalledWith({
      where: { userId: USER_ID },
    });
    expect(tx.user.update.mock.invocationCallOrder[0]).toBeLessThan(
      tx.emailChangeRequest.deleteMany.mock.invocationCallOrder[0],
    );
  });

  it('consumeAndApplyEmail maps P2002 on email update to CONFLICT 409', async () => {
    const tx: TxMock = {
      user: {
        update: jest.fn(async () => {
          throw new Prisma.PrismaClientKnownRequestError(
            'Unique constraint failed',
            {
              code: 'P2002',
              clientVersion: 'test',
            },
          );
        }),
      },
      emailChangeRequest: {
        deleteMany: jest.fn(async () => ({ count: 0 })),
      },
    };
    const $transaction = jest.fn(
      async (fn: (client: Prisma.TransactionClient) => Promise<unknown>) =>
        fn(tx as unknown as Prisma.TransactionClient),
    );
    const adapter = new PrismaEmailChangeRequestAdapter(
      mockPrisma({ $transaction }),
    );

    await expect(
      adapter.consumeAndApplyEmail(USER_ID, 'taken@example.com'),
    ).rejects.toMatchObject({
      name: 'DomainException',
      code: 'CONFLICT',
      httpStatus: 409,
      message: 'Email already in use',
    });
    expect(tx.emailChangeRequest.deleteMany).not.toHaveBeenCalled();
  });
});
