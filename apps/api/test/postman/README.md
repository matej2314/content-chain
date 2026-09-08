# Kolekcje Postman — pipeline Social, Content i zaproszenia

Powtarzalny happy path **bez UI**:

- **Social** — Setup (login admina → kontekst przez HTTP), potem posty (`post_ideas`, `post_ideas_then_content`) i rolki (`reel_ideas`, `reel_ideas_then_scripts`)
- **Content** — to samo Setup, potem `page_copy` i `page_outline_then_copy`
- **Zaproszenia** — `invitations-pipeline.postman-collection.json`: login admina → create → **token z maila** → accept (konto `user` zostaje w bazie)

To **nie** jest suite `pnpm test:e2e` (Jest + fake LLM). Social/Content wołają **żywy** lokalny gateway. JSON w tym katalogu nie wchodzi do Jest (`jest-e2e.json` łapie wyłącznie `.e2e-spec.ts$`).

Kontrakt sesji, bootstrap i 401/403 auth są w **`auth.postman-collection.json`**. Kolekcje pipeline Social/Content **nie** tworzą konta — tylko `POST /auth/login`. Pipeline zaproszeń tworzy **jedno** konto `user` przez accept-invite (Twój `inviteEmail`).

## Wymagania

1. Skopiować `apps/api/.env.example` → `apps/api/.env` oraz analogicznie env gateway (`apps/ai-provider-gateway/.env.example`). Uzupełnić sekrety lokalnie — **nie** wklejać ich do kolekcji.
2. Migracje Prisma api (SQLite).
3. **Istniejący admin w bazie.** Zmienne `adminEmail` / `adminPassword` w kolekcjach Social i Content są te same co w `auth.postman-collection.json`. Pipeline nie woła `bootstrap-admin`. Pusta baza → login **401**; jednorazowo odpal Bootstrap w kolekcji auth (albo ręczny `POST /auth/bootstrap-admin`).
4. Uruchomić procesy (kolejność: najpierw gateway, potem api):

```bash
pnpm dev:gateway
pnpm dev:api
```

Api nasłuchuje na `http://localhost:3001` (prefix HTTP: `/api/v1`). Gateway musi odpowiadać — to dowód pośredni ops, nie CI PR.

PUT/PATCH `/company-context` i start runów wymagają sesji **admina** (`cc_access` / `cc_refresh`, httpOnly). Cookie jar w Postmanie jest **włączony domyślnie** (Collection Runner i Newman też go trzymają w ramach jednego runu). Pod **Send** → **Cookies** po loginie ma być `localhost` z `cc_access` i `cc_refresh`. W Settings requestu **nie** zaznaczaj **Disable cookie jar**. Interceptor / sync z przeglądarki nie jest potrzebny.

## Import i odpalenie (Postman GUI)

1. Import → plik kolekcji (`social-pipeline.postman-collection.json`, `content-pipeline.postman-collection.json` albo `invitations-pipeline.postman-collection.json`).
2. Collection Runner:
   - Social: foldery w kolejności **Setup → A → B → C → D**.
   - Content: foldery w kolejności **Setup → A → B**.
   - Zaproszenia: najpierw **Setup → A. Create**, potem wklej `inviteToken` z maila, potem **B. Accept** (nie jeden ciągły run).
3. Zmienna `baseUrl` (domyślnie `http://localhost:3001/api/v1`) — zmień tylko gdy api nie stoi na 3001. `adminEmail` / `adminPassword` zmieniaj tylko gdy lokalny admin ma inne dane niż w kolekcji auth.

Pętla `GET /runs/:runId` jest w skryptach testów (do ~6 min na poll). SSE nie jest częścią DoD Milestone 4 / 4.2.

## Newman (opcjonalnie)

Runner nie jest spięty w SPEC — GUI Postmana albo Newman są równoważne. Newman trzyma cookie jar w ramach jednego `run`.

```bash
npx --yes newman run apps/api/test/postman/social-pipeline.postman-collection.json
npx --yes newman run apps/api/test/postman/content-pipeline.postman-collection.json
```

Newman **nie** pauzuje na mail — folder B zaproszeń wymaga `inviteToken` ustawionego wcześniej. Do smoke na prawdziwą skrzynkę użyj GUI (dwa runy).

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

W **obu** kolekcjach Setup jest ten sam:

1. `POST /auth/login` — body `adminEmail` / `adminPassword`. **200** + Set-Cookie; **401** gdy admin nie istnieje albo hasło się nie zgadza. Nie bootstrap, nie invite.
2. `PUT /company-context` — body jak żywy fixture Acme (bogatszy niż `completeContextBody` w e2e Jest). `extras` ma **znany** kształt (`hashtags`, `performanceNotes`) — **bez** nieznanych kluczy (Zod `.strict()`). PUT jest idempotentnym upsertem singletona; ponowne odpalenie **nie** wymaga wipe tabeli kontekstu. Completeness **ignoruje** extras (D-20). Wymaga roli **admin**.
3. `GET /company-context/completeness` — asercja `complete === true` i puste `missing`.
4. `PATCH extras` z nieznanym kluczem → **400** `VALIDATION_FAILED`; `details[].path` to string ze ścieżką Zod (separator `'.'`, bez `/`). Zapisany kontekst zostaje.

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

## Poza zakresem tych kolekcji

- `post_content` solo
- `reel_script` solo (Jest e2e, nie Postman)
- SSE (`GET .../events`)
- Pełna suite auth (bootstrap, refresh, logout, invite+accept w jednym runnerze z soft-delete) — `auth.postman-collection.json`
- Resend / revoke zaproszenia (osobne foldery, nie v1 tego pipeline)
- Suite CI PR
- Pełny happy path **2 id → 2 hopów LLM** na żywym gateway (Jest + fake LLM)
