---
wersja: 2
data_utworzenia: 2026-08-11
data_modyfikacji: 2026-08-15
---

# SPEC — Monorepo

## Cel / zakres względem dokumentacji

Norma **granic procesów, workspaces i zależności** w monorepo Content Chain przy pisaniu kodu. Uszczegóławia (bez przepisywania) ustalenia z `docs/architektura.md`, `docs/architektura_katalogi_pliki.md` oraz pułapki granic z `docs/anty_patterny.md`.

Ten SPEC **nie** opisuje reguł domenowych BC, kontraktów HTTP/SSE ani schematu Prisma — tylko układ repo i dozwolone powiązania między pakietami.

## Powiązanie ze stylem z docs

Wiążące:

- styl globalny: **modularny monolit** (trzy aplikacje w jednym repo) + **porty/adaptery** na granicach I/O (`docs/architektura.md`);
- docelowe drzewo i mapowanie styl → katalogi (`docs/architektura_katalogi_pliki.md`);
- zasada zależności: `apps/frontend` → `apps/api` (HTTP) → porty → adaptery; gateway bez domeny Content Chain.

**Wyjątek względem stylu globalnego:** brak — ten obszar egzekwuje styl globalny na poziomie layoutu i zależności.

## Wymagania (egzekwowalne)

M-1. W rootcie monorepo istnieją dokładnie trzy aplikacje runtime: `apps/api`, `apps/frontend`, `apps/ai-provider-gateway`, oraz pakiet `packages/shared`.

M-2. Workspace jest zarządzany przez **pnpm** (`package.json` + `pnpm-workspace.yaml` w rootcie). Definicja członków workspace obejmuje `apps/*` i `packages/*` (lub równoważne globy zgodne z drzewem docs).

M-3. Zależności między pakietami workspace deklaruje się protokołem **`workspace:`** (np. `"@content-chain/shared": "workspace:*"`) zgodnie z [dokumentacją pnpm Workspaces](https://pnpm.io/workspaces).

M-4. Importy kodu z innego pakietu workspace odbywają się **wyłącznie** przez nazwę pakietu (np. `@content-chain/shared`), nigdy ścieżkami względnymi wychodzącymi poza granice własnego pakietu (np. `../../packages/shared/...`).

M-5. `packages/shared` zawiera wyłącznie **typy TypeScript, enumy i brand types** publicznego kontraktu API. Brak runtime (m.in. Zod, funkcji biznesowych), use-case’ów, Prisma, promptów, Nest/Next/LangGraph.

M-6. Każda aplikacja i `packages/shared` ma **własny** `tsconfig` (osobne pliki). Project references TypeScript **nie** są wymagane w MVP.

M-7. Jedyny obowiązkowy DX startu lokalnego to **skrypty w rootcie** (`pnpm`, filtry `--filter`, ewentualnie `pnpm -r`). Nx i Turborepo są poza MVP.

M-8. `apps/api/src/shared/` (jeśli używany) służy wyłącznie cross-cuttingowi **wewnątrz api** i **nie** zastępuje ani nie dubluje `packages/shared` regułami domenowymi.

## Norma implementacji

### Wzorce / struktura

| Element | Norma |
|---------|--------|
| Forma systemu | Modularny monolit w monorepo — trzy procesy + shared typy |
| Granica pakietów | 1 workspace package = 1 `package.json`; brak rootowego `src/apps/` |
| Shared kontrakt | `packages/shared` → nazwa npm `@content-chain/shared` |
| Komunikacja FE↔API | wyłącznie HTTP/SSE (klient sieciowy), bez importu źródeł api |
| Komunikacja API↔gateway | wyłącznie klient HTTP (adapter portu LLM), bez importu źródeł gateway |
| Lint / format | ESLint + Prettier w **rootcie** (wspólna konfiguracja dla workspace) |

### Wolno

- Deklarować `@content-chain/shared` jako zależność `apps/api` i `apps/frontend` przez `workspace:`.
- Trzymać w `packages/shared` typy request/response, enumy ról / statusów runu / platform SM / języków oraz brand types zgodne z `docs/brand_types.md`.
- Uruchamiać pakiety skryptami root (`pnpm --filter api …`, `pnpm -r …`).
- Rozszerzać drzewo wewnątrz `apps/*/src` zgodnie z BC i warstwami — szczegóły BC w osobnych SPEC.

### Nie wolno

- Umieszczać use-case’ów, Prisma, promptów, reguł Social / bramki kontekstu w `packages/shared`.
- Importować kod źródłowy `apps/ai-provider-gateway` z `apps/api` (lub odwrotnie) jako moduł TS.
- Importować kod źródłowy `apps/api` z `apps/frontend` (tylko HTTP do API).
- Tworzyć drugiego pakietu „shared” z logiką biznesową poza `packages/shared`.
- Opakowywać aplikacje w rootowy katalog `src/apps/`.
- Wprowadzać Nx lub Turborepo jako wymóg DX w MVP.
- Przenosić domenę Content Chain (kontekst firmy, Social, auth produktu, Feedback, przegląd runu) do `apps/ai-provider-gateway` lub do `apps/frontend`.

Zmiana względem wersji 1: lista zakazu obejmuje Feedback i przegląd runu.

### Zatwierdzony stack (obszar)

| Narzędzie | Status MVP |
|-----------|------------|
| **pnpm workspaces** (`pnpm-workspace.yaml`, protokół `workspace:`) | obowiązkowe |
| **ESLint** + **Prettier** (konfiguracja w rootcie) | obowiązkowe |
| **Nx** / **Turborepo** | poza MVP (zakaz jako obowiązek DX) |
| Major pnpm | **bez pinu w SPEC** — wersja w lockfile / przy implementacji |

Źródło weryfikacji workspace: [pnpm Workspaces](https://pnpm.io/workspaces) (m.in. `pnpm-workspace.yaml`, protokół `workspace:`).

## Kryteria akceptacji

- [ ] Root ma `pnpm-workspace.yaml` obejmujący `apps/*` i `packages/*` (lub równoważne globy).
- [ ] Istnieją dokładnie ścieżki `apps/api`, `apps/frontend`, `apps/ai-provider-gateway`, `packages/shared`.
- [ ] `apps/api` i `apps/frontend` zależą od `@content-chain/shared` przez `workspace:` i importują wyłącznie nazwą pakietu.
- [ ] W `packages/shared` brak ORM, use-case’ów, promptów i walidatorów runtime.
- [ ] Brak importów TS między `apps/api` a `apps/ai-provider-gateway` oraz z `apps/frontend` do źródeł `apps/api`.
- [ ] Każdy pakiet ma własny `tsconfig`; start DX idzie ze skryptów root (bez Nx/Turborepo).
- [ ] ESLint i Prettier są skonfigurowane w rootcie workspace.

## Poza zakresem

- Treść i wzorce BC: Auth, Company Context, Social, Runs → osobne `SPEC-*.md`.
- Kontrakt HTTP/SSE i klient gateway → `SPEC-KOMUNIKACJA.md` / `docs/dokumentacja_komunikacji.md`.
- Schema Prisma, adaptery persistence → `SPEC-PERSISTENCE.md`.
- Docker Compose, env produkcyjne → docs deployment / `SPEC-BEZPIECZENSTWO.md`.
- Pin konkretnej major pnpm oraz wybór konkretnych pluginów ESLint — decyzja implementacyjna przy scaffoldzie (byle norma root + pnpm została zachowana).
