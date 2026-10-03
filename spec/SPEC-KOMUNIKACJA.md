---
wersja: 33
data_utworzenia: 2026-08-11
data_modyfikacji: 2026-10-03
---

# SPEC — Komunikacja (HTTP / SSE / gateway)

## Cel / zakres względem dokumentacji

Norma **implementacji obu powierzchni I/O** Content Chain:

1. HTTP API + SSE `apps/api` (konsumenci: `apps/frontend`, Postman),
2. klient `apps/api` → `apps/ai-provider-gateway` (natywny chat **oraz** probe liveness health).

Uszczegóławia `docs/dokumentacja_komunikacji.md` oraz korelację ID z `docs/brand_types.md` / `docs/dictionary.md`. **Nie** redefiniuje listy endpointów ani payloadów — odwołuje się do docs; tu obowiązują wzorce warstw, walidacja, envelope, SSE i adapter LLM.

Zmiana względem wersji 23 / cel: dopisano konsumpcję `run.completed` / `run.failed` w dashboardzie (toast). **Bez** nowych kodów HTTP, eventów SSE i endpointów.

Zmiana względem wersji 24 / cel: brak `POST .../cancel` i `run.cancelled`. Od tej wersji trzeci terminal SSE + kod `RUN_NOT_CANCELABLE` — skrót egzekwowalny; pełne payloady w docs.

Zmiana względem wersji 26 / cel: snapshot / mutacje przeglądu bez pól TTL. Od tej wersji `pipelineFinishedAt` + wyliczone `reviewExpiresAt`; mutacja po TTL → `REVIEW_LOCKED` bez side-effect zapisu locka; **bez** nowego eventu SSE auto-finalize.

Zmiana względem wersji 28 / cel: publiczne surface auth = bootstrap / accept-invite. Od tej wersji także register / activate / resend-activation (K-2g…K-2i) — `docs/dokumentacja_komunikacji.md`.

Zmiana względem wersji 31 / cel: powierzchnia health = wyłącznie liveness api. Od tej wersji także publiczny `GET /api/v1/health/ready` (agregat api + gateway **liveness**); probe upstream **bez** konsumpcji gateway `/health/ready` — `docs/dokumentacja_komunikacji.md`.
Zmiana względem wersji 32 / cel: K-2g = zawsze `role = user`. Od tej wersji **refaktor** `user.role` w odpowiedzi register (`guest` \| `user`) + `GET /config` + kody quota guest.

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
| Konfiguracja publiczna (V1) | `GET /api/v1/config` | JSON — wyłącznie `{ "demoMode": boolean }` |
| Health (readiness produktowa) | `GET /api/v1/health/ready` | JSON — agregat api + gateway liveness |
| Auth probe / bootstrap status / własny email | `GET /api/v1/auth/me`, `PATCH /api/v1/auth/me/email`, `GET /api/v1/auth/bootstrap-status` | JSON |
| Zaproszenia (admin) | `GET`/`POST /api/v1/invitations`, `POST .../:id/resend`, `DELETE .../:id` | JSON |
| Akceptacja zaproszenia (publiczny) | `POST /api/v1/auth/accept-invite` | JSON |
| Rejestracja / aktywacja / resend (publiczne) | `POST /api/v1/auth/register`, `POST /api/v1/auth/activate`, `POST /api/v1/auth/resend-activation` | JSON |
| Gateway (z api) | upstream `/api/v1/chat` (+ opcjonalnie stream); probe **liveness** `GET /api/v1/health` | JSON / SSE gateway |

MVP: **wyłącznie** `/api/v1` jako prefiks produktowy — bez `/api/v2`. Swagger **nie** pod `/api` (kolizja z `/api/v1`) — norma: `/docs` (`docs/dokumentacja_komunikacji.md`).

Szczegóły metod, pól i kodów: `docs/dokumentacja_komunikacji.md`.

Zmiana względem wersji 16 / powierzchnie: dopisano zaproszenia (admin) i publiczny `POST /auth/accept-invite`; envelope **503** `MAIL_DELIVERY_FAILED` + `details.id` (K-1) — bez dublowania pełnych payloadów.
Zmiana względem wersji 28 / powierzchnie: dopisano register / activate / resend-activation.
Zmiana względem wersji 31 / powierzchnie: Health = tylko liveness. Od tej wersji wiersz readiness api + probe liveness w powierzchni gateway.

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

**503** `MAIL_DELIVERY_FAILED` (pad SMTP po zapisie zaproszenia / resend invite **albo** po utworzeniu pending User przy **register**): ten sam envelope K-1; w `details` wyłącznie `id` (Invitation **albo** User). **`POST /auth/resend-activation`:** **bez** **503** (zawsze **200**). Pełny kontrakt HTTP (201 vs 503, pola, negatywy) — `docs/dokumentacja_komunikacji.md` (bez dublowania payloadów tutaj).

Zmiana względem wersji 28 / K-1: `MAIL_DELIVERY_FAILED` tylko przy Invitation. Od tej wersji także id User przy register / resend aktywacji.

K-2. Start runu (`POST /api/v1/runs`) zwraca **202** z `runId`, `conversationId` i statusem `queued` | `running` — bez synchronicznego czekania na wynik LLM. `interrupted` **nie** jest statusem odpowiedzi POST. Body: unia dyskryminowana `taskType` (`platform` XOR `contentKind` **oraz** kształt `brief` XOR: `SocialBrief` vs `ContentBrief`) — `docs/dokumentacja_komunikacji.md`. Walidacja Zod `discriminatedUnion` w application + `.strict()` na gałęzi briefu. DTO HTTP może deklarować sumę kluczy briefu (`topic`, `audience`, `goal`, `ideaCount`, `angle`, `targetLength`); prawda = Zod. `taskType` spoza enumu → **400** `VALIDATION_FAILED`. Page + `brief.ideaCount` / Social + `brief.angle` → **400** `VALIDATION_FAILED`. Dla `guest`: najpierw `GuestRunPolicy` (R-12 / K-12) — quota **przed** 202.

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

K-2f. `POST /api/v1/auth/accept-invite` — publiczny; body `{ token, password }`. Happy path: **201** `{ user: { id, email, role } }` — **bez** Set-Cookie. Token zły / zużyty / `revoked` / wygasły → **401** `UNAUTHORIZED` (wspólny `message`). Hasło poza polityką → **400** `VALIDATION_FAILED`. Kolizja `User.email` (w tym soft-deleted) przy ważnym tokenie → **401** `UNAUTHORIZED`, **identyczny** `code` + `message` co zły token; Invitation → `revoked`; **zakaz** **409** `CONFLICT` / „email zajęty” na tej trasie. Pełna tabela: `docs/dokumentacja_komunikacji.md`. Semantyka Auth: `SPEC-AUTH.md` A-7b.

Zmiana względem wersji 27: brak osobnego wymogu K-2f; kolizja email na accept-invite żyła tylko w `SPEC-AUTH.md` jako **409**. Od tej wersji kontrakt HTTP = maskowanie **401** (Faza 1 docs).

K-2g. `POST /api/v1/auth/register` — publiczny; body `{ email, password }` (`.strict()`; bez `role`). **Zawsze** dostępny (nie bramka `DEMO_MODE`). **`user.role` w 201:** `guest` gdy `DEMO_MODE=true`, `user` gdy `false`. **Zmiana względem:** K-2g wersji 32 — zawsze `role = user`. Reszta kontraktu **bez zmian**: revoke pending `Invitation`; **201** `{ user: { id, email, role, verifiedAt } }` **bez** Set-Cookie; w `production`: pending; poza prod: `verifiedAt` od razu; kolizja → **409** `CONFLICT`, `message`: **`Email already in use`**; hasło poza polityką → **400**; pad SMTP → **503** `MAIL_DELIVERY_FAILED` + `details.id`. Semantyka: `SPEC-AUTH.md` A-11; pełne payloady: `docs/dokumentacja_komunikacji.md`.

K-2h. `POST /api/v1/auth/activate` — publiczny; body `{ token }`. Sukces → **200** `{ user: { id, email, role } }`; ustawia `verifiedAt`, usuwa `AccountActivation`; **bez** Set-Cookie. Zły / zużyty / wygasły token → wspólny **401**. **Bez** **409** na tej trasie. Deep link: wyłącznie `/?activationToken=`. Semantyka: `SPEC-AUTH.md` A-12.

Zmiana względem wersji 30 / K-2h: usunięto **409** na activate (zostaje wyłącznie register / inne surface’y email).

K-2i. `POST /api/v1/auth/resend-activation` — publiczny; body np. `{ email }`. **Zawsze** **200**, `message`: **`Wiadomość wysłana ponownie`** — niezależnie od stanu konta / rate limit / pad SMTP. Mail + rotacja tokenu tylko przy pending; inaczej no-op. Rate limit **5** / **15 min** / email. **Bez** Set-Cookie. Semantyka: `SPEC-AUTH.md` A-13.

Zmiana względem wersji 28: brak K-2g…K-2i (zakaz signup w kanonie). Od tej wersji kontrakt HTTP register / activate / resend.

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

K-5. Wywołania LLM z Content Chain idą wyłącznie przez adapter portu LLM → natywne `POST {GATEWAY}/api/v1/chat` (opcjonalnie `.../chat/stream` gdy krok tego wymaga). Nagłówek `X-Gateway-Key` tylko po stronie `apps/api` / env (chat/stream). **Zakaz** ustawiania `x-request-id` przez CC przy chat/stream. Hop Social musi mieścić się w limicie native gateway: **10 000** znaków `content` na wiadomość `user` / `assistant` (`INGRESS_LIMITS.native` w instancji `apps/ai-provider-gateway`).

**Adapter `chat` nie pełni roli probe health** — osobny klient / serwis w module ops `health/` (K-10).

Zmiana względem wersji 9 / K-5: dopisano limit ingressu native (wcześniej milczący; żywy hop z JSON kontekstu firmy przekraczał historyczne 3000 znaków — `docs/dokumentacja_komunikacji.md`).
Zmiana względem wersji 31 / K-5: milczenie o rozdzieleniu chat vs probe. Od tej wersji jawnie: probe ≠ port `chat`.

K-6. Na wszystkich hopach LLM w jednym runie body niesie **ten sam** `conversationId` utworzony przy starcie runu. Po każdej odpowiedzi gateway `requestId` hopu trafia do `run.log` (gdy odpowiedź nadeszła).

K-7. Błędy gateway mapowane na logi runu i ewentualnie `run.failed` / retry wg **polityki api** — zawsze z czytelnym logiem; **bez** wycieku `X-Gateway-Key` do frontendu, `run.log` ani stdout. Dump pełnej treści hopu (prompty, `output.text`) na stdout adaptera **wyłącznie** przy `NODE_ENV=development`, z redakcją sekretu (`docs/observability.md`).

Zmiana względem wersji 9 / K-7: wcześniejsza norma mówiła o logach produktowych i frontendzie — bez rozróżnienia dumpa diagnostycznego stdout w `development`.

K-8. Kody domenowe z docs (`UNAUTHORIZED`, `FORBIDDEN`, `VALIDATION_FAILED`, `CONTEXT_INCOMPLETE`, `HITL_REQUIRED`, `HITL_INVALID_SELECTION`, `RUN_NOT_FOUND`, `REVIEW_LOCKED`, `RUN_NOT_REVIEWABLE`, **`RUN_NOT_CANCELABLE`**, `CONFLICT`, `MAIL_DELIVERY_FAILED`, `INTERNAL_ERROR`, **`GUEST_TYPE_NOT_ALLOWED`**, **`GUEST_TYPE_QUOTA_EXCEEDED`**, **`GUEST_GLOBAL_QUOTA_EXCEEDED`**, …) mapowane spójnie przez wspólny filter — bez ad hoc `res.status` w controllerach. Skrót: `RUN_NOT_CANCELABLE` (409) = cancel gdy już `completed` \| `failed`; `RUN_NOT_REVIEWABLE` (409) = przegląd poza `completed` \| `failed` **oraz** opinia `targetType=run` poza `completed` \| `failed` \| (`cancelled`+wynik); `REVIEW_LOCKED` (409) = przegląd zamknięty (`reviewFinalizedAt` ustawione **albo** minął `REVIEW_TTL`) — przy samym TTL **bez** side-effect UPDATE locka — szczegóły `docs/dokumentacja_komunikacji.md`, `SPEC-RUNY.md` R-10 / R-11, `SPEC-FEEDBACK.md` Fbk-3a. Soft limit rating guest = **429** (nie nowy `code` obowiązkowy w V1 — `message` z envelope). `CONFLICT` (409) = m.in. drugi `pending` invite, istniejący `User` przy `POST /invitations`, zajęty email przy `PATCH /auth/me/email`, **zajęty email przy `POST /auth/register`**, niedozwolone przejścia runu / HITL — **nie** kolizja email na `POST /auth/accept-invite` (tam **401** `UNAUTHORIZED`, K-2f). Login przed aktywacją (prod) / soft-delete / złe hasło / **guest przy demo off** oraz activate-fail = wspólny **401** — **bez** `ACCOUNT_NOT_ACTIVATED`. Gdy `VALIDATION_FAILED` pochodzi z application Zod przez wspólny `parseWithZod` (`apps/api/src/shared/parse-with-zod.ts`, nie lokalna kopia w BC): `details[].path` = `issue.path.join('.')`. PUT/PATCH `/company-context` przy niespełnionej bramce kompletności też zwraca **400** `VALIDATION_FAILED` (`docs/dokumentacja_komunikacji.md`) — `details` mogą mieć `section` i/lub `path` pozycji; **nie** 409 `CONTEXT_INCOMPLETE` (ten kod zostaje na `POST /runs`). **Brak** nowego kodu envelope „GATEWAY_NOT_READY” / twardego rejectu `POST /runs` za martwy gateway — bramka UX = `SPEC-FRONTEND.md` F-6; hop LLM = istniejąca ścieżka błędu.

Zmiana względem wersji 24 / K-8: brak `RUN_NOT_CANCELABLE`; opis `RUN_NOT_REVIEWABLE` bez rozszczepienia przegląd vs opinia na `cancelled`.

Zmiana względem wersji 26 / K-8: `REVIEW_LOCKED` tylko po finalize w DB. Od tej wersji także po TTL (bez CAS przy mutacji).

Zmiana względem wersji 22 / K-8: dopisano, że twardy zapis kontekstu korzysta z istniejącego `VALIDATION_FAILED` (nie nowy kod envelope).

Zmiana względem wersji 11 / K-8: dopisano `HITL_INVALID_SELECTION` (HITL page — `docs/dokumentacja_komunikacji.md`).

Zmiana względem wersji 13 / K-8: ten sam kod obowiązuje też Social dwuetapowy (≠1 id / id spoza draftu) — kanon pól wyniku i envelope: `docs/dokumentacja_komunikacji.md` (bez dublowania tabel w tym SPEC).

Zmiana względem wersji 15 / K-8: „Social ≠ 1 id” jako warunek 400 — od tej wersji 400 przy długości `< 1`, duplikacie albo id spoza draftu / `hitl.options`; **2+ legalne**, gdy wszystkie ∈ options (`docs/dokumentacja_komunikacji.md`). Helper `parseWithZod` **bez** zmian względem v14.

Zmiana względem wersji 14 / K-8: doprecyzowano lokalizację `parseWithZod` (api shared) oraz separator `details[].path` = `'.'`.

Zmiana względem wersji 27 / K-8: `CONFLICT` nie wykluczał wprost accept-invite; od tej wersji jawnie: kolizja email na accept → **401**, nie `CONFLICT`.

Zmiana względem wersji 28 / K-8: `CONFLICT` bez register; brak normy wspólnego 401 login/activate. Od tej wersji register = **409**; login pending / activate-fail = wspólny 401.

Zmiana względem wersji 31 / K-8: milczenie o reject gateway na `POST /runs`. Od tej wersji jawny zakaz nowego kodu „gateway down” na starcie.

K-9. Kontrakt GET result pól addytywnych (`cta?`, `characterCount`, `role?`, `contents[]` / `reelScripts[]`, `sourceIdeaId`) oraz body `extras` kontekstu — egzekwowalne jak docs; ten SPEC nie redefiniuje tabel payloadów.

K-10. `GET /api/v1/health/ready` (api) — publiczny jak liveness (bez sesji). Agregat MVP: proces api **+** zależność „gateway process up”. Upstream probe = **`GET {GATEWAY_BASE_URL}/api/v1/health`** (liveness procesu gateway) — timeout **1–2 s**, cache in-memory **5–15 s**. Mapowanie: sukces HTTP 2xx + sensowny body liveness → `checks.gateway` healthy; timeout / unreachable / nie-2xx / błąd parse → unhealthy. HTTP odpowiedzi api: **200** zawsze przy żywym procesie api (niespójność zależności **nie** wymusza 503 — werdykt w `status`: `ready` \| `not_ready`). Body **bez** sekretów / `X-Gateway-Key` / topologii poza skrótem checków. **Zakaz** w tym epiku: wołanie upstream gateway `/health/ready`, mapowanie drzewa config/redis/cache do body, użycie portu `chat` jako probe. Pełny kształt: `docs/dokumentacja_komunikacji.md`. Liveness `GET /api/v1/health` (api) **bez zmian** (lekki probe procesu api).

Zmiana względem wersji 31: brak normy readiness api / probe. Od tej wersji K-10 + wiersze powierzchni.

K-11. `GET /api/v1/config` — publiczny (`@Public()`); V1: **wyłącznie** `{ "demoMode": boolean }` (`true` gdy proces wystartował z `DEMO_MODE=true`). **Zakaz** innych pól w V1 (capy, role, Redis). Egzekucja limitów i tak w API.

K-12. Quota / rating guest — kody jak `docs/dokumentacja_komunikacji.md`: `GUEST_TYPE_NOT_ALLOWED`, `GUEST_TYPE_QUOTA_EXCEEDED`, `GUEST_GLOBAL_QUOTA_EXCEEDED` (**403**); soft rating → **429** + `message`. Semantyka admit / fail modes: `SPEC-RUNY.md` R-12. Redis **nie** jest checkiem `health` / `ready` (K-10 **bez** faila na brak Redis; przy `DEMO_MODE=false` Redis opcjonalny).

Zmiana względem wersji 32: brak `GET /config` i kodów quota. Od tej wersji K-11 / K-12.

## Norma implementacji

### Wzorce / struktura

| Warstwa | Norma |
|---------|--------|
| Controller | DTO + **class-validator** + globalny `ValidationPipe` (whitelist); mapowanie HTTP ↔ komendy use-case; bez ORM, bez promptów, bez klienta gateway |
| Application | use-case’y; walidacja / parsing wewnętrzny **Zod** (w tym `discriminatedUnion` startu runu); orkiestracja startu/wznowienia runu; odczyt snapshotów (meta runu z Runs + wycinek `result`/`hitl` z composite readera — bez `imports: [SocialModule]` / `ContentModule` w `RunsModule`) |
| Błędy HTTP | jeden wspólny **exception filter** (ew. interceptor korelacji) → envelope K-1 |
| SSE | oficjalny mechanizm Nest: dekorator `@Sse()`, handler zwraca `Observable<MessageEvent>` ([NestJS SSE](https://docs.nestjs.com/techniques/server-sent-events)); Observable **kończy się** po terminalu runu; teardown (`complete` / `finalize`) przy disconnect i po `completed`/`failed`/`cancelled` |
| LLM | port (np. `LlmGatewayPort`) w domain/application + **osobny adapter HTTP** w `infrastructure` |
| Health / readiness | moduł ops `health/`: liveness procesu + readiness z **cienkiego klienta HTTP** probe upstream liveness gateway — **nie** port `chat` |
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
- Cienki klient HTTP w `health/` do upstream `GET .../health` (liveness) — timeout 1–2 s, cache 5–15 s (K-10).
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
- Wyciekania `X-Gateway-Key`, haseł, JWT do envelope, SSE, `run.log`, body `/health` / `/health/ready` albo stdout.
- Użycia adaptera / portu `chat` jako probe „gateway żyje” (obowiązuje K-10 w `health/`).
- Opierania bramki chipa / `checks.gateway` o upstream gateway `/health/ready` (pełny readiness config/redis/cache) w tym epiku.
- Wymagania `X-Gateway-Key` na upstream liveness `/health` „pod FE”.
- Nowego kodu envelope / twardego rejectu `POST /runs` za martwy gateway (`GATEWAY_NOT_READY` itd.) — K-8.
- Dumpa pełnych promptów / `output.text` hopu gateway na stdout poza `NODE_ENV=development`.
- Rozwijania publicznego API pod `/api/v2` w MVP.
- Montowania Swagger UI pod ścieżką `/api` (kolizja z prefiksem produktowym `/api/v1` — norma: `/docs`).
- Składania snapshotu `result`/`hitl` przez `RunsModule imports SocialModule` / `forwardRef` (`SPEC-RUNY.md`).
- Finalize / UPDATE `reviewFinalizedAt` przy GET snapshot (K-2c / `SPEC-RUNY.md` R-10).
- Nowego eventu SSE wyłącznie dla auto-finalize przeglądu (UI bierze stan z GET / sukcesu mutacji).
- Fail `health` / `ready` z powodu braku Redis (K-10 / K-12).
- Pól poza `demoMode` w `GET /config` V1.

Zmiana względem wersji 23 / „Nie wolno”: dopisano zakaz zastępowania `SPEC-RUNY.md` R-2 payloadem `run.failed`.
Zmiana względem wersji 26 / „Nie wolno”: dopisano zakazy side-effect GET / SSE auto-finalize / CAS przy TTL.
Zmiana względem wersji 32 / „Nie wolno”: dopisano zakazy probe przez `chat`, konsumpcji upstream `/health/ready` pod chip, key na liveness, sekretów w body ready, rejectu gateway na `POST /runs`.

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
- [ ] `POST /api/v1/auth/accept-invite`: **201** bez Set-Cookie; zły token / kolizja email → **401** `UNAUTHORIZED` (ten sam `message`); **nie** **409** przy zajętym emailu.
- [ ] `POST /api/v1/auth/register`: **201** bez Set-Cookie (nowy email); `role` = `guest` \| `user` vs `DEMO_MODE`; kolizja → **409** `CONFLICT`; **nie** maskowany 201; pad SMTP → **503** + `details.id` User.
- [ ] `GET /api/v1/config`: publiczny; body wyłącznie `{ demoMode }`.
- [ ] `POST /api/v1/auth/activate`: **200** bez Set-Cookie; zły token → wspólny **401**.
- [ ] `POST /api/v1/auth/resend-activation`: stały sukces HTTP; bez enumeracji stanu konta.
- [ ] Klient otrzymuje live status wyłącznie przez SSE; GET run/logs = snapshot. Toast terminalu w dashboardzie (gdy mapa UX na to zezwala) **nie** dodaje pollingu.
- [ ] SSE na skończonym runie (`completed` \| `failed` \| `cancelled`) emituje snapshot statusu i **kończy** strumień; po `run.completed` / `run.failed` / `run.cancelled` serwer zamyka połączenie. `awaiting_hitl` / `interrupted` nie kończą SSE.
- [ ] SSE wymaga sesji cookie jak API; brak tokenu w query i brak wymogu Bearer.
- [ ] Adapter gateway woła natywny chat z `X-Gateway-Key`, bez `x-request-id` z CC; `conversationId` stały w runie; `requestId` z odpowiedzi w logu kroku. Hop mieści się w limicie native **10 000** znaków. Dump pełnej treści hopu na stdout tylko w `development`, z redakcją sekretu.
- [ ] `GET /api/v1/health/ready`: publiczny; body z agregatem `ready` \| `not_ready` + `checks.api` / `checks.gateway`; probe = upstream **liveness** `/health` (timeout 1–2 s, cache 5–15 s); **bez** sekretów; **bez** konsumpcji upstream `/health/ready`; probe **nie** przez port `chat`.
- [ ] `POST /runs` przy martwym gateway **nie** dostaje nowego kodu rejectu „gateway down” (nadal tylko `CONTEXT_INCOMPLETE` przy niekompletnym kontekście).
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
