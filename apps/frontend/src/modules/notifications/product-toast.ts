import { createRunId, isRunId, type RunId } from '@content-chain/shared';

export type EnvelopeRef = {
  readonly code: string;
  readonly message: string;
};

export type ProductToast =
  | {
      readonly kind: 'success';
      readonly title: string;
      readonly id?: string;
    }
  | {
      readonly kind: 'error';
      readonly envelope: EnvelopeRef;
      readonly id?: string;
    };

export type RunTerminalOutcome = 'completed' | 'failed';

export type RunTerminalInput = {
  readonly runId: RunId;
  readonly outcome: RunTerminalOutcome;
  readonly viewingRunId: RunId | null;
};

const DETAILS_PATH = /^\/runs\/([^/]+)$/;

export function viewingRunIdFromPathname(pathname: string): RunId | null {
  const match = DETAILS_PATH.exec(pathname);
  const raw = match?.[1];
  if (raw === undefined || !isRunId(raw)) return null;
  return createRunId(raw);
}

export function runTerminalToastId(runId: RunId): string {
  return `run-terminal:${runId}`;
}
