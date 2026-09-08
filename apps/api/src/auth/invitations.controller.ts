import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../shared/decorators/roles.decorator';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import { InviteUserDto } from './http/invite-user.dto';
import { InviteUserUseCase } from './application/invite-user.use-case';
import { ListInvitationsUseCase } from './application/list-invitations.use-case';
import { ResendInvitationUseCase } from './application/resend-invitation.use-case';
import { RevokeInvitationUseCase } from './application/revoke-invitation.use-case';
import type { AuthUserContext } from './domain/auth-user.types';

@ApiTags('invitations')
@Controller('invitations')
@Roles('admin')
export class InvitationsController {
  constructor(
    private readonly listInvitations: ListInvitationsUseCase,
    private readonly inviteUser: InviteUserUseCase,
    private readonly resendInvitation: ResendInvitationUseCase,
    private readonly revokeInvitation: RevokeInvitationUseCase,
  ) {}

  @Get()
  list() {
    return this.listInvitations.execute();
  }

  @Post()
  @HttpCode(201)
  create(@Body() body: InviteUserDto, @CurrentUser() user: AuthUserContext) {
    return this.inviteUser.execute(body, user.id);
  }

  @Post(':id/resend')
  @HttpCode(201)
  resend(@Param('id') id: string) {
    return this.resendInvitation.execute(id);
  }

  @Delete(':id')
  @HttpCode(200)
  revoke(@Param('id') id: string) {
    return this.revokeInvitation.execute(id);
  }
}
