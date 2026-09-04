# Kolekcje Postman — pipeline Social i Content (Milestone 4 / 4.1 / 4.2)

Powtarzalny happy path **bez UI**: Setup kontekstu przez HTTP, potem:

- **Social** — posty (`post_ideas`, `post_ideas_then_content`) i rolki (`reel_ideas`, `reel_ideas_then_scripts`)
- **Content** — `page_copy` i `page_outline_then_copy`

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

1. Import → plik kolekcji (`social-pipeline.postman-collection.json` albo `content-pipeline.postman-collection.json`).
2. Collection Runner:
   - Social: foldery w kolejności **Setup → A → B → C → D**.
   - Content: foldery w kolejności **Setup → A → B**.
3. Zmienna `baseUrl` (domyślnie `http://localhost:3001/api/v1`) — zmień tylko gdy api nie stoi na 3001.

Pętla `GET /runs/:runId` jest w skryptach testów (do ~6 min na poll). SSE nie jest częścią DoD Milestone 4 / 4.2.

## Newman (opcjonalnie)

Runner nie jest spięty w SPEC — GUI Postmana albo Newman są równoważne.

```bash
npx --yes newman run apps/api/test/postman/social-pipeline.postman-collection.json
npx --yes newman run apps/api/test/postman/content-pipeline.postman-collection.json
```

## Co robi Setup

W **obu** kolekcjach Setup jest ten sam:

1. `PUT /company-context` — body jak `completeContextBody` z e2e Jest (Social: `apps/api/test/social-pipeline.e2e-spec.ts`; Content: `apps/api/test/content-pipeline.e2e-spec.ts`). PUT jest idempotentnym upsertem singletona; ponowne odpalenie **nie** wymaga wipe tabeli kontekstu.
2. `GET /company-context/completeness` — asercja `complete === true` i puste `missing`.

**Zakaz** zastępowania Setupu seedem Prisma / SQL. Bramka startu runu (`CONTEXT_INCOMPLETE`) i graf (`load-context`) mają zobaczyć ten sam kontrakt HTTP co UI.

## Ścieżki

| Kolekcja | Folder | Przebieg |
|----------|--------|----------|
| Social | **A. post_ideas** | bez zmian Milestone 4: `POST /runs` (`taskType: post_ideas`) → poll aż `completed` → `GET .../logs` (`conversationId`, `requestId` na hopie, brak sekretu gateway w body) |
| Social | **B. post_ideas_then_content** | bez zmian Milestone 4: `POST /runs` → poll aż `awaiting_hitl` → `result.ideas[0].id` → `POST .../hitl` `{ selectedIdeaIds: [id] }` → poll aż `completed` + niepusty `result.content.body` |
| Social | **C. reel_ideas** | `POST /runs` (`reel_ideas`) → poll `completed` → `result.reelIdeas[0].id` + logi |
| Social | **D. reel_ideas_then_scripts** | poll `awaiting_hitl` (`options` / `reelIdeas`) → HITL → `result.reelScript.segments` |
| Content | **A. page_copy** | `POST /runs` bez `platform`, z `contentKind: "blog"`, `brief` bez `ideaCount` → poll `completed` → `result.pageDocument.body` + logi |
| Content | **B. page_outline_then_copy** | poll `awaiting_hitl` → `ideaId` z `hitl.options[0].id` albo `result.pageOutline.id` → HITL → poll `completed` + `pageDocument` |

Kolekcje **nie** zawierają placeholderów `GATEWAY` ani wywołań gateway — klient woła wyłącznie api.

## Poza zakresem tych kolekcji

- `post_content` solo
- `reel_script` solo (Jest e2e, nie Postman)
- SSE (`GET .../events`)
- Auth / cookie
- Suite CI PR
