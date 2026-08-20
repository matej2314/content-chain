import { Inject, Injectable } from '@nestjs/common';
import {
  COMPANY_CONTEXT_REPOSITORY,
  type CompanyContextRepository,
} from '../../company-context/domain/company-context.port';
import {
  SOCIAL_RESULT_STORE,
  type SocialResultStore,
} from '../domain/social-result.port';
import {
  CompiledSocialGraph,
  compileSocialGraph,
} from '../infrastructure/graph/social.graph';
import { LlmHopService } from '../infrastructure/graph/llm-hop';
import { RunLifecycleService } from '../../runs/application/run-lifecycle.service';
import type {
  PipelinePhase,
  SocialIdea,
  SocialPipelineOutcome,
} from '../domain/social.types';
import type { RunRecord } from '../../runs/domain/run.types';
import type { SocialGraphState } from '../infrastructure/graph/state';

@Injectable()
export class SocialPipelineFacade {
  private readonly graph: CompiledSocialGraph;

  constructor(
    @Inject(COMPANY_CONTEXT_REPOSITORY)
    private readonly context: CompanyContextRepository,
    @Inject(SOCIAL_RESULT_STORE) private readonly store: SocialResultStore,
    hop: LlmHopService,
    lifecycle: RunLifecycleService,
  ) {
    this.graph = compileSocialGraph({
      context,
      store,
      hop,
      lifecycle,
    });
  }

  async invokePhase(
    run: RunRecord,
    phase: PipelinePhase,
    extras: {
      ideasRefineCount: number;
      contentRefineCount: number;
      ideas: SocialIdea[];
    },
  ): Promise<SocialPipelineOutcome> {
    const final = await this.graph.invoke({
      runId: run.id,
      conversationId: run.conversationId,
      taskType: run.taskType,
      platform: run.platform,
      language: run.language,
      brief: run.brief,
      selectedIdeaIds: run.selectedIdeaIds,
      phase,
      company: null,
      ideas: extras.ideas,
      content: null,
      verdict: null,
      ideasRefineCount: extras.ideasRefineCount,
      contentRefineCount: extras.contentRefineCount,
      failedCode: null,
      failedMessage: null,
    });
    return toOutcome(run, phase, final);
  }
}

export function toOutcome(
  run: Pick<RunRecord, 'taskType'>,
  phase: PipelinePhase,
  final: Pick<
    SocialGraphState,
    'failedCode' | 'failedMessage' | 'verdict' | 'ideas' | 'content'
  >,
): SocialPipelineOutcome {
  if (final.failedCode) {
    return {
      kind: 'failed',
      code: final.failedCode,
      message: final.failedMessage ?? 'pipeline failed',
      contextIssues: final.verdict?.contextIssues,
      languageIssues: final.verdict?.languageIssues,
    };
  }

  if (phase === 'ideas' && run.taskType === 'post_ideas_then_content') {
    return { kind: 'awaiting_hitl', ideas: final.ideas };
  }
  return {
    kind: 'completed',
    ideas: final.ideas,
    content: final.content,
  };
}
