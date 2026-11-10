# Graph Report - content-chain  (2026-11-10)

## Corpus Check
- 735 files · ~289,616 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: .ico 1, .css 1)

## Summary
- 4849 nodes · 15747 edges · 137 communities (121 shown, 13 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 423 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `60a38c13`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- prisma-invitation.adapter.ts
- get-run.use-case.ts
- company-context-form.tsx
- asProviderInstanceId
- GatewayConfig
- ai-provider-gateway/src/app.module.ts
- runs.controller.ts
- cache.module.ts
- RunRepository
- anthropic/anthropic-tools.mapper.ts
- runs.types.ts
- guest-run-policy.service.ts
- feedback-form.tsx
- prisma-run.adapter.ts
- create-feedback.use-case.ts
- provider-error.mapper.ts
- branded.types.ts
- ai-provider.interface.ts
- cli.module.ts
- chat.service.ts
- users-view.tsx
- LoggingService
- configuration.ts
- prisma-user.adapter.ts
- ref_nestjs_common
- cn
- types/index.ts
- AuthController
- anthropic-response.mapper.ts
- ref_react
- ai-provider-gateway/src/health/health.service.ts
- response-cache.service.ts
- PrometheusAppMetricsAdapter
- app-metrics.service.ts
- AnthropicMessagesRequestDto
- chat-response.dto.ts
- domain/company-context.types.ts
- enums.ts
- run-details-view.tsx
- redis-vector-store.adapter.ts
- sentry-ai-metrics.adapter.ts
- ChatMessageDto
- dashboard-shell.tsx
- ids.ts
- chat-stream.controller.ts
- UsersController
- CachedChatResponse
- responses.adapter.ts
- swagger.setup.ts
- google-tools.mapper.ts
- company-context.controller.ts
- openai-chat-completions.controller.ts
- semantic-cache.service.ts
- AppMetricsService
- llm-hop.ts
- OpenAiChatCompletionRequestDto
- EnvironmentVariables
- archive-runs-view.tsx
- api/src/health/health.service.ts
- http-metrics.interceptor.ts
- .streamChat
- ref_nestjs_swagger
- app-metrics-backend.interface.ts
- notify-product.tsx
- provider-instances.bootstrap.ts
- NoopAppMetricsAdapter
- ref_class_transformer
- VectorStore
- EnvPatchService
- ModelAddCommand
- api/src/main.ts
- MetricsService
- EnvelopeError
- api/src/app.module.ts
- logging.module.ts
- parse-verifier-log-message.ts
- PrometheusService
- run-sse.hub.ts
- start-run-form.tsx
- run-result-editor.tsx
- .chat
- ClientEditCommand
- user-invited.template.ts
- SPEC — README
- InMemoryRunSseHub
- InvitationsController
- llm-gateway.http.adapter.ts
- company-context.dto.ts
- ProviderEditCommand
- packages_shared_dist_index
- llm-gateway.types.ts
- ModelAlias
- asClientId
- social.graph.ts
- CompanyContextController
- HealthController
- ProviderAddCommand
- route.ts
- llm-gateway-chat.log.ts
- ClientRemoveCommand
- StartRunDto
- exitWithAgentReport
- models.controller.ts
- ProviderRemoveCommand
- openai-models.controller.ts
- HttpExceptionFilter
- ConfigValidateCommand
- .get
- health.api.ts
- src/pagination.ts
- ModelRemoveCommand
- auth.module.ts
- JwtAuthGuard
- ModelEditCommand
- ClientAddCommand
- start-run.use-case.ts
- ConfigInitCommand
- Architektura
- CompanyContext
- save-output-edited.use-case.ts
- CompanyContextRepository
- company-context.mapper.ts
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
- RolesGuard

## God Nodes (most connected - your core abstractions)
1. `ModelAlias` - 88 edges
2. `DomainException` - 84 edges
3. `ProviderInstanceId` - 81 edges
4. `LoggingService` - 73 edges
5. `isRecord()` - 69 edges
6. `asProviderInstanceId()` - 67 edges
7. `GatewayConfig` - 65 edges
8. `cn()` - 65 edges
9. `Env` - 63 edges
10. `AuthUserContext` - 62 edges

## Surprising Connections (you probably didn't know these)
- `mapGatewayResponseToAnthropicFormat()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/anthropic/mappers/anthropic-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
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

## Communities (137 total, 13 thin omitted)

### Community 0 - "prisma-invitation.adapter.ts"
Cohesion: 0.14
Nodes (17): InvitationListItem, AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord (+9 more)

### Community 1 - "get-run.use-case.ts"
Cohesion: 0.05
Nodes (42): ContentPipelineInput, ContentRefineSnapshot, PageDocument, PageOutline, PageOutlineSection, PageOutlineSectionRole, VerifierVerdict, PrismaContentResultAdapter (+34 more)

### Community 2 - "company-context-form.tsx"
Cohesion: 0.05
Nodes (71): metadata, putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras, companyContextForPut(), CompanyContextObjection (+63 more)

### Community 3 - "asProviderInstanceId"
Cohesion: 0.11
Nodes (30): PendingSecretsItem, collectPendingSecrets(), ProviderTestCommand, Command, Option, DEFAULT_MODELS, convertProvider(), ProviderPromptResult (+22 more)

### Community 4 - "GatewayConfig"
Cohesion: 0.06
Nodes (41): assertInteractiveAllowed(), DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, convertModel(), ClientManagerService, Injectable (+33 more)

### Community 5 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.05
Nodes (36): ChatModule, Module, GlobalExceptionFilter, isPayloadTooLargeError(), Catch, Injectable, HealthModule, Module (+28 more)

### Community 6 - "runs.controller.ts"
Cohesion: 0.04
Nodes (78): JwtPayload, UserListItem, CancelRunUseCase, Inject, Injectable, FinalizeReviewUseCase, Inject, Injectable (+70 more)

### Community 7 - "cache.module.ts"
Cohesion: 0.10
Nodes (16): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+8 more)

### Community 8 - "RunRepository"
Cohesion: 0.03
Nodes (53): GetRunLogsOutput, Inject, InProcessRunWorker, Injectable, RunAbortRegistry, Injectable, RunLifecycleService, TransitionExtras (+45 more)

### Community 9 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.09
Nodes (42): toCachedChatResponse(), asInputTokens(), asOutputTokens(), asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent() (+34 more)

### Community 10 - "runs.types.ts"
Cohesion: 0.04
Nodes (95): filterFeedbackRunOptions(), ArchiveRunsQuery, fetchRunsSummary(), fetchUserRuns(), InitiatorOption, isUserRating(), patchRunRating(), UserRunsPageQuery (+87 more)

### Community 11 - "guest-run-policy.service.ts"
Cohesion: 0.07
Nodes (21): GUEST_ARCHIVE_STATUSES, GUEST_TASK_TYPES, GuestRunAdmit, isGuestArchiveStatus(), isGuestTaskType(), Inject, Inject, GuestQuotaAdmitResult (+13 more)

### Community 12 - "feedback-form.tsx"
Cohesion: 0.13
Nodes (22): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody(), parseFeedbackCreated() (+14 more)

### Community 13 - "prisma-run.adapter.ts"
Cohesion: 0.06
Nodes (26): LightRunItem, RunSnapshot, RunSummaryAggregate, RunSummaryScope, RunRecordBase, ALLOWED_RUN_STATES, assertTransition(), CANCELABLE_RUN_STATUSES (+18 more)

### Community 14 - "create-feedback.use-case.ts"
Cohesion: 0.06
Nodes (35): CreateFeedbackUseCase, Inject, Injectable, agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_RUN_READER, FeedbackRunLookup (+27 more)

### Community 15 - "provider-error.mapper.ts"
Cohesion: 0.18
Nodes (20): ApiErrorPayload, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isRateLimitStatus(), isServerError(), isTimeoutStatus() (+12 more)

### Community 16 - "branded.types.ts"
Cohesion: 0.13
Nodes (21): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+13 more)

### Community 17 - "ai-provider.interface.ts"
Cohesion: 0.08
Nodes (53): mapStopReasonToFinishReason(), buildAppProviderMetricsContext(), buildLlmMetricsContext(), mapProviderResponseToAiObservation(), mapProviderResponseToUsage(), toMetricsMessages(), buildProviderInputForAlias(), toProviderTurns() (+45 more)

### Community 18 - "cli.module.ts"
Cohesion: 0.04
Nodes (87): AgentReport, AgentReportStatus, CliMode, CliModule, Module, ClientListCommand, ClientListOptions, Command (+79 more)

### Community 19 - "chat.service.ts"
Cohesion: 0.05
Nodes (66): SemanticStoreEmbedState, CacheIdentityMessage, ChatCacheSource, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional (+58 more)

### Community 20 - "users-view.tsx"
Cohesion: 0.08
Nodes (43): metadata, createInvitation(), fetchInvitations(), resendInvitation(), revokeInvitation(), InvitationListItem, InviteCreated, isInvitationExpired() (+35 more)

### Community 21 - "LoggingService"
Cohesion: 0.05
Nodes (27): Inject, OllamaEmbeddingAdapter, Injectable, EmbeddingBackend, Inject, ChatErrorHandlerService, Injectable, ChatProviderCallService (+19 more)

### Community 22 - "configuration.ts"
Cohesion: 0.06
Nodes (51): CACHE_BACKEND_TYPE, isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, asCacheTtlSeconds(), asSemanticCacheTtlSeconds(), AppConfiguration (+43 more)

### Community 23 - "prisma-user.adapter.ts"
Cohesion: 0.06
Nodes (25): AccountActivationRecord, AccountActivationRepository, CreatePendingUser, RotateActivationTokenInput, AuthUser, CreateAdminIfNoneData, CreateAdminIfNoneResult, CreateUserData (+17 more)

### Community 24 - "ref_nestjs_common"
Cohesion: 0.07
Nodes (22): HealthController, ApiTags, Controller, PublicConfigController, PublicConfigResponse, ApiTags, Controller, Inject (+14 more)

### Community 25 - "cn"
Cohesion: 0.04
Nodes (79): logoutSession(), AuthModal(), AuthModalProps, descriptionFor(), titleFor(), RegisterSuccess, DemoChip(), useDemoMode() (+71 more)

### Community 26 - "types/index.ts"
Cohesion: 0.08
Nodes (48): CliAiProvider, CliRateLimit, GatewayClient, EnvPatchValue, WizardRunResult, ClientCli, EnvTemplateInput, generateEnvTemplate() (+40 more)

### Community 27 - "AuthController"
Cohesion: 0.13
Nodes (19): LogoutUseCase, Inject, Injectable, AuthController, ApiCookieAuth, ApiTags, Body, Controller (+11 more)

### Community 28 - "anthropic-response.mapper.ts"
Cohesion: 0.14
Nodes (24): SseDoneEvent, asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto, AnthropicTextContentBlockDto (+16 more)

### Community 29 - "ref_react"
Cohesion: 0.03
Nodes (99): apps_frontend_src_app_globals, AcceptInvitePage(), metadata, tokenFromSearchParam(), geistMono, inter, metadata, spaceGrotesk (+91 more)

### Community 30 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.07
Nodes (27): RedisConnectionService, Injectable, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromConfig(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv() (+19 more)

### Community 31 - "response-cache.service.ts"
Cohesion: 0.14
Nodes (15): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), CACHE_BACKEND, ResponseCacheService, Injectable, isSingleTurnUserRequest(), lastUserMessageText() (+7 more)

### Community 32 - "PrometheusAppMetricsAdapter"
Cohesion: 0.14
Nodes (5): PrometheusAppMetricsAdapter, Injectable, AppProviderCallContext, AppProviderStreamScope, AppTokenUsage

### Community 33 - "app-metrics.service.ts"
Cohesion: 0.12
Nodes (12): Inject, APP_METRICS_BACKEND, MetricsController, ApiOperation, ApiResponse, ApiTags, Controller, Get (+4 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "chat-response.dto.ts"
Cohesion: 0.04
Nodes (52): ApiHeader, ApiBody, ApiOperation, ApiResponse, Body, Post, Req, ChatOutputTextDto (+44 more)

### Community 36 - "domain/company-context.types.ts"
Cohesion: 0.16
Nodes (20): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CtaItem (+12 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (21): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+13 more)

### Community 38 - "run-details-view.tsx"
Cohesion: 0.07
Nodes (43): metadata, useSession(), useGuestLocked(), canEditResult(), fetchRunLogs(), fetchUserRunsPage(), finalizeRunReview(), UserRating (+35 more)

### Community 39 - "redis-vector-store.adapter.ts"
Cohesion: 0.19
Nodes (11): RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), isRedisSearchIndexAlreadyExistsError(), isRedisSearchMissingIndexError(), isRedisSearchModuleMissingError(), redisSearchErrorMessage(), semanticSchemaFtCreateArgs() (+3 more)

### Community 40 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.10
Nodes (29): CostUsd, ToolCallId, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext() (+21 more)

### Community 41 - "ChatMessageDto"
Cohesion: 0.16
Nodes (16): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+8 more)

### Community 42 - "dashboard-shell.tsx"
Cohesion: 0.08
Nodes (33): fetchCompleteness(), CompletenessState, GATE_SECTION_LABELS, CompletenessChip(), CompletenessContext, CompletenessContextValue, CompletenessProvider(), FALLBACK_ENVELOPE (+25 more)

### Community 43 - "ids.ts"
Cohesion: 0.09
Nodes (32): brand, ACCOUNT_ACTIVATION_ID_RE, AccountActivationId, CONV_ID_RE, ConversationId, createAccountActivationId(), createConversationId(), createFeedbackId() (+24 more)

### Community 44 - "chat-stream.controller.ts"
Cohesion: 0.07
Nodes (34): ChatController, ApiSecurity, ApiTags, Controller, CHAT_STREAM_API_DESCRIPTION, SseSerializer, ApiGatewayChatErrorResponses(), GatewayKeyAndSmartRateLimit() (+26 more)

### Community 45 - "UsersController"
Cohesion: 0.08
Nodes (21): ListUsersUseCase, Inject, Injectable, ReactivateUserUseCase, Inject, Injectable, PatchUserDto, ApiProperty (+13 more)

### Community 46 - "CachedChatResponse"
Cohesion: 0.19
Nodes (14): isUnservableCachedReply(), CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, parseCachedChatResponse(), asString(), ParsedKnnHits, parseKnnHits() (+6 more)

### Community 47 - "responses.adapter.ts"
Cohesion: 0.06
Nodes (67): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, toHttpException(), asSystemFingerprint(), asToolCallId(), asWarningCode(), ProviderAssistantTurn, ProviderChatTurn (+59 more)

### Community 48 - "swagger.setup.ts"
Cohesion: 0.07
Nodes (36): AppModule, Module, ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional (+28 more)

### Community 49 - "google-tools.mapper.ts"
Cohesion: 0.16
Nodes (22): buildGenerationConfig(), createGoogleProvider(), getFinalToolCalls(), getStopReason(), textStream(), mapStopSequences(), mapThinkingBudgetToGeminiLevel(), extractFromLegacyFields() (+14 more)

### Community 50 - "company-context.controller.ts"
Cohesion: 0.20
Nodes (14): toPublicCompanyContext(), GetCompanyContextUseCase, Injectable, GetCompletenessUseCase, Injectable, PatchCompanyContextUseCase, Injectable, PutCompanyContextUseCase (+6 more)

### Community 51 - "openai-chat-completions.controller.ts"
Cohesion: 0.11
Nodes (29): GATEWAY_CACHE_HEADER, fromGatewayToolCallDto(), OPENAI_INTEGRATION_PATH, OpenAiChatCompletionsController, ApiSecurity, ApiTags, Controller, OpenAiAuth() (+21 more)

### Community 52 - "semantic-cache.service.ts"
Cohesion: 0.10
Nodes (18): EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema(), EMBEDDING_CIRCUIT_COOLDOWN_MS, EMBEDDING_CIRCUIT_OPEN_AFTER, EMBEDDING_PROBE_TIMEOUT_MS (+10 more)

### Community 53 - "AppMetricsService"
Cohesion: 0.12
Nodes (5): HttpMetricsMiddleware, Injectable, AppMetricsService, Injectable, HttpMethod

### Community 54 - "llm-hop.ts"
Cohesion: 0.07
Nodes (48): coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema, pageOutlineSectionSchema, readNonEmptyString() (+40 more)

### Community 55 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.04
Nodes (54): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+46 more)

### Community 56 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 57 - "archive-runs-view.tsx"
Cohesion: 0.07
Nodes (37): metadata, CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS, RUN_TASK_TYPE_LABELS, fetchArchiveRuns() (+29 more)

### Community 58 - "api/src/health/health.service.ts"
Cohesion: 0.08
Nodes (23): GATEWAY_PROBE_TIMEOUT_MS, GatewayLivenessBody, GatewayLivenessProbe, GatewayLivenessProbeReason, GatewayLivenessProbeResult, isRecord(), parseGatewayLivenessBody(), probeFailureReason() (+15 more)

### Community 59 - "http-metrics.interceptor.ts"
Cohesion: 0.19
Nodes (11): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, gatewayErrorsTotal, httpRequestDurationSeconds, httpRequestsTotal (+3 more)

### Community 60 - ".streamChat"
Cohesion: 0.13
Nodes (13): ChatStreamController, ApiBody, ApiOperation, ApiProduces, ApiResponse, ApiSecurity, ApiTags, Body (+5 more)

### Community 61 - "ref_nestjs_swagger"
Cohesion: 0.04
Nodes (55): ApiAnthropicErrorResponses(), ApiRequestIdHeader(), HealthLivenessResponseDto, ApiProperty, AnthropicMessagesController, ApiSecurity, ApiTags, Controller (+47 more)

### Community 62 - "app-metrics-backend.interface.ts"
Cohesion: 0.13
Nodes (10): healthStatusToGaugeValue(), AppRequestLabels, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus, HttpRequestLabels (+2 more)

### Community 63 - "notify-product.tsx"
Cohesion: 0.20
Nodes (15): assertNever(), notifyProduct(), notifyRunCancelled(), notifyRunTerminal(), EnvelopeRef, ProductToast, RunTerminalInput, RunTerminalOutcome (+7 more)

### Community 64 - "provider-instances.bootstrap.ts"
Cohesion: 0.25
Nodes (10): assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryFn, openAiCompatibleApiSurface (+2 more)

### Community 65 - "NoopAppMetricsAdapter"
Cohesion: 0.15
Nodes (3): NoopAppMetricsAdapter, Injectable, resolveAppMetricsBackend()

### Community 66 - "ref_class_transformer"
Cohesion: 0.13
Nodes (15): ListRunsQueryDto, IsArray, IsIn, IsOptional, IsString, Transform, PaginationQueryDto, IsIn (+7 more)

### Community 67 - "VectorStore"
Cohesion: 0.22
Nodes (3): VectorStore, Inject, Optional

### Community 68 - "EnvPatchService"
Cohesion: 0.18
Nodes (7): ConfigSecretsStatusCommand, Command, Option, EnvPatchService, Injectable, ProviderTestService, Injectable

### Community 69 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 70 - "api/src/main.ts"
Cohesion: 0.21
Nodes (10): AppModule, Module, bootstrap(), parseCorsOrigins(), configureHttpApp(), buildSwaggerConfig(), ref_cookie_parser, ref_helmet (+2 more)

### Community 71 - "MetricsService"
Cohesion: 0.17
Nodes (8): MetricsController, Controller, Get, Res, MetricsService, Inject, Injectable, RunStatsPort

### Community 72 - "EnvelopeError"
Cohesion: 0.15
Nodes (18): resendActivation(), initialState, RegistrationThankYou(), onResend(), RegistrationThankYouProps, RegistrationThankYouState, LANDING_CONTEXT_IMAGES, LANDING_COPY (+10 more)

### Community 73 - "api/src/app.module.ts"
Cohesion: 0.06
Nodes (55): AuthModule, Module, CompanyContextModule, Module, ContentPipelineFacade, toOutcome(), Inject, Injectable (+47 more)

### Community 74 - "logging.module.ts"
Cohesion: 0.06
Nodes (25): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+17 more)

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "PrometheusService"
Cohesion: 0.20
Nodes (4): PrometheusService, Injectable, PrometheusMetrics, ref_prom_client

### Community 77 - "run-sse.hub.ts"
Cohesion: 0.17
Nodes (6): AutoFinalizeExpiredReviewsUseCase, Inject, Injectable, Inject, RunSseHub, ref_rxjs

### Community 78 - "start-run-form.tsx"
Cohesion: 0.08
Nodes (38): metadata, fetchCompanyContext(), GUEST_ALLOWED_TASK_TYPES, GUEST_CONTACTS, GUEST_QUOTA_CODES, GuestAllowedTaskType, GuestContact, GuestQuotaCode (+30 more)

### Community 79 - "run-result-editor.tsx"
Cohesion: 0.04
Nodes (50): buildOutputEditedBody(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload(), RESULT_KEYS_BY_TASK_TYPE (+42 more)

### Community 80 - ".chat"
Cohesion: 0.27
Nodes (4): LlmGatewayError, LlmGatewayHttpAdapter, Inject, Injectable

### Community 81 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 82 - "user-invited.template.ts"
Cohesion: 0.14
Nodes (27): TransactionalMail, UserActivationMail, UserInvitedMail, UserWelcomeMail, ASSETS_DIR, BRAND_CID, resolveBrandCidAttachments(), escapeHtml() (+19 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "InMemoryRunSseHub"
Cohesion: 0.29
Nodes (4): RunSseEvent, InMemoryRunSseHub, Inject, Injectable

### Community 85 - "InvitationsController"
Cohesion: 0.08
Nodes (21): InviteUserUseCase, Injectable, ListInvitationsUseCase, Inject, Injectable, RevokeInvitationUseCase, Inject, Injectable (+13 more)

### Community 86 - "llm-gateway.http.adapter.ts"
Cohesion: 0.22
Nodes (8): GatewayChatResponse, GatewayErrorBody, RETRYABLE_CODES, LlmUsage, GATEWAY_ERROR_CODE_LABELS, toGatewayErrorCodeLabel(), packages_shared_dist_index_createrequestid, packages_shared_dist_index_isrequestid

### Community 87 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 88 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 89 - "packages_shared_dist_index"
Cohesion: 0.05
Nodes (34): DeleteUserResult, DeleteUserUseCase, Inject, Injectable, RefreshSessionRecord, RefreshSessionRepository, RotateRefreshSessionResult, PrismaRefreshSessionAdapter (+26 more)

### Community 90 - "llm-gateway.types.ts"
Cohesion: 0.29
Nodes (6): LlmGatewayPort, LlmChatCommand, LlmChatParams, LlmChatResult, Inject, packages_shared_dist_index_gatewaymodelalias

### Community 91 - "ModelAlias"
Cohesion: 0.09
Nodes (5): ProviderTestOptions, ModelAlias, ProviderInstanceId, AppMetricsBackend, TokenDirection

### Community 92 - "asClientId"
Cohesion: 0.09
Nodes (29): KeyGenerateCommand, Command, Option, InitAnswers, CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema, convertClient() (+21 more)

### Community 93 - "social.graph.ts"
Cohesion: 0.11
Nodes (39): LlmHopService, Injectable, loadPromptFromDir(), renderPrompt(), coercePassNoteVerdict(), isPassOnlyIssue(), Inject, ideasOutputSchema (+31 more)

### Community 94 - "CompanyContextController"
Cohesion: 0.29
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 95 - "HealthController"
Cohesion: 0.31
Nodes (6): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get

### Community 96 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 97 - "route.ts"
Cohesion: 0.13
Nodes (17): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+9 more)

### Community 98 - "llm-gateway-chat.log.ts"
Cohesion: 0.31
Nodes (8): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), LlmChatMessage

### Community 99 - "ClientRemoveCommand"
Cohesion: 0.33
Nodes (3): ClientRemoveCommand, Command, Option

### Community 100 - "StartRunDto"
Cohesion: 0.22
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 101 - "exitWithAgentReport"
Cohesion: 0.10
Nodes (18): emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), loadAnswers(), assertAgentHasAnswers(), CliModeFlags, markAgentRuntime(), resolveCliMode() (+10 more)

### Community 102 - "models.controller.ts"
Cohesion: 0.10
Nodes (22): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+14 more)

### Community 103 - "ProviderRemoveCommand"
Cohesion: 0.33
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 104 - "openai-models.controller.ts"
Cohesion: 0.13
Nodes (20): ApiOpenAiErrorResponses(), OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+12 more)

### Community 106 - "ConfigValidateCommand"
Cohesion: 0.50
Nodes (3): ConfigValidateCommand, Command, Option

### Community 107 - ".get"
Cohesion: 0.50
Nodes (3): ApiOkResponse, ApiOperation, Get

### Community 108 - "health.api.ts"
Cohesion: 0.30
Nodes (10): fetchGatewayAlive(), fetchHealthReady(), HealthCheck, HealthCheckStatus, HealthReadyAggregate, HealthReadyResponse, isGatewayAlive(), isRecord() (+2 more)

### Community 112 - "src/pagination.ts"
Cohesion: 0.29
Nodes (5): DEFAULT_PAGE, DEFAULT_PAGE_SIZE, PAGE_SIZES, PageSize, PaginatedList

### Community 114 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 115 - "auth.module.ts"
Cohesion: 0.04
Nodes (104): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Inject, Injectable, ActivateAccountOutput, ActivateAccountUseCase, Inject (+96 more)

### Community 117 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 118 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 119 - "start-run.use-case.ts"
Cohesion: 0.13
Nodes (18): isContentStartCommand(), isPlainRecord(), omitUndefinedDeep(), StartRunBriefInput, StartRunCommand, makeContentRun(), makeSocialRun(), makeSocialSnapshot() (+10 more)

### Community 123 - "ConfigInitCommand"
Cohesion: 0.31
Nodes (3): ConfigInitCommand, Command, Option

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 125 - "CompanyContext"
Cohesion: 0.18
Nodes (10): assertAudienceProfileNamesUnique(), CompanyContext, CompanyContextWriteDetail, normalizeAudienceName(), withEffectiveAudience(), jsonArray(), jsonRecord(), PrismaCompanyContextAdapter (+2 more)

### Community 126 - "save-output-edited.use-case.ts"
Cohesion: 0.06
Nodes (40): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+32 more)

### Community 129 - "CompanyContextRepository"
Cohesion: 0.18
Nodes (5): Inject, Inject, Inject, Inject, CompanyContextRepository

### Community 130 - "company-context.mapper.ts"
Cohesion: 0.15
Nodes (12): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+4 more)

### Community 131 - "src/index.ts"
Cohesion: 0.33
Nodes (3): unbrand, RunTaskType, RunsSummaryResponse

## Knowledge Gaps
- **499 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+494 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1311 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `isRunId()` connect `ids.ts` to `RunRepository`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `ModelAlias` to `asProviderInstanceId`, `GatewayConfig`, `branded.types.ts`, `ai-provider.interface.ts`, `chat.service.ts`, `LoggingService`, `configuration.ts`, `types/index.ts`, `PrometheusAppMetricsAdapter`, `app-metrics.service.ts`, `chat-response.dto.ts`, `sentry-ai-metrics.adapter.ts`, `CachedChatResponse`, `AppMetricsService`, `app-metrics-backend.interface.ts`, `NoopAppMetricsAdapter`, `logging.module.ts`, `asClientId`, `exitWithAgentReport`, `models.controller.ts`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **Why does `AppMetricsBackend` connect `ModelAlias` to `PrometheusAppMetricsAdapter`, `NoopAppMetricsAdapter`, `app-metrics-backend.interface.ts`, `app-metrics.service.ts`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _499 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `prisma-invitation.adapter.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1425287356321839 - nodes in this community are weakly interconnected._
- **Should `get-run.use-case.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.046218487394957986 - nodes in this community are weakly interconnected._
- **Should `company-context-form.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05364314400458979 - nodes in this community are weakly interconnected._