import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../shared/persistence/prisma.service';
import {
  createInvitationId,
  createUserId,
  isUserRole,
} from '@content-chain/shared';
import { DomainException } from '../../shared/exceptions/domain.exception';
import type { AuthUser } from '../domain/auth-user.types';
import type {
  AcceptInviteAndCreateUserInput,
  AcceptInviteAndCreateUserResult,
  CreateInvitationInput,
  CreatePendingResult,
  InvitationListRecord,
  InvitationPurpose,
  InvitationRecord,
  InvitationRepository,
  InvitationStatus,
  RotateInvitationTokenInput,
} from '../domain/invitation-repository.port';

// Namespace Prisma tylko tutaj (P2002). Zapytania: this.prisma (PrismaService).
function isUniqueConstraintViolation(
  error: unknown,
): error is Prisma.PrismaClientKnownRequestError {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === 'P2002'
  );
}

function isInvitationPurpose(value: string): value is InvitationPurpose {
  return value === 'invite';
}

function isInvitationStatus(value: string): value is InvitationStatus {
  return value === 'pending' || value === 'accepted' || value === 'revoked';
}

type InvitationRow = {
  id: string;
  email: string;
  tokenHash: string;
  purpose: string;
  status: string;
  expiresAt: Date;
  invitedByUserId: string;
  createdAt: Date;
};

@Injectable()
export class PrismaInvitationAdapter implements InvitationRepository {
  constructor(private readonly prisma: PrismaService) {}

  private toRecord(row: InvitationRow): InvitationRecord {
    if (!isInvitationPurpose(row.purpose) || !isInvitationStatus(row.status)) {
      throw new DomainException(
        'INTERNAL_ERROR',
        'Invalid invitation row in persistence',
        500,
      );
    }

    return {
      id: createInvitationId(row.id),
      email: row.email,
      tokenHash: row.tokenHash,
      purpose: row.purpose,
      status: row.status,
      expiresAt: row.expiresAt,
      invitedByUserId: createUserId(row.invitedByUserId),
      createdAt: row.createdAt,
    };
  }

  async createPending(
    input: CreateInvitationInput,
  ): Promise<CreatePendingResult> {
    try {
      const row = await this.prisma.invitation.create({
        data: {
          id: input.id,
          email: input.email,
          tokenHash: input.tokenHash,
          purpose: input.purpose,
          status: 'pending',
          expiresAt: input.expiresAt,
          invitedByUserId: input.invitedByUserId,
        },
      });
      return { ok: true, invitation: this.toRecord(row) };
    } catch (error) {
      if (isUniqueConstraintViolation(error)) {
        return { ok: false, reason: 'pending-exists' };
      }
      throw error;
    }
  }

  async findPendingByEmail(email: string): Promise<InvitationRecord | null> {
    const row = await this.prisma.invitation.findFirst({
      where: { email, status: 'pending' },
    });
    return row ? this.toRecord(row) : null;
  }

  async listPending(): Promise<InvitationListRecord[]> {
    const rows = await this.prisma.invitation.findMany({
      where: { status: 'pending' },
      orderBy: { createdAt: 'asc' },
      include: { invitedBy: { select: { id: true, email: true } } },
    });
    return rows.map((row) => {
      const record = this.toRecord(row);
      return {
        id: record.id,
        email: record.email,
        status: record.status,
        expiresAt: record.expiresAt,
        createdAt: record.createdAt,
        invitedBy: {
          id: createUserId(row.invitedBy.id),
          email: row.invitedBy.email,
        },
      };
    });
  }

  async findById(id: InvitationRecord['id']): Promise<InvitationRecord | null> {
    const row = await this.prisma.invitation.findUnique({ where: { id } });
    return row ? this.toRecord(row) : null;
  }

  async findPendingByHash(
    tokenHash: string,
    now: Date,
  ): Promise<InvitationRecord | null> {
    const row = await this.prisma.invitation.findFirst({
      where: {
        tokenHash,
        status: 'pending',
        expiresAt: { gt: now },
      },
    });
    return row ? this.toRecord(row) : null;
  }

  async rotateToken(
    input: RotateInvitationTokenInput,
  ): Promise<InvitationRecord> {
    const row = await this.prisma.invitation.update({
      where: { id: input.id },
      data: { tokenHash: input.tokenHash, expiresAt: input.expiresAt },
    });
    return this.toRecord(row);
  }

  async revoke(id: InvitationRecord['id']): Promise<void> {
    await this.prisma.invitation.update({
      where: { id },
      data: { status: 'revoked' },
    });
  }

  async markAccepted(id: InvitationRecord['id']): Promise<void> {
    await this.prisma.invitation.update({
      where: { id },
      data: { status: 'accepted' },
    });
  }

  async acceptAndCreateUser(
    input: AcceptInviteAndCreateUserInput,
  ): Promise<AcceptInviteAndCreateUserResult> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const userRow = await tx.user.create({
          data: {
            id: input.userId,
            email: input.email,
            passwordHash: input.passwordHash,
            role: 'user',
            isActive: true,
          },
        });
        await tx.invitation.update({
          where: { id: input.invitationId },
          data: { status: 'accepted' },
        });
        if (!isUserRole(userRow.role)) {
          throw new DomainException(
            'INTERNAL_ERROR',
            'Invalid user role in persistence',
            500,
          );
        }
        const user: AuthUser = {
          id: createUserId(userRow.id),
          email: userRow.email,
          role: userRow.role,
          isActive: userRow.isActive,
          createdAt: userRow.createdAt,
          updatedAt: userRow.updatedAt,
        };
        return { ok: true, user };
      });
    } catch (error) {
      if (isUniqueConstraintViolation(error)) {
        return { ok: false, reason: 'email-taken' };
      }
      throw error;
    }
  }
}
