import 'reflect-metadata';
import { RequestMethod } from '@nestjs/common';
import { Test, type TestingModule } from '@nestjs/testing';
import { createUserId } from '@content-chain/shared';
import { IS_PUBLIC_KEY } from '../shared/decorators/public.decorator';
import { ROLES_KEY } from '../shared/decorators/roles.decorator';
import { DeleteUserUseCase } from './application/delete-user.use-case';
import { ListUsersUseCase } from './application/list-users.use-case';
import { ReactivateUserUseCase } from './application/reactivate-user.use-case';
import type { AuthUserContext, UserListItem } from './domain/auth-user.types';
import type { PatchUserDto } from './http/patch-user.dto';
import { UsersController } from './users.controller';

const USER_ID = createUserId('usr_11111111-1111-4111-8111-111111111111');

const actor: AuthUserContext = {
  id: createUserId('usr_aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'),
  email: 'admin@example.com',
  role: 'admin',
};

const userItem: UserListItem = {
  id: USER_ID,
  email: 'user@example.com',
  role: 'user',
  isActive: true,
  verifiedAt: new Date('2026-01-01T00:00:00.000Z'),
  createdAt: new Date('2026-01-01T00:00:00.000Z'),
};

describe('UsersController', () => {
  let controller: UsersController;
  let listUsers: { execute: jest.Mock };
  let deleteUser: { execute: jest.Mock };
  let reactivate: { execute: jest.Mock };

  beforeEach(async () => {
    listUsers = { execute: jest.fn() };
    deleteUser = { execute: jest.fn() };
    reactivate = { execute: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: ListUsersUseCase, useValue: listUsers },
        { provide: DeleteUserUseCase, useValue: deleteUser },
        { provide: ReactivateUserUseCase, useValue: reactivate },
      ],
    }).compile();

    controller = module.get(UsersController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('requires admin on the class and leaves methods session-protected', () => {
    const proto = UsersController.prototype;

    expect(Reflect.getMetadata(ROLES_KEY, UsersController)).toEqual(['admin']);
    expect(Reflect.getMetadata(IS_PUBLIC_KEY, UsersController)).toBeUndefined();

    expect(Reflect.getMetadata(ROLES_KEY, proto.list)).toBeUndefined();
    expect(Reflect.getMetadata(ROLES_KEY, proto.patch)).toBeUndefined();
    expect(Reflect.getMetadata(ROLES_KEY, proto.delete)).toBeUndefined();
    expect(Reflect.getMetadata(IS_PUBLIC_KEY, proto.list)).toBeUndefined();
    expect(Reflect.getMetadata(IS_PUBLIC_KEY, proto.patch)).toBeUndefined();
    expect(Reflect.getMetadata(IS_PUBLIC_KEY, proto.delete)).toBeUndefined();

    expect(Reflect.getMetadata('path', UsersController)).toBe('users');
    expect(Reflect.getMetadata('path', proto.list)).toBe('/');
    expect(Reflect.getMetadata('path', proto.patch)).toBe(':id');
    expect(Reflect.getMetadata('path', proto.delete)).toBe(':id');

    expect(Reflect.getMetadata('method', proto.list)).toBe(RequestMethod.GET);
    expect(Reflect.getMetadata('method', proto.patch)).toBe(RequestMethod.PATCH);
    expect(Reflect.getMetadata('method', proto.delete)).toBe(
      RequestMethod.DELETE,
    );
  });

  it('delegates GET list without calling mutate use-cases', async () => {
    const payload = { items: [userItem] };
    listUsers.execute.mockResolvedValue(payload);

    await expect(controller.list()).resolves.toBe(payload);
    expect(listUsers.execute).toHaveBeenCalledWith();
    expect(reactivate.execute).not.toHaveBeenCalled();
    expect(deleteUser.execute).not.toHaveBeenCalled();
  });

  it('delegates PATCH :id to ReactivateUserUseCase', async () => {
    const body: PatchUserDto = { isActive: true };
    reactivate.execute.mockResolvedValue(userItem);

    await expect(controller.patch(USER_ID, body)).resolves.toBe(userItem);
    expect(reactivate.execute).toHaveBeenCalledWith(USER_ID, body);
    expect(listUsers.execute).not.toHaveBeenCalled();
    expect(deleteUser.execute).not.toHaveBeenCalled();
  });

  it('delegates DELETE :id with purge=false by default', async () => {
    const payload = { ok: true as const };
    deleteUser.execute.mockResolvedValue(payload);

    await expect(
      controller.delete(USER_ID, undefined, actor),
    ).resolves.toEqual(payload);
    expect(deleteUser.execute).toHaveBeenCalledWith(USER_ID, actor, {
      purge: false,
    });
    expect(listUsers.execute).not.toHaveBeenCalled();
    expect(reactivate.execute).not.toHaveBeenCalled();
  });

  it('maps purge=true query to options.purge', async () => {
    const payload = { ok: true as const };
    deleteUser.execute.mockResolvedValue(payload);

    await expect(controller.delete(USER_ID, 'true', actor)).resolves.toEqual(
      payload,
    );
    expect(deleteUser.execute).toHaveBeenCalledWith(USER_ID, actor, {
      purge: true,
    });
  });
});
