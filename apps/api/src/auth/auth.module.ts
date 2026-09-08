import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../shared/persistence/prisma.module';
import { EnvModule } from '../shared/config/env.module';
import { ENV, type Env } from '../shared/config/env';
import { JwtCookieStrategy } from './infrastructure/jwt-cookie.strategy';
import { PrismaUserAdapter } from './infrastructure/prisma-user.adapter';
import { PrismaRefreshSessionAdapter } from './infrastructure/prisma-refresh-session.adapter';
import { USER_REPOSITORY } from './domain/user-repository.port';
import { REFRESH_SESSION_REPOSITORY } from './domain/refresh-session.repository.port';
import { BootstrapAdminUseCase } from './application/bootstrap-admin.use-case';
import { BootstrapStatusUseCase } from './application/bootstrap-status.use-case';
import { LoginUseCase } from './application/login.use-case';
import { LogoutUseCase } from './application/logout.use-case';
import { RefreshUseCase } from './application/refresh.use-case';
import { MeUseCase } from './application/me.use-case';
import { parseTtlSeconds } from './application/auth.helpers';
import { UsersController } from './users.controller';
import { InvitationsController } from './invitations.controller';
import { PrismaInvitationAdapter } from './infrastructure/prisma-invitation.adapter';
import { INVITATION_REPOSITORY } from './domain/invitation-repository.port';
import {
  TRANSACTIONAL_MAILER,
  TransactionalMailer,
} from './domain/transactional-mailer.port';
import { NodemailerSmtpMailerAdapter } from './infrastructure/nodemailer-smtp-mailer.adapter';
import { LoggingMailerAdapter } from './infrastructure/logging-mailer.adapter';
import { ListUsersUseCase } from './application/list-users.use-case';
import { InviteUserUseCase } from './application/invite-user.use-case';
import { ListInvitationsUseCase } from './application/list-invitations.use-case';
import { ResendInvitationUseCase } from './application/resend-invitation.use-case';
import { RevokeInvitationUseCase } from './application/revoke-invitation.use-case';
import { AcceptInviteUseCase } from './application/accept-invite.use-case';
import { SoftDeleteUserUseCase } from './application/soft-delete-user.use-case';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [EnvModule],
      inject: [ENV],
      useFactory: (env: Env) => ({
        secret: env.JWT_SECRET,
        signOptions: { expiresIn: parseTtlSeconds(env.JWT_ACCESS_TTL) },
      }),
    }),
    PrismaModule,
    EnvModule,
  ],
  controllers: [AuthController, UsersController, InvitationsController],
  providers: [
    JwtCookieStrategy,
    PrismaUserAdapter,
    PrismaRefreshSessionAdapter,
    PrismaInvitationAdapter,
    { provide: USER_REPOSITORY, useExisting: PrismaUserAdapter },
    {
      provide: REFRESH_SESSION_REPOSITORY,
      useExisting: PrismaRefreshSessionAdapter,
    },
    { provide: INVITATION_REPOSITORY, useExisting: PrismaInvitationAdapter },
    {
      provide: TRANSACTIONAL_MAILER,
      inject: [ENV],
      useFactory: (env: Env): TransactionalMailer => {
        if (env.NODE_ENV === 'production') {
          return new NodemailerSmtpMailerAdapter(env);
        }
        return new LoggingMailerAdapter();
      },
    },
    BootstrapStatusUseCase,
    BootstrapAdminUseCase,
    LoginUseCase,
    LogoutUseCase,
    RefreshUseCase,
    MeUseCase,
    ListUsersUseCase,
    InviteUserUseCase,
    ListInvitationsUseCase,
    ResendInvitationUseCase,
    RevokeInvitationUseCase,
    AcceptInviteUseCase,
    SoftDeleteUserUseCase,
  ],
  exports: [USER_REPOSITORY, JwtModule],
})
export class AuthModule {}
