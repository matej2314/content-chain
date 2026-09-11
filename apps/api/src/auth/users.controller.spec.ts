import 'reflect-metadata';
import { RequestMethod } from '@nestjs/common';
import { Test, type TestingModule } from '@nestjs/testing';
import { createUserId } from '@content-chain/shared';
import { IS_PUBLIC_KEY } from '../shared/decorators/public.decorator';
import { ROLES_KEY } from '../shared/decorators/roles.decorator';
import { ListUsersUseCase } from './application/list-users.use-case';
import { ReactivateUserUseCase } from './application/reactivate-user.use-case';
import { SoftDeleteUserUseCase } from './application/soft-delete-user.use-case';
import type { UserListItem } from './domain/auth-user.types';
import type { PatchUserDto } from './http/patch-user.dto';
import { UsersController } from './users.controller';

const USER_ID = createUserId('usr_11111111-1111-4111-8111-111111111111');

const userItem: UserListItem = {
  id: USER_ID,
  email: 'user@example.com',
  role: 'user',
  isActive: true,
  createdAt: new Date('2026-01-01T00:00:00.000Z'),
};

describe('UsersController', () => {
  let controller: UsersController;
  let listUsers: { execute: jest.Mock };
  let softDelete: { execute: jest.Mock };
  let reactivate: { execute: jest.Mock };

  beforeEach(async () => {
    listUsers = { execute: jest.fn() };
    softDelete = { execute: jest.fn() };
    reactivate = { execute: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: ListUsersUseCase, useValue: listUsers },
        { provide: SoftDeleteUserUseCase, useValue: softDelete },
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
    expect(softDelete.execute).not.toHaveBeenCalled();
  });

  it('delegates PATCH :id to ReactivateUserUseCase', async () => {
    const body: PatchUserDto = { isActive: true };
    reactivate.execute.mockResolvedValue(userItem);

    await expect(controller.patch(USER_ID, body)).resolves.toBe(userItem);
    expect(reactivate.execute).toHaveBeenCalledWith(USER_ID, body);
    expect(listUsers.execute).not.toHaveBeenCalled();
    expect(softDelete.execute).not.toHaveBeenCalled();
  });

  it('delegates DELETE :id to SoftDeleteUserUseCase', async () => {
    const payload = { ok: true as const };
    softDelete.execute.mockResolvedValue(payload);

    await expect(controller.delete(USER_ID)).resolves.toBe(payload);
    expect(softDelete.execute).toHaveBeenCalledWith(USER_ID);
    expect(listUsers.execute).not.toHaveBeenCalled();
    expect(reactivate.execute).not.toHaveBeenCalled();
  });
});
