# Graph Report - content-chain  (2026-09-11)

## Corpus Check
- 535 files · ~147,923 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 3469 nodes · 10785 edges · 127 communities (113 shown, 12 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 361 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `37e93b47`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- social.types.ts
- cli.module.ts
- gateway-config.schema.ts
- auth.controller.ts
- social.graph.ts
- exitWithAgentReport
- chat.service.ts
- branded.types.ts
- api/src/app.module.ts
- invite-user.use-case.ts
- GatewayConfig
- chat-completions.adapter.ts
- asProviderInstanceId
- LogContext
- sentry-ai-metrics.adapter.ts
- getAppConfig
- anthropic-messages.controller.ts
- ModelAlias
- content.graph.ts
- redis-vector-store.adapter.ts
- cli-apply.types.ts
- PrismaService
- semantic-cache.service.ts
- provider-registry.service.ts
- ProviderApiKey
- prisma-run.adapter.ts
- .createMessage
- AnthropicMessagesRequestDto
- HealthService
- anthropic/anthropic-tools.mapper.ts
- wizard-orchestrator.service.ts
- auth.module.ts
- .constructor
- provider-error.mapper.ts
- DomainException
- cache.module.ts
- resilient-executor.ts
- UserRepository
- RunsController
- models.controller.ts
- LoggingService
- AuthController
- enums.ts
- types/index.ts
- openai-models.controller.ts
- config-generator.service.ts
- openai-thinking-provider.mapper.ts
- anthropic.module.ts
- RunRepository
- ids.ts
- toInputJson
- responses.adapter.ts
- RefreshSessionRepository
- ai-provider-gateway/src/main.ts
- company-context.controller.ts
- runs.controller.ts
- google-tools.mapper.ts
- PrismaRefreshSessionAdapter
- anthropic-models.controller.ts
- configuration.ts
- MetricsController
- anthropic-response.mapper.ts
- InvitationsController
- configuration-validation.service.ts
- openai.module.ts
- openai-params-provider.mapper.ts
- company-context.dto.ts
- llm-gateway.http.adapter.ts
- api-error.code.ts
- ChatParamsDto
- provider-instances.bootstrap.ts
- CompanyContextRepository
- prisma-company-context.adapter.ts
- ai-provider-gateway/src/app.module.ts
- OpenAiChatCompletionRequestDto
- ChatToolingDto
- HealthController
- InProcessRunWorker
- llm-hop.ts
- start-run.use-case.ts
- openai-stream.mapper.ts
- .create
- CompanyContextController
- .completions
- AppMetricsModule
- PrometheusService
- SPEC — README
- swagger.setup.ts
- parseAnthropicResponseWithTools
- GlobalExceptionFilter
- BootstrapAdminDto
- NodemailerSmtpMailerAdapter
- EnvironmentVariables
- ConfigInitCommand
- ProviderAddCommand
- ApiRequestIdHeader
- OpenAiChatMessageDto
- openai-messages.mapper.ts
- ClientAddCommand
- ClientEditCommand
- ClientRemoveCommand
- ModelAddCommand
- ModelEditCommand
- ModelRemoveCommand
- ProviderEditCommand
- ProviderRemoveCommand
- api/src/main.ts
- HttpExceptionFilter
- company-context.mapper.ts
- openai-chat-message.dto.ts
- layout.tsx
- button.tsx
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
6. `DomainException` - 60 edges
7. `GatewayKey` - 59 edges
8. `ClientId` - 54 edges
9. `ChatRequestDto` - 48 edges
10. `AppMetricsService` - 46 edges

## Surprising Connections (you probably didn't know these)
- `toChatResponseDto()` --indirect_call--> `toGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/chat/dto/chat-response.dto.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `mapGatewayResponseToAnthropicFormat()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/anthropic/mappers/anthropic-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `RedisConnectionService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-connection.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `CacheRegistryService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/cache-registry.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (127 total, 12 thin omitted)

### Community 0 - "social.types.ts"
Cohesion: 0.06
Nodes (27): PageDocument, CompositeRunResultReader, GetRunOutput, RunResultReader, SocialBrief, EmptyRunResultReader, Injectable, SocialResultStore (+19 more)

### Community 1 - "cli.module.ts"
Cohesion: 0.06
Nodes (61): AgentReport, AgentReportStatus, loadAnswers(), assertAgentHasAnswers(), CliMode, CliModeFlags, markAgentRuntime(), CliModule (+53 more)

### Community 2 - "gateway-config.schema.ts"
Cohesion: 0.08
Nodes (40): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, KeyGenerateCommand, Command, Option, CliAiModelSchema (+32 more)

### Community 3 - "auth.controller.ts"
Cohesion: 0.10
Nodes (28): comparePassword(), generateRefreshToken(), hashPassword(), hashRefreshToken(), parseTtlMs(), parseTtlSeconds(), BootstrapAdminInput, bootstrapAdminSchema (+20 more)

### Community 4 - "social.graph.ts"
Cohesion: 0.08
Nodes (49): loadPromptFromDir(), coercePassNoteVerdict(), isPassOnlyIssue(), coerceVerifierIssue(), ContentOutput, contentOutputSchema, IdeasOutput, ideasOutputSchema (+41 more)

### Community 5 - "exitWithAgentReport"
Cohesion: 0.18
Nodes (9): emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), resolveCliMode(), toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList() (+1 more)

### Community 6 - "chat.service.ts"
Cohesion: 0.05
Nodes (49): SemanticStoreEmbedState, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize (+41 more)

### Community 7 - "branded.types.ts"
Cohesion: 0.07
Nodes (61): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatResponseData, ChatWarningDto (+53 more)

### Community 8 - "api/src/app.module.ts"
Cohesion: 0.06
Nodes (50): CompanyContextModule, Module, ContentPipelineFacade, toOutcome(), Injectable, ContentRunExecutor, isCanonicalOutlineSelection(), isMissingContentKind() (+42 more)

### Community 9 - "invite-user.use-case.ts"
Cohesion: 0.06
Nodes (38): Inject, InviteUserResult, inviteUserSchema, InviteUserUseCase, Inject, Injectable, InvitationListItem, ListInvitationsUseCase (+30 more)

### Community 10 - "GatewayConfig"
Cohesion: 0.11
Nodes (33): assertInteractiveAllowed(), DEFAULT_MODELS, DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, convertModel(), defaultModelPolicy() (+25 more)

### Community 11 - "chat-completions.adapter.ts"
Cohesion: 0.14
Nodes (20): asSystemFingerprint(), ProviderToolResultTurn, ChatCompletionsAdapterOptions, textStream(), ChatCompletionMessageParam, mapAssistantTurn(), mapTurnsToOpenAiMessages(), accumulateOpenAiStreamToolCallDeltas() (+12 more)

### Community 12 - "asProviderInstanceId"
Cohesion: 0.09
Nodes (35): collectPendingSecrets(), EnvPatchValue, ProviderPromptResult, ProviderPromptService, Injectable, ProviderManagerService, Injectable, EditProviderInput (+27 more)

### Community 13 - "LogContext"
Cohesion: 0.06
Nodes (25): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+17 more)

### Community 14 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.08
Nodes (33): CostUsd, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes() (+25 more)

### Community 15 - "getAppConfig"
Cohesion: 0.13
Nodes (15): readClientGatewayKey(), readGatewayKeyHeader(), resolveClientIdFromKey(), ResolvedGatewayClient, getAppConfig(), GatewayKeyGuard, Injectable, enrichRequestWithClientId() (+7 more)

### Community 16 - "anthropic-messages.controller.ts"
Cohesion: 0.05
Nodes (42): ChatCacheSource, GATEWAY_CACHE_HEADER, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags (+34 more)

### Community 17 - "ModelAlias"
Cohesion: 0.04
Nodes (32): ProviderTestOptions, HttpMetricsMiddleware, Injectable, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, healthStatusToGaugeValue() (+24 more)

### Community 18 - "content.graph.ts"
Cohesion: 0.11
Nodes (37): Inject, coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, pageDocumentOutputSchema, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema (+29 more)

### Community 19 - "redis-vector-store.adapter.ts"
Cohesion: 0.07
Nodes (31): RedisConnectionService, Injectable, isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, EmbeddingCircuitBreaker, escapeRedisSearchTag() (+23 more)

### Community 20 - "cli-apply.types.ts"
Cohesion: 0.09
Nodes (18): PendingSecretsItem, CliRateLimit, ClientManagerService, Injectable, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable, EnvPatchService (+10 more)

### Community 21 - "PrismaService"
Cohesion: 0.07
Nodes (25): CreateFeedbackUseCase, Inject, Injectable, agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_RUN_READER, FeedbackRunLookup (+17 more)

### Community 22 - "semantic-cache.service.ts"
Cohesion: 0.07
Nodes (26): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, OllamaEmbeddingAdapter, Injectable, EmbeddingBackend (+18 more)

### Community 23 - "provider-registry.service.ts"
Cohesion: 0.08
Nodes (38): getClientConversationId(), getOrCreateConversationIdForResponse(), buildAppProviderMetricsContext(), buildLlmMetricsContext(), mapProviderResponseToUsage(), toMetricsMessages(), buildProviderInputForAlias(), toProviderTurns() (+30 more)

### Community 24 - "ProviderApiKey"
Cohesion: 0.17
Nodes (10): ProviderTestCommand, Command, Option, CliAiProvider, ProviderTestService, Injectable, ProviderCli, BaseUrl (+2 more)

### Community 25 - "prisma-run.adapter.ts"
Cohesion: 0.09
Nodes (16): contentBriefSchema, socialBriefSchema, LightRunItem, ListRunsQuery, ListRunsResult, RunSnapshot, RunLogEntry, ALLOWED (+8 more)

### Community 26 - ".createMessage"
Cohesion: 0.10
Nodes (20): ApiHeader, ApiAnthropicErrorResponses(), ApiBody, ApiOperation, ApiProduces, ApiResponse, Body, Post (+12 more)

### Community 27 - "AnthropicMessagesRequestDto"
Cohesion: 0.05
Nodes (49): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+41 more)

### Community 28 - "HealthService"
Cohesion: 0.20
Nodes (4): HealthReadinessResponseDto, ApiProperty, HealthService, Injectable

### Community 29 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.11
Nodes (27): toHttpException(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, isAnthropicEffortLevel(), mapThinkingBudgetToAnthropicEffort(), mapThinkingToAnthropic(), resolveAnthropicOutputConfig(), ContentBlockParam (+19 more)

### Community 30 - "wizard-orchestrator.service.ts"
Cohesion: 0.10
Nodes (26): WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, InitAnswers, WizardState, ClientPromptService, Injectable, KeyPromptService (+18 more)

### Community 31 - "auth.module.ts"
Cohesion: 0.09
Nodes (23): BootstrapStatusUseCase, Injectable, ListUsersUseCase, Injectable, UserListItem, SoftDeleteUserUseCase, Injectable, AuthModule (+15 more)

### Community 32 - ".constructor"
Cohesion: 0.09
Nodes (16): FinalizeReviewUseCase, Inject, Injectable, GetRunLogsUseCase, Inject, Injectable, GetRunUseCase, Inject (+8 more)

### Community 33 - "provider-error.mapper.ts"
Cohesion: 0.27
Nodes (17): MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isRateLimitStatus(), isServerError(), isTimeoutStatus(), nameLooksLikeTimeout() (+9 more)

### Community 34 - "DomainException"
Cohesion: 0.10
Nodes (22): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Injectable, validatePasswordPolicy(), FlagOutputEditedUseCase, Inject, Injectable (+14 more)

### Community 35 - "cache.module.ts"
Cohesion: 0.09
Nodes (20): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+12 more)

### Community 36 - "resilient-executor.ts"
Cohesion: 0.17
Nodes (18): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+10 more)

### Community 37 - "UserRepository"
Cohesion: 0.10
Nodes (13): Inject, Inject, Inject, AuthUser, CreateAdminIfNoneData, CreateAdminIfNoneResult, UserForAuth, UserRepository (+5 more)

### Community 38 - "RunsController"
Cohesion: 0.07
Nodes (31): ListRunsUserOutput, ListRunsQueryDto, IsIn, IsInt, IsOptional, IsString, Min, Type (+23 more)

### Community 39 - "models.controller.ts"
Cohesion: 0.10
Nodes (22): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+14 more)

### Community 40 - "LoggingService"
Cohesion: 0.08
Nodes (16): Inject, Inject, ChatProviderCooldownService, Injectable, StreamCacheReplayService, Injectable, UnsupportedProviderException, GatewayModelConfig (+8 more)

### Community 41 - "AuthController"
Cohesion: 0.11
Nodes (21): AuthController, ApiCookieAuth, ApiTags, Body, Controller, Get, HttpCode, Post (+13 more)

### Community 42 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 43 - "types/index.ts"
Cohesion: 0.14
Nodes (27): RequestIdMiddleware, Injectable, CONVERSATION_ID_PATTERN, createRequestId(), isAttemptNumber(), isBaseUrl(), isCacheTtlSeconds(), isConversationId() (+19 more)

### Community 44 - "openai-models.controller.ts"
Cohesion: 0.13
Nodes (20): ApiOpenAiErrorResponses(), OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+12 more)

### Community 45 - "config-generator.service.ts"
Cohesion: 0.13
Nodes (13): isRedisRequired(), ConfigGeneratorService, Injectable, FileManagerService, Injectable, ClientCli, EnvTemplateInput, generateEnvTemplate() (+5 more)

### Community 46 - "openai-thinking-provider.mapper.ts"
Cohesion: 0.22
Nodes (13): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), isOpenAiEffortLevel(), isOpenAiReasoningRequested(), mapThinkingBudgetToEffort(), mapThinkingToChatCompletion(), mapThinkingToResponsesReasoning() (+5 more)

### Community 47 - "anthropic.module.ts"
Cohesion: 0.12
Nodes (15): ChatModule, Module, AnthropicModule, Module, AnthropicMessagesController, ApiSecurity, ApiTags, Controller (+7 more)

### Community 48 - "RunRepository"
Cohesion: 0.06
Nodes (27): Inject, ListRunsOutput, ListRunsUserItem, RecoverInterruptedRunsUseCase, Inject, Injectable, ResumeHitlUseCase, Inject (+19 more)

### Community 49 - "ids.ts"
Cohesion: 0.10
Nodes (28): brand, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createInvitationId(), createRequestId() (+20 more)

### Community 50 - "toInputJson"
Cohesion: 0.11
Nodes (9): ContentPipelineState, VerifierVerdict, PrismaContentResultAdapter, toContentPipelinePhase(), Injectable, PrismaModule, Global, Module (+1 more)

### Community 51 - "responses.adapter.ts"
Cohesion: 0.20
Nodes (16): asToolCallId(), buildResponsesCreateParams(), textStream(), mapGatewayMetadataToOpenAi(), mapAssistantTurnToResponsesInput(), mapTurnsToResponsesInput(), extractResponsesToolCalls(), mapResponsesStopReason() (+8 more)

### Community 52 - "RefreshSessionRepository"
Cohesion: 0.11
Nodes (7): Inject, Inject, LogoutUseCase, Inject, Injectable, Inject, RefreshSessionRepository

### Community 53 - "ai-provider-gateway/src/main.ts"
Cohesion: 0.13
Nodes (15): AppModule, Module, bootstrap(), API_GLOBAL_PREFIX, PORT, setupApp(), exportOpenApi(), OPENAPI_OUTPUT_FILENAME (+7 more)

### Community 54 - "company-context.controller.ts"
Cohesion: 0.21
Nodes (12): toPublicCompanyContext(), GetCompanyContextUseCase, Injectable, GetCompletenessUseCase, Injectable, PatchCompanyContextUseCase, Injectable, PutCompanyContextUseCase (+4 more)

### Community 55 - "runs.controller.ts"
Cohesion: 0.07
Nodes (27): MeUseCase, Injectable, JwtPayload, InviteUserDto, ApiProperty, IsEmail, isRecord(), JwtCookieStrategy (+19 more)

### Community 56 - "google-tools.mapper.ts"
Cohesion: 0.13
Nodes (24): buildGenerationConfig(), createGoogleProvider(), getFinalToolCalls(), getStopReason(), textStream(), mapStopSequences(), mapThinkingBudgetToGeminiLevel(), extractFromLegacyFields() (+16 more)

### Community 57 - "PrismaRefreshSessionAdapter"
Cohesion: 0.31
Nodes (3): RefreshSessionRecord, PrismaRefreshSessionAdapter, Injectable

### Community 58 - "anthropic-models.controller.ts"
Cohesion: 0.23
Nodes (11): AnthropicErrorBodyDto, AnthropicErrorResponseDto, ApiProperty, AnthropicModelDto, AnthropicModelsListResponseDto, ApiProperty, mapGatewayModelsListToAnthropic(), mapGatewayModelToAnthropic() (+3 more)

### Community 59 - "configuration.ts"
Cohesion: 0.13
Nodes (16): asSemanticCacheTtlSeconds(), AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig, SemanticCacheRuntimeConfig, BuildEffectiveGatewayConfigOptions, readRequiredPrompt() (+8 more)

### Community 60 - "MetricsController"
Cohesion: 0.18
Nodes (7): MetricsController, ApiOperation, ApiResponse, ApiTags, Controller, Get, Header

### Community 61 - "anthropic-response.mapper.ts"
Cohesion: 0.10
Nodes (32): ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString (+24 more)

### Community 62 - "InvitationsController"
Cohesion: 0.16
Nodes (10): InvitationsController, ApiCookieAuth, ApiTags, Body, Controller, Delete, Get, HttpCode (+2 more)

### Community 63 - "configuration-validation.service.ts"
Cohesion: 0.11
Nodes (18): CACHE_BACKEND_TYPE, CliValidateOptions, collectInactiveProviderWarnings(), formatZodIssues(), validateGatewayConfig(), ValidationOptions, ValidationResult, buildEffectiveGatewayConfig() (+10 more)

### Community 64 - "openai.module.ts"
Cohesion: 0.19
Nodes (9): OpenAiChatCompletionsController, ApiSecurity, ApiTags, Controller, OpenAiAuth(), OpenAiExceptionFilter, Catch, OpenAiBearerAuthGuard (+1 more)

### Community 65 - "openai-params-provider.mapper.ts"
Cohesion: 0.23
Nodes (11): mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses(), mapStopSequences(), OpenAiSharedChatCompletionParams, OpenAiSharedResponsesParams (+3 more)

### Community 66 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 67 - "llm-gateway.http.adapter.ts"
Cohesion: 0.06
Nodes (40): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), LlmGatewayError (+32 more)

### Community 68 - "api-error.code.ts"
Cohesion: 0.30
Nodes (5): ApiErrorCode, DEFAULT_HTTP_STATUS_TO_CODE, ApiErrorPayload, PayloadTooLargeError, RequestWithId

### Community 69 - "ChatParamsDto"
Cohesion: 0.12
Nodes (17): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+9 more)

### Community 70 - "provider-instances.bootstrap.ts"
Cohesion: 0.18
Nodes (15): GatewayProviderInstanceConfig, assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryFn (+7 more)

### Community 71 - "CompanyContextRepository"
Cohesion: 0.16
Nodes (8): Inject, Inject, Inject, Inject, CompanyContextRepository, CompanyContext, PrismaCompanyContextAdapter, Injectable

### Community 72 - "prisma-company-context.adapter.ts"
Cohesion: 0.16
Nodes (15): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, Completeness (+7 more)

### Community 73 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.18
Nodes (14): getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis(), shouldIncludeRedisStack() (+6 more)

### Community 74 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (18): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+10 more)

### Community 75 - "ChatToolingDto"
Cohesion: 0.16
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 76 - "HealthController"
Cohesion: 0.11
Nodes (14): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, HealthModule, Module (+6 more)

### Community 77 - "InProcessRunWorker"
Cohesion: 0.17
Nodes (5): InProcessRunWorker, Injectable, Inject, StubRunExecutor, Injectable

### Community 78 - "llm-hop.ts"
Cohesion: 0.22
Nodes (9): LLM_GATEWAY_PORT, isRetryable(), RetryReason, ChatJsonInput, hopErrorLogMessage(), hopUserContent(), isHopRetryable(), isStructuredOutputInvalid() (+1 more)

### Community 79 - "start-run.use-case.ts"
Cohesion: 0.13
Nodes (20): hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, socialStartRunSchema, startRunCommandSchema (+12 more)

### Community 80 - "openai-stream.mapper.ts"
Cohesion: 0.18
Nodes (20): fromGatewayToolCallDto(), OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty (+12 more)

### Community 81 - ".create"
Cohesion: 0.20
Nodes (9): Body, HttpCode, Post, CreateFeedbackDto, IsIn, IsOptional, IsString, MaxLength (+1 more)

### Community 82 - "CompanyContextController"
Cohesion: 0.29
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 83 - ".completions"
Cohesion: 0.22
Nodes (8): ApiBody, ApiOperation, ApiProduces, ApiResponse, Body, Post, Req, Res

### Community 84 - "AppMetricsModule"
Cohesion: 0.22
Nodes (7): AppMetricsModule, Global, Module, RATE_LIMIT_MODULE_OPTIONS, RateLimitModule, RateLimitModuleOptions, Module

### Community 85 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 86 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 87 - "swagger.setup.ts"
Cohesion: 0.13
Nodes (18): RedisConsumer, ChatUsageDto, ApiPropertyOptional, SseDeltaPayloadDto, ApiProperty, SseDoneUsageDto, ApiPropertyOptional, HealthCheckItemDto (+10 more)

### Community 88 - "parseAnthropicResponseWithTools"
Cohesion: 0.42
Nodes (9): extractAnthropicThinkingContent(), parseAnthropicResponseWithTools(), createAnthropicProvider(), getFinalToolCalls(), getStopReason(), getThinkingContent(), getUsageDetails(), getUsageMetadata() (+1 more)

### Community 89 - "GlobalExceptionFilter"
Cohesion: 0.32
Nodes (4): GlobalExceptionFilter, isPayloadTooLargeError(), Catch, Injectable

### Community 90 - "BootstrapAdminDto"
Cohesion: 0.33
Nodes (5): BootstrapAdminDto, ApiProperty, IsEmail, IsString, MinLength

### Community 91 - "NodemailerSmtpMailerAdapter"
Cohesion: 0.33
Nodes (4): NodemailerSmtpMailerAdapter, readSmtpConfig(), Inject, Injectable

### Community 92 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 94 - "ConfigInitCommand"
Cohesion: 0.31
Nodes (3): ConfigInitCommand, Command, Option

### Community 96 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 98 - "ApiRequestIdHeader"
Cohesion: 0.17
Nodes (11): ApiRequestIdHeader(), HealthLivenessResponseDto, ApiProperty, HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller (+3 more)

### Community 100 - "OpenAiChatMessageDto"
Cohesion: 0.22
Nodes (9): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+1 more)

### Community 101 - "openai-messages.mapper.ts"
Cohesion: 0.42
Nodes (6): mapOpenAiMessagesToGateway(), mapOpenAiToolCalls(), mapOpenAiChatRequestToGateway(), mapOpenAiToolChoice(), mapOpenAiToolsToGateway(), OpenAiFunctionTool

### Community 102 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 103 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 104 - "ClientRemoveCommand"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

### Community 105 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 106 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 107 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 108 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 109 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 110 - "api/src/main.ts"
Cohesion: 0.33
Nodes (6): AppModule, Module, bootstrap(), parseCorsOrigins(), configureHttpApp(), buildSwaggerConfig()

### Community 112 - "HttpExceptionFilter"
Cohesion: 0.20
Nodes (6): ErrorEnvelope, HttpExceptionFilter, Catch, newRequestId(), RequestIdMiddleware, Injectable

### Community 114 - "company-context.mapper.ts"
Cohesion: 0.16
Nodes (11): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+3 more)

### Community 119 - "openai-chat-message.dto.ts"
Cohesion: 0.60
Nodes (3): isTextContentItem(), normalizeOpenAiContent(), TextContentItem

### Community 120 - "layout.tsx"
Cohesion: 0.40
Nodes (3): geistMono, geistSans, metadata

### Community 121 - "button.tsx"
Cohesion: 0.70
Nodes (3): Button(), buttonVariants, cn()

### Community 126 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

## Knowledge Gaps
- **270 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+265 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 931 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `LoggingService` connect `LoggingService` to `cache.module.ts`, `resilient-executor.ts`, `api-error.code.ts`, `chat.service.ts`, `branded.types.ts`, `provider-instances.bootstrap.ts`, `chat-completions.adapter.ts`, `LogContext`, `redis-vector-store.adapter.ts`, `responses.adapter.ts`, `ai-provider-gateway/src/main.ts`, `semantic-cache.service.ts`, `provider-registry.service.ts`, `google-tools.mapper.ts`, `GlobalExceptionFilter`, `swagger.setup.ts`, `HealthService`, `anthropic/anthropic-tools.mapper.ts`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `ModelAlias` to `gateway-config.schema.ts`, `exitWithAgentReport`, `chat.service.ts`, `branded.types.ts`, `models.controller.ts`, `LoggingService`, `GatewayConfig`, `types/index.ts`, `asProviderInstanceId`, `config-generator.service.ts`, `LogContext`, `sentry-ai-metrics.adapter.ts`, `anthropic-messages.controller.ts`, `cli-apply.types.ts`, `provider-registry.service.ts`, `ProviderApiKey`, `configuration.ts`, `wizard-orchestrator.service.ts`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Why does `DomainException` connect `DomainException` to `social.types.ts`, `.constructor`, `auth.controller.ts`, `llm-gateway.http.adapter.ts`, `UserRepository`, `RunsController`, `api/src/app.module.ts`, `invite-user.use-case.ts`, `llm-hop.ts`, `start-run.use-case.ts`, `RunRepository`, `HttpExceptionFilter`, `PrismaService`, `runs.controller.ts`, `prisma-run.adapter.ts`, `InvitationsController`, `auth.module.ts`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _270 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05860805860805861 - nodes in this community are weakly interconnected._
- **Should `cli.module.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.056945481702763256 - nodes in this community are weakly interconnected._