---
wersja: 3
data_utworzenia: 2026-08-15
data_modyfikacji: 2026-08-31
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
| Port runów | odczyt `startedBy` przez port Runs (bez SQL w domain Feedback) |
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
- [ ] Target `agent` wymaga poprawnego `agentKey`; `run` wymaga własnego `runId`.
- [ ] Cudzy `runId` → `FORBIDDEN`; druga opinia tego samego autora — nowy wiersz.
- [ ] Brak GET panelu jako wymogu MVP.
- [ ] Brak LangGraph w module.

## Poza zakresem

- Ocena gwiazdkowa, flaga edycji, finalize → `SPEC-RUNY.md`.
- UI EventSource / animacje → `SPEC-FRONTEND.md`.
- Stopień edycji outputu (diff / %).
- Panel administracyjny opinii (V1 — rozbudowa).
