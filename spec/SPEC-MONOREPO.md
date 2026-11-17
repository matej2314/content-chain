---
wersja: 12
data_utworzenia: 2026-08-11
data_modyfikacji: 2026-11-17
---

# SPEC — Monorepo

## Cel / zakres względem dokumentacji

Norma **granic procesów, workspaces i zależności** w monorepo Content Chain przy pisaniu kodu. Uszczegóławia (bez przepisywania) ustalenia z `docs/architektura.md`, `docs/architektura_katalogi_pliki.md` oraz pułapki granic z `docs/anty_patterny.md`.

Ten SPEC **nie** opisuje reguł domenowych BC, kontraktów HTTP/SSE ani schematu Prisma — tylko układ repo i dozwolone powiązania między pakietami.

Zmiana względem wersji 11 / platform packages: M-1 dopisuje `packages/domain-kit` + `packages/persistence`; M-8 — kanon `DomainException` / `parseWithZod` / pagination helpers = `@content-chain/domain-kit` (nie api-only, nie `runs-kernel`); Auth **nie** zależy od `runs-kernel` wyłącznie po wyjątki/parse.

Zmiana względem wersji 10 / day-1 import workera z drzewa api: **unieważniona** norma „import TS z `apps/api` do `apps/worker` dopuszczalny”. Obowiązują `@content-chain/runs-kernel` + `@content-chain/run-pipelines`; **zakaz** importów TS `apps/worker` ↔ `apps/api`; dependency closure workera + assets w pakiecie pipelines (M-1 / M-10 / M-11).

Zmiana względem wersji 9 / M-1 „dokładnie trzy aplikacje”: cztery runtime — dopisano **`apps/worker`**. Worker → PG / gateway (jak api); **zakaz** publicznego REST runów operatora na workerze; hub NOTIFY w workerze vs Subjecty w api (`SPEC-RUNY.md`).

Zmiana względem wersji 8: brak normy buildu obrazów Docker. Od tej wersji M-9 — kontekst **root** monorepo + **pnpm** (`docs/deployment.md`).

## Powiązanie ze stylem z docs

Wiążące:

- styl globalny: **modularny monolit** (cztery aplikacje runtime w jednym repo) + **porty/adaptery** na granicach I/O (`docs/architektura.md`);
- docelowe drzewo i mapowanie styl → katalogi (`docs/architektura_katalogi_pliki.md`);
- zasada zależności: `apps/frontend` → `apps/api` (HTTP/SSE); `apps/api` i `apps/worker` → `@content-chain/runs-kernel` (+ worker → `@content-chain/run-pipelines`); `apps/worker` → PG + gateway; **zakaz** TS app↔app; gateway bez domeny Content Chain.

**Wyjątek względem stylu globalnego:** brak — ten obszar egzekwuje styl globalny na poziomie layoutu i zależności.

## Wymagania (egzekwowalne)

M-1. W rootcie monorepo istnieją **cztery** aplikacje runtime: `apps/api`, `apps/frontend`, `apps/ai-provider-gateway`, `apps/worker`, oraz pakiety `packages/shared`, `packages/domain-kit` (`@content-chain/domain-kit`), `packages/persistence` (`@content-chain/persistence`), `packages/runs-kernel` (`@content-chain/runs-kernel`), `packages/run-pipelines` (`@content-chain/run-pipelines`). Liczba aplikacji runtime **bez zmian** (nadal cztery).

M-2. Workspace jest zarządzany przez **pnpm** (`package.json` + `pnpm-workspace.yaml` w rootcie). Definicja członków workspace obejmuje `apps/*` i `packages/*` (lub równoważne globy zgodne z drzewem docs).

M-3. Zależności między pakietami workspace deklaruje się protokołem **`workspace:`** (np. `"@content-chain/shared": "workspace:*"`) zgodnie z [dokumentacją pnpm Workspaces](https://pnpm.io/workspaces).

M-4. Importy kodu z innego pakietu workspace odbywają się **wyłącznie** przez nazwę pakietu (np. `@content-chain/shared`), nigdy ścieżkami względnymi wychodzącymi poza granice własnego pakietu (np. `../../packages/shared/...`).

M-5. `packages/shared` zawiera wyłącznie **typy TypeScript, enumy i brand types** publicznego kontraktu API. Brak runtime (m.in. Zod, funkcji biznesowych), use-case’ów, Prisma, promptów, Nest/Next/LangGraph.

M-6. Każda aplikacja oraz pakiety `packages/shared`, `packages/domain-kit`, `packages/persistence`, `packages/runs-kernel`, `packages/run-pipelines` mają **własny** `tsconfig` (osobne pliki). Project references TypeScript **nie** są wymagane w MVP.

M-7. Jedyny obowiązkowy DX startu lokalnego to **skrypty w rootcie** (`pnpm`, filtry `--filter`, ewentualnie `pnpm -r`). Nx i Turborepo są poza MVP.

M-8. `apps/api/src/shared/` (jeśli używany) służy wyłącznie cross-cuttingowi **wewnątrz api** (config hosta, HTTP DTO/filter, decorators) i **nie** zastępuje ani nie dubluje `packages/shared` regułami domenowymi. Typy `SocialBrief` / `ContentBrief` **nie** należą do `apps/api/src/shared/` ani do `packages/shared` — żyją w BC Runs / `runs-kernel` (`docs/dictionary.md`, `SPEC-RUNY.md` R-3d). Kanon współdzielony api+worker: **`DomainException`**, **`parseWithZod`** (Zod → `VALIDATION_FAILED`) oraz helpery **pagination** (`resolvePaginationMode` / `paginationMeta` / `prismaPageArgs` + typy) = pakiet **`@content-chain/domain-kit`** — **bez** reguł BC; runtime Zod nadal **zakazany** w `packages/shared` (M-5). HTTP-only `PaginationQueryDto` (class-validator/swagger) zostaje w `apps/api/src/shared/http/`. Nest `PrismaModule` / `PrismaService` = **`@content-chain/persistence`** (`SPEC-PERSISTENCE.md` P-2).

Zmiana względem wersji 5 / M-8: wcześniejsze brzmienie dopuszczało cross-cutting bez dublowania `packages/shared` regułami domenowymi, ale **nie** wymieniało jawnie helpera `parse-with-zod.ts`. Od tej wersji lokalizacja wspólnego `parseWithZod` w api shared jest legalna i kanoniczna.

Zmiana względem wersji 11 / M-8: kanon `parseWithZod` / `DomainException` / pagination helpers **przeniesiony** z `apps/api/src/shared/` (oraz interim `runs-kernel`) do `@content-chain/domain-kit`; Auth i metrics **nie** importują `runs-kernel` wyłącznie po te symbole.

M-9. Obrazy Docker usług workspace (`api`, `frontend`, `worker`; gateway gdy zależy od `workspace:` / packages) buduje się z **kontekstu roota** monorepo przez **pnpm** (zachowanie protokołu `workspace:` / `pnpm-lock.yaml`). Dockerfile wskazuje ścieżkę `apps/<svc>/Dockerfile` (lub równoważną), `context: .` (root). **Zakaz** zakładania samodzielnego `npm ci` / `npm install` w izolowanym `apps/<svc>` jako kanonu produkcji przy zależnościach `workspace:` — łamie packages / lockfile (`docs/deployment.md`). Obraz/proces worker = host + `workspace:*` packages — **nie** skopiowane drzewo źródeł api.

M-10. `apps/worker`: cienki host Nest (bootstrap + composition root + pg-boss `work` / abort); **bez** publicznej powierzchni REST runów operatora (EventSource / `POST /runs` zostają na api). Zależności TS: `@content-chain/runs-kernel` + `@content-chain/run-pipelines` (`workspace:*`) — **zakaz** importu TS z `apps/api` (i odwrotnie). Runtime store: ten sam PG (po cutoverze) + gateway. Adapter hub SSE = NOTIFY-only; Subjecty hub wyłącznie w api (`SPEC-RUNY.md` R-4a).

M-11. **Dependency closure** workera: `apps/worker/package.json` = host + `workspace:*` packages + deps faktycznie wymagane przez host. **Zakaz** dokładania deps Auth/HTTP (`bcrypt`, `class-transformer`, swagger, mail, …) „bo `MODULE_NOT_FOUND` z drzewa api”. Pliki runtime (`*.prompt.md` itd.) = assets pakietu `run-pipelines` — worker **nie** polega na `apps/api/nest-cli` assets jako SoT. Shared helpers używane przez worker/kernel (np. `parseTtlMs`) **nie** żyją w `auth/` obok `bcrypt`.

Zmiana względem wersji 8: brak normy Docker/pnpm przy buildzie obrazów. Od tej wersji M-9.
Zmiana względem wersji 10 / M-10: day-1 import z drzewa api — **unieważniony**; obowiązują M-1 pakiety + M-11.

## Norma implementacji

### Wzorce / struktura

| Element | Norma |
|---------|--------|
| Forma systemu | Modularny monolit w monorepo — **cztery** procesy + shared + domain-kit + persistence + `runs-kernel` + `run-pipelines` |
| Granica pakietów | 1 workspace package = 1 `package.json`; brak rootowego `src/apps/` |
| Shared kontrakt | `packages/shared` → `@content-chain/shared` |
| Platform runtime | `packages/domain-kit` → `@content-chain/domain-kit`; `packages/persistence` → `@content-chain/persistence` |
| Kernel / execute | `packages/runs-kernel` → `@content-chain/runs-kernel`; `packages/run-pipelines` → `@content-chain/run-pipelines` |
| Komunikacja FE↔API | wyłącznie HTTP/SSE (klient sieciowy), bez importu źródeł api |
| Komunikacja API↔worker | wyłącznie runtime (PG / NOTIFY / pg-boss) — **bez** importu TS app↔app |
| Komunikacja API↔gateway | wyłącznie klient HTTP (adapter portu LLM), bez importu źródeł gateway |
| Lint / format | ESLint + Prettier w **rootcie** (wspólna konfiguracja dla workspace) |
| Build obrazów | Kontekst **root** + **pnpm** (M-9); ścieżki Dockerfile w `apps/*` |

### Wolno

- Deklarować `@content-chain/shared` jako zależność `apps/api` i `apps/frontend` przez `workspace:`.
- Deklarować `@content-chain/runs-kernel` jako zależność `apps/api` i `apps/worker`; `@content-chain/run-pipelines` jako zależność workera (i api gdy composition root wymaga) przez `workspace:`.
- Deklarować `@content-chain/domain-kit` oraz `@content-chain/persistence` jako zależności hostów / pakietów, które realnie importują te symbole (M-1 / M-8 / P-2).
- Budować obrazy z `docker build -f apps/<svc>/Dockerfile .` (context = root) albo równoważnym `docker compose build`.
- Trzymać w `packages/shared` typy request/response, enumy ról (`UserRole` = `admin` \| `user` \| **`guest`**) / statusów runu / `RunTaskType` (post_*, reel_*, page_*) / `SocialPlatform` / `RunPlatform` / `ContentKind` / języków oraz brand types zgodne z `docs/brand_types.md`.
- Trzymać `SocialBrief` / `ContentBrief` w BC Runs (`run.types.ts`) — to payload agregatu, nie publiczny enum FE/BE.
- Uruchamiać pakiety skryptami root (`pnpm --filter api …`, `pnpm -r …`).
- Rozszerzać drzewo wewnątrz `apps/*/src` zgodnie z BC i warstwami — w tym cienkie hosty `apps/api` / `apps/worker` (nie łamie M-1: cztery aplikacje runtime). Szczegóły BC / execute: `SPEC-RUNY.md`, `SPEC-SOCIAL.md`, `SPEC-CONTENT.md`.
- Trzymać kernel lifecycle w `packages/runs-kernel` oraz slice execute Social+Content (+ assets promptów) w `packages/run-pipelines` — nie łamie M-1 (nie zwiększa liczby app runtime).
- Trzymać `DomainException` / `parseWithZod` / pagination helpers w `packages/domain-kit`; Nest Prisma w `packages/persistence` — nie łamie M-1 (nie zwiększa liczby app runtime).
- Podkatalogi I/O / kernel **wewnątrz** warstwy BC / pakietu (Runs, Auth; Social/Content: `graph/` / `prompts/` / `persistence/`) — nie tworzy nowego BC produktowego (`docs/architektura_katalogi_pliki.md`, `SPEC-RUNY.md`, `SPEC-AUTH.md`).
- Trzymać w `apps/api/src/shared/http/` DTO paginacji HTTP (`PaginationQueryDto`) — logika trybu stron w `domain-kit`.

Zmiana względem wersji 4 / Wolno: dopisano lokalizację briefów kanałowych (nie shared).
Zmiana względem wersji 5 / Wolno: jawnie dopuszczono `parse-with-zod.ts` w api shared (M-8).
Zmiana względem wersji 6 / Wolno: `UserRole` bez `guest`. Od tej wersji unia obejmuje `guest` (`docs/brand_types.md`).
Zmiana względem wersji 7 / Wolno: drzewo warstw bez normy podkatalogów I/O. Od tej wersji podkatalogi po granicy I/O / kernel wewnątrz warstwy BC są legalne i nie łamią M-1.
Zmiana względem wersji 10 / Wolno: *„Na pierwszy cut izolacji: import TS … z drzewa `apps/api` do `apps/worker`”* — **unieważnione**; obowiązują zależności od `runs-kernel` / `run-pipelines`.
Zmiana względem wersji 11 / Wolno: *„Trzymać `parse-with-zod.ts` w `apps/api/src/shared/`”* — **unieważnione**; kanon = `@content-chain/domain-kit` (M-8).

### Nie wolno

- Udawania BC przez folder `helpers/` / `adapters/` / `mappers/` jako kanon warstwy (podział po rodzaju pliku zamiast granicy I/O).
- Umieszczać use-case’ów, Prisma, promptów, reguł Social / Content / bramki kontekstu w `packages/shared`.
- Umieszczać `SocialBrief` / `ContentBrief` w `packages/shared` albo `apps/api/src/shared/types`.
- Importować kod źródłowy `apps/ai-provider-gateway` z `apps/api` (lub odwrotnie) jako moduł TS.
- Importować kod źródłowy `apps/api` z `apps/frontend` (tylko HTTP do API).
- Importować kod źródłowy TS między `apps/api` a `apps/worker` (obie strony) — w tym day-1 import z drzewa api (M-10).
- Dokładania deps Auth/HTTP do `apps/worker` przy `MODULE_NOT_FOUND` z drzewa api; utili TTL/haseł w `auth/` z `bcrypt` w grafie workera (M-11).
- Traktowania nest-cli / dist api jako SoT assets promptów dla workera (M-11).
- Wystawiać publiczny REST / SSE runów operatora z procesu `apps/worker` (M-10).
- Trzymać hub Subjectów SSE w workerze (Subjecty = api; worker = NOTIFY-only).
- Tworzyć drugiego pakietu „shared” z **logiką biznesową BC** poza `packages/shared` (kernel/execute = `runs-kernel` / `run-pipelines`; platforma = `domain-kit` / `persistence` — **bez** reguł Social/Content/Auth).
- Trzymać trwałego SoT `DomainException` / `parseWithZod` / pagination helpers w `runs-kernel` albo dublować je w `apps/api/src/shared/` po cutoverze na `domain-kit` (M-8).
- Uzależniać Auth / metrics od `@content-chain/runs-kernel` wyłącznie po wyjątki / parse / pagination (M-8).
- Opakowywać aplikacje w rootowy katalog `src/apps/`.
- Wprowadzać Nx lub Turborepo jako wymóg DX w MVP.
- Przenosić domenę Content Chain (kontekst firmy, Social, Content, auth produktu, Feedback, przegląd runu) do `apps/ai-provider-gateway` lub do `apps/frontend`.
- Samodzielnego `npm ci` / `npm install` w obrazie `apps/<svc>` przy zależnościach `workspace:` / bez kontekstu roota monorepo (M-9).

Zmiana względem wersji 4 / „Nie wolno”: dopisano zakaz briefów kanałowych w shared (M-8).
Zmiana względem wersji 1: lista zakazu obejmuje Feedback i przegląd runu.
Zmiana względem wersji 3: folder `apps/api/src/content/` nie łamie M-1; shared obejmuje `ContentKind` / `RunPlatform` / pełne `RunTaskType` (bez Zod).
Zmiana względem wersji 8 / „Nie wolno”: dopisano zakaz `npm` w izolowanym app context przy pnpm workspace (M-9).
Zmiana względem wersji 10 / „Nie wolno”: jawny zakaz TS app↔app + closure/assets (M-10 / M-11).
Zmiana względem wersji 11 / „Nie wolno”: doprecyzowano zakaz „drugiego shared” vs legalne `domain-kit` / `persistence`; zakaz Auth→`runs-kernel` po platformę.

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
- [ ] Istnieją ścieżki `apps/api`, `apps/frontend`, `apps/ai-provider-gateway`, `apps/worker`, `packages/shared`, `packages/domain-kit`, `packages/persistence`, `packages/runs-kernel`, `packages/run-pipelines` (M-1); worker bez publicznego REST runów (M-10).
- [ ] `apps/api` i `apps/frontend` zależą od `@content-chain/shared` przez `workspace:` i importują wyłącznie nazwą pakietu; `UserRole` obejmuje `guest`.
- [ ] `apps/api` i `apps/worker` zależą od `@content-chain/runs-kernel`; worker (i api gdy wire) od `@content-chain/run-pipelines` przez `workspace:` (M-1 / M-10).
- [ ] Hosty / pakiety używające wyjątków, `parseWithZod`, pagination helpers zależą od `@content-chain/domain-kit`; Nest Prisma od `@content-chain/persistence` (M-8 / P-2).
- [ ] Auth / metrics **nie** importują `@content-chain/runs-kernel` wyłącznie po `DomainException` / `parseWithZod` / pagination (M-8).
- [ ] W `packages/shared` brak ORM, use-case’ów, promptów i walidatorów runtime.
- [ ] Brak importów TS między `apps/api` a `apps/ai-provider-gateway`, z `apps/frontend` do źródeł `apps/api`, oraz między `apps/api` a `apps/worker` (obie strony).
- [ ] Dependency closure workera bez deps Auth/HTTP „na MODULE_NOT_FOUND”; assets promptów w `run-pipelines` (M-11).
- [ ] Każdy pakiet ma własny `tsconfig`; start DX idzie ze skryptów root (bez Nx/Turborepo).
- [ ] ESLint i Prettier są skonfigurowane w rootcie workspace.
- [ ] Dockerfile’e usług workspace zakładają kontekst **root** + **pnpm** (M-9); brak kanonu `npm ci` w izolowanym `apps/<svc>` przy `workspace:`.

## Poza zakresem

- Treść i wzorce BC: Auth, Company Context, Social, Content, Runs → osobne `SPEC-*.md`.
- Kontrakt HTTP/SSE i klient gateway → `SPEC-KOMUNIKACJA.md` / `docs/dokumentacja_komunikacji.md`.
- Schema Prisma, adaptery persistence → `SPEC-PERSISTENCE.md`.
- Szczegóły Compose (porty, sieci, Vault, entrypoint migracji) → `docs/deployment.md` / `SPEC-BEZPIECZENSTWO.md` (M-9 pinuje tylko kontekst buildu + pnpm).
- Pin konkretnej major pnpm oraz wybór konkretnych pluginów ESLint — decyzja implementacyjna przy scaffoldzie (byle norma root + pnpm została zachowana).
