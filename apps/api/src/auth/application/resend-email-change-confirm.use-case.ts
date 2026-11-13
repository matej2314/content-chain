import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { ENV, type Env } from '../../shared/config/env';
import {
  EMAIL_CHANGE_REQUEST_REPOSITORY,
  type EmailChangeRequestRepository,
} from '../domain/email-change-request.repository.port';
import {
  TRANSACTIONAL_MAILER,
  type TransactionalMailer,
} from '../domain/transactional-mailer.port';
import { generateRefreshToken, parseTtlMs } from './auth.helpers';
import { formatMailValidityLabel } from './format-mail-validity-label';
import type { AuthUserContext } from '../domain/auth-user.types';
import type { MeResult } from './me.use-case';

@Injectable()
export class ResendEmailChangeConfirmUseCase {
  constructor(
    @Inject(EMAIL_CHANGE_REQUEST_REPOSITORY)
    private readonly emailChanges: EmailChangeRequestRepository,
    @Inject(TRANSACTIONAL_MAILER) private readonly mailer: TransactionalMailer,
    @Inject(ENV) private readonly env: Env,
  ) {}

  async execute(context: AuthUserContext): Promise<MeResult> {
    const pending = await this.emailChanges.findByUserId(context.id);
    if (!pending) {
      throw new DomainException(
        'CONFLICT',
        'No pending email change',
        409,
      );
    }

    const { raw, hash } = generateRefreshToken();
    const expiresAt = new Date(
      Date.now() + parseTtlMs(this.env.EMAIL_CHANGE_TTL),
    );
    const rotated = await this.emailChanges.rotateToken(
      context.id,
      hash,
      expiresAt,
    );

    const confirmUrl = `${this.env.APP_PUBLIC_URL ?? ''}/?emailChangeToken=${raw}`;
    try {
      await this.mailer.send({
        kind: 'email_change_confirm',
        to: rotated.pendingEmail,
        requestId: rotated.id,
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
      id: context.id,
      email: context.email,
      role: context.role,
      pendingEmail: rotated.pendingEmail,
    };
  }
}
