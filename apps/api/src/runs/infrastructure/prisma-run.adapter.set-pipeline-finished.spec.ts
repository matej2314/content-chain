import { createRunId } from '@content-chain/shared';
import type { PrismaService } from '../../shared/persistence/prisma.service';
import { PrismaRunAdapter } from './prisma-run.adapter';

const RUN_ID = createRunId('run_22222222-2222-4222-8222-222222222222');

describe('PrismaRunAdapter.setPipelineFinishedAt', () => {
  it('updates only when pipelineFinishedAt is still null (idempotent CAS)', async () => {
    const updateMany = jest
      .fn()
      .mockResolvedValueOnce({ count: 1 })
      .mockResolvedValueOnce({ count: 0 });
    const adapter = new PrismaRunAdapter({
      run: { updateMany },
    } as unknown as PrismaService);
    const at = new Date('2026-09-30T10:00:00.000Z');

    await adapter.setPipelineFinishedAt(RUN_ID, at);
    await adapter.setPipelineFinishedAt(RUN_ID, at);

    expect(updateMany).toHaveBeenCalledTimes(2);
    expect(updateMany).toHaveBeenNthCalledWith(1, {
      where: { id: RUN_ID, pipelineFinishedAt: null },
      data: { pipelineFinishedAt: at },
    });
    expect(updateMany).toHaveBeenNthCalledWith(2, {
      where: { id: RUN_ID, pipelineFinishedAt: null },
      data: { pipelineFinishedAt: at },
    });
  });
});
