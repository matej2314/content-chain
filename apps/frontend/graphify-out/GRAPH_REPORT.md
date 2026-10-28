# Graph Report - frontend  (2026-10-28)

## Corpus Check
- 138 files · ~38,271 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: .ico 1, .css 1)

## Summary
- 843 nodes · 2324 edges · 30 communities
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 31 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `023cb7d6`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- runs.types.ts
- users-view.tsx
- company-context-form.tsx
- run-details-view.tsx
- cn
- archive-runs-view.tsx
- start-run-form.tsx
- accept-invite-form.tsx
- run-result-view.tsx
- home-entry.tsx
- feedback-form.tsx
- register-form.tsx
- notify-product.tsx
- route.ts
- gateway-alive-provider.tsx
- parse-verifier-log-message.ts
- envelope.ts
- health.api.ts
- app-sidebar.tsx
- session-provider.tsx
- auth.api.ts
- dashboard-shell.tsx
- chrome-slots.tsx
- AccountEmailForm
- EnvelopeError
- apiFetch
- registration-thank-you.tsx
- completeness-provider.tsx
- event-source-registry-provider.tsx

## God Nodes (most connected - your core abstractions)
1. `isRecord()` - 69 edges
2. `cn()` - 65 edges
3. `apiFetch()` - 49 edges
4. `useSession()` - 31 edges
5. `Button()` - 30 edges
6. `ApiError` - 28 edges
7. `EnvelopeError()` - 23 edges
8. `CompanyContextForm()` - 20 edges
9. `StartRunForm()` - 15 edges
10. `FormField()` - 14 edges

## Surprising Connections (you probably didn't know these)
- `CardDescription()` --calls--> `cn()`  [EXTRACTED]
  src/shared/ui/card.tsx → src/shared/utils/utils.ts
- `CardAction()` --calls--> `cn()`  [EXTRACTED]
  src/shared/ui/card.tsx → src/shared/utils/utils.ts
- `CardFooter()` --calls--> `cn()`  [EXTRACTED]
  src/shared/ui/card.tsx → src/shared/utils/utils.ts
- `DialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  src/shared/ui/dialog.tsx → src/shared/utils/utils.ts
- `handle()` --calls--> `proxyToApi()`  [EXTRACTED]
  src/app/api/v1/[[...path]]/route.ts → src/shared/api/bff-proxy.ts

## Import Cycles
- None detected.

## Communities (30 total, 0 thin omitted)

### Community 0 - "runs.types.ts"
Cohesion: 0.05
Nodes (85): ArchiveRunsQuery, fetchRunsSummary(), fetchUserRuns(), UserRunsPageQuery, HitlAccepted, isPageOutlineSectionRole(), isReelDuration(), PageOutlineSection (+77 more)

### Community 1 - "users-view.tsx"
Cohesion: 0.05
Nodes (66): metadata, logoutSession(), GuestLimitModal(), GuestLimitModalProps, CancelRunDialogProps, FALLBACK, RunResultEditActions(), RunResultEditActionsProps (+58 more)

### Community 2 - "company-context-form.tsx"
Cohesion: 0.05
Nodes (72): metadata, fetchCompanyContext(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras, companyContextForPut() (+64 more)

### Community 3 - "run-details-view.tsx"
Cohesion: 0.06
Nodes (53): metadata, AccountEmailFormState, useSession(), useGuestLocked(), buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload() (+45 more)

### Community 4 - "cn"
Cohesion: 0.06
Nodes (48): PAGE_OUTLINE_SECTION_ROLES, PageOutlineSectionRole, ReelDurationSeconds, ReelScript, ReelScriptSegment, SocialContent, RunLiveHero(), RunLiveHeroProps (+40 more)

### Community 5 - "archive-runs-view.tsx"
Cohesion: 0.07
Nodes (41): metadata, CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS, RUN_TASK_TYPE_LABELS, fetchArchiveRuns() (+33 more)

### Community 6 - "start-run-form.tsx"
Cohesion: 0.10
Nodes (32): metadata, GUEST_ALLOWED_TASK_TYPES, GUEST_CONTACTS, GUEST_QUOTA_CODES, GuestAllowedTaskType, GuestContact, GuestQuotaCode, isGuestAllowedTaskType() (+24 more)

### Community 7 - "accept-invite-form.tsx"
Cohesion: 0.09
Nodes (28): AcceptInvitePage(), metadata, tokenFromSearchParam(), ACCEPT_INVITE_DEMO_HINT, ACCEPT_INVITE_UNAUTHORIZED_HINT, AcceptInviteFormError, toAcceptInviteFormError(), acceptInvite() (+20 more)

### Community 8 - "run-result-view.tsx"
Cohesion: 0.07
Nodes (21): PAGE_OUTLINE_ROLE_LABELS, submitHitl(), PageDocument, PageOutline, ReelIdea, SocialIdea, FALLBACK, HitlPanel() (+13 more)

### Community 9 - "home-entry.tsx"
Cohesion: 0.11
Nodes (21): ACTIVATION_FAILED_HINT, AuthModal(), AuthModalProps, AuthMode, descriptionFor(), titleFor(), AuthUi, GuestSurface (+13 more)

### Community 10 - "feedback-form.tsx"
Cohesion: 0.16
Nodes (18): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, filterFeedbackRunOptions(), CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody() (+10 more)

### Community 11 - "register-form.tsx"
Cohesion: 0.20
Nodes (16): bootstrapAdmin(), registerAccount(), BootstrapAdminForm(), onSubmit(), BootstrapAdminFormProps, BootstrapAdminFormState, INITIAL_STATE, INITIAL_STATE (+8 more)

### Community 12 - "notify-product.tsx"
Cohesion: 0.17
Nodes (15): assertNever(), notifyProduct(), notifyRunCancelled(), notifyRunTerminal(), EnvelopeRef, ProductToast, RunTerminalInput, RunTerminalOutcome (+7 more)

### Community 13 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 14 - "gateway-alive-provider.tsx"
Cohesion: 0.23
Nodes (13): GATE_SECTION_LABELS, CompletenessChip(), useCompleteness(), FALLBACK_ENVELOPE, GatewayAliveContext, GatewayAliveContextValue, GatewayAliveState, useGatewayAlive() (+5 more)

### Community 15 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 16 - "envelope.ts"
Cohesion: 0.23
Nodes (9): fetchAppConfig(), AppConfig, parseAppConfig(), DemoModeContext, DemoModeContextValue, DemoModeProvider(), FALLBACK_ENVELOPE, ApiError (+1 more)

### Community 17 - "health.api.ts"
Cohesion: 0.27
Nodes (11): fetchGatewayAlive(), fetchHealthReady(), HealthCheck, HealthCheckStatus, HealthReadyAggregate, HealthReadyResponse, isGatewayAlive(), isRecord() (+3 more)

### Community 18 - "app-sidebar.tsx"
Cohesion: 0.19
Nodes (8): AppHeader(), AppSidebar(), AppSidebarProps, CompletenessChipSlot(), SidebarBrandMark(), APP_NAV, AppNavItem, navItemsForRole()

### Community 19 - "session-provider.tsx"
Cohesion: 0.20
Nodes (9): geistMono, inter, metadata, spaceGrotesk, SessionContext, SessionContextValue, SessionProvider(), SessionState (+1 more)

### Community 20 - "auth.api.ts"
Cohesion: 0.30
Nodes (10): activateAccount(), Credentials, fetchBootstrapStatus(), parseAuthUserWrapper(), parseRegisteredUser(), parseRegisteredUserWrapper(), parseSessionUser(), RegisteredUser (+2 more)

### Community 21 - "dashboard-shell.tsx"
Cohesion: 0.24
Nodes (6): DashboardShell(), Toaster(), Tooltip(), TooltipContent(), TooltipProvider(), TooltipTrigger()

### Community 22 - "chrome-slots.tsx"
Cohesion: 0.27
Nodes (8): DemoChip(), useDemoMode(), FeedbackCta(), FloatingRunsBox(), handleChevronClick(), toggleCollapsed(), FeedbackCtaSlot(), FloatingBoxSlot()

### Community 23 - "AccountEmailForm"
Cohesion: 0.39
Nodes (7): fetchUserSession(), patchOwnEmail(), AccountEmailForm(), onAccountSubmit(), onConfirm(), onModalSubmit(), openReauthModal()

### Community 24 - "EnvelopeError"
Cohesion: 0.32
Nodes (7): loginWithPassword(), INITIAL_LOGIN_CARD_STATE, LoginCard(), onSubmit(), LoginCardProps, LoginCardState, EnvelopeError()

### Community 25 - "apiFetch"
Cohesion: 0.43
Nodes (7): apiFetch(), ApiFetchOptions, parseBody(), refreshSession(), toApiError(), UnauthorizedHandler, parseApiErrorEnvelope()

### Community 26 - "registration-thank-you.tsx"
Cohesion: 0.38
Nodes (6): resendActivation(), initialState, RegistrationThankYou(), onResend(), RegistrationThankYouProps, RegistrationThankYouState

### Community 27 - "completeness-provider.tsx"
Cohesion: 0.33
Nodes (6): fetchCompleteness(), CompletenessState, CompletenessContext, CompletenessContextValue, CompletenessProvider(), FALLBACK_ENVELOPE

### Community 28 - "event-source-registry-provider.tsx"
Cohesion: 0.43
Nodes (5): EventSourceRegistryContext, EventSourceRegistryProvider(), createEventSourceRegistry(), EventSourceRegistry, RegistryEntry

## Knowledge Gaps
- **186 isolated node(s):** `metadata`, `metadata`, `metadata`, `metadata`, `metadata` (+181 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 236 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `isRecord()` connect `runs.types.ts` to `users-view.tsx`, `company-context-form.tsx`, `run-details-view.tsx`, `feedback-form.tsx`, `envelope.ts`, `auth.api.ts`, `apiFetch`?**
  _High betweenness centrality (0.076) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `users-view.tsx`, `company-context-form.tsx`, `archive-runs-view.tsx`, `accept-invite-form.tsx`, `dashboard-shell.tsx`, `EnvelopeError`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._
- **Why does `Button()` connect `users-view.tsx` to `company-context-form.tsx`, `run-details-view.tsx`, `cn`, `archive-runs-view.tsx`, `start-run-form.tsx`, `accept-invite-form.tsx`, `run-result-view.tsx`, `home-entry.tsx`, `feedback-form.tsx`, `register-form.tsx`, `EnvelopeError`, `registration-thank-you.tsx`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **What connects `metadata`, `metadata`, `metadata` to the rest of the system?**
  _186 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `runs.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05318352059925094 - nodes in this community are weakly interconnected._
- **Should `users-view.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05499316005471956 - nodes in this community are weakly interconnected._
- **Should `company-context-form.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05350140056022409 - nodes in this community are weakly interconnected._