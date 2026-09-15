import { ApiError, parseApiErrorEnvelope } from '@/shared/api/envelope';

export type ApiFetchOptions = RequestInit & {
  readonly skipAuthRefresh?: boolean;
};

type UnauthorizedHandler = () => void;

let unauthorizedHandler: UnauthorizedHandler | undefined;
let refreshInFlight: Promise<boolean> | null = null;

export function setApiFetchUnauthorizedHandler(handler: UnauthorizedHandler | undefined): void {
  unauthorizedHandler = handler;
}

async function parseBody(response: Response): Promise<unknown> {
  const text = await response.text();
  if (text.length === 0) return null;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return null;
  }
}

function toApiError(status: number, body: unknown): ApiError {
  const envelope = parseApiErrorEnvelope(body) ?? {
    code: 'INTERNAL_ERROR',
    message: 'Nie udało się odczytać odpowiedzi.',
  };
  return new ApiError(status, envelope);
}

async function refreshSession(): Promise<boolean> {
  if (refreshInFlight) return refreshInFlight;

  const runRefresh = async (): Promise<boolean> => {
    const response = await fetch('/api/v1/auth/refresh', {
      method: 'POST',
      credentials: 'same-origin',
      cache: 'no-store',
    });
    return response.ok;
  };

  refreshInFlight = runRefresh().finally(() => {
    refreshInFlight = null;
  });
  return refreshInFlight;
}

export async function apiFetch(path: string, options: ApiFetchOptions = {}): Promise<unknown> {
  const { skipAuthRefresh = false, headers, ...rest } = options;
  const url = path.startsWith('/api/v1') ? path : `/api/v1${path}`;

  const execute = async (): Promise<Response> =>
    fetch(url, {
      ...rest,
      headers,
      credentials: 'same-origin',
      cache: 'no-store',
    });

  let response = await execute();

  if (response.status === 401 && !skipAuthRefresh) {
    const refreshed = await refreshSession();
    if (refreshed) {
      response = await execute();
    }
  }

  if (response.status === 401) {
    if (!skipAuthRefresh) unauthorizedHandler?.();
    const body = await parseBody(response);
    throw toApiError(response.status, body);
  }

  const body = await parseBody(response);
  if (!response.ok) {
    throw toApiError(response.status, body);
  }

  return body;
}
