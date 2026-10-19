# Graph Report - frontend  (2026-10-16)

## Corpus Check
- 125 files · ~34,531 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .css 1)

## Summary
- 778 nodes · 2165 edges · 39 communities
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 29 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `129820df`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- cn
- users-view.tsx
- run-review-panel.tsx
- session-provider.tsx
- archive-runs-view.tsx
- isRecord
- company-context-form.tsx
- start-run-form.tsx
- runs.types.ts
- company-context.types.ts
- apiFetch
- button.tsx
- feedback-form.tsx
- run-result-view.tsx
- own-runs-provider.tsx
- route.ts
- company-context-view.tsx
- login-card.tsx
- completeness-chip.tsx
- accept-invite-form.tsx
- register-form.tsx
- is-complete.ts
- runs-result.types.ts
- gateway-alive-provider.tsx
- use-run-details.ts
- hitl-panel.tsx
- parse-verifier-log-message.ts
- runs.api.ts
- notify-product.tsx
- auth.api.ts
- home-entry.tsx
- account-view.tsx
- result-edit-payload.ts
- ArchiveRunsView
- completeness-provider.tsx
- iso-date-time.tsx
- guest-policy.ts
- useOwnRuns
- CancelRunDialog

## God Nodes (most connected - your core abstractions)
1. `isRecord()` - 66 edges
2. `cn()` - 65 edges
3. `apiFetch()` - 46 edges
4. `Button()` - 29 edges
5. `useSession()` - 27 edges
6. `ApiError` - 27 edges
7. `EnvelopeError()` - 23 edges
8. `CompanyContextForm()` - 20 edges
9. `StartRunForm()` - 15 edges
10. `useGuestLocked()` - 13 edges

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

## Communities (39 total, 0 thin omitted)

### Community 0 - "cn"
Cohesion: 0.05
Nodes (49): DemoChip(), FeedbackCta(), AppHeader(), AppHeaderProps, AppSidebar(), AppSidebarProps, CompletenessChipSlot(), FeedbackCtaSlot() (+41 more)

### Community 1 - "users-view.tsx"
Cohesion: 0.08
Nodes (39): metadata, createInvitation(), fetchInvitations(), resendInvitation(), revokeInvitation(), InvitationListItem, InviteCreated, isInvitationExpired() (+31 more)

### Community 2 - "run-review-panel.tsx"
Cohesion: 0.08
Nodes (32): canEditResult(), finalizeRunReview(), isUserRating(), patchRunRating(), saveOutputEdited(), UserRating, isCancelableRunStatus(), isReviewableRunStatus() (+24 more)

### Community 3 - "session-provider.tsx"
Cohesion: 0.12
Nodes (23): geistMono, geistSans, metadata, fetchUserSession(), logoutSession(), patchOwnEmail(), AccountEmailForm(), onAccountSubmit() (+15 more)

### Community 4 - "archive-runs-view.tsx"
Cohesion: 0.15
Nodes (20): CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS, RUN_TASK_TYPE_LABELS, ArchiveListState, ArchiveQueryAction (+12 more)

### Community 5 - "isRecord"
Cohesion: 0.16
Nodes (27): isPageOutlineSectionRole(), isReelDuration(), parseArray(), parseCharacterCount(), parseHashtags(), parseNullableIso(), parseOptionalCta(), parsePageDocument() (+19 more)

### Community 6 - "company-context-form.tsx"
Cohesion: 0.13
Nodes (22): CONTEXT_TAB_LABELS, ContextTab, GateSection, gateTabIsMissing(), audienceProfileHeading(), benefitCountLabel(), caseStudyHeading(), commaToList() (+14 more)

### Community 7 - "start-run-form.tsx"
Cohesion: 0.15
Nodes (23): GuestLimitModal(), isGuestAllowedTaskType(), isGuestQuotaCode(), startRun(), parseStartRunAccepted(), EMPTY_START_DRAFT, INITIAL_START_STATE, StartRunDraft (+15 more)

### Community 8 - "runs.types.ts"
Cohesion: 0.11
Nodes (23): RunHitl, RunReviewFields, ArchiveRunItem, CANCELABLE_STATUSES, CancelableRunStatus, ContentBrief, LIVE_RUN_STATUSES, LiveRunStatus (+15 more)

### Community 9 - "company-context.types.ts"
Cohesion: 0.14
Nodes (19): CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CONTEXT_TABS, DEFAULT_CONTEXT_TAB, EXTRAS_KEYS, GATE_SECTION_LABELS, GATE_SECTIONS (+11 more)

### Community 10 - "apiFetch"
Cohesion: 0.17
Nodes (16): fetchAppConfig(), AppConfig, parseAppConfig(), DemoModeContext, DemoModeContextValue, DemoModeProvider(), DemoModeState, FALLBACK_ENVELOPE (+8 more)

### Community 11 - "button.tsx"
Cohesion: 0.25
Nodes (12): GuestLimitModalProps, CancelRunDialogProps, FALLBACK, Button(), buttonVariants, Dialog(), DialogContent(), DialogDescription() (+4 more)

### Community 12 - "feedback-form.tsx"
Cohesion: 0.17
Nodes (16): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody(), parseFeedbackCreated() (+8 more)

### Community 13 - "run-result-view.tsx"
Cohesion: 0.11
Nodes (10): PAGE_OUTLINE_ROLE_LABELS, PageDocument, MdBlock, PageDocumentBody(), PageDocumentBodyProps, parseMarkdownBlocks(), renderInline(), ideaTitle() (+2 more)

### Community 14 - "own-runs-provider.tsx"
Cohesion: 0.16
Nodes (16): isLiveRunStatus(), isRunLogLevel(), isTerminalRunStatus(), parseRunLogItem(), parseSseStatusData(), SseTerminalRunStatus, FALLBACK, LiveItemSubscription() (+8 more)

### Community 15 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 16 - "company-context-view.tsx"
Cohesion: 0.19
Nodes (15): metadata, putCompanyContext(), CompanyContext, companyContextForPut(), CompanyContextPayload, Completeness, extrasForPut(), nonEmpty() (+7 more)

### Community 17 - "login-card.tsx"
Cohesion: 0.16
Nodes (16): resendActivation(), INITIAL_LOGIN_CARD_STATE, LoginCardProps, LoginCardState, initialState, RegistrationThankYou(), onResend(), RegistrationThankYouProps (+8 more)

### Community 18 - "completeness-chip.tsx"
Cohesion: 0.20
Nodes (14): CompletenessChip(), useCompleteness(), GatewayAliveState, useGatewayAlive(), AGENTS_INACTIVE_COPY, agentsActiveDisableReason(), computeAgentsActive(), StartAgentDialog() (+6 more)

### Community 19 - "accept-invite-form.tsx"
Cohesion: 0.17
Nodes (13): AcceptInvitePage(), metadata, tokenFromSearchParam(), ACCEPT_INVITE_DEMO_HINT, ACCEPT_INVITE_UNAUTHORIZED_HINT, AcceptInviteFormError, toAcceptInviteFormError(), acceptInvite() (+5 more)

### Community 20 - "register-form.tsx"
Cohesion: 0.22
Nodes (15): bootstrapAdmin(), registerAccount(), BootstrapAdminForm(), onSubmit(), BootstrapAdminFormProps, BootstrapAdminFormState, INITIAL_STATE, INITIAL_STATE (+7 more)

### Community 21 - "is-complete.ts"
Cohesion: 0.21
Nodes (16): AudienceProfile, CtaItem, OfferItem, areAudienceProfileNamesUnique(), isDuplicateAudienceProfileName(), normalizeAudienceProfileName(), audienceProfileFieldErrors, canRemoveOfferItem() (+8 more)

### Community 22 - "runs-result.types.ts"
Cohesion: 0.17
Nodes (16): PAGE_OUTLINE_SECTION_ROLES, PageOutlineSection, PageOutlineSectionRole, ReelDurationSeconds, ReelScript, ReelScriptItem, ReelScriptSegment, RunResult (+8 more)

### Community 23 - "gateway-alive-provider.tsx"
Cohesion: 0.20
Nodes (14): fetchGatewayAlive(), fetchHealthReady(), HealthCheck, HealthCheckStatus, HealthReadyAggregate, HealthReadyResponse, isGatewayAlive(), isRecord() (+6 more)

### Community 24 - "use-run-details.ts"
Cohesion: 0.17
Nodes (11): metadata, fetchRunLogs(), parseRunLogs(), RunLogItem, RunDetailsView(), envelopeFromUnknown(), FALLBACK, RunDetailsState (+3 more)

### Community 25 - "hitl-panel.tsx"
Cohesion: 0.16
Nodes (12): submitHitl(), PageOutline, parseHitlAccepted(), ReelIdea, SocialIdea, FALLBACK, HitlPanel(), send() (+4 more)

### Community 26 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 27 - "runs.api.ts"
Cohesion: 0.18
Nodes (12): filterFeedbackRunOptions(), ArchiveRunsQuery, fetchUserRuns(), InitiatorOption, HitlAccepted, runResultHasArtifacts(), ArchiveRunsPage, parseUserRunItem() (+4 more)

### Community 28 - "notify-product.tsx"
Cohesion: 0.25
Nodes (11): assertNever(), notifyProduct(), notifyRunCancelled(), notifyRunTerminal(), EnvelopeRef, ProductToast, RunTerminalInput, RunTerminalOutcome (+3 more)

### Community 29 - "auth.api.ts"
Cohesion: 0.28
Nodes (11): activateAccount(), Credentials, loginWithPassword(), parseAuthUserWrapper(), parseRegisteredUser(), parseRegisteredUserWrapper(), parseSessionUser(), RegisteredUser (+3 more)

### Community 30 - "home-entry.tsx"
Cohesion: 0.24
Nodes (6): ACTIVATION_FAILED_HINT, fetchBootstrapStatus(), GuestView, HomeEntry(), HomeEntryInner(), RegisterSuccess

### Community 31 - "account-view.tsx"
Cohesion: 0.36
Nodes (7): metadata, fetchCompanyContext(), fetchRunSnapshot(), AccountView(), onPrefill(), PrefillErrorState, draftFromSnapshot()

### Community 32 - "result-edit-payload.ts"
Cohesion: 0.38
Nodes (9): buildOutputEditedBody(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload(), RESULT_KEYS_BY_TASK_TYPE (+1 more)

### Community 33 - "ArchiveRunsView"
Cohesion: 0.29
Nodes (6): metadata, fetchArchiveRuns(), fetchInitiatorOptions(), archiveQueryReducer(), ArchiveRunsView(), load()

### Community 34 - "completeness-provider.tsx"
Cohesion: 0.29
Nodes (7): fetchCompleteness(), CompletenessState, CompletenessContext, CompletenessContextValue, CompletenessProvider(), FALLBACK_ENVELOPE, ApiErrorEnvelope

### Community 35 - "iso-date-time.tsx"
Cohesion: 0.36
Nodes (6): DateTimeDisplayKind, formatIsoDateTime(), LIST_FORMAT, LOG_FORMAT, IsoDateTime(), IsoDateTimeProps

### Community 36 - "guest-policy.ts"
Cohesion: 0.29
Nodes (6): GUEST_ALLOWED_TASK_TYPES, GUEST_CONTACTS, GUEST_QUOTA_CODES, GuestAllowedTaskType, GuestContact, GuestQuotaCode

### Community 37 - "useOwnRuns"
Cohesion: 0.50
Nodes (5): FloatingRunsBox(), handleChevronClick(), toggleCollapsed(), MyRunsList(), useOwnRuns()

### Community 38 - "CancelRunDialog"
Cohesion: 1.00
Nodes (3): cancelRun(), CancelRunDialog(), confirm()

## Knowledge Gaps
- **171 isolated node(s):** `metadata`, `metadata`, `metadata`, `metadata`, `metadata` (+166 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 218 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `isRecord()` connect `isRecord` to `users-view.tsx`, `run-review-panel.tsx`, `start-run-form.tsx`, `runs.types.ts`, `company-context.types.ts`, `apiFetch`, `feedback-form.tsx`, `own-runs-provider.tsx`, `runs-result.types.ts`, `use-run-details.ts`, `hitl-panel.tsx`, `runs.api.ts`, `auth.api.ts`, `home-entry.tsx`?**
  _High betweenness centrality (0.080) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `archive-runs-view.tsx`, `company-context-form.tsx`, `button.tsx`, `feedback-form.tsx`, `login-card.tsx`, `completeness-chip.tsx`?**
  _High betweenness centrality (0.075) - this node is a cross-community bridge._
- **Why does `Button()` connect `button.tsx` to `cn`, `users-view.tsx`, `run-review-panel.tsx`, `session-provider.tsx`, `archive-runs-view.tsx`, `company-context-form.tsx`, `start-run-form.tsx`, `feedback-form.tsx`, `login-card.tsx`, `accept-invite-form.tsx`, `register-form.tsx`, `hitl-panel.tsx`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **What connects `metadata`, `metadata`, `metadata` to the rest of the system?**
  _171 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `cn` be split into smaller, more focused modules?**
  _Cohesion score 0.05092276144907724 - nodes in this community are weakly interconnected._
- **Should `users-view.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08418367346938775 - nodes in this community are weakly interconnected._
- **Should `run-review-panel.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08080808080808081 - nodes in this community are weakly interconnected._