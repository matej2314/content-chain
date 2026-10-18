'use client';

import { useEffect, useState } from 'react';
import { ApiError } from '@/shared/api/envelope';
import { EnvelopeError } from '@/shared/ui/form-field';
import { Skeleton } from '@/shared/ui/skeleton';
import { useSession } from '@/modules/auth/components/session-provider';
import { useCompleteness } from '@/modules/company-context/components/completeness-provider';
import { useGatewayAlive } from '@/modules/health/components/gateway-alive-provider';
import {
  fetchCompanyContext,
  putCompanyContext,
} from '@/modules/company-context/api/company-context.api';
import {
  companyContextForPut,
  withDraftRows,
  type CompanyContext,
  type Completeness,
} from '@/modules/company-context/api/company-context.types';
import { CompanyContextForm } from '@/modules/company-context/components/company-context-form';
import { isComplete } from '@/modules/company-context/lib/is-complete';
import { notifyProduct } from '@/modules/notifications/notify-product';
import { StartAgentDialog } from '@/modules/runs/components/start-agent-dialog';

type SubmitEnvelope = { readonly code: string; readonly message: string };

type ContextViewState =
  | { readonly status: 'loading' }
  | {
    readonly status: 'error';
    readonly envelope: SubmitEnvelope;
  }
  | {
    readonly status: 'ready';
    readonly context: CompanyContext;
    readonly completeness: Completeness;
    readonly pending: boolean;
    readonly submitError: SubmitEnvelope | null;
  };

const FALLBACK: SubmitEnvelope = {
  code: 'INTERNAL_ERROR',
  message: 'Nie udało się odczytać odpowiedzi.',
};

export function CompanyContextView() {
  const { state: session } = useSession();
  const { refetch: refetchCompleteness } = useCompleteness();
  const { refetch: refetchGatewayAlive } = useGatewayAlive();
  const [contextState, setContextState] = useState<ContextViewState>({ status: 'loading' });

  const readOnly = session.status === 'authenticated' && session.user.role !== 'admin';

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const payload = await fetchCompanyContext();
        if (cancelled) return;
        setContextState({
          status: 'ready',
          context: withDraftRows(payload),
          completeness: payload.completeness,
          pending: false,
          submitError: null,
        });
      } catch (reason: unknown) {
        if (cancelled) return;
        if (reason instanceof ApiError) {
          setContextState({ status: 'error', envelope: reason.envelope });
          return;
        }
        setContextState({ status: 'error', envelope: FALLBACK });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function onSubmit(): Promise<void> {
    if (contextState.status !== 'ready' || readOnly) return;
    if (!isComplete(companyContextForPut(contextState.context)).complete) return;
    setContextState((prev) =>
      prev.status === 'ready' ? { ...prev, pending: true, submitError: null } : prev,
    );
    try {
      const payload = await putCompanyContext(contextState.context);
      setContextState({
        status: 'ready',
        context: withDraftRows(payload),
        completeness: payload.completeness,
        pending: true,
        submitError: null,
      });
      await Promise.all([refetchCompleteness(), refetchGatewayAlive()]);
      notifyProduct({ kind: 'success', title: 'Kontekst zapisany' });
    } catch (reason: unknown) {
      const submitError: SubmitEnvelope =
        reason instanceof ApiError
          ? { code: reason.envelope.code, message: reason.envelope.message }
          : FALLBACK;
      setContextState((prev) => (prev.status === 'ready' ? { ...prev, submitError } : prev));
    } finally {
      setContextState((prev) => (prev.status === 'ready' ? { ...prev, pending: false } : prev));
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex max-w-3xl flex-col gap-1">
          <h1 className="text-lg font-medium">Kontekst firmy</h1>
          <p className="font-secondary text-sm text-muted-foreground">
            Uzupełnij wszystkie obowiązkowe pola. Dodatki są opcjonalne.
          </p>
        </div>
        <div className="self-start">
          <StartAgentDialog />
        </div>
      </div>
      {contextState.status === 'loading' ? (
        <div className="flex max-w-3xl flex-col gap-3">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      ) : null}
      {contextState.status === 'error' ? (
        <EnvelopeError code={contextState.envelope.code} message={contextState.envelope.message} />
      ) : null}
      {contextState.status === 'ready' ? (
        <CompanyContextForm
          value={contextState.context}
          completeness={contextState.completeness}
          readOnly={readOnly}
          pending={contextState.pending}
          error={contextState.submitError}
          onChange={(context) =>
            setContextState((current) => (current.status === 'ready' ? { ...current, context } : current))
          }
          onSubmit={() => {
            void onSubmit();
          }}
        />
      ) : null}
    </div>
  );
}
