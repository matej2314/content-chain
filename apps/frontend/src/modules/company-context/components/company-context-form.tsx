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
import {
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

function commaToList(value: string): string[] {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

function extrasOrEmpty(extras: CompanyContextExtras | null): CompanyContextExtras {
  return extras ?? {};
}

function FormActions({
  readOnly,
  pending,
  canSubmit,
  error,
}: {
  readonly readOnly: boolean;
  readonly pending: boolean;
  readonly canSubmit: boolean;
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
              Kontekst firmy nie jest kompletny. Uzupełnij wszystkie wymagane pola.
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
  const canSubmit = isComplete(companyContextForPut(value)).complete;

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
          className="h-auto w-full flex-wrap justify-start gap-1 bg-transparent p-0"
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
          <FormActions readOnly={readOnly} pending={pending} canSubmit={canSubmit} error={error} />
        </TabsContent>

        <TabsContent value="offer" className="flex flex-col gap-3">
          <p className="text-xs text-muted-foreground">
            Minimum jedna kompletna usługa: nazwa, opis i co najmniej jedna korzyść. Każda pozycja
            na liście musi być kompletna.
          </p>
          <div className="flex flex-col divide-y divide-border">
            {value.offer.items.map((item, index) => {
              const fieldErrors = offerItemFieldErrors(item);
              const removeAllowed = canRemoveOfferItem(value.offer.items, index);
              return (
                <div key={`offer-${index}`} className="flex flex-col gap-3 py-3 first:pt-0">
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
                    label="Korzyści"
                    htmlFor={`offer-benefit-${index}`}
                    hint="Jedna korzyść na linię."
                    error={fieldErrors.benefit ?? undefined}
                  >
                    <Textarea
                      id={`offer-benefit-${index}`}
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
                  <FormField
                    label="Opis"
                    htmlFor={`offer-description-${index}`}
                    error={fieldErrors.description ?? undefined}
                  >
                    <Textarea
                      id={`offer-description-${index}`}
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
                  {readOnly ? null : (
                    <span
                      className="self-start"
                      title={
                        removeAllowed ? undefined : 'Nie można usunąć ostatniej kompletnej usługi.'
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
              );
            })}
          </div>
          {readOnly ? null : (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="self-start"
              onClick={() =>
                patch({
                  ...value,
                  offer: {
                    items: [...value.offer.items, { name: '', benefit: [], description: '' }],
                  },
                })
              }
            >
              <Icon icon="lucide:plus" className="size-3.5" />
              Dodaj usługę
            </Button>
          )}
          <FormActions readOnly={readOnly} pending={pending} canSubmit={canSubmit} error={error} />
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
          <FormActions readOnly={readOnly} pending={pending} canSubmit={canSubmit} error={error} />
        </TabsContent>

        <TabsContent value="cta" className="flex flex-col gap-3">
          <div className="flex flex-col divide-y divide-border">
            {value.cta.items.map((item, index) => (
              <div key={`cta-${index}`} className="flex flex-col gap-3 py-3 first:pt-0">
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
                {readOnly ? null : (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="self-start"
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
                )}
              </div>
            ))}
          </div>
          {readOnly ? null : (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="self-start"
              onClick={() =>
                patch({ ...value, cta: { items: [...value.cta.items, { label: '' }] } })
              }
            >
              <Icon icon="lucide:plus" className="size-3.5" />
              Dodaj CTA
            </Button>
          )}
          <FormActions readOnly={readOnly} pending={pending} canSubmit={canSubmit} error={error} />
        </TabsContent>

        <TabsContent value="audience" className="flex flex-col gap-3">
          <div className="flex flex-col divide-y divide-border">
            {value.audience.profiles.map((profile, index) => (
              <div key={`audience-${index}`} className="flex flex-col gap-3 py-3 first:pt-0">
                <FormField
                  label="Profil odbiorcy"
                  htmlFor={`audience-${index}`}
                  hint="Stanowisko, branża albo kontekst."
                >
                  <Textarea
                    id={`audience-${index}`}
                    value={profile.description}
                    disabled={readOnly}
                    aria-required
                    onChange={(event) => {
                      const profiles = value.audience.profiles.map((current, currentIndex) =>
                        currentIndex === index ? { description: event.target.value } : current,
                      );
                      patch({ ...value, audience: { profiles } });
                    }}
                  />
                </FormField>
                {readOnly ? null : (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="self-start"
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
            ))}
          </div>
          {readOnly ? null : (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="self-start"
              onClick={() =>
                patch({
                  ...value,
                  audience: { profiles: [...value.audience.profiles, { description: '' }] },
                })
              }
            >
              <Icon icon="lucide:plus" className="size-3.5" />
              Dodaj profil
            </Button>
          )}
          <FormActions readOnly={readOnly} pending={pending} canSubmit={canSubmit} error={error} />
        </TabsContent>

        <TabsContent value="extras" className="flex flex-col gap-3">
          <p className="text-xs text-muted-foreground">
            Nie blokują sygnału Agenci aktywni. Puste pola nie są zapisywane.
          </p>
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
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium">Case studies</p>
            {(extras.caseStudies ?? []).map((item, index) => (
              <div
                key={`case-${index}`}
                className="flex flex-col gap-3 border-t border-border pt-3"
              >
                <FormField label="Tytuł" htmlFor={`case-title-${index}`}>
                  <Input
                    id={`case-title-${index}`}
                    value={item.title}
                    disabled={readOnly}
                    onChange={(event) => {
                      const caseStudies = (extras.caseStudies ?? []).map((current, currentIndex) =>
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
                      const caseStudies = (extras.caseStudies ?? []).map((current, currentIndex) =>
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
                      const caseStudies = (extras.caseStudies ?? []).map((current, currentIndex) =>
                        currentIndex === index
                          ? { ...current, metrics: commaToList(event.target.value) }
                          : current,
                      );
                      patch({ ...value, extras: { ...extras, caseStudies } });
                    }}
                  />
                </FormField>
                {readOnly ? null : (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="self-start"
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
                )}
              </div>
            ))}
            {readOnly ? null : (
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="self-start"
                onClick={() =>
                  patch({
                    ...value,
                    extras: {
                      ...extras,
                      caseStudies: [...(extras.caseStudies ?? []), { title: '', summary: '' }],
                    },
                  })
                }
              >
                <Icon icon="lucide:plus" className="size-3.5" />
                Dodaj case study
              </Button>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium">Obiekcje</p>
            {(extras.objections ?? []).map((item, index) => (
              <div key={`obj-${index}`} className="flex flex-col gap-3 border-t border-border pt-3">
                <FormField label="Obiekcja" htmlFor={`obj-label-${index}`}>
                  <Input
                    id={`obj-label-${index}`}
                    value={item.label}
                    disabled={readOnly}
                    onChange={(event) => {
                      const objections = (extras.objections ?? []).map((current, currentIndex) =>
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
                      const objections = (extras.objections ?? []).map((current, currentIndex) =>
                        currentIndex === index
                          ? { ...current, response: event.target.value }
                          : current,
                      );
                      patch({ ...value, extras: { ...extras, objections } });
                    }}
                  />
                </FormField>
                {readOnly ? null : (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="self-start"
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
                )}
              </div>
            ))}
            {readOnly ? null : (
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="self-start"
                onClick={() =>
                  patch({
                    ...value,
                    extras: {
                      ...extras,
                      objections: [...(extras.objections ?? []), { label: '', response: '' }],
                    },
                  })
                }
              >
                <Icon icon="lucide:plus" className="size-3.5" />
                Dodaj obiekcję
              </Button>
            )}
          </div>
          <FormActions readOnly={readOnly} pending={pending} canSubmit={canSubmit} error={error} />
        </TabsContent>
      </Tabs>
    </form>
  );
}
