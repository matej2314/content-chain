# Content Chain — feature plan: Audience `name` + select „Grupa” (Faza 18)

**Lokalizacja:** `feature-plans/content-chain_feature_plan_faza-18-audience-name-grupa-select.md`  
**Kotwica major:** Faza 18 (cała) — `content-chain-frontend_major_plan.md` (`NIE_ROZPOCZĘTY`, **bez** MILESTONE 18).  
**Refaktor względem:** Faza 2 / Krok 2.1 oraz Faza 2.1 (`WYKONANY`) — zakładka Odbiorca bez wymaganego pola **Nazwa**; Faza 3 / Krok 3.1 (`WYKONANY`) — wolny input „Grupa”; Faza 3.5 (`WYKONANY`) — lokalna bramka bez `name` / unikalności; Faza 7 (`WYKONANY`) — ten sam formularz briefu (Konto + modal) — select musi być wspólny.  
**Źródła:** `docs/ux_dashboard.md`, `docs/dokumentacja_koncepcyjna.md`, `docs/dictionary.md`, `docs/dokumentacja_komunikacji.md`, `SPEC-FRONTEND.md` F-7 / F-8, `SPEC-KONTEKST-FIRMY.md` C-1 / C-4, major FE Faza 18. Skill wizualny: `content-chain-product-ui` (dziedziczenie locku Fazy 1).  
**Kolejność `KROK` w tym pliku:** typ `name` → lokalna bramka + unikalność → UI Odbiorca → model trybu Grupy → `StartRunForm` + fetch katalogu + prefill (pass rozwojowy: kontrakt typów i helper trybu **przed** selectem / prefillem).

**Statusy kroków feature:** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`

---

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Cała Faza 18 majoru FE: wymagane `AudienceProfile.name` w UI i lokalnej bramce; unikalność nazw przed PUT; select **Grupa** (3 tryby) na Koncie i w modalu Runy; źródło opcji = GET kontekstu firmy |
| Major | Faza 18; start po Fazach 1–17 (`WYKONANY`) i Milestone 1–6 / 2.1 / 3.5 / 3.6 (`OSIĄGNIĘTY`); **bez** MILESTONE 18 |
| Poza zakresem | Implementacja api / major BE Faza 22; FK / `audienceProfileId`; Playwright; nowa paleta; semantyka outline `audience_world`; zmiana endpointu completeness jako źródła opcji selecta |
| Po implementacji (informacyjnie) | Major FE: Faza 18 → `WYKONANY` (DoD gate + kod z feature planu). Brak `MILESTONE` 18. Edycja major **poza** tym skillem |

**Mapa major → ten plik**

| Major HOW (wskazówka) | Feature | Zakres |
|-----------------------|---------|--------|
| 1–2 (typ + lokalna bramka) | FAZA 1 / KROK 1–2 | `name` w typie/parserze/PUT; `isComplete` + unikalność + błędy pól |
| 1 + 6 (UI Odbiorca + lock) | FAZA 1 / KROK 3 | Formularz Nazwa + Opis, nagłówek po nazwie |
| 3–5 (select + katalog + prefill) | FAZA 2 / KROK 1–2 | Model trybu; `StartRunForm` + fetch + `draftFromSnapshot` |

**Pass rozwojowy (sesja planu):** typ `name` i helper unikalności **przed** UI Odbiorcy; unia trybu Grupy + mapowanie do `brief.audience` **przed** UI selecta i prefillem. Prefill z katalogiem nazw w `AccountView` (nie sam completeness). **Brak przesunięć między fazami major.**

---

## Założenia

- Stack FE bez zmian: Next.js 16 App Router, React 19, Tailwind v4, shadcn kit, `NativeSelect` (bez nowego Radix Select), Iconify, TypeScript `strict` jak w `apps/frontend`.
- `AudienceProfile = { name: string; description: string }` — oba wymagane w lokalnej kopii C-1 (`isCompleteAudienceProfile`).
- Unikalność `name`: po `trim`, porównanie **case-insensitive**; kolizja → `canSubmit === false` + błąd pod polem Nazwa (bez PUT). Unikalność **nie** jest kluczem w `completeness.missing` z API — lokalny strażnik zapisu (jak kaleka oferta).
- `brief.audience?` pozostaje opcjonalnym stringiem — **bez** nowego klucza API.
- Trzy tryby (SPEC-FRONTEND F-7): (1) „Bez wskazania grupy” → omit; (2) wybór `name` z katalogu → `brief.audience` = ten `name`; (3) „Wpisz własną grupę…” → `brief.audience` = opis z pola tekstowego; **bez** matcha custom → katalog.
- Select Grupa: istniejący `NativeSelect` (spójnie z typem / platformą / językiem w tym samym formularzu).
- Źródło opcji: `fetchCompanyContext()` → `audience.profiles[].name` (niepustych po trim); **zakaz** budowania listy z samego `GET .../completeness`.
- Prefill (Konto): `draftFromSnapshot(snapshot, profileNames)` — match catalog **tylko** gdy string briefu (trim, CI) równa się `name` profilu; inaczej tryb custom; puste → none.
- Visual: Design Read — *self-host dashboard for operator/admin, calm B2B product language, shadcn + Tailwind v4 + Iconify, dials VARIANCE 3–4 / MOTION 3–4 / DENSITY 7–8*; dziedziczenie locku Fazy 1; etykieta **„Nazwa”** (nie „Tytuł”); opcja custom **„Wpisz własną grupę…”**.
- Zakaz `any` / nieuzasadnionych asercji; unia dyskryminowana dla trybu Grupy.

---

## Biblioteki (research)

**Bez Context7** — wycinek to typy FE + istniejące kontrolki (`Input`, `Textarea`, `NativeSelect`, `FormField`) i `fetchCompanyContext`. Brak nowych zależności npm.

| Temat | Ustalenie | Decyzja w wycinku |
|-------|-----------|-------------------|
| Select | `NativeSelect` już w `StartRunForm` | Trzy tryby Grupy na tym samym komponencie |
| Fetch kontekstu | `fetchCompanyContext` w `company-context.api.ts` | Opcje selecta + `profileNames` przy prefill |
| Typowanie | `typescript-practices` + `strict` FE | Unia `AudienceGroupMode`; parser `name` jak `description` |

Przy konflikcie praktyki ↔ SPEC → **wygrywa SPEC**.

---

## FAZA 1 — Typy, lokalna bramka, UI Odbiorca

Odpowiada major Faza 18 (część kontekst / Odbiorca). Status startowy kroków: `NIE_ROZPOCZĘTY`.

---

### KROK 1 — Typ `AudienceProfile.name`: parser, PUT, draft wierszy

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Kontrakt FE egzekwuje `AudienceProfile = { name, description }` przy GET/PUT i w draftcie formularza. Major Faza 18 HOW 1; `SPEC-KONTEKST-FIRMY.md` C-1; `docs/dictionary.md`.

**Artefakty:**

- Zmiana: `apps/frontend/src/modules/company-context/api/company-context.types.ts`

#### Typ

**teraz:**

```typescript
export type AudienceProfile = {
  readonly description: string;
};
```

**zamień na:**

```typescript
export type AudienceProfile = {
  readonly name: string;
  readonly description: string;
};
```

#### `parseAudienceProfile`

**teraz:**

```typescript
function parseAudienceProfile(value: unknown): AudienceProfile {
  if (!isRecord(value) || typeof value.description !== 'string') {
    throw new Error('Invalid audience profile');
  }
  return { description: value.description };
}
```

**zamień na:**

```typescript
function parseAudienceProfile(value: unknown): AudienceProfile {
  if (
    !isRecord(value) ||
    typeof value.name !== 'string' ||
    typeof value.description !== 'string'
  ) {
    throw new Error('Invalid audience profile');
  }
  return { name: value.name, description: value.description };
}
```

#### `companyContextForPut` — audience

**teraz:**

```typescript
    audience: {
      profiles: context.audience.profiles.map((profile) => ({
        description: profile.description,
      })),
    },
```

**zamień na:**

```typescript
    audience: {
      profiles: context.audience.profiles.map((profile) => ({
        name: profile.name,
        description: profile.description,
      })),
    },
```

#### `withDraftRows` — pusty profil

**teraz:**

```typescript
    audience: {
      profiles:
        context.audience.profiles.length > 0 ? context.audience.profiles : [{ description: '' }],
    },
```

**zamień na:**

```typescript
    audience: {
      profiles:
        context.audience.profiles.length > 0
          ? context.audience.profiles
          : [{ name: '', description: '' }],
    },
```

**DoD kroku:**

- Parser odrzuca profil bez stringowego `name`.
- PUT body zawiera `name` na każdym profilu.
- Pusty wiersz draftu ma `{ name: '', description: '' }`.

---

### KROK 2 — `isComplete` + unikalność nazw + błędy pól

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Lokalna kopia C-1 wymaga niepustego `name`; kolizja nazw (trim, CI) blokuje submit przed PUT; błędy pól Nazwa/Opis jak w ofercie. Major Faza 18 HOW 2; `SPEC-FRONTEND.md` F-8; `SPEC-KONTEKST-FIRMY.md` C-1 / C-4 (unikalność jako reguła zapisu, nie klucz `missing`).

**Artefakty:**

- Nowy: `apps/frontend/src/modules/company-context/lib/audience-profile-names.ts`
- Zmiana: `apps/frontend/src/modules/company-context/lib/is-complete.ts`
- Zmiana: `apps/frontend/src/modules/company-context/components/company-context-form.tsx` (tylko `canSubmit` — UI pól w KROK 3)

#### Nowy plik — `audience-profile-names.ts` (kompletny)

```typescript
import type { AudienceProfile } from '@/modules/company-context/api/company-context.types';

export function normalizeAudienceProfileName(value: string): string {
  return value.trim().toLowerCase();
}

/** Unikalność `name` (trim, case-insensitive). Puste nazwy pomijane — łapie je `isComplete`. */
export function areAudienceProfileNamesUnique(
  profiles: readonly AudienceProfile[],
): boolean {
  const seen = new Set<string>();
  for (const profile of profiles) {
    const key = normalizeAudienceProfileName(profile.name);
    if (key.length === 0) continue;
    if (seen.has(key)) return false;
    seen.add(key);
  }
  return true;
}

export function isDuplicateAudienceProfileName(
  profiles: readonly AudienceProfile[],
  index: number,
): boolean {
  const current = profiles[index];
  if (current === undefined) return false;
  const key = normalizeAudienceProfileName(current.name);
  if (key.length === 0) return false;
  return profiles.some(
    (profile, profileIndex) =>
      profileIndex !== index && normalizeAudienceProfileName(profile.name) === key,
  );
}
```

#### `isCompleteAudienceProfile`

**teraz:**

```typescript
export function isCompleteAudienceProfile(profile: AudienceProfile): boolean {
  return nonEmpty(profile.description);
}
```

**zamień na:**

```typescript
export function isCompleteAudienceProfile(profile: AudienceProfile): boolean {
  return nonEmpty(profile.name) && nonEmpty(profile.description);
}
```

#### Dopisek w `is-complete.ts` — błędy pól audience (po `offerItemFieldErrors`)

```typescript
import { isDuplicateAudienceProfileName } from '@/modules/company-context/lib/audience-profile-names';

export type AudienceProfileFieldErrors = {
  readonly name: string | null;
  readonly description: string | null;
};

export function audienceProfileFieldErrors(
  profile: AudienceProfile,
  profiles: readonly AudienceProfile[],
  index: number,
): AudienceProfileFieldErrors {
  const nameEmpty = !nonEmpty(profile.name);
  const descriptionEmpty = !nonEmpty(profile.description);
  const duplicate = isDuplicateAudienceProfileName(profiles, index);
  return {
    name: nameEmpty
      ? 'Podaj nazwę profilu.'
      : duplicate
        ? 'Nazwa profilu musi być unikalna.'
        : null,
    description: descriptionEmpty ? 'Podaj opis profilu.' : null,
  };
}
```

#### `canSubmit` w `company-context-form.tsx`

**teraz:**

```typescript
  const canSubmit = isComplete(companyContextForPut(value)).complete;
```

**zamień na:**

```typescript
  const putPayload = companyContextForPut(value);
  const canSubmit =
    isComplete(putPayload).complete &&
    areAudienceProfileNamesUnique(putPayload.audience.profiles);
```

(Import `areAudienceProfileNamesUnique` z `audience-profile-names.ts`.)

**DoD kroku:**

- Profil z pustym `name` → `isComplete(...).complete === false` / sekcja `audience` w `missing`.
- Dwa profile „B2B” / „b2b” → `canSubmit === false`; `audienceProfileFieldErrors` niesie komunikat unikalności pod Nazwą.
- Unikalność **nie** zmienia kształtu `Completeness` z API (kropki nadal z `missing` odpowiedzi).

---

### KROK 3 — Formularz Odbiorca: Nazwa + Opis, nagłówek po nazwie

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Zakładka Odbiorca jak kanon Oferty (lista `divide-y`, nagłówek + Usuń, pola **Nazwa → Opis**); etykieta **„Nazwa”**; lista czytelna po nazwie. Major Faza 18 HOW 1 + 6; `docs/ux_dashboard.md`; `content-chain-product-ui` (dziedziczenie).

**Artefakty:**

- Zmiana: `apps/frontend/src/modules/company-context/components/company-context-form.tsx`

#### Helper nagłówka (obok `offerItemHeading`)

```typescript
function audienceProfileHeading(name: string, index: number): string {
  const trimmed = name.trim();
  return trimmed.length > 0 ? trimmed : `Profil ${index + 1}`;
}
```

#### Blok `TabsContent value="audience"` — **zamień cały** obecny blok (mapa profili + Dodaj) na:

```tsx
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
          <FormActions readOnly={readOnly} pending={pending} canSubmit={canSubmit} error={error} />
        </TabsContent>
```

Importy: `audienceProfileFieldErrors` z `is-complete`; `Input` już jest w pliku.

**Uwaga prezentacji:** Dodaj nad listą + prepend — spójnie z Ofertą / CTA (`docs/ux_dashboard.md` wzorzec listy). Etykieta wyłącznie **„Nazwa”**.

**DoD kroku:**

- Operator widzi pola Nazwa + Opis; nagłówek = wypełniona nazwa albo „Profil N”.
- Puste Nazwa/Opis lub duplikat → błąd pola + disabled Zapisz.
- Brak nowej palety / kart dekoracyjnych.

---

#### Propozycja commit message

```text
feat(company-context): require audience profile name in gate and form

Local C-1 and unique trimmed names must pass before PUT so the catalog
matches the company-context contract for run-group selection.
```

---

## FAZA 2 — Select „Grupa” przy starcie runu + prefill

Odpowiada major Faza 18 (część start runu / Faza 7 reuse). Status startowy kroków: `NIE_ROZPOCZĘTY`.

---

### KROK 1 — Model trybu Grupy + mapowanie do `brief.audience`

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Jedna unia dyskryminowana dla trzech trybów; czyste funkcje mapujące do opcjonalnego `brief.audience` i odwrotnie (prefill z katalogiem). Major Faza 18 HOW 3–5; `SPEC-FRONTEND.md` F-7.

**Artefakty:**

- Nowy: `apps/frontend/src/modules/runs/lib/audience-group.ts`

#### Nowy plik — `audience-group.ts` (kompletny)

```typescript
export const AUDIENCE_GROUP_NONE_VALUE = '__none__' as const;
export const AUDIENCE_GROUP_CUSTOM_VALUE = '__custom__' as const;

export type AudienceGroupMode =
  | { readonly kind: 'none' }
  | { readonly kind: 'catalog'; readonly name: string }
  | { readonly kind: 'custom'; readonly description: string };

export function emptyAudienceGroup(): AudienceGroupMode {
  return { kind: 'none' };
}

export function audienceGroupToBriefAudience(
  mode: AudienceGroupMode,
): string | undefined {
  switch (mode.kind) {
    case 'none':
      return undefined;
    case 'catalog': {
      const name = mode.name.trim();
      return name.length > 0 ? name : undefined;
    }
    case 'custom': {
      const description = mode.description.trim();
      return description.length > 0 ? description : undefined;
    }
  }
}

function normalizeName(value: string): string {
  return value.trim().toLowerCase();
}

/**
 * Prefill / resolve: match katalogu tylko gdy string (trim, CI) = `name` profilu.
 * Inaczej custom — bez „udawanego” matcha przy typowaniu użytkownika w trybie Wpisz…
 */
export function resolveAudienceGroupMode(
  briefAudience: string | undefined,
  profileNames: readonly string[],
): AudienceGroupMode {
  if (briefAudience === undefined || briefAudience.trim().length === 0) {
    return { kind: 'none' };
  }
  const trimmed = briefAudience.trim();
  const key = normalizeName(trimmed);
  const catalogName = profileNames.find((name) => normalizeName(name) === key);
  if (catalogName !== undefined) {
    return { kind: 'catalog', name: catalogName };
  }
  return { kind: 'custom', description: trimmed };
}

export function audienceGroupSelectValue(mode: AudienceGroupMode): string {
  switch (mode.kind) {
    case 'none':
      return AUDIENCE_GROUP_NONE_VALUE;
    case 'catalog':
      return mode.name;
    case 'custom':
      return AUDIENCE_GROUP_CUSTOM_VALUE;
  }
}

export function audienceGroupFromSelectValue(
  value: string,
  previous: AudienceGroupMode,
  profileNames: readonly string[],
): AudienceGroupMode {
  if (value === AUDIENCE_GROUP_NONE_VALUE) {
    return { kind: 'none' };
  }
  if (value === AUDIENCE_GROUP_CUSTOM_VALUE) {
    const description =
      previous.kind === 'custom'
        ? previous.description
        : previous.kind === 'catalog'
          ? previous.name
          : '';
    return { kind: 'custom', description };
  }
  if (profileNames.some((name) => name === value)) {
    return { kind: 'catalog', name: value };
  }
  return { kind: 'none' };
}
```

**DoD kroku:**

- `audienceGroupToBriefAudience({ kind: 'none' })` → `undefined` (omit).
- Catalog → dokładnie `name`; custom → opis; brak auto-match w `audienceGroupFromSelectValue` przy wyborze „Wpisz…”.
- `resolveAudienceGroupMode('B2B', ['b2b'])` → catalog z zachowanym `name` z katalogu (`b2b`); `'wolny opis'` → custom.

---

### KROK 2 — `StartRunForm`: select + fetch katalogu + pole custom; prefill ze snapshotu

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Wspólny formularz (Konto + modal Fazy 7): **Grupa** = `NativeSelect` z trzema trybami; opcje z GET kontekstu; mapowanie POST wg F-7; prefill na Koncie z katalogiem nazw. Major Faza 18 HOW 3–5; `docs/ux_dashboard.md`.

**Artefakty:**

- Zmiana: `apps/frontend/src/modules/runs/components/start-run-form.tsx`
- Zmiana: `apps/frontend/src/modules/runs/components/account-view.tsx`
- Bez zmiany kontraktu propsów modalu (`start-agent-dialog.tsx` — tylko nowy kształt `StartRunDraft` przez import typu).

#### `StartRunDraft` / `EMPTY_START_DRAFT` / `toInput` / `draftFromSnapshot`

**teraz (fragment):**

```typescript
export type StartRunDraft = {
  // …
  readonly audience: string;
  // …
};

export const EMPTY_START_DRAFT: StartRunDraft = {
  // …
  audience: '',
  // …
};

export function draftFromSnapshot(snapshot: RunSnapshot): StartRunDraft {
  const brief = snapshot.brief;
  return {
    // …
    audience: brief.audience ?? '',
    // …
  };
}

// w toInput:
...(draft.audience.trim() ? { audience: draft.audience } : {}),
```

**zamień na:**

```typescript
import {
  type AudienceGroupMode,
  audienceGroupToBriefAudience,
  emptyAudienceGroup,
  resolveAudienceGroupMode,
} from '@/modules/runs/lib/audience-group';

export type StartRunDraft = {
  readonly taskType: RunTaskType;
  readonly platform: SocialPlatform;
  readonly contentKind: ContentKind;
  readonly language: ContentLanguage;
  readonly topic: string;
  readonly audienceGroup: AudienceGroupMode;
  readonly goal: string;
  readonly ideaCount: string;
  readonly angle: string;
  readonly targetLength: string;
};

export const EMPTY_START_DRAFT: StartRunDraft = {
  taskType: 'post_ideas',
  platform: 'linkedin',
  contentKind: 'blog',
  language: 'pl',
  topic: '',
  audienceGroup: emptyAudienceGroup(),
  goal: '',
  ideaCount: '',
  angle: '',
  targetLength: '',
};

export function draftFromSnapshot(
  snapshot: RunSnapshot,
  profileNames: readonly string[],
): StartRunDraft {
  const brief = snapshot.brief;
  return {
    taskType: snapshot.taskType,
    platform: snapshot.platform === 'web' ? 'linkedin' : snapshot.platform,
    contentKind: snapshot.contentKind ?? 'blog',
    language: snapshot.language,
    topic: brief.topic,
    audienceGroup: resolveAudienceGroupMode(brief.audience, profileNames),
    goal: brief.goal ?? '',
    ideaCount: 'ideaCount' in brief && brief.ideaCount !== undefined ? String(brief.ideaCount) : '',
    angle: 'angle' in brief ? (brief.angle ?? '') : '',
    targetLength:
      'targetLength' in brief && brief.targetLength !== undefined ? String(brief.targetLength) : '',
  };
}

function toInput(draft: StartRunDraft): StartRunInput | null {
  if (draft.topic.trim().length === 0) return null;
  const audience = audienceGroupToBriefAudience(draft.audienceGroup);
  if (isContentTaskType(draft.taskType)) {
    const targetLength = draft.targetLength.trim();
    const parsedLength = targetLength.length === 0 ? undefined : Number(targetLength);
    if (parsedLength !== undefined && (!Number.isInteger(parsedLength) || parsedLength < 1)) {
      return null;
    }
    return {
      taskType: draft.taskType,
      contentKind: draft.contentKind,
      language: draft.language,
      brief: {
        topic: draft.topic,
        ...(audience !== undefined ? { audience } : {}),
        ...(draft.goal.trim() ? { goal: draft.goal } : {}),
        ...(draft.angle.trim() ? { angle: draft.angle } : {}),
        ...(parsedLength !== undefined ? { targetLength: parsedLength } : {}),
      },
    };
  }
  const ideaCount = draft.ideaCount.trim();
  const parsedCount = ideaCount.length === 0 ? undefined : Number(ideaCount);
  if (parsedCount !== undefined && (!Number.isInteger(parsedCount) || parsedCount < 1)) {
    return null;
  }
  return {
    taskType: draft.taskType,
    platform: draft.platform,
    language: draft.language,
    brief: {
      topic: draft.topic,
      ...(audience !== undefined ? { audience } : {}),
      ...(draft.goal.trim() ? { goal: draft.goal } : {}),
      ...(parsedCount !== undefined ? { ideaCount: parsedCount } : {}),
    },
  };
}
```

#### Fetch katalogu + UI Grupa w `StartRunForm`

W komponencie (obok istniejących hooków):

```typescript
import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { fetchCompanyContext } from '@/modules/company-context/api/company-context.api';
import {
  AUDIENCE_GROUP_CUSTOM_VALUE,
  AUDIENCE_GROUP_NONE_VALUE,
  audienceGroupFromSelectValue,
  audienceGroupSelectValue,
} from '@/modules/runs/lib/audience-group';

// wewnątrz StartRunForm:
  const [profileNames, setProfileNames] = useState<readonly string[]>([]);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const payload = await fetchCompanyContext();
        if (cancelled) return;
        setProfileNames(
          payload.audience.profiles
            .map((profile) => profile.name.trim())
            .filter((name) => name.length > 0),
        );
      } catch {
        if (cancelled) return;
        setProfileNames([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);
```

**teraz** (wolny input):

```tsx
      <FormField label="Grupa (opcjonalnie)" htmlFor={`${idPrefix}-audience`}>
        <Input
          id={`${idPrefix}-audience`}
          value={draft.audience}
          onChange={(event) => onDraftChange({ ...draft, audience: event.target.value })}
        />
      </FormField>
```

**zamień na:**

```tsx
      <FormField label="Grupa (opcjonalnie)" htmlFor={`${idPrefix}-audience`}>
        <NativeSelect
          id={`${idPrefix}-audience`}
          value={audienceGroupSelectValue(draft.audienceGroup)}
          onChange={(event) =>
            onDraftChange({
              ...draft,
              audienceGroup: audienceGroupFromSelectValue(
                event.target.value,
                draft.audienceGroup,
                profileNames,
              ),
            })
          }
        >
          <option value={AUDIENCE_GROUP_NONE_VALUE}>Bez wskazania grupy</option>
          {profileNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
          <option value={AUDIENCE_GROUP_CUSTOM_VALUE}>Wpisz własną grupę…</option>
        </NativeSelect>
      </FormField>
      {draft.audienceGroup.kind === 'custom' ? (
        <FormField
          label="Opis grupy"
          htmlFor={`${idPrefix}-audience-custom`}
          hint="Opis odbiorcy w briefie — bez dopasowania do katalogu."
        >
          <Input
            id={`${idPrefix}-audience-custom`}
            value={draft.audienceGroup.description}
            onChange={(event) =>
              onDraftChange({
                ...draft,
                audienceGroup: { kind: 'custom', description: event.target.value },
              })
            }
          />
        </FormField>
      ) : null}
```

#### Prefill w `account-view.tsx`

**teraz:**

```typescript
      const snapshot = await fetchRunSnapshot(runId);
      if (requestId !== prefillRequestRef.current) return;
      setDraft(draftFromSnapshot(snapshot));
```

**zamień na:**

```typescript
import { fetchCompanyContext } from '@/modules/company-context/api/company-context.api';

      const [snapshot, context] = await Promise.all([
        fetchRunSnapshot(runId),
        fetchCompanyContext(),
      ]);
      if (requestId !== prefillRequestRef.current) return;
      const profileNames = context.audience.profiles
        .map((profile) => profile.name.trim())
        .filter((name) => name.length > 0);
      setDraft(draftFromSnapshot(snapshot, profileNames));
```

Przy błędzie `fetchCompanyContext` w prefill: pokaż envelope jak przy błędzie snapshotu (ten sam `catch` / `ApiError`) — **nie** resolve’uj katalogu z pustej listy „na ślepo” jako same custom bez próby GET (operator ma zobaczyć fail odczytu kontekstu przy prefillu).

**DoD kroku:**

- Konto i modal: select z „Bez wskazania grupy”, nazwami z kontekstu, „Wpisz własną grupę…” + pole opisu tylko w trybie custom.
- POST: omit / `name` / custom opis — **bez** matcha custom do katalogu.
- Prefill: `brief.audience` = name z katalogu → opcja catalog; inny string → custom; brak → none.
- Źródło opcji ≠ completeness endpoint.

---

#### Propozycja commit message

```text
feat(runs): select audience group modes on start-run form

Map none, catalog name, and custom description to optional brief.audience
so Konto and archive start share the same group contract.
```

---

## Weryfikacja wycinka

| Kryterium | Oczekiwanie |
|-----------|-------------|
| Kotwica | Cała major FE Faza 18 pokryta FAZA 1–2 |
| Docs / SPEC | Nazwa + select 3 tryby; omit / name / custom bez auto-match; źródło = kontekst firmy (`docs/ux_dashboard.md`, `SPEC-FRONTEND.md` F-7/F-8) |
| Kod nowych plików | `audience-profile-names.ts`, `audience-group.ts` — kompletne w planie |
| Refaktory | Fragmenty `teraz → zamień na` (typy, is-complete, form Odbiorca, StartRunForm, AccountView) |
| Pass rozwojowy | Typy / unikalność / unia trybu przed UI zależnymi — **bez** przesunięć między fazami major |
| Nagłówki | Wyłącznie `FAZA` / `KROK`; commit message EN na końcu każdej fazy |
| UI lock | Dziedziczenie `content-chain-product-ui`; etykiety PL „Nazwa”, „Wpisz własną grupę…” |
| Major | Nietknięty w tej sesji |
| Plany pomocnicze root | Brak odwołań w tym pliku |

**Checklist ręczny po `/feature-implementation` (nie w tej sesji):**

- [ ] Zapis kontekstu z profilem bez Nazwy — CTA disabled + błąd pola.
- [ ] Dwa profile różniące się tylko case — CTA disabled.
- [ ] Start bez grupy — body bez `brief.audience`.
- [ ] Start z nazwą z selecta — `brief.audience` = ta nazwa.
- [ ] Start „Wpisz…” — `brief.audience` = opis; brak podstawienia name katalogu.
- [ ] Prefill ze snapshotu z name katalogu / custom / omit — poprawny tryb selecta.
- [ ] Ten sam UI na Koncie i w modalu „Uruchom agenta”.

---

## Ślad do major (informacyjnie)

Po **realnej** implementacji wg tego planu (osobna sesja, np. ręczne `/feature-implementation`):

| Element major FE | Oczekiwany status |
|------------------|-------------------|
| Faza 18 | `WYKONANY` |
| MILESTONE 18 | **brak** — nie oznaczać |

Ten skill **nie** edytuje majoru. Backend Faza 22 / jej feature plan = osobny wycinek (api scoping); ten plan FE **nie** implementuje effective context LLM.
