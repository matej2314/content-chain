# Pre-flight (dashboard)

Zamiast landingowej sekcji 14 taste v2. Odpal przed oddaniem pracy wizualnej. Jedno nie = nie gotowe.

## Kontrakt produktu

- [ ] IA, trasy, labelki PL i role zgodne z `docs/ux_dashboard.md` / SPEC (sidebar, header w prawo, Konto ≠ Runy, box poza Kontem, `/invite/accept?token=`).
- [ ] Design Read zapisany; dials 3–4 / 3–4 / 7–8; live status jako jedyny wyjątek motion.
- [ ] Stack: shadcn + Tailwind v4 + Iconify; Geist; bez nowej libki motion/ikon/DS.
- [ ] Przeglądarka nie zna originu api; brak sekretów w kliencie.

## Locki wizualne

- [ ] Jeden akcent, jedna rodzina szarości, jedna skala radiusu.
- [ ] Brak AI-purple / neon glow / stock-fiolet shadcn na primary/sidebar po locku.
- [ ] Typografia Geist; bez serifu; bez display `text-6xl` w chrome.
- [ ] Motyw spójny w całym widoku (bez flipu sekcji).
- [ ] Karty tylko tam, gdzie elewacja ma sens (logowanie, modal, box) — nie każda metryka.

## Stany i a11y

- [ ] Loading = skeleton kształtu layoutu.
- [ ] Empty ma następny krok.
- [ ] Error inline; envelope `code` + `message` as-is.
- [ ] Focus ring widoczny; kontrast CTA i formularzy AA.
- [ ] Label nad polem; placeholder ≠ label.
- [ ] `prefers-reduced-motion` gasi ciągły motion (w tym live).
- [ ] `interrupted` ≠ `running` (copy + wygląd).
- [ ] `:active` / hover na przyciskach; CTA nie wrapuje się na desktop.

## Anti-tells

- [ ] Zero hero/bento/marquee/GSAP/magnetic.
- [ ] Zero emoji i fake UI z divów.
- [ ] Zero em-dash w copy UI.
- [ ] Ikony Iconify (lucide tylko dziedziczone z shadcn).
- [ ] Motion tylko `transform`/`opacity` (+ color); uzasadniony jednym zdaniem.

## Faza

- [ ] Faza 1 lock: tokeny w `globals.css` + karta + layout dziedziczą to samo.
- [ ] Fazy 2–6: bez nowej palety; ten sam język statusu na Koncie, szczegółach i boxie.
