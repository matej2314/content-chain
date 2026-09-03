import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import type { RunId } from '@content-chain/shared';
import { PrismaService } from '../../../shared/persistence/prisma.service';
import { toInputJson } from '../../../shared/persistence/to-input-json';
import type { ContentResultStore } from '../../domain/content-result.port';
import type {
  ContentPipelinePhase,
  ContentPipelineState,
  PageDocument,
  PageOutline,
  VerifierVerdict,
} from '../../domain/content.types';

function toContentPipelinePhase(
  value: string | null | undefined,
): ContentPipelinePhase | null {
  if (value === 'outline' || value === 'copy') {
    return value;
  }
  return null;
}

@Injectable()
export class PrismaContentResultAdapter implements ContentResultStore {
  constructor(private readonly prisma: PrismaService) {}

  async replaceOutline(runId: RunId, outline: PageOutline): Promise<void> {
    await this.prisma.$transaction([
      this.prisma.contentOutline.deleteMany({ where: { runId } }),
      this.prisma.contentOutline.create({
        data: {
          id: outline.id,
          runId,
          payload: toInputJson(outline),
        },
      }),
    ]);
  }

  async replaceDocument(
    runId: RunId,
    document: PageDocument,
    verification: VerifierVerdict,
  ): Promise<void> {
    await this.prisma.$transaction([
      this.prisma.contentDocument.deleteMany({ where: { runId } }),
      this.prisma.contentDocument.create({
        data: {
          id: `cdoc_${uuidv4()}`,
          runId,
          payload: toInputJson(document),
          verification: toInputJson(verification),
        },
      }),
    ]);
  }

  async getOutline(runId: RunId): Promise<PageOutline | null> {
    const row = await this.prisma.contentOutline.findFirst({
      where: { runId },
      orderBy: { createdAt: 'desc' },
    });
    if (!row) return null;
    return row.payload as PageOutline;
  }

  async getDocument(runId: RunId): Promise<{
    document: PageDocument;
    verification: VerifierVerdict | null;
  } | null> {
    const row = await this.prisma.contentDocument.findFirst({
      where: { runId },
      orderBy: { createdAt: 'desc' },
    });
    if (!row) return null;
    return {
      document: row.payload as PageDocument,
      verification: (row.verification as VerifierVerdict | null) ?? null,
    };
  }

  async savePipelineState(
    runId: RunId,
    state: ContentPipelineState,
  ): Promise<void> {
    await this.prisma.run.update({
      where: { id: runId },
      data: {
        pipelinePhase: state.phase,
        outlineRefineCount: state.outlineRefineCount,
        copyRefineCount: state.copyRefineCount,
      },
    });
  }

  async getPipelineState(runId: RunId): Promise<ContentPipelineState> {
    const row = await this.prisma.run.findUnique({ where: { id: runId } });
    return {
      phase: toContentPipelinePhase(row?.pipelinePhase),
      outlineRefineCount: row?.outlineRefineCount ?? 0,
      copyRefineCount: row?.copyRefineCount ?? 0,
    };
  }
}
