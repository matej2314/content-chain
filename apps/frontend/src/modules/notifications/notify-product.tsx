'use client';

import Link from 'next/link';
import { toast } from 'sonner';
import type { RunId } from '@content-chain/shared';
import {
  runTerminalToastId,
  type ProductToast,
  type RunTerminalInput,
} from '@/modules/notifications/product-toast';

function assertNever(value: never): never {
  throw new Error(`Unexpected toast: ${String(value)}`);
}

export function notifyProduct(input: ProductToast): void {
  switch (input.kind) {
    case 'success':
      toast(input.title, input.id === undefined ? undefined : { id: input.id });
      return;
    case 'error':
      toast(`${input.envelope.code}: ${input.envelope.message}`, {
        ...(input.id === undefined ? {} : { id: input.id }),
      });
      return;
    default:
      assertNever(input);
  }
}

export function notifyRunTerminal(input: RunTerminalInput): void {
  if (input.viewingRunId === input.runId) return;

  const title =
    input.outcome === 'completed'
      ? 'Run zakończony'
      : input.outcome === 'failed'
        ? 'Run nieudany'
        : 'Run anulowany';

  toast(title, {
    id: runTerminalToastId(input.runId),
    description: (
      <Link href={`/runs/${input.runId}`} className="underline-offset-4 hover:underline">
        Szczegóły
      </Link>
    ),
  });
}

export function notifyRunCancelled(input: {
  readonly runId: RunId;
  readonly viewingRunId: RunId | null;
}): void {
  if (input.viewingRunId === input.runId) {
    notifyProduct({
      kind: 'success',
      title: 'Run anulowany',
      id: runTerminalToastId(input.runId),
    });
    return;
  }
  notifyRunTerminal({
    runId: input.runId,
    outcome: 'cancelled',
    viewingRunId: input.viewingRunId,
  });
}
