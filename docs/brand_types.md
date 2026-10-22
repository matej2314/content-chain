---
wersja: 10
data_utworzenia: 2026-09-27
data_modyfikacji: 2026-10-22
---

# Brand types — Content Chain

Przewodnik po **brandowanych typach** TypeScript w monorepo. Cel: type safety na identyfikatorach i enumach kontraktu — semantycznie różne `string`/`number` nie powinny dać się pomylić w compile time. Dopisek: **norma tokenów semantycznych CSS** pod szatę graficzną dashboardu i landingu na `/` (statusy runów, hero dashboardu / akcenty landingu, chipy, fonty, stany pozycji nawigacji), **mapowanie ról kolorów maili transakcyjnych** z tego samego kanonu oraz **marka wizualna** w wspólnym shellu HTML maili (logotyp CID).

Zmiana względem wersji 9 / maile: slot brandu w headerze wspólnego shella HTML = tekstowy wordmark (uppercase „Content Chain”). Od tej wersji: slot = **logotyp** PNG dostarczany jako załącznik **CID** (wizualnie tożsamy z `apps/frontend/public/content-chain-logo-transparent.png`, intrinsic 530×275); `alt` = nazwa marki; plain text / subject / copy body — string „Content Chain” **bez** wymogu obrazu.

Zmiana względem wersji 8 / tokeny: brak kanonu kolorystyki maili transakcyjnych. Od tej wersji: maile współdzielą role kolorów z produktem (dark shell, indigo/violet primary, teal CTA) mapowane z bieżącego `globals.css`; wartości hex/rgb w HTML = HOW przy implementacji — **bez** tabeli hex w docs; klienci poczty **nie** ładują CSS variables.

Zmiana względem wersji 7 / tokeny: primary chrome „głównie pod split-panel”. Od tej wersji: solid `--primary` / `--ring` indigo = chrome dashboardu **oraz** akcenty landingu na `/` (hero / sticky chrome); landing **dziedziczy** ten sam kanon (indigo chrome + teal CTA) — **bez** trzeciej palety; realne screenshoty w hero landingu = **asset produktowy**, nie token CSS. Forma UX `/` — `ux_dashboard.md`.

Zmiana względem wersji 6 / tokeny: sugerowane powiązanie active nav z solid `--primary` (chrome sidebara) oraz brak osobnego traktowania stanów pozycji menu. Od tej wersji: **stany pozycji nawigacji** = teal/mint (wash + ring + rail), **nie** solid indigo `--primary` jako fill active item; tokeny CTA `Button` `default` oraz kierunek tła `--sidebar` — **bez zmian**; solid `--primary` nadal dla chrome poza pozycjami nav (landing / ring / chrome dashboardu). Forma stanów — `ux_dashboard.md`.

Zmiana względem: brak sekcji tokenów CSS w tym dokumencie (kolory statusów poza kanonem docs). Od tej wersji: **Tokeny semantyczne CSS** w `globals.css` + obowiązkowy most `@theme inline`; mapa status→token w `ux_dashboard.md`.

Zmiana względem wersji 3 / tokeny: definicja w `:root` i `.dark` bez jawnego kanonu powierzchni. Od tej wersji: **kanon MVP = pełny dark shell w `:root`** (ciemne `--background` / `--sidebar`); `.dark` zsynchronizowane; **bez** przełącznika — dual-mode = V1 (`ux_dashboard.md`).

Zmiana względem wersji 4 / tokeny: brak mapy tokenów fontu. Od tej wersji: **Tokeny fontów** — `--font-sans` → Space Grotesk, `--font-secondary` → Inter, `--font-mono` → Geist Mono; lokalizacja `globals.css` + `layout.tsx` (`next/font`); **bez** mapowania Inter na globalne `--font-heading`. Role użycia — `ux_dashboard.md` („Typografia”).

Zmiana względem wersji 5 / tokeny: brak rozróżnienia wyglądu wypełnionego CTA od solid `--primary` chrome. Od tej wersji: **Tokeny CTA `Button` `default`** (osobna rola od `--primary`); gradient + foreground ciemny; wartości = HOW feature-planu; **nie** wymagać, by gradient CTA = wartość `--primary` chrome / ring.

Zmiana względem wcześniejszej wersji (bez frontmatteru): `RunStatus` += **`cancelled`**.

Zmiana względem: `UserRole` = `admin` \| `user`. Od tej wersji unia obejmuje **`guest`** (rola DEMO MODE; persistencja = string w DB, bez wymogu Prisma enum).

## Zasady

1. **Mechanizm:** nominalny `Brand<K, Name>` w TypeScript w `packages/shared` **oraz** walidacja na granicach aplikacji → branded. Na granicy HTTP: **class-validator** (DTO); w warstwie application api: **Zod** — zgodnie ze `spec/SPEC-KOMUNIKACJA.md` / `spec/SPEC-MONOREPO.md`.
2. **Lokalizacja typów:** definicje brandów, enumów i helperów typów w **`packages/shared`** (kontrakt współdzielony przez `apps/api` i `apps/frontend`).
3. **`packages/shared` bez Zod (i bez innego runtime walidatora):** wyłącznie typy / enumy / brand types + lekkie helpery typów (`create*` / `is*` oparte o wzorce string, bez zależności Zod). Schemy Zod żyją w `apps/api` (application), nie w shared.
4. **Granica HTTP:** parsowanie / walidacja wejścia → branded; **zakaz** gołego `as UserId` w controllerach i handlerach UI.
5. **Formaty z gateway:** `RequestId` i `ConversationId` mają **ten sam format** co w `ai-provider-gateway` (`req_<uuid>`, `conv_<uuid>`), żeby logi CC i logi LLM dało się spiąć po tych samych wartościach.

Zmiana względem wcześniejszych wersji tego dokumentu:
- **nie** reużywamy jednego `RequestId` na cały run;
- przy wywołaniach LLM **nie** generujemy ani nie wysyłamy własnego `x-request-id` do gateway — kanoniczny `RequestId` hopu LLM pochodzi z **odpowiedzi** `ai-provider-gateway`;
- **usunięto** dopuszczenie Zod / `src/branded/zod.ts` w `packages/shared` (norma: shared bez runtime walidacji).
- **`RunTaskType`** rozszerzony o `reel_*` i `page_*`; dodano `ContentKind` i `RunPlatform` (`'web'` **nie** jest `SocialPlatform`); `FeedbackAgentKey` += `PageWriterAgent` (kontrakt pod Fazę 6).

## Infrastruktura (wzorzec)

Jak w gateway (uproszczony odpowiednik w `packages/shared`):

```typescript
export type Brand<K, T> = K & { readonly __brand: T };

export const brand = <B>(value: UnBrand<B>): B => value as B;
export const unbrand = <B>(value: B): UnBrand<B> => value as UnBrand<B>;
```

Preferuj `create*` / `is*` (z walidacją wzorca) zamiast surowego `brand()` na danych z HTTP. Implementacja `create*` w shared może sprawdzać regex/prefiks **bez** Zod; pełne schemy Zod — tylko w api.

Docelowe pliki (propozycja):

| Plik w `packages/shared` | Rola |
|--------------------------|------|
| `src/branded/brand.ts` | `Brand`, `brand` / `unbrand` |
| `src/branded/ids.ts` | aliasy ID + wzorce + `create*` / `is*` |
| `src/branded/enums.ts` | union types / const enums kontraktu |

**Zakaz:** `src/branded/zod.ts` oraz zależności `zod` w `packages/shared`.

## Katalog typów (MVP)

### Identyfikatory (string brands)

| Typ | Format / wzorzec | Zakres / semantyka |
|-----|------------------|--------------------|
| `RequestId` | `req_<uuid>` — `/^req_[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i` | **Źródła odpowiedzi, nie klienta:** (1) HTTP — `apps/api` nadaje `RequestId` i zwraca w envelope / `x-request-id`; frontend **nie** musi go generować. (2) Hop LLM — wyłącznie `requestId` z odpowiedzi gateway. Oś korelacji runu agentowego = `ConversationId` (+ `RunId`), nie seria HTTP-`RequestId`. |
| `ConversationId` | `conv_<uuid>` — `/^conv_[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i` | **Jeden na cały run agentowy.** Wspólna oś korelacji wszystkich wywołań LLM; CC tworzy przy starcie runu i przekazuje w body `POST .../chat`. |
| `UserId` | `usr_<uuid>` | ID użytkownika w DB / JWT po zmapowaniu |
| `InvitationId` | `inv_<uuid>` | ID zaproszenia (Invitation) — **nie** konto `User` |
| `RunId` | `run_<uuid>` | Jeden async run pipeline’u (Social albo Content) |
| `FeedbackId` | `fbk_<uuid>` | Jeden wpis opinii tekstowej |
| `GatewayModelAlias` | string brand (bez sztywnego prefiksu) | Alias modelu z konfiguracji gateway; walidacja „niepusty” na granicy api→gateway |

`RequestId` / `ConversationId` **nie** dostają osobnego „CC formatu” — świadoma zgodność wzorców z upstream.

### Enumy / unie kontraktu (brand lub string union)

| Typ | Wartości MVP |
|-----|-------------|
| `UserRole` | `admin` \| `user` \| `guest` |
| `RunStatus` | `queued` \| `running` \| `interrupted` \| `awaiting_hitl` \| `completed` \| `failed` \| `cancelled` |
| `RunTaskType` | `post_ideas` \| `post_content` \| `post_ideas_then_content` \| `reel_ideas` \| `reel_script` \| `reel_ideas_then_scripts` \| `page_copy` \| `page_outline_then_copy` |
| `SocialPlatform` | `linkedin` \| `facebook` \| `instagram` — **nie** zawiera `'web'` |
| `RunPlatform` | `SocialPlatform` \| `'web'` (unia w shared; `'web'` = sentinel kolumny `Run.platform` przy `page_*`, nie wartość `SocialPlatform`) |
| `ContentKind` | `blog` \| `service_page` \| `landing` |
| `ContentLanguage` | `pl` \| `en` |
| `FeedbackTargetType` | `application` \| `agent` \| `run` |
| `FeedbackAgentKey` | `IdeationAgent` \| `ContentWriterAgent` \| `ConsistencyVerifier` \| `PageWriterAgent` |
| `RunUserRating` | `1` \| `2` \| `3` \| `4` \| `5` (w JSON runu pole jest `number \| null`; `null` = brak oceny) |

Enumy wolno modelować jako `Brand<string, 'RunStatus'>` z whitelistą w `createRunStatus` **albo** jako wąskie string union w shared. Schemy Zod dla tych enumów — w `apps/api` (application), nie w `packages/shared`. Jedna konwencja nazw w shared; brak magicznych stringów w feature kodzie.

## Tokeny semantyczne CSS (norma wizualna)

Tokeny koloru statusów i sygnałów UI dashboardu **nie** żyją w `packages/shared` — wyłącznie w frontendzie.

| Element | Norma |
|---------|--------|
| Lokalizacja | wyłącznie `apps/frontend/src/app/globals.css` |
| Definicja | w **`:root`** **i** **`.dark`** — **kanon MVP = dark shell w `:root`** (ciemne `--background` / `--card` / `--sidebar` itd.; sidebar może być nieco ciemniejszy od main); `.dark` **zsynchronizowane** z tym samym shellem (klasa może istnieć w CSS, produkt **nie** przełącza motywu). Brak przełącznika light/dark w MVP — dual-mode = V1 (`ux_dashboard.md`) |
| Most Tailwind | **obowiązkowy** blok `@theme inline` z `--color-*` analogicznie do `--color-destructive` |
| Mapa status→token | `docs/ux_dashboard.md` („Normy wizualne” / tabela `RunStatus`) |

**Obowiązkowe rodziny** (minimum; każda z wariantem `-foreground` tam, gdzie token jest tłem lub tekstem):

| Token CSS | Most `@theme inline` | Typowe użycie |
|-----------|----------------------|---------------|
| `--success` | `--color-success` (+ foreground) | `running` |
| `--warning` | `--color-warning` (+ foreground) | `awaiting_hitl` |
| `--completed` | `--color-completed` (+ foreground) | `completed` |
| `--interrupted` | `--color-interrupted` (+ foreground) | `interrupted` |
| `--cancelled` | `--color-cancelled` (+ foreground) | `cancelled` |
| `--queued` | `--color-queued` (+ foreground) | `queued` |
| `--destructive` | `--color-destructive` (istniejące) | `failed` |
| `--muted` | `--color-muted` (istniejące) | tła pomocnicze — **nie** jako jedyny kolor wielu `RunStatus` naraz |

**Zakaz:** hex / rgb / nazwy kolorów „na piechotę” w badge’ach statusów, hero bannerze, chipach (Demo / Agenci), liftingu invite-accept i floating box — wyłącznie tokeny z `globals.css` / klasy Tailwind oparte o most `@theme`.

Wartości `oklch` = HOW feature-planu; **przypisanie** status→rodzina tokenu = docs UX.

### Tokeny wypełnionego CTA (`Button` `default`)

Wygląd wypełnionego CTA produktu **nie** jest wartością solid `--primary` używaną przez akcenty landingu / ring / chrome poza pozycjami nawigacji. **Nie** jest też tokenami stanów pozycji menu sidebara.

| Element | Norma |
|---------|--------|
| Zakres | wyłącznie wariant `Button` **`default`** (nie `outline` / `ghost` / `destructive` / `link` / `secondary`) |
| Rola | tło = gradient teal/mint **135°**; tekst = **ciemny** (kierunek — `ux_dashboard.md` / Paleta) |
| Lokalizacja | tokeny w `apps/frontend/src/app/globals.css` (`:root` / `.dark`); mapowanie w `button.tsx` na wariant `default` |
| Wartości | hex / pełny zapis gradientu = **HOW** feature-planu Fazy 22 — **nie** pin w tym dokumencie |
| Chrome primary | `--primary` / `--primary-foreground` / `--ring` **zostają** indigo/violet; CTA **nie** nadpisuje tych tokenów |
| Stany nav | legalizacja stanów pozycji menu **nie** przepina ani nie przepisuje kolorów / gradientu CTA `default` |

**Wyjątek względem zakazu hex:** wartości hex / gradient **wolno** wyłącznie jako definicja dedykowanych tokenów CTA `default` w `globals.css` (oraz ich użycie przez wariant `default`). Badge’e statusów, hero, chipy, lifting — **bez** tego wyjątku (nadal wyłącznie tokeny statusowe / surface).

Hover / `:active`: te same kolory tła i tekstu CTA; lekki `brightness` na **całym** przycisku (wartość = HOW).

### Kolorystyka maili transakcyjnych (mapowanie z produktu)

Maile transakcyjne (Auth `infrastructure/mail/`) **nie** ładują `globals.css` w runtime skrzynki — klienci poczty nie honorują CSS variables produktu. Wspólny shell HTML używa **inline** hex/rgb, ale **role** kolorów mapuje z bieżącego kanonu UI w `apps/frontend/src/app/globals.css`:

| Rola w mailu | Źródło w produkcie (kanon) |
|--------------|----------------------------|
| Tło shell / powierzchnia | dark shell (`--background` / powierzchnie kart) |
| Tekst | foreground / muted z dark shell |
| Akcent primary | indigo/violet (`--primary` / chrome) |
| CTA (przycisk / link akcji) | teal CTA (`Button` `default` / akcent CTA) |

| Element | Norma |
|---------|--------|
| Zakres | wszystkie kinds (`user_invited`, `user_activation`, `user_welcome`, …) — **jeden** wspólny shell kolorystyczny |
| Wartości hex/rgb w HTML | **HOW** feature-planu — odczyt z aktualnego `globals.css` przy implementacji; **bez** tabeli hex w tym dokumencie |
| Zakaz | osobna paleta „tylko pod mail”; wymaganie CSS variables w kliencie poczty; rozjazd z redesignem UI |

Zmiana względem: brak normy kolorystyki maili w docs. Od tej wersji maile = ten sam kierunek wizualny co dashboard / landing, z ograniczeniem kanału (inline, bez `@theme`).

### Marka wizualna w shellu maili transakcyjnych

Wspólny shell HTML maili Auth (`infrastructure/mail/`) ma w **headerze** slot brandu. Od tej wersji slot = **logotyp**, nie sam tekst marki.

| Element | Norma |
|---------|--------|
| Forma w HTML | logotyp PNG (RGBA / przezroczysty), wizualnie tożsamy z `apps/frontend/public/content-chain-logo-transparent.png` (intrinsic **530×275**) |
| Dostawa | lokalny plik + załącznik **CID** w warstwie mail I/O (`apps/api/.../infrastructure/mail/`); ścieżka pliku, `cid:` i szerokość wyświetlana = **HOW** — **bez** pinowania w tym dokumencie |
| `alt` | nazwa marki (string copy brand: „Content Chain”) |
| Zakres kinds | wszystkie kinds przez **jeden** wspólny shell (`user_invited` \| `user_activation` \| `user_welcome` oraz przyszłe w tym samym shellu) |
| Tło slotu | wyłącznie tło zgodne z **dark** shell / panelem (tabela ról kolorów powyżej); **bez** osobnego wariantu logo na jasne tło |
| Plain text / subject / copy body | string „Content Chain” — **bez** wymogu obrazu; logo **nie** zastępuje nazwy marki w prozie ani w plaintext |
| Zakaz | kanon brandu HTML = wyłącznie tekst w slocie headera; osobny „light logo”; React Email / szablony we FE; montaż CID w domain / use-case |

Zmiana względem Fazy 25 / dotychczasowego shella: header brand = tekstowy wordmark (uppercase). Od tej wersji = logotyp CID. Relacja do sidebara / landingu FE — poza zakresem tej normy.

### Stany pozycji nawigacji sidebara (teal/mint)

Pozycje menu (desktop + mobile sheet) **nie** używają solid `--primary` indigo jako wypełnienia active item. Osobne traktowanie teal/mint względem chrome primary i względem CTA `default`.

| Element | Norma |
|---------|--------|
| Rola | wash teal/mint + inset ring + lewy pasek (rail) z glow; stany normal / hover / active / active+hover — forma w `ux_dashboard.md` |
| Chrome primary | solid `--primary` / `--ring` indigo **zostaje** dla landingu (hero / chrome) / ring / chrome dashboardu **poza** pozycjami nav |
| Tło sidebara | `--sidebar` / `--sidebar-foreground` — **bez** zmiany kierunku (ciemny shell jak dotychczas); stany nav **nie** redefiniują tła aside |
| CTA | tokeny `Button` `default` — **bez zmian** (nie mieszać gradientu CTA 135° z wash pozycji menu) |
| Wartości | hex / opacity / radius = **HOW** feature-planu — **nie** pin w tym dokumencie |

Zmiana względem wersji 6: *active nav sugerowany jako solid `--primary` chrome sidebara*. Od tej wersji active nav ≠ solid indigo fill.

### Tokeny fontów

Fonty UI **nie** żyją w `packages/shared` — wyłącznie w frontendzie (jak kolory statusów). Role użycia (gdzie Inter vs Space Grotesk) = `ux_dashboard.md` („Normy wizualne” / Typografia) — ten dokument tylko mapuje tokeny.

| Token CSS | Font | Lokalizacja / ładunek |
|-----------|------|------------------------|
| `--font-sans` | **Space Grotesk** | `apps/frontend/src/app/globals.css` + `layout.tsx` (`next/font/google`) — default UI |
| `--font-secondary` | **Inter** | j.w. — tytuły kart KPI + paragrafy pomocnicze pod nagłówkami widoków; **nie** mapować na globalne `--font-heading` |
| `--font-mono` | **Geist Mono** | j.w. — mono / `tabular-nums` / meta |

**Zakaz:** `<link>` do Google Fonts; Inter jako default `body`; serify poza produktem.

## Przepływ korelacji (norma)

```text
RunId            ═══════════════════════════════════════════  cały run
ConversationId   ═══════════════════════════════════════════  wszystkie LLM w runie (CC → body chat)
RequestId HTTP   ──► POST /runs, POST .../hitl, … (generuje apps/api)
RequestId LLM₁        ──► z odpowiedzi gateway po IdeationAgent
RequestId LLM₂              ──► z odpowiedzi gateway po ConsistencyVerifier
RequestId LLM₃                    ──► z odpowiedzi gateway po kolejnym agencie
```

1. Żądanie HTTP do `apps/api`: middleware **sam** nadaje `RequestId` (`req_<uuid>`) i zwraca go w envelope / nagłówku. Klient (`frontend` / Postman) **nie** generuje ani nie musi wysyłać `x-request-id` — bierze ID z odpowiedzi tylko gdy potrzebuje do debugu pojedynczego HTTP.
2. Przy starcie runu: `apps/api` tworzy `RunId` oraz **`ConversationId`** (jeden na run); to **główna oś** korelacji kroków agentów / LLM.
3. Każdy krok LLM (każdy agent / refine): wywołaj gateway **bez** `x-request-id`. Po odpowiedzi zapisz w `run.log` zwrócony `requestId` + wspólny `conversationId` + `RunId`.
4. Brak odpowiedzi gateway (timeout / drop): wpis logu kroku bez `requestId` gateway; korelacja runu nadal po `ConversationId` / `RunId`.
5. Zakaz: klient generuje `RequestId` „na zapas” (ani do api, ani do gateway); zakaz reużycia jednego LLM-`RequestId` na wiele hopów.

## Do / Don’t

| Wolno | Nie wolno |
|-------|-----------|
| Brać HTTP-`requestId` **z odpowiedzi** `apps/api`; brać LLM-`requestId` **z odpowiedzi** gateway | Żeby klient wołał `createRequestId` przed `POST /runs` / HITL / chat |
| `createConversationId` przy starcie runu (po stronie `apps/api`) | Nowy `ConversationId` na każdy agent |
| `createRequestId` **wyłącznie** jako detal implementacji middleware `apps/api` (serwer nadaje ID w odpowiedzi) | Traktować HTTP-`RequestId` jako oś korelacji całego pipeline’u SM |
| Jeden `ConversationId` na run agentowy | Generować i wysyłać `x-request-id` do gateway przy chat/stream |
| class-validator (HTTP) + Zod (application api) → branded | `as RunId` na `req.params` bez walidacji |
| Brandów / enumów kontraktu w `packages/shared` **bez Zod** | Zod (lub inny runtime walidator) w `packages/shared`; duplikacja `Brand` w `apps/frontend` |
| Prefiksy `usr_` / `inv_` / `run_` / `fbk_` dla ID wyłącznie CC | Mylenie `GatewayModelAlias` z vendor `modelId` |

## Poza zakresem MVP tego dokumentu

- Pełny katalog brandów gateway (tokeny, `GatewayKey`, metryki) — docs upstream; CC bierze formaty ID + to, czego potrzebuje do wywołań.
- Brandowanie każdego pola briefu SM **ani** briefu Content (`SocialBrief` / `ContentBrief` to zwykłe obiekty, nie brand types).
- Umieszczanie kształtów `SocialBrief` / `ContentBrief` w `packages/shared` — to payload agregatu Run (`apps/api/src/runs/domain/run.types.ts`), nie publiczny enum/brand FE/BE. Zod briefu żyje w application api.
- OpenTelemetry jako wymóg MVP (korelacja ID wystarcza na start).

Zmiana względem: „brandowanie każdego pola briefu SM” milcząco zakładało jeden brief; kształty kanałowe nadal poza shared.

Szczegóły pojęć: `dictionary.md`. Kontrakt HTTP: `dokumentacja_komunikacji.md`. Normy wizualne statusów: `ux_dashboard.md`. Przepływy: `data_flow.md`. Bezpieczeństwo ID/sekretów: `security.md`. Norma shared: `spec/SPEC-MONOREPO.md`.
