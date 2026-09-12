# Stany, motion, a11y

Adaptacja taste-skill: pełny cykl interakcji, formularze, reduced motion, live status. Bez magnetycznych przycisków, sticky-stack i scroll-hijack.

## Cykl kontrolek (obowiązkowy)

LLM default to tylko stan sukcesu. Każda powierzchnia produktowa ma:

| Stan | Jak |
|------|-----|
| **Loading** | Skeleton o kształcie docelowego layoutu. Nie sam okrągły spinner na całą stronę. |
| **Empty** | Kompozycja z powodem i następnym krokiem (link/CTA zgodny z IA). |
| **Error** | Inline przy polu albo przy bloku. Toast tylko na chwilowe, nie na walidację. Envelope API: `code` + `message` as-is. Nie `window.alert`. |
| **Disabled** | Wyjaśnienie (tooltip / tekst), np. start przy nieaktywnych agentach. |
| **Focus** | Widoczny ring z tokenu `--ring`. Nie usuwaj outline bez zamiennika. |
| **Hover / `:active`** | Subtelne. `:active`: `scale-[0.98]` albo `translate-y-px` (już w `button`). |

Przycisk: kontrast tekstu do tła WCAG AA (4.5:1 body, 3:1 large). Ghost nad zdjęciem/tłem: scrim albo border. CTA nie zawija się do 2 linii na desktop.

Dwa CTA o **tym samym intencie** na jednym widoku = błąd (np. dwa „Zostaw opinię”). Kanon docs: jeden globalny CTA opinii + ten sam formularz na Koncie to **dwie powierzchnie tego samego kanonu**, nie dwa różne wezwania na jednym ekranie.

## Formularze

- Label **nad** inputem. Placeholder nie zastępuje labela.
- Helper opcjonalny, ale w markupie gdy polityka tego wymaga (hasło, first-run).
- Błąd **pod** polem. Blok pola: `gap-2`.
- Kontrast: label, input, placeholder, helper, error vs tło sekcji — AA.
- Karta logowania / accept-invite / start runu / kontekst / email / opinia: ten sam rytm pól.

## Listy i dane

- Density 7–8: wiersze, `divide-y` albo tabela. Nie siatka trzech równych feature-cardów.
- Liczby: `tabular-nums` (i mono gdy to meta techniczna).
- Paginacja archiwum Runy: stałe 10, bez „bento”.
- Długa lista nie dostaje dekoracyjnego progress-bara z wypełnionym trackiem.

## Motion

Animuj **tylko** `transform` i `opacity` (ew. `color`). Nie `top`/`left`/`width`/`height`.

| Pasmo | Wolno |
|-------|--------|
| Globalnie (dial 3–4) | CSS/`tw-animate-css`: hover, focus, otwarcie modalu, zwijanie boxa. |
| Live status | Ciągła, **motywowana** animacja stanu: „pipeline pracuje” vs „czeka na HITL” vs „przerwany”. Inne copy **i** inna prezentacja dla `interrupted`. |
| Reduced motion | Wszystko powyżej hover: `useReducedMotion` albo `@media (prefers-reduced-motion: reduce)` → statyczny, czytelny badge/kolor. Live nie zostaje jedyną informacją w animacji. |

**Zakaz:** `window.addEventListener("scroll")`, `useState` na pozycji kursora/scrollu, magnetic pull, marquee, GSAP, nieskończony pulse na każdej karcie, fake terminal w divach.

Biblioteki: użyj tego, co jest (`tw-animate-css`, CSS). Nie dokładaj `motion` / GSAP na visual lock. Wyspy `'use client'` tylko dla interakcji (formularz, SSE UI, box) — nie cały layout.

Jeśli dodajesz animację, jedna linia „po co”: hierarchia, feedback albo zmiana stanu. „Wygląda cool” = usuń.

## Live status (wyjątek produktowy)

Źródło zachowania: `docs/ux_dashboard.md`, SPEC-FRONTEND F-5 / F-5a. Ten plik = tylko **wygląd**.

- `running` / `awaiting_hitl` / `interrupted` (własny run): status nie jest suchym stringiem.
- `queued`: snapshot, bez „żywej” animacji kanału.
- `completed` / `failed`: brak animacji live.
- Floating box i Moje runy i szczegóły: **ten sam** język statusu (kolor + motion + copy). Box nie dubluje HITL/wyniku.

## Overlaye

- Modal wylogowania: jasny Tak/Nie; focus trap; Esc = jak „Nie”.
- Floating box: zwijany/rozwijany; nie zasłania CTA headera bez sensu; warstwa ze skali z-index.
- Nie buduj drugiego „dynamic island” ani docka.

## Wydajność wizualna

- Grain/noise tylko na `fixed` + `pointer-events-none`, nie na scrollu.
- `will-change` tylko na faktycznie animowanym elemencie.
- Skeleton rezerwuje wysokość (CLS).
- Obrazy: `next/image` gdy naprawdę są. Dashboard MVP nie wymaga stock photos; nie wstawiaj Picsum „żeby nie było pusto”.
