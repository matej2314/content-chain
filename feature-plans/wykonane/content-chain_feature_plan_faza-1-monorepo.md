# Feature Plan — Faza 1: Fundament monorepo i boilerplate aplikacji

## Meta

**Kotwica major:** `content-chain-backend_major_plan.md` — Faza 1 (Kroki 1.1–1.5) + MILESTONE 1  
**Bramka ścieżki wstecz:** Faza 1 jest pierwszą fazą w major planie — bramka nie dotyczy.  
**Zakres:** Workspace pnpm, docelowe drzewo katalogów, `packages/shared` z brand types, boilerplate frontendu, szkielety api i gateway, tooling root, szablony env.  
**Poza zakresem wycinka:** persistence (schema Prisma — Faza 2), Helmet/CORS/**fail-fast krytycznych** env na api (Faza 2; ConfigModule/Pino/Swagger deps mogą być wcześniej), logika BC (Fazy 3–5), pipeline SM, auth produktowy, ekrany FE, Docker Compose production.

---



## Założenia

- Stack z docs/SPEC: **pnpm workspaces** (`pnpm-workspace.yaml`), **NestJS** (api), **Next.js App Router** (frontend), **NestJS** (gateway — istniejąca instancja produktu `ai-provider-gateway` w `apps/ai-provider-gateway`, nie scaffold Express), **TypeScript 5.x** wszędzie.
  Zmiana względem: wcześniejsze założenie „Express + TypeScript (gateway)”. Źródło: drzewo i `package.json` w `apps/ai-provider-gateway`; `docs/architektura.md` (dostosowana instancja).
- Stack runtime `apps/api` (Faza 1): `@nestjs/config`, class-validator / class-transformer, Zod, Pino / `nestjs-pino`, `@nestjs/swagger` — Swagger UI pod **`/docs`**, lokalny port api **3001** (`docs/architektura.md`, `docs/dokumentacja_komunikacji.md`, `SPEC-KOMUNIKACJA.md`, `SPEC-BEZPIECZENSTWO.md`).
- Bootstrap Nest w `apps/api` może pochodzić ze skryptu vault `init-nestjs.ps1` (flagi monorepo); skrypt **nie** jest edytowany — korekty PORT=3001 i ścieżki Swagger `/docs` to **ręczne kroki** w tym planie.
- `packages/shared` — tylko typy/enumy/brand types; zero Zod, zero runtime walidatorów (SPEC-MONOREPO M-5, `docs/brand_types.md`).
- Komunikacja FE → api: HTTP/cookie; api → gateway: HTTP; brak importów TS między procesami (SPEC-MONOREPO M-4).
- Gateway w Fazie 1 = pełna uruchamialna instancja; brak domeny Content Chain wewnątrz (SPEC-MONOREPO „Nie wolno").
- Nazwy pakietów workspace: `@content-chain/shared` (shared), `api` (apps/api), `frontend` (apps/frontend), `ai-provider-gateway` (apps/ai-provider-gateway).
- Wersje bibliotek bez pinu w tym planie (pin przy `pnpm install` → lockfile). Przykładowe zakresy: NestJS `^11`, Next.js `^15`, TypeScript `^5.7`.

---



## FAZA 1 — Fundament monorepo i boilerplate aplikacji



### KROK 1 — Root workspace: pnpm-workspace.yaml, root package.json i root tsconfig.json

**Status:** `WYKONANY`

**Cel:** Ustanowienie workspace pnpm jako fundament monorepo. Odwołanie do Kroku 1.1 major + SPEC-MONOREPO M-1, M-2, M-7.

Uwaga: w repo istnieje pusty plik `pnpm-workspace.yml` (rozszerzenie `.yml`). SPEC-MONOREPO M-2 wskazuje `pnpm-workspace.yaml`. Należy usunąć `.yml` i stworzyć `.yaml`.

**Artefakty:**

- `pnpm-workspace.yaml` (nowy, zastępuje pusty `pnpm-workspace.yml`)
- `package.json` (refaktor istniejącego — dopisanie `private: true` i skryptów workspace)
- `tsconfig.json` (nowy — root bazowy)
- `.gitignore` (refaktor — uzupełnienie o typowe Node.js/pnpm wpisy)

**Implementacja:**

**Nowy plik:** `pnpm-workspace.yaml`

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

---

**Refaktor:** `package.json`

Teraz:

```json
{
  "name": "content-chain",
  "version": "1.0.0",
  "type": "module",
  "scripts": { "test": "echo \"Error: no test specified\" && exit 1" },
  ...
}
```

Zamień na:

{  
  "name": "content-chain",  
  "version": "1.0.0",  
  "private": true,  
  "scripts": {  
    "dev:api": "pnpm --filter api dev",  
    "dev:frontend": "pnpm --filter frontend dev",  
    "dev:gateway": "pnpm --filter ai-provider-gateway dev",  
    "build": "pnpm -r build",  
    "lint": "eslint . --ext .ts,.tsx,.js,.jsx",  
    "format": "prettier --write .",  
    "format:check": "prettier --check ."  
  },  
  "devDependencies": {  
    "@typescript-eslint/eslint-plugin": "^8.0.0",  
    "@typescript-eslint/parser": "^8.0.0",  
    "eslint": "^9.0.0",  
    "eslint-config-prettier": "^10.0.0",  
    "prettier": "^3.0.0",  
    "typescript": "^5.7.0"  
  }  
}

*Uwaga:* Usunięto `"type": "module"` z root — kolizja z CommonJS używanym przez NestJS w apps/api. Każdy pakiet zarządza własnym `"type"` w swoim `package.json`.*

---

**Nowy plik:** `tsconfig.json` (root bazowy — bez project references)

```json
{
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  }
}
```

---

**Refaktor:** `.gitignore`

Teraz: pusty lub minimalny.

Zamień na (dopisz):

```gitignore
# zależności
node_modules/
.pnpm-store/

# build
dist/
.next/
.turbo/

# env — sekrety nigdy w repo (SPEC-BEZPIECZENSTWO B-2)
.env
.env.local
.env.*.local

# baza SQLite
*.db
*.db-journal

# Prisma
apps/api/prisma/migrations/

# IDE
.cursor/

# system
.DS_Store
Thumbs.db
```

**Biblioteki / API:** pnpm workspaces — `/pnpm/pnpm.io` (Context7). Protokół `workspace:` wiąże lokalne pakiety i odmawia fallbacku do registry.

**DoD kroku:**

- `pnpm-workspace.yaml` istnieje z globami `apps/*` i `packages/*`.
- Root `package.json` ma `private: true` i skrypty workspace.
- Root `tsconfig.json` obecny jako bazowy.
- Stary `pnpm-workspace.yml` usunięty.

---



### KROK 2 — Docelowe drzewo katalogów i package.json per pakiet

**Status:** `WYKONANY`

**Cel:** Układ `apps/` i `packages/` zgodny z `docs/architektura_katalogi_pliki.md` i SPEC-MONOREPO M-1. Wszystkie cztery pakiety workspace z własnymi `package.json` i `tsconfig.json`. W api — puste katalogi BC z `.gitkeep`; placeholder Prisma dir.

**Artefakty:**

- `apps/api/package.json`
- `apps/api/tsconfig.json`
- `apps/api/prisma/` (katalog; `schema.prisma` — placeholder)
- `apps/api/src/` — katalogi BC: `auth/`, `company-context/`, `social/`, `runs/`, `shared/` (puste z `.gitkeep` — wypełniane w KROKACH 5, 7 i kolejnych fazach)
- `apps/frontend/package.json`
- `apps/frontend/tsconfig.json`
- `apps/ai-provider-gateway/package.json`
- `apps/ai-provider-gateway/tsconfig.json`
- `packages/shared/package.json`
- `packages/shared/tsconfig.json`

**Implementacja:**

**Bootstrap `apps/api` (zalecany):** ze rootu monorepo wywołać skrypt vault (bez edycji skryptu), gdy `apps/api` nie ma jeszcze `package.json`:

```powershell
& "<ścieżka-do-vault>/init-nestjs.ps1" `
  -TargetDirectory "apps/api" `
  -PackageManager pnpm `
  -SkipGit `
  -SkipSddDirs `
  -PackageName "api"
```

Skrypt instaluje m.in. `@nestjs/config`, swagger, pino, class-validator, zod — **zostawić** (są w zatwierdzonym stacku). Korekty PORT=3001 i Swagger `/docs` — w **KROKU 5** (ręczne, bez zmiany skryptu PS).

Po scaffoldzie dopisać zależność workspace i upewnić się, że `package.json` pokrywa poniższy zestaw (nazwa `api`, `private: true`, skrypt `dev`).

**Docelowy / uzupełniony:** `apps/api/package.json`

```json
{
  "name": "api",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "dev": "nest start --watch",
    "build": "nest build",
    "start": "node dist/main",
    "lint": "eslint src --ext .ts",
    "test": "jest"
  },
  "dependencies": {
    "@content-chain/shared": "workspace:*",
    "@nestjs/common": "^11.0.0",
    "@nestjs/config": "^4.0.0",
    "@nestjs/core": "^11.0.0",
    "@nestjs/platform-express": "^11.0.0",
    "@nestjs/swagger": "^11.0.0",
    "class-transformer": "^0.5.0",
    "class-validator": "^0.14.0",
    "nestjs-pino": "^4.0.0",
    "pino": "^9.0.0",
    "reflect-metadata": "^0.2.0",
    "rxjs": "^7.8.0",
    "swagger-ui-express": "^5.0.0",
    "zod": "^3.0.0"
  },
  "devDependencies": {
    "@nestjs/cli": "^11.0.0",
    "@nestjs/testing": "^11.0.0",
    "@types/express": "^5.0.0",
    "@types/node": "^22.0.0",
    "@types/swagger-ui-express": "^4.0.0",
    "pino-pretty": "^13.0.0",
    "typescript": "^5.7.0"
  }
}
```

Zmiana względem wcześniejszej wersji Kroku 2: lista deps api rozszerzona o stack config/logger/Swagger/walidacja (wcześniej tylko rdzeń Nest + shared); bootstrap przez `init-nestjs.ps1` jest dozwolony.

**Nowy plik:** `apps/api/tsconfig.json` (NestJS wymaga CommonJS i dekoratorów; po `nest new` — **dostosować** do `extends` root)

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "module": "CommonJS",
    "moduleResolution": "node",
    "target": "ES2022",
    "outDir": "./dist",
    "rootDir": "./src",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "test"]
}
```

---

**Nowy plik:** `apps/frontend/package.json`

```json
{
  "name": "frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@content-chain/shared": "workspace:*",
    "@iconify/react": "^5.0.0",
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwindcss": "^4.0.0"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "typescript": "^5.7.0"
  }
}
```

**Nowy plik:** `apps/frontend/tsconfig.json`

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

**Nowy plik:** `apps/ai-provider-gateway/package.json`

```json
{
  "name": "ai-provider-gateway",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/main.ts",
    "build": "tsc",
    "start": "node dist/main.js"
  },
  "dependencies": {
    "express": "^4.21.0"
  },
  "devDependencies": {
    "@types/express": "^5.0.0",
    "@types/node": "^22.0.0",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.7.0"
  }
}
```

**Nowy plik:** `apps/ai-provider-gateway/tsconfig.json`

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "module": "CommonJS",
    "moduleResolution": "node",
    "target": "ES2022",
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

---

**Nowy plik:** `packages/shared/package.json`

```json
{
  "name": "@content-chain/shared",
  "version": "0.0.1",
  "private": true,
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch"
  },
  "devDependencies": {
    "typescript": "^5.7.0"
  }
}
```

**Nowy plik:** `packages/shared/tsconfig.json`

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "module": "CommonJS",
    "moduleResolution": "node",
    "target": "ES2022",
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "declarationMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

---

**Nowy plik:** `apps/api/prisma/schema.prisma` (placeholder — treść w Fazie 2 Krok 2.1)

```prisma
// Schema MVP — wypełniane w Fazie 2 (Krok 2.1 — Persistence MVP)
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}
```

**DoD kroku:**

- Istnieją ścieżki `apps/api`, `apps/frontend`, `apps/ai-provider-gateway`, `packages/shared` (M-1 SPEC-MONOREPO).
- Każdy pakiet ma własny `package.json` i `tsconfig.json` (M-6).
- `@content-chain/shared` jest deklarowane w deps api i frontend protokołem `workspace:*` (M-3).
- `packages/shared/package.json` nie zawiera Zod ani ORM (M-5).

---



### KROK 3 — packages/shared: brand types i enumy kontraktu

**Status:** `WYKONANY`

**Cel:** Kontrakt typów gotowy pod BC api i FE. Odwołanie do Kroku 1.2 major, `docs/brand_types.md`, SPEC-MONOREPO M-5.

**Artefakty:**

- `packages/shared/src/branded/brand.ts`
- `packages/shared/src/branded/ids.ts`
- `packages/shared/src/branded/enums.ts`
- `packages/shared/src/index.ts`

**Implementacja:**

**Nowy plik:** `packages/shared/src/branded/brand.ts`

```typescript
export type Brand<K, T> = K & { readonly __brand: T };
export type UnBrand<B> = B extends Brand<infer K, unknown> ? K : B;

/**
 * Niskopoziomowy cast do branded type.
 * Preferuj createXxx / isXxx na granicach HTTP — zakaz surowego brand() w controllerach.
 * Źródło: docs/brand_types.md
 */
export const brand = <B>(value: UnBrand<B>): B => value as B;
export const unbrand = <B>(value: B): UnBrand<B> => value as UnBrand<B>;
```

---

**Nowy plik:** `packages/shared/src/branded/ids.ts`

```typescript
import { Brand, brand } from './brand';

// ---------------------------------------------------------------------------
// Typy identyfikatorów — formaty z docs/brand_types.md
// ---------------------------------------------------------------------------

export type RequestId = Brand<string, 'RequestId'>;
export type ConversationId = Brand<string, 'ConversationId'>;
export type UserId = Brand<string, 'UserId'>;
export type RunId = Brand<string, 'RunId'>;
export type GatewayModelAlias = Brand<string, 'GatewayModelAlias'>;

// ---------------------------------------------------------------------------
// Wzorce (norma: format zgodny z ai-provider-gateway dla RequestId/ConversationId)
// ---------------------------------------------------------------------------

const UUID_PART = '[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}';
const REQUEST_ID_RE = new RegExp(`^req_${UUID_PART}$`, 'i');
const CONV_ID_RE    = new RegExp(`^conv_${UUID_PART}$`, 'i');
const USER_ID_RE    = new RegExp(`^usr_${UUID_PART}$`, 'i');
const RUN_ID_RE     = new RegExp(`^run_${UUID_PART}$`, 'i');

// ---------------------------------------------------------------------------
// RequestId — nadaje middleware apps/api; klient NIE generuje
// ---------------------------------------------------------------------------

export const isRequestId = (v: string): v is RequestId => REQUEST_ID_RE.test(v);
export const createRequestId = (v: string): RequestId => {
  if (!isRequestId(v)) throw new Error(`Invalid RequestId: "${v}"`);
  return brand<RequestId>(v);
};

// ---------------------------------------------------------------------------
// ConversationId — tworzony przez apps/api przy starcie runu (jeden na run)
// ---------------------------------------------------------------------------

export const isConversationId = (v: string): v is ConversationId => CONV_ID_RE.test(v);
export const createConversationId = (v: string): ConversationId => {
  if (!isConversationId(v)) throw new Error(`Invalid ConversationId: "${v}"`);
  return brand<ConversationId>(v);
};

// ---------------------------------------------------------------------------
// UserId
// ---------------------------------------------------------------------------

export const isUserId = (v: string): v is UserId => USER_ID_RE.test(v);
export const createUserId = (v: string): UserId => {
  if (!isUserId(v)) throw new Error(`Invalid UserId: "${v}"`);
  return brand<UserId>(v);
};

// ---------------------------------------------------------------------------
// RunId
// ---------------------------------------------------------------------------

export const isRunId = (v: string): v is RunId => RUN_ID_RE.test(v);
export const createRunId = (v: string): RunId => {
  if (!isRunId(v)) throw new Error(`Invalid RunId: "${v}"`);
  return brand<RunId>(v);
};

// ---------------------------------------------------------------------------
// GatewayModelAlias — alias modelu z konfiguracji gateway; walidacja "niepusty"
// ---------------------------------------------------------------------------

export const isGatewayModelAlias = (v: string): v is GatewayModelAlias => v.trim().length > 0;
export const createGatewayModelAlias = (v: string): GatewayModelAlias => {
  if (!isGatewayModelAlias(v)) throw new Error('GatewayModelAlias must be non-empty');
  return brand<GatewayModelAlias>(v);
};
```

---

**Nowy plik:** `packages/shared/src/branded/enums.ts`

```typescript
// ---------------------------------------------------------------------------
// Enumy kontraktu MVP — wartości z docs/brand_types.md
// Schemy Zod dla tych enumów żyją w apps/api (application), NIE tutaj.
// ---------------------------------------------------------------------------

export type UserRole = 'admin' | 'user';
export type RunStatus = 'queued' | 'running' | 'awaiting_hitl' | 'completed' | 'failed';
export type RunTaskType = 'post_ideas' | 'post_content' | 'post_ideas_then_content';
export type SocialPlatform = 'linkedin' | 'facebook' | 'instagram';
export type ContentLanguage = 'pl' | 'en';

export const USER_ROLES = ['admin', 'user'] as const satisfies readonly UserRole[];
export const RUN_STATUSES = ['queued', 'running', 'awaiting_hitl', 'completed', 'failed'] as const satisfies readonly RunStatus[];
export const RUN_TASK_TYPES = ['post_ideas', 'post_content', 'post_ideas_then_content'] as const satisfies readonly RunTaskType[];
export const SOCIAL_PLATFORMS = ['linkedin', 'facebook', 'instagram'] as const satisfies readonly SocialPlatform[];
export const CONTENT_LANGUAGES = ['pl', 'en'] as const satisfies readonly ContentLanguage[];

export const isUserRole = (v: string): v is UserRole =>
  (USER_ROLES as readonly string[]).includes(v);
export const isRunStatus = (v: string): v is RunStatus =>
  (RUN_STATUSES as readonly string[]).includes(v);
export const isRunTaskType = (v: string): v is RunTaskType =>
  (RUN_TASK_TYPES as readonly string[]).includes(v);
export const isSocialPlatform = (v: string): v is SocialPlatform =>
  (SOCIAL_PLATFORMS as readonly string[]).includes(v);
export const isContentLanguage = (v: string): v is ContentLanguage =>
  (CONTENT_LANGUAGES as readonly string[]).includes(v);
```

---

**Nowy plik:** `packages/shared/src/index.ts`

```typescript
export * from './branded/brand';
export * from './branded/ids';
export * from './branded/enums';
```

**Biblioteki / API:** Brak zewnętrznych zależności w `packages/shared` — tylko TypeScript. Weryfikacja normy: `docs/brand_types.md` (zakaz Zod w shared), SPEC-MONOREPO M-5.

**DoD kroku:**

- Brand types i enumy MVP z `docs/brand_types.md` są dostępne przez `@content-chain/shared`.
- `packages/shared` nie zawiera Zod, Prisma, use-case'ów ani walidatorów runtime.
- `tsc --noEmit` w `packages/shared` przechodzi bez błędów.
- Importowanie `import { RunStatus, createRunId } from '@content-chain/shared'` kompiluje się w api i frontend (po `pnpm install`).

---



### KROK 4 — Boilerplate apps/frontend (Next.js App Router + struktura + zależności)

**Status:** `WYKONANY`

**Cel:** Cienki klient gotowy pod przyszły major FE — wyłącznie struktura, zależności i minimalny boilerplate bez ekranów produktowych. Odwołanie do Kroku 1.3 major, SPEC-FRONTEND (wymagania F-1, F-3, F-7), `docs/architektura_katalogi_pliki.md`.

**Artefakty:**

- `apps/frontend/next.config.ts`
- `apps/frontend/src/app/layout.tsx`
- `apps/frontend/src/app/page.tsx`
- `apps/frontend/src/app/globals.css`
- `apps/frontend/src/features/auth/` (z podkatalogami `components/`, `api/` — puste `.gitkeep`)
- `apps/frontend/src/features/company-context/` (j.w.)
- `apps/frontend/src/features/runs/` (j.w.)
- `apps/frontend/src/features/users/` (j.w.)
- `apps/frontend/src/shared/ui/` (`.gitkeep`)
- `apps/frontend/src/shared/utils/` (`.gitkeep`)

shadcn jest inicjowany poleceniem `pnpm dlx shadcn@latest init` wewnątrz `apps/frontend` — generuje `components.json`, konfigurację Tailwind i katalog `src/shared/ui/` z pierwszymi komponentami. Plik ten nie pre-generuje outputu shadcn CLI; oznacza katalogi jako gotowe pod init.

**Implementacja:**

**Nowy plik:** `apps/frontend/next.config.ts`

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // API URL konfigurowany przez NEXT_PUBLIC_API_BASE_URL — bez sekretów LLM
};

export default nextConfig;
```

---

**Nowy plik:** `apps/frontend/src/app/layout.tsx`

```tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Content Chain',
  description: 'Automatyzacja treści social media',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
```

---

**Nowy plik:** `apps/frontend/src/app/page.tsx`

```tsx
export default function HomePage() {
  return (
    <main>
      <h1>Content Chain</h1>
      <p>Boilerplate — ekrany produktowe w osobnym major FE.</p>
    </main>
  );
}
```

---

**Nowy plik:** `apps/frontend/src/app/globals.css`

```css
/* Tailwind CSS — dyrektywy uzupełniane przez shadcn init */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Biblioteki / API:** Next.js App Router (SPEC-FRONTEND F-1: Server Components domyślnie). shadcn + Iconify (`@iconify/react`) — obowiązkowe (SPEC-FRONTEND stack). `@content-chain/shared` przez `workspace:`* (F-3). Tailwind v4 — inicjowany przez shadcn.

**DoD kroku:**

- Drzewo `src/app/` + `src/features/` + `src/shared/` istnieje zgodnie z `docs/architektura_katalogi_pliki.md`.
- `next dev` startuje i serwuje stronę placeholder (brak błędów kompilacji).
- Brak zaimplementowanych ekranów produktowych (zgodnie z zakresem Fazy 1 major).
- `@content-chain/shared` jest zadeklarowane w `package.json` frontu (import gotowy do użycia po `pnpm install`).

**Dopisek — nazwa katalogu modułów UI (`modules/` zamiast `features/`)**

Refaktor względem: KROK 4 (WYKONANY), artefakty i DoD wskazujące `src/features/`. Cel: zgodność z decyzją implementacyjną oraz z `docs/architektura_katalogi_pliki.md` i `SPEC-FRONTEND.md`.

Obowiązująca ścieżka (zamiast `apps/frontend/src/features/…`):

- `apps/frontend/src/modules/auth/` (z podkatalogami `components/`, `api/` — puste `.gitkeep`)
- `apps/frontend/src/modules/company-context/` (j.w.)
- `apps/frontend/src/modules/runs/` (j.w.)
- `apps/frontend/src/modules/users/` (j.w.)

DoD (uzupełnienie): drzewo `src/app/` + `src/modules/` + `src/shared/` — nie `src/features/`.

---



### KROK 5 — Szkielet apps/api (NestJS: main.ts, AppModule, moduły BC)

**Status:** `WYKONANY`

**Cel:** Uruchamialna aplikacja NestJS z docelową strukturą bounded contextów i warstw oraz zatwierdzonym stackiem runtime (Config, Pino, Swagger `/docs`, port **3001**). Odwołanie do Kroku 1.4 major, `docs/architektura_katalogi_pliki.md` (układ BC + warstwy), `docs/architektura.md`, `SPEC-KOMUNIKACJA.md`, `SPEC-BEZPIECZENSTWO.md`.

Uwaga: api w tym kroku startuje jako szkielet — **bez** Helmet, CORS, fail-fast krytycznych env, Prisma (Faza 2). ConfigModule + nestjs-pino + Swagger **są** w zakresie Fazy 1.

Zmiana względem wcześniejszej wersji Kroku 5: zamiast gołego bootstrapu bez loggera/Swagger — docelowy wiring ze stacku vault + ręczne korekty po `init-nestjs.ps1` (skrypt PS **bez** zmian).

**Artefakty:**

- `apps/api/src/main.ts`
- `apps/api/src/app.module.ts`
- `apps/api/src/auth/auth.module.ts`
- `apps/api/src/auth/auth.controller.ts`
- `apps/api/src/auth/application/.gitkeep`
- `apps/api/src/auth/domain/.gitkeep`
- `apps/api/src/auth/infrastructure/.gitkeep`
- `apps/api/src/company-context/company-context.module.ts`
- `apps/api/src/company-context/company-context.controller.ts`
- `apps/api/src/company-context/application/.gitkeep`
- `apps/api/src/company-context/domain/.gitkeep`
- `apps/api/src/company-context/infrastructure/.gitkeep`
- `apps/api/src/social/social.module.ts`
- `apps/api/src/social/social.controller.ts`
- `apps/api/src/social/application/.gitkeep`
- `apps/api/src/social/domain/.gitkeep`
- `apps/api/src/social/infrastructure/graph/.gitkeep`
- `apps/api/src/social/infrastructure/prompts/.gitkeep`
- `apps/api/src/social/infrastructure/persistence/.gitkeep`
- `apps/api/src/runs/runs.module.ts`
- `apps/api/src/runs/runs.controller.ts`
- `apps/api/src/runs/application/.gitkeep`
- `apps/api/src/runs/domain/.gitkeep`
- `apps/api/src/runs/infrastructure/.gitkeep`
- `apps/api/src/shared/config/.gitkeep`

**Implementacja:**

#### 5.1 — Bootstrap Nest (jeśli nie zrobiony w Kroku 2)

Jak w Kroku 2: `init-nestjs.ps1` z `-PackageManager pnpm -SkipGit -SkipSddDirs -TargetDirectory apps/api -PackageName api`. Nie usuwać zainstalowanych bibliotek stacku.

#### 5.2 — Ręczne korekty po skrypcie (bez edycji `init-nestjs.ps1`)

Skrypt domyślnie ustawia Swagger pod `'api'` i często `PORT` default **3000**. W monorepo Content Chain obowiązuje:

1. **Swagger → `/docs`:** w `src/main.ts` zmienić `SwaggerModule.setup('api', …)` na `SwaggerModule.setup('docs', …)` (norma: `docs/dokumentacja_komunikacji.md`, `SPEC-KOMUNIKACJA.md`).
2. **Port → 3001:** w `main.ts` default z ConfigService / env ustawić na **3001**; w `apps/api/.env` oraz później w `.env.example` (Krok 7) `PORT=3001` (FE zostaje na 3000 — `docs/deployment.md`).
3. Usunąć lub nie eksponować domyślnego `AppController` / `AppService` hello-world, gdy wchodzą moduły BC (poniżej).
4. Dopiąć `tsconfig.json`: `extends: "../../tsconfig.json"` + CommonJS / dekoratory jak w Kroku 2; dodać `"@content-chain/shared": "workspace:*"` jeśli jeszcze brak.

#### 5.3 — Docelowe `main.ts` i `AppModule`

**Plik:** `apps/api/src/main.ts`

```typescript
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3001);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Content Chain API')
    .setDescription('HTTP API — DX OpenAPI (nie kontrakt produktowy FE)')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig);
  // Norma: /docs — nie /api (kolizja z /api/v1)
  SwaggerModule.setup('docs', app, documentFactory);

  await app.listen(port);
  // Helmet, CORS, fail-fast krytycznych env — Faza 2 (Krok 2.2)
}

void bootstrap();
```

**Plik:** `apps/api/src/app.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { AuthModule } from './auth/auth.module';
import { CompanyContextModule } from './company-context/company-context.module';
import { RunsModule } from './runs/runs.module';
import { SocialModule } from './social/social.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        transport:
          process.env.NODE_ENV !== 'production'
            ? { target: 'pino-pretty' }
            : undefined,
      },
    }),
    AuthModule,
    CompanyContextModule,
    RunsModule,
    SocialModule,
  ],
})
export class AppModule {}
```

---

**Nowy plik:** `apps/api/src/auth/auth.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
})
export class AuthModule {}
```

**Nowy plik:** `apps/api/src/auth/auth.controller.ts`

```typescript
import { Controller } from '@nestjs/common';

// Endpointy auth implementowane w Fazie 5 (SPEC-AUTH)
@Controller('api/v1/auth')
export class AuthController {}
```

---

**Nowy plik:** `apps/api/src/company-context/company-context.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { CompanyContextController } from './company-context.controller';

@Module({
  controllers: [CompanyContextController],
})
export class CompanyContextModule {}
```

**Nowy plik:** `apps/api/src/company-context/company-context.controller.ts`

```typescript
import { Controller } from '@nestjs/common';

// Endpointy kontekstu firmy implementowane w Fazie 3 (SPEC-KONTEKST-FIRMY)
@Controller('api/v1/company-context')
export class CompanyContextController {}
```

---

**Nowy plik:** `apps/api/src/social/social.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { SocialController } from './social.controller';

@Module({
  controllers: [SocialController],
})
export class SocialModule {}
```

**Nowy plik:** `apps/api/src/social/social.controller.ts`

```typescript
import { Controller } from '@nestjs/common';

// Fasada Social (start/wznowienie pipeline) implementowana w Fazie 4 (SPEC-SOCIAL)
// Zgodnie z architektura.md: orchestracja za application service — NIE w controllerze
@Controller('api/v1/social')
export class SocialController {}
```

---

**Nowy plik:** `apps/api/src/runs/runs.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { RunsController } from './runs.controller';

@Module({
  controllers: [RunsController],
})
export class RunsModule {}
```

**Nowy plik:** `apps/api/src/runs/runs.controller.ts`

```typescript
import { Controller } from '@nestjs/common';

// Cykl życia runu, logi, SSE, listing — implementowane w Fazach 2–3 (SPEC-RUNY)
@Controller('api/v1/runs')
export class RunsController {}
```

**Biblioteki / API:** NestJS `@nestjs/common` (`@Module`, `@Controller`), `@nestjs/core`, `@nestjs/platform-express`, `@nestjs/config`, `@nestjs/swagger`, `nestjs-pino`, `reflect-metadata`, class-validator / Zod (deps w package.json; wiring ValidationPipe — późniejsze fazy). Źródło: Context7 `/nestjs/docs.nestjs.com` — struktura modułów, bootstrap, OpenAPI.

**DoD kroku:**

- `pnpm --filter api dev` startuje NestJS bez błędów.
- Swagger UI pod **`http://localhost:3001/docs`** (nie pod `/api`).
- Api słucha na porcie **3001** (env / default w `main.ts`).
- Katalogi BC (`auth/`, `company-context/`, `social/`, `runs/`) istnieją z podkatalogami `application/`, `domain/`, `infrastructure/` — gotowe pod kolejne fazy.
- Social `infrastructure/` ma podkatalogi `graph/`, `prompts/`, `persistence/` zgodnie z `docs/architektura_katalogi_pliki.md`.
- `apps/api/src/shared/config/` istnieje (cross-cutting wewnątrz api, nie duplikuje `packages/shared`).
- Zależności stacku config/logger/Swagger/walidacja pozostają w `package.json` (bez usuwania po skrypcie vault).

---



### KROK 6 — apps/ai-provider-gateway: pełna uruchamialna instancja

**Status:** `WYKONANY`

**Cel:** Dopięcie **istniejącej, działającej** instancji NestJS `apps/ai-provider-gateway` do workspace pnpm — bez tworzenia aplikacji od zera i bez domeny Content Chain. Odwołanie do Kroku 1.4 major, `docs/architektura.md` (dostosowana instancja; api nie woła vendorów bezpośrednio), `docs/architektura_katalogi_pliki.md` (brak modułów CC w gateway), `docs/dokumentacja_komunikacji.md` (natywny kontrakt `/api/v1/chat`), SPEC-BEZPIECZENSTWO B-1 (fail-fast), B-6 (gateway nie publiczny w production).

Zmiana względem: wcześniejsza treść tego samego Kroku 6 (nadal `NIE_ROZPOCZĘTY`), która nakazywała scaffold Express+TypeScript (`src/app.ts`, `src/config/env.ts`, `src/middleware/auth.ts`, `src/routes/chat.route.ts`, `src/routes/health.route.ts`, stub `POST /v1/chat`, port **4000**, `ts-node-dev`, jedna zmienna `GATEWAY_KEY`). **To nie obowiązuje.** Źródło: drzewo produktu w `apps/ai-provider-gateway` (NestJS, YAML, OpenAPI); kontrakt w `docs/dokumentacja_komunikacji.md` / `SPEC-KOMUNIKACJA.md`.

**Stan przyjęty (nie odtwarzać, nie nadpisywać):**

- W `apps/ai-provider-gateway` leży pełna aplikacja NestJS (chat, health, models, providery, Swagger, testy, Docker, CLI) — nie szkielet.
- `apps/ai-provider-gateway/gateway.config.yaml` oraz `apps/ai-provider-gateway/.env` są **gotowe i działające**; instancja z nimi wstawała. Ten krok ich nie regeneruje, nie commituje `.env` i nie zmienia wartości operacyjnych.
- Kontrakt HTTP (norma CC): prefiks `/api/v1`, `GET /api/v1/health`, `POST /api/v1/chat` (201), auth `X-Gateway-Key` z allowlisty YAML (`gatewayKeyRef` → zmienne env), nie stub `GET /health` / `POST /v1/chat`.
- Glob workspace `apps/*` już obejmuje ten katalog; root ma skrypt `dev:gateway` → `pnpm --filter ai-provider-gateway dev`. Pakiet w `package.json` gateway **nie** ma skryptu `dev` (jest `start:dev` = `nest start --watch`) — to luka DX do domknięcia tutaj.
- `tsconfig.json` gateway (`nodenext`, własne `paths`) **zostaje**; nie wymuszać `extends` z root `tsconfig.json` z Kroku 2.
- Stub `package.json` / `tsconfig.json` z Kroku 2 (WYKONANY — bez edycji tamtego kroku) nie przywracać, jeśli został zastąpiony plikami instancji Nest.

**Artefakty (istniejące — nie tworzyć od zera):**

- drzewo `apps/ai-provider-gateway/` (m.in. `src/main.ts`, `src/app.module.ts`, `src/setup.app.ts`, `openapi.json`, `package.json`, `tsconfig.json`)
- `apps/ai-provider-gateway/gateway.config.yaml` (działający)
- `apps/ai-provider-gateway/.env` (działający; poza gitem — SPEC-BEZPIECZENSTWO B-2)
- `apps/ai-provider-gateway/.env.example` (szablon upstream; Krok 7 go **nie** zastępuje stubem Express)

**Artefakty do zmiany (tylko integracja monorepo):**

- `apps/ai-provider-gateway/package.json` — dodać skrypt `"dev"` aliasujący istniejący `start:dev` (`nest start --watch`), żeby `pnpm --filter ai-provider-gateway dev` i root `dev:gateway` działały
- `apps/ai-provider-gateway/package-lock.json` — usunąć (ślad npm); jedyny lockfile workspace to root `pnpm-lock.yaml`
- `pnpm install` w rootcie — pakiet już jest w globie `apps/*`; lockfile root ma go uwzględniać

**Implementacja:**

1. **Nie tworzyć** plików z poprzedniej treści tego kroku (`src/app.ts`, `src/config/env.ts`, `src/middleware/auth.ts`, `src/routes/*.ts` Express, stub chat). **Nie nadpisywać** `src/`, `gateway.config.yaml`, `.env`, `.env.example`, `tsconfig.json` / `tsconfig.build.json` gateway.
2. W `apps/ai-provider-gateway/package.json` dopisać do `scripts`: `"dev": "nest start --watch"` (równoważne z `start:dev`). Nie zmieniać nazwy pakietu (`ai-provider-gateway`, `private: true`).
3. Usunąć `apps/ai-provider-gateway/package-lock.json`. Z roota: `pnpm install`. Nie zostawiać zagnieżdżonego lockfile npm.
4. Port, klucze vendorów i allowlista klientów: **wyłącznie** z istniejącego działającego `.env` + `gateway.config.yaml`. Nie wprowadzać portu 4000 ani pojedynczej zmiennej `GATEWAY_KEY` z poprzedniej treści kroku. `GATEWAY_BASE_URL` po stronie api (Krok 7) musi trafiać w `PORT` z tego `.env`, nie w wymyślony 4000.
5. Smoke ze skryptu root / filtra pnpm, bez `npm start` jako wymogu DX (SPEC-MONOREPO M-7).

**Nie wolno:**

- Przenosić domeny Content Chain (`company-context`, `social`, auth produktu) do gateway.
- Importować źródeł gateway z `apps/api` jako moduł TS (tylko HTTP — SPEC-MONOREPO M-4).
- Commitować `.env` ani sekretów z YAML/env.

**Biblioteki / API:** stack **już zainstalowany w pakiecie** (NestJS 11, `@nestjs/config`, Swagger, Pino, Helmet, Zod, SDK vendorów). Ten krok **nie** dodaje `express` / `ts-node-dev` jako nowego scaffoldu. Źródło kontraktu: `apps/ai-provider-gateway/openapi.json`, `docs/dokumentacja_komunikacji.md`.

**DoD kroku:**

- `pnpm --filter ai-provider-gateway dev` (oraz `pnpm dev:gateway` z roota) startuje istniejącą aplikację NestJS przy obecnym `.env` + `gateway.config.yaml`.
- `GET /api/v1/health` zwraca liveness (`status: "healthy"`) — **nie** `GET /health` ze starego DoD.
- `POST /api/v1/chat` bez `X-Gateway-Key` → 401 (`GATEWAY_KEY_MISSING`); z niepoprawnym kluczem → 403 (`GATEWAY_KEY_INVALID`). Ze poprawnym kluczem z allowlisty YAML endpoint jest tym z OpenAPI (nie stub `{ requestId, choices: [] }`).
- Brak modułów `company-context` / `social` / auth CC w drzewie gateway.
- Fail-fast: proces nie wstaje przy niepoprawnej / niekompletnej konfiguracji instancji (walidacja YAML + sekrety włączonych providerów w kodzie gateway) — **nie** warunek „brak jednej zmiennej `GATEWAY_KEY`” z poprzedniego DoD.
- W `apps/ai-provider-gateway` brak `package-lock.json`; źródła Nest nie są zastąpione stubem Express.

---



### KROK 7 — Tooling root (ESLint + Prettier) i szablony .env.example

**Status:** `WYKONANY`

**Cel:** Wspólna konfiguracja jakości kodu w rootcie workspace oraz szablony env z placeholderami per aplikacja. Odwołanie do Kroku 1.5 major, SPEC-MONOREPO M-7 (skrypty root, ESLint+Prettier obowiązkowe), SPEC-BEZPIECZENSTWO B-2 (`.env.example` bez sekretów), `docs/deployment.md` (DX lokalny).

**Artefakty:**

- `.eslintrc.cjs` (root)
- `.prettierrc.json` (root)
- `.prettierignore` (root)
- `apps/api/.env.example`
- `apps/frontend/.env.example`
- `apps/ai-provider-gateway/.env.example`

**Implementacja:**

**Nowy plik:** `.eslintrc.cjs`

```javascript
/** @type {import('@typescript-eslint/utils').TSESLint.Linter.Config} */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
  ignorePatterns: ['dist/', '.next/', 'node_modules/'],
};
```

---

**Nowy plik:** `.prettierrc.json`

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2,
  "endOfLine": "lf"
}
```

---

**Nowy plik:** `.prettierignore`

```
dist/
.next/
node_modules/
pnpm-lock.yaml
*.md
```

---

**Nowy plik:** `apps/api/.env.example`

```dotenv
# apps/api — szablon zmiennych środowiskowych
# Skopiuj do .env i wypełnij wartości. Nie commituj .env (SPEC-BEZPIECZENSTWO B-2).

# Baza danych (SQLite MVP)
DATABASE_URL="file:./dev.db"

# Gateway LLM — URL musi trafiać w PORT z działającego apps/ai-provider-gateway/.env (Krok 6; nie port 4000 ze starego stubu Express)
GATEWAY_BASE_URL="http://localhost:3000"
GATEWAY_KEY="change-me-gateway-key"

# JWT (auth — Faza 5)
JWT_SECRET="change-me-jwt-secret"
JWT_ACCESS_TTL="15m"
JWT_REFRESH_TTL="7d"

# Serwer
PORT="3001"
NODE_ENV="development"

# CORS — dozwolone originy FE (rozdzielone przecinkiem)
CORS_ORIGINS="http://localhost:3000"
```

---

**Nowy plik:** `apps/frontend/.env.example`

```dotenv
# apps/frontend — szablon zmiennych środowiskowych
# Skopiuj do .env.local. Nie commituj .env.local.
# Tylko bezpieczne NEXT_PUBLIC_* — bez sekretów LLM (SPEC-BEZPIECZENSTWO B-8).

NEXT_PUBLIC_API_BASE_URL="http://localhost:3001"
```

---

**Istniejący plik (nie tworzyć od zera, nie nadpisywać stubem):** `apps/ai-provider-gateway/.env.example`

Zmiana względem: wcześniejsza treść Kroku 7, która kazała wygenerować nowy `.env.example` z `PORT=4000` i pojedynczym `GATEWAY_KEY` pod scaffold Express z ówczesnego Kroku 6. **To nie obowiązuje.** Szablon jest już w instancji Nest (placeholdery `*_PLACEHOLDER`, `PORT`, Redis, Sentry itd.). Działający `.env` z Kroku 6 zostaje; do repo idzie tylko `.env.example` bez sekretów (B-2).

**Biblioteki / API:** `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`, `eslint`, `eslint-config-prettier`, `prettier` — wszystkie jako devDependencies w root `package.json` (SPEC-MONOREPO: ESLint+Prettier obowiązkowe w rootcie).

**DoD kroku:**

- `pnpm lint` i `pnpm format:check` wykonują się bez błędów konfiguracji.
- Każda aplikacja ma `.env.example` z placeholderami; pliki `.env` w `.gitignore`.
- Sekrety (klucze, JWT) nie pojawiają się nigdzie w kodzie źródłowym ani w szablonach (tylko placeholdery `"change-me-..."` / `"sk-..."`).
- Start DX: `pnpm install`, `.env.example` per aplikacja w repo; działający `apps/ai-provider-gateway/.env` z Kroku 6 **nie** jest nadpisywany z szablonu; `pnpm dev:gateway` + `pnpm dev:api` + `pnpm dev:frontend` — opisywalny bez dodatkowych skryptów spoza root (SPEC-MONOREPO M-7).

**Dopisek — ESLint: type-aware, granice pakietów, podział root / Next / api**

Refaktor względem: KROK 7 (ten sam krok; blok „Nowy plik: `.eslintrc.cjs`” powyżej pozostaje zapisem wyjściowym). Cel: zgrać lint z ESLint 9, SPEC-MONOREPO M-4/M-5 oraz z istniejącym `eslint-config-next` — bez drugiej, sprzecznej konfiguracji Nest w `apps/api`.

Poniżej stan faktyczny do weryfikacji i zatwierdzenia (nie zastępuje listingu powyżej).

**`.eslintrc.cjs` (root) — względem listingu w tym kroku:**

- `extends`: `plugin:@typescript-eslint/recommended` → `plugin:@typescript-eslint/recommended-type-checked`; `parserOptions`: `projectService: true`, `tsconfigRootDir: __dirname`, `ecmaVersion: 2022` (liczba).
- Reguły dodane: `consistent-type-imports` (`prefer: 'type-imports'`, `fixStyle: 'inline-type-imports'`), `no-unused-vars` z `varsIgnorePattern: '^_'`, `no-restricted-imports` (zakaz ścieżek względnych do `packages/shared`, `apps/api`, `apps/ai-provider-gateway`, `apps/frontend` — SPEC-MONOREPO M-4). `explicit-function-return-type` nadal `off`.
- `ignorePatterns` poza listingiem: `build/`, `coverage/`, `coverage-security/`, `coverage-cli/`; oraz `apps/frontend/` i `apps/ai-provider-gateway/` (własne `eslint.config.mjs` — root nie dubluje Next ani lintu gateway).
- `overrides`: `*.js`/`*.cjs`/`*.mjs` → `disable-type-checked` + `env: node`; `packages/shared/**/*.ts` → `explicit-module-boundary-types` + zakaz `zod` / `@prisma/client` / `next` / `react` / `@nestjs/*` (M-5); `apps/api/**/*.ts` → `unbound-method: warn`; spec/test → poluzowanie `no-unsafe-*` / `any`.

**`eslint.config.mjs` (root) — nowy artefakt, poza listingiem kroku:**

ESLint 9 nie ładuje `.eslintrc.cjs` bez tego pliku. Adapter `FlatCompat` (`@eslint/eslintrc`) wczytuje `.eslintrc.cjs` jako źródło reguł. Root `package.json`: `"lint": "eslint . && pnpm --filter frontend lint"` (bez `--ext`); dep. `@eslint/eslintrc`.

**`apps/frontend/eslint.config.mjs` — poza listingiem kroku (scaffold Next, dopisane reguły workspace):**

Zostaje `eslint-config-next` (`core-web-vitals` + `typescript`). Dopisane na `**/*.{ts,tsx}`: te same `consistent-type-imports`, `no-unused-vars` (`^_`), `explicit-function-return-type: off`, `no-restricted-imports` (shared / api / gateway — bez wzorca `apps/frontend`, bo to ten pakiet). `globalIgnores`: `.next/**`, `out/**`, `build/**`, `coverage/**`, `next-env.d.ts`, `node_modules/**`.

**Usunięcie lokalnego ESLint api (poza listingiem kroku; skrypt `lint` w Kroku 2 pozostaje historyczny):**

- Usunięty `apps/api/eslint.config.mjs` (szablon Nest: `eslint-plugin-prettier`, bez granic M-4/M-5) — drugi zestaw reguł względem roota.
- Usunięty skrypt `"lint": "eslint src --ext .ts"` z `apps/api/package.json`. Kanoniczny lint api: root `pnpm lint` (root **nie** ignoruje `apps/api/`).

**Weryfikacja dopisku:** `pnpm lint` bez błędów konfiguracji; brak `apps/api/eslint.config.mjs`; w `apps/api/package.json` brak skryptu `lint`; frontend lintowany przez `pnpm --filter frontend lint`.

---



## Weryfikacja wycinka

**DoD techniczne Fazy 1 / MILESTONE 1:**


| Warunek                                                        | Jak weryfikować                                                                          |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Trzy aplikacje + `packages/shared` istnieją i są spójne z docs | `ls apps/` + `ls packages/` odzwierciedla drzewo z `docs/architektura_katalogi_pliki.md` |
| Workspace pnpm obejmuje `apps/*` i `packages/*`                | `pnpm ls -r` listuje cztery pakiety                                                      |
| `@content-chain/shared` importuje się w api i frontend         | `import { RunStatus } from '@content-chain/shared'` kompiluje się (po `pnpm install`)    |
| `packages/shared` bez Zod, Prisma, use-case'ów                 | `cat packages/shared/package.json` — brak tych dep                                       |
| `pnpm --filter api dev` startuje NestJS bez błędów             | Terminal: NestJS ready message, brak stack trace; listen **3001**                    |
| Swagger UI api pod `/docs`                                     | `GET http://localhost:3001/docs` → UI; **nie** pod `/api`                            |
| Api: deps config / pino / swagger / class-validator / zod      | `apps/api/package.json` — obecne; Zod **nie** w `packages/shared`                    |
| `pnpm --filter ai-provider-gateway dev` startuje gateway Nest  | `GET /api/v1/health` → `{ status: "healthy", ... }`; skrypt `dev` w `package.json` gateway |
| Gateway fail-fast przy złej konfiguracji instancji             | Start bez wymaganych sekretów / z niepoprawnym YAML — proces nie wstaje (walidacja Nest, nie pojedyncze `GATEWAY_KEY`) |
| `pnpm --filter frontend dev` startuje Next.js                  | Przeglądarka: strona placeholder na `localhost:3000`                                     |
| ESLint + Prettier skonfigurowane w rootcie                     | `pnpm lint` i `pnpm format:check` bez błędów konfiguracji                                |
| `.env.example` per aplikacja; `.env` w `.gitignore`            | `git status` nie pokazuje `.env`; `.env.example` w repo                                  |
| Brak ekranów produktowych FE w tym wycinku                     | `apps/frontend/src/modules/` — tylko puste katalogi                                      |


**Zgodność z SPEC:**

- SPEC-MONOREPO M-1 ✓ (cztery pakiety workspace)
- SPEC-MONOREPO M-2 ✓ (`pnpm-workspace.yaml`, protokół `workspace:`)
- SPEC-MONOREPO M-5 ✓ (`packages/shared` bez runtime)
- SPEC-MONOREPO M-7 ✓ (skrypty root; bez Nx/Turborepo)
- SPEC-BEZPIECZENSTWO B-1 ✓ (gateway fail-fast)
- SPEC-BEZPIECZENSTWO B-2 ✓ (`.env.example` per app)
- SPEC-KOMUNIKACJA ✓ (Swagger `/docs`; stack walidacji w deps api)
- SPEC-BEZPIECZENSTWO ✓ (`@nestjs/config`, Pino w deps/wiring api — fail-fast krytycznych env nadal Faza 2)
- SPEC-FRONTEND F-1 ✓ (App Router Next.js)
- SPEC-FRONTEND F-3 ✓ (`@content-chain/shared` w deps frontend)

---



## Ślad do major

Po implementacji wszystkich KROKÓW Fazy 1 i weryfikacji DoD, w `content-chain-backend_major_plan.md` powinny zostać zaktualizowane (przez użytkownika lub w sesji `/feature-implementation`):

- **Krok 1.1** → `WYKONANY`
- **Krok 1.2** → `WYKONANY`
- **Krok 1.3** → `WYKONANY`
- **Krok 1.4** → `WYKONANY`
- **Krok 1.5** → `WYKONANY`
- **Faza 1** → `WYKONANY`
- **MILESTONE 1** → `OSIĄGNIĘTY` (bramka: Faza 1 spełnia DoD → wolno wejść w Fazę 2)

*Ten feature plan nie zmienia pliku major — aktualizacja statusów następuje po rzeczywistej implementacji.*