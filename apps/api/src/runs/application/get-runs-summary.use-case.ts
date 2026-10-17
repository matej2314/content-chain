import { Inject, Injectable } from '@nestjs/common';
import {
  RUN_REPOSITORY,
  type RunRepository,
  type RunSummaryScope,
} from '../domain/run.port';
import type { RunsSummaryResponse } from '@content-chain/shared';
import type { AuthUserContext } from '../../shared/types/auth-user-context';

export const RUNS_SUMMARY_WINDOW_MS = 30 * 24 * 60 * 60 * 1000;
export const RUNS_SUMMARY_CACHE_TTL_MS = 60_000;

type CacheEntry = {
  expiresAt: number;
  value: RunsSummaryResponse;
};

function cacheKey(actor: AuthUserContext): string {
  if (actor.role === 'admin') {
    return 'admin';
  }
  return `${actor.role}:${actor.id}`;
}

function scopeFor(actor: AuthUserContext): RunSummaryScope {
  if (actor.role === 'admin') {
    return {};
  }
  return { startedByUserId: actor.id };
}

function successRate(completed: number, terminal: number): number {
  if (terminal === 0) return 0;
  return Math.round((completed / terminal) * 1000) / 10;
}

@Injectable()
export class GetRunsSummaryUseCase {
  private readonly cache = new Map<string, CacheEntry>();

  constructor(@Inject(RUN_REPOSITORY) private readonly runs: RunRepository) {}

  async execute(
    actor: AuthUserContext,
    now: Date = new Date(),
  ): Promise<RunsSummaryResponse> {
    const key = cacheKey(actor);
    const hit = this.cache.get(key);
    if (hit !== undefined && hit.expiresAt > now.getTime()) {
      return hit.value;
    }
    const windowTo = now;
    const windowFrom = new Date(now.getTime() - RUNS_SUMMARY_WINDOW_MS);
    const aggregate = await this.runs.aggregateSummary(
      scopeFor(actor),
      windowFrom,
      windowTo,
    );
    const value: RunsSummaryResponse = {
      windowFrom: windowFrom.toISOString(),
      windowTo: windowTo.toISOString(),
      totalLast30d: aggregate.totalLast30d,
      successRateLast30d: successRate(
        aggregate.completedLast30d,
        aggregate.terminalLast30d,
      ),
      activeNow: aggregate.activeNow,
      topTaskTypeLast30d: aggregate.topTaskTypeLast30d,
    };

    this.cache.set(key, {
      expiresAt: now.getTime() + RUNS_SUMMARY_CACHE_TTL_MS,
      value,
    });
    return value;
  }

  /** Testy D-80 — czyszczenie między case’ami. */
  clearCache(): void {
    this.cache.clear();
  }
}
