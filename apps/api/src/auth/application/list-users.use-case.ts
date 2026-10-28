import { Inject, Injectable } from '@nestjs/common';
import {
  USER_REPOSITORY,
  type UserRepository,
} from '../domain/user-repository.port';
import type { UserListItem } from '../domain/auth-user.types';
import type { PaginationMode } from '../../shared/http/pagination';

@Injectable()
export class ListUsersUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: UserRepository,
  ) {}

  async execute(pagination: PaginationMode): Promise<{
    items: UserListItem[];
    page: number;
    pageSize: number;
    total: number;
  }> {
    const result = await this.users.list(pagination);
    return {
      items: result.items.map(
        ({ id, email, role, isActive, verifiedAt, createdAt }) => ({
          id,
          email,
          role,
          isActive,
          verifiedAt,
          createdAt,
        }),
      ),
      page: result.page,
      pageSize: result.pageSize,
      total: result.total,
    };
  }
}
