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

export type LandingTech = {
  readonly name: string;
  readonly icon: string;
  /** Kolor marki — tylko gdy SVG jest monochrome (bez fillów w assetcie). */
  readonly color?: string;
};

export const LANDING_HERO_IMAGES = {
  desktop: {
    src: '/landing/hero-panel-desktop.png',
    width: 1440,
    height: 900,
    alt: 'Panel Content Chain - widok Konto z sidebarem i KPI',
  },
  narrow: {
    src: '/landing/hero-panel-narrow.png',
    width: 390,
    height: 844,
    alt: 'Panel Content Chain - widok Konto na wąskim viewporcie',
  },
} as const;

export const LANDING_CONTEXT_IMAGES = {
  desktop: {
    src: '/landing/hero-context-desktop.png',
    width: 1440,
    height: 900,
    alt: 'Panel Content Chain - widok Kontekst firmy z zakładkami i formularzem tożsamości',
  },
  narrow: {
    src: '/landing/hero-context-narrow.png',
    width: 390,
    height: 844,
    alt: 'Panel Content Chain - widok Kontekst firmy na wąskim viewporcie',
  },
} as const;

export const LANDING_RUNS_IMAGES = {
  desktop: {
    src: '/landing/hero-runs-desktop.png',
    width: 1440,
    height: 900,
    alt: 'Panel Content Chain - archiwum Runy z filtrami i listą statusów',
  },
  narrow: {
    src: '/landing/hero-runs-narrow.png',
    width: 390,
    height: 844,
    alt: 'Panel Content Chain - archiwum Runy na wąskim viewporcie',
  },
} as const;

export const LANDING_COPY = {
  brand: 'Content Chain',
  chromeNav: {
    features: 'Możliwości',
    context: 'Kontekst',
    runs: 'Runy',
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
  contextSection: {
    title: 'Kontekst firmy pod kontrolą',
    supporting: 'Tożsamość, oferta i głos marki w jednym miejscu - zanim agent zacznie pisać.',
  },
  runsSection: {
    title: 'Runy w jednym archiwum',
    supporting: 'Statusy, filtry i historia uruchomień - od briefu po zakończony wynik.',
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
  tech: [
    { name: 'NestJS', icon: 'logos:nestjs' },
    { name: 'Next.js', icon: 'logos:nextjs-icon' },
    { name: 'React', icon: 'logos:react' },
    { name: 'Tailwind', icon: 'logos:tailwindcss-icon' },
    { name: 'Prisma', icon: 'simple-icons:prisma', color: '#E2E2E2' },
    { name: 'LangGraph', icon: 'simple-icons:langgraph', color: '#00A67E' },
    { name: 'Docker', icon: 'logos:docker-icon' },
    { name: 'Jenkins', icon: 'logos:jenkins' },
  ] as const satisfies readonly LandingTech[],
  closing: {
    title: 'Gotowy wejść do panelu?',
    supporting: 'Zaloguj się albo załóż konto - formularze otwierają się w oknie dialogowym.',
  },
  footer: {
    blurb: '@2026 Content Chain. Wszelkie prawa zastrzeżone.',
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
