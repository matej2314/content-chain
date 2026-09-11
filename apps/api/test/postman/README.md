# Kolekcje Postman — pipeline Social, Content, przegląd/feedback i zaproszenia

Powtarzalny happy path **bez UI**:

- **Social** — Setup (login admina → kontekst przez HTTP), potem posty (`post_ideas`, `post_ideas_then_content`) i rolki (`reel_ideas`, `reel_ideas_then_scripts`)
- **Content** — to samo Setup, potem `page_copy` i `page_outline_then_copy`
- **Review + feedback** — `review.postman-collection.json`: login + kontekst, cienkie fixture’y runów, ocena / finalize / feedback, **Authz druga sesja**, na końcu **Dokończ HITL** (pełny `post_ideas_then_content`)
- **Zaproszenia** — `invitations-pipeline.postman-collection.json`: login admina → create → **token z maila** → accept (konto `user` zostaje w bazie)

Katalog ręcznego Send (bez asercji Collection Runnera) jest w `apps/api/content-chain.postman-collection.json` — te same endpointy review/feedback do kliknięcia na dowolnym `runId`.

To **nie** jest suite `pnpm test:e2e` (Jest + fake LLM). Social/Content/Review wołają **żywy** lokalny gateway (Review — tylko po to, żeby mieć `completed` / `awaiting_hitl`). JSON w tym katalogu nie wchodzi do Jest (`jest-e2e.json` łapie wyłącznie `.e2e-spec.ts$`).

Kontrakt sesji, bootstrap i 401/403 auth są w **`auth.postman-collection.json`**. Kolekcje pipeline Social/Content/Review **nie** tworzą konta — tylko `POST /auth/login`. Pipeline zaproszeń tworzy **jedno** konto `user` przez accept-invite (Twój `inviteEmail`). Folder Authz w Review **loguje** to konto (`userEmail` / `userPassword`), ale nie startuje jego runu.

## Wymagania

1. Skopiować `apps/api/.env.example` → `apps/api/.env` oraz analogicznie env gateway (`apps/ai-provider-gateway/.env.example`). Uzupełnić sekrety lokalnie — **nie** wklejać ich do kolekcji.
2. Migracje Prisma api (SQLite), w tym tabela `Feedback` i kolumny przeglądu na `Run` (`userRating`, `outputEdited`, `reviewFinalizedAt`).
3. **Istniejący admin w bazie.** Zmienne `adminEmail` / `adminPassword` w kolekcjach Social, Content i Review są te same co w `auth.postman-collection.json`. Pipeline nie woła `bootstrap-admin`. Pusta baza → login **401**; jednorazowo odpal Bootstrap w kolekcji auth (albo ręczny `POST /auth/bootstrap-admin`).
4. Uruchomić procesy (kolejność: najpierw gateway, potem api):

```bash
pnpm dev:gateway
pnpm dev:api
```

Api nasłuchuje na `http://localhost:3001` (prefix HTTP: `/api/v1`). Gateway musi odpowiadać — to dowód pośredni ops, nie CI PR.

PUT/PATCH `/company-context` i start runów wymagają sesji **admina** (`cc_access` / `cc_refresh`, httpOnly). Cookie jar w Postmanie jest **włączony domyślnie** (Collection Runner i Newman też go trzymają w ramach jednego runu). Pod **Send** → **Cookies** po loginie ma być `localhost` z `cc_access` i `cc_refresh`. W Settings requestu **nie** zaznaczaj **Disable cookie jar**. Interceptor / sync z przeglądarki nie jest potrzebny.

## Import i odpalenie (Postman GUI)

1. Import → plik kolekcji (`social-pipeline.postman-collection.json`, `content-pipeline.postman-collection.json`, `review.postman-collection.json` albo `invitations-pipeline.postman-collection.json`).
2. Collection Runner:
   - Social: foldery w kolejności **Setup → A → B → C → D**.
   - Content: foldery w kolejności **Setup → A → B**.
   - Review: foldery w kolejności **Setup → Fixtures → Review → Feedback → Lista autora → Authz druga sesja → Dokończ HITL**.
   - Zaproszenia: najpierw **Setup → A. Create**, potem wklej `inviteToken` z maila, potem **B. Accept** (nie jeden ciągły run).
3. Zmienna `baseUrl` (domyślnie `http://localhost:3001/api/v1`) — zmień tylko gdy api nie stoi na 3001. `adminEmail` / `adminPassword` zmieniaj tylko gdy lokalny admin ma inne dane niż w kolekcji auth. Folder **Authz druga sesja** w Review wymaga `userEmail` / `userPassword` istniejącego konta `user` (to z pipeline zaproszeń). Nie commituj prawdziwego adresu.

Pętla `GET /runs/:runId` jest w skryptach testów (do ~6 min na poll). SSE nie jest częścią DoD Milestone 4 / 4.2.

Nie sklejaj Social/Content z Review w jednym runnerze: Review sam startuje potrzebne runy i nie sprawdza wyniku grafu.

## Newman (opcjonalnie)

Runner nie jest spięty w SPEC — GUI Postmana albo Newman są równoważne. Newman trzyma cookie jar w ramach jednego `run`.

```bash
npx --yes newman run apps/api/test/postman/social-pipeline.postman-collection.json
npx --yes newman run apps/api/test/postman/content-pipeline.postman-collection.json
npx --yes newman run apps/api/test/postman/review.postman-collection.json
```

Newman **nie** pauzuje na mail — folder B zaproszeń wymaga `inviteToken` ustawionego wcześniej. Do smoke na prawdziwą skrzynkę użyj GUI (dwa runy).

## Review + feedback (`review.postman-collection.json`)

Cel: żywy HTTP Fazy 6 — przegląd runu (`SPEC-RUNY.md` R-10) i zapis opinii (`SPEC-FEEDBACK.md`), nie graf Social/Content.

**Z bazy przed startem:** istniejący admin + migracje. **Nie** wymaga gotowych runów ani wierszy `Feedback` — Fixtures tworzą trzy nowe runy autora sesji. Stare runy z poprzednich odpalen nie przeszkadzają.

1. **Setup** — login admina, `GET /auth/me` (zapis `userId` / syntetyczny `otherUserId` pod R8/R9), PUT kontekstu Acme, completeness `true`. Bez PATCH nieznanego `extras` (to D-20 w Social/Content).
2. **Fixtures** — dwa `post_ideas` aż `completed` (`completedRunId`, `ratedCompletedRunId`) oraz `post_ideas_then_content` aż `awaiting_hitl` (`inProgressRunId`, zapis `hitlIdeaId`). Status nieterminalny zostaje stabilny pod R6/R7c/E7/E8; wznowienie HITL jest w ostatnim folderze.
3. **Review** — ocena 4 → `null` → flaga edycji → snapshot pól przeglądu → finalize bez gwiazdek oraz z oceną 5 → `409 REVIEW_LOCKED` na rating / `output-edited` / ponownym finalize → `409 RUN_NOT_REVIEWABLE` na rating / edycji / finalize przy `awaiting_hitl`.
4. **Feedback** — `201` na zfinalizowanym runie, drugi wpis = nowy `fbk_…` (Fbk-2), `404 RUN_NOT_FOUND`, `409` na runie w toku, `application` / `agent`, `400` na nieznany `agentKey` i zły format `runId`.
5. **Lista autora** — `GET /runs/user/:userId` (200) i cudze id (403).
6. **Authz druga sesja** — `POST /auth/logout` admina → rating bez sesji **401**; login `user`; cudzy `completed` → 403 na rating / edycji / finalize / feedback (nie `REVIEW_LOCKED`, nie 404); cudzy `awaiting_hitl` → feedback 403 (Fbk-3a), ocena 409 (R-10); brak runu → 404; lista admina 403; własna lista pusta; `rating: 6` → 400.
7. **Dokończ HITL** — ponowny login admina → `POST .../hitl` 1 id z `hitlIdeaId` → poll `completed` (`result.content === null`, `contents.length === 1`, przegląd otwarty).

Cudzy `startedBy` jest w folderze Authz (wymaga `userEmail` / `userPassword`). Status `failed` nadal poza runnerem (fixture’y Review failują test przy `failed`). Unit: `assertRunReviewable` / `CreateFeedbackUseCase`.

## Zaproszenia (`invitations-pipeline.postman-collection.json`)

Cel: prawdziwy SMTP + Twój adres, nie log api i nie cookies.

1. Api z `NODE_ENV=production` i prawdziwymi `SMTP_*` / `MAIL_FROM`. `APP_PUBLIC_URL` może zostać `http://localhost:3000` (tylko link w mailu; token i tak jest w treści). Przy `development` create wraca 201, ale mail **nie** wychodzi.
2. Istniejący admin (te same `adminEmail` / `adminPassword` co w kolekcji auth).
3. W zmiennych kolekcji ustaw **`inviteEmail` na swój adres** (placeholder `your.email@example.com` jest odrzucany przez test create). Nie commituj prawdziwego adresu.
4. Collection Runner: **Setup → A. Create**.
5. Odbierz mail (`You are invited…`, linia `Token: …`) → wklej wartość do `inviteToken`.
6. Collection Runner: **B. Accept** (słabe hasło 400 → accept 201 bez cookies → reuse 401 → login `user` → 403 na invitations/users).

Konto `user` **zostaje** w bazie. Ten sam `inviteEmail` przy kolejnym A da **409** (pending albo istniejący User, także po soft-delete).

`pm.cookies.jar().clear` w B wymaga domeny `localhost` na allowliście w oknie Cookies Postmana (jak kolekcja auth).

## Co robi Setup

W **Social i Content** Setup jest ten sam:

1. `POST /auth/login` — body `adminEmail` / `adminPassword`. **200** + Set-Cookie; **401** gdy admin nie istnieje albo hasło się nie zgadza. Nie bootstrap, nie invite.
2. `PUT /company-context` — body jak żywy fixture Acme (bogatszy niż `completeContextBody` w e2e Jest). `extras` ma **znany** kształt (`hashtags`, `performanceNotes`) — **bez** nieznanych kluczy (Zod `.strict()`). PUT jest idempotentnym upsertem singletona; ponowne odpalenie **nie** wymaga wipe tabeli kontekstu. Completeness **ignoruje** extras (D-20). Wymaga roli **admin**.
3. `GET /company-context/completeness` — asercja `complete === true` i puste `missing`.
4. `PATCH extras` z nieznanym kluczem → **400** `VALIDATION_FAILED`; `details[].path` to string ze ścieżką Zod (separator `'.'`, bez `/`). Zapisany kontekst zostaje.

**Review** powtarza kroki 1–3 i dokłada `GET /auth/me` (brak kroku 4 — D-20 zostaje w Social/Content).

**Zakaz** zastępowania Setupu seedem Prisma / SQL. Bramka startu runu (`CONTEXT_INCOMPLETE`) i graf (`load-context`) mają zobaczyć ten sam kontrakt HTTP co UI.

## Ścieżki

| Kolekcja | Folder | Przebieg |
|----------|--------|----------|
| Social | **A. post_ideas** | `POST /runs` (`taskType: post_ideas`) → poll aż `completed` → `GET .../logs` (`conversationId`, `requestId` na hopie, brak sekretu gateway w body) |
| Social | **B. post_ideas_then_content** | `POST /runs` → poll aż `awaiting_hitl` → `result.ideas[0].id` → negatywy HITL (puste / duplikat / obcy → 400 `HITL_INVALID_SELECTION`, status zostaje `awaiting_hitl`) → `POST .../hitl` **1** legalne id → poll aż `completed`: `result.content === null`, `result.contents.length === 1`, `sourceIdeaId`, `characterCount === body.length` (D-5 / D-21 / D-22) |
| Social | **C. reel_ideas** | `POST /runs` (`reel_ideas`) → poll `completed` → `result.reelIdeas[0].id` + logi |
| Social | **D. reel_ideas_then_scripts** | poll `awaiting_hitl` (`options` / `reelIdeas`) → te same negatywy HITL → HITL 1 id → `result.reelScript === null`, `result.reelScripts.length === 1`, `sourceIdeaId` (D-16 / D-21) |
| Content | **A. page_copy** | `POST /runs` bez `platform`, z `contentKind: "blog"`, `brief` bez `ideaCount` → poll `completed` → `result.pageDocument.body` + logi |
| Content | **B. page_outline_then_copy** | poll `awaiting_hitl` → `ideaId` z `hitl.options[0].id` albo `result.pageOutline.id` → HITL `[outline.id]` → poll `completed` + `pageDocument`. Gdy sekcja ma `role`, musi być z zamkniętego enumu (D-18 / D-22) |
| Review | **Fixtures** | dwa `post_ideas` → `completed`; `post_ideas_then_content` → `awaiting_hitl` (zapis `hitlIdeaId`) |
| Review | **Review** | R1–R6 (+ R4b/R4c, R5b/R5c, R6b/R6c): rating, `output-edited`, snapshot, finalize, `REVIEW_LOCKED`, `RUN_NOT_REVIEWABLE` |
| Review | **Feedback** | R7–R7g: `POST /feedback` na run (także po finalize + append), 404, 409 w toku, `application` / `agent`, 400 |
| Review | **Lista autora** | R8/R9: `GET /runs/user/:userId` — sesja 200, cudze id 403 |
| Review | **Authz druga sesja** | E0 logout admina; E0b rating bez sesji → 401; E1–E13: login `user`; 403 na cudzy `completed`; feedback na cudzy HITL → 403; ocena na cudzy HITL → 409; 404; pusta lista usera; `rating: 6` → 400 |
| Review | **Dokończ HITL** | login admina → `POST .../hitl` 1 id → poll `completed` (`content` null, `contents[0]`) |
| Zaproszenia | **A. Create** | `POST /invitations` (nieznany klucz → 400) → 201 bez tokenu w JSON → drugi POST ten sam email → 409 → `GET /invitations` |
| Zaproszenia | **B. Accept** | token z maila → słabe hasło 400 → accept 201 bez cookies → reuse 401 → login `user` → 403 na `/invitations` i `/users` |

Kolekcje **nie** zawierają placeholderów `GATEWAY` ani wywołań gateway — klient woła wyłącznie api.

## Kontrakt MVP (Faza 4.3 / D-20…D-22)

Pokrycie warstwą adekwatną: **Jest e2e** (`company-context`, `social-pipeline`, `content-pipeline`) + asercje / requesty w tych kolekcjach.

| ID | Co sprawdza | Gdzie |
|----|-------------|--------|
| **D-20** | Znany `extras` round-trip; nieznany klucz → 400 `VALIDATION_FAILED`; `details[].path` z `parseWithZod` (separator `'.'`); completeness ignoruje extras | Jest `company-context.e2e-spec.ts`; Postman Setup (login + PUT znanego kształtu + PATCH unknown) |
| **D-21** | HITL Social: 0 id / duplikat / obcy → 400 `HITL_INVALID_SELECTION` (status `awaiting_hitl`). **1** legalne id → tablica długości 1. **2** legalne id → 2 artefakty (`contents[]` / `reelScripts[]` + `sourceIdeaId`). **Nie** ma case’u „dwa różne legalne id → 400” | Jest: 1 id w D-5/D-16, 2 id + negatywy w D-21. Postman B/D: negatywy + happy path **1** id (tablice, nie skalar). **2 z N** = Jest (żywy gateway nie dubluje hopów writer w Collection Runnerze) |
| **D-22** | `characterCount === body.length` na każdej pozycji `contents[]`; outline z `role` enum przechodzi; nieznany `role` → fail parse (unit schema) | Jest Social (characterCount na 1 i 2 pozycjach) + Content e2e z `role`; Postman B `characterCount`; Content B — `role` opcjonalne, gdy obecne ∈ enum |

Skalar `result.content` / `result.reelScript` na dwuetapowych (`post_ideas_then_content` / `reel_ideas_then_scripts`) po fazie 2 jest **`null`** — źródłem prawdy są tablice.

## Kontrakt MVP (Faza 6 / R-10 / Fbk)

Żywy HTTP: **`review.postman-collection.json`**. Unit: `assert-run-reviewable.spec.ts`, use-case’y rating / output-edited / finalize, `create-feedback.use-case.spec.ts`. **Brak** `*.e2e-spec.ts` na te ścieżki.

| ID | Co sprawdza | Gdzie |
|----|-------------|--------|
| **R-10** | Ocena 1–5 i `null`; flaga `outputEdited`; finalize (także przy `userRating: null`); lock po `reviewFinalizedAt`; `409 RUN_NOT_REVIEWABLE` poza `completed` \| `failed`; cudzy `completed` → 403 | Postman Review R1–R6c + Authz E3–E5 / E8 / E13; snapshot zawsze z `userRating` / `outputEdited` / `reviewFinalizedAt` |
| **Fbk-1 / Fbk-4** | `POST /feedback` `application` i `agent` (whitelist `agentKey`); nieznany klucz → 400 | Postman R7d–R7f |
| **Fbk-2** | Drugi wpis tego samego autora na ten sam target → nowy wiersz | Postman R7a |
| **Fbk-3 / Fbk-3a** | Własny `completed` (także po finalize) → 201; brak runu → 404; zły format `runId` → 400; run w toku → 409 `RUN_NOT_REVIEWABLE`; cudzy `completed` → 403 (nie 404); cudzy w toku → 403 (nie 409) | Postman R7 / R7b / R7c / R7g + E6 / E7 / E10 |
| **R-3c** | `GET /runs/user/:userId` tylko dla sesji | Postman R8 / R9 + E11 / E12 |

## Poza zakresem tych kolekcji

- `post_content` solo
- `reel_script` solo (Jest e2e, nie Postman)
- SSE (`GET .../events`)
- Pełna suite auth (bootstrap, refresh, logout, invite+accept w jednym runnerze z soft-delete) — `auth.postman-collection.json`
- Resend / revoke zaproszenia (osobne foldery, nie v1 tego pipeline)
- Suite CI PR
- Pełny happy path **2 id → 2 hopów LLM** na żywym gateway (Jest + fake LLM)
- Mega-runner Social + Content + Review (review nie zależy od `taskType`; graf zostaje w Social/Content)
- Review na statusie `failed` (fixture’y Review failują test przy `failed`)
