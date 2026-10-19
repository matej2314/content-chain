# Content Chain — feature plan: Landing `/` + modal auth (Faza 24)

**Kotwica major:** `content-chain-frontend_major_plan.md` — **Faza 24** (`NIE_ROZPOCZĘTY`) + **Krok 24.1** (`NIE_ROZPOCZĘTY`) — landing na anonimowym `/` + formularze auth w modalu; bootstrap CTA tylko na register; thank-you fullscreen w szablonie landingu; activate sukces = toast bez auto-modala / błąd = auto-open login; **KROK 8** = sekcje proof Kontekst + Runy (major 24.1).  
**Źródła:** `docs/ux_dashboard.md` („Strona główna — landing”; „Wejście”), `docs/brand_types.md` (akcent landingu = chrome primary; bez trzeciej palety), `SPEC-FRONTEND.md` F-4a / F-4b / F-8 / F-15, `SPEC-AUTH.md` A-1a (CTA bootstrap z powierzchni rejestracji), skill `content-chain-product-ui` (dziedziczenie locku Fazy 22 + stanów nav Fazy 23).  
**Skill UI:** `content-chain-product-ui` — Design Read: self-host dashboard for operator/admin, calm B2B product language, shadcn + Tailwind v4 + Iconify, dials VARIANCE 3–4 / MOTION 3–4 / DENSITY 7–8; landing dziedziczy trzy role akcentu (indigo chrome / CTA teal / nav teal wash) **bez** nowej palety.

**Statusy kroków feature:** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`

---

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Cała Faza 24 majoru FE (+ Krok 24.1) |
| Major | Faza 24 (gate); Krok 24.1 = **KROK 8** poniżej; HOW: KROK 1–8 |
| Poza zakresem | Usunięcie `apps/frontend/src/app/landing-mock` (robi użytkownik); zmiana endpointów / ról / bootstrap API; Playwright jako suite; MILESTONE 24; edycja backend major; przepisywanie Fazy 22 / 17 / 12 / 23 (`WYKONANY`); przepisywanie KROK 1–7 (`WYKONANY`); sync skilla poza DoD implementacji |
| Zależność BE | **Brak** (istniejący kontrakt Auth) |
| Pass rozwojowy | Historia KROK 1–7 bez przesunięć; **KROK 8** (24.1) po KROK 7 — pin assetów Kontekst/Runy + copy + montaż sekcji + chrome nav |
| Po implementacji (informacyjnie) | Major: Faza 24 → `WYKONANY`, Krok 24.1 → `WYKONANY` — **edycja major poza tym skillem**; **bez** `OSIĄGNIĘTY` (brak MILESTONE 24) |

**Refaktor względem:** Faza 22 / F-15 (historia: `/` = split-panel), Faza 17 / F-4a (bootstrap CTA na karcie logowania), Faza 12 (thank-you / activate jako powierzchnia karty). Cel: landing + modal; CTA admina tylko na register; thank-you / activate wg zaktualizowanego kanonu.

---

## Założenia

- Stack: Next.js **16.3** / React 19 / Tailwind v4 / shadcn Dialog / `@iconify/react` (już w `package.json`) — bez nowych paczek UI.
- Obrazy hero: lokalne pliki w `apps/frontend/public/landing/`; montaż przez `next/image` (ścieżka od root URL, np. `/landing/hero-panel-desktop.png`; `width` / `height` wymagane gdy nie `fill`; Context7 `/vercel/next.js` v16 — prop `preload` zamiast deprecated `priority` gdy potrzebny LCP).
- Typy: `AuthMode = 'login' \| 'register' \| 'bootstrap_admin'`; stany UI jako unie dyskryminowane (bez `any`).
- Formularze w modalu: **bez** zewnętrznego `Card` z tytułem marki (tytuł = `DialogTitle`); logika API / envelope **bez zmian**.
- `GuestView` w kodzie = widok anonimowy (landing + modal) — **nie** rola `guest`.
- Copy marketingowe **nie** pochodzi z major/docs — powstaje w **KROK 2** tego planu.
- Usunięcie mocka `/landing-mock` **poza** tym planem (użytkownik).

---

## FAZA 1 — Landing `/` + modal auth

### KROK 1 — Brief i utworzenie screenshotów hero (panel produktowy)

**Status:** `WYKONANY`

**Cel:** Dostarczyć **realne** zrzuty zalogowanego panelu jako proof w hero landingu (major Faza 24; `docs/ux_dashboard.md` — hero proof = asset, nie token CSS). Ten krok może wykonać **człowiek** albo **agent AI** — poniższy brief jest wspólny.

**Artefakty (wymagane pliki przed zamknięciem kroku):**

| Plik | Rola | Docelowy rozmiar kadru |
|------|------|------------------------|
| `apps/frontend/public/landing/hero-panel-desktop.png` | Główny proof w hero (desktop / `lg+`) | **1440×900** CSS px (viewport), PNG albo WebP równoważny zapisany jako `.png` tylko jeśli faktycznie PNG |
| `apps/frontend/public/landing/hero-panel-narrow.png` | Proof węższy pod mobile / `sm` (ten sam widok, inny viewport) | **390×844** CSS px |

Opcjonalnie (nie blokuje DoD, jeśli brak): trzeci plik nie jest wymagany.

#### Brief wizualny — co MUSI być na zrzucie (oba pliki, ten sam ekran)

1. **Trasa:** zalogowany widok **Konto** — URL `/account` (nie landing, nie login, nie Kontekst).
2. **Chrome dashboardu (drugi visual lock):**
   - ciemny **sidebar** z lewej + ciemny **main** (dark shell);
   - w sidebarze: logo-area **„Content Chain”**, lista pozycji (min. widoczne: Konto, Runy, Kontekst… wg roli);
   - pozycja **Konto** w stanie **active** Fazy 23: tekst muted, teal/mint wash L→R, inset ring, lewy pasek accent — **nie** solid indigo fill;
   - dół sidebara: slot chipów (Completeness; DemoChip tylko gdy demo on) — jeśli mieści się w kadrze, zostaw; nie wycinaj na siłę.
3. **Obszar `main` (Konto)** — w kadrze muszą być rozpoznawalne:
   - blok **KPI** (karty statystyk) **nad** sekcją startu, albo przynajmniej 2–4 karty KPI jeśli scroll ucina start;
   - nagłówek / sekcja **„Start runu”** albo fragment formularza briefu **albo** lista **„Moje runy”** z ≥1 wierszem (status badge-pill).
4. **Zakaz na zrzucie:**
   - pasek systemu / belka przeglądarki / DevTools / kursor „print screen” z watermarkiem;
   - jasny (light) theme, stock photo, mock CSS `ProductPreviewMock`, generowane „fake UI” bez prawdziwego DOM aplikacji;
   - nakładki marketingowe, stickery, blur zakrywający treść panelu;
   - dane wrażliwe: prawdziwe emaile klientów / sekrety — użyj konta lokalnego (np. `admin@…` / demo).
5. **Jakość:** ostre UI (1× CSS px ≈ 1–2 device px; unikać rozmazanego upscale); kompresja rozsądna (cel łącznie &lt; ~800 KB na oba pliki).

#### Procedura — wariant A (człowiek)

1. Uruchom lokalnie frontend + api z działającą sesją (bootstrap albo login).
2. Zaloguj się → `/account`. Upewnij się, że KPI / lista nie są w stanie „pusty skeleton” (jeśli lista pusta — OK, byle layout Konto + sidebar były czytelne).
3. Ustaw okno przeglądarki na **1440×900** (DevTools device toolbar albo rozmiar okna).
4. Zrób zrzut **viewportu** (nie full page). Wytnij belkę przeglądarki.
5. Zapisz jako `apps/frontend/public/landing/hero-panel-desktop.png`.
6. Ustaw viewport **390×844**, ten sam `/account`, zrzut → `hero-panel-narrow.png` (na mobile sidebar jest w sheet — **nie** otwieraj sheetu; pokaż header + treść Konto w dark shell, żeby widać produkt; jeśli UI wymaga otwartego sheetu by pokazać nav — otwórz sheet **tylko** na wąskim zrzucie i ujmij listę nav + fragment main).
7. Sprawdź checklistę „co MUSI być” powyżej.

#### Procedura — wariant B (agent AI)

1. Upewnij się, że `next dev` (frontend) i api odpowiadają lokalnie; masz credentials konta testowego (z `.env` / seed — **nie** commituj sekretów do planu ani logów).
2. Otwórz przeglądarkę narzędziową (Playwright / IDE browser): zaloguj się przez UI albo ustaw cookie sesji zgodnie z istniejącym flow aplikacji.
3. Nawiguj do `/account`. Ustaw viewport 1440×900 → `screenshot` → zapisz do ścieżki `apps/frontend/public/landing/hero-panel-desktop.png`.
4. Viewport 390×844 → drugi screenshot → `hero-panel-narrow.png`.
5. Zweryfikuj pliki na dysku (rozmiar &gt; 10 KB, wymiary sensowne) i checklistę wizualną (sidebar active teal, KPI/Konto widoczne).
6. **Nie** generuj obrazu z modelu diffusion jako zamiennika — źródło = raster z działającej aplikacji.

#### Pin ścieżek w kodzie (używane od KROK 3)

```ts
export const LANDING_HERO_IMAGES = {
  desktop: {
    src: '/landing/hero-panel-desktop.png',
    width: 1440,
    height: 900,
    alt: 'Panel Content Chain — widok Konto z sidebarem i KPI',
  },
  narrow: {
    src: '/landing/hero-panel-narrow.png',
    width: 390,
    height: 844,
    alt: 'Panel Content Chain — widok Konto na wąskim viewporcie',
  },
} as const;
```

(Stała może żyć w `landing-copy.ts` z KROK 2 albo osobnym `landing-hero-images.ts` — pin ścieżek **ten sam**.)

**Biblioteki:** brak nowych; tylko pliki w `public/`.

**Testy:** brak automatycznych. Smoke: oba pliki istnieją; otwarcie `/landing/hero-panel-desktop.png` w przeglądarce na `next dev` zwraca obraz.

**DoD (krok):**

- Oba pliki leżą pod pinowanymi ścieżkami.
- Zrzuty spełniają brief (Konto, dark shell, active nav ≠ solid indigo, bez belki przeglądarki).
- Brief jest wykonany przez człowieka **albo** agenta wg powyższych procedur — bez placeholderów „TODO screenshot”.

---

### KROK 2 — Uzupełnienie contentu tekstowego landing page

**Status:** `WYKONANY`

**Cel:** Spisać kanoniczny copy marketingowy landingu (PL) jako typed source-of-truth w kodzie — major Faza 24 / docs: copy = feature plan, nie major. Kotwica semantyczna: self-host, agenci contentowi, HITL, brief → wynik (spójnie z mockiem `/landing-mock`, **bez** słów „mock” / „podgląd layoutu”).

**Artefakty:**

- Nowy: `apps/frontend/src/modules/auth/landing/landing-copy.ts`

**Implementacja — pełny plik:**

```ts
export type LandingFeature = {
  readonly icon: string;
  readonly title: string;
  readonly body: string;
};

export type LandingStep = {
  readonly n: string;
  readonly title: string;
  readonly body: string;
};

export type LandingStat = {
  readonly label: string;
  readonly value: string;
};

export const LANDING_HERO_IMAGES = {
  desktop: {
    src: '/landing/hero-panel-desktop.png',
    width: 1440,
    height: 900,
    alt: 'Panel Content Chain — widok Konto z sidebarem i KPI',
  },
  narrow: {
    src: '/landing/hero-panel-narrow.png',
    width: 390,
    height: 844,
    alt: 'Panel Content Chain — widok Konto na wąskim viewporcie',
  },
} as const;

export const LANDING_COPY = {
  brand: 'Content Chain',
  chromeNav: {
    features: 'Możliwości',
    howItWorks: 'Jak działa',
  },
  cta: {
    login: 'Zaloguj się',
    register: 'Załóż konto',
  },
  hero: {
    eyebrow: 'Self-host · agenci contentowi · HITL',
    headlineBefore: 'Panel operatora do',
    headlineAccent: 'agentów contentowych',
    headlineAfter: ', bez zgadywania.',
    supporting:
      'Od briefu po przegląd wyniku. Jedna sesja, ciemny obszar roboczy i kontrola HITL w miejscach, gdzie decyzja należy do Ciebie.',
  },
  featuresSection: {
    title: 'Zbudowane pod realną pracę',
    supporting: 'Trzy sygnały wartości. Bez feature dump i bez dekoracyjnego bento.',
  },
  features: [
    {
      icon: 'mdi:file-document-outline',
      title: 'Od briefu do wyniku',
      body: 'Uruchamiasz agenta contentowego i dostajesz przeglądalny rezultat w jednym obszarze roboczym.',
    },
    {
      icon: 'mdi:hand-back-right-outline',
      title: 'HITL tam, gdzie trzeba',
      body: 'Decyzje krytyczne zostają u operatora. Agent pracuje, Ty zatwierdzasz w punktach kontroli.',
    },
    {
      icon: 'mdi:server-outline',
      title: 'Self-host, jedna sesja',
      body: 'Instancja pod Twoją kontrolą. Ciemny shell i spójna sesja od logowania po archiwum runów.',
    },
  ] as const satisfies readonly LandingFeature[],
  howSection: {
    title: 'Jak działa',
    supporting: 'Krótki rytm operatora: od briefu do decyzji HITL.',
  },
  steps: [
    { n: '01', title: 'Brief', body: 'Uzupełniasz kontekst i opisujesz zadanie.' },
    { n: '02', title: 'Run', body: 'Agent generuje treść w tle z czytelnym statusem.' },
    { n: '03', title: 'Przegląd', body: 'Oceniasz wynik, edytujesz lub finalizujesz.' },
    { n: '04', title: 'HITL', body: 'Wznawiasz tylko tam, gdzie decyzja należy do Ciebie.' },
  ] as const satisfies readonly LandingStep[],
  stats: [
    { label: 'Self-host', value: 'Twoja instancja' },
    { label: 'Kontrola', value: 'HITL w runie' },
    { label: 'Przepływ', value: 'Brief → wynik' },
    { label: 'Sesja', value: 'Jeden login' },
  ] as const satisfies readonly LandingStat[],
  closing: {
    title: 'Gotowy wejść do panelu?',
    supporting: 'Zaloguj się albo załóż konto — formularze otwierają się w oknie dialogowym.',
  },
  footer: {
    blurb: 'Self-hostowy dashboard do uruchamiania agentów contentowych — od briefu po przegląd wyniku.',
  },
  thankYou: {
    title: 'Sprawdź skrzynkę e-mail',
    bodyPrefix: 'Wysłaliśmy link aktywacyjny na',
    resendPrompt: 'Nie otrzymałeś wiadomości e-mail?',
    resend: 'Wyślij ponownie',
    resendPending: 'Wysyłanie…',
    resendOk: 'Wiadomość wysłana ponownie',
    backToLogin: 'Wróć do logowania',
  },
  authModal: {
    loginTitle: 'Zaloguj się',
    loginDescription: 'Wejdź do panelu operatora.',
    registerTitle: 'Załóż konto',
    registerDescription: 'Utwórz konto operatora.',
    bootstrapTitle: 'Zarejestruj admina',
    bootstrapDescription: 'Pierwsza instalacja. To konto zostanie administratorem.',
  },
} as const;
```

**Biblioteki:** brak.

**Testy:** brak. Smoke: import typed bez błędów TS.

**DoD (krok):**

- Plik `landing-copy.ts` istnieje; copy PL kompletny dla chrome / hero / features / steps / stats / closing / footer / thank-you / tytułów modala.
- Brak copy „MOCK” / „wariant B” / „usuń katalog landing-mock”.
- Stałe obrazów hero zgodne z KROK 1.

---

### KROK 3 — `LandingView`: chrome, hero (screenshoty), sekcje, footer

**Status:** `WYKONANY`

**Cel:** Powierzchnia marketingowa anonimowego `/` wg IA docs (sticky chrome, hero + proof, wartości, proces, footer) — major Faza 24 / F-15. **Bez** formularza auth obok treści.

**Artefakty:**

- Nowy: `apps/frontend/src/modules/auth/landing/landing-view.tsx`
- (Opcjonalnie baryłka) `apps/frontend/src/modules/auth/landing/index.ts` — re-export

**Implementacja — pełny plik `landing-view.tsx`:**

```tsx
'use client';

import Image from 'next/image';
import { Icon } from '@iconify/react';
import { Button } from '@/shared/ui/button';
import { LANDING_COPY, LANDING_HERO_IMAGES } from '@/modules/auth/landing/landing-copy';
import type { ReactNode } from 'react';

export type LandingViewProps = {
  readonly onOpenLogin: () => void;
  readonly onOpenRegister: () => void;
  readonly surface: 'marketing' | 'thank_you';
  readonly thankYou?: ReactNode;
};

export function LandingView({
  onOpenLogin,
  onOpenRegister,
  surface,
  thankYou,
}: LandingViewProps) {
  const copy = LANDING_COPY;

  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-background text-foreground">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_480px_at_15%_-10%,oklch(0.65_0.2_285_/_0.22),transparent_60%),radial-gradient(700px_420px_at_85%_10%,oklch(0.72_0.12_170_/_0.14),transparent_55%)]"
      />

      <div className="relative z-10">
        <header className="sticky top-0 z-40 border-b border-border/80 bg-background/75 backdrop-blur-md">
          <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
            <a href="#top" className="text-sm font-semibold tracking-tight">
              {copy.brand}
            </a>
            <nav className="hidden items-center gap-5 text-sm text-muted-foreground md:flex">
              <a href="#mozliwosci" className="transition-colors hover:text-foreground">
                {copy.chromeNav.features}
              </a>
              <a href="#jak-dziala" className="transition-colors hover:text-foreground">
                {copy.chromeNav.howItWorks}
              </a>
            </nav>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="hidden sm:inline-flex"
                onClick={onOpenLogin}
              >
                {copy.cta.login}
              </Button>
              <Button type="button" size="sm" onClick={onOpenRegister}>
                {copy.cta.register}
              </Button>
            </div>
          </div>
        </header>

        {surface === 'thank_you' ? (
          <main id="top" className="mx-auto flex max-w-lg flex-col gap-6 px-4 py-14 sm:px-6">
            {thankYou}
          </main>
        ) : (
          <main id="top">
            <section className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6 lg:py-14">
              <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
                <p className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground">
                  <span
                    aria-hidden
                    className="size-1.5 rounded-full shadow-[0_0_0_3px_oklch(0.72_0.12_170_/_0.25)]"
                    style={{ background: 'linear-gradient(135deg, #39a185, #63b8a3)' }}
                  />
                  {copy.hero.eyebrow}
                </p>
                <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                  {copy.hero.headlineBefore}{' '}
                  <span className="bg-[linear-gradient(135deg,#63b8a3_0%,var(--primary)_100%)] bg-clip-text text-transparent">
                    {copy.hero.headlineAccent}
                  </span>
                  {copy.hero.headlineAfter}
                </h1>
                <p className="max-w-[46ch] font-[family-name:var(--font-secondary)] text-base leading-relaxed text-muted-foreground">
                  {copy.hero.supporting}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Button type="button" size="lg" onClick={onOpenLogin}>
                    {copy.cta.login}
                  </Button>
                  <Button type="button" variant="outline" size="lg" onClick={onOpenRegister}>
                    {copy.cta.register}
                  </Button>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-xl border border-border shadow-[0_24px_80px_-32px_oklch(0.65_0.2_285_/_0.55)]">
                <Image
                  src={LANDING_HERO_IMAGES.desktop.src}
                  alt={LANDING_HERO_IMAGES.desktop.alt}
                  width={LANDING_HERO_IMAGES.desktop.width}
                  height={LANDING_HERO_IMAGES.desktop.height}
                  className="hidden h-auto w-full sm:block"
                  sizes="(min-width: 640px) min(72rem, 100vw), 100vw"
                  preload
                />
                <Image
                  src={LANDING_HERO_IMAGES.narrow.src}
                  alt={LANDING_HERO_IMAGES.narrow.alt}
                  width={LANDING_HERO_IMAGES.narrow.width}
                  height={LANDING_HERO_IMAGES.narrow.height}
                  className="h-auto w-full sm:hidden"
                  sizes="100vw"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {copy.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-lg border border-border/80 bg-card/40 px-3 py-2.5"
                  >
                    <p className="text-[11px] text-muted-foreground">{stat.label}</p>
                    <p className="mt-1 text-sm font-medium">{stat.value}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="mozliwosci" className="border-t border-border/60">
              <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
                <div className="mb-8 max-w-lg">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    {copy.featuresSection.title}
                  </h2>
                  <p className="mt-2 font-[family-name:var(--font-secondary)] text-sm text-muted-foreground">
                    {copy.featuresSection.supporting}
                  </p>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {copy.features.map((feature) => (
                    <div
                      key={feature.title}
                      className="rounded-xl border border-border bg-card/50 p-5 transition-colors duration-200 hover:bg-card"
                    >
                      <Icon icon={feature.icon} className="size-5 text-primary" aria-hidden />
                      <h3 className="mt-3 text-base font-semibold">{feature.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {feature.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="jak-dziala" className="border-t border-border/60">
              <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
                <div className="mb-8 max-w-lg">
                  <h2 className="text-2xl font-semibold tracking-tight">{copy.howSection.title}</h2>
                  <p className="mt-2 font-[family-name:var(--font-secondary)] text-sm text-muted-foreground">
                    {copy.howSection.supporting}
                  </p>
                </div>
                <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {copy.steps.map((step) => (
                    <li key={step.n} className="rounded-xl border border-border bg-background/40 p-4">
                      <p className="font-mono text-xs text-primary">{step.n}</p>
                      <p className="mt-2 text-sm font-semibold">{step.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{step.body}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            <section className="border-t border-border/60">
              <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-14 sm:flex-row sm:items-center sm:px-6">
                <div className="max-w-md">
                  <h2 className="text-2xl font-semibold tracking-tight">{copy.closing.title}</h2>
                  <p className="mt-2 font-[family-name:var(--font-secondary)] text-sm text-muted-foreground">
                    {copy.closing.supporting}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button type="button" size="lg" onClick={onOpenLogin}>
                    {copy.cta.login}
                  </Button>
                  <Button type="button" variant="outline" size="lg" onClick={onOpenRegister}>
                    {copy.cta.register}
                  </Button>
                </div>
              </div>
            </section>
          </main>
        )}

        <footer className="border-t border-border/60">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <p className="font-semibold text-foreground">{copy.brand}</p>
              <p className="mt-1 max-w-sm">{copy.footer.blurb}</p>
            </div>
            <div className="flex gap-4">
              <a href="#mozliwosci" className="hover:text-foreground">
                {copy.chromeNav.features}
              </a>
              <a href="#jak-dziala" className="hover:text-foreground">
                {copy.chromeNav.howItWorks}
              </a>
              <button type="button" className="hover:text-foreground" onClick={onOpenLogin}>
                {copy.cta.login}
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
```

**Biblioteki:** `next/image` (Context7 Next 16: lokalne `/…` z `public/`; `preload` dla LCP desktop). Iconify już w projekcie.

**Testy:** brak. Smoke: landing renderuje się bez split-panel; hero pokazuje screenshoty; CTA wołają callbacki.

**DoD (krok):**

- `LandingView` montuje copy z KROK 2 i obrazy z KROK 1.
- Brak formularza auth w layoucie landingu; brak `GuestBrandPanel` / split-panel.
- Surface `thank_you` = chrome landingu + slot (bez nowego URL).

---

### KROK 4 — Refaktor formularzy: bootstrap CTA na register + formy pod Dialog

**Status:** `WYKONANY`

**Cel:** Przenieść CTA „Zarejestruj admina” z logowania na rejestrację (`available === true`); usunąć zewnętrzny `Card` z tytułem marki (tytuł przejmuje modal). Refaktor względem Fazy 17 / obecnego `LoginCard`. Kotwica: F-4a / A-1a / docs „Wejście”.

**Artefakty:**

- Zmiana: `login-card.tsx`, `register-form.tsx`, `bootstrap-admin-form.tsx`, `registration-thank-you.tsx`

**Implementacja — `LoginCard` (fragmenty `teraz` → `zamień na`):**

**Props — teraz:**

```ts
type LoginCardProps = {
  readonly bootstrapAvailable: boolean;
  readonly onGoRegister?: () => void;
  readonly onGoBootstrapAdmin?: () => void;
  readonly successHint?: string | null;
  readonly activationError?: string | null;
};
```

**Props — zamień na:**

```ts
type LoginCardProps = {
  readonly onGoRegister?: () => void;
  readonly successHint?: string | null;
  readonly activationError?: string | null;
};
```

**Usuń** z destrukturyzacji i JSX: `bootstrapAvailable`, `onGoBootstrapAdmin` oraz cały blok przycisku „Zarejestruj admina”.

**Shell — teraz:** opakowanie `Card` / `CardHeader` / `CardTitle` „Content Chain” + `CardContent`.

**Shell — zamień na:** sam `<form className="flex flex-col gap-4" …>` (bez `Card`); zachowaj pola, envelope, CTA submit, outline „Nie masz konta? Zarejestruj się!”, `successHint`, `activationError`.

**Implementacja — `RegisterForm`:**

**Props — dodaj:**

```ts
type RegisterFormProps = {
  readonly onSuccess: (result: RegisterSuccess) => void;
  readonly onBackToLogin: () => void;
  readonly bootstrapAvailable?: boolean;
  readonly onGoBootstrapAdmin?: () => void;
};
```

**Po przycisku „Mam już konto — zaloguj się” — dopisz:**

```tsx
{bootstrapAvailable ? (
  <Button
    type="button"
    variant="outline"
    className="w-full"
    disabled={onGoBootstrapAdmin === undefined}
    onClick={onGoBootstrapAdmin}
  >
    Zarejestruj admina
  </Button>
) : null}
```

**Shell:** jak Login — **usuń** `Card` / tytuł marki; zostaw formę.

**Implementacja — `BootstrapAdminForm`:** usuń `Card` / tytuł marki; zostaw formę + „Wróć do logowania” (`onBackToLogin` — w orkiestracji może wracać do `login` albo `register`; domyślnie `login` jak dziś, HomeEntry może podać powrót do register).

**Implementacja — `RegistrationThankYou`:**

- Usuń `Card`; użyj copy z `LANDING_COPY.thankYou` (import).
- Layout: nagłówek + body z emailem + resend + błąd + CTA „Wróć do logowania” (otwiera modal login — callback bez zmiany semantyki API).

**Kolejność w kroku:** najpierw props Login/Register, potem strip Card, potem thank-you copy.

**Biblioteki:** brak.

**Testy:** brak. Smoke: na register widać „Zarejestruj admina” iff bootstrap available; na login **brak** tego CTA; submit login nadal tylko `POST /auth/login`.

**DoD (krok):**

- Bootstrap CTA **tylko** na register gdy `available === true`.
- Zakaz mode-hijack zachowany.
- Formularze renderują się bez podwójnego chrome marki (gotowe pod Dialog).

---

### KROK 5 — `AuthModal`: Dialog + trzy tryby

**Status:** `WYKONANY`

**Cel:** Jedna powierzchnia modalna dla `login` \| `register` \| `bootstrap_admin` (desktop = mobile). Kotwica: F-15 / F-4a.

**Artefakty:**

- Nowy: `apps/frontend/src/modules/auth/components/auth-modal.tsx`

**Implementacja — pełny plik:**

```tsx
'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { BootstrapAdminForm } from '@/modules/auth/components/bootstrap-admin-form';
import { LoginCard } from '@/modules/auth/components/login-card';
import {
  RegisterForm,
  type RegisterSuccess,
} from '@/modules/auth/components/register-form';
import { LANDING_COPY } from '@/modules/auth/landing/landing-copy';

export type AuthMode = 'login' | 'register' | 'bootstrap_admin';

export type AuthModalProps = {
  readonly open: boolean;
  readonly mode: AuthMode;
  readonly onOpenChange: (open: boolean) => void;
  readonly onModeChange: (mode: AuthMode) => void;
  readonly bootstrapAvailable: boolean;
  readonly successHint?: string | null;
  readonly activationError?: string | null;
  readonly onRegisterSuccess: (result: RegisterSuccess) => void;
};

function titleFor(mode: AuthMode): string {
  if (mode === 'login') return LANDING_COPY.authModal.loginTitle;
  if (mode === 'register') return LANDING_COPY.authModal.registerTitle;
  return LANDING_COPY.authModal.bootstrapTitle;
}

function descriptionFor(mode: AuthMode): string {
  if (mode === 'login') return LANDING_COPY.authModal.loginDescription;
  if (mode === 'register') return LANDING_COPY.authModal.registerDescription;
  return LANDING_COPY.authModal.bootstrapDescription;
}

export function AuthModal({
  open,
  mode,
  onOpenChange,
  onModeChange,
  bootstrapAvailable,
  successHint = null,
  activationError = null,
  onRegisterSuccess,
}: AuthModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" showCloseButton>
        <DialogHeader className="pr-8">
          <DialogTitle className="text-xl font-semibold">{titleFor(mode)}</DialogTitle>
          <DialogDescription>{descriptionFor(mode)}</DialogDescription>
        </DialogHeader>

        {mode === 'login' ? (
          <LoginCard
            onGoRegister={() => onModeChange('register')}
            successHint={successHint}
            activationError={activationError}
          />
        ) : null}

        {mode === 'register' ? (
          <RegisterForm
            onSuccess={onRegisterSuccess}
            onBackToLogin={() => onModeChange('login')}
            bootstrapAvailable={bootstrapAvailable}
            onGoBootstrapAdmin={() => onModeChange('bootstrap_admin')}
          />
        ) : null}

        {mode === 'bootstrap_admin' ? (
          <BootstrapAdminForm onBackToLogin={() => onModeChange('register')} />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
```

**Biblioteki:** istniejący kit `Dialog` (Radix via shadcn).

**Testy:** brak. Smoke: open/close; przełączanie trybów; bootstrap CTA tylko w register.

**DoD (krok):**

- Modal niesie trzy tryby; ten sam model desktop/mobile.
- Tytuły z `LANDING_COPY.authModal`.
- Brak Toastera wewnątrz modala.

---

### KROK 6 — Orkiestracja `HomeEntry`: landing + modal + thank-you + activate

**Status:** `WYKONANY`

**Cel:** Zastąpić split-panel orkiestracją zgodną z F-4a / F-4b / F-15: domyślnie landing (modal zamknięty); CTA otwierają modal; thank-you fullscreen w szablonie landingu; activate sukces = toast **bez** auto-modala; activate błąd = auto-open login + ogólny komunikat; zalogowany → `/account`.

**Artefakty:**

- Zmiana: `apps/frontend/src/modules/auth/components/home-entry.tsx`
- `apps/frontend/src/app/page.tsx` — bez zmian (nadal `<HomeEntry />`), o ile nie trzeba Suspense edge-case.

**Implementacja — stan (unia):**

```ts
type GuestSurface =
  | { readonly kind: 'landing' }
  | { readonly kind: 'thank_you'; readonly email: string };

type AuthUi = {
  readonly open: boolean;
  readonly mode: AuthMode;
  readonly successHint: string | null;
  readonly activationError: string | null;
};
```

**Zachowanie (mapowanie):**

| Zdarzenie | Efekt |
|-----------|--------|
| Mount anonymous, brak `activationToken` | `surface=landing`, `auth.open=false` |
| CTA „Zaloguj się” | `open=true`, `mode=login` |
| CTA „Załóż konto” | `open=true`, `mode=register` |
| Register `pending` | `auth.open=false`, `surface=thank_you` |
| Register `ready` (poza prod) | `open=true`, `mode=login`, `successHint=…` |
| Activate sukces | toast `Konto aktywowane!…`, **nie** otwieraj modala, `router.replace('/')` jak dziś |
| Activate błąd | `open=true`, `mode=login`, `activationError=ACTIVATION_FAILED_HINT` |
| Thank-you „Wróć do logowania” | `surface=landing`, `open=true`, `mode=login` |
| Authenticated | `router.replace('/account')` (bez zmian) |
| Po invite accept (powrót na `/`) | landing, modal **nie** auto |

**Fragment — usunąć:** cały `GuestBrandPanel`, layout `flex` split-panel, bezpośredni montaż `LoginCard` / `RegisterForm` / `BootstrapAdminForm` / `RegistrationThankYou` jako jedyna treść strony.

**Fragment — zamień na (szkic orkiestracji):**

```tsx
return (
  <>
    <Toaster />
    <LandingView
      surface={surface.kind === 'thank_you' ? 'thank_you' : 'marketing'}
      onOpenLogin={() =>
        setAuth({ open: true, mode: 'login', successHint: null, activationError: null })
      }
      onOpenRegister={() =>
        setAuth({ open: true, mode: 'register', successHint: null, activationError: null })
      }
      thankYou={
        surface.kind === 'thank_you' ? (
          <RegistrationThankYou
            email={surface.email}
            onBackToLogin={() => {
              setSurface({ kind: 'landing' });
              setAuth({
                open: true,
                mode: 'login',
                successHint: null,
                activationError: null,
              });
            }}
          />
        ) : undefined
      }
    />
    <AuthModal
      open={auth.open}
      mode={auth.mode}
      onOpenChange={(open) => setAuth((prev) => ({ ...prev, open }))}
      onModeChange={(mode) =>
        setAuth((prev) => ({
          ...prev,
          mode,
          successHint: null,
          activationError: null,
        }))
      }
      bootstrapAvailable={bootstrapAvailable}
      successHint={auth.successHint}
      activationError={auth.activationError}
      onRegisterSuccess={(result) => {
        if (result.kind === 'pending') {
          setAuth((prev) => ({ ...prev, open: false }));
          setSurface({ kind: 'thank_you', email: result.email });
          return;
        }
        setSurface({ kind: 'landing' });
        setAuth({
          open: true,
          mode: 'login',
          successHint: 'Konto utworzone. Możesz się zalogować.',
          activationError: null,
        });
      }}
    />
  </>
);
```

**Activate `useEffect` — zmiana gałęzi sukcesu/błędu:**

- Sukces: wyłącznie `notifyProduct({ kind: 'success', title: 'Konto aktywowane! Możesz się zalogować.', id: 'account-activated' })` — **bez** `setAuth` open.
- Błąd: `setAuth({ open: true, mode: 'login', activationError: ACTIVATION_FAILED_HINT, successHint: null })`.

**Loading / authenticated:** zamiast split-panel skeleton — prosty `min-h-dvh` + skeleton **albo** ten sam `LandingView` z disabled CTA (preferuj lekki skeleton pełnoekranowy bez brand panelu, by nie flashować landingu przed redirectem).

**Eksport typu `GuestView`:** jeśli używany poza plikiem — zastąp / zawęż do nowych typów; w przeciwnym razie usuń stary eksport.

**Biblioteki:** istniejące (`notifyProduct`, `Toaster` na landingu — wyjątek F-4b).

**Testy:** brak automatycznych. Smoke checklist w „Weryfikacja wycinka”.

**DoD (krok):**

- Anonimowe `/` = landing; formularze tylko w modalu.
- Bootstrap CTA tylko z register w modalu.
- Thank-you w szablonie landingu; activate sukces bez auto-modala; błąd z auto-open login.
- Zalogowany → `/account`; po invite → landing bez auto-modala.
- Split-panel / `GuestBrandPanel` usunięte z ścieżki `/`.

---

### KROK 7 — Hero: tech badges (Iconify) zamiast `stats`, nad screenshotem

**Status:** `WYKONANY`

**Refaktor względem:** **KROK 2** (`LANDING_COPY.stats` / `LandingStat`) oraz **KROK 3** (grid `stats` **pod** pierwszym zrzutem hero) — oba `WYKONANY`. Cel: w hero, **nad** pierwszym screenshotem, zamiast kart label/value pokazać spokojny rząd **badge’y technologii** (logotyp Iconify + nazwa). Treść KROK 2 / 3 **nie** jest przepisywana — pozostaje historią HOW; ten krok jest nowym elementem z jawnym odniesieniem.

**Cel:** Uściślić kompozycję hero w granicach IA docs/SPEC (F-15: chrome → hero z proofem → sekcje → footer) **bez** zmiany docs / SPEC / majoru. Proof (realne PNG) i CTA hero **bez zmian** semantycznych.

**Poza zakresem kroku:** zmiana `docs/` / `spec/` / majoru; wyjątek w skillu `content-chain-product-ui`; nowe paczki ikon; ściana „Trusted by” / logo wall; usuwanie / przenoszenie screenshotów poza hero.

**Artefakty:**

- Zmiana: `apps/frontend/src/modules/auth/landing/landing-copy.ts`
- Zmiana: `apps/frontend/src/modules/auth/landing/landing-view.tsx`

**Implementacja — copy (`landing-copy.ts`):**

1. Usuń (lub przestań eksportować jako kanon) typ `LandingStat` oraz tablicę `stats`.
2. Dodaj typed źródło badge’y, np.:

```ts
export type LandingTech = {
  readonly name: string;
  readonly icon: string; // Iconify collection:icon, np. 'simple-icons:nextdotjs'
};

// w LANDING_COPY:
tech: [
  { name: 'Next.js', icon: 'simple-icons:nextdotjs' },
  { name: 'NestJS', icon: 'simple-icons:nestjs' },
  { name: 'React', icon: 'simple-icons:react' },
  { name: 'Tailwind', icon: 'simple-icons:tailwindcss' },
  { name: 'Prisma', icon: 'simple-icons:prisma' },
  { name: 'LangGraph', icon: 'simple-icons:langchain' },
] as const satisfies readonly LandingTech[],
```

3. Lista nazw / ikon = stack monorepo (dostosuj przy implementacji, jeśli dokładniejsza lista jest oczywista z `package.json` / docs) — **bez** marketingowego „trusted by”.
4. Logotypy **wyłącznie** przez `@iconify/react` (`Icon` + `icon={…}`) — **zakaz** lokalnych SVG/PNG logotypów i nowej biblioteki ikon. Paczka już w `apps/frontend/package.json`.

**Implementacja — widok (`landing-view.tsx`):**

1. W sekcji hero (ta sama `section` co headline + CTA + screenshot): renderuj rząd badge’y **po** grupie CTA, **przed** kontenerem `next/image` (pierwszy zrzut).
2. Usuń grid `copy.stats.map(…)` z pozycji **pod** screenshotem.
3. Forma badge’a: ikona (`Icon` z `@iconify/react`, `aria-hidden`) + tekst `name`; spokojny rytm (np. `flex flex-wrap` + gap); border / tło z tokenów istniejącego locku — **bez** trzeciej palety; **bez** kart KPI-style jako dominanty.
4. `surface === 'thank_you'`: bez zmian (badge’e tylko na powierzchni marketingowej, jak dotychczasowy blok `stats`).

**Biblioteki:** wyłącznie istniejące `@iconify/react` — **bez** `npm install`.

**Testy:** brak automatycznych. Smoke: badge’e widoczne nad desktop/narrow screenshotem; ikony ładują się z Iconify; brak starego grida `stats` pod obrazem.

**DoD (krok):**

- `LANDING_COPY` niesie `tech` (nazwa + string Iconify); brak kanonicznego użycia `stats` / `LandingStat` w `LandingView`.
- Badge’e renderują się **nad** pierwszym zrzutem hero; screenshoty i CTA hero bez regresji.
- Logotypy = `@iconify/react` — zero lokalnych assetów logo tech, zero nowej paczki ikon.
- IA F-15 / docs (chrome, hero+proof, sekcje, footer) zachowana; **bez** edycji docs / SPEC / majoru w tym kroku.

#### Propozycja commit message (ten krok)

```text
feat(landing): replace hero stats with Iconify tech badges

Show a calm stack row (icon + name) above the product screenshot
instead of the label/value stats grid under the hero image.
```

#### Propozycja commit message (cała FAZA 1 — KROK 1–6; historia)

```text
feat(auth): replace home split-panel with landing and auth modal

Anonymous `/` becomes a marketing landing; login, register, and bootstrap
admin open in a dialog, with bootstrap CTA only on register and thank-you
inside the landing chrome.
```

### KROK 8 — Sekcje proof Kontekst + Runy (major Krok 24.1)

**Status:** `WYKONANY`

**Mapowanie major:** **Krok 24.1** (`content-chain-frontend_major_plan.md`) — 1:1.

**Refaktor względem:** **KROK 1–3** / **KROK 7** (`WYKONANY` — hero = wyłącznie `hero-panel-*` + tech badges; sekcje wartości / procesu bez dodatkowych proofów produktowych). Cel: po „Możliwościach”, przed „Jak działa”, dodać dwie **wyśrodkowane** sekcje product-proof (Kontekst → Runy) z gotowymi PNG + copy + kotwicami chrome. Treść KROKÓW 1–7 **nie** jest przepisywana — pozostaje historią HOW.

**Cel:** Uzupełnić IA landingu o dowód drugiej i trzeciej powierzchni panelu (Kontekst firmy, Runy) bez zmiany Auth / modala / thank-you / activate i bez trzeciej palety.

**Poza zakresem kroku:** nowe screenshoty (assetów już nie brakuje); split naprzemienny; CTA auth wewnątrz sekcji showcase; edycja docs / SPEC (chyba że osobna dyspozycja); zmiana hero Konto / tech badges / modal.

**Artefakty:**

- Zmiana: `apps/frontend/src/modules/auth/landing/landing-copy.ts`
- Zmiana: `apps/frontend/src/modules/auth/landing/landing-view.tsx`
- (Bez zmian ścieżek plików) assety już obecne:
  - `apps/frontend/public/landing/hero-context-desktop.png` / `hero-context-narrow.png` (1440×900 / 390×844)
  - `apps/frontend/public/landing/hero-runs-desktop.png` / `hero-runs-narrow.png` (1440×900 / 390×844)

**Implementacja — copy / pin obrazów (`landing-copy.ts`):**

1. Rozszerz stałe obrazów (obok `LANDING_HERO_IMAGES` albo jedna mapa `LANDING_PRODUCT_IMAGES`) o piny:

```ts
export const LANDING_CONTEXT_IMAGES = {
  desktop: {
    src: '/landing/hero-context-desktop.png',
    width: 1440,
    height: 900,
    alt: 'Panel Content Chain — widok Kontekst firmy z zakładkami i formularzem tożsamości',
  },
  narrow: {
    src: '/landing/hero-context-narrow.png',
    width: 390,
    height: 844,
    alt: 'Panel Content Chain — widok Kontekst firmy na wąskim viewporcie',
  },
} as const;

export const LANDING_RUNS_IMAGES = {
  desktop: {
    src: '/landing/hero-runs-desktop.png',
    width: 1440,
    height: 900,
    alt: 'Panel Content Chain — archiwum Runy z filtrami i listą statusów',
  },
  narrow: {
    src: '/landing/hero-runs-narrow.png',
    width: 390,
    height: 844,
    alt: 'Panel Content Chain — archiwum Runy na wąskim viewporcie',
  },
} as const;
```

2. Dopisz copy chrome + sekcji (PL), np.:

```ts
chromeNav: {
  features: 'Możliwości',
  context: 'Kontekst',
  runs: 'Runy',
  howItWorks: 'Jak działa',
},
contextSection: {
  title: 'Kontekst firmy pod kontrolą',
  supporting:
    'Tożsamość, oferta i głos marki w jednym miejscu — zanim agent zacznie pisać.',
},
runsSection: {
  title: 'Runy w jednym archiwum',
  supporting:
    'Statusy, filtry i historia uruchomień — od briefu po zakończony wynik.',
},
```

3. Eksport typów / stałych spójny z istniejącym `landing-copy.ts` (bez `any`).

**Implementacja — widok (`landing-view.tsx`):**

1. **Chrome nav** (`md+` oraz footer links): dodaj kotwice `<a href="#kontekst">` / `<a href="#runy">` z copy `chromeNav.context` / `chromeNav.runs` (kolejność: Możliwości → Kontekst → Runy → Jak działa).
2. **Kolejność w `main` (marketing):** hero (Konto + tech) → `#mozliwosci` → **`#kontekst`** → **`#runy`** → `#jak-dziala` → closing.
3. Każda sekcja showcase = **wyśrodkowana** kolumna (`text-center` + `mx-auto`): H2 + jedno supporting → kontener `next/image` w tym samym „frame” co hero (border / radius / shadow z tokenów locku). Desktop `sm+` = `*-desktop.png`; narrow = `*-narrow.png` (`hidden` / `sm:block` jak hero). **Bez** `preload` na tych obrazach (LCP zostaje przy hero Konto).
4. `surface === 'thank_you'`: bez sekcji showcase (jak dotychczas — tylko thank-you w chrome).
5. **Bez** nowych paczek; **bez** lokalnych SVG logo; Auth / modal nietknięte.

**Testy:** brak automatycznych. Smoke: obie sekcje widoczne w kolejności Kontekst → Runy; kotwice scrollują; desktop/narrow przełączają assety; hero + tech badges bez regresji.

**DoD (krok):**

- `LANDING_*_IMAGES` pinują cztery pliki Kontekst/Runy; copy sekcji + chrome nav w `LANDING_COPY`.
- `LandingView` montuje dwie wyśrodkowane sekcje po możliwościach / przed procesem; chrome + footer mają kotwice `#kontekst` / `#runy`.
- Mapowanie 1:1 na major **Krok 24.1**; **bez** edycji docs / SPEC w tym kroku; KROK 1–7 nietknięte jako historia.
- Brak regresji: hero Konto, tech badges, CTA, modal, thank-you.

#### Propozycja commit message (ten krok)

```text
feat(landing): add centered Context and Runs proof sections

Show real product screenshots for company context and runs archive
below the features block, with chrome nav anchors to each section.
```

---

## Weryfikacja wycinka

| Kryterium | Oczekiwanie |
|-----------|-------------|
| Docs / SPEC | Landing + modal; bootstrap na register; thank-you fullscreen; activate toast / auto-open — `ux_dashboard` + F-4a / F-4b / F-8 / F-15 + A-1a |
| Major Faza 24 | HOW pokrywa gate; Krok 24.1 ↔ KROK 8; bez MILESTONE 24 |
| Assety | Realne PNG: `hero-panel-*` (hero) + `hero-context-*` + `hero-runs-*` (sekcje) |
| Kod | Nowe: `landing-copy`, `landing-view`, `auth-modal`; refaktor form + `home-entry`; **KROK 7:** tech badges; **KROK 8:** sekcje Kontekst/Runy + kotwice |
| Product-ui | Dziedziczenie locku 22/23; bez trzeciej palety; Design Read |
| Pass rozwojowy | Historia 1–7; potem KROK 8 (24.1) |
| Nagłówki | Wyłącznie `FAZA` / `KROK`; commit message EN: historia + osobne pod KROK 7 / 8 |
| Plany pomocnicze | Brak odwołań do plików `*-plan.md` w rootcie |

**Checklist smoke (po implementacji, poza tą sesją):**

1. Anonymous `/`: landing, modal zamknięty; brak formularza obok treści.
2. „Zaloguj się” / „Załóż konto” (chrome, hero, closing, footer) otwierają właściwy tryb modala.
3. Przy `bootstrap-status.available === true`: CTA admina **tylko** na register; **brak** na login.
4. Login submit → zawsze `/auth/login` (nie bootstrap).
5. Register pending → zamknięcie modala + thank-you w chrome landingu + resend.
6. `/?activationToken=…` sukces → toast, modal zamknięty; błąd → modal login + ogólny komunikat.
7. Zalogowany na `/` → `/account`.
8. Hero pokazuje realne screenshoty (desktop + narrow), nie mock CSS.
9. Mobile: ten sam modal (nie „tylko formularz na pełnym ekranie” jako jedyna treść `/`).
10. Hero: rząd tech badges (Iconify + nazwa) **nad** pierwszym zrzutem; brak grida `stats` pod obrazem.
11. Po „Możliwościach”: sekcja Kontekst (`hero-context-*`), potem Runy (`hero-runs-*`) — wyśrodkowane; przed „Jak działa”.
12. Chrome (i footer) linkują `#kontekst` / `#runy`; scroll ląduje na właściwej sekcji.

---

## Ślad do major (informacyjnie — poza tym skillem)

| Pozycja major | Po implementacji DoD |
|---------------|----------------------|
| Faza 24 | `WYKONANY` |
| Krok 24.1 | `WYKONANY` (po DoD KROK 8) |
| MILESTONE 24 | **nie istnieje** — nic nie oznaczać `OSIĄGNIĘTY` |
| Faza 22 / 17 / 12 / 23 | bez zmian (historia) |

Ten plik **nie** edytuje majoru, docs ani SPEC w trakcie `/feature-implementation`. Implementacja kodu = osobna, ręczna sesja (np. `/feature-implementation`).
