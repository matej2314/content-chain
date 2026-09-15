# Graph Report - content-chain  (2026-09-14)

## Corpus Check
- 537 files · ~152,721 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: (none) 8, .css 1)

## Summary
- 3485 nodes · 10872 edges · 134 communities (117 shown, 15 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 362 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d56b18b3`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- cli.module.ts
- social.types.ts
- llm-hop.ts
- auth.module.ts
- RunRepository
- chat.service.ts
- asProviderInstanceId
- logging.service.ts
- runs.controller.ts
- exitWithAgentReport
- social-pipeline.facade.ts
- GatewayConfig
- social.graph.ts
- branded.types.ts
- anthropic-messages.controller.ts
- ProviderRegistryService
- anthropic-response.mapper.ts
- DomainException
- chat-completions.adapter.ts
- LoggingService
- sentry-ai-metrics.adapter.ts
- prisma-run.adapter.ts
- AppMetricsBackend
- anthropic/anthropic-tools.mapper.ts
- ProviderInstanceId
- response-cache.service.ts
- GatewayKey
- metrics.ts
- openai-thinking-provider.mapper.ts
- redis-vector-store.adapter.ts
- models.controller.ts
- api-error.code.ts
- swagger.setup.ts
- configuration.ts
- AnthropicMessagesRequestDto
- semantic-cache.service.ts
- openai-messages.mapper.ts
- enums.ts
- types/index.ts
- AuthController
- api/src/app.module.ts
- config-generator.service.ts
- openai-models.controller.ts
- ids.ts
- app-metrics.module.ts
- prisma-invitation.adapter.ts
- UsersController
- PrometheusAppMetricsAdapter
- RunsController
- ai-provider-gateway/src/app.module.ts
- configuration-validation.service.ts
- google-tools.mapper.ts
- anthropic.module.ts
- anthropic-models.controller.ts
- app-metrics.service.ts
- CompanyContextRepository
- llm-gateway.http.adapter.ts
- AppMetricsService
- HealthService
- HealthController
- prisma-company-context.adapter.ts
- company-context.dto.ts
- semantic-cache.constants.ts
- getAppConfig
- CompanyContext
- NoopAppMetricsAdapter
- ConfigInitCommand
- invitations.controller.ts
- OpenAiChatCompletionRequestDto
- env.schema.ts
- RedisConnectionService
- ChatToolingDto
- provider-instances.bootstrap.ts
- auth.controller.ts
- ChatMessageDto
- TransactionalMailer
- HttpExceptionFilter
- AuthUserContext
- company-context.mapper.ts
- run.types.ts
- PrometheusService
- PrismaService
- openai-stream.mapper.ts
- SPEC — README
- filters/http-exception.filter.ts
- RefreshSessionRepository
- responses.adapter.ts
- openai-params-provider.mapper.ts
- StartRunDto
- ai-provider-gateway/src/health/health.service.ts
- gateway-config.schema.ts
- EnvironmentVariables
- run-lifecycle.service.ts
- chat-params.dto.ts
- ChatParamsDto
- config-validator.ts
- .create
- should-include-redis-stack.ts
- CompanyContextController
- ProviderAddCommand
- ai-provider-gateway/src/health/health.controller.ts
- OpenAiChatMessageDto
- openai-messages-provider.mapper.ts
- ClientAddCommand
- ClientEditCommand
- ClientRemoveCommand
- ModelAddCommand
- ModelEditCommand
- ModelRemoveCommand
- ProviderEditCommand
- ProviderRemoveCommand
- auth.schemas.ts
- BootstrapStatusUseCase
- gateway-key.guard.branded-types.test-d.ts
- buildEffectiveGatewayConfig
- openai-chat-message.dto.ts
- layout.tsx
- button.tsx
- public.decorator.ts
- openai-chat-completion-request.dto.ts
- Architektura
- brand.ts
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
6. `DomainException` - 62 edges
7. `GatewayKey` - 59 edges
8. `ClientId` - 54 edges
9. `ChatRequestDto` - 48 edges
10. `AppMetricsService` - 46 edges

## Surprising Connections (you probably didn't know these)
- `toChatResponseDto()` --indirect_call--> `toGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/chat/dto/chat-response.dto.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `mapChatResponseToOpenAi()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/openai/mappers/openai-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `RedisConnectionService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-connection.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `CacheRegistryService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/cache-registry.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (134 total, 15 thin omitted)

### Community 0 - "cli.module.ts"
Cohesion: 0.06
Nodes (57): AgentReport, AgentReportStatus, loadAnswers(), assertAgentHasAnswers(), CliMode, CliModeFlags, markAgentRuntime(), CliModule (+49 more)

### Community 1 - "social.types.ts"
Cohesion: 0.05
Nodes (34): ContentPipelineInput, ContentRefineSnapshot, PageDocument, PageOutline, PageOutlineSection, PageOutlineSectionRole, CompositeRunResultReader, GetRunOutput (+26 more)

### Community 2 - "llm-hop.ts"
Cohesion: 0.09
Nodes (41): coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, pageDocumentOutputSchema, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema, pageOutlineSectionSchema (+33 more)

### Community 3 - "auth.module.ts"
Cohesion: 0.07
Nodes (27): ListUsersUseCase, Inject, Injectable, MeUseCase, Inject, Injectable, ReactivateUserUseCase, Inject (+19 more)

### Community 4 - "RunRepository"
Cohesion: 0.05
Nodes (25): Inject, Inject, InProcessRunWorker, Inject, Injectable, RecoverInterruptedRunsUseCase, Inject, Injectable (+17 more)

### Community 5 - "chat.service.ts"
Cohesion: 0.07
Nodes (38): SemanticStoreEmbedState, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsObject (+30 more)

### Community 6 - "asProviderInstanceId"
Cohesion: 0.08
Nodes (39): WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, InitAnswers, CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema, convertModel() (+31 more)

### Community 7 - "logging.service.ts"
Cohesion: 0.07
Nodes (19): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, SentryErrorReportingAdapter, Injectable (+11 more)

### Community 8 - "runs.controller.ts"
Cohesion: 0.05
Nodes (32): GetRunLogsUseCase, Inject, Injectable, GetRunUseCase, Inject, Injectable, ListRunsUseCase, Inject (+24 more)

### Community 9 - "exitWithAgentReport"
Cohesion: 0.22
Nodes (8): emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), resolveCliMode(), toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList()

### Community 10 - "social-pipeline.facade.ts"
Cohesion: 0.16
Nodes (14): isSocialRunRecord(), SocialPipelineFacade, toOutcome(), Inject, Injectable, SocialRunExecutor, Inject, Injectable (+6 more)

### Community 11 - "GatewayConfig"
Cohesion: 0.06
Nodes (36): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable, EnvPatchService (+28 more)

### Community 12 - "social.graph.ts"
Cohesion: 0.09
Nodes (50): loadPromptFromDir(), renderPrompt(), coercePassNoteVerdict(), isPassOnlyIssue(), coerceVerifierIssue(), ContentOutput, contentOutputSchema, IdeasOutput (+42 more)

### Community 13 - "branded.types.ts"
Cohesion: 0.08
Nodes (54): CachedChatResponse, CachedChatWarning, CachedFinishReason, CacheIdentityMessage, ChatCacheSource, ChatResponseData, SseMetaPayload, SseMetaPayloadDto (+46 more)

### Community 14 - "anthropic-messages.controller.ts"
Cohesion: 0.04
Nodes (62): ApiHeader, GATEWAY_CACHE_HEADER, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags (+54 more)

### Community 15 - "ProviderRegistryService"
Cohesion: 0.16
Nodes (5): ChatValidationService, Injectable, UnsupportedProviderException, ProviderRegistryService, Injectable

### Community 16 - "anthropic-response.mapper.ts"
Cohesion: 0.10
Nodes (31): ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString, SseDoneEvent, fromGatewayToolCallDto() (+23 more)

### Community 17 - "DomainException"
Cohesion: 0.13
Nodes (16): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Injectable, hashPassword(), validatePasswordPolicy(), isRecord(), orderItemsBySelectedIds() (+8 more)

### Community 18 - "chat-completions.adapter.ts"
Cohesion: 0.21
Nodes (18): asSystemFingerprint(), ChatCompletionsAdapterOptions, createChatCompletionsAdapter(), textStream(), mapTurnsToOpenAiMessages(), accumulateOpenAiStreamToolCallDeltas(), extractOpenAiStreamDeltaText(), finalizeOpenAiStreamToolCalls() (+10 more)

### Community 19 - "LoggingService"
Cohesion: 0.12
Nodes (9): Inject, Inject, PinoLoggerAdapter, Injectable, LogContext, LoggingService, Injectable, Inject (+1 more)

### Community 20 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.11
Nodes (27): CostUsd, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes() (+19 more)

### Community 21 - "prisma-run.adapter.ts"
Cohesion: 0.08
Nodes (21): contentBriefSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, socialBriefSchema, socialStartRunSchema, LightRunItem (+13 more)

### Community 23 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.09
Nodes (43): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, asInputTokens(), asOutputTokens(), asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS (+35 more)

### Community 24 - "ProviderInstanceId"
Cohesion: 0.07
Nodes (54): PendingSecretsItem, assertInteractiveAllowed(), collectPendingSecrets(), ProviderTestCommand, ProviderTestOptions, Command, Option, DEFAULT_MODELS (+46 more)

### Community 25 - "response-cache.service.ts"
Cohesion: 0.09
Nodes (18): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+10 more)

### Community 26 - "GatewayKey"
Cohesion: 0.08
Nodes (26): ChatService, Injectable, ChatErrorHandlerService, Injectable, SseEvent, ChatExecutionContext, ProviderCallContext, RateLimitCheckResult (+18 more)

### Community 27 - "metrics.ts"
Cohesion: 0.10
Nodes (28): getClientConversationId(), getOrCreateConversationIdForResponse(), buildAppProviderMetricsContext(), buildLlmMetricsContext(), mapProviderResponseToAiObservation(), mapProviderResponseToUsage(), toMetricsMessages(), buildProviderInputForAlias() (+20 more)

### Community 28 - "openai-thinking-provider.mapper.ts"
Cohesion: 0.23
Nodes (13): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), ChatCompletionThinkingParam, isOpenAiEffortLevel(), isOpenAiReasoningRequested(), mapThinkingBudgetToEffort(), mapThinkingToResponsesReasoning() (+5 more)

### Community 29 - "redis-vector-store.adapter.ts"
Cohesion: 0.12
Nodes (21): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), asString(), ParsedKnnHits, parseKnnHits() (+13 more)

### Community 30 - "models.controller.ts"
Cohesion: 0.10
Nodes (22): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+14 more)

### Community 31 - "api-error.code.ts"
Cohesion: 0.17
Nodes (21): ApiErrorCode, ApiErrorPayload, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isRateLimitStatus(), isServerError() (+13 more)

### Community 32 - "swagger.setup.ts"
Cohesion: 0.09
Nodes (23): AppModule, Module, ChatOutputTextDto, ApiProperty, ChatUsageDto, ApiPropertyOptional, SseDeltaPayloadDto, ApiProperty (+15 more)

### Community 33 - "configuration.ts"
Cohesion: 0.16
Nodes (15): asSemanticCacheTtlSeconds(), AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig, SemanticCacheRuntimeConfig, BuildEffectiveGatewayConfigOptions, readRequiredPrompt() (+7 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "semantic-cache.service.ts"
Cohesion: 0.09
Nodes (23): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, OllamaEmbeddingAdapter, Injectable, EmbeddingBackend (+15 more)

### Community 36 - "openai-messages.mapper.ts"
Cohesion: 0.42
Nodes (6): mapOpenAiMessagesToGateway(), mapOpenAiToolCalls(), mapOpenAiChatRequestToGateway(), mapOpenAiToolChoice(), mapOpenAiToolsToGateway(), OpenAiFunctionTool

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "types/index.ts"
Cohesion: 0.08
Nodes (45): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+37 more)

### Community 39 - "AuthController"
Cohesion: 0.09
Nodes (26): AuthController, ApiCookieAuth, ApiTags, Body, Controller, Get, HttpCode, Post (+18 more)

### Community 40 - "api/src/app.module.ts"
Cohesion: 0.08
Nodes (32): CompanyContextModule, Module, ContentPipelineFacade, toOutcome(), Inject, Injectable, ContentRunExecutor, isCanonicalOutlineSelection() (+24 more)

### Community 41 - "config-generator.service.ts"
Cohesion: 0.15
Nodes (11): ConfigGeneratorService, Injectable, FileManagerService, Injectable, WizardRunResult, EnvTemplateInput, generateEnvTemplate(), isEnvInputRedisRequired() (+3 more)

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.12
Nodes (21): ApiOpenAiErrorResponses(), OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+13 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (28): brand, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createInvitationId(), createRequestId() (+20 more)

### Community 44 - "app-metrics.module.ts"
Cohesion: 0.11
Nodes (12): resolveAppMetricsBackend(), APP_METRICS_BACKEND, MetricsController, ApiOperation, ApiResponse, ApiTags, Controller, Get (+4 more)

### Community 45 - "prisma-invitation.adapter.ts"
Cohesion: 0.13
Nodes (19): Inject, InvitationListItem, AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, INVITATION_REPOSITORY, InvitationListRecord (+11 more)

### Community 46 - "UsersController"
Cohesion: 0.12
Nodes (14): PatchUserDto, ApiProperty, IsBoolean, ApiCookieAuth, ApiTags, Body, Controller, Delete (+6 more)

### Community 47 - "PrometheusAppMetricsAdapter"
Cohesion: 0.11
Nodes (4): PrometheusAppMetricsAdapter, Injectable, AppProviderCallContext, AppTokenUsage

### Community 48 - "RunsController"
Cohesion: 0.16
Nodes (14): isTerminalStatus(), RunsController, ApiCookieAuth, ApiTags, Body, Controller, Get, HttpCode (+6 more)

### Community 49 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.08
Nodes (23): HealthModule, Module, LoggingModule, Global, Module, AiMetricsModule, Global, Module (+15 more)

### Community 50 - "configuration-validation.service.ts"
Cohesion: 0.17
Nodes (6): CACHE_BACKEND_TYPE, configurationValidation, ConfigurationValidationService, CACHE_BACKEND_VALUES, validate(), ValidatedEnvironment

### Community 51 - "google-tools.mapper.ts"
Cohesion: 0.16
Nodes (23): toHttpException(), buildGenerationConfig(), createGoogleProvider(), getFinalToolCalls(), getStopReason(), textStream(), mapStopSequences(), mapThinkingBudgetToGeminiLevel() (+15 more)

### Community 52 - "anthropic.module.ts"
Cohesion: 0.21
Nodes (10): ChatModule, Module, AnthropicModule, Module, IntegrationsModule, Module, OpenAiModule, Module (+2 more)

### Community 53 - "anthropic-models.controller.ts"
Cohesion: 0.13
Nodes (20): ApiAnthropicErrorResponses(), AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+12 more)

### Community 54 - "app-metrics.service.ts"
Cohesion: 0.20
Nodes (13): healthStatusToGaugeValue(), AppProviderStreamScope, AppRequestLabels, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus (+5 more)

### Community 55 - "CompanyContextRepository"
Cohesion: 0.15
Nodes (17): toPublicCompanyContext(), GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PatchCompanyContextUseCase (+9 more)

### Community 56 - "llm-gateway.http.adapter.ts"
Cohesion: 0.06
Nodes (40): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), LlmGatewayError (+32 more)

### Community 57 - "AppMetricsService"
Cohesion: 0.12
Nodes (6): HttpMetricsMiddleware, Injectable, Inject, Optional, AppMetricsService, Injectable

### Community 58 - "HealthService"
Cohesion: 0.20
Nodes (4): HealthReadinessResponseDto, ApiProperty, HealthService, Injectable

### Community 59 - "HealthController"
Cohesion: 0.16
Nodes (11): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, HealthModule, Module (+3 more)

### Community 60 - "prisma-company-context.adapter.ts"
Cohesion: 0.16
Nodes (15): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, Completeness (+7 more)

### Community 61 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 62 - "semantic-cache.constants.ts"
Cohesion: 0.14
Nodes (11): EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema(), EMBEDDING_CIRCUIT_COOLDOWN_MS, EMBEDDING_CIRCUIT_OPEN_AFTER, EMBEDDING_PROBE_TIMEOUT_MS (+3 more)

### Community 63 - "getAppConfig"
Cohesion: 0.17
Nodes (12): readGatewayKeyHeader(), getAppConfig(), GatewayKeyGuard, Injectable, enrichRequestWithClientId(), AnthropicApiKeyGuard, readAnthropicApiKey(), Injectable (+4 more)

### Community 64 - "CompanyContext"
Cohesion: 0.35
Nodes (3): CompanyContext, PrismaCompanyContextAdapter, Injectable

### Community 66 - "ConfigInitCommand"
Cohesion: 0.14
Nodes (8): ConfigInitCommand, Command, Option, ConfigValidateCommand, Command, Option, CliGatewayValidatorService, Injectable

### Community 67 - "invitations.controller.ts"
Cohesion: 0.06
Nodes (27): InviteUserUseCase, Inject, Injectable, ListInvitationsUseCase, Inject, Injectable, ResendInvitationUseCase, Inject (+19 more)

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (18): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+10 more)

### Community 69 - "env.schema.ts"
Cohesion: 0.17
Nodes (11): AppModule, Module, bootstrap(), EnvModule, Global, Module, envSchema, parseCorsOrigins() (+3 more)

### Community 70 - "RedisConnectionService"
Cohesion: 0.28
Nodes (3): RedisConnectionService, Injectable, isRedisRequiredFromConfig()

### Community 71 - "ChatToolingDto"
Cohesion: 0.16
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 72 - "provider-instances.bootstrap.ts"
Cohesion: 0.20
Nodes (12): GatewayProviderInstanceConfig, assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryFn (+4 more)

### Community 73 - "auth.controller.ts"
Cohesion: 0.12
Nodes (28): comparePassword(), generateRefreshToken(), hashRefreshToken(), parseTtlMs(), parseTtlSeconds(), AuthTokenResult, BootstrapAdminUseCase, Injectable (+20 more)

### Community 74 - "ChatMessageDto"
Cohesion: 0.08
Nodes (29): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+21 more)

### Community 75 - "TransactionalMailer"
Cohesion: 0.20
Nodes (9): TransactionalMailer, UserInvitedMail, LoggingMailerAdapter, Injectable, NodemailerSmtpMailerAdapter, readSmtpConfig(), SmtpConfig, Inject (+1 more)

### Community 76 - "HttpExceptionFilter"
Cohesion: 0.20
Nodes (6): ErrorEnvelope, HttpExceptionFilter, Catch, newRequestId(), RequestIdMiddleware, Injectable

### Community 77 - "AuthUserContext"
Cohesion: 0.15
Nodes (14): FinalizeReviewUseCase, Injectable, FlagOutputEditedUseCase, Injectable, ListRunsOutput, ListRunsUserItem, ratingSchema, assertRunReviewable() (+6 more)

### Community 78 - "company-context.mapper.ts"
Cohesion: 0.11
Nodes (14): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+6 more)

### Community 79 - "run.types.ts"
Cohesion: 0.16
Nodes (17): GetRunLogsOutput, ParsedStartRunCommand, startRunCommandSchema, isContentStartCommand(), isPlainRecord(), omitUndefinedDeep(), StartRunBriefInput, StartRunCommand (+9 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - "PrismaService"
Cohesion: 0.07
Nodes (24): CreateFeedbackUseCase, Inject, Injectable, agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_RUN_READER, FeedbackRunLookup (+16 more)

### Community 82 - "openai-stream.mapper.ts"
Cohesion: 0.17
Nodes (20): OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty, ApiPropertyOptional (+12 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "filters/http-exception.filter.ts"
Cohesion: 0.21
Nodes (7): DEFAULT_HTTP_STATUS_TO_CODE, GlobalExceptionFilter, isPayloadTooLargeError(), PayloadTooLargeError, RequestWithId, Catch, Injectable

### Community 85 - "RefreshSessionRepository"
Cohesion: 0.10
Nodes (9): Inject, Inject, Inject, Inject, RefreshSessionRecord, RefreshSessionRepository, RotateRefreshSessionResult, PrismaRefreshSessionAdapter (+1 more)

### Community 86 - "responses.adapter.ts"
Cohesion: 0.26
Nodes (15): asToolCallId(), buildResponsesCreateParams(), createResponsesAdapter(), textStream(), mapGatewayMetadataToOpenAi(), extractResponsesToolCalls(), mapResponsesStopReason(), parseOpenAiResponse() (+7 more)

### Community 87 - "openai-params-provider.mapper.ts"
Cohesion: 0.24
Nodes (11): mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses(), mapStopSequences(), OpenAiSharedChatCompletionParams, OpenAiSharedResponsesParams (+3 more)

### Community 88 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 89 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.26
Nodes (10): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty, ApiPropertyOptional (+2 more)

### Community 90 - "gateway-config.schema.ts"
Cohesion: 0.08
Nodes (38): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, KeyGenerateCommand, Command, Option, convertClient() (+30 more)

### Community 91 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 92 - "run-lifecycle.service.ts"
Cohesion: 0.17
Nodes (8): TransitionExtras, RUN_SSE_HUB, RunSseEvent, RunSseHub, InMemoryRunSseHub, Injectable, RunLifecycleModule, Module

### Community 93 - "chat-params.dto.ts"
Cohesion: 0.24
Nodes (7): ResponseFormatDto, ApiProperty, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsThinkingBudget()

### Community 94 - "ChatParamsDto"
Cohesion: 0.20
Nodes (10): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+2 more)

### Community 95 - "config-validator.ts"
Cohesion: 0.30
Nodes (9): CliValidateOptions, collectInactiveProviderWarnings(), formatZodIssues(), validateGatewayConfig(), ValidationOptions, ValidationResult, assertMasterKeyPresent(), validateEnvironment() (+1 more)

### Community 96 - ".create"
Cohesion: 0.13
Nodes (13): FeedbackController, ApiCookieAuth, ApiTags, Body, Controller, HttpCode, Post, CreateFeedbackDto (+5 more)

### Community 97 - "should-include-redis-stack.ts"
Cohesion: 0.35
Nodes (10): getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis() (+2 more)

### Community 98 - "CompanyContextController"
Cohesion: 0.25
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 99 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 100 - "ai-provider-gateway/src/health/health.controller.ts"
Cohesion: 0.20
Nodes (8): HealthLivenessResponseDto, ApiProperty, HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get

### Community 101 - "OpenAiChatMessageDto"
Cohesion: 0.22
Nodes (9): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+1 more)

### Community 102 - "openai-messages-provider.mapper.ts"
Cohesion: 0.28
Nodes (6): ProviderAssistantTurn, ProviderToolResultTurn, ChatCompletionMessageParam, mapAssistantTurn(), mapAssistantTurnToResponsesInput(), mapTurnsToResponsesInput()

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

### Community 108 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 109 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 110 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 111 - "auth.schemas.ts"
Cohesion: 0.29
Nodes (6): BootstrapAdminInput, bootstrapAdminSchema, LoginInput, loginSchema, PatchUserCommand, patchUserSchema

### Community 112 - "BootstrapStatusUseCase"
Cohesion: 0.40
Nodes (3): BootstrapStatusUseCase, Inject, Injectable

### Community 114 - "buildEffectiveGatewayConfig"
Cohesion: 1.00
Nodes (3): buildEffectiveGatewayConfig(), loadGatewayConfigFromFile(), assertEnabledProviderSecretsPresent()

### Community 117 - "openai-chat-message.dto.ts"
Cohesion: 0.60
Nodes (3): isTextContentItem(), normalizeOpenAiContent(), TextContentItem

### Community 119 - "layout.tsx"
Cohesion: 0.40
Nodes (3): geistMono, geistSans, metadata

### Community 120 - "button.tsx"
Cohesion: 0.70
Nodes (3): Button(), buttonVariants, cn()

### Community 122 - "public.decorator.ts"
Cohesion: 0.38
Nodes (3): IS_PUBLIC_KEY, JwtAuthGuard, Injectable

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

## Knowledge Gaps
- **270 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+265 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 935 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `DomainException` connect `DomainException` to `llm-hop.ts`, `invitations.controller.ts`, `auth.module.ts`, `api/src/app.module.ts`, `auth.controller.ts`, `runs.controller.ts`, `social-pipeline.facade.ts`, `HttpExceptionFilter`, `prisma-invitation.adapter.ts`, `AuthUserContext`, `UsersController`, `run.types.ts`, `PrismaService`, `prisma-run.adapter.ts`, `llm-gateway.http.adapter.ts`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Why does `LoggingService` connect `LoggingService` to `chat.service.ts`, `logging.service.ts`, `branded.types.ts`, `ProviderRegistryService`, `chat-completions.adapter.ts`, `anthropic/anthropic-tools.mapper.ts`, `response-cache.service.ts`, `GatewayKey`, `redis-vector-store.adapter.ts`, `swagger.setup.ts`, `semantic-cache.service.ts`, `types/index.ts`, `google-tools.mapper.ts`, `AppMetricsService`, `HealthService`, `RedisConnectionService`, `provider-instances.bootstrap.ts`, `filters/http-exception.filter.ts`, `responses.adapter.ts`, `ai-provider-gateway/src/health/health.service.ts`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `ProviderInstanceId` to `asProviderInstanceId`, `logging.service.ts`, `exitWithAgentReport`, `GatewayConfig`, `branded.types.ts`, `LoggingService`, `sentry-ai-metrics.adapter.ts`, `AppMetricsBackend`, `GatewayKey`, `metrics.ts`, `models.controller.ts`, `configuration.ts`, `types/index.ts`, `config-generator.service.ts`, `PrometheusAppMetricsAdapter`, `app-metrics.service.ts`, `AppMetricsService`, `NoopAppMetricsAdapter`, `gateway-config.schema.ts`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _270 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `cli.module.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0627147766323024 - nodes in this community are weakly interconnected._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04814599106969521 - nodes in this community are weakly interconnected._