'use client';

import Image from 'next/image';
import { Icon } from '@iconify/react';
import { Button } from '@/shared/ui/button';
import {
  LANDING_CONTEXT_IMAGES,
  LANDING_COPY,
  LANDING_HERO_IMAGES,
  LANDING_RUNS_IMAGES,
} from '@/modules/landing/landing-copy';
import type { ReactNode } from 'react';

export type LandingViewProps = {
  readonly onOpenLogin: () => void;
  readonly onOpenRegister: () => void;
  readonly surface: 'marketing' | 'thank_you';
  readonly thankYou?: ReactNode;
};

type ProductProofImages = {
  readonly desktop: {
    readonly src: string;
    readonly width: number;
    readonly height: number;
    readonly alt: string;
  };
  readonly narrow: {
    readonly src: string;
    readonly width: number;
    readonly height: number;
    readonly alt: string;
  };
};

function ProductProofSection({
  id,
  title,
  supporting,
  images,
}: {
  readonly id: string;
  readonly title: string;
  readonly supporting: string;
  readonly images: ProductProofImages;
}) {
  return (
    <section id={id} className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-14 text-center sm:px-6">
        <div className="mx-auto max-w-lg">
          <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
          <p className="mt-2 font-secondary text-sm text-muted-foreground">{supporting}</p>
        </div>
        <div className="relative w-full overflow-hidden rounded-xl border border-border shadow-[0_24px_80px_-32px_oklch(0.65_0.2_285/0.55)]">
          <Image
            src={images.desktop.src}
            alt={images.desktop.alt}
            width={images.desktop.width}
            height={images.desktop.height}
            className="hidden h-auto w-full sm:block"
            sizes="(min-width: 640px) min(72rem, 100vw), 100vw"
          />
          <Image
            src={images.narrow.src}
            alt={images.narrow.alt}
            width={images.narrow.width}
            height={images.narrow.height}
            className="h-auto w-full sm:hidden"
            sizes="100vw"
          />
        </div>
      </div>
    </section>
  );
}

export function LandingView({ onOpenLogin, onOpenRegister, surface, thankYou }: LandingViewProps) {
  const copy = LANDING_COPY;

  return (
    <div className="relative h-dvh overflow-x-hidden overflow-y-auto bg-background text-foreground scrollbar-none">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_480px_at_15%_-10%,oklch(0.65_0.2_285/0.22),transparent_60%),radial-gradient(700px_420px_at_85%_10%,oklch(0.72_0.12_170/0.14),transparent_55%)]"
      />

      <div className="relative z-10">
        <header className="sticky top-0 z-40 border-b border-border/80 bg-background/75 backdrop-blur-md">
          <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
            <a href="#top" className="text-sm font-semibold tracking-tight">
              {copy.brand}
            </a>
            <nav className="hidden items-center gap-5 text-sm text-muted-foreground md:flex">
              <a href="#dla-kogo" className="transition-colors hover:text-foreground">
                {copy.chromeNav.audience}
              </a>
              <a href="#mozliwosci" className="transition-colors hover:text-foreground">
                {copy.chromeNav.features}
              </a>
              <a href="#kontekst" className="transition-colors hover:text-foreground">
                {copy.chromeNav.context}
              </a>
              <a href="#runy" className="transition-colors hover:text-foreground">
                {copy.chromeNav.runs}
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
                    className="size-1.5 rounded-full shadow-[0_0_0_3px_oklch(0.72_0.12_170/0.25)]"
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
                <p className="max-w-[46ch] font-secondary text-base leading-relaxed text-muted-foreground">
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

              <ul className="flex list-none flex-wrap items-center justify-center gap-2 p-0">
                {copy.tech.map((item) => {
                  const brandColor = 'color' in item ? item.color : undefined;
                  return (
                    <li
                      key={item.name}
                      className="inline-flex items-center gap-2 rounded-md border border-border/80 bg-card/40 px-3 py-1.5 text-sm text-muted-foreground"
                    >
                      <Icon
                        icon={item.icon}
                        className="size-4 shrink-0"
                        aria-hidden
                        style={brandColor ? { color: brandColor } : undefined}
                      />
                      <span>{item.name}</span>
                    </li>
                  );
                })}
              </ul>

              <div className="relative overflow-hidden rounded-xl border border-border shadow-[0_24px_80px_-32px_oklch(0.65_0.2_285/0.55)]">
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
            </section>

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

            <section id="mozliwosci" className="border-t border-border/60">
              <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
                <div className="mb-8 max-w-lg">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    {copy.featuresSection.title}
                  </h2>
                  <p className="mt-2 font-secondary text-sm text-muted-foreground">
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

            <ProductProofSection
              id="kontekst"
              title={copy.contextSection.title}
              supporting={copy.contextSection.supporting}
              images={LANDING_CONTEXT_IMAGES}
            />

            <ProductProofSection
              id="runy"
              title={copy.runsSection.title}
              supporting={copy.runsSection.supporting}
              images={LANDING_RUNS_IMAGES}
            />

            <section id="jak-dziala" className="border-t border-border/60">
              <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
                <div className="mb-8 max-w-lg">
                  <h2 className="text-2xl font-semibold tracking-tight">{copy.howSection.title}</h2>
                  <p className="mt-2 font-secondary text-sm text-muted-foreground">
                    {copy.howSection.supporting}
                  </p>
                </div>
                <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {copy.steps.map((step) => (
                    <li
                      key={step.n}
                      className="rounded-xl border border-border bg-background/40 p-4"
                    >
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
                  <p className="mt-2 font-secondary text-sm text-muted-foreground">
                    {copy.closing.supporting}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button
                    type="button"
                    size="lg"
                    className="h-10"
                    onClick={onOpenRegister}
                  >
                    {copy.closing.cta}
                  </Button>
                </div>
              </div>
            </section>
          </main>
        )}

        <footer className="border-t border-border/60">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <p className="mt-1 max-w-sm">{copy.footer.blurb}</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a href="#dla-kogo" className="hover:text-foreground">
                {copy.chromeNav.audience}
              </a>
              <a href="#mozliwosci" className="hover:text-foreground">
                {copy.chromeNav.features}
              </a>
              <a href="#kontekst" className="hover:text-foreground">
                {copy.chromeNav.context}
              </a>
              <a href="#runy" className="hover:text-foreground">
                {copy.chromeNav.runs}
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
