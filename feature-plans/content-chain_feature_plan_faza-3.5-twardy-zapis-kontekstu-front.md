# Content Chain — feature plan: Faza 3.5 (twardy zapis kontekstu — frontend)

**Lokalizacja:** `feature-plans/content-chain_feature_plan_faza-3.5-twardy-zapis-kontekstu-front.md`  
**Kotwica major:** Faza 3.5 (cała) — kroki **3.5.1** / **3.5.2** w `content-chain-frontend_major_plan.md`. **To nie jest Krok 3.5** (Lista Runy / archiwum, `WYKONANY`).  
**Refaktor względem:** Faza 2 / Krok 2.1 (`WYKONANY`) oraz Faza 2.1 (`WYKONANY`) — ten sam jeden `PUT` i te same zakładki/kropki; zmiana: UI nie wysyła i nie przyjmuje niekompletnej bramki.  
**Źródła:** `docs/ux_dashboard.md` (Widok: Kontekst firmy), `docs/dokumentacja_koncepcyjna.md` (tabela bramki), `docs/dokumentacja_komunikacji.md` (PUT 400 `VALIDATION_FAILED`), `spec/SPEC-FRONTEND.md` F-8, `spec/SPEC-KONTEKST-FIRMY.md` C-1 / C-4, `spec/SPEC-TESTY.md` T-7, skill `content-chain-product-ui`.  
**Zależność api (poza tym plikiem):** `content-chain-backend_major_plan.md` Faza 11 + `feature-plans/content-chain_feature_plan_faza-11-twardy-zapis-kontekstu.md`. Ten wycinek **nie** implementuje api. W produkcie: najpierw Faza 11 w kodzie, potem ten plan.

**Statusy kroków feature:** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`

**Design Read (dziedziczenie locku):** Reading this as: self-host dashboard for operator/admin, calm B2B product language, shadcn + Tailwind v4 + Iconify, dials VARIANCE 3–4 / MOTION 3–4 / DENSITY 7–8.

---

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Cała Faza 3.5 majoru FE: twardy zapis kontekstu z UI (predykat C-1, strip pustych placeholderów oferty, submit) |
| Major | Faza 3.5 / 3.5.1–3.5.2; start po Fazach 1, 2, 2.1, 3 (`WYKONANY`) i MILESTONE 1, 2, 2.1, 3 (`OSIĄGNIĘTY`) |
| Bramka ścieżki wstecz | Spełniona |
| Poza zakresem | Implementacja api (Faza 11); chip / `CompletenessProvider` jako źródło `missing`; IA zakładek; `PATCH` per zakładka; strip analogiczny dla CTA/audience; testy automatyczne FE; nowa paleta; BFF / `apiFetch` |
| Po implementacji (informacyjnie) | Major FE: Faza 3.5 i kroki 3.5.1–3.5.2 → `WYKONANY`; MILESTONE 3.5 → `OSIĄGNIĘTY`. Faza 2 / 2.1 / 3 i ich milestone’y **bez zmian** (historia). **Edycja major poza tym skillem.** |

**Mapa major → ten plik**

| Major | Feature | Zakres |
|-------|---------|--------|
| 3.5.1 | KROK 1 | Lokalna kopia C-1 + strip w pełni pustych placeholderów oferty w `companyContextForPut` |
| 3.5.1 | KROK 2 | Hint oferty, `aria-required` (bez HTML `required`), błędy kalekiej usługi, disable ostatniego „Usuń usługę” |
| 3.5.2 | KROK 3 | Brak PUT przy padającym predykacie; CTA Zapisz `disabled`; envelope 400 as-is; refetch chipa tylko po 200 |

**Pass rozwojowy (sesja planu):** KROK 2 i 3 aktywnie wołają `isComplete` / `isCompleteOfferItem` / `companyContextForPut` — helpery są w KROK 1 (w majorze 3.5.1 predykat i formularz są razem; tu rozdzielone, żeby formularz nie używał symboli „z przyszłości”). Strażnik `onSubmit` w widoku (KROK 3) powtarza predykat, bo Enter w inpucie omija sam `disabled` na przycisku tylko wtedy, gdy przycisk nie jest disabled — i tak strażnik zostaje, gdyby CTA było chwilowo klikalne. **Brak przesunięć między fazami major.**

**HOW zablokowane (SPEC wygrywa):**

- Predykat = **pełne C-1** (tożsamość, oferta `length ≥ 1` ∧ `every(isCompleteOfferItem)` z `description` w minimum, głos, CTA `every` etykieta, audience `every` opis). Nie import z `apps/api`. Nie źródło kropek / chipa.
- Strip wyłącznie **w pełni pustych** wierszy oferty. Kalekiej usługi nie stripujemy. CTA/audience bez analogicznego stripu.
- Atrybut HTML `required` **nie** jest bramką (`SPEC-FRONTEND.md` Nie wolno). Pusty placeholder oferty nie przejdzie natywnej walidacji, a po stripie mógłby być legalny — dlatego `required` nie ustawiamy; na `<form>` jest `noValidate`.
- Ostatnie „Usuń usługę” blokowane tylko gdy wiersz jest kompletny **i** to jedyna kompletna usługa. CTA/audience można zejść do zera w drafcie (submit i tak padnie na C-1).
- Wyjaśnienie `disabled`: tekst pod CTA (Button ma `disabled:pointer-events-none`, sam `title` na przycisku nie łapie hovera). Wzorzec `title` na opakowaniu — jak nieaktywna rejestracja na karcie logowania, plus copy widoczne.
- Testy automatyczne `apps/frontend` poza MVP (`SPEC-TESTY.md` T-7). DoD = zachowanie obserwowalne.

---

## Założenia

- Stack bez zmian: Next.js **16.3.0** App Router, React **19.2.8**, Tailwind v4, shadcn, `@iconify/react`, `@content-chain/shared`. `tsconfig` `strict: true`; **nie** włączamy `exactOptionalPropertyTypes` / `noUncheckedIndexedAccess`.
- Niepusty string = `trim().length > 0` (jak docs koncepcyjna).
- `companyContextForPut` już istnieje i jest jedynym body PUT (`putCompanyContext`). Strip oferty wchodzi **tam** — jeden canonical payload.
- Werdykt disable / strażnik submitu = `isComplete(companyContextForPut(draft)).complete` (podgląd tego, co poszłoby w body), nie surowy draft z placeholderami.
- Kropki: `completeness` z widoku (ostatni udany GET/PUT). `onChange` **nie** nadpisuje `completeness` z lokalnego `isComplete` (już tak jest — zachować).
- Chip: `CompletenessProvider.refetch` wyłącznie po **200**. Przy 400 i przy odrzucie lokalnym — bez `refetch`.
- `user` read-only bez zmian.
- Visual lock Fazy 1 dziedziczony. Zakaz nowej palety, toastów na walidację, `window.alert`, em-dash w copy, emoji.
- Zakaz `any`, nieuzasadnionych `as` / `!`. `import type` dla samych typów.
- Prettier jak sąsiedzi w module (single quote, semi, `trailingComma: all`).
- Copy UI: polski. Envelope: `code` + `message` as-is (F-7); bez mapy `details` na PL.

---

## Biblioteki (research)

**Źródło:** Context7 MCP, library ID `/reactjs/react.dev`. Wersja w projekcie: `react@19.2.8`.

| Temat | Ustalenie Context7 | Decyzja w wycinku |
|-------|--------------------|-------------------|
| Submit | `onSubmit` + `e.preventDefault()`; przycisk `disabled` przy walidacji / `pending` (przykład City quiz) | Zostaje kontrolowany formularz + `pending` z widoku. **Nie** `useFormStatus` / Server Actions (BFF `apiFetch`, nie `form action`) |
| Input `required` | Natywny atrybut istnieje na `<input>` | **Nie używamy** jako bramki. SPEC + placeholdery oferty. `noValidate` na `<form>` |

Przy konflikcie Context7 ↔ SPEC → **wygrywa SPEC**. Brak nowych zależności npm. shadcn `Button` / `Input` / `Textarea` / `FormField` bez zmiany kitu.

---

## FAZA 1 — Twardy zapis kontekstu firmy (UI)

Odpowiada major **Faza 3.5**. Jedna faza w tym zestawie.

---

### KROK 1 — Lokalna kopia C-1 i strip placeholderów oferty

**Status:** `WYKONANY`

**Cel:** FE ma czystą kopię predykatu C-1 i payload PUT bez w pełni pustych wierszy oferty. Major 3.5.1 (warstwa helperów); `SPEC-KONTEKST-FIRMY.md` C-1; `SPEC-FRONTEND.md` F-8 (kopia wyłącznie do disable / błędów pól w KROK 2–3).

**Artefakty:**

- Nowy: `apps/frontend/src/modules/company-context/lib/is-complete.ts`
- Zmiana: `apps/frontend/src/modules/company-context/api/company-context.types.ts` (`companyContextForPut`)

**Implementacja (kolejność):** nowy plik predykatu → strip w `companyContextForPut`. Formularz i widok **jeszcze** nie wołają predykatu (KROK 2–3). `putCompanyContext` już importuje `companyContextForPut` — po stripie happy path kompletny bez zmiany `api.ts`.

**Cykl importów:** `is-complete.ts` importuje typy i `GATE_SECTIONS` z `company-context.types.ts`. `types.ts` **nie** importuje `is-complete.ts` (unik cyklu). Strip w `companyContextForPut` używa lokalnego `nonEmpty` już obecnego w tym pliku.

#### Nowy plik — `lib/is-complete.ts`

Kompletny plik:

```ts
import {
  GATE_SECTIONS,
  type AudienceProfile,
  type CompanyContext,
  type Completeness,
  type CtaItem,
  type OfferItem,
} from '@/modules/company-context/api/company-context.types';

const nonEmpty = (value: string): boolean => value.trim().length > 0;

export function isCompleteOfferItem(item: OfferItem): boolean {
  return (
    nonEmpty(item.name) &&
    nonEmpty(item.description) &&
    item.benefit.length >= 1 &&
    item.benefit.every(nonEmpty)
  );
}

export function isCompleteCtaItem(item: CtaItem): boolean {
  return nonEmpty(item.label);
}

export function isCompleteAudienceProfile(profile: AudienceProfile): boolean {
  return nonEmpty(profile.description);
}

/** W pełni pusty wiersz UI — nie jest usługą; strip przed PUT. */
export function isEmptyOfferPlaceholder(item: OfferItem): boolean {
  return !nonEmpty(item.name) && !nonEmpty(item.description) && !item.benefit.some(nonEmpty);
}

/** Częściowo wypełniona pozycja — zostaje w drafcie i w body; submit ma paść. */
export function isCrippledOfferItem(item: OfferItem): boolean {
  return !isEmptyOfferPlaceholder(item) && !isCompleteOfferItem(item);
}

const sectionFilled: Record<
  (typeof GATE_SECTIONS)[number],
  (context: CompanyContext) => boolean
> = {
  identity: ({ identity }) => nonEmpty(identity.name) && nonEmpty(identity.description),
  offer: ({ offer }) => offer.items.length >= 1 && offer.items.every(isCompleteOfferItem),
  voice: ({ voice }) => nonEmpty(voice.weDo) && nonEmpty(voice.weDont),
  cta: ({ cta }) => cta.items.length >= 1 && cta.items.every(isCompleteCtaItem),
  audience: ({ audience }) =>
    audience.profiles.length >= 1 && audience.profiles.every(isCompleteAudienceProfile),
};

/**
 * Kopia C-1. Wyłącznie disable CTA zapisu, strażnik submitu i błędy pól oferty.
 * Nie wołać do kropek zakładek ani chipa (źródło = `completeness` z GET/PUT).
 */
export function isComplete(context: CompanyContext): Completeness {
  const missing = GATE_SECTIONS.filter((section) => !sectionFilled[section](context));
  return { complete: missing.length === 0, missing };
}

export function canRemoveOfferItem(items: readonly OfferItem[], index: number): boolean {
  const item = items[index];
  if (item === undefined) return false;
  const completeCount = items.filter(isCompleteOfferItem).length;
  return !(completeCount === 1 && isCompleteOfferItem(item));
}

export type OfferItemFieldErrors = {
  readonly name: string | null;
  readonly description: string | null;
  readonly benefit: string | null;
};

export function offerItemFieldErrors(item: OfferItem): OfferItemFieldErrors {
  if (!isCrippledOfferItem(item)) {
    return { name: null, description: null, benefit: null };
  }
  return {
    name: nonEmpty(item.name) ? null : 'Podaj nazwę usługi.',
    description: nonEmpty(item.description) ? null : 'Podaj opis usługi.',
    benefit:
      item.benefit.length >= 1 && item.benefit.every(nonEmpty)
        ? null
        : 'Podaj co najmniej jedną korzyść.',
  };
}
```

To jest **kopia** reguły C-1 (oraz HOW oferty z planu api Fazy 11), nie współdzielony moduł. `collectGateItemPaths` / `details` HTTP **nie** wchodzą do FE.

#### Refaktor — `companyContextForPut` (strip oferty)

**Plik:** `apps/frontend/src/modules/company-context/api/company-context.types.ts`  
**Symbol:** `companyContextForPut`

**teraz** (blok `offer`):

```ts
    offer: {
      items: context.offer.items.map((item) => ({
        name: item.name,
        description: item.description,
        benefit: [...item.benefit],
      })),
    },
```

**zamień na:**

```ts
    offer: {
      items: context.offer.items
        .filter(
          (item) =>
            nonEmpty(item.name) || nonEmpty(item.description) || item.benefit.some(nonEmpty),
        )
        .map((item) => ({
          name: item.name,
          description: item.description,
          benefit: [...item.benefit],
        })),
    },
```

`extrasForPut`, trim `cta.target`, reszta mapowania — **bez zmian**. Kaleka pozycja (np. nazwa bez opisu) **zostaje** w `items` i idzie w JSON, jeśli ktoś ominie UI; api Faza 11 ma wtedy odpowiedzieć 400.

**Testy:** brak nowego runnera FE (T-7). Weryfikacja KROK 1: po KROK 3 puste placeholdery nie są w body (Network), kaleka jest w draftcie i blokuje submit.

**DoD kroku:**

- Istnieje `isComplete` / `isCompleteOfferItem` w `modules/company-context/lib`, bez importu z `apps/api`.
- Predykat oferty: `items.length ≥ 1` ∧ każda pozycja z niepustym `name`, `description`, `benefit` (≥ 1 niepusty string, bez pustych wpisów po `trim`).
- W pełni pusty placeholder oferty nie wchodzi do `companyContextForPut`.
- Kaleki wiersz nie jest odfiltrowany.
- `extras` nie wpływają na `complete` / `missing` lokalnej kopii.
- Kropki i chip **nie** czytają tego pliku.

---

### KROK 2 — Formularz: hint, błędy kalekiej usługi, ostatnie Usuń

**Status:** `WYKONANY`

**Cel:** Widok Kontekst nie pozwala zejść do PUT z `offer.items: []` przez usunięcie ostatniej kompletnej usługi; kaleka usługa ma błąd pola; hint zgodny z minimum C-1. Major 3.5.1 (warstwa UI); `docs/ux_dashboard.md`; skill product-ui (błąd pod polem, `FormField` `gap-2` już jest).

**Artefakty:**

- Zmiana: `apps/frontend/src/modules/company-context/components/company-context-form.tsx`

**Implementacja (kolejność):** import helperów → hint oferty → błędy / `aria-invalid` na kalece → disable „Usuń usługę” → `aria-required` na polach bramki (bez `required`). Submit disable = KROK 3 (tu jeszcze CTA może wołać `onSubmit`; strażnik w KROK 3).

#### Importy

**teraz:**

```tsx
import {
  CONTEXT_TAB_LABELS,
  DEFAULT_CONTEXT_TAB,
  GATE_SECTIONS,
  GATE_SECTION_LABELS,
  type CompanyContext,
  type CompanyContextExtras,
  type Completeness,
} from '@/modules/company-context/api/company-context.types';
```

**zamień na:**

```tsx
import {
  CONTEXT_TAB_LABELS,
  DEFAULT_CONTEXT_TAB,
  GATE_SECTIONS,
  GATE_SECTION_LABELS,
  type CompanyContext,
  type CompanyContextExtras,
  type Completeness,
} from '@/modules/company-context/api/company-context.types';
import {
  canRemoveOfferItem,
  offerItemFieldErrors,
} from '@/modules/company-context/lib/is-complete';
```

#### Hint oferty

**teraz:**

```tsx
          <p className="text-xs text-muted-foreground">
            Minimum jedna usługa z nazwą i co najmniej jedną korzyścią.
          </p>
```

**zamień na:**

```tsx
          <p className="text-xs text-muted-foreground">
            Minimum jedna kompletna usługa: nazwa, opis i co najmniej jedna korzyść. Każda pozycja na
            liście musi być kompletna.
          </p>
```

#### Wiersz oferty — błędy pól i Usuń

W pętli `value.offer.items.map` **przed** `return` wiersza:

```tsx
              const fieldErrors = offerItemFieldErrors(item);
              const removeAllowed = canRemoveOfferItem(value.offer.items, index);
```

`FormField` nazwy — dopisz `error` i na `Input` `aria-required` / `aria-invalid`:

**teraz:**

```tsx
                <FormField label="Nazwa" htmlFor={`offer-name-${index}`}>
                  <Input
                    id={`offer-name-${index}`}
                    value={item.name}
                    disabled={readOnly}
                    onChange={(event) => {
```

**zamień na:**

```tsx
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
```

Analogicznie korzyści (`error={fieldErrors.benefit ?? undefined}`, `aria-invalid={fieldErrors.benefit !== null}`, `aria-required` na `Textarea`) i opis (`fieldErrors.description`).

Pusty placeholder: `offerItemFieldErrors` zwraca same `null` — **brak** czerwonych błędów (nie jest usługą).

**Usuń usługę — teraz:**

```tsx
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
```

**zamień na:**

```tsx
                  <span
                    className="self-start"
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
```

Kaleką / pusty placeholder można usunąć zawsze (o ile nie jest jedyną kompletną). Jedyna kompletna: `disabled` + widoczny `title` na `span` (hover przechodzi przez `pointer-events-none` przycisku).

#### `aria-required` na pozostałych polach bramki

Na kontrolkach **Tożsamość, Głos SM, etykieta CTA, profil odbiorcy** dopisz `aria-required` (boolean `true`). **Bez** atrybutu `required`. **Bez** `aria-required` na `cta.target` i na polach Dodatki (`extras`).

Przykład (nazwa firmy):

**teraz:**

```tsx
            <Input
              id="identity-name"
              value={value.identity.name}
              disabled={readOnly}
              onChange={(event) =>
```

**zamień na:**

```tsx
            <Input
              id="identity-name"
              value={value.identity.name}
              disabled={readOnly}
              aria-required
              onChange={(event) =>
```

To samo: `identity-description`, `voice-we-do`, `voice-we-dont`, `cta-label-${index}`, `audience-${index}`.

Kropki na triggerach: **bez zmian** (`completeness.missing` z props). Zakładka Dodatki bez kropki — bez zmian.

**DoD kroku:**

- Hint oferty mówi o nazwie + opisie + ≥ 1 korzyści i o kompletności **każdej** pozycji.
- Kaleka usługa: błąd pod pustym wymaganym polem tej pozycji (`role="alert"` już w `FormField`); `aria-invalid` na kontrolce.
- Placeholder pustej oferty bez błędów pól.
- `Usuń usługę` nie usuwa ostatniej kompletnej pozycji.
- Kropki nadal z `missing` odpowiedzi, nie z draftu.
- Brak HTML `required`.

---

### KROK 3 — Submit, envelope, chip

**Status:** `WYKONANY`

**Cel:** Widok nie woła PUT, gdy predykat na podglądzie body pada. 400 z api (ominiecie UI / wyścig) pokazuje envelope as-is i nie rusza chipa. Major 3.5.2; F-7 / F-8; C-4 egzekwuje api, nie ten krok.

**Artefakty:**

- Zmiana: `apps/frontend/src/modules/company-context/components/company-context-form.tsx` (`FormActions`, `onSubmit` formularza)
- Zmiana: `apps/frontend/src/modules/company-context/components/company-context-view.tsx`

**Implementacja (kolejność):** `canSubmit` w formularzu → disable CTA + copy → strażnik `onSubmit` w formularzu → strażnik w widoku (bez `setPending` / bez `put` / bez `refetch`).

#### Formularz — `canSubmit` i `noValidate`

Na początku `CompanyContextForm`, po `const extras = ...`:

```tsx
  const canSubmit = isComplete(companyContextForPut(value)).complete;
```

Dopisz importy:

```tsx
import { companyContextForPut } from '@/modules/company-context/api/company-context.types';
import {
  canRemoveOfferItem,
  isComplete,
  offerItemFieldErrors,
} from '@/modules/company-context/lib/is-complete';
```

(`companyContextForPut` można dołączyć do istniejącego importu z `company-context.types` zamiast drugiej linii.)

**`<form>` — teraz:**

```tsx
    <form
      className="flex max-w-3xl flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
```

**zamień na:**

```tsx
    <form
      className="flex max-w-3xl flex-col gap-4"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        if (readOnly || pending || !canSubmit) return;
        onSubmit();
      }}
    >
```

#### `FormActions`

**teraz:**

```tsx
function FormActions({
  readOnly,
  pending,
  error,
}: {
  readonly readOnly: boolean;
  readonly pending: boolean;
  readonly error: { readonly code: string; readonly message: string } | null;
}) {
  return (
    <div className="flex flex-col gap-3 pt-2">
      {error ? <EnvelopeError code={error.code} message={error.message} /> : null}
      {readOnly ? (
        <p className="text-sm text-muted-foreground">Tylko administrator może zapisać kontekst.</p>
      ) : (
        <Button type="submit" disabled={pending} className="self-start">
          {pending ? 'Zapisywanie…' : 'Zapisz kontekst'}
        </Button>
      )}
    </div>
  );
}
```

**zamień na:**

```tsx
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
              Zapis wymaga kompletnej bramki. Puste wymagane pole albo kaleka usługa blokują PUT.
            </p>
          ) : null}
        </>
      )}
    </div>
  );
}
```

Wszystkie wywołania `<FormActions ... />` (sześć paneli) dopisują `canSubmit={canSubmit}`.

Nie pokazujemy lokalnego `missing` jako listy sekcji przy CTA — to nie może udawać chipa / kropek.

#### Widok — strażnik PUT i chip

**Plik:** `company-context-view.tsx`

Import:

```tsx
import { companyContextForPut, withDraftRows, type CompanyContext, type Completeness } from '@/modules/company-context/api/company-context.types';
import { isComplete } from '@/modules/company-context/lib/is-complete';
```

(dostosuj do istniejącego importu `withDraftRows` / typów — bez duplikatu.)

**teraz:**

```tsx
  async function onSubmit(): Promise<void> {
    if (view.status !== 'ready' || readOnly) return;
    setPending(true);
    setSubmitError(null);
    try {
      const payload = await putCompanyContext(view.context);
      setView({
        status: 'ready',
        context: withDraftRows(payload),
        completeness: payload.completeness,
      });
      await refetch();
    } catch (reason: unknown) {
      if (reason instanceof ApiError) {
        setSubmitError({ code: reason.envelope.code, message: reason.envelope.message });
      } else {
        setSubmitError(FALLBACK);
      }
    } finally {
      setPending(false);
    }
  }
```

**zamień na:**

```tsx
  async function onSubmit(): Promise<void> {
    if (view.status !== 'ready' || readOnly) return;
    if (!isComplete(companyContextForPut(view.context)).complete) return;
    setPending(true);
    setSubmitError(null);
    try {
      const payload = await putCompanyContext(view.context);
      setView({
        status: 'ready',
        context: withDraftRows(payload),
        completeness: payload.completeness,
      });
      await refetch();
    } catch (reason: unknown) {
      if (reason instanceof ApiError) {
        setSubmitError({ code: reason.envelope.code, message: reason.envelope.message });
      } else {
        setSubmitError(FALLBACK);
      }
    } finally {
      setPending(false);
    }
  }
```

Zachowanie już poprawne i **do utrzymania:**

- `onChange` ustawia `completeness: view.completeness` (ostatni udany GET/PUT), nigdy wynik lokalnego `isComplete`.
- `refetch()` tylko w `try` po udanym `putCompanyContext` (200). Gałąź `catch` (400 `VALIDATION_FAILED` itd.) **nie** woła `refetch` i **nie** nadpisuje `view.completeness`.
- Envelope: `EnvelopeError` z `code` + `message` as-is — bez tłumaczenia, bez toastu.
- `user`: wcześniejszy `return` przy `readOnly`; przycisk zapisu nie istnieje.

Happy path: kompletna bramka (po stripie placeholderów) → **jeden** `PUT` całości, wszystkie zakładki w body, w tym nieaktywna.

**DoD kroku:**

- Admin nie utrwali pustej nazwy / kalekiej usługi / `offer.items: []` przez UI (brak requestu PUT albo, po ominięciu, 400 i DB bez zmiany po stronie api).
- CTA Zapisz `disabled` przy niekompletnej bramce na podglądzie `companyContextForPut`; copy wyjaśnia dlaczego.
- Enter w polu nie omija strażnika.
- Envelope 400 bez mapy tłumaczeń; chip i kropki nie skaczą z draftu.
- Happy path kompletny → jeden PUT; zakładki bez zmian z Fazy 2.1.

---

#### Propozycja commit message

```text
feat(company-context): refuse incomplete gate context on save

Keep tab dots and the agents chip on the last successful GET/PUT while
the form blocks empty required fields and crippled offer rows.
```

---

## Weryfikacja wycinka

| Kryterium | Jak sprawdzić |
|-----------|----------------|
| Kotwica 3.5.1 / 3.5.2 | Predykat + strip + formularz + submit pokryte KROK 1–3 |
| C-1 lokalnie, C-4 w api | FE nie importuje `apps/api`; persist nadal api Faza 11 |
| F-8 kropki / chip | `GateCompletenessDot` i `CompletenessChip` bez nowej logiki draftu |
| F-7 envelope | 400 = `code` + `message` as-is |
| Placeholdery vs kaleka | Pusty wiersz znika z body; częściowy zostaje i blokuje CTA |
| Ostatnia kompletna usługa | Usuń disabled; PUT nie wychodzi z `items: []` |
| `user` | Read-only, komunikat bez zmian |
| Visual lock | Dziedziczenie; błąd pod polem; helper przy disabled; bez nowej palety |
| T-7 | Brak nowego runnera testów FE |
| Nagłówki | Wyłącznie `FAZA` / `KROK` |
| Major | Nietknięty w tej sesji |

**Poza weryfikacją tego pliku:** e2e D-29 i 400 bez upsert = api Faza 11.

---

## Ślad do major (informacyjnie)

Po **implementacji** tego planu (osobna sesja, np. ręczne `/feature-implementation`) — **nie** w tej sesji:

| Element | Status docelowy |
|---------|-----------------|
| Faza 3.5 | `WYKONANY` |
| Krok 3.5.1 | `WYKONANY` |
| Krok 3.5.2 | `WYKONANY` |
| MILESTONE 3.5 | `OSIĄGNIĘTY` |

Faza 2 / 2.1 / 3 i MILESTONE 1–3 bez edycji. Faza 4 pozostaje `NIE_ROZPOCZĘTY` do akceptacji przejścia po Milestone 3.5. Backend Faza 11 — osobny major / osobny feature plan.
