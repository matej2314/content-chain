# Anty-patterny — Content Chain

Krótka lista pułapek **tego** projektu i stacku. Format: objaw → dlaczego źle → zamiast tego. Ogólny podręcznik Nest/Next — poza zakresem.

Powiązane: `architektura.md`, `data_flow.md`, `dokumentacja_komunikacji.md`, `brand_types.md`, `security.md`.

---

## Granice monorepo

| Anty-pattern | Dlaczego źle | Zamiast tego |
|--------------|--------------|--------------|
| Logika SM / Content / bramki kontekstu w `apps/frontend` | UI staje się drugim źródłem prawdy; trudny test i self-host | Reguły i graf tylko w `apps/api`; frontend = cienki klient |
| Domena Content Chain w `apps/ai-provider-gateway` | Miesza produkt z infrastrukturą LLM; psuje reuse gateway | Gateway = routing/providery; CC woła natywny chat |
| Use-case’y / Prisma / **Zod** w `packages/shared` | Shared przestaje być czystym kontraktem typów | W `shared` tylko typy / brand / enumy kontraktu (**bez Zod**) |
| Rootowy `src/apps/` albo rozjechane ścieżki app | Drift względem docs i DX monorepo | `apps/{api,frontend,ai-provider-gateway}` + `packages/shared` |
| Katalog `postman/` na rootcie `apps/api` (sibling `src/`) albo seed SQL/Prisma kontekstu pod E2E zamiast `PUT /company-context` | Kolekcja wygląda jak BC/moduł produktu; seed omija bramkę HTTP (`CONTEXT_INCOMPLETE`) | `apps/api/test/postman/`; Setup = `PUT /company-context` |

---

## `apps/api` i grafy (Social / Content)

| Anty-pattern | Dlaczego źle | Zamiast tego |
|--------------|--------------|--------------|
| Fat controller: ORM + prompt + HTTP | Niemożliwy unit test domeny; puchnięcie tras | Controller → application → domain/porty; graf w `infrastructure/graph` |
| Fat Social: page copy / outline w `apps/api/src/social/` | Łamie BC; Content przestaje być osobnym kanałem | Strony wyłącznie w `apps/api/src/content/` |
| `'web'` jako wartość `SocialPlatform` | Miesza sentinel kolumny z enumem SM; psuje filtry i DTO | `RunPlatform = SocialPlatform \| 'web'`; `'web'` tylko kolumna przy `page_*` |
| Dump hopu chat (prompty / `output.text`) na stdout w `production` | Wyciek treści i ryzyko sekretu w agregatorze logów | Tylko `NODE_ENV=development` + redakcja `GATEWAY_KEY`; kanon przebiegu = `run.log` |
| Traktowanie `social.controller.ts` / `content.controller.ts` jako obowiązkowej powierzchni HTTP | Pozorna trasa „obok” Runs; drift z S-1 | `SocialModule` / `ContentModule` bez `controllers[]`; start i HITL wyłącznie w BC Runs |
| LangGraph wołany wprost z controllera | Brak fasady use-case; trudny HITL i statusy runu | Application service startuje/wznawia run; graf za fasadą |
| Synchroniczny HTTP = cały pipeline LLM | Timeouty, brak SSE, koszmar HITL | Async run + SSE; GET tylko snapshot logów / health / metrics |
| Pomijanie `ConsistencyVerifier` „na skróty” | Łamie kryterium spójności (kontekst + język) | Verifier obowiązkowy; refine `max N=2`, potem `failed` |
| Burst execute recovery ponad `MAX_CONCURRENT_RUNS` albo `running → queued` jako „naprawa” po crashu | Przeciąża LLM/RAM po restarcie; `queued` to kolejka **nowych** POST, nie zombie execute | Status `interrupted` + claim pod tym samym capem (`dictionary.md`, `SPEC-RUNY.md` R-6 / R-9) |
| Mapa Subject SSE per `runId` bez `complete` / evikcji po terminalu | Wyciek pamięci przez życie procesu; wiszące sockety | Po `completed`/`failed`: complete Observable + usunięcie wpisu; late-join na skończonym runie też kończy stream (`dokumentacja_komunikacji.md`) |
| Nieskończona pętla refine | Koszt LLM, zawieszony run | Twardy limit `max N=2` |
| Osobne „mikroserwisy agentów” w MVP | Overengineering względem modularnego monolitu | Węzły w grafie BC w `apps/api` |
| `forwardRef` Runs ↔ Social / Content (albo `RunsModule` importuje każdy graf) jako klej pipeline’u | Cykl Nest; orkiestrator zna katalog agentów | Graf woła port lifecycle Runs; composite `RUN_EXECUTOR` wiązany w `AppModule` / `registerAsync`; bez self-register w MVP |
| Import `ContentModule` z `SocialModule` (lub odwrotnie) | Sprzężenie kanałów; fat granice | Dwa BC; klej wyłącznie w composition root |
| Jeden typ `RunBrief` SM (`ideaCount`) na `page_*` / `angle` w Social | Content dziedziczy język postów; Zod nie odcina obcych pól kanału | Unia na `taskType`: `SocialBrief` vs `ContentBrief`; `.strict()`; `RunRecord` dyskryminowany (`dokumentacja_komunikacji.md`) |
| `Partial<RunRecord>` w unitach po unii `taskType` | Miesza warianty (np. `page_copy` + `linkedin`) | `makeSocialRun` / `makeContentRun` w `apps/api/src/runs/run-record.test-helpers.ts` |
| `SocialBrief` / `ContentBrief` w `packages/shared` albo `apps/api/src/shared/types` | Shared kernel / śmietnik cross-cutting zamiast payloadu Run | Definicje w `runs/domain/run.types.ts`; Zod w application Runs |

---

## Frontend (`apps/frontend`)

| Anty-pattern | Dlaczego źle | Zamiast tego |
|--------------|--------------|--------------|
| Sekrety LLM / `X-Gateway-Key` w `NEXT_PUBLIC_*` | Wyciek kluczy | Tylko `apps/api` ↔ gateway |
| Polling statusu runu zamiast SSE | Obciążenie, gorszy UX, rozjazd z kontraktem | SSE `.../events`; GET logów = historia |
| Zostawianie `EventSource` po `completed`/`failed` (auto-reconnect) | Pętla GET `.../events` na skończonym runie | `close()` po evencie terminalnym; nie otwierać SSE, gdy snapshot już terminalny (`ux_dashboard.md`) |
| Duplikacja brand types / DTO poza `packages/shared` | Rozjazd kontraktu FE/BE | Import z shared + walidacja na granicach (HTTP: class-validator; api application: Zod — nie w shared) |
| Logika kompletności kontekstu tylko w UI | Da się obejść API | Egzekucja bramki w `apps/api` |
| Feedback / gwiazdki / flaga edycji w LangGraph | Miesza jakość UX z pipeline LLM | Komendy Runs + BC Feedback po `completed`/`failed` |
| Select „wszystkie moje runy” przez łamanie `pageSize=10` na `GET /runs` | Psuje listę dashboardu | Osobny `GET /runs/user/:userId` (bez paginacji 10) |

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
| `user` edytuje kontekst firmy | Łamie model ról | Tylko `admin`; user uruchamia runy produktowe |
| Multi-tenant „przy okazji” (kontekst per user) | Inny produkt niż self-host jednej firmy | Jeden kontekst na instancję |
| Drugi `admin` / awans user→admin w MVP | Łamie `security.md` | Tylko bootstrap jednego admina; potem wyłącznie `user` |
| OAuth w MVP „bo tak się robi” | Opóźnia dowód pipeline’u | JWT w httpOnly `cc_access` + `cc_refresh`, 2 role |
| Token SSE w query string | Wyciek w logach proxy / historii | Ta sama sesja co API (cookie httpOnly) |
| Access JWT w body / localStorage / Bearer jako model web | XSS i niespójność z cookie-only | Wyłącznie `cc_access` + `cc_refresh` (httpOnly); Postman = cookie jar |

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
