# Content Chain — feature plan: guest nawigacja archiwum → cudzy detail read-only (Faza 21 FE)

**Lokalizacja:** `feature-plans/content-chain_feature_plan_faza-21-guest-archive-detail-nav.md`  
**Kotwica major:** Faza 21 (cała) — `content-chain-frontend_major_plan.md` (`NIE_ROZPOCZĘTY`, **bez** MILESTONE 21).  
**Refaktor względem:** **Faza 14** / archiwum bez Link do cudzego detail (`WYKONANY`) — *„klik cudzego wiersza zablokowany (FE + API 403)”*. Od tej fazy: klik wiersza archiwum (także cudzego) **dozwolony** → detail **read-only**; **bez** EventSource na cudzym; locki mutacji guest ∧ demo on **bez zmian**. Faza 14 / powiązane milestone’e pozostają historią (`WYKONANY`).  
**Źródła:** `docs/ux_dashboard.md`, `SPEC-FRONTEND.md` F-8 / F-10 / F-5 / F-5a, `SPEC-TESTY.md` T-7 (FE poza MVP), major FE Faza 21; kontrakt api (poza zakresem kodu tego wycinka) = major BE Faza 23 / `SPEC-RUNY.md` R-12 / D-55.  
**Kolejność `KROK` w tym pliku:** helper ownership → odblokowanie Link w archiwum → guardy read-only na detail (pass rozwojowy: helper **przed** użyciem w detail / ewentualnym reuse w `use-run-details`).  
**Skill UI:** `content-chain-product-ui` — dziedziczenie locku Fazy 1, **bez** nowej palety (Link / detail jak istniejące powierzchnie Runy).

**Statusy kroków feature:** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`

---

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Cała Faza 21 majoru FE: guest (demo on) — nawigacja z archiwum Runy do cudzego `/runs/:id` read-only; bez SSE na cudzym; locki mutacji F-10 nietknięte |
| Major | Faza 21; start po Fazach 1–20 (`WYKONANY`) i Milestone 1–6 (`OSIĄGNIĘTY`); **bez** MILESTONE 21; numer FE **21** ≠ backend **23** |
| Poza zakresem | Implementacja `apps/api` / BE Faza 23; SSE / live cudzych runów; odblokowanie mutacji guest (Users, email, write kontekstu, Edytuj, finalize, typy poza allowlistą); prefill startu z cudzego wiersza archiwum; edycja treści Fazy 14 (`WYKONANY`); **MILESTONE 21**; nowa paleta UI |
| Po implementacji (informacyjnie) | Major FE: Faza 21 → `WYKONANY` (DoD gate + kod z tego planu). Brak `MILESTONE` 21. Faza 14 bez zmian historii. Edycja major **poza** tym skillem. Skuteczny GET cudzego detail wymaga wdrożenia kontraktu BE Faza 23 (osobny feature-plan / sesja) |

**Mapa major → ten plik**

| Major (FE Faza 21) | Feature | Zakres |
|--------------------|---------|--------|
| Odblokowanie nawigacji archiwum (także cudzy) | FAZA 1 / KROK 1 | helper + `ArchiveRunsView` Link |
| Detail cudzy = read-only; bez SSE; locki mutacji bez zmian | FAZA 1 / KROK 2 | `RunDetailsView` + reuse helper w SSE `own` |

**Pass rozwojowy (sesja planu):**

1. Helper `isSnapshotOwnedBy` powstaje **przed** guardem HITL / reuse w `use-run-details`.
2. Odblokowanie Link w archiwum **w tym samym** KROK 1 co helper (niezależne od detail, ale helper jest wspólny).
3. Detail (KROK 2) używa helpera — bez drugiego inline porównania `startedBy.id`.
4. **Brak przesunięć między fazami major.**

---

## Założenia

- Stack FE bez zmian: Next.js 16 (`apps/frontend`), React 19, TypeScript strict projektu, BFF same-origin `/api/v1`, kit shadcn / tokeny z Fazy 1.
- `tsconfig` **bez** zmian. Typy jawne; zakaz `any` / `@ts-ignore`; `import type` dla typów; branded `UserId` / `RunId` z `@content-chain/shared`.
- Predykat locków mutacji: `useGuestLocked()` = `role === guest` ∧ `demoMode === true` — **bez zmian** treści / miejsc poza odblokowaniem nawigacji archiwum.
- Lista archiwum = wyłącznie statusy terminalne (`completed` \| `failed` \| `cancelled`) — jak dziś; nie ma wierszy live na Runy.
- SSE: nadal wyłącznie własne + live status (`use-run-details` / rejestr layoutu) — F-5 / F-5a.
- `RunReviewPanel` już zwraca `null` gdy `!author` — cudzy detail bez gwiazdek / finalize; **bez** zmiany kontraktu panelu poza ewentualnym nieużyciem przy braku author (regresja).
- `canCancelRunSnapshot` / terminalny status → Stop niewidoczny na archiwalnym; admin→guest cancel na detail nieterminalnym — poza typową ścieżką z archiwum.
- Automatyczne testy `apps/frontend` — **poza MVP** (`SPEC-TESTY.md` T-7); DoD = checklist manual / obserwowalne zachowanie.
- Przy konflikcie praktyki ↔ SPEC → **wygrywa SPEC**.
- W planie **zakaz** odwołań do planów pomocniczych w rootcie; kanon = `docs/` + `spec/` + major.

---

## Biblioteki (research)

**Bez Context7** — wycinek to istniejący `next/link` + lokalny helper ownership i warunki renderu. Brak nowych zależności npm i nowych API frameworka.

| Temat | Ustalenie | Decyzja w wycinku |
|-------|-----------|-------------------|
| Nawigacja | `Link` z `next/link` (już w `ArchiveRunsView`) | Usunąć warunek blokujący; styl Link bez zmian (dziedziczenie product-ui) |
| SSE | Istniejący `EventSource` + rejestr | Nadal `live = own && isLiveRunStatus(...)` |
| Envelope 403 | Istniejący `EnvelopeError` / `ApiError` w detail | Deep-link / GET odmowa → jak dziś error state |

---

## FAZA 1 — Guest: archiwum → cudzy detail read-only

Odpowiada major FE Faza 21 (cała). Status startowy kroków: `NIE_ROZPOCZĘTY`.

---

### KROK 1 — Helper ownership + odblokowanie Link w archiwum

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Wspólna asercja „snapshot/wiersz należy do sesji” oraz odblokowanie nawigacji z wiersza archiwum dla guest (także cudzy). Major FE Faza 21; `SPEC-FRONTEND.md` F-8 / F-10 pkt 6; `docs/ux_dashboard.md` (Widok: Runy — nawigacja). Refaktor względem Fazy 14 (blokada Link).

**Artefakty:**

- Nowy: `apps/frontend/src/modules/runs/lib/is-snapshot-owned-by.ts`
- Zmiana: `apps/frontend/src/modules/runs/components/archive-runs-view.tsx`

#### Nowy plik — pełny kod

`apps/frontend/src/modules/runs/lib/is-snapshot-owned-by.ts`:

```typescript
import type { UserId } from '@content-chain/shared';

type StartedBySlice = {
  readonly startedBy: { readonly id: UserId } | null;
};

/** True gdy `startedBy.id` === zalogowany użytkownik (cudzy / brak inicjatora → false). */
export function isSnapshotOwnedBy(
  snapshot: StartedBySlice,
  userId: UserId,
): boolean {
  return snapshot.startedBy !== null && snapshot.startedBy.id === userId;
}
```

#### Refaktor — `ArchiveRunsView`: zawsze Link na typie tasku

Usuń zależność od `useGuestLocked` w tym pliku (po KROK 1 nieużywana — dziś tylko blokuje Link).

**teraz** (importy — fragment):

```typescript
import { useSession } from '@/modules/auth/components/session-provider';
import { useGuestLocked } from '@/modules/demo/lib/use-guest-locked';
```

**zamień na:**

```typescript
import { useSession } from '@/modules/auth/components/session-provider';
```

**teraz** (ciało komponentu — fragment):

```typescript
  const { state: session } = useSession();
  const guestLocked = useGuestLocked();
  const isAdmin = session.status === 'authenticated' && session.user.role === 'admin';
```

**zamień na:**

```typescript
  const { state: session } = useSession();
  const isAdmin = session.status === 'authenticated' && session.user.role === 'admin';
```

**teraz** (komórka Typ w wierszu tabeli):

```tsx
                  <td className="py-2 pr-3">
                    {guestLocked &&
                      (session.status !== 'authenticated' ||
                        item.startedBy === null ||
                        item.startedBy.id !== session.user.id) ? (
                      <span>{RUN_TASK_TYPE_LABELS[item.taskType]}</span>
                    ) : (
                      <Link
                        href={`/runs/${item.runId}`}
                        className="underline-offset-4 hover:underline"
                      >
                        {RUN_TASK_TYPE_LABELS[item.taskType]}
                      </Link>
                    )}
                  </td>
```

**zamień na:**

```tsx
                  <td className="py-2 pr-3">
                    <Link
                      href={`/runs/${item.runId}`}
                      className="underline-offset-4 hover:underline"
                    >
                      {RUN_TASK_TYPE_LABELS[item.taskType]}
                    </Link>
                  </td>
```

**Uwagi:**

- Prefill startu z wiersza archiwum — **nadal zakaz** (modal „Uruchom agenta” zostaje z pustym draftem; nietknięty w tym kroku).
- CTA / filtry / paginacja / odświeżanie 15 min — **bez zmian**.
- Wiersz z `startedBy === null`: Link dozwolony; przy guest API może zwrócić **403** (kontrakt BE) → detail pokazuje envelope (KROK 2 / istniejący error state). Nie rezerwuj osobnego UI „brak inicjatora” w tym wycinku.
- Styl Link: istniejące klasy — **bez** nowej palety (`content-chain-product-ui`).

**Biblioteki / API:** `next/link` — bez zmian API.

**Testy:** brak automatycznych FE (T-7). Checklist w DoD fazy / weryfikacji wycinka.

**DoD kroku:**

- Plik `is-snapshot-owned-by.ts` istnieje i eksportuje `isSnapshotOwnedBy`.
- W `ArchiveRunsView` każdy wiersz archiwum ma `Link` do `/runs/:runId` (guest ∧ demo on **oraz** admin/`user`) — brak gałęzi `<span>` blokującej cudzy wiersz.
- `useGuestLocked` **nie** jest importowany w `archive-runs-view.tsx`.
- Modal startu / filtry / reszta widoku Runy bez regresji wizualnej (dziedziczenie locku).

---

### KROK 2 — Detail: jawne read-only dla cudzego + regresja SSE own-only

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Na `/runs/:id` dla guest: cudzy (lub brak ownera) = UI bez HITL; SSE nadal tylko własne live; mutacje F-10 (Edytuj / finalize / Stop na terminalnym) bez regresji odblokowania. Major FE Faza 21; F-5 / F-5a / F-8 / F-10; `docs/ux_dashboard.md` (Run szczegóły).

**Artefakty:**

- Zmiana: `apps/frontend/src/modules/runs/components/run-details-view.tsx`
- Zmiana: `apps/frontend/src/modules/runs/components/use-run-details.ts` (reuse helpera zamiast inline `own`)

#### Refaktor — `RunDetailsView`: nie montuj HITL gdy nie owner

**teraz** (importy — dopisz helper; reszta bez zmian kolejności wartości → type):

```typescript
import { canCancelRunSnapshot } from '@/modules/runs/lib/can-cancel-run-snapshot';
import { IsoDateTime } from '@/shared/datetime/iso-date-time';
```

**zamień na:**

```typescript
import { canCancelRunSnapshot } from '@/modules/runs/lib/can-cancel-run-snapshot';
import { isSnapshotOwnedBy } from '@/modules/runs/lib/is-snapshot-owned-by';
import { IsoDateTime } from '@/shared/datetime/iso-date-time';
```

**teraz** (po wyliczeniu `canCancel`, przed `return`):

```typescript
  const canCancel =
    session.status === 'authenticated' &&
    canCancelRunSnapshot({
      snapshot,
      sessionUserId: session.user.id,
      sessionRole: session.user.role,
    });

  return (
```

**zamień na:**

```typescript
  const canCancel =
    session.status === 'authenticated' &&
    canCancelRunSnapshot({
      snapshot,
      sessionUserId: session.user.id,
      sessionRole: session.user.role,
    });
  const isOwn =
    session.status === 'authenticated' &&
    isSnapshotOwnedBy(snapshot, session.user.id);

  return (
```

**teraz** (montaż `HitlPanel`):

```tsx
      <HitlPanel
        key={snapshot.runId}
        snapshot={snapshot}
        onSubmitted={async () => {
          await reloadDetails(snapshot.runId);
          patchStatus(snapshot.runId, 'running');
          void refresh();
        }}
        onStaleStatus={async () => {
          const next = await reloadDetails(snapshot.runId);
          if (next !== undefined) {
            patchStatus(next.runId, next.status);
          }
          void refresh();
        }}
      />
```

**zamień na:**

```tsx
      {isOwn ? (
        <HitlPanel
          key={snapshot.runId}
          snapshot={snapshot}
          onSubmitted={async () => {
            await reloadDetails(snapshot.runId);
            patchStatus(snapshot.runId, 'running');
            void refresh();
          }}
          onStaleStatus={async () => {
            const next = await reloadDetails(snapshot.runId);
            if (next !== undefined) {
              patchStatus(next.runId, next.status);
            }
            void refresh();
          }}
        />
      ) : null}
```

**Uwagi (bez dalszych zmian kodu, o ile aktualne):**

- `RunResultSection` — `canEdit` wymaga `!guestLocked` ∧ `canEditSnapshot` (owner); cudzy guest: brak Edytuj.
- `RunReviewPanel` — early return `!author`; cudzy: brak gwiazdek / finalize.
- `canCancel` na statusie archiwalnym = false; Stop niewidoczny.
- **Bez** nowego banera „Podgląd archiwum” — docs nie wymagają osobnego chrome; dziedziczenie istniejącego layoutu detail.
- Błąd GET (**403** envelope): istniejący branch `view.status === 'error'` + `EnvelopeError` — **bez** nowego copy specjalnego pod guest (message z API).

#### Refaktor — `use-run-details`: `own` przez helper

**teraz** (importy):

```typescript
import { useOwnRuns } from '@/modules/runs/components/own-runs-provider';
import { useRunEventSource } from '@/modules/runs/components/use-run-event-source';
```

**zamień na:**

```typescript
import { useOwnRuns } from '@/modules/runs/components/own-runs-provider';
import { useRunEventSource } from '@/modules/runs/components/use-run-event-source';
import { isSnapshotOwnedBy } from '@/modules/runs/lib/is-snapshot-owned-by';
```

**teraz:**

```typescript
  const own =
    view.status === 'ready' &&
    session.status === 'authenticated' &&
    view.snapshot.startedBy !== null &&
    view.snapshot.startedBy.id === session.user.id;
```

**zamień na:**

```typescript
  const own =
    view.status === 'ready' &&
    session.status === 'authenticated' &&
    isSnapshotOwnedBy(view.snapshot, session.user.id);
```

`live = … && own && … && isLiveRunStatus(...)` — **bez zmian** semantyki (cudzy terminalny → `own === false` → **zero** `EventSource`).

**Biblioteki / API:** bez nowych.

**Testy:** brak automatycznych FE. Manual:

1. Guest + demo on: archiwum → klik cudzego `completed`/`failed`/`cancelled` → detail ze snapshotem (wynik + logi gdy API BE Faza 23 wdrożone); brak Stop / HITL / Edytuj / finalize; DevTools → **brak** `EventSource` na ten `runId`.
2. Guest: klik **własnego** wiersza archiwum → jak dziś (detail własny; SSE nadal nie — status terminalny).
3. Guest: locki mutacji poza archiwum (Users ukryte, email lock, typy allowlisty, write kontekstu) — **bez regresji**.
4. Admin / `user`: Link archiwum i detail jak przed zmianą.
5. (Gdy BE jeszcze bez wyjątku archiwum) cudzy detail → **403** envelope — akceptowalne do czasu wdrożenia BE; FE nie blokuje nawigacji.

**DoD kroku:**

- `HitlPanel` montowany tylko gdy `isOwn`.
- `use-run-details` używa `isSnapshotOwnedBy`; przy cudzym snapshocie `live === false` (brak acquire SSE).
- `useGuestLocked` / panel review / Edytuj — bez poluzowania mutacji.
- Brak nowej palety / nowych komponentów chrome.

---

#### Propozycja commit message

```text
feat(frontend): allow guest archive rows to open foreign read-only run details

Unlock Runy archive navigation for demo guests while keeping SSE and mutation
locks limited to owned runs.
```

---

## Weryfikacja wycinka

| Kryterium | Oczekiwanie |
|-----------|-------------|
| Kotwica major FE Faza 21 | Pokryta FAZA 1 / KROK 1–2 |
| docs / SPEC | Zgodność z `docs/ux_dashboard.md` + F-8 / F-10 (nawigacja dozwolona, read-only, bez SSE cudzy); locki mutacji nietknięte |
| Faza 14 | Historia nietknięta; refaktor opisany jako nowy wycinek |
| Kod nowych plików | Pełny `is-snapshot-owned-by.ts` |
| Refaktory | Fragmenty `teraz → zamień na` |
| Pass rozwojowy | Helper przed detail; brak przesunięć między fazami major |
| Nagłówki | Wyłącznie `FAZA` / `KROK` |
| Commit message | EN, Conventional Commits, na końcu FAZA 1 |
| Testy FE | Poza MVP — checklist manual |
| BE | Poza zakresem; zależność kontraktu odnotowana |
| Major | Plik major **nietknięty** w tej sesji |
| Plany pomocnicze w rootcie | Brak odwołań |
| Product UI | Dziedziczenie locku, bez nowej palety |

---

## Ślad do major (informacyjnie, po implementacji)

| Pozycja | Po implementacji tego planu |
|---------|-----------------------------|
| `content-chain-frontend_major_plan.md` — **Faza 21** | `WYKONANY` (DoD gate + kod FE) |
| MILESTONE 21 | **nie istnieje** — bez oznaczania |
| Faza 14 i wcześniejsze | Bez zmian statusów / treści historycznej |
| Backend Faza 23 | Osobny tor; ten plan FE **nie** ustawia statusu BE |

Edycja statusów major — **poza** tą sesją (ręcznie lub w sesji `/feature-implementation` na życzenie użytkownika).
