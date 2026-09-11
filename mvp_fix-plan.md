# Feature Plan — Domknięcie luk MVP api: Swagger cookie + PATCH reaktywacji użytkownika

## Meta

**Kotwica:** review architektury `apps/api` vs MVP (`docs/` + `spec/`). Backendowy slice MVP jest spełniony poza dwiema lukami DX/kanonu Users.  
**Ten plik:** wyłącznie te dwa wycinki. **Nie** startuje dashboardu, cutoveru PostgreSQL, panelu opinii ani self-service konta.  
**Zakres wejścia:** Faza 5 Auth (`WYKONANY`) — cookie `cc_access` / `cc_refresh`, `UsersController` (`GET` + `DELETE`), `UserRepository.setActive`, globalny `JwtAuthGuard` + `RolesGuard`, Swagger UI pod `/docs` bez schematu cookie.  
**Źródła:** `docs/dokumentacja_komunikacji.md` (Users PATCH; DX `/docs`), `docs/security.md`, `SPEC-AUTH.md` A-6 / A-9 / A-10, `SPEC-KOMUNIKACJA.md` (Swagger `/docs`, zakaz Bearera), `SPEC-TESTY.md` D-25, `SPEC-BEZPIECZENSTWO.md` B-5.  
**Stack OpenAPI (weryfikacja Context7, NestJS OpenAPI Security):** `DocumentBuilder.addCookieAuth` + dekorator `@ApiCookieAuth()` — [NestJS OpenAPI security (cookie)](https://docs.nestjs.com/openapi/security).

**Statusy (fazy / kroki):** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`  
**Milestone:** domyślnie bez statusu; po DoD → `OSIĄGNIĘTY`

---

## Założenia (stack / wersje / kontrakty typów)

- NestJS 11 + `@nestjs/swagger` ^11 (już w `apps/api/package.json`). **Nie** dodajemy nowej biblioteki OpenAPI.
- Auth transportu **nie** zmieniamy: nadal wyłącznie cookie httpOnly; **zakaz** `Authorization: Bearer` jako modelu MVP (`SPEC-AUTH.md` A-9).
- Swagger UI jest serwowany **z tego samego originu** co api (`localhost:3001` / prefix wyłączony dla `docs`). Po `POST /auth/login` (Try it out) przeglądarka dostaje `Set-Cookie` na path `/` — kolejne requesty z UI niosą `cc_access`, o ile XHR ma credentials (same-origin i tak je wysyła; `withCredentials: true` jest siatką na wypadek CORS).
- Nazwa schematu OpenAPI: `'cookieAuth'`. Nazwa cookie w schemacie: `'cc_access'` (access JWT). `cc_refresh` **nie** jest drugim security scheme (używany tylko przez `POST /auth/refresh`; po loginie leci automatycznie z jar). Opis schematu o tym mówi.
- `@Public()` steruje **guardem**, nie OpenAPI. Trasy publiczne **nie** dostają `@ApiCookieAuth()`. Chronione — tak (klasa albo metoda).
- PATCH Users: **tylko reaktywacja**. Dezaktywacja zostaje `DELETE` (A-10). Body **nie** przyjmuje `role` (zakaz awansu do `admin`).
- Port `UserRepository.setActive` **już istnieje** — brak nowej migracji Prisma / zmiany `schema.prisma`.
- Soft-delete kasuje refresh w DB. Reaktywacja **nie** odtwarza sesji — potem zwykły `POST /auth/login`.
- Walidacja: HTTP = class-validator + `ValidationPipe` (`whitelist` / `forbidNonWhitelisted`); application = Zod `.strict()` przez `parseWithZod` (`SPEC-KOMUNIKACJA.md`).
- **tsconfig:** bez zmian.
- **Branded types:** `:id` w path to `UserId` (`usr_<uuid>`) — `isUserId` / `createUserId` z `@content-chain/shared` (wzorzec `SoftDeleteUserUseCase`). Zakaz gołego `string` jako tożsamości użytkownika w domain/application po parse.
- Zakaz `any` / `as` „żeby przeszło” na body PATCH. Wejście HTTP: DTO; wejście use-case: `unknown` → Zod.
- UI admina (lista / soft-delete / reaktywacja) **poza tym planem** (`SPEC-FRONTEND.md`, `docs/ux_dashboard.md`).

### Kontrakt PATCH (uszczegółowienie luki w docs)

Docs wymieniają `PATCH /api/v1/users/:id` bez body. Ten plan **zamyka** kształt (do wpisania w docs/SPEC w Fazie 2, Krok 1 — przed kodem HTTP):

| Element | Norma |
|---------|--------|
| Authz | `@Roles('admin')` + sesja cookie; `user` → **403** `FORBIDDEN`; brak sesji → **401** `UNAUTHORIZED` |
| Path | `:id` = `UserId`; zły format → **400** `VALIDATION_FAILED` |
| Body | `{ "isActive": true }` — literał `true`; `.strict()`; brak `role` / `email` / `password` |
| `isActive: false` | **400** `VALIDATION_FAILED` (dezaktywacja = `DELETE`, jeden kanał) |
| Nieznany id | **404** `USER_NOT_FOUND` (jak `DELETE`) |
| Target `role = admin` | **403** `FORBIDDEN` (jak `DELETE` — nie ruszamy jedynego admina) |
| Target już `isActive: true` | **200** idempotentnie (bez 409) |
| Sukces | **200** — projekcja jak pozycja listy: `{ id, email, role, isActive, createdAt }` z `isActive: true` |
| Sesje | brak `RefreshSession.create`; stare refresh i tak skasowane przy DELETE |

---

## FAZA 1 — Schemat cookie w Swagger / OpenAPI

**Status:** `WYKONANY`

**Opis:** OpenAPI `apps/api` dokumentuje sesję MVP jako cookie `cc_access` (nie Bearer). Swagger UI pod `/docs` potrafi: (1) pokazać kłódkę na chronionych trasach, (2) po loginie z Try it out wysyłać cookie.  
Odwołanie: `SPEC-KOMUNIKACJA.md` (DX `/docs`); NestJS `addCookieAuth` + `@ApiCookieAuth()`.

**DoD (faza):**

- Dokument OpenAPI (`/docs-json`) zawiera `components.securitySchemes.cookieAuth` z `in: cookie`, `name: cc_access`.
- Chronione trasy produktowe mają `security` cookie; trasy `@Public()` — nie.
- Brak `http bearer` jako security scheme produktu CC.
- `GET /docs` nadal działa (Helmet CSP w `development` już wyłączone w `configure-http-app.ts`).

---

### KROK 1 — `DocumentBuilder.addCookieAuth` + opcje Swagger UI

**Status:** `WYKONANY`

**Cel:** Zarejestrować schemat cookie w dokumencie i włączyć credentials w UI.  
Refaktor względem: `apps/api/src/main.ts` (inline `DocumentBuilder` bez security).

**Artefakty:**

- **Nowy** `apps/api/src/shared/http/configure-swagger.ts` — `buildSwaggerConfig()` + `configureSwagger(app)` (wzorzec jak `configure-http-app.ts`; testowalny builder bez listen).
- **Refaktor** `apps/api/src/main.ts` — wywołanie `configureSwagger(app)` zamiast inline setup.

**Implementacja:**

`buildSwaggerConfig()`:

```typescript
import { DocumentBuilder, type OpenAPIObject } from '@nestjs/swagger';

export const COOKIE_AUTH_NAME = 'cookieAuth';
export const ACCESS_COOKIE_NAME = 'cc_access';

export function buildSwaggerConfig(): Omit<OpenAPIObject, 'paths'> {
  return new DocumentBuilder()
    .setTitle('Content Chain API')
    .setDescription(
      'HTTP API Content Chain. Sesja MVP: httpOnly cookie `cc_access` (JWT) + `cc_refresh` (rotowany; tylko POST /auth/refresh). Po loginie / bootstrap-admin przeglądarka ustawia oba. Try it out na POST /auth/login, potem chronione trasy — bez Authorization Bearer.',
    )
    .setVersion('1.0')
    .addCookieAuth(
      ACCESS_COOKIE_NAME,
      {
        type: 'apiKey',
        in: 'cookie',
        name: ACCESS_COOKIE_NAME,
        description:
          'Access JWT. Ustawiane przez POST /auth/login i POST /auth/bootstrap-admin.',
      },
      COOKIE_AUTH_NAME,
    )
    .build();
}
```

`configureSwagger(app)`:

```typescript
SwaggerModule.setup('docs', app, () =>
  SwaggerModule.createDocument(app, buildSwaggerConfig()),
{
  swaggerOptions: {
    persistAuthorization: true,
    withCredentials: true,
  },
});
```

Ścieżka `'docs'` **bez zmian** (kolizja z `/api/v1` już obsłużona: `setGlobalPrefix(..., { exclude: ['metrics', 'docs', 'docs-json'] })`).

**Nie wolno:** `addBearerAuth` / `addApiKey` w headerze jako modelu sesji CC. Wzorce z `apps/ai-provider-gateway` (`X-Gateway-Key`, Bearer OpenAI) **nie** kopiować — inny produkt, inny transport.

**DoD kroku:**

- `main.ts` nie buduje Swaggera inline.
- `buildSwaggerConfig().components.securitySchemes.cookieAuth` istnieje i wskazuje cookie `cc_access`.
- Setup ma `withCredentials: true` oraz `persistAuthorization: true`.

---

### KROK 2 — `@ApiCookieAuth` na chronionych powierzchniach

**Status:** `WYKONANY`

**Cel:** OpenAPI oznacza, które operacje wymagają sesji. Guardy już to egzekwują — tu tylko kontrakt DX.

**Artefakty (refaktory):** dekorator `@ApiCookieAuth(COOKIE_AUTH_NAME)` (import stałej z Kroku 1):

| Plik | Gdzie |
|------|--------|
| `users.controller.ts` | na klasie (cały zasób admin) |
| `invitations.controller.ts` | na klasie |
| `runs.controller.ts` | na klasie |
| `company-context.controller.ts` | na klasie |
| `feedback.controller.ts` | na klasie |
| `auth.controller.ts` | **tylko** metody `postLogout`, `getMe` — **nie** na klasie |

**Nie** dekorować: `HealthController`, `MetricsController`, metod `@Public()` w `AuthController` (`bootstrap-status`, `bootstrap-admin`, `login`, `accept-invite`, `refresh`).

Opcjonalnie (ten sam krok, jeśli brakuje): `@ApiTags` już są; bez rozbudowy DTO error envelope.

**DoD kroku:**

- W `/docs-json` operacje `GET /api/v1/auth/me` i `GET /api/v1/users` mają `security: [{ cookieAuth: [] }]`.
- `POST /api/v1/auth/login` i `GET /api/v1/health` **nie** wymagają `cookieAuth`.

---

### KROK 3 — Testy OpenAPI (unit)

**Status:** `WYKONANY`

**Cel:** Przypiąć schemat cookie testem, żeby ktoś nie wrócił do Bearera „bo Swagger tak robi”.

**Artefakty:**

- **Nowy** `apps/api/src/shared/http/configure-swagger.spec.ts`

**Implementacja (szkic asercji):**

```typescript
const doc = buildSwaggerConfig();
const scheme = doc.components?.securitySchemes?.[COOKIE_AUTH_NAME];
// scheme.type === 'apiKey'
// scheme.in === 'cookie'
// scheme.name === 'cc_access'
expect(doc.components?.securitySchemes).not.toHaveProperty('bearer');
```

Pełny `SwaggerModule.createDocument` (ścieżki + security per operacja) — **integration** w tym samym specu albo cienki e2e `GET /docs-json` (publiczny, bez cookie). Wystarczy jedno: albo createDocument na `AppModule` w `TestingModule`, albo e2e. Preferencja: **unit buildera** (Krok 1) + **jeden** test `createDocument` na `AuthController`+`UsersController` (nie cały AppModule — mniej I/O). Jeśli createDocument wymaga za dużo providerów, DoD minimalne = unit `buildSwaggerConfig` + ręczny smoke `GET /docs-json` w DoD fazy (Postman HEALTH).

**DoD kroku:**

- `pnpm --filter api test -- configure-swagger.spec` zielony.
- Schemat nie jest Bearer / header `Authorization`.

---

## FAZA 2 — `PATCH /api/v1/users/:id` (reaktywacja)

**Status:** `NIE_ROZPOCZĘTY`

**Opis:** Domknięcie kanonu Users z `dokumentacja_komunikacji.md` / `SPEC-AUTH.md` A-10: admin może przywrócić `isActive` po soft-delete. Bez awansu roli, bez UI, bez nowej tabeli.  
Refaktor względem: FAZA 2 Auth (`UsersController` tylko GET/DELETE; `SoftDeleteUserUseCase`).

**DoD (faza):**

- Happy path: `DELETE` → login 401 → `PATCH { isActive: true }` → login 200.
- Negatywy: `user` → 403; zły id → 400; brak wiersza → 404; PATCH admina → 403; `isActive: false` / `role` w body → 400.
- Idempotencja: PATCH już aktywnego `user` → 200, `isActive: true`.
- Brak SET-COOKIE na PATCH (to nie login).

---

### KROK 1 — Kontrakt w docs/SPEC (przed kodem HTTP)

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Usunąć lukę „PATCH jest w tabeli, ale bez body”. Norma w docs, SPEC uszczegóławia.  
**Zasada repo:** edycja `spec/SPEC-*.md` = frontmatter `wersja + 1`, `data_modyfikacji` = dzień zapisu; jawne „Zmiana względem”. **Nie** implementować kodu w tym kroku.

**Artefakty (refaktory treści):**

- `docs/dokumentacja_komunikacji.md` — wiersz PATCH Users: body `{ isActive: true }`, kody 200/400/401/403/404, idempotencja, zakaz `role`.
- `docs/security.md` — punkt przy soft-delete: reaktywacja = PATCH (API; UI nadal poza MVP).
- `spec/SPEC-AUTH.md` — A-10: PATCH obowiązkowy z kontraktem powyżej; drzewo `users.controller` już to zapowiada; kryteria akceptacji += reaktywacja + login.
- `spec/SPEC-TESTY.md` — nowy przypadek **D-26** (nie zmieniać treści D-25):  
  `PATCH /users/:id` `{ isActive: true }` na soft-deleted `user` → 200 `isActive: true`; następnie `POST /auth/login` tym kontem → 200. `isActive: false` → 400. `user` woła PATCH → 403.
- `spec/SPEC-README.md` — tylko jeśli trzeba odesłać; zwykle nie.

**DoD kroku:**

- Body i kody PATCH są w docs komunikacji (nie tylko „np. reaktywacja”).
- D-26 w `SPEC-TESTY.md`.
- Frontmatter SPEC zaktualizowany.

---

### KROK 2 — Typy, Zod, DTO (granice TS)

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Kontrakt wejścia/wyjścia **zanim** use-case. Żadnego `isActive?: boolean` w jednym obiekcie z `role?: string`.

**Artefakty:**

- **Refaktor** `apps/api/src/auth/application/auth.schemas.ts` — dopisanie schematu PATCH.
- **Nowy** `apps/api/src/auth/http/patch-user.dto.ts`
- Reuse typu `UserListItem` z `list-users.use-case.ts` jako wynik (albo `export type` w `auth-user.types.ts`, jeśli chcemy uniknąć importu use-case → use-case). **Preferencja:** wynieść `UserListItem` do `auth/domain/auth-user.types.ts` (już ma `AuthUser`) i użyć w `ListUsersUseCase` + nowym use-case — mały refaktor listy, bez zmiany JSON GET `/users`.

**Implementacja:**

Zod (application):

```typescript
export const patchUserSchema = z
  .object({
    isActive: z.literal(true),
  })
  .strict();

export type PatchUserCommand = z.infer<typeof patchUserSchema>;
```

DTO (HTTP):

```typescript
export class PatchUserDto {
  @ApiProperty({ type: Boolean, enum: [true] })
  @IsBoolean()
  @Equals(true)
  isActive!: true;
}
```

`forbidNonWhitelisted` odrzuci `role`. Zod `literal(true)` odrzuci `false` (gdyby pipe przepuścił).

Wyjście use-case: `UserListItem` (`id: UserId`, `email: string`, `role: UserRole`, `isActive: boolean`, `createdAt: Date`). Nest zserializuje `Date` do ISO jak na liście.

**DoD kroku:**

- `PatchUserCommand` ma wyłącznie `isActive: true`.
- DTO ma `class-validator` + `@ApiProperty`.
- `pnpm --filter api` typecheck tych plików bez `any`.

---

### KROK 3 — `ReactivateUserUseCase` (domain/application)

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Jedna komenda: walidacja body + id → `setActive(id, true)`. Bez mailera, bez JWT, bez tworzenia `RefreshSession`.

**Artefakty:**

- **Nowy** `apps/api/src/auth/application/reactivate-user.use-case.ts`
- **Nowy** `apps/api/src/auth/application/reactivate-user.use-case.spec.ts` (unit, fake porty)

**Implementacja (szkic):**

```typescript
async execute(idParam: string, input: unknown): Promise<UserListItem> {
  const command = parseWithZod(patchUserSchema, input);
  if (!isUserId(idParam)) {
    throw new DomainException('VALIDATION_FAILED', 'Invalid user ID', 400);
  }
  const userId = createUserId(idParam);
  const user = await this.users.findById(userId);
  if (!user) {
    throw new DomainException('USER_NOT_FOUND', 'User not found', 404);
  }
  if (user.role === 'admin') {
    throw new DomainException(
      'FORBIDDEN',
      'Cannot update the admin account',
      403,
    );
  }
  if (!user.isActive) {
    await this.users.setActive(userId, true);
  }
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    isActive: true,
    createdAt: user.createdAt,
  };
}
```

`command` po parse jest `{ isActive: true }` — nie używać `command.isActive` do gałęzi false (zupełność literału). Nie wołać `setActive` gdy już aktywny (mniej I/O; wynik i tak `isActive: true`).

Port: wyłącznie `USER_REPOSITORY`. **Nie** wstrzykiwać `REFRESH_SESSION_REPOSITORY` (reaktywacja ≠ przywrócenie sesji).

**DoD kroku (unit):**

- Nieaktywny `user` → `setActive(id, true)` raz; zwrot `isActive: true`.
- Już aktywny → `setActive` **nie** wołany; 200-kształt wyniku.
- Admin → `FORBIDDEN`; `setActive` nie wołany.
- Brak wiersza → `USER_NOT_FOUND`.
- Zły format id → `VALIDATION_FAILED`.
- Body `{ isActive: false }` albo `{ isActive: true, role: 'admin' }` → `VALIDATION_FAILED` (Zod).

---

### KROK 4 — HTTP + `AuthModule`

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Cienki controller; authz zostaje na klasie (`@Roles('admin')`).

**Artefakty (refaktory):**

- `apps/api/src/auth/users.controller.ts` — `PATCH :id`
- `apps/api/src/auth/auth.module.ts` — provider `ReactivateUserUseCase`
- **Nowy** `apps/api/src/auth/users.controller.spec.ts` (wzorzec `auth.controller.spec.ts`: dekoratory + delegacja, bez Prisma)

**Implementacja:**

```typescript
@Patch(':id')
@HttpCode(200)
@ApiCookieAuth(COOKIE_AUTH_NAME)
patch(
  @Param('id') id: string,
  @Body() body: PatchUserDto,
): Promise<UserListItem> {
  return this.reactivate.execute(id, body);
}
```

Kolejność handlerów Nest: `GET()` lista, potem `PATCH(':id')`, potem `DELETE(':id')` — brak kolizji z `user/:userId` (to Runs).

Klasa już ma `@ApiCookieAuth` z Fazy 1; duplikat na metodzie nie jest wymagany.

**DoD kroku:**

- `PATCH /api/v1/users/:id` istnieje; `POST /users` nadal nie.
- Moduł rejestruje use-case.
- Spec kontrolera: PATCH deleguje; klasa ma `@Roles('admin')`.

---

### KROK 5 — Postman + D-26

**Status:** `NIE_ROZPOCZĘTY`

**Cel:** Artefakt E2E poza CI PR (jak pozostałe kolekcje auth) oraz pokrycie D-26.

**Artefakty (refaktory):**

- `apps/api/content-chain.postman-collection.json` — folder USERS: request `PATCH user` po `DELETE user`.
- `apps/api/test/postman/auth.postman-collection.json` — po istniejącym soft-delete + login 401: `PATCH` → login 200; negatyw `isActive: false` (400); opcjonalnie PATCH jako `user` (403) jeśli folder Accept-invite i tak loguje usera.

Kolejność w runnerze auth (dopisek, nie przestawiać Bootstrap):

1. (istniejące) accept-invite → login user → 403 → login admin → `DELETE /users/:id` → login zdezaktywowanego → 401  
2. **(nowe)** `PATCH /users/:id` `{ "isActive": true }` (sesja admina) → 200  
3. **(nowe)** `POST /auth/login` tym samym emailem → 200  

**DoD kroku:**

- D-26 da się odtworzyć Postmanem.
- Unit Fazy 2 Krok 3 + spec kontrolera zielone: `pnpm --filter api test`.

---

## MILESTONE — Lukę Users + DX Swagger zamknięte

**Status:** *(pusty do OSIGĄGNIĘCIA)*

**Opis:** Operator self-host widzi w `/docs` sesję cookie (nie Bearer) i potrafi przywrócić konto po pomyłkowym soft-delete bez ruszania SQLite ręcznie.

**DoD (milestone):**

- Faza 1 i Faza 2 mają status `WYKONANY`.
- `/docs-json` dokumentuje `cookieAuth` na `cc_access`.
- `PATCH /api/v1/users/:id` z `{ isActive: true }` reaktyuje `user`; login wraca.
- Docs + SPEC (A-10, D-26) są zsynchronizowane z kodem.
- Po zmianach kodu: `graphify update .` w rootcie repo.

---

## Poza zakresem tego planu

- UI listy / dezaktywacji / reaktywacji (`SPEC-FRONTEND.md`).
- `PATCH` email, hasła, roli; drugi admin; recovery lost-admin.
- Sprawdzanie `isActive` w `JwtCookieStrategy` na **każdym** requeście (ew. osobny twardniejący wycinek: access JWT zdezaktywowanego do wygaśnięcia TTL — pre-istniejące; ten plan tego nie rusza).
- Drugi security scheme na `cc_refresh`.
- Bearer „obok cookie” w Swaggerze „dla wygody”.
- Zmiana `tsconfig`, nowy ORM, nowa tabela.
- Implementacja kodu w tej sesji planu — start wyłącznie po jawnej zgodzie na wdrożenie.

---

## Kolejność wykonania

1. Faza 2 Krok 1 (docs/SPEC) — zamyka niedopowiedzenie body, zanim DTO rozjedzie się z docs.  
2. Faza 1 Kroki 1–3 (Swagger) — niezależne od PATCH; można równolegle **po** Kroku 1 Fazy 2 albo nawet przed, jeśli nie ruszamy SPEC Users.  
3. Faza 2 Kroki 2–4 (typy → use-case → HTTP).  
4. Faza 2 Krok 5 (Postman).  
5. `graphify update .` + milestone.

Rekomendacja: **nie** łączyć obu faz w jednego PR-a koncepcyjnie — Swagger jest DX, PATCH jest kanonem Users — ale w tym repo jeden mały slice api jest OK, jeśli DoD obu faz są odhaczone osobno.
