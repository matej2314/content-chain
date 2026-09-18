'use client';

import { useEffect, useEffectEvent } from 'react';
import type { RunId, RunStatus } from '@content-chain/shared';
import { useEventSourceRegistry } from '@/modules/shell/components/event-source-registry-provider';
import {
  isLiveRunStatus,
  isTerminalRunStatus,
  parseRunLogItem,
  parseSseStatusData,
  type RunLogItem,
} from '@/modules/runs/api/runs.types';
import { fetchRunSnapshot } from '@/modules/runs/api/runs.api';

export type RunLiveHandlers = {
  readonly onStatus: (status: RunStatus) => void;
  readonly onLog?: (item: RunLogItem) => void;
  readonly onTerminal?: (status: 'completed' | 'failed') => void;
};

function parseEventData(raw: string): unknown {
  if (raw.length === 0) return null;
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
}

export function useRunEventSource(
  runId: RunId | null,
  enabled: boolean,
  handlers: RunLiveHandlers,
): void {
  const registry = useEventSourceRegistry();

  const onStatusLive = useEffectEvent((status: RunStatus) => {
    handlers.onStatus(status);
  });

  const onLogLive = useEffectEvent((item: RunLogItem) => {
    handlers.onLog?.(item);
  });

  const onTerminalLive = useEffectEvent((status: 'completed' | 'failed') => {
    handlers.onTerminal?.(status);
  });

  useEffect(() => {
    if (!runId || !enabled) return;
    const source = registry.acquire(runId);
    let released = false;

    const releaseOnce = (): void => {
      if (released) return;
      released = true;
      registry.release(runId);
    };

    const onStatus = (event: Event): void => {
      if (!(event instanceof MessageEvent) || typeof event.data !== 'string') return;
      const parsed = parseSseStatusData(parseEventData(event.data));
      onStatusLive(parsed.status);
      if (isTerminalRunStatus(parsed.status)) {
        onTerminalLive(parsed.status);
        releaseOnce();
      }
    };

    const onLog = (event: Event): void => {
      if (!(event instanceof MessageEvent) || typeof event.data !== 'string') return;
      const data = parseEventData(event.data);
      onLogLive(parseRunLogItem(data));
    };

    const onCompleted = (): void => {
      onStatusLive('completed');
      onTerminalLive('completed');
      releaseOnce();
    };

    const onFailed = (): void => {
      onStatusLive('failed');
      onTerminalLive('failed');
      releaseOnce();
    };

    const onError = (): void => {
      if (released) return;
      void fetchRunSnapshot(runId)
        .then((snapshot) => {
          onStatusLive(snapshot.status);
          if (!isLiveRunStatus(snapshot.status)) {
            if (isTerminalRunStatus(snapshot.status)) {
              onTerminalLive(snapshot.status);
            }
            releaseOnce();
          }
        })
        .catch(() => {
          /* envelope przy następnym GET widoku */
        });
    };

    source.addEventListener('run.status', onStatus);
    source.addEventListener('run.log', onLog);
    source.addEventListener('run.completed', onCompleted);
    source.addEventListener('run.failed', onFailed);
    source.addEventListener('error', onError);

    return () => {
      source.removeEventListener('run.status', onStatus);
      source.removeEventListener('run.log', onLog);
      source.removeEventListener('run.completed', onCompleted);
      source.removeEventListener('run.failed', onFailed);
      source.removeEventListener('error', onError);
      releaseOnce();
    };
  }, [enabled, registry, runId]);
}
