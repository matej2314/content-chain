'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import { logoutSession } from '@/modules/auth/api/auth.api';
import { useSession } from '@/modules/auth/components/session-provider';

type LogoutDialogProps = {
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
};

export function LogoutDialog({ open, onOpenChange }: LogoutDialogProps) {
  const router = useRouter();
  const { clear } = useSession();
  const [pending, setPending] = useState(false);

  async function confirm(): Promise<void> {
    setPending(true);
    try {
      await logoutSession();
    } catch {
    } finally {
      clear();
      onOpenChange(false);
      setPending(false);
      router.replace('/');
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="z-[var(--z-modal)] sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Wylogować się?</DialogTitle>
          <DialogDescription>Zakończysz sesję i wrócisz na kartę logowania.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Nie
          </Button>
          <Button type="button" onClick={() => void confirm()} disabled={pending}>
            Tak
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
