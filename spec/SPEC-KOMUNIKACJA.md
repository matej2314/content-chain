---
wersja: 27
data_utworzenia: 2026-08-11
data_modyfikacji: 2026-09-30
---

# SPEC — Komunikacja (HTTP / SSE / gateway)

## Cel / zakres względem dokumentacji

Norma **implementacji obu powierzchni I/O** Content Chain:

1. HTTP API + SSE `apps/api` (konsumenci: `apps/frontend`, Postman),
2. klient `apps/api` → `apps/ai-provider-gateway` (natywny chat).

Uszczegóławia `docs/dokumentacja_komunikacji.md` oraz korelację ID z `docs/brand_types.md` / `docs/dictionary.md`. **Nie** redefiniuje listy endpointów ani payloadów — odwołuje się do docs; tu obowiązują wzorce warstw, walidacja, envelope, SSE i adapter LLM.

Zmiana względem wersji 23 / cel: dopisano konsumpcję `run.completed` / `run.failed` w dashboardzie (toast). **Bez** nowych kodów HTTP, eventów SSE i endpointów.

Zmiana względem wersji 24 / cel: brak `POST .../cancel` i `run.cancelled`. Od tej wersji trzeci terminal SSE + kod `RUN_NOT_CANCELABLE` — skrót egzekwowalny; pełne payloady w docs.

Zmiana względem wersji 26 / cel: snapshot / mutacje przeglądu bez pól TTL. Od tej wersji `pipelineFinishedAt` + wyliczone `reviewExpiresAt`; mutacja po TTL → `REVIEW_LOCKED` bez side-effect zapisu locka; **bez** nowego eventu SSE auto-finalize.

## Powiązanie ze stylem z docs

Wiążące (`docs/architektura.md`):

- cienkie controllery Nest (walidacja wejścia, mapowanie HTTP, authz) → application / use-case → domain + porty;
- async run: HTTP **nie** blokuje na cały pipeline LLM;
- live status wyłącznie **SSE**; GET = snapshot / health / metrics;
- LLM wyłącznie przez **port** + adapter HTTP do gateway.

**Wyjątek względem stylu globalnego:** brak.

## Powierzchnie (skrót)

| Powierzchnia | Prefiks / ścieżka | Format |
|--------------|-------------------|--------|
| Publiczne API CC | `/api/v1` | JSON |
| Lista runów | `GET /api/v1/runs` | JSON (paginacja stała 10) |
| Runy użytkownika (select opinii + Konto) | `GET /api/v1/runs/user/:userId` | JSON (wszystkie, bez pageSize=10) |
| Live run | `GET /api/v1/runs/:runId/events` | SSE (`text/event-stream`) |
| Anulowanie runu | `POST /api/v1/runs/:runId/cancel` | JSON (body puste; snapshot) |
| Opinia tekstowa | `POST /api/v1/feedback` | JSON (zapis MVP) |
| Ops metrics | `GET /metrics` (poza `/api/v1`) | Prometheus text |
| DX OpenAPI (Swagger UI) | `GET /docs` (poza `/api/v1`) | HTML / OpenAPI JSON |
| Health | `GET /api/v1/health` | JSON |
| Auth probe / bootstrap status / własny email | `GET /api/v1/auth/me`, `PATCH /api/v1/auth/me/email`, `GET /api/v1/auth/bootstrap-status` | JSON |
| Zaproszenia (admin) | `GET`/`POST /api/v1/invitations`, `POST .../:id/resend`, `DELETE .../:id` | JSON |
| Akceptacja zaproszenia (publiczny) | `POST /api/v1/auth/accept-invite` | JSON |
| Gateway (z api) | upstream `/api/v1/chat` (+ opcjonalnie stream) | JSON / SSE gateway |

MVP: **wyłącznie** `/api/v1` jako prefiks produktowy — bez `/api/v2`. Swagger **nie** pod `/api` (kolizja z `/api/v1`) — norma: `/docs` (`docs/dokumentacja_komunikacji.md`).

Szczegóły metod, pól i kodów: `docs/dokumentacja_komunikacji.md`.

Zmiana względem wersji 16 / powierzchnie: dopisano zaproszenia (admin) i publiczny `POST /auth/accept-invite`; envelope **503** `MAIL_DELIVERY_FAILED` + `details.id` (K-1) — bez dublowania pełnych payloadów.

## Wymagania (egzekwowalne)

K-1. Każda odpowiedź błędu HTTP z `apps/api` ma envelope:

```json
{
  "code": "CONTEXT_INCOMPLETE",
  "message": "…",
  "requestId": "req_<uuid>",
  "details": []
}
```

`requestId` nadaje **`apps/api`** w ramach obsługi tego żądania (middleware / interceptor) i zwraca w envelope oraz (zalecane) nagłówku `x-request-id`. Klient **nie musi** przysyłać `RequestId`.

**503** `MAIL_DELIVERY_FAILED` (pad SMTP po zapisie zaproszenia / resend): ten sam envelope K-1; w `details` wyłącznie `id` zaproszenia. Pełny kontrakt HTTP (201 vs 503, pola, negatywy) — `docs/dokumentacja_komunikacji.md` (bez dublowania payloadów tutaj).

K-2. Start runu (`POST /api/v1/runs`) zwraca **202** z `runId`, `conversationId` i statusem `queued` | `running` — bez synchronicznego czekania na wynik LLM. `interrupted` **nie** jest statusem odpowiedzi POST. Body: unia dyskryminowana `taskType` (`platform` XOR `contentKind` **oraz** kształt `brief` XOR: `SocialBrief` vs `ContentBrief`) — `docs/dokumentacja_komunikacji.md`. Walidacja Zod `discriminatedUnion` w application + `.strict()` na gałęzi briefu. DTO HTTP może deklarować sumę kluczy briefu (`topic`, `audience`, `goal`, `ideaCount`, `angle`, `targetLength`); prawda = Zod. `taskType` spoza enumu → **400** `VALIDATION_FAILED`. Page + `brief.ideaCount` / Social + `brief.angle` → **400** `VALIDATION_FAILED`.

K-2a. `GET /api/v1/runs` realizuje listing kolekcji wg docs (instancja, `pageSize=10`, filtry w tym `taskType` i `platform=web`, `startedBy`) — norma dziedzinowa w `SPEC-RUNY.md`. Query `status`: **jeden** `RunStatus` **albo** lista unikalnych wartości rozdzielona przecinkiem (archiwum UI: `completed,failed,cancelled`). Brak parametru = wszystkie statusy. Nieznana wartość → **400** `VALIDATION_FAILED`.

Zmiana względem wersji 21 / K-2a: `status` wyłącznie jako pojedynczy enum.

Zmiana względem wersji 24 / K-2a: archiwum UI `completed,failed`. Od tej wersji `completed,failed,cancelled`.

K-2c. Snapshot `GET /runs/:id` — `brief` w kształcie zapisanym (unia); `result` addytywny: `ideas`, `content`, `contents`, `reelIdeas`, `reelScript`, `reelScripts`, `pageOutline`, `pageDocument`; meta m.in. **`cancelledAt`** (`null` \| ISO8601), **`pipelineFinishedAt`** (`null` \| ISO8601), **`reviewExpiresAt`** (wyliczane: `null` \| ISO8601 — semantyka `SPEC-RUNY.md` R-10 / `docs/dictionary.md`). HITL `options` zależne od `taskType`. Dwuetapowy Social po fazie 2: kanon tablic `contents[]` / `reelScripts[]` + `sourceIdeaId`; skalar `content` / `reelScript` = `null` (`docs/dokumentacja_komunikacji.md`). GET **bez** side-effectów (zakaz finalize / UPDATE przy odczycie). Sukcesy mutacji przeglądu (`PATCH .../rating`, `POST .../output-edited`, `POST .../finalize-review`) niosą te same pola meta TTL co snapshot. Lista `GET /runs/user/:userId` **bez** `pipelineFinishedAt` / `reviewExpiresAt`.

Zmiana względem wersji 12 / K-2: unia startu dotyczyła `platform` XOR `contentKind` przy jednym obiekcie briefu SM. Od tej wersji Zod rozdziela `socialBriefSchema` / `contentBriefSchema` (`SPEC-RUNY.md` R-3d).

Zmiana względem wersji 10: unia startu (K-2), listing `platform=web` / nowe `taskType` (K-2a), snapshot addytywny (K-2c).

Zmiana względem wersji 15 / K-2c: enumeracja `result` bez `contents` / `reelScripts`; skalar na then_* udawał 1:1.

Zmiana względem wersji 26 / K-2c: snapshot bez pól TTL / bez normy GET bez side-effect. Od tej wersji `pipelineFinishedAt` + `reviewExpiresAt` + 4a.

K-2b. `GET /api/v1/runs/user/:userId` — lista wszystkich runów autora: select opinii **oraz** „Moje runy” na Koncie (live) (`SPEC-RUNY.md` R-3c, `docs/ux_dashboard.md`). W formularzu opinii UI filtruje `completed` \| `failed` \| (`cancelled` **z** wynikiem — Fbk-3a); lista Konta pokazuje wszystkie statusy. `POST /api/v1/feedback` — zapis opinii (`SPEC-FEEDBACK.md`): przy `targetType=run` okno `completed` \| `failed` \| (`cancelled` **oraz** istnieje wynik); inaczej **409** `RUN_NOT_REVIEWABLE` (Fbk-3a). Ocena / **zapis edycji wyniku** (`POST .../output-edited` z `{ result }`) / finalize — wyłącznie `completed` \| `failed` **oraz** w oknie `REVIEW_TTL` (`SPEC-RUNY.md` R-10); `cancelled` → **409** `RUN_NOT_REVIEWABLE`; po finalize **albo** po TTL → **409** `REVIEW_LOCKED` (**bez** side-effect UPDATE `reviewFinalizedAt` przy samym TTL — lock w DB = sweeper). Payloady w `docs/dokumentacja_komunikacji.md`. Env okna / sweepera: `REVIEW_TTL`, `REVIEW_SWEEP_INTERVAL` — `docs/deployment.md` (ten SPEC nie redefiniuje tabeli env).

Zmiana względem wersji 19 / K-2b: endpoint user-runs tylko pod select opinii. Od tej wersji także lista Konta; dopisano K-2d.

Zmiana względem wersji 18 / K-2b: `output-edited` było wyłącznie flagą. Od tej wersji body niesie `result` i api **zastępuje** kanoniczny wynik.

Zmiana względem wersji 17 / K-2b: `POST /feedback` `targetType=run` nie miał bramki statusu (tylko Fbk-3: autor). Od tej wersji to samo okno co R-10 (`completed` \| `failed`), bez locka finalize na tekście.

Zmiana względem wersji 24 / K-2b: okno opinii = tylko `completed` \| `failed` (tożsamość z R-10). Od tej wersji opinia obejmuje też `cancelled`+wynik (Fbk-3a); przegląd pozostaje bez `cancelled`. Dopisano K-2e (HTTP cancel).

Zmiana względem wersji 26 / K-2b: przegląd bez limitu czasu / `REVIEW_LOCKED` tylko po finalize. Od tej wersji okno TTL + mutacja po TTL bez CAS.

K-2d. `PATCH /api/v1/auth/me/email` — body `{ email, currentPassword }`; re-auth + zmiana własnego emaila (sesja); **400** (zły kształt / pusty `currentPassword`); **401** `UNAUTHORIZED` (brak sesji); **401** `INVALID_PASSWORD` (`Invalid password`); **409** `CONFLICT` gdy zajęty (po re-auth). **Bez** mutacji na `PATCH /auth/me`. Nie `PATCH /users/:id`. `SPEC-AUTH.md` A-3b.

Zmiana względem wcześniejszego K-2d: trasa `PATCH /auth/me` (z lub bez `currentPassword`) / złe hasło jako `UNAUTHORIZED`.

K-2e. `POST /api/v1/runs/:runId/cancel` — body puste; sesja cookie. Authz `startedBy` (inaczej **403** `FORBIDDEN`). Odpowiedzi: **200** + snapshot (`status: cancelled`, `cancelledAt`) przy pierwszym legalnym cancelu **oraz** gdy run już `cancelled` (idempotencja); **404**; **409** `RUN_NOT_CANCELABLE` gdy status już `completed` \| `failed`. **200 nie czeka** na zwinięcie execute. Semantyka CAS / abort / recovery — `SPEC-RUNY.md` R-11. Pełny kontrakt: `docs/dokumentacja_komunikacji.md`.

Zmiana względem wersji 4: dopisano fundament zapisu feedbacku (wcześniej tylko listing dashboardu).

Zmiana względem wersji 2: dopisano obowiązek listingu kolekcji runów pod FE (wcześniej tylko POST + GET by id / SSE).

K-3. Live postęp runu (status, logi przyrostowe, HITL, completed/failed/**cancelled**) idzie wyłącznie przez **SSE** `GET /api/v1/runs/:runId/events`. Zdarzenia i statusy jak w docs komunikacji — `run.status` może nieść `interrupted` / `cancelled`; event terminalny cancelu: **`run.cancelled`** `{ runId }`. Dashboard **może** zareagować na `run.completed` / `run.failed` / **`run.cancelled`** toasteem wg `SPEC-FRONTEND.md` / `docs/ux_dashboard.md` (dedup względem toasta mutacji cancel); to **nie** jest polling. Cancel **nie** wprowadza pollingu jako live. Źródło prawdy statusu i powodu po reloadzie: GET run / GET logs — nie pamięć toasta. Payload `run.failed` `{ code?, message }` **nie** zastępuje `run.log` (`SPEC-RUNY.md` R-2). **Brak** nowego eventu SSE dla auto-finalize przeglądu (UI odświeża stan z GET / mutacji — `SPEC-RUNY.md` R-10).

Zmiana względem wersji 5: zbiór statusów SSE / filtra listy rozszerzony o `interrupted`; K-2 (POST `queued` \| `running`) **bez** zmiany statusów startowych.

Zmiana względem wersji 23 / K-3: K-3 milczało o konsumpcji UI poza widokiem szczegółów. Payloady eventów i kody HTTP **bez zmian**.

Zmiana względem wersji 24 / K-3: terminal SSE bez `run.cancelled`. Od tej wersji trzeci event terminalny + toast UI z dedupem.

K-3a. Koniec strumienia SSE: po wyemitowaniu `run.completed` albo `run.failed` albo **`run.cancelled`** handler **kończy** `Observable` (Nest zamyka response). Przy cancelu kolejność: `run.status` (`status: cancelled`) → `run.cancelled` → complete. Subskrypcja przy snapshotcie już `completed` \| `failed` \| `cancelled`: `run.status` z **najnowszego** odczytu z DB (drugi `getRun.execute` przed `subscribe`), potem complete — bez zostawiania subjectu na zawsze (late-join jak inne terminale). Stream **nie** kończy się na `awaiting_hitl` ani `interrupted`. Reconnect klienta tylko po nieoczekiwanym zerwaniu przy statusie nieterminalnym — kontrakt w `docs/dokumentacja_komunikacji.md`. Toast dashboardu **nie** zmienia K-3a (serwer i tak kończy Observable; klient i tak `close()` — `SPEC-FRONTEND.md` F-5a).

Zmiana względem wersji 6 / K-3: K-3 wymieniało eventy completed/failed jako treść live, bez normy zamknięcia połączenia HTTP ani late-join na skończonym runie.

Zmiana względem wersji 24 / K-3a: koniec SSE tylko na `completed` \| `failed`. Od tej wersji także `cancelled`.

K-3b. Heartbeat keep-alive i TTL Subject:

1. Handler `@Sse()` **merguje** live Observable ze strumieniem `interval(SSE_HEARTBEAT_MS)` emitującym `{ type: 'heartbeat', data: '' }`. Klient **ignoruje** tę wartość. Heartbeat **nie** jest emitowany w ścieżce `of(snapshot)` (terminal late-join) — wyłącznie przy otwartym połączeniu live.
2. Subject w `InMemoryRunSseHub` otworzony przez `subscribe()` jest domykany z błędem i usuwany z mapy po `RUN_SSE_SUBJECT_TTL_MS`. Timer musi mieć `timer.unref()`.
3. Wartości `SSE_HEARTBEAT_MS` (default `25_000`) i `RUN_SSE_SUBJECT_TTL_MS` (default `600_000`) są walidowane przez Zod w `env.schema.ts`. Zakaz hardkodowania.

Zmiana względem wersji 7: dopisano K-3b (heartbeat + TTL Subject — ochrona przed zombie Subject przy hung runie i przed ciszą TCP przy długich runach).

K-4. Auth SSE = ta sama sesja co API: cookie httpOnly **`cc_access`** / **`cc_refresh`** (`SPEC-AUTH.md`). Produktowy FE: EventSource **same-origin** przez BFF (`SPEC-FRONTEND.md` F-2). **Zakaz** tokenu w query string oraz **`Authorization: Bearer`** jako modelu MVP (FE, Postman, integracje — cookie jar / `credentials: 'include'`).

Zmiana względem wersji 1 tego SPEC: usunięto Bearer jako równorzędny transport; access nie wraca w body JSON.

K-5. Wywołania LLM z Content Chain idą wyłącznie przez adapter portu LLM → natywne `POST {GATEWAY}/api/v1/chat` (opcjonalnie `.../chat/stream` gdy krok tego wymaga). Nagłówek `X-Gateway-Key` tylko po stronie `apps/api` / env. **Zakaz** ustawiania `x-request-id` przez CC przy chat/stream. Hop Social musi mieścić się w limicie native gateway: **10 000** znaków `content` na wiadomość `user` / `assistant` (`INGRESS_LIMITS.native` w instancji `apps/ai-provider-gateway`).

Zmiana względem wersji 9 / K-5: dopisano limit ingressu native (wcześniej milczący; żywy hop z JSON kontekstu firmy przekraczał historyczne 3000 znaków — `docs/dokumentacja_komunikacji.md`).

K-6. Na wszystkich hopach LLM w jednym runie body niesie **ten sam** `conversationId` utworzony przy starcie runu. Po każdej odpowiedzi gateway `requestId` hopu trafia do `run.log` (gdy odpowiedź nadeszła).

K-7. Błędy gateway mapowane na logi runu i ewentualnie `run.failed` / retry wg **polityki api** — zawsze z czytelnym logiem; **bez** wycieku `X-Gateway-Key` do frontendu, `run.log` ani stdout. Dump pełnej treści hopu (prompty, `output.text`) na stdout adaptera **wyłącznie** przy `NODE_ENV=development`, z redakcją sekretu (`docs/observability.md`).

Zmiana względem wersji 9 / K-7: wcześniejsza norma mówiła o logach produktowych i frontendzie — bez rozróżnienia dumpa diagnostycznego stdout w `development`.

K-8. Kody domenowe z docs (`UNAUTHORIZED`, `FORBIDDEN`, `VALIDATION_FAILED`, `CONTEXT_INCOMPLETE`, `HITL_REQUIRED`, `HITL_INVALID_SELECTION`, `RUN_NOT_FOUND`, `REVIEW_LOCKED`, `RUN_NOT_REVIEWABLE`, **`RUN_NOT_CANCELABLE`**, `CONFLICT`, `MAIL_DELIVERY_FAILED`, `INTERNAL_ERROR`, …) mapowane spójnie przez wspólny filter — bez ad hoc `res.status` w controllerach. Skrót: `RUN_NOT_CANCELABLE` (409) = cancel gdy już `completed` \| `failed`; `RUN_NOT_REVIEWABLE` (409) = przegląd poza `completed` \| `failed` **oraz** opinia `targetType=run` poza `completed` \| `failed` \| (`cancelled`+wynik); `REVIEW_LOCKED` (409) = przegląd zamknięty (`reviewFinalizedAt` ustawione **albo** minął `REVIEW_TTL`) — przy samym TTL **bez** side-effect UPDATE locka — szczegóły `docs/dokumentacja_komunikacji.md`, `SPEC-RUNY.md` R-10 / R-11, `SPEC-FEEDBACK.md` Fbk-3a. Gdy `VALIDATION_FAILED` pochodzi z application Zod przez wspólny `parseWithZod` (`apps/api/src/shared/parse-with-zod.ts`, nie lokalna kopia w BC): `details[].path` = `issue.path.join('.')`. PUT/PATCH `/company-context` przy niespełnionej bramce kompletności też zwraca **400** `VALIDATION_FAILED` (`docs/dokumentacja_komunikacji.md`) — `details` mogą mieć `section` i/lub `path` pozycji; **nie** 409 `CONTEXT_INCOMPLETE` (ten kod zostaje na `POST /runs`).

Zmiana względem wersji 24 / K-8: brak `RUN_NOT_CANCELABLE`; opis `RUN_NOT_REVIEWABLE` bez rozszczepienia przegląd vs opinia na `cancelled`.

Zmiana względem wersji 26 / K-8: `REVIEW_LOCKED` tylko po finalize w DB. Od tej wersji także po TTL (bez CAS przy mutacji).

Zmiana względem wersji 22 / K-8: dopisano, że twardy zapis kontekstu korzysta z istniejącego `VALIDATION_FAILED` (nie nowy kod envelope).

Zmiana względem wersji 11 / K-8: dopisano `HITL_INVALID_SELECTION` (HITL page — `docs/dokumentacja_komunikacji.md`).

Zmiana względem wersji 13 / K-8: ten sam kod obowiązuje też Social dwuetapowy (≠1 id / id spoza draftu) — kanon pól wyniku i envelope: `docs/dokumentacja_komunikacji.md` (bez dublowania tabel w tym SPEC).

Zmiana względem wersji 15 / K-8: „Social ≠ 1 id” jako warunek 400 — od tej wersji 400 przy długości `< 1`, duplikacie albo id spoza draftu / `hitl.options`; **2+ legalne**, gdy wszystkie ∈ options (`docs/dokumentacja_komunikacji.md`). Helper `parseWithZod` **bez** zmian względem v14.

Zmiana względem wersji 14 / K-8: doprecyzowano lokalizację `parseWithZod` (api shared) oraz separator `details[].path` = `'.'`.

K-9. Kontrakt GET result pól addytywnych (`cta?`, `characterCount`, `role?`, `contents[]` / `reelScripts[]`, `sourceIdeaId`) oraz body `extras` kontekstu — egzekwowalne jak docs; ten SPEC nie redefiniuje tabel payloadów.

## Norma implementacji

### Wzorce / struktura

| Warstwa | Norma |
|---------|--------|
| Controller | DTO + **class-validator** + globalny `ValidationPipe` (whitelist); mapowanie HTTP ↔ komendy use-case; bez ORM, bez promptów, bez klienta gateway |
| Application | use-case’y; walidacja / parsing wewnętrzny **Zod** (w tym `discriminatedUnion` startu runu); orkiestracja startu/wznowienia runu; odczyt snapshotów (meta runu z Runs + wycinek `result`/`hitl` z composite readera — bez `imports: [SocialModule]` / `ContentModule` w `RunsModule`) |
| Błędy HTTP | jeden wspólny **exception filter** (ew. interceptor korelacji) → envelope K-1 |
| SSE | oficjalny mechanizm Nest: dekorator `@Sse()`, handler zwraca `Observable<MessageEvent>` ([NestJS SSE](https://docs.nestjs.com/techniques/server-sent-events)); Observable **kończy się** po terminalu runu; teardown (`complete` / `finalize`) przy disconnect i po `completed`/`failed`/`cancelled` |
| LLM | port (np. `LlmGatewayPort`) w domain/application + **osobny adapter HTTP** w `infrastructure` |
| Typy kontraktu | brand / enumy z `@content-chain/shared` (`docs/brand_types.md`); bez magicznych stringów ID w feature kodzie |

Walidacja na granicy HTTP: **class-validator** + `ValidationPipe` ([NestJS Validation](https://docs.nestjs.com/techniques/validation)).  
Walidacja w aplikacji (komendy, wyniki pośrednie, branded create*): **Zod**.  
(Docs brand types dopuszczają „Zod / równoważne” na granicach — tu HTTP = class-validator jako równoważnik granicy; Zod w application. Runtime Zod **nie** trafia do `packages/shared` — zgodnie z `SPEC-MONOREPO.md`.)

### Korelacja ID (norma kodu)

| ID | Kto tworzy | Gdzie widać |
|----|------------|-------------|
| `RequestId` (HTTP) | `apps/api` przy żądaniu | envelope / nagłówek odpowiedzi |
| `RunId` | `apps/api` przy `POST /runs` | odpowiedź + logi + SSE |
| `ConversationId` | `apps/api` przy starcie runu | odpowiedź + body chat + logi |
| `RequestId` (LLM) | **gateway** w odpowiedzi | wyłącznie zapis w `run.log` / SSE log |

Zakaz: FE generuje `RequestId` „na zapas”; zakaz nowego `ConversationId` per agent w tym samym runie.

### Wolno

- Globalny `ValidationPipe` z `whitelist` / `forbidNonWhitelisted` / `transform`.
- Wspólny filter mapujący wyjątki domenowe i walidację na envelope + właściwy status HTTP.
- `@Sse()` na `GET .../events` z auth guardem jak pozostałe chronione trasy.
- Kończyć `Observable` po `run.completed` / `run.failed` / `run.cancelled` oraz na late-join, gdy snapshot jest już terminalny (K-3a).
- Konsumpcję `run.completed` / `run.failed` / `run.cancelled` w dashboardzie jako toast wg `SPEC-FRONTEND.md` — bez pollingu; dedup względem toasta mutacji cancel.
- Adapter gateway używający natywnego chat; zapis `requestId` z odpowiedzi do logu kroku.
- Dump kształtu hopu na stdout wyłącznie gdy `NODE_ENV=development`, z `[REDACTED]` zamiast `GATEWAY_KEY` (helper `llm-gateway-chat.log.ts`).
- Opcjonalnie `POST .../chat/stream` gateway, gdy konkretny węzeł pipeline’u tego wymaga (finalizacja węzła po domknięciu streamu).
- Polityka retry/timeout po stronie api przy `RATE_LIMITED` / `PROVIDER_TIMEOUT` / `PROVIDER_UNAVAILABLE` — byle zakończenie było obserwowalne w logu/SSE.
- Składać envelope snapshotu `GET /runs/:id` z meta Runs i portu odczytu wyniku (reader); kontrakt HTTP bez zmian (`dokumentacja_komunikacji.md`).

Zmiana względem wersji 8 / wiersz Application: odczyt snapshotu był milcząco „w use-case Runs” bez zakazu importu store Social — teraz reader + klej (`SPEC-RUNY.md`).

### Nie wolno

- Pollingu statusu runu jako kanału **live** (zamiast SSE).
- Traktowania payloadu `run.failed` (`code?`, `message`) jako zamiennika kanonicznych `run.log` (`SPEC-RUNY.md` R-2).
- Zostawiania otwartego SSE po evencie terminalnym albo na runie już `completed` \| `failed` \| `cancelled`.
- Pollingu statusu jako live w związku z cancel (obowiązuje SSE + GET snapshot).
- Synchronicznego await execute w handlerze `POST .../cancel` (K-2e / `SPEC-RUNY.md` R-11).
- Unbounded mapy Subject per `runId` bez evikcji po terminalu (cykl życia huba — `SPEC-RUNY.md`).
- Subjectu bez TTL automatu ewikcji — zombie Subject przy hung runie powoduje memory leak (K-3b).
- Braku heartbeat przy live SSE — cisza TCP >60 s grozi zamknięciem połączenia przez proxy i reconnectem klienta (K-3b).
- Hardkodowania `SSE_HEARTBEAT_MS` / `RUN_SSE_SUBJECT_TTL_MS` w kodzie zamiast env z walidacją Zod.
- Ustawiania `x-request-id` przez Content Chain przy wywołaniach chat/stream gateway.
- Tokenu JWT / access w query string SSE.
- `Authorization: Bearer` oraz zwracania `accessToken` w body jako modelu auth MVP (norma: dwa cookie httpOnly — `SPEC-AUTH.md`).
- Fasady `/api/v1/openai/...` ani `/api/v1/anthropic/...` jako **domyślnej** ścieżki z CC.
- Generowania `RequestId` po stronie frontendu przed `POST /runs`.
- Synchronicznego blokowania HTTP na cały długi run LLM.
- Wołania SDK vendorów LLM z `apps/api` z pominięciem gateway.
- Wyciekania `X-Gateway-Key`, haseł, JWT do envelope, SSE, `run.log` albo stdout.
- Dumpa pełnych promptów / `output.text` hopu gateway na stdout poza `NODE_ENV=development`.
- Rozwijania publicznego API pod `/api/v2` w MVP.
- Montowania Swagger UI pod ścieżką `/api` (kolizja z prefiksem produktowym `/api/v1` — norma: `/docs`).
- Składania snapshotu `result`/`hitl` przez `RunsModule imports SocialModule` / `forwardRef` (`SPEC-RUNY.md`).
- Finalize / UPDATE `reviewFinalizedAt` przy GET snapshot (K-2c / `SPEC-RUNY.md` R-10).
- Nowego eventu SSE wyłącznie dla auto-finalize przeglądu (UI bierze stan z GET / sukcesu mutacji).
- UPDATE `reviewFinalizedAt` przy odpowiedzi `REVIEW_LOCKED` po samym TTL (lock w DB = sweeper).

Zmiana względem wersji 23 / „Nie wolno”: dopisano zakaz zastępowania `SPEC-RUNY.md` R-2 payloadem `run.failed`.
Zmiana względem wersji 26 / „Nie wolno”: dopisano zakazy side-effect GET / SSE auto-finalize / CAS przy TTL.

### Zatwierdzony stack (obszar)

| Element | Status |
|---------|--------|
| NestJS controllers + `ValidationPipe` + **class-validator** / class-transformer | obowiązkowe |
| **Zod** (warstwa application) | obowiązkowe |
| NestJS **`@Sse()`** + RxJS `Observable<MessageEvent>` + `merge` z heartbeat `interval` | obowiązkowe |
| `SSE_HEARTBEAT_MS` (env, default `25_000`) + `RUN_SSE_SUBJECT_TTL_MS` (env, default `600_000`) — walidowane Zod | obowiązkowe |
| Port LLM + adapter HTTP (natywny chat gateway) | obowiązkowe |
| Brand types / enumy z `@content-chain/shared` | obowiązkowe |
| **`@nestjs/swagger`** + Swagger UI pod **`/docs`** (DX powierzchni api) | obowiązkowe w MVP |
| OpenAPI gateway jako źródło kontraktu upstream | odwołanie; bez kopiowania pełnego specu do tego SPEC |
| `/api/v2` | poza MVP |

Zmiana względem wersji 3: dopisano obowiązkowy DX Swagger pod `/docs` (wcześniej brak normy ścieżki OpenAPI dla `apps/api`; domyślne montowanie pod `/api` jest zakazane ze względu na kolizję z `/api/v1`).

Źródła weryfikacji: [NestJS Server-Sent Events](https://docs.nestjs.com/techniques/server-sent-events), [NestJS Validation](https://docs.nestjs.com/techniques/validation), [NestJS OpenAPI](https://docs.nestjs.com/openapi/introduction); kontrakt endpointów — `docs/dokumentacja_komunikacji.md`.

## Kryteria akceptacji

- [ ] Błędy HTTP mają envelope z `code`, `message`, `requestId` (format `req_<uuid>`).
- [ ] `POST /api/v1/runs` kończy się 202 z `runId` + `conversationId` bez czekania na LLM; unia `platform` / `contentKind` egzekwowana (400 przy konflikcie).
- [ ] `GET /api/v1/runs` listuje runy instancji zgodnie z docs (paginacja 10, filtry, `startedBy`).
- [ ] `GET /api/v1/runs/user/:userId` i `POST /feedback` oraz rating/edit/finalize istnieją w kontrakcie docs; kody `REVIEW_LOCKED` / `RUN_NOT_REVIEWABLE` / `RUN_NOT_CANCELABLE` w envelope; snapshot + sukcesy mutacji przeglądu niosą `pipelineFinishedAt` / `reviewExpiresAt`; lista usera **bez** tych pól; GET bez side-effect finalize.
- [ ] `POST /api/v1/runs/:runId/cancel`: 200 (legalne + idempotencja), 403, 404, 409 `RUN_NOT_CANCELABLE`; body puste; bez await execute.
- [ ] `PATCH /api/v1/auth/me/email` `{ email, currentPassword }` w kontrakcie docs (**400** / **401** `UNAUTHORIZED` \| `INVALID_PASSWORD` / **409** gdy zajęty); nie przez `PATCH /users/:id`; brak mutacji na `PATCH /auth/me`.
- [ ] Klient otrzymuje live status wyłącznie przez SSE; GET run/logs = snapshot. Toast terminalu w dashboardzie (gdy mapa UX na to zezwala) **nie** dodaje pollingu.
- [ ] SSE na skończonym runie (`completed` \| `failed` \| `cancelled`) emituje snapshot statusu i **kończy** strumień; po `run.completed` / `run.failed` / `run.cancelled` serwer zamyka połączenie. `awaiting_hitl` / `interrupted` nie kończą SSE.
- [ ] SSE wymaga sesji cookie jak API; brak tokenu w query i brak wymogu Bearer.
- [ ] Adapter gateway woła natywny chat z `X-Gateway-Key`, bez `x-request-id` z CC; `conversationId` stały w runie; `requestId` z odpowiedzi w logu kroku. Hop mieści się w limicie native **10 000** znaków. Dump pełnej treści hopu na stdout tylko w `development`, z redakcją sekretu.
- [ ] DTO HTTP walidowane class-validator; use-case’y używają Zod tam, gdzie parsują / walidują dane aplikacji.
- [ ] Brak ścieżki FE/api → vendor LLM z pominięciem gateway.
- [ ] Publiczne API MVP wyłącznie pod `/api/v1`.
- [ ] Swagger UI api dostępne pod `/docs` (nie pod `/api`).

## Poza zakresem

- Pełne skopiowanie OpenAPI `ai-provider-gateway`.
- Traktowanie `/docs` jako kontraktu produktowego FE (to DX / ops lokalne).
- Definicja grafu Social / Content, refine `max N`, treść promptów → `SPEC-SOCIAL.md` / `SPEC-CONTENT.md`.
- Polityka przejść statusów runu, anulowanie (CAS / abort / recovery), przegląd (ocena/edycja) i kanoniczny model logów DB → `SPEC-RUNY.md`.
- Opinie tekstowe → `SPEC-FEEDBACK.md`.
- Implementacja UI EventSource / Stop + modal / animacji statusu → `SPEC-FRONTEND.md`.

- Szczegółowy zestaw metryk Prometheus i dashboardy → docs observability / `SPEC-BEZPIECZENSTWO.md` (tu tylko istnienie ścieżki `/metrics`).
- Sztywna liczba retry gateway (pozostaje „polityka api + czytelny log”).
