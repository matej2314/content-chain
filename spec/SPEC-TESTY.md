---
wersja: 24
data_utworzenia: 2026-08-11
data_modyfikacji: 2026-09-30
---

# SPEC — Testy

## Cel / zakres względem dokumentacji

Norma strategii testów MVP Content Chain: piramida, narzędzia, obowiązkowe przypadki DoD oraz CI — uszczegółowienie `docs/testy.md` pod egzekwowalne reguły przy implementacji `apps/api`.

Zmiana względem wersji 23: DoD bez TTL / auto-finalize. Od tej wersji D-35…D-40 (lock po TTL bez CAS, sweeper, restart, GET 4a, backfill, regresje) — `docs/testy.md`, `SPEC-RUNY.md` R-10.

## Powiązanie ze stylem z docs

Wiążące: testowanie zachowania na granicach (domain / application + porty); controllery cienkie; graf LangGraph za fasadą — pełny graf tylko w nielicznych testach. Spójne z `docs/architektura.md` i checklistą jakości granic.

**Wyjątek względem stylu globalnego:** brak.

## Piramida (MVP)

| Warstwa | Gdzie | Udział | Norma |
|---------|-------|--------|-------|
| **Unit** | `apps/api` (domain, application) | Najwięcej | Bramka, statusy, role, `isRetryable`, hub SSE (complete / evikcja), fasady z **fake** portów (LLM, persistence wg potrzeby) |
| **Integration** | `apps/api` | Mniej | HTTP (**supertest**) + Prisma/SQLite; cookie auth; SSE/statusy; stub LLM |
| **E2E API** | przeciw api (bez przeglądarki) | Wąsko, ale **pełne use-case’y** | Happy path **oraz** error/edge case’y MVP — bez pinu narzędzia w SPEC |
| **Frontend** | — | **Poza MVP** | Brak wymogu automatycznych testów `apps/frontend` |

## Wymagania (egzekwowalne)

T-1. Runner testów unit/integration: **Jest**.

T-2. Integration HTTP: **supertest** (lub wrapper oparty na nim) przeciw procesowi Nest w teście.

T-3. Auth w testach API: sesja przez cookie **`cc_access` / `cc_refresh`** — spójnie z `SPEC-AUTH.md`. Bez modelu Bearer w suite MVP.

T-4. Port LLM: w unit i w domyślnych integration **fake/stub** (kształt odpowiedzi jak natywny chat). **Zakaz** live vendorów LLM na każdy PR.

T-5. E2E API: wąski zestaw uruchamiany poza samym PR lub przed release self-host (jak `docs/testy.md`), **bez** wskazania obowiązkowego narzędzia w SPEC. Zakres: w miarę możliwości **wszystkie use-case’y MVP** oraz sensowne **error-case** i **edge-case** (nie ograniczać wyłącznie do happy path).

T-6. CI PR: **unit + integration** `apps/api` muszą przechodzić.

T-7. Automatyczne testy `apps/frontend` — poza MVP.

## Obowiązkowe przypadki DoD (api)

Minimum do uznania jakości api za spełnioną (unit i/lub integration; E2E API pokrywa je end-to-end w miarę możliwości):

| ID | Przypadek |
|----|-----------|
| D-1 | Bramka: niekompletny kontekst → brak startu runu (`CONTEXT_INCOMPLETE`) |
| D-2 | Authz: `user` nie zapisze kontekstu; `admin` tak; obaj mogą startować run przy kompletności |
| D-3 | Cookie auth: chronione trasy bez cookie → `UNAUTHORIZED`; z ważną sesją → OK |
| D-4 | `post_ideas` full-auto: kolejka/slot → `running` → `completed`; wynik + logi w DB |
| D-5 | `post_ideas_then_content`: `awaiting_hitl` → resume → content → `completed`; zły HITL → `409` |
| D-6 | Verifier + refine: sukces po poprawce; fail po `max N=2` → `failed` |
| D-7 | Stub błędu gateway: run `failed` / retry wg polityki; log bez wycieku `X-Gateway-Key` |
| D-8 | Korelacja: stały `conversationId`; `requestId` z „odpowiedzi” stubu gateway w logu kroku |
| D-9 | Kolejka: przy limicie współbieżności nowy run zostaje `queued`, potem startuje (`SPEC-RUNY.md`) |
| D-9b | Drain: przy `MAX=1` dwa `interrupted` + jeden `queued` → kolejność execute: interrupted, interrupted, queued |
| D-10 | Recovery: leftover `running` → `interrupted`; claim pod `MAX_CONCURRENT_RUNS`; leftover już `interrupted` bez inkrementu `recoveryAttempts`; 3× przerwany execute → `failed` + log |
| D-11 | `POST /feedback`: zapis z `authorId`+`createdAt`; cudzy `runId` → `FORBIDDEN`; własny run w toku (`queued` / `running` / `awaiting_hitl` / `interrupted`) → **409** `RUN_NOT_REVIEWABLE` (bez zapisu); `completed` \| `failed` → 201; `cancelled` **bez** wyniku → 409; `cancelled` **z** wynikiem → 201; drugi wpis = nowy wiersz (także po finalize) |
| D-12 | Ocena `null` \| 1–5 na `completed`/`failed` tylko autora; na `cancelled` → **409** `RUN_NOT_REVIEWABLE`; po finalize → `REVIEW_LOCKED`; `POST .../output-edited` z `{ result }` zastępuje kanoniczny wynik i stawia `outputEdited`; GET snapshot zwraca treść po edycji; snapshot / sukces mutacji niosą `pipelineFinishedAt` + `reviewExpiresAt` (lista usera **bez** tych pól) |
| D-13 | `GET /runs/user/:userId`: własne wszystkie; cudzy id → `403` |
| D-14 | SSE: hub nie zatrzymuje subjectu po `completed`/`failed`/`cancelled`; po cancel kolejność `run.status` → `run.cancelled` → complete; `GET .../events` na skończonym runie emituje `run.status` i kończy stream |
| D-15 | `reel_ideas` full-auto: `running` → `completed`; `result.reelIdeas[0].id` |
| D-16 | `reel_ideas_then_scripts`: `awaiting_hitl` (`options` = reelIdeas) → resume → `result.reelScripts[]` (każdy element + `sourceIdeaId`); skalar `result.reelScript` = `null` po completed fazy 2 |
| D-17 | `page_copy` full-auto: completed + `pageDocument`; body **bez** `ideaCount` (`ContentBrief`) |
| D-18 | `page_outline_then_copy`: HITL outline → dokument → `completed`; HITL z obcym id → **400** `HITL_INVALID_SELECTION`, status zostaje `awaiting_hitl` |
| D-19 | `taskType` spoza enumu HTTP → **400** `VALIDATION_FAILED`; composite: nieznany typ wewnętrzny → `failed` / `UNKNOWN_TASK_TYPE` (unit `execute` / `assertNever`) |
| D-19a | Unit Zod / HTTP: `page_*` + `brief.ideaCount` → **400** `VALIDATION_FAILED`; Social + `brief.angle` (lub `targetLength`) → **400** `VALIDATION_FAILED` |
| D-20 | Unit Zod `CompanyContextExtras`: znany kształt OK; nieznany klucz → fail; `isComplete` ignoruje extras. Unit/e2e unknown key → **400**; ścieżki w `details` zgodne z separatorem `'.'` wspólnego `parseWithZod` (`apps/api/src/shared/parse-with-zod.ts`). Case na **kompletnym** body bramki (niekompletny zapis = D-29). Bez wymogu osobnego testu wyłącznie na lokalizację pliku helpera. |
| D-21 | HITL Social (`post_ideas_then_content` / `reel_ideas_then_scripts`): 0 id, duplikat albo obcy id → **400** `HITL_INVALID_SELECTION` (bez zapisu, status `awaiting_hitl`); **2 poprawne** id → `completed` z 2 artefaktami (`contents[]` / `reelScripts[]`, `sourceIdeaId`); 1 poprawny → tablica długości 1 |
| D-22 | GET result: `characterCount === body.length` (skalar lub każda pozycja `contents[]`); outline z `role` enum przechodzi parse; nieznany `role` → fail |
| D-23 | Zaproszenie (admin, cookie): `POST /invitations` `{ email }` → pending; publiczny `POST /auth/accept-invite` `{ token, password }` → `User` `role=user`; potem `POST /auth/login` nowym kontem. Artefakt E2E: istniejąca kolekcja Postman (`T-5` — bez pinu runnera) |
| D-24 | `user` woła `POST /invitations` → **403**. Drugi `POST` przy `pending` (także wygasłym) → **409**. `GET /invitations` zwraca też wygasłe pending |
| D-25 | Soft-delete: `DELETE /users/:id` → `isActive = false`; nieaktywny nie loguje się (ten sam komunikat 401 co złe hasło — bez enumeracji) |
| D-26 | Reaktywacja: `PATCH /users/:id` `{ isActive: true }` na soft-deleted `user` → **200** `isActive: true`; następnie `POST /auth/login` tym kontem → **200**. `isActive: false` → **400**. `user` woła PATCH → **403**. |
| D-27 | `PATCH /auth/me/email` `{ email, currentPassword }` (sesja, poprawne hasło): **200** `{ id, email, role }`; `GET /auth/me` zgadza się. Ten sam email co obecny + poprawne hasło → **200** bez zmiany wiersza. Złe hasło → **401** `INVALID_PASSWORD` / `Invalid password`, email w DB **bez** zmiany. Pusty / brak `currentPassword` → **400** `VALIDATION_FAILED`, email bez zmiany. Brak sesji → **401** `UNAUTHORIZED`. Drugi użytkownik / email zajęty (po udanym re-auth) → **409**. `PATCH /users/:id` z `email` nadal **400**. Brak mutacji na `PATCH /auth/me` (albo trasa nie istnieje / nie zmienia emaila). |
| D-28 | `GET /runs?status=completed,failed,cancelled`: tylko te statusy, `pageSize=10`, sort `createdAt` desc (mieszane); pojedynczy `status=interrupted` bez regresji; nieznana wartość w liście → **400** `VALIDATION_FAILED` |
| D-29 | PUT/PATCH `/company-context` przy niekompletnej bramce (w tym kaleka oferta: brak opisu / pusta korzyść / druga niepełna pozycja) → **400** `VALIDATION_FAILED`; singleton w DB **bez zmiany** (brak upsert). D-1 (start → 409 `CONTEXT_INCOMPLETE`) **zostaje**. |
| D-30 | Cancel happy: `startedBy` woła `POST .../cancel` na nieterminalnym → **200**, `status=cancelled`, `cancelledAt` ustawione; log append; SSE `run.status` + `run.cancelled` + complete huba |
| D-31 | Cancel idempotencja: drugi `POST .../cancel` na już `cancelled` → **200** (bez błędu) |
| D-32 | Cancel race: status już `completed` \| `failed` → **409** `RUN_NOT_CANCELABLE`; obcy `startedBy` → **403** |
| D-33 | Recovery + flaga: leftover `running` lub `interrupted` z `cancelRequested` na bootcie → `cancelled` (bez `recoveryAttempts++`); flaga na już-terminalnym ignorowana |
| D-34 | HITL po cancel: `POST .../hitl` na `cancelled` → odrzucenie (nielegalny status; bez wznowienia pipeline) |
| D-35 | Po TTL (`now ≥ pipelineFinishedAt + REVIEW_TTL`), `reviewFinalizedAt` jeszcze `null`: mutacja rating / output-edited / finalize → **409** `REVIEW_LOCKED`; `userRating` / `result` / `outputEdited` / `reviewFinalizedAt` **bez zmian** przy tej mutacji (brak CAS / side-effect UPDATE locka) |
| D-36 | Sweeper (boot **lub** tick okresowy): dla zaległych otwartych przeglądów ustawia `reviewFinalizedAt = pipelineFinishedAt + REVIEW_TTL`; **bez** zmiany `userRating` / `outputEdited` / `result`; **bez** DELETE |
| D-37 | Restart api nie odmraża wygasłego przeglądu: po boot sweeperze (lub gdy okno już minęło) mutacja nadal `REVIEW_LOCKED`; okno **nie** otwiera się na nowo |
| D-38 | GET snapshot **nie** ustawia `reviewFinalizedAt` (4a — czysty odczyt); po TTL przed sweeperem `reviewExpiresAt` nadal ISO, `reviewFinalizedAt` nadal `null` |
| D-39 | Backfill B: kotwica z `updatedAt` (fallback `createdAt`); stary run `completed`/`failed` bez finalize, z kotwicą starszą niż TTL → po boot sweeperze locked (`reviewFinalizedAt = pipelineFinishedAt + REVIEW_TTL`) |
| D-40 | Regresja: ręczne finalize **przed** TTL → `REVIEW_LOCKED` na kolejnych mutacjach; `cancelled` → przegląd `RUN_NOT_REVIEWABLE` (`pipelineFinishedAt` null); `POST /feedback` nadal **201** po auto-close / TTL przeglądu (append; nie `REVIEW_LOCKED`) |

Zmiana względem: D-27 na `PATCH /auth/me` bez `currentPassword` / bez `INVALID_PASSWORD`. (Nota: recovery UI po 409 + brak wylogowania przy `INVALID_PASSWORD` = norma FE / `ux_dashboard.md`; D-27 pozostaje kontraktem HTTP api.)

Zmiana względem wersji 20: dopisano D-30…D-34 (anulowanie); D-11 / D-12 / D-14 / D-28 rozszerzone o `cancelled` / wynik / SSE. D-1…D-29 bez kasowania treści.

Zmiana względem wersji 23: dopisano D-35…D-40 (TTL / auto-finalize / 4a / backfill / regresje); D-12 uściślone o pola meta TTL. D-1…D-34 bez kasowania treści.

Zmiana względem wersji 19: dopisano D-29 (twardy zapis kontekstu — C-4). D-1…D-28 bez kasowania treści. D-20 uściślone: extras round-trip na kompletnym body bramki.
Zmiana względem wersji 18: T-5 i kryteria akceptacji obejmują też D-28 (wcześniej D-28 było w tabeli, bez jawnego pinu w T-5 / checklistcie D-1…D-28).
Zmiana względem wersji 17: dopisano D-28 (filtr `status` wielowartościowy pod archiwum UI). D-1…D-27 bez kasowania treści.

D-4 i D-5 **zostają**. T-5 obejmuje use-case’y post, reel i page **oraz** zaproszenie → accept → login **oraz** D-26 (reaktywacja → login) **oraz** D-27 (zmiana własnego emaila z re-auth — `PATCH /auth/me/email` + `INVALID_PASSWORD`) **oraz** D-28 (filtr `status` wielowartościowy z `cancelled`) **oraz** D-29 (PUT/PATCH niekompletnej bramki → 400) **oraz** D-30…D-34 (cancel) **oraz** D-35…D-40 (TTL przeglądu / sweeper). T-3 (cookie) **bez zmian**.

Zmiana względem wersji 16: dopisano D-27 (`PATCH /auth/me` email; 409 zajęty; `PATCH /users/:id` bez email). D-1…D-26 bez kasowania treści.
Zmiana względem: D-27 rozszerzone o `currentPassword` / `INVALID_PASSWORD` / trasę `/auth/me/email`.

Zmiana względem wersji 14: dopisano D-26 (reaktywacja po soft-delete + login; `isActive: false` → 400; `user` → 403). D-1…D-25 bez kasowania treści.

Zmiana względem wersji 13 / D-11: `POST /feedback` na własny run w toku nie był case’em DoD. Od tej wersji **409** `RUN_NOT_REVIEWABLE` (Fbk-3a); 201 tylko `completed` \| `failed`; drugi wpis nadal nowy wiersz (także po finalize).

Zmiana względem wersji 12: dopisano D-23…D-25 (zaproszenie → accept → login; 403/409 pending; GET wygasłych; soft-delete). D-1…D-22 bez kasowania.
Zmiana względem wersji 11 / D-16: asercja wyłącznie skalaru `reelScript.segments` na then_scripts — od tej wersji `reelScripts[]` + `sourceIdeaId`.
Zmiana względem wersji 11 / D-21 (i v9: D-21 = 2+ → 400): 2 legalne id to pozytyw N→N; 400 tylko przy 0 / duplikacie / obcym id.

Zmiana względem wersji 10 / D-20: doprecyzowano separator `details[].path` = `'.'` wspólnego helpera (po wyniesieniu `parseWithZod` do api shared).
Zmiana względem wersji 9: dopisano D-20…D-22 (extras, HITL SM 1 id, characterCount / role) — norma, że muszą istnieć; szczegóły case’ów = Faza 4.3 major.
Zmiana względem wersji 8: D-17 uściślone (brief page bez `ideaCount`); dopisano D-19a (XOR kształtu briefu).
Zmiana względem wersji 6: dopisano D-15…D-19 (rolki, Content, orkiestracja). D-4…D-14 bez zmiany semantyki.

Zmiana względem wersji 7 / D-18: dopisano negatyw HITL (obce id outline).

## Norma implementacji

### Wzorce

| Element | Norma |
|---------|--------|
| Unit | Szybkie; bez prawdziwego HTTP; porty jako fake |
| Integration | Prawdziwy adapter SQLite testowy; stub LLM; cookie jar / agent z cookie |
| Graf | Ścieżki refine/HITL przez use-case + fake LLM; pełny graf rzadko |
| Asercje | Zachowanie i kontrakt (statusy, kody envelope, pola logu) — nie lustrzane mocki implementacji |

### Wolno

- Kontrolowane generatory czasu / UUID w testach domain.
- Osobna baza SQLite na suite integration.
- Opcjonalny smoke przeciw prawdziwemu gateway **poza PR** (staging).
- Kolekcja Postman v2.1 w `apps/api/test/postman/` jako artefakt E2E poza CI PR; Setup happy path przez `PUT /company-context` i weryfikację completeness. Pliki: `social-pipeline.postman-collection.json` (foldery A–D: posty + rolki); `content-pipeline.postman-collection.json` (A `page_copy`, B `page_outline_then_copy`). `reel_script` solo — E2E Jest, nie obowiązkowy Postman (jak `post_content` w Milestone 4).
- Unit helpera logu hopu gateway (redakcja `GATEWAY_KEY`) oraz preprocess zarzutów verifiera (obiekt `{ itemId, issue }` → `string`).

Zmiana względem: dotychczasowa norma mówiła tylko „narzędzie E2E bez pinu” i „opcjonalny smoke poza PR” — bez kanonicznej ścieżki artefaktu i bez zakazu mylenia kolekcji z modułem Nest. T-5, tabela stacku (bez pinu runnera) i poza zakresem „wybór konkretnego runnera” zostają.

Zmiana względem wersji 5: dopisano unit redakcji dumpa hopu i coerce zarzutów verifiera (kod w `apps/api/src/llm/` oraz `social.schemas.ts` — `docs/testy.md`, `docs/data_flow.md`).

### Nie wolno

- Traktowania E2E jako **jedynej** siatki bezpieczeństwa (bez unit/integration).
- Live OpenAI/Anthropic (lub innego vendora) na każdy PR.
- Wymuszania suite automatycznego FE w v1/MVP.
- Over-mockowania (testy tylko powtarzające implementację).
- Odkładania testów bramki, HITL, recovery, anulowania (D-30…D-34), TTL / auto-finalize przeglądu (D-35…D-40) ani cyklu życia SSE (D-14) „na potem” poza DoD.
- `apps/api/postman/` / `src/postman/` jako pozorne BC.
- Seed Prisma/SQL kontekstu jako substytut Setupu E2E.

### Zatwierdzony stack (obszar)

| Element | Status |
|---------|--------|
| **Jest** | obowiązkowe |
| **supertest** | obowiązkowe (integration HTTP) |
| Cookie auth w testach | obowiązkowe |
| Narzędzie E2E API (Postman/Newman/…) | **bez pinu** w SPEC |
| Playwright / testy FE | poza MVP |
| Live LLM na PR | zakaz |

## Kryteria akceptacji

- [ ] `pnpm` (lub skrypt CI) odpala Jest: unit + integration api na PR.
- [ ] Przypadki D-1…D-40 (w tym D-9b, D-15…D-19a, D-20…D-22, D-23…D-29, D-30…D-34, D-35…D-40) pokryte testami (warstwa adekwatna do przypadku).
- [ ] Brak zależności CI PR od live vendorów LLM.
- [ ] E2E API (gdy uruchamiane) obejmuje use-case’y MVP oraz wybrane error/edge — nie sam happy path.
- [ ] Suite nie wymaga Bearer; działa na cookie.

## Poza zakresem

- Automatyczne testy `apps/frontend`.
- Osobny framework consumer-driven contract testing.
- Chaos / load testing.
- Wybór konkretnego runnera E2E API (pozostawiony implementacji).
