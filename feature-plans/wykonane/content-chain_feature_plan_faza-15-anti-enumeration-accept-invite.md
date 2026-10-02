# Content Chain — feature plan: anti-enumeration na `accept-invite` (Faza 15)

**Lokalizacja:** `feature-plans/content-chain_feature_plan_faza-15-anti-enumeration-accept-invite.md`  
**Kotwica major:** Faza 15 (gate) w `content-chain-backend_major_plan.md` — **HOW implementacji** w `apps/api` (major nie zawiera kroków kodu).  
**Refaktor względem:** Faza 5 / Krok 5.2 (`WYKONANY`) — `POST /auth/accept-invite` z **409** `CONFLICT` / „Email already in use” przy zajętym `User.email` (świadoma enumeracja) oraz adapter bez revoke przy P2002.  
**Źródła kanonu (nie treść 5.2):** `docs/security.md`, `docs/dokumentacja_komunikacji.md`, `docs/dictionary.md`, `docs/anty_patterny.md`, `docs/testy.md`, `SPEC-AUTH.md` A-7b, `SPEC-BEZPIECZENSTWO.md` B-8, `SPEC-KOMUNIKACJA.md` K-2f / K-8, `SPEC-PERSISTENCE.md` D16, `SPEC-TESTY.md` D-23 / D-23a, major Faza 15.  
**Pass rozwojowy:** adapter (revoke przy P2002) → use-case (401) → testy. **Brak innych przesunięć.**

**Statusy kroków feature:** `NIE_ROZPOCZĘTY` | `W_TRAKCIE` | `WYKONANY`

---

## Meta

| Pole | Wartość |
|------|---------|
| Wycinek | Publiczny `POST /auth/accept-invite`: kolizja `User.email` → **401** + revoke Invitation; zakaz **409** na tej trasie |
| Major | Faza 15 (`NIE_ROZPOCZĘTY` → po implementacji `WYKONANY` jako gate+HOW); start po Fazach 1–14 (`WYKONANY`); **bez** MILESTONE 15 |
| Poza zakresem | FE accept-invite (major FE Faza 11); **409** na admin `POST /invitations` / drugi pending; **409** na `PATCH /auth/me/email`; open registration / resend activation; edycja major/docs/SPEC |
| Po implementacji (informacyjnie) | Major: Faza 15 → `WYKONANY`. Brak `MILESTONE` 15. MILESTONE 5 / Faza 5.2 bez zmian historii. Edycja major **poza** tym skillem |

**Mapa major → ten plik**

| Major | Feature | Zakres |
|-------|---------|--------|
| Faza 15 (gate) | FAZA 1 / KROK 1–3 | Adapter revoke → use-case 401 → unit + Postman D-23a |

---

## Założenia

- Stack bez zmian: NestJS 11, Prisma, Zod 4 w application (`parseWithZod`), istniejący port `InvitationRepository.acceptAndCreateUser`.
- Message złego tokenu pozostaje kanoniczny: `Invalid invitation token` (ten sam string przy kolizji email).
- Happy path D16 **bez zmian**: jedna transakcja `users.create` + Invitation → `accepted`; **201** + `{ user }`; **bez** Set-Cookie.
- Hasło poza A-5 → **400** `VALIDATION_FAILED`; Invitation **bez zmian** (przed transakcją).
- Kolizja P2002 (aktywny **lub** soft-deleted `User.email`): **brak** `User` z tej próby; Invitation → `revoked` (nie `accepted`); HTTP **401** `UNAUTHORIZED`.
- Prisma: błąd w `$transaction` **rollbackuje całą TX** — revoke **nie** może być „catch wewnątrz tej samej TX po P2002”. Wzorzec jak `createAdminIfNone`: catch P2002 **po** rollbacku happy-path TX → **osobny** atomowy zapis `revoked` (`updateMany` z `status: 'pending'`). To spełnia SPEC „transakcja / atomowy krok” (slash = równoważnik).
- Port: wynik `{ ok: false; reason: 'email-taken' }` **zostaje** — zmienia się semantyka side-effectu (revoke) i mapowanie HTTP w use-case.
- Typy: `input: unknown` + Zod; zakaz `any` / `@ts-ignore`; `import type` dla typów.
- FE nadal może mieć historyczne założenie 409 — poza tym wycinkiem (major FE Faza 11).

---

## Biblioteki (research)

**Źródło:** Context7 MCP, library ID `/websites/prisma_io` (P2002 + interactive `$transaction`: throw/error w callbacku → pełny rollback; obsługa `PrismaClientKnownRequestError` / `code === "P2002"`). Wersja w projekcie: Prisma w `apps/api` (istniejący klient).

| Temat | Ustalenie | Decyzja w wycinku |
|-------|-----------|------------------|
| P2002 | `instanceof Prisma.PrismaClientKnownRequestError` + `code === 'P2002'` | Istniejący helper `isUniqueConstraintViolation` w adapterze |
| TX rollback | Błąd w callbacku → nic z TX nie zostaje | Revoke **po** catch, osobny write (jak `createAdminIfNone`) |
| `updateMany` | Warunek `id` + `status: 'pending'` | Idempotentny revoke; nie rusza już `accepted`/`revoked` |

Przy konflikcie Context7 ↔ SPEC → **wygrywa SPEC**.

---

## FAZA 1 — Anti-enumeration na `accept-invite`

Odpowiada major **Faza 15** (implementacja HOW). Jedna faza w tym zestawie.

---

### KROK 1 — Adapter: P2002 → revoke Invitation

**Status:** `WYKONANY`

**Cel:** Po nieudanej próbie create przy zajętym `User.email` Invitation nie zostaje żywym `pending` — przechodzi na `revoked` (bez utworzenia `User`). `SPEC-AUTH.md` A-7b, `SPEC-PERSISTENCE.md` D16, major Faza 15 HOW pkt 2.

**Artefakty:**

- Zmiana: `apps/api/src/auth/infrastructure/prisma-invitation.adapter.ts` (`acceptAndCreateUser`)

#### Refaktor — `acceptAndCreateUser` (catch P2002)

Plik: `apps/api/src/auth/infrastructure/prisma-invitation.adapter.ts`  
Symbol: `PrismaInvitationAdapter.acceptAndCreateUser`

**teraz:**

```typescript
    } catch (error) {
      if (isUniqueConstraintViolation(error)) {
        return { ok: false, reason: 'email-taken' };
      }
      throw error;
    }
```

**zamień na:**

```typescript
    } catch (error) {
      if (isUniqueConstraintViolation(error)) {
        // Happy-path TX już zrollbackowana (P2002). Osobny atomowy krok:
        // zużyj token bez User (A-7b / D16) — wzorzec jak createAdminIfNone po P2002.
        await this.prisma.invitation.updateMany({
          where: { id: input.invitationId, status: 'pending' },
          data: { status: 'revoked' },
        });
        return { ok: false, reason: 'email-taken' };
      }
      throw error;
    }
```

Happy-path `$transaction` (create + `accepted`) **bez zmian**.

**Biblioteki / API:** Prisma P2002 + rollback TX (Context7 `/websites/prisma_io`); lokalny wzorzec `prisma-user.adapter.ts` `createAdminIfNone`.

**Testy:** pokrycie w KROK 3 (Postman D-23a asercja revoke; unit use-case w KROK 2/3). Opcjonalnie późniejszy test adaptera z DB — nie wymagany, jeśli Postman weryfikuje status Invitation.

**DoD kroku:**

- Przy P2002 na `User.email`: brak nowego `User`; Invitation z `pending` → `revoked` (lub już nie-pending).
- `updateMany` nie nadpisuje wiersza, który nie jest `pending`.
- Happy path create+`accepted` nietknięty.

---

### KROK 2 — Use-case: `email-taken` → 401 jak zły token

**Status:** `WYKONANY`

**Cel:** Publiczny accept nie enumeruje istnienia konta — ten sam `code` + `message` + status co nieważny token. `SPEC-AUTH.md` A-7b, `SPEC-KOMUNIKACJA.md` K-2f, `docs/security.md`, major Faza 15 HOW pkt 1.

**Artefakty:**

- Zmiana: `apps/api/src/auth/application/accept-invite.use-case.ts`
- Controller HTTP **bez zmian** (`@HttpCode(201)` tylko na sukces; wyjątek domenowy niesie 401)

#### Refaktor — `AcceptInviteUseCase.execute` (gałąź `!created.ok`)

Plik: `apps/api/src/auth/application/accept-invite.use-case.ts`

**teraz:**

```typescript
    if (!created.ok) {
      throw new DomainException('CONFLICT', 'Email already in use', 409);
    }
```

**zamień na:**

```typescript
    if (!created.ok) {
      // A-7b: maskowanie kolizji email jak nieważny token (zakaz 409 na tej trasie).
      throw new DomainException(
        'UNAUTHORIZED',
        'Invalid invitation token',
        401,
      );
    }
```

Reszta use-case (Zod → `findPendingByHash` → A-5 → hash → `acceptAndCreateUser` → 201 shape) **bez zmian**.

**Biblioteki:** brak nowego API; `DomainException` jak przy złym tokenie w tym samym pliku.

**Testy:** KROK 3.

**DoD kroku:**

- `reason: 'email-taken'` → `UNAUTHORIZED` / `Invalid invitation token` / HTTP 401.
- Brak ścieżki `CONFLICT` / „Email already in use” z tego use-case.
- Zły token i kolizja email mają **identyczny** envelope (`code` + `message` + status).

---

### KROK 3 — Testy unit + Postman D-23a

**Status:** `WYKONANY`

**Cel:** Domknięcie D-23a i regresja D-23; unieważnienie asercji oczekujących **409** na accept przy zajętym emailu. `SPEC-TESTY.md` D-23 / D-23a, `docs/testy.md`, major Faza 15 HOW pkt 3–4.

**Artefakty:**

- Zmiana: `apps/api/src/auth/application/accept-invite.use-case.spec.ts`
- Zmiana: `apps/api/test/postman/auth.postman-collection.json` (folder Accept-invite / nowy podfolder D-23a)
- Opcjonalnie: krótka nota w `apps/api/test/postman/README.md` (kolejność D-23a) — tylko jeśli README już opisuje Accept-invite

#### Refaktor — unit `accept-invite.use-case.spec.ts`

**teraz:**

```typescript
  it('rejects when acceptAndCreateUser reports email-taken', async () => {
    const useCase = new AcceptInviteUseCase(
      unusedInvitations({
        findPendingByHash: async () => makeInvitation(),
        acceptAndCreateUser: async () => ({
          ok: false,
          reason: 'email-taken',
        }),
      }),
    );

    await expect(
      useCase.execute({ token: RAW_TOKEN, password: PASSWORD }),
    ).rejects.toMatchObject({
      name: 'DomainException',
      code: 'CONFLICT',
      httpStatus: 409,
      message: 'Email already in use',
    });
  });
```

**zamień na:**

```typescript
  it('rejects email-taken with the same UNAUTHORIZED envelope as a bad token', async () => {
    const useCase = new AcceptInviteUseCase(
      unusedInvitations({
        findPendingByHash: async () => makeInvitation(),
        acceptAndCreateUser: async () => ({
          ok: false,
          reason: 'email-taken',
        }),
      }),
    );

    await expect(
      useCase.execute({ token: RAW_TOKEN, password: PASSWORD }),
    ).rejects.toMatchObject({
      name: 'DomainException',
      code: 'UNAUTHORIZED',
      httpStatus: 401,
      message: 'Invalid invitation token',
    });
  });
```

Happy path unit + weak password + missing token + unknown token — **bez zmian** (już asercują 401 / 400).

#### Postman — D-23a (kolizja email)

**Kontekst:** zwykły `POST /invitations` na email z istniejącym `User` (także soft-deleted) → **409** — nie da się legalnie mieć `pending` + `User` tą ścieżką. Edge z docs = race / zajęcie emaila **po** utworzeniu pending (np. `PATCH /auth/me/email` innego konta na adres zaproszenia).

**Proponowana sekwencja** w `auth.postman-collection.json` (folder np. `Accept-invite / D-23a collision`, **przed** happy-path accept tego samego tokenu albo na osobnym `collisionEmail` / `collisionInviteToken`):

1. **Admin login** (jeśli jar pusty).
2. **`POST /invitations`** `{ "email": "{{collisionEmail}}" }` → **201**; z logu api (`development`) wklej `collisionInviteToken` (jak `inviteToken`).
3. **Zajęcie emaila:** sesja innego aktywnego konta (np. wcześniej zaproszony `user` **albo** admin — z restore) → `PATCH /auth/me/email` `{ "email": "{{collisionEmail}}", "currentPassword": "…" }` → **200**. Alternatywa soft-deleted: nie wymagana, jeśli P2002 i tak łapie unikalny email (active i soft-deleted dzielą unique).
4. **Bez cookie** (clear jar originu api): `POST /auth/accept-invite` `{ "token": "{{collisionInviteToken}}", "password": "{{invitePassword}}" }` → **401**, `code=UNAUTHORIZED`, `message=Invalid invitation token`; **asercja: status ≠ 409**.
5. **Admin login** → `GET /invitations`: brak `pending` dla `collisionEmail` / brak `id` z kroku 2 na liście pending (revoke).
6. **Cleanup:** przywróć email sesji, która zajęła adres (jak D-27 restore), żeby nie psuć reszty kolekcji.

Przykład asercji accept (D-23a):

```javascript
pm.test('status 401', function () {
  pm.response.to.have.status(401);
});
pm.test('not 409 enumeration', function () {
  pm.expect(pm.response.code).to.not.eql(409);
});
const body = pm.response.json();
pm.test('UNAUTHORIZED same message as bad token', function () {
  pm.expect(body.code).to.eql('UNAUTHORIZED');
  pm.expect(body.message).to.eql('Invalid invitation token');
});
```

**Regresja D-23:** istniejący happy path Accept-invite (201 bez Set-Cookie → login) **bez zmian** asercji sukcesu. Usunąć / poprawić wszelkie requesty oczekujące **409** „Email already in use” na `POST /auth/accept-invite` (jeśli jakieś zostały — obecnie suite skupia się na 401 reused token).

**DoD kroku:**

- Unit: `email-taken` → 401 + ten sam `message` co zły token.
- Postman: D-23a → 401, nie 409; Invitation po próbie nie jest `pending`.
- Regresja: accept → login zielone.
- Brak sekretów w planie / diffie poza istniejącymi zmiennymi kolekcji.

---

#### Propozycja commit message

```text
fix(auth): mask accept-invite email collision as 401

Revoke the pending invitation on P2002 so a public accept cannot enumerate
existing accounts or leave a live token after a collision.
```

---

## Weryfikacja wycinka

| Kryterium | Jak |
|-----------|-----|
| A-7b / K-2f / B-8 | Kolizja → 401 + identyczny message; zakaz 409 na accept |
| D16 | Happy path TX create+accepted; kolizja → brak User + revoke |
| D-23 / D-23a | Happy path + negatyw 401 / nie 409 + revoke |
| 409 zostaje poza trasą | `POST /invitations`, `PATCH /auth/me/email` nietknięte |
| Brak Set-Cookie na accept | Controller / use-case bez cookies |
| Typy | bez `any`; port `email-taken` bez zmiany kształtu wyniku |
| Kanon | docs/SPEC aktualne — **nie** treść Kroku 5.2 |
| Nagłówki | wyłącznie `FAZA` / `KROK` |
| Major nietknięty w tej sesji | tak |

---

## Ślad do major (informacyjnie, po implementacji)

| Pozycja | Po implementacji |
|---------|------------------|
| Faza 15 | `WYKONANY` (gate + HOW z tego feature planu) |
| MILESTONE 15 | **nie tworzyć** / nie oznaczać |
| Faza 5 / 5.2 | bez zmian (`WYKONANY` — historia) |
| MILESTONE 5 | bez zmian (`OSIĄGNIĘTY`) |

Edycja pliku major — **poza** tą sesją (ręcznie lub w `/feature-implementation` na życzenie).

---

## Checklist sesji planu

| Pozycja | Status |
|---------|--------|
| Kotwica Faza 15 + bramka ścieżki wstecz | OK |
| Grandfathering docs bez FM: `docs/README.md` | potwierdzone (ta sesja) |
| Pass rozwojowy | adapter revoke → use-case 401 → testy; brak innych przesunięć |
| Refaktory `teraz → zamień na` | tak |
| Commit message EN Conventional Commits | koniec FAZA 1 |
| Major / docs / SPEC nietknięte | tak |
