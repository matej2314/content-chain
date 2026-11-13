import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { parseWithZod } from '../../shared/parse-with-zod';
import { hashRefreshToken } from './auth.helpers';
import { confirmEmailChangeSchema } from './auth.schemas';
import {
  EMAIL_CHANGE_REQUEST_REPOSITORY,
  type EmailChangeRequestRepository,
} from '../domain/email-change-request.repository.port';

@Injectable()
export class ConfirmEmailChangeUseCase {
  constructor(
    @Inject(EMAIL_CHANGE_REQUEST_REPOSITORY)
    private readonly emailChanges: EmailChangeRequestRepository,
  ) {}
  async execute(
    input: unknown,
  ): Promise<{ id: string; email: string; role: string }> {
    const command = parseWithZod(confirmEmailChangeSchema, input);
    const tokenHash = hashRefreshToken(command.token);
    const pending = await this.emailChanges.findValidByTokenHash(
      tokenHash,
      new Date(),
    );
    if (!pending) {
      throw new DomainException('UNAUTHORIZED', 'Invalid token', 401);
    }
    return this.emailChanges.consumeAndApplyEmail(
      pending.userId,
      pending.pendingEmail,
    );
  }
}
