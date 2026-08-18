import 'reflect-metadata';
import { firstValueFrom, of, take, toArray } from 'rxjs';
import { Test, type TestingModule } from '@nestjs/testing';
import { newConversationId, newRunId } from '../shared/http/new-ids';
import { GetRunLogsUseCase } from './application/get-run-logs.use-case';
import { GetRunUseCase } from './application/get-run.use-case';
import { ListRunsUseCase } from './application/list-runs.use-case';
import { ResumeHitlUseCase } from './application/resume-hitl.use-case';
import { StartRunUseCase } from './application/start-run.use-case';
import { RUN_SSE_HUB, type RunSseEvent } from './domain/run-sse.port';
import { ListRunsQueryDto } from './http/dto/list-runs-query.dto';
import { HitlDto } from './http/dto/hitl.dto';
import { StartRunDto } from './http/dto/start-run.dto';
import { RunsController } from './runs.controller';

describe('RunsController', () => {
  let controller: RunsController;
  let startRun: { execute: jest.Mock };
  let getRun: { execute: jest.Mock };
  let getLogs: { execute: jest.Mock };
  let listRuns: { execute: jest.Mock };
  let resumeHitl: { execute: jest.Mock };
  let sse: { subscribe: jest.Mock; publish: jest.Mock };

  beforeEach(async () => {
    startRun = { execute: jest.fn() };
    getRun = { execute: jest.fn() };
    getLogs = { execute: jest.fn() };
    listRuns = { execute: jest.fn() };
    resumeHitl = { execute: jest.fn() };
    sse = { subscribe: jest.fn(), publish: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RunsController],
      providers: [
        { provide: StartRunUseCase, useValue: startRun },
        { provide: GetRunUseCase, useValue: getRun },
        { provide: GetRunLogsUseCase, useValue: getLogs },
        { provide: ListRunsUseCase, useValue: listRuns },
        { provide: ResumeHitlUseCase, useValue: resumeHitl },
        { provide: RUN_SSE_HUB, useValue: sse },
      ],
    }).compile();

    controller = module.get(RunsController);
  });

  it('declares parameterized routes before GET :runId', () => {
    const proto = RunsController.prototype;
    const names = Object.getOwnPropertyNames(proto);

    expect(names.indexOf('logs')).toBeLessThan(names.indexOf('get'));
    expect(names.indexOf('events')).toBeLessThan(names.indexOf('get'));
    expect(names.indexOf('hitl')).toBeLessThan(names.indexOf('get'));
    expect(names.indexOf('list')).toBeLessThan(names.indexOf('get'));

    expect(Reflect.getMetadata('path', proto.create)).toBe('/');
    expect(Reflect.getMetadata('path', proto.logs)).toBe(':runId/logs');
    expect(Reflect.getMetadata('path', proto.events)).toBe(':runId/events');
    expect(Reflect.getMetadata('path', proto.hitl)).toBe(':runId/hitl');
    expect(Reflect.getMetadata('path', proto.list)).toBe('/');
    expect(Reflect.getMetadata('path', proto.get)).toBe(':runId');
  });

  it('maps list query DTO to ListRunsQuery and delegates to ListRunsUseCase', async () => {
    const listed = { items: [], page: 1, pageSize: 10, total: 0 };
    listRuns.execute.mockResolvedValue(listed);

    const query: ListRunsQueryDto = {
      page: 2,
      status: 'completed',
      taskType: 'post_ideas',
      platform: 'linkedin',
    };

    await expect(controller.list(query)).resolves.toBe(listed);
    expect(listRuns.execute).toHaveBeenCalledWith({
      page: 2,
      status: 'completed',
      taskType: 'post_ideas',
      platform: 'linkedin',
      userId: undefined,
    });
  });

  it('maps start-run result to { runId, conversationId, status }', async () => {
    const id = newRunId();
    const conversationId = newConversationId();
    startRun.execute.mockResolvedValue({
      id,
      conversationId,
      status: 'queued',
    });

    const body: StartRunDto = {
      taskType: 'post_ideas',
      platform: 'linkedin',
      language: 'pl',
      brief: { topic: 'Q3' },
    };

    await expect(controller.create(body)).resolves.toEqual({
      runId: id,
      conversationId,
      status: 'queued',
    });
    expect(startRun.execute).toHaveBeenCalledWith(body);
  });

  it('delegates GET :runId to GetRunUseCase', async () => {
    const runId = newRunId();
    const snapshot = {
      runId,
      status: 'running',
      conversationId: newConversationId(),
    };
    getRun.execute.mockResolvedValue(snapshot);

    await expect(controller.get(runId)).resolves.toBe(snapshot);
    expect(getRun.execute).toHaveBeenCalledWith(runId);
  });

  it('delegates GET :runId/logs to GetRunLogsUseCase', async () => {
    const runId = newRunId();
    const logs = { items: [] };
    getLogs.execute.mockResolvedValue(logs);

    await expect(controller.logs(runId)).resolves.toBe(logs);
    expect(getLogs.execute).toHaveBeenCalledWith(runId);
  });

  it('delegates POST :runId/hitl with selectedIdeaIds', async () => {
    const runId = newRunId();
    const result = { runId, status: 'running' as const };
    resumeHitl.execute.mockResolvedValue(result);

    const body: HitlDto = { selectedIdeaIds: ['idea-1', 'idea-2'] };
    await expect(controller.hitl(runId, body)).resolves.toBe(result);
    expect(resumeHitl.execute).toHaveBeenCalledWith(runId, body.selectedIdeaIds);
  });

  it('emits current status then maps hub events to MessageEvent', async () => {
    const runId = newRunId();
    getRun.execute.mockResolvedValue({
      runId,
      status: 'queued',
    });

    const live: RunSseEvent = {
      event: 'run.log',
      data: {
        runId,
        conversationId: newConversationId(),
        at: new Date('2026-08-18T12:00:00.000Z'),
        level: 'info',
        message: 'started',
      },
    };
    sse.subscribe.mockReturnValue(of(live));

    const stream = await controller.events(runId);
    const events = await firstValueFrom(stream.pipe(take(2), toArray()));

    expect(getRun.execute).toHaveBeenCalledWith(runId);
    expect(sse.subscribe).toHaveBeenCalledWith(runId);
    expect(events).toEqual([
      { type: 'run.status', data: { runId, status: 'queued' } },
      { type: 'run.log', data: live.data },
    ]);
  });
});
