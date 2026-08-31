---
wersja: 4
data_utworzenia: 2026-08-11
data_modyfikacji: 2026-08-31
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
| `SPEC-KOMUNIKACJA.md` | HTTP/SSE api + klient → gateway |
| `SPEC-AUTH.md` | Auth, cookie `cc_access`/`cc_refresh`, role, hasła |
| `SPEC-KONTEKST-FIRMY.md` | Company context, bramka kompletności |
| `SPEC-SOCIAL.md` | Pipeline Social (posty **i** rolki), LangGraph, HITL model B |
| `SPEC-CONTENT.md` | Pipeline Content (page copy / outline), LangGraph, HITL model B |
| `SPEC-RUNY.md` | Cykl życia runu, logi, SSE, kolejka, recovery, ocena / edycja outputu, composite executor |
| `SPEC-FEEDBACK.md` | Opinie tekstowe (zapis MVP; panel odczytu = V1) |
| `SPEC-PERSISTENCE.md` | Prisma; SQLite w MVP; PostgreSQL od V1 — rozbudowa |
| `SPEC-FRONTEND.md` | Next.js, modules/, shadcn, SSE UI |
| `SPEC-TESTY.md` | Jest, supertest, piramida, DoD |
| `SPEC-BEZPIECZENSTWO.md` | Env, ekspozycja, Helmet, CORS, metrics/logi bez sekretów |

## Terminologia faz (skrót)

| Faza | Znaczenie |
|------|-----------|
| **MVP** | Pierwszy slice: Social (posty i rolki) + Content (BC, podstawowa forma) + auth + dashboard + gateway + **fundament zapisu feedbacku**; silnik DB = **SQLite** |
| **V1 — rozbudowa** | Po MVP: PostgreSQL (ops/skala) + panel odczytu opinii + publikacja portali SM + audytorzy Content + YouTube. **Nie** „kolejne workflowy / rolki / blog” |
| **`/api/v1`** | Prefiks HTTP API — **nie** to samo co „V1 — rozbudowa” |

Szczegóły: `docs/dictionary.md`, `SPEC-PERSISTENCE.md`.

## Źródła

- Katalog dokumentacji: `docs/`
- Brief wejściowy sesji: `content-chain_brief.md` (kontekst, nie norma kodu)
- Ten plik: spis i sposób czytania — bez wymagań implementacyjnych obszaru
