# Graph Report - content-chain  (2026-09-17)

## Corpus Check
- 582 files · ~163,426 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 3751 nodes · 11550 edges · 136 communities (119 shown, 14 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 369 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ba4c1a48`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- cli.module.ts
- social.types.ts
- api/company-context.types.ts
- provider-instances.bootstrap.ts
- .createMessage
- StartRunDto
- app-metrics-backend.interface.ts
- logging.service.ts
- types/index.ts
- api-error.code.ts
- content.graph.ts
- branded.types.ts
- social.graph.ts
- ai-provider.interface.ts
- chat.service.ts
- models.controller.ts
- anthropic-response.mapper.ts
- redis-vector-store.adapter.ts
- model-manager.service.ts
- configuration-validation.service.ts
- sentry-ai-metrics.adapter.ts
- asProviderInstanceId
- chat-stream.controller.ts
- anthropic/anthropic-tools.mapper.ts
- PrismaRunAdapter
- response-cache.service.ts
- ai-provider-gateway/src/app.module.ts
- auth.module.ts
- save-output-edited.use-case.ts
- provider-registry.service.ts
- semantic-cache.constants.ts
- getAppConfig
- ai-provider-gateway/src/main.ts
- metrics.module.ts
- AnthropicMessagesRequestDto
- semantic-cache.service.ts
- LlmGatewayHttpAdapter
- enums.ts
- resilient-executor.ts
- ai-provider-gateway/src/health/health.service.ts
- api/src/app.module.ts
- ConfigInitCommand
- openai-models.controller.ts
- ids.ts
- AppMetricsService
- create-feedback.use-case.ts
- should-include-redis-stack.ts
- social-pipeline.facade.ts
- GatewayConfig
- ChatParamsDto
- runs.controller.ts
- llm-hop.ts
- anthropic.module.ts
- anthropic-models.controller.ts
- swagger.setup.ts
- company-context.controller.ts
- prisma-run.adapter.ts
- ModelAlias
- HealthService
- HealthController
- .getOne
- company-context.dto.ts
- metrics.ts
- LoggingService
- .error
- .getOne
- PrismaService
- CompanyContext
- OpenAiChatCompletionRequestDto
- users.controller.ts
- company-context-form.tsx
- filters/http-exception.filter.ts
- EnvironmentVariables
- prisma-invitation.adapter.ts
- .getOne
- prisma-company-context.adapter.ts
- AuthUserContext
- UserRepository
- company-context.mapper.ts
- llm-gateway.http.adapter.ts
- PrometheusService
- .create
- responses.adapter.ts
- SPEC — README
- ListRunsQueryDto
- start-run.use-case.ts
- auth.controller.ts
- KeyGenerateCommand
- http-metrics.interceptor.ts
- session-provider.tsx
- RedisConnectionService
- PrismaRefreshSessionAdapter
- CreateFeedbackDto
- HttpExceptionFilter
- openai-params-provider.mapper.ts
- PrometheusAppMetricsAdapter
- .completions
- route.ts
- public.decorator.ts
- ProviderAddCommand
- openai-messages.mapper.ts
- prisma.feedback-run-reader.adapter.ts
- useSession
- ClientAddCommand
- ClientEditCommand
- ClientRemoveCommand
- ModelAddCommand
- ModelEditCommand
- PageDocument
- ProviderEditCommand
- DomainException
- ErrorEnvelopeDto
- ModelRemoveCommand
- ProviderRemoveCommand
- cn
- CompanyContextController
- RolesGuard
- VectorStore
- Architektura
- brand.ts
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
9. `cn()` - 49 edges
10. `ChatRequestDto` - 48 edges

## Surprising Connections (you probably didn't know these)
- `toChatResponseDto()` --indirect_call--> `toGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/chat/dto/chat-response.dto.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
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

## Communities (136 total, 14 thin omitted)

### Community 0 - "cli.module.ts"
Cohesion: 0.06
Nodes (65): AgentReport, AgentReportStatus, emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), loadAnswers(), assertAgentHasAnswers(), CliMode (+57 more)

### Community 1 - "social.types.ts"
Cohesion: 0.06
Nodes (26): CompositeRunResultReader, GetRunOutput, RunResultReader, SocialBrief, EmptyRunResultReader, Injectable, toInputJson(), SocialResultStore (+18 more)

### Community 2 - "api/company-context.types.ts"
Cohesion: 0.09
Nodes (40): fetchCompanyContext(), fetchCompleteness(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, companyContextForPut(), CompanyContextObjection (+32 more)

### Community 3 - "provider-instances.bootstrap.ts"
Cohesion: 0.23
Nodes (11): GatewayProviderInstanceConfig, assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryFn (+3 more)

### Community 4 - ".createMessage"
Cohesion: 0.20
Nodes (9): ApiHeader, ApiBody, ApiOperation, ApiProduces, ApiResponse, Body, Post, Req (+1 more)

### Community 5 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 6 - "app-metrics-backend.interface.ts"
Cohesion: 0.14
Nodes (11): healthStatusToGaugeValue(), AppRequestLabels, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus, HttpRequestLabels (+3 more)

### Community 7 - "logging.service.ts"
Cohesion: 0.06
Nodes (22): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+14 more)

### Community 8 - "types/index.ts"
Cohesion: 0.04
Nodes (78): GATEWAY_CACHE_HEADER, toChatResponseDto(), toChatResponseDtoFromCache(), CliRateLimit, GatewayClient, WizardRunResult, ClientCli, EnvTemplateInput (+70 more)

### Community 9 - "api-error.code.ts"
Cohesion: 0.20
Nodes (19): ApiErrorCode, ApiErrorPayload, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isRateLimitStatus(), isServerError() (+11 more)

### Community 10 - "content.graph.ts"
Cohesion: 0.10
Nodes (38): coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema, pageOutlineSectionSchema, readNonEmptyString() (+30 more)

### Community 11 - "branded.types.ts"
Cohesion: 0.05
Nodes (72): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_MESSAGE, WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, InitAnswers, CliAiModelSchema, CliAiProviderSchema (+64 more)

### Community 12 - "social.graph.ts"
Cohesion: 0.12
Nodes (33): loadPromptFromDir(), coercePassNoteVerdict(), isPassOnlyIssue(), ideasOutputSchema, reelIdeasOutputSchema, isReelTaskType(), ReelTaskType, canRefine() (+25 more)

### Community 13 - "ai-provider.interface.ts"
Cohesion: 0.16
Nodes (28): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatResponseData, mapStopReasonToFinishReason(), CompleteOnceResult, StreamOnceResult, ProviderResponse (+20 more)

### Community 14 - "chat.service.ts"
Cohesion: 0.06
Nodes (62): SemanticStoreEmbedState, CacheIdentityMessage, ChatCacheSource, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional (+54 more)

### Community 15 - "models.controller.ts"
Cohesion: 0.22
Nodes (8): GatewayModelCapabilitiesDto, GatewayModelDto, ApiProperty, ApiPropertyOptional, ModelsListResponseDto, ApiProperty, GatewayModelsCatalogService, Injectable

### Community 16 - "anthropic-response.mapper.ts"
Cohesion: 0.08
Nodes (45): SseDoneEvent, fromGatewayToolCallDto(), asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto (+37 more)

### Community 17 - "redis-vector-store.adapter.ts"
Cohesion: 0.13
Nodes (23): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_SPECIAL_CHARS, asString() (+15 more)

### Community 18 - "model-manager.service.ts"
Cohesion: 0.12
Nodes (26): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, convertModel(), defaultModelPolicy(), ModelEditField, ModelManagerService (+18 more)

### Community 19 - "configuration-validation.service.ts"
Cohesion: 0.09
Nodes (26): ConfigValidateCommand, Command, Option, CliGatewayValidatorService, CliValidateOptions, Injectable, collectInactiveProviderWarnings(), formatZodIssues() (+18 more)

### Community 20 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.10
Nodes (28): CostUsd, ToolCallId, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext() (+20 more)

### Community 21 - "asProviderInstanceId"
Cohesion: 0.12
Nodes (33): assertInteractiveAllowed(), collectPendingSecrets(), DEFAULT_MODELS, convertProvider(), CliAiProvider, EnvPatchValue, ModelPromptResult, ModelPromptService (+25 more)

### Community 22 - "chat-stream.controller.ts"
Cohesion: 0.07
Nodes (29): ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags, Body, Controller (+21 more)

### Community 23 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.09
Nodes (40): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent() (+32 more)

### Community 24 - "PrismaRunAdapter"
Cohesion: 0.10
Nodes (9): LightRunItem, ListRunsResult, RunSnapshot, ALLOWED, assertTransition(), PrismaRunAdapter, toPipelinePhase(), toSelectedIdeaIds() (+1 more)

### Community 25 - "response-cache.service.ts"
Cohesion: 0.09
Nodes (17): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+9 more)

### Community 26 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.07
Nodes (27): HealthModule, Module, IntegrationsModule, Module, LoggingModule, Global, Module, AiMetricsModule (+19 more)

### Community 27 - "auth.module.ts"
Cohesion: 0.05
Nodes (44): Inject, InviteUserResult, inviteUserSchema, InviteUserUseCase, Inject, Injectable, InvitationListItem, ListInvitationsUseCase (+36 more)

### Community 28 - "save-output-edited.use-case.ts"
Cohesion: 0.09
Nodes (33): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+25 more)

### Community 29 - "provider-registry.service.ts"
Cohesion: 0.14
Nodes (11): UnsupportedProviderException, GatewayCapabilitiesConfig, GatewayModelConfig, GatewayParamsConfig, AIProvider, ProviderToolCall, OpenAiApiSurface, ProviderRegistryService (+3 more)

### Community 30 - "semantic-cache.constants.ts"
Cohesion: 0.14
Nodes (11): EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema(), EMBEDDING_CIRCUIT_COOLDOWN_MS, EMBEDDING_CIRCUIT_OPEN_AFTER, EMBEDDING_PROBE_TIMEOUT_MS (+3 more)

### Community 31 - "getAppConfig"
Cohesion: 0.19
Nodes (11): getAppConfig(), GatewayKeyGuard, Injectable, enrichRequestWithClientId(), AnthropicApiKeyGuard, readAnthropicApiKey(), Injectable, OpenAiBearerAuthGuard (+3 more)

### Community 32 - "ai-provider-gateway/src/main.ts"
Cohesion: 0.13
Nodes (15): AppModule, Module, bootstrap(), API_GLOBAL_PREFIX, PORT, setupApp(), exportOpenApi(), OPENAPI_OUTPUT_FILENAME (+7 more)

### Community 33 - "metrics.module.ts"
Cohesion: 0.19
Nodes (8): MetricsController, Controller, Get, Res, MetricsModule, Module, MetricsService, Injectable

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "semantic-cache.service.ts"
Cohesion: 0.12
Nodes (19): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, isSingleTurnUserRequest(), lastUserMessageText(), embeddingProbeTimeoutMs() (+11 more)

### Community 36 - "LlmGatewayHttpAdapter"
Cohesion: 0.20
Nodes (6): LlmGatewayError, LlmGatewayHttpAdapter, Inject, Injectable, GATEWAY_ERROR_CODE_LABELS, toGatewayErrorCodeLabel()

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "resilient-executor.ts"
Cohesion: 0.17
Nodes (18): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+10 more)

### Community 39 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.24
Nodes (11): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiProperty, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty (+3 more)

### Community 40 - "api/src/app.module.ts"
Cohesion: 0.07
Nodes (41): AuthModule, Module, CompanyContextModule, Module, CompanyContextRepository, ContentPipelineFacade, toOutcome(), Inject (+33 more)

### Community 41 - "ConfigInitCommand"
Cohesion: 0.31
Nodes (3): ConfigInitCommand, Command, Option

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.27
Nodes (10): ApiOpenAiErrorResponses(), OpenAiErrorBodyDto, OpenAiErrorResponseDto, ApiProperty, ApiPropertyOptional, OpenAiModelDto, OpenAiModelsListResponseDto, ApiProperty (+2 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (28): brand, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createInvitationId(), createRequestId() (+20 more)

### Community 44 - "AppMetricsService"
Cohesion: 0.07
Nodes (19): HttpMetricsMiddleware, Injectable, Inject, Optional, AppMetricsService, Inject, Injectable, APP_METRICS_BACKEND (+11 more)

### Community 45 - "create-feedback.use-case.ts"
Cohesion: 0.25
Nodes (8): FEEDBACK_RUN_READER, FEEDBACK_REPOSITORY, FeedbackEntry, FeedbackRepository, FeedbackModule, Module, PrismaFeedbackAdapter, Injectable

### Community 46 - "should-include-redis-stack.ts"
Cohesion: 0.18
Nodes (12): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement() (+4 more)

### Community 47 - "social-pipeline.facade.ts"
Cohesion: 0.21
Nodes (12): isSocialRunRecord(), SocialRunRecord, SocialPipelineFacade, toOutcome(), Injectable, SocialRunExecutor, Inject, Injectable (+4 more)

### Community 48 - "GatewayConfig"
Cohesion: 0.06
Nodes (20): PendingSecretsItem, ClientManagerService, Injectable, ConfigGeneratorService, Injectable, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable (+12 more)

### Community 49 - "ChatParamsDto"
Cohesion: 0.10
Nodes (22): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+14 more)

### Community 50 - "runs.controller.ts"
Cohesion: 0.04
Nodes (60): FinalizeReviewUseCase, Inject, Injectable, GetRunLogsOutput, GetRunLogsUseCase, Inject, Injectable, GetRunUseCase (+52 more)

### Community 51 - "llm-hop.ts"
Cohesion: 0.20
Nodes (11): LLM_GATEWAY_PORT, isRetryable(), RetryReason, ChatJsonInput, hopErrorLogMessage(), hopUserContent(), isHopRetryable(), isStructuredOutputInvalid() (+3 more)

### Community 52 - "anthropic.module.ts"
Cohesion: 0.18
Nodes (10): ChatModule, Module, AnthropicModule, Module, OpenAiExceptionFilter, Catch, OpenAiModule, Module (+2 more)

### Community 53 - "anthropic-models.controller.ts"
Cohesion: 0.23
Nodes (11): AnthropicErrorBodyDto, AnthropicErrorResponseDto, ApiProperty, AnthropicModelDto, AnthropicModelsListResponseDto, ApiProperty, mapGatewayModelsListToAnthropic(), mapGatewayModelToAnthropic() (+3 more)

### Community 54 - "swagger.setup.ts"
Cohesion: 0.06
Nodes (46): ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString (+38 more)

### Community 55 - "company-context.controller.ts"
Cohesion: 0.14
Nodes (16): toPublicCompanyContext(), GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PatchCompanyContextUseCase (+8 more)

### Community 56 - "prisma-run.adapter.ts"
Cohesion: 0.15
Nodes (9): Inject, OutputEditedWrite, OutputEditedWriter, applyWrite(), PrismaOutputEditedAdapter, Injectable, RunLogRow, RunReviewFields (+1 more)

### Community 57 - "ModelAlias"
Cohesion: 0.06
Nodes (8): ProviderTestOptions, CliAiModel, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, resolveAppMetricsBackend(), AppMetricsBackend

### Community 58 - "HealthService"
Cohesion: 0.11
Nodes (11): HealthLivenessResponseDto, ApiProperty, HealthReadinessResponseDto, HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller (+3 more)

### Community 59 - "HealthController"
Cohesion: 0.16
Nodes (11): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, HealthModule, Module (+3 more)

### Community 60 - ".getOne"
Cohesion: 0.19
Nodes (11): ApiAnthropicErrorResponses(), AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+3 more)

### Community 61 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 62 - "metrics.ts"
Cohesion: 0.08
Nodes (37): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+29 more)

### Community 63 - "LoggingService"
Cohesion: 0.11
Nodes (9): Inject, OllamaEmbeddingAdapter, Injectable, EmbeddingBackend, Inject, LoggingService, Injectable, Inject (+1 more)

### Community 64 - ".error"
Cohesion: 0.11
Nodes (12): ProviderTestCommand, Command, Option, WizardState, ProviderTestService, Injectable, Injectable, WizardOrchestratorService (+4 more)

### Community 65 - ".getOne"
Cohesion: 0.19
Nodes (11): ApiGatewayModelsErrorResponses(), ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+3 more)

### Community 66 - "PrismaService"
Cohesion: 0.15
Nodes (5): PrismaModule, Global, Module, PrismaService, Injectable

### Community 67 - "CompanyContext"
Cohesion: 0.35
Nodes (3): CompanyContext, PrismaCompanyContextAdapter, Injectable

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.07
Nodes (31): IsStringOrArrayOfStrings(), OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray (+23 more)

### Community 69 - "users.controller.ts"
Cohesion: 0.06
Nodes (31): AppModule, Module, ListUsersUseCase, Inject, Injectable, ReactivateUserUseCase, Inject, Injectable (+23 more)

### Community 70 - "company-context-form.tsx"
Cohesion: 0.20
Nodes (10): CompanyContextExtras, GATE_SECTION_LABELS, GateSection, commaToList(), CompanyContextForm(), CompanyContextFormProps, extrasOrEmpty(), linesToList() (+2 more)

### Community 71 - "filters/http-exception.filter.ts"
Cohesion: 0.21
Nodes (7): DEFAULT_HTTP_STATUS_TO_CODE, GlobalExceptionFilter, isPayloadTooLargeError(), PayloadTooLargeError, RequestWithId, Catch, Injectable

### Community 72 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 73 - "prisma-invitation.adapter.ts"
Cohesion: 0.17
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 74 - ".getOne"
Cohesion: 0.19
Nodes (10): OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+2 more)

### Community 75 - "prisma-company-context.adapter.ts"
Cohesion: 0.17
Nodes (14): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CtaItem (+6 more)

### Community 76 - "AuthUserContext"
Cohesion: 0.07
Nodes (29): assertSameIds(), SaveOutputEditedUseCase, Injectable, validationFailed(), withCharacterCount(), HitlDto, IsArray, IsString (+21 more)

### Community 77 - "UserRepository"
Cohesion: 0.09
Nodes (17): BootstrapStatusUseCase, Inject, Injectable, Inject, Inject, AuthUser, JwtPayload, UserListItem (+9 more)

### Community 78 - "company-context.mapper.ts"
Cohesion: 0.15
Nodes (12): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+4 more)

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.16
Nodes (17): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), GatewayChatResponse (+9 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - ".create"
Cohesion: 0.15
Nodes (10): CreateFeedbackUseCase, Inject, Injectable, FeedbackController, ApiCookieAuth, ApiTags, Body, Controller (+2 more)

### Community 82 - "responses.adapter.ts"
Cohesion: 0.07
Nodes (66): toCachedChatResponse(), toHttpException(), asInputTokens(), asOutputTokens(), asSystemFingerprint(), asToolCallId(), buildGenerationConfig(), createGoogleProvider() (+58 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+2 more)

### Community 85 - "start-run.use-case.ts"
Cohesion: 0.12
Nodes (22): contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, socialBriefSchema (+14 more)

### Community 86 - "auth.controller.ts"
Cohesion: 0.05
Nodes (51): LoginUseCase, Inject, Injectable, LogoutUseCase, Inject, Injectable, MeUseCase, Injectable (+43 more)

### Community 87 - "KeyGenerateCommand"
Cohesion: 0.27
Nodes (3): KeyGenerateCommand, Command, Option

### Community 88 - "http-metrics.interceptor.ts"
Cohesion: 0.21
Nodes (10): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, gatewayErrorsTotal, httpRequestDurationSeconds, httpRequestsTotal (+2 more)

### Community 89 - "session-provider.tsx"
Cohesion: 0.13
Nodes (25): geistMono, geistSans, metadata, bootstrapAdmin(), Credentials, fetchBootstrapStatus(), fetchUserSession(), loginWithPassword() (+17 more)

### Community 90 - "RedisConnectionService"
Cohesion: 0.30
Nodes (3): RedisConnectionService, Injectable, isRedisRequiredFromConfig()

### Community 91 - "PrismaRefreshSessionAdapter"
Cohesion: 0.27
Nodes (4): RefreshSessionRecord, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable

### Community 92 - "CreateFeedbackDto"
Cohesion: 0.17
Nodes (10): agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_BODY_MAX, CreateFeedbackDto, IsIn, IsOptional, IsString (+2 more)

### Community 93 - "HttpExceptionFilter"
Cohesion: 0.20
Nodes (6): ErrorEnvelope, HttpExceptionFilter, Catch, newRequestId(), RequestIdMiddleware, Injectable

### Community 94 - "openai-params-provider.mapper.ts"
Cohesion: 0.12
Nodes (24): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+16 more)

### Community 95 - "PrometheusAppMetricsAdapter"
Cohesion: 0.14
Nodes (5): PrometheusAppMetricsAdapter, Injectable, AppProviderCallContext, AppProviderStreamScope, AppTokenUsage

### Community 96 - ".completions"
Cohesion: 0.22
Nodes (8): ApiBody, ApiOperation, ApiProduces, ApiResponse, Body, Post, Req, Res

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 98 - "public.decorator.ts"
Cohesion: 0.38
Nodes (3): IS_PUBLIC_KEY, JwtAuthGuard, Injectable

### Community 99 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 100 - "openai-messages.mapper.ts"
Cohesion: 0.42
Nodes (6): mapOpenAiMessagesToGateway(), mapOpenAiToolCalls(), mapOpenAiChatRequestToGateway(), mapOpenAiToolChoice(), mapOpenAiToolsToGateway(), OpenAiFunctionTool

### Community 101 - "prisma.feedback-run-reader.adapter.ts"
Cohesion: 0.33
Nodes (4): FeedbackRunLookup, FeedbackRunReader, PrismaFeedbackRunReaderAdapter, Injectable

### Community 102 - "useSession"
Cohesion: 0.33
Nodes (4): UsersPage(), HomeEntry(), useSession(), Skeleton()

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

### Community 110 - "DomainException"
Cohesion: 0.08
Nodes (31): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Injectable, comparePassword(), generateRefreshToken(), hashPassword(), hashRefreshToken() (+23 more)

### Community 111 - "ErrorEnvelopeDto"
Cohesion: 0.50
Nodes (3): ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional

### Community 112 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 113 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 114 - "cn"
Cohesion: 0.08
Nodes (37): logoutSession(), AppHeaderProps, LogoutDialog(), confirm(), LogoutDialogProps, Button(), buttonVariants, CardAction() (+29 more)

### Community 115 - "CompanyContextController"
Cohesion: 0.25
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

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
- **315 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+310 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1010 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `LoggingService` connect `LoggingService` to `provider-instances.bootstrap.ts`, `logging.service.ts`, `types/index.ts`, `chat.service.ts`, `redis-vector-store.adapter.ts`, `anthropic/anthropic-tools.mapper.ts`, `response-cache.service.ts`, `ai-provider-gateway/src/app.module.ts`, `provider-registry.service.ts`, `ai-provider-gateway/src/main.ts`, `semantic-cache.service.ts`, `resilient-executor.ts`, `ai-provider-gateway/src/health/health.service.ts`, `AppMetricsService`, `swagger.setup.ts`, `HealthService`, `filters/http-exception.filter.ts`, `responses.adapter.ts`, `RedisConnectionService`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Why does `GatewayConfig` connect `GatewayConfig` to `cli.module.ts`, `.error`, `types/index.ts`, `branded.types.ts`, `chat.service.ts`, `models.controller.ts`, `model-manager.service.ts`, `configuration-validation.service.ts`, `asProviderInstanceId`, `provider-registry.service.ts`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Why does `asProviderInstanceId()` connect `asProviderInstanceId` to `cli.module.ts`, `.error`, `provider-instances.bootstrap.ts`, `types/index.ts`, `branded.types.ts`, `ai-provider.interface.ts`, `chat.service.ts`, `models.controller.ts`, `GatewayConfig`, `responses.adapter.ts`, `model-manager.service.ts`, `configuration-validation.service.ts`, `anthropic/anthropic-tools.mapper.ts`, `provider-registry.service.ts`, `metrics.ts`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _315 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `cli.module.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06372934697088907 - nodes in this community are weakly interconnected._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05975485188968335 - nodes in this community are weakly interconnected._