import 'reflect-metadata';
import { Test, type TestingModule } from '@nestjs/testing';
import { IS_PUBLIC_KEY } from '../shared/decorators/public.decorator';
import { HealthController } from './health.controller';
import {
  HealthService,
  type HealthLiveness,
  type HealthReadiness,
} from './health.service';

describe('HealthController', () => {
  let controller: HealthController;
  let healthService: { liveness: jest.Mock; readiness: jest.Mock };

  beforeEach(async () => {
    healthService = { liveness: jest.fn(), readiness: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [{ provide: HealthService, useValue: healthService }],
    }).compile();

    controller = module.get(HealthController);
  });

  it('marks the controller public so GET /health skips JwtAuthGuard', () => {
    expect(Reflect.getMetadata(IS_PUBLIC_KEY, HealthController)).toBe(true);
    expect(
      Reflect.getMetadata(IS_PUBLIC_KEY, HealthController.prototype.liveness),
    ).toBeUndefined();
    expect(
      Reflect.getMetadata(IS_PUBLIC_KEY, HealthController.prototype.readiness),
    ).toBeUndefined();
    expect(
      Reflect.getMetadata('path', HealthController.prototype.liveness),
    ).toBe('/');
    expect(
      Reflect.getMetadata('path', HealthController.prototype.readiness),
    ).toBe('ready');
  });

  it('delegates liveness to HealthService', () => {
    const body: HealthLiveness = {
      status: 'healthy',
      timestamp: '2026-09-08T10:00:00.000Z',
    };
    healthService.liveness.mockReturnValue(body);

    expect(controller.liveness()).toBe(body);
    expect(healthService.liveness).toHaveBeenCalledTimes(1);
  });

  it('delegates readiness to HealthService', async () => {
    const body: HealthReadiness = {
      status: 'ready',
      timestamp: '2026-10-03T10:00:00.000Z',
      checks: {
        api: { status: 'healthy', message: 'API process up' },
        gateway: { status: 'healthy', message: 'Gateway process up' },
      },
    };
    healthService.readiness.mockResolvedValue(body);

    await expect(controller.readiness()).resolves.toBe(body);
    expect(healthService.readiness).toHaveBeenCalledTimes(1);
  });
});
