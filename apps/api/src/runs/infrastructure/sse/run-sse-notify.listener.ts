import {
  Inject,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Client } from 'pg';
import { createRunId } from '@content-chain/shared';
import { ENV, type Env } from '../../../shared/config/env';
import { RUN_REPOSITORY, type RunRepository } from '../../domain/run.port';
import { RUN_SSE_HUB, type RunSseHub } from '../../domain/run-sse.port';
import { RUN_SSE_CHANNEL } from '../dispatch/run-job.constants';
import { parseRunSseNotifyPayload } from './run-sse-notify.envelope';

@Injectable()
export class RunSseNotifyListener implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RunSseNotifyListener.name);
  private client: Client | null = null;
  /** Serializacja hydrate per run — uniknij przestawienia kolejności logów. */
  private readonly logTailByRun = new Map<string, Promise<void>>();

  constructor(
    @Inject(ENV) private readonly env: Env,
    @Inject(RUN_SSE_HUB) private readonly hub: RunSseHub,
    @Inject(RUN_REPOSITORY) private readonly runs: RunRepository,
  ) {}

  async onModuleInit(): Promise<void> {
    const client = new Client({ connectionString: this.env.DATABASE_URL });
    this.client = client;
    client.on('notification', (msg) => {
      if (msg.channel !== RUN_SSE_CHANNEL || msg.payload == null) return;
      const envelope = parseRunSseNotifyPayload(msg.payload);
      if (!envelope) {
        this.logger.warn('ignored invalid SSE NOTIFY payload');
        return;
      }
      if (envelope.kind === 'publish') {
        // Zod → domain: payload mostu ma plain stringi; hub oczekuje RunSseEvent.
        this.hub.publish(
          envelope.event as Parameters<RunSseHub['publish']>[0],
        );
        return;
      }
      if (envelope.kind === 'complete') {
        this.hub.complete(createRunId(envelope.runId));
        return;
      }
      void this.hydrateLog(envelope.logId, envelope.runId);
    });
    await client.connect();
    await client.query(`LISTEN ${RUN_SSE_CHANNEL}`);
  }

  /** Chain per runId przed await fetch — kolejność = kolejność sygnałów mostu. */
  private hydrateLog(logId: string, runId: string): void {
    const prev = this.logTailByRun.get(runId) ?? Promise.resolve();
    const next = prev
      .then(async () => {
        const entry = await this.runs.getLogById(logId);
        if (!entry) {
          this.logger.warn({ logId }, 'SSE hydrate: log not found — skip');
          return;
        }
        this.hub.publish({
          event: 'run.log',
          data: { ...entry, runId: entry.runId },
        });
      })
      .catch((err: unknown) => {
        this.logger.warn({ err, logId }, 'SSE hydrate failed');
      });
    this.logTailByRun.set(runId, next);
  }

  async onModuleDestroy(): Promise<void> {
    if (!this.client) return;
    try {
      await this.client.query(`UNLISTEN ${RUN_SSE_CHANNEL}`);
      await this.client.end();
    } catch (err) {
      this.logger.warn({ err }, 'SSE LISTEN shutdown failed');
    }
    this.client = null;
  }
}
