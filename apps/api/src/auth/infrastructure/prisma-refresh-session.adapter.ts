import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/persistence/prisma.service';
import { createUserId, type UserId } from '@content-chain/shared';
import type {
  RefreshSessionRecord,
  RefreshSessionRepository,
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

  async deleteById(id: string): Promise<void> {
    await this.prisma.refreshSession
      .delete({ where: { id } })
      .catch(() => undefined);
  }

  async deleteByUser(userId: UserId): Promise<void> {
    await this.prisma.refreshSession.deleteMany({ where: { userId } });
  }
}
