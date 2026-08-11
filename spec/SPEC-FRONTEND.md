---
wersja: 1
data_utworzenia: 2026-08-11
data_modyfikacji: 2026-08-11
---

# SPEC — Frontend

## Cel / zakres względem dokumentacji

Norma `apps/frontend`: cienki klient self-host (dashboard, flow’y SM, HITL, logi), spójny z `docs/ux_dashboard.md` i kontraktem `SPEC-KOMUNIKACJA.md` / `SPEC-AUTH.md`.

Bez reguł domenowych pipeline’u, bez bramki kompletności jako jedynej egzekucji, bez sekretów LLM.

## Powiązanie ze stylem z docs / wyjątek

Wiążące (`docs/architektura.md`): Next.js jako UI; pobieranie i mutacje wyłącznie przez `apps/api`; sekrety LLM nigdy w bundlu.

**Wyjątek względem stylu globalnego api:** tak — **bez** ceremonialnej Clean Architecture / warstwy domain SM w Next. Obowiązuje jednak **podział modułowy** kodu FE (features), nie płaski „dump” komponentów.

## Wymagania (egzekwowalne)

F-1. App Router: **Server Components domyślnie**; `"use client"` tylko tam, gdzie potrzeba interakcji, formularzy, SSE lub stanu przeglądarki.

F-2. Wywołania HTTP do api: **natywny `fetch`** z `credentials: 'include'` (cookie sesji). Bez wymogu React Query / SWR w MVP.

F-3. Typy request/response / enumy / brand types z **`@content-chain/shared`** na granicy FE — bez duplikacji DTO „na piechotę”.

F-4. Auth web: wyłącznie cookie **`cc_access`** i **`cc_refresh`** (httpOnly) — patrz `SPEC-AUTH.md`. FE **nie** przechowuje JWT w `localStorage`, memory jako store tokenu ani zmiennych `NEXT_PUBLIC_*`. Brak nagłówka `Authorization: Bearer` jako modelu MVP (także Postman — cookie jar).

F-5. Live status runu: **SSE** `.../runs/:runId/events` (ta sama sesja cookie). Zakaz pollingu statusu jako kanału live. Status wizualnie animowany / czytelny (`docs/ux_dashboard.md`).

F-6. Bramka „Agenci aktywni” i disable CTA startu runu — UX na bazie `GET .../completeness`; **egzekucja** nadal w api (`409` `CONTEXT_INCOMPLETE`).

F-7. Język UI: **polski**. Treści SM: PL/EN wg briefu runu.

F-8. Widoki minimalne wg `docs/ux_dashboard.md`: Kontekst firmy, Runy SM, Run szczegóły (live), Użytkownicy (admin), Konto (logout).

## Norma implementacji

### Wzorce / struktura (modułowo)

```text
apps/frontend/src/
├── app/                    # App Router: routes, layouts
├── features/               # moduły UI: auth, company-context, runs, users, …
│   └── <feature>/
│       ├── components/
│       ├── api/            # fetch wrappers do endpointów feature
│       └── …
├── shared/                 # UI kit (shadcn), utils — bez domeny api
└── …
```

| Element | Norma |
|---------|--------|
| Organizacja | **Feature modules** pod `features/` + `app/` na routing |
| Dane | `fetch` → `apps/api`; brak Prisma / gateway / LangGraph w FE |
| UI | **shadcn** + **Iconify** (`@iconify/react`) tam, gdzie ikony są potrzebne |
| Env publiczne | wyłącznie bezpieczne (np. `NEXT_PUBLIC_API_BASE_URL`) — bez sekretów |

### Wolno

- Client components dla SSE, formularzy, interaktywnego HITL.
- Reconnect SSE + uzupełnienie snapshotem GET run/logs.
- Read-only podgląd kontekstu dla `user`; edycja tylko gdy sesja `admin` (api i tak egzekwuje).

### Nie wolno

- Sekretów LLM, `X-Gateway-Key`, JWT w `NEXT_PUBLIC_*` / localStorage.
- Pollingu statusu runu zamiast SSE.
- Egzekucji bramki kompletności **tylko** w UI.
- Logiki pipeline SM / verifiera / promptów w FE.
- Płaskiego `components/` bez podziału na features przy rozroście ekranów MVP.
- Bearer access jako domyślnego transportu auth w MVP.

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

- [ ] Ekrany z `ux_dashboard.md` dostępne; UI po polsku.
- [ ] Login/sesja działa na `cc_access` / `cc_refresh` bez tokenu w JS storage.
- [ ] Szczegóły runu: SSE live + animowany status; bez pollingu statusu.
- [ ] Start runu zablokowany w UI przy niekompletności **i** api zwraca 409 przy obejściu.
- [ ] Kod FE podzielony na `app/` + `features/`; typy z shared.
- [ ] Brak sekretów LLM w bundlu klienta.

## Poza zakresem

- Playwright / testy FE, i18n EN, dark/light jako wymóg.
- Pixel-perfect design system / Figma jako część normy.
- Publikacja postów na API portali (v2).
- OAuth / social login.
