---
wersja: 39
data_utworzenia: 2026-08-11
data_modyfikacji: 2026-10-22
---

# SPEC — README

## Docs vs SPEC

| Warstwa | Rola |
|---------|------|
| **`docs/`** | Wspólne rozumienie systemu: koncepcja, architektura, kontrakty I/O, przepływy, deploy, UX — *dlaczego tak / jak system jest pomyślany*. |
| **`spec/SPEC-*.md`** | Norma przy pisaniu kodu w obszarze: wzorce, wolno/nie wolno, zatwierdzony stack, wymagania i kryteria — *co obowiązuje przy implementacji*. |

SPEC **uszczegóławia** docs; nie zastępuje ich i nie tworzy równoległej dokumentacji koncepcyjnej. Przy konflikcie: najpierw uzgodnić prawdę w docs, potem zaktualizować SPEC (z jawnym odniesieniem do zmiany normy).

## Jak czytać

1. Orientacja produktowa: `docs/README.md` → `docs/dokumentacja_koncepcyjna.md` → `docs/architektura.md`.
2. Kontrakt I/O: `docs/dokumentacja_komunikacji.md`.
3. Przed implementacją obszaru: odpowiadający plik `SPEC-*.md` poniżej.
4. Metadane każdego SPEC: YAML `wersja`, `data_utworzenia`, `data_modyfikacji` na początku pliku.

## Mapa obszar → plik

| Plik | Obszar |
|------|--------|
| `SPEC-MONOREPO.md` | Granice apps/*, `packages/shared`, pnpm, importy; **M-9** build obrazów = kontekst **root** + **pnpm** |
| `SPEC-KOMUNIKACJA.md` | HTTP/SSE api + klient → gateway; snapshot TTL; publiczne auth: register / activate / resend; **activate: envelope niezależny od `user_welcome` (bez `MAIL_DELIVERY_FAILED` na welcome)**; **`GET /config`**; **`GET /health` + `/health/ready`**; lista user; **`GET /runs/summary` (K-2k — KPI 30d, TTL 60 s)**; **Users DELETE + `purge`**; **`GUEST_HAS_ACTIVE_RUN`**; cancel authz admin→guest; **`startedBy.role` na detail**; **guest: detail/logs cudzy tylko archiwum**; **`brief.audience?` — omit / name / custom** |
| `SPEC-AUTH.md` | Auth, cookie `cc_access`/`cc_refresh`, role `admin`\|`user`\|**`guest`**; **otwarta rejestracja** i **accept-invite** (rola vs `DEMO_MODE`) + aktywacja e-mail; **`user_welcome` po sukcesie activate (best-effort; PL; CID; odbiorcy `user`\|`guest`)**; GuestGuard; **DELETE Users wg roli** (soft `user` / hard+purge `guest`); **A-10a tylko `user` (z UI)**; **A-3c `isActive`/brak User na access**; **guest: podgląd archiwum cudzego (detail/logs)**; **maile transakcyjne: szablony HTML + plain text + wspólny shell w `infrastructure/mail/` (kinds `user_invited`\|`user_activation`\|`user_welcome`; PL; **header HTML = logotyp CID** wizualnie = FE `content-chain-logo-transparent.png`; plain text = string marki; zakaz React Email / FE; invite/activation: `validityLabel` = pełne „Link jest jednorazowy i wygasa po {X}.” (miejscownik); token tylko w URL)** |
| `SPEC-KONTEKST-FIRMY.md` | Company context, bramka kompletności (`isComplete` **bez** sieci / gateway); **AudienceProfile `name` + `description`**; unikalność `name`; GET dla guest; zapis tylko admin |
| `SPEC-SOCIAL.md` | Pipeline Social (posty **i** rolki), LangGraph, HITL model B; **effective audience scoping (S-10)** |
| `SPEC-CONTENT.md` | Pipeline Content (page copy / outline), LangGraph, HITL model B; **effective audience scoping (Ctn-12)** |
| `SPEC-RUNY.md` | Cykl życia runu (`completed` / `failed` / **`cancelled`**), logi, SSE, kolejka, recovery, anulowanie (R-11 — **admin→guest**), **`startedBy.role` na detail**, **przegląd z `REVIEW_TTL` / sweeper auto-finalize (R-10)**, **GuestRunPolicy (R-12)**, **agregacja KPI R-13 (`GET /runs/summary`)** — w tym **guest detail/logs cudzy tylko przy statusie archiwalnym** + Redis **`REDIS_HOST`/`REDIS_PORT`/`REDIS_PASSWORD`**, ocena / edycja outputu, composite executor, unia `SocialBrief` / `ContentBrief` na `RunRecord` (**`brief.audience?` — 3 tryby**); R-3c pełna lista HTTP |
| `SPEC-FEEDBACK.md` | Opinie tekstowe (zapis MVP; panel odczytu = V1; okno `cancelled`+wynik; **nie** blokowane TTL przeglądu; guest: application/agent + run własny; **Fbk-9 wyjątek append-only przy hard guest**) |
| `SPEC-PERSISTENCE.md` | Prisma; SQLite w MVP; PostgreSQL od V1 — rozbudowa; **P-6a** prod: volume `api-sqlite` → `/app/data/chain.db`; pola Run `cancelledAt` / `cancelRequested` / **`pipelineFinishedAt`** (+ indeks sweepera, backfill B); **`User.verifiedAt`** + **`AccountActivation`**; `User.role` String (`guest`); **D21 soft vs hard/purge tree** |
| `SPEC-FRONTEND.md` | Next.js; **drzewo `app/` + `modules/`** (`auth`, **`landing`**, `shell`, `company-context`, `runs`, `users`, `feedback`, `demo`, `health`, `notifications` — **bez** `modules/social`\|`content`); shadcn, SSE UI, Stop + modal (**admin→guest na detail**), archiwum z `cancelled`, disable przeglądu po `reviewExpiresAt`; **`/` = landing + modal auth** (`login` \| `register` \| `bootstrap_admin`); CTA chrome „Zaloguj się” / „Załóż konto”; **sticky chrome brand = logotyp PNG** (`content-chain-logo-transparent` / `next/image`; **nie** sam tekst); **logo-area sidebara** (desktop + mobile sheet) = **ten sam** asset / `next/image` (skala w `h-14`; bez linku — F-14); **closing = jeden CTA „Sprawdzam!” → register** (`Button` `default`; chrome para **bez zmian**); **„Zarejestruj admina” tylko na register** gdy `available`; **thank-you fullscreen w szablonie landingu**; activate: toast bez auto-modala / błąd → auto-open login; **F-6 `agentsActive`**; **F-10 DEMO chip / locki guest + nawigacja archiwum cudzego (read-only)**; **F-11…F-19 normy wizualne** (tokeny, badge, hero, **dark shell** sidebar+main, **F-15 landing** (nie split-panel; sticky chrome = logotyp PNG; IA: **„Dla kogo” / audience przed sekcją wartości**, kotwica chrome/footer; **closing „Sprawdzam!”**), KPI, lifting; **typografia F-11: Space Grotesk + Inter `--font-secondary` + Geist Mono**; **F-14 stany pozycji menu** normal/hover/active — teal wash + ring + rail, **bez** solid `bg-primary` na active; desktop + mobile sheet; **F-14 CTA-only: chrome primary indigo/violet ≠ `Button` `default` gradient teal + ciemny tekst**); **viewport shell** + **paginacja UI Moje runy (10)**; **F-8** Users toggle/Usuń/purge + **`CompletenessChipSlot` także w mobile sheet przed „Wyloguj się”** (ten sam slot co desktop `AppSidebar`; bez wyjątku „tylko `lg+`”); **Odbiorca: Nazwa**; **Grupa = select (3 tryby)**; **F-2** prod BFF `API_BASE_URL=http://api:3001`, port UI **3004** |
| `SPEC-TESTY.md` | Jest, supertest, piramida, DoD (w tym D-30…D-34 cancel, **D-35…D-40 TTL / sweeper**, **D-41…D-46 register / activate / resend** — activate **bez** wymogu SMTP welcome, **D-47…D-49 health/ready**, **D-50…D-62 guest / DEMO** — **D-55: cudzy detail/logs terminalny → 200**, **D-63…D-72 Users delete/purge / cancel admin→guest / isActive**, **D-73…D-77 audience name / scoping**, **D-78…D-81 summary KPI**); HTML/CID/copy maili **nie** zmienia D-* HTTP (unit renderer poza T-5: pełne zdanie ważności + deep link; **logotyp CID w headerze HTML** vs string marki w plain text; **bez** linii Postman w body) |
| `SPEC-BEZPIECZENSTWO.md` | Env, ekspozycja, Helmet, CORS, metrics/logi bez sekretów; **Compose-first**: publish **`127.0.0.1`**, root `.env` z Vault, Redis **external** (nie compose); anti-enum (409 register / stały resend / wspólny 401 login w tym guest przy demo off); GuestGuard; Redis fail modes + połączenie **`REDIS_HOST`/`REDIS_PORT`/`REDIS_PASSWORD`** (bez `REDIS_URL`); publiczny health **i** ready bez wycieku `GATEWAY_KEY`; **B-12 Users/cancel/sesja/Redis ratings SCAN** |

## Terminologia faz (skrót)

| Faza | Znaczenie |
|------|-----------|
| **MVP** | Pierwszy slice: Social (posty i rolki) + Content (BC, podstawowa forma) + auth (invite **oraz** self-register + aktywacja w prod) + dashboard + gateway + **fundament zapisu feedbacku**; silnik DB = **SQLite**; w kontrakcie slice’u także typowane `extras` + HITL Social dwuetapowy (min. 1 unikalne id ⊆ draftu, N→N) + pola wyniku SM (`contents[]` / `reelScripts[]`, `sourceIdeaId`) + `role` outline (nie V1) |
| **V1 — rozbudowa** | Po MVP: PostgreSQL (ops/skala) + panel odczytu opinii + publikacja portali SM + audytorzy Content + YouTube. **Nie** „kolejne workflowy / rolki / blog” |
| **`/api/v1`** | Prefiks HTTP API — **nie** to samo co „V1 — rozbudowa” |

Zmiana względem wersji 5: dopisano kontrakt extras / HITL SM 1 id / pola SM / role outline jako część MVP (nie V1).
Zmiana względem wersji 6: „HITL SM 1 id” unieważnione — kanon slice’u = K z N Social (`contents[]` / `reelScripts[]`); Content nadal `[outline.id]`.
Zmiana względem wersji 7: mapa obszarów bez `cancelled` / Stop. Od tej wersji indeks wskazuje anulowanie w RUNY / FEEDBACK / FRONTEND / PERSISTENCE / TESTY.
Zmiana względem wersji 8: mapa bez TTL przeglądu. Od tej wersji indeks wskazuje `REVIEW_TTL` / sweeper / D-35+ w RUNY / KOMUNIKACJA / PERSISTENCE / FRONTEND / TESTY.
Zmiana względem wersji 9: mapa bez otwartej rejestracji. Od tej wersji AUTH / KOMUNIKACJA / FRONTEND / PERSISTENCE / TESTY / BEZPIECZENSTWO wskazują register + aktywację e-mail.
Zmiana względem wersji 11: mapa bez `agentsActive` / api `/health/ready`. Od tej wersji FRONTEND F-6, KOMUNIKACJA K-10, BEZPIECZENSTWO B-7, KONTEKST (granica `isComplete`), TESTY D-47…D-49.
Zmiana względem wersji 12: mapa bez DEMO/`guest`. Od tej wersji AUTH A-11 refaktor, RUNY R-12, FRONTEND F-10, TESTY D-50…D-62.
Zmiana względem wersji 13: Redis guest bez nazw env w indeksie. Od tej wersji BEZPIECZENSTWO / RUNY / TESTY / KOMUNIKACJA wskazują **`REDIS_HOST`+`REDIS_PORT`(+`REDIS_PASSWORD`)**; bez `REDIS_URL`.
Zmiana względem wersji 14: mapa bez viewport shell / paginacji UI Moje runy. Od tej wersji FRONTEND / KOMUNIKACJA / RUNY wskazują shell `h-dvh` + paginację UI 10 przy pełnej liście HTTP R-3c.
Zmiana względem wersji 15 / AUTH: „rola vs `DEMO_MODE`” tylko przy register. Od tej wersji obejmuje **register i accept-invite**.
Zmiana względem wersji 16: mapa bez Users DELETE/purge / cancel admin→guest / isActive / Fbk-9 / D-63+. Od tej wersji AUTH A-10/A-10a/A-3c, RUNY R-11, KOMUNIKACJA K-2j/`GUEST_HAS_ACTIVE_RUN`, FRONTEND F-8/F-5b, TESTY D-63…D-72, BEZPIECZENSTWO B-12 — `users-management-plan.md` Faza 2.
Zmiana względem wersji 17: mapa bez kontraktu Compose-first. Od tej wersji BEZPIECZENSTWO (B-2/B-6/B-11 + Deploy), FRONTEND F-2, MONOREPO M-9, PERSISTENCE P-6a — bind localhost, root `.env`, volume SQLite, external Redis, build root+pnpm (`docs/deployment.md`, plan naprawy deployu Faza 1).
Zmiana względem wersji 18 / FRONTEND w mapie: indeks bez jawnego „register zawsze + opcjonalny bootstrap CTA”. Od tej wersji mapa wskazuje F-4a / F-8 po unieważnieniu XOR register↔admin (`SPEC-FRONTEND.md`, `docs/ux_dashboard.md`).
Zmiana względem wersji 19: mapa bez audience `name` / scopingu grupy przy runie. Od tej wersji KONTEKST-FIRMY, KOMUNIKACJA/RUNY, SOCIAL/CONTENT (S-10 / Ctn-12), FRONTEND (Nazwa + select Grupa), TESTY D-73…D-77 — `company-context-run-contract-refactor-plan.md` Faza 2.
Zmiana względem wersji 20: mapa obiecywała *„cudzy detail zawsze 403”* dla guest (F-10 / D-55). Od tej wersji RUNY R-12 / KOMUNIKACJA K-2c / AUTH / FRONTEND F-10 / TESTY D-55 — wyjątek archiwum (detail+logs terminalne) — `guest-view-others-runs-plan.md`.
Zmiana względem wersji 21: mapa bez F-11…F-19 / summary KPI. Od tej wersji FRONTEND F-11…F-19, KOMUNIKACJA K-2k, RUNY R-13.
Zmiana względem wersji 23 / mapa FRONTEND: *ciemny sidebar* w skrócie F-11…F-19. Od tej wersji indeks: **dark shell** (sidebar + main) — `SPEC-FRONTEND.md` F-14, `docs/ux_dashboard.md`.
Zmiana względem wersji 24 / mapa FRONTEND: F-11…F-19 bez pinu fontów. Od tej wersji indeks: **typografia F-11** (Space Grotesk + Inter `--font-secondary` + Geist Mono) — `SPEC-FRONTEND.md`, `docs/ux_dashboard.md`.
Zmiana względem wersji 25 / mapa FRONTEND: F-11…F-19 bez rozróżnienia filled CTA vs chrome primary. Od tej wersji indeks: **F-14 CTA-only** (chrome indigo/violet ≠ `Button` `default` gradient teal + ciemny tekst) — `SPEC-FRONTEND.md`, `docs/ux_dashboard.md`.
Zmiana względem wersji 26 / mapa FRONTEND: F-14 bez osobnych stanów pozycji menu (active = solid `bg-primary`). Od tej wersji indeks: **F-14 stany pozycji menu** (normal / hover / active / active+hover — teal wash + ring + rail; bez solid indigo fill na active; desktop + mobile sheet) — `SPEC-FRONTEND.md` F-14, `docs/ux_dashboard.md` („Sidebar — logo i stany pozycji menu”).
Zmiana względem wersji 27 / mapa FRONTEND: F-8 bez jawnego montażu `CompletenessChipSlot` w mobile sheet. Od tej wersji indeks: **F-8** — ten sam slot (Demo + Completeness) także w mobile sheet **przed** „Wyloguj się”; semantyka chipów bez redefinicji — `SPEC-FRONTEND.md` F-8, `docs/ux_dashboard.md`.
Zmiana względem wersji 28 / mapa FRONTEND: indeks reklamował *karta logowania + opcjonalne „Zarejestruj admina”* oraz *split-panel*. Od tej wersji: **landing + modal auth**; bootstrap CTA **tylko** na register; F-15 = landing — `SPEC-FRONTEND.md`, `docs/ux_dashboard.md` (landing-legalization Faza 2).
Zmiana względem wersji 29 / mapa FRONTEND: F-15 w indeksie bez sekcji audience. Od tej wersji: **F-15 landing IA obejmuje „Dla kogo” (audience) przed sekcją wartości** (+ kotwica chrome/footer) — `SPEC-FRONTEND.md`, `docs/ux_dashboard.md` (landing-dla-kogo Faza 2).
Zmiana względem wersji 30 / mapa FRONTEND: F-15 w indeksie bez jawnego CTA closing (milczenie / domysł pary jak chrome). Od tej wersji: **closing = jeden CTA „Sprawdzam!” → register** (`Button` `default`); chrome para CTA **bez zmian** — `SPEC-FRONTEND.md` F-15, `docs/ux_dashboard.md` (landing-closing-cta Faza 2).
Zmiana względem wersji 31 / mapa FRONTEND: indeks bez pinu aktualnego drzewa `modules/` (landing vs auth; brak social/content na FE). Od tej wersji mapa wskazuje kanon katalogów z `SPEC-FRONTEND.md` / `docs/architektura_katalogi_pliki.md`.
Zmiana względem wersji 32 / mapa AUTH + TESTY: indeks bez szablonów HTML maili. Od wersji 33: **AUTH**: HTML + plain text + wspólny shell w `infrastructure/mail/` (PL; zakaz React Email / FE); **TESTY**: HTML nie zmienia D-* HTTP — `SPEC-AUTH.md`, `SPEC-TESTY.md`.
Zmiana względem wersji 33 / mapa AUTH + KOMUNIKACJA + TESTY: indeks bez `user_welcome`. Od tej wersji **AUTH**: kind `user_welcome` po sukcesie activate (best-effort; PL; CID; `user`\|`guest`); **KOMUNIKACJA**: envelope activate niezależny od SMTP welcome; **TESTY**: D-41/D-45 bez wymogu dostawy welcome — `SPEC-AUTH.md`, `SPEC-KOMUNIKACJA.md`, `SPEC-TESTY.md`.
Zmiana względem wersji 34 / mapa AUTH + TESTY: indeks bez copy ważności / URL-only raw. Od wersji 35 **AUTH**: ważność z TTL env (`validityLabel`); token tylko w URL; **TESTY**: unit renderer (ważność + deep link; bez linii Postman) — `SPEC-AUTH.md`, `SPEC-TESTY.md`.
Zmiana względem wersji 35 / mapa AUTH + TESTY: indeks z kanonem Fazy 25.5 („Link wygasa po …” / fragment czasu). Od tej wersji **AUTH**: `validityLabel` = pełne „Link jest jednorazowy i wygasa po {X}.” (miejscownik); **TESTY**: unit renderer asertuje pełny wzorzec — `SPEC-AUTH.md`, `SPEC-TESTY.md`.
Zmiana względem wersji 36 / mapa FRONTEND: F-15 w indeksie reklamował brand landingu / sticky chrome wyłącznie jako tekst chrome (bez pinu assetu). Od tej wersji: **sticky chrome brand = logotyp PNG** (`content-chain-logo-transparent` / `next/image`; nie sam tekst) — `SPEC-FRONTEND.md` F-15, `docs/ux_dashboard.md` (landing-logo Faza 2).
Zmiana względem wersji 37 / mapa FRONTEND: indeks sugerował logotyp PNG **wyłącznie** sticky chrome landingu. Od tej wersji: **logo-area sidebara** (desktop + mobile sheet) = ten sam asset / `next/image` (skala w `h-14`; bez linku) — `SPEC-FRONTEND.md` F-14, `docs/ux_dashboard.md` (v40).
Zmiana względem wersji 38 / mapa AUTH + TESTY: indeks sugerował brand shella maili HTML jako layout bez pinu logotypu (tekstowy wordmark Fazy 25). Od tej wersji **AUTH**: header shella HTML = **logotyp CID** (ten sam wizualnie co FE public PNG); **TESTY**: unit renderer rozróżnia logo CID w HTML vs string marki w plain text — `SPEC-AUTH.md`, `SPEC-TESTY.md`, `docs/brand_types.md`.

Szczegóły: `docs/dictionary.md`, `SPEC-PERSISTENCE.md`.

## Źródła

- Katalog dokumentacji: `docs/`
- Brief wejściowy sesji: `content-chain_brief.md` (kontekst, nie norma kodu)
- Ten plik: spis i sposób czytania — bez wymagań implementacyjnych obszaru
