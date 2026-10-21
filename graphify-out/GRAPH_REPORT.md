# Graph Report - content-chain  (2026-10-21)

## Corpus Check
- 721 files · ~261,589 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: .ico 1, .css 1)

## Summary
- 4778 nodes · 15511 edges · 141 communities (126 shown, 14 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 421 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `548138a0`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- resend-activation.use-case.ts
- social.types.ts
- company-context-form.tsx
- gateway-config.schema.ts
- asProviderInstanceId
- chat.service.ts
- ref_react
- logging.module.ts
- ref_nestjs_common
- anthropic/anthropic-tools.mapper.ts
- apiFetch
- auth.module.ts
- own-runs-provider.tsx
- prisma-run.adapter.ts
- cn
- provider-error.mapper.ts
- types/index.ts
- branded.types.ts
- exitWithAgentReport
- dashboard-shell.tsx
- model-manager.service.ts
- LoggingService
- configuration.ts
- UserRepository
- redis-vector-store.adapter.ts
- feedback-form.tsx
- home-entry.tsx
- resilient-executor.ts
- packages_shared_dist_index_userid
- AppMetricsBackend
- responses.adapter.ts
- RunRepository
- company-context.controller.ts
- google-tools.mapper.ts
- AnthropicMessagesRequestDto
- AuthUserContext
- domain/company-context.types.ts
- enums.ts
- run-result-view.tsx
- semantic-cache.service.ts
- sentry-ai-metrics.adapter.ts
- openai-params-provider.mapper.ts
- chat-completions.adapter.ts
- ids.ts
- ioredis-guest-quota.adapter.ts
- metrics.ts
- output-edited-result.schemas.ts
- AppMetricsService
- export-openapi.ts
- anthropic-response.mapper.ts
- runs.types.ts
- health.api.ts
- anthropic-messages.controller.ts
- getAppConfig
- content.graph.ts
- PrismaCompanyContextAdapter
- company-context.schemas.ts
- start-run-form.tsx
- ref_nestjs_swagger
- llm-hop.ts
- InvitationsController
- OpenAiChatCompletionRequestDto
- HealthService
- app-metrics.module.ts
- anthropic-models.controller.ts
- ClientEditCommand
- http-metrics.interceptor.ts
- ConfigInitCommand
- RefreshSessionRepository
- new-ids.ts
- ClientAddCommand
- openai-stream.mapper.ts
- KeyGenerateCommand
- api/src/app.module.ts
- InMemoryRunSseHub
- parse-verifier-log-message.ts
- ai-provider-gateway/src/health/health.module.ts
- api/src/health/health.service.ts
- archive-runs-view.tsx
- CompanyContextController
- PrometheusService
- provider-registry.service.ts
- user-activation.template.ts
- SPEC — README
- PrometheusAppMetricsAdapter
- UsersController
- provider-instances.bootstrap.ts
- company-context.dto.ts
- ProviderEditCommand
- ClientRemoveCommand
- GatewayConfig
- ModelAlias
- cli.module.ts
- social.graph.ts
- run.schemas.ts
- ai-provider-gateway/src/health/health.service.ts
- RedisConnectionService
- route.ts
- config-generator.service.ts
- CompanyContext
- StartRunDto
- agent-answers.schema.ts
- models.controller.ts
- ProviderAddCommand
- openai-models.controller.ts
- JwtAuthGuard
- .runProviderTest
- ai-provider-gateway/src/app.module.ts
- ListRunsQueryDto
- response-cache.service.ts
- .getOne
- get-runs-summary.use-case.ts
- .getOne
- .getOne
- ModelRemoveCommand
- ModelAddCommand
- openai-messages-provider.mapper.ts
- ModelEditCommand
- GatewayModelsCatalogService
- ClientId
- public-config.controller.ts
- HttpExceptionFilter
- JwtCookieStrategy
- .get
- Architektura
- brand.ts
- GuestGuard
- HitlDto
- PatchRunRatingDto
- parse-llm-json.ts
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
5. `asProviderInstanceId()` - 67 edges
6. `isRecord()` - 67 edges
7. `GatewayConfig` - 65 edges
8. `cn()` - 65 edges
9. `AuthUserContext` - 62 edges
10. `GatewayKey` - 59 edges

## Surprising Connections (you probably didn't know these)
- `mapGatewayResponseToAnthropicFormat()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/anthropic/mappers/anthropic-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `Request` --references--> `AuthUserContext`  [EXTRACTED]
  apps/api/src/shared/http/express.d.ts → apps/api/src/shared/types/auth-user-context.ts
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `RedisConnectionService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-connection.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `CacheRegistryService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/cache-registry.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (141 total, 14 thin omitted)

### Community 0 - "resend-activation.use-case.ts"
Cohesion: 0.09
Nodes (18): ActivateAccountInput, activateAccountSchema, BootstrapAdminInput, bootstrapAdminSchema, LoginInput, loginSchema, PatchUserCommand, patchUserSchema (+10 more)

### Community 1 - "social.types.ts"
Cohesion: 0.06
Nodes (27): CompositeRunResultReader, GetRunOutput, RunResultReader, SocialBrief, EmptyRunResultReader, Injectable, toInputJson(), SocialResultStore (+19 more)

### Community 2 - "company-context-form.tsx"
Cohesion: 0.05
Nodes (71): metadata, putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras, companyContextForPut(), CompanyContextObjection (+63 more)

### Community 3 - "gateway-config.schema.ts"
Cohesion: 0.09
Nodes (48): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, CliAiModelSchema (+40 more)

### Community 4 - "asProviderInstanceId"
Cohesion: 0.08
Nodes (51): PendingSecretsItem, assertInteractiveAllowed(), collectPendingSecrets(), DEFAULT_MODELS, InitAnswers, convertProvider(), CliAiProvider, KeyPromptService (+43 more)

### Community 5 - "chat.service.ts"
Cohesion: 0.06
Nodes (52): SemanticStoreEmbedState, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize (+44 more)

### Community 6 - "ref_react"
Cohesion: 0.06
Nodes (74): bootstrapAdmin(), registerAccount(), AccountEmailFormState, AuthModal(), AuthModalProps, descriptionFor(), titleFor(), BootstrapAdminForm() (+66 more)

### Community 7 - "logging.module.ts"
Cohesion: 0.06
Nodes (25): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+17 more)

### Community 8 - "ref_nestjs_common"
Cohesion: 0.05
Nodes (90): AcceptInviteResult, acceptInviteSchema, ActivateAccountOutput, comparePassword(), generateRefreshToken(), hashPassword(), hashRefreshToken(), parseTtlMs() (+82 more)

### Community 9 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.10
Nodes (38): asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent(), isAnthropicEffortLevel(), mapThinkingBudgetToAnthropicEffort(), mapThinkingToAnthropic() (+30 more)

### Community 10 - "apiFetch"
Cohesion: 0.07
Nodes (50): activateAccount(), Credentials, fetchBootstrapStatus(), fetchUserSession(), loginWithPassword(), logoutSession(), patchOwnEmail(), resendActivation() (+42 more)

### Community 11 - "auth.module.ts"
Cohesion: 0.04
Nodes (70): AcceptInviteUseCase, Inject, Injectable, ActivateAccountUseCase, Injectable, BootstrapAdminUseCase, Inject, Injectable (+62 more)

### Community 12 - "own-runs-provider.tsx"
Cohesion: 0.08
Nodes (37): assertNever(), notifyProduct(), notifyRunCancelled(), notifyRunTerminal(), EnvelopeRef, ProductToast, RunTerminalInput, RunTerminalOutcome (+29 more)

### Community 13 - "prisma-run.adapter.ts"
Cohesion: 0.05
Nodes (28): RunLifecycleService, TransitionExtras, Injectable, OUTPUT_EDITED_WRITER, LightRunItem, ListRunsResult, RunSnapshot, RunSummaryAggregate (+20 more)

### Community 14 - "cn"
Cohesion: 0.05
Nodes (60): AcceptInvitePage(), metadata, tokenFromSearchParam(), ACCEPT_INVITE_DEMO_HINT, ACCEPT_INVITE_UNAUTHORIZED_HINT, AcceptInviteFormError, toAcceptInviteFormError(), acceptInvite() (+52 more)

### Community 15 - "provider-error.mapper.ts"
Cohesion: 0.21
Nodes (19): MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isRateLimitStatus(), isServerError(), isTimeoutStatus(), nameLooksLikeTimeout() (+11 more)

### Community 16 - "types/index.ts"
Cohesion: 0.13
Nodes (24): RequestIdMiddleware, Injectable, CONVERSATION_ID_PATTERN, createRequestId(), isAttemptNumber(), isBaseUrl(), isCacheTtlSeconds(), isConversationId() (+16 more)

### Community 17 - "branded.types.ts"
Cohesion: 0.08
Nodes (53): CachedChatResponse, CachedChatWarning, CachedFinishReason, CacheIdentityMessage, ChatCacheSource, ChatResponseData, SseMetaPayload, SseMetaPayloadDto (+45 more)

### Community 18 - "exitWithAgentReport"
Cohesion: 0.19
Nodes (10): exitWithAgentReport(), loadAnswers(), assertAgentHasAnswers(), markAgentRuntime(), resolveCliMode(), WizardState, Injectable, WizardOrchestratorService (+2 more)

### Community 19 - "dashboard-shell.tsx"
Cohesion: 0.06
Nodes (45): fetchCompleteness(), CompletenessState, GATE_SECTION_LABELS, CompletenessChip(), CompletenessContext, CompletenessContextValue, CompletenessProvider(), FALLBACK_ENVELOPE (+37 more)

### Community 20 - "model-manager.service.ts"
Cohesion: 0.12
Nodes (26): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, defaultModelPolicy(), ModelEditField, ModelManagerService, Injectable (+18 more)

### Community 21 - "LoggingService"
Cohesion: 0.08
Nodes (14): Inject, OllamaEmbeddingAdapter, Injectable, EmbeddingBackend, Inject, StreamCacheReplayService, Injectable, LogContext (+6 more)

### Community 22 - "configuration.ts"
Cohesion: 0.04
Nodes (69): CACHE_BACKEND_TYPE, CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv() (+61 more)

### Community 23 - "UserRepository"
Cohesion: 0.04
Nodes (33): Inject, BootstrapStatusUseCase, Inject, Injectable, ListUsersUseCase, Inject, Injectable, Inject (+25 more)

### Community 24 - "redis-vector-store.adapter.ts"
Cohesion: 0.12
Nodes (20): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), asString(), ParsedKnnHits, parseKnnHits() (+12 more)

### Community 25 - "feedback-form.tsx"
Cohesion: 0.12
Nodes (25): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, filterFeedbackRunOptions(), CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody() (+17 more)

### Community 26 - "home-entry.tsx"
Cohesion: 0.11
Nodes (19): ACTIVATION_FAILED_HINT, AuthMode, AuthUi, GuestSurface, HomeEntry(), initialAuth, LANDING_CONTEXT_IMAGES, LANDING_COPY (+11 more)

### Community 27 - "resilient-executor.ts"
Cohesion: 0.17
Nodes (19): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+11 more)

### Community 28 - "packages_shared_dist_index_userid"
Cohesion: 0.03
Nodes (65): DeleteUserResult, DeleteUserUseCase, Inject, Injectable, UserRow, CreateFeedbackUseCase, Inject, Injectable (+57 more)

### Community 30 - "responses.adapter.ts"
Cohesion: 0.23
Nodes (18): asInputTokens(), asOutputTokens(), getUsageMetadata(), buildResponsesCreateParams(), createResponsesAdapter(), textStream(), mapGatewayMetadataToOpenAi(), extractResponsesToolCalls() (+10 more)

### Community 31 - "RunRepository"
Cohesion: 0.03
Nodes (22): AutoFinalizeExpiredReviewsUseCase, Inject, Injectable, Inject, Inject, Inject, Inject, InProcessRunWorker (+14 more)

### Community 32 - "company-context.controller.ts"
Cohesion: 0.15
Nodes (14): GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PatchCompanyContextUseCase, Inject (+6 more)

### Community 33 - "google-tools.mapper.ts"
Cohesion: 0.16
Nodes (22): buildGenerationConfig(), createGoogleProvider(), getFinalToolCalls(), getStopReason(), textStream(), mapStopSequences(), mapThinkingBudgetToGeminiLevel(), extractFromLegacyFields() (+14 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "AuthUserContext"
Cohesion: 0.04
Nodes (67): MeUseCase, Injectable, AuthController, ApiCookieAuth, ApiTags, Body, Controller, Get (+59 more)

### Community 36 - "domain/company-context.types.ts"
Cohesion: 0.15
Nodes (21): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CompanyContextWriteDetail (+13 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (21): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+13 more)

### Community 38 - "run-result-view.tsx"
Cohesion: 0.04
Nodes (57): buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload() (+49 more)

### Community 39 - "semantic-cache.service.ts"
Cohesion: 0.07
Nodes (32): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName() (+24 more)

### Community 40 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.10
Nodes (25): NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes(), clearLlmScopeContext() (+17 more)

### Community 41 - "openai-params-provider.mapper.ts"
Cohesion: 0.12
Nodes (24): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+16 more)

### Community 42 - "chat-completions.adapter.ts"
Cohesion: 0.21
Nodes (19): toHttpException(), asSystemFingerprint(), ChatCompletionsAdapterOptions, createChatCompletionsAdapter(), textStream(), mapTurnsToOpenAiMessages(), accumulateOpenAiStreamToolCallDeltas(), extractOpenAiStreamDeltaText() (+11 more)

### Community 43 - "ids.ts"
Cohesion: 0.09
Nodes (32): brand, ACCOUNT_ACTIVATION_ID_RE, AccountActivationId, CONV_ID_RE, ConversationId, createAccountActivationId(), createConversationId(), createFeedbackId() (+24 more)

### Community 44 - "ioredis-guest-quota.adapter.ts"
Cohesion: 0.08
Nodes (21): isGuestTaskType(), GUEST_QUOTA, GuestQuotaAdmitResult, GuestQuotaPort, GuestQuotaModule, Module, createRedis(), IoredisGuestQuotaAdapter (+13 more)

### Community 45 - "metrics.ts"
Cohesion: 0.09
Nodes (33): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+25 more)

### Community 46 - "output-edited-result.schemas.ts"
Cohesion: 0.12
Nodes (15): contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema, ideasArraySchema (+7 more)

### Community 47 - "AppMetricsService"
Cohesion: 0.12
Nodes (6): HttpMetricsMiddleware, Injectable, ActiveStreamsTracker, Injectable, AppMetricsService, Injectable

### Community 48 - "export-openapi.ts"
Cohesion: 0.07
Nodes (27): AppModule, Module, bootstrap(), API_GLOBAL_PREFIX, PORT, setupApp(), exportOpenApi(), OPENAPI_OUTPUT_FILENAME (+19 more)

### Community 49 - "anthropic-response.mapper.ts"
Cohesion: 0.13
Nodes (25): SseDoneEvent, asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto, AnthropicTextContentBlockDto (+17 more)

### Community 50 - "runs.types.ts"
Cohesion: 0.06
Nodes (77): LightRunRow, ArchiveRunsQuery, fetchRunLogs(), InitiatorOption, isUserRating(), patchRunRating(), HitlAccepted, isPageOutlineSectionRole() (+69 more)

### Community 51 - "health.api.ts"
Cohesion: 0.30
Nodes (10): fetchGatewayAlive(), fetchHealthReady(), HealthCheck, HealthCheckStatus, HealthReadyAggregate, HealthReadyResponse, isGatewayAlive(), isRecord() (+2 more)

### Community 52 - "anthropic-messages.controller.ts"
Cohesion: 0.03
Nodes (79): ApiHeader, GATEWAY_CACHE_HEADER, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags (+71 more)

### Community 53 - "getAppConfig"
Cohesion: 0.08
Nodes (26): ChatModule, Module, readClientGatewayKey(), readGatewayKeyHeader(), resolveClientIdFromKey(), ResolvedGatewayClient, getAppConfig(), GatewayKeyGuard (+18 more)

### Community 54 - "content.graph.ts"
Cohesion: 0.06
Nodes (53): Inject, coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, pageDocumentOutputSchema, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema (+45 more)

### Community 55 - "PrismaCompanyContextAdapter"
Cohesion: 0.27
Nodes (5): emptyCompanyContext(), jsonArray(), jsonRecord(), PrismaCompanyContextAdapter, Injectable

### Community 56 - "company-context.schemas.ts"
Cohesion: 0.33
Nodes (5): companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema

### Community 57 - "start-run-form.tsx"
Cohesion: 0.07
Nodes (39): metadata, metadata, fetchCompanyContext(), GuestLimitModal(), GUEST_ALLOWED_TASK_TYPES, GUEST_CONTACTS, GUEST_QUOTA_CODES, GuestAllowedTaskType (+31 more)

### Community 58 - "ref_nestjs_swagger"
Cohesion: 0.04
Nodes (70): ChatOutputTextDto, ApiProperty, ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional (+62 more)

### Community 59 - "llm-hop.ts"
Cohesion: 0.06
Nodes (39): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), LlmGatewayError (+31 more)

### Community 60 - "InvitationsController"
Cohesion: 0.13
Nodes (13): InviteUserDto, ApiProperty, IsEmail, InvitationsController, ApiCookieAuth, ApiTags, Body, Controller (+5 more)

### Community 61 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.07
Nodes (33): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+25 more)

### Community 62 - "HealthService"
Cohesion: 0.18
Nodes (4): HealthReadinessResponseDto, ApiProperty, HealthService, Injectable

### Community 63 - "app-metrics.module.ts"
Cohesion: 0.10
Nodes (14): Inject, Optional, resolveAppMetricsBackend(), APP_METRICS_BACKEND, MetricsController, ApiOperation, ApiResponse, ApiTags (+6 more)

### Community 64 - "anthropic-models.controller.ts"
Cohesion: 0.28
Nodes (10): ApiAnthropicErrorResponses(), AnthropicErrorBodyDto, AnthropicErrorResponseDto, ApiProperty, AnthropicModelDto, AnthropicModelsListResponseDto, ApiProperty, mapGatewayModelsListToAnthropic() (+2 more)

### Community 65 - "ClientEditCommand"
Cohesion: 0.33
Nodes (3): ClientEditCommand, Command, Option

### Community 66 - "http-metrics.interceptor.ts"
Cohesion: 0.12
Nodes (16): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, MetricsController, Controller, Get (+8 more)

### Community 67 - "ConfigInitCommand"
Cohesion: 0.31
Nodes (3): ConfigInitCommand, Command, Option

### Community 68 - "RefreshSessionRepository"
Cohesion: 0.12
Nodes (8): LogoutUseCase, Inject, Injectable, RefreshSessionRecord, RefreshSessionRepository, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable

### Community 69 - "new-ids.ts"
Cohesion: 0.10
Nodes (20): isContentStartCommand(), isPlainRecord(), omitUndefinedDeep(), ParseRunIdPipe, Injectable, makeContentRun(), makeSocialRun(), makeSocialSnapshot() (+12 more)

### Community 70 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 71 - "openai-stream.mapper.ts"
Cohesion: 0.17
Nodes (21): fromGatewayToolCallDto(), OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty (+13 more)

### Community 72 - "KeyGenerateCommand"
Cohesion: 0.27
Nodes (3): KeyGenerateCommand, Command, Option

### Community 73 - "api/src/app.module.ts"
Cohesion: 0.06
Nodes (56): AuthModule, Module, CompanyContextModule, Module, ContentPipelineFacade, toOutcome(), Injectable, ContentRunExecutor (+48 more)

### Community 74 - "InMemoryRunSseHub"
Cohesion: 0.29
Nodes (4): RunSseEvent, InMemoryRunSseHub, Inject, Injectable

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "ai-provider-gateway/src/health/health.module.ts"
Cohesion: 0.21
Nodes (8): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, HealthModule, Module

### Community 77 - "api/src/health/health.service.ts"
Cohesion: 0.08
Nodes (28): GATEWAY_PROBE_TIMEOUT_MS, GatewayLivenessBody, GatewayLivenessProbe, GatewayLivenessProbeReason, GatewayLivenessProbeResult, isRecord(), parseGatewayLivenessBody(), probeFailureReason() (+20 more)

### Community 78 - "archive-runs-view.tsx"
Cohesion: 0.04
Nodes (75): metadata, metadata, apps_frontend_src_app_globals, geistMono, inter, metadata, spaceGrotesk, SessionContext (+67 more)

### Community 79 - "CompanyContextController"
Cohesion: 0.13
Nodes (12): toCompanyContext(), toPartialCompanyContext(), CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Body, Controller (+4 more)

### Community 80 - "PrometheusService"
Cohesion: 0.20
Nodes (4): PrometheusService, Injectable, PrometheusMetrics, ref_prom_client

### Community 81 - "provider-registry.service.ts"
Cohesion: 0.12
Nodes (13): clamp(), isOverrideKey(), resolveProviderCallOptions(), OVERRIDE_KEYS, OverrideKey, UnsupportedProviderException, GatewayCapabilitiesConfig, GatewayModelConfig (+5 more)

### Community 82 - "user-activation.template.ts"
Cohesion: 0.28
Nodes (14): UserActivationMail, UserInvitedMail, escapeHtml(), MAIL_PALETTE, MailPalette, MailShellContent, MailShellTextContent, wrapMailHtml() (+6 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "PrometheusAppMetricsAdapter"
Cohesion: 0.12
Nodes (5): PrometheusAppMetricsAdapter, Injectable, AppProviderCallContext, AppProviderStreamScope, AppTokenUsage

### Community 85 - "UsersController"
Cohesion: 0.13
Nodes (15): PatchUserDto, ApiProperty, IsBoolean, ApiCookieAuth, ApiTags, Body, Controller, Delete (+7 more)

### Community 86 - "provider-instances.bootstrap.ts"
Cohesion: 0.22
Nodes (12): GatewayProviderInstanceConfig, assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryFn (+4 more)

### Community 87 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 88 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 89 - "ClientRemoveCommand"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

### Community 90 - "GatewayConfig"
Cohesion: 0.06
Nodes (19): ProviderRemoveCommand, Command, Option, ClientManagerService, Injectable, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable (+11 more)

### Community 91 - "ModelAlias"
Cohesion: 0.09
Nodes (6): ProviderTestOptions, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, SemanticCacheLookupResult

### Community 92 - "cli.module.ts"
Cohesion: 0.06
Nodes (54): AgentReport, AgentReportStatus, emitAgentReport(), exitCodeForReport(), CliMode, CliModeFlags, CliModule, Module (+46 more)

### Community 93 - "social.graph.ts"
Cohesion: 0.08
Nodes (52): loadPromptFromDir(), renderPrompt(), coercePassNoteVerdict(), isPassOnlyIssue(), coerceVerifierIssue(), ContentOutput, contentOutputSchema, IdeasOutput (+44 more)

### Community 94 - "run.schemas.ts"
Cohesion: 0.13
Nodes (15): contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, socialBriefSchema (+7 more)

### Community 95 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.26
Nodes (10): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty, ApiPropertyOptional (+2 more)

### Community 96 - "RedisConnectionService"
Cohesion: 0.27
Nodes (3): RedisConnectionService, Injectable, isRedisRequiredFromConfig()

### Community 97 - "route.ts"
Cohesion: 0.13
Nodes (17): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+9 more)

### Community 98 - "config-generator.service.ts"
Cohesion: 0.16
Nodes (11): ConfigGeneratorService, Injectable, FileManagerService, Injectable, WizardRunResult, EnvTemplateInput, generateEnvTemplate(), isEnvInputRedisRequired() (+3 more)

### Community 99 - "CompanyContext"
Cohesion: 0.27
Nodes (9): toPublicCompanyContext(), assertAudienceProfileNamesUnique(), assertCompanyContextWritable(), PartialCompanyContext, CompanyContext, isComplete(), mergeCompanyContext(), normalizeAudienceName() (+1 more)

### Community 100 - "StartRunDto"
Cohesion: 0.22
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 101 - "agent-answers.schema.ts"
Cohesion: 0.11
Nodes (21): ClientAddAnswers, ClientAddAnswersSchema, ClientEditAnswers, ClientEditAnswersSchema, ClientRemoveAnswers, ClientRemoveAnswersSchema, InitAnswersSchema, ModelAddAnswers (+13 more)

### Community 102 - "models.controller.ts"
Cohesion: 0.24
Nodes (9): ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, GatewayModelCapabilitiesDto, GatewayModelDto, ApiProperty, ApiPropertyOptional, ModelsListResponseDto (+1 more)

### Community 103 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 104 - "openai-models.controller.ts"
Cohesion: 0.27
Nodes (10): ApiOpenAiErrorResponses(), OpenAiErrorBodyDto, OpenAiErrorResponseDto, ApiProperty, ApiPropertyOptional, OpenAiModelDto, OpenAiModelsListResponseDto, ApiProperty (+2 more)

### Community 105 - "JwtAuthGuard"
Cohesion: 0.25
Nodes (4): JwtAuthGuard, Injectable, RolesGuard, Injectable

### Community 106 - ".runProviderTest"
Cohesion: 0.20
Nodes (5): ProviderTestCommand, Command, Option, ProviderTestService, Injectable

### Community 107 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.09
Nodes (20): IntegrationsModule, Module, AiMetricsModule, Global, Module, AppMetricsModule, Global, Module (+12 more)

### Community 108 - "ListRunsQueryDto"
Cohesion: 0.14
Nodes (12): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+4 more)

### Community 109 - "response-cache.service.ts"
Cohesion: 0.09
Nodes (21): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+13 more)

### Community 110 - ".getOne"
Cohesion: 0.19
Nodes (11): ApiGatewayModelsErrorResponses(), ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+3 more)

### Community 111 - "get-runs-summary.use-case.ts"
Cohesion: 0.18
Nodes (10): CacheEntry, cacheKey(), GetRunsSummaryUseCase, RUNS_SUMMARY_CACHE_TTL_MS, RUNS_SUMMARY_WINDOW_MS, scopeFor(), successRate(), Inject (+2 more)

### Community 112 - ".getOne"
Cohesion: 0.19
Nodes (10): AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+2 more)

### Community 113 - ".getOne"
Cohesion: 0.19
Nodes (10): OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+2 more)

### Community 114 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 115 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 116 - "openai-messages-provider.mapper.ts"
Cohesion: 0.28
Nodes (6): ProviderAssistantTurn, ProviderToolResultTurn, ChatCompletionMessageParam, mapAssistantTurn(), mapAssistantTurnToResponsesInput(), mapTurnsToResponsesInput()

### Community 117 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 119 - "ClientId"
Cohesion: 0.22
Nodes (12): ClientId, healthStatusToGaugeValue(), AppRequestLabels, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus (+4 more)

### Community 120 - "public-config.controller.ts"
Cohesion: 0.29
Nodes (5): PublicConfigController, PublicConfigResponse, ApiTags, Controller, Inject

### Community 122 - "JwtCookieStrategy"
Cohesion: 0.33
Nodes (4): isRecord(), JwtCookieStrategy, Inject, Injectable

### Community 123 - ".get"
Cohesion: 0.50
Nodes (3): ApiOkResponse, ApiOperation, Get

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 125 - "brand.ts"
Cohesion: 0.33
Nodes (3): unbrand, RunTaskType, RunsSummaryResponse

### Community 126 - "GuestGuard"
Cohesion: 0.40
Nodes (3): GuestGuard, Inject, Injectable

### Community 127 - "HitlDto"
Cohesion: 0.50
Nodes (3): HitlDto, IsArray, IsString

### Community 128 - "PatchRunRatingDto"
Cohesion: 0.50
Nodes (3): PatchRunRatingDto, IsIn, ValidateIf

## Knowledge Gaps
- **482 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+477 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1287 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `isRunId()` connect `ids.ts` to `run.schemas.ts`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **Why does `RunRepository` connect `RunRepository` to `ref_nestjs_common`, `prisma-run.adapter.ts`, `get-runs-summary.use-case.ts`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **Why does `AppMetricsBackend` connect `AppMetricsBackend` to `ModelAlias`, `PrometheusAppMetricsAdapter`, `app-metrics.module.ts`, `ClientId`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _482 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `resend-activation.use-case.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09486166007905138 - nodes in this community are weakly interconnected._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05513612445664608 - nodes in this community are weakly interconnected._
- **Should `company-context-form.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05364314400458979 - nodes in this community are weakly interconnected._