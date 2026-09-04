# Dokumentacja koncepcyjna — Content Chain

## Cel produktu

**Content Chain** to publiczna, self-hostowalna aplikacja agentowa do generowania treści **Social** (posty i rolki) oraz **Content** (copy stron / artykułów w podstawowej formie): od briefu, przez orchestrację agentów i weryfikację względem kontekstu firmy, po zapis wyników i obserwowalny przebieg runu.

Najważniejsza wartość:

- **Uruchamialny dowód** aplikacji opartej o agentów AI (nie sam opis procesu) — monorepo z frontendem, API oraz osobnym gateway LLM.
- **Realny use-case `ai-provider-gateway`** — Content Chain pokazuje praktyczne wykorzystanie gateway’a LLM z osobnego projektu (nie tylko izolowany dowód samego gateway’a).
- **Treść spójna z kontekstem firmy** — wspólny, kanoniczny kontekst w bazie; flow’y zablokowane do jego uzupełnienia; weryfikacja spójności przed uznaniem wyniku.
- **Obserwowalność** — logi runów w pełni czytelne, tak by dało się odtworzyć przebieg generowania i decyzji.
- **Self-host pod licencją MIT** — jedna instalacja = jedna firma = jeden wspólny kontekst; bez modelu multi-tenant SaaS.

Zmiana względem wcześniejszego zapisu „świadomie ograniczony pierwszym slice’em Social (post ideas + post content)”: MVP obejmuje **dwa kanały generowania** — Social (posty **i** rolki) oraz Content (BC, podstawowa forma). To nadal MVP sprawdzające agentów, kontekst, persistence i UX self-host, nie pełny pakiet (łańcuch specjalistów, YouTube, publikacja, WordPress). Jawna zmiana względem `content-chain_brief.md` (odrzucenie rolek/bloga w pierwszym slice — **nadpisane** tą dokumentacją, 2026-08-31).

## Dla kogo jest system

| Segment | Potrzeba |
|---------|----------|
| **Administrator** | Bootstrap konta, zarządzanie użytkownikami, **wyłączna** edycja kontekstu firmy; może też generować treści jak zwykły użytkownik. |
| **Użytkownik** | Uruchamianie runów produktowych (Social i Content) na wspólnym kontekście firmy, przegląd wyników i logów; bez edycji kontekstu. |
| **Zespół wewnętrzny (self-host)** | Jedna firma / niewielki zespół: wspólny kontekst, generowanie treści bez multi-tenant SaaS. |
| **Operator self-host** | Wdrożenie we własnej infrastrukturze, konfiguracja gateway LLM, utrzymanie jednej instancji dla organizacji. |

## Zakres produktu (MVP)

- Monorepo trzech aplikacji: **web** (Next.js), **api** (NestJS + LangChain/LangGraph), **gateway** LLM (jedyna droga do vendorów modeli).
- **Auth** w formie docelowej: konto admina (bootstrap) + konta użytkowników.
- **Dashboard**: uzupełnianie / podgląd kontekstu firmy (edycja tylko admin), widoki charakterystyczne per flow SM.
- **Social — posty** (`post_ideas`, `post_content`, `post_ideas_then_content`) oraz **rolki** (`reel_ideas`, `reel_script`, `reel_ideas_then_scripts`) na platformach: LinkedIn, Facebook, Instagram.
- **Content (BC) — podstawowa forma:** `page_copy` (full-auto) oraz `page_outline_then_copy` (outline → HITL → dokument) dla `contentKind`: `blog` \| `service_page` \| `landing`. Brief wejściowy stron (`ContentBrief`: temat, opcjonalnie kąt / Challenger, długość, odbiorca, cel) **nie** jest briefem SM (`SocialBrief` z liczbą pomysłów). Nadal bez łańcucha 6 specjalistów, WordPress i folderu materiałów jako produktu.
- Języki generowanych treści: **PL i EN**.
- Orchestracja agentów z deterministyczną dekompozycją tasków i szablonami promptów (osobny graf Social, osobny graf Content; klej composite w procesie api).
- Weryfikacja wygenerowanej treści względem kontekstu firmy.
- Persistence: **SQLite wyłącznie w MVP** (port/adapter Prisma) — **także** po dodaniu Content. **PostgreSQL** — obowiązkowe przejście w fazie **V1 — rozbudowa** (ops / skala; **nie** warunek dodania kanału Content). Cutover: nowa historia migracji Prisma + pusta baza (ew. osobny import danych) — `spec/SPEC-PERSISTENCE.md`.
- Logi runów: pełna czytelność przebiegu.
- Bramka kompletności kontekstu w DB (patrz niżej) — do spełnienia **każdy** `POST /runs` (Social i Content) jest zablokowany.
- **Fundament feedbacku (zapis):** tabela opinii tekstowych (aplikacja / agent / run), ocena gwiazdkowa runu (`1–5` albo `null`) oraz flaga edycji outputu — API + DB; kontrolki zapisu na dashboardzie przy majorze FE. **Pełne wprowadzenie** (panel administracyjny, analityka, stopień edycji) — faza **V1 — rozbudowa**. Szczegóły: `ux_dashboard.md`, `dokumentacja_komunikacji.md`.

### Bramka kompletności kontekstu firmy

Start runów (Social i Content) odblokowany dopiero gdy w DB uzupełnione są **wszystkie** sekcje:

| Sekcja | Minimalna treść |
|--------|-----------------|
| **Tożsamość** | Nazwa firmy + krótki opis / misja (1–3 zdania) |
| **Oferta** | ≥ 1 usługa/produkt: nazwa + korzyść biznesowa |
| **Głos SM** | Ton komunikacji (jak mówimy / jak nie mówimy) |
| **CTA / kanały** | ≥ 1 domyślne CTA lub kierunek (kontakt, link w bio, follow itd.) |
| **Odbiorca** | ≥ 1 profil grupy docelowej (stanowisko / branża / kontekst) |

Jakość merytoryczna treści kontekstu pozostaje po stronie użytkownika (admina); programowo egzekwowana jest kompletność wymaganych sekcji.

**Poza bramką MVP** (nie blokuje runów) — nazwane opcjonalne sekcje modelu `CompanyContextExtras` (`extras`):

| Sekcja | Kształt (skrót) |
|--------|-----------------|
| `caseStudies` | `{ title, summary, metrics? }[]` |
| `objections` | `{ label, response }[]` |
| `hashtags` | `string[]` |
| `catalogNotes` | wolny tekst / skrót katalogu (nie zastępuje `offer.items`) |
| `performanceNotes` | luźne notatki (nie pełny pack performance produktu) |

Programowo: walidacja **kształtu** przy zapisie (Zod `.strict()` na znanym obiekcie); **nie** kompletność. Puste / brak `extras` = OK (`null` albo omit). Świadome: jedna bramka na cały `POST /runs` (w tym głos SM dla page_*).

Zmiana względem: wcześniejsza luźna lista „case studies, obiekcje, katalog, performance, hashtagi” bez nazwanego modelu pól.

W zakresie MVP (Social / Content) kontrakt wyniku obejmuje także: sugerowane `cta` na pomyśle SM, `characterCount` na post content, opcjonalne `role` na sekcji outline; HITL Social dwuetapowy = **dokładnie jeden** wybór (`selectedIdeaId`).

### HITL vs full-auto

- **Task dwuetapowy** (np. post ideas → wybór → post content; reel ideas → wybór → scenariusz; outline strony → akceptacja → dokument): pauza **human-in-the-loop**. Social: dokładnie **jeden** `selectedIdeaId` z draftu; Content: `[outline.id]`.
- **Task jednoetapowy** (np. sama lista pomysłów, sam skrypt rolki, sam `page_copy`): **full-auto**, bez wymuszonego wyboru pośredniego.

## Kolejność budowy (order of attack)

Zakres produktowy MVP obejmuje auth i dashboard od początku koncepcji. Kolejność realizacji:

1. **api + gateway + oba pipeline’y (Social posty i rolki + Content podstawowa forma) + SQLite** — DoD pośredni: happy path weryfikowany Postmanem (pre-auth).
2. **Auth** (admin + użytkownicy).
3. **Fundament zapisu feedbacku** (opinie, ocena runu, flaga edycji) — API + DB; Postman bez UI.
4. **Web / dashboard** — domknięcie self-host UX (w tym kontrolki zapisu opinii / gwiazdek / Edytuj).

Sam wynik Postmana **nie** jest ostatecznym publicznym MVP. Bramka mapowania (oba zespoły agentów + klej na otwartym API) **nie** zastępuje publicznego MVP.

Zmiana względem „tylko pipeline SM przed auth”: w kroku (1) wchodzą **oba** kanały (rolki w Social + Content BC), nadal pre-auth / Postman. Dopisano fundament feedbacku **po auth, przed** dashboardem (wymaga `startedBy` / sesji; UI zostaje w majorze FE).

## Poza zakresem MVP (oraz później — V1 — rozbudowa / dalsze)

Zmiana względem: wcześniejsza lista „rolki, Web/blog, YouTube” jako poza MVP. Rolki i page copy (podstawowa forma) **są w MVP**. Poza MVP zostaje:

- Łańcuch specjalistów Content (psychologia / sprzedaż / SEO jako osobne węzły-audytory) — V1.
- YouTube ().
- Publikacja na API portali SM (już v2 w `spec/SPEC-RUNY.md`).
- WordPress.
- Osobny `LanguageQualityVerifier`.
- Self-register grafów; mikroserwisy domenowe.
- Multi-tenant SaaS / osobne konteksty firm per użytkownik.
- Pipeline builder / konfiguracyjne YAML-pipeline’y.
- Eksport kontekstu do `.md` + zgodność checksum jako wymóg pierwszego dowodu agentów (planowane **tuż po** MVP).
- **PostgreSQL w MVP** — świadomie nie; silnik MVP = SQLite (także z modelami reel/page). PostgreSQL = **V1 — rozbudowa** (ops / skala), nie warunek dodania Content.
- Cichy runtime-fallback kontekstu z plików przy niedostępnej lub niespójnej DB.
- Marketingowy traffic / „produkt dla agencji” jako cel MVP.
- Uznanie samego API bez auth i dashboardu za finalne MVP.
- Panel administracyjny opinii / średnich ocen / analityki feedbacku (V1 — rozbudowa).
- Stopień edycji outputu (diff / procent) — poza fundamentem flagi w MVP.
- Zmiana oceny gwiazdkowej po zatwierdzeniu / zamknięciu przeglądu runu.

## Główne założenia

1. **Jeden kontekst firmy na instancję** — narzędzie wewnętrzne jednej organizacji; wszyscy użytkownicy korzystają z tego samego kontekstu.
2. **DB kanoniczna** — w **MVP: SQLite** (w tym tabele reel i Content); w **V1 — rozbudowa: PostgreSQL** (obowiązkowy cutover ops/skala, niezależnie od tego, że Content jest w MVP). Pliki `.md` ewentualnie jako eksport/backup po MVP, bez cichego fallbacku runtime.
3. **Gateway jako granica LLM** — API nie woła vendorów modeli bezpośrednio.
4. **Backend-first w realizacji**, pełny zakres MVP w produkcie (oba pipeline’y + DB + auth + dashboard + gateway).
5. **Spójność treści i czytelność logów** są kryteriami akceptacji wyniku, nie opcją.
6. **Modularny monolit** w monorepo z port/adapter tam, gdzie ma sens (LLM, persistence); dwa BC grafu (Social, Content) spięte ręcznym klejem — self-register poza MVP. YouTube / audytorzy Content / publikacja — **V1 — rozbudowa**.

## Kryteria sukcesu MVP

- Administrator uzupełnia kontekst do stanu kompletnego; runy produktowe odblokowują się dopiero wtedy.
- Użytkownik (lub admin) przechodzi happy path postów: brief → post ideas → wybór **jednego** pomysłu (HITL) → post content dla wybranej platformy (LI / FB / IG) w PL lub EN; wynik zapisany w DB.
- Happy path rolek: `reel_ideas` full-auto **oraz** `reel_ideas_then_scripts` (HITL → scenariusz).
- Happy path Content: `page_copy` full-auto **oraz** `page_outline_then_copy` (HITL outline → dokument) dla wybranego `contentKind`.
- Wygenerowana treść jest **spójna z kontekstem firmy** (weryfikacja w pipeline).
- Logi runu są **w pełni czytelne** i pozwalają odtworzyć przebieg.
- Auth działa w formie docelowej; dashboard umożliwia pracę self-host bez obchodzenia API „na piechotę” jako jedynego UX.
- Integracja z gateway LLM działa end-to-end dla pipeline’u Social i Content.
- Fundament feedbacku: opinia tekstowa, ocena runu (`null` albo `1–5`) i flaga edycji outputu **zapisują się w DB** przez API (bez panelu analitycznego w MVP).

## Słownik skrótowy

| Pojęcie | Znaczenie |
|---------|-----------|
| Kontekst firmy | Kanoniczny zestaw informacji o organizacji w DB; wejście do weryfikacji i generowania |
| Post ideas / Post content | Pomysły i copy postów SM |
| Reel ideas / Reel script | Pomysły i scenariusz rolek |
| Page outline / Page document | Szkic i pełny dokument copy strony (`ContentKind`) |
| Content (BC) | Copy stron/long-form — nie nazwa produktu Content Chain |
| HITL | Pauza na wybór użytkownika, gdy kolejny krok zależy od selekcji z listy |
| Gateway | Osobna aplikacja pośrednicząca w wywołaniach LLM |
| Bramka kontekstu | Programowy warunek kompletności sekcji wymaganych przed **każdym** `POST /runs` |
| Opinia / ocena runu | Zapis feedbacku użytkownika: tekst (aplikacja, agent, run) oraz gwiazdki `1–5` \| `null` na zakończonym przebiegu; flaga edycji wyniku |

Szczegóły pojęć: `dictionary.md`. Brand types: `brand_types.md`. Komunikacja: `dokumentacja_komunikacji.md`. UI: `ux_dashboard.md`.
