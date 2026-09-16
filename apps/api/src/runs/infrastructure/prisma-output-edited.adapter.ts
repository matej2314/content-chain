import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import type { Prisma } from '@prisma/client';
import type { RunId } from '@content-chain/shared';
import { PrismaService } from '../../shared/persistence/prisma.service';
import { toInputJson } from '../../shared/persistence/to-input-json';
import type {
  OutputEditedWrite,
  OutputEditedWriter,
} from '../domain/output-edited-writer.port';

@Injectable()
export class PrismaOutputEditedAdapter implements OutputEditedWriter {
  constructor(private readonly prisma: PrismaService) {}

  async commit(
    runId: RunId,
    writes: readonly OutputEditedWrite[],
  ): Promise<boolean> {
    return this.prisma.$transaction(async (tx) => {
      const result = await tx.run.updateMany({
        where: { id: runId, reviewFinalizedAt: null },
        data: { outputEdited: true },
      });
      if (result.count !== 1) {
        return false;
      }
      for (const write of writes) {
        await applyWrite(tx, runId, write);
      }
      return true;
    });
  }
}

async function applyWrite(
  tx: Prisma.TransactionClient,
  runId: RunId,
  write: OutputEditedWrite,
): Promise<void> {
  switch (write.kind) {
    case 'ideas':
      await tx.socialIdea.deleteMany({ where: { runId } });
      await tx.socialIdea.createMany({
        data: write.ideas.map((idea) => ({
          id: idea.id,
          runId,
          payload: toInputJson(idea),
        })),
      });
      return;
    case 'reelIdeas':
      await tx.socialReelIdea.deleteMany({ where: { runId } });
      await tx.socialReelIdea.createMany({
        data: write.ideas.map((idea) => ({
          id: idea.id,
          runId,
          payload: toInputJson(idea),
        })),
      });
      return;
    case 'content':
      await tx.socialContent.deleteMany({ where: { runId } });
      await tx.socialContent.create({
        data: {
          id: `sct_${uuidv4()}`,
          runId,
          payload: toInputJson(write.content),
          verification: toInputJson(write.verification),
        },
      });
      return;
    case 'contents': {
      const verificationJson = toInputJson(write.verification);
      await tx.socialContent.deleteMany({ where: { runId } });
      await tx.socialContent.createMany({
        data: write.items.map((item) => ({
          id: `sct_${uuidv4()}`,
          runId,
          payload: toInputJson(item),
          verification: verificationJson,
        })),
      });
      return;
    }
    case 'reelScript':
      await tx.socialReelScript.deleteMany({ where: { runId } });
      await tx.socialReelScript.create({
        data: {
          id: `srs_${uuidv4()}`,
          runId,
          payload: toInputJson(write.script),
          verification: toInputJson(write.verification),
        },
      });
      return;
    case 'reelScripts': {
      const verificationJson = toInputJson(write.verification);
      await tx.socialReelScript.deleteMany({ where: { runId } });
      await tx.socialReelScript.createMany({
        data: write.items.map((item) => ({
          id: `srs_${uuidv4()}`,
          runId,
          payload: toInputJson(item),
          verification: verificationJson,
        })),
      });
      return;
    }
    case 'pageOutline':
      await tx.contentOutline.deleteMany({ where: { runId } });
      await tx.contentOutline.create({
        data: {
          id: write.outline.id,
          runId,
          payload: toInputJson(write.outline),
        },
      });
      return;
    case 'pageDocument':
      await tx.contentDocument.deleteMany({ where: { runId } });
      await tx.contentDocument.create({
        data: {
          id: `cdoc_${uuidv4()}`,
          runId,
          payload: toInputJson(write.document),
          verification: toInputJson(write.verification),
        },
      });
      return;
    default: {
      const unexpected: never = write;
      throw new Error(
        `unsupported output-edited write: ${JSON.stringify(unexpected)}`,
      );
    }
  }
}
