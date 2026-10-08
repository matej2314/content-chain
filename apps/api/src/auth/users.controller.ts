import {
  Controller,
  Body,
  Get,
  Query,
  Patch,
  Delete,
  Param,
  HttpCode,
} from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../shared/decorators/roles.decorator';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import { COOKIE_AUTH_NAME } from '../shared/http/configure-swagger';
import { ListUsersUseCase } from './application/list-users.use-case';
import { ReactivateUserUseCase } from './application/reactivate-user.use-case';
import { PatchUserDto } from './http/patch-user.dto';
import { DeleteUserUseCase } from './application/delete-user.use-case';
import type { AuthUserContext } from './domain/auth-user.types';

@ApiTags('users')
@ApiCookieAuth(COOKIE_AUTH_NAME)
@Controller('users')
@Roles('admin')
export class UsersController {
  constructor(
    private readonly listUsers: ListUsersUseCase,
    private readonly deleteUser: DeleteUserUseCase,
    private readonly reactivate: ReactivateUserUseCase,
  ) {}

  @Get()
  list() {
    return this.listUsers.execute();
  }

  @Patch(':id')
  @HttpCode(200)
  @ApiCookieAuth(COOKIE_AUTH_NAME)
  patch(@Param('id') id: string, @Body() body: PatchUserDto) {
    return this.reactivate.execute(id, body);
  }

  @Delete(':id')
  @HttpCode(200)
  delete(
    @Param('id') id: string,
    @Query('purge') purgeRaw: string | undefined,
    @CurrentUser() user: AuthUserContext,
  ) {
    const purge = purgeRaw === 'true';
    return this.deleteUser.execute(id, user, { purge });
  }
}
