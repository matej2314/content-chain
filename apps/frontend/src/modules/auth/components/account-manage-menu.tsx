'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { AccountDeleteForm } from '@/modules/auth/components/account-delete-form';
import { AccountEmailForm } from '@/modules/auth/components/account-email-form';
import { AccountPasswordForm } from '@/modules/auth/components/account-password-form';
import { useSession } from '@/modules/auth/components/session-provider';
import { useGuestLocked } from '@/modules/demo/lib/use-guest-locked';

type ManageDialog = 'email' | 'password' | 'delete' | null;

type AccountManageMenuProps = {
  readonly onMailDeliveryFailed?: (message: string) => void;
};

export function AccountManageMenu({ onMailDeliveryFailed }: AccountManageMenuProps) {
  const { state } = useSession();
  const guestLocked = useGuestLocked();
  const [dialog, setDialog] = useState<ManageDialog>(null);

  if (state.status !== 'authenticated') return null;

  const pendingEmail = state.user.pendingEmail !== null;
  const emailDisabled = guestLocked || pendingEmail;
  const showDelete = state.user.role !== 'admin';

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" variant="outline">
            Zarządzaj kontem
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-48">
          <DropdownMenuItem
            disabled={emailDisabled}
            onSelect={() => setDialog('email')}
          >
            Zmień adres e-mail
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setDialog('password')}>
            Zmień hasło
          </DropdownMenuItem>
          {showDelete ? (
            <DropdownMenuItem
              variant="destructive"
              onSelect={() => setDialog('delete')}
            >
              Usuń konto
            </DropdownMenuItem>
          ) : null}
        </DropdownMenuContent>
      </DropdownMenu>

      <AccountEmailForm
        open={dialog === 'email'}
        onOpenChange={(open) => setDialog(open ? 'email' : null)}
        onMailDeliveryFailed={onMailDeliveryFailed}
      />
      <AccountPasswordForm
        open={dialog === 'password'}
        onOpenChange={(open) => setDialog(open ? 'password' : null)}
      />
      {showDelete ? (
        <AccountDeleteForm
          open={dialog === 'delete'}
          onOpenChange={(open) => setDialog(open ? 'delete' : null)}
        />
      ) : null}
    </>
  );
}
