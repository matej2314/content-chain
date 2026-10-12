# Graph Report - content-chain  (2026-10-12)

## Corpus Check
- 697 files · ~234,624 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .css 1)

## Summary
- 4537 nodes · 13965 edges · 135 communities (119 shown, 15 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 419 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9be2fff5`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- auth-user.types.ts
- get-run.use-case.ts
- api/company-context.types.ts
- responses.adapter.ts
- asProviderInstanceId
- own-runs-provider.tsx
- provider-error.mapper.ts
- LogContext
- openai-chat-completions.controller.ts
- exitWithAgentReport
- LoggingService
- ai-provider-gateway/src/health/health.service.ts
- RunRecord
- cli.module.ts
- swagger.setup.ts
- chat-params.dto.ts
- PrometheusAppMetricsAdapter
- AppMetricsService
- archive-runs-view.tsx
- users-view.tsx
- AuthController
- resilient-executor.ts
- envelope.ts
- auth.module.ts
- RedisVectorStoreAdapter
- feedback-form.tsx
- getAppConfig
- configuration.ts
- GatewayKey
- GatewayModelsCatalogService
- branded.types.ts
- HealthService
- button.tsx
- cache.module.ts
- AnthropicMessagesRequestDto
- start-run.use-case.ts
- runs.types.ts
- enums.ts
- run-details-view.tsx
- CompanyContext
- sentry-ai-metrics.adapter.ts
- run.types.ts
- openai-models.controller.ts
- ids.ts
- chat.service.ts
- provider-instances.bootstrap.ts
- DomainException
- AuthUserContext
- ai-provider-gateway/src/main.ts
- anthropic-messages.controller.ts
- ListRunsQueryDto
- ModelAlias
- Env
- ConfigInitCommand
- content.graph.ts
- config-generator.service.ts
- RolesGuard
- domain/company-context.types.ts
- PrismaSocialResultAdapter
- HttpExceptionFilter
- metrics.ts
- types/index.ts
- anthropic/anthropic-tools.mapper.ts
- app-metrics.service.ts
- anthropic-models.controller.ts
- ModelEditCommand
- app-metrics.module.ts
- demo-mode-provider.tsx
- OpenAiChatCompletionRequestDto
- start-run-form.tsx
- semantic-cache.service.ts
- PrismaService
- prisma-invitation.adapter.ts
- SmartRateLimiterService
- InMemoryRunSseHub
- parse-verifier-log-message.ts
- company-context.mapper.ts
- api/src/health/health.service.ts
- ClientAddCommand
- llm-gateway.http.adapter.ts
- PrometheusService
- cn
- patch-company-context.use-case.ts
- SPEC — README
- dashboard-shell.tsx
- semantic-cache.constants.ts
- GatewayConfig
- company-context.dto.ts
- ClientRemoveCommand
- ModelAddCommand
- redis-vector-store.adapter.ts
- RedisConnectionService
- chat-stream.controller.ts
- .getOne
- RefreshSessionRepository
- StartRunDto
- ProviderEditCommand
- route.ts
- ProviderRemoveCommand
- .getOne
- CompanyContextController
- save-output-edited.use-case.ts
- .getOne
- ProviderAddCommand
- HealthController
- resolve-provider-call-options.ts
- GlobalExceptionFilter
- ChatParamsDto
- UserRepository
- AccountEmailForm
- VectorStore
- OpenAiChatMessageDto
- openai-params-provider.mapper.ts
- ConfigValidateCommand
- EnvironmentVariables
- company-context.controller.ts
- openai-chat-message.dto.ts
- api/src/app.module.ts
- openai-chat-completion-request.dto.ts
- Architektura
- brand
- anthropic.module.ts
- ai-provider-gateway/src/app.module.ts
- JwtAuthGuard
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
2. `ProviderInstanceId` - 81 edges
3. `DomainException` - 81 edges
4. `LoggingService` - 73 edges
5. `asProviderInstanceId()` - 67 edges
6. `isRecord()` - 66 edges
7. `GatewayConfig` - 65 edges
8. `cn()` - 65 edges
9. `GatewayKey` - 59 edges
10. `Env` - 59 edges

## Surprising Connections (you probably didn't know these)
- `mapChatResponseToOpenAi()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/openai/mappers/openai-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `optionalEnvRefSchema` --calls--> `asEnvRef()`  [EXTRACTED]
  apps/ai-provider-gateway/src/config/gateway-config.schema.ts → apps/ai-provider-gateway/src/common/types/branded.types.ts
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `RedisConnectionService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-connection.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `CacheRegistryService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/cache-registry.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (135 total, 15 thin omitted)

### Community 0 - "auth-user.types.ts"
Cohesion: 0.06
Nodes (30): ListUsersUseCase, Injectable, ReactivateUserUseCase, Injectable, JwtPayload, UserListItem, PatchUserDto, ApiProperty (+22 more)

### Community 1 - "get-run.use-case.ts"
Cohesion: 0.05
Nodes (54): CompositeRunResultReader, GetRunOutput, RunResultReader, SocialBrief, EmptyRunResultReader, Injectable, coercePassNoteVerdict(), isPassOnlyIssue() (+46 more)

### Community 2 - "api/company-context.types.ts"
Cohesion: 0.06
Nodes (60): metadata, fetchCompanyContext(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras, companyContextForPut() (+52 more)

### Community 3 - "responses.adapter.ts"
Cohesion: 0.06
Nodes (69): buildAppProviderMetricsContext(), mapProviderResponseToAiObservation(), toCachedChatResponse(), toHttpException(), asInputTokens(), asOutputTokens(), asSystemFingerprint(), asToolCallId() (+61 more)

### Community 4 - "asProviderInstanceId"
Cohesion: 0.08
Nodes (53): isRedisSearchTagSafeId(), assertInteractiveAllowed(), DEFAULT_MODELS, WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, InitAnswers, CliAiModelSchema (+45 more)

### Community 5 - "own-runs-provider.tsx"
Cohesion: 0.07
Nodes (40): metadata, useSession(), assertNever(), notifyProduct(), notifyRunCancelled(), notifyRunTerminal(), EnvelopeRef, ProductToast (+32 more)

### Community 6 - "provider-error.mapper.ts"
Cohesion: 0.21
Nodes (19): MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isRateLimitStatus(), isServerError(), isTimeoutStatus(), nameLooksLikeTimeout() (+11 more)

### Community 7 - "LogContext"
Cohesion: 0.07
Nodes (22): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+14 more)

### Community 8 - "openai-chat-completions.controller.ts"
Cohesion: 0.16
Nodes (22): GATEWAY_CACHE_HEADER, OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty (+14 more)

### Community 9 - "exitWithAgentReport"
Cohesion: 0.17
Nodes (11): emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), resolveCliMode(), toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList() (+3 more)

### Community 10 - "LoggingService"
Cohesion: 0.05
Nodes (32): Inject, OllamaEmbeddingAdapter, Injectable, EmbeddingBackend, Inject, ChatProviderCooldownService, Injectable, STREAM_CACHE_REPLAY_CHUNK_SIZE (+24 more)

### Community 11 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.19
Nodes (13): EMBEDDING_BACKEND, VECTOR_STORE, RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiProperty, ApiPropertyOptional (+5 more)

### Community 12 - "RunRecord"
Cohesion: 0.07
Nodes (24): InProcessRunWorker, Inject, Injectable, RunAbortRegistry, Injectable, RunDispatchExecutor, RunLifecycleService, TransitionExtras (+16 more)

### Community 13 - "cli.module.ts"
Cohesion: 0.06
Nodes (62): AgentReport, AgentReportStatus, PendingSecretsItem, loadAnswers(), collectPendingSecrets(), assertAgentHasAnswers(), CliMode, CliModeFlags (+54 more)

### Community 14 - "swagger.setup.ts"
Cohesion: 0.05
Nodes (50): ChatCacheSource, ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, toChatResponseDto(), toChatResponseDtoFromCache(), ApiProperty (+42 more)

### Community 15 - "chat-params.dto.ts"
Cohesion: 0.24
Nodes (7): ResponseFormatDto, ApiProperty, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsThinkingBudget()

### Community 16 - "PrometheusAppMetricsAdapter"
Cohesion: 0.12
Nodes (4): PrometheusAppMetricsAdapter, Injectable, AppProviderCallContext, AppTokenUsage

### Community 17 - "AppMetricsService"
Cohesion: 0.09
Nodes (8): HttpMetricsMiddleware, Injectable, Inject, Optional, ActiveStreamsTracker, Injectable, AppMetricsService, Injectable

### Community 18 - "archive-runs-view.tsx"
Cohesion: 0.07
Nodes (35): metadata, FeedbackCta(), CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS, RUN_TASK_TYPE_LABELS (+27 more)

### Community 19 - "users-view.tsx"
Cohesion: 0.10
Nodes (31): metadata, createInvitation(), fetchInvitations(), resendInvitation(), revokeInvitation(), InvitationListItem, InviteCreated, isInvitationExpired() (+23 more)

### Community 20 - "AuthController"
Cohesion: 0.05
Nodes (48): AuthController, ApiCookieAuth, ApiTags, Body, Controller, Get, HttpCode, Patch (+40 more)

### Community 21 - "resilient-executor.ts"
Cohesion: 0.17
Nodes (18): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+10 more)

### Community 22 - "envelope.ts"
Cohesion: 0.05
Nodes (73): AcceptInvitePage(), metadata, tokenFromSearchParam(), geistMono, geistSans, metadata, ACCEPT_INVITE_DEMO_HINT, ACCEPT_INVITE_UNAUTHORIZED_HINT (+65 more)

### Community 23 - "auth.module.ts"
Cohesion: 0.04
Nodes (56): Inject, InviteUserResult, inviteUserSchema, InviteUserUseCase, Inject, Injectable, InvitationListItem, ListInvitationsUseCase (+48 more)

### Community 24 - "RedisVectorStoreAdapter"
Cohesion: 0.24
Nodes (7): RedisVectorStoreAdapter, Injectable, isRedisSearchIndexAlreadyExistsError(), isRedisSearchMissingIndexError(), isRedisSearchModuleMissingError(), redisSearchErrorMessage(), VectorSearchHit

### Community 25 - "feedback-form.tsx"
Cohesion: 0.16
Nodes (18): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, filterFeedbackRunOptions(), CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody() (+10 more)

### Community 26 - "getAppConfig"
Cohesion: 0.12
Nodes (17): resolveClientIdFromKey(), ResolvedGatewayClient, getAppConfig(), GatewayKeyGuard, Injectable, enrichRequestWithClientId(), SmartRateLimitGuard, Injectable (+9 more)

### Community 27 - "configuration.ts"
Cohesion: 0.06
Nodes (50): REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, CliValidateOptions, asSemanticCacheTtlSeconds(), AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig (+42 more)

### Community 28 - "GatewayKey"
Cohesion: 0.08
Nodes (35): KeyGenerateCommand, Command, Option, convertRateLimit(), CliRateLimit, GatewayClient, KeyGeneratorService, Injectable (+27 more)

### Community 29 - "GatewayModelsCatalogService"
Cohesion: 0.21
Nodes (8): GatewayModelCapabilitiesDto, GatewayModelDto, ApiProperty, ApiPropertyOptional, ModelsListResponseDto, ApiProperty, GatewayModelsCatalogService, Injectable

### Community 30 - "branded.types.ts"
Cohesion: 0.13
Nodes (31): CachedChatResponse, CachedChatWarning, CachedFinishReason, CompleteOnceResult, StreamOnceResult, ProviderResponse, SseDeltaEvent, SseFinishReason (+23 more)

### Community 31 - "HealthService"
Cohesion: 0.19
Nodes (5): HealthLivenessResponseDto, ApiProperty, HealthReadinessResponseDto, HealthService, Injectable

### Community 32 - "button.tsx"
Cohesion: 0.12
Nodes (31): logoutSession(), AccountEmailFormState, GuestLimitModalProps, CancelRunDialogProps, FALLBACK, LogoutDialog(), confirm(), LogoutDialogProps (+23 more)

### Community 33 - "cache.module.ts"
Cohesion: 0.10
Nodes (18): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, CacheModule, CacheModuleOptions (+10 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "start-run.use-case.ts"
Cohesion: 0.08
Nodes (28): contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, runIdSchema (+20 more)

### Community 36 - "runs.types.ts"
Cohesion: 0.07
Nodes (68): ArchiveRunsQuery, fetchUserRuns(), InitiatorOption, isUserRating(), patchRunRating(), HitlAccepted, isPageOutlineSectionRole(), isReelDuration() (+60 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "run-details-view.tsx"
Cohesion: 0.04
Nodes (69): useGuestLocked(), buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload() (+61 more)

### Community 39 - "CompanyContext"
Cohesion: 0.29
Nodes (5): CompanyContext, jsonArray(), jsonRecord(), PrismaCompanyContextAdapter, Injectable

### Community 40 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.10
Nodes (27): CostUsd, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes() (+19 more)

### Community 41 - "run.types.ts"
Cohesion: 0.07
Nodes (20): LightRunItem, ListRunsResult, RunSnapshot, ContentRunRecord, RunLogEntry, RunRecordBase, ALLOWED_RUN_STATES, assertTransition() (+12 more)

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.27
Nodes (10): ApiOpenAiErrorResponses(), OpenAiErrorBodyDto, OpenAiErrorResponseDto, ApiProperty, ApiPropertyOptional, OpenAiModelDto, OpenAiModelsListResponseDto, ApiProperty (+2 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (23): ACCOUNT_ACTIVATION_ID_RE, AccountActivationId, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createRunId() (+15 more)

### Community 44 - "chat.service.ts"
Cohesion: 0.06
Nodes (62): SemanticStoreEmbedState, CacheIdentityMessage, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize (+54 more)

### Community 45 - "provider-instances.bootstrap.ts"
Cohesion: 0.12
Nodes (17): ProviderTestService, Injectable, ProviderApiKey, assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider() (+9 more)

### Community 46 - "DomainException"
Cohesion: 0.07
Nodes (56): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Injectable, ActivateAccountOutput, ActivateAccountUseCase, Injectable, comparePassword() (+48 more)

### Community 47 - "AuthUserContext"
Cohesion: 0.05
Nodes (66): CancelRunUseCase, Inject, Injectable, FinalizeReviewUseCase, Injectable, GetRunLogsOutput, GetRunLogsUseCase, Injectable (+58 more)

### Community 48 - "ai-provider-gateway/src/main.ts"
Cohesion: 0.13
Nodes (15): AppModule, Module, bootstrap(), API_GLOBAL_PREFIX, PORT, setupApp(), exportOpenApi(), OPENAPI_OUTPUT_FILENAME (+7 more)

### Community 49 - "anthropic-messages.controller.ts"
Cohesion: 0.11
Nodes (30): SseDoneEvent, fromGatewayToolCallDto(), asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto (+22 more)

### Community 50 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+2 more)

### Community 51 - "ModelAlias"
Cohesion: 0.06
Nodes (10): ProviderTestOptions, AddModelInput, EditModelInput, ModelAlias, ProviderInstanceId, MissingProviderApiKey, MissingProviderBaseUrl, NoopAppMetricsAdapter (+2 more)

### Community 52 - "Env"
Cohesion: 0.03
Nodes (45): isRecord(), JwtCookieStrategy, Inject, Injectable, bootstrap(), PublicConfigResponse, AutoFinalizeExpiredReviewsUseCase, Inject (+37 more)

### Community 53 - "ConfigInitCommand"
Cohesion: 0.31
Nodes (3): ConfigInitCommand, Command, Option

### Community 54 - "content.graph.ts"
Cohesion: 0.07
Nodes (50): toOutcome(), coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema, pageOutlineSectionSchema (+42 more)

### Community 55 - "config-generator.service.ts"
Cohesion: 0.08
Nodes (27): isRedisRequired(), CliGatewayValidatorService, Injectable, WizardState, ConfigGeneratorService, Injectable, FileManagerService, Injectable (+19 more)

### Community 57 - "domain/company-context.types.ts"
Cohesion: 0.18
Nodes (18): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CompanyContextWriteDetail (+10 more)

### Community 58 - "PrismaSocialResultAdapter"
Cohesion: 0.09
Nodes (10): Inject, OutputEditedWrite, OutputEditedWriter, applyWrite(), PrismaOutputEditedAdapter, Injectable, toInputJson(), PipelineState (+2 more)

### Community 60 - "metrics.ts"
Cohesion: 0.11
Nodes (27): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+19 more)

### Community 61 - "types/index.ts"
Cohesion: 0.16
Nodes (23): RequestIdMiddleware, Injectable, CONVERSATION_ID_PATTERN, createRequestId(), isAttemptNumber(), isBaseUrl(), isCacheTtlSeconds(), isConversationId() (+15 more)

### Community 62 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.09
Nodes (40): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent() (+32 more)

### Community 63 - "app-metrics.service.ts"
Cohesion: 0.17
Nodes (13): healthStatusToGaugeValue(), AppProviderStreamScope, AppRequestLabels, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus (+5 more)

### Community 64 - "anthropic-models.controller.ts"
Cohesion: 0.22
Nodes (12): ApiAnthropicErrorResponses(), AnthropicErrorBodyDto, AnthropicErrorResponseDto, ApiProperty, AnthropicModelDto, AnthropicModelsListResponseDto, ApiProperty, mapGatewayModelsListToAnthropic() (+4 more)

### Community 65 - "ModelEditCommand"
Cohesion: 0.16
Nodes (6): ModelEditCommand, Command, Option, ModelRemoveCommand, Command, Option

### Community 66 - "app-metrics.module.ts"
Cohesion: 0.09
Nodes (16): AppMetricsModule, resolveAppMetricsBackend(), Global, Module, Inject, APP_METRICS_BACKEND, MetricsController, ApiOperation (+8 more)

### Community 67 - "demo-mode-provider.tsx"
Cohesion: 0.22
Nodes (10): fetchAppConfig(), AppConfig, parseAppConfig(), DemoChip(), DemoModeContext, DemoModeContextValue, DemoModeProvider(), DemoModeState (+2 more)

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (18): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+10 more)

### Community 69 - "start-run-form.tsx"
Cohesion: 0.09
Nodes (28): metadata, GuestLimitModal(), GUEST_ALLOWED_TASK_TYPES, GUEST_CONTACTS, GUEST_QUOTA_CODES, GuestAllowedTaskType, GuestContact, GuestQuotaCode (+20 more)

### Community 70 - "semantic-cache.service.ts"
Cohesion: 0.15
Nodes (15): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, isSingleTurnUserRequest(), lastUserMessageText(), embeddingProbeTimeoutMs() (+7 more)

### Community 71 - "PrismaService"
Cohesion: 0.03
Nodes (53): DeleteUserResult, DeleteUserUseCase, Inject, Injectable, CreateFeedbackUseCase, Inject, Injectable, agentKeySchema (+45 more)

### Community 72 - "prisma-invitation.adapter.ts"
Cohesion: 0.17
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 73 - "SmartRateLimiterService"
Cohesion: 0.10
Nodes (14): StreamCleanupInterceptor, Injectable, readClientGatewayKey(), readGatewayKeyHeader(), AnthropicMessagesController, ApiSecurity, ApiTags, Controller (+6 more)

### Community 74 - "InMemoryRunSseHub"
Cohesion: 0.29
Nodes (4): RunSseEvent, InMemoryRunSseHub, Inject, Injectable

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "company-context.mapper.ts"
Cohesion: 0.15
Nodes (11): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+3 more)

### Community 77 - "api/src/health/health.service.ts"
Cohesion: 0.08
Nodes (28): GATEWAY_PROBE_TIMEOUT_MS, GatewayLivenessBody, GatewayLivenessProbe, GatewayLivenessProbeReason, GatewayLivenessProbeResult, isRecord(), parseGatewayLivenessBody(), probeFailureReason() (+20 more)

### Community 78 - "ClientAddCommand"
Cohesion: 0.16
Nodes (6): ClientAddCommand, Command, Option, ClientEditCommand, Command, Option

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.06
Nodes (39): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), GatewayChatResponse (+31 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - "cn"
Cohesion: 0.06
Nodes (41): AppHeader(), AppHeaderProps, AppSidebar(), AppSidebarProps, CompletenessChipSlot(), APP_NAV, AppNavItem, navItemsForRole() (+33 more)

### Community 82 - "patch-company-context.use-case.ts"
Cohesion: 0.44
Nodes (5): toPublicCompanyContext(), assertCompanyContextWritable(), PartialCompanyContext, isComplete(), mergeCompanyContext()

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "dashboard-shell.tsx"
Cohesion: 0.07
Nodes (41): fetchCompleteness(), CompletenessState, CompletenessChip(), CompletenessContext, CompletenessContextValue, CompletenessProvider(), FALLBACK_ENVELOPE, useCompleteness() (+33 more)

### Community 85 - "semantic-cache.constants.ts"
Cohesion: 0.13
Nodes (12): EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema(), EMBEDDING_CIRCUIT_COOLDOWN_MS, EMBEDDING_CIRCUIT_OPEN_AFTER, EMBEDDING_PROBE_TIMEOUT_MS (+4 more)

### Community 86 - "GatewayConfig"
Cohesion: 0.06
Nodes (35): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, ClientManagerService, Injectable, ConfigPersistenceService, normalizeGatewayConfigForWrite() (+27 more)

### Community 87 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 88 - "ClientRemoveCommand"
Cohesion: 0.33
Nodes (3): ClientRemoveCommand, Command, Option

### Community 89 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 90 - "redis-vector-store.adapter.ts"
Cohesion: 0.25
Nodes (12): isUnservableCachedReply(), parseCachedChatResponse(), escapeRedisSearchTag(), asString(), ParsedKnnHits, parseKnnHits(), VectorStoreKnnInput, VectorStorePartition (+4 more)

### Community 91 - "RedisConnectionService"
Cohesion: 0.20
Nodes (5): RedisCacheModule, Module, RedisConnectionService, Injectable, isRedisRequiredFromConfig()

### Community 92 - "chat-stream.controller.ts"
Cohesion: 0.04
Nodes (51): ApiHeader, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags, Body (+43 more)

### Community 93 - ".getOne"
Cohesion: 0.18
Nodes (11): OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+3 more)

### Community 94 - "RefreshSessionRepository"
Cohesion: 0.10
Nodes (9): Inject, Inject, Inject, Inject, RefreshSessionRecord, RefreshSessionRepository, RotateRefreshSessionResult, PrismaRefreshSessionAdapter (+1 more)

### Community 95 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 96 - "ProviderEditCommand"
Cohesion: 0.33
Nodes (3): ProviderEditCommand, Command, Option

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 98 - "ProviderRemoveCommand"
Cohesion: 0.33
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 99 - ".getOne"
Cohesion: 0.19
Nodes (10): AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+2 more)

### Community 100 - "CompanyContextController"
Cohesion: 0.22
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 101 - "save-output-edited.use-case.ts"
Cohesion: 0.09
Nodes (32): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+24 more)

### Community 102 - ".getOne"
Cohesion: 0.19
Nodes (10): ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+2 more)

### Community 103 - "ProviderAddCommand"
Cohesion: 0.31
Nodes (3): ProviderAddCommand, Command, Option

### Community 104 - "HealthController"
Cohesion: 0.31
Nodes (6): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get

### Community 105 - "resolve-provider-call-options.ts"
Cohesion: 0.39
Nodes (6): clamp(), isOverrideKey(), resolveProviderCallOptions(), OVERRIDE_KEYS, OverrideKey, GatewayParamsConfig

### Community 106 - "GlobalExceptionFilter"
Cohesion: 0.32
Nodes (4): GlobalExceptionFilter, isPayloadTooLargeError(), Catch, Injectable

### Community 107 - "ChatParamsDto"
Cohesion: 0.20
Nodes (10): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+2 more)

### Community 108 - "UserRepository"
Cohesion: 0.05
Nodes (24): Inject, Inject, Inject, Inject, Inject, Inject, AccountActivationRecord, AccountActivationRepository (+16 more)

### Community 109 - "AccountEmailForm"
Cohesion: 0.43
Nodes (6): patchOwnEmail(), AccountEmailForm(), onAccountSubmit(), onConfirm(), onModalSubmit(), openReauthModal()

### Community 111 - "OpenAiChatMessageDto"
Cohesion: 0.22
Nodes (9): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+1 more)

### Community 112 - "openai-params-provider.mapper.ts"
Cohesion: 0.12
Nodes (24): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+16 more)

### Community 113 - "ConfigValidateCommand"
Cohesion: 0.40
Nodes (3): ConfigValidateCommand, Command, Option

### Community 116 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 117 - "company-context.controller.ts"
Cohesion: 0.16
Nodes (13): GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PatchCompanyContextUseCase, Inject (+5 more)

### Community 120 - "openai-chat-message.dto.ts"
Cohesion: 0.60
Nodes (3): isTextContentItem(), normalizeOpenAiContent(), TextContentItem

### Community 122 - "api/src/app.module.ts"
Cohesion: 0.05
Nodes (60): AppModule, Module, AuthModule, Module, CompanyContextModule, Module, CompanyContextRepository, ContentPipelineFacade (+52 more)

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 125 - "brand"
Cohesion: 0.17
Nodes (10): brand, unbrand, createAccountActivationId(), createInvitationId(), createRequestId(), createUserId(), isAccountActivationId(), isInvitationId() (+2 more)

### Community 127 - "anthropic.module.ts"
Cohesion: 0.21
Nodes (10): ChatModule, Module, AnthropicModule, Module, IntegrationsModule, Module, OpenAiModule, Module (+2 more)

### Community 128 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.06
Nodes (31): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis() (+23 more)

## Knowledge Gaps
- **463 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+458 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1240 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ModelAlias` connect `ModelAlias` to `asProviderInstanceId`, `sentry-ai-metrics.adapter.ts`, `LoggingService`, `chat.service.ts`, `GatewayKey`, `swagger.setup.ts`, `PrometheusAppMetricsAdapter`, `AppMetricsService`, `GatewayModelsCatalogService`, `resilient-executor.ts`, `GatewayConfig`, `config-generator.service.ts`, `redis-vector-store.adapter.ts`, `metrics.ts`, `types/index.ts`, `branded.types.ts`, `app-metrics.service.ts`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `ModelAlias` to `asProviderInstanceId`, `LogContext`, `exitWithAgentReport`, `LoggingService`, `cli.module.ts`, `swagger.setup.ts`, `PrometheusAppMetricsAdapter`, `AppMetricsService`, `configuration.ts`, `GatewayKey`, `GatewayModelsCatalogService`, `branded.types.ts`, `sentry-ai-metrics.adapter.ts`, `chat.service.ts`, `provider-instances.bootstrap.ts`, `config-generator.service.ts`, `metrics.ts`, `types/index.ts`, `app-metrics.service.ts`, `GatewayConfig`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Why does `LoggingService` connect `LoggingService` to `responses.adapter.ts`, `LogContext`, `ai-provider-gateway/src/health/health.service.ts`, `swagger.setup.ts`, `AppMetricsService`, `resilient-executor.ts`, `RedisVectorStoreAdapter`, `getAppConfig`, `HealthService`, `cache.module.ts`, `chat.service.ts`, `provider-instances.bootstrap.ts`, `ai-provider-gateway/src/main.ts`, `anthropic/anthropic-tools.mapper.ts`, `semantic-cache.service.ts`, `SmartRateLimiterService`, `redis-vector-store.adapter.ts`, `RedisConnectionService`, `GlobalExceptionFilter`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _463 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `auth-user.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.059506531204644414 - nodes in this community are weakly interconnected._
- **Should `get-run.use-case.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05202547080341417 - nodes in this community are weakly interconnected._