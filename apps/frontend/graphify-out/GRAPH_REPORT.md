# Graph Report - frontend  (2026-09-29)

## Corpus Check
- 99 files · ~26,330 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .css 1)

## Summary
- 597 nodes · 1653 edges · 16 communities
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 28 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `03229372`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- cn
- users-view.tsx
- company-context.types.ts
- dashboard-shell.tsx
- isRecord
- runs.types.ts
- route.ts
- run-details-view.tsx
- own-runs-provider.tsx
- run-result-view.tsx
- cancel-run-dialog.tsx
- parse-verifier-log-message.ts
- runs.api.ts
- fetchArchiveRuns
- run-review-panel.tsx
- feedback.api.ts

## God Nodes (most connected - your core abstractions)
1. `cn()` - 62 edges
2. `isRecord()` - 60 edges
3. `apiFetch()` - 36 edges
4. `Button()` - 24 edges
5. `useSession()` - 21 edges
6. `ApiError` - 21 edges
7. `EnvelopeError()` - 19 edges
8. `parseRunResult()` - 13 edges
9. `CompanyContextForm()` - 12 edges
10. `fetchRunSnapshot()` - 12 edges

## Surprising Connections (you probably didn't know these)
- `DialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  src/shared/ui/dialog.tsx → src/shared/utils/utils.ts
- `handle()` --calls--> `proxyToApi()`  [EXTRACTED]
  src/app/api/v1/[[...path]]/route.ts → src/shared/api/bff-proxy.ts
- `fetchBootstrapStatus()` --calls--> `isRecord()`  [EXTRACTED]
  src/modules/auth/api/auth.api.ts → src/shared/api/envelope.ts
- `onSubmit()` --calls--> `patchOwnEmail()`  [EXTRACTED]
  src/modules/auth/components/account-email-form.tsx → src/modules/auth/api/auth.api.ts
- `confirm()` --calls--> `logoutSession()`  [EXTRACTED]
  src/modules/shell/components/logout-dialog.tsx → src/modules/auth/api/auth.api.ts

## Import Cycles
- None detected.

## Communities (16 total, 0 thin omitted)

### Community 0 - "cn"
Cohesion: 0.06
Nodes (41): metadata, acceptInvite(), AcceptInviteForm(), onSubmit(), AcceptInviteFormProps, passwordMeetsPolicy(), AppHeaderProps, AppSidebar() (+33 more)

### Community 1 - "users-view.tsx"
Cohesion: 0.06
Nodes (55): metadata, geistMono, geistSans, metadata, bootstrapAdmin(), Credentials, fetchBootstrapStatus(), fetchUserSession() (+47 more)

### Community 2 - "company-context.types.ts"
Cohesion: 0.05
Nodes (73): metadata, fetchCompanyContext(), fetchCompleteness(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras (+65 more)

### Community 3 - "dashboard-shell.tsx"
Cohesion: 0.17
Nodes (9): AppHeader(), FloatingBoxSlot(), DashboardShell(), EventSourceRegistryContext, EventSourceRegistryProvider(), createEventSourceRegistry(), EventSourceRegistry, RegistryEntry (+1 more)

### Community 4 - "isRecord"
Cohesion: 0.18
Nodes (28): isPageOutlineSectionRole(), isReelDuration(), PageOutlineSection, parseArray(), parseCharacterCount(), parseHashtags(), parseOptionalCta(), parsePageDocument() (+20 more)

### Community 5 - "runs.types.ts"
Cohesion: 0.11
Nodes (25): ArchiveRunItem, CANCELABLE_STATUSES, CancelableRunStatus, ContentBrief, LIVE_RUN_STATUSES, LiveRunStatus, LOG_LEVELS, omitEmptyBrief() (+17 more)

### Community 6 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 7 - "run-details-view.tsx"
Cohesion: 0.06
Nodes (61): metadata, metadata, FALLBACK, FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, FALLBACK, FeedbackFormProps, CONTENT_KIND_LABELS (+53 more)

### Community 8 - "own-runs-provider.tsx"
Cohesion: 0.18
Nodes (16): isLiveRunStatus(), isRunLogLevel(), isTerminalRunStatus(), parseRunLogItem(), parseSseStatusData(), RunLogItem, SseTerminalRunStatus, FALLBACK (+8 more)

### Community 9 - "run-result-view.tsx"
Cohesion: 0.06
Nodes (40): buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload() (+32 more)

### Community 10 - "cancel-run-dialog.tsx"
Cohesion: 0.06
Nodes (43): FeedbackCta(), assertNever(), notifyProduct(), notifyRunCancelled(), notifyRunTerminal(), EnvelopeRef, ProductToast, RunTerminalInput (+35 more)

### Community 11 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 12 - "runs.api.ts"
Cohesion: 0.18
Nodes (12): ArchiveRunsQuery, fetchRunLogs(), fetchUserRuns(), InitiatorOption, HitlAccepted, parseHitlAccepted(), ArchiveRunsPage, parseRunLogs() (+4 more)

### Community 13 - "fetchArchiveRuns"
Cohesion: 0.33
Nodes (5): metadata, fetchArchiveRuns(), fetchInitiatorOptions(), ArchiveRunsView(), load()

### Community 14 - "run-review-panel.tsx"
Cohesion: 0.22
Nodes (10): finalizeRunReview(), isUserRating(), patchRunRating(), UserRating, isReviewableRunStatus(), canReviewSnapshot(), FALLBACK, RunReviewPanel() (+2 more)

### Community 15 - "feedback.api.ts"
Cohesion: 0.27
Nodes (10): createFeedback(), filterFeedbackRunOptions(), CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody(), parseFeedbackCreated(), FeedbackForm() (+2 more)

## Knowledge Gaps
- **109 isolated node(s):** `metadata`, `metadata`, `metadata`, `metadata`, `metadata` (+104 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 151 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `company-context.types.ts`, `cancel-run-dialog.tsx`, `run-details-view.tsx`?**
  _High betweenness centrality (0.096) - this node is a cross-community bridge._
- **Why does `isRecord()` connect `isRecord` to `users-view.tsx`, `company-context.types.ts`, `runs.types.ts`, `own-runs-provider.tsx`, `run-result-view.tsx`, `cancel-run-dialog.tsx`, `runs.api.ts`, `run-review-panel.tsx`, `feedback.api.ts`?**
  _High betweenness centrality (0.091) - this node is a cross-community bridge._
- **Why does `Button()` connect `run-details-view.tsx` to `cn`, `users-view.tsx`, `company-context.types.ts`, `run-result-view.tsx`, `cancel-run-dialog.tsx`, `run-review-panel.tsx`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **What connects `metadata`, `metadata`, `metadata` to the rest of the system?**
  _109 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `cn` be split into smaller, more focused modules?**
  _Cohesion score 0.06412583182093164 - nodes in this community are weakly interconnected._
- **Should `users-view.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0627027027027027 - nodes in this community are weakly interconnected._
- **Should `company-context.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.050940438871473356 - nodes in this community are weakly interconnected._