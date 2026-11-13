import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { createEmailChangeRequestId } from '@content-chain/shared';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { parseWithZod } from '../../shared/parse-with-zod';
import { ENV, type Env } from '../../shared/config/env';
import {
  USER_REPOSITORY,
  type UserRepository,
} from '../domain/user-repository.port';
import {
  EMAIL_CHANGE_REQUEST_REPOSITORY,
  type EmailChangeRequestRepository,
} from '../domain/email-change-request.repository.port';
import {
  TRANSACTIONAL_MAILER,
  type TransactionalMailer,
} from '../domain/transactional-mailer.port';
import {
  comparePassword,
  generateRefreshToken,
  parseTtlMs,
} from './auth.helpers';
import { formatMailValidityLabel } from './format-mail-validity-label';
import { updateMeEmailSchema } from './auth.schemas';
import type { AuthUserContext } from '../domain/auth-user.types';
import type { MeResult } from './me.use-case';

@Injectable()
export class UpdateMeEmailUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: UserRepository,
    @Inject(EMAIL_CHANGE_REQUEST_REPOSITORY)
    private readonly emailChanges: EmailChangeRequestRepository,
    @Inject(TRANSACTIONAL_MAILER) private readonly mailer: TransactionalMailer,
    @Inject(ENV) private readonly env: Env,
  ) {}

  async execute(
    context: AuthUserContext,
    input: unknown,
  ): Promise<MeResult> {
    const command = parseWithZod(updateMeEmailSchema, input);

    const current = await this.users.findForAuth(context.email);
    if (!current || !current.isActive || current.id !== context.id) {
      throw new DomainException(
        'UNAUTHORIZED',
        'User not found or inactive',
        401,
      );
    }

    const isPasswordValid = await comparePassword(
      command.currentPassword,
      current.passwordHash,
    );

    if (!isPasswordValid) {
      throw new DomainException('INVALID_PASSWORD', 'Invalid password', 401);
    }

    if (current.email === command.email) {
      const pending = await this.emailChanges.findByUserId(context.id);
      return {
        id: current.id,
        email: current.email,
        role: current.role,
        pendingEmail: pending?.pendingEmail ?? null,
      };
    }

    const occupiedUser = await this.users.findForAuth(command.email);
    if (occupiedUser) {
      throw new DomainException('CONFLICT', 'Email already in use', 409);
    }
    const occupiedPending = await this.emailChanges.findByPendingEmail(
      command.email,
    );
    if (occupiedPending && occupiedPending.userId !== context.id) {
      throw new DomainException('CONFLICT', 'Email already in use', 409);
    }

    const { raw, hash } = generateRefreshToken();
    const expiresAt = new Date(
      Date.now() + parseTtlMs(this.env.EMAIL_CHANGE_TTL),
    );
    const requestId = createEmailChangeRequestId(`ecr_${randomUUID()}`);
    await this.emailChanges.upsertForUser({
      id: requestId,
      userId: context.id,
      pendingEmail: command.email,
      tokenHash: hash,
      expiresAt,
    });

    const confirmUrl = `${this.env.APP_PUBLIC_URL ?? ''}/?emailChangeToken=${raw}`;
    try {
      await this.mailer.send({
        kind: 'email_change_confirm',
        to: command.email,
        requestId,
        confirmUrl,
        rawToken: raw,
        validityLabel: formatMailValidityLabel(this.env.EMAIL_CHANGE_TTL),
      });
    } catch {
      throw new DomainException(
        'MAIL_DELIVERY_FAILED',
        'Failed to deliver confirmation email',
        503,
        [{ id: context.id }],
      );
    }

    return {
      id: current.id,
      email: current.email,
      role: current.role,
      pendingEmail: command.email,
    };
  }
}
