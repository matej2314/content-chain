# Content Chain — feature plan: Sidebar logotyp PNG w logo-area (Faza 28)

**Kotwica major:** `content-chain-frontend_major_plan.md` — **Faza 28** (`NIE_ROZPOCZĘTY`) — w logo-area sidebara (desktop `AppSidebar` **oraz** mobile sheet) zastąpić tekst nazwy marki **statycznym logotypem** PNG przez `next/image` (ten sam asset co sticky chrome; skala w slocie `h-14`, **nie** `h-20`).  
**Źródła:** `docs/ux_dashboard.md` („Sidebar — logo i stany pozycji menu”), `SPEC-FRONTEND.md` F-14 (brand w logo-area), skill `content-chain-product-ui` (dziedziczenie dark shell / locku Fazy 22–23; **bez** nowej palety).  
**Skill UI:** `content-chain-product-ui` — Design Read: *self-host dashboard for operator/admin, calm B2B product language, shadcn + Tailwind v4 + Iconify, dials VARIANCE 3–4 / MOTION 3–4 / DENSITY 7–8; logo-area = PNG w dark shell, stany nav nietknięte.*

**Statusy kroków feature:** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`

---

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Cała Faza 28 majoru FE |
| Major | Faza 28 (gate); HOW: KROK 1–2 poniżej |
| Poza zakresem | Sticky chrome landingu (`h-20`, `#top`); brand / wordmark w hero; string „Content Chain” w `app-header.tsx` (pasek mobile header, poza sheetem); zmiana pliku assetu / tokenów CSS; stany pozycji menu (Faza 23); MILESTONE 28; edycja backend major; przepisywanie Fazy 27 / 23 (`WYKONANY`); Playwright jako suite |
| Zależność BE | **Brak** |
| Pass rozwojowy | Brak przesunięć — KROK 2 montuje wyłącznie `SidebarBrandMark` z KROK 1 |
| Po implementacji (informacyjnie) | Major: Faza 28 → `WYKONANY` — **edycja major poza tym skillem**; **bez** `OSIĄGNIĘTY` (brak MILESTONE 28) |

**Refaktor względem:** Faza 27 (`WYKONANY` — logotyp PNG **tylko** sticky chrome; wykluczenie logo-area sidebara) oraz Faza 23 (`WYKONANY` — logo-area poza zakresem **stanów** nav; Faza 28 **nie** zmienia stanów nav). Cel: logo-area desktop + mobile sheet = ten sam asset, skala w `h-14`. Treść Fazy 27 / 23 **nie** jest przepisywana.

---

## Założenia

- Stack: Next.js **16.3.0** / React / Tailwind v4 / `next/image` — **bez** nowych paczek.
- Asset już w drzewie: `apps/frontend/public/content-chain-logo-transparent.png` (intrinsic **530×275**, RGBA).
- Intrinsic w JSX: `width={530}`, `height={275}` (rezerwacja AR / CLS) — wyświetlana wysokość = CSS `h-8` (**nie** `h-20` jak F-15 sticky chrome).
- `alt` = string brand **„Content Chain”** (ten sam tekst, który dziś jest w `<p>` logo-area) — **bez** linku wokół obrazu.
- Slot logo-area: nadal `h-14` + `border-b border-sidebar-border` + `px-3` + `flex items-center`.
- Mobile sheet: kolejność F-8 zachowana — (1) tożsamość chrome (logo-area **nad** emailem) → (2) nav → (3) `CompletenessChipSlot` → (4) „Wyloguj się”.
- Stany nav (`sidebarNavItemClassName`) — **nietknięte**.
- String „Content Chain” w sticky header mobile (`lg:hidden` poza sheetem) — **poza zakresem** (zostaje tekst).

---

## FAZA 1 — Sidebar: logotyp PNG w logo-area

### KROK 1 — Komponent `SidebarBrandMark`

**Status:** `WYKONANY`

**Cel:** Jeden prezentacyjny mark brandu sidebara (asset + `next/image` + skala `h-8`), żeby desktop i mobile sheet nie duplikowały propsów Image. Major Faza 28; `docs/ux_dashboard.md` (brand w logo-area); `SPEC-FRONTEND.md` F-14.

**Artefakty:**

| Ścieżka | Zmiana |
|---------|--------|
| `apps/frontend/src/modules/shell/components/sidebar-brand-mark.tsx` | **nowy** — pełny kod poniżej |

**Implementacja (nowy plik — kompletny kod):**

```tsx
import Image from 'next/image';

const SIDEBAR_BRAND_ALT = 'Content Chain';
const SIDEBAR_LOGO_SRC = '/content-chain-logo-transparent.png';
const SIDEBAR_LOGO_WIDTH = 530;
const SIDEBAR_LOGO_HEIGHT = 275;

export function SidebarBrandMark() {
  return (
    <Image
      src={SIDEBAR_LOGO_SRC}
      alt={SIDEBAR_BRAND_ALT}
      width={SIDEBAR_LOGO_WIDTH}
      height={SIDEBAR_LOGO_HEIGHT}
      className="h-8 w-auto"
    />
  );
}
```

Uwagi:

- **Bez** `priority` — logo sidebara nie jest LCP landingu (w przeciwieństwie do sticky chrome Fazy 27).
- **Bez** opakowania w `<a>` / `Link` (F-14: bez linku).
- `h-8` w slocie `h-14`: mieści się z paddingiem; **zakaz** `h-20` w tym komponencie.
- Biblioteka: `next/image` (Next.js 16) — `width`/`height` = intrinsic; rozmiar renderowany = CSS (`className`). Źródło: Context7 `/vercel/next.js/v16.2.9` (Image: public folder + width/height).

**Testy:** brak osobnego suite — weryfikacja wizualna w DoD KROK 2.

**DoD kroku:**

- Plik `sidebar-brand-mark.tsx` istnieje i eksportuje `SidebarBrandMark`.
- Props Image: `src="/content-chain-logo-transparent.png"`, `width={530}`, `height={275}`, `className="h-8 w-auto"`, `alt="Content Chain"`.
- Brak linku; brak `priority`.
- Brak zmian w `app-sidebar.tsx` / `app-header.tsx` w tym kroku.

---

### KROK 2 — Montaż: `AppSidebar` + mobile sheet

**Status:** `WYKONANY`

**Cel:** Zastąpić tekst w logo-area desktopu oraz dodać to samo logo-area w mobile sheet (nad emailem). Stany nav, sticky chrome, header string — bez regresji. Major Faza 28; F-14; F-8 (kolejność sheetu).

**Artefakty:**

| Ścieżka | Zmiana |
|---------|--------|
| `apps/frontend/src/modules/shell/components/app-sidebar.tsx` | tekst → `SidebarBrandMark` |
| `apps/frontend/src/modules/shell/components/app-header.tsx` | logo-area w sheet przed emailem |

**Implementacja (refaktor — fragmenty):**

#### 1) `app-sidebar.tsx` — logo-area desktop

Dodaj import:

```tsx
import { SidebarBrandMark } from '@/modules/shell/components/sidebar-brand-mark';
```

W logo-area — **teraz:**

```tsx
      <div className="flex h-14 items-center border-b border-sidebar-border px-3">
        <p className="text-sm font-medium tracking-tight">Content Chain</p>
      </div>
```

**zamień na:**

```tsx
      <div className="flex h-14 items-center border-b border-sidebar-border px-3">
        <SidebarBrandMark />
      </div>
```

Slot (`h-14`, `border-b`, `px-3`, `flex items-center`) — **bez zmian**. Nav / `CompletenessChipSlot` / `sidebarNavItemClassName` — **nietknięte**.

#### 2) `app-header.tsx` — logo-area w mobile sheet

Dodaj import:

```tsx
import { SidebarBrandMark } from '@/modules/shell/components/sidebar-brand-mark';
```

W `<aside>` sheetu — **teraz:**

```tsx
              <aside className="flex h-full w-full flex-col bg-sidebar text-sidebar-foreground">
                <div className="px-3 py-3">
                  <p className="truncate text-sm font-medium">{user.email}</p>
                </div>
                <Separator />
```

**zamień na:**

```tsx
              <aside className="flex h-full w-full flex-col bg-sidebar text-sidebar-foreground">
                <div className="flex h-14 shrink-0 items-center border-b border-sidebar-border px-3">
                  <SidebarBrandMark />
                </div>
                <div className="px-3 py-3">
                  <p className="truncate text-sm font-medium">{user.email}</p>
                </div>
                <Separator />
```

Uwagi montażu sheet:

- Logo-area **nad** emailem; email / nav / chipy / logout — bez zmiany logiki.
- `Separator` po emailu zostaje (jak dziś); logo-area ma własny `border-b` (jak desktop).
- Pasek headera `<span className="… lg:hidden">Content Chain</span>` — **nie ruszać**.
- `SheetContent` szerokość / `side="right"` — bez zmian.

**Biblioteki / API:** istniejący `next/image` via `SidebarBrandMark`; brak nowych API.

**Testy:** ręczne — dashboard `lg+` (sidebar) oraz viewport `< lg` (otwórz sheet).

**DoD kroku:**

- Desktop `AppSidebar`: logo-area pokazuje PNG (`h-8 w-auto`), nie tekst „Content Chain”.
- Mobile sheet: u góry logo-area z tym samym markiem; poniżej email → nav → chipy → „Wyloguj się”.
- Sticky chrome landingu nadal `h-20` + `#top` (Faza 27) — bez regresji.
- Header mobile string „Content Chain” poza sheetem — bez zmian.
- Stany nav (normal / hover / active) — bez zmian wizualnych / klas.
- Brak nowej palety / zmian w `globals.css` / `button.tsx`.

---

#### Propozycja commit message

```text
feat(shell): show PNG brand mark in sidebar logo-area

Replace the text brand in desktop sidebar and mobile sheet with the same static logo asset used on landing chrome, scaled for the h-14 slot.
```

---

## Weryfikacja wycinka

| Kryterium | Jak sprawdzić |
|-----------|----------------|
| Pokrycie Fazy 28 | PNG w logo-area desktop + sheet; `h-8` w `h-14`; bez linku; ten sam asset co sticky chrome |
| docs / SPEC | Zgodność z `docs/ux_dashboard.md` + F-14; zakaz tekstu-only w logo-area; zakaz `h-20` / `#top` na sidebar |
| Pass rozwojowy | KROK 1 → KROK 2; brak przesunięć |
| Nagłówki | wyłącznie `FAZA` / `KROK` |
| Commit message | EN, Conventional Commits, na końcu FAZA 1 |
| Major | nietknięty w tej sesji |
| Plany pomocnicze root | brak odwołań w tym pliku |
| Skill UI | dziedziczenie dark shell; stany nav nietknięte |

---

## Ślad do major (informacyjnie, po implementacji)

| Element major | Po implementacji |
|---------------|------------------|
| Faza 28 | `WYKONANY` |
| MILESTONE 28 | **brak** — nic nie oznaczać `OSIĄGNIĘTY` |
| Faza 27 / 23 | bez zmian (`WYKONANY`) |

Edycja statusów major = poza tym feature planem (ręcznie lub w osobnej sesji `/feature-implementation` na życzenie użytkownika).
