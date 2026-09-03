import { Inject, Injectable } from '@nestjs/common';
import { isContentTaskType, type ContentKind } from '@content-chain/shared';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { LlmGatewayError } from '../../llm/llm-gateway.errors';
import {
  CONTENT_RESULT_STORE,
  type ContentResultStore,
} from '../domain/content-result.port';
import {
  RUN_LIFECYCLE,
  type RunLifecyclePort,
} from '../../runs/domain/run-lifecycle.port';
import { ContentPipelineFacade } from './content-pipeline.facade';
import type {
  ContentPipelinePhase,
  PageOutline,
} from '../domain/content.types';
import type { RunExecutorPort } from '../../runs/domain/run-executor.port';
import {
  isContentRunRecord,
  type ContentRunRecord,
  type RunRecord,
} from '../../runs/domain/run.types';

function isMissingContentKind(run: {
  taskType: string;
  contentKind: ContentKind | null;
}): boolean {
  return isContentTaskType(run.taskType) && run.contentKind == null;
}

function isCanonicalOutlineSelection(
  selectedIdeaIds: string[] | null,
  outline: PageOutline | null,
): boolean {
  const selectedId = selectedIdeaIds?.[0];
  return (
    outline != null &&
    selectedIdeaIds != null &&
    selectedIdeaIds.length === 1 &&
    selectedId === outline.id
  );
}

@Injectable()
export class ContentRunExecutor implements RunExecutorPort {
  constructor(
    @Inject(ContentPipelineFacade)
    private readonly facade: Pick<ContentPipelineFacade, 'invokePhase'>,
    @Inject(RUN_LIFECYCLE) private readonly lifecycle: RunLifecyclePort,
    @Inject(CONTENT_RESULT_STORE)
    private readonly resultStore: ContentResultStore,
  ) {}

  private resolvePhase(
    run: ContentRunRecord,
    storedPhase: ContentPipelinePhase | null,
  ): ContentPipelinePhase {
    if (run.taskType === 'page_copy') return 'copy';
    if (
      run.taskType === 'page_outline_then_copy' &&
      run.selectedIdeaIds &&
      run.selectedIdeaIds.length > 0
    ) {
      return 'copy';
    }
    if (storedPhase) return storedPhase;
    return 'outline';
  }

  async execute(run: RunRecord): Promise<void> {
    if (!isContentRunRecord(run)) {
      throw new Error(
        `ContentRunExecutor received non-content taskType: ${run.taskType}`,
      );
    }

    const contentRun: ContentRunRecord = run;

    if (isMissingContentKind(contentRun)) {
      await this.lifecycle.transition(contentRun, 'failed', {
        failedCode: 'CONTENT_KIND_REQUIRED',
        failedMessage: 'contentKind is required for page tasks',
      });
      return;
    }

    const outline = await this.resultStore.getOutline(contentRun.id);
    const pipeline = await this.resultStore.getPipelineState(contentRun.id);

    if (
      contentRun.taskType === 'page_outline_then_copy' &&
      contentRun.selectedIdeaIds &&
      contentRun.selectedIdeaIds.length > 0 &&
      !isCanonicalOutlineSelection(contentRun.selectedIdeaIds, outline)
    ) {
      await this.lifecycle.transition(contentRun, 'failed', {
        failedCode: 'HITL_INVALID_SELECTION',
        failedMessage: 'selectedIdeaIds must be exactly [outline.id]',
      });
      return;
    }

    const noSelection =
      contentRun.selectedIdeaIds == null ||
      contentRun.selectedIdeaIds.length === 0;

    if (
      contentRun.taskType === 'page_outline_then_copy' &&
      outline != null &&
      noSelection
    ) {
      await this.lifecycle.transition(contentRun, 'awaiting_hitl', {
        hitlOptions: [outline],
      });
      return;
    }

    const phase = this.resolvePhase(contentRun, pipeline.phase);

    if (
      contentRun.taskType === 'page_outline_then_copy' &&
      phase === 'copy' &&
      !isCanonicalOutlineSelection(contentRun.selectedIdeaIds, outline)
    ) {
      await this.lifecycle.transition(contentRun, 'failed', {
        failedCode: 'HITL_INVALID_SELECTION',
        failedMessage: 'selectedIdeaIds must be exactly [outline.id]',
      });
      return;
    }

    await this.resultStore.savePipelineState(contentRun.id, {
      phase,
      outlineRefineCount: pipeline.outlineRefineCount,
      copyRefineCount: pipeline.copyRefineCount,
    });

    try {
      const outcome = await this.facade.invokePhase(contentRun, phase, {
        outline,
        outlineRefineCount: pipeline.outlineRefineCount,
        copyRefineCount: pipeline.copyRefineCount,
      });

      await this.resultStore.savePipelineState(contentRun.id, {
        phase,
        outlineRefineCount: outcome.outlineRefineCount,
        copyRefineCount: outcome.copyRefineCount,
      });

      switch (outcome.kind) {
        case 'awaiting_hitl':
          await this.lifecycle.transition(contentRun, 'awaiting_hitl', {
            hitlOptions: [outcome.outline],
          });
          return;
        case 'failed':
          await this.lifecycle.transition(contentRun, 'failed', {
            failedCode: outcome.code,
            failedMessage: outcome.message,
          });
          return;
      }

      await this.lifecycle.transition(contentRun, 'completed', {
        resultSummary: phase === 'outline' ? 'outline' : 'pageDocument',
      });
    } catch (error) {
      const failedCode =
        error instanceof DomainException
          ? error.code
          : error instanceof LlmGatewayError
            ? (error.gatewayCode ?? 'GATEWAY_ERROR')
            : 'EXECUTOR_FAILED';
      const failedMessage =
        error instanceof Error ? error.message : 'pipeline failed';
      await this.lifecycle.transition(contentRun, 'failed', {
        failedCode,
        failedMessage,
      });
    }
  }
}
