import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/persistence/prisma.service';
import { createUserId, type UserId } from '@content-chain/shared';
import type {
  RefreshSessionRecord,
  RefreshSessionRepository,
  RotateRefreshSessionResult,
} from '../domain/refresh-session.repository.port';

@Injectable()
export class PrismaRefreshSessionAdapter implements RefreshSessionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(session: RefreshSessionRecord): Promise<void> {
    await this.prisma.refreshSession.create({
      data: {
        id: session.id,
        userId: session.userId,
        tokenHash: session.tokenHash,
        expiresAt: session.expiresAt,
      },
    });
  }

  async findValid(
    userId: UserId,
    tokenHash: string,
  ): Promise<RefreshSessionRecord | null> {
    const row = await this.prisma.refreshSession.findFirst({
      where: {
        userId,
        tokenHash,
        expiresAt: { gt: new Date() },
      },
    });
    if (!row) return null;
    return {
      id: row.id,
      userId: createUserId(row.userId),
      tokenHash: row.tokenHash,
      expiresAt: row.expiresAt,
    };
  }

  async findValidByHash(
    tokenHash: string,
  ): Promise<RefreshSessionRecord | null> {
    const row = await this.prisma.refreshSession.findFirst({
      where: { tokenHash, expiresAt: { gt: new Date() } },
    });
    if (!row) return null;
    return {
      id: row.id,
      userId: createUserId(row.userId),
      tokenHash: row.tokenHash,
      expiresAt: row.expiresAt,
    };
  }

  async rotate(
    currentTokenHash: string,
    next: RefreshSessionRecord,
  ): Promise<RotateRefreshSessionResult> {
    return this.prisma.$transaction(async (tx) => {
      const deleted = await tx.refreshSession.deleteMany({
        where: {
          tokenHash: currentTokenHash,
          userId: next.userId,
          expiresAt: { gt: new Date() },
        },
      });
      if (deleted.count === 0) {
        return { ok: false, reason: 'not-found' };
      }
      if (deleted.count !== 1) {
        throw new Error('Refresh rotation matched multiple sessions');
      }
      await tx.refreshSession.create({
        data: {
          id: next.id,
          userId: next.userId,
          tokenHash: next.tokenHash,
          expiresAt: next.expiresAt,
        },
      });
      return { ok: true };
    });
  }

  async deleteById(id: string): Promise<void> {
    await this.prisma.refreshSession
      .delete({ where: { id } })
      .catch(() => undefined);
  }

  async deleteByUser(userId: UserId): Promise<void> {
    await this.prisma.refreshSession.deleteMany({ where: { userId } });
  }
}
