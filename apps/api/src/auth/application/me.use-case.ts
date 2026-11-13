import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../shared/exceptions/domain.exception';
import {
  USER_REPOSITORY,
  type UserRepository,
} from '../domain/user-repository.port';
import {
  EMAIL_CHANGE_REQUEST_REPOSITORY,
  type EmailChangeRequestRepository,
} from '../domain/email-change-request.repository.port';
import type { AuthUserContext } from '../domain/auth-user.types';

export type MeResult = {
  id: AuthUserContext['id'];
  email: string;
  role: AuthUserContext['role'];
  pendingEmail: string | null;
};

@Injectable()
export class MeUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: UserRepository,
    @Inject(EMAIL_CHANGE_REQUEST_REPOSITORY)
    private readonly emailChanges: EmailChangeRequestRepository,
  ) {}

  async execute(context: AuthUserContext): Promise<MeResult> {
    const user = await this.users.findById(context.id);
    if (!user || !user.isActive) {
      throw new DomainException(
        'UNAUTHORIZED',
        'User not found or inactive',
        401,
      );
    }
    const pending = await this.emailChanges.findByUserId(context.id);
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      pendingEmail: pending?.pendingEmail ?? null,
    };
  }
}
