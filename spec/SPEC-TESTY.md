---
wersja: 1
data_utworzenia: 2026-08-11
data_modyfikacji: 2026-08-11
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
| **Unit** | `apps/api` (domain, application) | Najwięcej | Bramka, statusy, role, `isRetryable`, fasady z **fake** portów (LLM, persistence wg potrzeby) |
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
| D-10 | Recovery: symulacja przerwanego `running` → ≤3 próby retryable → potem `failed` + log |

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

### Nie wolno

- Traktowania E2E jako **jedynej** siatki bezpieczeństwa (bez unit/integration).
- Live OpenAI/Anthropic (lub innego vendora) na każdy PR.
- Wymuszania suite automatycznego FE w v1/MVP.
- Over-mockowania (testy tylko powtarzające implementację).
- Odkładania testów bramki, HITL, recovery „na potem” poza DoD.

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
- [ ] Przypadki D-1…D-10 pokryte testami (warstwa adekwatna do przypadku).
- [ ] Brak zależności CI PR od live vendorów LLM.
- [ ] E2E API (gdy uruchamiane) obejmuje use-case’y MVP oraz wybrane error/edge — nie sam happy path.
- [ ] Suite nie wymaga Bearer; działa na cookie.

## Poza zakresem

- Automatyczne testy `apps/frontend`.
- Osobny framework consumer-driven contract testing.
- Chaos / load testing.
- Wybór konkretnego runnera E2E API (pozostawiony implementacji).
