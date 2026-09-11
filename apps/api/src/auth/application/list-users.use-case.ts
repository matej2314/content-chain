import { Inject, Injectable } from '@nestjs/common';
import {
  USER_REPOSITORY,
  type UserRepository,
} from '../domain/user-repository.port';
import type { UserListItem } from '../domain/auth-user.types';

@Injectable()
export class ListUsersUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: UserRepository,
  ) {}

  async execute(): Promise<{ items: UserListItem[] }> {
    const all = await this.users.list();
    return {
      items: all.map(({ id, email, role, isActive, createdAt }) => ({
        id,
        email,
        role,
        isActive,
        createdAt,
      })),
    };
  }
}
