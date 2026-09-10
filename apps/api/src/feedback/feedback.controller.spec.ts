import 'reflect-metadata';
import { Test, type TestingModule } from '@nestjs/testing';
import { createFeedbackId, createUserId } from '@content-chain/shared';
import { IS_PUBLIC_KEY } from '../shared/decorators/public.decorator';
import { ROLES_KEY } from '../shared/decorators/roles.decorator';
import type { AuthUserContext } from '../shared/types/auth-user-context';
import { CreateFeedbackUseCase } from './application/create-feedback.use-case';
import type { FeedbackEntry } from './domain/feedback.types';
import { CreateFeedbackDto } from './http/dto/create-feedback.dto';
import { FeedbackController } from './feedback.controller';

const sessionUser: AuthUserContext = {
  id: createUserId('usr_11111111-1111-4111-8111-111111111111'),
  email: 'user@example.com',
  role: 'user',
};

describe('FeedbackController', () => {
  let controller: FeedbackController;
  let createFeedback: { execute: jest.Mock };

  beforeEach(async () => {
    createFeedback = { execute: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedbackController],
      providers: [
        { provide: CreateFeedbackUseCase, useValue: createFeedback },
      ],
    }).compile();

    controller = module.get(FeedbackController);
  });

  it('has no @Public() or @Roles() so POST relies on global JwtAuthGuard', () => {
    const proto = FeedbackController.prototype;

    expect(Reflect.getMetadata(IS_PUBLIC_KEY, FeedbackController)).toBeUndefined();
    expect(Reflect.getMetadata(ROLES_KEY, FeedbackController)).toBeUndefined();
    expect(Reflect.getMetadata(IS_PUBLIC_KEY, proto.create)).toBeUndefined();
    expect(Reflect.getMetadata(ROLES_KEY, proto.create)).toBeUndefined();
    expect(Reflect.getMetadata('path', proto.create)).toBe('/');
  });

  it('maps use-case entry to the HTTP payload and delegates execute', async () => {
    const createdAt = new Date('2026-09-10T12:00:00.000Z');
    const entry: FeedbackEntry = {
      id: createFeedbackId('fbk_11111111-1111-4111-8111-111111111111'),
      targetType: 'application',
      agentKey: null,
      runId: null,
      body: 'Great app',
      authorId: sessionUser.id,
      createdAt,
    };
    createFeedback.execute.mockResolvedValue(entry);

    const body: CreateFeedbackDto = {
      targetType: 'application',
      body: 'Great app',
    };

    await expect(controller.create(body, sessionUser)).resolves.toEqual({
      id: entry.id,
      targetType: 'application',
      agentKey: null,
      runId: null,
      body: 'Great app',
      authorId: sessionUser.id,
      createdAt: '2026-09-10T12:00:00.000Z',
    });
    expect(createFeedback.execute).toHaveBeenCalledWith(body, sessionUser);
  });
});
