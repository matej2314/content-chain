'use client';

import { useRef, useState } from 'react';
import type { RunId } from '@content-chain/shared';
import { ApiError } from '@/shared/api/envelope';
import { EnvelopeError } from '@/shared/ui/form-field';
import { fetchRunSnapshot } from '@/modules/runs/api/runs.api';
import {
  draftFromSnapshot,
  EMPTY_START_DRAFT,
  StartRunForm,
} from '@/modules/runs/components/start-run-form';
import { MyRunsList } from '@/modules/runs/components/my-runs-list';

export function AccountView() {
  const [draft, setDraft] = useState(EMPTY_START_DRAFT);
  const [prefillError, setPrefillError] = useState<{ code: string; message: string } | null>(null);
  const prefillRequestRef = useRef(0);

  async function onPrefill(runId: RunId): Promise<void> {
    const requestId = ++prefillRequestRef.current;
    setPrefillError(null);
    try {
      const snapshot = await fetchRunSnapshot(runId);
      if (requestId !== prefillRequestRef.current) return;
      setDraft(draftFromSnapshot(snapshot));
    } catch (reason: unknown) {
      if(requestId !== prefillRequestRef.current) return;
      if(reason instanceof ApiError) {
        setPrefillError({code: reason.envelope.code, message: reason.envelope.message});
        return;
      }
      setPrefillError({code: 'INTERNAL_ERROR', message: 'Nie udało się odczytać odpowiedzi.'});
    }
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex max-w-xl flex-col gap-1">
        <h1 className="text-lg font-medium">Konto</h1>
        <p className="text-sm text-muted-foreground">Start runu i lista Twoich przebiegów.</p>
      </div>
      <StartRunForm draft={draft} onDraftChange={setDraft} />
      {prefillError ? (
        <EnvelopeError code={prefillError.code} message={prefillError.message} />
      ) : null}
      <section className="flex flex-col gap-3">
        <h2 className="text-base font-medium">Moje runy</h2>
        <MyRunsList onPrefill={(runId) => void onPrefill(runId)} />
      </section>
    </div>
  );
}
