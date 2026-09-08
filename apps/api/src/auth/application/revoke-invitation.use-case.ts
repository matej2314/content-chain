import { Inject, Injectable } from '@nestjs/common';
import { createInvitationId, isInvitationId } from '@content-chain/shared';
import { DomainException } from '../../shared/exceptions/domain.exception';
import {
  INVITATION_REPOSITORY,
  type InvitationRepository,
} from '../domain/invitation-repository.port';

@Injectable()
export class RevokeInvitationUseCase {
  constructor(
    @Inject(INVITATION_REPOSITORY)
    private readonly invitations: InvitationRepository,
  ) {}

  async execute(idParam: string): Promise<{ ok: true }> {
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
    await this.invitations.revoke(invitationId);
    return { ok: true };
  }
}
