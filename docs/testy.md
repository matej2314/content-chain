# Testy — Content Chain

Strategia testów MVP (v1). Cel: szybkie pewność na domenie i granicach `apps/api` + kontrakt z gateway (przez port), bez rozdmuchanego E2E UI.

Powiązane: `architektura.md`, `data_flow.md`, `anty_patterny.md`.

## Piramida (MVP)

| Warstwa | Gdzie | Udział | Co obejmuje |
|---------|-------|--------|-------------|
| **Unit** | `apps/api` (domain, application) | Najwięcej | Bramka kontekstu, statusy runu, role, fasady use-case z **portami** (LLM/persistence jako fake) |
| **Integration** | `apps/api` | Mniej | HTTP (supertest) + Prisma/SQLite; SSE/statusy runu; auth cookie/JWT w procesie testowym |
| **E2E / kontrakt ops** | Postman / skrypty api | Wąsko | Happy path pipeline (ideas / content / HITL) bez przeglądarki |
| **Frontend** | — | **Poza MVP (v1)** | Brak wymogu testów `apps/frontend` w v1 |

```text
        /\
       /E2E\        wąskie (API / Postman)
      /------\
     / Integr.\     api + DB (+ HTTP)
    /----------\
   /   Unit     \   domain + use-case + porty
  /--------------\
```

## Zasady

1. **Testuj zachowanie na granicach** — controllery cienkie; reguły w domain/application.
2. **Port LLM** — w unit/integration api **nie** wołamy live vendorów; stub/fake adaptera gateway (ew. kontrakt odpowiedzi zgodny z natywnym chat).
3. **Graf LangGraph** — węzły i ścieżki refine/HITL przez use-case + fake LLM; **pełny graf** tylko w nielicznych testach integracyjnych.
4. **Verifier** — osobne przypadki: fail kontekstu, fail języka, ok, wyczerpanie `max N=2` → `failed`.
5. **Korelacja** — asercje, że po stubie gateway w logu runu jest `requestId` z „odpowiedzi” oraz stały `conversationId`.
6. **Frontend poza v1** — jakość UI w MVP weryfikowana ręcznie / Postmanem na API; automatyczne testy FE = później.

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
- `post_ideas` full-auto: queued→running→completed; logi + wynik w DB.
- `post_ideas_then_content`: `awaiting_hitl` → resume → content → completed.
- Verifier + refine: sukces po poprawce; fail po `max N=2`.
- Błąd gateway (stub): run `failed` / retry wg polityki — czytelny log bez wycieku `X-Gateway-Key`.

## CI (MVP)

| Moment | Suite |
|--------|-------|
| **PR** | Unit + integration `apps/api` |
| **Po pojawieniu się FE / przed release self-host** | Wąskie E2E API (Postman/Newman lub równoważne) |
| **Poza v1** | Testy `apps/frontend` (np. Playwright) |
| **Opcjonalnie poza PR** | Smoke przeciw prawdziwemu gateway (staging) |

## Anty-patterny testowe (skrót)

- E2E jako jedyna siatka bezpieczeństwa.
- Mockowanie wszystkiego tak, że test tylko powtarza implementację (London overuse).
- Integration zależne od live OpenAI/Anthropic na każdy PR.
- Odkładanie testów bramki i HITL „na potem”.
- Wymuszanie suite FE w v1 (świadomie poza zakresem).

## Poza zakresem v1

- Automatyczne testy `apps/frontend`
- Contract testing consumer-driven jako osobny framework (wystarczy zgodność ze stubem natywnego chat + docs gateway)
- Chaos / load testing

Narzędzia konkretne (Jest/Vitest, Supertest, Newman) doprecyzuje implementacja — byle piramida i granice z tego dokumentu zostały zachowane.
