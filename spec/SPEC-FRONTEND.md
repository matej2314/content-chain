---
wersja: 8
data_utworzenia: 2026-08-11
data_modyfikacji: 2026-08-31
---

# SPEC — Frontend

## Cel / zakres względem dokumentacji

Norma `apps/frontend`: cienki klient self-host (first-run, login, dashboard, flow’y Social i Content, HITL, logi, **zapis opinii / oceny / flagi edycji**), spójny z `docs/ux_dashboard.md` i kontraktem `SPEC-KOMUNIKACJA.md` / `SPEC-AUTH.md` / `SPEC-FEEDBACK.md` / `SPEC-RUNY.md`.

Bez reguł domenowych pipeline’u, bez bramki kompletności jako jedynej egzekucji, bez sekretów LLM.

## Powiązanie ze stylem z docs / wyjątek

Wiążące (`docs/architektura.md`): Next.js jako UI; pobieranie i mutacje wyłącznie przez `apps/api`; sekrety LLM nigdy w bundlu.

**Wyjątek względem stylu globalnego api:** tak — **bez** ceremonialnej Clean Architecture / warstwy domain SM w Next. Obowiązuje jednak **podział modułowy** kodu FE (`modules/`), nie płaski „dump” komponentów.

Zmiana względem wersji 2: katalog modułów UI to `modules/` (wcześniej `features/` w tej sekcji, w drzewie „Wzorce / struktura”, w tabeli „Organizacja” oraz w kryteriach akceptacji). Źródło: `docs/architektura_katalogi_pliki.md`.

## Wymagania (egzekwowalne)

F-1. App Router: **Server Components domyślnie**; `"use client"` tylko tam, gdzie potrzeba interakcji, formularzy, SSE lub stanu przeglądarki.

F-2. Wywołania HTTP do api: **natywny `fetch`** z `credentials: 'include'` (cookie sesji). Bez wymogu React Query / SWR w MVP.

F-3. Typy request/response / enumy / brand types z **`@content-chain/shared`** na granicy FE — bez duplikacji DTO „na piechotę”.

F-4. Auth web: wyłącznie cookie **`cc_access`** i **`cc_refresh`** (httpOnly) — patrz `SPEC-AUTH.md`. FE **nie** przechowuje JWT w `localStorage`, memory jako store tokenu ani zmiennych `NEXT_PUBLIC_*`. Brak nagłówka `Authorization: Bearer` jako modelu MVP (także Postman — cookie jar).

F-4a. Probe sesji: `GET /api/v1/auth/me` → przy **401** `POST /auth/refresh` → ponownie `GET /auth/me` → przy kolejnym **401**: ekran logowania **albo** first-run, gdy `GET /auth/bootstrap-status` → `available: true`.

Zmiana względem wersji 1: dopisano obowiązkowy flow me → refresh → me oraz first-run (wcześniej: ogólne „login/sesja na cookie” bez probe i bootstrap UI).

F-5. Live status runu: **SSE** `.../runs/:runId/events` (ta sama sesja cookie). Zakaz pollingu statusu jako kanału live. Status wizualnie animowany / czytelny (`docs/ux_dashboard.md`) — w tym odrębny stan **`interrupted`** (nie pulsacja `running`; brak panelu HITL i oceny). Typ statusu z `@content-chain/shared`.

Zmiana względem wersji 4 / F-5: zbiór statusów UI bez `interrupted`; po restarcie UI mogło mylić przestój recovery z aktywnym pipeline.

F-5a. Cykl życia `EventSource`: gdy snapshot GET jest już `completed` \| `failed`, UI **nie** otwiera SSE (wystarczy GET run / logs). Po evencie `run.completed` \| `run.failed` UI woła `EventSource.close()`. Reconnect (`docs/ux_dashboard.md`) wyłącznie po nieoczekiwanym zerwaniu przy statusie nieterminalnym — nie po zamknięciu terminalnym (przeglądarka sama retry’uje `EventSource`).

Zmiana względem wersji 5 / F-5: F-5 i „Wolno: Reconnect SSE” bez rozróżnienia terminal vs. awaria i bez obowiązku `close()` / braku subskrypcji skończonego runu.

F-6. Bramka „Agenci aktywni” i disable CTA startu runu — UX na bazie `GET .../completeness`; **egzekucja** nadal w api (`409` `CONTEXT_INCOMPLETE`).

F-7. Język UI: **polski**. Treści SM: PL/EN wg briefu runu.

F-8. Widoki minimalne wg `docs/ux_dashboard.md`:

- First-run (bootstrap), Logowanie;
- Kontekst firmy, Runy (lista instancji + filtry + paginacja 10; select `taskType` obejmuje rolki i page_*; `contentKind` gdy page_*; platforma ukryta/disabled gdy page_*), Run szczegóły (live) po kliknięciu wiersza — widok wyniku **post vs rolka vs strona**;
- Użytkownicy (admin: **tylko** lista + tworzenie);
- Konto (**tylko** logout);
- Globalny CTA **„Zostaw opinię”** + formularz (aplikacja / agent / run); na szczegółach runu: **Edytuj** (flaga), **gwiazdki 1–5** (dobrowolne, `null` gdy brak), **Zamknij / zapisz przegląd**.

Zmiana względem wersji 3: dopisano kontrolki **zapisu** feedbacku (`docs/ux_dashboard.md`). Panel administracyjny odczytu opinii / analityka = **V1 — rozbudowa**, nie ten SPEC.
Zmiana względem wersji 7: zakaz logiki pipeline w FE obejmuje Social **i** Content (wcześniej sformułowanie „pipeline SM”).

F-9. Select runów w formularzu opinii: wyłącznie `GET /api/v1/runs/user/:userId` z id z `/auth/me`. Zakaz ładowania „wszystkich runów instancji” z `GET /runs` do tego selecta. Select agentów = enum z shared (labelki PL). Ocena i Edytuj tylko gdy snapshot mówi, że sesja jest `startedBy` i przegląd niezamknięty.

Zmiana względem wersji 1: Konto nie obejmuje zmiany hasła; dodano first-run; lista runów = cała instancja z nawigacją lista → szczegóły; admin users bez edycji/dezaktywacji w UI.

## Norma implementacji

### Wzorce / struktura (modułowo)

```text
apps/frontend/src/
├── app/                    # App Router: routes, layouts
├── modules/                # moduły UI: auth, company-context, social, content, runs, users, feedback, …
│   └── <module>/
│       ├── components/
│       ├── api/            # fetch wrappers do endpointów modułu
│       └── …
├── shared/                 # UI kit (shadcn), utils — bez domeny api
└── …
```

| Element | Norma |
|---------|--------|
| Organizacja | **Moduły UI** pod `modules/` + `app/` na routing |
| Dane | `fetch` → `apps/api`; brak Prisma / gateway / LangGraph w FE |
| UI | **shadcn** + **Iconify** (`@iconify/react`) tam, gdzie ikony są potrzebne |
| Env publiczne | wyłącznie bezpieczne (np. `NEXT_PUBLIC_API_BASE_URL`) — bez sekretów |

### Wolno

- Client components dla SSE, formularzy, interaktywnego HITL.
- Reconnect SSE wyłącznie po nieoczekiwanym zerwaniu przy statusie nieterminalnym + uzupełnienie snapshotem GET run/logs; `EventSource.close()` po evencie terminalnym.
- Read-only podgląd kontekstu dla `user`; edycja tylko gdy sesja `admin` (api i tak egzekwuje).
- First-run na podstawie `bootstrap-status`.
- Formularz opinii i gwiazdki jako Client Components; lock UI po `reviewFinalizedAt`.

### Nie wolno

- Sekretów LLM, `X-Gateway-Key`, JWT w `NEXT_PUBLIC_*` / localStorage.
- Pollingu statusu runu zamiast SSE.
- Zostawiania `EventSource` otwartego po `completed`/`failed` ani reconnectu po zamknięciu terminalnym.
- Otwierania SSE, gdy snapshot już jest `completed` \| `failed`.
- Prezentowania `interrupted` tą samą animacją / copy co `running`.
- Egzekucji bramki kompletności **tylko** w UI.
- Logiki pipeline Social / Content / verifiera / promptów w FE.
- Płaskiego `components/` bez podziału na moduły (`modules/`) przy rozroście ekranów MVP.
- Bearer access jako domyślnego transportu auth w MVP.
- Self-service konta w MVP (zmiana hasła / email / usuwanie siebie).
- UI soft-delete / edycji użytkowników w MVP (tylko lista + create).
- Panelu administracyjnego opinii / analityki ocen w MVP (V1 — rozbudowa).
- Nadpisywania wyniku SM w api z FE poza flagą `outputEdited` w MVP.

### Zatwierdzony stack (obszar)

| Element | Status |
|---------|--------|
| Next.js App Router | obowiązkowe |
| Natywny `fetch` + cookies | obowiązkowe |
| `@content-chain/shared` | obowiązkowe |
| shadcn + Iconify (gdy ikony) | obowiązkowe |
| React Query / SWR | poza wymogiem MVP |
| Automatyczne testy FE | poza MVP (`docs/testy.md`) |

## Kryteria akceptacji

- [ ] First-run, login, ekrany z `ux_dashboard.md` dostępne; UI po polsku.
- [ ] Flow me → refresh → me; sesja na `cc_access` / `cc_refresh` bez tokenu w JS storage.
- [ ] Lista runów: instancja, paginacja 10, filtry (w tym `interrupted`), klik → szczegóły live (SSE) bez pollingu statusu; `interrupted` czytelnie odróżniony od `running` / `queued`.
- [ ] Szczegóły skończonego runu (`completed` \| `failed`) bez otwartego `EventSource`; w trakcie live — `close()` po evencie terminalnym (F-5a).
- [ ] Start runu zablokowany w UI przy niekompletności **i** api zwraca 409 przy obejściu.
- [ ] Admin: lista + create users; Konto: tylko logout.
- [ ] Kod FE podzielony na `app/` + `modules/`; typy z shared.
- [ ] Brak sekretów LLM w bundlu klienta.
- [ ] CTA opinii + formularz zapisuje `POST /feedback`; gwiazdki/Edytuj/finalize wołają kontrakt Runs; select runów z `/runs/user/:userId`.

## Poza zakresem

- Playwright / testy FE, i18n EN, dark/light jako wymóg.
- Pixel-perfect design system / Figma jako część normy.
- Publikacja postów na API portali (v2).
- OAuth / social login.
- Self-service konta; soft-delete users w UI (później / V1).
- Panel admina opinii / stopień edycji outputu (V1 — rozbudowa).
