'use client';

import { useState } from 'react';
import type { UserListItem } from '@/modules/users/api/users.types';
import {
  deleteUser,
  GUEST_HAS_ACTIVE_RUN,
  reactivateUser,
} from '@/modules/users/api/users.api';
import { ApiError } from '@/shared/api/envelope';
import { Button } from '@/shared/ui/button';
import { EnvelopeError } from '@/shared/ui/form-field';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';

export type AccountAction =
  | { readonly kind: 'deactivate'; readonly user: UserListItem }
  | { readonly kind: 'activate'; readonly user: UserListItem }
  | { readonly kind: 'delete-guest'; readonly user: UserListItem }
  | {
      readonly kind: 'purge-guest';
      readonly user: UserListItem;
      readonly message: string;
    };

type AccountActionDialogProps = {
  readonly action: AccountAction | null;
  readonly onOpenChange: (open: boolean) => void;
  /** Po sukcesie API — parent robi `reload()` listy. */
  readonly onSuccess: () => Promise<void>;
  /** Po 409 na Usuń — parent ustawia akcję `purge-guest`. */
  readonly onNeedsPurge: (user: UserListItem, message: string) => void;
};

const FALLBACK = { code: 'INTERNAL_ERROR', message: 'Nie udało się odczytać odpowiedzi.' };

function titleFor(action: AccountAction): string {
  switch (action.kind) {
    case 'deactivate':
      return 'Dezaktywować konto?';
    case 'activate':
      return 'Aktywować konto?';
    case 'delete-guest':
      return 'Usunąć konto gościa?';
    case 'purge-guest':
      return 'Usunąć mimo aktywnego runu?';
    default: {
      const _exhaustive: never = action;
      return _exhaustive;
    }
  }
}

function descriptionFor(action: AccountAction): string {
  switch (action.kind) {
    case 'deactivate':
      return `Konto ${action.user.email} zostanie dezaktywowane. Runy i opinie zostaną. To nie jest aktywacja e-mail.`;
    case 'activate':
      return `Konto ${action.user.email} zostanie ponownie aktywne. To nie jest aktywacja e-mail.`;
    case 'delete-guest':
      return `Trwałe usunięcie konta gościa ${action.user.email} wraz z treściami. Tej decyzji nie da się cofnąć.`;
    case 'purge-guest':
      return action.message;
    default: {
      const _exhaustive: never = action;
      return _exhaustive;
    }
  }
}

function confirmLabel(action: AccountAction): string {
  switch (action.kind) {
    case 'deactivate':
      return 'Dezaktywuj';
    case 'activate':
      return 'Aktywuj';
    case 'delete-guest':
    case 'purge-guest':
      return 'Usuń';
    default: {
      const _exhaustive: never = action;
      return _exhaustive;
    }
  }
}

export function AccountActionDialog({
  action,
  onOpenChange,
  onSuccess,
  onNeedsPurge,
}: AccountActionDialogProps) {
  const [pending, setPending] = useState(false);
  const [envelope, setEnvelope] = useState<{ code: string; message: string } | null>(null);

  async function confirm(): Promise<void> {
    if (action === null) return;
    setPending(true);
    setEnvelope(null);
    try {
      if (action.kind === 'deactivate') {
        await deleteUser(action.user.id);
      } else if (action.kind === 'activate') {
        await reactivateUser(action.user.id);
      } else if (action.kind === 'delete-guest') {
        await deleteUser(action.user.id);
      } else {
        await deleteUser(action.user.id, { purge: true });
      }
      onOpenChange(false);
      await onSuccess();
    } catch (reason: unknown) {
      if (
        action.kind === 'delete-guest' &&
        reason instanceof ApiError &&
        reason.status === 409 &&
        reason.envelope.code === GUEST_HAS_ACTIVE_RUN
      ) {
        onNeedsPurge(action.user, reason.envelope.message);
        return;
      }
      if (reason instanceof ApiError) setEnvelope(reason.envelope);
      else setEnvelope(FALLBACK);
    } finally {
      setPending(false);
    }
  }

  return (
    <Dialog
      open={action !== null}
      onOpenChange={(next) => {
        if (pending) return;
        if (!next) setEnvelope(null);
        onOpenChange(next);
      }}
    >
      <DialogContent className="z-(--z-modal) sm:max-w-md">
        {action ? (
          <>
            <DialogHeader>
              <DialogTitle>{titleFor(action)}</DialogTitle>
              <DialogDescription>{descriptionFor(action)}</DialogDescription>
            </DialogHeader>
            {envelope ? (
              <EnvelopeError code={envelope.code} message={envelope.message} />
            ) : null}
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                disabled={pending}
                onClick={() => onOpenChange(false)}
              >
                Nie
              </Button>
              <Button
                type="button"
                variant={
                  action.kind === 'delete-guest' || action.kind === 'purge-guest'
                    ? 'destructive'
                    : 'default'
                }
                disabled={pending}
                onClick={() => void confirm()}
              >
                {confirmLabel(action)}
              </Button>
            </DialogFooter>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
