import type { IncomingMessage, ServerResponse } from 'node:http';

/**
 * Mapuje disconnect / abort klienta HTTP na AbortSignal.
 * Używane przez POST /api/v1/chat (bez nowej trasy) — api cancel zamyka fetch.
 *
 * Nie używaj `!req.complete`: po odebraniu body POST `complete` jest już true,
 * a cancel V1 pada właśnie wtedy (hop LLM w toku). Sygnał bierze się z życia
 * odpowiedzi: klient zniknął, a `res` jeszcze nie skończył zapisu.
 */
export function abortSignalFromIncomingMessage(
  req: IncomingMessage,
  res: ServerResponse,
): AbortSignal {
  const controller = new AbortController();
  const abort = (): void => {
    if (!controller.signal.aborted) {
      controller.abort();
    }
  };

  if (req.aborted || req.destroyed) {
    abort();
    return controller.signal;
  }

  const onResponseClose = (): void => {
    if (!res.writableEnded) {
      abort();
    }
  };

  req.once('aborted', abort);
  res.once('close', onResponseClose);

  return controller.signal;
}
