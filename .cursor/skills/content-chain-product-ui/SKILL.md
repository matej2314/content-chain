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

1. `docs/` (w tym `docs/ux_dashboard.md`) i `spec/SPEC-*.md` — IA, labelki PL, trasy, role, stany produktu, BFF.
2. `content-chain-frontend_major_plan.md` — kolejność i DoD faz.
3. Ten katalog — jakość wizualna wewnątrz tej struktury.
4. Istniejący kod `apps/frontend` — dziedzicz tokeny po visual locku; nie wymyślaj drugiej palety.

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
| Faza 1, chrome (karta + layout po sesji) | **Lock:** ustaw tokeny, radius, akcent, typografię, stany kontrolek. Pliki: `apps/frontend/src/app/globals.css`, `layout.tsx` (fonty), `shared/ui/*`. |
| Fazy 2–6 | **Dziedzicz** lock. Nowy widok = te same tokeny i gęstość. Zakaz nowej palety „na ten ekran”. |
| Milestone FE | Pre-flight z [preflight.md](preflight.md). |

Lock jest jednorazowy. Późniejszy „redesign całego dashboardu” nie jest tym skillem.

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

- Landing, portfolio, hero, bento, marquee, scroll-hijack.
- Wybór między estetykami taste (`minimalist` / `brutalist` / `soft`).
- Zmiana kanonu UX (sidebar, Konto vs Runy, floating box, deep link).
- Testy Playwright, next-intl, Docker, panel admina opinii (poza MVP).

## Źródło

Adaptacja freeze z taste-skill v2 (MIT). Atrybucja: [NOTICE.md](NOTICE.md).
