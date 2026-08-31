# Kolekcja Postman — pipeline Social (Milestone 4)

Powtarzalny happy path **bez UI**: Setup kontekstu przez HTTP, potem obie ścieżki `post_ideas` i `post_ideas_then_content`.

To **nie** jest suite `pnpm test:e2e` (Jest + fake LLM). Tu api woła **żywy** lokalny gateway. JSON w tym katalogu nie wchodzi do Jest (`jest-e2e.json` łapie wyłącznie `.e2e-spec.ts$`).

## Wymagania

1. Skopiować `apps/api/.env.example` → `apps/api/.env` oraz analogicznie env gateway (`apps/ai-provider-gateway/.env.example`). Uzupełnić sekrety lokalnie — **nie** wklejać ich do kolekcji.
2. Migracje Prisma api (SQLite).
3. Uruchomić procesy (kolejność: najpierw gateway, potem api):

```bash
pnpm dev:gateway
pnpm dev:api
```

Api nasłuchuje na `http://localhost:3001` (prefix HTTP: `/api/v1`). Gateway musi odpowiadać — to dowód pośredni ops, nie CI PR.

Auth **nie** jest wymagany (Faza 5 później). Cookie jar w Postmanie niepotrzebny.

## Import i odpalenie (Postman GUI)

1. Import → plik `social-pipeline.postman-collection.json`.
2. Collection Runner: cała kolekcja, foldery w kolejności **Setup → A → B**.
3. Zmienna `baseUrl` (domyślnie `http://localhost:3001/api/v1`) — zmień tylko gdy api nie stoi na 3001.

Pętla `GET /runs/:runId` jest w skryptach testów (do ~6 min na poll). SSE nie jest częścią DoD Milestone 4.

## Newman (opcjonalnie)

Runner nie jest spięty w SPEC — GUI Postmana albo Newman są równoważne.

```bash
npx --yes newman run apps/api/test/postman/social-pipeline.postman-collection.json
```

## Co robi Setup

1. `PUT /company-context` — body jak `completeContextBody` z `apps/api/test/social-pipeline.e2e-spec.ts`. PUT jest idempotentnym upsertem singletona; ponowne odpalenie **nie** wymaga wipe tabeli kontekstu.
2. `GET /company-context/completeness` — asercja `complete === true` i puste `missing`.

**Zakaz** zastępowania Setupu seedem Prisma / SQL. Bramka startu runu (`CONTEXT_INCOMPLETE`) i graf (`load-context`) mają zobaczyć ten sam kontrakt HTTP co UI.

## Ścieżki

| Folder | Przebieg |
|--------|----------|
| **A. post_ideas** | `POST /runs` (`taskType: post_ideas`) → poll aż `completed` → `GET .../logs` (`conversationId`, `requestId` na hopie, brak sekretu gateway w body) |
| **B. post_ideas_then_content** | `POST /runs` → poll aż `awaiting_hitl` → `result.ideas[0].id` → `POST .../hitl` `{ selectedIdeaIds: [id] }` → poll aż `completed` + niepusty `result.content.body` |

Kolekcja **nie** zawiera placeholderów `GATEWAY` ani wywołań gateway — klient woła wyłącznie api.

## Poza zakresem tej kolekcji

- `post_content` solo
- SSE (`GET .../events`)
- Auth / cookie
- Suite CI PR
