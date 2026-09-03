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
import { LlmHopService } from '../../shared/llm/llm-hop';
import { isSocialPlatform } from '@content-chain/shared';
import {
  RUN_LIFECYCLE,
  type RunLifecyclePort,
} from '../../runs/domain/run-lifecycle.port';
import type {
  PipelinePhase,
  ReelIdea,
  SocialIdea,
  SocialPipelineOutcome,
} from '../domain/social.types';
import {
  isSocialRunRecord,
  type RunRecord,
  type SocialRunRecord,
} from '../../runs/domain/run.types';
import type { SocialGraphState } from '../infrastructure/graph/state';

@Injectable()
export class SocialPipelineFacade {
  private readonly graph: CompiledSocialGraph;

  constructor(
    @Inject(COMPANY_CONTEXT_REPOSITORY)
    private readonly context: CompanyContextRepository,
    @Inject(SOCIAL_RESULT_STORE) private readonly store: SocialResultStore,
    hop: LlmHopService,
    @Inject(RUN_LIFECYCLE) lifecycle: RunLifecyclePort,
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
      reelIdeas: ReelIdea[];
    },
  ): Promise<SocialPipelineOutcome> {
    if (!isSocialRunRecord(run)) {
      throw new Error(
        `SocialPipelineFacade received non-social task type: ${run.taskType}`,
      );
    }
    if (!isSocialPlatform(run.platform)) {
      throw new Error(
        `SocialPipelineFacade received non-social platform: ${run.platform}`,
      );
    }

    const socialRun: SocialRunRecord = run;
    const final = await this.graph.invoke({
      runId: socialRun.id,
      conversationId: socialRun.conversationId,
      taskType: socialRun.taskType,
      platform: socialRun.platform,
      language: socialRun.language,
      brief: socialRun.brief,
      selectedIdeaIds: socialRun.selectedIdeaIds,
      phase,
      company: null,
      ideas: extras.ideas,
      content: null,
      reelIdeas: extras.reelIdeas,
      reelScript: null,
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
    | 'failedCode'
    | 'failedMessage'
    | 'verdict'
    | 'ideas'
    | 'content'
    | 'reelIdeas'
    | 'reelScript'
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
    return { kind: 'awaiting_hitl', ideas: final.ideas, reelIdeas: [] };
  }
  if (phase === 'ideas' && run.taskType === 'reel_ideas_then_scripts') {
    return {
      kind: 'awaiting_hitl',
      ideas: [],
      reelIdeas: final.reelIdeas,
    };
  }
  return {
    kind: 'completed',
    ideas: final.ideas,
    content: final.content,
    reelIdeas: final.reelIdeas,
    reelScript: final.reelScript,
  };
}
