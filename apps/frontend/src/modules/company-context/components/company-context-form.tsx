'use client';

import { Icon } from '@iconify/react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import { EnvelopeError, FormField } from '@/shared/ui/form-field';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import {
  CONTEXT_TAB_LABELS,
  DEFAULT_CONTEXT_TAB,
  GATE_SECTIONS,
  GATE_SECTION_LABELS,
  companyContextForPut,
  type CompanyContext,
  type CompanyContextExtras,
  type Completeness,
} from '@/modules/company-context/api/company-context.types';
import {
  GateCompletenessDot,
  gateTabAriaLabel,
} from '@/modules/company-context/components/gate-completeness-dot';
import { areAudienceProfileNamesUnique } from '@/modules/company-context/lib/audience-profile-names';
import {
  audienceProfileFieldErrors,
  canRemoveOfferItem,
  isComplete,
  offerItemFieldErrors,
} from '@/modules/company-context/lib/is-complete';

type CompanyContextFormProps = {
  readonly value: CompanyContext;
  readonly completeness: Completeness;
  readonly readOnly: boolean;
  readonly pending: boolean;
  readonly error: { readonly code: string; readonly message: string } | null;
  readonly onChange: (next: CompanyContext) => void;
  readonly onSubmit: () => void;
};

function linesToList(value: string): string[] {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

function listToLines(value: readonly string[]): string {
  return value.join('\n');
}

function benefitCountLabel(count: number): string {
  if (count === 1) return '1 korzyść';
  return `${count} korzyści`;
}

function offerItemHeading(name: string, index: number): string {
  const trimmed = name.trim();
  return trimmed.length > 0 ? trimmed : `Usługa ${index + 1}`;
}

function audienceProfileHeading(name: string, index: number): string {
  const trimmed = name.trim();
  return trimmed.length > 0 ? trimmed : `Profil ${index + 1}`;
}

function ctaItemHeading(label: string, index: number): string {
  const trimmed = label.trim();
  return trimmed.length > 0 ? trimmed : `CTA ${index + 1}`;
}

function caseStudyHeading(title: string, index: number): string {
  const trimmed = title.trim();
  return trimmed.length > 0 ? `Case ${trimmed}` : `Case ${index + 1}`;
}

function objectionHeading(label: string, index: number): string {
  const trimmed = label.trim();
  return trimmed.length > 0 ? `Obiekcja ${trimmed}` : `Obiekcja ${index + 1}`;
}

function commaToList(value: string): string[] {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

function extrasOrEmpty(extras: CompanyContextExtras | null): CompanyContextExtras {
  return extras ?? {};
}

const EXTRAS_SUB_TABS = ['hashtags', 'notes', 'caseStudies', 'objections'] as const;
type ExtrasSubTab = (typeof EXTRAS_SUB_TABS)[number];

const EXTRAS_SUB_TAB_LABELS: Record<ExtrasSubTab, string> = {
  hashtags: 'Hashtagi',
  notes: 'Notatki',
  caseStudies: 'Case studies',
  objections: 'Obiekcje',
};

const DEFAULT_EXTRAS_SUB_TAB: ExtrasSubTab = 'hashtags';

function FormActions({
  readOnly,
  pending,
  canSubmit,
  gateComplete,
  error,
}: {
  readonly readOnly: boolean;
  readonly pending: boolean;
  readonly canSubmit: boolean;
  readonly gateComplete: boolean;
  readonly error: { readonly code: string; readonly message: string } | null;
}) {
  const submitBlocked = !readOnly && !canSubmit && !pending;
  return (
    <div className="flex flex-col gap-3 pt-2">
      {error ? <EnvelopeError code={error.code} message={error.message} /> : null}
      {readOnly ? (
        <p className="text-sm text-muted-foreground">Tylko administrator może zapisać kontekst.</p>
      ) : (
        <>
          <Button type="submit" disabled={pending || !canSubmit} className="self-start">
            {pending ? 'Zapisywanie…' : 'Zapisz kontekst'}
          </Button>
          {submitBlocked ? (
            <p className="text-xs text-muted-foreground">
              {!gateComplete
                ? 'Kontekst firmy nie jest kompletny. Uzupełnij wszystkie wymagane pola.'
                : 'Nazwy profili odbiorców muszą być unikalne.'}
            </p>
          ) : null}
        </>
      )}
    </div>
  );
}

export function CompanyContextForm({
  value,
  completeness,
  readOnly,
  pending,
  error,
  onChange,
  onSubmit,
}: CompanyContextFormProps) {
  const extras = extrasOrEmpty(value.extras);
  const putPayload = companyContextForPut(value);
  const gateComplete = isComplete(putPayload).complete;
  const canSubmit =
    gateComplete && areAudienceProfileNamesUnique(putPayload.audience.profiles);

  function patch(next: CompanyContext): void {
    onChange(next);
  }

  return (
    <form
      className="flex max-w-3xl flex-col gap-4"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        if (readOnly || pending || !canSubmit) return;
        onSubmit();
      }}
    >
      <Tabs defaultValue={DEFAULT_CONTEXT_TAB} className="gap-4">
        <TabsList
          variant="line"
          className="w-full flex-wrap justify-start gap-x-1 gap-y-3 bg-transparent p-0"
        >
          {GATE_SECTIONS.map((section) => (
            <TabsTrigger
              key={section}
              value={section}
              aria-label={gateTabAriaLabel(section, completeness.missing)}
              className="flex-none"
            >
              {GATE_SECTION_LABELS[section]}
              <GateCompletenessDot tab={section} missing={completeness.missing} />
            </TabsTrigger>
          ))}
          <TabsTrigger
            value="extras"
            aria-label={gateTabAriaLabel('extras', completeness.missing)}
            className="flex-none"
          >
            {CONTEXT_TAB_LABELS.extras}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="identity" className="flex flex-col gap-3">
          <FormField label="Nazwa firmy" htmlFor="identity-name">
            <Input
              id="identity-name"
              value={value.identity.name}
              disabled={readOnly}
              aria-required
              onChange={(event) =>
                patch({
                  ...value,
                  identity: { ...value.identity, name: event.target.value },
                })
              }
            />
          </FormField>
          <FormField label="Opis / misja" htmlFor="identity-description" hint="1–3 zdania.">
            <Textarea
              id="identity-description"
              value={value.identity.description}
              disabled={readOnly}
              aria-required
              onChange={(event) =>
                patch({
                  ...value,
                  identity: { ...value.identity, description: event.target.value },
                })
              }
            />
          </FormField>
          <FormActions
            readOnly={readOnly}
            pending={pending}
            canSubmit={canSubmit}
            gateComplete={gateComplete}
            error={error}
          />
        </TabsContent>

        <TabsContent value="offer" className="flex flex-col gap-3">
          <p className="text-xs text-muted-foreground">
            Minimum jedna kompletna usługa: nazwa, opis i co najmniej jedna korzyść. Każda pozycja
            na liście musi być kompletna. Korzyści: jedna na linię.
          </p>
          {readOnly ? null : (
            <div className="flex justify-end">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  patch({
                    ...value,
                    offer: {
                      items: [{ name: '', benefit: [], description: '' }, ...value.offer.items],
                    },
                  })
                }
              >
                <Icon icon="lucide:plus" className="size-3.5" />
                Dodaj usługę
              </Button>
            </div>
          )}
          <div className="flex flex-col divide-y divide-border">
            {value.offer.items.map((item, index) => {
              const fieldErrors = offerItemFieldErrors(item);
              const removeAllowed = canRemoveOfferItem(value.offer.items, index);
              const benefitCount = item.benefit.filter((line) => line.trim().length > 0).length;
              return (
                <div key={`offer-${index}`} className="flex flex-col gap-3 py-4 first:pt-0">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 lg:flex lg:flex-wrap lg:justify-between">
                    <h3
                      className="min-w-0 truncate text-sm font-medium lg:overflow-visible lg:text-clip"
                      title={offerItemHeading(item.name, index)}
                    >
                      {offerItemHeading(item.name, index)}
                    </h3>
                    {readOnly ? null : (
                      <span
                        className="shrink-0 justify-self-end"
                        title={
                          removeAllowed
                            ? undefined
                            : 'Nie można usunąć ostatniej kompletnej usługi.'
                        }
                      >
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          disabled={!removeAllowed}
                          onClick={() => {
                            if (!removeAllowed) return;
                            patch({
                              ...value,
                              offer: {
                                items: value.offer.items.filter(
                                  (_, currentIndex) => currentIndex !== index,
                                ),
                              },
                            });
                          }}
                        >
                          <Icon icon="lucide:trash-2" className="size-3.5" />
                          Usuń usługę
                        </Button>
                      </span>
                    )}
                  </div>
                  <FormField
                    label="Nazwa"
                    htmlFor={`offer-name-${index}`}
                    error={fieldErrors.name ?? undefined}
                  >
                    <Input
                      id={`offer-name-${index}`}
                      value={item.name}
                      disabled={readOnly}
                      aria-required
                      aria-invalid={fieldErrors.name !== null}
                      onChange={(event) => {
                        const items = value.offer.items.map((current, currentIndex) =>
                          currentIndex === index
                            ? { ...current, name: event.target.value }
                            : current,
                        );
                        patch({ ...value, offer: { items } });
                      }}
                    />
                  </FormField>
                  <FormField
                    label="Opis"
                    htmlFor={`offer-description-${index}`}
                    error={fieldErrors.description ?? undefined}
                  >
                    <Textarea
                      id={`offer-description-${index}`}
                      className="min-h-24"
                      value={item.description}
                      disabled={readOnly}
                      aria-required
                      aria-invalid={fieldErrors.description !== null}
                      onChange={(event) => {
                        const items = value.offer.items.map((current, currentIndex) =>
                          currentIndex === index
                            ? { ...current, description: event.target.value }
                            : current,
                        );
                        patch({ ...value, offer: { items } });
                      }}
                    />
                  </FormField>
                  <FormField
                    label="Korzyści"
                    htmlFor={`offer-benefit-${index}`}
                    hint={benefitCountLabel(benefitCount)}
                    error={fieldErrors.benefit ?? undefined}
                  >
                    <Textarea
                      id={`offer-benefit-${index}`}
                      className="min-h-24"
                      value={listToLines(item.benefit)}
                      disabled={readOnly}
                      aria-required
                      aria-invalid={fieldErrors.benefit !== null}
                      onChange={(event) => {
                        const items = value.offer.items.map((current, currentIndex) =>
                          currentIndex === index
                            ? { ...current, benefit: linesToList(event.target.value) }
                            : current,
                        );
                        patch({ ...value, offer: { items } });
                      }}
                    />
                  </FormField>
                </div>
              );
            })}
          </div>
          <FormActions
            readOnly={readOnly}
            pending={pending}
            canSubmit={canSubmit}
            gateComplete={gateComplete}
            error={error}
          />
        </TabsContent>

        <TabsContent value="voice" className="flex flex-col gap-3">
          <FormField label="Jak mówimy" htmlFor="voice-we-do">
            <Textarea
              id="voice-we-do"
              value={value.voice.weDo}
              disabled={readOnly}
              aria-required
              onChange={(event) =>
                patch({ ...value, voice: { ...value.voice, weDo: event.target.value } })
              }
            />
          </FormField>
          <FormField label="Jak nie mówimy" htmlFor="voice-we-dont">
            <Textarea
              id="voice-we-dont"
              value={value.voice.weDont}
              disabled={readOnly}
              aria-required
              onChange={(event) =>
                patch({ ...value, voice: { ...value.voice, weDont: event.target.value } })
              }
            />
          </FormField>
          <FormActions
            readOnly={readOnly}
            pending={pending}
            canSubmit={canSubmit}
            gateComplete={gateComplete}
            error={error}
          />
        </TabsContent>

        <TabsContent value="cta" className="flex flex-col gap-3">
          <p className="text-xs text-muted-foreground">
            Minimum jedno CTA z niepustą etykietą. Cel (np. kanał lub URL) jest opcjonalny.
          </p>
          {readOnly ? null : (
            <div className="flex justify-end">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  patch({
                    ...value,
                    cta: { items: [{ label: '' }, ...value.cta.items] },
                  })
                }
              >
                <Icon icon="lucide:plus" className="size-3.5" />
                Dodaj CTA
              </Button>
            </div>
          )}
          <div className="flex flex-col divide-y divide-border">
            {value.cta.items.map((item, index) => (
              <div key={`cta-${index}`} className="flex flex-col gap-3 py-4 first:pt-0">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 lg:flex lg:flex-wrap lg:justify-between">
                  <h3
                    className="min-w-0 truncate text-sm font-medium lg:overflow-visible lg:text-clip"
                    title={ctaItemHeading(item.label, index)}
                  >
                    {ctaItemHeading(item.label, index)}
                  </h3>
                  {readOnly ? null : (
                    <span className="shrink-0 justify-self-end">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          patch({
                            ...value,
                            cta: {
                              items: value.cta.items.filter(
                                (_, currentIndex) => currentIndex !== index,
                              ),
                            },
                          })
                        }
                      >
                        <Icon icon="lucide:trash-2" className="size-3.5" />
                        Usuń CTA
                      </Button>
                    </span>
                  )}
                </div>
                <FormField label="Etykieta CTA" htmlFor={`cta-label-${index}`}>
                  <Input
                    id={`cta-label-${index}`}
                    value={item.label}
                    disabled={readOnly}
                    aria-required
                    onChange={(event) => {
                      const items = value.cta.items.map((current, currentIndex) =>
                        currentIndex === index
                          ? { ...current, label: event.target.value }
                          : current,
                      );
                      patch({ ...value, cta: { items } });
                    }}
                  />
                </FormField>
                <FormField label="Cel (opcjonalnie)" htmlFor={`cta-target-${index}`}>
                  <Input
                    id={`cta-target-${index}`}
                    value={item.target ?? ''}
                    disabled={readOnly}
                    onChange={(event) => {
                      const items = value.cta.items.map((current, currentIndex) =>
                        currentIndex === index
                          ? { ...current, target: event.target.value }
                          : current,
                      );
                      patch({ ...value, cta: { items } });
                    }}
                  />
                </FormField>
              </div>
            ))}
          </div>
          <FormActions
            readOnly={readOnly}
            pending={pending}
            canSubmit={canSubmit}
            gateComplete={gateComplete}
            error={error}
          />
        </TabsContent>

        <TabsContent value="audience" className="flex flex-col gap-3">
          {readOnly ? null : (
            <div className="flex justify-end">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  patch({
                    ...value,
                    audience: {
                      profiles: [{ name: '', description: '' }, ...value.audience.profiles],
                    },
                  })
                }
              >
                <Icon icon="lucide:plus" className="size-3.5" />
                Dodaj profil
              </Button>
            </div>
          )}
          <div className="flex flex-col divide-y divide-border">
            {value.audience.profiles.map((profile, index) => {
              const fieldErrors = audienceProfileFieldErrors(
                profile,
                value.audience.profiles,
                index,
              );
              return (
                <div key={`audience-${index}`} className="flex flex-col gap-3 py-4 first:pt-0">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 lg:flex lg:flex-wrap lg:justify-between">
                    <h3
                      className="min-w-0 truncate text-sm font-medium lg:overflow-visible lg:text-clip"
                      title={audienceProfileHeading(profile.name, index)}
                    >
                      {audienceProfileHeading(profile.name, index)}
                    </h3>
                    {readOnly ? null : (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="shrink-0 justify-self-end"
                        onClick={() =>
                          patch({
                            ...value,
                            audience: {
                              profiles: value.audience.profiles.filter(
                                (_, currentIndex) => currentIndex !== index,
                              ),
                            },
                          })
                        }
                      >
                        <Icon icon="lucide:trash-2" className="size-3.5" />
                        Usuń profil
                      </Button>
                    )}
                  </div>
                  <FormField
                    label="Nazwa"
                    htmlFor={`audience-name-${index}`}
                    error={fieldErrors.name ?? undefined}
                  >
                    <Input
                      id={`audience-name-${index}`}
                      value={profile.name}
                      disabled={readOnly}
                      aria-required
                      aria-invalid={fieldErrors.name !== null}
                      onChange={(event) => {
                        const profiles = value.audience.profiles.map((current, currentIndex) =>
                          currentIndex === index
                            ? { ...current, name: event.target.value }
                            : current,
                        );
                        patch({ ...value, audience: { profiles } });
                      }}
                    />
                  </FormField>
                  <FormField
                    label="Opis"
                    htmlFor={`audience-description-${index}`}
                    hint="Stanowisko, branża albo kontekst."
                    error={fieldErrors.description ?? undefined}
                  >
                    <Textarea
                      id={`audience-description-${index}`}
                      className="min-h-24"
                      value={profile.description}
                      disabled={readOnly}
                      aria-required
                      aria-invalid={fieldErrors.description !== null}
                      onChange={(event) => {
                        const profiles = value.audience.profiles.map((current, currentIndex) =>
                          currentIndex === index
                            ? { ...current, description: event.target.value }
                            : current,
                        );
                        patch({ ...value, audience: { profiles } });
                      }}
                    />
                  </FormField>
                </div>
              );
            })}
          </div>
          <FormActions
            readOnly={readOnly}
            pending={pending}
            canSubmit={canSubmit}
            gateComplete={gateComplete}
            error={error}
          />
        </TabsContent>

        <TabsContent value="extras" className="flex flex-col gap-3">
          <Tabs defaultValue={DEFAULT_EXTRAS_SUB_TAB} className="gap-3">
            <TabsList
              variant="line"
              className="w-full flex-wrap justify-start gap-x-1 gap-y-2 bg-transparent p-0"
            >
              {EXTRAS_SUB_TABS.map((subTab) => (
                <TabsTrigger key={subTab} value={subTab} className="flex-none">
                  {EXTRAS_SUB_TAB_LABELS[subTab]}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="hashtags" className="flex flex-col gap-3">
              <FormField label="Hashtagi" htmlFor="extras-hashtags" hint="Oddzielone przecinkami.">
                <Input
                  id="extras-hashtags"
                  value={(extras.hashtags ?? []).join(', ')}
                  disabled={readOnly}
                  onChange={(event) =>
                    patch({
                      ...value,
                      extras: { ...extras, hashtags: commaToList(event.target.value) },
                    })
                  }
                />
              </FormField>
            </TabsContent>

            <TabsContent value="notes" className="flex flex-col gap-3">
              <FormField label="Notatki katalogowe" htmlFor="extras-catalog">
                <Textarea
                  id="extras-catalog"
                  value={extras.catalogNotes ?? ''}
                  disabled={readOnly}
                  onChange={(event) =>
                    patch({
                      ...value,
                      extras: { ...extras, catalogNotes: event.target.value },
                    })
                  }
                />
              </FormField>
              <FormField label="Notatki performance" htmlFor="extras-performance">
                <Textarea
                  id="extras-performance"
                  value={extras.performanceNotes ?? ''}
                  disabled={readOnly}
                  onChange={(event) =>
                    patch({
                      ...value,
                      extras: { ...extras, performanceNotes: event.target.value },
                    })
                  }
                />
              </FormField>
            </TabsContent>

            <TabsContent value="caseStudies" className="flex flex-col gap-3">
              {readOnly ? null : (
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      patch({
                        ...value,
                        extras: {
                          ...extras,
                          caseStudies: [
                            { title: '', summary: '' },
                            ...(extras.caseStudies ?? []),
                          ],
                        },
                      })
                    }
                  >
                    <Icon icon="lucide:plus" className="size-3.5" />
                    Dodaj case study
                  </Button>
                </div>
              )}
              <div className="flex flex-col divide-y divide-border">
                {(extras.caseStudies ?? []).map((item, index) => (
                  <div key={`case-${index}`} className="flex flex-col gap-3 py-4 first:pt-0">
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 lg:flex lg:flex-wrap lg:justify-between">
                      <h3
                        className="min-w-0 truncate text-sm font-medium lg:overflow-visible lg:text-clip"
                        title={caseStudyHeading(item.title, index)}
                      >
                        {caseStudyHeading(item.title, index)}
                      </h3>
                      {readOnly ? null : (
                        <span className="shrink-0 justify-self-end">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              patch({
                                ...value,
                                extras: {
                                  ...extras,
                                  caseStudies: (extras.caseStudies ?? []).filter(
                                    (_, currentIndex) => currentIndex !== index,
                                  ),
                                },
                              })
                            }
                          >
                            <Icon icon="lucide:trash-2" className="size-3.5" />
                            Usuń case study
                          </Button>
                        </span>
                      )}
                    </div>
                    <FormField label="Tytuł" htmlFor={`case-title-${index}`}>
                      <Input
                        id={`case-title-${index}`}
                        value={item.title}
                        disabled={readOnly}
                        onChange={(event) => {
                          const caseStudies = (extras.caseStudies ?? []).map(
                            (current, currentIndex) =>
                              currentIndex === index
                                ? { ...current, title: event.target.value }
                                : current,
                          );
                          patch({ ...value, extras: { ...extras, caseStudies } });
                        }}
                      />
                    </FormField>
                    <FormField label="Streszczenie" htmlFor={`case-summary-${index}`}>
                      <Textarea
                        id={`case-summary-${index}`}
                        value={item.summary}
                        disabled={readOnly}
                        onChange={(event) => {
                          const caseStudies = (extras.caseStudies ?? []).map(
                            (current, currentIndex) =>
                              currentIndex === index
                                ? { ...current, summary: event.target.value }
                                : current,
                          );
                          patch({ ...value, extras: { ...extras, caseStudies } });
                        }}
                      />
                    </FormField>
                    <FormField
                      label="Metryki (opcjonalnie)"
                      htmlFor={`case-metrics-${index}`}
                      hint="Oddzielone przecinkami."
                    >
                      <Input
                        id={`case-metrics-${index}`}
                        value={(item.metrics ?? []).join(', ')}
                        disabled={readOnly}
                        onChange={(event) => {
                          const caseStudies = (extras.caseStudies ?? []).map(
                            (current, currentIndex) =>
                              currentIndex === index
                                ? { ...current, metrics: commaToList(event.target.value) }
                                : current,
                          );
                          patch({ ...value, extras: { ...extras, caseStudies } });
                        }}
                      />
                    </FormField>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="objections" className="flex flex-col gap-3">
              {readOnly ? null : (
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      patch({
                        ...value,
                        extras: {
                          ...extras,
                          objections: [
                            { label: '', response: '' },
                            ...(extras.objections ?? []),
                          ],
                        },
                      })
                    }
                  >
                    <Icon icon="lucide:plus" className="size-3.5" />
                    Dodaj obiekcję
                  </Button>
                </div>
              )}
              <div className="flex flex-col divide-y divide-border">
                {(extras.objections ?? []).map((item, index) => (
                  <div key={`obj-${index}`} className="flex flex-col gap-3 py-4 first:pt-0">
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 lg:flex lg:flex-wrap lg:justify-between">
                      <h3
                        className="min-w-0 truncate text-sm font-medium lg:overflow-visible lg:text-clip"
                        title={objectionHeading(item.label, index)}
                      >
                        {objectionHeading(item.label, index)}
                      </h3>
                      {readOnly ? null : (
                        <span className="shrink-0 justify-self-end">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              patch({
                                ...value,
                                extras: {
                                  ...extras,
                                  objections: (extras.objections ?? []).filter(
                                    (_, currentIndex) => currentIndex !== index,
                                  ),
                                },
                              })
                            }
                          >
                            <Icon icon="lucide:trash-2" className="size-3.5" />
                            Usuń obiekcję
                          </Button>
                        </span>
                      )}
                    </div>
                    <FormField label="Obiekcja" htmlFor={`obj-label-${index}`}>
                      <Input
                        id={`obj-label-${index}`}
                        value={item.label}
                        disabled={readOnly}
                        onChange={(event) => {
                          const objections = (extras.objections ?? []).map(
                            (current, currentIndex) =>
                              currentIndex === index
                                ? { ...current, label: event.target.value }
                                : current,
                          );
                          patch({ ...value, extras: { ...extras, objections } });
                        }}
                      />
                    </FormField>
                    <FormField label="Odpowiedź" htmlFor={`obj-response-${index}`}>
                      <Textarea
                        id={`obj-response-${index}`}
                        value={item.response}
                        disabled={readOnly}
                        onChange={(event) => {
                          const objections = (extras.objections ?? []).map(
                            (current, currentIndex) =>
                              currentIndex === index
                                ? { ...current, response: event.target.value }
                                : current,
                          );
                          patch({ ...value, extras: { ...extras, objections } });
                        }}
                      />
                    </FormField>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          <FormActions
            readOnly={readOnly}
            pending={pending}
            canSubmit={canSubmit}
            gateComplete={gateComplete}
            error={error}
          />
        </TabsContent>
      </Tabs>
    </form>
  );
}
