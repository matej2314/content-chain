# Graph Report - content-chain  (2026-10-23)

## Corpus Check
- 727 files · ~279,193 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: .ico 1, .css 1)

## Summary
- 4797 nodes · 15583 edges · 144 communities (129 shown, 13 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 421 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c69ecda1`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ref_nestjs_common
- social.types.ts
- company-context-form.tsx
- asClientId
- asProviderInstanceId
- chat.service.ts
- DomainException
- logging.service.ts
- runs.controller.ts
- anthropic/anthropic-tools.mapper.ts
- apiFetch
- openai-messages.mapper.ts
- notify-product.tsx
- prisma-run.adapter.ts
- cn
- api-error.code.ts
- branded.types.ts
- ai-provider.interface.ts
- cli.module.ts
- dashboard-shell.tsx
- model-manager.service.ts
- LoggingService
- configuration.ts
- UserRepository
- provider-instances.bootstrap.ts
- ref_react
- semantic-cache.constants.ts
- types/index.ts
- packages_shared_dist_index
- env.validation.ts
- prisma-invitation.adapter.ts
- start-run.use-case.ts
- company-context.controller.ts
- metrics.ts
- AnthropicMessagesRequestDto
- CurrentUser
- domain/company-context.types.ts
- enums.ts
- isRecord
- redis-vector-store.adapter.ts
- sentry-ai-metrics.adapter.ts
- openai-params-provider.mapper.ts
- ref_express
- ids.ts
- ioredis-guest-quota.adapter.ts
- semantic-cache.service.ts
- output-edited-result.schemas.ts
- AppMetricsService
- swagger.setup.ts
- anthropic-response.mapper.ts
- runs.types.ts
- run-review-panel.tsx
- GatewayKey
- ChatMessageDto
- content.graph.ts
- exitWithAgentReport
- ai-provider-gateway/src/app.module.ts
- start-run-form.tsx
- HealthService
- llm-gateway.http.adapter.ts
- users.api.ts
- OpenAiChatCompletionRequestDto
- HealthService
- app-metrics.service.ts
- anthropic-models.controller.ts
- ClientEditCommand
- http-metrics.interceptor.ts
- responses.adapter.ts
- ref_nestjs_swagger
- InvitationsController
- ClientAddCommand
- health-readiness-response.dto.ts
- bootstrap-admin-form.tsx
- api/src/app.module.ts
- RefreshSessionRepository
- parse-verifier-log-message.ts
- ApiRequestIdHeader
- api/src/health/health.service.ts
- archive-runs-view.tsx
- company-context.schemas.ts
- PrometheusService
- assert-audience-profile-names-unique.ts
- user-invited.template.ts
- SPEC — README
- PrometheusAppMetricsAdapter
- UsersController
- app/layout.tsx
- company-context.dto.ts
- ProviderEditCommand
- ChatParamsDto
- CompanyContextController
- ModelAlias
- GatewayConfig
- social.graph.ts
- PrismaCompanyContextAdapter
- ConfigInitCommand
- ProviderAddCommand
- route.ts
- config-generator.service.ts
- ClientRemoveCommand
- start-run.dto.ts
- ModelAddCommand
- models.controller.ts
- ProviderRemoveCommand
- openai-models.controller.ts
- JwtAuthGuard
- ChatToolingDto
- WizardState
- RegisterUserDto
- response-cache.service.ts
- LoginDto
- AnthropicContentBlockDto
- ProviderApiKey
- CompanyContext
- ModelRemoveCommand
- ListRunsQueryDto
- asGatewayKey
- ModelEditCommand
- api/src/main.ts
- app-metrics-backend.interface.ts
- AuthController
- HttpExceptionFilter
- BootstrapAdminDto
- PublicConfigController
- Architektura
- brand.ts
- RedisConnectionService
- GlobalExceptionFilter
- PatchUserDto
- GuestGuard
- AcceptInviteDto
- ActivateAccountDto
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
10. `Env` - 61 edges

## Surprising Connections (you probably didn't know these)
- `optionalEnvRefSchema` --calls--> `asEnvRef()`  [EXTRACTED]
  apps/ai-provider-gateway/src/config/gateway-config.schema.ts → apps/ai-provider-gateway/src/common/types/branded.types.ts
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `RedisConnectionService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-connection.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `CacheRegistryService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/cache-registry.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `ResponseCacheService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/response-cache.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (144 total, 13 thin omitted)

### Community 0 - "ref_nestjs_common"
Cohesion: 0.03
Nodes (117): AcceptInviteUseCase, Inject, Injectable, ActivateAccountOutput, ActivateAccountUseCase, Inject, Injectable, comparePassword() (+109 more)

### Community 1 - "social.types.ts"
Cohesion: 0.04
Nodes (32): CompositeRunResultReader, OutputEditedWrite, OutputEditedWriter, RunResultReader, SocialBrief, EmptyRunResultReader, Injectable, applyWrite() (+24 more)

### Community 2 - "company-context-form.tsx"
Cohesion: 0.05
Nodes (71): metadata, putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras, companyContextForPut(), CompanyContextObjection (+63 more)

### Community 3 - "asClientId"
Cohesion: 0.14
Nodes (32): CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema, convertClient(), convertRateLimit(), GatewayClientSchema, parseWizardState(), WizardStateSchema (+24 more)

### Community 4 - "asProviderInstanceId"
Cohesion: 0.09
Nodes (46): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, PendingSecretsItem, assertInteractiveAllowed(), collectPendingSecrets(), DEFAULT_MODELS (+38 more)

### Community 5 - "chat.service.ts"
Cohesion: 0.06
Nodes (58): SemanticStoreEmbedState, CacheIdentityMessage, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize (+50 more)

### Community 6 - "DomainException"
Cohesion: 0.06
Nodes (48): AcceptInviteResult, acceptInviteSchema, hashPassword(), hashRefreshToken(), parseTtlMs(), rejectDeadGuestSession(), validatePasswordPolicy(), FinalizeReviewUseCase (+40 more)

### Community 7 - "logging.service.ts"
Cohesion: 0.07
Nodes (20): LEVEL_ORDER, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable, SentryErrorReportingAdapter, Injectable (+12 more)

### Community 8 - "runs.controller.ts"
Cohesion: 0.03
Nodes (71): AutoFinalizeExpiredReviewsUseCase, Inject, Injectable, CancelRunUseCase, Inject, Injectable, Inject, CacheEntry (+63 more)

### Community 9 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.09
Nodes (40): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent() (+32 more)

### Community 10 - "apiFetch"
Cohesion: 0.05
Nodes (67): ACTIVATION_FAILED_HINT, acceptInvite(), activateAccount(), Credentials, fetchBootstrapStatus(), fetchUserSession(), loginWithPassword(), logoutSession() (+59 more)

### Community 11 - "openai-messages.mapper.ts"
Cohesion: 0.42
Nodes (6): mapOpenAiMessagesToGateway(), mapOpenAiToolCalls(), mapOpenAiChatRequestToGateway(), mapOpenAiToolChoice(), mapOpenAiToolsToGateway(), OpenAiFunctionTool

### Community 12 - "notify-product.tsx"
Cohesion: 0.20
Nodes (15): assertNever(), notifyProduct(), notifyRunCancelled(), notifyRunTerminal(), EnvelopeRef, ProductToast, RunTerminalInput, RunTerminalOutcome (+7 more)

### Community 13 - "prisma-run.adapter.ts"
Cohesion: 0.04
Nodes (43): ContentRunExecutor, isCanonicalOutlineSelection(), isMissingContentKind(), Injectable, InProcessRunWorker, Injectable, RunDispatchExecutor, RunExecuteOptions (+35 more)

### Community 14 - "cn"
Cohesion: 0.05
Nodes (59): AcceptInvitePage(), metadata, tokenFromSearchParam(), ACCEPT_INVITE_DEMO_HINT, ACCEPT_INVITE_UNAUTHORIZED_HINT, AcceptInviteFormError, toAcceptInviteFormError(), AcceptInviteForm() (+51 more)

### Community 15 - "api-error.code.ts"
Cohesion: 0.11
Nodes (32): ChatErrorHandlerService, Injectable, ApiErrorCode, DEFAULT_HTTP_STATUS_TO_CODE, ApiErrorPayload, MappedProviderError, isAuthError(), isClientError() (+24 more)

### Community 16 - "branded.types.ts"
Cohesion: 0.12
Nodes (24): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+16 more)

### Community 17 - "ai-provider.interface.ts"
Cohesion: 0.10
Nodes (43): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatCacheSource, ChatResponseData, ChatWarningDto, ApiProperty, ApiPropertyOptional (+35 more)

### Community 18 - "cli.module.ts"
Cohesion: 0.07
Nodes (64): AgentReport, AgentReportStatus, loadAnswers(), assertAgentHasAnswers(), CliMode, CliModeFlags, markAgentRuntime(), resolveCliMode() (+56 more)

### Community 19 - "dashboard-shell.tsx"
Cohesion: 0.06
Nodes (48): fetchCompleteness(), CompletenessState, GATE_SECTION_LABELS, CompletenessChip(), CompletenessContext, CompletenessContextValue, CompletenessProvider(), FALLBACK_ENVELOPE (+40 more)

### Community 20 - "model-manager.service.ts"
Cohesion: 0.12
Nodes (25): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, defaultModelPolicy(), ModelEditField, ModelManagerService, Injectable (+17 more)

### Community 21 - "LoggingService"
Cohesion: 0.11
Nodes (10): Inject, OllamaEmbeddingAdapter, Injectable, ConsoleLoggerAdapter, Injectable, LogContext, LoggingService, Injectable (+2 more)

### Community 22 - "configuration.ts"
Cohesion: 0.06
Nodes (52): CliValidateOptions, asSemanticCacheTtlSeconds(), AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig, SemanticCacheRuntimeConfig, collectInactiveProviderWarnings() (+44 more)

### Community 23 - "UserRepository"
Cohesion: 0.05
Nodes (26): Inject, Inject, Inject, Inject, Inject, AccountActivationRecord, AccountActivationRepository, CreatePendingUser (+18 more)

### Community 24 - "provider-instances.bootstrap.ts"
Cohesion: 0.23
Nodes (10): assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryFn, AIProvider (+2 more)

### Community 25 - "ref_react"
Cohesion: 0.05
Nodes (80): AccountEmailFormState, INITIAL_LOGIN_CARD_STATE, LoginCardProps, LoginCardState, INITIAL_STATE, RegisterFormProps, RegisterFormState, initialState (+72 more)

### Community 26 - "semantic-cache.constants.ts"
Cohesion: 0.12
Nodes (13): EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema(), EMBEDDING_CIRCUIT_COOLDOWN_MS, EMBEDDING_CIRCUIT_OPEN_AFTER, EMBEDDING_PROBE_TIMEOUT_MS (+5 more)

### Community 27 - "types/index.ts"
Cohesion: 0.19
Nodes (21): CONVERSATION_ID_PATTERN, createRequestId(), isAttemptNumber(), isBaseUrl(), isCacheTtlSeconds(), isConversationId(), isFiniteNumber(), isMaxAttempts() (+13 more)

### Community 28 - "packages_shared_dist_index"
Cohesion: 0.04
Nodes (54): DeleteUserResult, DeleteUserUseCase, Inject, Injectable, CreateFeedbackUseCase, Inject, Injectable, agentKeySchema (+46 more)

### Community 29 - "env.validation.ts"
Cohesion: 0.11
Nodes (13): CACHE_BACKEND_TYPE, CACHE_BACKEND_VALUES, EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional (+5 more)

### Community 30 - "prisma-invitation.adapter.ts"
Cohesion: 0.17
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 31 - "start-run.use-case.ts"
Cohesion: 0.07
Nodes (33): contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, socialBriefSchema (+25 more)

### Community 32 - "company-context.controller.ts"
Cohesion: 0.14
Nodes (14): GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PatchCompanyContextUseCase, Inject (+6 more)

### Community 33 - "metrics.ts"
Cohesion: 0.09
Nodes (25): getClientConversationId(), getOrCreateConversationIdForResponse(), buildAppProviderMetricsContext(), buildLlmMetricsContext(), mapProviderResponseToAiObservation(), mapProviderResponseToUsage(), toMetricsMessages(), buildProviderInputForAlias() (+17 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.13
Nodes (19): AnthropicMessagesRequestDto, AnthropicThinkingDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+11 more)

### Community 35 - "CurrentUser"
Cohesion: 0.12
Nodes (24): Body, HttpCode, Post, CreateFeedbackDto, IsIn, IsOptional, IsString, MaxLength (+16 more)

### Community 36 - "domain/company-context.types.ts"
Cohesion: 0.15
Nodes (22): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CompanyContextWriteDetail (+14 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (21): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+13 more)

### Community 38 - "isRecord"
Cohesion: 0.04
Nodes (74): buildOutputEditedBody(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload(), RESULT_KEYS_BY_TASK_TYPE (+66 more)

### Community 39 - "redis-vector-store.adapter.ts"
Cohesion: 0.12
Nodes (20): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), asString(), ParsedKnnHits, parseKnnHits() (+12 more)

### Community 40 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.10
Nodes (29): CostUsd, ToolCallId, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext() (+21 more)

### Community 41 - "openai-params-provider.mapper.ts"
Cohesion: 0.13
Nodes (23): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+15 more)

### Community 42 - "ref_express"
Cohesion: 0.10
Nodes (29): getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequiredFromConfig(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis() (+21 more)

### Community 43 - "ids.ts"
Cohesion: 0.09
Nodes (32): brand, ACCOUNT_ACTIVATION_ID_RE, AccountActivationId, CONV_ID_RE, ConversationId, createAccountActivationId(), createConversationId(), createFeedbackId() (+24 more)

### Community 44 - "ioredis-guest-quota.adapter.ts"
Cohesion: 0.10
Nodes (17): Inject, Inject, GUEST_QUOTA, GuestQuotaAdmitResult, GuestQuotaPort, GuestQuotaModule, Module, createRedis() (+9 more)

### Community 45 - "semantic-cache.service.ts"
Cohesion: 0.10
Nodes (21): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, EmbeddingBackend, isSingleTurnUserRequest(), lastUserMessageText() (+13 more)

### Community 46 - "output-edited-result.schemas.ts"
Cohesion: 0.12
Nodes (15): contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema, ideasArraySchema (+7 more)

### Community 47 - "AppMetricsService"
Cohesion: 0.09
Nodes (7): HttpMetricsMiddleware, Injectable, ActiveStreamsTracker, Injectable, AppMetricsService, Inject, Injectable

### Community 48 - "swagger.setup.ts"
Cohesion: 0.07
Nodes (31): AppModule, Module, ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional (+23 more)

### Community 49 - "anthropic-response.mapper.ts"
Cohesion: 0.08
Nodes (44): SseDoneEvent, fromGatewayToolCallDto(), asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto (+36 more)

### Community 50 - "runs.types.ts"
Cohesion: 0.05
Nodes (71): filterFeedbackRunOptions(), ArchiveRunsQuery, fetchRunLogs(), fetchUserRuns(), isUserRating(), patchRunRating(), parseNullableIso(), parseReviewFields() (+63 more)

### Community 51 - "run-review-panel.tsx"
Cohesion: 0.10
Nodes (27): canEditResult(), finalizeRunReview(), saveOutputEdited(), RunResult, isReviewableRunStatus(), RunSnapshot, canEditSnapshot(), RunResultEditActions() (+19 more)

### Community 52 - "GatewayKey"
Cohesion: 0.03
Nodes (70): ApiHeader, GATEWAY_CACHE_HEADER, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags (+62 more)

### Community 53 - "ChatMessageDto"
Cohesion: 0.09
Nodes (22): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+14 more)

### Community 54 - "content.graph.ts"
Cohesion: 0.06
Nodes (57): ContentPipelineFacade, toOutcome(), Inject, Injectable, Inject, coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput (+49 more)

### Community 55 - "exitWithAgentReport"
Cohesion: 0.11
Nodes (12): emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList(), ConfigGeneratorService (+4 more)

### Community 56 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.05
Nodes (37): ChatModule, Module, RequestIdMiddleware, Injectable, HealthModule, Module, AnthropicModule, Module (+29 more)

### Community 57 - "start-run-form.tsx"
Cohesion: 0.10
Nodes (35): fetchCompanyContext(), GuestLimitModal(), GUEST_ALLOWED_TASK_TYPES, GUEST_CONTACTS, GUEST_QUOTA_CODES, GuestAllowedTaskType, GuestContact, GuestQuotaCode (+27 more)

### Community 58 - "HealthService"
Cohesion: 0.14
Nodes (13): GatewayLivenessProbe, Inject, Injectable, HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller (+5 more)

### Community 59 - "llm-gateway.http.adapter.ts"
Cohesion: 0.09
Nodes (27): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), LlmGatewayError (+19 more)

### Community 60 - "users.api.ts"
Cohesion: 0.22
Nodes (13): fetchInitiatorOptions(), deleteUser(), fetchUsers(), GUEST_HAS_ACTIVE_RUN, parseOkBody(), reactivateUser(), parseUserList(), parseUserListItem() (+5 more)

### Community 61 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.08
Nodes (27): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+19 more)

### Community 62 - "HealthService"
Cohesion: 0.17
Nodes (6): HealthReadinessResponseDto, ApiProperty, HealthService, Inject, Injectable, Optional

### Community 63 - "app-metrics.service.ts"
Cohesion: 0.13
Nodes (13): HealthCheckResult, HealthRedisCheckResult, APP_METRICS_BACKEND, MetricsController, ApiOperation, ApiResponse, ApiTags, Controller (+5 more)

### Community 64 - "anthropic-models.controller.ts"
Cohesion: 0.13
Nodes (21): ApiAnthropicErrorResponses(), AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+13 more)

### Community 65 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 66 - "http-metrics.interceptor.ts"
Cohesion: 0.11
Nodes (18): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, MetricsController, Controller, Get (+10 more)

### Community 67 - "responses.adapter.ts"
Cohesion: 0.06
Nodes (70): toHttpException(), asInputTokens(), asOutputTokens(), asSystemFingerprint(), asToolCallId(), getUsageMetadata(), buildGenerationConfig(), createGoogleProvider() (+62 more)

### Community 68 - "ref_nestjs_swagger"
Cohesion: 0.11
Nodes (14): IsStringOrArrayOfStrings(), IsThinkingBudget(), isTextContentItem(), normalizeOpenAiContent(), TextContentItem, InviteUserDto, ApiProperty, IsEmail (+6 more)

### Community 69 - "InvitationsController"
Cohesion: 0.16
Nodes (10): InvitationsController, ApiCookieAuth, ApiTags, Body, Controller, Delete, Get, HttpCode (+2 more)

### Community 70 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 71 - "health-readiness-response.dto.ts"
Cohesion: 0.33
Nodes (8): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty, ApiPropertyOptional

### Community 72 - "bootstrap-admin-form.tsx"
Cohesion: 0.10
Nodes (28): bootstrapAdmin(), AuthModal(), AuthModalProps, AuthMode, descriptionFor(), titleFor(), BootstrapAdminForm(), onSubmit() (+20 more)

### Community 73 - "api/src/app.module.ts"
Cohesion: 0.06
Nodes (48): AuthModule, Module, CompanyContextModule, Module, ContentModule, Module, CONTENT_RESULT_STORE, LlmModule (+40 more)

### Community 74 - "RefreshSessionRepository"
Cohesion: 0.10
Nodes (9): Inject, Inject, Inject, Inject, RefreshSessionRecord, RefreshSessionRepository, RotateRefreshSessionResult, PrismaRefreshSessionAdapter (+1 more)

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "ApiRequestIdHeader"
Cohesion: 0.20
Nodes (9): ApiRequestIdHeader(), HealthLivenessResponseDto, ApiProperty, HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller (+1 more)

### Community 77 - "api/src/health/health.service.ts"
Cohesion: 0.13
Nodes (15): GATEWAY_PROBE_TIMEOUT_MS, GatewayLivenessBody, GatewayLivenessProbeReason, GatewayLivenessProbeResult, isRecord(), parseGatewayLivenessBody(), probeFailureReason(), CachedGatewayCheck (+7 more)

### Community 78 - "archive-runs-view.tsx"
Cohesion: 0.07
Nodes (35): metadata, CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS, RUN_TASK_TYPE_LABELS, fetchArchiveRuns() (+27 more)

### Community 79 - "company-context.schemas.ts"
Cohesion: 0.33
Nodes (5): companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema

### Community 80 - "PrometheusService"
Cohesion: 0.20
Nodes (4): PrometheusService, Injectable, PrometheusMetrics, ref_prom_client

### Community 81 - "assert-audience-profile-names-unique.ts"
Cohesion: 0.38
Nodes (5): assertAudienceProfileNamesUnique(), normalizeAudienceName(), withEffectiveAudience(), createLoadContextNode(), createLoadContextNode()

### Community 82 - "user-invited.template.ts"
Cohesion: 0.18
Nodes (24): UserActivationMail, UserInvitedMail, UserWelcomeMail, ASSETS_DIR, BRAND_CID, resolveBrandCidAttachments(), escapeHtml(), MAIL_PALETTE (+16 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "PrometheusAppMetricsAdapter"
Cohesion: 0.10
Nodes (6): PrometheusAppMetricsAdapter, Injectable, resolveAppMetricsBackend(), AppProviderCallContext, AppProviderStreamScope, AppTokenUsage

### Community 85 - "UsersController"
Cohesion: 0.18
Nodes (11): ApiCookieAuth, ApiTags, Body, Controller, Delete, Get, HttpCode, Param (+3 more)

### Community 86 - "app/layout.tsx"
Cohesion: 0.11
Nodes (10): metadata, metadata, metadata, apps_frontend_src_app_globals, geistMono, inter, metadata, spaceGrotesk (+2 more)

### Community 87 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 88 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 89 - "ChatParamsDto"
Cohesion: 0.12
Nodes (16): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+8 more)

### Community 90 - "CompanyContextController"
Cohesion: 0.13
Nodes (12): toCompanyContext(), toPartialCompanyContext(), CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Body, Controller (+4 more)

### Community 91 - "ModelAlias"
Cohesion: 0.06
Nodes (6): ProviderTestOptions, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, AppMetricsBackend

### Community 92 - "GatewayConfig"
Cohesion: 0.08
Nodes (16): ClientManagerService, Injectable, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable, EnvPatchService, Injectable, ProviderManagerService (+8 more)

### Community 93 - "social.graph.ts"
Cohesion: 0.08
Nodes (53): LlmHopService, Injectable, loadPromptFromDir(), renderPrompt(), coercePassNoteVerdict(), isPassOnlyIssue(), coerceVerifierIssue(), ContentOutput (+45 more)

### Community 94 - "PrismaCompanyContextAdapter"
Cohesion: 0.31
Nodes (4): jsonArray(), jsonRecord(), PrismaCompanyContextAdapter, Injectable

### Community 95 - "ConfigInitCommand"
Cohesion: 0.31
Nodes (3): ConfigInitCommand, Command, Option

### Community 96 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 97 - "route.ts"
Cohesion: 0.13
Nodes (17): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+9 more)

### Community 98 - "config-generator.service.ts"
Cohesion: 0.12
Nodes (19): isRedisRequired(), BasicServerAnswers, CacheAnswers, MetricsAnswers, RateLimitAnswers, RedisAnswers, SentryAnswers, ServerConfigPromptResult (+11 more)

### Community 99 - "ClientRemoveCommand"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

### Community 100 - "start-run.dto.ts"
Cohesion: 0.16
Nodes (14): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+6 more)

### Community 101 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 102 - "models.controller.ts"
Cohesion: 0.10
Nodes (22): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+14 more)

### Community 103 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 104 - "openai-models.controller.ts"
Cohesion: 0.13
Nodes (21): ApiOpenAiErrorResponses(), OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+13 more)

### Community 106 - "ChatToolingDto"
Cohesion: 0.15
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 107 - "WizardState"
Cohesion: 0.14
Nodes (13): ConfigValidateCommand, Command, Option, WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, CliGatewayValidatorService, Injectable (+5 more)

### Community 108 - "RegisterUserDto"
Cohesion: 0.40
Nodes (5): RegisterUserDto, ApiProperty, IsEmail, IsString, MinLength

### Community 109 - "response-cache.service.ts"
Cohesion: 0.09
Nodes (19): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+11 more)

### Community 110 - "LoginDto"
Cohesion: 0.40
Nodes (5): LoginDto, ApiProperty, IsEmail, IsString, MinLength

### Community 111 - "AnthropicContentBlockDto"
Cohesion: 0.14
Nodes (14): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+6 more)

### Community 112 - "ProviderApiKey"
Cohesion: 0.19
Nodes (7): ProviderTestCommand, Command, Option, ProviderTestService, Injectable, ProviderApiKey, ProviderFactoryContext

### Community 113 - "CompanyContext"
Cohesion: 0.43
Nodes (6): toPublicCompanyContext(), assertCompanyContextWritable(), PartialCompanyContext, CompanyContext, isComplete(), mergeCompanyContext()

### Community 114 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 115 - "ListRunsQueryDto"
Cohesion: 0.14
Nodes (12): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+4 more)

### Community 116 - "asGatewayKey"
Cohesion: 0.14
Nodes (8): KeyGenerateCommand, Command, Option, KeyGeneratorService, Injectable, KeyPromptService, Injectable, asGatewayKey()

### Community 117 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 118 - "api/src/main.ts"
Cohesion: 0.21
Nodes (10): AppModule, Module, bootstrap(), parseCorsOrigins(), configureHttpApp(), buildSwaggerConfig(), ref_cookie_parser, ref_helmet (+2 more)

### Community 119 - "app-metrics-backend.interface.ts"
Cohesion: 0.20
Nodes (12): healthStatusToGaugeValue(), AppRequestLabels, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus, HttpMethod (+4 more)

### Community 120 - "AuthController"
Cohesion: 0.20
Nodes (13): AuthController, ApiCookieAuth, ApiTags, Body, Controller, Get, HttpCode, Patch (+5 more)

### Community 122 - "BootstrapAdminDto"
Cohesion: 0.40
Nodes (5): BootstrapAdminDto, ApiProperty, IsEmail, IsString, MinLength

### Community 123 - "PublicConfigController"
Cohesion: 0.22
Nodes (7): PublicConfigController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, Inject

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 125 - "brand.ts"
Cohesion: 0.33
Nodes (3): unbrand, RunTaskType, RunsSummaryResponse

### Community 127 - "GlobalExceptionFilter"
Cohesion: 0.32
Nodes (4): GlobalExceptionFilter, isPayloadTooLargeError(), Catch, Injectable

### Community 128 - "PatchUserDto"
Cohesion: 0.50
Nodes (4): PatchUserDto, ApiProperty, IsBoolean, Equals

### Community 129 - "GuestGuard"
Cohesion: 0.40
Nodes (3): GuestGuard, Inject, Injectable

### Community 130 - "AcceptInviteDto"
Cohesion: 0.50
Nodes (4): AcceptInviteDto, ApiProperty, IsString, MinLength

### Community 131 - "ActivateAccountDto"
Cohesion: 0.50
Nodes (4): ActivateAccountDto, ApiProperty, IsString, MinLength

## Knowledge Gaps
- **484 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+479 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1290 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `isRunId()` connect `ids.ts` to `start-run.use-case.ts`?**
  _High betweenness centrality (0.043) - this node is a cross-community bridge._
- **Why does `Env` connect `ref_nestjs_common` to `GuestGuard`, `DomainException`, `runs.controller.ts`, `api/src/app.module.ts`, `RefreshSessionRepository`, `PublicConfigController`, `ioredis-guest-quota.adapter.ts`, `api/src/health/health.service.ts`, `api/src/main.ts`, `HealthService`, `llm-gateway.http.adapter.ts`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Why does `AppMetricsBackend` connect `ModelAlias` to `AppMetricsService`, `PrometheusAppMetricsAdapter`, `app-metrics.service.ts`, `app-metrics-backend.interface.ts`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _484 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `ref_nestjs_common` be split into smaller, more focused modules?**
  _Cohesion score 0.0309048178613396 - nodes in this community are weakly interconnected._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04450549450549451 - nodes in this community are weakly interconnected._
- **Should `company-context-form.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05364314400458979 - nodes in this community are weakly interconnected._