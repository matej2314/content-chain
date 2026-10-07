---
wersja: 15
data_utworzenia: 2026-09-18
data_modyfikacji: 2026-10-07
---

# Anty-patterny — Content Chain

Krótka lista pułapek **tego** projektu i stacku. Format: objaw → dlaczego źle → zamiast tego. Ogólny podręcznik Nest/Next — poza zakresem.

Powiązane: `architektura.md`, `data_flow.md`, `dokumentacja_komunikacji.md`, `brand_types.md`, `security.md`.

Zmiana względem: zakaz „admin cancel cudzego runu” bez wyjątku; soft/hard bez rozróżnienia roli; brak checku `isActive` na access. Od tej wersji: cancel admin→`guest` **legalny**; soft tylko `user`; hard/purge tylko `guest`; zakaz Soft+Hard na `user`, soft `guest`, reaktywacji `guest`, DEL globalnego daily runs, mylenia z resetem instancji, `PATCH` `isActive: false`, osobnych canceli zamiast `purge` jako skrótu Users, braku checku `isActive`/braku wiersza na access.

Zmiana względem: brak wierszy o układzie katalogów warstw BC (płaski dump `infrastructure/`, kind-folders). Od tej wersji zakazy: płaski dump wielu I/O w jednym katalogu; `helpers/` / `adapters/` / `mappers/` jako kanon; podkatalogi use-case’ów Auth „na siłę”; podkatalogi w `health/` / `metrics/` / `llm/` na wzór BC. Norma drzewa: `architektura_katalogi_pliki.md`.

Zmiana względem: brak wierszy o bramce „Agenci aktywni” vs gateway. Od tej wersji zakazy: FE→gateway health; doklejanie sieci do `isComplete`; mylenie liveness z pełnym readiness gateway w chipie.

Zmiana względem: brak wierszy o TTL / sweeperze przeglądu. Od tej wersji zakazy: timer in-memory jako TTL, kotwica od `createdAt` / bieżącego `updatedAt`, FE-only disable, finalize na GET, UPDATE locka przy mutacji po TTL, lokalne wyliczanie expiry na FE.

Zmiana względem: brak wierszy o `cancelled` / Stop. Od tej wersji zakazy utożsamiania terminali, resume po cancel, rollbacku, Stop w boxie, cancel bez modala, natychmiastowego ukrycia boxa bez labelu, podwójnego toasta, admin-cancel i await execute w HTTP cancel.

Zmiana względem: „Envelope (`code` + `message`) w miejscu błędu”. Od tej wersji przy polu / bloku obowiązuje wyłącznie **`message`** (bez `code` w UI) — `docs/ux_dashboard.md`.

Zmiana względem: brak wiersza o enumeracji email na publicznym accept-invite. Od tej wersji zakaz **409** / „email zajęty” na tej trasie — `security.md`.

Zmiana względem: zakaz otwartego signup. Od tej wersji: zakaz maskowanego sukcesu przy kolizji na register; pending ≠ `isActive=false`; Set-Cookie na register/activate/resend; register bramkowany DEMO; mylenie aktywacji z confirm e-mail V1.

Zmiana względem: register **zawsze** `user`; `guest` poza kanonem. Od tej wersji zakazy: zaufanie do ukrytych przycisków FE jako authz guest; drugi semafor współbieżności „dla guest”; **awans guest→user/admin**; switch demo w panelu; **blokowanie register przy `DEMO_MODE=false`**; osobny endpoint register-as-guest; **`role` w body register**; masowe `@Roles('admin','user')` zamiast GuestGuard.

Zmiana względem: Faza 18 — `guest` = wyłącznie register przy demo on; accept zawsze `user`. Od tej wersji: `guest` = register **lub** accept-invite przy demo on; **anty-pattern** = hardcode accept → `user` przy `DEMO_MODE=true`.

---

## Granice monorepo

| Anty-pattern | Dlaczego źle | Zamiast tego |
|--------------|--------------|--------------|
| Logika SM / Content / bramki kontekstu w `apps/frontend` | UI staje się drugim źródłem prawdy; trudny test i self-host | Reguły i graf tylko w `apps/api`; frontend = cienki klient |
| Domena Content Chain w `apps/ai-provider-gateway` | Miesza produkt z infrastrukturą LLM; psuje reuse gateway | Gateway = routing/providery; CC woła natywny chat |
| Use-case’y / Prisma / **Zod** w `packages/shared` | Shared przestaje być czystym kontraktem typów | W `shared` tylko typy / brand / enumy kontraktu (**bez Zod**) |
| Lokalna kopia `parseWithZod` / osobny adapter Zod→`VALIDATION_FAILED` w każdym BC | Drift separatora `details[].path` i duplikat mapowania błędów | Jeden helper: `apps/api/src/shared/parse-with-zod.ts` (`path` = `issue.path.join('.')`) |
| Rootowy `src/apps/` albo rozjechane ścieżki app | Drift względem docs i DX monorepo | `apps/{api,frontend,ai-provider-gateway}` + `packages/shared` |
| Katalog `postman/` na rootcie `apps/api` (sibling `src/`) albo seed SQL/Prisma kontekstu pod E2E zamiast `PUT /company-context` | Kolekcja wygląda jak BC/moduł produktu; seed omija bramkę HTTP (`CONTEXT_INCOMPLETE`) | `apps/api/test/postman/`; Setup = `PUT /company-context` |

---

## `apps/api` i grafy (Social / Content)

| Anty-pattern | Dlaczego źle | Zamiast tego |
|--------------|--------------|--------------|
| Fat controller: ORM + prompt + HTTP | Niemożliwy unit test domeny; puchnięcie tras | Controller → application → domain/porty; graf w `infrastructure/graph` |
| Płaski dump `infrastructure/` (Prisma + Redis + SSE + SMTP + cookie w jednym katalogu) | Nawigacja i pomyłka „gdzie dodać adapter” | Podkatalogi po I/O (`persistence/`, `sse/`, `quota/`, `mail/`, `session/`) jak `graph/` / `prompts/` w Social/Content |
| `helpers/` / `adapters/` / `mappers/` jako kanon warstwy | Drugi dump po rodzaju pliku; mapper oderwany od adaptera | Mapowanie wiersza przy persistence; nazwa pliku po odpowiedzialności |
| Podkatalogi use-case’ów Auth „na siłę” | Udawane pod-BC; duży diff bez nowej granicy | Płaskie `application/` przy unikalnych `*-use-case.ts` |
| Podkatalogi w `health/` / `metrics/` / `llm/` na wzór BC | Łamie „nie-BC” | Ops bez `application` / `domain` / `infrastructure` |
| Fat Social: page copy / outline w `apps/api/src/social/` | Łamie BC; Content przestaje być osobnym kanałem | Strony wyłącznie w `apps/api/src/content/` |
| `'web'` jako wartość `SocialPlatform` | Miesza sentinel kolumny z enumem SM; psuje filtry i DTO | `RunPlatform = SocialPlatform \| 'web'`; `'web'` tylko kolumna przy `page_*` |
| Dump hopu chat (prompty / `output.text`) na stdout w `production` | Wyciek treści i ryzyko sekretu w agregatorze logów | Tylko `NODE_ENV=development` + redakcja `GATEWAY_KEY`; kanon przebiegu = `run.log` |
| Traktowanie `social.controller.ts` / `content.controller.ts` jako obowiązkowej powierzchni HTTP | Pozorna trasa „obok” Runs; drift z S-1 | `SocialModule` / `ContentModule` bez `controllers[]`; start i HITL wyłącznie w BC Runs |
| LangGraph wołany wprost z controllera | Brak fasady use-case; trudny HITL i statusy runu | Application service startuje/wznawia run; graf za fasadą |
| Synchroniczny HTTP = cały pipeline LLM | Timeouty, brak SSE, koszmar HITL | Async run + SSE; GET tylko snapshot logów / health / metrics |
| Pomijanie `ConsistencyVerifier` „na skróty” | Łamie kryterium spójności (kontekst + język) | Verifier obowiązkowy; refine `max N=2`, potem `failed` |
| Burst execute recovery ponad `MAX_CONCURRENT_RUNS` albo `running → queued` jako „naprawa” po crashu | Przeciąża LLM/RAM po restarcie; `queued` to kolejka **nowych** POST, nie zombie execute | Status `interrupted` + claim pod tym samym capem (`dictionary.md`, `SPEC-RUNY.md` R-6 / R-9) |
| Utożsamianie `cancelled` z `failed` / `interrupted` / LangGraph `interrupt()` | Fałszywy recovery albo błąd pipeline zamiast decyzji operatora | Trzy różne zakończenia: `failed` = błąd; `interrupted` = crash (nieterminalny); `cancelled` = Stop (`dictionary.md`) |
| Resume / retry na tym samym `runId` po `cancelled` | Łamie terminal bez wyjść | Nowy przebieg = nowy `POST /runs` |
| Rollback wyniku po cancel | Kasuje już zacommitowane artefakty; rozjazd z kanonem persist | Bez rollbacku; hop w locie nie jest dopisywany (`data_flow.md`) |
| Await `execute` w requeście HTTP cancel | Timeouty; UI czeka na zwinięcie hopu | CAS + **200** od razu + abort w tle (`architektura.md`) |
| Mapa Subject SSE per `runId` bez `complete` / evikcji po terminalu | Wyciek pamięci przez życie procesu; wiszące sockety | Po `completed`/`failed`/`cancelled`: complete Observable + usunięcie wpisu; late-join na skończonym runie też kończy stream (`dokumentacja_komunikacji.md`) |
| Nieskończona pętla refine | Koszt LLM, zawieszony run | Twardy limit `max N=2` |
| Osobne „mikroserwisy agentów” w MVP | Overengineering względem modularnego monolitu | Węzły w grafie BC w `apps/api` |
| `forwardRef` Runs ↔ Social / Content (albo `RunsModule` importuje każdy graf) jako klej pipeline’u | Cykl Nest; orkiestrator zna katalog agentów | Graf woła port lifecycle Runs; composite `RUN_EXECUTOR` wiązany w `AppModule` / `registerAsync`; bez self-register w MVP |
| Import `ContentModule` z `SocialModule` (lub odwrotnie) | Sprzężenie kanałów; fat granice | Dwa BC; klej wyłącznie w composition root |
| Jeden typ `RunBrief` SM (`ideaCount`) na `page_*` / `angle` w Social | Content dziedziczy język postów; Zod nie odcina obcych pól kanału | Unia na `taskType`: `SocialBrief` vs `ContentBrief`; `.strict()`; `RunRecord` dyskryminowany (`dokumentacja_komunikacji.md`) |
| `Partial<RunRecord>` w unitach po unii `taskType` | Miesza warianty (np. `page_copy` + `linkedin`) | `makeSocialRun` / `makeContentRun` w `apps/api/src/runs/run-record.test-helpers.ts` |
| `SocialBrief` / `ContentBrief` w `packages/shared` albo `apps/api/src/shared/types` | Shared kernel / śmietnik cross-cutting zamiast payloadu Run | Definicje w `runs/domain/run.types.ts`; Zod w application Runs |
| Luźny blob `extras` kontekstu bez schematu | Drift kształtu; nieznane klucze w DB; brak kontraktu FE/Postman | Typowany `CompanyContextExtras` + Zod `.strict()`; poza bramką (`dokumentacja_komunikacji.md`) |
| Multi-select HITL SM bez semantyki wyniku | N pozycji w selekcji, jeden niejasny content/script | Kanon N→N w **tym samym** runie: `contents[]` / `reelScripts[]` + `sourceIdeaId`; min. 1 unikalne id ⊆ `hitl.options`. Zmiana względem: „dokładnie 1 `selectedIdeaId`” (kanon Fazy 4.3) |
| Multi-select HITL SM bez osobnych artefaktów (zlepiony jeden `body`) | Gubi ślad pomysłu; snapshot nie ma 1:1 z wyborem | Każde `selectedIdeaId` → osobny `SocialContent` / `ReelScript`; zakaz zlepiania K pomysłów w jeden tekst |
| Fan-out HITL → N child runów (`post_content` / `reel_script`) w MVP | Inny model orkiestracji; dryft statusów i SSE | Pętla w **tym samym** runie (faza content / scenariusz); child runy poza MVP |

---

## Frontend (`apps/frontend`)

| Anty-pattern | Dlaczego źle | Zamiast tego |
|--------------|--------------|--------------|
| Sekrety LLM / `X-Gateway-Key` w `NEXT_PUBLIC_*` | Wyciek kluczy | Tylko `apps/api` ↔ gateway |
| FE → gateway (`/health`, `/health/ready`, chat) | Łamie BFF; wyciek topologii / kluczy; rozjazd z SPEC | Wyłącznie `apps/api` (chip: `GET /api/v1/health/ready`) |
| Interval polling completeness / `/health/ready` | Zbędne obciążenie; kanon = mount + refetch przy okazji | Refetch przy mount i po zapisie kontekstu (`ux_dashboard.md`) |
| Polling statusu **konkretnego** runu zamiast SSE | Obciążenie, gorszy UX, rozjazd z kontraktem | SSE `.../events` dla `running` / `awaiting_hitl` / `interrupted`; GET logów = historia. GET archiwum co 15 min **nie** zastępuje SSE |
| `EventSource` na `queued` albo drugi socket na ten sam `runId` (szczegóły + box) | Nadmiar połączeń; auto-reconnect na kolejce | Rejestr layoutu: max jedno połączenie na `runId`; `queued` tylko GET |
| Zostawianie `EventSource` po `completed`/`failed`/`cancelled` (auto-reconnect) | Pętla GET `.../events` na skończonym runie | `close()` po evencie terminalnym; nie otwierać SSE, gdy snapshot już terminalny (`ux_dashboard.md`) |
| Buforowanie SSE w BFF Next (rewrite zbiera cały stream) | Live „stoi”, potem wali się naraz | Proxy strumieniowe; `text/event-stream` bez pełnego bufora |
| `NEXT_PUBLIC_API_BASE_URL` i bezpośredni fetch przeglądarki na port api | Cookie na złym originie; psuje `SameSite=strict` | BFF: same-origin `/api/v1`; `API_BASE_URL` tylko na serwerze Next |
| Start runu jako live na archiwum / chip „w toku” instancji / inny brief niż na Koncie | Rozjazd z kanonem: archiwum terminalne + dwie powierzchnie **tego samego** formularza + floating box | Konto = start inline + Moje runy live; Runy = archiwum `completed` \| `failed` \| `cancelled` **oraz** modal **„Uruchom agenta”** (ten sam brief, pusty draft); po `202` widok źródłowy; live poza Kontem = box. **Nie** SSE / wiersze w toku na liście Runy; **nie** chip w chrome; **nie** drugi kontrakt startu. Zmiana względem: „Start runu na widoku Runy” jako zakaz samej powierzchni (`ux_dashboard.md`) |
| Stop we floating boxie | Box ma być sygnałem informacyjnym, nie powierzchnią mutacji | Stop tylko na Moich runach / szczegółach; box **bez** Stop |
| Cancel bez potwierdzenia modalnego | Przypadkowe anulowanie | Modal **„Czy na pewno?”** → Tak = API; Nie = close, zero API (`ux_dashboard.md`) |
| Natychmiastowe usunięcie pozycji floating boxa po `cancelled` bez krótkiego labelu „Anulowany” | Operator nie widzi skutku Stop | Krótko **„Anulowany”**, potem ukrycie po **200 ms** |
| Toast SSE `run.cancelled` + toast mutacji cancel bez dedupu | Podwójny toast na ten sam `runId` | Dedup per `runId`; na szczegółach SSE nie dubluje mutacji |
| Traktowanie cancel jako przeglądu (gwiazdki / Edytuj / finalize) | Anulowanie ≠ ocena pipeline | Przegląd tylko `completed`\|`failed`; `cancelled` → 409 `RUN_NOT_REVIEWABLE` |
| Timer in-memory / `setTimeout` per run jako „TTL przeglądu” | Ginie po restarcie api; okno da się „odmrozić” | Kotwica `pipelineFinishedAt` w DB + `REVIEW_TTL`; sweeper boot + okresowy |
| TTL od `createdAt` startu runu zamiast `pipelineFinishedAt` | Kara za długi pipeline / kolejkę; rozjazd z końcem pracy | Okno od momentu `completed` \| `failed` |
| `updatedAt` jako bieżąca kotwica TTL po wdrożeniu | Każdy PATCH przesuwa okno | Kotwica = `pipelineFinishedAt` (raz); `updatedAt` tylko jednorazowy backfill migracji |
| FE-only disable kontroli przeglądu bez bramki API | Da się obejść Postmanem / curl | Po TTL / finalize api → **409** `REVIEW_LOCKED`; UI tylko cienki klient |
| Finalize / UPDATE `reviewFinalizedAt` przy `GET /runs/:id` | Side-effect na odczycie; łamie 4a | GET = czysty snapshot; lock w DB = ręczne finalize **albo** sweeper |
| UPDATE `reviewFinalizedAt` przy mutacji po TTL | Dwa miejsca zapisu locka; wyścig ze sweeperem | Mutacja po TTL = sam **409**; trwały zapis = tylko sweeper |
| Lokalne wyliczanie expiry na FE z `pipelineFinishedAt` + stałej | Drift TTL względem api / env | Deadline wyłącznie z serwerowego `reviewExpiresAt` |
| Duplikacja brand types / DTO poza `packages/shared` | Rozjazd kontraktu FE/BE | Import z shared + walidacja na granicach (HTTP: class-validator; api application: Zod — nie w shared) |
| Logika kompletności kontekstu tylko w UI | Da się obejść API | Egzekucja bramki w `apps/api` |
| Doklejanie sieci / `gatewayAlive` do `isComplete` / BC company-context | Miesza domenę kontekstu z ops; psuje unit testy i `409` `CONTEXT_INCOMPLETE` | `isComplete` bez sieci; `agentsActive` = completeness ∧ `gatewayAlive` w warstwie UX / health |
| Feedback / gwiazdki / edycja wyniku w LangGraph | Miesza jakość UX z pipeline LLM | Komendy Runs + BC Feedback po `completed`/`failed` (przegląd **bez** `cancelled`). Edycja treści = `POST .../output-edited` (nadpis `result` + flaga), **nie** re-invoke grafu. Przy `POST /feedback` `targetType=run` bramka statusu/wyniku jest w **API** (409 `RUN_NOT_REVIEWABLE`); sam disable na UI nie wystarcza |
| Edytuj tylko jako flaga, przy kanonie „zapis treści” | UI i snapshot rozjeżdżają się z DB | Zapis edycji zastępuje kanoniczny wynik (`dokumentacja_komunikacji.md`, `ux_dashboard.md`) |
| Select „wszystkie moje runy” przez łamanie `pageSize=10` na `GET /runs` | Psuje listę dashboardu | Osobny `GET /runs/user/:userId` (bez paginacji 10) |
| Toast / Sonner jako kanał live statusu runu | Zlewa „dzieje się” z „wydarzyło się”; gubi SSE i box | SSE + box / Moje runy / szczegóły (`ux_dashboard.md`, `SPEC-FRONTEND.md` F-5) |
| Toast na błąd walidacji / 400 przy polu | Operator traci `message` przy formularzu; druga mapa błędów | Envelope: `message` w miejscu błędu (bez pokazywania `code`) |
| Toast z payloadu `run.failed` jako jedyny powód porażki | Po reloadzie cisza; kanon powodu to logi | `run.log` + GET snapshot; toast tylko „nieudany” + link |
| Store toasta w Context jako kopia GET | Fałszywy server state; drift z listą po odświeżeniu | Sonner efemeryczny; GET zostaje źródłem list |

---

## Gateway i korelacja

| Anty-pattern | Dlaczego źle | Zamiast tego |
|--------------|--------------|--------------|
| `apps/api` → SDK vendora z pominięciem gateway | Druga ścieżka LLM; brak wspólnych logów/limitów | Wyłącznie natywny chat gateway |
| Chip „Agenci aktywni” oparty o upstream gateway `/health/ready` (config/redis/cache) | Miesza liveness procesu z pełnym readiness ops | Api probe **liveness** `/health`; pełny readiness gateway = ops, poza predykatem chipa |
| Probe gateway przez port `chat` / adapter LLM | Miesza ścieżkę LLM z ops health | Osobny klient/serwis w `health/` |
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
| Admin cancel cudzego runu **`role = user`** | Łamie authz Stop dla członka zespołu | **403** `FORBIDDEN`; cancel cudzego = **tylko** gdy `startedBy.role === guest` (`dokumentacja_komunikacji.md`) |
| Soft **oraz** Hard jako dwa przyciski / dwa endpointy na `user` | Rozjazd semantyki; ryzyko kasowania runów zespołu | Soft **tylko** `user` (jeden `DELETE`); hard **tylko** `guest` |
| Hard-delete konta `user` (kasowanie wiersza / runów członka) | Utrata artefaktów zespołu; email „wolny” bez reclaim | Soft + reaktywacja `PATCH`; runy zostają |
| Soft-delete konta `guest` (`isActive=false` zamiast hard) | Orphany runów/feedback; email zablokowany; niespójny reclaim | Hard (lub `?purge=true` przy live); email wolny |
| Reaktywacja `guest` przez `PATCH { isActive: true }` | Soft na gościu nie jest kanonem; reclaim = hard | **403**; reclaim = `DELETE` (hard) |
| DEL globalnego Redis `…:guest:daily:runs:{UTC-date}` przy hard/purge | Zaniża / psuje dzienny cap całej instancji | Tylko SCAN DEL `…:ratings:{userId}:*`; global runs **nie** ruszać |
| Traktowanie per-konto hard/purge jak **resetu instancji** / factory wipe | Inny produkt (Maintenance / CLI); kasuje admina i kontekst | Reset / bulk / wipe **poza** Users; Users = jedno konto |
| `PATCH /users/:id` z `isActive: false` | Drugi kanał dezaktywacji; drift względem DELETE | Dezaktywacja wyłącznie `DELETE`; PATCH tylko `{ isActive: true }` na `user` |
| Wymuszanie N osobnych canceli z UI Run zamiast `?purge=true` jako **wymaganej** ścieżki skróconej z listy Users | Ops nie czyści gościa z live w jednym kroku | Flow Users: Usuń → 409 → confirm → `DELETE ?purge=true` |
| Access JWT bez checku `isActive` / braku wiersza User | Soft/hard zostawia ważną sesję do wygaśnięcia TTL | `JwtCookieStrategy.validate`: brak User **lub** `isActive !== true` → **401**; bez blacklisty |
| Multi-tenant „przy okazji” (kontekst per user) | Inny produkt niż self-host jednej firmy | Jeden kontekst na instancję |
| Drugi `admin` / awans user→admin **lub** `guest`→`user`/`admin` w MVP | Łamie `security.md` | Tylko bootstrap jednego admina; `user` = invite **lub** register przy demo off; `guest` = register **lub** accept-invite przy demo on; **brak** ścieżki promocji |
| Accept-invite zawsze `role=user` przy `DEMO_MODE=true` | Omija limity demo; niespójne z register; invite w sandboxie wygląda jak członkostwo zespołu | Rola vs `DEMO_MODE` jak register; demo invite = gość sandboxu (`security.md`) |
| Osobny endpoint „register-as-guest” albo `role` w body register / invite / accept | Druga powierzchnia; klient wybiera rolę | Jedna trasa `POST /auth/register` / accept bez `role` w body; rola wyłącznie z `DEMO_MODE` |
| Register bramkowany `DEMO_MODE` / aktywacja wymagana poza `production` | Łamie kanon: register zawsze; activate tylko w prod | Register zawsze; `verifiedAt` od razu poza prod |
| Switch `DEMO_MODE` w UI admina | Tryb ma być ops/env, nie produktowy toggle | Env przy starcie procesu; zmiana = restart |
| Masowe `@Roles('admin','user')` na każdej trasie „żeby zablokować guest” | Drift; nowe trasy łatwo pominąć | Globalny **GuestGuard** + `@AllowGuest()` (default deny) |
| Zaufanie do ukrytych przycisków / disable FE jako jedynej bramki guest | Postman omija UI | Egzekucja w API (policy + guard) |
| Drugi limit współbieżności execute „dla guest” obok `MAX_CONCURRENT_RUNS` | Dwa semafory; dryft FIFO | Cap globalny guest = Redis admit **przed** create; `MAX_CONCURRENT_RUNS` **bez zmian** |
| Admin ustawia hasło `user` / hasło w mailu / `POST /users` z `password` | Łamie kanon zaproszeń / register; admin zna sekret konta | Admin podaje **tylko email** przy invite; pierwsze hasło = accept-invite **albo** self-register |
| Publiczny `accept-invite` zwraca **409** / „email zajęty” przy kolizji `User.email` | Enumeracja kont bez sesji; probe istnienia `User` | **401** `UNAUTHORIZED`, ten sam `message` co zły token; revoke Invitation; **409** zostaje na admin `POST /invitations`, `PATCH /auth/me/email` **oraz** świadomie na `POST /auth/register` (`security.md`) |
| Maskowany **201** przy kolizji email na `POST /auth/register` | Użytkownik czeka na maila, którego nie będzie; nie wie, że ma zmienić adres | **409** `CONFLICT` + jawny komunikat; FE zostaje na formularzu (`ux_dashboard.md`) |
| Pending aktywacji przez samo `isActive = false` | Mylenie z soft-delete; reaktywacja „naprawia” weryfikację | Pending = `isActive=true` + `verifiedAt=null` + `AccountActivation` |
| Set-Cookie na register / activate / resend | Sesja bez weryfikacji / bez świadomego loginu | Sesja tylko po login / bootstrap |
| `ACCOUNT_NOT_ACTIVATED` / różny message na loginie dla pending | Enumeracja „pending” vs złe hasło | Wspólny **401** jak soft-delete / złe hasło / guest przy demo off |
| Mylenie aktywacji konta z confirm e-mail przy `PATCH /auth/me/email` | Dwa różne flows; confirm = V1 | Aktywacja = register + mail; confirm przy zmianie adresu = **V1** |
| **503** na `POST /auth/resend-activation` przy padzie SMTP | Enumeracja / zły UX thank-you | Zawsze **200** + `Wiadomość wysłana ponownie`; mail best-effort w tle |
| Self-register na email soft-deleted **`user`** | Obejście reaktywacji admina | **409** `Email already in use`; reclaim = `PATCH /users/:id` (tylko `user`). Po hard `guest` email jest wolny — register legalny |
| Nodemailer (lub inny SMTP client) w use-case / domain | Warstwa aplikacji zależy od vendora maila | Port mailera w Auth; adapter SMTP = nodemailer **tylko** w infrastructure |
| Dwa `pending` na ten sam email (obejście bez indeksu SQL) | Wyścig `POST /invitations`; dwa ważne tokeny | Partial unique SQL `UNIQUE (email) WHERE status = 'pending'` (jak `User_one_admin`) |
| OAuth w MVP „bo tak się robi” | Opóźnia dowód pipeline’u | JWT w httpOnly `cc_access` + `cc_refresh`, role `admin` \| `user` \| `guest` |
| Token SSE w query string | Wyciek w logach proxy / historii | Ta sama sesja co API (cookie httpOnly) |
| Access JWT w body / localStorage / Bearer jako model web | XSS i niespójność z cookie-only | Wyłącznie `cc_access` + `cc_refresh` (httpOnly); Postman = cookie jar |
| Zmiana własnego emaila samym cookie (bez `currentPassword`) | Skradziona sesja przejmuje identyfikator konta | `PATCH /auth/me/email` wymaga `currentPassword` (bcrypt compare jak przy logowaniu, **bez** polityki haseł); UI = modal re-auth (`ux_dashboard.md`, `security.md`) |
| Trust FE: „sprawdź hasło” tylko w przeglądarce / osobny endpoint verify bez mutacji | Race i fałszywe poczucie bezpieczeństwa | Jedna mutacja `PATCH /auth/me/email` z re-auth w use-case api |
| Mutacja wrażliwa na `PATCH /auth/me` (miesza probe z update) | Konflikt z cyklem sesji FE; trudniejszy fundament pod zmianę hasła | `GET /auth/me` = probe; mutacje = osobne ścieżki (`/auth/me/email`, później `/password`) |
| Traktować **401** `INVALID_PASSWORD` jak wygaśnięcie sesji (refresh → logout) | Wylogowanie przy złym haśle w modalu re-auth | Refresh/logout tylko przy `UNAUTHORIZED`; `INVALID_PASSWORD` → envelope pod polem |
| Po 409 zajętości emaila: zamykać modal / toast zamiast recovery w Dialogu | Utrata kontekstu; mylenie z sukcesem | Modal zostaje; clear pól; odblokowanie emaila; błąd pod polem email (`ux_dashboard.md`) |

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
