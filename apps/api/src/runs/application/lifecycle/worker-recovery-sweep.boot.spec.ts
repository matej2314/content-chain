import type { Env } from '../../../shared/config/env.schema';
import type { AutoFinalizeExpiredReviewsUseCase } from '../auto-finalize-expired-reviews.use-case';
import type { RecoverInterruptedRunsUseCase } from '../recover-interrupted-runs.use-case';
import {
  WorkerRecoverySweepBoot,
  type AfterRecoverWake,
} from './worker-recovery-sweep.boot';

const SWEEP_INTERVAL_MS = 5 * 60 * 1000;

describe('WorkerRecoverySweepBoot', () => {
  it('onModuleInit: recover → wake → autoFinalize → setInterval', async () => {
    const order: string[] = [];
    const recoverExecute = jest.fn(async () => {
      order.push('recover');
    });
    const autoFinalizeExecute = jest.fn(async () => {
      order.push('autoFinalize');
      return 0;
    });
    const wake: AfterRecoverWake = {
      notifyQueued: () => {
        order.push('wake');
      },
    };
    const setIntervalSpy = jest
      .spyOn(global, 'setInterval')
      .mockImplementation((() => {
        order.push('setInterval');
        return 0 as unknown as ReturnType<typeof setInterval>;
      }) as unknown as typeof setInterval);

    const boot = new WorkerRecoverySweepBoot(
      {
        REVIEW_TTL: '2h',
        REVIEW_SWEEP_INTERVAL: '5m',
      } as Env,
      { execute: recoverExecute } as unknown as RecoverInterruptedRunsUseCase,
      {
        execute: autoFinalizeExecute,
      } as unknown as AutoFinalizeExpiredReviewsUseCase,
      wake,
    );

    try {
      await boot.onModuleInit();
      expect(order).toEqual([
        'recover',
        'wake',
        'autoFinalize',
        'setInterval',
      ]);
      expect(recoverExecute).toHaveBeenCalledTimes(1);
      expect(autoFinalizeExecute).toHaveBeenCalledTimes(1);
      expect(setIntervalSpy).toHaveBeenCalledWith(
        expect.any(Function),
        SWEEP_INTERVAL_MS,
      );
    } finally {
      setIntervalSpy.mockRestore();
      boot.onModuleDestroy();
    }
  });

  it('onModuleDestroy clears the review sweep interval', async () => {
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
    const timer = 42 as unknown as ReturnType<typeof setInterval>;
    const setIntervalSpy = jest
      .spyOn(global, 'setInterval')
      .mockReturnValue(timer);

    const boot = new WorkerRecoverySweepBoot(
      {
        REVIEW_TTL: '2h',
        REVIEW_SWEEP_INTERVAL: '5m',
      } as Env,
      {
        execute: async () => undefined,
      } as unknown as RecoverInterruptedRunsUseCase,
      {
        execute: async () => 0,
      } as unknown as AutoFinalizeExpiredReviewsUseCase,
      { notifyQueued: () => undefined },
    );

    try {
      await boot.onModuleInit();
      expect(setIntervalSpy).toHaveBeenCalled();
      boot.onModuleDestroy();
      expect(clearIntervalSpy).toHaveBeenCalledWith(timer);
      boot.onModuleDestroy();
      expect(clearIntervalSpy).toHaveBeenCalledTimes(1);
    } finally {
      setIntervalSpy.mockRestore();
      clearIntervalSpy.mockRestore();
    }
  });
});
