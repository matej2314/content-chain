# Content Chain — feature plan: guest odczyt detali archiwalnych cudzych runów (Faza 23)

**Lokalizacja:** `feature-plans/content-chain_feature_plan_faza-23-guest-archive-read.md`  
**Kotwica major:** Faza 23 (cała) — `content-chain-backend_major_plan.md` (`NIE_ROZPOCZĘTY`, **bez** MILESTONE 23).  
**Refaktor względem:** Faza 18 / ownership detail/logs (`WYKONANY`) — *„cudze → 403”* na `GET /runs/:id` / logs dla `guest`. Od tej fazy wyjątek: cudzy detail + logs gdy status ∈ `{completed, failed, cancelled}`; events / HITL / cancel — nadal tylko self.  
**Źródła:** `docs/security.md`, `docs/dokumentacja_komunikacji.md`, `docs/dictionary.md`, `docs/ux_dashboard.md`, `SPEC-RUNY.md` R-3b / R-12, `SPEC-KOMUNIKACJA.md` K-2c, `SPEC-AUTH.md` (tabela ról), `SPEC-BEZPIECZENSTWO.md` B-11, `SPEC-TESTY.md` D-55, `SPEC-FRONTEND.md` F-10 (kontrakt FE poza zakresem BE), major Faza 23.  
**Kolejność `KROK` w tym pliku:** policy `assertGuestCanReadRun` → wire GetRun/GetLogs + events `'own'` → unit → e2e/Postman D-55 (pass rozwojowy: asercja ze statusem **przed** relaxem GET; events **strict** równolegle z relaxem, żeby nie otworzyć SSE na cudzym terminalnym).

**Statusy kroków feature:** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`

---

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Cała Faza 23 majoru backend: guest przy demo — odczyt cudzego detail/logs wyłącznie przy statusie archiwalnym; events/HITL/cancel bez regresji |
| Major | Faza 23; start po Fazach 1–22 (`WYKONANY`) i Milestone 1–6 / 4.2 / 4.3 (`OSIĄGNIĘTY`); **bez** MILESTONE 23 |
| Poza zakresem | UI / major FE Faza 21; zmiana authz admin/`user`; cancel admin→guest; hard/purge; Redis capów; awans roli; prefill startu; odczyt live SSE cudzych; edycja treści Fazy 18 (`WYKONANY`) |
| Po implementacji (informacyjnie) | Major: Faza 23 → `WYKONANY` (DoD gate + kod z feature planu). Brak `MILESTONE` 23. Faza 18 / powiązane milestone’e bez zmian historii. Edycja major **poza** tym skillem |

**Mapa major → ten plik**

| Major HOW (wskazówka) | Feature | Zakres |
|-----------------------|---------|--------|
| 1 (policy + get/logs) | FAZA 1 / KROK 1–2 | `assertGuestCanReadRun` + wire GetRun/GetLogs; events `'own'` |
| 2 (events/HITL/cancel bez zmian) | FAZA 1 / KROK 2 (events) + regresja HITL | `assertGuestOwnsRun` zostaje na HITL; cancel własna authz |
| 3 (testy D-55) | FAZA 1 / KROK 3–4 | unit + e2e + Postman |

**Pass rozwojowy (sesja planu):**

1. Nowa asercja z `status` powstaje **przed** podmianą w GetRun/GetLogs.
2. **Przesunięcie krytyczne:** `RunsController.events` dziś woła `GetRunUseCase` — samo poluzowanie detail otworzyłoby one-shot SSE na cudzym terminalnym (R-12.4 zakaz). W KROK 2 events przechodzi na `execute(..., 'own')` **w tym samym kroku** co relax `'read'` na GET.
3. Unit policy / get-run / get-logs **przed** e2e D-55.
4. **Brak przesunięć między fazami major.**

---

## Założenia

- Stack bez zmian: NestJS 11, Prisma, Zod 4 w api (bez nowych schematów w tym wycinku), monorepo `packages/shared`.
- `tsconfig` **bez** zmian. Typy jawne; zakaz `any` / `@ts-ignore`; `import type` dla typów.
- Statusy archiwalne (R-12 / D-55) = dokładnie `{completed, failed, cancelled}` — ten sam zbiór co archiwum UI / `isTerminalStatus` w controllerze.
- `startedByUserId === null` dla guest → **403** (jak dziś) — także przy statusie terminalnym (brak „cudzego” właściciela ≠ wyjątek archiwum).
- `admin` / `user` omijają GuestRunPolicy (no-op) — **bez** zmiany authz.
- Cancel: własna authz w `CancelRunUseCase` (owner ∨ admin→guest) — **bez** zmian; zwrotny `getRun.execute` po cancelu dla guest = własny run → OK przy `'read'`.
- HITL: nadal `assertGuestOwnsRun` — **bez** wyjątku archiwum.
- Lista `GET /runs`, quoty, GuestGuard, register/invite — **poza** tym wycinkiem.
- Przy konflikcie praktyki ↔ SPEC → **wygrywa SPEC**.

---

## Biblioteki (research)

**Bez Context7** — wycinek to czysta logika authz w istniejącym `GuestRunPolicyService` + Nest use-case / controller. Brak nowych zależności npm i nowych API bibliotek.

| Temat | Ustalenie | Decyzja w wycinku |
|-------|-----------|-------------------|
| Envelope 403 | Projektowy `DomainException('FORBIDDEN', …, 403)` | Bez zmian kanału błędów |
| Statusy | `RunStatus` z `@content-chain/shared` | Lokalny helper `isGuestArchiveStatus` w policy (bez nowego eksportu shared, chyba że już istnieje — **nie** dodawać do shared w tym wycinku) |

---

## FAZA 1 — Guest archive read (detail/logs) + twardy self na events/HITL

Odpowiada major Faza 23 (cała). Status startowy kroków: `NIE_ROZPOCZĘTY`.

---

### KROK 1 — `GuestRunPolicy`: `assertGuestCanReadRun` + zachowanie `assertGuestOwnsRun`

**Status:** `WYKONANY`

**Cel:** Egzekwować `SPEC-RUNY.md` R-12.4 w jednym miejscu: odczyt detail/logs = self **albo** (cudzy ∧ status archiwalny); mutacje / live ownership = nadal tylko self. Major Faza 23 HOW 1.

**Artefakty:**

- Zmiana: `apps/api/src/runs/application/guest/guest-run-policy.service.ts`
- Zmiana: `apps/api/src/runs/application/guest/guest-run-policy.service.spec.ts` (szkic asercji w KROK 3; tu można dopisać równolegle — DoD kroku = API metody gotowe do wire)

#### Policy — nowa asercja + stała archiwum

**teraz** (`guest-run-policy.service.ts` — koniec pliku, po `assertGuestOwnsRun`):

```typescript
  assertGuestOwnsRun(
    actor: AuthUserContext,
    startedByUserId: UserId | null,
  ): void {
    if (actor.role !== 'guest') {
      return;
    }
    if (startedByUserId !== actor.id) {
      throw new DomainException('FORBIDDEN', 'Access denied', 403);
    }
  }
}
```

**zamień na:**

```typescript
  assertGuestOwnsRun(
    actor: AuthUserContext,
    startedByUserId: UserId | null,
  ): void {
    if (actor.role !== 'guest') {
      return;
    }
    if (startedByUserId !== actor.id) {
      throw new DomainException('FORBIDDEN', 'Access denied', 403);
    }
  }

  /**
   * Odczyt snapshotu / logów (R-12.4): guest — własne zawsze;
   * cudze tylko gdy status ∈ {completed, failed, cancelled}.
   * `startedByUserId === null` → 403 (jak assertGuestOwnsRun).
   */
  assertGuestCanReadRun(
    actor: AuthUserContext,
    startedByUserId: UserId | null,
    status: RunStatus,
  ): void {
    if (actor.role !== 'guest') {
      return;
    }
    if (startedByUserId === actor.id) {
      return;
    }
    if (startedByUserId !== null && isGuestArchiveStatus(status)) {
      return;
    }
    throw new DomainException('FORBIDDEN', 'Access denied', 403);
  }
}
```

**Dodaj** na górze pliku (obok istniejących importów / stałych `GUEST_TASK_TYPES`):

```typescript
import type { RunStatus, RunTaskType, UserId } from '@content-chain/shared';

const GUEST_ARCHIVE_STATUSES = [
  'completed',
  'failed',
  'cancelled',
] as const satisfies readonly RunStatus[];

function isGuestArchiveStatus(status: RunStatus): boolean {
  return (GUEST_ARCHIVE_STATUSES as readonly RunStatus[]).includes(status);
}
```

Uwaga: istniejący import `RunTaskType` / `UserId` — scal do jednego `import type { … }`. **Nie** zmieniaj ciała `admitStart` ani `assertGuestOwnsRun`.

**DoD kroku:**

- `assertGuestCanReadRun` istnieje i jest publiczną metodą serwisu.
- `assertGuestOwnsRun` bez zmian semantyki (self-only).
- Kompilacja typów OK (`RunStatus` z shared).

---

### KROK 2 — Wire: GetRun / GetLogs → `'read'`; events → `'own'`

**Status:** `WYKONANY`

**Cel:** Podłączyć wyjątek archiwum wyłącznie do ścieżek snapshot/logs; `GET .../events` i HITL pozostają self-only (`SPEC-RUNY.md` R-12.4, `SPEC-KOMUNIKACJA.md` K-2c). Major Faza 23 HOW 1–2.

**Artefakty:**

- Zmiana: `apps/api/src/runs/application/get-run.use-case.ts`
- Zmiana: `apps/api/src/runs/application/get-run-logs.use-case.ts`
- Zmiana: `apps/api/src/runs/runs.controller.ts`
- (HITL) **bez** zmiany wywołania w `resume-hitl.use-case.ts` — nadal `assertGuestOwnsRun`
- (Cancel) **bez** zmiany authz w `cancel-run.use-case.ts`

#### Typ dostępu GetRun

**Dodaj** eksport typu (nad klasą `GetRunUseCase`):

```typescript
/** `read` = detail HTTP (archiwum OK); `own` = events/SSE (tylko self). */
export type GetRunGuestAccess = 'read' | 'own';
```

#### GetRunUseCase.execute — trzeci argument

**teraz:**

```typescript
  async execute(runId: RunId, actor: AuthUserContext): Promise<GetRunOutput> {
    const parsedRunId = parseWithZod(runIdSchema, runId);
    const run = await this.runs.getById(parsedRunId);
    if (!run) {
      throw new DomainException('RUN_NOT_FOUND', 'Run not found', 404);
    }
    this.guestPolicy.assertGuestOwnsRun(actor, run.startedByUserId);
```

**zamień na:**

```typescript
  async execute(
    runId: RunId,
    actor: AuthUserContext,
    guestAccess: GetRunGuestAccess = 'read',
  ): Promise<GetRunOutput> {
    const parsedRunId = parseWithZod(runIdSchema, runId);
    const run = await this.runs.getById(parsedRunId);
    if (!run) {
      throw new DomainException('RUN_NOT_FOUND', 'Run not found', 404);
    }
    if (guestAccess === 'own') {
      this.guestPolicy.assertGuestOwnsRun(actor, run.startedByUserId);
    } else {
      this.guestPolicy.assertGuestCanReadRun(
        actor,
        run.startedByUserId,
        run.status,
      );
    }
```

Domyślne `'read'` → istniejące wywołania `getRun.execute(runId, actor)` (cancel, rating ścieżki snapshotu, HTTP GET) dostają wyjątek archiwum **bez** zmiany call-site’ów poza events.

#### GetRunLogsUseCase

**teraz:**

```typescript
    this.guestPolicy.assertGuestOwnsRun(actor, run.startedByUserId);
```

**zamień na:**

```typescript
    this.guestPolicy.assertGuestCanReadRun(
      actor,
      run.startedByUserId,
      run.status,
    );
```

#### RunsController.events — strict ownership

**teraz** (oba wywołania w `events`):

```typescript
    const snapshot = await this.getRun.execute(runId, user);
    // …
    const latest = await this.getRun.execute(runId, user);
```

**zamień na:**

```typescript
    const snapshot = await this.getRun.execute(runId, user, 'own');
    // …
    const latest = await this.getRun.execute(runId, user, 'own');
```

HTTP GET detail (`get` handler) zostaje `this.getRun.execute(runId, user)` → default `'read'`.

**Kolejność w tym kroku (obowiązkowa):** najpierw dodaj trzeci argument + przełącz **events** na `'own'`, potem (lub w tym samym commicie logicznym) podmień assert w GetRun/GetLogs na `assertGuestCanReadRun`. Nie merguj samego relaxu GetRun bez `'own'` na events.

**DoD kroku:**

- Guest + cudzy `completed`/`failed`/`cancelled` → GetRun/GetLogs przechodzą authz.
- Guest + cudzy nieterminalny → 403 przed load wyników/logów.
- `events` woła `execute(..., 'own')` — cudzy terminalny → 403.
- HITL nadal `assertGuestOwnsRun`.
- Cancel authz nietknięty.

---

### KROK 3 — Unit: policy + GetRun + GetLogs + controller events

**Status:** `WYKONANY`

**Cel:** Domknąć asercje `SPEC-TESTY.md` D-55 na poziomie unit (pozytyw archiwum + negatyw live + regresja owns). Major Faza 23 HOW 3 (część unit).

**Artefakty:**

- Zmiana: `apps/api/src/runs/application/guest/guest-run-policy.service.spec.ts`
- Zmiana: `apps/api/src/runs/application/get-run.use-case.spec.ts`
- Zmiana: `apps/api/src/runs/application/get-run-logs.use-case.spec.ts`
- Zmiana: `apps/api/src/runs/runs.controller.spec.ts` (oczekiwania `execute(runId, user, 'own')` w testach `events`)

#### `guest-run-policy.service.spec.ts` — dopisz `describe('assertGuestCanReadRun')`

Po istniejącym `describe('assertGuestOwnsRun')` (który **zostaje** — foreign nadal 403):

```typescript
  describe('assertGuestCanReadRun', () => {
    it('is a no-op for non-guest actors', () => {
      const { service } = makeService({ env: ENV_DEMO_ON });

      expect(() =>
        service.assertGuestCanReadRun(adminActor(), OTHER_ID, 'running'),
      ).not.toThrow();
      expect(() =>
        service.assertGuestCanReadRun(userActor(), null, 'completed'),
      ).not.toThrow();
    });

    it('allows a guest on own run for any status', () => {
      const { service } = makeService({ env: ENV_DEMO_ON });

      expect(() =>
        service.assertGuestCanReadRun(guestActor(), GUEST_ID, 'running'),
      ).not.toThrow();
      expect(() =>
        service.assertGuestCanReadRun(guestActor(), GUEST_ID, 'awaiting_hitl'),
      ).not.toThrow();
    });

    it.each(['completed', 'failed', 'cancelled'] as const)(
      'allows a guest on a foreign %s run',
      (status) => {
        const { service } = makeService({ env: ENV_DEMO_ON });

        expect(() =>
          service.assertGuestCanReadRun(guestActor(), OTHER_ID, status),
        ).not.toThrow();
      },
    );

    it.each(['queued', 'running', 'interrupted', 'awaiting_hitl'] as const)(
      'rejects a guest on a foreign %s run',
      (status) => {
        const { service } = makeService({ env: ENV_DEMO_ON });

        expect(() =>
          service.assertGuestCanReadRun(guestActor(), OTHER_ID, status),
        ).toThrow(
          expect.objectContaining({
            name: 'DomainException',
            code: 'FORBIDDEN',
            httpStatus: 403,
          }),
        );
      },
    );

    it('rejects a guest when startedByUserId is null even if status is archival', () => {
      const { service } = makeService({ env: ENV_DEMO_ON });

      expect(() =>
        service.assertGuestCanReadRun(guestActor(), null, 'completed'),
      ).toThrow(
        expect.objectContaining({
          name: 'DomainException',
          code: 'FORBIDDEN',
          httpStatus: 403,
        }),
      );
    });
  });
```

#### `get-run.use-case.spec.ts`

**teraz** (test foreign completed → 403):

```typescript
  it('rejects a guest reading a foreign run with FORBIDDEN before loading results', async () => {
    const run = makeRun('completed', { startedByUserId: OTHER_ID });
    const listIdeas = jest.fn(async () => ideas);
    const useCase = makeUseCase(
      unusedRepo({ getById: async () => asSnapshot(run) }),
      fakeReader({ listIdeas }),
    );

    await expect(useCase.execute(run.id, GUEST)).rejects.toMatchObject({
      name: 'DomainException',
      code: 'FORBIDDEN',
      httpStatus: 403,
    });
    expect(listIdeas).not.toHaveBeenCalled();
  });
```

**zamień na** (dwa testy — archiwum OK + live 403 + opcjonalnie `'own'`):

```typescript
  it('allows a guest to read a foreign archival run (completed)', async () => {
    const run = makeRun('completed', { startedByUserId: OTHER_ID });
    const useCase = makeUseCase(
      unusedRepo({ getById: async () => asSnapshot(run) }),
    );

    await expect(useCase.execute(run.id, GUEST)).resolves.toMatchObject({
      runId: run.id,
      status: 'completed',
    });
  });

  it('rejects a guest reading a foreign non-terminal run before loading results', async () => {
    const run = makeRun('running', { startedByUserId: OTHER_ID });
    const listIdeas = jest.fn(async () => ideas);
    const useCase = makeUseCase(
      unusedRepo({ getById: async () => asSnapshot(run) }),
      fakeReader({ listIdeas }),
    );

    await expect(useCase.execute(run.id, GUEST)).rejects.toMatchObject({
      name: 'DomainException',
      code: 'FORBIDDEN',
      httpStatus: 403,
    });
    expect(listIdeas).not.toHaveBeenCalled();
  });

  it('rejects a guest on foreign archival run when guestAccess is own (events)', async () => {
    const run = makeRun('completed', { startedByUserId: OTHER_ID });
    const listIdeas = jest.fn(async () => ideas);
    const useCase = makeUseCase(
      unusedRepo({ getById: async () => asSnapshot(run) }),
      fakeReader({ listIdeas }),
    );

    await expect(useCase.execute(run.id, GUEST, 'own')).rejects.toMatchObject({
      name: 'DomainException',
      code: 'FORBIDDEN',
      httpStatus: 403,
    });
    expect(listIdeas).not.toHaveBeenCalled();
  });
```

Zachowaj istniejący test *allows a guest to read their own run*.

#### `get-run-logs.use-case.spec.ts`

`makeSocialRun` bez statusu — domyślny status helpera może być nieterminalny lub terminalny; **nie zgaduj**. Ustaw jawnie:

**teraz** (foreign → 403 bez statusu):

```typescript
  it('rejects a guest reading logs of a foreign run before listLogs', async () => {
    const run = makeSocialRun({ startedByUserId: OTHER_ID });
```

**zamień na** (rozdziel):

```typescript
  it('allows a guest to read logs of a foreign completed run', async () => {
    const run = makeSocialRun({
      startedByUserId: OTHER_ID,
      status: 'completed',
    });
    const listLogs = jest.fn(async () => []);
    const useCase = new GetRunLogsUseCase(
      unusedRepo({
        getById: async () => ({
          ...run,
          startedBy: null,
          userRating: null,
          outputEdited: false,
          reviewFinalizedAt: null,
          pipelineFinishedAt: null,
          cancelledAt: null,
        }),
        listLogs,
      }),
      makeGuestPolicy(),
    );

    await expect(useCase.execute(run.id, GUEST)).resolves.toEqual({ items: [] });
    expect(listLogs).toHaveBeenCalledWith(run.id);
  });

  it('rejects a guest reading logs of a foreign running run before listLogs', async () => {
    const run = makeSocialRun({
      startedByUserId: OTHER_ID,
      status: 'running',
    });
    const listLogs = jest.fn(async () => []);
    const useCase = new GetRunLogsUseCase(
      unusedRepo({
        getById: async () => ({
          ...run,
          startedBy: null,
          userRating: null,
          outputEdited: false,
          reviewFinalizedAt: null,
          pipelineFinishedAt: null,
          cancelledAt: null,
        }),
        listLogs,
      }),
      makeGuestPolicy(),
    );

    await expect(useCase.execute(run.id, GUEST)).rejects.toMatchObject({
      name: 'DomainException',
      code: 'FORBIDDEN',
      httpStatus: 403,
    });
    expect(listLogs).not.toHaveBeenCalled();
  });
```

#### `runs.controller.spec.ts` — events call-site

We **wszystkich** asercjach `getRun.execute` w testach `events` (oraz w `toHaveBeenCalledWith` dla ścieżki events):

**teraz:** `toHaveBeenCalledWith(runId, sessionUser)`  
**zamień na:** `toHaveBeenCalledWith(runId, sessionUser, 'own')`

Test delegacji HTTP GET detail (`delegates GET :runId`) zostaje przy **dwóch** argumentach (default `'read'`).

**DoD kroku:**

- `pnpm --filter api test` (lub równoważny target unit dla wymienionych plików) zielony dla policy / get-run / get-logs / controller events.
- Brak regresji: `assertGuestOwnsRun` foreign nadal 403.

---

### KROK 4 — E2E D-55 + Postman

**Status:** `WYKONANY`

**Cel:** Zaktualizować żywy kontrakt HTTP pod `SPEC-TESTY.md` D-55 (pozytyw archiwum detail+logs; negatyw nieterminalny; HITL/cancel cudzy → 403). Major Faza 23 HOW 3.

**Artefakty:**

- Zmiana: `apps/api/test/demo-guest.e2e-spec.ts`
- Zmiana: `apps/api/test/postman/demo-guest.postman-collection.json` (folder Allow lub osobny podfolder Archive read — D-55)
- Zmiana (krótka nota): `apps/api/test/postman/README.md` — jedna linia w sekcji DEMO guest o D-55 archiwum

#### E2E — refaktor istniejącego D-55

**teraz** (`demo-guest.e2e-spec.ts`):

```typescript
  it('guest lists all instance runs but cannot read or cancel a foreign one (D-55)', async () => {
    const me = await admin.get('/api/v1/auth/me').expect(200);
    const adminId = me.body.id as string;
    const foreignRunId = `run_${randomUUID()}`;
    await prisma.run.create({
      data: {
        id: foreignRunId,
        conversationId: `conv_${randomUUID()}`,
        taskType: 'post_ideas',
        platform: 'linkedin',
        language: 'pl',
        status: 'completed',
        brief: { topic: 'Admin run' },
        startedByUserId: adminId,
      },
    });

    const list = await guest.get('/api/v1/runs').expect(200);
    const runIds = (list.body.items as Array<{ runId: string }>).map(
      (item) => item.runId,
    );
    expect(runIds).toContain(foreignRunId);

    const detail = await guest.get(`/api/v1/runs/${foreignRunId}`).expect(403);
    expect(detail.body.code).toBe('FORBIDDEN');

    const logs = await guest
      .get(`/api/v1/runs/${foreignRunId}/logs`)
      .expect(403);
    expect(logs.body.code).toBe('FORBIDDEN');

    const cancel = await guest
      .post(`/api/v1/runs/${foreignRunId}/cancel`)
      .expect(403);
    expect(cancel.body.code).toBe('FORBIDDEN');
  });
```

**zamień na:**

```typescript
  it('guest lists instance runs; archival foreign detail/logs OK; live/HITL/cancel forbidden (D-55)', async () => {
    const me = await admin.get('/api/v1/auth/me').expect(200);
    const adminId = me.body.id as string;

    const archivalRunId = `run_${randomUUID()}`;
    await prisma.run.create({
      data: {
        id: archivalRunId,
        conversationId: `conv_${randomUUID()}`,
        taskType: 'post_ideas',
        platform: 'linkedin',
        language: 'pl',
        status: 'completed',
        brief: { topic: 'Admin archival' },
        startedByUserId: adminId,
      },
    });

    const liveRunId = `run_${randomUUID()}`;
    await prisma.run.create({
      data: {
        id: liveRunId,
        conversationId: `conv_${randomUUID()}`,
        taskType: 'post_ideas',
        platform: 'linkedin',
        language: 'pl',
        status: 'running',
        brief: { topic: 'Admin live' },
        startedByUserId: adminId,
      },
    });

    const hitlRunId = `run_${randomUUID()}`;
    await prisma.run.create({
      data: {
        id: hitlRunId,
        conversationId: `conv_${randomUUID()}`,
        taskType: 'post_ideas_then_content',
        platform: 'linkedin',
        language: 'pl',
        status: 'awaiting_hitl',
        brief: { topic: 'Admin hitl', ideaCount: 3 },
        startedByUserId: adminId,
      },
    });

    const list = await guest.get('/api/v1/runs').expect(200);
    const runIds = (list.body.items as Array<{ runId: string }>).map(
      (item) => item.runId,
    );
    expect(runIds).toContain(archivalRunId);

    const detail = await guest
      .get(`/api/v1/runs/${archivalRunId}`)
      .expect(200);
    expect(detail.body.runId).toBe(archivalRunId);
    expect(detail.body.status).toBe('completed');

    const logs = await guest
      .get(`/api/v1/runs/${archivalRunId}/logs`)
      .expect(200);
    expect(Array.isArray(logs.body.items)).toBe(true);

    const liveDetail = await guest
      .get(`/api/v1/runs/${liveRunId}`)
      .expect(403);
    expect(liveDetail.body.code).toBe('FORBIDDEN');

    const liveLogs = await guest
      .get(`/api/v1/runs/${liveRunId}/logs`)
      .expect(403);
    expect(liveLogs.body.code).toBe('FORBIDDEN');

    const cancel = await guest
      .post(`/api/v1/runs/${archivalRunId}/cancel`)
      .expect(403);
    expect(cancel.body.code).toBe('FORBIDDEN');

    const hitl = await guest
      .post(`/api/v1/runs/${hitlRunId}/hitl`)
      .send({ selectedIdeaIds: ['idea_1'] })
      .expect(403);
    expect(hitl.body.code).toBe('FORBIDDEN');
  });
```

Uwagi implementacyjne e2e:

- Jeśli Prisma wymaga dodatkowych pól na `post_ideas_then_content` / `ideaCount` — dopasuj do istniejących fixture’ów w tym samym pliku / innych e2e (nie wymyślaj schematu).
- Events SSE w e2e **opcjonalne** (koszt setupu EventSource); pokrycie `'own'` = unit GetRun + controller.spec. Gdy łatwo: `GET /api/v1/runs/${archivalRunId}/events` jako guest → **403** (supertest na SSE może być kruche — nie blokuj DoD, jeśli unit już trzyma kontrakt).

#### Postman (`demo-guest.postman-collection.json`)

W folderze **Allow** (po sesji guest) dodaj requesty (nazwy orientacyjne):

1. **Admin seed archival run** — login admin → `POST` niekoniecznie; albo użyj istniejącego completed z Allow / seed przez API jeśli jest; praktycznie: po Allow starcie runu adminem jest ciężkie — **preferuj** asercję Jest jako CI, a w Postmanie:
   - request „GET foreign completed detail (D-55)” z zmienną `foreignArchivalRunId` (ustawianą ręcznie / skryptem z `GET /runs?status=completed` pierwszego cudzego id ≠ guest),
   - asercja **200**,
   - „GET same /logs” → **200**,
   - „POST cancel same” → **403**,
   - opcjonalnie drugi id `foreignLiveRunId` → detail **403**.

Jeśli seed bez admina w jarze jest zbyt kruchy w runnerze — dopisz w README: *D-55 pełne = Jest e2e; Postman smoke gdy w kolekcji jest znany cudzy `completed`*.

Nie odwołuj się do planów pomocniczych w rootcie — tylko docs/SPEC/major.

**DoD kroku:**

- E2E D-55: cudzy terminalny detail+logs → **200**; cudzy nieterminalny → **403**; HITL/cancel cudzy → **403**; lista nadal OK.
- Postman: co najmniej smoke / nota README zgodna z D-55 (bez sprzeczności „zawsze 403 na detail”).
- Brak regresji D-54 / Deny (output-edited itd.).

---

#### Propozycja commit message

```text
feat(runs): allow guests to read archival foreign run detail and logs

Keep events, HITL, and cancel self-only so archive showcase does not open live or mutation paths.
```

---

## Weryfikacja wycinka

| Kryterium | Jak sprawdzić |
|-----------|----------------|
| R-12.4 detail/logs | Guest + cudzy `completed`/`failed`/`cancelled` → 200; nieterminalny → 403 |
| R-12.4 events/HITL/cancel | Cudzy (także terminalny) → 403 |
| K-2c / security docs | Zgodność z kanonem — bez zmiany listy `GET /runs` |
| D-55 | Unit + e2e jak wyżej |
| Faza 18 nietknięta w majorze | Tylko informacyjnie; ten plan nie edytuje major |
| Brak sekretów | Zero tokenów / haseł w pliku planu |
| Nagłówki | Wyłącznie `FAZA` / `KROK` |
| Helper plans | Brak odwołań do `*-plan.md` w rootcie |

---

## Ślad do major (informacyjnie, po implementacji)

| Pozycja major | Po implementacji tego planu |
|---------------|-----------------------------|
| Faza 23 | `WYKONANY` (DoD gate + kod) |
| MILESTONE 23 | **nie tworzyć** / nie oznaczać |
| Faza 18 | bez zmian (`WYKONANY`) |
| MILESTONE 1–6 / 4.2 / 4.3 | bez zmian (`OSIĄGNIĘTY`) |

Edycja statusów major — **poza** tą sesją (ręcznie lub przy `/feature-implementation` na życzenie użytkownika).
)
