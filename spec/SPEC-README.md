---
wersja: 16
data_utworzenia: 2026-08-11
data_modyfikacji: 2026-10-06
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
| `SPEC-MONOREPO.md` | Granice apps/*, `packages/shared`, pnpm, importy |
| `SPEC-KOMUNIKACJA.md` | HTTP/SSE api + klient → gateway; snapshot TTL (`pipelineFinishedAt` / `reviewExpiresAt`); publiczne auth: register / activate / resend; **`GET /config`** (`demoMode`); **`GET /health` + `/health/ready`** (probe liveness gateway); lista user **bez** pageSize HTTP (paginacja UI Moje runy = FE) |
| `SPEC-AUTH.md` | Auth, cookie `cc_access`/`cc_refresh`, role `admin`\|`user`\|**`guest`**; **otwarta rejestracja** i **accept-invite** (rola vs `DEMO_MODE`) + aktywacja e-mail; GuestGuard |
| `SPEC-KONTEKST-FIRMY.md` | Company context, bramka kompletności (`isComplete` **bez** sieci / gateway); GET dla guest; zapis tylko admin |
| `SPEC-SOCIAL.md` | Pipeline Social (posty **i** rolki), LangGraph, HITL model B |
| `SPEC-CONTENT.md` | Pipeline Content (page copy / outline), LangGraph, HITL model B |
| `SPEC-RUNY.md` | Cykl życia runu (`completed` / `failed` / **`cancelled`**), logi, SSE, kolejka, recovery, anulowanie (R-11), **przegląd z `REVIEW_TTL` / sweeper auto-finalize (R-10)**, **GuestRunPolicy (R-12)** + Redis **`REDIS_HOST`/`REDIS_PORT`/`REDIS_PASSWORD`**, ocena / edycja outputu, composite executor, unia `SocialBrief` / `ContentBrief` na `RunRecord`; R-3c pełna lista HTTP |
| `SPEC-FEEDBACK.md` | Opinie tekstowe (zapis MVP; panel odczytu = V1; okno `cancelled`+wynik; **nie** blokowane TTL przeglądu; guest: application/agent + run własny) |
| `SPEC-PERSISTENCE.md` | Prisma; SQLite w MVP; PostgreSQL od V1 — rozbudowa; pola Run `cancelledAt` / `cancelRequested` / **`pipelineFinishedAt`** (+ indeks sweepera, backfill B); **`User.verifiedAt`** + **`AccountActivation`**; `User.role` String (`guest`) |
| `SPEC-FRONTEND.md` | Next.js, modules/, shadcn, SSE UI, Stop + modal, archiwum z `cancelled`, disable przeglądu po `reviewExpiresAt`; **signup / thank-you / deep link aktywacji**; **F-6 `agentsActive`**; **F-10 DEMO chip / locki guest**; **viewport shell** + **paginacja UI Moje runy (10)** |
| `SPEC-TESTY.md` | Jest, supertest, piramida, DoD (w tym D-30…D-34 cancel, **D-35…D-40 TTL / sweeper**, **D-41…D-46 register / activate / resend**, **D-47…D-49 health/ready**, **D-50…D-62 guest / DEMO**) |
| `SPEC-BEZPIECZENSTWO.md` | Env, ekspozycja, Helmet, CORS, metrics/logi bez sekretów; anti-enum (409 register / stały resend / wspólny 401 login w tym guest przy demo off); GuestGuard; Redis fail modes + połączenie **`REDIS_HOST`/`REDIS_PORT`/`REDIS_PASSWORD`** (bez `REDIS_URL`); publiczny health **i** ready bez wycieku `GATEWAY_KEY` |

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

Szczegóły: `docs/dictionary.md`, `SPEC-PERSISTENCE.md`.

## Źródła

- Katalog dokumentacji: `docs/`
- Brief wejściowy sesji: `content-chain_brief.md` (kontekst, nie norma kodu)
- Ten plik: spis i sposób czytania — bez wymagań implementacyjnych obszaru
