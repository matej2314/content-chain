# Anti-tells (produkt)

Adaptacja taste-skill sekcji AI Tells. Landingowe bany (hero stack, logo wall, scroll cue) zastąpiono banami, które psuje **ten** dashboard.

## Zakazane w `apps/frontend`

- Fiolet/neon glow, mesh gradient „AI”, glassmorphism na cały chrome.
- Inter jako nowy default; serif; kinetic headline.
- Trzy równe karty-feature jako „dashboard home”.
- Podmiana sidebara, usunięcie karty logowania, hero na `/`.
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

- Spokojny akcent + gęsty layout + wyraźne stany.
- Animowany **status live** (nie cały widok).
- shadcn Button/Input/Dialog/Sidebar **po** token locku.
- Martwy przycisk rejestracji na karcie logowania — kanon docs, nie „usuń bo martwy CTA”.
