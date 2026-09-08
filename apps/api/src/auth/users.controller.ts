import {
  Controller,
  Get,
  Delete,
  Param,
  HttpCode,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../shared/decorators/roles.decorator';
import { ListUsersUseCase } from './application/list-users.use-case';
import { SoftDeleteUserUseCase } from './application/soft-delete-user.use-case';

@ApiTags('users')
@Controller('users')
@Roles('admin')
export class UsersController {
  constructor(
    private readonly listUsers: ListUsersUseCase,
    private readonly softDelete: SoftDeleteUserUseCase,
  ) {}

  @Get()
  list() {
    return this.listUsers.execute();
  }

  @Delete(':id')
  @HttpCode(200)
  delete(@Param('id') id: string) {
    return this.softDelete.execute(id);
  }
}
