import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/persistence/prisma.service';
import {
  createUserId,
  isUserRole,
  type UserId,
  type UserRole,
} from '@content-chain/shared';
import type { AuthUser } from '../domain/auth-user.types';
import type {
  UserForAuth,
  UserRepository,
} from '../domain/user-repository.port';
import { DomainException } from '../../shared/exceptions/domain.exception';

type UserRow = {
  id: string;
  email: string;
  passwordHash: string;
  role: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type CreateUserData = {
  id: UserId;
  email: string;
  passwordHash: string;
  role: UserRole;
};

@Injectable()
export class PrismaUserAdapter implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

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
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
  }

  async findForAuth(email: string): Promise<UserForAuth | null> {
    const row = await this.prisma.user.findUnique({ where: { email } });
    return row ? { ...this.toUser(row), passwordHash: row.passwordHash } : null;
  }

  async findById(id: UserId): Promise<AuthUser | null> {
    const row = await this.prisma.user.findUnique({ where: { id } });
    return row ? this.toUser(row) : null;
  }

  async findAdminCount(): Promise<number> {
    return this.prisma.user.count({ where: { role: 'admin' } });
  }

  async create(data: CreateUserData): Promise<AuthUser> {
    const row = await this.prisma.user.create({
      data: {
        id: data.id,
        email: data.email,
        passwordHash: data.passwordHash,
        role: data.role,
        isActive: true,
      },
    });
    return this.toUser(row);
  }

  async setActive(id: UserId, isActive: boolean): Promise<void> {
    await this.prisma.user.update({ where: { id }, data: { isActive } });
  }

  async list(): Promise<AuthUser[]> {
    const rows = await this.prisma.user.findMany({
      orderBy: { createdAt: 'asc' },
    });
    return rows.map((row) => this.toUser(row));
  }
}
