'use client';

import { Icon } from '@iconify/react';
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
import { GUEST_CONTACTS } from '@/modules/demo/lib/guest-policy';

type GuestLimitModalProps = {
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
  readonly code: string | null;
  readonly message: string | null;
};

export function GuestLimitModal({ open, onOpenChange, code, message }: GuestLimitModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="z-(--z-modal) sm:max-w-md" data-slot="guest-limit-modal">
        <DialogHeader>
          <DialogTitle>Limit konta demonstracyjnego</DialogTitle>
          <DialogDescription>
            Ten start nie przeszedł limitu instancji. Skontaktuj się, jeśli chcesz pełny dostęp.
          </DialogDescription>
        </DialogHeader>
        {code !== null && message !== null ? <EnvelopeError code={code} message={message} /> : null}
        <ul className="flex flex-col gap-2">
          {GUEST_CONTACTS.map((contact) => (
            <li key={contact.contactData}>
              <Button variant="outline" className="w-full justify-start gap-2" asChild>
                <a
                  href={contact.contactData}
                  target={contact.contactData.startsWith('mailto:') ? undefined : '_blank'}
                  rel={
                    contact.contactData.startsWith('mailto:') ? undefined : 'noreferrer noopener'
                  }
                >
                  <Icon icon={contact.iconName} className="size-4 shrink-0" />
                  {contact.label}
                </a>
              </Button>
            </li>
          ))}
        </ul>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Zamknij
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
