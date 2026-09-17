'use client';

import { useEffect, useState } from 'react';
import { ApiError } from '@/shared/api/envelope';
import { EnvelopeError } from '@/shared/ui/form-field';
import { Skeleton } from '@/shared/ui/skeleton';
import { useSession } from '@/modules/auth/components/session-provider';
import { useCompleteness } from '@/modules/company-context/components/completeness-provider';
import {
  fetchCompanyContext,
  putCompanyContext,
} from '@/modules/company-context/api/company-context.api';
import {
  withDraftRows,
  type CompanyContext,
  type Completeness,
} from '@/modules/company-context/api/company-context.types';
import { CompanyContextForm } from '@/modules/company-context/components/company-context-form';

type ViewState =
  | { readonly status: 'loading' }
  | {
      readonly status: 'error';
      readonly envelope: { readonly code: string; readonly message: string };
    }
  | {
      readonly status: 'ready';
      readonly context: CompanyContext;
      readonly completeness: Completeness;
    };

const FALLBACK = { code: 'INTERNAL_ERROR', message: 'Nie udało się odczytać odpowiedzi.' };

export function CompanyContextView() {
  const { state: session } = useSession();
  const { refetch } = useCompleteness();
  const [view, setView] = useState<ViewState>({ status: 'loading' });
  const [pending, setPending] = useState(false);
  const [submitError, setSubmitError] = useState<{ code: string; message: string } | null>(null);

  const readOnly = session.status === 'authenticated' && session.user.role !== 'admin';

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const payload = await fetchCompanyContext();
        if (cancelled) return;
        setView({
          status: 'ready',
          context: withDraftRows(payload),
          completeness: payload.completeness,
        });
      } catch (reason: unknown) {
        if (cancelled) return;
        if (reason instanceof ApiError) {
          setView({ status: 'error', envelope: reason.envelope });
          return;
        }
        setView({ status: 'error', envelope: FALLBACK });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function onSubmit(): Promise<void> {
    if (view.status !== 'ready' || readOnly) return;
    setPending(true);
    setSubmitError(null);
    try {
      const payload = await putCompanyContext(view.context);
      setView({
        status: 'ready',
        context: withDraftRows(payload),
        completeness: payload.completeness,
      });
      await refetch();
    } catch (reason: unknown) {
      if (reason instanceof ApiError) {
        setSubmitError({ code: reason.envelope.code, message: reason.envelope.message });
      } else {
        setSubmitError(FALLBACK);
      }
    } finally {
      setPending(false);
    }
  }

  if (view.status === 'loading') {
    return (
      <div className="flex max-w-3xl flex-col gap-3">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  if (view.status === 'error') {
    return <EnvelopeError code={view.envelope.code} message={view.envelope.message} />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex max-w-3xl flex-col gap-1">
        <h1 className="text-lg font-medium">Kontekst firmy</h1>
        <p className="text-sm text-muted-foreground">
          Sekcje bramki odblokowują agentów. Dodatki są opcjonalne.
        </p>
      </div>
      <CompanyContextForm
        value={view.context}
        completeness={view.completeness}
        readOnly={readOnly}
        pending={pending}
        error={submitError}
        onChange={(context) =>
          setView({ status: 'ready', context, completeness: view.completeness })
        }
        onSubmit={() => {
          void onSubmit();
        }}
      />
    </div>
  );
}
