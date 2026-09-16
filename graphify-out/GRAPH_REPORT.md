# Graph Report - content-chain  (2026-09-16)

## Corpus Check
- 576 files · ~159,995 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 6, .css 1)

## Summary
- 3694 nodes · 11397 edges · 132 communities (116 shown, 12 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 363 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a27bca14`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- cli.module.ts
- social.types.ts
- social-pipeline.facade.ts
- provider-instances.bootstrap.ts
- create-feedback.use-case.ts
- StartRunDto
- app-metrics-backend.interface.ts
- LogContext
- PrometheusAppMetricsAdapter
- provider-error.mapper.ts
- llm-hop.ts
- gateway-config.schema.ts
- social.graph.ts
- branded.types.ts
- chat.service.ts
- models.controller.ts
- anthropic-response.mapper.ts
- api-error.code.ts
- model-manager.service.ts
- configuration.ts
- sentry-ai-metrics.adapter.ts
- asProviderInstanceId
- anthropic-messages.controller.ts
- anthropic/anthropic-tools.mapper.ts
- ai-provider-gateway/src/health/health.service.ts
- response-cache.service.ts
- getAppConfig
- auth.controller.ts
- save-output-edited.use-case.ts
- redis-vector-store.adapter.ts
- semantic-cache.constants.ts
- openai-stream.mapper.ts
- swagger.setup.ts
- .create
- AnthropicMessagesRequestDto
- semantic-cache.service.ts
- RunRepository
- enums.ts
- types/index.ts
- anthropic.module.ts
- api/src/app.module.ts
- config-generator.service.ts
- openai-models.controller.ts
- ids.ts
- app-metrics.service.ts
- PrismaService
- configure-swagger.ts
- responses.adapter.ts
- GatewayConfig
- ChatResponseDto
- prisma-run.adapter.ts
- auth.module.ts
- ai-provider-gateway/src/app.module.ts
- anthropic-models.controller.ts
- ChatToolingDto
- company-context.controller.ts
- InvitationsController
- ModelAlias
- HealthService
- HealthController
- ChatParamsDto
- company-context.dto.ts
- chat-provider-call.service.ts
- LoggingService
- exitWithAgentReport
- PrismaRefreshSessionAdapter
- openai-chat-completion-response.dto.ts
- CompanyContextRepository
- OpenAiChatCompletionRequestDto
- roles.decorator.ts
- AppMetricsModule
- ChatMessageDto
- configuration-validation.service.ts
- prisma-invitation.adapter.ts
- OpenAiChatMessageDto
- prisma-company-context.adapter.ts
- DomainException
- UserRepository
- company-context.mapper.ts
- llm-gateway.http.adapter.ts
- PrometheusService
- RedisConnectionService
- SPEC — README
- ListRunsQueryDto
- KeyGenerateCommand
- http-metrics.interceptor.ts
- auth.api.ts
- gateway-key.guard.branded-types.test-d.ts
- start-run.use-case.ts
- openai-params-provider.mapper.ts
- should-include-redis-stack.ts
- route.ts
- public.decorator.ts
- ProviderAddCommand
- EnvironmentVariables
- ClientAddCommand
- ClientEditCommand
- ClientRemoveCommand
- ModelAddCommand
- ModelEditCommand
- AppMetricsService
- ProviderEditCommand
- bootstrap-admin.use-case.ts
- logging.service.ts
- ModelRemoveCommand
- ProviderRemoveCommand
- cn
- CompanyContextController
- config-validator.ts
- ConfigInitCommand
- useSession
- logout-dialog.tsx
- Architektura
- brand.ts
- app/layout.tsx
- login-card.tsx
- InMemoryRunSseHub
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
- dashboard-shell.tsx

## God Nodes (most connected - your core abstractions)
1. `ModelAlias` - 88 edges
2. `ProviderInstanceId` - 81 edges
3. `LoggingService` - 73 edges
4. `asProviderInstanceId()` - 67 edges
5. `DomainException` - 66 edges
6. `GatewayConfig` - 65 edges
7. `GatewayKey` - 59 edges
8. `ClientId` - 54 edges
9. `ChatRequestDto` - 48 edges
10. `cn()` - 47 edges

## Surprising Connections (you probably didn't know these)
- `toChatResponseDto()` --indirect_call--> `toGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/chat/dto/chat-response.dto.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `mapGatewayResponseToAnthropicFormat()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/anthropic/mappers/anthropic-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `DialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/dialog.tsx → apps/frontend/src/shared/utils/utils.ts
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `RedisConnectionService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-connection.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (132 total, 12 thin omitted)

### Community 0 - "cli.module.ts"
Cohesion: 0.06
Nodes (59): AgentReport, AgentReportStatus, PendingSecretsItem, loadAnswers(), collectPendingSecrets(), assertAgentHasAnswers(), CliMode, CliModeFlags (+51 more)

### Community 1 - "social.types.ts"
Cohesion: 0.06
Nodes (28): CompositeRunResultReader, GetRunOutput, orderItemsBySelectedIds(), RUN_RESULT_READER, RunResultReader, SocialBrief, EmptyRunResultReader, Injectable (+20 more)

### Community 2 - "social-pipeline.facade.ts"
Cohesion: 0.14
Nodes (16): LlmGatewayError, isSocialRunRecord(), SocialRunRecord, SocialPipelineFacade, toOutcome(), Inject, Injectable, SocialRunExecutor (+8 more)

### Community 3 - "provider-instances.bootstrap.ts"
Cohesion: 0.27
Nodes (10): GatewayProviderInstanceConfig, assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryFn (+2 more)

### Community 4 - "create-feedback.use-case.ts"
Cohesion: 0.11
Nodes (19): CreateFeedbackUseCase, Inject, Injectable, agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_RUN_READER, FeedbackRunLookup (+11 more)

### Community 5 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 6 - "app-metrics-backend.interface.ts"
Cohesion: 0.20
Nodes (10): healthStatusToGaugeValue(), AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus, HttpMethod, HttpRequestLabels (+2 more)

### Community 7 - "LogContext"
Cohesion: 0.07
Nodes (22): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+14 more)

### Community 8 - "PrometheusAppMetricsAdapter"
Cohesion: 0.10
Nodes (6): PrometheusAppMetricsAdapter, Injectable, resolveAppMetricsBackend(), AppProviderCallContext, AppProviderStreamScope, AppRequestLabels

### Community 9 - "provider-error.mapper.ts"
Cohesion: 0.24
Nodes (18): MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isProviderRateLimitError(), isRateLimitStatus(), isServerError(), isTimeoutStatus() (+10 more)

### Community 10 - "llm-hop.ts"
Cohesion: 0.09
Nodes (44): coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema, pageOutlineSectionSchema, readNonEmptyString() (+36 more)

### Community 11 - "gateway-config.schema.ts"
Cohesion: 0.06
Nodes (64): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, InitAnswers (+56 more)

### Community 12 - "social.graph.ts"
Cohesion: 0.08
Nodes (48): loadPromptFromDir(), coercePassNoteVerdict(), isPassOnlyIssue(), coerceVerifierIssue(), ContentOutput, IdeasOutput, ideasOutputSchema, isPlainRecord() (+40 more)

### Community 13 - "branded.types.ts"
Cohesion: 0.09
Nodes (46): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatResponseData, ChatWarningDto, ApiProperty, ApiPropertyOptional, IsOptional (+38 more)

### Community 14 - "chat.service.ts"
Cohesion: 0.07
Nodes (50): SemanticStoreEmbedState, CacheIdentityMessage, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize (+42 more)

### Community 15 - "models.controller.ts"
Cohesion: 0.10
Nodes (22): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+14 more)

### Community 16 - "anthropic-response.mapper.ts"
Cohesion: 0.14
Nodes (24): SseDoneEvent, asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto, AnthropicTextContentBlockDto (+16 more)

### Community 17 - "api-error.code.ts"
Cohesion: 0.16
Nodes (9): ApiErrorCode, DEFAULT_HTTP_STATUS_TO_CODE, ApiErrorPayload, GlobalExceptionFilter, isPayloadTooLargeError(), PayloadTooLargeError, RequestWithId, Catch (+1 more)

### Community 18 - "model-manager.service.ts"
Cohesion: 0.10
Nodes (33): assertInteractiveAllowed(), DEFAULT_MODELS, DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, defaultModelPolicy(), ModelEditField (+25 more)

### Community 19 - "configuration.ts"
Cohesion: 0.15
Nodes (21): asSemanticCacheTtlSeconds(), AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig, SemanticCacheRuntimeConfig, buildAppConfiguration(), buildEffectiveGatewayConfig() (+13 more)

### Community 20 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.11
Nodes (27): CostUsd, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes() (+19 more)

### Community 21 - "asProviderInstanceId"
Cohesion: 0.08
Nodes (42): ProviderTestCommand, Command, Option, convertProvider(), CliAiProvider, ProviderPromptResult, ProviderPromptService, Injectable (+34 more)

### Community 22 - "anthropic-messages.controller.ts"
Cohesion: 0.03
Nodes (73): ApiHeader, ChatCacheSource, GATEWAY_CACHE_HEADER, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity (+65 more)

### Community 23 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.09
Nodes (39): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent() (+31 more)

### Community 24 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.24
Nodes (11): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiProperty, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty (+3 more)

### Community 25 - "response-cache.service.ts"
Cohesion: 0.11
Nodes (14): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+6 more)

### Community 26 - "getAppConfig"
Cohesion: 0.18
Nodes (11): getAppConfig(), GatewayKeyGuard, Injectable, enrichRequestWithClientId(), AnthropicApiKeyGuard, readAnthropicApiKey(), Injectable, OpenAiBearerAuthGuard (+3 more)

### Community 27 - "auth.controller.ts"
Cohesion: 0.06
Nodes (43): BootstrapStatusUseCase, Inject, Injectable, AuthController, ApiCookieAuth, ApiTags, Body, Controller (+35 more)

### Community 28 - "save-output-edited.use-case.ts"
Cohesion: 0.09
Nodes (25): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+17 more)

### Community 29 - "redis-vector-store.adapter.ts"
Cohesion: 0.12
Nodes (20): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), asString(), ParsedKnnHits, parseKnnHits() (+12 more)

### Community 30 - "semantic-cache.constants.ts"
Cohesion: 0.13
Nodes (12): EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema(), EMBEDDING_CIRCUIT_COOLDOWN_MS, EMBEDDING_CIRCUIT_OPEN_AFTER, EMBEDDING_PROBE_TIMEOUT_MS (+4 more)

### Community 31 - "openai-stream.mapper.ts"
Cohesion: 0.28
Nodes (13): fromGatewayToolCallDto(), mapChatResponseToOpenAi(), mapFinishReasontoOpenAI(), mapGatewayToolCallsToOpenAi(), mapSystemFingerprintToOpenAi(), toOpenAiCompletionId(), baseChunkFields(), buildToolCallsDelta() (+5 more)

### Community 32 - "swagger.setup.ts"
Cohesion: 0.12
Nodes (19): AppModule, Module, SseDeltaPayloadDto, ApiProperty, bootstrap(), API_GLOBAL_PREFIX, PORT, setupApp() (+11 more)

### Community 33 - ".create"
Cohesion: 0.13
Nodes (13): FeedbackController, ApiCookieAuth, ApiTags, Body, Controller, HttpCode, Post, CreateFeedbackDto (+5 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "semantic-cache.service.ts"
Cohesion: 0.09
Nodes (23): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, OllamaEmbeddingAdapter, Injectable, EmbeddingBackend (+15 more)

### Community 36 - "RunRepository"
Cohesion: 0.05
Nodes (30): Inject, InProcessRunWorker, Inject, Injectable, ListRunsOutput, RecoverInterruptedRunsUseCase, Inject, Injectable (+22 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "types/index.ts"
Cohesion: 0.08
Nodes (45): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+37 more)

### Community 39 - "anthropic.module.ts"
Cohesion: 0.15
Nodes (12): ChatModule, Module, AnthropicModule, Module, IntegrationsModule, Module, OpenAiExceptionFilter, Catch (+4 more)

### Community 40 - "api/src/app.module.ts"
Cohesion: 0.07
Nodes (35): CompanyContextModule, Module, ContentPipelineFacade, toOutcome(), Inject, Injectable, ContentRunExecutor, isCanonicalOutlineSelection() (+27 more)

### Community 41 - "config-generator.service.ts"
Cohesion: 0.11
Nodes (15): ConfigValidateCommand, Command, Option, CliGatewayValidatorService, Injectable, ConfigGeneratorService, Injectable, FileManagerService (+7 more)

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.13
Nodes (21): ApiOpenAiErrorResponses(), OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+13 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (28): brand, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createInvitationId(), createRequestId() (+20 more)

### Community 44 - "app-metrics.service.ts"
Cohesion: 0.11
Nodes (14): Inject, Optional, Inject, APP_METRICS_BACKEND, MetricsController, ApiOperation, ApiResponse, ApiTags (+6 more)

### Community 45 - "PrismaService"
Cohesion: 0.15
Nodes (5): PrismaModule, Global, Module, PrismaService, Injectable

### Community 46 - "configure-swagger.ts"
Cohesion: 0.24
Nodes (8): AppModule, Module, bootstrap(), parseCorsOrigins(), configureHttpApp(), ACCESS_COOKIE_NAME, buildSwaggerConfig(), COOKIE_AUTH_NAME

### Community 47 - "responses.adapter.ts"
Cohesion: 0.06
Nodes (68): toCachedChatResponse(), toHttpException(), asInputTokens(), asOutputTokens(), asSystemFingerprint(), asToolCallId(), getUsageMetadata(), buildGenerationConfig() (+60 more)

### Community 48 - "GatewayConfig"
Cohesion: 0.08
Nodes (16): ClientManagerService, Injectable, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable, EnvPatchService, Injectable, ProviderManagerService (+8 more)

### Community 49 - "ChatResponseDto"
Cohesion: 0.17
Nodes (10): ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString (+2 more)

### Community 50 - "prisma-run.adapter.ts"
Cohesion: 0.07
Nodes (24): contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, runIdSchema (+16 more)

### Community 51 - "auth.module.ts"
Cohesion: 0.08
Nodes (34): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Inject, Injectable, InviteUserResult, inviteUserSchema, InviteUserUseCase (+26 more)

### Community 52 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.15
Nodes (12): HealthModule, Module, LoggingModule, Global, Module, ProviderInstancesBootstrap, Injectable, ProviderRegistryModule (+4 more)

### Community 53 - "anthropic-models.controller.ts"
Cohesion: 0.11
Nodes (23): ApiAnthropicErrorResponses(), AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+15 more)

### Community 54 - "ChatToolingDto"
Cohesion: 0.16
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 55 - "company-context.controller.ts"
Cohesion: 0.21
Nodes (12): toPublicCompanyContext(), GetCompanyContextUseCase, Injectable, GetCompletenessUseCase, Injectable, PatchCompanyContextUseCase, Injectable, PutCompanyContextUseCase (+4 more)

### Community 56 - "InvitationsController"
Cohesion: 0.12
Nodes (13): InviteUserDto, ApiProperty, IsEmail, InvitationsController, ApiCookieAuth, ApiTags, Body, Controller (+5 more)

### Community 57 - "ModelAlias"
Cohesion: 0.06
Nodes (8): ProviderTestOptions, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, AppMetricsBackend, AppTokenUsage, TokenDirection

### Community 58 - "HealthService"
Cohesion: 0.11
Nodes (11): HealthLivenessResponseDto, ApiProperty, HealthReadinessResponseDto, HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller (+3 more)

### Community 59 - "HealthController"
Cohesion: 0.16
Nodes (11): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, HealthModule, Module (+3 more)

### Community 60 - "ChatParamsDto"
Cohesion: 0.12
Nodes (17): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+9 more)

### Community 61 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 62 - "chat-provider-call.service.ts"
Cohesion: 0.07
Nodes (39): buildAppProviderMetricsContext(), buildLlmMetricsContext(), mapProviderResponseToAiObservation(), mapProviderResponseToUsage(), toMetricsMessages(), buildProviderInputForAlias(), toProviderTurns(), clamp() (+31 more)

### Community 63 - "LoggingService"
Cohesion: 0.10
Nodes (10): CacheModule, Module, CacheRegistryService, Injectable, Inject, Inject, LoggingService, Injectable (+2 more)

### Community 64 - "exitWithAgentReport"
Cohesion: 0.17
Nodes (10): emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), resolveCliMode(), toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList() (+2 more)

### Community 65 - "PrismaRefreshSessionAdapter"
Cohesion: 0.27
Nodes (4): RefreshSessionRecord, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable

### Community 66 - "openai-chat-completion-response.dto.ts"
Cohesion: 0.39
Nodes (8): OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty, ApiPropertyOptional

### Community 67 - "CompanyContextRepository"
Cohesion: 0.15
Nodes (8): Inject, Inject, Inject, Inject, CompanyContextRepository, CompanyContext, PrismaCompanyContextAdapter, Injectable

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (19): IsStringOrArrayOfStrings(), OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray (+11 more)

### Community 69 - "roles.decorator.ts"
Cohesion: 0.33
Nodes (3): ROLES_KEY, RolesGuard, Injectable

### Community 70 - "AppMetricsModule"
Cohesion: 0.12
Nodes (13): AiMetricsModule, Global, Module, AppMetricsModule, Global, Module, ObservabilityModule, Global (+5 more)

### Community 71 - "ChatMessageDto"
Cohesion: 0.12
Nodes (22): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+14 more)

### Community 72 - "configuration-validation.service.ts"
Cohesion: 0.17
Nodes (7): CACHE_BACKEND_TYPE, assertMasterKeyPresent(), configurationValidation, ConfigurationValidationService, CACHE_BACKEND_VALUES, validate(), ValidatedEnvironment

### Community 73 - "prisma-invitation.adapter.ts"
Cohesion: 0.17
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 74 - "OpenAiChatMessageDto"
Cohesion: 0.16
Nodes (12): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+4 more)

### Community 75 - "prisma-company-context.adapter.ts"
Cohesion: 0.16
Nodes (15): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, Completeness (+7 more)

### Community 76 - "DomainException"
Cohesion: 0.04
Nodes (63): FinalizeReviewUseCase, Inject, Injectable, GetRunLogsOutput, GetRunLogsUseCase, Inject, Injectable, GetRunUseCase (+55 more)

### Community 77 - "UserRepository"
Cohesion: 0.04
Nodes (44): ListUsersUseCase, Inject, Injectable, MeUseCase, Inject, Injectable, ReactivateUserUseCase, Inject (+36 more)

### Community 78 - "company-context.mapper.ts"
Cohesion: 0.16
Nodes (10): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+2 more)

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.11
Nodes (22): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), GatewayChatResponse (+14 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - "RedisConnectionService"
Cohesion: 0.30
Nodes (3): RedisConnectionService, Injectable, isRedisRequiredFromConfig()

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+2 more)

### Community 87 - "KeyGenerateCommand"
Cohesion: 0.33
Nodes (3): KeyGenerateCommand, Command, Option

### Community 88 - "http-metrics.interceptor.ts"
Cohesion: 0.11
Nodes (18): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, MetricsController, Controller, Get (+10 more)

### Community 89 - "auth.api.ts"
Cohesion: 0.16
Nodes (24): bootstrapAdmin(), Credentials, fetchBootstrapStatus(), fetchUserSession(), loginWithPassword(), parseAuthUserWrapper(), parseSessionUser(), SessionUser (+16 more)

### Community 93 - "start-run.use-case.ts"
Cohesion: 0.10
Nodes (21): isContentStartCommand(), isPlainRecord(), omitUndefinedDeep(), StartRunBriefInput, StartRunCommand, StartRunUseCase, Injectable, makeContentRun() (+13 more)

### Community 94 - "openai-params-provider.mapper.ts"
Cohesion: 0.12
Nodes (24): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+16 more)

### Community 96 - "should-include-redis-stack.ts"
Cohesion: 0.35
Nodes (10): getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis() (+2 more)

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 98 - "public.decorator.ts"
Cohesion: 0.38
Nodes (3): IS_PUBLIC_KEY, JwtAuthGuard, Injectable

### Community 99 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 101 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 103 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 104 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 105 - "ClientRemoveCommand"
Cohesion: 0.33
Nodes (3): ClientRemoveCommand, Command, Option

### Community 106 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 107 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 108 - "AppMetricsService"
Cohesion: 0.10
Nodes (6): HttpMetricsMiddleware, Injectable, ActiveStreamsTracker, Injectable, AppMetricsService, Injectable

### Community 109 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 110 - "bootstrap-admin.use-case.ts"
Cohesion: 0.07
Nodes (29): comparePassword(), generateRefreshToken(), hashPassword(), hashRefreshToken(), parseTtlMs(), parseTtlSeconds(), BootstrapAdminInput, bootstrapAdminSchema (+21 more)

### Community 111 - "logging.service.ts"
Cohesion: 0.14
Nodes (11): ChatErrorHandlerService, Injectable, ChatProviderCooldownService, Injectable, resolveClientIdFromKey(), ResolvedGatewayClient, SmartRateLimitGuard, Injectable (+3 more)

### Community 112 - "ModelRemoveCommand"
Cohesion: 0.33
Nodes (3): ModelRemoveCommand, Command, Option

### Community 113 - "ProviderRemoveCommand"
Cohesion: 0.33
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 114 - "cn"
Cohesion: 0.11
Nodes (24): AppHeaderProps, CardAction(), CardDescription(), CardFooter(), DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuItem() (+16 more)

### Community 115 - "CompanyContextController"
Cohesion: 0.29
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 116 - "config-validator.ts"
Cohesion: 0.33
Nodes (7): CliValidateOptions, collectInactiveProviderWarnings(), formatZodIssues(), validateGatewayConfig(), ValidationOptions, ValidationResult, EXPECTED_SCHEMA_VERSION

### Community 117 - "ConfigInitCommand"
Cohesion: 0.31
Nodes (3): ConfigInitCommand, Command, Option

### Community 119 - "useSession"
Cohesion: 0.33
Nodes (4): UsersPage(), HomeEntry(), useSession(), Skeleton()

### Community 120 - "logout-dialog.tsx"
Cohesion: 0.18
Nodes (13): logoutSession(), LogoutDialog(), confirm(), LogoutDialogProps, Button(), buttonVariants, Dialog(), DialogContent() (+5 more)

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 127 - "app/layout.tsx"
Cohesion: 0.40
Nodes (3): geistMono, geistSans, metadata

### Community 128 - "login-card.tsx"
Cohesion: 0.15
Nodes (16): AcceptInvitePageProps, acceptInvite(), AcceptInviteForm(), onSubmit(), AcceptInviteFormProps, passwordMeetsPolicy(), ApiError, Card() (+8 more)

### Community 129 - "InMemoryRunSseHub"
Cohesion: 0.29
Nodes (4): RunSseEvent, InMemoryRunSseHub, Inject, Injectable

### Community 145 - "dashboard-shell.tsx"
Cohesion: 0.11
Nodes (15): AppHeader(), AppSidebar(), AppSidebarProps, CompletenessChipSlot(), FeedbackCtaSlot(), FloatingBoxSlot(), DashboardShell(), EventSourceRegistryContext (+7 more)

## Knowledge Gaps
- **303 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+298 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 996 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `LoggingService` connect `LoggingService` to `provider-instances.bootstrap.ts`, `LogContext`, `provider-error.mapper.ts`, `chat.service.ts`, `api-error.code.ts`, `anthropic-messages.controller.ts`, `anthropic/anthropic-tools.mapper.ts`, `ai-provider-gateway/src/health/health.service.ts`, `response-cache.service.ts`, `redis-vector-store.adapter.ts`, `swagger.setup.ts`, `semantic-cache.service.ts`, `types/index.ts`, `app-metrics.service.ts`, `responses.adapter.ts`, `ai-provider-gateway/src/app.module.ts`, `HealthService`, `chat-provider-call.service.ts`, `RedisConnectionService`, `logging.service.ts`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Why does `GatewayConfig` connect `GatewayConfig` to `cli.module.ts`, `exitWithAgentReport`, `configuration-validation.service.ts`, `gateway-config.schema.ts`, `chat.service.ts`, `models.controller.ts`, `model-manager.service.ts`, `configuration.ts`, `config-validator.ts`, `asProviderInstanceId`, `chat-provider-call.service.ts`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Why does `asProviderInstanceId()` connect `asProviderInstanceId` to `cli.module.ts`, `exitWithAgentReport`, `provider-instances.bootstrap.ts`, `types/index.ts`, `provider-error.mapper.ts`, `gateway-config.schema.ts`, `branded.types.ts`, `chat.service.ts`, `responses.adapter.ts`, `GatewayConfig`, `models.controller.ts`, `model-manager.service.ts`, `configuration.ts`, `anthropic/anthropic-tools.mapper.ts`, `chat-provider-call.service.ts`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _303 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `cli.module.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.062059775366457265 - nodes in this community are weakly interconnected._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05789473684210526 - nodes in this community are weakly interconnected._