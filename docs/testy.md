# Testy — Content Chain

Strategia testów **MVP**. Cel: szybka pewność na domenie i granicach `apps/api` + kontrakt z gateway (przez port), bez rozdmuchanego E2E UI.

Powiązane: `architektura.md`, `data_flow.md`, `anty_patterny.md`, `spec/SPEC-TESTY.md`.

## Piramida (MVP)

| Warstwa | Gdzie | Udział | Co obejmuje |
|---------|-------|--------|-------------|
| **Unit** | `apps/api` (domain, application) | Najwięcej | Bramka kontekstu, statusy runu, role, fasady use-case z **portami** (LLM/persistence jako fake) |
| **Integration** | `apps/api` | Mniej | HTTP (**supertest**) + Prisma/SQLite; SSE/statusy runu; auth **cookie** (`cc_access` / `cc_refresh`) |
| **E2E API** | przeciw api (bez przeglądarki) | Wąsko | Use-case’y MVP + error/edge case’y — **bez pinu narzędzia** w docs/SPEC |
| **Frontend** | — | **Poza MVP** | Brak wymogu automatycznych testów `apps/frontend` w MVP |

```text
        /\
       /E2E\        wąskie (API; narzędzie dowolne)
      /------\
     / Integr.\     api + DB (+ HTTP / supertest)
    /----------\
   /   Unit     \   domain + use-case + porty (Jest)
  /--------------\
```

## Narzędzia (norma)

| Warstwa | Narzędzie |
|---------|-----------|
| Unit + integration | **Jest** (obowiązkowe) |
| Integration HTTP | **supertest** (obowiązkowe) |
| E2E API | **bez pinu** — Postman/Newman, skrypt lub równoważne; byle pokrycie use-case / error / edge |
| FE | poza MVP (np. Playwright później) |

## Zasady

1. **Testuj zachowanie na granicach** — controllery cienkie; reguły w domain/application.
2. **Port LLM** — w unit/integration api **nie** wołamy live vendorów; stub/fake adaptera gateway (ew. kontrakt odpowiedzi zgodny z natywnym chat).
3. **Graf LangGraph** — węzły i ścieżki refine/HITL przez use-case + fake LLM; **pełny graf** tylko w nielicznych testach integracyjnych.
4. **Verifier** — osobne przypadki: fail kontekstu, fail języka, ok, wyczerpanie `max N=2` → `failed`.
5. **Korelacja** — asercje, że po stubie gateway w logu runu jest `requestId` z „odpowiedzi” oraz stały `conversationId`.
6. **Auth w testach** — cookie jar / agent z `cc_access` / `cc_refresh`; bez Bearer jako modelu MVP.
7. **Frontend poza MVP** — jakość UI weryfikowana ręcznie / E2E API; automatyczne testy FE = później (po MVP / w dalszej rozbudowie).

## Co mockować / nie mockować

| Zależność | Unit | Integration api |
|-----------|------|-----------------|
| Port LLM (gateway client) | fake/stub | fake/stub (domyślnie) |
| Prisma / SQLite | fake port lub in-memory wg potrzeby | **prawdziwy** adapter SQLite testowy |
| Clock / uuid | kontrolowane w testach domain | jak w app lub testowe generatory |
| Live `ai-provider-gateway` + vendor | nie | nie w CI MVP (opcjonalny smoke poza PR) |

## Priorytety przypadków (DoD jakości api)

- Bramka: niekompletny kontekst → brak startu runu (`CONTEXT_INCOMPLETE`).
- Authz: `user` nie zapisze kontekstu; `admin` tak; obaj mogą startować run (przy kompletności).
- Cookie auth: chronione trasy bez sesji → `UNAUTHORIZED`.
- `post_ideas` full-auto: queued→running→completed; logi + wynik w DB.
- `post_ideas_then_content`: `awaiting_hitl` → resume → content → completed.
- Verifier + refine: sukces po poprawce; fail po `max N=2`.
- Błąd gateway (stub): run `failed` / retry wg polityki — czytelny log bez wycieku `X-Gateway-Key`.
- Kolejka współbieżności i recovery runu — wg `spec/SPEC-RUNY.md` / `spec/SPEC-TESTY.md`: nowy run ponad cap → `queued`; leftover `running` → `interrupted` → claim pod `MAX_CONCURRENT_RUNS` (priorytet nad `queued`); 3× przerwany execute → `failed` + log.
- Feedback: zapis opinii z metadanymi; ocena `null`/`1–5`; flaga edycji; lock po finalize; `403` na cudzy run; `GET /runs/user/:id` tylko własny id.

## CI (MVP)

| Moment | Suite |
|--------|-------|
| **PR** | Unit + integration `apps/api` (**Jest** + **supertest**) |
| **Po pojawieniu się FE / przed release self-host** | Wąskie E2E API (narzędzie dowolne; use-case + error/edge, nie tylko happy path) |
| **Poza MVP** | Testy `apps/frontend` (np. Playwright) |
| **Opcjonalnie poza PR** | Smoke przeciw prawdziwemu gateway (staging) |

## Anty-patterny testowe (skrót)

- E2E jako jedyna siatka bezpieczeństwa.
- Mockowanie wszystkiego tak, że test tylko powtarza implementację (London overuse).
- Integration zależne od live OpenAI/Anthropic na każdy PR.
- Odkładanie testów bramki i HITL „na potem”.
- Wymuszanie suite FE w MVP (świadomie poza zakresem).

## Poza zakresem MVP

- Automatyczne testy `apps/frontend`
- Contract testing consumer-driven jako osobny framework (wystarczy zgodność ze stubem natywnego chat + docs gateway)
- Chaos / load testing
- Pin konkretnego narzędzia E2E API

Szczegóły egzekwowalne: `spec/SPEC-TESTY.md`.
