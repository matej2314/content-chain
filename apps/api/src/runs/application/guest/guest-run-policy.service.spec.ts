import {
  createUserId,
  type RunTaskType,
  type UserId,
} from '@content-chain/shared';
import { validateEnv } from '../../../shared/config/env.schema';
import type { Env } from '../../../shared/config/env';
import { DomainException } from '../../../shared/exceptions/domain.exception';
import type { AuthUserContext } from '../../../shared/types/auth-user-context';
import type {
  GuestQuotaAdmitResult,
  GuestQuotaPort,
} from '../../domain/guest-quota.port';
import type { RunRepository } from '../../domain/run.port';
import { GuestRunPolicyService } from './guest-run-policy.service';

const GUEST_ID = createUserId('usr_11111111-1111-4111-8111-111111111111');
const OTHER_ID = createUserId('usr_22222222-2222-4222-8222-222222222222');

const BASE_ENV_FIELDS = {
  DATABASE_URL: 'file:./test.db',
  GATEWAY_BASE_URL: 'http://localhost:3100',
  GATEWAY_KEY: 'test-gateway-key',
  JWT_SECRET: 'test-jwt-secret',
  CORS_ORIGIN: 'http://localhost:3000',
} as const;

const ENV_DEMO_OFF = validateEnv({
  NODE_ENV: 'test',
  ...BASE_ENV_FIELDS,
  DEMO_MODE: 'false',
});

const ENV_DEMO_ON = validateEnv({
  NODE_ENV: 'test',
  ...BASE_ENV_FIELDS,
  DEMO_MODE: 'true',
  REDIS_HOST: '127.0.0.1',
  REDIS_PORT: 6379,
  GUEST_GLOBAL_CAP_PER_DAY: '30',
});

function guestActor(): AuthUserContext {
  return { id: GUEST_ID, email: 'guest@example.com', role: 'guest' };
}

function userActor(): AuthUserContext {
  return { id: GUEST_ID, email: 'user@example.com', role: 'user' };
}

function adminActor(): AuthUserContext {
  return { id: GUEST_ID, email: 'admin@example.com', role: 'admin' };
}

function makeService(args: {
  env: Env;
  usedCount?: number;
  admit?: GuestQuotaAdmitResult;
}): {
  service: GuestRunPolicyService;
  countByUserAndType: jest.Mock<Promise<number>, [UserId, RunTaskType]>;
  tryAdmitDailyRun: jest.Mock<Promise<GuestQuotaAdmitResult>, [number, Date?]>;
  releaseDailyRun: jest.Mock<Promise<void>, [Date?]>;
} {
  const countByUserAndType = jest.fn<Promise<number>, [UserId, RunTaskType]>(
    async () => args.usedCount ?? 0,
  );
  const tryAdmitDailyRun = jest.fn<
    Promise<GuestQuotaAdmitResult>,
    [number, Date?]
  >(async () => args.admit ?? { kind: 'ok' });
  const releaseDailyRun = jest.fn<Promise<void>, [Date?]>(
    async () => undefined,
  );
  const tryAdmitDailyRating = jest.fn<
    Promise<GuestQuotaAdmitResult>,
    [UserId, number, Date?]
  >(async () => ({ kind: 'ok' }));
  const runs = { countByUserAndType } as unknown as RunRepository;
  const quota: GuestQuotaPort = {
    tryAdmitDailyRun,
    releaseDailyRun,
    tryAdmitDailyRating,
  };
  return {
    service: new GuestRunPolicyService(args.env, runs, quota),
    countByUserAndType,
    tryAdmitDailyRun,
    releaseDailyRun,
  };
}

async function expectForbiddenCode(
  action: () => Promise<unknown>,
  code: string,
): Promise<void> {
  const error = await action().catch((err: unknown) => err);
  expect(error).toBeInstanceOf(DomainException);
  expect(error).toMatchObject({
    code,
    httpStatus: 403,
  });
}

describe('GuestRunPolicyService', () => {
  describe('admitStart', () => {
    it('returns null for admin and does not count or admit (D-54)', async () => {
      const { service, countByUserAndType, tryAdmitDailyRun } = makeService({
        env: ENV_DEMO_ON,
      });

      await expect(
        service.admitStart(adminActor(), 'post_ideas'),
      ).resolves.toBeNull();

      expect(countByUserAndType).not.toHaveBeenCalled();
      expect(tryAdmitDailyRun).not.toHaveBeenCalled();
    });

    it('returns null for user even when DEMO_MODE is on', async () => {
      const { service, countByUserAndType, tryAdmitDailyRun } = makeService({
        env: ENV_DEMO_ON,
      });

      await expect(
        service.admitStart(userActor(), 'post_content'),
      ).resolves.toBeNull();

      expect(countByUserAndType).not.toHaveBeenCalled();
      expect(tryAdmitDailyRun).not.toHaveBeenCalled();
    });

    it('returns null for guest when DEMO_MODE is off', async () => {
      const { service, countByUserAndType, tryAdmitDailyRun } = makeService({
        env: ENV_DEMO_OFF,
      });

      await expect(
        service.admitStart(guestActor(), 'post_ideas'),
      ).resolves.toBeNull();

      expect(countByUserAndType).not.toHaveBeenCalled();
      expect(tryAdmitDailyRun).not.toHaveBeenCalled();
    });

    it('rejects a type outside the allowlist with GUEST_TYPE_NOT_ALLOWED (D-54)', async () => {
      const { service, countByUserAndType, tryAdmitDailyRun } = makeService({
        env: ENV_DEMO_ON,
      });

      await expectForbiddenCode(
        () => service.admitStart(guestActor(), 'post_content'),
        'GUEST_TYPE_NOT_ALLOWED',
      );

      expect(countByUserAndType).not.toHaveBeenCalled();
      expect(tryAdmitDailyRun).not.toHaveBeenCalled();
    });

    it('rejects a second start of the same type even when the first run failed (D-54)', async () => {
      const { service, countByUserAndType, tryAdmitDailyRun } = makeService({
        env: ENV_DEMO_ON,
        usedCount: 1,
      });

      await expectForbiddenCode(
        () => service.admitStart(guestActor(), 'post_ideas'),
        'GUEST_TYPE_QUOTA_EXCEEDED',
      );

      expect(countByUserAndType).toHaveBeenCalledWith(GUEST_ID, 'post_ideas');
      expect(tryAdmitDailyRun).not.toHaveBeenCalled();
    });

    it('rejects Redis exceeded with GUEST_GLOBAL_QUOTA_EXCEEDED (D-54)', async () => {
      const { service, tryAdmitDailyRun } = makeService({
        env: ENV_DEMO_ON,
        usedCount: 0,
        admit: { kind: 'exceeded' },
      });

      await expectForbiddenCode(
        () => service.admitStart(guestActor(), 'page_copy'),
        'GUEST_GLOBAL_QUOTA_EXCEEDED',
      );

      expect(tryAdmitDailyRun).toHaveBeenCalledWith(
        ENV_DEMO_ON.GUEST_GLOBAL_CAP_PER_DAY,
      );
    });

    it('fail-closes Redis unavailable as GUEST_GLOBAL_QUOTA_EXCEEDED (D-58)', async () => {
      const { service, tryAdmitDailyRun } = makeService({
        env: ENV_DEMO_ON,
        usedCount: 0,
        admit: { kind: 'unavailable' },
      });

      await expectForbiddenCode(
        () => service.admitStart(guestActor(), 'page_outline_then_copy'),
        'GUEST_GLOBAL_QUOTA_EXCEEDED',
      );

      expect(tryAdmitDailyRun).toHaveBeenCalled();
    });

    it('admits an allowed type and release() calls quota.releaseDailyRun', async () => {
      const { service, countByUserAndType, tryAdmitDailyRun, releaseDailyRun } =
        makeService({
          env: ENV_DEMO_ON,
          usedCount: 0,
          admit: { kind: 'ok' },
        });
      const taskType: RunTaskType = 'post_ideas';

      const admit = await service.admitStart(guestActor(), taskType);

      expect(admit).not.toBeNull();
      expect(countByUserAndType).toHaveBeenCalledWith(GUEST_ID, taskType);
      expect(tryAdmitDailyRun).toHaveBeenCalledWith(
        ENV_DEMO_ON.GUEST_GLOBAL_CAP_PER_DAY,
      );

      await admit?.release();
      expect(releaseDailyRun).toHaveBeenCalledTimes(1);
    });
  });

  describe('assertGuestOwnsRun', () => {
    it('is a no-op for non-guest actors', () => {
      const { service } = makeService({ env: ENV_DEMO_ON });

      expect(() =>
        service.assertGuestOwnsRun(adminActor(), OTHER_ID),
      ).not.toThrow();
      expect(() => service.assertGuestOwnsRun(userActor(), null)).not.toThrow();
    });

    it('allows a guest when startedByUserId matches the actor', () => {
      const { service } = makeService({ env: ENV_DEMO_ON });

      expect(() =>
        service.assertGuestOwnsRun(guestActor(), GUEST_ID),
      ).not.toThrow();
    });

    it('rejects a guest on a foreign or unowned run with FORBIDDEN', () => {
      const { service } = makeService({ env: ENV_DEMO_ON });

      expect(() => service.assertGuestOwnsRun(guestActor(), OTHER_ID)).toThrow(
        expect.objectContaining({
          name: 'DomainException',
          code: 'FORBIDDEN',
          httpStatus: 403,
        }),
      );
      expect(() => service.assertGuestOwnsRun(guestActor(), null)).toThrow(
        expect.objectContaining({
          name: 'DomainException',
          code: 'FORBIDDEN',
          httpStatus: 403,
        }),
      );
    });
  });
});
