import { Inject, Injectable } from '@nestjs/common';
import { createInvitationId, isInvitationId } from '@content-chain/shared';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { ENV, type Env } from '../../shared/config/env';
import {
  INVITATION_REPOSITORY,
  type InvitationRepository,
} from '../domain/invitation-repository.port';
import {
  TRANSACTIONAL_MAILER,
  type TransactionalMailer,
} from '../domain/transactional-mailer.port';
import { generateRefreshToken, parseTtlMs } from './auth.helpers';
import type { InviteUserResult } from './invite-user.use-case';

@Injectable()
export class ResendInvitationUseCase {
  constructor(
    @Inject(INVITATION_REPOSITORY)
    private readonly invitations: InvitationRepository,
    @Inject(TRANSACTIONAL_MAILER) private readonly mailer: TransactionalMailer,
    @Inject(ENV) private readonly env: Env,
  ) {}

  async execute(idParam: string): Promise<InviteUserResult> {
    if (!isInvitationId(idParam)) {
      throw new DomainException(
        'VALIDATION_FAILED',
        'Invalid invitation ID',
        400,
      );
    }

    const invitationId = createInvitationId(idParam);
    const existing = await this.invitations.findById(invitationId);
    if (!existing || existing.status !== 'pending') {
      throw new DomainException(
        'INVITATION_NOT_FOUND',
        'Invitation not found',
        404,
      );
    }

    const { raw, hash } = generateRefreshToken();
    const expiresAt = new Date(Date.now() + parseTtlMs(this.env.INVITE_TTL));
    const saved = await this.invitations.rotateToken({
      id: invitationId,
      tokenHash: hash,
      expiresAt,
    });

    try {
      await this.mailer.send({
        kind: 'user_invited',
        to: saved.email,
        invitationId: saved.id,
        acceptUrl: `${this.env.APP_PUBLIC_URL ?? ''}/invite/accept?token=${raw}`,
        rawToken: raw,
      });
    } catch {
      throw new DomainException(
        'MAIL_DELIVERY_FAILED',
        'Mail delivery failed',
        503,
        [{ id: saved.id }],
      );
    }

    return {
      id: saved.id,
      email: saved.email,
      expiresAt: saved.expiresAt.toISOString(),
    };
  }
}
