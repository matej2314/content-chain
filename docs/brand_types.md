---
wersja: 4
data_utworzenia: 2026-09-27
data_modyfikacji: 2026-10-17
---

# Brand types — Content Chain

Przewodnik po **brandowanych typach** TypeScript w monorepo. Cel: type safety na identyfikatorach i enumach kontraktu — semantycznie różne `string`/`number` nie powinny dać się pomylić w compile time. Dopisek: **norma tokenów semantycznych CSS** pod szatę graficzną dashboardu (statusy runów, hero, chipy).

Zmiana względem: brak sekcji tokenów CSS w tym dokumencie (kolory statusów poza kanonem docs). Od tej wersji: **Tokeny semantyczne CSS** w `globals.css` + obowiązkowy most `@theme inline`; mapa status→token w `ux_dashboard.md`.

Zmiana względem wersji 3 / tokeny: definicja w `:root` i `.dark` bez jawnego kanonu powierzchni. Od tej wersji: **kanon MVP = pełny dark shell w `:root`** (ciemne `--background` / `--sidebar`); `.dark` zsynchronizowane; **bez** przełącznika — dual-mode = V1 (`ux_dashboard.md`).

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
