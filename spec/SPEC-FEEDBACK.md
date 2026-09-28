---
wersja: 5
data_utworzenia: 2026-08-15
data_modyfikacji: 2026-09-27
---

# SPEC — Feedback (opinie tekstowe)

## Cel / zakres względem dokumentacji

Norma bounded contextu **Feedback** w `apps/api`: **zapis** opinii tekstowych o aplikacji, agencie albo runie (append-only, z metadanymi autora i czasu).

Uszczegóławia `docs/dokumentacja_komunikacji.md` (POST `/feedback`), `docs/ux_dashboard.md` (formularz „Zostaw opinię”) oraz podział z `docs/architektura.md` (Feedback ≠ Runs ≠ Social).

**Nie** obejmuje: oceny gwiazdkowej runu, flagi edycji outputu ani finalize przeglądu — to **BC Runs** (`SPEC-RUNY.md`). **Nie** obejmuje panelu administracyjnego / listy odczytu / analityki — **V1 — rozbudowa**.

## Powiązanie ze stylem z docs / wyjątek

Wiążące (`docs/architektura.md`): klasyczne warstwy Nest — controller → application → domain + porty → adapter Prisma. **Bez** LangGraph.

**Wyjątek względem stylu globalnego:** brak.

## Targety i katalog agentów (MVP)

| `targetType` | Dodatkowe pole | Źródło selecta w UI |
|--------------|----------------|---------------------|
| `application` | — | — |
| `agent` | `agentKey` **obowiązkowe** | stały enum (nie tabela Agent) |
| `run` | `runId` **obowiązkowe** | `GET /api/v1/runs/user/:userId` — wyłącznie runy **zalogowanego** (`SPEC-RUNY.md`) |

`FeedbackAgentKey` (stały enum MVP): `IdeationAgent` \| `ContentWriterAgent` \| `ConsistencyVerifier` \| `PageWriterAgent`.

Poza selectem: węzły `LoadContext`, `NormalizeBrief`, `Persist*`, `Refine*`, `OutlineAgent` — nie są osobnymi pozycjami katalogu.

Zmiana względem wersji 1: dopisano `PageWriterAgent` (kontrakt pod Fazę 6; implementacja enumu w shared = Faza 6, nie 4.2).
Zmiana względem wersji 2: zakaz wołania grafu obejmuje też Content; Feedback nie mutuje wyniku Social / Content.

## Wymagania (egzekwowalne)

Fbk-1. `POST /api/v1/feedback` wymaga sesji. Zapisuje wiersz z co najmniej: `id` (`FeedbackId` / `fbk_<uuid>`), `targetType`, `body`, `authorId` (z sesji), `createdAt`; plus `agentKey` albo `runId` zgodnie z tabelą targetów.

Fbk-2. Wiele opinii tego samego autora na ten sam target — **dozwolone** (append-only). Brak edycji i usuwania wpisów w MVP.

Fbk-3. Gdy `targetType = run`: `runId` musi istnieć **oraz** `startedBy` runu = autor sesji. Inaczej **403** `FORBIDDEN` (nieznany run dla obcego id: **404** `RUN_NOT_FOUND` albo 403 — spójnie: obcy run **nie** ujawnia istnienia ponad `FORBIDDEN` gdy id jest poprawnym `RunId` należącym do kogoś innego; nieznany format / nieistniejący → `RUN_NOT_FOUND` / `VALIDATION_FAILED`).

Fbk-3a. Gdy `targetType = run`: status runu = `completed` **albo** `failed` **albo** (`cancelled` **oraz** istnieje wynik). „Istnieje wynik” = **dowolne nie-`null` pole wyniku** w snapshotcie addytywnym spośród: `ideas` / `content` / `contents` / `reelIdeas` / `reelScript` / `reelScripts` / `pageOutline` / `pageDocument` (które dotyczą danego runu). `cancelled` **bez** żadnego nie-`null` pola wyniku → **409** `RUN_NOT_REVIEWABLE`, **bez** zapisu. Inny status (`queued` / `running` / `awaiting_hitl` / `interrupted`) → **409** `RUN_NOT_REVIEWABLE`. Check **po** Fbk-3 (własność wcześniej niż status/wynik — cudzy run w toku zostaje 403, nie 409). Nie dotyczy `application` / `agent`. `reviewFinalizedAt` **nie** blokuje wpisu (append; to nie `REVIEW_LOCKED` z `SPEC-RUNY.md` R-10). Port odczytu runu zwraca `startedBy`, `status` **oraz** sygnał obecności wyniku (pola wyniku albo równoważny wskaźnik) — bez importu `RunsModule` / `assertRunReviewable`.

Zmiana względem Fbk-3 (wcześniejsza norma): sam `startedBy` wystarczał do 201 na dowolnym statusie runu. Potem okno = `completed` \| `failed` (tożsamość z R-10).

Zmiana względem wersji 4 / Fbk-3a: okno = tylko `completed` \| `failed`. Od tej wersji dodatkowo `cancelled` **z** wynikiem; `cancelled` bez wyniku → 409. Przegląd (gwiazdki / Edytuj / finalize) **nadal** bez `cancelled` — `SPEC-RUNY.md` R-10. Źródło: `docs/dokumentacja_komunikacji.md`, `docs/ux_dashboard.md`.

Fbk-4. Gdy `targetType = agent`: `agentKey` z whitelist enumu; brak lub spoza listy → `400` `VALIDATION_FAILED`.

Fbk-5. MVP: **brak** obowiązkowego `GET` kolekcji opinii i panelu admina. Fundament = zapis do DB.

Fbk-6. `body` niepusty; górny limit **4000** znaków. Zakaz sekretów w treści (jak logi runu).

Fbk-7. Controller nie woła LangGraph i nie ładuje promptów. Feedback nie zmienia statusu runu ani wyniku Social / Content.

## Norma implementacji

### Wzorce / struktura

```text
apps/api/src/feedback/
├── feedback.module.ts
├── feedback.controller.ts
├── application/
├── domain/
└── infrastructure/          # Prisma — tabela opinii
```

| Element | Norma |
|---------|--------|
| Warstwy | jak pozostałe BC poza Social |
| Port runów | odczyt `startedBy`, `status` **oraz** obecności wyniku (Fbk-3 / Fbk-3a); bez SQL w domain Feedback; bez importu `RunsModule` |
| Shared | `FeedbackId`, `FeedbackTargetType`, `FeedbackAgentKey` w `@content-chain/shared` |

### Wolno

- Osobna tabela Prisma (nie JSON-plik).
- Walidacja HTTP class-validator; application Zod.
- Współdzielić `PrismaClient` z innymi adapterami.

### Nie wolno

- Panelu odczytu / średnich / eksportu opinii w MVP (V1 — rozbudowa).
- Wołać graf Social albo Content z tego BC.
- Przyjmować `authorId` z body (tylko sesja).
- Pozwalać `user`/`admin` zapisać opinię o **cudzym** runie.
- Zapisywać opinię o runie poza oknem Fbk-3a (`completed` \| `failed` \| (`cancelled` z wynikiem); w tym `cancelled` bez wyniku).
- Wołać `assertRunReviewable` z BC Runs (ta asercja zamyka też finalize — za szeroka na tekst; na `cancelled` i tak blokuje przegląd).
- Łamać `GET /runs` `pageSize=10` zamiast `GET /runs/user/:userId`.
- Traktować opinii tekstowej jako zamiennika `userRating` na runie.

### Zatwierdzony stack (obszar)

| Element | Status |
|---------|--------|
| BC Feedback + tabela opinii + POST zapisu | obowiązkowe w **MVP** (fundament) |
| Enum agentów w shared | obowiązkowe w MVP |
| GET lista / panel admina / analityka | **V1 — rozbudowa** |
| LangGraph / checkpointer | zakaz w tym BC |

## Kryteria akceptacji

- [ ] `POST /feedback` z sesją tworzy wiersz z `authorId` + `createdAt` + targetem.
- [ ] Target `agent` wymaga poprawnego `agentKey`; `run` wymaga własnego `runId` **oraz** okna Fbk-3a (`completed` \| `failed` \| `cancelled`+wynik).
- [ ] Cudzy `runId` → `FORBIDDEN`; run w toku (własny) → `RUN_NOT_REVIEWABLE`; `cancelled` bez wyniku (np. po cancel z `queued`) → 409; `cancelled` po persist pomysłów / partial wyniku → 201 (przy spełnieniu Fbk-3); druga opinia tego samego autora — nowy wiersz (także po finalize).
- [ ] Brak GET panelu jako wymogu MVP.
- [ ] Brak LangGraph w module.

## Poza zakresem

- Ocena gwiazdkowa, flaga edycji, finalize → `SPEC-RUNY.md`.
- UI EventSource / animacje → `SPEC-FRONTEND.md`.
- Stopień edycji outputu (diff / %).
- Panel administracyjny opinii (V1 — rozbudowa).
