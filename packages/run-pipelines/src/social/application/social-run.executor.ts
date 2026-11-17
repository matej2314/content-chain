import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '@content-chain/domain-kit';
import { RUN_LIFECYCLE, isSocialRunRecord, type RunLifecyclePort, type RunRecord, type SocialRunRecord } from '@content-chain/runs-kernel';
import type { RunExecuteOptions, RunExecutorPort } from '@content-chain/runs-kernel';
import { LlmGatewayError } from '../../llm-gateway/llm-gateway.errors';
import { isAbortError } from '../../llm/is-abort-error';
import {
  SOCIAL_RESULT_STORE,
  type SocialResultStore,
} from '../domain/social-result.port';

import { isReelTaskType } from '../domain/reel-task';
import { SocialPipelineFacade } from './social-pipeline.facade';
import type { PipelinePhase } from '../domain/social.types';



@Injectable()
export class SocialRunExecutor implements RunExecutorPort {
  constructor(
    @Inject(SocialPipelineFacade)
    private readonly facade: Pick<SocialPipelineFacade, 'invokePhase'>,
    @Inject(RUN_LIFECYCLE) private readonly lifecycle: RunLifecyclePort,
    @Inject(SOCIAL_RESULT_STORE)
    private readonly resultStore: SocialResultStore,
  ) {}

  private resolvePhase(
    run: SocialRunRecord,
    storedPhase: PipelinePhase | null,
  ): PipelinePhase {
    if (run.taskType === 'post_content' || run.taskType === 'reel_script') {
      return 'content';
    }

    if (
      (run.taskType === 'post_ideas_then_content' ||
        run.taskType === 'reel_ideas_then_scripts') &&
      run.selectedIdeaIds &&
      run.selectedIdeaIds.length > 0
    ) {
      return 'content';
    }
    if (storedPhase) return storedPhase;
    return 'ideas';
  }

  async execute(run: RunRecord, options?: RunExecuteOptions): Promise<void> {
    if (!isSocialRunRecord(run)) {
      throw new Error(
        `SocialRunExecutor received non-social task type: ${run.taskType}`,
      );
    }

    const socialRun: SocialRunRecord = run;
    const ideas = await this.resultStore.listIdeas(socialRun.id);
    const reelIdeas = await this.resultStore.listReelIdeas(socialRun.id);
    const pipeline = await this.resultStore.getPipelineState(socialRun.id);

    const noSelection =
      socialRun.selectedIdeaIds == null ||
      socialRun.selectedIdeaIds.length === 0;

    if (
      socialRun.taskType === 'post_ideas_then_content' &&
      ideas.length > 0 &&
      noSelection
    ) {
      await this.lifecycle.transition(socialRun, 'awaiting_hitl', {
        hitlOptions: ideas,
      });
      return;
    }

    if (
      socialRun.taskType === 'reel_ideas_then_scripts' &&
      reelIdeas.length > 0 &&
      noSelection
    ) {
      await this.lifecycle.transition(socialRun, 'awaiting_hitl', {
        hitlOptions: reelIdeas,
      });
      return;
    }

    const phase = this.resolvePhase(socialRun, pipeline.phase);
    await this.resultStore.savePipelineState(socialRun.id, {
      phase,
      ideasRefineCount: pipeline.ideasRefineCount,
      contentRefineCount: pipeline.contentRefineCount,
    });

    if (options?.signal?.aborted) {
      return;
    }

    try {
      const outcome = await this.facade.invokePhase(socialRun, phase, {
        ideas,
        reelIdeas,
        ideasRefineCount: pipeline.ideasRefineCount,
        contentRefineCount: pipeline.contentRefineCount,
        ...(options?.signal ? { signal: options.signal } : {}),
      });

      switch (outcome.kind) {
        case 'awaiting_hitl':
          await this.lifecycle.transition(socialRun, 'awaiting_hitl', {
            hitlOptions:
              outcome.reelIdeas.length > 0 ? outcome.reelIdeas : outcome.ideas,
          });
          return;
        case 'failed':
          await this.lifecycle.transition(socialRun, 'failed', {
            failedCode: outcome.code,
            failedMessage: outcome.message,
          });
          return;
      }

      await this.lifecycle.transition(socialRun, 'completed', {
        resultSummary: isReelTaskType(socialRun.taskType)
          ? phase === 'ideas'
            ? `reelIdeas:${outcome.reelIdeas.length}`
            : 'reelScript'
          : phase === 'ideas'
            ? `ideas:${outcome.ideas.length}`
            : 'content',
      });
    } catch (error) {
      if (options?.signal?.aborted || isAbortError(error)) {
        return;
      }
      const failedCode =
        error instanceof DomainException
          ? error.code
          : error instanceof LlmGatewayError
            ? (error.gatewayCode ?? 'GATEWAY_ERROR')
            : 'EXECUTOR_FAILED';
      const failedMessage =
        error instanceof Error ? error.message : 'pipeline failed';
      await this.lifecycle.transition(socialRun, 'failed', {
        failedCode,
        failedMessage,
      });
    }
  }
}
