'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { BootstrapAdminForm } from '@/modules/auth/components/bootstrap-admin-form';
import { LoginCard } from '@/modules/auth/components/login-card';
import { RegisterForm, type RegisterSuccess } from '@/modules/auth/components/register-form';
import { LANDING_COPY } from '@/modules/auth/landing/landing-copy';

export type AuthMode = 'login' | 'register' | 'bootstrap_admin';

export type AuthModalProps = {
  readonly open: boolean;
  readonly mode: AuthMode;
  readonly onOpenChange: (open: boolean) => void;
  readonly onModeChange: (mode: AuthMode) => void;
  readonly bootstrapAvailable: boolean;
  readonly successHint?: string | null;
  readonly activationError?: string | null;
  readonly onRegisterSuccess: (result: RegisterSuccess) => void;
};

function titleFor(mode: AuthMode): string {
  if (mode === 'login') return LANDING_COPY.authModal.loginTitle;
  if (mode === 'register') return LANDING_COPY.authModal.registerTitle;
  return LANDING_COPY.authModal.bootstrapTitle;
}

function descriptionFor(mode: AuthMode): string {
  if (mode === 'login') return LANDING_COPY.authModal.loginDescription;
  if (mode === 'register') return LANDING_COPY.authModal.registerDescription;
  return LANDING_COPY.authModal.bootstrapDescription;
}

export function AuthModal({
  open,
  mode,
  onOpenChange,
  onModeChange,
  bootstrapAvailable,
  successHint = null,
  activationError = null,
  onRegisterSuccess,
}: AuthModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" showCloseButton>
        <DialogHeader className="pr-8">
          <DialogTitle className="text-xl font-semibold">{titleFor(mode)}</DialogTitle>
          <DialogDescription>{descriptionFor(mode)}</DialogDescription>
        </DialogHeader>

        {mode === 'login' ? (
          <LoginCard
            onGoRegister={() => onModeChange('register')}
            successHint={successHint}
            activationError={activationError}
          />
        ) : null}

        {mode === 'register' ? (
          <RegisterForm
            onSuccess={onRegisterSuccess}
            onBackToLogin={() => onModeChange('login')}
            bootstrapAvailable={bootstrapAvailable}
            onGoBootstrapAdmin={() => onModeChange('bootstrap_admin')}
          />
        ) : null}

        {mode === 'bootstrap_admin' ? (
          <BootstrapAdminForm onBackToLogin={() => onModeChange('register')} />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
