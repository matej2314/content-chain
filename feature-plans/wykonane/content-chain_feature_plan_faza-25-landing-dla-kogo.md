# Content Chain — feature plan: Landing sekcja „Dla kogo” (Faza 25)

**Kotwica major:** `content-chain-frontend_major_plan.md` — **Faza 25** (`NIE_ROZPOCZĘTY`) — sekcja audience „Dla kogo” na anonimowym `/` przed sekcją wartości; kotwica w sticky chrome i footerze; trzy karty person + lead wartości dla firmy/zespołu.  
**Źródła:** `docs/ux_dashboard.md` („Strona główna — landing” — sekcja „Dla kogo”), `SPEC-FRONTEND.md` F-15 (IA: audience przed wartościami), skill `content-chain-product-ui` (dziedziczenie locku landingu Fazy 22–24; bez nowej palety).  
**Skill UI:** `content-chain-product-ui` — Design Read: self-host dashboard / landing dziedziczy trzy role akcentu (indigo chrome / CTA teal / nav teal wash); karty person = ten sam wzorzec powierzchni co sekcja „Co zyskuje zespół” (border + `bg-card/50`); **bez** trzeciej palety i **bez** screenshotów w audience.

**Statusy kroków feature:** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`

---

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Cała Faza 25 majoru FE |
| Major | Faza 25 (gate); HOW: KROK 1–2 poniżej |
| Poza zakresem | Zmiana Auth / modal / thank-you / activate / CTA chrome wejścia (poza montażem kotwicy); nowe assety PNG; trzecia paleta; MILESTONE 25; edycja backend major; przepisywanie Fazy 24 / 24.1 (`WYKONANY`); Playwright jako suite |
| Zależność BE | **Brak** |
| Pass rozwojowy | Brak przesunięć — KROK 2 montuje wyłącznie artefakty z KROK 1 |
| Po implementacji (informacyjnie) | Major: Faza 25 → `WYKONANY` — **edycja major poza tym skillem**; **bez** `OSIĄGNIĘTY` (brak MILESTONE 25) |

**Refaktor względem:** Faza 24 / Krok 24.1 (`WYKONANY`) — landing ma już sticky chrome, hero (+ tech / proof), wartości, proof Kontekst / Runy, proces, closing / footer oraz modal auth. Cel: **dodać** sekcję audience **przed** wartościami + kotwice. Treść Fazy 24 **nie** jest przepisywana.

---

## Założenia

- Stack: Next.js 16 / React 19 / Tailwind v4 / `@iconify/react` — **bez** nowych paczek.
- Typy: `readonly` + `as const satisfies` jak w istniejącym `LANDING_COPY`; bez `any`.
- Copy marketingowe PL powstaje w **KROK 1** (docs/SPEC dają intencję person, nie finalne stringi).
- Forma kart: jak `#mozliwosci` (grid 3 kolumny, ikona + tytuł + body) — dziedziczenie wizualne; **bez** `next/image` w tej sekcji.
- Kotwica kanoniczna: `#dla-kogo` (chrome + footer).
- Kolejność scrollu po montażu: hero (+ tech / proof) → **Dla kogo** → `#mozliwosci` → `#kontekst` → `#runy` → `#jak-dziala` → closing → footer.

---

## FAZA 1 — Landing: sekcja „Dla kogo”

### KROK 1 — Typ + copy PL w `landing-copy.ts`

**Status:** `WYKONANY`

**Cel:** Dodać typ persony, blok copy sekcji audience (tytuł + lead wartości + 3 karty) oraz etykietę kotwicy w `chromeNav` — pod montaż w KROK 2. Major Faza 25; `docs/ux_dashboard.md` (persony); `SPEC-FRONTEND.md` F-15.

**Artefakty:**

| Ścieżka | Zmiana |
|---------|--------|
| `apps/frontend/src/modules/auth/landing/landing-copy.ts` | typ `LandingPersona` + pola `chromeNav.audience`, `audienceSection`, `personas` |

**Implementacja (refaktor — fragmenty):**

1) Po typie `LandingFeature` dopisz typ persony (ten sam kształt tytułu/body; ikona jak w features — spójność kart landingu):

```ts
export type LandingPersona = {
  readonly icon: string;
  readonly title: string;
  readonly body: string;
};
```

2) W `LANDING_COPY.chromeNav` — **teraz:**

```ts
  chromeNav: {
    features: 'Co zyskujesz',
    context: 'Kontekst marki',
    runs: 'Runy',
    howItWorks: 'Proces',
  },
```

**zamień na:**

```ts
  chromeNav: {
    audience: 'Dla kogo',
    features: 'Co zyskujesz',
    context: 'Kontekst marki',
    runs: 'Runy',
    howItWorks: 'Proces',
  },
```

3) Po bloku `hero` (przed `featuresSection`) wstaw sekcję audience + tablicę person:

```ts
  audienceSection: {
    title: 'Dla kogo',
    supporting:
      'Content Chain skraca drogę od briefu do gotowego materiału w zespole, który chce kontrolować głos marki i przebieg pracy agentów — bez oddawania procesu zewnętrznemu narzędziu.',
  },
  personas: [
    {
      icon: 'mdi:rocket-launch-outline',
      title: 'Founderzy i małe zespoły',
      body: 'Szybciej od pomysłu do pierwszej wersji contentu — bez osobnego, ciężkiego procesu redakcyjnego na każdy post czy stronę.',
    },
    {
      icon: 'mdi:bullhorn-outline',
      title: 'Marketerzy B2B',
      body: 'Jeden kontekst firmy napędza posty, rolki i copy stron, więc głos marki zostaje spójny między kanałami i runami.',
    },
    {
      icon: 'mdi:server-security',
      title: 'Zespoły techniczne',
      body: 'Self-host: kontrolujesz instancję, integracje i sposób pracy agentów zamiast oddawać workflow zewnętrznemu SaaS.',
    },
  ] as const satisfies readonly LandingPersona[],
```

Lead celowo mówi o **wartości dla firmy/zespołu** (nie tylko „kim jesteś”) — zgodnie z F-15 / docs.

**Biblioteki / API:** brak nowych; Iconify stringi jak w `features` (już w projekcie).

**Testy:** brak osobnego suite — weryfikacja wizualna / ręczne w DoD KROK 2.

**DoD kroku:**

- `LANDING_COPY` eksportuje `audienceSection`, `personas` (3 pozycje) oraz `chromeNav.audience`.
- Typy `LandingPersona` + `satisfies readonly LandingPersona[]` kompilują się bez `any`.
- Brak zmian w `landing-view.tsx` w tym kroku.

---

### KROK 2 — Montaż sekcji `#dla-kogo` + kotwice w `landing-view.tsx`

**Status:** `WYKONANY`

**Cel:** Wstawić sekcję audience **między** hero a `#mozliwosci`; dodać kotwicę `#dla-kogo` w sticky nav (`md+`) i footerze (kolejność: Dla kogo → wartości → Kontekst → Runy → Proces). Auth / modal / thank-you / surface — **nietknięte**. Major Faza 25; F-15.

**Artefakty:**

| Ścieżka | Zmiana |
|---------|--------|
| `apps/frontend/src/modules/auth/landing/landing-view.tsx` | sekcja + linki kotwic |

**Implementacja (refaktor — fragmenty):**

1) **Chrome nav** — w `<nav className="hidden … md:flex">` **przed** linkiem `#mozliwosci` dodaj:

```tsx
              <a href="#dla-kogo" className="transition-colors hover:text-foreground">
                {copy.chromeNav.audience}
              </a>
```

Kolejność linków po zmianie: `#dla-kogo` → `#mozliwosci` → `#kontekst` → `#runy` → `#jak-dziala`.

2) **Sekcja audience** — w `<main id="top">` **po** zamykającym `</section>` hero (ten z tech + screenshotem), **przed** `<section id="mozliwosci" …>` wstaw:

```tsx
            <section id="dla-kogo" className="border-t border-border/60">
              <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
                <div className="mb-8 max-w-lg">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    {copy.audienceSection.title}
                  </h2>
                  <p className="mt-2 font-secondary text-sm text-muted-foreground">
                    {copy.audienceSection.supporting}
                  </p>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {copy.personas.map((persona) => (
                    <div
                      key={persona.title}
                      className="rounded-xl border border-border bg-card/50 p-5 transition-colors duration-200 hover:bg-card"
                    >
                      <Icon icon={persona.icon} className="size-5 text-primary" aria-hidden />
                      <h3 className="mt-3 text-base font-semibold">{persona.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {persona.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
```

Wzorce klas = sekcja `#mozliwosci` (bez nowych tokenów / cieni / palety).

3) **Footer** — w bloku linków kotwic **przed** `#mozliwosci` dodaj:

```tsx
              <a href="#dla-kogo" className="hover:text-foreground">
                {copy.chromeNav.audience}
              </a>
```

**Biblioteki / API:** istniejący `Icon` z `@iconify/react`; brak `next/image` w tej sekcji.

**Testy:** ręczne na anonimowym `/` (desktop `md+` nav + mobile bez nav kotwic w chrome — jak dziś; footer nadal ma kotwice).

**DoD kroku:**

- Na anonimowym `/` (surface `marketing`) widać sekcję „Dla kogo” z leadem + 3 kartami **przed** „Co zyskuje zespół”.
- Sticky chrome (`md+`) i footer mają działającą kotwicę `#dla-kogo` (scroll do sekcji).
- Kolejność DOM/scroll: hero → `#dla-kogo` → `#mozliwosci` → `#kontekst` → `#runy` → `#jak-dziala` → closing.
- Brak regresji: modal auth, thank-you, hero proof, proof Kontekst/Runy, CTA chrome — bez zmian zachowania poza nowymi linkami.
- **Bez** trzeciej palety; **bez** screenshotów w audience.

---

#### Propozycja commit message

```text
feat(landing): add audience section before value props

Surface who the product helps with three persona cards and chrome/footer anchors, matching the F-15 landing IA.
```

---

## Weryfikacja wycinka

| Kryterium | Jak sprawdzić |
|-----------|----------------|
| Pokrycie Fazy 25 | Sekcja przed wartościami; 3 persony; lead wartości; kotwica chrome+footer; bez screenshotów/palety |
| docs / SPEC | Zgodność z `docs/ux_dashboard.md` + F-15; Auth nietknięty |
| Pass rozwojowy | KROK 1 → KROK 2; brak przesunięć |
| Nagłówki | wyłącznie `FAZA` / `KROK` |
| Commit message | EN, Conventional Commits, na końcu FAZA 1 |
| Major | nietknięty w tej sesji |

---

## Ślad do major (informacyjnie, po implementacji)

| Element major | Po implementacji |
|---------------|------------------|
| Faza 25 | `WYKONANY` |
| MILESTONE 25 | **brak** — nic nie oznaczać `OSIĄGNIĘTY` |
| Faza 24 / 24.1 | bez zmian (`WYKONANY`) |

Edycja statusów major = poza tym feature planem (ręcznie lub w osobnej sesji `/feature-implementation` na życzenie użytkownika).
)
