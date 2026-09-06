import { Inject, Injectable } from '@nestjs/common';
import { hashRefreshToken } from './auth.helpers';
import {
  REFRESH_SESSION_REPOSITORY,
  type RefreshSessionRepository,
} from '../domain/refresh-session.repository.port';
import type { UserId } from '@content-chain/shared';

@Injectable()
export class LogoutUseCase {
  constructor(
    @Inject(REFRESH_SESSION_REPOSITORY)
    private readonly sessions: RefreshSessionRepository,
  ) {}

  async execute(userId?: UserId, rawRefreshToken?: string): Promise<void> {
    if (rawRefreshToken) {
      const session = await this.sessions.findValidByHash(
        hashRefreshToken(rawRefreshToken),
      );
      if (session) {
        await this.sessions.deleteById(session.id);
      }
      return;
    }
    if (userId) {
      await this.sessions.deleteByUser(userId);
    }
  }
}
