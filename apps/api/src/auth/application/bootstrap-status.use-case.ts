import { Inject, Injectable } from '@nestjs/common';
import {
  USER_REPOSITORY,
  type UserRepository,
} from '../domain/user-repository.port';

@Injectable()
export class BootstrapStatusUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: UserRepository,
  ) {}

  async execute(): Promise<{ available: boolean }> {
    const count = await this.users.findAdminCount();
    return { available: count === 0 };
  }
}
