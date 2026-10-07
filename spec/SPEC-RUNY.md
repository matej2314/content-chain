---
wersja: 24
data_utworzenia: 2026-08-11
data_modyfikacji: 2026-10-06
---

# SPEC — Runy / logi

## Cel / zakres względem dokumentacji

Norma bounded contextu **Runs / Logs** w `apps/api`: cykl życia async runu, **lista runów instancji** (paginacja / filtry), polityka statusów, **anulowanie (`cancelled`)**, kanoniczne logi w DB, emisja SSE, kolejka współbieżności, recovery po przerwaniu procesu, **przegląd runu z TTL** (`pipelineFinishedAt` + `REVIEW_TTL`, sweeper auto-finalize) oraz **`GuestRunPolicy`** (sloty / Redis admit — `docs/dokumentacja_komunikacji.md`).

Uszczegóławia `docs/architektura.md` (async run, klej composite, cancel v1), `docs/dokumentacja_komunikacji.md` (lista / SSE / GET / cancel / ocena / lista user / unia startu), `docs/data_flow.md` (ścieżka cancel, recovery + `cancelRequested`, TTL przeglądu), `docs/observability.md` (pola logów vs metrics) oraz współpracę z `SPEC-SOCIAL.md`, `SPEC-CONTENT.md` i `SPEC-FEEDBACK.md`.

Zmiana względem wersji 22 / R-3c: doprecyzowano, że **paginacja UI** „Moje runy” (FE, `pageSize = 10`) **nie** zmienia kontraktu HTTP R-3c — pełna lista nadal z API (`docs/ux_dashboard.md`, `SPEC-FRONTEND.md` F-8).

Zmiana względem wersji 7: **jeden** executor Social w MVP unieważniony — klej composite (Social \| Content); `UNKNOWN_TASK_TYPE`; unia `platform` / `contentKind`; HITL `selectedIdeaIds` także dla reel/page.

Zmiana względem wersji 17: dwa terminale (`completed` / `failed`); brak HTTP cancel. Od tej wersji trzeci terminal **`cancelled`**, `POST .../cancel`, durable `cancelRequested`, abort in-process — `docs/dokumentacja_komunikacji.md`, `docs/data_flow.md`.

Zmiana względem wersji 18: przegląd otwarty do ręcznego finalize **bez limitu czasu**. Od tej wersji okno = `REVIEW_TTL` od `pipelineFinishedAt`; lock w DB poza ręcznym finalize = wyłącznie sweeper — `docs/dictionary.md`, `docs/data_flow.md`.
Zmiana względem wersji 19 / cel: brak GuestRunPolicy. Od tej wersji R-12 + ownership odczytu dla `guest`.

## Powiązanie ze stylem z docs

Wiążące: klasyczne warstwy Nest — controller → application → domain (przejścia statusów, retry/recovery) + porty → adaptery. LangGraph **nie** należy do tego BC (pozostaje w Social **i** Content za fasadami). Kierunek zależności Nest: graf agenta → porty Runs; binding `RunExecutorPort` w kleju procesu — `docs/architektura.md` (Zależności między BC).

Zmiana względem wersji 8: LangGraph pozostaje poza Runs — w Social **i** Content (w v8 akapit stylu nadal wymieniał tylko Social).

**Podział odpowiedzialności:**

| BC | Odpowiedzialność |
|----|------------------|
| **Runs** | Utworzenie runu, lista kolekcji, statusy, **anulowanie (`cancelled`)**, kolejka slotów, append logów, SSE, recovery, HITL HTTP jako zmiana stanu runu, zapis inicjatora, **ocena gwiazdkowa, zapis edycji wyniku (`result` + `outputEdited`), finalize przeglądu, kotwica `pipelineFinishedAt`, sweeper auto-finalize**, lista `GET /runs/user/:userId`. Porty: lifecycle, **composite** executor, odczyt wycinka wyniku do snapshotu, `attemptCancel` |
| **Social** | Węzły pipeline’u post/reel; woła **port** lifecycle Runs; wynik we własnym store |
| **Content** | Węzły pipeline’u page; woła **port** lifecycle Runs; wynik we własnym store (`SPEC-CONTENT.md`) |
| **Feedback** | Opinie tekstowe — nie statusy runu |

Zmiana względem wersji 6: tabela mówiła „woła porty Runs (`appendLog`, `transitionStatus`, zapis wyniku SM)” bez normy importów Nest — implementacja Fazy 4 planowała `forwardRef` Runs ↔ Social. Teraz: port lifecycle (nie klasa serwisu); wynik SM zostaje w store Social; cykl modułów Nest zakazany.

**Wyjątek względem stylu globalnego:** brak.

## Statusy (norma)

Dozwolona ścieżka:

```text
queued → running → (awaiting_hitl → running) → completed
   │          │                         ↘ failed
   │          ├──→ failed
   │          └──→ interrupted → running    (claim, gdy wolny slot)
   │                          ├→ failed     (cap recovery)
   │                          └→ cancelled
   ├──→ cancelled
   └── (także: running → cancelled; awaiting_hitl → cancelled)
```

Trzy legalne krawędzie **do** `running`: `queued`, `interrupted`, `awaiting_hitl`. Legalne krawędzie **do** `cancelled`: `queued` \| `running` \| `awaiting_hitl` \| `interrupted`. `cancelled` **bez wyjść**. `POST /runs` nigdy nie tworzy `interrupted` ani `cancelled`.

Przejścia inne niż dozwolone krawędzie domeny → odrzucenie (`CONFLICT` / błąd domenowy). Przykłady zakazane: `completed` → `running`; `interrupted` → `queued`; `awaiting_hitl` → `interrupted`; `completed` \| `failed` \| `cancelled` → `cancelled`; dowolne wyjście z `cancelled`.

Zmiana względem wersji 3: graf bez `interrupted`; leftover `running` wznawiane execute bez statusu pośredniego (burst poza capem claimu z R-6). Źródło: `docs/dictionary.md`, `docs/dokumentacja_komunikacji.md`.

Zmiana względem wersji 17 / Statusy: graf bez `cancelled`. Od tej wersji trzeci terminal; wejścia z czterech nieterminalnych (`docs/dokumentacja_komunikacji.md`).

## Wymagania (egzekwowalne)

R-1. W domain istnieje polityka przejść statusów (dozwolone krawędzie + egzekucja przy każdej zmianie).

R-2. `run.log` jest **append-only** w DB (brak edycji / usuwania wpisów historii w MVP). Pola wpisu zgodne z `docs/observability.md`: m.in. `runId`, `conversationId` (po starcie), `at`, `level`, `message`, `step?`, `requestId?`.

R-3. Live postęp **konkretnego** runu wyłącznie przez SSE (`SPEC-KOMUNIKACJA.md`). GET run / logs = snapshot. Zakaz pollingu statusu jako kanału live. GET listingu (w tym archiwum UI co 15 min) **nie** jest kanałem live.

R-3a. `GET /api/v1/runs` — lista **całej instancji** (nie tylko bieżącego użytkownika), zgodnie z `docs/dokumentacja_komunikacji.md`. **`guest` (demo on):** ta sama lista (showcase). `admin`/`user`: **bez zmian**.

- sortowanie: `createdAt` malejąco;
- paginacja: stałe **`pageSize = 10`** (klient nie nadpisuje limitu), query `page` (default 1);
- filtry opcjonalne: `status` (**jeden** `RunStatus` **albo** lista unikalnych wartości rozdzielona przecinkiem; archiwum dashboardu: `completed,failed,cancelled`; brak parametru = wszystkie), `taskType` (w tym `reel_*` i `page_*`), `platform` (`SocialPlatform` **lub** `web`), `userId` (inicjator);
- pozycja listy: `runId`, `taskType`, `platform`, `contentKind` (nullable), `language`, `status`, `createdAt`, `startedBy: { id, email }`;
- odpowiedź zawiera `items`, `page`, `pageSize`, `total`.
- nieznana wartość w `status` → **400** `VALIDATION_FAILED`.

Zmiana względem wersji 16 / R-3a: `status` wyłącznie pojedynczy enum; UI Runy = wszystkie statusy. Od tej wersji lista wielowartościowa; kanon widoku Runy = archiwum terminalne (`docs/ux_dashboard.md`) — API bez filtra nadal zwraca całą instancję (Postman).

Zmiana względem wersji 17 / R-3a: archiwum UI `completed,failed`. Od tej wersji `completed,failed,cancelled` (`docs/ux_dashboard.md`).

R-3b. Przy starcie runu ze sesją użytkownika api **zapisuje inicjatora** (`startedBy`). Snapshot `GET /runs/:runId` zawiera te same meta pola listy (m.in. `createdAt`, `startedBy`) **oraz** `conversationId`, `brief` (kształt zapisany: `SocialBrief` albo `ContentBrief` wg `taskType`), `userRating`, `outputEdited`, `reviewFinalizedAt`, **`pipelineFinishedAt`**, **`reviewExpiresAt`** (wyliczane), **`cancelledAt`** (`null` \| ISO8601), wynik addytywny gdy jest (`ideas` / `content` / `contents` / `reelIdeas` / `reelScript` / `reelScripts` / `pageOutline` / `pageDocument`), metadane HITL (`options` wg `taskType`). Semantyka `pipelineFinishedAt` / `reviewExpiresAt` oraz zakaz side-effect na GET — R-10. Lista `GET /runs/user/:userId` **bez** tych dwóch pól TTL. **`guest`:** `GET /runs/:id`, logi, events/SSE — **tylko** gdy `startedBy === self`; cudze → **403** `FORBIDDEN`. `admin`/`user`: odczyt detail **bez zmian** względem dotychczasowego ownership (lista instancji; mutacje nadal `startedBy`).

Zmiana względem wersji 18 / R-3b: snapshot bez `pipelineFinishedAt` / `reviewExpiresAt`. Od tej wersji pola meta TTL na `GET /runs/:id` (i sukcesach mutacji przeglądu) — `docs/dokumentacja_komunikacji.md`.

R-3d. `POST /runs` — unia dyskryminowana (`taskType`): Social wymaga `platform` i **zakazuje** `contentKind`; Content wymaga `contentKind` i **zakazuje** `platform` (zapis kolumny `platform='web'`). **Kształt `brief` XOR:** Social → `SocialBrief` (`ideaCount?`; zakaz `angle` / `targetLength`); Content → `ContentBrief` (`angle?` / `targetLength?`; zakaz `ideaCount`). Pola: `docs/dokumentacja_komunikacji.md`, `docs/dictionary.md`. Walidacja Zod `discriminatedUnion` w application + `.strict()` na gałęzi briefu — przez wspólny `parseWithZod` z `apps/api/src/shared/parse-with-zod.ts` (refaktor względem wcześniejszej lokalizacji `runs/application/parse-with-zod.ts`). DTO HTTP może mieć sumę kluczy briefu; prawda = Zod. `taskType` spoza enumu → HTTP **400** `VALIDATION_FAILED` (composite **nie** wołany). Page + `brief.ideaCount` albo Social + `brief.angle` → **400** `VALIDATION_FAILED`.

Zmiana względem wersji 10 / R-3d: unia dotyczyła `platform` XOR `contentKind` przy **jednym** obiekcie briefu SM (`RunBrief` z `ideaCount`). Od tej wersji brief jest kanałowy; `RunRecord` = `SocialRunRecord` | `ContentRunRecord` (`taskType` dyskryminuje `brief`). Definicje `SocialBrief` / `ContentBrief` w `runs/domain` — **nie** w `packages/shared` ani `apps/api/src/shared/`.

Zmiana względem wersji 12 / R-3d: `parseWithZod` importowany z `apps/api/src/shared/parse-with-zod.ts` (nie lokalny plik w `runs/application/`).

R-3d1. Odczyt `Run.brief` (Json) w adapterze: parse Zod **wg `taskType`**. Zakaz `as RunRecord['brief']` / `as SocialBrief`. Śmieć w JSON → błąd adaptera (jak nielegalny `taskType`), nie cichy cast. Kolumna Json **bez** nowej migracji (`SPEC-PERSISTENCE.md`).

R-3e. Composite `RunExecutorPort` (klej procesu, np. `run-dispatch.executor.ts`): `taskType` Social → `SocialRunExecutor`; Content → `ContentRunExecutor`; gałąź nieznana → status `failed` + kod domenowy `UNKNOWN_TASK_TYPE` (log; nie cichy no-op). `assertNever` na unii. Composite `RunResultReader` składa snapshot addytywny. **Zakaz** `forwardRef`, self-register, importu `ContentModule` / `SocialModule` z `RunsModule`.

R-3f. HITL `selectedIdeaIds` legalne dla `post_ideas_then_content`, `reel_ideas_then_scripts` i `page_outline_then_copy` (id z odpowiedniego `hitl.options`).

- `page_outline_then_copy`: dokładnie `[outline.id]`; inaczej **400** `HITL_INVALID_SELECTION` (Runs, reader `getPageOutline` — bez importu `ContentModule`); status nie schodzi z `awaiting_hitl`. **Bez zmian** względem v13.
- `post_ideas_then_content` / `reel_ideas_then_scripts`: **`selectedIdeaIds.length >= 1`**, bez duplikatów, każdy id ∈ draftu / `hitl.options`; **nie** `length === 1`. Inaczej **400** `HITL_INVALID_SELECTION` (ten sam kod co Content); status zostaje `awaiting_hitl`. **2+ legalne**, gdy wszystkie ∈ options. Semantyka wyniku: każde id → osobny artefakt (`contents[]` / `reelScripts[]` + `sourceIdeaId`) — `SPEC-SOCIAL.md` S-6 / S-7b.

`POST /runs` z `page_*` + `selectedIdeaIds` → **400** `VALIDATION_FAILED`.

Zmiana względem wersji 9 / R-3f: „id z options” było dokumentacyjne; dla page brakowało 400 i zakazu selekcji na starcie (`SPEC-CONTENT.md` Ctn-5 od v3).

Zmiana względem wersji 11 / R-3f: „Post/reel bez nowej walidacji id” — v13: Social jak Content dla długości selekcji (1 id).

Zmiana względem wersji 13 / R-3f (nota v11: Social jak Content dla długości): **unieważnione** — Social = N→N (min. 1, unikalne, ⊆ options); Content Ctn-5 **bez** zmiany.

R-3g. Snapshot addytywny pól wyniku: `ideas[].cta?`, `content.characterCount`, `contents[]` (kształt `SocialContent` + `sourceIdeaId`), `reelIdeas[].cta?`, `reelScripts[]` (kształt `ReelScript` + `sourceIdeaId`), `pageOutline.sections[].role?`. Reader nie null-crashuje przy braku klucza w starym wierszu DB. Kanon `characterCount` przy odczycie: jeśli brak w JSON → `characterCount = body.length` w mapperze wyniku (na skalarze i na każdej pozycji `contents[]`). Dwuetapowy Social po fazie 2: skalar `content` / `reelScript` = **`null`** (nie alias `contents[0]` / `reelScripts[0]`). Pusta tablica, gdy brak kanału / przed fazą 2.

Zmiana względem wersji 13 / R-3g: enumeracja wyniku bez `contents` / `reelScripts`.

Zmiana względem wersji 11: pola wyniku SM/outline bez addytywnych kluczy kontraktu.

Zmiana względem wersji 2: snapshot ma obowiązkowe pola przeglądu (`userRating` zawsze `null` \| `1`…`5`; `outputEdited`; `reviewFinalizedAt`) zgodnie z `docs/dokumentacja_komunikacji.md`.

R-3c. `GET /api/v1/runs/user/:userId` — **wszystkie** runy z `startedBy = :userId`, sort `createdAt` desc, **bez** stałego `pageSize=10` na HTTP. Pozycja lekka: `runId`, `taskType`, `platform`, `language`, `status`, `createdAt`. **Bez** `pipelineFinishedAt` / `reviewExpiresAt` / pełnych metadanych przeglądu. `:userId` **musi** równać się id sesji; inaczej **403** `FORBIDDEN` (brak wyjątku admin w MVP). Konsumenci: select opinii **oraz** lista „Moje runy” na Koncie (live) (`docs/ux_dashboard.md`). **UI Konto** może **paginować wyświetlanie** stałym `pageSize = 10` (slice FE) — **bez** zmiany tego kontraktu i **bez** query `page` / `pageSize` na tym endpoincie (`SPEC-FRONTEND.md` F-8). Wynik runu — przez `GET /runs/:runId` (widok szczegółów), nie przez ten listing.

Zmiana względem wersji 22 / R-3c: dopisano kanon paginacji UI Moje runy (FE) przy zachowaniu pełnej listy HTTP.

Zmiana względem wersji 15 / R-3c: endpoint był opisany wyłącznie pod select opinii.

Zmiana względem wersji 2 / R-3a: R-3a (dashboard, strona 10) **zostaje**; R-3c to **osobny** endpoint pod select formularza opinii — nie wolno nadpisywać `limit` na `GET /runs`.

R-4. Emisja zdarzeń SSE należy do Runs; Social nie streamuje SSE bezpośrednio z węzłów grafu.

R-4a. Hub SSE (in-memory subject per `runId` w MVP): port ma jawny koniec cyklu życia (`complete` lub równoważne). Po legalnym przejściu do `completed` albo `failed` albo **`cancelled`** hub **kończy** subject i **usuwa** wpis z mapy. Terminal SSE = `completed` \| `failed` \| `cancelled`. `awaiting_hitl` i `interrupted` **nie** kończą subjectu. Sam disconnect klienta (Nest unsubscribe) **nie** evikuje subjectu żyjącego runu. Późny `GET .../events` na runie już terminalnym nie alokuje wiecznego subjectu (ścieżka snapshot + complete w HTTP — `SPEC-KOMUNIKACJA.md` K-3a). Przy cancelu kolejność emisji: `run.status` (`status: cancelled`) → `run.cancelled` → complete huba.

Zmiana względem wersji 17 / R-4a: terminal = tylko `completed` \| `failed`. Od tej wersji także `cancelled` + event `run.cancelled`.

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

1. Przy starcie api, **zanim** pump claimuje `queued`:
   - leftover `running` **z** `cancelRequested` → `cancelled` (nie `interrupted`, nie ponowne execute; **bez** `recoveryAttempts++`; nie retryable);
   - leftover `interrupted` **z** `cancelRequested` → `cancelled` (crash między flagą a zapisem statusu; **bez** `recoveryAttempts++`; nie retryable);
   - leftover `running` **bez** flagi → `interrupted` (albo od razu `failed` przy capie);
   - leftover `interrupted` **bez** flagi → dotychczasowa pompa (bez inkrementu przy samym leftover `interrupted`).
   `POST` / HITL **nie** ustawiają `interrupted`. Anulowanie użytkownika **nie** zużywa `recoveryAttempts`.
2. `recoveryAttempts++` tylko gdy leftover był `running` **bez** `cancelRequested` (faktycznie przerwany execute). Leftover już `interrupted` bez flagi (nie zdążył dostać slotu) — **bez** inkrementu; wraca do pompy.
3. Wznowienie execute wyłącznie przez claim `interrupted → running` pod `MAX_CONCURRENT_RUNS` (R-6) — wyłącznie gdy **brak** `cancelRequested`. Zakaz startu wszystkich leftover naraz z pominięciem semafora. Po powrocie do `running`: do **3** prób wznowienia **fazy** z trwałego stanu w DB (model B z `SPEC-SOCIAL.md` / `SPEC-CONTENT.md` — re-invoke właściwego BC po `taskType`, nie checkpointer).
4. Przed każdą próbą / przy klasyfikacji błędu: `isRetryable(...)` — retry m.in. dla recovery po crashu, timeoutów / rate-limit gateway (zgodnie z polityką); **bez** retry dla błędów walidacji, wyczerpanego refine verifiera, błędów konfiguracji klucza gateway itd. Cancel / `cancelRequested` **nie** jest retryable.
5. Po wyczerpaniu 3 prób (`recoveryAttempts >= 3`) → `failed` + czytelny wpis logu (powód recovery / exhausted); bez execute.
6. Run w `awaiting_hitl` po restarcie **pozostaje** `awaiting_hitl` — bez zużywania puli recovery i bez przejścia do `interrupted` (chyba że operator anuluje — R-11). HITL (`awaiting_hitl → running`) **nie** jest tym wymaganiem.
7. `cancelRequested` na już-terminalnym statusie (`completed` \| `failed` \| `cancelled`) — **ignorowane** przez recovery (flaga leftover po przegranym wyścigu cancel vs terminal; brak re-procesowania / nadpisu).

Zmiana względem wersji 3 / R-9: recovery wznawiało leftover `running` przez ponowne `execute` bez statusu `interrupted` i bez twardego capu na claim.

Zmiana względem wersji 17 / R-9: brak gałęzi `cancelRequested`. Od tej wersji leftover z flagą → `cancelled` bez zużycia `recoveryAttempts` (`docs/data_flow.md`).

R-10. Przegląd runu (po pipeline; **nie** HITL):

1. `userRating` na runie **zawsze istnieje**: `null` (autor nie zostawił gwiazdek) albo `1`…`5`. Domyślnie `null`.
2. Ocena, flaga edycji i finalize dozwolone wyłącznie gdy status `completed` **albo** `failed` (w tym przebieg z edycją outputu). **`cancelled` nie otwiera przeglądu** — **409** `RUN_NOT_REVIEWABLE`; `pipelineFinishedAt` przy `cancelled` i statusach nieterminalnych zawsze `null`. Inny status nieterminalny → ten sam kod.
3. Wyłącznie `startedBy` (sesja). Inna sesja → **403** `FORBIDDEN`.
4. Legalny transition → `completed` \| `failed` ustawia **`pipelineFinishedAt` raz** (nie nadpisywać przy kolejnych zapisach wiersza). Kotwica okna przeglądu.
5. Okno otwarte iff `reviewFinalizedAt === null` **oraz** `now < pipelineFinishedAt + REVIEW_TTL` (`REVIEW_TTL` — env, default `2h`, parser jak `INVITE_TTL`, fail-fast w `env.schema`; kanon env: `docs/deployment.md`).
6. W oknie: autor może wielokrotnie `PATCH .../rating` (w tym z powrotem na `null`) oraz wielokrotnie `POST .../output-edited` z body `{ result }` — zapis **zastępuje** kanoniczny wynik runu (klucze `result` właściwe dla `taskType`, kształt jak snapshot) **oraz** stawia `outputEdited: true` (flaga jednokierunkowa). Pipeline / graf **nie** startują. Kardynalność tablic i `sourceIdeaId` / `id` pozycji bez zmian (edycja treści, nie nowy zestaw id). `characterCount` = `body.length` po stronie api.
7. `POST .../finalize-review` (tylko w oknie) ustawia `reviewFinalizedAt`. Potem `PATCH` oceny i `POST` edycji → **409** `REVIEW_LOCKED`. Ponowne finalize → `REVIEW_LOCKED`.
8. Po TTL (`now ≥ pipelineFinishedAt + REVIEW_TTL`), gdy `reviewFinalizedAt` jeszcze `null`: mutacje rating / output-edited / finalize → **409** `REVIEW_LOCKED` **bez** UPDATE `reviewFinalizedAt` i **bez** zmiany `userRating` / `outputEdited` / `result`. Trwały lock w DB poza ręcznym finalize = **tylko sweeper** (pkt 9).
9. Sweeper auto-finalize (boot api **oraz** okresowo wg `REVIEW_SWEEP_INTERVAL`, default `5m`, ten sam styl stringa TTL): batch UPDATE `reviewFinalizedAt = pipelineFinishedAt + REVIEW_TTL` dla wierszy z `pipelineFinishedAt` ustawionym, `reviewFinalizedAt === null` i miniętym oknem. **Bez** zmiany `userRating` / `outputEdited` / `result`. **Bez** `DELETE` runu. Wyłączenie api **nie** przedłuża okna; boot domyka zaległe (także legacy po backfillu kotwicy — `SPEC-PERSISTENCE.md`).
10. Snapshot `GET /runs/:id` oraz **sukcesy** mutacji przeglądu niosą `pipelineFinishedAt` i wyliczone **`reviewExpiresAt`**: `null` gdy brak `pipelineFinishedAt` **albo** `reviewFinalizedAt !== null`; inaczej ISO (`pipelineFinishedAt + REVIEW_TTL`) — także **po** TTL, zanim sweeper zapisze lock. GET **bez** side-effectów (zakaz finalize / UPDATE przy odczycie). Lista `GET /runs/user/:userId` **bez** tych pól.
11. Finalize przy `userRating: null` jest legalne (świadomy brak gwiazdek), o ile okno otwarte.
12. TTL / auto-finalize przeglądu **nie** blokuje `POST /feedback` (`SPEC-FEEDBACK.md`).

Zmiana względem wersji 14 / R-10 (wcześniejszy pkt 4): `POST .../output-edited` tylko stawiało flagę i **nie** nadpisywało payloadu wyniku. Od tej wersji zapis edycji **jest** kanonicznym `result` (`docs/dokumentacja_komunikacji.md`, `docs/ux_dashboard.md`).

Zmiana względem wersji 17 / R-10: okno `completed` \| `failed` bez jawnego rozróżnienia od opinii na `cancelled`. Od tej wersji przegląd **nadal** tylko `completed` \| `failed`; opinia tekstowa na `cancelled`+wynik → `SPEC-FEEDBACK.md` Fbk-3a (nie ten wymóg).

Zmiana względem wersji 18 / R-10: przegląd otwarty do ręcznego finalize **bez limitu czasu**; `REVIEW_LOCKED` wyłącznie po `reviewFinalizedAt`. Od tej wersji okno = `pipelineFinishedAt` + `REVIEW_TTL`; mutacja po TTL = sam 409 bez CAS; sweeper (boot + interval) jedyny auto-zapis locka; `reviewExpiresAt` wyliczane; GET bez side-effect — `docs/dictionary.md`, `docs/data_flow.md`, `docs/dokumentacja_komunikacji.md`.

R-11. Anulowanie runu (`cancelled`) — Stop / decyzja operatora (**nie** błąd agenta, **nie** recovery):

1. Endpoint: `POST /api/v1/runs/:runId/cancel`, body **puste**, sesja cookie. Authz: wyłącznie `startedBy`. Inna sesja → **403** `FORBIDDEN`. Brak admin-cancel cudzego runu w MVP.
2. Durable guard: przed / w trakcie wyścigu z executorem api ustawia `cancelRequested` na runie (chroni crash między cancel a zapisem statusu — R-9).
3. Atomowy zapis statusu: port repozytorium `attemptCancel(id, cancelledAt): Promise<boolean>` (CAS) — warunkowy update tylko ze statusu nieterminalnego; przy wygranej: `status = cancelled`, `cancelledAt`, **zerowanie** `cancelRequested`. `true` = CAS wygrał; `false` przy statusie już `completed` \| `failed` → use-case → **409** `RUN_NOT_CANCELABLE`. Już `cancelled` → **200** + snapshot (**idempotencja**; bez ponownego abortu / logu cancel).
4. Odpowiedź HTTP **200** + snapshot (`status: cancelled`, `cancelledAt`) **nie czeka** na zwinięcie `execute` (zakaz await execute w requeście cancel).
5. Abort v1 in-process: po wygranej CAS worker (`InProcessRunWorker`) `requestCancel(runId)` → `AbortController.abort()`; `RunExecutorPort.execute` przyjmuje `AbortSignal`; klient HTTP do gateway przekazuje sygnał. Ograniczenie: wyłącznie in-process (jeden proces Node `apps/api`); abort na gateway / providerze **poza** v1.
6. Persist: **bez rollbacku** już zacommitowanego wyniku; hop w locie **nie** jest dopisywany po `cancelled`. Slot `MAX_CONCURRENT_RUNS`: HTTP cancel **nie** dekrementuje; zwalnia `finally` execute. Cancel `queued` / `awaiting_hitl` / `interrupted` nie zajmuje slotu execute.
7. Log: append-only wpis informacyjny, że run anulował użytkownik (`docs/observability.md`).
8. SSE: `run.status` → `run.cancelled` → complete huba (R-4a).
9. HITL po `cancelled` nielegalny (`POST .../hitl` — run nie jest w `awaiting_hitl`; jak docs komunikacji). Panel HITL w UI znika — `SPEC-FRONTEND.md`.
10. Resume / retry / „dokończ” na tym samym `runId` po `cancelled` — **zakazane**. Nowy przebieg = nowy `POST /runs`.

Źródło: `docs/dokumentacja_komunikacji.md`, `docs/data_flow.md`, `docs/architektura.md`, `docs/dictionary.md`.

R-12. **`GuestRunPolicy`** (tylko `role === guest` **i** `DEMO_MODE=true`; `admin`/`user` **omijają**):

1. Allowlista `taskType` na `POST /runs`: **`post_ideas`** ×1, **`page_copy`** ×1, **`page_outline_then_copy`** ×1 — **1 start danego typu na życie konta** (hardcoded; **nie** env). Inny typ → **403** `GUEST_TYPE_NOT_ALLOWED`.
2. Zużycie slotu: po **udanym create** `Run` w DB. COUNT = wszystkie runy `startedByUserId` + `taskType` **bez filtra statusu** (także `failed` / `cancelled` / `completed` / …). COUNT ≥ 1 → **403** `GUEST_TYPE_QUOTA_EXCEEDED`. HITL **bez** osobnego limitu.
3. Global cap: env `GUEST_GLOBAL_CAP_PER_DAY` (default **30**, walidowany); doba **UTC**; **wszystkie** starty guest na instancji. Redis INCR na `content-chain:guest:daily:runs:{UTC-date}`. Kolejność admit: **najpierw Redis**, **potem** create; **DECR** przy rollbacku gdy create się nie uda. Wyczerpany cap → **403** `GUEST_GLOBAL_QUOTA_EXCEEDED`. Pad Redis przy `POST /runs` guest → **fail closed**. `MAX_CONCURRENT_RUNS` + FIFO (R-6) **bez zmian** — **zakaz** drugiego semafora współbieżności „dla guest”.
4. HITL / cancel / detail / logs / events / SSE: guest **tylko** `startedBy === self`; cudze → **403**.
5. `POST .../output-edited` oraz `POST .../finalize-review`: guest → **403** (także na własnym runie).
6. `PATCH .../rating`: dozwolony na własnym runie (R-10 poza punktem 5) + soft limit env `GUEST_RATING_CAP_PER_DAY` (default **10**, walidowany); klucz Redis `content-chain:guest:daily:ratings:{userId}:{UTC-date}` → **429** + `message`. Pad Redis przy ratingu guest → **fail open** (ocena przechodzi). Tylko własny run.
7. Połączenie Redis (adapter guest quota): **`REDIS_HOST`+`REDIS_PORT`**; opcjonalne **`REDIS_PASSWORD`**. **Bez** `REDIS_URL`. Szczegóły env / sekret: `SPEC-BEZPIECZENSTWO.md` B-11, `docs/deployment.md`.

Zmiana względem wersji 19: brak osobnej polityki guest na starcie / odczycie. Od tej wersji R-12; R-6 **nie** unieważnione.
Zmiana względem wersji 20 / R-12: brak punktu o env połączenia Redis. Od tej wersji punkt 7 — `REDIS_PASSWORD` opcjonalne (HOST/PORT).
Zmiana względem wersji 21 / R-12.7: `REDIS_URL` **albo** HOST/PORT. Od tej wersji wyłącznie HOST/PORT + opcjonalne `REDIS_PASSWORD`.

## Norma implementacji

### Wzorce / struktura

```text
apps/api/src/runs/
├── runs.module.ts
├── run-lifecycle.module.ts
├── guest-quota.module.ts
├── runs.controller.ts           # list, snapshot, logs, events SSE, hitl, cancel, user/:userId, rating, output-edited, finalize
├── run-record.test-helpers.ts   # unit fixture; korzeń BC; nie adapter
├── http/                        # dto, pipe — bez zmian układu
├── application/
│   ├── lifecycle/               # kernel procesu (worker, abort, dispatch; nie use-case HTTP)
│   ├── guest/                   # GuestRunPolicy
│   └── …                        # *use-case*, schemy, composite reader — płasko
├── domain/                      # status transitions, isRetryable, porty (w tym attemptCancel); SocialBrief / ContentBrief; RunRecord unia taskType
└── infrastructure/
    ├── persistence/             # Prisma run/log/output-edited + mapowania wiersza
    ├── sse/                     # hub SSE / subject
    ├── quota/                   # Redis guest + adapter niedostępności
    └── dispatch/                # stub executor (I/O test/fallback pod port)
```

Zmiana względem wersji 23 / drzewo: wcześniej płaskie `infrastructure/` (Prisma + SSE w jednym komentarzu) oraz płaskie `application/` (kernel + use-case’y razem). Od tej wersji podkatalogi po granicy I/O (`persistence/` / `sse/` / `quota/` / `dispatch/`) oraz kernel w `application/lifecycle/` + polityka w `application/guest/` — `docs/architektura_katalogi_pliki.md`. Semantyka HTTP / guest / review / portów **bez zmian**.

Wolno wydzielić kernel Nest (lifecycle + repo + hub) od HTTP/workera **w tym samym** BC, gdy zamyka to cykl importów. To nie nowy bounded context.

| Element | Norma |
|---------|--------|
| Kolejka | Stan w DB (`queued` / `interrupted` / `running`); semafor współbieżności w procesie api |
| SSE | Nest `@Sse()`; subskrypcja po `runId`; auth jak API; **complete + evikcja** subjectu po `completed`/`failed`/`cancelled` (R-4a) |
| Anulowanie | `attemptCancel` (CAS) + `cancelRequested` + abort in-process (R-11); HTTP **nie** awaituje execute |
| Licznik recovery | Pole / metadane runu (np. `recoveryAttempts`), cap = 3; cancel **nie** zużywa |
| Idempotencja HITL | Tylko ze statusu `awaiting_hitl` |
| Przegląd | `userRating` + kanoniczny wynik po Edytuj + `outputEdited` + `reviewFinalizedAt` + `pipelineFinishedAt`; okno `REVIEW_TTL`; mutacja po TTL = 409 bez UPDATE locka; sweeper boot+interval; **bez** `cancelled` |
| Port lifecycle | Token + interfejs `appendLog` + `transition` w `domain/`; graf zależy od portu, nie od klasy `RunLifecycleService` |
| Port executor | Token `RunExecutorPort` w Runs; **composite** w kleju wpinający Social i Content; **binding w `AppModule` / `registerAsync`**; `execute` z `AbortSignal` |
| Odczyt snapshotu `result`/`hitl` | Composite reader; **zakaz** wstrzykiwania store Social/Content do use-case’u Runs przez `imports: [SocialModule]` / `ContentModule` |
| Lokalizacja I/O / kernel | Hub SSE = `infrastructure/sse/`; Prisma run/log/output-edited + mapowania wiersza = `infrastructure/persistence/`; Redis guest quota = `infrastructure/quota/`; stub dispatch = `infrastructure/dispatch/`; kernel worker/abort/dispatch = `application/lifecycle/`; `GuestRunPolicy` = `application/guest/` |

Zmiana względem wersji 6 / drzewo `domain/`: wcześniej porty bez rozróżnienia lifecycle vs executor vs reader; binding executora nie był unormowany (feature plan Fazy 4 wstawiał `forwardRef`).

### Wolno

- Po `POST /runs` od razu `running`, jeśli jest wolny slot; w przeciwnym razie `queued`.
- Przy starcie api uruchomić use-case recovery (`running` → `interrupted` / `failed`) przed podejmowaniem nowych `queued`.
- Przy starcie api (boot) oraz okresowo wg `REVIEW_SWEEP_INTERVAL` uruchomić sweeper auto-finalize wygasłych przeglądów (R-10 pkt 9); boot **zawsze** raz niezależnie od interwału.
- Claim `interrupted → running` pod tym samym capem co `queued`; priorytet `interrupted` w drain.
- Emitować SSE przy każdym udanym `appendLog` i każdej legalnej zmianie statusu (w tym do/z `interrupted`).
- Domykać i usuwać subject huba wyłącznie po `completed` / `failed` / `cancelled` (R-4a).
- `POST .../cancel` z **200** od razu po wygranej CAS (lub idempotencji); abort hopu w tle (R-11).
- Ustawiać `cancelRequested` jako durable guard; zerować przy udanym `attemptCancel`.
- Leftover z `cancelRequested` finalizować do `cancelled` na bootcie (R-9).
- `startedBy` nullable wyłącznie dla historycznych / pre-auth przebiegów testowych; po domknięciu auth na api nowe runy zawsze z inicjatorem.
- Trzymać `userRating: null` jako jawny brak oceny (nie pomijać pola w snapshotcie).
- Ustawiać `pipelineFinishedAt` raz przy transition → `completed` \| `failed`; wyliczać `reviewExpiresAt` w snapshotcie i sukcesach mutacji przeglądu (R-10).
- Zapis edycji wyniku przez `POST .../output-edited` (nadpis store wyniku Social/Content przez porty odczytu/zapisu wyniku — **nie** przez graf).
- `RunsModule.registerAsync` (lub równoważny klej w `AppModule`) wpinające **composite** `RunExecutorPort` (Social + Content) — bez `forwardRef`.
- Domyślną (pustą) implementację portu odczytu wyniku w `infrastructure/persistence/`, podmienianą w kleju na composite reader.
- Podkatalogi I/O w `infrastructure/` (`persistence/` / `sse/` / `quota/` / `dispatch/`) oraz kernel w `application/lifecycle/` + `GuestRunPolicy` w `application/guest/` — gdy warstwa miesza granice I/O / kernel vs use-case.
- Trzymać `SocialBrief` / `ContentBrief` w `runs/domain/run.types.ts` (payload Run, nie shared kernel).
- Importować `parseWithZod` z `apps/api/src/shared/parse-with-zod.ts` dla walidacji komend application (start / HITL / id) — bez lokalnej kopii w `runs/application/`.
- Admit Redis **przed** create dla guest (R-12); DECR przy rollbacku create.

### Nie wolno

- `helpers/` / `adapters/` / `mappers/` jako kanonu warstw Runs; mapperów wiersza Prisma poza `infrastructure/persistence/`.
- Przenoszenia portów z `domain/` do `infrastructure/`.
- Pollingu statusu runu jako live.
- `complete` subjectu SSE na `awaiting_hitl` albo `interrupted`.
- Utożsamiania `cancelled` z `failed` / `interrupted` / LangGraph `interrupt()`.
- Resume / retry / wyjść z `cancelled` na tym samym `runId`.
- Rollbacku wyniku po cancel; await execute w requeście HTTP cancel.
- Admin-cancel cudzego runu; cancel bez authz `startedBy`.
- Mapy Subject bez evikcji po terminalu (wpis na zawsze w singletonie procesu).
- Subjectu bez TTL automatu ewikcji — zombie Subject przy hung/crashed runie powoduje memory leak i głodzi file descriptory.
- Hardkodowania wartości `SSE_HEARTBEAT_MS` i `RUN_SSE_SUBJECT_TTL_MS` w kodzie (env z walidacją Zod).
- Traktowania stdout jako jedynego źródła przebiegu dla UI.
- Mylenia `/metrics` z logami runu.
- Niedozwolonych skoków statusów.
- Spawnu procesu per run; always-on worker process w MVP.
- Limitu współbieżności **per-user w MVP** (obowiązuje wyłącznie globalny `MAX_CONCURRENT_RUNS` na execute). Refaktor per-user = **V1 — rozbudowa** (`docs/dictionary.md`, `post-mvp-plan.md`) — nie ten SPEC jako zakaz V1.
- Checkpoinetera LangGraph jako mechanizmu recovery Runs.
- `running → queued` jako recovery.
- Startu wszystkich leftover `running` execute ponad `MAX_CONCURRENT_RUNS` (burst recovery).
- Tworzenia `interrupted` z HTTP (`POST /runs`, HITL).
- Wycieku sekretów do `run.log`.
- Listy tylko „moje runy” jako **jedynego** trybu MVP (norma: archiwum instancji `GET /runs` **oraz** `GET /runs/user/:userId`). UI Runy filtruje terminalne; API bez `status` nadal zwraca całą instancję.
- Zmiennego `pageSize` / dowolnego `limit` z query na `GET /runs` w MVP (stałe 10). `GET /runs/user/:userId` jest **osobnym** wyjątkiem bez paginacji HTTP — nie mylić z R-3a **ani** z paginacją UI „Moje runy” (FE, `SPEC-FRONTEND.md`).
- Oceny / edycji wyniku / finalize na runie obcego `startedBy`.
- Zmiany `userRating` / treści wyniku / `outputEdited` po `reviewFinalizedAt` **albo** po minięciu `REVIEW_TTL` (produktowo locked — R-10).
- UPDATE `reviewFinalizedAt` przy mutacji po TTL (lock w DB poza ręcznym finalize = wyłącznie sweeper).
- Finalize / UPDATE `reviewFinalizedAt` przy GET snapshot (zakaz side-effect — R-10 pkt 10).
- Timera in-memory / `setTimeout` per run jako „TTL przeglądu” (obowiązuje kotwica DB + sweeper).
- TTL od `createdAt` startu runu albo bieżącego `updatedAt` jako kotwicy okna po wdrożeniu (kotwica = `pipelineFinishedAt`; `updatedAt` tylko jednorazowy backfill — `SPEC-PERSISTENCE.md`).
- `DELETE` runu / wyniku w ramach auto-finalize.
- Mylenia finalize / Edytuj z HITL.
- Re-invoke grafu Social / Content przy zapisie edycji.
- Zmiany `sourceIdeaId` albo liczby pozycji tablic wyniku przy Edytuj.
- Umieszczania opinii tekstowych w tym BC (to `SPEC-FEEDBACK.md`).
- `forwardRef` między `RunsModule` a modułem grafu (Social / Content / przyszły Mail).
- Importu `SocialModule` albo `ContentModule` z `RunsModule` jako sposobu na `RUN_EXECUTOR` albo snapshot `result`.
- Self-register grafów (`OnModuleInit` → rejestr) jako wymogu MVP.
- Cichego no-op przy nieznanym `taskType` w composite (obowiązuje `UNKNOWN_TASK_TYPE` + `failed`).
- Resume HITL `page_outline_then_copy` przy `selectedIdeaIds` innym niż `[outline.id]` (obowiązuje **400** `HITL_INVALID_SELECTION`; status zostaje `awaiting_hitl`).
- Resume HITL Social dwuetapowy przy `selectedIdeaIds` pustym, z duplikatami albo id spoza draftu / `hitl.options` (obowiązuje **400** `HITL_INVALID_SELECTION`; status zostaje `awaiting_hitl`). **2+ legalne** id ⊆ options **nie** jest błędem.
- Aliasu `result.content` = `contents[0]` (ani `reelScript` = `reelScripts[0]`) na dwuetapowym Social po fazie 2 — skalar = `null`.
- Przyjęcia `selectedIdeaIds` na `POST /runs` dla `page_*`.
- Eksportu tokenu `RUN_EXECUTOR` z modułu Social **po to**, by Runs musiał ten moduł zaimportować.
- `@Global()` na BC grafu albo na całym Runs jako ukrycia cyklu.
- Zależności grafu od **klasy** `RunLifecycleService` zamiast portu (token + interfejs `appendLog` / `transition`).
- Umieszczania portu lifecycle / executora w `packages/shared`.
- Umieszczania `SocialBrief` / `ContentBrief` w `packages/shared` albo `apps/api/src/shared/` (M-8; `docs/brand_types.md`).
- Płaskiego `RunBrief` (jeden kształt SM) jako jedynego typu `Run.brief` / `StartRunCommand.brief`.
- Drugiego limitu współbieżności execute „dla guest” (obowiązuje R-6 + R-12 Redis cap).
- Tabeli slotów guest w DB (COUNT z `Run`; Redis tylko cap dzienny).
- Fail open Redis na `POST /runs` guest; fail closed Redis na rating guest (odwrotnie: start = closed, rating = open).
- Output-edited / finalize dla `guest`; detail/HITL/cancel/SSE cudzego runu dla `guest`.

Zmiana względem wersji 10 / „Nie wolno”: dopisano zakaz jednego `RunBrief` i `as` na JSON briefu (`docs/dokumentacja_komunikacji.md`).
Zmiana względem wersji 13 / „Nie wolno”: zakaz `length !== 1` na Social zastąpiony zakazem pustej / duplikat / obcy id; dopisano zakaz aliasu skalar = `contents[0]`.
Zmiana względem wersji 14 / „Nie wolno”: Edytuj nie mogło nadpisywać `result`; od tej wersji zakaz dotyczy re-invoke grafu oraz zmiany `sourceIdeaId` / kardynalności — persist treści jest w R-10.
Zmiana względem wersji 18 / „Nie wolno”: brak zakazów TTL / sweeper / GET side-effect. Od tej wersji R-10 z limitem czasu i lockiem tylko przez sweeper.

### Zatwierdzony stack (obszar)

| Element | Status |
|---------|--------|
| BC Runs + porty używane przez Social i Content | obowiązkowe |
| Port lifecycle + binding composite `RunExecutorPort` w kleju procesu (bez cyklu Nest) | obowiązkowe |
| Append-only logi w DB + SSE Nest | obowiązkowe |
| Hub SSE: `complete` + evikcja subjectu po `completed`/`failed`/`cancelled` (R-4a) | obowiązkowe |
| `RUN_SSE_SUBJECT_TTL_MS` (env, default `600_000`) — TTL automatu ewikcji Subject | obowiązkowe |
| `SSE_HEARTBEAT_MS` (env, default `25_000`) — interwał keep-alive SSE | obowiązkowe |
| In-process worker + `MAX_CONCURRENT_RUNS` (default 3) + `AbortController` per run (R-11) | obowiązkowe |
| Anulowanie: `POST .../cancel`, `attemptCancel`, `cancelRequested`, `cancelledAt` (R-11) | obowiązkowe w MVP |
| Recovery: leftover `running` → `interrupted` → claim pod capem; leftover + `cancelRequested` → `cancelled`; max 3 × `isRetryable` → `failed` | obowiązkowe |
| Pola przeglądu `userRating` / `outputEdited` / `reviewFinalizedAt` / `pipelineFinishedAt` + wyliczone `reviewExpiresAt` + zapis kanonicznego `result` przy Edytuj + `GET /runs/user/:userId` | obowiązkowe w **MVP** (fundament zapisu) |
| `REVIEW_TTL` (default `2h`) + `REVIEW_SWEEP_INTERVAL` (default `5m`) + sweeper boot+okresowy (R-10) | obowiązkowe w **MVP** |
| Osobny worker process / per-user limit / TTL logów | poza MVP |
| Abort na gateway / providerze LLM; admin cancel; resume po cancel; rollback wyniku | poza v1 / poza MVP |
| Self-register grafów / `@Global()` na BC grafu jako klej | poza MVP (i zakazane jako obejście cyklu) |
| Stopień edycji outputu / zmiana oceny po finalize; HITL TTL; multi-instance sweeper / distributed lock | poza MVP |

## Kryteria akceptacji

- [ ] Nielegalne przejście statusu jest odrzucane.
- [ ] Logi rosną tylko przez append; GET logs zwraca historię; SSE dostarcza przyrosty.
- [ ] Po `completed`/`failed`/`cancelled` hub nie zatrzymuje subjectu danego `runId`; `awaiting_hitl` / `interrupted` nie evikują subjectu; przy cancelu kolejność `run.status` → `run.cancelled` → complete.
- [ ] `GET /runs` zwraca listę instancji z paginacją 10, sortem `createdAt` desc, filtrami i `startedBy`; archiwum UI filtruje `completed,failed,cancelled`.
- [ ] `GET /runs/user/:userId` zwraca wszystkie runy sesji; cudzy id → 403.
- [ ] Snapshot zawiera `userRating` (`null` \| 1–5), `outputEdited`, `reviewFinalizedAt`, `pipelineFinishedAt`, `reviewExpiresAt`, `cancelledAt` (`null` \| ISO8601).
- [ ] Ocena i Edytuj (zapis treści + flaga) działają na `completed` i `failed` tylko dla autora w oknie TTL; na `cancelled` → `RUN_NOT_REVIEWABLE`; po finalize **albo** po TTL → `REVIEW_LOCKED` (po samym TTL **bez** UPDATE `reviewFinalizedAt`); GET snapshot po Edytuj zwraca treść użytkownika; GET **nie** ustawia finalize.
- [ ] Transition → `completed`/`failed` ustawia `pipelineFinishedAt` raz; sweeper (boot / interval) ustawia `reviewFinalizedAt = pipelineFinishedAt + REVIEW_TTL` dla zaległych; restart api nie odmraża wygasłego przeglądu.
- [ ] `POST .../cancel`: `startedBy` → 200 + `cancelled` (+ idempotencja); obcy → 403; `completed`/`failed` → 409 `RUN_NOT_CANCELABLE`; HTTP nie awaituje execute; abort in-process po CAS.
- [ ] Przy zajętych slotach nowy run jest `queued` i startuje po zwolnieniu slotu (globalny limit, default 3); `interrupted` ma priorytet nad `queued`.
- [ ] Po restarcie api: `awaiting_hitl` bez zmian; leftover `running` bez flagi → `interrupted` (claim pod `MAX_CONCURRENT_RUNS`); leftover `running`/`interrupted` **z** `cancelRequested` → `cancelled` (bez `recoveryAttempts++`); po 3 przerwanych execute → `failed` z logiem. N leftover przy `MAX=1` → jeden execute naraz, reszta zostaje `interrupted`.
- [ ] HITL po `cancelled` odrzucony; flaga `cancelRequested` na już-terminalnym ignorowana.
- [ ] Social / Content nie emitują SSE omijając Runs.
- [ ] `/metrics` nie jest używane jako podgląd przebiegu runu.
- [ ] Brak cyklu Nest Runs ↔ Social / Content; worker dostaje composite executor z kleju.
- [ ] `POST /runs` z `page_*` bez `platform` i z `contentKind` → 202; page + `platform: linkedin` → 400; `taskType` spoza enumu → 400.
- [ ] HITL `page_outline_then_copy` z id ≠ `outline.id` → 400 `HITL_INVALID_SELECTION`; run zostaje `awaiting_hitl`.
- [ ] HITL Social (`post_ideas_then_content` / `reel_ideas_then_scripts`): 0 id / duplikat / obcy id → 400 `HITL_INVALID_SELECTION`; K≥1 legalnych ⊆ options → K artefaktów (`contents[]` / `reelScripts[]`); 1 id → tablica długości 1. Page HITL bez zmian.
- [ ] Snapshot: brak `characterCount` w starym JSON → mapper ustawia `body.length`; brak `cta` / `role` nie crashuje readera; dwuetapowy po fazie 2: `contents` / `reelScripts` + `sourceIdeaId`, skalar `content` / `reelScript` = `null`.
- [ ] `guest` (demo on): lista `GET /runs` = instancja; detail/HITL/cancel cudzy → 403; drugi start tego samego allowlist typu → `GUEST_TYPE_QUOTA_EXCEEDED`; Redis admit przed create; output-edited/finalize → 403; rating ponad soft cap → 429.

## Poza zakresem

- Animacje / EventSource UI / Stop + modal → `SPEC-FRONTEND.md`.
- Pełny zestaw metryk Prometheus i OTel → docs observability / `SPEC-BEZPIECZENSTWO.md`.
- Publikacja draftów na API portali SM (v2).
- Osobny always-on worker process, broker kolejek (Redis itd.).
- Checkpointer LangGraph.
- Limit współbieżności per użytkownik.
- Abort na `apps/ai-provider-gateway` / providerze; admin cancel; `reason` w body cancel; resume / rollback.
- Panel odczytu ocen / analityka (V1 — rozbudowa).
- TTL / auto-akcja dla `awaiting_hitl`; blokada `POST /feedback` po TTL przeglądu; `reviewFinalizedBy`; multi-instance api / distributed lock sweepera.
- Opinie tekstowe → `SPEC-FEEDBACK.md`.
