import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { Public } from '../shared/decorators/public.decorator';
import { COOKIE_AUTH_NAME } from '../shared/http/configure-swagger';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import {
  setAuthCookies,
  clearAuthCookies,
} from './infrastructure/cookie.helper';
import { BootstrapStatusUseCase } from './application/bootstrap-status.use-case';
import { BootstrapAdminUseCase } from './application/bootstrap-admin.use-case';
import { LoginUseCase } from './application/login.use-case';
import { LogoutUseCase } from './application/logout.use-case';
import { RefreshUseCase } from './application/refresh.use-case';
import { MeUseCase } from './application/me.use-case';
import { AcceptInviteUseCase } from './application/accept-invite.use-case';
import { BootstrapAdminDto } from './http/bootstrap-admin.dto';
import { LoginDto } from './http/login.dto';
import { AcceptInviteDto } from './http/accept-invite.dto';
import { ENV, type Env } from '../shared/config/env';
import { readCookie } from './infrastructure/cookie.helper';
import type { AuthUserContext } from './domain/auth-user.types';
import type { Request, Response } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly bootstrapStatus: BootstrapStatusUseCase,
    private readonly bootstrapAdmin: BootstrapAdminUseCase,
    private readonly login: LoginUseCase,
    private readonly logout: LogoutUseCase,
    private readonly refresh: RefreshUseCase,
    private readonly me: MeUseCase,
    private readonly acceptInvite: AcceptInviteUseCase,
    @Inject(ENV) private readonly env: Env,
  ) {}

  @Public()
  @Get('bootstrap-status')
  getBootstrapStatus() {
    return this.bootstrapStatus.execute();
  }

  @Public()
  @Post('bootstrap-admin')
  @HttpCode(201)
  async postBootstrapAdmin(
    @Body() body: BootstrapAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.bootstrapAdmin.execute(body);
    setAuthCookies(res, result.accessToken, result.refreshToken, this.env);
    return { user: result.user };
  }

  @Public()
  @Post('login')
  @HttpCode(200)
  async postLogin(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.login.execute(body);
    setAuthCookies(res, result.accessToken, result.refreshToken, this.env);
    return {
      expiresIn: this.env.JWT_ACCESS_TTL,
      user: result.user,
    };
  }

  @Public()
  @Post('accept-invite')
  @HttpCode(201)
  async postAcceptInvite(@Body() body: AcceptInviteDto) {
    return this.acceptInvite.execute(body);
  }

  @Public()
  @Post('refresh')
  @HttpCode(200)
  async postRefresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const raw = readCookie(req, 'cc_refresh');
    const result = await this.refresh.execute(raw);
    setAuthCookies(res, result.accessToken, result.refreshToken, this.env);
    return { expiresIn: this.env.JWT_ACCESS_TTL };
  }

  @ApiCookieAuth(COOKIE_AUTH_NAME)
  @Post('logout')
  @HttpCode(200)
  async postLogout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = req.user as AuthUserContext | undefined;
    if (!user) {
      throw new UnauthorizedException();
    }
    const raw = readCookie(req, 'cc_refresh');
    await this.logout.execute(user.id, raw);
    clearAuthCookies(res, this.env);
    return { ok: true };
  }

  @ApiCookieAuth(COOKIE_AUTH_NAME)
  @Get('me')
  async getMe(@CurrentUser() user: AuthUserContext) {
    return this.me.execute(user);
  }
}
