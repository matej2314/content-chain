# Reguły smaku (dashboard)

Adaptacja taste-skill: Design Read, trzy dials, locki tokenów. Wyrzucono hero, bento, GSAP i mapę „oficjalnych design systemów”. System jest już wybrany: **shadcn**.

## Dials (sztywne)

| Dial | Wartość | Znaczenie tutaj |
|------|---------|-----------------|
| `DESIGN_VARIANCE` | **3–4** | Przewidywalny chrome. Siatka, stały sidebar; `/` = split-panel na `lg+` (kanon docs / F-15), mobile = formularz. |
| `MOTION_INTENSITY` | **3–4** | Hover, focus, `:active`. Bez magnetycznych CTA, marquee, scroll-pin. |
| `VISUAL_DENSITY` | **7–8** | Formularze, tabele, HITL, listy runów. Mało powietrza „gallery”. |

**Wyjątek motion:** status live runu (`running` / `awaiting_hitl` / `interrupted`) ma być wizualnie animowany i czytelny (`docs/ux_dashboard.md`, SPEC F-5). To nie podnosi globalnego dialu. Szczegóły: [rules-states.md](rules-states.md).

Nie pytaj użytkownika o zmianę dials. Override tylko gdy **wprost** każe i nie łamie IA.

### Jak dials sterują layoutem

- **Variance 3–4:** równe paddingi, sidebar z docs, brak masonry i „arts y chaos”. `/` na `lg+` = split-panel (brand + 1–2 akapity korzyści + CTA zachęta | formularz) — kanon F-15 / „Normy wizualne”; **nie** marketingowy split-hero landingowy.
- **Motion 3–4:** `transition` na `transform`/`opacity`/`color` (~150–250ms). Zero `window.scroll` listenerów, zero GSAP. Wyjątek: hero banner runu w toku (F-13).
- **Density 7–8:** ciasne bloki formularzy, listy z `divide-y` / wierszami zamiast siatki dużych kart. Karty gdy elewacja niesie hierarchię (modal, floating box, formularz na `/`, **KPI cards** na Koncie — F-16). Wiersze runów **nie** opakowuj w dekoracyjne Card.

## Typografia

- Display w dashboardzie jest **mały**. Nie `text-6xl`. Hierarchia: widok `text-lg`/`text-xl` + `font-medium`/`semibold`; chrome `text-sm`; meta/status `text-xs` + tabular nums.
- Body: `text-sm` lub `text-base`, `leading-normal`/`relaxed`. `max-w-[65ch]` tylko dla dłuższych tekstów pomocy — nie dla tabel i formularzy.
- **Sans (default):** **Space Grotesk** (`--font-sans`) — `body`, chrome, formularze, wartości KPI, nagłówki widoków (`h1`/`h2`). Ładunek: `next/font/google` w `layout.tsx`.
- **Pomocniczy:** **Inter** (`--font-secondary`) — wyłącznie (a) tytuły kart KPI (`CardTitle` / równoważne); (b) paragrafy pomocnicze pod nagłówkami widoków. **Nie** mapuj na globalne `--font-heading`. **Nie** ustawiaj Inter jako default `body`.
- **Mono:** **Geist Mono** (`--font-mono`) — statusy, id skrócone jeśli kiedyś widoczne, liczby w listach (`tabular-nums`).
- **Serif zakazany** w tym produkcie (taste v1: serif ban dla dashboard/software UI). Fraunces / Instrument Serif **nie**.
- **Zakaz** `<link>` do Google Fonts. Geist jako sans = historia Fazy 1 — po Fazie 22 / F-11 obowiązuje Space Grotesk.
- Nagłówki bez kinetic italic + `leading-none` obcinającego descender. Chrome nie używa italic display.

## Kolor

- **Trzy role akcentu w kanonie Fazy 22+23 (nie trzecia paleta):** (1) **chrome primary** = żywy **indigo/violet** (wysoka chroma) — split dekoracyjny, solid `--primary` / `--ring`, chrome **poza** wypełnieniem pozycji nawigacji; (2) **filled CTA** = wyłącznie wariant `Button` **`default`** — gradient teal/mint **135°** + tekst **ciemny** (tokeny w `globals.css`; wartości = HOW / docs); (3) **pozycje menu sidebara** = osobne traktowanie teal/mint (wash + inset ring + lewy pasek) — stany normal / hover / active / active+hover (F-14 / docs „Sidebar — logo i stany pozycji menu”). Indigo chrome **nie** jest „losowym AI purple” z boilerplate shadcn; teal CTA **nie** zastępuje `--primary`; teal nav **nie** jest filled CTA ani solid `--primary` na active item.
- **Zakaz nadal:** fioletowo-niebieski **glow** na całym chrome, neonowe gradienty dekoracyjne poza kanonem CTA `default` i formą active nav (rail glow na pozycji menu = kanon F-14, nie „neon AI”), stock-fiolet shadcn „z pudełka” bez tokenów projektu. Po Fazie 22 / F-14: **pełny dark shell** — ciemny `--background` / `main` **oraz** ciemny sidebar (`--sidebar` / `--sidebar-foreground`); sidebar może być nieco ciemniejszy od main. To **nie** jest dual-mode / przełącznik (V1). **Bez** zmiany tła `--sidebar` pod pretekstem stanów nav.
- Jedna rodzina szarości (ciepła **albo** chłodna). Nie mieszaj.
- Semantic status runu: **unikalny** kolor per `RunStatus` (mapa w docs „Normy wizualne” / F-12); tokeny + `@theme`; `interrupted` = osobny sygnał, **bez** hero. Badge-pill w listach, detail i floating boxie.
- Po drugim locku + Fazie 23: focus ring = `--ring` (indigo chrome). **Aktywna pozycja menu ≠** `bg-primary text-primary-foreground` — obowiązują stany nav (teal wash + ring + rail; tekst muted w active spoczynku); desktop + mobile sheet. Wypełniony CTA produktu = `Button` `default` (teal gradient + ciemny tekst) — **nie** obowiązkowy solid indigo; kolory CTA **bez zmian** przy okazji nav. Hover/active CTA `default`: te same kolory + `brightness(1.06)` na całym przycisku. Nie zmieniaj ról per widok poza kanonem statusów; **nie** maluj `outline` / `ghost` / `destructive` / `link` / `secondary` gradientem teal.
- Unikaj czystego `#000` i czystego `#fff` na dużych płaszczyznach. Off-black / off-white albo tokeny oklch z niuansem (w `globals.css`). Hex CTA `default` i wartości stanów nav — wyłącznie jako tokeny / HOW z docs/SPEC (nie „na piechotę” poza kanonem).
- Cienie: jeśli są, tint pod hue tła. Przy density 7–8 preferuj 1px border zamiast `shadow-lg`.

### Miejsce locku

Ustaw tokeny w `apps/frontend/src/app/globals.css` (`:root` i ewentualnie `.dark`). Skala radiusu już jest (`--radius` + sm/md/lg). **Shape lock:** jedna skala; przyciski/inputy/karty z tej skali. Nie mieszaj pill-wszędzie z ostrymi kartami bez reguły.

Jeśli produkt ma jeden motyw: zablokuj go w `layout` (klasa na `html`) i nie flipuj sekcji light/dark w połowie widoku. Dual-mode tylko gdy użytkownik o to poprosi; wtedy tokeny parytet hierarchii w obu motywach.

**Stan wyjściowy boilerplate:** shadcn default. Drugi visual lock (Faza 22) **musi** to spiąć: primary indigo/violet z tokenów (chrome), CTA `default` z tokenów teal (nie `bg-primary`), **pełny dark shell** (ciemny sidebar + ciemny main), pełny zestaw tokenów statusowych + `@theme`. Faza 23: stany pozycji menu wg F-14 — **bez** solid indigo fill na active item; **bez** przepisywania tła sidebara ani CTA.

## Layout produktu (zamiast anti-center / marketing hero)

Kanon `docs/ux_dashboard.md` („Normy wizualne”) jest layoutem:

- Niezalogowany `/`: na `lg+` — **split-panel** (lewa: gradient primary + brand + 1–2 akapity korzyści + krótka CTA/zachęta; prawa: formularz `login` / `register` / `bootstrap_admin` / thank-you). Mobile: tylko formularz. (F-15; stara „wyśrodkowana karta” = historia.)
- Zalogowany: **pełny dark shell** (F-14) — ciemny sidebar + header + **ciemny** obszar roboczy. Header: zawartość do prawej; login → Wyloguj → modal. Logo-area `h-14` + `border-b` (**bez** zmiany przy stanach nav). Pozycje menu: stany normal / hover / active / active+hover (F-14 / Faza 23) — teal wash + ring + rail; **nie** solid `bg-primary` na active; ta sama norma w mobile sheet.
- Konto: **KPI cards** powyżej „Start runu” gdy widoczne (F-16) — karty z metrykami, nie dekoracyjny bento.
- Nie zamieniaj sidebara na top-nav, command palette ani floating dock; nie zmieniaj tła całego sidebara (`--sidebar`) przy stylizacji pozycji nav.
- Viewport: pełna wysokość aplikacji `min-h-[100dvh]` / `h-full` na `html`/`body`, nie `h-screen` tam, gdzie pasek iOS zjada layout.
- Siatka nad `w-[calc(33%-1rem)]`. Breakpointy Tailwind standardowe; `<768px`: sidebar zwijany/off-canvas (sheet), nie dwa poziomy navu naraz — stany pozycji menu jak na desktopie.
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
