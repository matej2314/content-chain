---
wersja: 10
data_utworzenia: 2026-08-11
data_modyfikacji: 2026-09-04
---

# SPEC — Testy

## Cel / zakres względem dokumentacji

Norma strategii testów MVP Content Chain: piramida, narzędzia, obowiązkowe przypadki DoD oraz CI — uszczegółowienie `docs/testy.md` pod egzekwowalne reguły przy implementacji `apps/api`.

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
| D-11 | `POST /feedback`: zapis z `authorId`+`createdAt`; cudzy `runId` → `FORBIDDEN`; drugi wpis = nowy wiersz |
| D-12 | Ocena `null` \| 1–5 na `completed`/`failed` tylko autora; po finalize → `REVIEW_LOCKED`; flaga `outputEdited` |
| D-13 | `GET /runs/user/:userId`: własne wszystkie; cudzy id → `403` |
| D-14 | SSE: hub nie zatrzymuje subjectu po `completed`/`failed`; `GET .../events` na skończonym runie emituje `run.status` i kończy stream |
| D-15 | `reel_ideas` full-auto: `running` → `completed`; `result.reelIdeas[0].id` |
| D-16 | `reel_ideas_then_scripts`: `awaiting_hitl` (`options` = reelIdeas) → resume → `result.reelScript.segments` → `completed` |
| D-17 | `page_copy` full-auto: completed + `pageDocument`; body **bez** `ideaCount` (`ContentBrief`) |
| D-18 | `page_outline_then_copy`: HITL outline → dokument → `completed`; HITL z obcym id → **400** `HITL_INVALID_SELECTION`, status zostaje `awaiting_hitl` |
| D-19 | `taskType` spoza enumu HTTP → **400** `VALIDATION_FAILED`; composite: nieznany typ wewnętrzny → `failed` / `UNKNOWN_TASK_TYPE` (unit `execute` / `assertNever`) |
| D-19a | Unit Zod / HTTP: `page_*` + `brief.ideaCount` → **400** `VALIDATION_FAILED`; Social + `brief.angle` (lub `targetLength`) → **400** `VALIDATION_FAILED` |
| D-20 | Unit Zod `CompanyContextExtras`: znany kształt OK; nieznany klucz → fail; `isComplete` ignoruje extras |
| D-21 | HITL Social: 0 id lub 2+ id → **400** `HITL_INVALID_SELECTION`; 1 poprawny id → `completed` z content/script |
| D-22 | GET result: `characterCount === body.length`; outline z `role` enum przechodzi parse; nieznany `role` → fail |

D-4 i D-5 **zostają**. T-5 obejmuje use-case’y post, reel i page.

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
- Odkładania testów bramki, HITL, recovery ani cyklu życia SSE (D-14) „na potem” poza DoD.
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
- [ ] Przypadki D-1…D-22 (w tym D-9b, D-15…D-19a, D-20…D-22) pokryte testami (warstwa adekwatna do przypadku).
- [ ] Brak zależności CI PR od live vendorów LLM.
- [ ] E2E API (gdy uruchamiane) obejmuje use-case’y MVP oraz wybrane error/edge — nie sam happy path.
- [ ] Suite nie wymaga Bearer; działa na cookie.

## Poza zakresem

- Automatyczne testy `apps/frontend`.
- Osobny framework consumer-driven contract testing.
- Chaos / load testing.
- Wybór konkretnego runnera E2E API (pozostawiony implementacji).
