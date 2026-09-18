# Graph Report - content-chain  (2026-09-18)

## Corpus Check
- 599 files · ~170,021 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 2, .css 1)

## Summary
- 3869 nodes · 11937 edges · 135 communities (120 shown, 14 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 373 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7952f2bf`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ConfigShowCommand
- social.types.ts
- api/company-context.types.ts
- cli.module.ts
- runs.types.ts
- run-details-view.tsx
- app-metrics-backend.interface.ts
- logging.service.ts
- anthropic/anthropic-tools.mapper.ts
- provider-error.mapper.ts
- llm-hop.ts
- asClientId
- social.graph.ts
- branded.types.ts
- semantic-cache.service.ts
- models.controller.ts
- anthropic-messages.controller.ts
- redis-vector-store.adapter.ts
- model-manager.service.ts
- configuration.ts
- sentry-ai-metrics.adapter.ts
- asProviderInstanceId
- chat-stream.controller.ts
- responses.adapter.ts
- login-card.tsx
- api/src/app.module.ts
- sse-event.type.ts
- CurrentUser
- save-output-edited.use-case.ts
- chat.service.ts
- prisma.service.ts
- HealthService
- swagger.setup.ts
- prisma-run.adapter.ts
- AnthropicMessagesRequestDto
- LoggingService
- HttpMethod
- enums.ts
- types/index.ts
- ChatRequestDto
- RunRepository
- start-run.use-case.ts
- openai-models.controller.ts
- ids.ts
- app-metrics.service.ts
- google-tools.mapper.ts
- ai-provider-gateway/src/health/health.service.ts
- anthropic-models.controller.ts
- .info
- chat-params.dto.ts
- StartRunDto
- getAppConfig
- .error
- agent-answers.schema.ts
- ChatToolingDto
- company-context.controller.ts
- GatewayKey
- ModelAlias
- ai-provider-gateway/src/app.module.ts
- HealthController
- SemanticCacheService
- company-context.dto.ts
- api-error.code.ts
- response-cache.service.ts
- LlmGatewayHttpAdapter
- metrics.ts
- UserRepository
- CompanyContextRepository
- OpenAiChatCompletionRequestDto
- auth.module.ts
- AppMetricsBackend
- openai-chat-completions.controller.ts
- ClientAddCommand
- prisma-invitation.adapter.ts
- OpenAiChatMessageDto
- prisma-company-context.adapter.ts
- RunsController
- should-include-redis-stack.ts
- company-context.schemas.ts
- llm-gateway.http.adapter.ts
- PrometheusService
- chat-completions.adapter.ts
- AppMetricsModule
- SPEC — README
- ListRunsQueryDto
- DomainException
- public.decorator.ts
- GatewayConfig
- ConfigValidateCommand
- session-provider.tsx
- provider-instances.bootstrap.ts
- PrismaRefreshSessionAdapter
- start-run-form.tsx
- openai-params-provider.mapper.ts
- openai-thinking-provider.mapper.ts
- PrometheusAppMetricsAdapter
- EnvironmentVariables
- route.ts
- http-metrics.interceptor.ts
- ProviderAddCommand
- resolve-provider-call-options.ts
- PrismaService
- metrics.module.ts
- env.schema.ts
- ClientEditCommand
- ClientRemoveCommand
- ModelAddCommand
- ModelEditCommand
- getAppConfigOrThrow
- ProviderEditCommand
- invitations.controller.ts
- GatewayCommand
- ModelRemoveCommand
- ProviderRemoveCommand
- cn
- CompanyContextController
- ChatParamsDto
- filters/http-exception.filter.ts
- openai-chat-message.dto.ts
- Architektura
- brand.ts
- openai-chat-completion-request.dto.ts
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
- event-source-registry-provider.tsx

## God Nodes (most connected - your core abstractions)
1. `ModelAlias` - 88 edges
2. `ProviderInstanceId` - 81 edges
3. `LoggingService` - 73 edges
4. `asProviderInstanceId()` - 67 edges
5. `DomainException` - 66 edges
6. `GatewayConfig` - 65 edges
7. `cn()` - 60 edges
8. `GatewayKey` - 59 edges
9. `ClientId` - 54 edges
10. `ChatRequestDto` - 48 edges

## Surprising Connections (you probably didn't know these)
- `mapChatResponseToOpenAi()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/openai/mappers/openai-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `CardDescription()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/card.tsx → apps/frontend/src/shared/utils/utils.ts
- `CardAction()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/card.tsx → apps/frontend/src/shared/utils/utils.ts
- `CardFooter()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/card.tsx → apps/frontend/src/shared/utils/utils.ts
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (135 total, 14 thin omitted)

### Community 0 - "ConfigShowCommand"
Cohesion: 0.40
Nodes (3): ConfigShowCommand, Command, Option

### Community 1 - "social.types.ts"
Cohesion: 0.06
Nodes (30): CompositeRunResultReader, GetRunOutput, orderItemsBySelectedIds(), RUN_RESULT_READER, RunResultReader, ContentBrief, SocialBrief, EmptyRunResultReader (+22 more)

### Community 2 - "api/company-context.types.ts"
Cohesion: 0.06
Nodes (57): fetchCompanyContext(), fetchCompleteness(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras, companyContextForPut() (+49 more)

### Community 3 - "cli.module.ts"
Cohesion: 0.10
Nodes (39): AgentReport, AgentReportStatus, emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), loadAnswers(), assertAgentHasAnswers(), CliMode (+31 more)

### Community 4 - "runs.types.ts"
Cohesion: 0.08
Nodes (51): ArchiveRunsQuery, fetchInitiatorOptions(), fetchRunLogs(), fetchUserRuns(), ArchiveRunItem, ArchiveRunsPage, ContentBrief, isLiveRunStatus() (+43 more)

### Community 5 - "run-details-view.tsx"
Cohesion: 0.10
Nodes (26): UsersPage(), HomeEntry(), useSession(), CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS (+18 more)

### Community 6 - "app-metrics-backend.interface.ts"
Cohesion: 0.16
Nodes (11): healthStatusToGaugeValue(), AppProviderStreamScope, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus, HttpRequestLabels (+3 more)

### Community 7 - "logging.service.ts"
Cohesion: 0.07
Nodes (22): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+14 more)

### Community 8 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.11
Nodes (35): ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent(), isAnthropicEffortLevel(), mapThinkingBudgetToAnthropicEffort(), mapThinkingToAnthropic(), resolveAnthropicOutputConfig(), ContentBlockParam (+27 more)

### Community 9 - "provider-error.mapper.ts"
Cohesion: 0.21
Nodes (19): MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isRateLimitStatus(), isServerError(), isTimeoutStatus(), nameLooksLikeTimeout() (+11 more)

### Community 10 - "llm-hop.ts"
Cohesion: 0.07
Nodes (46): pageOutlineOutputSchema, ContentResultStore, ContentPipelineInput, ContentPipelineState, ContentRefineSnapshot, PageDocument, PageOutline, PageOutlineSection (+38 more)

### Community 11 - "asClientId"
Cohesion: 0.07
Nodes (46): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, PendingSecretsItem, assertInteractiveAllowed(), WIZARD_INIT_STEPS, WIZARD_STEPS (+38 more)

### Community 12 - "social.graph.ts"
Cohesion: 0.13
Nodes (32): coercePassNoteVerdict(), isPassOnlyIssue(), ideasOutputSchema, reelIdeasOutputSchema, isReelTaskType(), ReelTaskType, canRefine(), MAX_REFINE (+24 more)

### Community 13 - "branded.types.ts"
Cohesion: 0.10
Nodes (39): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatResponseData, toChatResponseDto() (+31 more)

### Community 14 - "semantic-cache.service.ts"
Cohesion: 0.10
Nodes (19): EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema(), EMBEDDING_CIRCUIT_COOLDOWN_MS, EMBEDDING_CIRCUIT_OPEN_AFTER, EMBEDDING_PROBE_TIMEOUT_MS (+11 more)

### Community 15 - "models.controller.ts"
Cohesion: 0.10
Nodes (22): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+14 more)

### Community 16 - "anthropic-messages.controller.ts"
Cohesion: 0.07
Nodes (40): ApiHeader, SseDoneEvent, fromGatewayToolCallDto(), asMessageId(), asRequestId(), AnthropicMessagesController, ApiBody, ApiOperation (+32 more)

### Community 17 - "redis-vector-store.adapter.ts"
Cohesion: 0.15
Nodes (19): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), asString(), ParsedKnnHits, parseKnnHits() (+11 more)

### Community 18 - "model-manager.service.ts"
Cohesion: 0.09
Nodes (34): DEFAULT_MODELS, DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, defaultModelPolicy(), ModelEditField, ModelManagerService (+26 more)

### Community 19 - "configuration.ts"
Cohesion: 0.06
Nodes (49): isRedisRequired(), CliGatewayValidatorService, CliValidateOptions, Injectable, ValidationFormatter, asSemanticCacheTtlSeconds(), AppConfiguration, CacheRuntimeConfig (+41 more)

### Community 20 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.11
Nodes (27): CostUsd, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes() (+19 more)

### Community 21 - "asProviderInstanceId"
Cohesion: 0.09
Nodes (41): collectPendingSecrets(), InitAnswers, convertProvider(), EnvPatchValue, ClientPromptService, Injectable, ModelPromptService, Injectable (+33 more)

### Community 22 - "chat-stream.controller.ts"
Cohesion: 0.06
Nodes (32): ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags, Body, Controller (+24 more)

### Community 23 - "responses.adapter.ts"
Cohesion: 0.14
Nodes (30): mapProviderResponseToAiObservation(), toCachedChatResponse(), asInputTokens(), asOutputTokens(), asSystemFingerprint(), asToolCallId(), getUsageMetadata(), buildResponsesCreateParams() (+22 more)

### Community 24 - "login-card.tsx"
Cohesion: 0.15
Nodes (17): AcceptInvitePageProps, acceptInvite(), AcceptInviteForm(), onSubmit(), AcceptInviteFormProps, passwordMeetsPolicy(), Card(), CardAction() (+9 more)

### Community 25 - "api/src/app.module.ts"
Cohesion: 0.07
Nodes (48): CompanyContextModule, Module, ContentPipelineFacade, toOutcome(), Inject, Injectable, ContentRunExecutor, isCanonicalOutlineSelection() (+40 more)

### Community 26 - "sse-event.type.ts"
Cohesion: 0.10
Nodes (21): ChatCacheSource, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString, ChatWarningDto (+13 more)

### Community 27 - "CurrentUser"
Cohesion: 0.06
Nodes (36): BootstrapStatusUseCase, Inject, Injectable, AuthController, ApiCookieAuth, ApiTags, Body, Controller (+28 more)

### Community 28 - "save-output-edited.use-case.ts"
Cohesion: 0.06
Nodes (42): coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, pageDocumentOutputSchema, PageOutlineOutput, pageOutlineSectionRoleSchema, pageOutlineSectionSchema, readNonEmptyString() (+34 more)

### Community 29 - "chat.service.ts"
Cohesion: 0.06
Nodes (45): SemanticStoreEmbedState, CacheIdentityMessage, isCachedChatAllowedForModelAlias(), shouldStoreChatResponse(), createInProcessSingleflight(), getResolvedSystemPrompts(), SYSTEM_PROMPT_SECTION_JOINER, toChatCacheIdentity() (+37 more)

### Community 30 - "prisma.service.ts"
Cohesion: 0.21
Nodes (6): Inject, OutputEditedWrite, OutputEditedWriter, applyWrite(), PrismaOutputEditedAdapter, Injectable

### Community 31 - "HealthService"
Cohesion: 0.10
Nodes (12): HealthLivenessResponseDto, ApiProperty, HealthReadinessResponseDto, ApiProperty, HealthController, ApiOkResponse, ApiOperation, ApiTags (+4 more)

### Community 32 - "swagger.setup.ts"
Cohesion: 0.08
Nodes (30): AppModule, Module, ChatOutputTextDto, ApiProperty, ChatUsageDto, ApiPropertyOptional, SseDeltaPayloadDto, ApiProperty (+22 more)

### Community 33 - "prisma-run.adapter.ts"
Cohesion: 0.07
Nodes (23): contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, socialBriefSchema (+15 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "LoggingService"
Cohesion: 0.08
Nodes (12): RedisConnectionService, Injectable, Inject, Inject, VectorStore, isRedisRequiredFromConfig(), Inject, Optional (+4 more)

### Community 36 - "HttpMethod"
Cohesion: 0.24
Nodes (3): HttpMetricsMiddleware, Injectable, HttpMethod

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "types/index.ts"
Cohesion: 0.07
Nodes (46): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+38 more)

### Community 39 - "ChatRequestDto"
Cohesion: 0.09
Nodes (30): ChatService, Injectable, ApiBody, ApiOperation, ApiProduces, ApiResponse, Body, Post (+22 more)

### Community 40 - "RunRepository"
Cohesion: 0.06
Nodes (19): Inject, InProcessRunWorker, Inject, Injectable, RecoverInterruptedRunsUseCase, Inject, Injectable, Inject (+11 more)

### Community 41 - "start-run.use-case.ts"
Cohesion: 0.11
Nodes (19): isContentStartCommand(), isPlainRecord(), omitUndefinedDeep(), StartRunBriefInput, StartRunCommand, StartRunUseCase, Injectable, makeContentRun() (+11 more)

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.13
Nodes (20): ApiOpenAiErrorResponses(), OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+12 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (28): brand, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createInvitationId(), createRequestId() (+20 more)

### Community 44 - "app-metrics.service.ts"
Cohesion: 0.15
Nodes (11): APP_METRICS_BACKEND, MetricsController, ApiOperation, ApiResponse, ApiTags, Controller, Get, PreMetricsScrapeHook (+3 more)

### Community 45 - "google-tools.mapper.ts"
Cohesion: 0.16
Nodes (23): toHttpException(), buildGenerationConfig(), createGoogleProvider(), getFinalToolCalls(), getStopReason(), textStream(), mapStopSequences(), mapThinkingBudgetToGeminiLevel() (+15 more)

### Community 46 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.26
Nodes (10): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty, ApiPropertyOptional (+2 more)

### Community 47 - "anthropic-models.controller.ts"
Cohesion: 0.13
Nodes (20): ApiAnthropicErrorResponses(), AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+12 more)

### Community 48 - ".info"
Cohesion: 0.09
Nodes (13): ConfigInitCommand, Command, Option, toSafeConfigSnapshot(), WizardState, ConfigGeneratorService, Injectable, FileManagerService (+5 more)

### Community 49 - "chat-params.dto.ts"
Cohesion: 0.24
Nodes (7): ResponseFormatDto, ApiProperty, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsThinkingBudget()

### Community 50 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 51 - "getAppConfig"
Cohesion: 0.17
Nodes (12): readGatewayKeyHeader(), getAppConfig(), GatewayKeyGuard, Injectable, enrichRequestWithClientId(), AnthropicApiKeyGuard, readAnthropicApiKey(), Injectable (+4 more)

### Community 52 - ".error"
Cohesion: 0.19
Nodes (9): ProviderTestCommand, Command, Option, CliAiProvider, ProviderTestService, Injectable, ProviderCli, BaseUrl (+1 more)

### Community 53 - "agent-answers.schema.ts"
Cohesion: 0.11
Nodes (22): ClientAddAnswers, ClientAddAnswersSchema, ClientEditAnswers, ClientEditAnswersSchema, ClientRemoveAnswers, ClientRemoveAnswersSchema, InitAnswersSchema, ModelAddAnswers (+14 more)

### Community 54 - "ChatToolingDto"
Cohesion: 0.16
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 55 - "company-context.controller.ts"
Cohesion: 0.21
Nodes (14): toCompanyContext(), toPartialCompanyContext(), toPublicCompanyContext(), GetCompanyContextUseCase, Injectable, GetCompletenessUseCase, Injectable, PatchCompanyContextUseCase (+6 more)

### Community 56 - "GatewayKey"
Cohesion: 0.10
Nodes (18): ChatErrorHandlerService, Injectable, isProviderRateLimitError(), resolveClientIdFromKey(), GatewayKey, Express, Request, ResolvedGatewayClient (+10 more)

### Community 57 - "ModelAlias"
Cohesion: 0.09
Nodes (7): ProviderTestOptions, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, AppMetricsService, Injectable

### Community 58 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.09
Nodes (22): ChatModule, Module, HealthModule, Module, AnthropicModule, Module, IntegrationsModule, Module (+14 more)

### Community 59 - "HealthController"
Cohesion: 0.16
Nodes (11): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, HealthModule, Module (+3 more)

### Community 60 - "SemanticCacheService"
Cohesion: 0.18
Nodes (12): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, isSingleTurnUserRequest(), lastUserMessageText(), SemanticCacheService (+4 more)

### Community 61 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 62 - "api-error.code.ts"
Cohesion: 0.08
Nodes (29): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+21 more)

### Community 63 - "response-cache.service.ts"
Cohesion: 0.09
Nodes (18): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+10 more)

### Community 64 - "LlmGatewayHttpAdapter"
Cohesion: 0.21
Nodes (5): LlmGatewayHttpAdapter, Inject, Injectable, GATEWAY_ERROR_CODE_LABELS, toGatewayErrorCodeLabel()

### Community 65 - "metrics.ts"
Cohesion: 0.19
Nodes (17): getClientConversationId(), getOrCreateConversationIdForResponse(), buildAppProviderMetricsContext(), buildLlmMetricsContext(), mapProviderResponseToUsage(), toMetricsMessages(), buildProviderInputForAlias(), toProviderTurns() (+9 more)

### Community 66 - "UserRepository"
Cohesion: 0.04
Nodes (45): BootstrapAdminInput, bootstrapAdminSchema, LoginInput, loginSchema, PatchUserCommand, patchUserSchema, ListUsersUseCase, Inject (+37 more)

### Community 67 - "CompanyContextRepository"
Cohesion: 0.16
Nodes (8): Inject, Inject, Inject, Inject, CompanyContextRepository, CompanyContext, PrismaCompanyContextAdapter, Injectable

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (18): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+10 more)

### Community 69 - "auth.module.ts"
Cohesion: 0.06
Nodes (53): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Injectable, comparePassword(), generateRefreshToken(), hashPassword(), hashRefreshToken() (+45 more)

### Community 71 - "openai-chat-completions.controller.ts"
Cohesion: 0.14
Nodes (24): GATEWAY_CACHE_HEADER, ANTHROPIC_INTEGRATION_PATH, OPENAI_INTEGRATION_PATH, OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto (+16 more)

### Community 72 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 73 - "prisma-invitation.adapter.ts"
Cohesion: 0.13
Nodes (19): Inject, InvitationListItem, AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, INVITATION_REPOSITORY, InvitationListRecord (+11 more)

### Community 74 - "OpenAiChatMessageDto"
Cohesion: 0.22
Nodes (9): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+1 more)

### Community 75 - "prisma-company-context.adapter.ts"
Cohesion: 0.16
Nodes (15): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, Completeness (+7 more)

### Community 76 - "RunsController"
Cohesion: 0.11
Nodes (19): HitlDto, IsArray, IsString, PatchRunRatingDto, IsIn, ValidateIf, isTerminalStatus(), RunsController (+11 more)

### Community 77 - "should-include-redis-stack.ts"
Cohesion: 0.18
Nodes (11): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis() (+3 more)

### Community 78 - "company-context.schemas.ts"
Cohesion: 0.33
Nodes (5): companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.16
Nodes (17): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), GatewayChatResponse (+9 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - "chat-completions.adapter.ts"
Cohesion: 0.24
Nodes (13): ProviderAssistantTurn, ChatCompletionsAdapterOptions, createChatCompletionsAdapter(), textStream(), ChatCompletionMessageParam, mapAssistantTurn(), mapTurnsToOpenAiMessages(), accumulateOpenAiStreamToolCallDeltas() (+5 more)

### Community 82 - "AppMetricsModule"
Cohesion: 0.12
Nodes (13): AiMetricsModule, Global, Module, AppMetricsModule, Global, Module, ObservabilityModule, Global (+5 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+2 more)

### Community 85 - "DomainException"
Cohesion: 0.06
Nodes (47): FinalizeReviewUseCase, Inject, Injectable, GetRunLogsOutput, GetRunLogsUseCase, Inject, Injectable, GetRunUseCase (+39 more)

### Community 86 - "public.decorator.ts"
Cohesion: 0.38
Nodes (3): IS_PUBLIC_KEY, JwtAuthGuard, Injectable

### Community 87 - "GatewayConfig"
Cohesion: 0.08
Nodes (19): KeyGenerateCommand, Command, Option, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable, EnvPatchService, Injectable (+11 more)

### Community 88 - "ConfigValidateCommand"
Cohesion: 0.40
Nodes (3): ConfigValidateCommand, Command, Option

### Community 89 - "session-provider.tsx"
Cohesion: 0.12
Nodes (26): geistMono, geistSans, metadata, bootstrapAdmin(), Credentials, fetchBootstrapStatus(), fetchUserSession(), loginWithPassword() (+18 more)

### Community 90 - "provider-instances.bootstrap.ts"
Cohesion: 0.30
Nodes (9): assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryFn, OpenAiProviderConfig (+1 more)

### Community 91 - "PrismaRefreshSessionAdapter"
Cohesion: 0.31
Nodes (3): RefreshSessionRecord, PrismaRefreshSessionAdapter, Injectable

### Community 92 - "start-run-form.tsx"
Cohesion: 0.25
Nodes (11): fetchRunSnapshot(), startRun(), AccountView(), onPrefill(), draftFromSnapshot(), EMPTY_START_DRAFT, StartRunDraft, StartRunForm() (+3 more)

### Community 93 - "openai-params-provider.mapper.ts"
Cohesion: 0.22
Nodes (12): mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses(), mapStopSequences(), OpenAiSharedChatCompletionParams, OpenAiSharedResponsesParams (+4 more)

### Community 94 - "openai-thinking-provider.mapper.ts"
Cohesion: 0.25
Nodes (12): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), isOpenAiEffortLevel(), isOpenAiReasoningRequested(), mapThinkingBudgetToEffort(), mapThinkingToResponsesReasoning(), OPENAI_EFFORT_LEVELS (+4 more)

### Community 95 - "PrometheusAppMetricsAdapter"
Cohesion: 0.11
Nodes (6): PrometheusAppMetricsAdapter, Injectable, resolveAppMetricsBackend(), AppProviderCallContext, AppRequestLabels, AppTokenUsage

### Community 96 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 98 - "http-metrics.interceptor.ts"
Cohesion: 0.21
Nodes (10): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, gatewayErrorsTotal, httpRequestDurationSeconds, httpRequestsTotal (+2 more)

### Community 99 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 100 - "resolve-provider-call-options.ts"
Cohesion: 0.48
Nodes (5): clamp(), isOverrideKey(), resolveProviderCallOptions(), OVERRIDE_KEYS, OverrideKey

### Community 101 - "PrismaService"
Cohesion: 0.05
Nodes (39): CreateFeedbackUseCase, Inject, Injectable, agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_RUN_READER, FeedbackRunLookup (+31 more)

### Community 102 - "metrics.module.ts"
Cohesion: 0.19
Nodes (8): MetricsController, Controller, Get, Res, MetricsModule, Module, MetricsService, Injectable

### Community 103 - "env.schema.ts"
Cohesion: 0.17
Nodes (11): AppModule, Module, bootstrap(), EnvModule, Global, Module, envSchema, parseCorsOrigins() (+3 more)

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

### Community 108 - "getAppConfigOrThrow"
Cohesion: 0.26
Nodes (4): OllamaEmbeddingAdapter, Injectable, EmbeddingBackend, getAppConfigOrThrow()

### Community 109 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 110 - "invitations.controller.ts"
Cohesion: 0.06
Nodes (27): InviteUserUseCase, Inject, Injectable, ListInvitationsUseCase, Inject, Injectable, RevokeInvitationUseCase, Inject (+19 more)

### Community 112 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 113 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 114 - "cn"
Cohesion: 0.05
Nodes (53): logoutSession(), AppHeader(), AppHeaderProps, AppSidebar(), AppSidebarProps, CompletenessChipSlot(), FeedbackCtaSlot(), FloatingBoxSlot() (+45 more)

### Community 115 - "CompanyContextController"
Cohesion: 0.15
Nodes (9): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Body, Controller, Get, Patch (+1 more)

### Community 116 - "ChatParamsDto"
Cohesion: 0.20
Nodes (10): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+2 more)

### Community 118 - "filters/http-exception.filter.ts"
Cohesion: 0.21
Nodes (7): DEFAULT_HTTP_STATUS_TO_CODE, GlobalExceptionFilter, isPayloadTooLargeError(), PayloadTooLargeError, RequestWithId, Catch, Injectable

### Community 123 - "openai-chat-message.dto.ts"
Cohesion: 0.60
Nodes (3): isTextContentItem(), normalizeOpenAiContent(), TextContentItem

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 129 - "InMemoryRunSseHub"
Cohesion: 0.29
Nodes (4): RunSseEvent, InMemoryRunSseHub, Inject, Injectable

### Community 145 - "event-source-registry-provider.tsx"
Cohesion: 0.43
Nodes (5): EventSourceRegistryContext, EventSourceRegistryProvider(), createEventSourceRegistry(), EventSourceRegistry, RegistryEntry

## Knowledge Gaps
- **339 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+334 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1034 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `LoggingService` connect `LoggingService` to `logging.service.ts`, `anthropic/anthropic-tools.mapper.ts`, `semantic-cache.service.ts`, `redis-vector-store.adapter.ts`, `responses.adapter.ts`, `sse-event.type.ts`, `chat.service.ts`, `HealthService`, `swagger.setup.ts`, `types/index.ts`, `ChatRequestDto`, `google-tools.mapper.ts`, `ai-provider-gateway/src/health/health.service.ts`, `GatewayKey`, `ai-provider-gateway/src/app.module.ts`, `SemanticCacheService`, `api-error.code.ts`, `response-cache.service.ts`, `chat-completions.adapter.ts`, `provider-instances.bootstrap.ts`, `getAppConfigOrThrow`, `filters/http-exception.filter.ts`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Why does `GatewayConfig` connect `GatewayConfig` to `cli.module.ts`, `asClientId`, `models.controller.ts`, `model-manager.service.ts`, `configuration.ts`, `.error`, `asProviderInstanceId`, `chat.service.ts`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Why does `asProviderInstanceId()` connect `asProviderInstanceId` to `metrics.ts`, `cli.module.ts`, `types/index.ts`, `ChatRequestDto`, `asClientId`, `branded.types.ts`, `models.controller.ts`, `model-manager.service.ts`, `configuration.ts`, `.error`, `GatewayConfig`, `responses.adapter.ts`, `GatewayKey`, `provider-instances.bootstrap.ts`, `chat.service.ts`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _339 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05570175438596491 - nodes in this community are weakly interconnected._
- **Should `api/company-context.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.057971014492753624 - nodes in this community are weakly interconnected._