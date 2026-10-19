# Anti-tells (produkt)

Adaptacja taste-skill sekcji AI Tells. Landingowe bany (hero stack, logo wall, scroll cue) zastąpiono banami, które psuje **ten** dashboard.

## Zakazane w `apps/frontend`

- Neon glow, mesh gradient „AI”, glassmorphism na cały chrome; stock-fiolet shadcn bez tokenów. Primary indigo/violet z docs/F-11 **nie** jest tym zakazem. Gradient teal na wariancie `Button` **`default`** (F-14 CTA-only) **nie** jest tym zakazem — **jest** zakazem malowanie całego chrome / `outline`/`ghost` tym samym gradientem albo podmiana solid `--primary` na teal. Teal wash + ring + rail na **pozycji menu** (F-14 / Faza 23) **nie** jest tym zakazem — **jest** zakazem solid `bg-primary` na active nav, malowanie tła całego sidebara teal/wash albo podmiana kolorów CTA `default` „przy okazji” nav.
- Inter jako default `body` / głównego chrome (Inter wolno tylko jako `--font-secondary`: tytuły kart KPI + paragrafy pomocnicze); serif; kinetic headline; `<link>` Google Fonts.
- Trzy równe karty-feature jako „dashboard home” (KPI cards F-16 na Koncie = kanon, nie bento marketingowe).
- Podmiana sidebara na top-nav; marketingowy hero/landing na `/` zamiast split-panelu F-15; jasny `main` przy ciemnym sidebarze (obowiązuje F-14 — dark shell); przełącznik light/dark w MVP (dual-mode = V1); inna norma stanów nav między desktopem a mobile sheet.
- Div-based fake screenshot / fake terminal / fake tabela „dla klimatu”.
- Ręczne SVG-ikony zamiast Iconify (poza ewentualnym logo).
- Emoji w UI.
- Copy marketingowe: Elevate, Seamless, Unleash, Next-Gen, Quietly in use.
- Placeholdery Jane Doe / Acme / 99.99%.
- Em-dash (`—`) w copy UI. Myślnik `-` albo dwa zdania. (Freeze z taste 9.G, tu: labelki i stany.)
- Section-number eyebrows (`00 / INDEX`), `·` jako separator wszystkiego, dekoracyjne kropki statusu tam, gdzie nie ma stanu.
- `border-t` + `border-b` na każdym wierszu długiej listy — jeden kierunek, oszczędnie.
- Wersje w stopce (`v1.4.2`, `last sync 4s ago`) jako dekoracja.
- Drugi design system obok shadcn.
- Nowa paleta na jednym widoku.
- `NEXT_PUBLIC_API_BASE_URL`, sekrety LLM, URL api w kliencie — to też „tell” produktu (SPEC), nie tylko smak.

## Zakazane zapożyczenia z pełnego taste v2

Nie wdrażaj, nawet gdy oryginał to chwali:

- Asymmetric/editorial/kinetic hero
- Bento, masonry, chroma grid
- GSAP sticky-stack / horizontal pan
- Marquee, magnetic button, liquid glass na dashboardzie
- „Trusted by” logo wall
- Dual-theme na siłę, jeśli lock jest jednomotywowy
- Zmiana ikon na Phosphor/Tabler
- Dark section w środku light (albo odwrotnie) bez kanonu

## Co wolno (żeby nie przesadzić w drugą stronę)

- Spokojny akcent chrome (indigo) + filled CTA `default` (teal) + stany pozycji menu (teal wash / ring / rail) + gęsty layout + wyraźne stany.
- Animowany **status live** (nie cały widok).
- shadcn Button/Input/Dialog/Sidebar **po** token locku — wariant `default` wg docs/SPEC (nie wymuszaj solid indigo na filled CTA); pozycje nav wg F-14 (nie wymuszaj solid indigo na active item).
- Martwy przycisk rejestracji na karcie logowania — kanon docs, nie „usuń bo martwy CTA”.
