import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../shared/exceptions/domain.exception';
import { LlmGatewayError } from '../../llm/llm-gateway.errors';
import {
  SOCIAL_RESULT_STORE,
  type SocialResultStore,
} from '../domain/social-result.port';
import {
  RUN_LIFECYCLE,
  type RunLifecyclePort,
} from '../../runs/domain/run-lifecycle.port';
import { SocialPipelineFacade } from './social-pipeline.facade';
import type { PipelinePhase } from '../domain/social.types';
import type { RunExecutorPort } from '../../runs/domain/run-executor.port';
import type { RunRecord } from '../../runs/domain/run.types';

@Injectable()
export class SocialRunExecutor implements RunExecutorPort {
  constructor(
    private readonly facade: SocialPipelineFacade,
    @Inject(RUN_LIFECYCLE) private readonly lifecycle: RunLifecyclePort,
    @Inject(SOCIAL_RESULT_STORE)
    private readonly resultStore: SocialResultStore,
  ) {}

  private resolvePhase(
    run: RunRecord,
    storedPhase: PipelinePhase | null,
  ): PipelinePhase {
    if (run.taskType === 'post_content') return 'content';
    if (
      run.taskType === 'post_ideas_then_content' &&
      run.selectedIdeaIds &&
      run.selectedIdeaIds.length > 0
    ) {
      return 'content';
    }
    if (storedPhase) return storedPhase;
    return 'ideas';
  }

  async execute(run: RunRecord): Promise<void> {
    const ideas = await this.resultStore.listIdeas(run.id);
    const pipeline = await this.resultStore.getPipelineState(run.id);

    if (
      run.taskType === 'post_ideas_then_content' &&
      ideas.length > 0 &&
      (run.selectedIdeaIds == null || run.selectedIdeaIds.length === 0)
    ) {
      await this.lifecycle.transition(run, 'awaiting_hitl', {
        hitlOptions: ideas,
      });
      return;
    }

    const phase = this.resolvePhase(run, pipeline.phase);
    await this.resultStore.savePipelineState(run.id, {
      phase,
      ideasRefineCount: pipeline.ideasRefineCount,
      contentRefineCount: pipeline.contentRefineCount,
    });

    try {
      const outcome = await this.facade.invokePhase(run, phase, {
        ideas,
        reelIdeas: [],
        ideasRefineCount: pipeline.ideasRefineCount,
        contentRefineCount: pipeline.contentRefineCount,
      });

      switch (outcome.kind) {
        case 'awaiting_hitl':
          await this.lifecycle.transition(run, 'awaiting_hitl', {
            hitlOptions: outcome.ideas,
          });
          return;
        case 'failed':
          await this.lifecycle.transition(run, 'failed', {
            failedCode: outcome.code,
            failedMessage: outcome.message,
          });
          return;
      }

      await this.lifecycle.transition(run, 'completed', {
        resultSummary:
          phase === 'ideas' ? `ideas:${outcome.ideas.length}` : 'content',
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
      await this.lifecycle.transition(run, 'failed', {
        failedCode,
        failedMessage,
      });
    }
  }
}
