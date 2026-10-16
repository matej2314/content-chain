# Content Chain — feature plan: Case studies / Obiekcje jak Oferta (Faza 19)

**Lokalizacja:** `feature-plans/content-chain_feature_plan_faza-19-case-objections-list-oferta.md`  
**Kotwica major:** Faza 19 (cała) — `content-chain-frontend_major_plan.md` (`NIE_ROZPOCZĘTY`, **bez** MILESTONE 19).  
**Refaktor względem:** Faza 2 / Krok 2.1 oraz Faza 2.1 (`WYKONANY`) — ten sam widok Dodatki / podzakładki Case studies i Obiekcje; zmiana: prezentacja list = wzorzec Oferty (Dodaj nad listą / prepend, nagłówek + Usuń, `divide-y`, responsive poniżej `lg`; nagłówki „Case …” / „Obiekcja …”; **bez** hicie globalnego). MILESTONE 2 / 2.1 oraz Faza 2 / 2.1 pozostają historią.  
**Źródła:** `docs/ux_dashboard.md` (Kontekst firmy / Dodatki — Case studies i Obiekcje), `SPEC-FRONTEND.md` F-8 (+ „Nie wolno”), major FE Faza 19. Skill wizualny: `content-chain-product-ui` (dziedziczenie locku Fazy 1).  
**Kolejność `KROK` w tym pliku:** helpery nagłówków + Case studies → Obiekcje (pass rozwojowy: ten sam wzorzec markup/klas co Oferta / CTA **przed** drugim podzakładem).

**Statusy kroków feature:** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`

---

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Cała Faza 19 majoru FE: podzakładki **Case studies** i **Obiekcje** = lista jak Oferta; Hashtagi / Notatki bez zmian; API / Zod / bramka / strip **bez zmian** |
| Major | Faza 19; start po Fazach 1–18 (`WYKONANY`) i Milestone 1–6 / 2.1 / 3.5 / 3.6 (`OSIĄGNIĘTY`); **bez** MILESTONE 19 |
| Poza zakresem | Hashtagi / Notatki; zmiana kształtu `extras.caseStudies` / `extras.objections`; `extrasForPut` / C-1 / `missing`; hicie globalny nad Case / Obiekcje; `SPEC-KONTEKST-FIRMY.md`; backend major; Playwright; nowa paleta |
| Po implementacji (informacyjnie) | Major FE: Faza 19 → `WYKONANY` (DoD gate + kod z feature planu). Brak `MILESTONE` 19. Edycja major **poza** tym skillem |

**Mapa major → ten plik**

| Major (opis DoD / HOW) | Feature | Zakres |
|------------------------|---------|--------|
| Case studies jak Oferta | FAZA 1 / KROK 1 | Helpery nagłówków + UI Case studies |
| Obiekcje jak Oferta | FAZA 1 / KROK 2 | UI Obiekcje (ten sam wzorzec) |

**Pass rozwojowy (sesja planu):** `caseStudyHeading` / `objectionHeading` **przed** JSX Case; markup Case (Dodaj / prepend / nagłówek+Usuń / `divide-y` / responsive) **przed** Obiekcjami — Obiekcje kopiują ten sam szkielet. **Brak przesunięć między fazami major.** Typy API / `extrasForPut` nietknięte — nie ma zależności typowej do przenoszenia.

---

## Założenia

- Stack FE bez zmian: Next.js App Router, React, Tailwind v4, shadcn kit, Iconify, TypeScript `strict` jak w `apps/frontend`.
- Kontrakt `CompanyContextCaseStudy` / `CompanyContextObjection` **bez zmian** (`title` / `summary` / `metrics?`; `label` / `response`).
- Prepend pustej pozycji Case: `{ title: '', summary: '' }` (jak dziś przy Dodaj — bez wymuszania `metrics`).
- Prepend pustej pozycji Obiekcja: `{ label: '', response: '' }`.
- Nagłówki: Case — wypełniony `title` (trim) → `Case {title}`, pusty → `Case N` (1-based); Obiekcja — wypełniony `label` (trim) → `Obiekcja {label}`, pusty → `Obiekcja N`. Numer **tylko w UI**.
- **Bez** hicie globalnego (`text-xs text-muted-foreground`) nad listami Case / Obiekcje (w odróżnieniu od Oferty / CTA).
- Responsive: poniżej `lg` — `grid grid-cols-[minmax(0,1fr)_auto]` + `truncate` + `title`; od `lg` — `lg:flex lg:flex-wrap lg:justify-between` + `lg:overflow-visible lg:text-clip` (jak Oferta).
- Lista: `flex flex-col divide-y divide-border`; pozycja: `py-4 first:pt-0` (nie `border-t` per item).
- **Dodaj** nad listą, `justify-end`, `variant="outline"` `size="sm"`, ikona `lucide:plus`; **Usuń** w wierszu nagłówka, `variant="ghost"` `size="sm"`, ikona `lucide:trash-2` (gdy nie `readOnly`).
- Hashtagi / Notatki / CTA zapisu pod podzakładkami — **bez zmian**.
- Visual: Design Read — *self-host dashboard for operator/admin, calm B2B product language, shadcn + Tailwind v4 + Iconify, dials VARIANCE 3–4 / MOTION 3–4 / DENSITY 7–8*; dziedziczenie locku Fazy 1; **bez** nowej palety / kart dekoracyjnych.
- Zakaz `any` / nieuzasadnionych asercji.

---

## Biblioteki (research)

**Bez Context7** — wycinek to wyłącznie refaktor JSX/Tailwind w istniejącym `CompanyContextForm` (wzorce już w zakładkach Oferta / CTA). Brak nowych zależności npm.

| Temat | Ustalenie | Decyzja w wycinku |
|-------|-----------|-------------------|
| Lista Oferty | `company-context-form.tsx` — Dodaj / prepend / nagłówek / `divide-y` / responsive | Skopiować szkielet 1:1 na Case / Obiekcje |
| Typy extras | `company-context.types.ts` | **Nietknięte** |
| Visual lock | `content-chain-product-ui` | Dziedziczenie; te same `Button` / `FormField` / `Input` / `Textarea` |

Przy konflikcie praktyki ↔ SPEC → **wygrywa SPEC**.

---

## FAZA 1 — Case studies / Obiekcje: lista jak Oferta (Dodatki)

Odpowiada major Faza 19 (cała). Status startowy kroków: `NIE_ROZPOCZĘTY`.

---

### KROK 1 — Helpery nagłówków + refaktor Case studies

**Status:** `WYKONANY`

**Cel:** Podzakładka Case studies spełnia kanon listy Oferty z `docs/ux_dashboard.md` / `SPEC-FRONTEND.md` F-8. Major Faza 19; refaktor względem Fazy 2 / 2.1 (historia: Dodaj pod listą / append / Usuń pod polami / brak nagłówka).

**Artefakty:**

- Zmiana: `apps/frontend/src/modules/company-context/components/company-context-form.tsx`

#### Helpery nagłówków (obok `offerItemHeading` / `ctaItemHeading`)

**teraz:** (brak — po `ctaItemHeading`)

```typescript
function ctaItemHeading(label: string, index: number): string {
  const trimmed = label.trim();
  return trimmed.length > 0 ? trimmed : `CTA ${index + 1}`;
}
```

**zamień na:** (dopisz **po** `ctaItemHeading`)

```typescript
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
```

`objectionHeading` powstaje w tym kroku (gotowość pod KROK 2) — **nie** używaj go jeszcze w JSX Obiekcji w tym kroku.

#### `TabsContent value="caseStudies"`

**teraz:**

```tsx
            <TabsContent value="caseStudies" className="flex flex-col gap-3">
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
            </TabsContent>
```

**zamień na:**

```tsx
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
```

**Kolejność w kroku:** (1) helpery → (2) JSX Case studies.

**Biblioteki / API:** brak nowych; wzorzec klas = Oferta w tym samym pliku.

**Testy:** brak nowych automatycznych (Playwright poza zakresem major). Weryfikacja ręczna wg DoD.

**DoD kroku:**

- Funkcje `caseStudyHeading` / `objectionHeading` obecne; Case używa `caseStudyHeading`.
- **Dodaj case study** nad listą, `justify-end`; klik = **prepend** `{ title: '', summary: '' }`.
- Każda pozycja: nagłówek + **Usuń** w tym samym wierszu (gdy nie read-only); pola Tytuł → Streszczenie → Metryki.
- Lista w `divide-y`; responsive poniżej `lg` jak Oferta.
- **Brak** hicie globalnego nad listą Case.
- Hashtagi / Notatki / Obiekcje (jeszcze stary układ) nietknięte w tym kroku poza dodaniem helpera `objectionHeading`.

---

### KROK 2 — Refaktor Obiekcje (wzorzec Oferty)

**Status:** `WYKONANY`

**Cel:** Podzakładka Obiekcje spełnia ten sam kanon listy co Case / Oferta. Major Faza 19; `docs/ux_dashboard.md`; `SPEC-FRONTEND.md` F-8 „Nie wolno” (zakaz Dodaj pod listą / append / Usuń poza nagłówkiem / braku nagłówka / hicie).

**Artefakty:**

- Zmiana: `apps/frontend/src/modules/company-context/components/company-context-form.tsx` (tylko `TabsContent value="objections"`)

#### `TabsContent value="objections"`

**teraz:**

```tsx
            <TabsContent value="objections" className="flex flex-col gap-3">
              {(extras.objections ?? []).map((item, index) => (
                <div
                  key={`obj-${index}`}
                  className="flex flex-col gap-3 border-t border-border pt-3"
                >
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
            </TabsContent>
```

**zamień na:**

```tsx
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
```

**Biblioteki / API:** brak; użyj `objectionHeading` z KROK 1.

**Testy:** brak nowych automatycznych. Weryfikacja ręczna wg DoD.

**DoD kroku:**

- **Dodaj obiekcję** nad listą, `justify-end`; klik = **prepend** `{ label: '', response: '' }`.
- Nagłówek „Obiekcja {label}” / „Obiekcja N” + **Usuń** w wierszu; pola Obiekcja → Odpowiedź.
- `divide-y` + responsive jak Oferta; **bez** hicie globalnego.
- Hashtagi / Notatki / Case (po KROK 1) bez regresji układu.
- `company-context.types.ts` / `extrasForPut` / `isComplete` **nietknięte**.

---

#### Propozycja commit message

```text
feat(context): align case studies and objections lists with offer layout

Match Dodaj/prepend, row header+Usuń, divide-y, and lg-responsive chrome so Dodatki extras lists follow the same operator pattern as Oferta.
```

---

## Weryfikacja wycinka

| Kryterium | Oczekiwanie |
|-----------|-------------|
| Kotwica | Cała major Faza 19 pokryta (Case + Obiekcje); Hashtagi / Notatki poza |
| docs | `docs/ux_dashboard.md` — Case / Obiekcje jak Oferta |
| SPEC | `SPEC-FRONTEND.md` F-8 + „Nie wolno” (zakaz starego układu Case / Obiekcje) |
| API | Brak zmian kontraktu / bramki / strip |
| Kod | Refaktory jako `teraz → zamień na`; pomocnicze headingi w KROK 1 |
| Visual | Dziedziczenie locku; Design Read zapisany w założeniach |
| Pass rozwojowy | Helpery → Case → Obiekcje; brak przesunięć między fazami major |
| Nagłówki | Wyłącznie `FAZA` / `KROK`; commit message EN na końcu FAZA 1 |
| Statusy | Start: `NIE_ROZPOCZĘTY` |
| Major | Nietknięty w tej sesji |

**Checklist ręczna (po implementacji):**

1. Dodatki → Case studies: Dodaj po prawej nad listą; nowa pozycja na początku; pusty tytuł → „Case 1”; po wpisaniu tytułu nagłówek „Case …”; Usuń w wierszu nagłówka; poniżej `lg` truncate; brak hicie.
2. Dodatki → Obiekcje: to samo z „Obiekcja N” / „Obiekcja {label}”.
3. Hashtagi / Notatki bez zmian layoutu; zapis kontekstu nadal jeden PUT; strip pustych case/obiekcji jak dotychczas.
4. Read-only (nie-admin): brak Dodaj / Usuń; nagłówki nadal widoczne.

---

## Ślad do major (informacyjnie — po implementacji)

| Pozycja | Po implementacji feature planu |
|---------|--------------------------------|
| Faza 19 | `WYKONANY` (+ nota ze ścieżką tego pliku, analogicznie do Fazy 18) |
| MILESTONE 19 | **brak** — nic nie oznaczać `OSIĄGNIĘTY` |
| Faza 2 / 2.1 / MILESTONE 2 / 2.1 | **bez zmian** (historia) |

Aktualizacja pliku major = **poza** tą sesją (ręcznie lub przy `/feature-implementation`, gdy użytkownik tak zdecyduje).
