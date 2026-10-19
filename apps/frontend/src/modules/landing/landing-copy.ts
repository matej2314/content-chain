export type LandingFeature = {
  readonly icon: string;
  readonly title: string;
  readonly body: string;
};

export type LandingPersona = {
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
    audience: 'Dla kogo',
    features: 'Co zyskujesz',
    context: 'Kontekst marki',
    runs: 'Runy',
    howItWorks: 'Proces',
  },
  cta: {
    login: 'Zaloguj się',
    register: 'Załóż konto',
  },
  hero: {
    eyebrow: 'Self-hosted AI workspace dla zespołów contentowych',
    headlineBefore: 'Twórz content z agentami, którzy znają',
    headlineAccent: 'Twoją firmę',
    headlineAfter: '.',
    supporting:
      'Content Chain prowadzi od briefu do gotowego wyniku: pomysłów, postów, scenariuszy rolek i copy stron. Agent pracuje na Twoim kontekście marki, a człowiek zatwierdza kluczowe decyzje przed finalizacją.',
  },
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
  featuresSection: {
    title: 'Co zyskuje zespół',
    supporting:
      'Mniej pustych briefów, mniej ręcznego przepisywania i więcej kontroli nad tym, co trafia do publikacji.',
  },
  contextSection: {
    title: 'Kontekst firmy jako źródło prawdy',
    supporting:
      'Zapisz tożsamość marki, ofertę, język komunikacji i odbiorców, żeby każdy run startował z tym samym zestawem założeń.',
  },
  runsSection: {
    title: 'Każdy run zostaje w historii',
    supporting:
      'Śledź statusy, wracaj do wyników, filtruj archiwum i uruchamiaj nowe zadania na podstawie sprawdzonych briefów.',
  },
  features: [
    {
      icon: 'mdi:file-document-outline',
      title: 'Od briefu do gotowego materiału',
      body: 'Uruchamiasz agenta dla konkretnego zadania: pomysłów na posty, treści, rolek albo copy strony. Wynik trafia do jednego, czytelnego widoku.',
    },
    {
      icon: 'mdi:hand-back-right-outline',
      title: 'Decyzje człowieka w kluczowych momentach',
      body: 'Agent może proponować kierunek, ale wybór outline’u, pomysłów i finalna akceptacja zostają po stronie operatora.',
    },
    {
      icon: 'mdi:server-outline',
      title: 'Instancja pod Twoją kontrolą',
      body: 'Self-hosted panel pozwala pracować na własnym kontekście firmy, historii runów i konfiguracji bez oddawania procesu zewnętrznemu narzędziu SaaS.',
    },
  ] as const satisfies readonly LandingFeature[],
  howSection: {
    title: 'Od briefu do publikowalnego materiału',
    supporting:
      'Prosty proces dla zespołu: ustaw kontekst, uruchom agenta, podejmij decyzję i wróć do wyniku, kiedy będzie potrzebny.',
  },
  steps: [
    {
      n: '01',
      title: 'Kontekst',
      body: 'Uzupełniasz dane firmy, ofertę, odbiorców i ton komunikacji.',
    },
    {
      n: '02',
      title: 'Brief',
      body: 'Wybierasz typ zadania, platformę, język, temat i cel materiału.',
    },
    {
      n: '03',
      title: 'Run agenta',
      body: 'Agent generuje propozycje lub treść, a panel pokazuje status pracy.',
    },
    {
      n: '04',
      title: 'Decyzja i wynik',
      body: 'Zatwierdzasz kluczowe wybory, przeglądasz rezultat i zachowujesz go w historii.',
    },
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
    title: 'Gotowy uruchomić pierwszego agenta?',
    supporting:
      'Załóż konto, uzupełnij kontekst firmy i sprawdź, jak Content Chain prowadzi pracę od briefu do wyniku.',
    cta: 'Sprawdzam!',
  },
  footer: {
    blurb: '© 2026 Content Chain',
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
