---
wersja: 10
data_utworzenia: 2026-08-11
data_modyfikacji: 2026-09-01
---

# SPEC — Runy / logi

## Cel / zakres względem dokumentacji

Norma bounded contextu **Runs / Logs** w `apps/api`: cykl życia async runu, **lista runów instancji** (paginacja / filtry), polityka statusów, kanoniczne logi w DB, emisja SSE, kolejka współbieżności oraz recovery po przerwaniu procesu.

Uszczegóławia `docs/architektura.md` (async run, klej composite), `docs/dokumentacja_komunikacji.md` (lista / SSE / GET / ocena / lista user / unia startu), `docs/observability.md` (pola logów vs metrics) oraz współpracę z `SPEC-SOCIAL.md`, `SPEC-CONTENT.md` i `SPEC-FEEDBACK.md`.

Zmiana względem wersji 7: **jeden** executor Social w MVP unieważniony — klej composite (Social \| Content); `UNKNOWN_TASK_TYPE`; unia `platform` / `contentKind`; HITL `selectedIdeaIds` także dla reel/page.

## Powiązanie ze stylem z docs

Wiążące: klasyczne warstwy Nest — controller → application → domain (przejścia statusów, retry/recovery) + porty → adaptery. LangGraph **nie** należy do tego BC (pozostaje w Social **i** Content za fasadami). Kierunek zależności Nest: graf agenta → porty Runs; binding `RunExecutorPort` w kleju procesu — `docs/architektura.md` (Zależności między BC).

Zmiana względem wersji 8: LangGraph pozostaje poza Runs — w Social **i** Content (w v8 akapit stylu nadal wymieniał tylko Social).

**Podział odpowiedzialności:**

| BC | Odpowiedzialność |
|----|------------------|
| **Runs** | Utworzenie runu, lista kolekcji, statusy, kolejka slotów, append logów, SSE, recovery, HITL HTTP jako zmiana stanu runu, zapis inicjatora, **ocena gwiazdkowa, flaga edycji outputu, finalize przeglądu**, lista `GET /runs/user/:userId`. Porty: lifecycle, **composite** executor, odczyt wycinka wyniku do snapshotu |
| **Social** | Węzły pipeline’u post/reel; woła **port** lifecycle Runs; wynik we własnym store |
| **Content** | Węzły pipeline’u page; woła **port** lifecycle Runs; wynik we własnym store (`SPEC-CONTENT.md`) |
| **Feedback** | Opinie tekstowe — nie statusy runu |

Zmiana względem wersji 6: tabela mówiła „woła porty Runs (`appendLog`, `transitionStatus`, zapis wyniku SM)” bez normy importów Nest — implementacja Fazy 4 planowała `forwardRef` Runs ↔ Social. Teraz: port lifecycle (nie klasa serwisu); wynik SM zostaje w store Social; cykl modułów Nest zakazany.

**Wyjątek względem stylu globalnego:** brak.

## Statusy (norma)

Dozwolona ścieżka:

```text
queued → running → (awaiting_hitl → running) → completed
              │                         ↘ failed
              ├──→ failed
              └──→ interrupted → running    (claim, gdy wolny slot)
                              └→ failed     (cap recovery)
```

Trzy legalne krawędzie **do** `running`: `queued`, `interrupted`, `awaiting_hitl`. `POST /runs` nigdy nie tworzy `interrupted`.

Przejścia inne niż dozwolone krawędzie domeny → odrzucenie (`CONFLICT` / błąd domenowy). Przykłady zakazane: `completed` → `running`; `interrupted` → `queued`; `awaiting_hitl` → `interrupted`.

Zmiana względem wersji 3: graf bez `interrupted`; leftover `running` wznawiane execute bez statusu pośredniego (burst poza capem claimu z R-6). Źródło: `docs/dictionary.md`, `docs/dokumentacja_komunikacji.md`.

## Wymagania (egzekwowalne)

R-1. W domain istnieje polityka przejść statusów (dozwolone krawędzie + egzekucja przy każdej zmianie).

R-2. `run.log` jest **append-only** w DB (brak edycji / usuwania wpisów historii w MVP). Pola wpisu zgodne z `docs/observability.md`: m.in. `runId`, `conversationId` (po starcie), `at`, `level`, `message`, `step?`, `requestId?`.

R-3. Live postęp wyłącznie przez SSE (`SPEC-KOMUNIKACJA.md`). GET run / logs = snapshot. Zakaz pollingu statusu jako kanału live.

R-3a. `GET /api/v1/runs` — lista **całej instancji** (nie tylko bieżącego użytkownika), zgodnie z `docs/dokumentacja_komunikacji.md`:

- sortowanie: `createdAt` malejąco;
- paginacja: stałe **`pageSize = 10`** (klient nie nadpisuje limitu), query `page` (default 1);
- filtry opcjonalne: `status`, `taskType` (w tym `reel_*` i `page_*`), `platform` (`SocialPlatform` **lub** `web`), `userId` (inicjator);
- pozycja listy: `runId`, `taskType`, `platform`, `contentKind` (nullable), `language`, `status`, `createdAt`, `startedBy: { id, email }`;
- odpowiedź zawiera `items`, `page`, `pageSize`, `total`.

Zmiana względem wersji 1: wcześniej brak normy listingu kolekcji — obowiązkowe pod dashboard (`docs/ux_dashboard.md`).

R-3b. Przy starcie runu ze sesją użytkownika api **zapisuje inicjatora** (`startedBy`). Snapshot `GET /runs/:runId` zawiera te same meta pola listy (m.in. `createdAt`, `startedBy`) **oraz** `conversationId`, `userRating`, `outputEdited`, `reviewFinalizedAt`, wynik addytywny gdy jest (`ideas` / `content` / `reelIdeas` / `reelScript` / `pageOutline` / `pageDocument`), metadane HITL (`options` wg `taskType`).

R-3d. `POST /runs` — unia dyskryminowana (`taskType`): Social wymaga `platform` i **zakazuje** `contentKind`; Content wymaga `contentKind` i **zakazuje** `platform` (zapis kolumny `platform='web'`). Walidacja Zod `discriminatedUnion` w application. `taskType` spoza enumu → HTTP **400** `VALIDATION_FAILED` (composite **nie** wołany).

R-3e. Composite `RunExecutorPort` (klej procesu, np. `run-dispatch.executor.ts`): `taskType` Social → `SocialRunExecutor`; Content → `ContentRunExecutor`; gałąź nieznana → status `failed` + kod domenowy `UNKNOWN_TASK_TYPE` (log; nie cichy no-op). `assertNever` na unii. Composite `RunResultReader` składa snapshot addytywny. **Zakaz** `forwardRef`, self-register, importu `ContentModule` / `SocialModule` z `RunsModule`.

R-3f. HITL `selectedIdeaIds` legalne dla `post_ideas_then_content`, `reel_ideas_then_scripts` i `page_outline_then_copy` (id z odpowiedniego `hitl.options`). Dla `page_outline_then_copy` egzekucja na HTTP: dokładnie `[outline.id]`; inaczej **400** `HITL_INVALID_SELECTION` (Runs, reader `getPageOutline` — bez importu `ContentModule`); status nie schodzi z `awaiting_hitl`. `POST /runs` z `page_*` + `selectedIdeaIds` → **400** `VALIDATION_FAILED`.

Zmiana względem wersji 9 / R-3f: „id z options” było dokumentacyjne; dla page brakowało 400 i zakazu selekcji na starcie (`SPEC-CONTENT.md` Ctn-5 od v3).

Zmiana względem wersji 2: snapshot ma obowiązkowe pola przeglądu (`userRating` zawsze `null` \| `1`…`5`; `outputEdited`; `reviewFinalizedAt`) zgodnie z `docs/dokumentacja_komunikacji.md`.

R-3c. `GET /api/v1/runs/user/:userId` — **wszystkie** runy z `startedBy = :userId`, sort `createdAt` desc, **bez** stałego `pageSize=10`. Pozycja lekka: `runId`, `taskType`, `platform`, `language`, `status`, `createdAt`. `:userId` **musi** równać się id sesji; inaczej **403** `FORBIDDEN` (brak wyjątku admin w MVP).

Zmiana względem wersji 2 / R-3a: R-3a (dashboard, strona 10) **zostaje**; R-3c to **osobny** endpoint pod select formularza opinii — nie wolno nadpisywać `limit` na `GET /runs`.

R-4. Emisja zdarzeń SSE należy do Runs; Social nie streamuje SSE bezpośrednio z węzłów grafu.

R-4a. Hub SSE (in-memory subject per `runId` w MVP): port ma jawny koniec cyklu życia (`complete` lub równoważne). Po legalnym przejściu do `completed` albo `failed` hub **kończy** subject i **usuwa** wpis z mapy. `awaiting_hitl` i `interrupted` **nie** kończą subjectu. Sam disconnect klienta (Nest unsubscribe) **nie** evikuje subjectu żyjącego runu. Późny `GET .../events` na runie już terminalnym nie alokuje wiecznego subjectu (ścieżka snapshot + complete w HTTP — `SPEC-KOMUNIKACJA.md` K-3a).

**TTL Subject:** Subject otworzony przez `subscribe()` na runie nieterminalnym jest domykany z błędem i usuwany z mapy po `RUN_SSE_SUBJECT_TTL_MS` (env, default `600_000` ms). Klient otrzymuje błąd EventSource i próbuje reconnect — przy snapshotcie terminalnym dostanie `of(...)` bez nowego Subject; przy nieterminalnym Subject powstaje od nowa z nowym TTL. Timer jest uwalniany przez `timer.unref()` (brak blokady shutdown Node.js).

**Heartbeat keep-alive:** live Observable zwracany przez handler `@Sse()` jest mergowany ze strumieniem `interval(SSE_HEARTBEAT_MS)` emitującym `{ type: 'heartbeat', data: '' }`. Klient ignoruje tę wartość. Heartbeat nie jest emitowany w ścieżce `of(snapshot)` (terminal late-join). Interwał pochodzi z `SSE_HEARTBEAT_MS` (env, default `25_000` ms).

**Snapshot przy live-join:** pierwszy event `run.status` emitowany przez `startWith` pochodzi z **najnowszego** odczytu z DB (drugi `getRun.execute` przed `subscribe`) — nie ze starszego odczytu guard-terminalu.

Zmiana względem wersji 4 / R-4: R-4 mówiło tylko kto emituje; infra „SSE hub / subject” bez evikcji — subject żył z procesem.

R-5. Worker MVP: **in-process** w procesie `apps/api` (po `202` z `POST /runs`). Zakaz spawnu osobnego procesu OS na każdy run oraz osobnego always-on workera w MVP.

R-6. Współbieżność: tylko limit **globalny** `MAX_CONCURRENT_RUNS` (env), domyślnie **3** — maksymalna liczba równoległych **execute** w procesie api. Claim do `running` z `queued` **oraz** z `interrupted` wyłącznie przy wolnym slocie. Nowe runy (`POST /runs`) powyżej limitu pozostają w `queued` i są podejmowane FIFO, gdy zwolni się slot **i** nie ma starszego `interrupted` w drain. Drain: najpierw `interrupted`, potem `queued`. Bez limitu per-user w v1. `awaiting_hitl → running` (HITL) jest osobnym use-casem i **nie** podlega temu capowi w MVP.

Zmiana względem wersji 3 / R-6: cap dotyczył wyłącznie nowych runów w `queued`; recovery boot mogło odpalić execute ponad limit (burst).

R-7. Retention: logi runu **bez TTL** w MVP; **bez** limitu długości `message` w MVP. Zakaz sekretów w `message` (jak observability / security).

R-8. `/metrics` (Prometheus) **nie** zastępuje logów runu i nie jest kanałem przebiegu domenowego.

R-9. Recovery po brutalnym przerwaniu `running` (restart / crash procesu api):

1. Przy starcie api, **zanim** pump claimuje `queued`: leftover `running` → `interrupted` (albo od razu `failed` przy capie). `POST` / HITL **nie** ustawiają `interrupted`.
2. `recoveryAttempts++` tylko gdy leftover był `running` (faktycznie przerwany execute). Leftover już `interrupted` (nie zdążył dostać slotu) — **bez** inkrementu; wraca do pompy.
3. Wznowienie execute wyłącznie przez claim `interrupted → running` pod `MAX_CONCURRENT_RUNS` (R-6). Zakaz startu wszystkich leftover naraz z pominięciem semafora. Po powrocie do `running`: do **3** prób wznowienia **fazy** z trwałego stanu w DB (model B z `SPEC-SOCIAL.md` / `SPEC-CONTENT.md` — re-invoke właściwego BC po `taskType`, nie checkpointer).
4. Przed każdą próbą / przy klasyfikacji błędu: `isRetryable(...)` — retry m.in. dla recovery po crashu, timeoutów / rate-limit gateway (zgodnie z polityką); **bez** retry dla błędów walidacji, wyczerpanego refine verifiera, błędów konfiguracji klucza gateway itd.
5. Po wyczerpaniu 3 prób (`recoveryAttempts >= 3`) → `failed` + czytelny wpis logu (powód recovery / exhausted); bez execute.
6. Run w `awaiting_hitl` po restarcie **pozostaje** `awaiting_hitl` — bez zużywania puli recovery i bez przejścia do `interrupted`. HITL (`awaiting_hitl → running`) **nie** jest tym wymaganiem.

Zmiana względem wersji 3 / R-9: recovery wznawiało leftover `running` przez ponowne `execute` bez statusu `interrupted` i bez twardego capu na claim.

R-10. Przegląd runu (po pipeline; **nie** HITL):

1. `userRating` na runie **zawsze istnieje**: `null` (autor nie zostawił gwiazdek) albo `1`…`5`. Domyślnie `null`.
2. Ocena, flaga edycji i finalize dozwolone wyłącznie gdy status `completed` **albo** `failed` (w tym przebieg z edycją outputu). Inny status → **409** `RUN_NOT_REVIEWABLE`.
3. Wyłącznie `startedBy` (sesja). Inna sesja → **403** `FORBIDDEN`.
4. Do `reviewFinalizedAt === null`: autor może wielokrotnie `PATCH .../rating` (w tym z powrotem na `null`) oraz jednokierunkowo `POST .../output-edited` (`outputEdited: true`; MVP nie kasuje flagi i nie nadpisuje payloadu SM).
5. `POST .../finalize-review` ustawia `reviewFinalizedAt`. Potem `PATCH` oceny i `POST` edycji → **409** `REVIEW_LOCKED`. Ponowne finalize → `REVIEW_LOCKED`.
6. Finalize przy `userRating: null` jest legalne (świadomy brak gwiazdek).

## Norma implementacji

### Wzorce / struktura

```text
apps/api/src/runs/
├── runs.module.ts
├── runs.controller.ts           # list, snapshot, logs, events SSE, hitl, user/:userId, rating, output-edited, finalize
├── application/                 # list, start, enqueue, resume hitl, recovery on boot
├── domain/                      # status transitions, isRetryable, porty (executor, lifecycle, result reader)
└── infrastructure/              # Prisma run/log, SSE hub / subject
```

Wolno wydzielić kernel Nest (lifecycle + repo + hub) od HTTP/workera **w tym samym** BC, gdy zamyka to cykl importów. To nie nowy bounded context.

| Element | Norma |
|---------|--------|
| Kolejka | Stan w DB (`queued` / `interrupted` / `running`); semafor współbieżności w procesie api |
| SSE | Nest `@Sse()`; subskrypcja po `runId`; auth jak API; **complete + evikcja** subjectu po `completed`/`failed` (R-4a) |
| Licznik recovery | Pole / metadane runu (np. `recoveryAttempts`), cap = 3 |
| Idempotencja HITL | Tylko ze statusu `awaiting_hitl` |
| Przegląd | `userRating` + `outputEdited` + `reviewFinalizedAt`; lock po finalize |
| Port lifecycle | Token + interfejs `appendLog` + `transition` w `domain/`; graf zależy od portu, nie od klasy `RunLifecycleService` |
| Port executor | Token `RunExecutorPort` w Runs; **composite** w kleju wpinający Social i Content; **binding w `AppModule` / `registerAsync`** |
| Odczyt snapshotu `result`/`hitl` | Composite reader; **zakaz** wstrzykiwania store Social/Content do use-case’u Runs przez `imports: [SocialModule]` / `ContentModule` |

Zmiana względem wersji 6 / drzewo `domain/`: wcześniej porty bez rozróżnienia lifecycle vs executor vs reader; binding executora nie był unormowany (feature plan Fazy 4 wstawiał `forwardRef`).

### Wolno

- Po `POST /runs` od razu `running`, jeśli jest wolny slot; w przeciwnym razie `queued`.
- Przy starcie api uruchomić use-case recovery (`running` → `interrupted` / `failed`) przed podejmowaniem nowych `queued`.
- Claim `interrupted → running` pod tym samym capem co `queued`; priorytet `interrupted` w drain.
- Emitować SSE przy każdym udanym `appendLog` i każdej legalnej zmianie statusu (w tym do/z `interrupted`).
- Domykać i usuwać subject huba wyłącznie po `completed` / `failed` (R-4a).
- `startedBy` nullable wyłącznie dla historycznych / pre-auth przebiegów testowych; po domknięciu auth na api nowe runy zawsze z inicjatorem.
- Trzymać `userRating: null` jako jawny brak oceny (nie pomijać pola w snapshotcie).
- `RunsModule.registerAsync` (lub równoważny klej w `AppModule`) wpinające **composite** `RunExecutorPort` (Social + Content) — bez `forwardRef`.
- Domyślną (pustą) implementację portu odczytu wyniku w Runs, podmienianą w kleju na composite reader.

### Nie wolno

- Pollingu statusu runu jako live.
- `complete` subjectu SSE na `awaiting_hitl` albo `interrupted`.
- Mapy Subject bez evikcji po terminalu (wpis na zawsze w singletonie procesu).
- Subjectu bez TTL automatu ewikcji — zombie Subject przy hung/crashed runie powoduje memory leak i głodzi file descriptory.
- Hardkodowania wartości `SSE_HEARTBEAT_MS` i `RUN_SSE_SUBJECT_TTL_MS` w kodzie (env z walidacją Zod).
- Traktowania stdout jako jedynego źródła przebiegu dla UI.
- Mylenia `/metrics` z logami runu.
- Niedozwolonych skoków statusów.
- Spawnu procesu per run; always-on worker process w MVP.
- Limitu współbieżności per-user w v1.
- Checkpoinetera LangGraph jako mechanizmu recovery Runs.
- `running → queued` jako recovery.
- Startu wszystkich leftover `running` execute ponad `MAX_CONCURRENT_RUNS` (burst recovery).
- Tworzenia `interrupted` z HTTP (`POST /runs`, HITL).
- Wycieku sekretów do `run.log`.
- Listy tylko „moje runy” jako jedynego trybu MVP (norma: cała instancja + filtr `userId`).
- Zmiennego `pageSize` / dowolnego `limit` z query na `GET /runs` w MVP (stałe 10). `GET /runs/user/:userId` jest **osobnym** wyjątkiem bez tej paginacji — nie mylić z R-3a.
- Oceny / flagi edycji / finalize na runie obcego `startedBy`.
- Zmiany `userRating` / `outputEdited` po `reviewFinalizedAt`.
- Mylenia finalize / Edytuj z HITL.
- Umieszczania opinii tekstowych w tym BC (to `SPEC-FEEDBACK.md`).
- `forwardRef` między `RunsModule` a modułem grafu (Social / Content / przyszły Mail).
- Importu `SocialModule` albo `ContentModule` z `RunsModule` jako sposobu na `RUN_EXECUTOR` albo snapshot `result`.
- Self-register grafów (`OnModuleInit` → rejestr) jako wymogu MVP.
- Cichego no-op przy nieznanym `taskType` w composite (obowiązuje `UNKNOWN_TASK_TYPE` + `failed`).
- Resume HITL `page_outline_then_copy` przy `selectedIdeaIds` innym niż `[outline.id]` (obowiązuje **400** `HITL_INVALID_SELECTION`; status zostaje `awaiting_hitl`).
- Przyjęcia `selectedIdeaIds` na `POST /runs` dla `page_*`.
- Eksportu tokenu `RUN_EXECUTOR` z modułu Social **po to**, by Runs musiał ten moduł zaimportować.
- `@Global()` na BC grafu albo na całym Runs jako ukrycia cyklu.
- Zależności grafu od **klasy** `RunLifecycleService` zamiast portu (token + interfejs `appendLog` / `transition`).
- Umieszczania portu lifecycle / executora w `packages/shared`.

### Zatwierdzony stack (obszar)

| Element | Status |
|---------|--------|
| BC Runs + porty używane przez Social i Content | obowiązkowe |
| Port lifecycle + binding composite `RunExecutorPort` w kleju procesu (bez cyklu Nest) | obowiązkowe |
| Append-only logi w DB + SSE Nest | obowiązkowe |
| Hub SSE: `complete` + evikcja subjectu po `completed`/`failed` (R-4a) | obowiązkowe |
| `RUN_SSE_SUBJECT_TTL_MS` (env, default `600_000`) — TTL automatu ewikcji Subject | obowiązkowe |
| `SSE_HEARTBEAT_MS` (env, default `25_000`) — interwał keep-alive SSE | obowiązkowe |
| In-process worker + `MAX_CONCURRENT_RUNS` (default 3) | obowiązkowe |
| Recovery: leftover `running` → `interrupted` → claim pod capem; max 3 × `isRetryable` → `failed` | obowiązkowe |
| Pola przeglądu `userRating` / `outputEdited` / `reviewFinalizedAt` + `GET /runs/user/:userId` | obowiązkowe w **MVP** (fundament zapisu) |
| Osobny worker process / per-user limit / TTL logów | poza MVP |
| Self-register grafów / `@Global()` na BC grafu jako klej | poza MVP (i zakazane jako obejście cyklu) |
| Stopień edycji outputu / zmiana oceny po finalize | poza MVP |

## Kryteria akceptacji

- [ ] Nielegalne przejście statusu jest odrzucane.
- [ ] Logi rosną tylko przez append; GET logs zwraca historię; SSE dostarcza przyrosty.
- [ ] Po `completed`/`failed` hub nie zatrzymuje subjectu danego `runId`; `awaiting_hitl` / `interrupted` nie evikują subjectu.
- [ ] `GET /runs` zwraca listę instancji z paginacją 10, sortem `createdAt` desc, filtrami i `startedBy`.
- [ ] `GET /runs/user/:userId` zwraca wszystkie runy sesji; cudzy id → 403.
- [ ] Snapshot zawiera `userRating` (`null` \| 1–5), `outputEdited`, `reviewFinalizedAt`.
- [ ] Ocena i Edytuj działają na `completed` i `failed` tylko dla autora; po finalize → `REVIEW_LOCKED`.
- [ ] Przy zajętych slotach nowy run jest `queued` i startuje po zwolnieniu slotu (globalny limit, default 3); `interrupted` ma priorytet nad `queued`.
- [ ] Po restarcie api: `awaiting_hitl` bez zmian; leftover `running` → `interrupted` (claim pod `MAX_CONCURRENT_RUNS`); po 3 przerwanych execute → `failed` z logiem. N leftover przy `MAX=1` → jeden execute naraz, reszta zostaje `interrupted`.
- [ ] Social / Content nie emitują SSE omijając Runs.
- [ ] `/metrics` nie jest używane jako podgląd przebiegu runu.
- [ ] Brak cyklu Nest Runs ↔ Social / Content; worker dostaje composite executor z kleju.
- [ ] `POST /runs` z `page_*` bez `platform` i z `contentKind` → 202; page + `platform: linkedin` → 400; `taskType` spoza enumu → 400.
- [ ] HITL `page_outline_then_copy` z id ≠ `outline.id` → 400 `HITL_INVALID_SELECTION`; run zostaje `awaiting_hitl`.

## Poza zakresem

- Animacje / EventSource UI → `SPEC-FRONTEND.md`.
- Pełny zestaw metryk Prometheus i OTel → docs observability / `SPEC-BEZPIECZENSTWO.md`.
- Publikacja draftów na API portali SM (v2).
- Osobny always-on worker process, broker kolejek (Redis itd.).
- Checkpointer LangGraph.
- Limit współbieżności per użytkownik.
- Panel odczytu ocen / analityka (V1 — rozbudowa).
- Opinie tekstowe → `SPEC-FEEDBACK.md`.
