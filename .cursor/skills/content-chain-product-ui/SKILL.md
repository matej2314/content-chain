---
name: content-chain-product-ui
description: >-
  Applies the Content Chain product-UI visual lock (adapted taste-skill rules
  for a self-host dashboard). Use when implementing or restyling apps/frontend
  chrome, login/first-run card, invite accept, sidebar/header, tokens in
  globals.css, shadcn kit, forms, lists, HITL, floating box, live run status
  presentation, or empty/loading/error states. Also when the user mentions
  lock wizualny, smak UI, anti-slop, or content-chain-product-ui. Do not use
  for BFF/apiFetch, cookie/session transport, SSE wiring, Nest/Prisma, or
  backend Faza 10 API contract.
---

# Content Chain — product UI (orkiestrator)

Cienki klient `apps/frontend` to **dashboard operatora**, nie landing. Ten skill strzeże **języka wizualnego**. IA, copy, trasy i stack bierze z docs/SPEC.

**Freeze.** Reguły są w tym katalogu. Nie czytaj i nie instaluj upstream `taste-skill`. Nie dokładaj siblingów (`minimalist`, `brutalist`, `soft`, `redesign`, `imagegen`).

## Hierarchia (wygrywa wyższy)

1. `docs/` (w tym `docs/ux_dashboard.md` — „Normy wizualne”) i `spec/SPEC-*.md` (w tym `SPEC-FRONTEND` **F-11…F-19**) — IA, labelki PL, trasy, role, stany produktu, BFF, kanon wizualny.
2. `content-chain-frontend_major_plan.md` — kolejność i DoD faz (w tym Faza 22 = drugi visual lock).
3. Ten katalog — jakość wizualna wewnątrz tej struktury.
4. Istniejący kod `apps/frontend` — dziedzicz tokeny **obowiązującego** visual locku; nie wymyślaj trzeciej palety poza kanonem docs/SPEC.

Konflikt docs/SPEC ↔ ten skill → **docs/SPEC**. Ten skill nie zmienia sidebara na top-nav, nie rusza ścieżek, nie podmienia Iconify/shadcn.

## Brama (zrób to zanim cokolwiek wystylizujesz)

Zadanie jest w zakresie **tylko** gdy dotyczy wyglądu lub stanów UI w `apps/frontend`:

- chrome (sidebar, header, sloty, karta logowania, `/invite/accept`);
- tokeny (`globals.css`, motyw shadcn, `shared/ui`);
- widoki produktowe (Kontekst, Konto, Runy, szczegóły, Użytkownicy, opinia, floating box);
- prezentacja statusu live (animacja/czytelność, nie protokół SSE).

**Stop. Nie stosuj tego skilla** przy: Route Handlerach BFF, `apiFetch` / 401→refresh, cookie httpOnly, rejestrze `EventSource` (poza wyglądem statusu), Zod/Prisma/Nest, Fazie 10 api.

Jeśli zadanie miesza (np. „zrób widok + fetch”): najpierw kontrakt i fetch wg SPEC; ten skill tylko na warstwę wizualną.

## Design Read (obowiązkowy, jedna linia)

Zanim zmienisz CSS albo JSX wizualny, zapisz:

`Reading this as: self-host dashboard for operator/admin, calm B2B product language, shadcn + Tailwind v4 + Iconify, dials VARIANCE 3–4 / MOTION 3–4 / DENSITY 7–8.`

Nie pytaj o estetykę, jeśli brief jest jasny. Jedno pytanie tylko gdy użytkownik wprost każe iść w stronę marketing/eksperyment — i wtedy i tak **nie** łam IA.

## Visual lock vs dziedziczenie

| Moment | Co robić |
|--------|----------|
| Faza 1, chrome (karta + layout po sesji) | **Pierwszy lock (historia):** tokeny, radius, akcent, typografia, stany kontrolek. |
| Fazy 2–21 | **Dziedziczyły** lock Fazy 1. Zakaz nowej palety „na ten ekran” obowiązywał do Fazy 21 włącznie. |
| **Faza 22** (major FE) | **Drugi visual lock** — obowiązujący kanon. Primary indigo/violet (wysoka chroma); **pełny dark shell** (ciemny sidebar **i** ciemny `main`; bez przełącznika — dual-mode = V1); split-panel na `/`; unikalne badge per `RunStatus`; KPI cards; lifting chipów / invite-accept / floating box. Pliki: `globals.css` (`:root` / `.dark` / `@theme`), powierzchnie z F-11…F-19. |
| Milestone FE | Pre-flight z [preflight.md](preflight.md). |

**Nota (Faza 22):** po legalizacji Fazy 22 w majorze FE obowiązuje **drugi visual lock**. Stare zakazy tego skilla („AI purple”, „brak split-hero”, „dziedzicz lock Fazy 1 bez nowej palety”, „lock jednorazowy”) **nie** blokują Fazy 22 ani F-11…F-19 — źródło prawdy = zaktualizowane `docs/` („Normy wizualne”) + `SPEC-FRONTEND`. Po Fazie 22 dziedzicz **ten** lock; nie wymyślaj trzeciej palety.

## Stack (zamknięty)

- Next.js App Router, React, Tailwind **v4** (`@tailwindcss/postcss`), shadcn, `tw-animate-css`.
- Ikony produktowe: **Iconify** (`@iconify/react`) wg `SPEC-FRONTEND.md`. `lucide-react` wolno zostawić tam, gdzie shadcn już go używa; **nie** migruj na Phosphor/Tabler.
- Font: **Geist + Geist Mono** (`next/font` w `layout.tsx`). Podłącz `--font-sans` / `--font-heading` do `--font-geist-sans`. Nie dodawaj Inter, serifów, Google Fonts przez `<link>`.
- Język chrome: **polski**. Envelope błędów: `code` + `message` **jak z API**.
- Nie dodawaj GSAP, Three.js, `motion/react`, nowej biblioteki ikon ani drugiego design systemu bez osobnej zgody.

Przed importem paczki sprawdź `apps/frontend/package.json`. Brakującej **nie** instaluj „bo taste tak kazał”.

## Procedura

1. Brama zakresu (wyżej). Poza zakresem → wyjdź.
2. Design Read.
3. Przeczytaj [rules-taste.md](rules-taste.md) (dials, tokeny, typografia, kolor, gęstość, layout produktu).
4. Gdy są kontrolki, listy, formularze, statusy albo overlaye → [rules-states.md](rules-states.md).
5. Zanim oddasz UI → [rules-anti-tells.md](rules-anti-tells.md) i [preflight.md](preflight.md).
6. Nie edytuj major planu ani SPEC z tego skilla.

## Poza zakresem

- Landing, portfolio, bento, marquee, scroll-hijack (hero banner runu „w toku” i dekoracyjny lewy panel `/` = kanon F-13 / F-15 — nie landing).
- Wybór między estetykami taste (`minimalist` / `brutalist` / `soft`).
- Zmiana kanonu UX poza docs/SPEC (sidebar vs top-nav, Konto vs Runy, floating box, deep link).
- Testy Playwright, next-intl, Docker, panel admina opinii (poza MVP).
- Rozrost scope skilla poza język wizualny (BFF, kontrakty HTTP, logika domenowa).

## Źródło

Adaptacja freeze z taste-skill v2 (MIT). Atrybucja: [NOTICE.md](NOTICE.md).
