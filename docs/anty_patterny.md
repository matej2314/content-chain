# Anty-patterny — Content Chain

Krótka lista pułapek **tego** projektu i stacku. Format: objaw → dlaczego źle → zamiast tego. Ogólny podręcznik Nest/Next — poza zakresem.

Powiązane: `architektura.md`, `data_flow.md`, `dokumentacja_komunikacji.md`, `brand_types.md`, `security.md`.

---

## Granice monorepo

| Anty-pattern | Dlaczego źle | Zamiast tego |
|--------------|--------------|--------------|
| Logika SM / bramki kontekstu w `apps/frontend` | UI staje się drugim źródłem prawdy; trudny test i self-host | Reguły i graf tylko w `apps/api`; frontend = cienki klient |
| Domena Content Chain w `apps/ai-provider-gateway` | Miesza produkt z infrastrukturą LLM; psuje reuse gateway | Gateway = routing/providery; CC woła natywny chat |
| Use-case’y / Prisma w `packages/shared` | Shared przestaje być kontraktem typów | W `shared` tylko typy / brand / enumy kontraktu |
| Rootowy `src/apps/` albo rozjechane ścieżki app | Drift względem docs i DX monorepo | `apps/{api,frontend,ai-provider-gateway}` + `packages/shared` |

---

## `apps/api` i graf Social

| Anty-pattern | Dlaczego źle | Zamiast tego |
|--------------|--------------|--------------|
| Fat controller: ORM + prompt + HTTP | Niemożliwy unit test domeny; puchnięcie tras | Controller → application → domain/porty; graf w `infrastructure/graph` |
| LangGraph wołany wprost z controllera | Brak fasady use-case; trudny HITL i statusy runu | Application service startuje/wznawia run; graf za fasadą |
| Synchroniczny HTTP = cały pipeline LLM | Timeouty, brak SSE, koszmar HITL | Async run + SSE; GET tylko snapshot logów / health / metrics |
| Pomijanie `ConsistencyVerifier` „na skróty” | Łamie kryterium spójności (kontekst + język) | Verifier obowiązkowy; refine `max N=2`, potem `failed` |
| Nieskończona pętla refine | Koszt LLM, zawieszony run | Twardy limit `max N=2` |
| Osobne „mikroserwisy agentów” w MVP | Overengineering względem modularnego monolitu | Węzły w jednym grafie w `apps/api` |

---

## Frontend (`apps/frontend`)

| Anty-pattern | Dlaczego źle | Zamiast tego |
|--------------|--------------|--------------|
| Sekrety LLM / `X-Gateway-Key` w `NEXT_PUBLIC_*` | Wyciek kluczy | Tylko `apps/api` ↔ gateway |
| Polling statusu runu zamiast SSE | Obciążenie, gorszy UX, rozjazd z kontraktem | SSE `.../events`; GET logów = historia |
| Duplikacja brand types / DTO poza `packages/shared` | Rozjazd kontraktu FE/BE | Import z shared + walidacja na granicach |
| Logika kompletności kontekstu tylko w UI | Da się obejść API | Egzekucja bramki w `apps/api` |

---

## Gateway i korelacja

| Anty-pattern | Dlaczego źle | Zamiast tego |
|--------------|--------------|--------------|
| `apps/api` → SDK vendora z pominięciem gateway | Druga ścieżka LLM; brak wspólnych logów/limitów | Wyłącznie natywny chat gateway |
| Własny `x-request-id` generowany „na zapas” pod hop LLM | Fałszywa pewność; dublowanie generatora gateway | Brać `requestId` z **odpowiedzi** gateway do `run.log` |
| Klient FE generuje `RequestId` przed `POST /runs` | Zbędne; oś runu to `ConversationId` | ID HTTP z odpowiedzi api; run = `RunId` + `ConversationId` |
| Nowy `ConversationId` na każdy agent w runie | Rozjeżdża korelację logów LLM | Jeden `ConversationId` na cały run agentowy |
| Fasady OpenAI/Anthropic jako domyślna ścieżka CC | Inny kontrakt błędów; zbędna złożoność MVP | Natywne `POST /api/v1/chat` |

---

## Persistence

| Anty-pattern | Dlaczego źle | Zamiast tego |
|--------------|--------------|--------------|
| Prisma (lub SQL) w `domain/` | Domain zależy od ORM | Port w domain/application; Prisma tylko w `infrastructure` |
| Cichy fallback kontekstu z plików `.md` przy dziurawej DB | Niespójność, „działa u mnie”; odrzucone w briefie | DB kanoniczna; brak cichego fallbacku; eksport `.md` dopiero po MVP (osobno) |
| Traktowanie logów stdout jako jedynego źródła przebiegu runu | UI i audyt runu ślepe | Kanoniczne `run.log` w DB + SSE; stdout = ops |
| Mylenie `/metrics` z logami runu | Ops ≠ przebieg domenowy | Prometheus = proces; logi = run |

---

## Auth i tenancy

| Anty-pattern | Dlaczego źle | Zamiast tego |
|--------------|--------------|--------------|
| `user` edytuje kontekst firmy | Łamie model ról | Tylko `admin`; user uruchamia flow’y |
| Multi-tenant „przy okazji” (kontekst per user) | Inny produkt niż self-host jednej firmy | Jeden kontekst na instancję |
| Drugi `admin` / awans user→admin w MVP | Łamie `security.md` | Tylko bootstrap jednego admina; potem wyłącznie `user` |
| OAuth w MVP „bo tak się robi” | Opóźnia dowód pipeline’u | JWT + httpOnly cookie, 2 role |
| Token SSE w query string | Wyciek w logach proxy / historii | Ta sama sesja co API (cookie / Bearer) |

---

## Legacy / workflow „tylko IDE”

| Anty-pattern | Dlaczego źle | Zamiast tego |
|--------------|--------------|--------------|
| Uznać ręczne prompty w IDE za docelowy dowód produktu | Brak orchestracji, auth, UI, obserwowalności | Aplikacja monorepo (brief → MVP) |
| Uznać samo Postman/API bez auth i dashboardu za finalne MVP | Słaby dowód self-host UX | Postman = DoD pośredni; MVP obejmuje auth + web |

---

## Poza zakresem tego dokumentu

- Pełna lista anti-patternów frameworków bez związku z CC  
- Strategia testów → `testy.md`  
- Checklista deploy → `deployment.md`
