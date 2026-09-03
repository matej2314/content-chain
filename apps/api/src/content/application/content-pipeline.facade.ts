import { Inject, Injectable } from '@nestjs/common';
import { isContentTaskType } from '@content-chain/shared';
import {
  COMPANY_CONTEXT_REPOSITORY,
  type CompanyContextRepository,
} from '../../company-context/domain/company-context.port';
import {
  RUN_LIFECYCLE,
  type RunLifecyclePort,
} from '../../runs/domain/run-lifecycle.port';
import type { ContentRunRecord, RunRecord } from '../../runs/domain/run.types';
import { LlmHopService } from '../../shared/llm/llm-hop';
import {
  CONTENT_RESULT_STORE,
  type ContentResultStore,
} from '../domain/content-result.port';
import { isContentRunRecord } from '../../runs/domain/run.types';
import type {
  ContentPipelineOutcome,
  ContentPipelinePhase,
  PageOutline,
} from '../domain/content.types';
import {
  compileContentGraph,
  type CompiledContentGraph,
} from '../infrastructure/graph/content.graph';
import type { ContentGraphState } from '../infrastructure/graph/state';



@Injectable()
export class ContentPipelineFacade {
  private readonly graph: CompiledContentGraph;

  constructor(
    @Inject(COMPANY_CONTEXT_REPOSITORY)
    private readonly context: CompanyContextRepository,
    @Inject(CONTENT_RESULT_STORE) private readonly store: ContentResultStore,
    hop: LlmHopService,
    @Inject(RUN_LIFECYCLE) lifecycle: RunLifecyclePort,
  ) {
    this.graph = compileContentGraph({
      context,
      store,
      hop,
      lifecycle,
    });
  }

  async invokePhase(
    run: RunRecord,
    phase: ContentPipelinePhase,
    extras: {
      outlineRefineCount: number;
      copyRefineCount: number;
      outline: PageOutline | null;
    },
  ): Promise<ContentPipelineOutcome> {
    if (!isContentRunRecord(run)) {
      throw new Error(
        `ContentPipelineFacade received non-content taskType: ${run.taskType}`,
      );
    }

    const contentRun: ContentRunRecord = run;
    const final = await this.graph.invoke({
      runId: contentRun.id,
      conversationId: contentRun.conversationId,
      taskType: contentRun.taskType,
      contentKind: contentRun.contentKind,
      language: contentRun.language,
      brief: contentRun.brief,
      selectedIdeaIds: contentRun.selectedIdeaIds,
      phase,
      company: null,
      outline: extras.outline,
      document: null,
      verdict: null,
      outlineRefineCount: extras.outlineRefineCount,
      copyRefineCount: extras.copyRefineCount,
      failedCode: null,
      failedMessage: null,
    });
    return toOutcome(contentRun, phase, final);
  }
}

export function toOutcome(
  run: Pick<RunRecord, 'taskType'>,
  phase: ContentPipelinePhase,
  final: Pick<
    ContentGraphState,
    | 'failedCode'
    | 'failedMessage'
    | 'verdict'
    | 'outline'
    | 'document'
    | 'outlineRefineCount'
    | 'copyRefineCount'
  >,
): ContentPipelineOutcome {
  const refine = {
    outlineRefineCount: final.outlineRefineCount,
    copyRefineCount: final.copyRefineCount,
  };

  if (final.failedCode) {
    return {
      kind: 'failed',
      code: final.failedCode,
      message: final.failedMessage ?? 'pipeline failed',
      contextIssues: final.verdict?.contextIssues,
      languageIssues: final.verdict?.languageIssues,
      ...refine,
    };
  }

  if (phase === 'outline' && run.taskType === 'page_outline_then_copy') {
    if (final.outline == null) {
      throw new Error('Outline is required before awaiting HITL.');
    }
    return { kind: 'awaiting_hitl', outline: final.outline, ...refine };
  }

  return {
    kind: 'completed',
    outline: final.outline,
    document: final.document,
    ...refine,
  };
}
