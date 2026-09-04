import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
  Sse,
  Query,
  BadRequestException,
  type MessageEvent,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  endWith,
  ignoreElements,
  interval,
  map,
  merge,
  Observable,
  of,
  startWith,
  takeUntil,
} from 'rxjs';
import { GetRunLogsUseCase } from './application/get-run-logs.use-case';
import { ListRunsUseCase } from './application/list-runs.use-case';
import { GetRunUseCase } from './application/get-run.use-case';
import { ResumeHitlUseCase } from './application/resume-hitl.use-case';
import { StartRunUseCase } from './application/start-run.use-case';
import {
  RUN_SSE_HUB,
  type RunSseEvent,
  type RunSseHub,
} from './domain/run-sse.port';
import { ENV, type Env } from '../shared/config/env';
import { HitlDto } from './http/dto/hitl.dto';
import { StartRunDto } from './http/dto/start-run.dto';
import { ListRunsQueryDto } from './http/dto/list-runs-query.dto';
import { ParseRunIdPipe } from './http/parse-run-id.pipe';
import { createUserId, isUserId } from '@content-chain/shared';
import type { RunId, RunStatus } from '@content-chain/shared';
import type { ListRunsQuery } from './domain/run.port';
import type { GetRunOutput } from './application/get-run.use-case';

function isTerminalStatus(status: RunStatus): boolean {
  return status === 'completed' || status === 'failed';
}

@ApiTags('runs')
@Controller('runs')
export class RunsController {
  constructor(
    private readonly startRun: StartRunUseCase,
    private readonly getRun: GetRunUseCase,
    private readonly getLogs: GetRunLogsUseCase,
    private readonly resumeHitl: ResumeHitlUseCase,
    private readonly listRuns: ListRunsUseCase,
    @Inject(RUN_SSE_HUB) private readonly sse: RunSseHub,
    @Inject(ENV) private readonly env: Env,
  ) {}

  @Post()
  @HttpCode(202)
  async create(@Body() body: StartRunDto) {
    const result = await this.startRun.execute(body);
    return {
      runId: result.id,
      conversationId: result.conversationId,
      status: result.status,
    };
  }

  @Get(':runId/logs')
  logs(@Param('runId', ParseRunIdPipe) runId: RunId) {
    return this.getLogs.execute(runId);
  }

  @Sse(':runId/events')
  async events(
    @Param('runId', ParseRunIdPipe) runId: RunId,
  ): Promise<Observable<MessageEvent>> {
    const snapshot = await this.getRun.execute(runId);
    const snapshotEvent: RunSseEvent = {
      event: 'run.status',
      data: { runId, status: snapshot.status },
    };
    const toMessage = (event: RunSseEvent): MessageEvent => ({
      type: event.event,
      data: event.data,
    });
    if (isTerminalStatus(snapshot.status)) {
      return of(toMessage(snapshotEvent));
    }

    const latest = await this.getRun.execute(runId);
    if (isTerminalStatus(latest.status)) {
      return of(
        toMessage({
          event: 'run.status',
          data: { runId, status: latest.status },
        }),
      );
    }

    const latestEvent: RunSseEvent = {
      event: 'run.status',
      data: { runId, status: latest.status },
    };
    const hub$ = this.sse.subscribe(runId);
    const live$ = hub$.pipe(startWith(latestEvent), map(toMessage));
    const heartbeat$ = interval(this.env.SSE_HEARTBEAT_MS).pipe(
      map((): MessageEvent => ({ type: 'heartbeat', data: '' })),
      takeUntil(hub$.pipe(ignoreElements(), endWith(true))),
    );

    return merge(live$, heartbeat$);
  }

  @Post(':runId/hitl')
  @HttpCode(202)
  hitl(@Param('runId', ParseRunIdPipe) runId: RunId, @Body() body: HitlDto) {
    return this.resumeHitl.execute(runId, body.selectedIdeaIds);
  }

  @Get()
  list(@Query() query: ListRunsQueryDto): Promise<unknown> {
    if (query.userId && !isUserId(query.userId)) {
      throw new BadRequestException('Invalid user ID format');
    }
    const command: ListRunsQuery = {
      page: query.page ?? 1,
      status: query.status,
      taskType: query.taskType,
      platform: query.platform,
      userId: query.userId ? createUserId(query.userId) : undefined,
    };
    return this.listRuns.execute(command);
  }

  @Get(':runId')
  get(@Param('runId', ParseRunIdPipe) runId: RunId) {
    return this.getRun.execute(runId);
  }
}
