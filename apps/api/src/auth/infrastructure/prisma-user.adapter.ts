import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../shared/persistence/prisma.service';
import {
  createUserId,
  isUserRole,
  type UserId,
  type UserRole,
} from '@content-chain/shared';
import type { AuthUser } from '../domain/auth-user.types';
import type {
  CreateAdminIfNoneData,
  CreateAdminIfNoneResult,
  UserForAuth,
  UserRepository,
} from '../domain/user-repository.port';
import { DomainException } from '../../shared/exceptions/domain.exception';

function isUniqueConstraintViolation(
  error: unknown,
): error is Prisma.PrismaClientKnownRequestError {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === 'P2002'
  );
}

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

  async createAdminIfNone(
    data: CreateAdminIfNoneData,
  ): Promise<CreateAdminIfNoneResult> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const count = await tx.user.count({ where: { role: 'admin' } });
        if (count > 0) {
          return { ok: false, reason: 'admin-exists' };
        }
        const row = await tx.user.create({
          data: {
            id: data.id,
            email: data.email,
            passwordHash: data.passwordHash,
            role: 'admin',
            isActive: true,
          },
        });
        return { ok: true, user: this.toUser(row) };
      });
    } catch (error) {
      if (isUniqueConstraintViolation(error)) {
        const adminCount = await this.prisma.user.count({
          where: { role: 'admin' },
        });
        if (adminCount > 0) {
          return { ok: false, reason: 'admin-exists' };
        }
      }
      throw error;
    }
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
