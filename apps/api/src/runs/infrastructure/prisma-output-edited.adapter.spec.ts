import type { Prisma } from '@prisma/client';
import { createRunId } from '@content-chain/shared';
import { PrismaOutputEditedAdapter } from './prisma-output-edited.adapter';
import type { PrismaService } from '../../shared/persistence/prisma.service';

const RUN_ID = createRunId('run_11111111-1111-4111-8111-111111111111');

type TxMock = {
  run: { updateMany: jest.Mock };
  socialContent: {
    deleteMany: jest.Mock;
    create: jest.Mock;
    createMany: jest.Mock;
  };
};

function mockPrisma(tx: TxMock): PrismaService {
  return {
    $transaction: async (
      fn: (client: Prisma.TransactionClient) => Promise<boolean>,
    ) => fn(tx as unknown as Prisma.TransactionClient),
  } as unknown as PrismaService;
}

describe('PrismaOutputEditedAdapter', () => {
  it('returns false without artifact writes when review is already finalized', async () => {
    const tx: TxMock = {
      run: { updateMany: jest.fn(async () => ({ count: 0 })) },
      socialContent: {
        deleteMany: jest.fn(),
        create: jest.fn(),
        createMany: jest.fn(),
      },
    };
    const adapter = new PrismaOutputEditedAdapter(mockPrisma(tx));

    await expect(
      adapter.commit(RUN_ID, [
        {
          kind: 'content',
          content: { body: 'nowy', hashtags: [], characterCount: 4 },
          verification: { ok: true, contextIssues: [], languageIssues: [] },
        },
      ]),
    ).resolves.toBe(false);

    expect(tx.run.updateMany).toHaveBeenCalledWith({
      where: { id: RUN_ID, reviewFinalizedAt: null },
      data: { outputEdited: true },
    });
    expect(tx.socialContent.deleteMany).not.toHaveBeenCalled();
    expect(tx.socialContent.create).not.toHaveBeenCalled();
  });

  it('sets the flag and replaces content in the same transaction when review is open', async () => {
    const tx: TxMock = {
      run: { updateMany: jest.fn(async () => ({ count: 1 })) },
      socialContent: {
        deleteMany: jest.fn(async () => ({ count: 1 })),
        create: jest.fn(async () => ({ id: 'sct_1' })),
        createMany: jest.fn(),
      },
    };
    const adapter = new PrismaOutputEditedAdapter(mockPrisma(tx));
    const content = {
      body: 'nowy tekst',
      hashtags: ['#a'],
      characterCount: 10,
    };

    await expect(
      adapter.commit(RUN_ID, [
        {
          kind: 'content',
          content,
          verification: { ok: true, contextIssues: [], languageIssues: [] },
        },
      ]),
    ).resolves.toBe(true);

    expect(tx.run.updateMany.mock.invocationCallOrder[0]).toBeLessThan(
      tx.socialContent.deleteMany.mock.invocationCallOrder[0],
    );
    expect(tx.socialContent.deleteMany).toHaveBeenCalledWith({
      where: { runId: RUN_ID },
    });
    expect(tx.socialContent.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          runId: RUN_ID,
          payload: content,
        }),
      }),
    );
  });
});
