# Graph Report - content-chain  (2026-09-16)

## Corpus Check
- 563 files · ~158,552 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 6, .css 1)

## Summary
- 3644 nodes · 11209 edges · 142 communities (119 shown, 18 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 362 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `342fa35b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- cli.module.ts
- social.types.ts
- llm-hop.ts
- chat-provider-call.service.ts
- prisma-run.adapter.ts
- .constructor
- app-metrics.service.ts
- LogContext
- PrometheusAppMetricsAdapter
- provider-error.mapper.ts
- PrismaSocialResultAdapter
- asProviderInstanceId
- social.graph.ts
- ai-provider.interface.ts
- GatewayKey
- models.controller.ts
- anthropic-response.mapper.ts
- api/src/main.ts
- model-manager.service.ts
- branded.types.ts
- sentry-ai-metrics.adapter.ts
- .createMessage
- anthropic-messages.controller.ts
- anthropic/anthropic-tools.mapper.ts
- configuration.ts
- cache.module.ts
- getAppConfig
- AuthController
- save-output-edited.use-case.ts
- redis-vector-store.adapter.ts
- RunRepository
- openai-stream.mapper.ts
- ai-provider-gateway/src/main.ts
- runs.module.ts
- AnthropicMessagesRequestDto
- semantic-cache.service.ts
- filters/http-exception.filter.ts
- enums.ts
- types/index.ts
- semantic-cache.constants.ts
- api/src/app.module.ts
- config-generator.service.ts
- openai-models.controller.ts
- ids.ts
- app-metrics.module.ts
- users.controller.ts
- isOpenAiProviderType
- responses.adapter.ts
- GatewayConfig
- resume-hitl.use-case.ts
- InProcessRunWorker
- auth.module.ts
- ai-provider-gateway/src/app.module.ts
- ApiRequestIdHeader
- RefreshSessionRepository
- company-context.controller.ts
- InvitationsController
- ModelAlias
- ai-provider-gateway/src/health/health.service.ts
- HealthController
- chat-params.dto.ts
- company-context.dto.ts
- LoggingService
- RedisConnectionService
- WizardState
- PrismaService
- ContentResultStore
- CompanyContextRepository
- OpenAiChatCompletionRequestDto
- should-include-redis-stack.ts
- configuration-validation.service.ts
- swagger.setup.ts
- provider-instances.bootstrap.ts
- prisma-invitation.adapter.ts
- OpenAiChatMessageDto
- prisma-company-context.adapter.ts
- AuthUserContext
- UserRepository
- company-context.schemas.ts
- llm-gateway.http.adapter.ts
- PrometheusService
- public.decorator.ts
- run.port.ts
- SPEC — README
- runs.controller.ts
- config-validator.ts
- asGatewayKey
- StartRunDto
- api-fetch.ts
- gateway-config.schema.ts
- EnvironmentVariables
- auth.api.ts
- start-run.use-case.ts
- openai-params-provider.mapper.ts
- new-ids.ts
- acceptInvite
- route.ts
- ChatParamsDto
- ProviderAddCommand
- .completions
- JwtCookieStrategy
- VectorStore
- ClientAddCommand
- ClientEditCommand
- ClientRemoveCommand
- ModelAddCommand
- ModelEditCommand
- gateway-key.guard.branded-types.test-d.ts
- ProviderEditCommand
- EnvModule
- parse-llm-json.ts
- ModelRemoveCommand
- ProviderRemoveCommand
- CompanyContextController
- AppMetricsService
- openai-chat-message.dto.ts
- AuthModule
- session-provider.tsx
- dialog.tsx
- exitWithAgentReport
- Architektura
- brand.ts
- home-entry.tsx
- login-card.tsx
- InMemoryRunSseHub
- openai-chat-completion-request.dto.ts
- event-source-registry.ts
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
3. `LoggingService` - 73 edges
4. `asProviderInstanceId()` - 67 edges
5. `GatewayConfig` - 65 edges
6. `DomainException` - 63 edges
7. `GatewayKey` - 59 edges
8. `ClientId` - 54 edges
9. `ChatRequestDto` - 48 edges
10. `AppMetricsService` - 46 edges

## Surprising Connections (you probably didn't know these)
- `mapGatewayResponseToAnthropicFormat()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/anthropic/mappers/anthropic-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `logoutSession()` --calls--> `apiFetch()`  [EXTRACTED]
  apps/frontend/src/modules/auth/api/auth.api.ts → apps/frontend/src/shared/api/api-fetch.ts
- `RedisCacheAdapter` --implements--> `CacheBackend`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/cache/interfaces/cache-backend-interface.ts
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `RedisConnectionService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-connection.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (142 total, 18 thin omitted)

### Community 0 - "cli.module.ts"
Cohesion: 0.06
Nodes (59): AgentReport, AgentReportStatus, loadAnswers(), assertAgentHasAnswers(), CliMode, CliModeFlags, markAgentRuntime(), resolveCliMode() (+51 more)

### Community 1 - "social.types.ts"
Cohesion: 0.07
Nodes (30): ContentPipelineInput, ContentRefineSnapshot, PageDocument, PageOutline, PageOutlineSection, PageOutlineSectionRole, CompositeRunResultReader, GetRunOutput (+22 more)

### Community 2 - "llm-hop.ts"
Cohesion: 0.08
Nodes (46): Inject, coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema, pageOutlineSectionSchema (+38 more)

### Community 3 - "chat-provider-call.service.ts"
Cohesion: 0.10
Nodes (20): mapProviderResponseToUsage(), clamp(), isOverrideKey(), resolveProviderCallOptions(), CompleteOnceResult, OVERRIDE_KEYS, OverrideKey, UnsupportedProviderException (+12 more)

### Community 4 - "prisma-run.adapter.ts"
Cohesion: 0.09
Nodes (15): contentBriefSchema, socialBriefSchema, LightRunItem, ListRunsResult, RunSnapshot, RunLogEntry, ALLOWED, assertTransition() (+7 more)

### Community 5 - ".constructor"
Cohesion: 0.14
Nodes (12): GetRunUseCase, Inject, Injectable, ResumeHitlUseCase, Inject, Injectable, assertSameIds(), SaveOutputEditedUseCase (+4 more)

### Community 6 - "app-metrics.service.ts"
Cohesion: 0.19
Nodes (13): AppProviderCallContext, AppProviderStreamScope, AppRequestMethod, AppRequestStatus, AppTokenUsage, HealthComponent, HealthMetricsSnapshot, HealthStatus (+5 more)

### Community 7 - "LogContext"
Cohesion: 0.06
Nodes (25): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+17 more)

### Community 8 - "PrometheusAppMetricsAdapter"
Cohesion: 0.10
Nodes (4): healthStatusToGaugeValue(), PrometheusAppMetricsAdapter, Injectable, AppRequestLabels

### Community 9 - "provider-error.mapper.ts"
Cohesion: 0.15
Nodes (23): ChatErrorHandlerService, Injectable, ApiErrorPayload, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isProviderRateLimitError() (+15 more)

### Community 10 - "PrismaSocialResultAdapter"
Cohesion: 0.10
Nodes (9): OutputEditedWrite, OutputEditedWriter, applyWrite(), PrismaOutputEditedAdapter, Injectable, toInputJson(), PipelineState, PrismaSocialResultAdapter (+1 more)

### Community 11 - "asProviderInstanceId"
Cohesion: 0.07
Nodes (51): assertInteractiveAllowed(), DEFAULT_MODELS, InitAnswers, convertModel(), convertProvider(), parseWizardState(), CliAiProvider, KeyPromptService (+43 more)

### Community 12 - "social.graph.ts"
Cohesion: 0.14
Nodes (31): renderPrompt(), coercePassNoteVerdict(), isPassOnlyIssue(), isReelTaskType(), ReelTaskType, canRefine(), MAX_REFINE, nextRefineCount() (+23 more)

### Community 13 - "ai-provider.interface.ts"
Cohesion: 0.12
Nodes (35): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatCacheSource, ChatResponseData, ChatWarningDto, ApiProperty, ApiPropertyOptional (+27 more)

### Community 14 - "GatewayKey"
Cohesion: 0.14
Nodes (12): StreamCleanupInterceptor, Injectable, readClientGatewayKey(), readGatewayKeyHeader(), resolveClientIdFromKey(), GatewayKey, ResolvedGatewayClient, SmartRateLimitGuard (+4 more)

### Community 15 - "models.controller.ts"
Cohesion: 0.10
Nodes (22): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+14 more)

### Community 16 - "anthropic-response.mapper.ts"
Cohesion: 0.13
Nodes (25): SseDoneEvent, asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto, AnthropicTextContentBlockDto (+17 more)

### Community 17 - "api/src/main.ts"
Cohesion: 0.33
Nodes (6): AppModule, Module, bootstrap(), parseCorsOrigins(), configureHttpApp(), buildSwaggerConfig()

### Community 18 - "model-manager.service.ts"
Cohesion: 0.12
Nodes (24): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, defaultModelPolicy(), ModelEditField, ModelManagerService, Injectable (+16 more)

### Community 19 - "branded.types.ts"
Cohesion: 0.05
Nodes (67): serializeCallParamsForCache(), SemanticStoreEmbedState, CacheIdentityMessage, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional (+59 more)

### Community 20 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.08
Nodes (33): CostUsd, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes() (+25 more)

### Community 21 - ".createMessage"
Cohesion: 0.13
Nodes (13): ApiHeader, AnthropicMessagesController, ApiBody, ApiOperation, ApiProduces, ApiResponse, ApiSecurity, ApiTags (+5 more)

### Community 22 - "anthropic-messages.controller.ts"
Cohesion: 0.05
Nodes (46): GATEWAY_CACHE_HEADER, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags, Body (+38 more)

### Community 23 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.09
Nodes (39): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent() (+31 more)

### Community 24 - "configuration.ts"
Cohesion: 0.14
Nodes (21): asCacheTtlSeconds(), asSemanticCacheTtlSeconds(), AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig, SemanticCacheRuntimeConfig, buildAppConfiguration() (+13 more)

### Community 25 - "cache.module.ts"
Cohesion: 0.11
Nodes (13): NoOpCacheBackend, Injectable, NoopCacheModule, Module, CacheModule, CacheModuleOptions, Module, CacheRegistryService (+5 more)

### Community 26 - "getAppConfig"
Cohesion: 0.19
Nodes (11): getAppConfig(), GatewayKeyGuard, Injectable, enrichRequestWithClientId(), AnthropicApiKeyGuard, readAnthropicApiKey(), Injectable, OpenAiBearerAuthGuard (+3 more)

### Community 27 - "AuthController"
Cohesion: 0.08
Nodes (27): AuthController, ApiCookieAuth, ApiTags, Body, Controller, Get, HttpCode, Post (+19 more)

### Community 28 - "save-output-edited.use-case.ts"
Cohesion: 0.08
Nodes (35): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+27 more)

### Community 29 - "redis-vector-store.adapter.ts"
Cohesion: 0.13
Nodes (21): RedisCacheAdapter, Injectable, isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), asString() (+13 more)

### Community 30 - "RunRepository"
Cohesion: 0.10
Nodes (4): Inject, Inject, Inject, RunRepository

### Community 31 - "openai-stream.mapper.ts"
Cohesion: 0.17
Nodes (21): fromGatewayToolCallDto(), OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty (+13 more)

### Community 32 - "ai-provider-gateway/src/main.ts"
Cohesion: 0.13
Nodes (15): AppModule, Module, bootstrap(), API_GLOBAL_PREFIX, PORT, setupApp(), exportOpenApi(), OPENAPI_OUTPUT_FILENAME (+7 more)

### Community 33 - "runs.module.ts"
Cohesion: 0.12
Nodes (16): Inject, RecoverInterruptedRunsUseCase, Inject, Injectable, RunLifecycleService, TransitionExtras, Inject, Injectable (+8 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "semantic-cache.service.ts"
Cohesion: 0.13
Nodes (17): computeSystemSignature(), hashCallParams(), ResponseCacheService, Injectable, isSingleTurnUserRequest(), lastUserMessageText(), embeddingProbeTimeoutMs(), SemanticCacheModule (+9 more)

### Community 36 - "filters/http-exception.filter.ts"
Cohesion: 0.21
Nodes (7): DEFAULT_HTTP_STATUS_TO_CODE, GlobalExceptionFilter, isPayloadTooLargeError(), PayloadTooLargeError, RequestWithId, Catch, Injectable

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "types/index.ts"
Cohesion: 0.08
Nodes (46): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+38 more)

### Community 39 - "semantic-cache.constants.ts"
Cohesion: 0.13
Nodes (12): EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema(), EMBEDDING_CIRCUIT_COOLDOWN_MS, EMBEDDING_CIRCUIT_OPEN_AFTER, EMBEDDING_PROBE_TIMEOUT_MS (+4 more)

### Community 40 - "api/src/app.module.ts"
Cohesion: 0.08
Nodes (41): CompanyContextModule, Module, ContentPipelineFacade, toOutcome(), Injectable, ContentRunExecutor, isCanonicalOutlineSelection(), isMissingContentKind() (+33 more)

### Community 41 - "config-generator.service.ts"
Cohesion: 0.16
Nodes (11): ConfigGeneratorService, Injectable, FileManagerService, Injectable, WizardRunResult, EnvTemplateInput, generateEnvTemplate(), isEnvInputRedisRequired() (+3 more)

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.11
Nodes (23): ApiOpenAiErrorResponses(), ANTHROPIC_INTEGRATION_PATH, OPENAI_INTEGRATION_PATH, OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam (+15 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (28): brand, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createInvitationId(), createRequestId() (+20 more)

### Community 44 - "app-metrics.module.ts"
Cohesion: 0.08
Nodes (18): Inject, Optional, AppMetricsModule, resolveAppMetricsBackend(), Global, Module, Inject, APP_METRICS_BACKEND (+10 more)

### Community 45 - "users.controller.ts"
Cohesion: 0.08
Nodes (22): ListUsersUseCase, Inject, Injectable, ReactivateUserUseCase, Inject, Injectable, SoftDeleteUserUseCase, Injectable (+14 more)

### Community 46 - "isOpenAiProviderType"
Cohesion: 0.16
Nodes (15): PendingSecretsItem, collectPendingSecrets(), GatewayConfigSchema, assertEnabledProviderApiKeysPresent(), collectMissingEnabledProviderApiKeyErrors(), formatMissingProviderApiKeyError(), isApiKeyRequiredForProviderType(), MissingProviderApiKey (+7 more)

### Community 47 - "responses.adapter.ts"
Cohesion: 0.06
Nodes (69): buildAppProviderMetricsContext(), mapProviderResponseToAiObservation(), toCachedChatResponse(), toHttpException(), asInputTokens(), asOutputTokens(), asSystemFingerprint(), asToolCallId() (+61 more)

### Community 48 - "GatewayConfig"
Cohesion: 0.10
Nodes (13): ClientManagerService, Injectable, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable, EnvPatchService, Injectable, ClientCli (+5 more)

### Community 49 - "resume-hitl.use-case.ts"
Cohesion: 0.15
Nodes (13): GetRunLogsOutput, GetRunLogsUseCase, Inject, Injectable, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId (+5 more)

### Community 50 - "InProcessRunWorker"
Cohesion: 0.20
Nodes (4): InProcessRunWorker, Injectable, StubRunExecutor, Injectable

### Community 51 - "auth.module.ts"
Cohesion: 0.07
Nodes (54): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Inject, Injectable, comparePassword(), generateRefreshToken(), hashPassword() (+46 more)

### Community 52 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.08
Nodes (23): ChatModule, Module, HealthModule, Module, AnthropicModule, Module, IntegrationsModule, Module (+15 more)

### Community 53 - "ApiRequestIdHeader"
Cohesion: 0.10
Nodes (25): ApiAnthropicErrorResponses(), ApiRequestIdHeader(), ApiOkResponse, ApiOperation, Get, AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse (+17 more)

### Community 54 - "RefreshSessionRepository"
Cohesion: 0.12
Nodes (6): Inject, Inject, Inject, Inject, Inject, RefreshSessionRepository

### Community 55 - "company-context.controller.ts"
Cohesion: 0.21
Nodes (14): toCompanyContext(), toPartialCompanyContext(), toPublicCompanyContext(), GetCompanyContextUseCase, Injectable, GetCompletenessUseCase, Injectable, PatchCompanyContextUseCase (+6 more)

### Community 56 - "InvitationsController"
Cohesion: 0.09
Nodes (18): InviteUserUseCase, Injectable, ListInvitationsUseCase, Inject, Injectable, RevokeInvitationUseCase, Inject, Injectable (+10 more)

### Community 57 - "ModelAlias"
Cohesion: 0.07
Nodes (6): ProviderTestOptions, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, AppMetricsBackend

### Community 58 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.10
Nodes (19): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthLivenessResponseDto, ApiProperty, HealthReadinessChecksDto, HealthReadinessResponseDto, ApiProperty (+11 more)

### Community 59 - "HealthController"
Cohesion: 0.16
Nodes (11): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, HealthModule, Module (+3 more)

### Community 60 - "chat-params.dto.ts"
Cohesion: 0.24
Nodes (7): ResponseFormatDto, ApiProperty, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsThinkingBudget()

### Community 61 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 62 - "LoggingService"
Cohesion: 0.10
Nodes (12): Inject, OllamaEmbeddingAdapter, Injectable, EmbeddingBackend, Inject, StreamCacheReplayService, Injectable, getAppConfigOrThrow() (+4 more)

### Community 63 - "RedisConnectionService"
Cohesion: 0.20
Nodes (5): RedisCacheModule, Module, RedisConnectionService, Injectable, isRedisRequiredFromConfig()

### Community 64 - "WizardState"
Cohesion: 0.09
Nodes (16): ConfigInitCommand, Command, Option, ConfigValidateCommand, Command, Option, WIZARD_INIT_STEPS, WIZARD_STEPS (+8 more)

### Community 65 - "PrismaService"
Cohesion: 0.04
Nodes (41): RefreshSessionRecord, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable, CreateFeedbackUseCase, Inject, Injectable, agentKeySchema (+33 more)

### Community 66 - "ContentResultStore"
Cohesion: 0.13
Nodes (7): ContentResultStore, ContentPipelineState, VerifierVerdict, PrismaContentResultAdapter, toContentPipelinePhase(), Injectable, Inject

### Community 67 - "CompanyContextRepository"
Cohesion: 0.16
Nodes (8): Inject, Inject, Inject, Inject, CompanyContextRepository, CompanyContext, PrismaCompanyContextAdapter, Injectable

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (18): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+10 more)

### Community 69 - "should-include-redis-stack.ts"
Cohesion: 0.35
Nodes (10): getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis() (+2 more)

### Community 70 - "configuration-validation.service.ts"
Cohesion: 0.16
Nodes (8): CACHE_BACKEND_TYPE, assertEnabledProviderSecretsPresent(), configurationValidation, ConfigurationValidationService, CACHE_BACKEND_VALUES, validate(), ValidatedEnvironment, RawGatewayConfig

### Community 71 - "swagger.setup.ts"
Cohesion: 0.05
Nodes (61): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+53 more)

### Community 72 - "provider-instances.bootstrap.ts"
Cohesion: 0.30
Nodes (9): assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryFn, OpenAiProviderConfig (+1 more)

### Community 73 - "prisma-invitation.adapter.ts"
Cohesion: 0.17
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 74 - "OpenAiChatMessageDto"
Cohesion: 0.22
Nodes (9): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+1 more)

### Community 75 - "prisma-company-context.adapter.ts"
Cohesion: 0.16
Nodes (15): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, Completeness (+7 more)

### Community 76 - "AuthUserContext"
Cohesion: 0.07
Nodes (30): InviteUserDto, ApiProperty, IsEmail, ListRunsUserItem, ListRunsUserOutput, ListRunsUserUseCase, Injectable, isTerminalStatus() (+22 more)

### Community 77 - "UserRepository"
Cohesion: 0.08
Nodes (20): BootstrapAdminInput, bootstrapAdminSchema, LoginInput, loginSchema, PatchUserCommand, patchUserSchema, Inject, Inject (+12 more)

### Community 78 - "company-context.schemas.ts"
Cohesion: 0.33
Nodes (5): companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.05
Nodes (40): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), GatewayChatResponse (+32 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - "public.decorator.ts"
Cohesion: 0.38
Nodes (3): IS_PUBLIC_KEY, JwtAuthGuard, Injectable

### Community 82 - "run.port.ts"
Cohesion: 0.13
Nodes (15): FinalizeReviewUseCase, Inject, Injectable, ListRunsOutput, ListRunsUseCase, Injectable, RateRunUseCase, ratingSchema (+7 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "runs.controller.ts"
Cohesion: 0.11
Nodes (15): HitlDto, IsArray, IsString, ListRunsQueryDto, IsIn, IsInt, IsOptional, IsString (+7 more)

### Community 85 - "config-validator.ts"
Cohesion: 0.28
Nodes (10): CliValidateOptions, collectInactiveProviderWarnings(), formatZodIssues(), validateGatewayConfig(), ValidationOptions, ValidationResult, buildEffectiveGatewayConfig(), assertMasterKeyPresent() (+2 more)

### Community 86 - "asGatewayKey"
Cohesion: 0.16
Nodes (6): KeyGenerateCommand, Command, Option, KeyGeneratorService, Injectable, asGatewayKey()

### Community 88 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 89 - "api-fetch.ts"
Cohesion: 0.27
Nodes (9): apiFetch(), ApiFetchOptions, parseBody(), refreshSession(), toApiError(), UnauthorizedHandler, ApiError, ApiErrorEnvelope (+1 more)

### Community 90 - "gateway-config.schema.ts"
Cohesion: 0.12
Nodes (36): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema, convertClient() (+28 more)

### Community 91 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 92 - "auth.api.ts"
Cohesion: 0.33
Nodes (11): bootstrapAdmin(), Credentials, fetchBootstrapStatus(), loginWithPassword(), logoutSession(), parseAuthUserWrapper(), parseSessionUser(), SessionUser (+3 more)

### Community 93 - "start-run.use-case.ts"
Cohesion: 0.19
Nodes (15): ParsedStartRunCommand, startRunCommandSchema, isContentStartCommand(), isPlainRecord(), omitUndefinedDeep(), StartRunBriefInput, StartRunCommand, StartRunUseCase (+7 more)

### Community 94 - "openai-params-provider.mapper.ts"
Cohesion: 0.12
Nodes (24): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+16 more)

### Community 95 - "new-ids.ts"
Cohesion: 0.17
Nodes (8): ErrorEnvelope, HttpExceptionFilter, Catch, newInvitationId(), newRequestId(), newUserId(), RequestIdMiddleware, Injectable

### Community 96 - "acceptInvite"
Cohesion: 0.32
Nodes (5): AcceptInvitePageProps, acceptInvite(), AcceptInviteForm(), onSubmit(), passwordMeetsPolicy()

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 98 - "ChatParamsDto"
Cohesion: 0.20
Nodes (10): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+2 more)

### Community 99 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 100 - ".completions"
Cohesion: 0.14
Nodes (12): OpenAiChatCompletionsController, ApiBody, ApiOperation, ApiProduces, ApiResponse, ApiSecurity, ApiTags, Body (+4 more)

### Community 101 - "JwtCookieStrategy"
Cohesion: 0.33
Nodes (4): isRecord(), JwtCookieStrategy, Inject, Injectable

### Community 103 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 104 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 105 - "ClientRemoveCommand"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

### Community 106 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 107 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 109 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 110 - "EnvModule"
Cohesion: 0.67
Nodes (3): EnvModule, Global, Module

### Community 112 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 113 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 115 - "CompanyContextController"
Cohesion: 0.15
Nodes (9): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Body, Controller, Get, Patch (+1 more)

### Community 116 - "AppMetricsService"
Cohesion: 0.10
Nodes (6): HttpMetricsMiddleware, Injectable, ActiveStreamsTracker, Injectable, AppMetricsService, Injectable

### Community 117 - "openai-chat-message.dto.ts"
Cohesion: 0.60
Nodes (3): isTextContentItem(), normalizeOpenAiContent(), TextContentItem

### Community 119 - "session-provider.tsx"
Cohesion: 0.21
Nodes (9): geistMono, geistSans, metadata, fetchUserSession(), SessionContext, SessionContextValue, SessionProvider(), SessionState (+1 more)

### Community 121 - "exitWithAgentReport"
Cohesion: 0.11
Nodes (12): emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList(), ProviderTestCommand (+4 more)

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 126 - "home-entry.tsx"
Cohesion: 0.43
Nodes (3): HomeEntry(), useSession(), Skeleton()

### Community 128 - "login-card.tsx"
Cohesion: 0.20
Nodes (10): AcceptInviteFormProps, Card(), CardContent(), CardHeader(), CardTitle(), EnvelopeError(), FormField(), FormFieldProps (+2 more)

### Community 129 - "InMemoryRunSseHub"
Cohesion: 0.29
Nodes (4): RunSseEvent, InMemoryRunSseHub, Inject, Injectable

## Knowledge Gaps
- **297 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+292 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1008 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `LoggingService` connect `LoggingService` to `chat-provider-call.service.ts`, `LogContext`, `provider-error.mapper.ts`, `GatewayKey`, `branded.types.ts`, `anthropic/anthropic-tools.mapper.ts`, `cache.module.ts`, `redis-vector-store.adapter.ts`, `ai-provider-gateway/src/main.ts`, `semantic-cache.service.ts`, `filters/http-exception.filter.ts`, `types/index.ts`, `app-metrics.module.ts`, `responses.adapter.ts`, `ai-provider-gateway/src/app.module.ts`, `ai-provider-gateway/src/health/health.service.ts`, `RedisConnectionService`, `swagger.setup.ts`, `provider-instances.bootstrap.ts`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Why does `GatewayConfig` connect `GatewayConfig` to `cli.module.ts`, `chat-provider-call.service.ts`, `configuration-validation.service.ts`, `asProviderInstanceId`, `isOpenAiProviderType`, `models.controller.ts`, `model-manager.service.ts`, `branded.types.ts`, `config-validator.ts`, `configuration.ts`, `exitWithAgentReport`, `gateway-config.schema.ts`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Why does `asProviderInstanceId()` connect `asProviderInstanceId` to `cli.module.ts`, `chat-provider-call.service.ts`, `types/index.ts`, `swagger.setup.ts`, `provider-instances.bootstrap.ts`, `provider-error.mapper.ts`, `ai-provider.interface.ts`, `isOpenAiProviderType`, `responses.adapter.ts`, `models.controller.ts`, `model-manager.service.ts`, `branded.types.ts`, `anthropic/anthropic-tools.mapper.ts`, `configuration.ts`, `exitWithAgentReport`, `gateway-config.schema.ts`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _297 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `cli.module.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06415841584158416 - nodes in this community are weakly interconnected._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06876285630326183 - nodes in this community are weakly interconnected._