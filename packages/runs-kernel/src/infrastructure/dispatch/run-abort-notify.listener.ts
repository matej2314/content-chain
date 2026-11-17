import {
  Inject,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Client } from 'pg';
import { createRunId } from '@content-chain/shared';
import { ENV, type RuntimeEnv } from '../../config/env.token';
import { RunAbortRegistry } from '../../application/lifecycle/run-abort.registry';
import { RUN_ABORT_CHANNEL } from './run-job.constants';

@Injectable()
export class RunAbortNotifyListener implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RunAbortNotifyListener.name);
  private client: Client | null = null;

  constructor(
    @Inject(ENV) private readonly env: RuntimeEnv,
    private readonly abortRegistry: RunAbortRegistry,
  ) {}

  async onModuleInit(): Promise<void> {
    const client = new Client({ connectionString: this.env.DATABASE_URL });
    this.client = client;
    client.on('notification', (msg) => {
      if (msg.channel !== RUN_ABORT_CHANNEL || msg.payload == null) return;
      this.abortRegistry.requestCancel(createRunId(msg.payload));
    });
    await client.connect();
    // Channel has a dot (SPEC run.abort) — must be a quoted identifier for LISTEN.
    await client.query(`LISTEN "${RUN_ABORT_CHANNEL}"`);
  }

  async onModuleDestroy(): Promise<void> {
    if (!this.client) return;
    try {
      await this.client.query(`UNLISTEN "${RUN_ABORT_CHANNEL}"`);
      await this.client.end();
    } catch (err) {
      this.logger.warn({ err }, 'abort LISTEN shutdown failed');
    }
    this.client = null;
  }
}
