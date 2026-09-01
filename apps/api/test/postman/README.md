# Kolekcja Postman — pipeline Social (Milestone 4 + 4.1)

Powtarzalny happy path **bez UI**: Setup kontekstu przez HTTP, potem posty (`post_ideas`, `post_ideas_then_content`) i rolki (`reel_ideas`, `reel_ideas_then_scripts`).

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
2. Collection Runner: cała kolekcja, foldery w kolejności **Setup → A → B → C → D**.
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
| **A. post_ideas** | bez zmian Milestone 4: `POST /runs` (`taskType: post_ideas`) → poll aż `completed` → `GET .../logs` (`conversationId`, `requestId` na hopie, brak sekretu gateway w body) |
| **B. post_ideas_then_content** | bez zmian Milestone 4: `POST /runs` → poll aż `awaiting_hitl` → `result.ideas[0].id` → `POST .../hitl` `{ selectedIdeaIds: [id] }` → poll aż `completed` + niepusty `result.content.body` |
| **C. reel_ideas** | `POST /runs` (`reel_ideas`) → poll `completed` → `result.reelIdeas[0].id` + logi |
| **D. reel_ideas_then_scripts** | poll `awaiting_hitl` (`options` / `reelIdeas`) → HITL → `result.reelScript.segments` |

Kolekcja **nie** zawiera placeholderów `GATEWAY` ani wywołań gateway — klient woła wyłącznie api.

## Poza zakresem tej kolekcji

- `post_content` solo
- `reel_script` solo (Jest e2e, nie Postman)
- SSE (`GET .../events`)
- Auth / cookie
- Suite CI PR
