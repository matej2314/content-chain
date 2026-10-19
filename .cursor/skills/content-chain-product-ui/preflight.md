# Pre-flight (dashboard)

Zamiast landingowej sekcji 14 taste v2. Odpal przed oddaniem pracy wizualnej. Jedno nie = nie gotowe.

## Kontrakt produktu

- [ ] IA, trasy, labelki PL i role zgodne z `docs/ux_dashboard.md` / SPEC (sidebar, header w prawo, Konto ≠ Runy, box poza Kontem, `/invite/accept?token=`).
- [ ] Design Read zapisany; dials 3–4 / 3–4 / 7–8; live status jako jedyny wyjątek motion.
- [ ] Stack: shadcn + Tailwind v4 + Iconify; Space Grotesk + Inter (`--font-secondary`) + Geist Mono via `next/font/google`; bez nowej libki motion/ikon/DS.
- [ ] Przeglądarka nie zna originu api; brak sekretów w kliencie.

## Locki wizualne

- [ ] Chrome primary indigo/violet + filled CTA `Button` `default` (gradient teal + ciemny tekst) + stany pozycji menu (teal wash + ring + rail) — trzy role kanonu F-14 / Faza 23, nie trzecia paleta; jedna rodzina szarości, jedna skala radiusu; tokeny statusowe + `@theme` (F-11).
- [ ] Active nav **nie** jest solid `bg-primary text-primary-foreground`; normal / hover / active / active+hover zgodne z docs; desktop **i** mobile sheet ta sama norma; tło `--sidebar` i kolory CTA `default` nietknięte przy stylizacji nav.
- [ ] Brak neon glow / stock-fiolet shadcn „z pudełka”; primary indigo/violet chrome **dozwolony**; teal CTA `default` **dozwolony** (nie na `outline`/`ghost`/solid `--primary`); teal nav wash/ring/rail **dozwolony** (nie na CTA ani na tle całego sidebara); **pełny dark shell** (ciemny sidebar **i** ciemny `main`, F-14); bez przełącznika light/dark w MVP.
- [ ] Typografia: Space Grotesk default; Inter tylko KPI titles + supporting copy (`--font-secondary`); Geist Mono; bez Inter-as-body; bez serifu; bez `<link>` Google Fonts; bez display `text-6xl` w chrome.
- [ ] Motyw spójny w całym widoku (bez flipu sekcji); `/` = split-panel `lg+` (F-15); unikalne badge per `RunStatus` (F-12).
- [ ] Karty tam, gdzie elewacja ma sens (formularz na `/`, modal, box, **KPI cards** F-16) — nie dekoracyjny bento na wierszach runów.

## Stany i a11y

- [ ] Loading = skeleton kształtu layoutu.
- [ ] Empty ma następny krok.
- [ ] Error inline; envelope `code` + `message` as-is.
- [ ] Focus ring widoczny; kontrast CTA i formularzy AA.
- [ ] Label nad polem; placeholder ≠ label.
- [ ] `prefers-reduced-motion` gasi ciągły motion (w tym live).
- [ ] `interrupted` ≠ `running` (copy + wygląd).
- [ ] `:active` / hover na przyciskach; CTA `default`: te same kolory + `brightness(1.06)`; CTA nie wrapuje się na desktop.

## Anti-tells

- [ ] Zero hero/bento/marquee/GSAP/magnetic.
- [ ] Zero emoji i fake UI z divów.
- [ ] Zero em-dash w copy UI.
- [ ] Ikony Iconify (lucide tylko dziedziczone z shadcn).
- [ ] Motion tylko `transform`/`opacity` (+ color); uzasadniony jednym zdaniem.

## Faza

- [ ] Faza 1 lock: tokeny w `globals.css` + karta + layout dziedziczą to samo.
- [ ] Fazy 2–6: bez nowej palety; ten sam język statusu na Koncie, szczegółach i boxie.
