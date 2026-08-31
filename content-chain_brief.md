# Content Chain — publiczny self-host dowód aplikacji agentowej do Social Media

> **Nota (2026-08-31):** zakres kanałów MVP/V1 z tego briefu jest **nadpisany** przez `docs/dokumentacja_koncepcyjna.md` (legalizacja). MVP obejmuje posty **i** rolki oraz Content (BC) w podstawowej formie; V1 = PostgreSQL + panel opinii + publikacja portali + audytorzy Content + YouTube — nie „kolejne workflowy”. Historia ustaleń poniżej zostaje jako zapis rozmowy; przy konflikcie kanałów wygrywa docs.

- Data: 2026-08-10
- Projekt: content-chain
- Kategoria: greenfield
- Priority signal: high — cel portfolio / publiczne repo + licencja self-host wymaga czytelnego, uruchamialnego systemu, nie tylko notatek
- Risk signal: medium — ryzyko rozrostu (auth, UI, kontekst, gateway, agenci) przed pierwszym zielonym dowodem pipeline’u SM; mitygacja: backend-first + Postman przed domknięciem auth/UI
- Routing: Next: create-project-docs

## Problem

Potrzebny jest publiczny, uruchamialny projekt, który pokazuje umiejętność zbudowania aplikacji opartej o agentów AI do generowania treści social media (z briefu, z weryfikacją względem kontekstu firmy, zapisem wyników i obserwowalnością). Repo nie będzie prywatne; licencja ma pozwalać na uruchomienie we własnej infrastrukturze. Bez aplikacji zostaje tylko ręczna praca w IDE — bez dowodu stacku, orchestracji ani integracji z warstwą LLM.

## Uzgodniony kierunek

Budujemy greenfield w monorepo: frontend (Next.js), backend API (NestJS + LangChain/LangGraph) oraz osobna aplikacja gateway LLM (instancja dostosowana pod ten projekt; API nie woła vendorów LLM bezpośrednio). Pierwszy slice produktowy to Social: **post ideas** i **post content**, jako prosty MVP sprawdzający: działanie agentów, zgodność treści z kontekstem firmy, zapis do DB, poprawność logów. **Zakres MVP** obejmuje auth (admin + użytkownicy, forma docelowa) oraz dashboard — bez odkładania ich poza v1. **Kolejność budowy** jest backend-first: najpierw api + gateway + pipeline SM + persistence (weryfikacja Postman), potem auth, na końcu web domykający UX self-host. Kontekst firmy jest globalny dla całej instancji (narzędzie wewnętrzne jednej firmy); do jego uzupełnienia flow’y są zablokowane. Dashboard uzupełnia kontekst; DB jest kanoniczna (domyślnie SQLite); eksport `.md` i twarda zgodność checksum — tuż po MVP. HITL tylko gdy kolejny krok wymaga wyboru z listy; samodzielne taski — full-auto. Odrzucono: zostawanie przy samym manualnym workflow w IDE (brak publicznego dowodu) oraz **zostawanie przy samym API/Postmanie jako ostatecznym MVP** (brak dowodu self-host UX); odrzucono też wycięcie auth z zakresu v1 (dług koncepcyjny przy publicznym self-host).

## Alternatywy rozważone

- Zostać przy manualnym workflow w Cursorze / plikach — niski koszt, zero dowodu orchestracji, self-host i gateway jako produkt — odrzucone względem celu portfolio/publicznego repo
- Wąskie API bez UI dashboardu jako **docelowe MVP** — szybszy start techniczny, słabszy dowód end-to-end i self-host UX — odrzucone jako główna ścieżka; **tymczasowy** dowód Postman w trakcie budowy backendu jest OK i zamierzony
- Pełny zestaw kanałów (Web, YouTube, rolki) w pierwszym slice — zbyt szeroki bundle względem celu MVP — odłożone
- Postgres (lub inny silnik) jako wymóg MVP zamiast SQLite — zbędna złożoność operacyjna przy single-instance self-host — odłożone jako opcjonalny adapter
- Nie budować — brak artefaktu do CV/GitHub i self-host; przegrywa przy deklarowanym celu pokazu umiejętności

## Kierunki architektoniczne (jeśli uzgodnione)

Modularny monolit od startu (trzy aplikacje w monorepo: web, api, gateway), z elementami port/adapter tam, gdzie ma sens (m.in. dostęp do LLM przez gateway; persistence: port + adapter SQLite najpierw, opcjonalnie później adapter PostgreSQL). Jedna instalacja = jedna firma = jeden wspólny kontekst. Projekt ma być rozszerzalny o kolejnych agentów w przyszłości (np. poczta, dokumenty) — poza MVP. Pipeline’y SM: deterministyczna dekompozycja tasków + szablony promptów; pauza human-in-the-loop tylko przy zależności selection. DB kanoniczna dla kontekstu firmy (MVP: SQLite); pliki `.md` jako deterministyczny eksport/backup (po MVP), bez cichego runtime-fallbacku przy rozjeździe.

## Resolved unknowns

| Pytanie | Odpowiedź (z rozmowy) |
|---------|------------------------|
| Po co projekt / widoczność? | Pokaz umiejętności; publiczne GitHub; licencja pozwala na self-host we własnej infrastrukturze |
| Pierwszy kanał / slice? | Social; MVP = post ideas + post content (nie rolki); cel = weryfikacja agentów, kontekstu, DB, logów |
| Kontekst firmy? | Globalny dla całej aplikacji; każdy agent ma do niego dostęp przy weryfikacji; uzupełniany przez użytkownika w dashboardzie; do uzupełnienia — opcje/flow zablokowane |
| Bramka kontekstu? | Odpowiedzialność merytoryczna po stronie użytkownika; programowo: kompletność w DB; eksport `.md` + zgodność checksum — tuż po MVP (nie w pierwszym dowodzie agentów) |
| DB vs `.md`? | DB kanoniczna; `.md` = eksport/backup; rozjazd → fail / przebudowa, bez cichego fallbacku runtime |
| Silnik DB w MVP? | SQLite jako domyślny persistence self-host; PostgreSQL = opcjonalny drugi adapter (port/adapter), nie wymóg v1 |
| Auth w v1? | W zakresie MVP: konto admina (bootstrap) + konta użytkowników w formie docelowej; w kolejności prac — po zielonym pipeline z zapisem (nie przed pierwszym dowodem agentów) |
| Kolejność budowy vs zakres MVP? | Zakres MVP bez zmian (pipeline + DB + auth + dashboard + gateway). Order of attack: api/gateway/pipeline/SQLite (Postman) → auth → web. Postman = dowód pośredni, nie zastępstwo MVP |
| Tenancy? | Jeden wspólny kontekst firmy na instancję; użytkownicy = jedna firma (narzędzie wewnętrzne / self-host), nie multi-tenant SaaS |
| HITL? | Pauza tylko gdy następny krok wymaga wyboru z listy; samodzielne taski — full-auto |
| Styl architektury? | Modularny monolit + port/adapter gdzie sens (LLM gateway, persistence); skalowalność pod przyszłych agentów |
| UI? | Dashboard z zakładkami / widokami charakterystycznymi per flow (kierunek UX; szczegóły w docs); w zakresie MVP, po stabilnym API |

## Non-goals

- Multi-tenant SaaS / osobne konteksty firm per użytkownik
- Pipeline builder / konfiguracyjne YAML-pipeline’y w MVP
- Web/blog i YouTube w pierwszym slice
- Rolki (reel ideas/scripts) w MVP
- Cichy runtime-fallback kontekstu z `.md` przy niedostępnej lub niespójnej DB
- Eksport `.md` / checksum jako wymóg pierwszego dowodu agentów (świadomie: tuż potem)
- PostgreSQL (lub inny silnik serwerowy) jako wymóg MVP
- Marketingowy traffic / „produkt dla agencji” jako cel v1
- Wzmianki w briefie o źródłach legacy lub konkretnych firmach zewnętrznych
- Uznanie samego API/Postmana (bez auth i dashboardu) za ostateczne publiczne MVP

## Pierwszy slice (jeśli bundle)

**Zakres MVP (produkt):** auth (admin + users), dashboard kontekstu firmy + brama na DB, Social post ideas/content, orchestracja agentów, weryfikacja względem kontekstu, zapis do DB (SQLite), logi, integracja z gateway LLM, szkielet monorepo (web + api + gateway).

**Kolejność budowy (order of attack):** (1) api + gateway + pipeline SM + adapter SQLite — DoD pośredni: happy path w Postmanie; (2) auth; (3) web/dashboard domykający self-host UX.

**Tuż potem:** deterministyczny eksport kontekstu do `.md` + gate zgodności checksum; opcjonalnie adapter PostgreSQL gdy pojawi się potrzeba deploymentu.

**Później (osobno):** rolki SM, YouTube, Web/blog, kolejni agenci (poczta, dokumenty), rozbudowa Knowledge UI.

## Affected areas (jeśli znane)

- greenfield — `docs/` i `spec/` puste; brak major/feature plan
- root: powstanie dokumentacja po `create-project-docs`; aplikacje jeszcze niezafektowane kodem w tej sesji
