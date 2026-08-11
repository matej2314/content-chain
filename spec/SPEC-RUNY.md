---
wersja: 1
data_utworzenia: 2026-08-11
data_modyfikacji: 2026-08-11
---

# SPEC — Runy / logi

## Cel / zakres względem dokumentacji

Norma bounded contextu **Runs / Logs** w `apps/api`: cykl życia async runu, polityka statusów, kanoniczne logi w DB, emisja SSE, kolejka współbieżności oraz recovery po przerwaniu procesu.

Uszczegóławia `docs/architektura.md` (async run), `docs/dokumentacja_komunikacji.md` (SSE / GET), `docs/observability.md` (pola logów vs metrics) oraz współpracę z `SPEC-SOCIAL.md` (fazy pipeline’u, HITL model B).

## Powiązanie ze stylem z docs

Wiążące: klasyczne warstwy Nest — controller → application → domain (przejścia statusów, retry/recovery) + porty → adaptery. LangGraph **nie** należy do tego BC (pozostaje w Social za fasadą).

**Podział odpowiedzialności:**

| BC | Odpowiedzialność |
|----|------------------|
| **Runs** | Utworzenie runu, statusy, kolejka slotów, append logów, SSE, recovery, HITL HTTP jako zmiana stanu runu |
| **Social** | Węzły pipeline’u; woła porty Runs (`appendLog`, `transitionStatus`, zapis wyniku SM) — bez omijania cyklu życia |

**Wyjątek względem stylu globalnego:** brak.

## Statusy (norma)

Dozwolona ścieżka:

```text
queued → running → (awaiting_hitl → running) → completed
                                         ↘ failed
                         running ──────────→ failed
```

Przejścia inne niż dozwolone krawędzie domeny → odrzucenie (`CONFLICT` / błąd domenowy). Przykład zakazany: `completed` → `running`.

## Wymagania (egzekwowalne)

R-1. W domain istnieje polityka przejść statusów (dozwolone krawędzie + egzekucja przy każdej zmianie).

R-2. `run.log` jest **append-only** w DB (brak edycji / usuwania wpisów historii w MVP). Pola wpisu zgodne z `docs/observability.md`: m.in. `runId`, `conversationId` (po starcie), `at`, `level`, `message`, `step?`, `requestId?`.

R-3. Live postęp wyłącznie przez SSE (`SPEC-KOMUNIKACJA.md`). GET run / logs = snapshot. Zakaz pollingu statusu jako kanału live.

R-4. Emisja zdarzeń SSE należy do Runs; Social nie streamuje SSE bezpośrednio z węzłów grafu.

R-5. Worker MVP: **in-process** w procesie `apps/api` (po `202` z `POST /runs`). Zakaz spawnu osobnego procesu OS na każdy run oraz osobnego always-on workera w MVP.

R-6. Współbieżność: tylko limit **globalny** `MAX_CONCURRENT_RUNS` (env), domyślnie **3**. Nowe runy powyżej limitu pozostają w `queued` i są podejmowane FIFO (lub równoważnie fair globalnie), gdy zwolni się slot. Bez limitu per-user w v1.

R-7. Retention: logi runu **bez TTL** w MVP; **bez** limitu długości `message` w MVP. Zakaz sekretów w `message` (jak observability / security).

R-8. `/metrics` (Prometheus) **nie** zastępuje logów runu i nie jest kanałem przebiegu domenowego.

R-9. Recovery po brutalnym przerwaniu `running` (restart / crash procesu api):

1. Przy starcie api wykryj runy pozostawione w `running`.
2. Dla każdego: do **3** prób wznowienia **fazy** z trwałego stanu w DB (model B z `SPEC-SOCIAL.md` — re-invoke, nie checkpointer, nie dokończenie przerwanego hopu LLM w locie).
3. Przed każdą próbą / przy klasyfikacji błędu: `isRetryable(...)` — retry m.in. dla recovery po crashu, timeoutów / rate-limit gateway (zgodnie z polityką); **bez** retry dla błędów walidacji, wyczerpanego refine verifiera, błędów konfiguracji klucza gateway itd.
4. Po wyczerpaniu 3 prób → `failed` + czytelny wpis logu (powód recovery / exhausted).
5. Run w `awaiting_hitl` po restarcie **pozostaje** `awaiting_hitl` — bez zużywania puli recovery.

## Norma implementacji

### Wzorce / struktura

```text
apps/api/src/runs/
├── runs.module.ts
├── runs.controller.ts           # CRUD snapshot, logs, events SSE, hitl
├── application/                 # start, enqueue, resume hitl, recovery on boot
├── domain/                      # status transitions, isRetryable, porty
└── infrastructure/              # Prisma run/log, SSE hub / subject
```

| Element | Norma |
|---------|--------|
| Kolejka | Stan w DB (`queued` / `running`); semafor współbieżności w procesie api |
| SSE | Nest `@Sse()`; subskrypcja po `runId`; auth jak API |
| Licznik recovery | Pole / metadane runu (np. `recoveryAttempts`), cap = 3 |
| Idempotencja HITL | Tylko ze statusu `awaiting_hitl` |

### Wolno

- Po `POST /runs` od razu `running`, jeśli jest wolny slot; w przeciwnym razie `queued`.
- Przy starcie api uruchomić use-case recovery przed podejmowaniem nowych `queued`.
- Emitować SSE przy każdym udanym `appendLog` i każdej legalnej zmianie statusu.

### Nie wolno

- Pollingu statusu runu jako live.
- Traktowania stdout jako jedynego źródła przebiegu dla UI.
- Mylenia `/metrics` z logami runu.
- Niedozwolonych skoków statusów.
- Spawnu procesu per run; always-on worker process w MVP.
- Limitu współbieżności per-user w v1.
- Checkpoinetera LangGraph jako mechanizmu recovery Runs.
- Wycieku sekretów do `run.log`.

### Zatwierdzony stack (obszar)

| Element | Status |
|---------|--------|
| BC Runs + porty używane przez Social | obowiązkowe |
| Append-only logi w DB + SSE Nest | obowiązkowe |
| In-process worker + `MAX_CONCURRENT_RUNS` (default 3) | obowiązkowe |
| Recovery `running`: max 3 × `isRetryable` → potem `failed` | obowiązkowe |
| Osobny worker process / per-user limit / TTL logów | poza MVP |

## Kryteria akceptacji

- [ ] Nielegalne przejście statusu jest odrzucane.
- [ ] Logi rosną tylko przez append; GET logs zwraca historię; SSE dostarcza przyrosty.
- [ ] Przy zajętych slotach nowy run jest `queued` i startuje po zwolnieniu slotu (globalny limit, default 3).
- [ ] Po restarcie api: `awaiting_hitl` bez zmian; `running` przechodzi recovery ≤ 3, potem ewentualnie `failed` z logiem.
- [ ] Social nie emituje SSE omijając Runs.
- [ ] `/metrics` nie jest używane jako podgląd przebiegu runu.

## Poza zakresem

- Animacje / EventSource UI → `SPEC-FRONTEND.md`.
- Pełny zestaw metryk Prometheus i OTel → docs observability / `SPEC-BEZPIECZENSTWO.md`.
- Publikacja draftów na API portali SM (v2).
- Osobny always-on worker process, broker kolejek (Redis itd.).
- Checkpointer LangGraph.
- Limit współbieżności per użytkownik.
