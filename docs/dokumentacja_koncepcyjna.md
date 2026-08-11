# Dokumentacja koncepcyjna — Content Chain

## Cel produktu

**Content Chain** to publiczna, self-hostowalna aplikacja agentowa do generowania treści social media: od briefu, przez orchestrację agentów i weryfikację względem kontekstu firmy, po zapis wyników i obserwowalny przebieg runu.

Najważniejsza wartość:

- **Uruchamialny dowód** aplikacji opartej o agentów AI (nie sam opis procesu) — monorepo z frontendem, API oraz osobnym gateway LLM.
- **Realny use-case `ai-provider-gateway`** — Content Chain pokazuje praktyczne wykorzystanie gateway’a LLM z osobnego projektu (nie tylko izolowany dowód samego gateway’a).
- **Treść spójna z kontekstem firmy** — wspólny, kanoniczny kontekst w bazie; flow’y zablokowane do jego uzupełnienia; weryfikacja spójności przed uznaniem wyniku.
- **Obserwowalność** — logi runów w pełni czytelne, tak by dało się odtworzyć przebieg generowania i decyzji.
- **Self-host pod licencją MIT** — jedna instalacja = jedna firma = jeden wspólny kontekst; bez modelu multi-tenant SaaS.

Content Chain jest świadomie **ograniczony pierwszym slice’em Social** (post ideas + post content) — to MVP sprawdzające agentów, kontekst, persistence i UX self-host, nie pełny pakiet kanałów contentowych.

## Dla kogo jest system

| Segment | Potrzeba |
|---------|----------|
| **Administrator** | Bootstrap konta, zarządzanie użytkownikami, **wyłączna** edycja kontekstu firmy; może też generować treści jak zwykły użytkownik. |
| **Użytkownik** | Uruchamianie flow’ów SM na wspólnym kontekście firmy, przegląd wyników i logów; bez edycji kontekstu. |
| **Zespół wewnętrzny (self-host)** | Jedna firma / niewielki zespół: wspólny kontekst, generowanie SM bez multi-tenant SaaS. |
| **Operator self-host** | Wdrożenie we własnej infrastrukturze, konfiguracja gateway LLM, utrzymanie jednej instancji dla organizacji. |

## Zakres produktu (MVP)

- Monorepo trzech aplikacji: **web** (Next.js), **api** (NestJS + LangChain/LangGraph), **gateway** LLM (jedyna droga do vendorów modeli).
- **Auth** w formie docelowej: konto admina (bootstrap) + konta użytkowników.
- **Dashboard**: uzupełnianie / podgląd kontekstu firmy (edycja tylko admin), widoki charakterystyczne per flow SM.
- **Social — post ideas** oraz **Social — post content** na platformach: LinkedIn, Facebook, Instagram.
- Języki generowanych treści: **PL i EN**.
- Orchestracja agentów z deterministyczną dekompozycją tasków i szablonami promptów.
- Weryfikacja wygenerowanej treści względem kontekstu firmy.
- Persistence: **SQLite wyłącznie w MVP** (port/adapter Prisma). **PostgreSQL** — obowiązkowe przejście w fazie **V1 — rozbudowa** (kolejne workflowy poza pierwszym slice Social); nie jest silnikiem MVP. Cutover: nowa historia migracji Prisma + pusta baza (ew. osobny import danych) — `spec/SPEC-PERSISTENCE.md`.
- Logi runów: pełna czytelność przebiegu.
- Bramka kompletności kontekstu w DB (patrz niżej) — do spełnienia warunki flow’y SM są zablokowane.

### Bramka kompletności kontekstu firmy

Flow’y SM odblokowane dopiero gdy w DB uzupełnione są **wszystkie** sekcje:

| Sekcja | Minimalna treść |
|--------|-----------------|
| **Tożsamość** | Nazwa firmy + krótki opis / misja (1–3 zdania) |
| **Oferta** | ≥ 1 usługa/produkt: nazwa + korzyść biznesowa |
| **Głos SM** | Ton komunikacji (jak mówimy / jak nie mówimy) |
| **CTA / kanały** | ≥ 1 domyślne CTA lub kierunek (kontakt, link w bio, follow itd.) |
| **Odbiorca** | ≥ 1 profil grupy docelowej (stanowisko / branża / kontekst) |

Jakość merytoryczna treści kontekstu pozostaje po stronie użytkownika (admina); programowo egzekwowana jest kompletność wymaganych sekcji.

**Poza bramką MVP** (nie blokuje flow’ów): case studies, obiekcje, pełny katalog usług, dane performance, zestawy hashtagów.

### HITL vs full-auto

- **Task dwuetapowy** (np. brief → post ideas → wybór → post content): pauza **human-in-the-loop** przy wyborze z listy pomysłów.
- **Task jednoetapowy** (np. „zaproponuj 5 pomysłów na posty”): **full-auto**, bez wymuszonego wyboru pośredniego.

## Kolejność budowy (order of attack)

Zakres produktowy MVP obejmuje auth i dashboard od początku koncepcji. Kolejność realizacji:

1. **api + gateway + pipeline SM + SQLite** — DoD pośredni: happy path weryfikowany Postmanem.
2. **Auth** (admin + użytkownicy).
3. **Web / dashboard** — domknięcie self-host UX.

Sam wynik Postmana **nie** jest ostatecznym publicznym MVP.

## Poza zakresem MVP (oraz później — V1 — rozbudowa / dalsze)

- Rolki (reel ideas / scripts), Web/blog, YouTube.
- Multi-tenant SaaS / osobne konteksty firm per użytkownik.
- Pipeline builder / konfiguracyjne YAML-pipeline’y.
- Eksport kontekstu do `.md` + zgodność checksum jako wymóg pierwszego dowodu agentów (planowane **tuż po** MVP).
- **PostgreSQL w MVP** — świadomie nie; silnik MVP = SQLite. PostgreSQL = **V1 — rozbudowa** (kolejne workflowy), nie „opcjonalny gdy zechcemy”.
- Cichy runtime-fallback kontekstu z plików przy niedostępnej lub niespójnej DB.
- Marketingowy traffic / „produkt dla agencji” jako cel MVP.
- Uznanie samego API bez auth i dashboardu za finalne MVP.

## Główne założenia

1. **Jeden kontekst firmy na instancję** — narzędzie wewnętrzne jednej organizacji; wszyscy użytkownicy korzystają z tego samego kontekstu.
2. **DB kanoniczna** — w **MVP: SQLite**; w **V1 — rozbudowa: PostgreSQL** (obowiązkowy cutover). Pliki `.md` ewentualnie jako eksport/backup po MVP, bez cichego fallbacku runtime.
3. **Gateway jako granica LLM** — API nie woła vendorów modeli bezpośrednio.
4. **Backend-first w realizacji**, pełny zakres MVP w produkcie (pipeline + DB + auth + dashboard + gateway).
5. **Spójność treści i czytelność logów** są kryteriami akceptacji wyniku, nie opcją.
6. **Modularny monolit** w monorepo z port/adapter tam, gdzie ma sens (LLM, persistence); rozszerzalność o kolejnych agentów — **V1 — rozbudowa** / później (poza MVP).

## Kryteria sukcesu MVP

- Administrator uzupełnia kontekst do stanu kompletnego; flow’y SM odblokowują się dopiero wtedy.
- Użytkownik (lub admin) przechodzi happy path: brief → post ideas → wybór (HITL) → post content dla wybranej platformy (LI / FB / IG) w PL lub EN; wynik zapisany w DB.
- Wygenerowana treść jest **spójna z kontekstem firmy** (weryfikacja w pipeline).
- Logi runu są **w pełni czytelne** i pozwalają odtworzyć przebieg.
- Auth działa w formie docelowej; dashboard umożliwia pracę self-host bez obchodzenia API „na piechotę” jako jedynego UX.
- Integracja z gateway LLM działa end-to-end dla pipeline’u SM.

## Słownik skrótowy

| Pojęcie | Znaczenie |
|---------|-----------|
| Kontekst firmy | Kanoniczny zestaw informacji o organizacji w DB; wejście do weryfikacji i generowania |
| Post ideas | Lista pomysłów na posty SM (task / etap pipeline’u) |
| Post content | Gotowe copy posta (hook, body, CTA itd.) |
| HITL | Pauza na wybór użytkownika, gdy kolejny krok zależy od selekcji z listy |
| Gateway | Osobna aplikacja pośrednicząca w wywołaniach LLM |
| Bramka kontekstu | Programowy warunek kompletności sekcji wymaganych przed startem flow’ów |

Szczegóły pojęć: `dictionary.md`. Brand types: `brand_types.md`. Komunikacja: `dokumentacja_komunikacji.md`. UI: `ux_dashboard.md`.
