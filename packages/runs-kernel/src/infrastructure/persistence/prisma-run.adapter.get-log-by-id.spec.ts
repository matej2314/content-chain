import { createRunId } from '@content-chain/shared';
import type { PrismaService } from '@content-chain/persistence';
import { PrismaRunAdapter } from './prisma-run.adapter';

describe('PrismaRunAdapter.getLogById', () => {
  it('returns entry when row exists', async () => {
    const runId = createRunId('run_22222222-2222-4222-8222-222222222222');
    const at = new Date('2026-11-16T12:00:00.000Z');
    const findUnique = jest.fn().mockResolvedValue({
      id: 'log_1',
      runId,
      conversationId: null,
      at,
      level: 'info',
      message: 'hello',
      step: null,
      requestId: null,
    });
    const adapter = new PrismaRunAdapter({
      runLog: { findUnique },
    } as unknown as PrismaService);

    await expect(adapter.getLogById('log_1')).resolves.toEqual({
      runId,
      conversationId: null,
      at,
      level: 'info',
      message: 'hello',
    });
    expect(findUnique).toHaveBeenCalledWith({ where: { id: 'log_1' } });
  });

  it('returns null when row is missing', async () => {
    const findUnique = jest.fn().mockResolvedValue(null);
    const adapter = new PrismaRunAdapter({
      runLog: { findUnique },
    } as unknown as PrismaService);

    await expect(adapter.getLogById('missing')).resolves.toBeNull();
  });
});
