import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import type { RunId } from '@content-chain/shared';
import { PrismaService } from '../../../shared/persistence/prisma.service';
import { toInputJson } from '../../../shared/persistence/to-input-json';
import type { SocialResultStore } from '../../domain/social-result.port';
import type {
  PipelineState,
  SocialContent,
  SocialIdea,
  VerifierVerdict,
  ReelIdea,
  ReelScript,
} from '../../domain/social.types';

@Injectable()
export class PrismaSocialResultAdapter implements SocialResultStore {
  constructor(private readonly prisma: PrismaService) {}

  async replaceIdeas(runId: RunId, ideas: SocialIdea[]): Promise<void> {
    await this.prisma.$transaction([
      this.prisma.socialIdea.deleteMany({ where: { runId } }),
      this.prisma.socialIdea.createMany({
        data: ideas.map((idea) => ({
          id: idea.id,
          runId,
          payload: toInputJson(idea),
        })),
      }),
    ]);
  }

  async replaceReelIdeas(runId: RunId, ideas: ReelIdea[]): Promise<void> {
    await this.prisma.$transaction([
      this.prisma.socialReelIdea.deleteMany({ where: { runId } }),
      this.prisma.socialReelIdea.createMany({
        data: ideas.map((idea) => ({
          id: idea.id,
          runId,
          payload: toInputJson(idea),
        })),
      }),
    ]);
  }

  async replaceContent(
    runId: RunId,
    content: SocialContent,
    verification: VerifierVerdict,
  ): Promise<void> {
    await this.prisma.$transaction([
      this.prisma.socialContent.deleteMany({ where: { runId } }),
      this.prisma.socialContent.create({
        data: {
          id: `sct_${uuidv4()}`,
          runId,
          payload: toInputJson(content),
          verification: toInputJson(verification),
        },
      }),
    ]);
  }

  async replaceReelScript(
    runId: RunId,
    script: ReelScript,
    verification: VerifierVerdict,
  ): Promise<void> {
    await this.prisma.$transaction([
      this.prisma.socialReelScript.deleteMany({ where: { runId } }),
      this.prisma.socialReelScript.create({
        data: {
          id: `srs_${uuidv4()}`,
          runId,
          payload: toInputJson(script),
          verification: toInputJson(verification),
        },
      }),
    ]);
  }

  async listIdeas(runId: RunId): Promise<SocialIdea[]> {
    const rows = await this.prisma.socialIdea.findMany({ where: { runId } });
    return rows.map((row) => row.payload as SocialIdea);
  }

  async listReelIdeas(runId: RunId): Promise<ReelIdea[]> {
    const ideasRows = await this.prisma.socialReelIdea.findMany({
      where: { runId },
    });
    return ideasRows.map((row) => row.payload as ReelIdea);
  }

  async getContent(runId: RunId) {
    const row = await this.prisma.socialContent.findFirst({
      where: { runId },
      orderBy: { createdAt: 'desc' },
    });
    if (!row) return null;
    return {
      content: row.payload as SocialContent,
      verification: (row.verification as VerifierVerdict | null) ?? null,
    };
  }

  async getReelScript(
    runId: RunId,
  ): Promise<{
    script: ReelScript;
    verification: VerifierVerdict | null;
  } | null> {
    const scriptRow = await this.prisma.socialReelScript.findFirst({
      where: { runId },
      orderBy: { createdAt: 'desc' },
    });
    if (!scriptRow) return null;
    return {
      script: scriptRow.payload as ReelScript,
      verification: (scriptRow.verification as VerifierVerdict | null) ?? null,
    };
  }

  async savePipelineState(runId: RunId, state: PipelineState): Promise<void> {
    await this.prisma.run.update({
      where: { id: runId },
      data: {
        pipelinePhase: state.phase,
        ideasRefineCount: state.ideasRefineCount,
        contentRefineCount: state.contentRefineCount,
      },
    });
  }

  async getPipelineState(runId: RunId): Promise<PipelineState> {
    const row = await this.prisma.run.findUnique({ where: { id: runId } });
    return {
      phase: (row?.pipelinePhase as PipelineState['phase']) ?? null,
      ideasRefineCount: row?.ideasRefineCount ?? 0,
      contentRefineCount: row?.contentRefineCount ?? 0,
    };
  }
}
