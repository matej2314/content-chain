'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { AgentsGateTooltip, useStartRunGate } from '@/modules/runs/components/start-run-gate';
import {
  EMPTY_START_DRAFT,
  StartRunForm,
  type StartRunDraft,
} from '@/modules/runs/components/start-run-form';

export function StartAgentDialog() {
  const { disableReason } = useStartRunGate();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<StartRunDraft>(EMPTY_START_DRAFT);

  function handleOpenChange(next: boolean): void {
    setOpen(next);
    if (!next) {
      setDraft(EMPTY_START_DRAFT);
    }
  }

  return (
    <>
      <AgentsGateTooltip reason={disableReason}>
        <Button
          type="button"
          disabled={disableReason !== null}
          onClick={() => handleOpenChange(true)}
        >
          Uruchom agenta
        </Button>
      </AgentsGateTooltip>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="z-(--z-modal) max-h-[min(90dvh,44rem)] overflow-y-auto sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Uruchom agenta</DialogTitle>
            <DialogDescription>
              Ten sam brief co na Koncie. Live nowego runu jest poza tą listą.
            </DialogDescription>
          </DialogHeader>
          <StartRunForm
            draft={draft}
            onDraftChange={setDraft}
            idPrefix="start-archive"
            heading="none"
            onSuccess={() => handleOpenChange(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
