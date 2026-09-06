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
  controllers: [AuthController],
  providers: [
    JwtCookieStrategy,
    PrismaUserAdapter,
    PrismaRefreshSessionAdapter,
    { provide: USER_REPOSITORY, useExisting: PrismaUserAdapter },
    {
      provide: REFRESH_SESSION_REPOSITORY,
      useExisting: PrismaRefreshSessionAdapter,
    },
    BootstrapStatusUseCase,
    BootstrapAdminUseCase,
    LoginUseCase,
    LogoutUseCase,
    RefreshUseCase,
    MeUseCase,
  ],
  exports: [USER_REPOSITORY, JwtModule],
})
export class AuthModule {}
