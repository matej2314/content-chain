# Content Chain — feature plan: Landing closing CTA „Sprawdzam!” (Faza 26)

**Kotwica major:** `content-chain-frontend_major_plan.md` — **Faza 26** (`NIE_ROZPOCZĘTY`) — w sekcji closing na anonimowym `/` zastąpić parę CTA (login + register) **jednym** przyciskiem **„Sprawdzam!”** → modal auth w trybie **`register`**, wariant `Button` **`default`**.  
**Źródła:** `docs/ux_dashboard.md` („Strona główna — landing” / CTA closing; chrome para bez zmian), `SPEC-FRONTEND.md` F-15 (closing = jeden CTA „Sprawdzam!” → `register`), skill `content-chain-product-ui` (dziedziczenie locku landingu; CTA-only teal/mint na `default` — **bez** redefinicji).  
**Skill UI:** `content-chain-product-ui` — Design Read: *self-host dashboard / landing dziedziczy trzy role akcentu (indigo chrome / CTA teal / nav teal wash); closing CTA = wyłącznie wariant `default` (gradient teal/mint + ciemny tekst); chrome para i footer login nietknięte; bez trzeciej palety.*

**Statusy kroków feature:** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`

---

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Cała Faza 26 majoru FE |
| Major | Faza 26 (gate); HOW: KROK 1–2 poniżej |
| Poza zakresem | Zmiana pary CTA sticky chrome; zmiana linku „Zaloguj się” w footerze; redefinicja stylistyki `Button` `default` / tokenów gradientu; Auth / modal / thank-you / activate / bootstrap CTA na register (poza punktem wejścia z closing); MILESTONE 26; edycja backend major; przepisywanie Fazy 24 / 25 (`WYKONANY`); Playwright jako suite |
| Zależność BE | **Brak** |
| Pass rozwojowy | Brak przesunięć — KROK 2 montuje wyłącznie `closing.cta` z KROK 1 |
| Po implementacji (informacyjnie) | Major: Faza 26 → `WYKONANY` — **edycja major poza tym skillem**; **bez** `OSIĄGNIĘTY` (brak MILESTONE 26) |

**Refaktor względem:** Faza 24 (`WYKONANY` — landing + modal; closing jako część IA z parą CTA) oraz Faza 25 (`WYKONANY` — audience; closing / footer w kolejności scrollu **bez** zmiany CTA closing). Cel: w closing **jeden** CTA „Sprawdzam!” → `register`. Treść Fazy 24 / 25 **nie** jest przepisywana.

---

## Założenia

- Stack: Next.js / React / Tailwind v4 / shadcn `Button` — **bez** nowych paczek.
- Typy: istniejący `LANDING_COPY` (`as const`); nowe pole `closing.cta` jako string literal w bloku `closing`.
- Etykieta CTA closing = exact **„Sprawdzam!”** (F-15 / docs / major) — nie warianty typu „Sprawdź” / „Zaczynam”.
- Wariant: `Button` **`default`** (domyślny wariantu w kitcie — **nie** podawać `variant="outline"` ani nie nadpisywać klas gradientu przy okazji tej fazy).
- Akcja: wyłącznie `onOpenRegister` (modal `register`). Closing **nie** otwiera `login`.
- Title + supporting sekcji closing (**obecne** w kodzie) — **bez zmian** w tym wycinku; zmienia się tylko CTA.
- Sticky chrome (**„Zaloguj się”** / **„Załóż konto”**) oraz button „Zaloguj się” w footerze — **nietknięte**.

---

## FAZA 1 — Landing: closing CTA „Sprawdzam!”

### KROK 1 — Copy: `closing.cta` w `landing-copy.ts`

**Status:** `WYKONANY`

**Cel:** Dodać etykietę closing CTA do copy landingu, żeby montaż w KROK 2 nie hardcodował stringa w JSX. Major Faza 26; `docs/ux_dashboard.md` (CTA closing); `SPEC-FRONTEND.md` F-15.

**Artefakty:**

| Ścieżka | Zmiana |
|---------|--------|
| `apps/frontend/src/modules/auth/landing/landing-copy.ts` | pole `closing.cta: 'Sprawdzam!'` |

**Implementacja (refaktor — fragment):**

W `LANDING_COPY.closing` — **teraz:**

```ts
  closing: {
    title: 'Gotowy uruchomić pierwszego agenta?',
    supporting:
      'Załóż konto, uzupełnij kontekst firmy i sprawdź, jak Content Chain prowadzi pracę od briefu do wyniku.',
  },
```

**zamień na:**

```ts
  closing: {
    title: 'Gotowy uruchomić pierwszego agenta?',
    supporting:
      'Załóż konto, uzupełnij kontekst firmy i sprawdź, jak Content Chain prowadzi pracę od briefu do wyniku.',
    cta: 'Sprawdzam!',
  },
```

`cta.login` / `cta.register` (chrome + footer) — **bez zmian**.

**Biblioteki / API:** brak nowych.

**Testy:** brak osobnego suite — weryfikacja w DoD KROK 2.

**DoD kroku:**

- `LANDING_COPY.closing.cta === 'Sprawdzam!'`.
- Title / supporting closing bez zmian treści.
- Brak zmian w `landing-view.tsx` w tym kroku.

---

### KROK 2 — Montaż: jeden CTA closing → `onOpenRegister`

**Status:** `WYKONANY`

**Cel:** W sekcji closing usunąć parę buttonów (login + register) i zamontować **jeden** `Button` `default` `size="lg"` z etykietą `copy.closing.cta`, klik → `onOpenRegister`. Chrome + footer — bez regresji. Major Faza 26; F-15; F-14 CTA-only (stylistyka wariantu **bez** redefinicji).

**Artefakty:**

| Ścieżka | Zmiana |
|---------|--------|
| `apps/frontend/src/modules/auth/landing/landing-view.tsx` | closing: jeden CTA zamiast dwóch |

**Implementacja (refaktor — fragment):**

W sekcji closing (ostatnia `<section>` przed `</main>` w surface `marketing`) — **teraz:**

```tsx
                <div className="flex flex-wrap gap-3">
                  <Button type="button" size="lg" onClick={onOpenLogin}>
                    {copy.cta.login}
                  </Button>
                  <Button type="button" variant="outline" size="lg" onClick={onOpenRegister}>
                    {copy.cta.register}
                  </Button>
                </div>
```

**zamień na:**

```tsx
                <div className="flex flex-wrap gap-3">
                  <Button type="button" size="lg" onClick={onOpenRegister}>
                    {copy.closing.cta}
                  </Button>
                </div>
```

Uwagi montażu:

- **Nie** podawaj `variant="outline"` ani `variant="ghost"` — domyślny wariant = `default` (CTA-only teal/mint).
- **Nie** dodawaj drugiego buttona logowania w closing.
- Props `LandingViewProps` (`onOpenLogin` / `onOpenRegister`) zostają — `onOpenLogin` nadal używany w chrome i footerze.
- Layout sekcji (tytuł + supporting + rząd CTA) — bez zmiany struktury poza usunięciem drugiego buttona.

**Biblioteki / API:** istniejący `@/shared/ui/button`; brak Context7 — brak nowego API bibliotek.

**Testy:** ręczne na anonimowym `/` (surface `marketing`).

**DoD kroku:**

- Closing ma **dokładnie jeden** przycisk z etykietą **„Sprawdzam!”**.
- Klik otwiera modal auth w trybie **`register`** (ten sam handler co chrome „Załóż konto”).
- Wariant wizualny = filled CTA (`default` / gradient teal-mint) — **bez** zmian w `button.tsx` / `globals.css`.
- Sticky chrome nadal ma parę „Zaloguj się” / „Załóż konto”; footer nadal ma „Zaloguj się”.
- Brak regresji: thank-you surface, audience, proof, proces, modal Auth poza punktem wejścia z closing.

---

#### Propozycja commit message

```text
feat(landing): replace closing dual CTA with Sprawdzam register

Point the closing section at register-only signup so it no longer duplicates the chrome login/register pair.
```

---

## Weryfikacja wycinka

| Kryterium | Jak sprawdzić |
|-----------|----------------|
| Pokrycie Fazy 26 | Jeden CTA „Sprawdzam!” → `register`; `Button` `default`; chrome + footer login bez zmian |
| docs / SPEC | Zgodność z `docs/ux_dashboard.md` + F-15; zakaz pary CTA w closing |
| Pass rozwojowy | KROK 1 → KROK 2; brak przesunięć |
| Nagłówki | wyłącznie `FAZA` / `KROK` |
| Commit message | EN, Conventional Commits, na końcu FAZA 1 |
| Major | nietknięty w tej sesji |
| Plany pomocnicze root | brak odwołań w tym pliku |

---

## Ślad do major (informacyjnie, po implementacji)

| Element major | Po implementacji |
|---------------|------------------|
| Faza 26 | `WYKONANY` |
| MILESTONE 26 | **brak** — nic nie oznaczać `OSIĄGNIĘTY` |
| Faza 24 / 25 | bez zmian (`WYKONANY`) |

Edycja statusów major = poza tym feature planem (ręcznie lub w osobnej sesji `/feature-implementation` na życzenie użytkownika).
