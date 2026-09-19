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
import { FeedbackForm } from '@/modules/feedback/components/feedback-form';

export function FeedbackCta() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button type="button" variant="outline" size="sm" onClick={() => setOpen(true)}>
        Zostaw opinię
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="z-(--z-modal) sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Zostaw opinię</DialogTitle>
            <DialogDescription>
              Zapis dotyczy aplikacji, agenta albo Twojego zakończonego runu.
            </DialogDescription>
          </DialogHeader>
          <FeedbackForm idPrefix="feedback-global" />
        </DialogContent>
      </Dialog>
    </>
  );
}
