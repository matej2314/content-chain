---
wersja: 16
data_utworzenia: 2026-09-18
data_modyfikacji: 2026-10-06
---

# Słownik — Content Chain

Kanoniczne definicje pojęć domenowych i technicznych. Identyfikatory typów, kodów i pól API w backtickach; opisy po polsku.

Powiązane: `dokumentacja_koncepcyjna.md`, `architektura.md`, `architektura_katalogi_pliki.md`, `dokumentacja_komunikacji.md`, `brand_types.md`, `observability.md`.

Zmiana względem: **Konto (widok)** — Moje runy bez paginacji UI. Od tej wersji lista na Koncie ma **paginację UI** `pageSize = 10` (slice FE); `GET /runs/user/:userId` nadal zwraca całość. Shell dashboardu: chipy w sidebarze w viewportcie (`ux_dashboard.md`).

Zmiana względem: **Agenci aktywni** = wyłącznie `completeness.complete`. Od tej wersji: `agentsActive` ⇔ kontekst kompletny **∧** żywy proces gateway (`gatewayAlive` z api `GET /api/v1/health/ready` → probe upstream liveness). `isComplete` **bez** sieci / gateway; „Agenci aktywni” **nie** obejmuje konfiguracji gateway ani pełnego readiness upstream.

Zmiana względem: przegląd runu otwarty do ręcznego finalize bez limitu czasu. Od tej wersji okno = `REVIEW_TTL` od `pipelineFinishedAt`; auto-finalize wyłącznie przez sweeper; `reviewExpiresAt` wyliczane (nie kolumna); TTL przeglądu **nie** zamyka opinii tekstowej (`POST /feedback`).

Zmiana względem wcześniejszej wersji tego dokumentu: dopisano status **`cancelled`** — trzeci terminal (obok `completed` / `failed`); ręczna decyzja operatora (`startedBy`), nie błąd agenta i nie recovery. Rozróżnienie: `failed` = błąd domeny/gateway/wyczerpane recovery; `interrupted` = crash procesu (nieterminalny, claim pod capem); `cancelled` = świadome Stop, bez resume na tym samym `runId`.

Zmiana względem wcześniejszej wersji tego dokumentu: lista BC uzupełniona o **Feedback**; HITL uściślony do **modelu B** (stan pauzy w DB); port LLM zlokalizowany w `apps/api/src/llm/`; Health rozróżnia api vs gateway; `DB kanoniczna` obejmuje opinie i metadane przeglądu; dopisano hasła cross-cutting, workera, recovery, korelacji hopu LLM oraz przeglądu. `FeedbackId` / `FeedbackTargetType` / `FeedbackAgentKey` / `RunUserRating` = kontrakt MVP w docs/spec (w `packages/shared` przy implementacji BC Feedback / przeglądu).

Zmiana względem definicji **MVP** / **V1 — rozbudowa** oraz kanałów: MVP obejmuje **Social (posty i rolki)** oraz **Content (BC)** w podstawowej formie (auth, dashboard, gateway, SQLite, fundament feedbacku zostają). **V1 — rozbudowa** = cutover PostgreSQL + panel odczytu opinii + publikacja na portalach SM + łańcuch audytorów Content + YouTube — **nie** „kolejne workflowy / rolki / blog”. Źródło: `dokumentacja_koncepcyjna.md` (legalizacja 2026-08-31).

Zmiana względem poprzedniego zbioru `RunStatus` (pięć wartości, recovery jako ponowne execute na leftover `running`): dopisano status **`interrupted`**. `MAX_CONCURRENT_RUNS` tnie **każdy** claim do `running` z `queued` oraz z `interrupted` (priorytet recovery nad nowymi POST). Burst execute wszystkich leftover `running` ponad cap **unieważniony**. HITL (`awaiting_hitl`) pozostaje osobnym use-casem.

Zmiana względem jednego „Brief SM” na cały `POST /runs`: kanon to **`SocialBrief`** vs **`ContentBrief`**; `Run.brief` to JSON unii, nie jeden obiekt z `ideaCount` dla `page_*`.

Zmiana względem luźnej listy „poza bramką”: kanon **`CompanyContextExtras`** (typowane `extras`); addytywne pola wyniku SM (`cta?`, `characterCount`) i opcjonalne `role` na sekcji outline.

Zmiana względem: bramka i `isComplete` wyłącznie przy `POST /runs`; oferta = ≥ 1 usługa z nazwą i korzyścią. Od tej wersji udany PUT/PATCH wymaga kompletnej bramki; oferta = każda pozycja kompletna (nazwa + opis + korzyść).

Zmiana względem: Redis guest bez nazw env połączenia w słowniku. Od tej wersji: połączenie api → Redis = **`REDIS_HOST`** + **`REDIS_PORT`** (+ opcjonalne **`REDIS_PASSWORD`**); **bez** `REDIS_URL` — `deployment.md`.
Zmiana względem kanonu Fazy 4.3 (HITL Social dwuetapowy = dokładnie 1 `selectedIdeaId`; HITL SM = 1 id w kontrakcie MVP): Social = podzbiór draftu, min. 1 unikalne id, N→N (`contents[]` / `reelScripts[]` + `sourceIdeaId`). Content bez zmiany: `[outline.id]`.

Zmiana względem kanonu „admin zakłada konto `user` emailem i hasłem” (`POST /users`): drogi na `role = user` = **zaproszenie e-mail** (Invitation) → accept-invite **oraz** **otwarta rejestracja** (`POST /auth/register`) z aktywacją w `production`. Bootstrap admina (email + hasło, bez maila) **bez zmian**. Zmiana względem: „jedyna droga = invite” / zakaz signup.

Zmiana względem: **Otwarta rejestracja** / **`guest`** — register **zawsze** tworzy `user`; `guest` poza kanonem register. Od tej wersji **refaktor**: przy `DEMO_MODE=true` register tworzy **`guest`**, przy `false` — **`user`**. Dostępność `POST /auth/register` **bez zmian** (zawsze). `guest` **nie** powstaje z invite / bootstrap. **Zakaz permanentny** awansu `guest` → `user` / `admin`.

Zmiana względem: Faza 18 — `guest` wyłącznie z register; invite zawsze → `user` (także przy demo on). Od tej wersji: `guest` powstaje przy **`POST /auth/register` lub `POST /auth/accept-invite`** gdy `DEMO_MODE=true`; przy demo off invite → `user` (członek zespołu). Bootstrap nadal nigdy `guest`. **Zakaz awansu** bez zmian.

Zmiana względem: kanon milczał o toaście dashboardu. Od tej wersji **Toast (dashboard MVP)** jest osobnym hasłem — **nie** envelope HTTP i **nie** kanał live (`ux_dashboard.md`).

Zmiana względem Fazy 3 (**Konto** = jedyny start; **Runy** = archiwum bez startu): od tej wersji **dwie** powierzchnie tego samego formularza (Konto inline + modal **„Uruchom agenta”** na Runach). Archiwum nadal bez SSE i bez wierszy w toku. Po `POST /runs` operator zostaje na widoku źródłowym. Powód: pierwsze testy UI w przeglądarce (`ux_dashboard.md`).

---

## Produkt i domena

| Pojęcie | Definicja |
|---------|-----------|
| **Content Chain** | Publiczna, self-hostowalna aplikacja agentowa do generowania treści **Social** (posty i rolki) oraz **Content (BC)** (copy stron / long-form) z weryfikacją względem kontekstu firmy, zapisem wyników i obserwowalnymi runami. |
| **Kontekst firmy** (`Company Context`) | Kanoniczny zestaw informacji o organizacji w DB (jedna instancja = jedna firma); wejście do generowania i weryfikacji spójności. |
| **Bramka kontekstu** / kompletność | Programowy warunek: wymagane sekcje kontekstu uzupełnione. Udany `PUT` / `PATCH` kontekstu tylko gdy bramka spełniona (inaczej **400** `VALIDATION_FAILED`). Start **każdego** `POST /runs` odblokowany przy kompletności **w DB** (Social i Content); inaczej start runu zablokowany (`409` `CONTEXT_INCOMPLETE`). Werdykt: `isComplete`. Jedna bramka na cały produkt w MVP (w tym głos SM dla page_* — świadome). |
| **`isComplete`** | Czysta funkcja domeny kontekstu: `{ complete, missing }` (`missing` = klucze niespełnionych sekcji bramki). Ten sam werdykt dla GET completeness, PUT/PATCH i twardej bramki `POST /runs` (`409` `CONTEXT_INCOMPLETE`). Unit-testowalna bez DB/HTTP. **Nie** obejmuje sieci, procesu gateway ani konfiguracji LLM. |
| **Sekcje bramki** | Tożsamość, oferta (≥ 1 **kompletna** usługa: nazwa + opis + ≥ 1 korzyść, bez kalekich pozycji), głos SM, CTA/kanały, odbiorca — patrz docs koncepcyjne. |
| **`CompanyContextExtras`** | Opcjonalny obiekt `extras` kontekstu firmy **poza bramką** i **poza** warunkiem PUT/PATCH: `caseStudies?`, `objections?`, `hashtags?`, `catalogNotes?`, `performanceNotes?`. Walidacja kształtu (Zod `.strict()`); **nie** wchodzi do `missing` / `isComplete`. Brak danych = `null` / omit całego `extras` (preferowane względem pustych tablic). |
| **Post ideas** | Lista pomysłów na posty SM (`result.ideas`; `SocialIdea`: `id`, `title`, `angle`, `hook`, **`cta?`** — sugerowane CTA). |
| **Post content** | Gotowe copy posta (`SocialContent`: `body`, `hashtags`, `cta?`, **`characterCount`** — integer ≥ 0; kanon: pipeline ustawia z `body.length` po sukcesie writer/refine; wartość z LLM ignorowana / nadpisywana). Jednoetapowy `post_content`: skalar `result.content`. Dwuetapowy `post_ideas_then_content` po fazie 2: kanon **`result.contents[]`** (długość = `selectedIdeaIds.length`; każdy element = kształt `SocialContent` + **`sourceIdeaId`**); skalar `result.content` = **`null`** (nie alias pierwszego). |
| **Reel ideas** | Lista pomysłów na rolki (`result.reelIdeas`; `ReelIdea`: `id`, `title`, `description`, `hook`, `durationSeconds`, **`cta?`**). |
| **Reel script** | Scenariusz rolki (`ReelScript`: `segments`, `cta`, `notes?`). **Nie** jest `SocialContent`. Jednoetapowy `reel_script`: skalar `result.reelScript`. Dwuetapowy `reel_ideas_then_scripts` po fazie 2: kanon **`result.reelScripts[]`** (analogicznie + **`sourceIdeaId`**); skalar `result.reelScript` = **`null`**. |
| **Page outline** | Szkic dokumentu strony (`result.pageOutline`) — faza HITL tasku `page_outline_then_copy`. Sekcja (`PageOutlineSection`): `id`, `heading`, `summary`, opcjonalnie **`role?`** (`audience_world` \| `pain` \| `challenger` \| `insight` \| `proof` \| `objection` \| `cta` \| `other`). |
| **Page document** | Pełny dokument copy strony/artykułu (`result.pageDocument`). |
| **Content (BC)** | Bounded context generowania copy stron / long-form (`page_copy`, `page_outline_then_copy`). **Nie** mylić z nazwą produktu Content Chain. |
| **`ContentKind`** | Rodzaj dokumentu Content: `blog` \| `service_page` \| `landing`. Wymagane przy taskach `page_*`; **zakazane** przy taskach Social. |
| **`SocialBrief`** | Brief runu Social (post_* / reel_*): `topic` (wymagane), `audience?`, `goal?`, `ideaCount?` (integer ≥ 1). **Nie** zawiera `angle` / `targetLength`. Definicja TypeScript: `apps/api/src/runs/domain/run.types.ts` — **nie** `packages/shared`. |
| **`ContentBrief`** | Brief runu Content (page_*): `topic` (wymagane), `audience?`, `goal?` (string, bez enumu w shared), `angle?` (kąt / Challenger), `targetLength?` (słowa, integer ≥ 1). **Nie** zawiera `ideaCount`. CTA **nie** jest polem briefu — źródło akcji: `cta.items` kontekstu firmy. `contentKind` jest na runie, nie w briefie. Definicja: ten sam plik `run.types.ts`. |
| **`Run.brief`** | Kolumna JSON na agregacie Run: **unia** `SocialBrief` \| `ContentBrief` rozróżniana `taskType` (nie jeden kształt SM). Jeden byt runtime; dwa kontrakty TypeScript / Zod. |
| **Brief SM** | Potocznie = **`SocialBrief`** + platforma + język na starcie runu Social. Zmiana względem: wcześniejsze hasło mieszało platformę/język z polami briefu i sugerowało jeden brief na wszystkie `taskType`. |
| **Weryfikacja spójności** | Krok pipeline’u sprawdzający treść względem kontekstu firmy przed uznaniem wyniku. W MVP = węzeł `ConsistencyVerifier` (także język). |
| **HITL** | Human-in-the-loop: pauza runu na wybór z listy, gdy kolejny krok zależy od selekcji (task dwuetapowy). W MVP: **HITL model B**. Social (`post_ideas_then_content` / `reel_ideas_then_scripts`): podzbiór draftu / `hitl.options` — **min. 1** unikalne id (bez duplikatów, każde ∈ options); semantyka **N→N** (każde id → osobny artefakt w `contents[]` / `reelScripts[]`). 0 id / duplikat / id spoza draftu → **400** `HITL_INVALID_SELECTION` (bez zapisu, status zostaje `awaiting_hitl`). Content: jak wcześniej — `[outline.id]`. Zmiana względem: „dokładnie jeden `selectedIdeaId`” (kanon Fazy 4.3). |
| **HITL model B** | Faza ideas kończy **invoke** grafu; stan pauzy (draft, `conversationId`, metadane fazy) kanonicznie w **DB**; `POST .../hitl` startuje **nowy invoke** fazy content. Zakaz checkpoinetera LangGraph jako store pauzy w MVP. Zmiana względem: wcześniejsze hasło HITL bez modelu persistence. |
| **Full-auto** | Wykonanie tasku jednoetapowego bez wymuszonej pauzy selekcji. |
| **Self-host** | Uruchomienie we własnej infrastrukturze operatora; licencja MIT. |
| **First-run** | Stan pustej instancji: `GET /api/v1/auth/bootstrap-status` → `available: true` → jednorazowy `POST .../bootstrap-admin`. W UI **nie** jest osobną stroną — to tryb strony głównej (karta logowania). Potem endpoint bootstrap trwale niedostępny. |
| **Konto (widok)** | Osobna pozycja sidebara (admin i `user`): zmiana własnego emaila (**modal re-auth**: email disabled → hasło; przy **409** clear + odblokowanie emaila → `PATCH /auth/me/email` `{ email, currentPassword }`; złe hasło → **401** `INVALID_PASSWORD` pod polem, bez wylogowania), lista **własnych** runów (**live** dla `running` / `awaiting_hitl` / `interrupted`; **paginacja UI** 10 jak Runy — slice FE po `GET /runs/user/:userId` bez pageSize HTTP), **start** runu (**inline**, ten sam brief co modal na Runach), **Stop** na własnym runie nieterminalnym (modal potwierdzenia → `POST .../cancel`), opinia tekstowa. Prefill startu wyłącznie z wiersza „Moje runy” (snapshot `GET /runs/:runId`). **Nie** mylić z widokiem **Runy** (archiwum `completed` \| `failed` \| `cancelled` instancji, **paginacja HTTP** `pageSize=10` + CTA/modal startu). Wylogowanie jest w **headerze**. Po `POST /runs` **z Konta** użytkownik zostaje na Koncie. |
| **Runy (widok)** | Archiwum firmy: tylko `completed` \| `failed` \| `cancelled`, `GET /runs?status=completed,failed,cancelled`, odświeżanie przy wejściu i co **15 min**. CTA **„Uruchom agenta”** otwiera modal z tym samym briefem co na Koncie (pusty draft; bez prefillu z archiwum). **Bez** SSE i **bez** runów w toku na liście. Po `POST /runs` **z modalu** operator zostaje na Runach; live nowego runu = floating box. |
| **Floating box** | Sygnał własnych runów w toku poza widokiem Konto; zwiniecie/rozwinięcie. N× EventSource per `runId` (bez nowego hubu). `queued` poza boxem. **Bez** przycisku Stop (Stop tylko na Moich runach / szczegółach). Po `cancelled` — krótko label „Anulowany”, potem ukrycie pozycji (delay **200 ms**). |
| **Agenci aktywni** (`agentsActive`) | Sygnał UX + disable CTA startu: `completeness.complete === true` **∧** `gatewayAlive` (api `GET /api/v1/health/ready` → `checks.gateway` healthy; upstream = liveness procesu gateway). **Nie** oznacza „run w toku”, „konfiguracja gateway OK” ani „hop LLM na pewno się uda”. Odwrotnie: agenci nieaktywni = brak kontekstu **i/lub** gateway unreachable / nie odpowiada w timeoutcie. Copy nieaktywnego: „Agenci nieaktywni. Sprawdź kontekst i stan gatewaya.” Norma UX: `ux_dashboard.md`. |
| **MVP** | Pierwszy kompletny slice produktowy: auth, dashboard, gateway, **SQLite**, logi, SSE, fundament feedbacku, **Social (posty i rolki)** oraz **Content (BC) w podstawowej formie**; w kontrakcie slice’u także typowane `extras`, HITL Social dwuetapowy (min. 1 unikalne id ⊆ draftu, N→N), pola wyniku SM (`cta?`, `characterCount`, `contents[]` / `reelScripts[]`, `sourceIdeaId`) oraz opcjonalne `role` outline — **nie** kolejne workflowy. Zmiana względem: „HITL SM = 1 id” jako kanon slice’u. |
| **V1 — rozbudowa** | Faza **po MVP**: cutover persistence na **PostgreSQL** + panel odczytu opinii + publikacja na portalach SM + łańcuch audytorów Content + YouTube + **limit per-user liczby runów w toku** (obowiązkowy refaktor; MVP zostawia wyłącznie globalny `MAX_CONCURRENT_RUNS`) + **i18n UI (next-intl)**. **Nie** oznacza „kolejne workflowy / rolki / blog” (te kanały są w MVP). Nie mylić z prefiksem HTTP `/api/v1`. SQLite pozostaje silnikiem MVP **także** po dodaniu Content. |

## Role i tenancy

| Pojęcie | Definicja |
|---------|-----------|
| **`admin`** | Jedyny administrator (bootstrap); wyłączne prawo edycji kontekstu firmy i zapraszania (email); może generować treści jak `user`. Na instancji z `DEMO_MODE=true` **bez** locków gościa. Norma: `security.md`. |
| **`user`** | Rola uruchamiająca runy produktowe (Social i Content) i przeglądająca wyniki/logi; bez edycji kontekstu i bez zapraszania. Konto powstaje po akceptacji zaproszenia **gdy `DEMO_MODE=false`** (członek zespołu) **albo** po self-register **gdy `DEMO_MODE=false`** (w `production` — po aktywacji e-mail). Widok **Konto** (email, własne runy, start) jest dostępny tak samo jak dla `admin`. Przy demo on invite → **`guest`**, nie `user`. |
| **`guest`** | Rola demonstracyjna / gość sandboxu. Powstaje przy **`POST /auth/register` lub `POST /auth/accept-invite`** gdy `DEMO_MODE=true` (body nadal **bez** `role`). **Nie** z bootstrap. Przy demo: także zaproszony = gość sandboxu, **nie** członek zespołu. Aktywacja e-mail w `production` dotyczy także `guest` (ścieżka register). **Zakaz permanentny** awansu `guest` → `user` / `admin` (brak endpointu i ścieżki produktowej). Gdy `DEMO_MODE=false`: login i chronione trasy z JWT `role=guest` → **401** jak konto nieaktywne (rola **martwa** mimo ważnego ciasteczka). |
| **DEMO MODE** | Tryb instancji sterowany env **`DEMO_MODE`** (`true` \| `false`, default **`false`**), ładowany przy **starcie procesu** (zmiana = restart). **Brak** switcha w UI admina. FE czyta publiczny `GET /config` → `{ demoMode: boolean }`; egzekucja limitów i authz **zawsze** w API. |
| **Slot gościa** | Hardcoded allowlista startów na życie konta `guest`: `post_ideas` ×1, `page_copy` ×1, `page_outline_then_copy` ×1. Zużycie = COUNT runów `startedByUserId` + `taskType` **bez filtra statusu** (także `failed` / `cancelled` / `completed` / …). HITL **bez** osobnego limitu. **Nie** env. |
| **Global guest cap** | Dzienny limit **wszystkich** startów `guest` na instancji (niezależnie od typu): env `GUEST_GLOBAL_CAP_PER_DAY` (default **30**); doba **UTC**; Redis INCR; admit **przed** `create` Run. Pad Redis przy `POST /runs` guest → **fail closed**. |
| **Soft limit rating gościa** | Dzienny limit ocen własnego runu przez `guest`: env `GUEST_RATING_CAP_PER_DAY` (default **10**); doba UTC; **429** + message. Pad Redis → **fail open** (ocena przechodzi). |
| **Redis (guest quota)** | Klient `ioredis` w `apps/api` pod limity gościa. Połączenie **wyłącznie** env **`REDIS_HOST`** + **`REDIS_PORT`** (+ opcjonalne **`REDIS_PASSWORD`** AUTH). Przy `DEMO_MODE=true` HOST+PORT **wymagane** (fail-fast). **Bez** `REDIS_URL`. Ops: `deployment.md`; sekret hasła: `security.md`. |
| **GuestGuard** / **`@AllowGuest()`** | Globalny guard API: dla `role === guest` wymagany dekorator **`@AllowGuest()`** (whitelist tras). Brak dekoratora → **403**. Nowe trasy **domyślnie zablokowane** dla guest. Semantyka `@Roles` dla `admin`/`user` **bez zmian** (brak `@Roles` = authenticated OK). **Nie** zastępować tego masowym `@Roles('admin','user')`. |
| **DemoChip** / **`DemoModeChipSlot`** | Chip UX „tryb demo” **nad** CompletenessChip, **tylko na dashboardzie**, gdy `demoMode === true`. Przy demo off **niewidoczny**. Locki UI (sidebar, formy, disable typów poza allowlistą) wyłącznie gdy `session.role === 'guest'` **i** `demoMode === true`. |
| **Jedna firma / instancja** | Brak multi-tenant SaaS: wszyscy użytkownicy instancji dzielą jeden kontekst. |
| **Bootstrap admin** | Utworzenie pierwszego konta administratora przy starcie self-host (first-run): email + hasło, **bez** maila i bez Invitation. Jedyny sposób powstania `admin`. Dump / restore SQLite przenosi role (**w tym** admina i `guest`); `DEMO_MODE` **nie** degraduje ról w DB. |
| **Zaproszenie (Invitation)** | Rekord zaproszenia e-mail — **nie** jest kontem `User` i **nie** pinuje roli na sztywno. Status: `pending` \| `accepted` \| `revoked`. Admin podaje **tylko email**. Sens zależy od trybu instancji: demo off = zaproszenie do zespołu; demo on = wpuszczenie kolejnego gościa sandboxu. W DB: hash tokenu (SHA-256), TTL, `purpose = invite` (MVP). Raw token jest w mailu (w `development` także w logu api); **nigdy** w JSON-ie odpowiedzi admina. Wiersz `User` powstaje dopiero przy akceptacji — rola vs `DEMO_MODE`. Wygaśnięcie: `expiresAt < now` przy walidacji (status **nie** przechodzi sam na „expired” — wygasły wiersz zostaje `pending`). |
| **Akceptacja zaproszenia** | Publiczny `POST /api/v1/auth/accept-invite` `{ token, password }`: zaproszony ustawia **pierwsze** hasło (polityka z `security.md`). Tworzy aktywnego `User` (**rola vs `DEMO_MODE`** jak register: `true` → `guest`, `false` → `user`; **`verifiedAt = now()`**) i zużywa token. **Bez** Set-Cookie — potem zwykły `POST /auth/login`. Kolizja `User.email` (także soft-deleted) → **401** jak nieważny token (bez enumeracji „email zajęty”) + unieważnienie Invitation. Nie jest bootstrapem ani otwartą rejestracją. Zmiana własnego emaila po sesji = widok **Konto** **z re-auth hasłem** (nie confirm mail w MVP). |
| **Otwarta rejestracja** | Publiczny `POST /api/v1/auth/register` `{ email, password }`. Zawsze dostępny (**nie** zależy od `DEMO_MODE` — signup **nie** jest „tylko demo”). **Zmiana względem:** po planie register serwer **zawsze** `role = user`. **Refaktor:** `DEMO_MODE=true` → **`guest`**; `DEMO_MODE=false` → **`user`**. Body **bez** `role`. **Nigdy** `admin`. Przed create **revoke** `Invitation` `pending` na email. **201** `{ user: { id, email, role, verifiedAt } }`. W `production`: pending (`verifiedAt = null` + `AccountActivation` + mail) — **także** dla `guest`; poza prod: `verifiedAt` od razu. Kolizja email (aktywny **lub** soft-deleted) → **409**, `message`: **`Email already in use`**. **Bez** Set-Cookie. |
| **Aktywacja konta** | Weryfikacja e-mail po register w `production`: `POST /auth/activate` `{ token }` ustawia `User.verifiedAt` i usuwa `AccountActivation`. Deep link FE → widok logowania + toast. **Nie** mylić z **reaktywacją** soft-delete (`PATCH /users/:id`) ani z **confirm e-mail** przy zmianie adresu (**V1**). |
| **`verifiedAt`** | Pole `User` (`DateTime?`): `null` = nieaktywowane linkiem (pending w prod); po sukcesie activate = timestamp. Poza `production` ustawiane przy register. Soft-delete **nie** czyści `verifiedAt`. |
| **`AccountActivation`** | Tabela tokenu aktywacji: `id` = **`act_<uuid>`**; **`tokenHash`** (unikalny) + **`userId`** (unikalny) + `expiresAt` (TTL `ACTIVATION_TTL`, default `7d`). Raw tylko w mailu / logu DX. Po activate — delete wierszy dla usera; przy soft-delete usera — delete wierszy activation. Kind mailera: `user_activation` (obok `user_invited`). |
| **Resend aktywacji** | Publiczny `POST /auth/resend-activation` (np. `{ email }`): zawsze **200**, `message`: **`Wiadomość wysłana ponownie`**; mail + rotacja tokenu tylko przy pending; rate limit **5** / **15 min** / email; **bez** **503** na SMTP. **Bez** enumeracji stanu konta. |
| **Strona podziękowań (thank-you)** | Widok FE po udanym register w `production`: copy sukcesu + „Nie otrzymałeś wiadomości e-mail?” + „Wyślij ponownie” (email z **stanu klienta**, nie z odpowiedzi **201**). Po **503** register (pad maila) — **zostajemy** na thank-you + resend. **Nie** po 409 ani poza production. |
| **Reaktywacja** | Admin `PATCH /users/:id` `{ isActive: true }` po soft-delete. **Nie** ustawia `verifiedAt`. |

## Architektura i runtime

| Pojęcie | Definicja |
|---------|-----------|
| **Modularny monolit** | Trzy procesy w jednym monorepo (`apps/api`, `apps/frontend`, `apps/ai-provider-gateway`) ze wspólnym `packages/shared`. |
| **Cienki klient** | `apps/frontend`: UI + HTTP/SSE; **bez** reguł bramki, grafu Social / Content, Prisma i sekretów LLM. |
| **Port / adapter** | Granica I/O: domain/application zależą od portu. Prisma = adapter w `infrastructure` BC. Klient gateway = adapter HTTP w `apps/api/src/llm/` (port `LlmGateway`). Zmiana względem: wcześniejszy opis bez lokalizacji adaptera LLM. |
| **Port `LlmGateway`** | Port chat (i opcjonalnie stream) do `apps/ai-provider-gateway`; jedyna droga `apps/api` do LLM. Wołają go BC (np. Social), nie kontrolery HTTP. |
| **Bounded context (BC)** | Obszar odpowiedzialności w `apps/api` z układem warstw HTTP → application → domain + porty → adaptery: **Auth**, **Company Context**, **Social**, **Content**, **Runs / Logs**, **Feedback**. **Nie** to samo co jeden plik `*.module.ts` Nest — jeden BC może mieć kernel + HTTP. Zmiana względem: lista bez Content (Content wchodzi w MVP, nie V1). |
| **Moduł Nest** | Jednostka DI (`@Module`). Import w **jedną** stronę jest legalny (Social → kernel lifecycle). Pętla `forwardRef` między BC grafu a Runs — zakaz (`architektura.md`, `anty_patterny.md`). |
| **Port lifecycle runu** | Port Runs: `appendLog` + `transition`. Wołają go węzły/fasada grafu. Token w `runs/domain/`; **nie** w `packages/shared`. |
| **Port `RunExecutor`** | Port Runs: `execute(run)`. W MVP: **composite** w kleju procesu — `taskType` Social → `SocialRunExecutor`; `taskType` Content → `ContentRunExecutor`; nieznany → `failed` z kodem `UNKNOWN_TASK_TYPE`. Binding tokenu = klej procesu, nie import grafu z `RunsModule`. |
| **Port `RunResultReader`** | Port odczytu wyniku runu (snapshot GET). W MVP: **composite** w kleju — składa **addytywny** snapshot: `ideas` / `content` / **`contents`** (posty), `reelIdeas` / `reelScript` / **`reelScripts`** (rolki), `pageOutline` / `pageDocument` (Content). Brak kanału = pusta tablica / `null` (nie null-crash). Binding jak executora — composition root, nie import grafu z `RunsModule`. |
| **Klej procesu (composition root)** | Spięcie tokenów Nest przy starcie `apps/api` (`AppModule` / `registerAsync`). **Nie** bounded context i **nie** `health/` / `llm/`. |
| **Feedback (BC)** | Bounded context zapisu opinii tekstowych (`application` \| `agent` \| `run`). Bez LangGraph; panel odczytu = **V1 — rozbudowa**. **Nie** ocena gwiazdkowa, flaga edycji ani finalize (to Runs). |
| **LangGraph / graf** | Orchestracja pipeline’u za fasadą application service (nie w controllerze). MVP: osobny graf Social i osobny graf Content; **zakaz** fat Social (strony w `social/`). |
| **Async run** | Asynchroniczne wykonanie pipeline’u; klient dostaje `RunId`, postęp przez SSE. |
| **Worker in-process** | Wykonanie runu w procesie `apps/api` po `202`. Zakaz osobnego always-on workera OS i spawnu procesu per run w MVP. |
| **Limit współbieżności** | Globalny `MAX_CONCURRENT_RUNS` (domyślnie **3**) = maksymalna liczba równoległych **execute** w procesie api. Wejście w `running` z `queued` **oraz** z `interrupted` tylko przy wolnym slocie. Nowe POST ponad limit zostają `queued` (FIFO). W drain: najpierw `interrupted`, potem `queued`. `awaiting_hitl → running` (HITL) jest osobnym use-casem i **nie** jest tym capem w MVP. Brak limitu per-user w MVP. Zmiana względem: wcześniejszy opis capu wyłącznie dla nowych runów w `queued`. |
| **Gateway** (`ai-provider-gateway`) | Osobna aplikacja — jedyna droga `apps/api` do vendorów LLM; bez domeny Content Chain. |
| **`packages/shared`** | Współdzielone typy kontraktu API i brand types (**bez** logiki biznesowej, **bez Zod** / runtime walidatorów). **Nie** mylić z `apps/api/src/shared/`. |
| **`apps/api/src/shared/`** | Cross-cutting wyłącznie wewnątrz api (env, envelope, interceptory, m.in. `parseWithZod` — runtime Zod **tylko** w api shared; `details[].path` = segmenty Zod `issue.path` połączone `'.'`). **Nie** zastępuje `packages/shared` i **nie** trzyma reguł Social / kontekstu firmy. |
| **Moduły ops / LLM (nie-BC)** | `apps/api/src/health/`, `metrics/`, `llm/` — powierzchnia ops i klient gateway. **Nie** bounded contexty: brak układu `application` / `domain` / `infrastructure` jak w BC. |
| **Prisma / SQLite** | Adapter persistence **MVP**; ORM tylko w infrastructure. |
| **PostgreSQL** | Silnik od fazy **V1 — rozbudowa** (ops / skala). **Nie** jest warunkiem dodania Content — Content działa na SQLite w MVP. |
| **DB kanoniczna** | Baza jako źródło prawdy dla kontekstu firmy, userów, sesji refresh, runów, wyników Social (posty i rolki) i Content, logów UI, **opinii tekstowych** oraz metadanych przeglądu (`userRating`, `outputEdited`, `reviewFinalizedAt`, `pipelineFinishedAt`). Nie cichy fallback z plików. `reviewExpiresAt` **nie** jest kolumną — wyliczane w API. |

## Run, statusy, taski

| Pojęcie | Definicja |
|---------|-----------|
| **`RunId`** | Brandowany ID runu; format `run_<uuid>`. |
| **`RunStatus`** | `queued` \| `running` \| `interrupted` \| `awaiting_hitl` \| `completed` \| `failed` \| `cancelled`. |
| **`RunTaskType`** | Social: `post_ideas` \| `post_content` \| `post_ideas_then_content` \| `reel_ideas` \| `reel_script` \| `reel_ideas_then_scripts`. Content: `page_copy` \| `page_outline_then_copy`. |
| **`SocialPlatform`** | `linkedin` \| `facebook` \| `instagram`. **Nie** zawiera `'web'`. |
| **`RunPlatform`** | `SocialPlatform` \| `'web'`. Kolumna `Run.platform` (NOT NULL): przy `page_*` sentinel **`web`** (wartość kolumny, nie wartość enumu SM). Application nigdy nie traktuje `'web'` jako `SocialPlatform`. |
| **`ContentLanguage`** | `pl` \| `en`. |
| **`cancelled`** | Terminal: ręczna decyzja `startedBy` (Stop). Legalne wejścia wyłącznie z nieterminalnych: `queued` \| `running` \| `awaiting_hitl` \| `interrupted` → `cancelled`. Bez wyjść; bez resume / retry na tym samym `runId`. Authz: tylko `startedBy` (brak admin-cancel). Ustawia `cancelledAt`. **Nie** jest `failed` (błąd pipeline) ani `interrupted` (recovery). `POST /runs` nigdy nie tworzy `cancelled`. |
| **`cancelledAt`** | Timestamp pierwszego udanego przejścia do `cancelled` (`null` \| ISO8601). Bez osobnego `cancelledBy` — przy authz = `startedBy` to ten sam podmiot. |
| **`cancelRequested`** | Durable flaga na runie (oprócz statusu). Chroni wyścig cancel vs crash procesu, zanim status wyląduje albo abort się domknie. Recovery: leftover `running`/`interrupted` **z** flagą → `cancelled` (bez `recoveryAttempts++`, nie retryable). Flaga na już-terminalnym statusie jest **ignorowana**. |
| **Anulowanie runu / Stop** | Świadome przerwanie runu przez `startedBy`: HTTP `POST /api/v1/runs/:runId/cancel` (body puste) + w v1 abort hopu LLM **in-process** (`AbortSignal` w `apps/api`; abort gateway/provider poza v1). UI: przycisk **Stop** + modal **„Czy na pewno?”**. |
| **`interrupted`** | Status recovery: execute w procesie api zostało przerwane (crash/restart); pipeline **nie leci**, ale to **nie** jest nowa pozycja FIFO z `POST /runs`. Powstaje wyłącznie na bootcie z leftover `running`. Legalne wyjścia: `interrupted → running` (wolny slot), `interrupted → failed` (cap recovery) albo **`interrupted → cancelled`** (Stop / leftover z `cancelRequested`). Zakaz `interrupted → queued`. **Zakaz** utożsamiania z `cancelled`. Nie mylić z `queued` ani z `awaiting_hitl`. |
| **`startedBy`** | Inicjator runu (sesja). Lista/snapshot; authz oceny, Edytuj, opinii o runie, **anulowania (Stop)** i `GET /runs/user/:userId`. Po auth nowe runy zawsze z inicjatorem. |
| **Log runu** | Czytelny wpis w DB powiązany z `RunId`, zwykle też z `ConversationId` oraz `RequestId` **tego kroku**; źródło prawdy dla UI. |
| **Logi procesu (Pino)** | Strukturalne logi stdout `apps/api` (request HTTP, crash, start) przez `nestjs-pino`. **Nie** zamiennik kanonicznych logów runu w DB. |
| **Hop LLM** | Jedno wywołanie gateway w kroku agenta / refine. Własny `RequestId` z **odpowiedzi** gateway; wspólny `ConversationId` runu. |
| **Ocena runu** | Pole `userRating` (typ `RunUserRating` \| `null`): zawsze obecne; `null` gdy autor nie zostawił gwiazdek; `1`…`5` gdy zostawił. Po zamknięciu przeglądu (ręczne finalize **albo** po `REVIEW_TTL`) niemutowalne. |
| **Flaga edycji outputu** | `outputEdited`: czy autor zapisał edycję wyniku (bez stopnia / diff / historii wersji w MVP). |
| **Edytuj** | Akcja UI po pipeline (`completed` / `failed`): autor może zmienić treść wyniku; zapis **zastępuje** kanoniczny `result` w DB i stawia `outputEdited: true`. **Nie** HITL i **nie** re-invoke grafu. Tylko `startedBy`, dopóki przegląd otwarty (okno TTL). Wielokrotny zapis do finalize / przed TTL. Zmiana względem: wyłącznie flaga, bez nadpisu wyniku w MVP. |
| **Przegląd runu** | Po `completed` \| `failed` autor może zmieniać gwiazdki i zapisywać edycję wyniku, dopóki przegląd jest **otwarty**: `reviewFinalizedAt === null` **oraz** `now < pipelineFinishedAt + REVIEW_TTL`. Zamknięcie: ręczne `POST .../finalize-review` **albo** auto-finalize (sweeper) **albo** produktowo po TTL (mutacje → `REVIEW_LOCKED` jeszcze przed zapisem sweepera). TTL przeglądu **nie** zamyka opinii tekstowej (`POST /feedback`). |
| **`pipelineFinishedAt`** | Kotwica okna przeglądu: timestamp ustawiany **raz** przy legalnym transition → `completed` \| `failed`. `null` przy `cancelled` i statusach nieterminalnych. Po wdrożeniu: **nie** używać `updatedAt` jako bieżącej kotwicy (wyjątek: jednorazowy backfill migracji). |
| **`REVIEW_TTL` / TTL przeglądu** | Env api (default **`2h`**, parser jak `INVITE_TTL`): długość okna od `pipelineFinishedAt`, w którym mutacje przeglądu (ocena / Edytuj / finalize) są dozwolone. Szczegóły env: `deployment.md`. |
| **`REVIEW_SWEEP_INTERVAL`** | Env api (default **`5m`**, ten sam styl stringa TTL): częstotliwość **okresowego** sweepera domykającego wygasłe przeglądy w DB. **Nie** jest długością okna przeglądu. Boot api zawsze odpala sweeper raz. |
| **Auto-finalize przeglądu** | Jedyny trwały zapis locka w DB poza ręcznym finalize: sweeper (boot + okresowy) ustawia `reviewFinalizedAt = pipelineFinishedAt + REVIEW_TTL` dla wygasłych otwartych przeglądów. **Bez** zmiany `userRating` / `outputEdited` / `result`. **Bez** `DELETE` wiersza. Mutacja po TTL **nie** ustawia `reviewFinalizedAt` — tylko **409** `REVIEW_LOCKED`. |
| **`reviewExpiresAt`** | Pole **wyliczane** w odpowiedzi API (nie kolumna DB). Semantyka: `null` gdy brak `pipelineFinishedAt` **albo** `reviewFinalizedAt !== null`; inaczej ISO deadline (`pipelineFinishedAt + REVIEW_TTL`) — także **po** TTL, zanim sweeper zapisze lock. Kontrakt: `GET /runs/:id` + sukcesy mutacji przeglądu; **nie** na `GET /runs/user/:userId`. |
| **`reviewFinalizedAt`** | Timestamp zamknięcia przeglądu w DB (ręczne finalize **albo** auto-finalize sweepera). Produktowo przegląd jest zamknięty także gdy `null`, ale minął deadline (`now ≥ pipelineFinishedAt + REVIEW_TTL`) — mutacje → `REVIEW_LOCKED`; sweeper domyka wiersz później. Po ustawieniu: ocena, flaga edycji i treść wyniku niemutowalne. |
| **Opinia (Feedback)** | Append-only wpis tekstowy BC Feedback: target `FeedbackTargetType`; metadane `authorId`, `createdAt`; panel odczytu = V1. **Nie** gwiazdki / `outputEdited` / finalize (to Runs). Zamknięcie przeglądu (ręczne lub po TTL / auto-finalize) **nie** blokuje kolejnego wpisu. Zmiana względem: wcześniejsze hasło bez rozróżnienia rekordu vs BC vs przegląd. |
| **`FeedbackTargetType`** | `application` \| `agent` \| `run`. Przy `agent` obowiązkowe `agentKey`; przy `run` obowiązkowe `runId` autora (`startedBy`). Kontrakt MVP w docs/spec; w shared przy implementacji BC Feedback. |
| **`FeedbackAgentKey`** | Stały enum MVP: `IdeationAgent` \| `ContentWriterAgent` \| `ConsistencyVerifier` \| `PageWriterAgent`. Węzły `LoadContext`, `NormalizeBrief`, `Persist*`, `Refine*`, `OutlineAgent` **nie** są pozycjami tego katalogu. Kontrakt MVP w docs/spec; implementacja enumu w shared = Faza 6 (feedback). |
| **SSE runu** | Strumień zdarzeń: `run.status`, `run.log`, `run.hitl`, `run.completed`, `run.failed`, **`run.cancelled`**. Po terminalu (`run.completed` \| `run.failed` \| `run.cancelled`) serwer **kończy** strumień. `awaiting_hitl` / `interrupted` nie kończą SSE. Reconnect tylko po nieoczekiwanym zerwaniu przy statusie nieterminalnym. Zmiana względem: wcześniejsze hasło wymieniało eventy bez cyklu życia połączenia i bez trzeciego terminalu `cancelled`. |
| **Snapshot logów** | `GET .../runs/:runId/logs` — historia; nie zastępuje SSE dla statusu live. |
| **Agent (węzeł pipeline’u)** | Krok grafu Social albo Content. Katalog bazowy Social: `LoadContext`, `NormalizeBrief`, `IdeationAgent`, `ContentWriterAgent`, `ConsistencyVerifier`, `Refine*`, `Persist*`. Katalog bazowy Content: `LoadContext`, `NormalizeBrief`, `OutlineAgent`, `PageWriterAgent`, `ConsistencyVerifier`, `Refine*`, `Persist*`. Wywołanie LLM (gdy dotyczy) = osobny hop do gateway. |
| **`ConsistencyVerifier`** | Jeden węzeł, dwa obszary: (1) spójność z kontekstem firmy, (2) język — gramatyka, interpunkcja, składnia dla `pl`/`en`. Osobny `LanguageQualityVerifier` = poza MVP. Fail → Refine*. |
| **Refine** | Ponowne wywołanie agenta po negatywnym werdykcie `ConsistencyVerifier`. Twardy limit **`max N=2`**, potem `failed`. Zakaz nieskończonej pętli. Zmiana względem: wcześniejsze „ograniczone `max N`” bez liczby. |
| **Structured output** | Wyjście węzła LLM walidowane schemą (Zod) zanim pójdzie dalej w grafie. Porażka parse = błąd kroku / refine / `failed` — nie cichy tekst do UI. |
| **Recovery runu** | Po restarcie / crashu api: leftover `running` **bez** `cancelRequested` → `interrupted` (`recoveryAttempts++`), potem claim `interrupted → running` pod `MAX_CONCURRENT_RUNS`. Leftover `running` **albo** `interrupted` **z** `cancelRequested` → **`cancelled`** (bez `recoveryAttempts++`, nie retryable; nie ponowne execute). Leftover już `interrupted` bez flagi (nie zdążył dostać slotu) — **bez** inkrementu, wraca do pompy. Do **3** prób wznowienia **fazy** z trwałego stanu w DB po powrocie do `running` (model B; nie dokończenie hopu LLM w locie). `awaiting_hitl` **nie** zużywa puli recovery. Anulowanie użytkownika **nie** zużywa `recoveryAttempts`. Flaga `cancelRequested` na już-terminalnym statusie jest ignorowana. Po wyczerpaniu capu → `failed` + log. Zmiana względem: wcześniejsze recovery bez gałęzi `cancelRequested` → `cancelled`. |
| **`isRetryable`** | Polityka domeny Runs: co wolno ponowić (recovery po crashu, timeout / rate-limit gateway wg polityki) vs czego nie (walidacja, wyczerpany refine verifiera, zła konfiguracja klucza gateway). |

## Identyfikatory i korelacja

Zmiana względem wcześniejszego, zbyt uproszczonego opisu: **`RequestId` nie jest jeden na cały run.** Formaty `req_<uuid>` / `conv_<uuid>` nadal jak w `ai-provider-gateway` (zgodność logów), ale semantyka zakresów jest jak poniżej.

| Pojęcie | Definicja |
|---------|-----------|
| **`RunId`** | Jeden na async run produktowy (`run_<uuid>`). |
| **`ConversationId`** | Brand; format jak w gateway: `conv_<uuid>`. **Jeden wspólny na cały run agentowy** — nim spinamy wszystkie wywołania LLM i wpisy logów runu (aplikacyjne + gateway). |
| **`RequestId`** | Brand; format jak w gateway: `req_<uuid>`. Nadawany w **odpowiedzi**: przez `apps/api` (HTTP) albo przez gateway (hop LLM). Klient / kroki runu **nie** generują go z góry. Oś korelacji pipeline’u SM = `ConversationId` (+ `RunId`). |
| **`UserId`** | Brand; rekomendowany format `usr_<uuid>`. |
| **`InvitationId`** | Brand; format `inv_<uuid>`. Jeden rekord zaproszenia (nie konto). |
| **`FeedbackId`** | Brand; format `fbk_<uuid>`. Jeden wpis opinii tekstowej. Kontrakt MVP w docs/spec; w `packages/shared` przy implementacji BC Feedback. |
| **`RunUserRating`** | Brand `1` \| `2` \| `3` \| `4` \| `5`. W JSON runu pole `userRating` jest `number \| null` (`null` = brak gwiazdek). Kontrakt MVP w docs/spec; w shared przy implementacji przeglądu runu. |
| **`GatewayModelAlias`** | Brand aliasu modelu z konfiguracji gateway (≠ vendor `modelId`). |
| **`UserRole`** | `admin` \| `user` \| `guest` (shared; persistencja String w DB — **bez** wymogu Prisma enum). |
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
| **`GET /config`** | Publiczny: V1 wyłącznie `{ demoMode: boolean }`. |
| **Swagger `/docs`** | DX OpenAPI UI `apps/api`, **poza** `/api/v1`. Zakaz montowania pod `/api` (kolizja z prefiksem produktowym). |
| **JWT + httpOnly cookies** | Access w `cc_access` + refresh w `cc_refresh` (oba httpOnly) dla `apps/frontend` i Postmana; to samo auth dla SSE. Bez Bearer w MVP. |
| **Envelope błędu CC** | JSON: `{ code, message, requestId, details? }`. |
| **Toast (dashboard MVP)** | Efemeryczny sygnał UI po udanej mutacji / terminalu runu poza szczegółami. **Nie** jest elementem envelope HTTP i **nie** jest kanałem live. Copy sukcesu: PL (m.in. `POST .../cancel` **200** → **„Run anulowany”**; SSE terminal `cancelled` jak `completed`/`failed`, z dedupem względem toasta mutacji). Błąd: `message` z envelope (bez `code` w UI), gdy w ogóle toastowany. Norma: `ux_dashboard.md`. Zmiana względem: błąd toastowany jako `code` + `message`. |
| **`x-request-id`** | Nagłówek korelacji HTTP **odpowiedzi** `apps/api` (to samo `RequestId` co w envelope). Klient **nie musi** go wysyłać. Przy chat/stream do gateway Content Chain **nie** ustawia tego nagłówka. |
| **Health** | **Liveness api:** `GET /api/v1/health` — żywy proces `apps/api`. **Readiness api (produktowa bramka FE):** `GET /api/v1/health/ready` — agregat: proces api + zależność `gateway` = **liveness** upstream (`GET {GATEWAY}/api/v1/health`); **nie** konsumpcja upstream `/health/ready` (config/redis/cache). Gateway (ops): własne `/health` (liveness) i `/health/ready` (pełny readiness). Zmiana względem: hasło bez readiness api i bez rozróżnienia liveness vs pełny readiness gateway w chipie. |
| **Metrics / Prometheus** | `GET /metrics` na `apps/api` — metryki operacyjne procesu; **nie** zamiennik logów runu. |
| **`X-Gateway-Key`** | Sekret klienta gateway; tylko po stronie `apps/api` / env, nigdy w bundlu frontu. |
| **Natywny czat gateway** | `POST /api/v1/chat` (i opcjonalnie `/chat/stream`) — domyślna ścieżka LLM z Content Chain. |

## Kody błędów — Content Chain API

| `code` | Znaczenie |
|--------|-----------|
| `UNAUTHORIZED` | Brak lub nieważna sesja. **Nie** obejmuje złego hasła przy re-auth (`INVALID_PASSWORD`). |
| `INVALID_PASSWORD` | Złe `currentPassword` przy re-auth (np. `PATCH /auth/me/email`). HTTP **401**; `message`: `Invalid password`. FE **nie** traktuje jak wygaśnięcie sesji. |
| `FORBIDDEN` | Brak uprawnień (np. `user` edytuje kontekst; `guest` bez `@AllowGuest` albo mutacja zabroniona / cudzy detail). |
| `GUEST_TYPE_NOT_ALLOWED` | `guest` startuje `taskType` poza allowlistą slotów (`post_ideas` / `page_copy` / `page_outline_then_copy`). |
| `GUEST_TYPE_QUOTA_EXCEEDED` | `guest` wyczerpał slot danego typu (COUNT ≥ 1 bez filtra statusu). |
| `GUEST_GLOBAL_QUOTA_EXCEEDED` | `guest` wyczerpał dzienny global cap instancji (`GUEST_GLOBAL_CAP_PER_DAY`, UTC). |
| `VALIDATION_FAILED` | Błąd walidacji wejścia. |
| `CONTEXT_INCOMPLETE` | Bramka kontekstu niespełniona — start runu zablokowany. |
| `UNKNOWN_TASK_TYPE` | Composite executor dostał `taskType` poza unią Social \| Content (log + status `failed`; nie cichy no-op). HTTP spoza enumu → `VALIDATION_FAILED` (400), composite nie jest wołany. |
| `HITL_REQUIRED` | Konflikt względem oczekiwanego stanu HITL. |
| `HITL_INVALID_SELECTION` | Selekcja HITL niezgodna z kanonem (Content ≠ `[outline.id]`; Social dwuetapowy: długość `< 1`, duplikaty, albo id spoza draftu / `hitl.options`). |
| `NOT_FOUND` | Nieznana ścieżka HTTP / zasób na poziomie routera (np. goły HTTP 404). **Nie** mylić z `RUN_NOT_FOUND`. |
| `RUN_NOT_FOUND` | Nieznany `RunId` (wyłącznie z `DomainException` w BC Runs). |
| `REVIEW_LOCKED` | Przegląd zamknięty produktowo: `reviewFinalizedAt` ustawione **albo** minął `REVIEW_TTL` od `pipelineFinishedAt`. Mutacja oceny / Edytuj / finalize niedozwolona; przy samym TTL (przed sweeperem) **bez** side-effect UPDATE `reviewFinalizedAt`. |
| `RUN_NOT_REVIEWABLE` | **Przegląd** (ocena / Edytuj / finalize): run nie jest `completed` ani `failed` (w tym `cancelled` → ten kod). **Opinia** `POST /feedback` `targetType=run`: dozwolone `completed` \| `failed` \| (`cancelled` **gdy** snapshot ma dowolne nie-`null` pole wyniku); `cancelled` bez wyniku → ten kod. Nie dotyczy opinii o aplikacji / agencie. Finalize **nie** zamienia kolejnego wpisu tekstowego na ten kod (`REVIEW_LOCKED` zostaje przy ocenie / fladze). |
| `RUN_NOT_CANCELABLE` | Cancel (`POST .../cancel`) gdy status runu jest już `completed` \| `failed` (wyścig z executorem). HTTP **409**. |
| `CONFLICT` | Niedozwolone przejście statusu / konflikt stanu (także: drugi `pending` na ten sam email; istniejący `User` przy `POST /invitations`; `User.email` już zajęty przy `PATCH /auth/me/email` **oraz** przy `POST /auth/register`). **Nie** oznacza kolizji email na `POST /auth/accept-invite` (tam maskowanie → **401** `UNAUTHORIZED`). |
| `MAIL_DELIVERY_FAILED` | Pad SMTP **po** zapisie zaproszenia (create / resend invite) **albo** po utworzeniu pending User (**register**). HTTP **503**; w `details` wyłącznie `id` (Invitation albo User). **Nie** dotyczy `POST /auth/resend-activation`. Nie dotyczy adaptera logującego (`development` / `test`). |
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
