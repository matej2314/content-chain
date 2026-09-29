# Graph Report - frontend  (2026-09-18)

## Corpus Check
- 59 files · ~13,529 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: (none) 3, .css 1)

## Summary
- 338 nodes · 838 edges · 14 communities
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 10 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3e82616a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- cn
- session-provider.tsx
- company-context.types.ts
- dashboard-shell.tsx
- company-context-form.tsx
- runs.types.ts
- route.ts
- run-details-view.tsx
- own-runs-provider.tsx
- start-run-form.tsx
- logout-dialog.tsx
- acceptInvite
- runs.api.ts

## God Nodes (most connected - your core abstractions)
1. `cn()` - 60 edges
2. `isRecord()` - 32 edges
3. `apiFetch()` - 22 edges
4. `useSession()` - 17 edges
5. `useRunEventSource()` - 12 edges
6. `ApiError` - 12 edges
7. `Button()` - 11 edges
8. `RunDetailsView()` - 10 edges
9. `EnvelopeError()` - 9 edges
10. `CompanyContextForm()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `DialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  src/shared/ui/dialog.tsx → src/shared/utils/utils.ts
- `UsersPage()` --calls--> `useSession()`  [EXTRACTED]
  src/app/(app)/users/page.tsx → src/modules/auth/components/session-provider.tsx
- `handle()` --calls--> `proxyToApi()`  [EXTRACTED]
  src/app/api/v1/[[...path]]/route.ts → src/shared/api/bff-proxy.ts
- `fetchBootstrapStatus()` --calls--> `isRecord()`  [EXTRACTED]
  src/modules/auth/api/auth.api.ts → src/shared/api/envelope.ts
- `logoutSession()` --calls--> `apiFetch()`  [EXTRACTED]
  src/modules/auth/api/auth.api.ts → src/shared/api/api-fetch.ts

## Import Cycles
- None detected.

## Communities (14 total, 0 thin omitted)

### Community 0 - "cn"
Cohesion: 0.07
Nodes (44): AcceptInviteFormProps, AppHeaderProps, AppSidebar(), AppSidebarProps, APP_NAV, AppNavItem, navItemsForRole(), Button() (+36 more)

### Community 1 - "session-provider.tsx"
Cohesion: 0.09
Nodes (34): geistMono, geistSans, metadata, bootstrapAdmin(), Credentials, fetchBootstrapStatus(), fetchUserSession(), loginWithPassword() (+26 more)

### Community 2 - "company-context.types.ts"
Cohesion: 0.11
Nodes (32): fetchCompanyContext(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, companyContextForPut(), CompanyContextObjection, CompanyContextPayload (+24 more)

### Community 3 - "dashboard-shell.tsx"
Cohesion: 0.09
Nodes (19): UsersPage(), HomeEntry(), useSession(), GATE_SECTION_LABELS, CompletenessChip(), useCompleteness(), fetchUserRuns(), OwnRunsProvider() (+11 more)

### Community 4 - "company-context-form.tsx"
Cohesion: 0.12
Nodes (21): CompanyContextExtras, CONTEXT_TAB_LABELS, ContextTab, DEFAULT_CONTEXT_TAB, GATE_SECTIONS, GateSection, gateTabIsMissing(), commaToList() (+13 more)

### Community 5 - "runs.types.ts"
Cohesion: 0.12
Nodes (25): fetchArchiveRuns(), ArchiveRunItem, ContentBrief, isRunLogLevel(), LIVE_RUN_STATUSES, LiveRunStatus, LOG_LEVELS, omitEmptyBrief() (+17 more)

### Community 6 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 7 - "run-details-view.tsx"
Cohesion: 0.18
Nodes (14): CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS, RUN_TASK_TYPE_LABELS, useOwnRuns(), DetailsState (+6 more)

### Community 8 - "own-runs-provider.tsx"
Cohesion: 0.19
Nodes (15): fetchRunSnapshot(), isLiveRunStatus(), isTerminalRunStatus(), parseRunLogItem(), parseSseStatusData(), UserRunItem, FALLBACK, LiveItemSubscription() (+7 more)

### Community 9 - "start-run-form.tsx"
Cohesion: 0.18
Nodes (11): startRun(), parseStartRunAccepted(), RunSnapshot, StartRunInput, AccountStartSection(), EMPTY_START_DRAFT, StartRunDraft, StartRunForm() (+3 more)

### Community 10 - "logout-dialog.tsx"
Cohesion: 0.19
Nodes (11): logoutSession(), LogoutDialog(), confirm(), LogoutDialogProps, Dialog(), DialogContent(), DialogDescription(), DialogFooter() (+3 more)

### Community 11 - "acceptInvite"
Cohesion: 0.32
Nodes (5): AcceptInvitePageProps, acceptInvite(), AcceptInviteForm(), onSubmit(), passwordMeetsPolicy()

### Community 12 - "runs.api.ts"
Cohesion: 0.29
Nodes (7): ArchiveRunsQuery, fetchRunLogs(), InitiatorOption, ArchiveRunsPage, parseRunLogs(), RunLogItem, StartRunAccepted

## Knowledge Gaps
- **65 isolated node(s):** `dynamic`, `runtime`, `RouteContext`, `GET`, `POST` (+60 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 91 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `logout-dialog.tsx`, `dashboard-shell.tsx`, `company-context-form.tsx`, `run-details-view.tsx`?**
  _High betweenness centrality (0.162) - this node is a cross-community bridge._
- **Why does `isRecord()` connect `company-context.types.ts` to `session-provider.tsx`, `runs.types.ts`, `own-runs-provider.tsx`, `start-run-form.tsx`, `runs.api.ts`?**
  _High betweenness centrality (0.074) - this node is a cross-community bridge._
- **Why does `useSession()` connect `dashboard-shell.tsx` to `cn`, `session-provider.tsx`, `company-context.types.ts`, `run-details-view.tsx`, `own-runs-provider.tsx`, `logout-dialog.tsx`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **What connects `dynamic`, `runtime`, `RouteContext` to the rest of the system?**
  _65 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `cn` be split into smaller, more focused modules?**
  _Cohesion score 0.06993006993006994 - nodes in this community are weakly interconnected._
- **Should `session-provider.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08970099667774087 - nodes in this community are weakly interconnected._
- **Should `company-context.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1106612685560054 - nodes in this community are weakly interconnected._