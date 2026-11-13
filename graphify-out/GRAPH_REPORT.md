# Graph Report - content-chain  (2026-11-13)

## Corpus Check
- 752 files · ~298,276 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: .ico 1, .css 1)

## Summary
- 4972 nodes · 16265 edges · 139 communities (120 shown, 16 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 430 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a1f5d4c6`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ai-provider-gateway/src/health/health.service.ts
- social.types.ts
- company-context-form.tsx
- run-result-editor.tsx
- GatewayConfig
- semantic-cache.service.ts
- auth.module.ts
- ModelAlias
- AuthUserContext
- anthropic/anthropic-tools.mapper.ts
- PrismaRefreshSessionAdapter
- model-manager.service.ts
- exitWithAgentReport
- PrismaRunAdapter
- PrismaService
- provider-error.mapper.ts
- InProcessRunWorker
- ai-provider.interface.ts
- app/layout.tsx
- chat.service.ts
- should-include-redis-stack.ts
- openai-models.controller.ts
- configuration.ts
- UserRepository
- cn
- UsersController
- ClientAddCommand
- openai-stream.mapper.ts
- anthropic-response.mapper.ts
- PrometheusAppMetricsAdapter
- apiFetch
- ai-provider-gateway/src/app.module.ts
- response-cache.service.ts
- resilient-executor.ts
- AnthropicMessagesRequestDto
- ref_nestjs_swagger
- domain/company-context.types.ts
- enums.ts
- content.graph.ts
- redis-vector-store.adapter.ts
- .createMessage
- AppMetricsService
- gateway-alive-provider.tsx
- ids.ts
- branded.types.ts
- ClientEditCommand
- create-feedback.use-case.ts
- app-metrics.module.ts
- OpenAiChatCompletionRequestDto
- InvitationsController
- CompanyContextRepository
- ProviderRemoveCommand
- api-error.code.ts
- feedback-form.tsx
- ref_nestjs_common
- PageDocument
- ref_express
- archive-runs-view.tsx
- api/src/health/health.service.ts
- metrics.ts
- sentry-ai-metrics.adapter.ts
- api/src/main.ts
- .streamChat
- HealthController
- save-output-edited.use-case.ts
- new-ids.ts
- asProviderInstanceId
- home-entry.tsx
- ref_react
- cli.module.ts
- chat-tooling.dto.ts
- responses.adapter.ts
- .get
- api/src/app.module.ts
- logging.module.ts
- parse-verifier-log-message.ts
- LoggingService
- swagger.setup.ts
- start-run-form.tsx
- runs.types.ts
- HealthService
- user-invited.template.ts
- SPEC — README
- InMemoryRunSseHub
- http-metrics.interceptor.ts
- packages_shared_dist_index_userid
- company-context.dto.ts
- metrics.module.ts
- EnvironmentVariables
- PrometheusService
- config-generator.service.ts
- social.graph.ts
- company-context.mapper.ts
- patch-company-context.use-case.ts
- domain/is-complete.ts
- route.ts
- CompanyContextController
- ClientRemoveCommand
- StartRunDto
- ModelEditCommand
- ref_class_validator
- health-readiness-response.dto.ts
- HttpExceptionFilter
- ProviderAddCommand
- ProviderEditCommand
- ModelRemoveCommand
- src/index.ts
- KeyGenerateCommand
- GatewayModelsCatalogService
- src/pagination.ts
- RunLogEntry
- event-source-registry-provider.tsx
- assert-audience-profile-names-unique.ts
- GuestGuard
- guest.guard.ts
- RolesGuard
- app-metrics.service.ts
- ModelAddCommand
- prisma-invitation.adapter.ts
- provider-registry.service.ts
- Architektura
- output-edited-result.schemas.ts
- RunStatsPort
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
- llm-hop.ts
- load-company-context-fixture.ts
- JwtAuthGuard

## God Nodes (most connected - your core abstractions)
1. `DomainException` - 95 edges
2. `ModelAlias` - 88 edges
3. `ProviderInstanceId` - 81 edges
4. `LoggingService` - 73 edges
5. `Env` - 71 edges
6. `AuthUserContext` - 71 edges
7. `isRecord()` - 69 edges
8. `asProviderInstanceId()` - 67 edges
9. `GatewayConfig` - 65 edges
10. `cn()` - 65 edges

## Surprising Connections (you probably didn't know these)
- `mapChatResponseToOpenAi()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/openai/mappers/openai-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `optionalEnvRefSchema` --calls--> `asEnvRef()`  [EXTRACTED]
  apps/ai-provider-gateway/src/config/gateway-config.schema.ts → apps/ai-provider-gateway/src/common/types/branded.types.ts
- `Request` --references--> `AuthUserContext`  [EXTRACTED]
  apps/api/src/shared/http/express.d.ts → apps/api/src/shared/types/auth-user-context.ts
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `RedisConnectionService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-connection.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (139 total, 16 thin omitted)

### Community 0 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.16
Nodes (9): RedisCacheModule, Module, RedisConnectionService, Injectable, isRedisRequiredFromConfig(), HealthCheckResult, HealthRedisCheckResult, ref_ioredis (+1 more)

### Community 1 - "social.types.ts"
Cohesion: 0.05
Nodes (36): CompositeRunResultReader, GetRunOutput, RunResultReader, isSocialRunRecord(), SocialBrief, SocialRunRecord, EmptyRunResultReader, Injectable (+28 more)

### Community 2 - "company-context-form.tsx"
Cohesion: 0.04
Nodes (91): metadata, fetchCompleteness(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras, companyContextForPut() (+83 more)

### Community 3 - "run-result-editor.tsx"
Cohesion: 0.03
Nodes (72): buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload() (+64 more)

### Community 4 - "GatewayConfig"
Cohesion: 0.07
Nodes (17): PendingSecretsItem, ClientManagerService, Injectable, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable, EnvPatchService, Injectable (+9 more)

### Community 5 - "semantic-cache.service.ts"
Cohesion: 0.07
Nodes (29): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName() (+21 more)

### Community 6 - "auth.module.ts"
Cohesion: 0.04
Nodes (119): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Inject, Injectable, ActivateAccountOutput, ActivateAccountUseCase, Inject (+111 more)

### Community 7 - "ModelAlias"
Cohesion: 0.06
Nodes (4): ModelAlias, NoopAppMetricsAdapter, Injectable, AppMetricsBackend

### Community 8 - "AuthUserContext"
Cohesion: 0.04
Nodes (73): AuthController, ApiCookieAuth, ApiTags, Body, Controller, Delete, Get, HttpCode (+65 more)

### Community 9 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.06
Nodes (70): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, toCachedChatResponse(), asInputTokens(), asOutputTokens(), asPromptCacheCreationTokens(), asPromptCacheHitTokens() (+62 more)

### Community 10 - "PrismaRefreshSessionAdapter"
Cohesion: 0.31
Nodes (3): RefreshSessionRecord, PrismaRefreshSessionAdapter, Injectable

### Community 11 - "model-manager.service.ts"
Cohesion: 0.17
Nodes (19): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, defaultModelPolicy(), ModelEditField, RemoveModelInput, buildDefaultModelCapabilities() (+11 more)

### Community 12 - "exitWithAgentReport"
Cohesion: 0.18
Nodes (10): emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), resolveCliMode(), toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList() (+2 more)

### Community 13 - "PrismaRunAdapter"
Cohesion: 0.12
Nodes (3): RunSnapshot, PrismaRunAdapter, Injectable

### Community 14 - "PrismaService"
Cohesion: 0.04
Nodes (39): Inject, Inject, EmailChangeRequestRecord, EmailChangeRequestRepository, UpsertEmailChangeRequestInput, RotateRefreshSessionResult, ActivationRow, UserRow (+31 more)

### Community 15 - "provider-error.mapper.ts"
Cohesion: 0.19
Nodes (20): MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isProviderRateLimitError(), isRateLimitStatus(), isServerError(), isTimeoutStatus() (+12 more)

### Community 16 - "InProcessRunWorker"
Cohesion: 0.14
Nodes (4): InProcessRunWorker, Injectable, Inject, assertTransition()

### Community 17 - "ai-provider.interface.ts"
Cohesion: 0.12
Nodes (34): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatCacheSource, ChatResponseData, SseMetaPayload, mapStopReasonToFinishReason(), CompleteOnceResult (+26 more)

### Community 18 - "app/layout.tsx"
Cohesion: 0.09
Nodes (15): metadata, metadata, metadata, apps_frontend_src_app_globals, AcceptInvitePage(), metadata, tokenFromSearchParam(), geistMono (+7 more)

### Community 19 - "chat.service.ts"
Cohesion: 0.05
Nodes (62): SemanticStoreEmbedState, CacheIdentityMessage, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize (+54 more)

### Community 20 - "should-include-redis-stack.ts"
Cohesion: 0.18
Nodes (11): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis() (+3 more)

### Community 21 - "openai-models.controller.ts"
Cohesion: 0.08
Nodes (33): ApiOpenAiErrorResponses(), OpenAiChatCompletionsController, ApiBody, ApiOperation, ApiProduces, ApiResponse, ApiSecurity, ApiTags (+25 more)

### Community 22 - "configuration.ts"
Cohesion: 0.05
Nodes (63): collectPendingSecrets(), DEFAULT_MODELS, validateProviderApiKey(), asSemanticCacheTtlSeconds(), AppConfiguration, RedisRuntimeConfig, SemanticCacheRuntimeConfig, collectInactiveProviderWarnings() (+55 more)

### Community 23 - "UserRepository"
Cohesion: 0.04
Nodes (25): Inject, Inject, Inject, Inject, Inject, Inject, Inject, Inject (+17 more)

### Community 24 - "cn"
Cohesion: 0.03
Nodes (91): ACCEPT_INVITE_DEMO_HINT, ACCEPT_INVITE_UNAUTHORIZED_HINT, AcceptInviteFormError, toAcceptInviteFormError(), acceptInvite(), logoutSession(), AcceptInviteForm(), onSubmit() (+83 more)

### Community 25 - "UsersController"
Cohesion: 0.10
Nodes (17): ListUsersUseCase, Inject, Injectable, ReactivateUserUseCase, Inject, Injectable, ApiCookieAuth, ApiTags (+9 more)

### Community 26 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 27 - "openai-stream.mapper.ts"
Cohesion: 0.17
Nodes (20): OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty, ApiPropertyOptional (+12 more)

### Community 28 - "anthropic-response.mapper.ts"
Cohesion: 0.13
Nodes (25): SseDoneEvent, fromGatewayToolCallDto(), asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto (+17 more)

### Community 29 - "PrometheusAppMetricsAdapter"
Cohesion: 0.11
Nodes (4): PrometheusAppMetricsAdapter, Injectable, AppProviderCallContext, AppTokenUsage

### Community 30 - "apiFetch"
Cohesion: 0.08
Nodes (44): deleteOwnAccount(), AccountDeleteForm(), onPurgeConfirm(), onReauthSubmit(), runDelete(), createInvitation(), fetchInvitations(), resendInvitation() (+36 more)

### Community 31 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.07
Nodes (28): CacheModule, Module, ChatModule, Module, GatewayKeyGuard, Injectable, HealthModule, Module (+20 more)

### Community 32 - "response-cache.service.ts"
Cohesion: 0.10
Nodes (16): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, CacheModuleOptions, CacheRegistryService (+8 more)

### Community 33 - "resilient-executor.ts"
Cohesion: 0.16
Nodes (18): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+10 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (34): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+26 more)

### Community 35 - "ref_nestjs_swagger"
Cohesion: 0.08
Nodes (34): GATEWAY_CACHE_HEADER, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags, Body (+26 more)

### Community 36 - "domain/company-context.types.ts"
Cohesion: 0.16
Nodes (16): AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CtaItem, emptyCompanyContext(), OfferItem (+8 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (21): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+13 more)

### Community 38 - "content.graph.ts"
Cohesion: 0.11
Nodes (37): coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, pageDocumentOutputSchema, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema, pageOutlineSectionSchema (+29 more)

### Community 39 - "redis-vector-store.adapter.ts"
Cohesion: 0.12
Nodes (20): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), asString(), ParsedKnnHits, parseKnnHits() (+12 more)

### Community 40 - ".createMessage"
Cohesion: 0.07
Nodes (34): ApiHeader, ApiAnthropicErrorResponses(), AnthropicMessagesController, ApiBody, ApiOperation, ApiProduces, ApiResponse, ApiSecurity (+26 more)

### Community 41 - "AppMetricsService"
Cohesion: 0.10
Nodes (5): HttpMetricsMiddleware, Injectable, AppMetricsService, Inject, Injectable

### Community 42 - "gateway-alive-provider.tsx"
Cohesion: 0.18
Nodes (15): fetchGatewayAlive(), fetchHealthReady(), HealthCheck, HealthCheckStatus, HealthReadyAggregate, HealthReadyResponse, isGatewayAlive(), isRecord() (+7 more)

### Community 43 - "ids.ts"
Cohesion: 0.08
Nodes (36): brand, ACCOUNT_ACTIVATION_ID_RE, AccountActivationId, CONV_ID_RE, ConversationId, createAccountActivationId(), createConversationId(), createEmailChangeRequestId() (+28 more)

### Community 44 - "branded.types.ts"
Cohesion: 0.06
Nodes (60): ProviderTestCommand, ProviderTestOptions, Command, Option, CliAiModel, CliAiProvider, CliRateLimit, GatewayClient (+52 more)

### Community 45 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 46 - "create-feedback.use-case.ts"
Cohesion: 0.06
Nodes (34): CreateFeedbackUseCase, Inject, Injectable, agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_RUN_READER, FeedbackRunLookup (+26 more)

### Community 47 - "app-metrics.module.ts"
Cohesion: 0.12
Nodes (12): resolveAppMetricsBackend(), APP_METRICS_BACKEND, MetricsController, ApiOperation, ApiResponse, ApiTags, Controller, Get (+4 more)

### Community 48 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.04
Nodes (54): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+46 more)

### Community 49 - "InvitationsController"
Cohesion: 0.14
Nodes (13): InviteUserDto, ApiProperty, IsEmail, InvitationsController, ApiCookieAuth, ApiTags, Body, Controller (+5 more)

### Community 50 - "CompanyContextRepository"
Cohesion: 0.13
Nodes (16): GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PatchCompanyContextUseCase, Inject (+8 more)

### Community 51 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 52 - "api-error.code.ts"
Cohesion: 0.09
Nodes (25): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+17 more)

### Community 53 - "feedback-form.tsx"
Cohesion: 0.11
Nodes (27): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, filterFeedbackRunOptions(), CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody() (+19 more)

### Community 54 - "ref_nestjs_common"
Cohesion: 0.03
Nodes (101): ListUsersResult, AutoFinalizeExpiredReviewsUseCase, Inject, Injectable, GetRunLogsOutput, Inject, GetRunGuestAccess, orderItemsBySelectedIds() (+93 more)

### Community 55 - "PageDocument"
Cohesion: 0.15
Nodes (6): ContentPipelineState, PageDocument, VerifierVerdict, PrismaContentResultAdapter, toContentPipelinePhase(), Injectable

### Community 56 - "ref_express"
Cohesion: 0.13
Nodes (17): readClientGatewayKey(), readGatewayKeyHeader(), resolveClientIdFromKey(), ResolvedGatewayClient, getAppConfig(), enrichRequestWithClientId(), SmartRateLimitGuard, Injectable (+9 more)

### Community 57 - "archive-runs-view.tsx"
Cohesion: 0.06
Nodes (48): metadata, CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS, RUN_TASK_TYPE_LABELS, fetchArchiveRuns() (+40 more)

### Community 58 - "api/src/health/health.service.ts"
Cohesion: 0.08
Nodes (28): GATEWAY_PROBE_TIMEOUT_MS, GatewayLivenessBody, GatewayLivenessProbe, GatewayLivenessProbeReason, GatewayLivenessProbeResult, isRecord(), parseGatewayLivenessBody(), probeFailureReason() (+20 more)

### Community 59 - "metrics.ts"
Cohesion: 0.12
Nodes (24): getClientConversationId(), getOrCreateConversationIdForResponse(), buildAppProviderMetricsContext(), buildLlmMetricsContext(), mapProviderResponseToAiObservation(), mapProviderResponseToUsage(), toMetricsMessages(), buildProviderInputForAlias() (+16 more)

### Community 60 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.08
Nodes (35): CostUsd, ToolCallId, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext() (+27 more)

### Community 61 - "api/src/main.ts"
Cohesion: 0.23
Nodes (9): AppModule, Module, bootstrap(), parseCorsOrigins(), configureHttpApp(), buildSwaggerConfig(), ref_cookie_parser, ref_helmet (+1 more)

### Community 62 - ".streamChat"
Cohesion: 0.13
Nodes (13): ChatStreamController, ApiBody, ApiOperation, ApiProduces, ApiResponse, ApiSecurity, ApiTags, Body (+5 more)

### Community 63 - "HealthController"
Cohesion: 0.31
Nodes (6): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get

### Community 64 - "save-output-edited.use-case.ts"
Cohesion: 0.16
Nodes (14): ratingSchema, assertSameIds(), EMPTY_VERDICT, SaveOutputEditedUseCase, Inject, Injectable, validationFailed(), withCharacterCount() (+6 more)

### Community 65 - "new-ids.ts"
Cohesion: 0.12
Nodes (18): isContentStartCommand(), isPlainRecord(), omitUndefinedDeep(), makeContentRun(), makeSocialRun(), makeSocialSnapshot(), SocialRunSnapshot, ErrorEnvelope (+10 more)

### Community 66 - "asProviderInstanceId"
Cohesion: 0.07
Nodes (62): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, assertInteractiveAllowed(), WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep (+54 more)

### Community 67 - "home-entry.tsx"
Cohesion: 0.05
Nodes (49): ACTIVATION_FAILED_HINT, activateAccount(), confirmEmailChange(), fetchBootstrapStatus(), fetchUserSession(), patchOwnEmail(), patchOwnPassword(), resendEmailChangeConfirm() (+41 more)

### Community 68 - "ref_react"
Cohesion: 0.06
Nodes (78): bootstrapAdmin(), Credentials, GUEST_HAS_ACTIVE_RUN, loginWithPassword(), registerAccount(), resendActivation(), parseAuthUserWrapper(), parseRegisteredUser() (+70 more)

### Community 69 - "cli.module.ts"
Cohesion: 0.05
Nodes (73): AgentReport, AgentReportStatus, loadAnswers(), assertAgentHasAnswers(), CliMode, CliModeFlags, markAgentRuntime(), CliModule (+65 more)

### Community 70 - "chat-tooling.dto.ts"
Cohesion: 0.16
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 71 - "responses.adapter.ts"
Cohesion: 0.06
Nodes (69): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, toHttpException(), asSystemFingerprint(), asToolCallId(), asWarningCode(), assertOpenAiProviderType(), createOpenAiCompatibleProviderInstance() (+61 more)

### Community 72 - ".get"
Cohesion: 0.50
Nodes (3): ApiOkResponse, ApiOperation, Get

### Community 73 - "api/src/app.module.ts"
Cohesion: 0.06
Nodes (53): AuthModule, Module, CompanyContextModule, Module, ContentPipelineFacade, toOutcome(), Inject, Injectable (+45 more)

### Community 74 - "logging.module.ts"
Cohesion: 0.06
Nodes (25): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+17 more)

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "LoggingService"
Cohesion: 0.08
Nodes (14): Inject, OllamaEmbeddingAdapter, Injectable, EmbeddingBackend, Inject, StreamCacheReplayService, Injectable, Inject (+6 more)

### Community 77 - "swagger.setup.ts"
Cohesion: 0.05
Nodes (46): AppModule, Module, ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional (+38 more)

### Community 78 - "start-run-form.tsx"
Cohesion: 0.08
Nodes (43): fetchCompanyContext(), GuestLimitModal(), GUEST_ALLOWED_TASK_TYPES, GUEST_CONTACTS, GUEST_QUOTA_CODES, GuestAllowedTaskType, GuestContact, GuestQuotaCode (+35 more)

### Community 79 - "runs.types.ts"
Cohesion: 0.04
Nodes (98): ArchiveRunsQuery, fetchRunLogs(), fetchRunsSummary(), fetchUserRuns(), isUserRating(), patchRunRating(), UserRunsPageQuery, HitlAccepted (+90 more)

### Community 82 - "user-invited.template.ts"
Cohesion: 0.18
Nodes (26): EmailChangeConfirmMail, UserActivationMail, UserInvitedMail, UserWelcomeMail, ASSETS_DIR, BRAND_CID, resolveBrandCidAttachments(), escapeHtml() (+18 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "InMemoryRunSseHub"
Cohesion: 0.29
Nodes (4): RunSseEvent, InMemoryRunSseHub, Inject, Injectable

### Community 85 - "http-metrics.interceptor.ts"
Cohesion: 0.19
Nodes (11): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, gatewayErrorsTotal, httpRequestDurationSeconds, httpRequestsTotal (+3 more)

### Community 86 - "packages_shared_dist_index_userid"
Cohesion: 0.06
Nodes (27): DeleteUserResult, DeleteUserUseCase, Inject, Injectable, FEEDBACK_PURGE, FeedbackPurgePort, PrismaFeedbackPurgeAdapter, Injectable (+19 more)

### Community 87 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 88 - "metrics.module.ts"
Cohesion: 0.21
Nodes (8): MetricsController, Controller, Get, Res, MetricsModule, Module, MetricsService, Injectable

### Community 90 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 91 - "PrometheusService"
Cohesion: 0.20
Nodes (4): PrometheusService, Injectable, PrometheusMetrics, ref_prom_client

### Community 92 - "config-generator.service.ts"
Cohesion: 0.08
Nodes (24): isRedisRequired(), ConfigInitCommand, Command, Option, ConfigGeneratorService, Injectable, FileManagerService, Injectable (+16 more)

### Community 93 - "social.graph.ts"
Cohesion: 0.14
Nodes (32): coercePassNoteVerdict(), isPassOnlyIssue(), ideasOutputSchema, reelIdeasOutputSchema, isReelTaskType(), ReelTaskType, canRefine(), MAX_REFINE (+24 more)

### Community 94 - "company-context.mapper.ts"
Cohesion: 0.15
Nodes (12): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+4 more)

### Community 95 - "patch-company-context.use-case.ts"
Cohesion: 0.38
Nodes (6): toPublicCompanyContext(), assertCompanyContextWritable(), PartialCompanyContext, CompanyContextWriteDetail, isComplete(), mergeCompanyContext()

### Community 96 - "domain/is-complete.ts"
Cohesion: 0.35
Nodes (9): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, collectGateItemPaths(), isCompleteAudienceProfile(), isCompleteCtaItem(), isCompleteOfferItem(), nonEmpty() (+1 more)

### Community 97 - "route.ts"
Cohesion: 0.13
Nodes (17): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+9 more)

### Community 98 - "CompanyContextController"
Cohesion: 0.22
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 99 - "ClientRemoveCommand"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

### Community 100 - "StartRunDto"
Cohesion: 0.22
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 102 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 103 - "ref_class_validator"
Cohesion: 0.04
Nodes (46): AcceptInviteDto, ApiProperty, IsString, MinLength, ActivateAccountDto, ApiProperty, IsString, MinLength (+38 more)

### Community 104 - "health-readiness-response.dto.ts"
Cohesion: 0.24
Nodes (10): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, HealthReadinessResponseDto, ApiProperty, ApiPropertyOptional, HealthRedisCheckItemDto (+2 more)

### Community 106 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 107 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 108 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 109 - "src/index.ts"
Cohesion: 0.33
Nodes (3): unbrand, RunTaskType, RunsSummaryResponse

### Community 110 - "KeyGenerateCommand"
Cohesion: 0.33
Nodes (3): KeyGenerateCommand, Command, Option

### Community 111 - "GatewayModelsCatalogService"
Cohesion: 0.13
Nodes (16): ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+8 more)

### Community 112 - "src/pagination.ts"
Cohesion: 0.29
Nodes (5): DEFAULT_PAGE, DEFAULT_PAGE_SIZE, PAGE_SIZES, PageSize, PaginatedList

### Community 114 - "event-source-registry-provider.tsx"
Cohesion: 0.43
Nodes (5): EventSourceRegistryContext, EventSourceRegistryProvider(), createEventSourceRegistry(), EventSourceRegistry, RegistryEntry

### Community 115 - "assert-audience-profile-names-unique.ts"
Cohesion: 0.46
Nodes (4): assertAudienceProfileNamesUnique(), normalizeAudienceName(), withEffectiveAudience(), createLoadContextNode()

### Community 116 - "GuestGuard"
Cohesion: 0.40
Nodes (3): GuestGuard, Inject, Injectable

### Community 117 - "guest.guard.ts"
Cohesion: 0.19
Nodes (8): PublicConfigController, PublicConfigResponse, ApiTags, Controller, Inject, ALLOW_GUEST_KEY, IS_PUBLIC_KEY, ref_nestjs_core

### Community 120 - "app-metrics.service.ts"
Cohesion: 0.20
Nodes (13): healthStatusToGaugeValue(), AppProviderStreamScope, AppRequestLabels, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus (+5 more)

### Community 121 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 122 - "prisma-invitation.adapter.ts"
Cohesion: 0.09
Nodes (23): InvitationListItem, ListInvitationsUseCase, Inject, Injectable, RevokeInvitationUseCase, Inject, Injectable, AcceptInviteAndCreateUserInput (+15 more)

### Community 123 - "provider-registry.service.ts"
Cohesion: 0.11
Nodes (13): ChatValidationService, Injectable, UnsupportedProviderException, GatewayCapabilitiesConfig, GatewayModelConfig, GatewayParamsConfig, AIProvider, OpenAiApiSurface (+5 more)

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 126 - "output-edited-result.schemas.ts"
Cohesion: 0.07
Nodes (30): contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema, ideasArraySchema (+22 more)

### Community 144 - "llm-hop.ts"
Cohesion: 0.06
Nodes (42): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), LlmGatewayError (+34 more)

### Community 146 - "load-company-context-fixture.ts"
Cohesion: 0.11
Nodes (17): isEmptyCompanyContext(), audienceProfileSchema, CompanyContextFixture, companyContextFixtureSchema, ctaItemSchema, fixturePath(), loadCompanyContextFixture(), offerItemSchema (+9 more)

## Knowledge Gaps
- **518 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+513 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1355 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Env` connect `auth.module.ts` to `save-output-edited.use-case.ts`, `AuthUserContext`, `PrismaService`, `llm-hop.ts`, `InProcessRunWorker`, `load-company-context-fixture.ts`, `CompanyContextRepository`, `InMemoryRunSseHub`, `guest.guard.ts`, `ref_nestjs_common`, `UserRepository`, `packages_shared_dist_index_userid`, `GuestGuard`, `api/src/health/health.service.ts`, `api/src/main.ts`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Why does `isRunId()` connect `ids.ts` to `ref_nestjs_common`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `branded.types.ts` to `asProviderInstanceId`, `ref_nestjs_swagger`, `GatewayConfig`, `ModelAlias`, `AppMetricsService`, `logging.module.ts`, `model-manager.service.ts`, `exitWithAgentReport`, `LoggingService`, `sentry-ai-metrics.adapter.ts`, `provider-registry.service.ts`, `ai-provider.interface.ts`, `chat.service.ts`, `configuration.ts`, `app-metrics.service.ts`, `metrics.ts`, `config-generator.service.ts`, `PrometheusAppMetricsAdapter`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _518 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04941599281221923 - nodes in this community are weakly interconnected._
- **Should `company-context-form.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.041277641277641275 - nodes in this community are weakly interconnected._
- **Should `run-result-editor.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.033973985633857506 - nodes in this community are weakly interconnected._