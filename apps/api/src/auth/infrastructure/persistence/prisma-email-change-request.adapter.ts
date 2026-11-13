import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  createEmailChangeRequestId,
  createUserId,
  isUserRole,
} from '@content-chain/shared';
import { PrismaService } from '../../../shared/persistence/prisma.service';
import { DomainException } from '../../../shared/exceptions/domain.exception';
import type { UserId } from '@content-chain/shared';
import type {
  EmailChangeRequestRecord,
  EmailChangeRequestRepository,
  UpsertEmailChangeRequestInput,
} from '../../domain/email-change-request.repository.port';

function isUniqueConstraintViolation(
  error: unknown,
): error is Prisma.PrismaClientKnownRequestError {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === 'P2002'
  );
}

type Row = {
  id: string;
  userId: string;
  pendingEmail: string;
  tokenHash: string;
  expiresAt: Date;
  createdAt: Date;
};

const toRecord = (row: Row): EmailChangeRequestRecord => {
  return {
    id: createEmailChangeRequestId(row.id),
    userId: createUserId(row.userId),
    pendingEmail: row.pendingEmail,
    tokenHash: row.tokenHash,
    expiresAt: row.expiresAt,
    createdAt: row.createdAt,
  };
};

@Injectable()
export class PrismaEmailChangeRequestAdapter implements EmailChangeRequestRepository {
  constructor(private readonly prisma: PrismaService) {}

  async upsertForUser(
    input: UpsertEmailChangeRequestInput,
  ): Promise<EmailChangeRequestRecord> {
    try {
      const row = await this.prisma.emailChangeRequest.upsert({
        where: { userId: input.userId },
        create: {
          id: input.id,
          userId: input.userId,
          pendingEmail: input.pendingEmail,
          tokenHash: input.tokenHash,
          expiresAt: input.expiresAt,
        },
        update: {
          pendingEmail: input.pendingEmail,
          tokenHash: input.tokenHash,
          expiresAt: input.expiresAt,
        },
      });
      return toRecord(row);
    } catch (error) {
      if (isUniqueConstraintViolation(error)) {
        throw new DomainException('CONFLICT', 'Email already in use', 409);
      }
      throw error;
    }
  }

  async findByUserId(userId: UserId): Promise<EmailChangeRequestRecord | null> {
    const row = await this.prisma.emailChangeRequest.findUnique({
      where: { userId },
    });
    return row ? toRecord(row) : null;
  }

  async findValidByTokenHash(
    tokenHash: string,
    now: Date,
  ): Promise<EmailChangeRequestRecord | null> {
    const row = await this.prisma.emailChangeRequest.findFirst({
      where: { tokenHash, expiresAt: { gt: now } },
    });
    return row ? toRecord(row) : null;
  }

  async findByPendingEmail(
    pendingEmail: string,
  ): Promise<EmailChangeRequestRecord | null> {
    const row = await this.prisma.emailChangeRequest.findFirst({
      where: { pendingEmail },
    });
    return row ? toRecord(row) : null;
  }

  async rotateToken(
    userId: UserId,
    tokenHash: string,
    expiresAt: Date,
  ): Promise<EmailChangeRequestRecord> {
    const row = await this.prisma.emailChangeRequest.update({
      where: { userId },
      data: { tokenHash, expiresAt },
    });
    return toRecord(row);
  }

  async consumeAndApplyEmail(
    userId: UserId,
    newEmail: string,
  ): Promise<{ id: UserId; email: string; role: string }> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const userRow = await tx.user.update({
          where: { id: userId },
          data: { email: newEmail },
        });
        await tx.emailChangeRequest.deleteMany({ where: { userId } });
        if (!isUserRole(userRow.role)) {
          throw new DomainException(
            'INTERNAL_ERROR',
            'Invalid user role in persistence',
            500,
          );
        }
        return {
          id: createUserId(userRow.id),
          email: userRow.email,
          role: userRow.role,
        };
      });
    } catch (error) {
      if (isUniqueConstraintViolation(error)) {
        throw new DomainException('CONFLICT', 'Email already in use', 409);
      }
      throw error;
    }
  }
  async deleteByUserId(userId: UserId): Promise<void> {
    await this.prisma.emailChangeRequest.deleteMany({ where: { userId } });
  }
}
