'use client';

import { useState } from 'react';
import { ApiError } from '@/shared/api/envelope';
import { saveOutputEdited } from '@/modules/runs/api/runs.api';
import { buildOutputEditedBody } from '@/modules/runs/api/result-edit-payload';
import type { RunSnapshot } from '@/modules/runs/api/runs.types';
import type { RunResult } from '@/modules/runs/api/runs-result.types';

const FALLBACK = { code: 'INTERNAL_ERROR', message: 'Nie udało się odczytać odpowiedzi.' };

export type RunResultEditState =
  | { readonly status: 'idle' }
  | { readonly status: 'editing'; readonly draft: RunResult; readonly pending: boolean };

type Envelope = { readonly code: string; readonly message: string };

export type RunResultEditSession = {
  readonly state: RunResultEditState;
  readonly envelope: Envelope | null;
  readonly open: () => void;
  readonly cancel: () => void;
  readonly save: () => Promise<void>;
  readonly setDraft: (result: RunResult) => void;
};

export function useRunResultEdit(
  snapshot: RunSnapshot,
  onReload: () => Promise<void>,
): RunResultEditSession {
  const [state, setState] = useState<RunResultEditState>({ status: 'idle' });
  const [envelope, setEnvelope] = useState<Envelope | null>(null);
  const [seenRunId, setSeenRunId] = useState(snapshot.runId);

  if (seenRunId !== snapshot.runId) {
    setSeenRunId(snapshot.runId);
    setState({ status: 'idle' });
    setEnvelope(null);
  }

  if (state.status === 'editing' && snapshot.reviewFinalizedAt !== null) {
    setState({ status: 'idle' });
    setEnvelope(null);
  }

  function open(): void {
    setEnvelope(null);
    setState({ status: 'editing', draft: snapshot.result, pending: false });
  }

  function cancel(): void {
    setEnvelope(null);
    setState({ status: 'idle' });
  }

  function setDraft(result: RunResult): void {
    setState((current) =>
      current.status === 'editing' && !current.pending ? { ...current, draft: result } : current,
    );
  }

  async function save(): Promise<void> {
    if (state.status !== 'editing' || state.pending) return;
    const draft = state.draft;
    setState({ status: 'editing', draft, pending: true });
    setEnvelope(null);
    try {
      await saveOutputEdited(snapshot.runId, buildOutputEditedBody(snapshot.taskType, draft));
      await onReload();
      setState({ status: 'idle' });
    } catch (reason: unknown) {
      if (reason instanceof ApiError) setEnvelope(reason.envelope);
      else setEnvelope(FALLBACK);
      setState({ status: 'editing', draft, pending: false });
    }
  }

  return { state, envelope, open, cancel, save, setDraft };
}
