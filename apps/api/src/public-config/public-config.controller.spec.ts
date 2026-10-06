import 'reflect-metadata';
import { Test, type TestingModule } from '@nestjs/testing';
import { IS_PUBLIC_KEY } from '../shared/decorators/public.decorator';
import { ENV, type Env } from '../shared/config/env';
import { PublicConfigController } from './public-config.controller';

function createEnv(demoMode: boolean): Env {
  return {
    DEMO_MODE: demoMode,
    GUEST_GLOBAL_CAP_PER_DAY: 30,
    GUEST_RATING_CAP_PER_DAY: 10,
    REDIS_HOST: '127.0.0.1',
    REDIS_PORT: 6379,
    GATEWAY_KEY: 'secret-gateway-key',
  } as Env;
}

describe('PublicConfigController', () => {
  async function createController(demoMode: boolean): Promise<PublicConfigController> {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicConfigController],
      providers: [{ provide: ENV, useValue: createEnv(demoMode) }],
    }).compile();

    return module.get(PublicConfigController);
  }

  it('marks the controller public so GET /config skips JwtAuthGuard', async () => {
    const controller = await createController(false);

    expect(Reflect.getMetadata(IS_PUBLIC_KEY, PublicConfigController)).toBe(
      true,
    );
    expect(
      Reflect.getMetadata(IS_PUBLIC_KEY, PublicConfigController.prototype.get),
    ).toBeUndefined();
    expect(
      Reflect.getMetadata('path', PublicConfigController.prototype.get),
    ).toBe('/');
    expect(controller).toBeDefined();
  });

  it('returns demoMode false when DEMO_MODE is false', async () => {
    const controller = await createController(false);

    expect(controller.get()).toEqual({ demoMode: false });
  });

  it('returns demoMode true when DEMO_MODE is true', async () => {
    const controller = await createController(true);

    expect(controller.get()).toEqual({ demoMode: true });
  });

  it('exposes only demoMode and never guest/redis/gateway secrets', async () => {
    const controller = await createController(true);
    const body = controller.get();
    const json = JSON.stringify(body);

    expect(Object.keys(body)).toEqual(['demoMode']);
    expect(json).not.toMatch(/GUEST_/);
    expect(json).not.toMatch(/REDIS_/);
    expect(json).not.toContain('GATEWAY_KEY');
    expect(json).not.toContain('secret-gateway-key');
    expect(json).not.toContain('redis://');
  });
});
