# Dokumentacja komunikacji — Content Chain

Normatywny kontrakt I/O **MVP**. Dwie powierzchnie:

1. **HTTP API `apps/api`** — konsumenci: `apps/frontend`, Postman  
2. **Klient `apps/api` → `apps/ai-provider-gateway`** — Content Chain korzysta z gateway’a jak z narzędzia; kontrakt = upstream `ai-provider-gateway`

**Poza zakresem MVP:** webhooki publiczne, broker eventów, CLI użytkownika, fasady OpenAI/Anthropic gateway’a jako domyślna ścieżka z Content Chain, osobne publiczne API gateway dla trzecich klientów.

Zmiana względem wcześniejszej wersji tego dokumentu (korelacja): **`ConversationId` jest jeden na run agentowy** (główna oś kroków LLM). **`RequestId`** zawsze z **odpowiedzi** (`apps/api` dla HTTP, gateway dla LLM) — klienci nie generują go z góry. Formaty jak w gateway — patrz `brand_types.md` / `dictionary.md`.

Zmiana względem wcześniejszego grafu statusów: dopisano `interrupted` (recovery po crashu procesu). `POST /runs` nadal zwraca wyłącznie `queued` \| `running`. Filtr `GET /runs?status=` i SSE `run.status` obejmują pełny zbiór `RunStatus` ze słownika.

Zmiana względem kontraktu startu (tylko 3 taski post_*, `platform` zawsze wymagane, `result: { ideas, content }`): unia `taskType` (post_* / reel_* / page_*), `contentKind` przy page_*, snapshot addytywny (`reelIdeas`, `reelScript`, `pageOutline`, `pageDocument`), sentinel `platform: web` w DB dla Content.

Zmiana względem jednego obiektu `brief` („temat, grupa, cel, liczba pomysłów” dla każdego `taskType`): kształt `brief` zależy od kanału — **`SocialBrief`** (post_* / reel_*) vs **`ContentBrief`** (page_*). Dyskryminator zostaje `taskType`. `ideaCount` legalne tylko w Social; `angle` / `targetLength` tylko w Content. Szczegóły: tabele pod `POST /runs`; typy w `dictionary.md`.

Zmiana względem Milestone 4 (HITL post/reel bez walidacji długości; luźne poza-bramką): typowane `extras`; addytywne `cta?` / `characterCount` / `role?` w wyniku.

Zmiana względem kanonu Fazy 4.3 (HITL Social dwuetapowy = dokładnie 1 `selectedIdeaId`; 2+ id → 400): HITL Social dwuetapowy = **min. 1** unikalne id ⊆ `hitl.options`; wynik = **tablica** osobnych artefaktów (`contents[]` / `reelScripts[]` + `sourceIdeaId`); 2+ legalne, gdy wszystkie ∈ options. Content (`page_outline_then_copy`) bez zmiany: nadal `[outline.id]`.

---

## Powierzchnia 1 — HTTP API (`apps/api`)

| Element | Wartość |
|---------|---------|
| Prefiks | `/api/v1` |
| Format | JSON (`application/json`), SSE (`text/event-stream`) |
| Auth | Access JWT w cookie **`cc_access`** + refresh w **`cc_refresh`** (oba **httpOnly**); role `admin` \| `user`. MVP: **bez** `Authorization: Bearer` (FE / Postman = cookie). |
| Korelacja | `requestId` w envelope = ID nadane przez `apps/api` w **odpowiedzi** na to HTTP (klient nie musi go przysyłać). Run agentowy spinany przez `RunId` + `ConversationId`; kroki LLM — `requestId` z odpowiedzi gateway |
| DX OpenAPI (api) | Swagger UI **`GET /docs`** — poza `/api/v1`; **nie** pod `/api` (kolizja z prefiksem produktowym). Port lokalny api: **3001** (`deployment.md`). |

### Envelope błędu

```json
{
  "code": "CONTEXT_INCOMPLETE",
  "message": "Company context gate is not satisfied",
  "requestId": "req_123e4567-e89b-12d3-a456-426614174000",
  "details": [{ "section": "offer" }]
}
```

`requestId` w envelope dotyczy **tego** żądania HTTP do `apps/api` (nie „wszystkich” wywołań LLM w runie).

Gdy `code` = `VALIDATION_FAILED` pochodzi z application Zod (`parseWithZod` w `apps/api/src/shared/`), elementy `details` mają `path` = ścieżkę Zod (`issue.path`) z separatorem `'.'` (spójnie Runs i company-context `extras`). Tabela kodów HTTP bez zmian.

Wybrane kody domenowe:

| `code` | Typowe HTTP | Znaczenie |
|--------|-------------|-----------|
| `UNAUTHORIZED` | 401 | Brak / nieważna sesja |
| `FORBIDDEN` | 403 | Brak uprawnień (np. user edytuje kontekst) |
| `VALIDATION_FAILED` | 400 | Błąd walidacji DTO |
| `CONTEXT_INCOMPLETE` | 409 | Bramka kontekstu — start runu zablokowany |
| `HITL_REQUIRED` | 409 | Operacja wymaga stanu oczekiwania na wybór / odwrotnie |
| `HITL_INVALID_SELECTION` | 400 | Selekcja HITL niezgodna z kanonem: Content — `selectedIdeaIds` ≠ `[outline.id]`; Social dwuetapowy — długość `< 1`, duplikaty, albo id spoza draftu / `hitl.options` (**2+ legalne**, gdy wszystkie ∈ options) |
| `RUN_NOT_FOUND` | 404 | Nieznany `runId` |
| `REVIEW_LOCKED` | 409 | Przegląd runu zatwierdzony — zmiana oceny / flagi edycji zabroniona |
| `RUN_NOT_REVIEWABLE` | 409 | Ocena / edycja / finalize gdy status inny niż `completed` \| `failed` |
| `CONFLICT` | 409 | Niedozwolone przejście statusu runu |
| `INTERNAL_ERROR` | 500 | Błąd nieobsłużony |

`UNKNOWN_TASK_TYPE` nie jest kodem HTTP startu: `taskType` spoza enumu → **400** `VALIDATION_FAILED`. Composite executor używa `UNKNOWN_TASK_TYPE` wyłącznie przy wewnętrznym `execute` z typem poza unią (status `failed`, nie cichy no-op).

### Kanały odczytu vs live

| Kanał | Zastosowanie |
|-------|--------------|
| **SSE** `GET /api/v1/runs/:runId/events` | Live: status, logi przyrostowe, HITL, completed/failed; po terminalu serwer **kończy** strumień |
| **GET** logów | Snapshot / historia logów runu (nie zastępuje SSE dla statusu) |
| **GET** `/api/v1/health` | Liveness „zdrowotny” `apps/api` |
| **GET** `/metrics` | Metryki Prometheus procesu `apps/api` (ops — nie mylić z logami runu) |
| **GET** `/docs` | Swagger UI / OpenAPI DX powierzchni `apps/api` (nie część kontraktu produktowego FE) |

Status runu **na żywo** nie jest osobnym pollingiem GET — tylko SSE (oraz wynik końcowy w zasobach runu po zakończeniu / przy HITL).

### Auth

#### `GET /api/v1/auth/bootstrap-status`

Publiczny (bez sesji) sygnał pod ekran first-run self-host.

**200** — `{ "available": boolean }` — `true`, gdy w DB **nie ma** jeszcze użytkownika `admin` (wolno wywołać bootstrap); `false` po utworzeniu admina.

#### `POST /api/v1/auth/bootstrap-admin`

Jednorazowy bootstrap **pierwszego i jedynego** admina self-host. Działa tylko, gdy w DB nie ma admina — norma: `security.md`. Po sukcesie api ustawia sesję cookie jak przy loginie (ekran first-run w UI).

| Pole | Typ | Wymagane |
|------|-----|----------|
| `email` | string | tak |
| `password` | string | tak (polityka bcrypt — `security.md`) |

**201** — `{ "user": { "id", "email", "role" } }` (+ Set-Cookie **`cc_access`** / **`cc_refresh`**). Kolejne wywołania: `CONFLICT` / `FORBIDDEN`.

#### `POST /api/v1/auth/login`

| Pole | Typ | Wymagane |
|------|-----|----------|
| `email` | string | tak |
| `password` | string | tak |

**200** — `{ "expiresIn", "user": { "id", "email", "role" } }` + Set-Cookie **`cc_access`** (JWT, httpOnly) oraz **`cc_refresh`** (httpOnly). Body **bez** `accessToken` / `refreshToken`.

Zmiana względem wcześniejszego zapisu „`accessToken` w body + tylko refresh w cookie”: oba tokeny wyłącznie w httpOnly cookie; klienci nie używają Bearer w MVP.

Konto nieaktywne (soft-delete) → **401** / **403** (login odrzucony).

#### `POST /api/v1/auth/refresh`

Odświeżenie sesji na podstawie cookie `cc_refresh`: rotacja refresh + nowe `cc_access` (httpOnly). Body bez tokenów (ew. `expiresIn` — opcjonalnie). **Kanoniczny odczyt tożsamości po reloadzie UI** to `GET /auth/me`, nie refresh.

#### `POST /api/v1/auth/logout`

Unieważnia refresh w DB / czyści cookie **`cc_access`** i **`cc_refresh`**.

#### `GET /api/v1/auth/me`

Probe bieżącej sesji na podstawie cookie **`cc_access`** (ta sama sesja co pozostałe chronione trasy).

**200** — `{ "id", "email", "role" }` (wyłącznie te pola).  
**401** `UNAUTHORIZED` — brak / nieważna sesja access.

**Flow FE (norma produktowa):** po starcie aplikacji → `GET /auth/me`; przy `401` → `POST /auth/refresh`; potem ponownie `GET /auth/me`; przy kolejnym `401` → ekran logowania (albo first-run, gdy `bootstrap-status.available === true`).

#### Users (admin)

| Metoda | Ścieżka | Opis |
|--------|---------|------|
| `GET` | `/api/v1/users` | Lista użytkowników (w tym flaga aktywności) |
| `POST` | `/api/v1/users` | Utworzenie **tylko** `role = user` (`email`, `password`); hasło wg `security.md` |
| `PATCH` | `/api/v1/users/:id` | Aktualizacja (np. reaktywacja) — **bez** awansu do `admin`; poza UI MVP (API pod późniejsze V1) |
| `DELETE` | `/api/v1/users/:id` | **Soft-delete / dezaktywacja** (konto pozostaje; login zablokowany); **nie** twarde usunięcie wiersza |

Zmiana względem wcześniejszego zapisu „`role` dowolna”: w MVP jest **co najwyżej jeden** `admin` (bootstrap). Tworzenie / ustawienie kolejnego `admin` → **403** / **400**. Norma: `security.md`.

Zmiana względem „DELETE = dezaktywacja / usunięcie wg polityki”: w MVP DELETE = wyłącznie soft-delete / dezaktywacja.

**UI MVP (dashboard):** admin tylko **listuje** i **tworzy** użytkowników — bez edycji / dezaktywacji w UI (endpointy PATCH/DELETE zostają w api pod płynne V1).
### Company context
Bramka kompletności: sekcje z dokumentacji koncepcyjnej (tożsamość, oferta, głos SM, CTA/kanały, odbiorca). Opcjonalnie **`extras`** (`CompanyContextExtras`) — poza bramką.

#### `GET /api/v1/company-context`

**200** — aktualny kontekst (w tym `extras`: obiekt albo `null`) + flaga / obiekt `completeness` (które sekcje **bramki** spełnione). `extras` nie wpływa na `complete`.

#### `PUT` lub `PATCH /api/v1/company-context` — tylko `admin`

Zapis sekcji bramki + opcjonalne `extras`. **403** dla `user`.

| Pole `extras` | Typ | Wymagane | Opis |
|---------------|-----|----------|------|
| `caseStudies` | `{ title: string; summary: string; metrics?: string[] }[]` | nie | Case studies |
| `objections` | `{ label: string; response: string }[]` | nie | Obiekcje i odpowiedzi |
| `hashtags` | `string[]` | nie | Zestawy hashtagów |
| `catalogNotes` | `string` | nie | Skrót katalogu (nie zastępuje `offer.items`) |
| `performanceNotes` | `string` | nie | Luźne notatki performance |

Walidacja: Zod `.strict()` na obiekcie `extras` — nieznane klucze → **400** `VALIDATION_FAILED`. Brak `extras` / `null` = OK (omit preferowane względem pustych tablic). Jakość merytoryczna po stronie admina; programowo tylko kształt.

#### `GET /api/v1/company-context/completeness`

**200** — `{ "complete": boolean, "missing": string[] }` — wygodne dla UI bramki (`missing` wyłącznie sekcje bramki; bez kluczy `extras`).

### Runs (Social i Content)

Typy tasków MVP:

| `taskType` | Kanał | Zachowanie |
|------------|-------|------------|
| `post_ideas` | Social | full-auto → `result.ideas` |
| `post_content` | Social | full-auto → `result.content` |
| `post_ideas_then_content` | Social | ideas → HITL → `result.contents[]` (osobny post per wybrane id) |
| `reel_ideas` | Social | full-auto → `result.reelIdeas` |
| `reel_script` | Social | full-auto → `result.reelScript` |
| `reel_ideas_then_scripts` | Social | reel ideas → HITL → `result.reelScripts[]` (osobny scenariusz per wybrane id) |
| `page_copy` | Content | full-auto → `result.pageDocument` |
| `page_outline_then_copy` | Content | outline → HITL → dokument |

Platformy Social: `linkedin` \| `facebook` \| `instagram`. Język: `pl` \| `en`.  
`ContentKind`: `blog` \| `service_page` \| `landing`.

Unia `POST /runs` (application Zod + DTO):

- `taskType` ∈ post_* \| reel_* → `platform` **wymagane** (`SocialPlatform`); `contentKind` **zakazane**;
- `taskType` ∈ page_* → `contentKind` **wymagane**; `platform` **zakazane** (nie wysyłać). DB: `Run.platform` = sentinel `'web'` (nie jest wartością `SocialPlatform`). Filtr listy `platform=web` jest legalny jako wartość kolumny.

Zakres listy: **runy całej instancji** (jedna firma) — nie tylko runy bieżącego użytkownika. Każdy run ma inicjatora (`startedBy`) oraz status.

#### `GET /api/v1/runs`

Lista runów pod dashboard (widok tabeli → klik → szczegóły).

| Query | Typ | Wymagane | Opis |
|-------|-----|----------|------|
| `page` | number | nie (default **1**) | Numer strony (1-based) |
| `status` | enum statusu runu | nie | Filtr statusu (`RunStatus`, w tym `interrupted`) |
| `taskType` | enum tasku | nie | Filtr typu tasku |
| `platform` | `SocialPlatform` **lub** `web` | nie | Filtr kolumny platformy (w tym sentinel `web` dla page_*) |
| `userId` | string (id użytkownika) | nie | Filtr: kto uruchomił run |

**Paginacja MVP:** stały rozmiar strony **10** (klient **nie** nadpisuje `limit`). Sortowanie: **`createdAt` malejąco** (najnowsze pierwsze).

**200** — kształt:

```json
{
  "items": [
    {
      "runId": "run_…",
      "taskType": "post_ideas",
      "platform": "linkedin",
      "contentKind": null,
      "language": "pl",
      "status": "completed",
      "createdAt": "2026-08-12T10:00:00.000Z",
      "startedBy": { "id": "…", "email": "user@example.com" }
    }
  ],
  "page": 1,
  "pageSize": 10,
  "total": 42
}
```

- `startedBy.email` — identyfikator wyświetlany w MVP jako „nazwa użytkownika” (brak osobnego display name w MVP).
- Przy starcie ze sesją `startedBy` jest zawsze ustawiony. W erze przed domknięciem auth (np. Postman bez sesji) pole może być `null` — po auth na api start bez sesji jest odrzucany, więc nowe runy zawsze mają inicjatora.

#### `POST /api/v1/runs`

Start async runu. Wymaga kompletnego kontekstu — inaczej **409** `CONTEXT_INCOMPLETE`.  
Przy chronionej sesji zapisuje **inicjatora** (`startedBy` = bieżący użytkownik).

| Pole | Typ | Wymagane | Opis |
|------|-----|----------|------|
| `taskType` | enum (tabela wyżej) | tak | dyskryminator unii |
| `platform` | `SocialPlatform` | tak przy post_* / reel_*; **zakazane** przy page_* | |
| `contentKind` | `ContentKind` | tak przy page_*; **zakazane** przy Social | |
| `language` | enum | tak | |
| `brief` | object | tak | kształt **zależny od `taskType`** (tabele niżej); nie jeden uniwersalny obiekt SM |
| `selectedIdeaIds` | string[] | nie | `post_content` / start z wyborem SM; **zakazane** przy `page_*` (selekcja outline tylko `POST .../hitl`) |

`brief` — **Social** (`taskType` ∈ post_* \| reel_*), `SocialBrief`:

| Pole | Typ | Wymagane | Opis |
|------|-----|----------|------|
| `topic` | string | tak | temat |
| `audience` | string | nie | grupa docelowa |
| `goal` | string | nie | cel |
| `ideaCount` | integer ≥ 1 | nie | liczba pomysłów (ideation / reel ideas) |

Klucze `angle`, `targetLength`, `contentKind` na tym obiekcie → **400** `VALIDATION_FAILED` (`.strict()`).

Przykład Social:

```json
{
  "taskType": "post_ideas",
  "platform": "linkedin",
  "language": "pl",
  "brief": { "topic": "Q3 launch", "audience": "founderzy", "goal": "lead", "ideaCount": 5 }
}
```

`brief` — **Content** (`taskType` ∈ page_*), `ContentBrief`:

| Pole | Typ | Wymagane | Opis |
|------|-----|----------|------|
| `topic` | string | tak | temat |
| `audience` | string | nie | odbiorca |
| `goal` | string | nie | cel (np. edukacja / lead / autorytet / sprzedaż — string, bez enumu w shared) |
| `angle` | string | nie | kąt / Challenger |
| `targetLength` | integer ≥ 1 | nie | orientacyjna długość w słowach |

`contentKind` jest **obok** briefu, nie w środku. CTA **nie** jest polem briefu (źródło: `cta.items` kontekstu firmy). Klucz `ideaCount` na tym obiekcie → **400** `VALIDATION_FAILED` (`.strict()`).

Przykład page:

```json
{
  "taskType": "page_copy",
  "contentKind": "blog",
  "language": "pl",
  "brief": { "topic": "Audyt procesów", "angle": "CRM ≠ jeden przepływ od leada", "targetLength": 1800 }
}
```

Page + `platform: linkedin` → **400** `VALIDATION_FAILED`. Page + `selectedIdeaIds` → **400** `VALIDATION_FAILED`. Page + `brief.ideaCount` → **400** `VALIDATION_FAILED`. Post/reel bez `platform` → **400**. Post/reel + `brief.angle` albo `brief.targetLength` → **400** `VALIDATION_FAILED`. `taskType` spoza enumu → **400** `VALIDATION_FAILED`.

**202** — `{ "runId", "conversationId", "status": "queued" \| "running" }`.

`interrupted` **nie** jest statusem startowym — `POST /runs` go nie zwraca.

- `runId` — `RunId` (`run_<uuid>`)
- `conversationId` — `ConversationId` (`conv_<uuid>`), **stały przez cały run agentowy**
- `requestId` tego HTTP — w **odpowiedzi** `apps/api` (klient nie generuje); nie jest ID hopów LLM (`brand_types.md`)

#### `GET /api/v1/runs/:runId`

Snapshot runu (nie zastępuje SSE). UI: wiersz listy → podstrona szczegółów (`ux_dashboard.md`).

**200** — kształt:

```json
{
  "runId": "run_…",
  "conversationId": "conv_…",
  "taskType": "post_ideas",
  "platform": "linkedin",
  "contentKind": null,
  "language": "pl",
  "brief": { "topic": "Q3 launch" },
  "status": "completed",
  "createdAt": "2026-08-12T10:00:00.000Z",
  "startedBy": { "id": "usr_…", "email": "user@example.com" },
  "userRating": null,
  "outputEdited": false,
  "reviewFinalizedAt": null,
  "result": {
    "ideas": [],
    "content": null,
    "contents": [],
    "reelIdeas": [],
    "reelScript": null,
    "reelScripts": [],
    "pageOutline": null,
    "pageDocument": null
  },
  "hitl": null
}
```

- Meta jak pozycja listy + `conversationId`. Snapshot **addytywny**: posty zostawiają `ideas` / `content` (jednoetapowy) oraz `contents[]` (dwuetapowy po fazie 2); rolki — `reelIdeas` / `reelScript` (jednoetapowy) oraz `reelScripts[]` (dwuetapowy po fazie 2); Content — `pageOutline` / `pageDocument`. Brak kanału = pusta tablica / `null` (reader nie null-crashuje).
- `contentKind` — `null` dla Social; ustawione dla `page_*`.
- `platform` — enum SM albo `'web'` (page_*).
- `brief` — zwracany w **kształcie zapisanym** (unia): `SocialBrief` albo `ContentBrief` wg `taskType`. Snapshot nie spłaszcza obu kształtów do jednego obiektu SM.
- `userRating` — **zawsze** w JSON: `null` (brak gwiazdek) albo `1`…`5`. Pozytywna wartość tylko gdy autor faktycznie ocenił.
- `outputEdited` — `true` po użyciu Edytuj (flaga; bez diff w MVP).
- `reviewFinalizedAt` — `null` dopóki autor nie zatwierdzi przeglądu; po finalize ISO8601 i pola oceny/edycji niemutowalne.
- `hitl` — metadane pauzy gdy `awaiting_hitl`; `options` zależne od `taskType` (post ideas / `reelIdeas` / outline); inaczej `null` (w tym przy `interrupted`).

**Pola wyniku (addytywne względem Milestone 4):**

| Ścieżka | Pola | Uwagi |
|---------|------|-------|
| `result.ideas[]` | `id`, `title`, `angle`, `hook`, **`cta?`** | Sugerowane CTA z ideation (gdy model zwróci) |
| `result.content` | `body`, `hashtags`, `cta?`, **`characterCount`** | Skalar **jednoetapowego** `post_content`. `characterCount`: integer ≥ 0; **kanon:** pipeline ustawia po sukcesie writer/refine z `body.length`; jeśli LLM zwróci osobne pole — ignorować / nadpisać. Przy odczycie starego wiersza bez klucza → mapper: `characterCount = body.length`. Na `post_ideas_then_content` po completed fazy 2: **`null`** (nie alias `contents[0]`) |
| `result.contents[]` | kształt `SocialContent` + **`sourceIdeaId`** | Kanon dwuetapowego `post_ideas_then_content` po fazie 2: długość = `selectedIdeaIds.length`; kolejność = kolejność tablicy HITL. `sourceIdeaId` w payloadzie JSON (addytywne). Pusta tablica, gdy brak kanału / przed fazą 2 |
| `result.reelIdeas[]` | jak wcześniej + **`cta?`** | Opcjonalne; spójność z post ideas |
| `result.reelScript` | `segments`, `cta`, `notes?` | Skalar **jednoetapowego** `reel_script`. Na `reel_ideas_then_scripts` po completed fazy 2: **`null`** (nie alias `reelScripts[0]`) |
| `result.reelScripts[]` | kształt `ReelScript` + **`sourceIdeaId`** | Kanon dwuetapowego `reel_ideas_then_scripts` po fazie 2: analogicznie do `contents[]`. Pusta tablica, gdy brak kanału / przed fazą 2 |
| `result.pageOutline.sections[]` | `id`, `heading`, `summary`, **`role?`** | Enum: `audience_world` \| `pain` \| `challenger` \| `insight` \| `proof` \| `objection` \| `cta` \| `other` |

Źródło prawdy po `completed` dwuetapowego Social:

| Task | Kanon | Skalar legacy |
|------|--------|----------------|
| `post_ideas_then_content` | `result.contents[]` — długość = `selectedIdeaIds.length`; każdy element: kształt `SocialContent` + **`sourceIdeaId`** | `result.content` = **`null`** (nie alias pierwszego — jedno źródło prawdy) |
| `reel_ideas_then_scripts` | `result.reelScripts[]` — analogicznie + **`sourceIdeaId`** | `result.reelScript` = **`null`** |
| `post_content` / `reel_script` | bez zmian: skalar `content` / `reelScript` | tablice puste albo nie używane |

Przykład `result` po `completed` `post_ideas_then_content` (użytkownik wybrał 2 z 5 pomysłów):

```json
{
  "ideas": [
    { "id": "idea_a", "title": "…", "angle": "…", "hook": "…", "cta": "…" },
    { "id": "idea_b", "title": "…", "angle": "…", "hook": "…", "cta": "…" }
  ],
  "content": null,
  "contents": [
    { "body": "…", "hashtags": ["#x"], "cta": "…", "characterCount": 120, "sourceIdeaId": "idea_a" },
    { "body": "…", "hashtags": ["#y"], "cta": "…", "characterCount": 98, "sourceIdeaId": "idea_b" }
  ],
  "reelIdeas": [],
  "reelScript": null,
  "reelScripts": [],
  "pageOutline": null,
  "pageDocument": null
}
```

`startedBy` jak na liście (`null` wyłącznie era pre-auth).

Zmiana względem: wynik SM bez `cta` / `characterCount`; sekcje outline bez `role`.

Zmiana względem kanonu Fazy 4.3 (jeden skalar `content` / `reelScript` po HITL 1 id): dwuetapowy Social ma kanon tablicy (`contents[]` / `reelScripts[]` + `sourceIdeaId`); skalar na then_* po fazie 2 = `null`.

#### `GET /api/v1/runs/user/:userId`

Lekka lista **wszystkich** runów, których inicjatorem jest `:userId` (filtr `startedBy`). **Bez** paginacji `pageSize=10` (to wyjątek względem listingu dashboardu — pod select formularza opinii). Sort: `createdAt` desc.

**Authz:** `:userId` **musi** być id zalogowanego użytkownika (sesja). Inny id → **403** `FORBIDDEN`. Brak wyjątku dla `admin` w MVP (panel cudzych runów = V1).

**200** — `{ "items": [ { "runId", "taskType", "platform", "language", "status", "createdAt" } ] }`.

Trasa statyczna `user/:userId` **przed** parametrem `:runId` w routerze Nest.

#### `PATCH /api/v1/runs/:runId/rating`

Ustawienie oceny przez **autora** runu (`startedBy`). Body: `{ "rating": 1 | 2 | 3 | 4 | 5 | null }`. `null` = brak oceny (dopóki przegląd otwarty).

Dozwolone wielokrotnie **do** finalize. Status runu: tylko `completed` \| `failed`.

**200** — `{ "runId", "userRating", "reviewFinalizedAt" }`.  
**403** gdy sesja ≠ autor. **409** `REVIEW_LOCKED` po finalize. **409** `RUN_NOT_REVIEWABLE` przy innym statusie.

#### `POST /api/v1/runs/:runId/output-edited`

Autor oznacza, że edytował wynik agentów. Ustawia `outputEdited: true` (jednokierunkowo w MVP). Nie nadpisuje payloadu SM w DB w MVP.

Te same warunki authz / status / lock co ocena.

**200** — `{ "runId", "outputEdited": true }`.

#### `POST /api/v1/runs/:runId/finalize-review`

Zatwierdzenie przeglądu: zapisuje aktualne `userRating` (`null` albo `1–5`) i `outputEdited`, ustawia `reviewFinalizedAt`. Dalszy `PATCH` oceny i `POST` edycji → **409** `REVIEW_LOCKED`.

**200** — `{ "runId", "userRating", "outputEdited", "reviewFinalizedAt" }`.  
Idempotencja: ponowne finalize gdy już zamknięty → **409** `REVIEW_LOCKED`.

#### `GET /api/v1/runs/:runId/logs`

Snapshot uporządkowanych, czytelnych wpisów logu (historia).  
**200** — `{ "items": [ { "at", "level", "message", "step?", "requestId?", "conversationId?" } ] }`.

Każdy krok LLM w historii powinien mieć własny `requestId`; `conversationId` jest wspólny dla runu.

#### `GET /api/v1/runs/:runId/events` — SSE

Auth: ta sama sesja co API (cookie `cc_access` / `cc_refresh`) — **bez** tokenu w query string i **bez** Bearer w MVP.

Zdarzenia (`event:` / `data:` JSON):

| `event` | Kiedy | `data` (skrót) |
|---------|--------|----------------|
| `run.status` | Zmiana statusu | `{ runId, status }` |
| `run.log` | Nowy wpis logu | `{ runId, at, level, message, step?, requestId?, conversationId? }` |
| `run.hitl` | Oczekiwanie na wybór | `{ runId, options: [...] }` |
| `run.completed` | Sukces | `{ runId, resultSummary? }` |
| `run.failed` | Porażka | `{ runId, code?, message }` |
| `heartbeat` | Co ~25 s (keep-alive) | `""` — klient **ignoruje** |

**Koniec strumienia.** Po wyemitowaniu `run.completed` albo `run.failed` serwer **kończy** SSE (Observable complete → zamknięcie odpowiedzi HTTP). Subskrypcja, gdy snapshot runu jest już `completed` \| `failed`: serwer emituje `run.status` z **najświeższego** odczytu z DB i kończy stream — bez wiszącego połączenia.

Strumień **nie** kończy się na `awaiting_hitl` ani `interrupted` (run nadal żywy; po HITL / claimie idą dalsze eventy).

**Keep-alive.** Co ~25 s serwer wysyła event `heartbeat` z pustym `data`. Klient (FE, Postman) **ignoruje** tę wartość i nie traktuje jej jako zmiany statusu. Keep-alive zapobiega zamknięciu połączenia przez reverse proxy (np. Nginx timeout 60 s) i niepotrzebnemu reconnectowi klienta.

**Reconnect.** Klient odtwarza subskrypcję wyłącznie po **nieoczekiwanym** zerwaniu przy statusie nieterminalnym (restart procesu api, drop sieci). Zamknięcie po `run.completed` / `run.failed` **nie** jest sygnałem do reconnectu. Eventy `heartbeat` **nie** są sygnałem do reconnectu. Po restarcie api status może być `interrupted`, zanim znowu `running` — uzupełnić snapshotem GET.

Zmiana względem wcześniejszego zapisu tej sekcji: wymieniono eventy terminalne i reconnect po restarcie api, ale nie określono, czy połączenie HTTP zostaje otwarte; reconnect nie rozróżniał terminalu od awarii. Dopisano `heartbeat` (keep-alive) oraz doprecyzowano, że pierwszy `run.status` przy live-join pochodzi z najświeższego odczytu DB.

Statusy runu (normatywnie):

```text
queued → running → (awaiting_hitl → running) → completed
              │                         ↘ failed
              ├──→ failed
              └──→ interrupted → running    (claim, gdy wolny slot)
                              └→ failed     (cap recovery)
```

Trzy legalne krawędzie **do** `running`: `queued`, `interrupted`, `awaiting_hitl`. `POST /runs` nigdy nie tworzy `interrupted`. Reconnect SSE po restarcie api — jak w akapicie **Reconnect** powyżej (status może być `interrupted` zanim znowu `running`).

Ocena / Edytuj / finalize oraz HITL na `interrupted` → istniejące **409** (`RUN_NOT_REVIEWABLE` / `HITL_REQUIRED`); bez osobnego kodu HTTP na MVP.

#### `POST /api/v1/runs/:runId/hitl`

Wznowienie po wyborze z listy (task dwuetapowy: post ideas, reel ideas albo outline).

| Pole | Typ | Wymagane |
|------|-----|----------|
| `selectedIdeaIds` | string[] | tak; id z `hitl.options` danego `taskType` |

Dla `page_outline_then_copy`: dokładnie **jeden** id = `hitl.options[0].id` (= `result.pageOutline.id`). Inaczej **400** `HITL_INVALID_SELECTION` (bez zapisu selekcji, status zostaje `awaiting_hitl`). Brak zapisanego outline → **409** `CONFLICT`.

Dla `post_ideas_then_content` / `reel_ideas_then_scripts`: **`selectedIdeaIds.length >= 1`**, bez duplikatów, każdy id ∈ draftu / `hitl.options`. Inaczej **400** `HITL_INVALID_SELECTION` (ten sam kod co Content; spójny envelope; status zostaje `awaiting_hitl`; **bez zapisu**). Semantyka wyniku: **każde** wybrane id → **osobny** post (`SocialContent`) / scenariusz (`ReelScript`); kolejność tablicy wyniku = kolejność `selectedIdeaIds` w requeście. `hitl.options` bez zmian kształtu (lista pomysłów). Body nadal `{ selectedIdeaIds: string[] }`.

Pusty `[]` **nie** jest `VALIDATION_FAILED` (schema HTTP nadal `z.array(z.string())`); egzekucja w `ResumeHitlUseCase` → 400 `HITL_INVALID_SELECTION`. Max wyboru: `|selectedIdeaIds| <= |options|` (naturalnie `brief.ideaCount` na starcie ideation) — bez osobnego capu liczbowego w HTTP poza członkostwem w drafcie.

Zmiana względem: „Post/reel: bez nowej walidacji id” (Milestone 4).

Zmiana względem kanonu Fazy 4.3 (`selectedIdeaIds.length === 1`; 2+ id → 400; jeden content / jeden scenariusz): min. 1 unikalne id ⊆ options; 2+ legalne; N→N w **tym samym** runie.

**200** / **202** — run wraca do `running`.  
**409** `HITL_REQUIRED` / `CONFLICT` gdy run nie jest w `awaiting_hitl`.

To żądanie HTTP dostaje `RequestId` w **odpowiedzi** `apps/api` (jak każde inne). Wznowione agenty LLM dostaną kolejne `requestId` z odpowiedzi gateway; `ConversationId` runu bez zmian.

### Feedback (opinie tekstowe)

MVP: **wyłącznie zapis**. Odczyt listy / panel admina = **V1 — rozbudowa**.

#### `POST /api/v1/feedback`

Wymaga sesji. Append-only.

| Pole | Typ | Wymagane | Opis |
|------|-----|----------|------|
| `targetType` | `application` \| `agent` \| `run` | tak | Co dotyczy opinia |
| `body` | string | tak | Treść (limit długości — SPEC; bez sekretów) |
| `agentKey` | enum agentów | gdy `targetType = agent` | `IdeationAgent` \| `ContentWriterAgent` \| `ConsistencyVerifier` \| `PageWriterAgent` |
| `runId` | `RunId` | gdy `targetType = run` | Run **autora** (sesja = `startedBy`); inaczej **403** |

**201:**

```json
{
  "id": "fbk_…",
  "targetType": "run",
  "agentKey": null,
  "runId": "run_…",
  "body": "…",
  "authorId": "usr_…",
  "createdAt": "2026-08-15T12:00:00.000Z"
}
```

Wiele wpisów tego samego autora na ten sam target — dozwolone. Brak `GET` kolekcji w MVP.

### Health

#### `GET /api/v1/health`

Liveness `apps/api` — bez wymogu auth (self-host / orchestracja kontenerów).

**200** — `{ "status": "healthy", "timestamp": "<ISO8601>" }` (kształt może dostać pola wersji w implementacji; semantyka = żywy proces).

### Metrics (Prometheus)

#### `GET /metrics`

Endpoint operacyjny procesu **`apps/api`** (główny backend). **To nie są logi runu** — logi domenowe zostają w DB / SSE; tu scrape Prometheus (HTTP, latency, błędy, liczniki runów / statusów, sygnały zależności np. wywołań gateway — zestaw precyzuje implementacja).

| Element | Wartość |
|---------|---------|
| Ścieżka | `/metrics` — **poza** prefiksem `/api/v1` (jak typowy eksporter Prometheus; wzorzec jak w `ai-provider-gateway`) |
| Auth | bez wymogu w MVP (ochrona siecią / reverse proxy w deploy) |
| Format | `text/plain` — ekspozycja Prometheus |
| Sukces | **200** — snapshot metryk |

Szczegóły dashboardy / alertów → później `deployment.md`.

---

## Powierzchnia 2 — `apps/api` → `apps/ai-provider-gateway`

Content Chain **nie definiuje** własnego kontraktu LLM. Adapter w `apps/api` woła natywne API gateway’a zgodnie z dokumentacją / OpenAPI projektu **ai-provider-gateway**.

Źródło prawdy upstream: `openapi.json` oraz docs gateway (m.in. lista endpointów, dokumentacja API). Poniżej skrót integracyjny dla MVP Content Chain.

### Założenia integracji

| Element | Wartość |
|---------|---------|
| Prefiks gateway | `/api/v1` |
| Auth | nagłówek **`X-Gateway-Key`** (sekret tylko po stronie `apps/api` / env) |
| Domyślna ścieżka LLM | **`POST /api/v1/chat`** (odpowiedź pełna JSON, **201**) |
| Opcjonalnie | `POST /api/v1/chat/stream` (SSE gateway) — gdy krok pipeline’u tego wymaga |
| Pomocnicze | `GET /api/v1/models`, `GET /api/v1/health`, `GET /api/v1/health/ready` |
| Poza domyślną ścieżką CC | fasady `/api/v1/openai/...`, `/api/v1/anthropic/...` |
| `x-request-id` | **Nie ustawiany** przez CC przy chat/stream — gateway generuje `req_<uuid>`; CC zapisuje go z odpowiedzi |
| `conversationId` w body | **Ten sam** `ConversationId` runu na wszystkich wywołaniach LLM w runie |
| Limit `content` (native, `user` / `assistant`) | **10 000** znaków na wiadomość — `INGRESS_LIMITS.native` w `apps/ai-provider-gateway` (`chat-ingress.constants.ts`). Hop Social z JSON kontekstu firmy musi się w tym limicie mieścić. |
| Structured output | CC parsuje `output.text` przez `JSON.parse` + Zod. W tej instancji gateway `MASTER_SYSTEM_PROMPT.md` / `MAIN_SYSTEM_PROMPT.md` wymagają czystego JSON, gdy użytkownik o to prosi. CC **nadal nie** wysyła `role: system`. |

### Przykład — natywny czat (non-stream)

`POST {GATEWAY_BASE}/api/v1/chat`  
Headers: `Content-Type: application/json`, `X-Gateway-Key: …` — **bez** `x-request-id` ze strony Content Chain.

```json
{
  "modelAlias": "default",
  "conversationId": "conv_123e4567-e89b-12d3-a456-426614174000",
  "messages": [
    { "role": "user", "content": "…" }
  ],
  "params": {
    "temperature": 0.4,
    "maxOutputTokens": 2048
  }
}
```

**201** — ciało odpowiedzi gateway (m.in. treść asystenta, `usage`, `finishReason`, echo `conversationId`, **`requestId` nadany przez gateway**, …) wg upstream.  
CC **musi** przepisać ten `requestId` do `run.log` danego kroku agenta.  
Rola `system` w `messages[]` jest po stronie gateway **zablokowana** — system prompt składa gateway; Content Chain przekazuje treść użytkownika / turny tool zgodnie z kontraktem upstream.

Zmiana względem wcześniejszego skrótu (limit native 3000 znaków, bez wzmianki o JSON w MAIN/MASTER): hop pipeline’u z pełnym kontekstem firmy przekraczał 3000 znaków — kanoniczny limit native w tej instancji to **10 000**. Reguły wyjścia JSON żyją w plikach system promptu gateway, nie w body z api.

### Błędy gateway → run Content Chain

Upstream envelope (skrót): `{ statusCode, code, message, requestId, details? }`.

| Kod / sytuacja gateway | Oczekiwane zachowanie w CC |
|------------------------|----------------------------|
| `GATEWAY_KEY_MISSING` / `GATEWAY_KEY_INVALID` | Run `failed`; log czytelny (konfiguracja); bez retry user-facing „spróbuj inny prompt” |
| `MODEL_ALIAS_NOT_FOUND` / `VALIDATION_FAILED` | Run `failed`; log z `code` + `requestId` **tego** wywołania gateway |
| `RATE_LIMITED` / `PROVIDER_RATE_LIMITED` | Log + retry wg polityki api **albo** `failed` po wyczerpaniu; status widoczny w SSE |
| `PROVIDER_TIMEOUT` / `PROVIDER_UNAVAILABLE` | j.w. |
| `PROVIDER_AUTH_FAILED` | Run `failed`; log czytelny (konfiguracja vendora w env gateway); bez retry — wymaga interwencji operatora |
| `MODEL_NOT_ALLOWED` | Run `failed`; niedozwolony override `params` wg policy aliasu; log z `code` + `requestId` |
| `PROVIDER_UNSUPPORTED` / `GATEWAY_KEY_NOT_CONFIGURED` | Run `failed`; błąd konfiguracji serwera gateway; log bez wycieku sekretów |
| `TOOLS_NOT_SUPPORTED` / `THINKING_NOT_SUPPORTED` | Run `failed`; żądanie niezgodne z `capabilities` aliasu; log z `code` |
| Sukces częściowy przy stream gateway | Mapowanie na logi kroku; finalizacja węzła grafu dopiero po domknięciu kontraktu streamu |

`apps/api` mapuje błędy gateway na własne logi runu i ewentualnie `run.failed` — **bez** wyciekania `X-Gateway-Key` do frontendu. W logu zawsze da się odnaleźć parę: `conversationId` runu + `requestId` nieudanego hopu. Przy `LlmGatewayError` `message` wpisu kroku może zawierać zmapowany tekst adaptera (`Gateway chat failed (CODE)`). Dump pełnej treści żądania/odpowiedzi na stdout — wyłącznie `development` (`observability.md`).

### Przykład korelacji (norma)

1. Użytkownik: `POST /api/v1/runs` → `RequestId=req_A` (**HTTP api**, generuje CC), odpowiedź: `runId`, `conversationId=conv_X`
2. Klient: SSE `.../runs/:runId/events`
3. `IdeationAgent`: `POST gateway/.../chat` **bez** `x-request-id`, body `conversationId: conv_X` → odpowiedź gateway z `requestId=req_B` → `run.log` z `req_B`
4. `ConsistencyVerifier`: kolejne wywołanie, `conversationId: conv_X` → gateway zwraca `requestId=req_C` → `run.log` z `req_C`
5. (opcjonalnie HITL HTTP = osobny `RequestId` api; kolejne agenty = kolejne `requestId` **z odpowiedzi** gateway — zawsze ten sam `conv_X`)

Pełny przebieg LLM = `RunId` + `ConversationId` + seria `RequestId` pochodzących z gateway.

---

## Podział odpowiedzialności powierzchni

| Potrzeba | Powierzchnia |
|----------|--------------|
| Login, kontekst, runy, HITL, logi UI | HTTP API Content Chain |
| Live postęp runu | SSE Content Chain |
| Metryki ops procesu `apps/api` | `GET /metrics` (Prometheus) |
| Wywołanie modelu | wyłącznie gateway (natywny chat) |
| Klucze vendorów LLM | tylko gateway / jego env — nigdy `apps/frontend` |

## Poza zakresem tego dokumentu

- Drzewo katalogów → `architektura_katalogi_pliki.md`  
- Pełne skopiowanie OpenAPI gateway → docs upstream  
- Data-flow / schematy agentów → `data_flow.md`  
- Bezpieczeństwo (bootstrap, hasła, ekspozycja) → `security.md`  
- Metryki i pola logów (ops) → `observability.md`  
- Widoki UI → `ux_dashboard.md`  
