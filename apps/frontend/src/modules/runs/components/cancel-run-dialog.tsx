'use client';

import { useState } from 'react';
import type { RunId } from '@content-chain/shared';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import { EnvelopeError } from '@/shared/ui/form-field';
import { ApiError } from '@/shared/api/envelope';
import { cancelRun } from '@/modules/runs/api/runs.api';
import type { RunSnapshot } from '@/modules/runs/api/runs.types';
import { notifyRunCancelled } from '@/modules/notifications/notify-product';
import { useViewingRunId } from '@/modules/notifications/use-viewing-run-id';

type CancelRunDialogProps = {
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
  readonly runId: RunId | null;
  readonly onCancelled: (snapshot: RunSnapshot) => void;
};

const FALLBACK = { code: 'INTERNAL_ERROR', message: 'Nie udało się odczytać odpowiedzi.' };

export function CancelRunDialog({
  open,
  onOpenChange,
  runId,
  onCancelled,
}: CancelRunDialogProps) {
  const viewingRunId = useViewingRunId();
  const [pending, setPending] = useState(false);
  const [envelope, setEnvelope] = useState<{ code: string; message: string } | null>(null);

  async function confirm(): Promise<void> {
    if (runId === null) return;
    setPending(true);
    setEnvelope(null);
    try {
      const snapshot = await cancelRun(runId);
      notifyRunCancelled({ runId, viewingRunId });
      onCancelled(snapshot);
      onOpenChange(false);
    } catch (reason: unknown) {
      if (reason instanceof ApiError) {
        setEnvelope(reason.envelope);
      } else {
        setEnvelope(FALLBACK);
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (pending) return;
        if (!next) setEnvelope(null);
        onOpenChange(next);
      }}
    >
      <DialogContent className="z-(--z-modal) sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Czy na pewno?</DialogTitle>
          <DialogDescription>
            Anulujesz ten run. Tej decyzji nie da się cofnąć na tym samym przebiegu.
          </DialogDescription>
        </DialogHeader>
        {envelope ? <EnvelopeError code={envelope.code} message={envelope.message} /> : null}
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={pending}
            onClick={() => onOpenChange(false)}
          >
            Nie
          </Button>
          <Button type="button" disabled={pending || runId === null} onClick={() => void confirm()}>
            Tak
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
