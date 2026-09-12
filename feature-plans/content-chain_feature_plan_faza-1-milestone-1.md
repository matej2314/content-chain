# Content Chain — feature plan: Faza 1 + MILESTONE 1 (frontend)

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Wejście, BFF, visual lock i chrome dashboardu |
| Major | `content-chain-frontend_major_plan.md` — Faza 1 (kroki 1.1–1.6) + MILESTONE 1 |
| Bramka ścieżki wstecz | Nie dotyczy (Faza 1 jest pierwszą fazą tego majoru) |
| Źródła | `docs/ux_dashboard.md`, `docs/deployment.md`, `docs/security.md`, `docs/brand_types.md`, `docs/dokumentacja_komunikacji.md`, `spec/SPEC-FRONTEND.md`, `spec/SPEC-AUTH.md`, `spec/SPEC-KOMUNIKACJA.md`, `spec/SPEC-BEZPIECZENSTWO.md`, `spec/SPEC-MONOREPO.md`, `spec/SPEC-TESTY.md`, skill `content-chain-product-ui` |
| Poza zakresem wycinka | Widoki robocze Fazy 2–6 (treść Kontekstu, start runu, live, HITL, opinia, lista użytkowników); chip kompletności / floating box / CTA opinii poza pustymi slotami; backend Faza 10; Playwright; next-intl; `NEXT_PUBLIC_API_BASE_URL` jako URL produktu |
| Po implementacji (informacyjnie) | Major FE: Faza 1 i kroki 1.1–1.6 → `WYKONANY`; MILESTONE 1 → `OSIĄGNIĘTY`. **Edycja major poza tym skillem.** |

Kolejność `KROK` w tym pliku **≠** numeracja major 1.1 → 1.6 (pass rozwojowy). Mapowanie: KROK 1 ← major 1.5; KROK 2 ← major 1.6 transport; KROK 3 ← major 1.4.4; KROK 4 ← major 1.1; KROK 5 ← major 1.2; KROK 6 ← major 1.3; KROK 7 ← major 1.4.1–1.4.3 + rejestr EventSource z 1.6.

**Pass rozwojowy:** typy i envelope przed fetchami; BFF/`apiFetch` przed kartą i invite; visual lock przed powierzchniami UI; rejestr SSE razem z layoutem po sesji. Brak przenosin między fazami majoru.

**Trasy (HOW zatwierdzony):** `/` karta logowania; `/invite/accept`; po sesji `(app)`: `/context`, `/runs`, `/account`, `/users`. Lądowanie po loginie / bootstrapie: `/account`. Labelki PL; ścieżki EN.

**Design Read (lock):** Reading this as: self-host dashboard for operator/admin, calm B2B product language, shadcn + Tailwind v4 + Iconify, dials VARIANCE 3–4 / MOTION 3–4 / DENSITY 7–8.

---

## Założenia

- Stack z projektu: Next.js **16.3.0** App Router, React 19, Tailwind v4, shadcn (`radix-nova`, `components.json`), `@iconify/react`, `@content-chain/shared` (`workspace:*`). `tsconfig` `strict: true`; **nie** włączamy `exactOptionalPropertyTypes` / `noUncheckedIndexedAccess`.
- BFF: catch-all Route Handler `app/api/v1/[[...path]]` (SPEC-FRONTEND F-2: rewrite **albo** RH). Wybór RH: strumień body bez ISR-bufora, wielokrotne `Set-Cookie` przez `getSetCookie()`, Cookie na originie FE. Źródło API: Context7 `/vercel/next.js/v16.2.9` (BFF guide: `return fetch(proxyRequest)`; SSE: `text/event-stream` + brak `response.blob()` / ISR; `params` / `searchParams` jako `Promise`).
- `API_BASE_URL` tylko serwer Next. Zakaz `NEXT_PUBLIC_API_BASE_URL`. Port api DX: **3001** (`docs/dokumentacja_komunikacji.md`).
- Cookie `cc_access` / `cc_refresh`: api **nie** ustawia `Domain` (`cookie.helper.ts`) — BFF kopiuje `Set-Cookie` 1:1; przeglądarka wiąże je z originem FE.
- Typy ID / ról z `@content-chain/shared` (`createUserId` / `isUserRole`). JSON → `unknown` → parser. Zakaz `as UserId`.
- Visual lock jednorazowo w KROK 3 (`content-chain-product-ui`). KROK 1–2 bez skilla smaku. Fazy 2–6 dziedziczą tokeny.
- Testy automatyczne FE **poza MVP** (`SPEC-TESTY.md` T piramida Frontend). Weryfikacja = DoD obserwowalne.
- Prettier root: `singleQuote`, `semi`, `tabWidth: 2`, `trailingComma: all`.

---

## FAZA 1 — Wejście, BFF i chrome dashboardu

### KROK 1 — Kontrakt typów FE i envelope

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Granice UI używają `UserId` / `UserRole` i envelope `{ code, message }` jak z API. Major 1.5; `docs/brand_types.md`; `SPEC-FRONTEND.md` F-3 / F-7; `SPEC-KOMUNIKACJA.md` K-1.

**Artefakty:**

- Nowy: `apps/frontend/src/shared/api/envelope.ts`
- Nowy: `apps/frontend/src/modules/auth/api/session.types.ts`

**Implementacja:**

Nowy plik — `apps/frontend/src/shared/api/envelope.ts`:

```ts
import { createRequestId, isRequestId, type RequestId } from '@content-chain/shared';

export type ApiErrorEnvelope = {
  readonly code: string;
  readonly message: string;
  readonly requestId?: RequestId;
  readonly details?: readonly unknown[];
};

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function parseApiErrorEnvelope(value: unknown): ApiErrorEnvelope | null {
  if (!isRecord(value)) return null;
  const { code, message, requestId, details } = value;
  if (typeof code !== 'string' || typeof message !== 'string') return null;

  let parsedRequestId: RequestId | undefined;
  if (typeof requestId === 'string' && isRequestId(requestId)) {
    parsedRequestId = createRequestId(requestId);
  }

  const parsed: ApiErrorEnvelope = {
    code,
    message,
    ...(parsedRequestId !== undefined ? { requestId: parsedRequestId } : {}),
    ...(Array.isArray(details) ? { details } : {}),
  };
  return parsed;
}

export class ApiError extends Error {
  readonly name = 'ApiError';

  constructor(
    readonly status: number,
    readonly envelope: ApiErrorEnvelope,
  ) {
    super(envelope.message);
  }
}
```

Nowy plik — `apps/frontend/src/modules/auth/api/session.types.ts`:

```ts
import {
  createUserId,
  isUserId,
  isUserRole,
  type UserId,
  type UserRole,
} from '@content-chain/shared';
import { isRecord } from '@/shared/api/envelope';

export type SessionUser = {
  readonly id: UserId;
  readonly email: string;
  readonly role: UserRole;
};

export function parseSessionUser(value: unknown): SessionUser {
  if (!isRecord(value)) {
    throw new Error('Invalid session payload');
  }
  const { id, email, role } = value;
  if (typeof id !== 'string' || !isUserId(id)) {
    throw new Error('Invalid session user id');
  }
  if (typeof email !== 'string' || email.length === 0) {
    throw new Error('Invalid session email');
  }
  if (typeof role !== 'string' || !isUserRole(role)) {
    throw new Error('Invalid session role');
  }
  return { id: createUserId(id), email, role };
}

export function parseAuthUserWrapper(value: unknown): SessionUser {
  if (!isRecord(value) || !('user' in value)) {
    throw new Error('Invalid auth user wrapper');
  }
  return parseSessionUser(value.user);
}
```

**Biblioteki / API:** brak nowej libki. Brand helpers z `@content-chain/shared` (`packages/shared/src/branded/ids.ts`, `enums.ts`).

**Testy:** brak (FE poza MVP).

**DoD kroku:**

- Parsery odrzucają goły `string` tam, gdzie kanon to `UserId` / `UserRole`.
- Envelope ma `code` + `message` z payloadu; nie mapuje `message` na PL.
- Brak `as UserId` / `as any`.

---

### KROK 2 — Env, BFF, `apiFetch`, szkielet proxy SSE

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Przeglądarka woła wyłącznie same-origin `/api/v1/...`. 401 → `POST /auth/refresh` → jednorazowy retry. SSE proxy bez pełnego bufora body. Major 1.6 (transport); `SPEC-FRONTEND.md` F-2 / F-4a; `SPEC-BEZPIECZENSTWO.md` B-5a; `docs/deployment.md`. **Bez** `content-chain-product-ui`.

**Artefakty:**

- Nowy: `apps/frontend/src/shared/config/env.ts` (`import 'server-only'` — pakiet idzie z Next; gdyby `tsc` nie widział modułu, dodać `server-only` do `apps/frontend` dependencies)
- Nowy: `apps/frontend/src/shared/api/bff-proxy.ts`
- Nowy: `apps/frontend/src/app/api/v1/[[...path]]/route.ts`
- Nowy: `apps/frontend/src/shared/api/api-fetch.ts`
- Nowy: `apps/frontend/src/modules/auth/api/auth.api.ts`
- Nowy: `apps/frontend/src/modules/shell/event-source-registry.ts` (API rejestru; podłączenie UI w KROK 7)
- Zmiana: `apps/frontend/.env.example`
- Zmiana: `apps/frontend/next.config.ts`

**Implementacja:**

Nowy plik — `apps/frontend/src/shared/config/env.ts`:

```ts
import 'server-only';

export function getApiBaseUrl(): string {
  const value = process.env.API_BASE_URL;
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error('API_BASE_URL is not set');
  }
  return value.replace(/\/$/, '');
}
```

Nowy plik — `apps/frontend/src/shared/api/bff-proxy.ts`:

```ts
import { getApiBaseUrl } from '@/shared/config/env';

const HOP_BY_HOP = new Set([
  'connection',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailer',
  'transfer-encoding',
  'upgrade',
  'host',
  'content-encoding',
  'content-length',
]);

function copyRequestHeaders(source: Headers): Headers {
  const headers = new Headers();
  source.forEach((value, key) => {
    if (HOP_BY_HOP.has(key.toLowerCase())) return;
    headers.set(key, value);
  });
  return headers;
}

function copyResponseHeaders(source: Headers, contentType: string | null): Headers {
  const headers = new Headers();
  source.forEach((value, key) => {
    const lower = key.toLowerCase();
    if (HOP_BY_HOP.has(lower) || lower === 'set-cookie') return;
    headers.set(key, value);
  });
  for (const cookie of source.getSetCookie()) {
    headers.append('set-cookie', cookie);
  }
  if (contentType?.includes('text/event-stream')) {
    headers.set('cache-control', 'no-cache, no-transform');
    headers.set('x-accel-buffering', 'no');
    headers.set('content-type', 'text/event-stream');
  }
  return headers;
}

export async function proxyToApi(
  request: Request,
  pathSegments: readonly string[] | undefined,
): Promise<Response> {
  const apiBase = getApiBaseUrl();
  const suffix = pathSegments?.length ? pathSegments.join('/') : '';
  const upstreamUrl = new URL(`/api/v1/${suffix}`, `${apiBase}/`);
  const incomingUrl = new URL(request.url);
  upstreamUrl.search = incomingUrl.search;

  const method = request.method.toUpperCase();
  const hasBody = method !== 'GET' && method !== 'HEAD';
  const body = hasBody ? await request.arrayBuffer() : undefined;

  const upstream = await fetch(upstreamUrl, {
    method,
    headers: copyRequestHeaders(request.headers),
    body,
    cache: 'no-store',
    redirect: 'manual',
  });

  const contentType = upstream.headers.get('content-type');
  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: copyResponseHeaders(upstream.headers, contentType),
  });
}
```

Nowy plik — `apps/frontend/src/app/api/v1/[[...path]]/route.ts`:

```ts
import { proxyToApi } from '@/shared/api/bff-proxy';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

type RouteContext = {
  params: Promise<{ path?: string[] }>;
};

async function handle(request: Request, context: RouteContext): Promise<Response> {
  try {
    const { path } = await context.params;
    return await proxyToApi(request, path);
  } catch (reason: unknown) {
    const message = reason instanceof Error ? reason.message : 'Proxy failed';
    console.error(message);
    return Response.json(
      { code: 'INTERNAL_ERROR', message: 'Proxy failed' },
      { status: 500 },
    );
  }
}

export const GET = handle;
export const POST = handle;
export const PUT = handle;
export const PATCH = handle;
export const DELETE = handle;
export const HEAD = handle;
export const OPTIONS = handle;
```

Uwaga: 500 BFF **nie** zawiera `API_BASE_URL`. Envelope `INTERNAL_ERROR` jest lokalny (awaria proxy), nie tłumaczeniem api.

Nowy plik — `apps/frontend/src/shared/api/api-fetch.ts`:

```ts
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
  refreshInFlight = (async () => {
    const response = await fetch('/api/v1/auth/refresh', {
      method: 'POST',
      credentials: 'same-origin',
      cache: 'no-store',
    });
    return response.ok;
  })().finally(() => {
    refreshInFlight = null;
  });
  return refreshInFlight;
}

export async function apiFetch(path: string, options: ApiFetchOptions = {}): Promise<unknown> {
  const { skipAuthRefresh = false, headers, ...rest } = options;
  const url = path.startsWith('/api/v1') ? path : `/api/v1${path}`;

  const execute = (): Promise<Response> =>
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
    unauthorizedHandler?.();
    const body = await parseBody(response);
    throw toApiError(401, body);
  }

  const body = await parseBody(response);
  if (!response.ok) {
    throw toApiError(response.status, body);
  }
  return body;
}
```

Produktowy `fetch` poza tym helperem jest zakazany (DoD major 1.6). Wyjątek: sam `POST /auth/refresh` wewnątrz helpera (żeby nie zagnieżdżać cyklu).

Nowy plik — `apps/frontend/src/modules/auth/api/auth.api.ts`:

```ts
import { apiFetch } from '@/shared/api/api-fetch';
import { isRecord } from '@/shared/api/envelope';
import {
  parseAuthUserWrapper,
  parseSessionUser,
  type SessionUser,
} from '@/modules/auth/api/session.types';

export type Credentials = {
  readonly email: string;
  readonly password: string;
};

export async function fetchBootstrapStatus(): Promise<boolean> {
  const body = await apiFetch('/auth/bootstrap-status', { skipAuthRefresh: true });
  if (!isRecord(body) || typeof body.available !== 'boolean') {
    throw new Error('Invalid bootstrap-status payload');
  }
  return body.available;
}

export async function fetchSessionUser(): Promise<SessionUser> {
  const body = await apiFetch('/auth/me');
  return parseSessionUser(body);
}

export async function loginWithPassword(credentials: Credentials): Promise<SessionUser> {
  const body = await apiFetch('/auth/login', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(credentials),
    skipAuthRefresh: true,
  });
  return parseAuthUserWrapper(body);
}

export async function bootstrapAdmin(credentials: Credentials): Promise<SessionUser> {
  const body = await apiFetch('/auth/bootstrap-admin', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(credentials),
    skipAuthRefresh: true,
  });
  return parseAuthUserWrapper(body);
}

export async function logoutSession(): Promise<void> {
  await apiFetch('/auth/logout', { method: 'POST' });
}

export async function acceptInvite(input: {
  readonly token: string;
  readonly password: string;
}): Promise<SessionUser> {
  const body = await apiFetch('/auth/accept-invite', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(input),
    skipAuthRefresh: true,
  });
  return parseAuthUserWrapper(body);
}
```

Nowy plik — `apps/frontend/src/modules/shell/event-source-registry.ts`:

```ts
import { type RunId } from '@content-chain/shared';

export type EventSourceRegistry = {
  acquire: (runId: RunId) => EventSource;
  release: (runId: RunId) => void;
  peek: (runId: RunId) => EventSource | undefined;
};

export function createEventSourceRegistry(): EventSourceRegistry {
  const connections = new Map<RunId, EventSource>();

  return {
    acquire(runId: RunId): EventSource {
      const existing = connections.get(runId);
      if (existing) return existing;
      const source = new EventSource(`/api/v1/runs/${runId}/events`, {
        withCredentials: true,
      });
      connections.set(runId, source);
      return source;
    },
    release(runId: RunId): void {
      const existing = connections.get(runId);
      if (!existing) return;
      existing.close();
      connections.delete(runId);
    },
    peek(runId: RunId): EventSource | undefined {
      return connections.get(runId);
    },
  };
}
```

W Fazie 1 **nikt nie woła `acquire`**. Rejestr istnieje, żeby Faza 3 nie otworzyła drugiego socketa na ten sam `RunId`. `withCredentials` przy same-origin jest no-op produktowy (kanon cookie na originie FE).

**Refaktor:** `apps/frontend/.env.example`

Teraz:

```
NEXT_PUBLIC_API_BASE_URL="http://localhost:3001"
```

Zamień na:

```
# Tylko proces Next (BFF) → apps/api. Nie dodawaj NEXT_PUBLIC_ prefiksu.
API_BASE_URL="http://localhost:3001"
```

**Refaktor:** `apps/frontend/next.config.ts`

Teraz:

```ts
const nextConfig: NextConfig = {
	// API URL konfigurowany przez NEXT_PUBLIC_API_BASE_URL — bez sekretów LLM
};
```

Zamień na:

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {};

export default nextConfig;
```

**Biblioteki / API:** Next.js 16 Route Handler — Context7 `/vercel/next.js/v16.2.9`: BFF `fetch(proxyRequest)` przekazuje strumień; przy ISR `response.blob()` buforuje body (zakaz dla SSE) → `dynamic = 'force-dynamic'` + `cache: 'no-store'`. Wiele `Set-Cookie`: `headers.getSetCookie()`, nie `Object.fromEntries(headers.entries())`. `params` jako `Promise`.

**Testy:** brak automatycznych FE. Ręcznie: Network w DevTools — żądania na origin FE `/api/v1`, brak hosta api; login ustawia cookie na FE; `GET .../events` (gdy kiedyś) to `event-stream`.

**DoD kroku:**

- Brak `NEXT_PUBLIC_API_BASE_URL` w przykładzie env i w `next.config`.
- `apiFetch` jedyny produktowy fetch; cykl 401 tylko raz.
- Proxy zwraca `upstream.body` (nie `await text()` / `blob()` na SSE).
- 500 proxy bez URL-a api.

---

### KROK 3 — Visual lock tokenów i prymitywów shadcn

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Jednorazowy język wizualny karty i chrome. Major 1.4.4; skill `content-chain-product-ui` (`rules-taste.md`, `rules-states.md`, `rules-anti-tells.md`, `preflight.md`). Fazy 2–6 nie dostają drugiej palety.

**Artefakty:**

- Zmiana: `apps/frontend/src/app/globals.css`
- Zmiana: `apps/frontend/src/app/layout.tsx` (font + SessionProvider w KROK 4; tu wiring `--font-sans`)
- CLI: prymitywy shadcn w `apps/frontend/src/shared/ui/`
- Nowy: `apps/frontend/src/shared/ui/form-field.tsx`

**Implementacja:**

Z katalogu `apps/frontend`:

```bash
pnpm exec shadcn add input label card dialog dropdown-menu separator skeleton sheet
```

(równoważne: `npx shadcn@latest add @shadcn/input @shadcn/label @shadcn/card @shadcn/dialog @shadcn/dropdown-menu @shadcn/separator @shadcn/skeleton @shadcn/sheet`). Nie wklejać stock-fioletu. Kolory = tokeny poniżej. `lucide-react` zostaje w Button shadcn; ikony produktowe (sidebar) = Iconify.

**Refaktor:** `apps/frontend/src/app/globals.css` — zamień cały plik na:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

/* z-index: baza 0 · chrome 10 · overlay (floating box) 20 · modal 30 · toast 40 */
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  --font-heading: var(--font-geist-sans);
  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
  --color-chart-5: var(--chart-5);
  --color-chart-4: var(--chart-4);
  --color-chart-3: var(--chart-3);
  --color-chart-2: var(--chart-2);
  --color-chart-1: var(--chart-1);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);
  --z-base: 0;
  --z-chrome: 10;
  --z-overlay: 20;
  --z-modal: 30;
  --z-toast: 40;
}

:root {
  --background: oklch(0.985 0.004 240);
  --foreground: oklch(0.22 0.02 240);
  --card: oklch(0.995 0.002 240);
  --card-foreground: oklch(0.22 0.02 240);
  --popover: oklch(0.995 0.002 240);
  --popover-foreground: oklch(0.22 0.02 240);
  --primary: oklch(0.4 0.05 230);
  --primary-foreground: oklch(0.985 0.01 230);
  --secondary: oklch(0.95 0.01 240);
  --secondary-foreground: oklch(0.28 0.02 240);
  --muted: oklch(0.95 0.01 240);
  --muted-foreground: oklch(0.5 0.02 240);
  --accent: oklch(0.95 0.012 230);
  --accent-foreground: oklch(0.28 0.03 230);
  --destructive: oklch(0.55 0.16 25);
  --border: oklch(0.9 0.01 240);
  --input: oklch(0.9 0.01 240);
  --ring: oklch(0.4 0.05 230);
  --chart-1: oklch(0.4 0.05 230);
  --chart-2: oklch(0.55 0.02 240);
  --chart-3: oklch(0.45 0.02 240);
  --chart-4: oklch(0.35 0.02 240);
  --chart-5: oklch(0.28 0.02 240);
  --radius: 0.5rem;
  --sidebar: oklch(0.97 0.008 240);
  --sidebar-foreground: oklch(0.22 0.02 240);
  --sidebar-primary: oklch(0.4 0.05 230);
  --sidebar-primary-foreground: oklch(0.985 0.01 230);
  --sidebar-accent: oklch(0.93 0.012 230);
  --sidebar-accent-foreground: oklch(0.28 0.03 230);
  --sidebar-border: oklch(0.9 0.01 240);
  --sidebar-ring: oklch(0.4 0.05 230);
}

.dark {
  --background: oklch(0.2 0.02 240);
  --foreground: oklch(0.97 0.01 240);
  --card: oklch(0.24 0.02 240);
  --card-foreground: oklch(0.97 0.01 240);
  --popover: oklch(0.24 0.02 240);
  --popover-foreground: oklch(0.97 0.01 240);
  --primary: oklch(0.72 0.04 230);
  --primary-foreground: oklch(0.2 0.02 240);
  --secondary: oklch(0.3 0.02 240);
  --secondary-foreground: oklch(0.97 0.01 240);
  --muted: oklch(0.3 0.02 240);
  --muted-foreground: oklch(0.72 0.015 240);
  --accent: oklch(0.3 0.02 230);
  --accent-foreground: oklch(0.97 0.01 240);
  --destructive: oklch(0.65 0.14 25);
  --border: oklch(1 0 0 / 12%);
  --input: oklch(1 0 0 / 14%);
  --ring: oklch(0.72 0.04 230);
  --chart-1: oklch(0.72 0.04 230);
  --chart-2: oklch(0.62 0.02 240);
  --chart-3: oklch(0.5 0.02 240);
  --chart-4: oklch(0.4 0.02 240);
  --chart-5: oklch(0.32 0.02 240);
  --sidebar: oklch(0.24 0.02 240);
  --sidebar-foreground: oklch(0.97 0.01 240);
  --sidebar-primary: oklch(0.72 0.04 230);
  --sidebar-primary-foreground: oklch(0.2 0.02 240);
  --sidebar-accent: oklch(0.3 0.02 230);
  --sidebar-accent-foreground: oklch(0.97 0.01 240);
  --sidebar-border: oklch(1 0 0 / 12%);
  --sidebar-ring: oklch(0.72 0.04 230);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  html {
    @apply font-sans h-full;
  }
  body {
    @apply bg-background text-foreground min-h-[100dvh];
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Lock: jedna chłodna rodzina (hue ~240) + jeden akcent stalowy (~230, chroma ≤ 0.05). **Brak** stock `--sidebar-primary: oklch(0.488 0.243 264.376)` (fiolet). Motyw produktowy = light (`html` bez `.dark`). Para `.dark` tylko żeby nie zostawić fioletu w martwym motywie.

**Refaktor:** `apps/frontend/src/app/layout.tsx` — fragment fontów (SessionProvider dołoży KROK 4).

Teraz (`layout.tsx`): `--font-geist-sans` na `html`, body bez providera.

W `@theme` już `--font-sans: var(--font-geist-sans)` (powyżej). W `layout.tsx` zostaw Geist jak jest; dodaj `display: 'swap'` przy fontach (Context7 `next/font`).

```tsx
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});
```

Nowy plik — `apps/frontend/src/shared/ui/form-field.tsx`:

```tsx
import type { ReactNode } from 'react';
import { Label } from '@/shared/ui/label';
import { cn } from '@/shared/utils/utils';

type FormFieldProps = {
  readonly label: string;
  readonly htmlFor: string;
  readonly children: ReactNode;
  readonly hint?: string;
  readonly error?: string;
};

export function FormField({ label, htmlFor, children, hint, error }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
      {error ? (
        <p className="text-xs text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function EnvelopeError({
  code,
  message,
  className,
}: {
  readonly code: string;
  readonly message: string;
  readonly className?: string;
}) {
  return (
    <p className={cn('text-sm text-destructive', className)} role="alert">
      <span className="font-medium font-mono text-xs tabular-nums">{code}</span>
      {': '}
      {message}
    </p>
  );
}
```

**Biblioteki / API:** shadcn registry (CLI); Tailwind v4 `@theme inline`; Iconify w KROK 7. Skill: bez GSAP / `motion` / Inter / nowej palety per widok.

**Testy:** brak. Pre-flight skill przed oddaniem implementacji.

**DoD kroku:**

- `--font-sans` → Geist (koniec cyklu `var(--font-sans)`).
- Primary i sidebar-primary bez hue 264.
- Input/Dialog/Card z tej samej skali `--radius`.
- Pre-flight: zero hero/bento/emoji/em-dash w copy UI.

---

### KROK 4 — Probe sesji i karta logowania

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Brak sesji → karta na `/`. Udane `POST /auth/login` → `/account`. Cookie httpOnly na originie FE. Major 1.1; `SPEC-FRONTEND.md` F-4a / F-8; `docs/ux_dashboard.md`. Powierzchnia karty: `content-chain-product-ui`.

**Artefakty:**

- Nowy: `apps/frontend/src/modules/auth/components/session-provider.tsx`
- Nowy: `apps/frontend/src/modules/auth/components/home-entry.tsx`
- Nowy: `apps/frontend/src/modules/auth/components/login-card.tsx`
- Zmiana: `apps/frontend/src/app/page.tsx`
- Zmiana: `apps/frontend/src/app/layout.tsx` (owinięcie `SessionProvider`)

**Implementacja:**

Nowy plik — `apps/frontend/src/modules/auth/components/session-provider.tsx`:

```tsx
'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import { ApiError } from '@/shared/api/envelope';
import { setApiFetchUnauthorizedHandler } from '@/shared/api/api-fetch';
import { fetchSessionUser } from '@/modules/auth/api/auth.api';
import type { SessionUser } from '@/modules/auth/api/session.types';

export type SessionState =
  | { status: 'loading' }
  | { status: 'anonymous' }
  | { status: 'authenticated'; user: SessionUser };

type SessionContextValue = {
  readonly state: SessionState;
  readonly setAuthenticated: (user: SessionUser) => void;
  readonly clear: () => void;
};

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { readonly children: ReactNode }) {
  const router = useRouter();
  const [state, setState] = useState<SessionState>({ status: 'loading' });

  const clear = useCallback(() => {
    setState({ status: 'anonymous' });
  }, []);

  const setAuthenticated = useCallback((user: SessionUser) => {
    setState({ status: 'authenticated', user });
  }, []);

  useEffect(() => {
    setApiFetchUnauthorizedHandler(() => {
      setState({ status: 'anonymous' });
      router.replace('/');
    });
    return () => setApiFetchUnauthorizedHandler(undefined);
  }, [router]);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const user = await fetchSessionUser();
        if (!cancelled) setState({ status: 'authenticated', user });
      } catch (reason: unknown) {
        if (cancelled) return;
        if (reason instanceof ApiError && reason.status === 401) {
          setState({ status: 'anonymous' });
          return;
        }
        setState({ status: 'anonymous' });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(
    () => ({ state, setAuthenticated, clear }),
    [state, setAuthenticated, clear],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession(): SessionContextValue {
  const value = useContext(SessionContext);
  if (!value) {
    throw new Error('useSession must be used within SessionProvider');
  }
  return value;
}
```

Nowy plik — `apps/frontend/src/modules/auth/components/login-card.tsx`:

```tsx
'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { EnvelopeError, FormField } from '@/shared/ui/form-field';
import { ApiError } from '@/shared/api/envelope';
import { loginWithPassword } from '@/modules/auth/api/auth.api';
import { useSession } from '@/modules/auth/components/session-provider';

export function LoginCard() {
  const router = useRouter();
  const { setAuthenticated } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<{ code: string; message: string } | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setPending(true);
    setError(null);
    try {
      const user = await loginWithPassword({ email, password });
      setAuthenticated(user);
      router.replace('/account');
    } catch (reason: unknown) {
      if (reason instanceof ApiError) {
        setError({ code: reason.envelope.code, message: reason.envelope.message });
      } else {
        setError({ code: 'INTERNAL_ERROR', message: 'Nie udało się odczytać odpowiedzi.' });
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <Card className="w-full max-w-md border bg-card shadow-none">
      <CardHeader className="gap-1">
        <CardTitle className="text-lg font-semibold">Content Chain</CardTitle>
        <p className="text-sm text-muted-foreground">Zaloguj się do instancji.</p>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <FormField label="E-mail" htmlFor="login-email">
            <Input
              id="login-email"
              name="email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </FormField>
          <FormField label="Hasło" htmlFor="login-password">
            <Input
              id="login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </FormField>
          {error ? <EnvelopeError code={error.code} message={error.message} /> : null}
          <Button type="submit" disabled={pending} className="w-full">
            {pending ? 'Logowanie…' : 'Zaloguj się'}
          </Button>
          <Button type="button" variant="outline" disabled className="w-full" title="Rejestracja jest niedostępna">
            Nie masz konta? Zarejestruj się!
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
```

Nowy plik — `apps/frontend/src/modules/auth/components/home-entry.tsx`:

```tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/shared/ui/skeleton';
import { LoginCard } from '@/modules/auth/components/login-card';
import { useSession } from '@/modules/auth/components/session-provider';

export function HomeEntry() {
  const router = useRouter();
  const { state } = useSession();

  useEffect(() => {
    if (state.status === 'authenticated') {
      router.replace('/account');
    }
  }, [router, state.status]);

  if (state.status === 'loading' || state.status === 'authenticated') {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-background p-4">
        <div className="flex w-full max-w-md flex-col gap-3 rounded-lg border bg-card p-6">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background p-4">
      <LoginCard />
    </div>
  );
}
```

**Refaktor:** `apps/frontend/src/app/page.tsx`

Teraz: boilerplate `<h1>Content Chain</h1>`.

Zamień na:

```tsx
import { HomeEntry } from '@/modules/auth/components/home-entry';

export default function HomePage() {
  return <HomeEntry />;
}
```

**Refaktor:** `apps/frontend/src/app/layout.tsx` — owiń `{children}` w `SessionProvider`. `html lang="pl"` zostaje. Nie dodawaj klasy `.dark`.

```tsx
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import type { PropsWithChildren } from 'react';
import { SessionProvider } from '@/modules/auth/components/session-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Content Chain',
  description: 'Automatyzacja generowania treści na Media Społecznościowe.',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="pl" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-[100dvh] flex-col">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
```

**Biblioteki / API:** `credentials: 'same-origin'` (F-2). Probe = `apiFetch('/auth/me')` (cykl 401 w helperze).

**DoD kroku:**

- Reload bez sesji: karta, nie sidebar.
- Login 200: cookie na originie FE (Application → Cookies hosta Next), przejście na `/account`.
- Tokenów nie ma w `localStorage` / `sessionStorage`.
- Przycisk rejestracji `disabled`.
- Błąd loginu: `code` + `message` z envelope.

---

### KROK 5 — First-run jako tryb tej samej karty

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Pusta instancja nie dostaje osobnej strony. Ten sam formularz submituje `POST /auth/bootstrap-admin`. Major 1.2; `SPEC-AUTH.md` A-1 / A-1a; `SPEC-FRONTEND.md` F-4a.

**Artefakty:**

- Zmiana: `apps/frontend/src/modules/auth/components/login-card.tsx`

**Implementacja:**

**Refaktor:** `login-card.tsx` — dodać odczyt `fetchBootstrapStatus` przy montowaniu; submit w trybie first-run woła `bootstrapAdmin` zamiast `loginWithPassword`. Przycisk rejestracji nadal `disabled`. Helper pod tytułem (nie osobny ekran): `Pierwsza instalacja. To konto zostanie administratorem.`

Teraz (submit zawsze `loginWithPassword`).

Zamień na (istotny fragment — stan + submit + helper):

```tsx
'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { EnvelopeError, FormField } from '@/shared/ui/form-field';
import { ApiError } from '@/shared/api/envelope';
import {
  bootstrapAdmin,
  fetchBootstrapStatus,
  loginWithPassword,
} from '@/modules/auth/api/auth.api';
import { useSession } from '@/modules/auth/components/session-provider';

export function LoginCard() {
  const router = useRouter();
  const { setAuthenticated } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);
  const [bootstrapAvailable, setBootstrapAvailable] = useState(false);
  const [error, setError] = useState<{ code: string; message: string } | null>(null);

  useEffect(() => {
    let cancelled = false;
    void fetchBootstrapStatus()
      .then((available) => {
        if (!cancelled) setBootstrapAvailable(available);
      })
      .catch(() => {
        if (!cancelled) setBootstrapAvailable(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setPending(true);
    setError(null);
    try {
      const user = bootstrapAvailable
        ? await bootstrapAdmin({ email, password })
        : await loginWithPassword({ email, password });
      setAuthenticated(user);
      router.replace('/account');
    } catch (reason: unknown) {
      if (reason instanceof ApiError) {
        setError({ code: reason.envelope.code, message: reason.envelope.message });
      } else {
        setError({ code: 'INTERNAL_ERROR', message: 'Nie udało się odczytać odpowiedzi.' });
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <Card className="w-full max-w-md border bg-card shadow-none">
      <CardHeader className="gap-1">
        <CardTitle className="text-lg font-semibold">Content Chain</CardTitle>
        <p className="text-sm text-muted-foreground">
          {bootstrapAvailable
            ? 'Pierwsza instalacja. To konto zostanie administratorem.'
            : 'Zaloguj się do instancji.'}
        </p>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <FormField label="E-mail" htmlFor="login-email">
            <Input
              id="login-email"
              name="email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </FormField>
          <FormField
            label="Hasło"
            htmlFor="login-password"
            hint={
              bootstrapAvailable
                ? 'Min. 12 znaków, wielka litera, cyfra i znak specjalny.'
                : undefined
            }
          >
            <Input
              id="login-password"
              name="password"
              type="password"
              autoComplete={bootstrapAvailable ? 'new-password' : 'current-password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </FormField>
          {error ? <EnvelopeError code={error.code} message={error.message} /> : null}
          <Button type="submit" disabled={pending} className="w-full">
            {pending ? 'Zapisywanie…' : 'Zaloguj się'}
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled
            className="w-full"
            title="Rejestracja jest niedostępna"
          >
            Nie masz konta? Zarejestruj się!
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
```

CTA zostaje **„Zaloguj się”** (ten sam widok, nie drugi branding first-run). Po sukcesie bootstrap-status w API jest `available: false` — ponowny bootstrap nie jest ścieżką UI (kolejny submit to login; api i tak odrzuci bootstrap).

**DoD kroku:**

- `available: true` → submit = `POST /auth/bootstrap-admin` → `/account`.
- Rejestracja nadal nieaktywna.
- Brak trasy `/first-run` / `/bootstrap`.

---

### KROK 6 — Publiczny `/invite/accept?token=`

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Deep link jak w mailu. Sukces **nie** otwiera dashboardu. Major 1.3; `SPEC-AUTH.md` A-7b; `SPEC-FRONTEND.md` F-8. Formularz: ten sam lock co karta logowania.

**Artefakty:**

- Nowy: `apps/frontend/src/modules/auth/password-policy.ts`
- Nowy: `apps/frontend/src/modules/auth/components/accept-invite-form.tsx`
- Nowy: `apps/frontend/src/app/invite/accept/page.tsx`

**Implementacja:**

Nowy plik — `apps/frontend/src/modules/auth/password-policy.ts`:

```ts
const SPECIAL = /[!@#$%^&*()_+\-=[\]{}|;:,.<>?]/;

export function passwordMeetsPolicy(password: string): boolean {
  return (
    password.length >= 12 &&
    /\d/.test(password) &&
    /[A-Z]/.test(password) &&
    SPECIAL.test(password)
  );
}
```

To **podpowiedź UX**. Źródło prawdy = api (`VALIDATION_FAILED`). Nie blokuj submitu wyłącznie po stronie klienta, jeśli operator chce zobaczyć envelope; wolno `disabled` gdy puste pole. Gdy hasło nie spełnia polityki, pokaż hint PL **oraz** po 400 envelope as-is.

Nowy plik — `apps/frontend/src/modules/auth/components/accept-invite-form.tsx`:

```tsx
'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { EnvelopeError, FormField } from '@/shared/ui/form-field';
import { ApiError } from '@/shared/api/envelope';
import { acceptInvite } from '@/modules/auth/api/auth.api';
import { passwordMeetsPolicy } from '@/modules/auth/password-policy';

type AcceptInviteFormProps = {
  readonly token: string;
};

export function AcceptInviteForm({ token }: AcceptInviteFormProps) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<{ code: string; message: string } | null>(null);
  const [localHint, setLocalHint] = useState<string | undefined>(undefined);

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setError(null);
    if (!passwordMeetsPolicy(password)) {
      setLocalHint('Hasło nie spełnia polityki (12 znaków, wielka litera, cyfra, znak specjalny).');
      return;
    }
    setLocalHint(undefined);
    setPending(true);
    try {
      await acceptInvite({ token, password });
      router.replace('/');
    } catch (reason: unknown) {
      if (reason instanceof ApiError) {
        setError({ code: reason.envelope.code, message: reason.envelope.message });
      } else {
        setError({ code: 'INTERNAL_ERROR', message: 'Nie udało się odczytać odpowiedzi.' });
      }
    } finally {
      setPending(false);
    }
  }

  if (token.length === 0) {
    return (
      <Card className="w-full max-w-md border bg-card shadow-none">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Zaproszenie</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Brak tokenu zaproszenia w adresie.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md border bg-card shadow-none">
      <CardHeader className="gap-1">
        <CardTitle className="text-lg font-semibold">Ustaw pierwsze hasło</CardTitle>
        <p className="text-sm text-muted-foreground">
          Po zapisaniu wrócisz na kartę logowania. Dashboard otworzy się dopiero po zalogowaniu.
        </p>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <FormField
            label="Hasło"
            htmlFor="invite-password"
            hint="Min. 12 znaków, wielka litera, cyfra i znak specjalny."
            error={localHint}
          >
            <Input
              id="invite-password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </FormField>
          {error ? <EnvelopeError code={error.code} message={error.message} /> : null}
          <Button type="submit" disabled={pending} className="w-full">
            {pending ? 'Zapisywanie…' : 'Zapisz hasło'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
```

Nowy plik — `apps/frontend/src/app/invite/accept/page.tsx`:

```tsx
import { AcceptInviteForm } from '@/modules/auth/components/accept-invite-form';

type AcceptInvitePageProps = {
  searchParams: Promise<{ token?: string | string[] }>;
};

export default async function AcceptInvitePage({ searchParams }: AcceptInvitePageProps) {
  const params = await searchParams;
  const raw = params.token;
  const token = typeof raw === 'string' ? raw : Array.isArray(raw) ? (raw[0] ?? '') : '';

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background p-4">
      <AcceptInviteForm token={token} />
    </div>
  );
}
```

Token: surowy `string` z query (nie brand). Nie renderować tokenu w UI. Brak trasy `/accept-invite`. Sukces → `/`, bez `setAuthenticated`.

**Biblioteki / API:** `searchParams: Promise<…>` — Context7 Next 16 page convention. Publiczny POST, `skipAuthRefresh: true`.

**DoD kroku:**

- `/invite/accept?token=` pokazuje formularz hasła.
- 201 → karta logowania, nie `/account`.
- Zły/zużyty token: envelope `code` + `message` (ten sam komunikat api, bez enumeracji w UI).
- `/accept-invite` nie jest kanonem.

---

### KROK 7 — Layout po sesji: sidebar, header, sloty, rejestr EventSource

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Chrome dashboardu z miejscami na Fazy 2–6. Header: tożsamość → Wyloguj → modal. Rejestr SSE w layoucie (pusty użyciem). Major 1.4.1–1.4.3 + rejestr 1.6; `docs/ux_dashboard.md` tabela nawigacji.

**Artefakty:**

- Nowy: `apps/frontend/src/modules/shell/nav.ts`
- Nowy: `apps/frontend/src/modules/shell/components/event-source-registry-provider.tsx`
- Nowy: `apps/frontend/src/modules/shell/components/chrome-slots.tsx`
- Nowy: `apps/frontend/src/modules/shell/components/logout-dialog.tsx`
- Nowy: `apps/frontend/src/modules/shell/components/app-sidebar.tsx`
- Nowy: `apps/frontend/src/modules/shell/components/app-header.tsx`
- Nowy: `apps/frontend/src/modules/shell/components/dashboard-shell.tsx`
- Nowy: `apps/frontend/src/app/(app)/layout.tsx`
- Nowy: `apps/frontend/src/app/(app)/account/page.tsx`
- Nowy: `apps/frontend/src/app/(app)/context/page.tsx`
- Nowy: `apps/frontend/src/app/(app)/runs/page.tsx`
- Nowy: `apps/frontend/src/app/(app)/users/page.tsx`

**Implementacja:**

Nowy plik — `apps/frontend/src/modules/shell/nav.ts`:

```ts
import type { UserRole } from '@content-chain/shared';

export type AppNavItem = {
  readonly href: '/context' | '/runs' | '/account' | '/users';
  readonly label: string;
  readonly icon: string;
  readonly adminOnly: boolean;
};

export const APP_NAV: readonly AppNavItem[] = [
  { href: '/context', label: 'Kontekst firmy', icon: 'lucide:building-2', adminOnly: false },
  { href: '/runs', label: 'Runy', icon: 'lucide:archive', adminOnly: false },
  { href: '/account', label: 'Konto', icon: 'lucide:circle-user', adminOnly: false },
  { href: '/users', label: 'Użytkownicy', icon: 'lucide:users', adminOnly: true },
] as const;

export function navItemsForRole(role: UserRole): readonly AppNavItem[] {
  return APP_NAV.filter((item) => !item.adminOnly || role === 'admin');
}
```

Nowy plik — `apps/frontend/src/modules/shell/components/event-source-registry-provider.tsx`:

```tsx
'use client';

import { createContext, useContext, useEffect, useMemo, type ReactNode } from 'react';
import {
  createEventSourceRegistry,
  type EventSourceRegistry,
} from '@/modules/shell/event-source-registry';

const EventSourceRegistryContext = createContext<EventSourceRegistry | null>(null);

export function EventSourceRegistryProvider({ children }: { readonly children: ReactNode }) {
  const registry = useMemo(() => createEventSourceRegistry(), []);

  useEffect(() => {
    return () => {
      // Faza 1: brak otwartych połączeń. Cleanup na unmount layoutu.
    };
  }, [registry]);

  return (
    <EventSourceRegistryContext.Provider value={registry}>
      {children}
    </EventSourceRegistryContext.Provider>
  );
}

export function useEventSourceRegistry(): EventSourceRegistry {
  const value = useContext(EventSourceRegistryContext);
  if (!value) {
    throw new Error('useEventSourceRegistry must be used within EventSourceRegistryProvider');
  }
  return value;
}
```

Nowy plik — `apps/frontend/src/modules/shell/components/chrome-slots.tsx`:

```tsx
'use client';

import { usePathname } from 'next/navigation';

export function CompletenessChipSlot() {
  return <div data-slot="completeness-chip" className="min-h-6" />;
}

export function FeedbackCtaSlot() {
  return <div data-slot="feedback-cta" />;
}

export function FloatingBoxSlot() {
  const pathname = usePathname();
  if (pathname === '/account') return null;
  // Faza 3: zdjąć pointer-events-none gdy box dostanie treść.
  return (
    <div
      data-slot="floating-box"
      className="pointer-events-none fixed right-4 bottom-4 z-[var(--z-overlay)] w-80 max-w-[calc(100%-2rem)]"
    />
  );
}
```

Nowy plik — `apps/frontend/src/modules/shell/components/logout-dialog.tsx`:

```tsx
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
      // Sesja i tak ma zniknąć z UI.
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
```

Esc / zamknięcie dialogu = „Nie” (Dialog shadcn). Dashboard zostaje.

Nowy plik — `apps/frontend/src/modules/shell/components/app-sidebar.tsx`:

```tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react';
import { Separator } from '@/shared/ui/separator';
import { CompletenessChipSlot } from '@/modules/shell/components/chrome-slots';
import { navItemsForRole } from '@/modules/shell/nav';
import type { UserRole } from '@content-chain/shared';
import { cn } from '@/shared/utils/utils';

type AppSidebarProps = {
  readonly role: UserRole;
};

export function AppSidebar({ role }: AppSidebarProps) {
  const pathname = usePathname();
  const items = navItemsForRole(role);

  return (
    <aside className="flex h-full w-56 shrink-0 flex-col border-r bg-sidebar text-sidebar-foreground">
      <div className="px-3 py-3">
        <p className="text-sm font-medium">Content Chain</p>
      </div>
      <Separator />
      <nav className="flex flex-1 flex-col gap-0.5 p-2">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors',
                active
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'hover:bg-sidebar-accent/70',
              )}
            >
              <Icon icon={item.icon} className="size-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-2">
        <CompletenessChipSlot />
      </div>
    </aside>
  );
}
```

Nowy plik — `apps/frontend/src/modules/shell/components/app-header.tsx`:

```tsx
'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Button } from '@/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/shared/ui/sheet';
import { AppSidebar } from '@/modules/shell/components/app-sidebar';
import { FeedbackCtaSlot } from '@/modules/shell/components/chrome-slots';
import { LogoutDialog } from '@/modules/shell/components/logout-dialog';
import type { SessionUser } from '@/modules/auth/api/session.types';

type AppHeaderProps = {
  readonly user: SessionUser;
};

export function AppHeader({ user }: AppHeaderProps) {
  const [logoutOpen, setLogoutOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[var(--z-chrome)] flex h-12 items-center justify-end gap-2 border-b bg-background px-3">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button type="button" variant="outline" size="icon" aria-label="Otwórz nawigację">
              <Icon icon="lucide:menu" className="size-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-56 p-0">
            <AppSidebar role={user.role} />
          </SheetContent>
        </Sheet>
      </div>
      <FeedbackCtaSlot />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" variant="ghost" className="max-w-64 truncate font-normal">
            {user.email}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onSelect={(event) => {
              event.preventDefault();
              setLogoutOpen(true);
            }}
          >
            Wyloguj się
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <LogoutDialog open={logoutOpen} onOpenChange={setLogoutOpen} />
    </header>
  );
}
```

Nowy plik — `apps/frontend/src/modules/shell/components/dashboard-shell.tsx`:

```tsx
'use client';

import { useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/shared/ui/skeleton';
import { useSession } from '@/modules/auth/components/session-provider';
import { AppHeader } from '@/modules/shell/components/app-header';
import { AppSidebar } from '@/modules/shell/components/app-sidebar';
import { FloatingBoxSlot } from '@/modules/shell/components/chrome-slots';
import { EventSourceRegistryProvider } from '@/modules/shell/components/event-source-registry-provider';

export function DashboardShell({ children }: { readonly children: ReactNode }) {
  const router = useRouter();
  const { state } = useSession();

  useEffect(() => {
    if (state.status === 'anonymous') {
      router.replace('/');
    }
  }, [router, state.status]);

  if (state.status !== 'authenticated') {
    return (
      <div className="flex min-h-[100dvh]">
        <Skeleton className="hidden h-[100dvh] w-56 md:block" />
        <div className="flex flex-1 flex-col">
          <Skeleton className="h-12 w-full" />
          <div className="p-4">
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <EventSourceRegistryProvider>
      <div className="flex min-h-[100dvh] bg-background">
        <div className="hidden md:block">
          <AppSidebar role={state.user.role} />
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <AppHeader user={state.user} />
          <main className="min-w-0 flex-1 p-4 text-sm">{children}</main>
        </div>
        <FloatingBoxSlot />
      </div>
    </EventSourceRegistryProvider>
  );
}
```

Nowy plik — `apps/frontend/src/app/(app)/layout.tsx`:

```tsx
import type { PropsWithChildren } from 'react';
import { DashboardShell } from '@/modules/shell/components/dashboard-shell';

export default function AppGroupLayout({ children }: PropsWithChildren) {
  return <DashboardShell>{children}</DashboardShell>;
}
```

Placeholdery (RSC) — ten sam rytm empty:

`apps/frontend/src/app/(app)/account/page.tsx`:

```tsx
export default function AccountPage() {
  return (
    <section className="flex max-w-xl flex-col gap-2">
      <h1 className="text-lg font-medium">Konto</h1>
      <p className="text-sm text-muted-foreground">
        Tu pojawi się start runu, Moje runy, e-mail i opinia. Wylogowanie zostaje w headerze.
      </p>
    </section>
  );
}
```

`apps/frontend/src/app/(app)/context/page.tsx`:

```tsx
export default function ContextPage() {
  return (
    <section className="flex max-w-xl flex-col gap-2">
      <h1 className="text-lg font-medium">Kontekst firmy</h1>
      <p className="text-sm text-muted-foreground">
        Tu uzupełnisz sekcje bramki. Widok będzie dostępny w kolejnej fazie.
      </p>
    </section>
  );
}
```

`apps/frontend/src/app/(app)/runs/page.tsx`:

```tsx
export default function RunsPage() {
  return (
    <section className="flex max-w-xl flex-col gap-2">
      <h1 className="text-lg font-medium">Runy</h1>
      <p className="text-sm text-muted-foreground">
        Archiwum zakończonych i nieudanych runów instancji pojawi się później. Start runu jest na
        Koncie.
      </p>
    </section>
  );
}
```

`apps/frontend/src/app/(app)/users/page.tsx`:

```tsx
'use client';

import Link from 'next/link';
import { useSession } from '@/modules/auth/components/session-provider';

export default function UsersPage() {
  const { state } = useSession();
  if (state.status !== 'authenticated') return null;
  if (state.user.role !== 'admin') {
    return (
      <section className="flex max-w-xl flex-col gap-2">
        <h1 className="text-lg font-medium">Użytkownicy</h1>
        <p className="text-sm text-muted-foreground">Brak dostępu.</p>
        <Link href="/account" className="text-sm text-primary underline-offset-4 hover:underline">
          Wróć na Konto
        </Link>
      </section>
    );
  }
  return (
    <section className="flex max-w-xl flex-col gap-2">
      <h1 className="text-lg font-medium">Użytkownicy</h1>
      <p className="text-sm text-muted-foreground">
        Lista kont i zaproszenia pojawią się później. Akceptacja zaproszenia jest pod
        /invite/accept.
      </p>
    </section>
  );
}
```

Nie wołać `GET /users` w tej fazie.

**DoD kroku:**

- Niezalogowany na `/account` → `/` (karta).
- Sidebar: Kontekst, Runy, Konto; Użytkownicy tylko `admin`. Brak „Wyloguj się” w sidebarze.
- Header: zawartość do prawej; e-mail jako przycisk → „Wyloguj się” → modal; Tak → `/`; Nie zostawia dashboard.
- Sloty `data-slot`: completeness, feedback-cta, floating-box (ukryty na `/account`).
- `useEventSourceRegistry()` dostępny w drzewie po sesji; zero otwartych `EventSource` w Fazie 1.
- `<768px`: sidebar w Sheet; identity nadal w prawym klastrze headera.

---

## Weryfikacja wycinka

Pokrycie major Faza 1 + MILESTONE 1:

| DoD | Gdzie |
|-----|--------|
| Brak originu api w przeglądarce; `API_BASE_URL` server-only | KROK 2 |
| Brak sesji ≠ dashboard | KROK 4, KROK 7 |
| Strona główna = karta + martwa rejestracja; first-run = tryb | KROK 4–5 |
| `/invite/accept?token=` → karta logowania | KROK 6 |
| Layout: sidebar sloty, header prawo, wylogowanie z modalem | KROK 7 |
| Brand types na granicach UI | KROK 1 |
| Chrome PL; envelope as-is | KROK 1, 4–6 |
| SSE proxy bez bufora; rejestr w layoutcie | KROK 2, 7 |
| Visual lock (bez stock-fioletu) | KROK 3 |

Zgodność: `SPEC-FRONTEND.md` F-1–F-4a, F-7, F-8 (wejście/chrome); `SPEC-AUTH.md` A-1a / A-2 / A-3a / A-4 / A-7b; `SPEC-BEZPIECZENSTWO.md` B-5a / B-8; skill pre-flight Faza 1.

**Poza weryfikacją:** treść Kontekstu / Konta / Runów / Users, chip, box, SSE live (Fazy 2–6).

Ręczny smoke (gdy api stoi na 3001, FE z `API_BASE_URL`):

1. Pusta DB: `/` helper first-run → bootstrap → `/account` + sidebar.
2. Wyloguj (modal Tak) → karta; rejestracja nadal martwa.
3. Login → `/account`; header e-mail z prawej.
4. Rola `user`: brak pozycji Użytkownicy; `/users` = „Brak dostępu”.
5. `/invite/accept?token=zły` → envelope; sukces invite → `/` bez dashboardu.
6. DevTools: XHR/fetch tylko na origin Next `/api/v1`; Application cookies `cc_access` / `cc_refresh` httpOnly na hoście FE.

---

## Ślad do major

Po **implementacji** (poza tą sesją, gdy użytkownik tak zdecyduje):

- Faza 1 → `WYKONANY`
- Kroki 1.1, 1.2, 1.3, 1.4 (w tym 1.4.4), 1.5, 1.6 → `WYKONANY`
- MILESTONE 1 → `OSIĄGNIĘTY`

Ten plik **nie** zmienia `content-chain-frontend_major_plan.md`.
