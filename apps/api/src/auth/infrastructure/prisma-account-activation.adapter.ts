import { Injectable } from '@nestjs/common';
import {
  createAccountActivationId,
  createUserId,
  isUserRole,
} from '@content-chain/shared';
import { PrismaService } from '../../shared/persistence/prisma.service';
import { DomainException } from '../../shared/exceptions/domain.exception';
import type { AuthUser } from '../domain/auth-user.types';
import type {
  AccountActivationRecord,
  AccountActivationRepository,
  CreatePendingUser,
  RotateActivationTokenInput,
} from '../domain/account-activation-repository.port';
import type { UserId } from '@content-chain/shared';

type ActivationRow = {
  id: string;
  userId: string;
  tokenHash: string;
  expiresAt: Date;
  createdAt: Date;
};

type UserRow = {
  id: string;
  email: string;
  passwordHash: string;
  role: string;
  isActive: boolean;
  verifiedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class PrismaAccountActivationAdapter implements AccountActivationRepository {
  constructor(private readonly prisma: PrismaService) {}

  private toActivation(row: ActivationRow): AccountActivationRecord {
    return {
      id: createAccountActivationId(row.id),
      userId: createUserId(row.userId),
      tokenHash: row.tokenHash,
      expiresAt: row.expiresAt,
      createdAt: row.createdAt,
    };
  }

  private toUser(row: UserRow): AuthUser {
    if (!isUserRole(row.role)) {
      throw new DomainException(
        'INTERNAL_ERROR',
        'Invalid user role in persistence',
        500,
      );
    }
    return {
      id: createUserId(row.id),
      email: row.email,
      role: row.role,
      isActive: row.isActive,
      verifiedAt: row.verifiedAt,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
  }

  async createPendingUser(input: CreatePendingUser): Promise<AuthUser> {
    return this.prisma.$transaction(async (tx) => {
      const userRow = await tx.user.create({
        data: {
          id: input.user.id,
          email: input.user.email,
          passwordHash: input.user.passwordHash,
          role: input.user.role,
          isActive: true,
          verifiedAt: null,
        },
      });
      await tx.accountActivation.create({
        data: {
          id: input.activation.id,
          userId: input.user.id,
          tokenHash: input.activation.tokenHash,
          expiresAt: input.activation.expiresAt,
        },
      });
      return this.toUser(userRow);
    });
  }

  async findValidByTokenHash(
    tokenHash: string,
    now: Date,
  ): Promise<AccountActivationRecord | null> {
    const row = await this.prisma.accountActivation.findFirst({
      where: { tokenHash, expiresAt: { gt: now } },
    });
    return row ? this.toActivation(row) : null;
  }

  async findValidByUserId(
    userId: UserId,
  ): Promise<AccountActivationRecord | null> {
    const row = await this.prisma.accountActivation.findUnique({
      where: { userId },
    });
    return row ? this.toActivation(row) : null;
  }

  async consumeAndVerify(userId: UserId, verifiedAt: Date): Promise<AuthUser> {
    return this.prisma.$transaction(async (tx) => {
      const userRow = await tx.user.update({
        where: { id: userId },
        data: { verifiedAt },
      });
      await tx.accountActivation.deleteMany({ where: { userId } });
      return this.toUser(userRow);
    });
  }

  async rotateToken(
    input: RotateActivationTokenInput,
  ): Promise<AccountActivationRecord> {
    const row = await this.prisma.accountActivation.update({
      where: { userId: input.userId },
      data: {
        tokenHash: input.tokenHash,
        expiresAt: input.expiresAt,
      },
    });
    return this.toActivation(row);
  }

  async deleteByUserId(userId: UserId): Promise<void> {
    await this.prisma.accountActivation.deleteMany({ where: { userId } });
  }
}
