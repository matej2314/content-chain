# Graph Report - content-chain  (2026-11-11)

## Corpus Check
- 741 files · ~290,166 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: .ico 1, .css 1)

## Summary
- 4875 nodes · 15826 edges · 138 communities (120 shown, 15 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 425 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2e9e7d06`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- register-user.use-case.ts
- get-run.use-case.ts
- company-context-form.tsx
- asProviderInstanceId
- GatewayConfig
- RunRecord
- AuthUserContext
- LoggingService
- packages_shared_dist_index
- anthropic/anthropic-tools.mapper.ts
- runs.types.ts
- ioredis-guest-quota.adapter.ts
- feedback-form.tsx
- prisma-run.adapter.ts
- packages_shared_dist_index_userid
- provider-error.mapper.ts
- result-edit-payload.ts
- ref_class_validator
- cli.module.ts
- chat.service.ts
- runs.api.ts
- provider-registry.service.ts
- configuration.ts
- UserRepository
- auth.api.ts
- cn
- branded.types.ts
- prisma-invitation.adapter.ts
- anthropic-response.mapper.ts
- ref_react
- HealthService
- ref_class_transformer
- PrometheusAppMetricsAdapter
- app-metrics.service.ts
- AnthropicMessagesRequestDto
- ref_nestjs_common
- domain/company-context.types.ts
- enums.ts
- api/src/app.module.ts
- redis-vector-store.adapter.ts
- sentry-ai-metrics.adapter.ts
- metrics.ts
- dashboard-shell.tsx
- ids.ts
- AnthropicContentBlockDto
- UsersController
- run.schemas.ts
- chat-completions.adapter.ts
- ref_nestjs_swagger
- google-tools.mapper.ts
- company-context.controller.ts
- .streamChat
- auth.schemas.ts
- HttpMetricsMiddleware
- OpenAiChatMessageDto
- OpenAiChatCompletionRequestDto
- should-include-redis-stack.ts
- archive-runs-view.tsx
- api/src/health/health.service.ts
- http-metrics.interceptor.ts
- domain/is-complete.ts
- AuthController
- app-metrics-backend.interface.ts
- health-readiness-response.dto.ts
- provider-instances.bootstrap.ts
- NoopAppMetricsAdapter
- model-manager.service.ts
- accept-invite-form.tsx
- EnvironmentVariables
- FileManagerService
- seed-cli.module.ts
- metrics.module.ts
- home-entry.tsx
- llm-hop.ts
- LogContext
- parse-verifier-log-message.ts
- PrometheusService
- responses.adapter.ts
- start-run-form.tsx
- isRecord
- .chat
- ClientEditCommand
- user-invited.template.ts
- SPEC — README
- run-sse.hub.ts
- HealthController
- llm-gateway.http.adapter.ts
- company-context.dto.ts
- ProviderEditCommand
- packages_shared_dist_index_createuserid
- openai-params-provider.mapper.ts
- ModelAlias
- wizard-orchestrator.service.ts
- social.graph.ts
- load-company-context-fixture.ts
- ChatParamsDto
- ProviderAddCommand
- route.ts
- llm-gateway-chat.log.ts
- ClientRemoveCommand
- StartRunDto
- exitWithAgentReport
- ModelEditCommand
- ProviderRemoveCommand
- packages_shared_dist_index_userrole
- HttpExceptionFilter
- env.validation.ts
- PublicConfigController
- HitlDto
- RunsModule
- .createMessage
- src/pagination.ts
- ClientAddCommand
- auth.module.ts
- JwtAuthGuard
- http/http-exception.filter.ts
- openai-models.controller.ts
- ConfigInitCommand
- Architektura
- assert-company-context-writable.ts
- save-output-edited.use-case.ts
- openai-messages-provider.mapper.ts
- CompanyContextRepository
- CompanyContextController
- src/index.ts
- Anty-patterny
- Brand types
- Przepływy danych
- Deployment
- Słownik
- Dokumentacja koncepcyjna
- Observability
- Bezpieczeństwo
- Testy
- UX Dashboard — Content Chain

## God Nodes (most connected - your core abstractions)
1. `ModelAlias` - 88 edges
2. `DomainException` - 84 edges
3. `ProviderInstanceId` - 81 edges
4. `LoggingService` - 73 edges
5. `isRecord()` - 69 edges
6. `asProviderInstanceId()` - 67 edges
7. `GatewayConfig` - 65 edges
8. `Env` - 65 edges
9. `cn()` - 65 edges
10. `AuthUserContext` - 62 edges

## Surprising Connections (you probably didn't know these)
- `toChatResponseDto()` --indirect_call--> `toGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/chat/dto/chat-response.dto.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `optionalEnvRefSchema` --calls--> `asEnvRef()`  [EXTRACTED]
  apps/ai-provider-gateway/src/config/gateway-config.schema.ts → apps/ai-provider-gateway/src/common/types/branded.types.ts
- `Request` --references--> `AuthUserContext`  [EXTRACTED]
  apps/api/src/shared/http/express.d.ts → apps/api/src/shared/types/auth-user-context.ts
- `send()` --calls--> `submitHitl()`  [EXTRACTED]
  apps/frontend/src/modules/runs/components/hitl-panel.tsx → apps/frontend/src/modules/runs/api/runs.api.ts
- `CardDescription()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/card.tsx → apps/frontend/src/shared/utils/utils.ts

## Import Cycles
- None detected.

## Communities (138 total, 15 thin omitted)

### Community 0 - "register-user.use-case.ts"
Cohesion: 0.04
Nodes (63): generateRefreshToken(), formatMailValidityLabel(), polishPlural(), InviteUserResult, inviteUserSchema, InviteUserUseCase, Inject, Injectable (+55 more)

### Community 1 - "get-run.use-case.ts"
Cohesion: 0.05
Nodes (34): CompositeRunResultReader, GetRunGuestAccess, GetRunOutput, RunResultReader, ContentBrief, SocialBrief, EmptyRunResultReader, Injectable (+26 more)

### Community 2 - "company-context-form.tsx"
Cohesion: 0.04
Nodes (82): metadata, metadata, fetchCompanyContext(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras (+74 more)

### Community 3 - "asProviderInstanceId"
Cohesion: 0.12
Nodes (34): assertInteractiveAllowed(), convertProvider(), CliAiProvider, ProviderPromptResult, ProviderPromptService, Injectable, ProviderCli, AddProviderInput (+26 more)

### Community 4 - "GatewayConfig"
Cohesion: 0.09
Nodes (14): KeyGenerateCommand, Command, Option, ClientManagerService, Injectable, normalizeGatewayConfigForWrite(), EnvPatchService, Injectable (+6 more)

### Community 5 - "RunRecord"
Cohesion: 0.07
Nodes (13): RunDispatchExecutor, isContentStartCommand(), isPlainRecord(), omitUndefinedDeep(), RunRecord, makeContentRun(), makeSocialRun(), makeSocialSnapshot() (+5 more)

### Community 6 - "AuthUserContext"
Cohesion: 0.08
Nodes (34): Body, HttpCode, Post, CreateFeedbackDto, IsIn, IsOptional, IsString, MaxLength (+26 more)

### Community 7 - "LoggingService"
Cohesion: 0.03
Nodes (65): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+57 more)

### Community 8 - "packages_shared_dist_index"
Cohesion: 0.03
Nodes (84): AutoFinalizeExpiredReviewsUseCase, Inject, Injectable, CancelRunUseCase, Inject, Injectable, FinalizeReviewUseCase, Inject (+76 more)

### Community 9 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.10
Nodes (39): toHttpException(), asPromptCacheCreationTokens(), asPromptCacheHitTokens(), anthropicModelRejectsSamplingParams(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent(), isAnthropicEffortLevel() (+31 more)

### Community 10 - "runs.types.ts"
Cohesion: 0.05
Nodes (56): notifyRunCancelled(), notifyRunTerminal(), EnvelopeRef, ProductToast, RunTerminalInput, RunTerminalOutcome, runTerminalToastId(), viewingRunIdFromPathname() (+48 more)

### Community 11 - "ioredis-guest-quota.adapter.ts"
Cohesion: 0.08
Nodes (20): isGuestTaskType(), RateRunUseCase, Inject, Injectable, GUEST_QUOTA, GuestQuotaAdmitResult, GuestQuotaPort, GuestQuotaModule (+12 more)

### Community 12 - "feedback-form.tsx"
Cohesion: 0.12
Nodes (25): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, filterFeedbackRunOptions(), CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody() (+17 more)

### Community 13 - "prisma-run.adapter.ts"
Cohesion: 0.06
Nodes (26): LightRunItem, ListLightRunsResult, ListRunsResult, RunSnapshot, RunSummaryAggregate, RunSummaryScope, RunStatsPort, RunLogEntry (+18 more)

### Community 14 - "packages_shared_dist_index_userid"
Cohesion: 0.04
Nodes (49): DeleteUserResult, DeleteUserUseCase, Inject, Injectable, CreateFeedbackUseCase, Inject, Injectable, agentKeySchema (+41 more)

### Community 15 - "provider-error.mapper.ts"
Cohesion: 0.20
Nodes (19): ApiErrorPayload, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isProviderRateLimitError(), isRateLimitStatus(), isServerError() (+11 more)

### Community 16 - "result-edit-payload.ts"
Cohesion: 0.12
Nodes (23): buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload() (+15 more)

### Community 17 - "ref_class_validator"
Cohesion: 0.16
Nodes (13): ChatWarningDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString, SseDonePayloadDto, SseDoneUsageDto, ApiPropertyOptional (+5 more)

### Community 18 - "cli.module.ts"
Cohesion: 0.06
Nodes (65): AgentReport, AgentReportStatus, PendingSecretsItem, loadAnswers(), collectPendingSecrets(), assertAgentHasAnswers(), CliMode, CliModeFlags (+57 more)

### Community 19 - "chat.service.ts"
Cohesion: 0.05
Nodes (81): SemanticStoreEmbedState, CachedChatResponse, CachedChatWarning, CachedFinishReason, CacheIdentityMessage, ChatCacheSource, ChatService, Injectable (+73 more)

### Community 20 - "runs.api.ts"
Cohesion: 0.07
Nodes (51): logoutSession(), ArchiveRunsQuery, fetchInitiatorOptions(), fetchRunLogs(), fetchRunsSummary(), fetchUserRuns(), fetchUserRunsPage(), finalizeRunReview() (+43 more)

### Community 21 - "provider-registry.service.ts"
Cohesion: 0.14
Nodes (13): clamp(), isOverrideKey(), resolveProviderCallOptions(), ChatValidationService, Injectable, OVERRIDE_KEYS, OverrideKey, UnsupportedProviderException (+5 more)

### Community 22 - "configuration.ts"
Cohesion: 0.07
Nodes (42): CliValidateOptions, ValidationFormatter, asSemanticCacheTtlSeconds(), collectInactiveProviderWarnings(), formatZodIssues(), validateGatewayConfig(), ValidationOptions, ValidationResult (+34 more)

### Community 23 - "UserRepository"
Cohesion: 0.05
Nodes (35): Inject, Inject, ListUsersUseCase, Inject, Injectable, Inject, Inject, AccountActivationRecord (+27 more)

### Community 24 - "auth.api.ts"
Cohesion: 0.08
Nodes (41): apps_frontend_src_app_globals, geistMono, inter, metadata, spaceGrotesk, activateAccount(), bootstrapAdmin(), Credentials (+33 more)

### Community 25 - "cn"
Cohesion: 0.06
Nodes (45): AppHeader(), AppHeaderProps, AppSidebar(), AppSidebarProps, CompletenessChipSlot(), SidebarBrandMark(), APP_NAV, AppNavItem (+37 more)

### Community 26 - "branded.types.ts"
Cohesion: 0.06
Nodes (57): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+49 more)

### Community 27 - "prisma-invitation.adapter.ts"
Cohesion: 0.17
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 28 - "anthropic-response.mapper.ts"
Cohesion: 0.08
Nodes (45): SseDoneEvent, fromGatewayToolCallDto(), asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto (+37 more)

### Community 29 - "ref_react"
Cohesion: 0.07
Nodes (53): metadata, loginWithPassword(), AccountEmailFormState, AuthModal(), AuthModalProps, descriptionFor(), titleFor(), INITIAL_LOGIN_CARD_STATE (+45 more)

### Community 30 - "HealthService"
Cohesion: 0.20
Nodes (4): HealthReadinessResponseDto, ApiProperty, HealthService, Injectable

### Community 31 - "ref_class_transformer"
Cohesion: 0.13
Nodes (15): ListRunsQueryDto, IsArray, IsIn, IsOptional, IsString, Transform, PaginationQueryDto, IsIn (+7 more)

### Community 32 - "PrometheusAppMetricsAdapter"
Cohesion: 0.14
Nodes (5): PrometheusAppMetricsAdapter, Injectable, resolveAppMetricsBackend(), AppProviderCallContext, AppProviderStreamScope

### Community 33 - "app-metrics.service.ts"
Cohesion: 0.12
Nodes (12): Inject, APP_METRICS_BACKEND, MetricsController, ApiOperation, ApiResponse, ApiTags, Controller, Get (+4 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.13
Nodes (19): AnthropicMessagesRequestDto, AnthropicThinkingDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+11 more)

### Community 35 - "ref_nestjs_common"
Cohesion: 0.03
Nodes (91): GATEWAY_CACHE_HEADER, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags, Body (+83 more)

### Community 36 - "domain/company-context.types.ts"
Cohesion: 0.16
Nodes (16): AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CtaItem, emptyCompanyContext(), OfferItem (+8 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (21): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+13 more)

### Community 38 - "api/src/app.module.ts"
Cohesion: 0.06
Nodes (68): CompanyContextModule, Module, ContentPipelineFacade, toOutcome(), Inject, Injectable, ContentRunExecutor, isCanonicalOutlineSelection() (+60 more)

### Community 39 - "redis-vector-store.adapter.ts"
Cohesion: 0.07
Nodes (33): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, EmbeddingCircuitBreaker, escapeRedisSearchTag(), normalizeEmbeddingModelForIndex(), semanticIndexName() (+25 more)

### Community 40 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.05
Nodes (49): AppModule, Module, CostUsd, ToolCallId, bootstrap(), NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan() (+41 more)

### Community 41 - "metrics.ts"
Cohesion: 0.07
Nodes (47): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional (+39 more)

### Community 42 - "dashboard-shell.tsx"
Cohesion: 0.06
Nodes (46): fetchCompleteness(), CompletenessState, CompletenessChip(), CompletenessContext, CompletenessContextValue, CompletenessProvider(), FALLBACK_ENVELOPE, useCompleteness() (+38 more)

### Community 43 - "ids.ts"
Cohesion: 0.09
Nodes (32): brand, ACCOUNT_ACTIVATION_ID_RE, AccountActivationId, CONV_ID_RE, ConversationId, createAccountActivationId(), createConversationId(), createFeedbackId() (+24 more)

### Community 44 - "AnthropicContentBlockDto"
Cohesion: 0.14
Nodes (14): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+6 more)

### Community 45 - "UsersController"
Cohesion: 0.10
Nodes (18): ReactivateUserUseCase, Inject, Injectable, PatchUserDto, ApiProperty, IsBoolean, ApiCookieAuth, ApiTags (+10 more)

### Community 46 - "run.schemas.ts"
Cohesion: 0.13
Nodes (15): contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, socialBriefSchema (+7 more)

### Community 47 - "chat-completions.adapter.ts"
Cohesion: 0.21
Nodes (18): asSystemFingerprint(), ChatCompletionsAdapterOptions, createChatCompletionsAdapter(), textStream(), mapTurnsToOpenAiMessages(), accumulateOpenAiStreamToolCallDeltas(), extractOpenAiStreamDeltaText(), finalizeOpenAiStreamToolCalls() (+10 more)

### Community 48 - "ref_nestjs_swagger"
Cohesion: 0.05
Nodes (56): ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString (+48 more)

### Community 49 - "google-tools.mapper.ts"
Cohesion: 0.15
Nodes (23): buildGenerationConfig(), createGoogleProvider(), getFinalToolCalls(), getStopReason(), textStream(), mapStopSequences(), mapThinkingBudgetToGeminiLevel(), extractFromLegacyFields() (+15 more)

### Community 50 - "company-context.controller.ts"
Cohesion: 0.21
Nodes (13): toPublicCompanyContext(), GetCompanyContextUseCase, Injectable, GetCompletenessUseCase, Injectable, PatchCompanyContextUseCase, Injectable, PutCompanyContextUseCase (+5 more)

### Community 51 - ".streamChat"
Cohesion: 0.13
Nodes (13): ChatStreamController, ApiBody, ApiOperation, ApiProduces, ApiResponse, ApiSecurity, ApiTags, Body (+5 more)

### Community 52 - "auth.schemas.ts"
Cohesion: 0.13
Nodes (14): ActivateAccountInput, activateAccountSchema, BootstrapAdminInput, bootstrapAdminSchema, LoginInput, loginSchema, PatchUserCommand, patchUserSchema (+6 more)

### Community 54 - "OpenAiChatMessageDto"
Cohesion: 0.16
Nodes (12): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+4 more)

### Community 55 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (19): IsStringOrArrayOfStrings(), OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray (+11 more)

### Community 56 - "should-include-redis-stack.ts"
Cohesion: 0.35
Nodes (10): getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis() (+2 more)

### Community 57 - "archive-runs-view.tsx"
Cohesion: 0.04
Nodes (71): metadata, metadata, useSession(), useGuestLocked(), CONTENT_KIND_LABELS, LANGUAGE_LABELS, PAGE_OUTLINE_ROLE_LABELS, RUN_PLATFORM_LABELS (+63 more)

### Community 58 - "api/src/health/health.service.ts"
Cohesion: 0.08
Nodes (28): GATEWAY_PROBE_TIMEOUT_MS, GatewayLivenessBody, GatewayLivenessProbe, GatewayLivenessProbeReason, GatewayLivenessProbeResult, isRecord(), parseGatewayLivenessBody(), probeFailureReason() (+20 more)

### Community 59 - "http-metrics.interceptor.ts"
Cohesion: 0.19
Nodes (11): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, gatewayErrorsTotal, httpRequestDurationSeconds, httpRequestsTotal (+3 more)

### Community 60 - "domain/is-complete.ts"
Cohesion: 0.30
Nodes (10): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, Completeness, collectGateItemPaths(), isCompleteAudienceProfile(), isCompleteCtaItem(), isCompleteOfferItem() (+2 more)

### Community 61 - "AuthController"
Cohesion: 0.06
Nodes (40): AuthController, ApiCookieAuth, ApiTags, Body, Controller, Get, HttpCode, Patch (+32 more)

### Community 62 - "app-metrics-backend.interface.ts"
Cohesion: 0.18
Nodes (10): healthStatusToGaugeValue(), AppRequestLabels, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus, HttpMethod, HttpRequestLabels (+2 more)

### Community 63 - "health-readiness-response.dto.ts"
Cohesion: 0.33
Nodes (8): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty, ApiPropertyOptional

### Community 64 - "provider-instances.bootstrap.ts"
Cohesion: 0.19
Nodes (12): GatewayProviderInstanceConfig, assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryFn (+4 more)

### Community 65 - "NoopAppMetricsAdapter"
Cohesion: 0.11
Nodes (3): NoopAppMetricsAdapter, Injectable, AppTokenUsage

### Community 66 - "model-manager.service.ts"
Cohesion: 0.08
Nodes (37): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, DEFAULT_MODELS, DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel() (+29 more)

### Community 67 - "accept-invite-form.tsx"
Cohesion: 0.07
Nodes (39): AcceptInvitePage(), metadata, tokenFromSearchParam(), ACCEPT_INVITE_DEMO_HINT, ACCEPT_INVITE_UNAUTHORIZED_HINT, AcceptInviteFormError, toAcceptInviteFormError(), acceptInvite() (+31 more)

### Community 68 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 69 - "FileManagerService"
Cohesion: 0.11
Nodes (9): ModelAddCommand, Command, Option, ConfigGeneratorService, Injectable, ConfigPersistenceService, Injectable, FileManagerService (+1 more)

### Community 70 - "seed-cli.module.ts"
Cohesion: 0.07
Nodes (25): AppModule, Module, bootstrap(), SeedCliModule, Module, SeedModule, Module, EnvModule (+17 more)

### Community 71 - "metrics.module.ts"
Cohesion: 0.17
Nodes (9): MetricsController, Controller, Get, Res, MetricsModule, Module, MetricsService, Inject (+1 more)

### Community 72 - "home-entry.tsx"
Cohesion: 0.08
Nodes (28): ACTIVATION_FAILED_HINT, fetchBootstrapStatus(), resendActivation(), AuthMode, AuthUi, GuestSurface, HomeEntry(), HomeEntryInner() (+20 more)

### Community 73 - "llm-hop.ts"
Cohesion: 0.08
Nodes (31): LlmGatewayError, LLM_GATEWAY_PORT, isRetryable(), RetryReason, RunExecuteOptions, isSocialRunRecord(), SocialRunRecord, isAbortError() (+23 more)

### Community 74 - "LogContext"
Cohesion: 0.05
Nodes (30): GlobalExceptionFilter, isPayloadTooLargeError(), Catch, Injectable, ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter (+22 more)

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "PrometheusService"
Cohesion: 0.20
Nodes (4): PrometheusService, Injectable, PrometheusMetrics, ref_prom_client

### Community 77 - "responses.adapter.ts"
Cohesion: 0.26
Nodes (16): asToolCallId(), buildResponsesCreateParams(), createResponsesAdapter(), textStream(), mapGatewayMetadataToOpenAi(), extractResponsesToolCalls(), mapResponsesStopReason(), parseOpenAiResponse() (+8 more)

### Community 78 - "start-run-form.tsx"
Cohesion: 0.08
Nodes (38): GuestLimitModal(), GUEST_ALLOWED_TASK_TYPES, GUEST_CONTACTS, GUEST_QUOTA_CODES, GuestAllowedTaskType, GuestContact, GuestQuotaCode, isGuestAllowedTaskType() (+30 more)

### Community 79 - "isRecord"
Cohesion: 0.05
Nodes (60): isPageOutlineSectionRole(), isReelDuration(), PAGE_OUTLINE_SECTION_ROLES, PageDocument, PageOutline, PageOutlineSection, parseArray(), parseCharacterCount() (+52 more)

### Community 80 - ".chat"
Cohesion: 0.31
Nodes (3): LlmGatewayHttpAdapter, Inject, Injectable

### Community 81 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 82 - "user-invited.template.ts"
Cohesion: 0.18
Nodes (24): UserActivationMail, UserInvitedMail, UserWelcomeMail, ASSETS_DIR, BRAND_CID, resolveBrandCidAttachments(), escapeHtml(), MAIL_PALETTE (+16 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "run-sse.hub.ts"
Cohesion: 0.24
Nodes (5): RunSseEvent, InMemoryRunSseHub, Inject, Injectable, ref_rxjs

### Community 85 - "HealthController"
Cohesion: 0.31
Nodes (6): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get

### Community 86 - "llm-gateway.http.adapter.ts"
Cohesion: 0.17
Nodes (11): GatewayChatResponse, GatewayErrorBody, RETRYABLE_CODES, LlmGatewayPort, LlmChatCommand, LlmChatResult, GATEWAY_ERROR_CODE_LABELS, toGatewayErrorCodeLabel() (+3 more)

### Community 87 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 88 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 89 - "packages_shared_dist_index_createuserid"
Cohesion: 0.24
Nodes (5): RefreshSessionRecord, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable, packages_shared_dist_index_createuserid

### Community 90 - "openai-params-provider.mapper.ts"
Cohesion: 0.12
Nodes (24): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+16 more)

### Community 91 - "ModelAlias"
Cohesion: 0.09
Nodes (5): ProviderTestOptions, ModelAlias, ProviderInstanceId, AppMetricsBackend, TokenDirection

### Community 92 - "wizard-orchestrator.service.ts"
Cohesion: 0.06
Nodes (61): WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, InitAnswers, CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema, convertClient() (+53 more)

### Community 93 - "social.graph.ts"
Cohesion: 0.12
Nodes (35): coercePassNoteVerdict(), isPassOnlyIssue(), ideasOutputSchema, reelIdeasOutputSchema, isReelTaskType(), ReelTaskType, canRefine(), MAX_REFINE (+27 more)

### Community 94 - "load-company-context-fixture.ts"
Cohesion: 0.11
Nodes (17): companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, isEmptyCompanyContext(), audienceProfileSchema, CompanyContextFixture (+9 more)

### Community 95 - "ChatParamsDto"
Cohesion: 0.12
Nodes (17): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+9 more)

### Community 96 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 97 - "route.ts"
Cohesion: 0.13
Nodes (17): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+9 more)

### Community 98 - "llm-gateway-chat.log.ts"
Cohesion: 0.23
Nodes (11): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), LlmChatMessage (+3 more)

### Community 99 - "ClientRemoveCommand"
Cohesion: 0.33
Nodes (3): ClientRemoveCommand, Command, Option

### Community 100 - "StartRunDto"
Cohesion: 0.22
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 101 - "exitWithAgentReport"
Cohesion: 0.12
Nodes (15): emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), resolveCliMode(), toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList() (+7 more)

### Community 102 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 103 - "ProviderRemoveCommand"
Cohesion: 0.33
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 104 - "packages_shared_dist_index_userrole"
Cohesion: 0.32
Nodes (4): ROLES_KEY, RolesGuard, Injectable, packages_shared_dist_index_userrole

### Community 107 - "PublicConfigController"
Cohesion: 0.17
Nodes (9): PublicConfigController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, Inject, PublicConfigModule (+1 more)

### Community 108 - "HitlDto"
Cohesion: 0.50
Nodes (3): HitlDto, IsArray, IsString

### Community 111 - ".createMessage"
Cohesion: 0.05
Nodes (39): ApiHeader, ApiAnthropicErrorResponses(), ApiGatewayModelsErrorResponses(), ApiBody, ApiOperation, ApiProduces, ApiResponse, Body (+31 more)

### Community 112 - "src/pagination.ts"
Cohesion: 0.29
Nodes (5): DEFAULT_PAGE, DEFAULT_PAGE_SIZE, PAGE_SIZES, PageSize, PaginatedList

### Community 114 - "ClientAddCommand"
Cohesion: 0.18
Nodes (6): ClientAddCommand, Command, Option, ModelRemoveCommand, Command, Option

### Community 115 - "auth.module.ts"
Cohesion: 0.06
Nodes (59): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Inject, Injectable, ActivateAccountOutput, ActivateAccountUseCase, Injectable (+51 more)

### Community 119 - "http/http-exception.filter.ts"
Cohesion: 0.20
Nodes (7): ErrorEnvelope, Express, Request, newRequestId(), RequestIdMiddleware, Injectable, packages_shared_dist_index_requestid

### Community 120 - "openai-models.controller.ts"
Cohesion: 0.07
Nodes (32): ApiOpenAiErrorResponses(), ANTHROPIC_INTEGRATION_PATH, OPENAI_INTEGRATION_PATH, ApiBody, ApiOperation, ApiProduces, ApiResponse, Body (+24 more)

### Community 123 - "ConfigInitCommand"
Cohesion: 0.14
Nodes (8): ConfigInitCommand, Command, Option, ConfigValidateCommand, Command, Option, CliGatewayValidatorService, Injectable

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 125 - "assert-company-context-writable.ts"
Cohesion: 0.39
Nodes (5): assertAudienceProfileNamesUnique(), assertCompanyContextWritable(), CompanyContextWriteDetail, normalizeAudienceName(), withEffectiveAudience()

### Community 126 - "save-output-edited.use-case.ts"
Cohesion: 0.05
Nodes (49): coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, pageDocumentOutputSchema, PageOutlineOutput, pageOutlineSectionRoleSchema, pageOutlineSectionSchema, readNonEmptyString() (+41 more)

### Community 127 - "openai-messages-provider.mapper.ts"
Cohesion: 0.27
Nodes (7): ProviderAssistantTurn, ProviderChatTurn, ProviderToolResultTurn, ChatCompletionMessageParam, mapAssistantTurn(), mapAssistantTurnToResponsesInput(), mapTurnsToResponsesInput()

### Community 129 - "CompanyContextRepository"
Cohesion: 0.15
Nodes (6): Inject, Inject, Inject, Inject, CompanyContextRepository, Inject

### Community 130 - "CompanyContextController"
Cohesion: 0.14
Nodes (11): toCompanyContext(), toPartialCompanyContext(), CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Body, Controller (+3 more)

### Community 131 - "src/index.ts"
Cohesion: 0.33
Nodes (3): unbrand, RunTaskType, RunsSummaryResponse

## Knowledge Gaps
- **505 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+500 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1320 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Env` connect `auth.module.ts` to `register-user.use-case.ts`, `get-run.use-case.ts`, `CompanyContextRepository`, `seed-cli.module.ts`, `packages_shared_dist_index`, `llm-hop.ts`, `PublicConfigController`, `ioredis-guest-quota.adapter.ts`, `.chat`, `run-sse.hub.ts`, `llm-gateway.http.adapter.ts`, `UserRepository`, `load-company-context-fixture.ts`, `api/src/health/health.service.ts`, `save-output-edited.use-case.ts`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Why does `isRunId()` connect `ids.ts` to `run.schemas.ts`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `ModelAlias` to `asProviderInstanceId`, `GatewayConfig`, `LoggingService`, `cli.module.ts`, `chat.service.ts`, `provider-registry.service.ts`, `configuration.ts`, `branded.types.ts`, `PrometheusAppMetricsAdapter`, `app-metrics.service.ts`, `ref_nestjs_common`, `sentry-ai-metrics.adapter.ts`, `metrics.ts`, `app-metrics-backend.interface.ts`, `provider-instances.bootstrap.ts`, `NoopAppMetricsAdapter`, `model-manager.service.ts`, `LogContext`, `wizard-orchestrator.service.ts`, `exitWithAgentReport`, `.createMessage`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _505 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `register-user.use-case.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.03896103896103896 - nodes in this community are weakly interconnected._
- **Should `get-run.use-case.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05272438723329219 - nodes in this community are weakly interconnected._
- **Should `company-context-form.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.04493918779633065 - nodes in this community are weakly interconnected._