# Graph Report - content-chain  (2026-10-15)

## Corpus Check
- 699 files · ~239,926 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .css 1)

## Summary
- 4554 nodes · 13996 edges · 141 communities (126 shown, 14 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 419 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e07caab0`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- auth.module.ts
- get-run.use-case.ts
- api/company-context.types.ts
- anthropic/anthropic-tools.mapper.ts
- asProviderInstanceId
- start-run-form.tsx
- provider-error.mapper.ts
- LogContext
- provider-registry.service.ts
- RunRepository
- chat.service.ts
- health-readiness-response.dto.ts
- .info
- cli.module.ts
- swagger.setup.ts
- chat-params.dto.ts
- LoggingService
- DomainException
- archive-runs-view.tsx
- KeyGenerateCommand
- AuthController
- resilient-executor.ts
- users-view.tsx
- UserRepository
- redis-vector-store.adapter.ts
- feedback-form.tsx
- runs.module.ts
- GatewayConfig
- gateway-config.schema.ts
- models.controller.ts
- branded.types.ts
- HealthService
- UsersController
- response-cache.service.ts
- AnthropicMessagesRequestDto
- start-run.use-case.ts
- runs.types.ts
- enums.ts
- runs-result.types.ts
- CompanyContext
- sentry-ai-metrics.adapter.ts
- prisma-run.adapter.ts
- openai-models.controller.ts
- ids.ts
- semantic-cache.service.ts
- getAppConfig
- save-output-edited.use-case.ts
- guest-run-policy.service.ts
- ai-provider-gateway/src/main.ts
- anthropic-messages.controller.ts
- runs.controller.ts
- ModelAlias
- env.schema.ts
- ConfigInitCommand
- llm-hop.ts
- wizard-orchestrator.service.ts
- JwtAuthGuard
- domain/company-context.types.ts
- OpenAiChatMessageDto
- http/http-exception.filter.ts
- metrics.ts
- types/index.ts
- delete-user.use-case.ts
- configuration.ts
- anthropic-models.controller.ts
- ModelEditCommand
- MetricsController
- event-source-registry-provider.tsx
- OpenAiChatCompletionRequestDto
- InProcessRunWorker
- semantic-cache.constants.ts
- demo-mode-provider.tsx
- prisma-invitation.adapter.ts
- content.types.ts
- RunSseHub
- parse-verifier-log-message.ts
- company-context.mapper.ts
- api/src/health/health.service.ts
- ClientAddCommand
- llm-gateway.http.adapter.ts
- PrometheusService
- cn
- configuration-validation.service.ts
- SPEC — README
- provider-instances.bootstrap.ts
- run-review-panel.tsx
- model-manager.service.ts
- company-context.dto.ts
- ClientRemoveCommand
- ModelAddCommand
- AuthUserContext
- PublicConfigController
- openai-chat-completions.controller.ts
- social.graph.ts
- anthropic.module.ts
- StartRunDto
- ProviderEditCommand
- route.ts
- ProviderRemoveCommand
- RedisConnectionService
- CompanyContextController
- config-validator.ts
- ChatParamsDto
- ProviderAddCommand
- patch-company-context.use-case.ts
- PrismaService
- list-runs.use-case.ts
- ChatCacheIdentity
- HttpExceptionFilter
- JwtCookieStrategy
- should-include-redis-stack.ts
- isRecord
- openai-params-provider.mapper.ts
- ConfigSecretsStatusCommand
- RefreshSessionRepository
- RunsModule
- EnvironmentVariables
- company-context.controller.ts
- openai-chat-message.dto.ts
- GuestGuard
- gateway-key.guard.branded-types.test-d.ts
- openai-chat-completion-request.dto.ts
- api/src/app.module.ts
- Architektura
- brand
- ClientEditCommand
- health.api.ts
- ai-provider-gateway/src/app.module.ts
- ModelRemoveCommand
- openai-chat-completion-response.dto.ts
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
2. `DomainException` - 83 edges
3. `ProviderInstanceId` - 81 edges
4. `LoggingService` - 73 edges
5. `asProviderInstanceId()` - 67 edges
6. `isRecord()` - 66 edges
7. `GatewayConfig` - 65 edges
8. `cn()` - 65 edges
9. `GatewayKey` - 59 edges
10. `Env` - 59 edges

## Surprising Connections (you probably didn't know these)
- `mapGatewayResponseToAnthropicFormat()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/anthropic/mappers/anthropic-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
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

## Communities (141 total, 14 thin omitted)

### Community 0 - "auth.module.ts"
Cohesion: 0.05
Nodes (83): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Inject, Injectable, ActivateAccountOutput, ActivateAccountUseCase, Injectable (+75 more)

### Community 1 - "get-run.use-case.ts"
Cohesion: 0.06
Nodes (28): CompositeRunResultReader, GetRunOutput, orderItemsBySelectedIds(), RunResultReader, ContentBrief, SocialBrief, EmptyRunResultReader, Injectable (+20 more)

### Community 2 - "api/company-context.types.ts"
Cohesion: 0.04
Nodes (88): metadata, fetchCompanyContext(), fetchCompleteness(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras (+80 more)

### Community 3 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.04
Nodes (107): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, toCachedChatResponse(), toHttpException(), asInputTokens(), asOutputTokens(), asPromptCacheCreationTokens() (+99 more)

### Community 4 - "asProviderInstanceId"
Cohesion: 0.08
Nodes (42): assertInteractiveAllowed(), collectPendingSecrets(), DEFAULT_MODELS, CliAiProvider, EnvPatchService, EnvPatchValue, Injectable, ModelPromptResult (+34 more)

### Community 5 - "start-run-form.tsx"
Cohesion: 0.09
Nodes (34): GuestLimitModal(), GUEST_ALLOWED_TASK_TYPES, GUEST_CONTACTS, GUEST_QUOTA_CODES, GuestAllowedTaskType, GuestContact, GuestQuotaCode, isGuestAllowedTaskType() (+26 more)

### Community 6 - "provider-error.mapper.ts"
Cohesion: 0.21
Nodes (19): MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isRateLimitStatus(), isServerError(), isTimeoutStatus(), nameLooksLikeTimeout() (+11 more)

### Community 7 - "LogContext"
Cohesion: 0.05
Nodes (28): GlobalExceptionFilter, Catch, Injectable, ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable (+20 more)

### Community 8 - "provider-registry.service.ts"
Cohesion: 0.09
Nodes (26): clamp(), isOverrideKey(), resolveProviderCallOptions(), OVERRIDE_KEYS, OverrideKey, ApiErrorCode, ApiErrorPayload, UnsupportedProviderException (+18 more)

### Community 9 - "RunRepository"
Cohesion: 0.08
Nodes (3): Inject, Inject, RunRepository

### Community 10 - "chat.service.ts"
Cohesion: 0.05
Nodes (56): SemanticStoreEmbedState, CacheIdentityMessage, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize (+48 more)

### Community 11 - "health-readiness-response.dto.ts"
Cohesion: 0.29
Nodes (9): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiProperty, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty (+1 more)

### Community 12 - ".info"
Cohesion: 0.14
Nodes (10): toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList(), ProviderTestCommand, Command, Option, ProviderTestService (+2 more)

### Community 13 - "cli.module.ts"
Cohesion: 0.07
Nodes (57): AgentReport, AgentReportStatus, emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), loadAnswers(), assertAgentHasAnswers(), CliMode (+49 more)

### Community 14 - "swagger.setup.ts"
Cohesion: 0.09
Nodes (25): ChatOutputTextDto, ApiProperty, ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional (+17 more)

### Community 15 - "chat-params.dto.ts"
Cohesion: 0.24
Nodes (7): ResponseFormatDto, ApiProperty, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsThinkingBudget()

### Community 16 - "LoggingService"
Cohesion: 0.07
Nodes (21): Inject, Inject, ChatErrorHandlerService, Injectable, ChatProviderCallService, Injectable, ChatProviderCooldownService, Injectable (+13 more)

### Community 17 - "DomainException"
Cohesion: 0.10
Nodes (18): parseTtlMs(), validatePasswordPolicy(), assertAudienceProfileNamesUnique(), normalizeAudienceName(), FinalizeReviewUseCase, Inject, Injectable, RateRunUseCase (+10 more)

### Community 18 - "archive-runs-view.tsx"
Cohesion: 0.06
Nodes (42): metadata, metadata, metadata, useSession(), useGuestLocked(), CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS (+34 more)

### Community 19 - "KeyGenerateCommand"
Cohesion: 0.39
Nodes (3): KeyGenerateCommand, Command, Option

### Community 20 - "AuthController"
Cohesion: 0.06
Nodes (40): AuthController, ApiCookieAuth, ApiTags, Body, Controller, Get, HttpCode, Patch (+32 more)

### Community 21 - "resilient-executor.ts"
Cohesion: 0.17
Nodes (18): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+10 more)

### Community 22 - "users-view.tsx"
Cohesion: 0.06
Nodes (73): AcceptInvitePage(), metadata, tokenFromSearchParam(), ACCEPT_INVITE_DEMO_HINT, ACCEPT_INVITE_UNAUTHORIZED_HINT, AcceptInviteFormError, toAcceptInviteFormError(), acceptInvite() (+65 more)

### Community 23 - "UserRepository"
Cohesion: 0.05
Nodes (22): Inject, Inject, Inject, Inject, Inject, AccountActivationRecord, AccountActivationRepository, CreatePendingUser (+14 more)

### Community 24 - "redis-vector-store.adapter.ts"
Cohesion: 0.12
Nodes (20): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), asString(), ParsedKnnHits, parseKnnHits() (+12 more)

### Community 25 - "feedback-form.tsx"
Cohesion: 0.19
Nodes (15): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody(), parseFeedbackCreated() (+7 more)

### Community 26 - "runs.module.ts"
Cohesion: 0.15
Nodes (19): AutoFinalizeExpiredReviewsUseCase, Injectable, CancelRunUseCase, Inject, Injectable, Inject, RunAbortRegistry, Injectable (+11 more)

### Community 27 - "GatewayConfig"
Cohesion: 0.12
Nodes (9): normalizeGatewayConfigForWrite(), ProviderManagerService, Injectable, EditProviderInput, RemoveClientInput, RemoveProviderInput, countActiveModelsAfterProviderChange(), ValidationFormatter (+1 more)

### Community 28 - "gateway-config.schema.ts"
Cohesion: 0.08
Nodes (45): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, PendingSecretsItem, InitAnswers, CliAiModelSchema, CliAiProviderSchema (+37 more)

### Community 29 - "models.controller.ts"
Cohesion: 0.10
Nodes (22): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+14 more)

### Community 30 - "branded.types.ts"
Cohesion: 0.09
Nodes (46): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatCacheSource, ChatResponseData, SseMetaPayload, SseMetaPayloadDto, ApiProperty (+38 more)

### Community 31 - "HealthService"
Cohesion: 0.13
Nodes (9): HealthReadinessResponseDto, HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, HealthService (+1 more)

### Community 32 - "UsersController"
Cohesion: 0.08
Nodes (21): ListUsersUseCase, Inject, Injectable, ReactivateUserUseCase, Inject, Injectable, PatchUserDto, ApiProperty (+13 more)

### Community 33 - "response-cache.service.ts"
Cohesion: 0.09
Nodes (21): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+13 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "start-run.use-case.ts"
Cohesion: 0.12
Nodes (21): contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, socialBriefSchema (+13 more)

### Community 36 - "runs.types.ts"
Cohesion: 0.05
Nodes (72): metadata, filterFeedbackRunOptions(), ArchiveRunsQuery, fetchRunLogs(), fetchRunSnapshot(), fetchUserRuns(), HitlAccepted, parseNullableIso() (+64 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "runs-result.types.ts"
Cohesion: 0.04
Nodes (66): buildOutputEditedBody(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload(), RESULT_KEYS_BY_TASK_TYPE (+58 more)

### Community 39 - "CompanyContext"
Cohesion: 0.39
Nodes (3): CompanyContext, PrismaCompanyContextAdapter, Injectable

### Community 40 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.09
Nodes (27): NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes(), clearLlmScopeContext() (+19 more)

### Community 41 - "prisma-run.adapter.ts"
Cohesion: 0.07
Nodes (19): LightRunItem, ListRunsResult, RunSnapshot, RunLogEntry, RunRecordBase, ALLOWED_RUN_STATES, assertTransition(), CANCELABLE_RUN_STATUSES (+11 more)

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.11
Nodes (22): ApiOpenAiErrorResponses(), ANTHROPIC_INTEGRATION_PATH, OPENAI_INTEGRATION_PATH, OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam (+14 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (23): ACCOUNT_ACTIVATION_ID_RE, AccountActivationId, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createRunId() (+15 more)

### Community 44 - "semantic-cache.service.ts"
Cohesion: 0.07
Nodes (29): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), OllamaEmbeddingAdapter, Injectable, EmbeddingBackend, isSingleTurnUserRequest(), lastUserMessageText() (+21 more)

### Community 45 - "getAppConfig"
Cohesion: 0.17
Nodes (12): readGatewayKeyHeader(), getAppConfig(), GatewayKeyGuard, Injectable, enrichRequestWithClientId(), AnthropicApiKeyGuard, readAnthropicApiKey(), Injectable (+4 more)

### Community 46 - "save-output-edited.use-case.ts"
Cohesion: 0.08
Nodes (28): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+20 more)

### Community 47 - "guest-run-policy.service.ts"
Cohesion: 0.08
Nodes (23): GetRunLogsOutput, GetRunLogsUseCase, Inject, Injectable, GetRunUseCase, Inject, Injectable, GUEST_TASK_TYPES (+15 more)

### Community 48 - "ai-provider-gateway/src/main.ts"
Cohesion: 0.13
Nodes (15): AppModule, Module, bootstrap(), API_GLOBAL_PREFIX, PORT, setupApp(), exportOpenApi(), OPENAPI_OUTPUT_FILENAME (+7 more)

### Community 49 - "anthropic-messages.controller.ts"
Cohesion: 0.09
Nodes (36): ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString, SseDoneEvent, asMessageId() (+28 more)

### Community 50 - "runs.controller.ts"
Cohesion: 0.08
Nodes (23): ListRunsUserItem, ListRunsUserOutput, ListRunsUserUseCase, Injectable, HitlDto, IsArray, IsString, ListRunsQueryDto (+15 more)

### Community 51 - "ModelAlias"
Cohesion: 0.04
Nodes (33): ProviderTestOptions, CliAiModel, HttpMetricsMiddleware, Injectable, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable (+25 more)

### Community 52 - "env.schema.ts"
Cohesion: 0.17
Nodes (11): AppModule, Module, bootstrap(), EnvModule, Global, Module, envSchema, parseCorsOrigins() (+3 more)

### Community 53 - "ConfigInitCommand"
Cohesion: 0.14
Nodes (8): ConfigInitCommand, Command, Option, ConfigValidateCommand, Command, Option, CliGatewayValidatorService, Injectable

### Community 54 - "llm-hop.ts"
Cohesion: 0.09
Nodes (43): coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema, pageOutlineSectionSchema, readNonEmptyString() (+35 more)

### Community 55 - "wizard-orchestrator.service.ts"
Cohesion: 0.07
Nodes (35): WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, WizardState, ConfigGeneratorService, Injectable, FileManagerService, Injectable (+27 more)

### Community 56 - "JwtAuthGuard"
Cohesion: 0.25
Nodes (4): JwtAuthGuard, Injectable, RolesGuard, Injectable

### Community 57 - "domain/company-context.types.ts"
Cohesion: 0.16
Nodes (20): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CompanyContextWriteDetail (+12 more)

### Community 58 - "OpenAiChatMessageDto"
Cohesion: 0.22
Nodes (9): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+1 more)

### Community 59 - "http/http-exception.filter.ts"
Cohesion: 0.32
Nodes (4): ErrorEnvelope, newRequestId(), RequestIdMiddleware, Injectable

### Community 60 - "metrics.ts"
Cohesion: 0.07
Nodes (39): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+31 more)

### Community 61 - "types/index.ts"
Cohesion: 0.14
Nodes (26): RequestIdMiddleware, Injectable, CONVERSATION_ID_PATTERN, createRequestId(), isAttemptNumber(), isBaseUrl(), isCacheTtlSeconds(), isConversationId() (+18 more)

### Community 62 - "delete-user.use-case.ts"
Cohesion: 0.09
Nodes (18): DeleteUserResult, isGuestTaskType(), Inject, GUEST_QUOTA, GuestQuotaAdmitResult, GuestQuotaPort, GuestQuotaModule, Module (+10 more)

### Community 63 - "configuration.ts"
Cohesion: 0.14
Nodes (22): asSemanticCacheTtlSeconds(), AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig, SemanticCacheRuntimeConfig, buildAppConfiguration(), buildEffectiveGatewayConfig() (+14 more)

### Community 64 - "anthropic-models.controller.ts"
Cohesion: 0.13
Nodes (20): ApiAnthropicErrorResponses(), AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+12 more)

### Community 65 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 66 - "MetricsController"
Cohesion: 0.18
Nodes (7): MetricsController, ApiOperation, ApiResponse, ApiTags, Controller, Get, Header

### Community 67 - "event-source-registry-provider.tsx"
Cohesion: 0.43
Nodes (5): EventSourceRegistryContext, EventSourceRegistryProvider(), createEventSourceRegistry(), EventSourceRegistry, RegistryEntry

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (18): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+10 more)

### Community 69 - "InProcessRunWorker"
Cohesion: 0.14
Nodes (4): InProcessRunWorker, Injectable, StubRunExecutor, Injectable

### Community 70 - "semantic-cache.constants.ts"
Cohesion: 0.13
Nodes (12): EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema(), EMBEDDING_CIRCUIT_COOLDOWN_MS, EMBEDDING_CIRCUIT_OPEN_AFTER, EMBEDDING_PROBE_TIMEOUT_MS (+4 more)

### Community 71 - "demo-mode-provider.tsx"
Cohesion: 0.22
Nodes (10): fetchAppConfig(), AppConfig, parseAppConfig(), DemoChip(), DemoModeContext, DemoModeContextValue, DemoModeProvider(), DemoModeState (+2 more)

### Community 72 - "prisma-invitation.adapter.ts"
Cohesion: 0.05
Nodes (40): InviteUserUseCase, Inject, Injectable, InvitationListItem, ListInvitationsUseCase, Inject, Injectable, ResendInvitationUseCase (+32 more)

### Community 73 - "content.types.ts"
Cohesion: 0.15
Nodes (12): ContentResultStore, ContentPipelineInput, ContentPipelineState, ContentRefineSnapshot, PageDocument, PageOutline, PageOutlineSection, PageOutlineSectionRole (+4 more)

### Community 74 - "RunSseHub"
Cohesion: 0.16
Nodes (6): Inject, RunSseEvent, RunSseHub, InMemoryRunSseHub, Inject, Injectable

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
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.05
Nodes (40): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), GatewayChatResponse (+32 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - "cn"
Cohesion: 0.05
Nodes (47): FeedbackCta(), AppHeader(), AppHeaderProps, AppSidebar(), AppSidebarProps, CompletenessChipSlot(), FeedbackCtaSlot(), FloatingBoxSlot() (+39 more)

### Community 82 - "configuration-validation.service.ts"
Cohesion: 0.16
Nodes (7): CACHE_BACKEND_TYPE, configurationValidation, ConfigurationValidationService, CACHE_BACKEND_VALUES, validate(), ValidatedEnvironment, RawGatewayConfig

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "provider-instances.bootstrap.ts"
Cohesion: 0.25
Nodes (10): assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryFn, openAiCompatibleApiSurface (+2 more)

### Community 85 - "run-review-panel.tsx"
Cohesion: 0.08
Nodes (32): canEditResult(), finalizeRunReview(), isUserRating(), patchRunRating(), saveOutputEdited(), UserRating, isCancelableRunStatus(), isReviewableRunStatus() (+24 more)

### Community 86 - "model-manager.service.ts"
Cohesion: 0.09
Nodes (31): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, convertModel(), ConfigPersistenceService, Injectable, defaultModelPolicy() (+23 more)

### Community 87 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 88 - "ClientRemoveCommand"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

### Community 89 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 90 - "AuthUserContext"
Cohesion: 0.07
Nodes (35): InviteUserDto, ApiProperty, IsEmail, Body, HttpCode, Post, CreateFeedbackDto, IsIn (+27 more)

### Community 91 - "PublicConfigController"
Cohesion: 0.22
Nodes (7): PublicConfigController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, Inject

### Community 92 - "openai-chat-completions.controller.ts"
Cohesion: 0.03
Nodes (77): ApiHeader, GATEWAY_CACHE_HEADER, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags (+69 more)

### Community 93 - "social.graph.ts"
Cohesion: 0.08
Nodes (47): loadPromptFromDir(), coercePassNoteVerdict(), isPassOnlyIssue(), coerceVerifierIssue(), ContentOutput, IdeasOutput, ideasOutputSchema, isPlainRecord() (+39 more)

### Community 94 - "anthropic.module.ts"
Cohesion: 0.21
Nodes (10): ChatModule, Module, AnthropicModule, Module, IntegrationsModule, Module, OpenAiModule, Module (+2 more)

### Community 95 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 96 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 98 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 99 - "RedisConnectionService"
Cohesion: 0.27
Nodes (3): RedisConnectionService, Injectable, isRedisRequiredFromConfig()

### Community 100 - "CompanyContextController"
Cohesion: 0.22
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 101 - "config-validator.ts"
Cohesion: 0.30
Nodes (9): CliValidateOptions, collectInactiveProviderWarnings(), formatZodIssues(), validateGatewayConfig(), ValidationOptions, ValidationResult, assertMasterKeyPresent(), validateEnvironment() (+1 more)

### Community 102 - "ChatParamsDto"
Cohesion: 0.20
Nodes (10): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+2 more)

### Community 103 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 104 - "patch-company-context.use-case.ts"
Cohesion: 0.44
Nodes (5): toPublicCompanyContext(), assertCompanyContextWritable(), PartialCompanyContext, isComplete(), mergeCompanyContext()

### Community 105 - "PrismaService"
Cohesion: 0.04
Nodes (43): DeleteUserUseCase, Inject, Injectable, CreateFeedbackUseCase, Inject, Injectable, agentKeySchema, CreateFeedbackCommand (+35 more)

### Community 106 - "list-runs.use-case.ts"
Cohesion: 0.24
Nodes (7): ListRunsOutput, ListRunsUseCase, Inject, Injectable, ListRunsQuery, PAGE_SIZE, RunStartedBy

### Community 107 - "ChatCacheIdentity"
Cohesion: 0.54
Nodes (3): ResponseCacheService, Injectable, ChatCacheIdentity

### Community 109 - "JwtCookieStrategy"
Cohesion: 0.33
Nodes (4): isRecord(), JwtCookieStrategy, Inject, Injectable

### Community 110 - "should-include-redis-stack.ts"
Cohesion: 0.35
Nodes (10): getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis() (+2 more)

### Community 111 - "isRecord"
Cohesion: 0.05
Nodes (67): geistMono, geistSans, metadata, ACTIVATION_FAILED_HINT, activateAccount(), bootstrapAdmin(), Credentials, fetchBootstrapStatus() (+59 more)

### Community 112 - "openai-params-provider.mapper.ts"
Cohesion: 0.12
Nodes (24): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+16 more)

### Community 113 - "ConfigSecretsStatusCommand"
Cohesion: 0.40
Nodes (3): ConfigSecretsStatusCommand, Command, Option

### Community 114 - "RefreshSessionRepository"
Cohesion: 0.10
Nodes (8): Inject, Inject, Inject, Inject, RefreshSessionRecord, RefreshSessionRepository, PrismaRefreshSessionAdapter, Injectable

### Community 116 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 117 - "company-context.controller.ts"
Cohesion: 0.16
Nodes (13): GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PatchCompanyContextUseCase, Inject (+5 more)

### Community 118 - "openai-chat-message.dto.ts"
Cohesion: 0.60
Nodes (3): isTextContentItem(), normalizeOpenAiContent(), TextContentItem

### Community 119 - "GuestGuard"
Cohesion: 0.40
Nodes (3): GuestGuard, Inject, Injectable

### Community 122 - "api/src/app.module.ts"
Cohesion: 0.06
Nodes (53): AuthModule, Module, CompanyContextModule, Module, CompanyContextRepository, ContentPipelineFacade, toOutcome(), Inject (+45 more)

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 125 - "brand"
Cohesion: 0.17
Nodes (10): brand, unbrand, createAccountActivationId(), createInvitationId(), createRequestId(), createUserId(), isAccountActivationId(), isInvitationId() (+2 more)

### Community 126 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 127 - "health.api.ts"
Cohesion: 0.27
Nodes (11): fetchGatewayAlive(), fetchHealthReady(), HealthCheck, HealthCheckStatus, HealthReadyAggregate, HealthReadyResponse, isGatewayAlive(), isRecord() (+3 more)

### Community 128 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.12
Nodes (14): HealthModule, Module, ObservabilityModule, Global, Module, ProviderInstancesBootstrap, Injectable, ProviderRegistryModule (+6 more)

### Community 129 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 131 - "openai-chat-completion-response.dto.ts"
Cohesion: 0.39
Nodes (8): OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty, ApiPropertyOptional

## Knowledge Gaps
- **468 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+463 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1247 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ModelAlias` connect `ModelAlias` to `asProviderInstanceId`, `provider-registry.service.ts`, `sentry-ai-metrics.adapter.ts`, `chat.service.ts`, `semantic-cache.service.ts`, `gateway-config.schema.ts`, `models.controller.ts`, `resilient-executor.ts`, `model-manager.service.ts`, `wizard-orchestrator.service.ts`, `redis-vector-store.adapter.ts`, `metrics.ts`, `types/index.ts`, `branded.types.ts`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `ModelAlias` to `asProviderInstanceId`, `LogContext`, `provider-registry.service.ts`, `sentry-ai-metrics.adapter.ts`, `chat.service.ts`, `.info`, `cli.module.ts`, `gateway-config.schema.ts`, `semantic-cache.service.ts`, `models.controller.ts`, `model-manager.service.ts`, `wizard-orchestrator.service.ts`, `GatewayConfig`, `metrics.ts`, `types/index.ts`, `branded.types.ts`, `configuration.ts`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Why does `isRunId()` connect `ids.ts` to `start-run.use-case.ts`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _468 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `auth.module.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.045910230120756436 - nodes in this community are weakly interconnected._
- **Should `get-run.use-case.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05570175438596491 - nodes in this community are weakly interconnected._