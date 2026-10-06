import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { ALLOW_GUEST_KEY } from '../decorators/allow-guest.decorator';
import { ENV, type Env } from '../../shared/config/env';
import type { AuthUserContext } from '../types/auth-user-context';
import type { Request } from 'express';

@Injectable()
export class GuestGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(ENV) private readonly env: Env,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const req = context.switchToHttp().getRequest<Request>();
    const user = req.user as AuthUserContext | undefined;
    if (!user || user.role !== 'guest') {
      return true;
    }
    if (!this.env.DEMO_MODE) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const allowed = this.reflector.getAllAndOverride<boolean>(ALLOW_GUEST_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!allowed) {
      throw new ForbiddenException('FORBIDDEN');
    }
    return true;
  }
}
