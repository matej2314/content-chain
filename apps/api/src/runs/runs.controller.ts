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
import { map, Observable, startWith } from 'rxjs';
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
import { HitlDto } from './http/dto/hitl.dto';
import { StartRunDto } from './http/dto/start-run.dto';
import { ListRunsQueryDto } from './http/dto/list-runs-query.dto';
import { ParseRunIdPipe } from './http/parse-run-id.pipe';
import { createUserId, isUserId } from '@content-chain/shared';
import type { RunId } from '@content-chain/shared';
import type { ListRunsQuery } from './domain/run.port';

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
    return this.sse.subscribe(runId).pipe(
      startWith(snapshotEvent),
      map((event) => ({ type: event.event, data: event.data })),
    );
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
