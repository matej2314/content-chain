# Słownik — Content Chain

Kanoniczne definicje pojęć domenowych i technicznych. Identyfikatory typów, kodów i pól API w backtickach; opisy po polsku.

Powiązane: `dokumentacja_koncepcyjna.md`, `architektura.md`, `dokumentacja_komunikacji.md`, `brand_types.md`.

---

## Produkt i domena

| Pojęcie | Definicja |
|---------|-----------|
| **Content Chain** | Publiczna, self-hostowalna aplikacja agentowa do generowania treści SM z weryfikacją względem kontekstu firmy, zapisem wyników i obserwowalnymi runami. |
| **Kontekst firmy** (`Company Context`) | Kanoniczny zestaw informacji o organizacji w DB (jedna instancja = jedna firma); wejście do generowania i weryfikacji spójności. |
| **Bramka kontekstu** / kompletność | Programowy warunek: wymagane sekcje kontekstu uzupełnione → flow’y SM odblokowane; inaczej start runu zablokowany (`CONTEXT_INCOMPLETE`). |
| **Sekcje bramki** | Tożsamość, oferta (≥1 usługa + korzyść), głos SM, CTA/kanały, odbiorca — patrz docs koncepcyjne. |
| **Post ideas** | Lista pomysłów na posty SM (task / etap pipeline’u). |
| **Post content** | Gotowe copy posta (hook, body, CTA itd.). |
| **Brief SM** | Wejście użytkownika do runu: temat, grupa docelowa, cel, platforma, język, liczba pomysłów itd. |
| **Weryfikacja spójności** | Krok pipeline’u sprawdzający treść względem kontekstu firmy przed uznaniem wyniku. |
| **HITL** | Human-in-the-loop: pauza runu na wybór z listy, gdy kolejny krok zależy od selekcji (task dwuetapowy). |
| **Full-auto** | Wykonanie tasku jednoetapowego bez wymuszonej pauzy selekcji. |
| **Self-host** | Uruchomienie we własnej infrastrukturze operatora; licencja MIT. |
| **MVP** | Pierwszy kompletny slice produktowy: auth, dashboard, post ideas/content, gateway, **SQLite**, logi, SSE. |
| **V1 — rozbudowa** | Faza **po MVP**: kolejne workflowy / agenci poza pierwszym slice Social; obowiązkowy cutover persistence na **PostgreSQL** (`spec/SPEC-PERSISTENCE.md`). Nie mylić z prefiksem HTTP `/api/v1`. |

## Role i tenancy

| Pojęcie | Definicja |
|---------|-----------|
| **`admin`** | Jedyny administrator (bootstrap); wyłączne prawo edycji kontekstu firmy; może generować treści jak `user`. Norma: `security.md`. |
| **`user`** | Rola uruchamiająca flow’y SM i przeglądająca wyniki/logi; bez edycji kontekstu. |
| **Jedna firma / instancja** | Brak multi-tenant SaaS: wszyscy użytkownicy instancji dzielą jeden kontekst. |
| **Bootstrap admin** | Utworzenie pierwszego konta administratora przy starcie self-host. |

## Architektura i runtime

| Pojęcie | Definicja |
|---------|-----------|
| **Modularny monolit** | Trzy procesy w jednym monorepo (`apps/api`, `apps/frontend`, `apps/ai-provider-gateway`) ze wspólnym `packages/shared`. |
| **Port / adapter** | Granica I/O: domain/application zależą od portu; Prisma, klient gateway itd. to adaptery. |
| **Bounded context (BC)** | Moduł odpowiedzialności w `apps/api`: Auth, Company Context, Social, Runs/Logs. |
| **LangGraph / graf** | Orchestracja pipeline’u Social za fasadą application service (nie w controllerze). |
| **Async run** | Asynchroniczne wykonanie pipeline’u; klient dostaje `RunId`, postęp przez SSE. |
| **Gateway** (`ai-provider-gateway`) | Osobna aplikacja — jedyna droga `apps/api` do vendorów LLM; bez domeny Content Chain. |
| **`packages/shared`** | Współdzielone typy kontraktu API i brand types (**bez** logiki biznesowej, **bez Zod** / runtime walidatorów). |
| **Prisma / SQLite** | Adapter persistence **MVP**; ORM tylko w infrastructure. |
| **PostgreSQL** | Silnik od fazy **V1 — rozbudowa** (nie MVP). |
| **DB kanoniczna** | Baza jako źródło prawdy dla kontekstu, runów, wyników i logów UI (nie cichy fallback z plików). |

## Run, statusy, taski

| Pojęcie | Definicja |
|---------|-----------|
| **`RunId`** | Brandowany ID runu; format `run_<uuid>`. |
| **`RunStatus`** | `queued` \| `running` \| `awaiting_hitl` \| `completed` \| `failed`. |
| **`RunTaskType`** | `post_ideas` \| `post_content` \| `post_ideas_then_content`. |
| **`SocialPlatform`** | `linkedin` \| `facebook` \| `instagram`. |
| **`ContentLanguage`** | `pl` \| `en`. |
| **Log runu** | Czytelny wpis w DB powiązany z `RunId`, zwykle też z `ConversationId` oraz `RequestId` **tego kroku**; źródło prawdy dla UI. |
| **SSE runu** | Strumień zdarzeń: `run.status`, `run.log`, `run.hitl`, `run.completed`, `run.failed`. |
| **Snapshot logów** | `GET .../runs/:runId/logs` — historia; nie zastępuje SSE dla statusu live. |
| **Agent (węzeł pipeline’u)** | Krok grafu Social (np. ideation, content writer, verifier); wywołanie LLM = osobne żądanie do gateway. |
| **Refine** | Ponowne wywołanie agenta po negatywnym werdykcie verifiera (ograniczone `max N`). |

## Identyfikatory i korelacja

Zmiana względem wcześniejszego, zbyt uproszczonego opisu: **`RequestId` nie jest jeden na cały run.** Formaty `req_<uuid>` / `conv_<uuid>` nadal jak w `ai-provider-gateway` (zgodność logów), ale semantyka zakresów jest jak poniżej.

| Pojęcie | Definicja |
|---------|-----------|
| **`RunId`** | Jeden na async run SM (`run_<uuid>`). |
| **`ConversationId`** | Brand; format jak w gateway: `conv_<uuid>`. **Jeden wspólny na cały run agentowy** — nim spinamy wszystkie wywołania LLM i wpisy logów runu (aplikacyjne + gateway). |
| **`RequestId`** | Brand; format jak w gateway: `req_<uuid>`. Nadawany w **odpowiedzi**: przez `apps/api` (HTTP) albo przez gateway (hop LLM). Klient / kroki runu **nie** generują go z góry. Oś korelacji pipeline’u SM = `ConversationId` (+ `RunId`). |
| **`UserId`** | Brand; rekomendowany format `usr_<uuid>`. |
| **`GatewayModelAlias`** | Brand aliasu modelu z konfiguracji gateway (≠ vendor `modelId`). |
| **`UserRole`** | `admin` \| `user`. |
| **Brand type** | Nominalny typ TypeScript (`Brand<K, Name>`) + walidacja na granicach; patrz `brand_types.md`. |

### Model korelacji logów (norma)

```text
RunId              ──────────────────────────────────────────►  cały run
ConversationId     ──────────────────────────────────────────►  wszystkie kroki LLM w runie (CC → body)
RequestId (HTTP)   ──► start / HITL / inne API (generuje apps/api)
RequestId (LLM₁)        ──► z odpowiedzi gateway po agencie 1
RequestId (LLM₂)              ──► z odpowiedzi gateway po agencie 2
RequestId (LLM₃)                    ──► z odpowiedzi gateway po agencie 3
```

Pełny przebieg LLM w logach = `RunId` + `ConversationId` + seria `RequestId` **nadanych przez gateway**. CC nie generuje `RequestId` „na zapas” pod wywołania chat.

## Komunikacja

| Pojęcie | Definicja |
|---------|-----------|
| **`/api/v1`** | Prefiks publicznego HTTP API Content Chain. |
| **JWT + httpOnly cookies** | Access w `cc_access` + refresh w `cc_refresh` (oba httpOnly) dla `apps/frontend` i Postmana; to samo auth dla SSE. Bez Bearer w MVP. |
| **Envelope błędu CC** | JSON: `{ code, message, requestId, details? }`. |
| **Health** | `GET /api/v1/health` — liveness procesu `apps/api`. |
| **Metrics / Prometheus** | `GET /metrics` na `apps/api` — metryki operacyjne procesu; **nie** zamiennik logów runu. |
| **`X-Gateway-Key`** | Sekret klienta gateway; tylko po stronie `apps/api` / env, nigdy w bundlu frontu. |
| **Natywny czat gateway** | `POST /api/v1/chat` (i opcjonalnie `/chat/stream`) — domyślna ścieżka LLM z Content Chain. |

## Kody błędów — Content Chain API

| `code` | Znaczenie |
|--------|-----------|
| `UNAUTHORIZED` | Brak lub nieważna sesja. |
| `FORBIDDEN` | Brak uprawnień (np. `user` edytuje kontekst). |
| `VALIDATION_FAILED` | Błąd walidacji wejścia. |
| `CONTEXT_INCOMPLETE` | Bramka kontekstu niespełniona — start runu zablokowany. |
| `HITL_REQUIRED` | Konflikt względem oczekiwanego stanu HITL. |
| `RUN_NOT_FOUND` | Nieznany `RunId`. |
| `CONFLICT` | Niedozwolone przejście statusu / konflikt stanu. |
| `INTERNAL_ERROR` | Błąd nieobsłużony po stronie `apps/api`. |

## Kody błędów — gateway (istotne dla integracji)

Skrót z kontraktu `ai-provider-gateway`; pełny słownik w docs upstream. CC mapuje je na logi runu / `failed`.

| `code` | Znaczenie (skrót) |
|--------|-------------------|
| `GATEWAY_KEY_MISSING` | Brak nagłówka `X-Gateway-Key`. |
| `GATEWAY_KEY_INVALID` | Klucz poza allowlistą. |
| `MODEL_ALIAS_NOT_FOUND` | Nieznany alias modelu w konfiguracji gateway. |
| `VALIDATION_FAILED` | Błąd walidacji DTO gateway. |
| `RATE_LIMITED` | Limit po stronie gateway (smart rate limit / cooldown). |
| `PROVIDER_RATE_LIMITED` | Limit upstream providera. |
| `PROVIDER_TIMEOUT` | Timeout wywołania providera. |
| `PROVIDER_UNAVAILABLE` | Provider niedostępny / wyczerpane retry+fallback. |
| `TOOLS_NOT_SUPPORTED` | Tooling przy aliasie bez `capabilities.tools`. |
| `STREAMING_NOT_SUPPORTED` | Stream przy aliasie bez wsparcia streamingu. |
| `PROVIDER_AUTH_FAILED` | Błąd uwierzytelnienia do upstream providera (np. niepoprawny klucz vendora w env gateway). |
| `MODEL_NOT_ALLOWED` | Niedozwolony override w `params` wg policy `allowOverrides` aliasu (np. klient przesłał `temperature`, a alias nie dopuszcza nadpisania). |
| `PROVIDER_UNSUPPORTED` | Typ providera nie ma adaptera w gateway (konfiguracja). |
| `GATEWAY_KEY_NOT_CONFIGURED` | Brak allowlisty kluczy w runtime gateway (błąd konfiguracji serwera; HTTP 500). |
| `THINKING_NOT_SUPPORTED` | `thinkingEnabled: true` przy aliasie bez `capabilities.thinking`. |

## Poza zakresem słownika

- Pełna dokumentacja OpenAPI gateway (tylko skrót kodów powyżej).
- Opisy wdrożeniowe env — `deployment.md`.
- Anty-patterny opisowe — `anty_patterny.md`.
- Bezpieczeństwo / UX / metryki szczegółowo — `security.md`, `ux_dashboard.md`, `observability.md`.
