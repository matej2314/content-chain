'use client';

import { Icon } from '@iconify/react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import { EnvelopeError, FormField } from '@/shared/ui/form-field';
import {
  GATE_SECTION_LABELS,
  type CompanyContext,
  type CompanyContextExtras,
  type Completeness,
  type GateSection,
} from '@/modules/company-context/api/company-context.types';

type CompanyContextFormProps = {
  readonly value: CompanyContext;
  readonly completeness: Completeness;
  readonly readOnly: boolean;
  readonly pending: boolean;
  readonly error: { readonly code: string; readonly message: string } | null;
  readonly onChange: (next: CompanyContext) => void;
  readonly onSubmit: () => void;
};

function SectionHeading({
  section,
  missing,
}: {
  readonly section: GateSection;
  readonly missing: readonly GateSection[];
}) {
  const incomplete = missing.includes(section);
  return (
    <div className="flex items-baseline justify-between gap-2">
      <h2 className="text-base font-medium">{GATE_SECTION_LABELS[section]}</h2>
      <p className="text-xs text-muted-foreground">{incomplete ? 'Niekompletna' : 'Kompletna'}</p>
    </div>
  );
}

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

  function patch(next: CompanyContext): void {
    onChange(next);
  }

  return (
    <form
      className="flex max-w-3xl flex-col gap-8"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <section className="flex flex-col gap-3">
        <SectionHeading section="identity" missing={completeness.missing} />
        <FormField label="Nazwa firmy" htmlFor="identity-name">
          <Input
            id="identity-name"
            value={value.identity.name}
            disabled={readOnly}
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
            onChange={(event) =>
              patch({
                ...value,
                identity: { ...value.identity, description: event.target.value },
              })
            }
          />
        </FormField>
      </section>

      <section className="flex flex-col gap-3">
        <SectionHeading section="offer" missing={completeness.missing} />
        <p className="text-xs text-muted-foreground">
          Minimum jedna usługa z nazwą i co najmniej jedną korzyścią.
        </p>
        <div className="flex flex-col divide-y divide-border">
          {value.offer.items.map((item, index) => (
            <div key={`offer-${index}`} className="flex flex-col gap-3 py-3 first:pt-0">
              <FormField label="Nazwa" htmlFor={`offer-name-${index}`}>
                <Input
                  id={`offer-name-${index}`}
                  value={item.name}
                  disabled={readOnly}
                  onChange={(event) => {
                    const items = value.offer.items.map((current, currentIndex) =>
                      currentIndex === index ? { ...current, name: event.target.value } : current,
                    );
                    patch({ ...value, offer: { items } });
                  }}
                />
              </FormField>
              <FormField
                label="Korzyści"
                htmlFor={`offer-benefit-${index}`}
                hint="Jedna korzyść na linię."
              >
                <Textarea
                  id={`offer-benefit-${index}`}
                  value={listToLines(item.benefit)}
                  disabled={readOnly}
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
              <FormField label="Opis" htmlFor={`offer-description-${index}`}>
                <Textarea
                  id={`offer-description-${index}`}
                  value={item.description}
                  disabled={readOnly}
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
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="self-start"
                  onClick={() =>
                    patch({
                      ...value,
                      offer: {
                        items: value.offer.items.filter(
                          (_, currentIndex) => currentIndex !== index,
                        ),
                      },
                    })
                  }
                >
                  <Icon icon="lucide:trash-2" className="size-3.5" />
                  Usuń usługę
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
      </section>

      <section className="flex flex-col gap-3">
        <SectionHeading section="voice" missing={completeness.missing} />
        <FormField label="Jak mówimy" htmlFor="voice-we-do">
          <Textarea
            id="voice-we-do"
            value={value.voice.weDo}
            disabled={readOnly}
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
            onChange={(event) =>
              patch({ ...value, voice: { ...value.voice, weDont: event.target.value } })
            }
          />
        </FormField>
      </section>

      <section className="flex flex-col gap-3">
        <SectionHeading section="cta" missing={completeness.missing} />
        <div className="flex flex-col divide-y divide-border">
          {value.cta.items.map((item, index) => (
            <div key={`cta-${index}`} className="flex flex-col gap-3 py-3 first:pt-0">
              <FormField label="Etykieta CTA" htmlFor={`cta-label-${index}`}>
                <Input
                  id={`cta-label-${index}`}
                  value={item.label}
                  disabled={readOnly}
                  onChange={(event) => {
                    const items = value.cta.items.map((current, currentIndex) =>
                      currentIndex === index ? { ...current, label: event.target.value } : current,
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
                      currentIndex === index ? { ...current, target: event.target.value } : current,
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
                        items: value.cta.items.filter((_, currentIndex) => currentIndex !== index),
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
            onClick={() => patch({ ...value, cta: { items: [...value.cta.items, { label: '' }] } })}
          >
            <Icon icon="lucide:plus" className="size-3.5" />
            Dodaj CTA
          </Button>
        )}
      </section>

      <section className="flex flex-col gap-3">
        <SectionHeading section="audience" missing={completeness.missing} />
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
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-base font-medium">Dodatki (opcjonalne)</h2>
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
            <div key={`case-${index}`} className="flex flex-col gap-3 border-t border-border pt-3">
              <FormField label="Tytuł" htmlFor={`case-title-${index}`}>
                <Input
                  id={`case-title-${index}`}
                  value={item.title}
                  disabled={readOnly}
                  onChange={(event) => {
                    const caseStudies = (extras.caseStudies ?? []).map((current, currentIndex) =>
                      currentIndex === index ? { ...current, title: event.target.value } : current,
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
                      currentIndex === index ? { ...current, label: event.target.value } : current,
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
      </section>

      {error ? <EnvelopeError code={error.code} message={error.message} /> : null}

      {readOnly ? (
        <p className="text-sm text-muted-foreground">Tylko administrator może zapisać kontekst.</p>
      ) : (
        <Button type="submit" disabled={pending} className="self-start">
          {pending ? 'Zapisywanie…' : 'Zapisz kontekst'}
        </Button>
      )}
    </form>
  );
}
