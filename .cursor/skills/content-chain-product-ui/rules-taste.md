# Reguły smaku (dashboard)

Adaptacja taste-skill: Design Read, trzy dials, locki tokenów. Wyrzucono hero, bento, GSAP i mapę „oficjalnych design systemów”. System jest już wybrany: **shadcn**.

## Dials (sztywne)

| Dial | Wartość | Znaczenie tutaj |
|------|---------|-----------------|
| `DESIGN_VARIANCE` | **3–4** | Przewidywalny chrome. Siatka, stały sidebar, karta logowania wyśrodkowana (kanon docs). |
| `MOTION_INTENSITY` | **3–4** | Hover, focus, `:active`. Bez magnetycznych CTA, marquee, scroll-pin. |
| `VISUAL_DENSITY` | **7–8** | Formularze, tabele, HITL, listy runów. Mało powietrza „gallery”. |

**Wyjątek motion:** status live runu (`running` / `awaiting_hitl` / `interrupted`) ma być wizualnie animowany i czytelny (`docs/ux_dashboard.md`, SPEC F-5). To nie podnosi globalnego dialu. Szczegóły: [rules-states.md](rules-states.md).

Nie pytaj użytkownika o zmianę dials. Override tylko gdy **wprost** każe i nie łamie IA.

### Jak dials sterują layoutem

- **Variance 3–4:** równe paddingi, sidebar z docs, brak masonry i „arts y chaos”. Karta logowania = tło + karta (nie split-hero).
- **Motion 3–4:** `transition` na `transform`/`opacity`/`color` (~150–250ms). Zero `window.scroll` listenerów, zero GSAP.
- **Density 7–8:** ciasne bloki formularzy, listy z `divide-y` / wierszami zamiast siatki dużych kart. Karty tylko gdy elewacja niesie hierarchię (modal, floating box, karta logowania). Metryki i wiersze runów **nie** opakowuj w dekoracyjne Card.

## Typografia

- Display w dashboardzie jest **mały**. Nie `text-6xl`. Hierarchia: widok `text-lg`/`text-xl` + `font-medium`/`semibold`; chrome `text-sm`; meta/status `text-xs` + tabular nums.
- Body: `text-sm` lub `text-base`, `leading-normal`/`relaxed`. `max-w-[65ch]` tylko dla dłuższych tekstów pomocy — nie dla tabel i formularzy.
- **Sans:** Geist (już w `layout.tsx`). **Mono:** Geist Mono — statusy, id skrócone jeśli kiedyś widoczne, liczby w listach (`tabular-nums`).
- **Serif zakazany** w tym produkcie (taste v1: serif ban dla dashboard/software UI).
- Inter **nie** dokładaj. Fraunces / Instrument Serif **nie**.
- Nagłówki bez kinetic italic + `leading-none` obcinającego descender. Chrome nie używa italic display.

## Kolor

- **Max 1 akcent** poza semantyką (destructive, success/warning statusów runu). Saturacja akcentu < 80%.
- **Lila rule:** zakaz fioletowo-niebieskiego glow, neon gradientów, „AI purple” na primary/sidebar. Neutralna baza (zinc/stone/neutral), jeden spokojny akcent.
- Jedna rodzina szarości (ciepła **albo** chłodna). Nie mieszaj.
- Semantic status runu (running / hitl / interrupted / failed / queued) to **nie** drugi brand accent. Użyj stonowanych tokenów statusu, spójnych w liście, szczegółach i floating boxie. `interrupted` **nie** wygląda jak `running`.
- Po locku akcent jest użyty w całym produkcie: CTA, focus ring, aktywna pozycja sidebara. Nie zmieniaj akcentu per widok.
- Unikaj czystego `#000` i czystego `#fff` na dużych płaszczyznach. Off-black / off-white albo tokeny oklch z niuansem (już w `globals.css`).
- Cienie: jeśli są, tint pod hue tła. Przy density 7–8 preferuj 1px border zamiast `shadow-lg`.

### Miejsce locku

Ustaw tokeny w `apps/frontend/src/app/globals.css` (`:root` i ewentualnie `.dark`). Skala radiusu już jest (`--radius` + sm/md/lg). **Shape lock:** jedna skala; przyciski/inputy/karty z tej skali. Nie mieszaj pill-wszędzie z ostrymi kartami bez reguły.

Jeśli produkt ma jeden motyw: zablokuj go w `layout` (klasa na `html`) i nie flipuj sekcji light/dark w połowie widoku. Dual-mode tylko gdy użytkownik o to poprosi; wtedy tokeny parytet hierarchii w obu motywach.

**Stan wyjściowy boilerplate:** shadcn default (prawie monochrom + fiolet w `.dark --sidebar-primary`). Visual lock **musi** to spiąć: jeden primary, sidebar bez losowego hue.

## Layout produktu (zamiast anti-center / hero)

Kanon `docs/ux_dashboard.md` jest layoutem:

- Niezalogowany: tło + **karta** (email, hasło, CTA, martwa rejestracja). First-run = ten sam widok.
- Zalogowany: **sidebar + header + obszar roboczy**. Header: zawartość do prawej; login → Wyloguj → modal.
- Nie zamieniaj sidebara na top-nav, command palette ani floating dock.
- Viewport: pełna wysokość aplikacji `min-h-[100dvh]` / `h-full` na `html`/`body`, nie `h-screen` tam, gdzie pasek iOS zjada layout.
- Siatka nad `w-[calc(33%-1rem)]`. Breakpointy Tailwind standardowe; `<768px`: sidebar zwijany/off-canvas, nie dwa poziomy navu naraz.
- `max-w-7xl` nie jest kanonem treści dashboardu. Obszar roboczy wypełnia resztę obok sidebara; ograniczaj szerokość tylko tam, gdzie czytelność tego wymaga (karta logowania, wąski formularz startu).

## shadcn

- Komponenty z `shared/ui`. Nie mieszaj z Carbon/Fluent/Material.
- **Nie zostawiaj stock-fioletowego defaultu** po locku. Radius, kolory, focus ring = tokeny locku.
- Nowe prymitywy: `npx shadcn@latest add …` (albo równoważne w tym repo), potem od razu tokeny projektu. Nie kopiuj innego DS.

## Ikony i emoji

- Produktowo: Iconify. Jedna spójna rodzina/set i `stroke` w całym UI.
- Emoji zakazane w chrome, alt, przyciskach, pustych stanach. Zastąp glifem Iconify.
- Nie rysuj ikon ręcznym SVG path, chyba że znak marki (logo), i to tylko na prośbę.

## Z-index i warstwy

Stała skala, nie `z-50` ad hoc. Propozycja po locku (udokumentuj w komentarzu przy tokenach albo stałych UI):

| Warstwa | Użycie |
|---------|--------|
| baza | treść, sidebar |
| chrome | header sticky jeśli jest |
| overlay | floating box |
| modal | wylogowanie, formularz opinii |
| toast | jeśli kiedyś; nie na błędy formularza |

## Copy wizualne

- Labelki z docs (polski). Nie „Elevate / Seamless / Unleash”.
- Nie zmyślaj liczb, imion, brandów na placeholderach. Puste stany mówią, **jak uzupełnić** (np. idź do Kontekstu), nie „Jane Doe”.
- Envelope: pokaż `code` i `message` z API, bez mapy tłumaczeń (MVP).
