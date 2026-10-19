# Content Chain — feature plan: stany pozycji menu sidebara (Faza 23)

**Kotwica major:** `content-chain-frontend_major_plan.md` — **Faza 23** (`NIE_ROZPOCZĘTY`) — stany pozycji menu sidebara (normal / hover / active / active+hover) **oraz** **Krok 23.1** (montaż `CompletenessChipSlot` w mobile sheet).  
**Źródła:** `docs/ux_dashboard.md` („Sidebar — logo i stany pozycji menu”; kompozycja mobile sheet: slot przed „Wyloguj się”), `docs/brand_types.md` (stany nav ≠ solid `--primary` ≠ CTA `default`), `SPEC-FRONTEND.md` F-14 + F-8, skill `content-chain-product-ui` (Faza 23 dziedziczy lock Fazy 22).  
**Skill UI:** `content-chain-product-ui` — Design Read: self-host dashboard, dials VARIANCE 3–4 / MOTION 3–4 / DENSITY 7–8; trzy role akcentu (indigo chrome / CTA teal / nav teal wash) bez mieszania.

**Statusy kroków feature:** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`

---

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Cała Faza 23 majoru FE: stany pozycji menu (desktop `AppSidebar` + mobile sheet) + **Krok 23.1** (slot chipów w sheetcie) |
| Major | Faza 23 + Krok 23.1 (gate — bez kroków kodu w majorze); HOW: KROK 1–3 (stany) + **KROK 4** ↔ 23.1 |
| Poza zakresem | Tło `--sidebar` / `bg-sidebar` aside; kolory / gradient `Button` `default` (CTA-only Fazy 22); logo-area; forma / lifting / semantyka chipów (**wyjątek:** KROK 4 / major 23.1 = montaż istniejącego `CompletenessChipSlot` w mobile sheet); IA / role / trasy; accordion; badge Hot·New; BE / api; Playwright; MILESTONE 23 |
| Zależność BE | **Brak** |
| Pass rozwojowy | Brak przesunięć — tokeny CSS → helper klas → podpięcie desktop + mobile → (KROK 4) slot w sheetcie |
| Po implementacji (informacyjnie) | Major: Faza 23 → `WYKONANY` (w tym 23.1) — **edycja major poza tym skillem** |

**Refaktor względem:** Faza 22 / F-14 (historia: active nav = solid `bg-primary text-primary-foreground`) oraz obecny kod sidebara / sheetu. Cel: pozycje menu wychodzą z solid indigo fill; teal wash + inset ring + lewy pasek; tekst muted w active spoczynku.

---

## Założenia

- Stack: Next.js 16 / React 19 / Tailwind **v4** (`@theme inline` + tokeny w `:root` / `.dark`) — jak Faza 22. Nowe tokeny nav **nie** wchodzą do `@theme` jako `--color-*` utilities, dopóki nie są potrzebne w klasach Tailwind; wartości używane w bloku CSS `.sidebar-nav-item` (Context7: zmienne w `:root` + arbitrary / custom CSS; `@theme` tylko gdy generujemy utility).
- Hex teal z rodziny CTA (`#39a185` / `#63b8a3`) wolno **powtórzyć** w tokenach nav jako osobne nazwy (`--nav-item-*`) — **bez** przepinania `--button-default-*` ani `--primary`.
- Geometria (pin HOW): radius `0.875rem` (~14px), `font-size: 0.8125rem` (13px), `font-weight: 500`, transition `140ms`.
- Ta sama klasa / helper na desktopie i w mobile sheet — **zakaz** osobnej normy active (dziś sheet ma `bg-sidebar-accent`).

---

## FAZA 1 — Stany pozycji menu (tokeny + helper + chrome)

### KROK 1 — Tokeny CSS nav + blok `.sidebar-nav-item` w `globals.css`

**Status:** `WYKONANY`

**Cel:** Zdefiniować tokeny i reguły stanów (normal / hover / active / active+hover) zgodnie z `docs/ux_dashboard.md` i F-14 — **bez** zmiany `--sidebar`, `--primary`, `--button-default-*`. Kotwica: major Faza 23.

**Artefakty:**

- Zmiana: `apps/frontend/src/app/globals.css` (dopisek tokenów w `:root` i `.dark` + blok klas)

**Implementacja — dopisek w `:root` (i **identycznie** w `.dark`), zaraz po bloku CTA `default`:**

```css
  /* Sidebar nav item states — F-14 / Faza 23; nie CTA, nie solid --primary fill; nie zmienia --sidebar */
  --nav-item-radius: 0.875rem;
  --nav-item-font-size: 0.8125rem;
  --nav-item-transition: 140ms;
  --nav-item-hover-fill: oklch(1 0 0 / 4%);
  --nav-item-wash-from: color-mix(in oklch, #39a185 28%, transparent);
  --nav-item-wash-to: color-mix(in oklch, #63b8a3 6%, transparent);
  --nav-item-active-wash: linear-gradient(
    90deg,
    var(--nav-item-wash-from) 0%,
    var(--nav-item-wash-to) 100%
  );
  --nav-item-active-ring: color-mix(in oklch, #39a185 45%, transparent);
  --nav-item-rail: #39a185;
  --nav-item-rail-glow: color-mix(in oklch, #39a185 55%, transparent);
```

**Implementacja — nowy blok CSS na końcu pliku** (po istniejących regułach; **nie** w `@theme inline`):

```css
/* Stany pozycji menu — F-14 / Faza 23 (desktop + mobile sheet) */
.sidebar-nav-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: var(--nav-item-radius);
  padding: 0.375rem 0.5rem;
  font-size: var(--nav-item-font-size);
  font-weight: 500;
  line-height: 1.25;
  color: var(--muted-foreground);
  background: transparent;
  transition:
    color var(--nav-item-transition) ease,
    background var(--nav-item-transition) ease,
    box-shadow var(--nav-item-transition) ease;
}

.sidebar-nav-item:hover {
  color: var(--sidebar-foreground);
  background: var(--nav-item-hover-fill);
}

.sidebar-nav-item[data-active='true'] {
  color: var(--muted-foreground);
  background: var(--nav-item-active-wash);
  box-shadow: inset 0 0 0 1px var(--nav-item-active-ring);
}

.sidebar-nav-item[data-active='true']::before {
  content: '';
  position: absolute;
  left: 0;
  top: 18%;
  bottom: 18%;
  width: 3px;
  border-radius: 999px;
  background: var(--nav-item-rail);
  box-shadow: 0 0 10px 1px var(--nav-item-rail-glow);
  pointer-events: none;
}

.sidebar-nav-item[data-active='true']:hover {
  color: var(--sidebar-foreground);
  background: var(--nav-item-hover-fill);
  /* inset ring + ::before rail zostają */
}
```

**Biblioteki / API:** Tailwind v4 — tokeny jako zwykłe custom properties w `:root` (Context7: theme variables w `@theme` generują utilities; tu stany są w klasie CSS, więc **bez** mapowania `--color-nav-*` do `@theme`, chyba że późniejszy krok tego wymaga). `color-mix` / `oklch` — natywne CSS.

**Testy:** brak jednostkowych (czysta prezentacja). Weryfikacja wizualna w DoD wycinka.

**DoD (krok):**

- W `:root` i `.dark` istnieją `--nav-item-*` jak wyżej; wartości CTA i `--sidebar` / `--primary` **niezmienione**.
- Blok `.sidebar-nav-item` realizuje tabelę stanów z docs/F-14 (muted w active; hover fill zastępuje wash przy active+hover; ring + rail zostają).
- Brak solid `bg-primary` w tym bloku.

---

### KROK 2 — Helper `sidebarNavItemClassName`

**Status:** `WYKONANY`

**Cel:** Jedna funkcja klas dla Linków nav (desktop + mobile), żeby nie duplikować stringów i nie rozjechać normy. Spec: F-14; major Faza 23.

**Artefakty:**

- Nowy: `apps/frontend/src/modules/shell/sidebar-nav-item.ts`

### Nowy plik — kompletny kod

`apps/frontend/src/modules/shell/sidebar-nav-item.ts`:

```typescript
import { cn } from '@/shared/utils/utils';

/**
 * Klasy pozycji menu sidebara (F-14 / Faza 23).
 * Stany visual: `.sidebar-nav-item` + `data-active` w globals.css.
 */
export function sidebarNavItemClassName(className?: string): string {
  return cn('sidebar-nav-item', className);
}
```

**Użycie (kontrakt):** na `<Link>`: `className={sidebarNavItemClassName()}` oraz `data-active={active ? 'true' : undefined}` (albo `data-active={active}` gdy boolean jest serializowany do `"true"` / usuwany przy `false` — w React 19 preferuj jawne `'true' | undefined`).

**Biblioteki:** istniejący `cn` (`clsx` + `tailwind-merge`) — bez nowych paczek.

**Testy:** brak (helper cienki).

**DoD (krok):**

- Plik eksportuje `sidebarNavItemClassName` ze zwracaną klasą bazową `sidebar-nav-item`.
- Typy: parametr opcjonalny `string`; zwrot `string`; bez `any`.

---

### KROK 3 — Podpięcie desktop (`AppSidebar`) + mobile sheet (`AppHeader`)

**Status:** `WYKONANY`

**Cel:** Obie powierzchnie używają tej samej normy F-14; usunięcie solid indigo active (desktop) oraz `bg-sidebar-accent` active (mobile). Kotwica: major Faza 23; docs „ta sama norma desktop + mobile sheet”.

**Artefakty:**

- Zmiana: `apps/frontend/src/modules/shell/components/app-sidebar.tsx`
- Zmiana: `apps/frontend/src/modules/shell/components/app-header.tsx`

### Refaktor — `app-sidebar.tsx`

**Teraz** (importy + mapowanie Linków):

```tsx
import { CompletenessChipSlot } from '@/modules/shell/components/chrome-slots';
import { navItemsForRole } from '@/modules/shell/nav';
import type { UserRole } from '@content-chain/shared';
import { cn } from '@/shared/utils/utils';
```

```tsx
      <nav className="flex flex-1 flex-col gap-0.5 p-2">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors',
                active
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-sidebar-accent/70',
              )}
            >
              <Icon icon={item.icon} className="size-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>
```

**Zamień na:**

```tsx
import { CompletenessChipSlot } from '@/modules/shell/components/chrome-slots';
import { navItemsForRole } from '@/modules/shell/nav';
import { sidebarNavItemClassName } from '@/modules/shell/sidebar-nav-item';
import type { UserRole } from '@content-chain/shared';
```

```tsx
      <nav className="flex flex-1 flex-col gap-0.5 p-2">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              data-active={active ? 'true' : undefined}
              className={sidebarNavItemClassName()}
            >
              <Icon icon={item.icon} className="size-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>
```

Uwagi:

- Usuń nieużywany import `cn` z tego pliku.
- **Nie** zmieniaj: `aside` (`bg-sidebar`), logo-area `h-14` + `border-b`, `CompletenessChipSlot`, logika `active` / `navItemsForRole`.

### Refaktor — `app-header.tsx` (lista w Sheet)

**Teraz** (fragment mapowania w `SheetContent`):

```tsx
                <nav className="flex flex-1 flex-col gap-0.5 p-2">
                  {items.map((item) => {
                    const active =
                      pathname === item.href || pathname.startsWith(`${item.href}/`);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          'flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors',
                          active
                            ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                            : 'hover:bg-sidebar-accent/70',
                        )}
                      >
                        <Icon icon={item.icon} className="size-4 shrink-0" />
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>
```

**Zamień na:**

```tsx
                <nav className="flex flex-1 flex-col gap-0.5 p-2">
                  {items.map((item) => {
                    const active =
                      pathname === item.href || pathname.startsWith(`${item.href}/`);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        data-active={active ? 'true' : undefined}
                        className={sidebarNavItemClassName()}
                      >
                        <Icon icon={item.icon} className="size-4 shrink-0" />
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>
```

Dodaj import:

```tsx
import { sidebarNavItemClassName } from '@/modules/shell/sidebar-nav-item';
```

Uwagi:

- Zachowaj `onClick={() => setMobileMenuOpen(false)}`, email header sheetu, Separator, przycisk „Wyloguj się”, `Sheet` / `SheetTrigger`.
- Jeśli po zmianie `cn` nie jest używany gdzie indziej w pliku — usuń import; **sprawdź** przed usunięciem (inne miejsca w headerze mogą nadal używać `cn`).
- **Nie** zmieniaj kolorów `Button` (outline menu / ghost wylogowania).

**Biblioteki:** Next.js `Link`, Iconify — bez zmian API.

**Testy:** brak automatycznych w tym wycinku. Smoke UI: desktop active ≠ indigo fill; mobile sheet = ta sama forma; hover idle i active+hover zgodne z tabelą.

**DoD (krok):**

- Desktop: brak `bg-primary text-primary-foreground` na pozycji nav.
- Mobile sheet: brak `bg-sidebar-accent` jako active fill; ta sama klasa `.sidebar-nav-item`.
- Active spoczynek: tekst muted + wash + ring + rail; active+hover: strong + hover fill, ring/rail zostają.
- `--sidebar` aside i CTA `default` nietknięte (weryfikacja diff / brak zmian w `button.tsx` i tokenach CTA).

---

#### Propozycja commit message

```text
feat(shell): style sidebar nav items with teal wash states

Replace solid primary / sidebar-accent active fills with F-14 muted teal wash, inset ring, and rail on desktop and mobile sheet.
```

---

### KROK 4 — CompletenessChipSlot w mobile sheet (przed „Wyloguj się”)

**Status:** `WYKONANY`

**Cel:** Mobile sheet znów pokazuje ten sam `CompletenessChipSlot` co desktop — **przed** stopką „Wyloguj się”; bez nowej palety i bez zmiany stanów nav. Kotwica: major Faza 23 / **Krok 23.1**. Spec: F-8 (pozycja slotu); F-6 / F-10 / F-17 semantyka chipów **bez** redefinicji.

**Refaktor względem:** Faza 1 chrome (sheet montował `AppSidebar` ze slotem) / Faza 2 DoD (desktop + Sheet dzielą slot) / obecny `AppHeader` sheet **bez** slotu; DemoChip w slocie (Faza 14) — semantyka bez zmian; KROK 1–3 (stany `.sidebar-nav-item`) **nietknięte** tym krokiem.

**Artefakty:**

- Zmiana: `apps/frontend/src/modules/shell/components/app-header.tsx`
- Bez zmian: `apps/frontend/src/modules/shell/components/chrome-slots.tsx` (eksport `CompletenessChipSlot` już istnieje); desktop `app-sidebar.tsx` (już montuje slot)

**HOW (opisowo):**

1. W `app-header.tsx` zaimportuj `CompletenessChipSlot` z `@/modules/shell/components/chrome-slots`.
2. W mobile `SheetContent` / `aside`: po `<nav>…</nav>`, **przed** stopką „Wyloguj się” (po Separatorze przed stopką albo z własnym Separatorem — kolejność kanoniczna: tożsamość → nav → **slot** → „Wyloguj się”), wyrenderuj `<CompletenessChipSlot />`.
3. Slot w viewportcie sheetu (bez scrollowania treści `main`); chipy **nie** są pozycją listy nav; „Wyloguj się” **nie** jest pozycją nav.

**Nie zmieniać:**

- klas / tokenów `.sidebar-nav-item` (KROK 1–3);
- desktop `AppSidebar` (już ma slot);
- `FeedbackCta` / floating box;
- tokenów CTA `default` / `--sidebar` / `--primary`;
- semantyki `DemoChip` / `CompletenessChip` / bramki `agentsActive`.

**Biblioteki:** istniejący slot — bez nowych paczek.

**Testy:** brak automatycznych. Smoke: sheet pokazuje slot przed Wyloguj; desktop bez regresji.

**DoD (krok):**

- Mobile sheet zawiera `CompletenessChipSlot` przed „Wyloguj się”; kolejność zgodna z `docs/ux_dashboard.md` + F-8.
- Semantyka Demo / Completeness jak dotychczas; stany nav / `--sidebar` / CTA `default` bez zmian tym krokiem.
- Mapowanie 1:1 na major **Krok 23.1**.

#### Propozycja commit message (KROK 4)

```text
feat(shell): mount CompletenessChipSlot in mobile sheet

Restore the same demo/completeness chip slot before logout in the mobile nav sheet; desktop sidebar unchanged.
```

---

## Weryfikacja wycinka

| Kryterium | Oczekiwanie |
|-----------|-------------|
| Docs / SPEC | Zgodność z tabelą stanów w `ux_dashboard` + F-14; zakaz solid indigo na active; tło sidebar i CTA chronione; F-8 — slot w mobile sheet przed „Wyloguj się” |
| Major Faza 23 | HOW pokrywa gate (desktop + mobile stany) **oraz** Krok 23.1 (KROK 4); bez MILESTONE 23 w planie |
| Tokeny | `--nav-item-*` osobne od `--button-default-*` i `--primary` |
| Kod | Helper + CSS + oba miejsca Link; brak rozjazdu desktop/mobile; sheet z `CompletenessChipSlot` |
| Product-ui | Trzy role akcentu; Design Read; bez zmiany tła sidebara / CTA; montaż slotu bez nowej palety |
| Pass rozwojowy | Tokeny → helper → chrome → slot w sheetcie — spełniony |
| Nagłówki | Wyłącznie `FAZA` / `KROK`; commit message EN na końcu FAZA 1 / KROK 4 |

**Checklist smoke (po implementacji, poza tą sesją):**

1. Zalogowany desktop: aktywna pozycja — muted + teal wash L→R + inset ring + lewy pasek z glow; **nie** solid indigo.
2. Hover na idle: strong + ~4% white fill; bez ringa/paska.
3. Hover na active: strong + fill hover zamiast wash; ring + pasek zostają.
4. Mobile sheet (`lg:hidden`): te same stany co desktop.
5. Logo-area, chip Completeness (desktop sidebar), tło aside, CTA „Uruchom agenta” / „Zaloguj się” — bez regresji koloru.
6. Mobile sheet: `CompletenessChipSlot` (Demo gdy demo on + Completeness) **przed** „Wyloguj się”; semantyka chipów bez regresji; brak slotu tylko-desktop.

---

## Ślad do major (informacyjnie — poza tym skillem)

| Pozycja major | Po implementacji DoD |
|---------------|----------------------|
| Faza 23 | `WYKONANY` |
| Krok 23.1 | `WYKONANY` (↔ KROK 4 tego feature-planu) |
| MILESTONE 23 | **nie istnieje** — nic nie oznaczać `OSIĄGNIĘTY` |
| Faza 22 / F-14 chrome / CTA | bez zmian (historia) |

Ten plik **nie** edytuje majoru, docs ani SPEC.
