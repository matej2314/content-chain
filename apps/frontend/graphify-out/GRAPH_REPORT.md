# Graph Report - frontend  (2026-10-19)

## Corpus Check
- 134 files · ~36,616 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .css 1)

## Summary
- 818 nodes · 2250 edges · 28 communities
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 29 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f662c284`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- cn
- users-view.tsx
- run-review-panel.tsx
- apiFetch
- button.tsx
- isRecord
- company-context-form.tsx
- start-run-form.tsx
- runs.types.ts
- company-context.types.ts
- app-header.tsx
- cancel-run-dialog.tsx
- feedback-form.tsx
- run-result-view.tsx
- run-details-view.tsx
- route.ts
- company-context-view.tsx
- home-entry.tsx
- dashboard-shell.tsx
- accept-invite-form.tsx
- gate-completeness-dot.tsx
- is-complete.ts
- form-field.tsx
- page-document-body.tsx
- hitl-panel.tsx
- parse-verifier-log-message.ts
- result-edit-payload.ts
- archive-runs-view.tsx

## God Nodes (most connected - your core abstractions)
1. `isRecord()` - 67 edges
2. `cn()` - 65 edges
3. `apiFetch()` - 47 edges
4. `Button()` - 30 edges
5. `useSession()` - 29 edges
6. `ApiError` - 27 edges
7. `EnvelopeError()` - 23 edges
8. `CompanyContextForm()` - 20 edges
9. `StartRunForm()` - 15 edges
10. `parseRunResult()` - 13 edges

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

## Communities (28 total, 0 thin omitted)

### Community 0 - "cn"
Cohesion: 0.12
Nodes (18): DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut(), DropdownMenuSubContent() (+10 more)

### Community 1 - "users-view.tsx"
Cohesion: 0.07
Nodes (45): metadata, createInvitation(), fetchInvitations(), resendInvitation(), revokeInvitation(), InvitationListItem, InviteCreated, isInvitationExpired() (+37 more)

### Community 2 - "run-review-panel.tsx"
Cohesion: 0.18
Nodes (15): canEditResult(), finalizeRunReview(), isUserRating(), patchRunRating(), UserRating, isReviewableRunStatus(), canEditSnapshot(), canReviewSnapshot() (+7 more)

### Community 3 - "apiFetch"
Cohesion: 0.06
Nodes (57): geistMono, inter, metadata, spaceGrotesk, activateAccount(), bootstrapAdmin(), Credentials, fetchBootstrapStatus() (+49 more)

### Community 4 - "button.tsx"
Cohesion: 0.14
Nodes (17): CONTENT_KIND_LABELS, LANGUAGE_LABELS, PAGE_OUTLINE_ROLE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS, RUN_TASK_TYPE_LABELS, PageOutlineSectionRole (+9 more)

### Community 5 - "isRecord"
Cohesion: 0.22
Nodes (24): isPageOutlineSectionRole(), isReelDuration(), PageOutlineSection, parseArray(), parseCharacterCount(), parseHashtags(), parseHitlAccepted(), parseOptionalCta() (+16 more)

### Community 6 - "company-context-form.tsx"
Cohesion: 0.13
Nodes (22): audienceProfileHeading(), benefitCountLabel(), caseStudyHeading(), commaToList(), CompanyContextForm(), CompanyContextFormProps, ctaItemHeading(), EXTRAS_SUB_TAB_LABELS (+14 more)

### Community 7 - "start-run-form.tsx"
Cohesion: 0.10
Nodes (33): metadata, fetchCompanyContext(), GUEST_ALLOWED_TASK_TYPES, GUEST_CONTACTS, GUEST_QUOTA_CODES, GuestAllowedTaskType, GuestContact, GuestQuotaCode (+25 more)

### Community 8 - "runs.types.ts"
Cohesion: 0.08
Nodes (42): ArchiveRunsQuery, fetchRunsSummary(), fetchUserRuns(), HitlAccepted, parseNullableIso(), parseReviewFields(), RunHitl, RunReviewFields (+34 more)

### Community 9 - "company-context.types.ts"
Cohesion: 0.16
Nodes (17): CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CONTEXT_TABS, DEFAULT_CONTEXT_TAB, EXTRAS_KEYS, isGateSection(), parseAudienceProfile() (+9 more)

### Community 10 - "app-header.tsx"
Cohesion: 0.17
Nodes (12): AppHeader(), AppHeaderProps, AppSidebar(), AppSidebarProps, CompletenessChipSlot(), APP_NAV, AppNavItem, navItemsForRole() (+4 more)

### Community 11 - "cancel-run-dialog.tsx"
Cohesion: 0.07
Nodes (42): logoutSession(), AuthModal(), AuthModalProps, descriptionFor(), titleFor(), RegisterSuccess, GuestLimitModal(), GuestLimitModalProps (+34 more)

### Community 12 - "feedback-form.tsx"
Cohesion: 0.19
Nodes (15): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody(), parseFeedbackCreated() (+7 more)

### Community 13 - "run-result-view.tsx"
Cohesion: 0.12
Nodes (9): filterFeedbackRunOptions(), PageDocument, ReelScript, runResultHasArtifacts(), SocialContent, UserRunItem, ideaTitle(), RunResultView() (+1 more)

### Community 14 - "run-details-view.tsx"
Cohesion: 0.07
Nodes (39): metadata, useSession(), useGuestLocked(), fetchRunLogs(), isCancelableRunStatus(), isLiveRunStatus(), isTerminalRunStatus(), parseSseStatusData() (+31 more)

### Community 15 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 16 - "company-context-view.tsx"
Cohesion: 0.19
Nodes (15): metadata, putCompanyContext(), CompanyContext, companyContextForPut(), CompanyContextPayload, Completeness, extrasForPut(), nonEmpty() (+7 more)

### Community 17 - "home-entry.tsx"
Cohesion: 0.11
Nodes (20): ACTIVATION_FAILED_HINT, resendActivation(), AuthMode, AuthUi, GuestSurface, HomeEntry(), initialAuth, initialState (+12 more)

### Community 18 - "dashboard-shell.tsx"
Cohesion: 0.06
Nodes (43): fetchCompleteness(), CompletenessState, GATE_SECTION_LABELS, CompletenessChip(), CompletenessContext, CompletenessContextValue, CompletenessProvider(), FALLBACK_ENVELOPE (+35 more)

### Community 19 - "accept-invite-form.tsx"
Cohesion: 0.07
Nodes (37): AcceptInvitePage(), metadata, tokenFromSearchParam(), ACCEPT_INVITE_DEMO_HINT, ACCEPT_INVITE_UNAUTHORIZED_HINT, AcceptInviteFormError, toAcceptInviteFormError(), acceptInvite() (+29 more)

### Community 20 - "gate-completeness-dot.tsx"
Cohesion: 0.33
Nodes (6): CONTEXT_TAB_LABELS, ContextTab, GateSection, gateTabIsMissing(), GateCompletenessDot(), GateCompletenessDotProps

### Community 21 - "is-complete.ts"
Cohesion: 0.20
Nodes (16): AudienceProfile, CtaItem, GATE_SECTIONS, OfferItem, areAudienceProfileNamesUnique(), isDuplicateAudienceProfileName(), normalizeAudienceProfileName(), audienceProfileFieldErrors (+8 more)

### Community 22 - "form-field.tsx"
Cohesion: 0.13
Nodes (15): PAGE_OUTLINE_SECTION_ROLES, ReelDurationSeconds, ReelScriptSegment, ContentFields(), DURATIONS, patchScriptSegment(), ReelScriptFields(), RunResultEditor() (+7 more)

### Community 23 - "page-document-body.tsx"
Cohesion: 0.47
Nodes (5): MdBlock, PageDocumentBody(), PageDocumentBodyProps, parseMarkdownBlocks(), renderInline()

### Community 25 - "hitl-panel.tsx"
Cohesion: 0.18
Nodes (11): submitHitl(), PageOutline, ReelIdea, SocialIdea, FALLBACK, HitlPanel(), send(), HitlPanelProps (+3 more)

### Community 26 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 32 - "result-edit-payload.ts"
Cohesion: 0.15
Nodes (17): buildOutputEditedBody(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload(), RESULT_KEYS_BY_TASK_TYPE (+9 more)

### Community 33 - "archive-runs-view.tsx"
Cohesion: 0.13
Nodes (16): metadata, fetchArchiveRuns(), fetchInitiatorOptions(), InitiatorOption, ArchiveRunsPage, ArchiveListState, ArchiveQueryAction, archiveQueryReducer() (+8 more)

## Knowledge Gaps
- **179 isolated node(s):** `metadata`, `metadata`, `metadata`, `metadata`, `metadata` (+174 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 227 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `isRecord()` connect `isRecord` to `result-edit-payload.ts`, `users-view.tsx`, `run-review-panel.tsx`, `apiFetch`, `start-run-form.tsx`, `runs.types.ts`, `company-context.types.ts`, `feedback-form.tsx`, `run-details-view.tsx`, `accept-invite-form.tsx`?**
  _High betweenness centrality (0.076) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `apiFetch`, `button.tsx`, `company-context-form.tsx`, `app-header.tsx`, `cancel-run-dialog.tsx`, `home-entry.tsx`, `dashboard-shell.tsx`, `accept-invite-form.tsx`, `gate-completeness-dot.tsx`, `form-field.tsx`?**
  _High betweenness centrality (0.072) - this node is a cross-community bridge._
- **Why does `Button()` connect `button.tsx` to `cn`, `archive-runs-view.tsx`, `run-review-panel.tsx`, `apiFetch`, `users-view.tsx`, `company-context-form.tsx`, `start-run-form.tsx`, `app-header.tsx`, `cancel-run-dialog.tsx`, `feedback-form.tsx`, `run-details-view.tsx`, `home-entry.tsx`, `accept-invite-form.tsx`, `hitl-panel.tsx`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **What connects `metadata`, `metadata`, `metadata` to the rest of the system?**
  _179 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `cn` be split into smaller, more focused modules?**
  _Cohesion score 0.12307692307692308 - nodes in this community are weakly interconnected._
- **Should `users-view.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06954887218045112 - nodes in this community are weakly interconnected._
- **Should `apiFetch` be split into smaller, more focused modules?**
  _Cohesion score 0.06338028169014084 - nodes in this community are weakly interconnected._