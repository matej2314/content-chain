# Graph Report - content-chain  (2026-09-17)

## Corpus Check
- 583 files · ~163,587 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 5 file(s) not represented in the graph (top: (none) 4, .css 1)

## Summary
- 3753 nodes · 11562 edges · 131 communities (114 shown, 14 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 369 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `fa41bb27`
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
- branded.types.ts
- provider-error.mapper.ts
- llm-hop.ts
- wizard-orchestrator.service.ts
- social.graph.ts
- chat-provider-call.service.ts
- chat.service.ts
- models.controller.ts
- anthropic-response.mapper.ts
- redis-vector-store.adapter.ts
- GatewayConfig
- configuration.ts
- sentry-ai-metrics.adapter.ts
- asProviderInstanceId
- chat-stream.controller.ts
- ai-provider.interface.ts
- prisma-run.adapter.ts
- response-cache.service.ts
- ai-provider-gateway/src/app.module.ts
- auth.module.ts
- save-output-edited.use-case.ts
- provider-registry.service.ts
- semantic-cache.constants.ts
- getAppConfig
- ai-provider-gateway/src/main.ts
- prisma.service.ts
- AnthropicMessagesRequestDto
- semantic-cache.service.ts
- AppMetricsService
- enums.ts
- resilient-executor.ts
- ai-provider-gateway/src/health/health.service.ts
- api/src/app.module.ts
- ConfigInitCommand
- .completions
- ids.ts
- app-metrics.service.ts
- create-feedback.use-case.ts
- should-include-redis-stack.ts
- AppMetricsModule
- config-generator.service.ts
- ChatParamsDto
- runs.controller.ts
- logout-dialog.tsx
- .streamChat
- anthropic-models.controller.ts
- swagger.setup.ts
- company-context.controller.ts
- prisma-output-edited.adapter.ts
- ModelAlias
- HealthService
- HealthController
- OllamaEmbeddingAdapter
- company-context.dto.ts
- metrics.ts
- LoggingService
- .info
- GatewayModelsCatalogService
- PrismaService
- CompanyContext
- OpenAiChatCompletionRequestDto
- users.controller.ts
- company-context-form.tsx
- api-error.code.ts
- api/src/main.ts
- prisma-invitation.adapter.ts
- ApiRequestIdHeader
- prisma-company-context.adapter.ts
- AuthUserContext
- auth.controller.ts
- company-context.mapper.ts
- llm-gateway.http.adapter.ts
- PrometheusService
- CreateFeedbackUseCase
- responses.adapter.ts
- SPEC — README
- ListRunsQueryDto
- run-record.test-helpers.ts
- AuthController
- KeyGenerateCommand
- acceptInvite
- session-provider.tsx
- SmartRateLimitGuard
- RefreshSessionRepository
- .create
- HttpExceptionFilter
- openai-params-provider.mapper.ts
- PrometheusAppMetricsAdapter
- SaveOutputEditedUseCase
- route.ts
- ProviderAddCommand
- openai-messages.mapper.ts
- prisma.feedback-run-reader.adapter.ts
- company-context-view.tsx
- ClientAddCommand
- ClientEditCommand
- ClientRemoveCommand
- ModelAddCommand
- ModelEditCommand
- ProviderEditCommand
- DomainException
- ModelRemoveCommand
- ProviderRemoveCommand
- app-header.tsx
- CompanyContextController
- Architektura
- brand.ts
- cn
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
- `optionalEnvRefSchema` --calls--> `asEnvRef()`  [EXTRACTED]
  apps/ai-provider-gateway/src/config/gateway-config.schema.ts → apps/ai-provider-gateway/src/common/types/branded.types.ts
- `DialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/dialog.tsx → apps/frontend/src/shared/utils/utils.ts
- `DropdownMenuCheckboxItem()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/dropdown-menu.tsx → apps/frontend/src/shared/utils/utils.ts
- `DropdownMenuRadioItem()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/dropdown-menu.tsx → apps/frontend/src/shared/utils/utils.ts

## Import Cycles
- None detected.

## Communities (131 total, 14 thin omitted)

### Community 0 - "cli.module.ts"
Cohesion: 0.07
Nodes (62): AgentReport, AgentReportStatus, emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), PendingSecretsItem, loadAnswers(), assertAgentHasAnswers() (+54 more)

### Community 1 - "social.types.ts"
Cohesion: 0.05
Nodes (32): CompositeRunResultReader, GetRunOutput, orderItemsBySelectedIds(), ListRunsOutput, RunStartedBy, RUN_RESULT_READER, RunResultReader, ContentBrief (+24 more)

### Community 2 - "api/company-context.types.ts"
Cohesion: 0.11
Nodes (32): fetchCompleteness(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, companyContextForPut(), CompanyContextObjection, CompanyContextPayload, Completeness (+24 more)

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
Cohesion: 0.12
Nodes (11): healthStatusToGaugeValue(), AppRequestLabels, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus, HttpRequestLabels (+3 more)

### Community 7 - "logging.service.ts"
Cohesion: 0.07
Nodes (22): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+14 more)

### Community 8 - "branded.types.ts"
Cohesion: 0.05
Nodes (56): GATEWAY_CACHE_HEADER, toChatResponseDto(), toChatResponseDtoFromCache(), isProviderRateLimitError(), RequestIdMiddleware, Injectable, resolveClientIdFromKey(), CONVERSATION_ID_PATTERN (+48 more)

### Community 9 - "provider-error.mapper.ts"
Cohesion: 0.21
Nodes (19): MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isRateLimitStatus(), isServerError(), isTimeoutStatus(), nameLooksLikeTimeout() (+11 more)

### Community 10 - "llm-hop.ts"
Cohesion: 0.07
Nodes (54): CompanyContextRepository, ContentPipelineFacade, toOutcome(), Inject, Injectable, pageOutlineOutputSchema, ContentResultStore, ContentPipelineInput (+46 more)

### Community 11 - "wizard-orchestrator.service.ts"
Cohesion: 0.07
Nodes (55): assertInteractiveAllowed(), WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, InitAnswers, CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema (+47 more)

### Community 12 - "social.graph.ts"
Cohesion: 0.13
Nodes (32): coercePassNoteVerdict(), isPassOnlyIssue(), ideasOutputSchema, reelIdeasOutputSchema, isReelTaskType(), ReelTaskType, canRefine(), MAX_REFINE (+24 more)

### Community 13 - "chat-provider-call.service.ts"
Cohesion: 0.12
Nodes (34): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatCacheSource, ChatResponseData, SseMetaPayload, SseMetaPayloadDto, ApiProperty (+26 more)

### Community 14 - "chat.service.ts"
Cohesion: 0.06
Nodes (51): SemanticStoreEmbedState, CacheIdentityMessage, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize (+43 more)

### Community 15 - "models.controller.ts"
Cohesion: 0.21
Nodes (10): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, GatewayModelCapabilitiesDto, GatewayModelDto, ApiProperty, ApiPropertyOptional (+2 more)

### Community 16 - "anthropic-response.mapper.ts"
Cohesion: 0.08
Nodes (45): SseDoneEvent, fromGatewayToolCallDto(), asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto (+37 more)

### Community 17 - "redis-vector-store.adapter.ts"
Cohesion: 0.11
Nodes (23): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_SPECIAL_CHARS, asString() (+15 more)

### Community 18 - "GatewayConfig"
Cohesion: 0.06
Nodes (39): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable, defaultModelPolicy() (+31 more)

### Community 19 - "configuration.ts"
Cohesion: 0.07
Nodes (42): CliValidateOptions, asCacheTtlSeconds(), asSemanticCacheTtlSeconds(), AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig, SemanticCacheRuntimeConfig (+34 more)

### Community 20 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.10
Nodes (28): CostUsd, ToolCallId, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext() (+20 more)

### Community 21 - "asProviderInstanceId"
Cohesion: 0.08
Nodes (44): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_MESSAGE, collectPendingSecrets(), DEFAULT_MODELS, CliAiProvider, EnvPatchService, EnvPatchValue, Injectable (+36 more)

### Community 22 - "chat-stream.controller.ts"
Cohesion: 0.09
Nodes (19): ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags, Body, Controller (+11 more)

### Community 23 - "ai-provider.interface.ts"
Cohesion: 0.07
Nodes (50): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, asPromptCacheCreationTokens(), asPromptCacheHitTokens(), PromptCacheCreationTokens, PromptCacheHitTokens, ANTHROPIC_EFFORT_LEVELS (+42 more)

### Community 24 - "prisma-run.adapter.ts"
Cohesion: 0.10
Nodes (12): LightRunItem, ListRunsResult, RunSnapshot, RunLogEntry, assertTransition(), PrismaRunAdapter, RunLogRow, RunReviewFields (+4 more)

### Community 25 - "response-cache.service.ts"
Cohesion: 0.10
Nodes (13): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheModule, Module, CacheModule, CacheModuleOptions (+5 more)

### Community 26 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.09
Nodes (22): ChatModule, Module, HealthModule, Module, AnthropicModule, Module, IntegrationsModule, Module (+14 more)

### Community 27 - "auth.module.ts"
Cohesion: 0.06
Nodes (39): InviteUserResult, inviteUserSchema, InviteUserUseCase, Inject, Injectable, ListInvitationsUseCase, Injectable, RefreshUseCase (+31 more)

### Community 28 - "save-output-edited.use-case.ts"
Cohesion: 0.07
Nodes (41): coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, pageDocumentOutputSchema, PageOutlineOutput, pageOutlineSectionRoleSchema, pageOutlineSectionSchema, readNonEmptyString() (+33 more)

### Community 29 - "provider-registry.service.ts"
Cohesion: 0.13
Nodes (14): ChatValidationService, Injectable, UnsupportedProviderException, ModelId, GatewayCapabilitiesConfig, GatewayModelConfig, GatewayParamsConfig, AIProvider (+6 more)

### Community 30 - "semantic-cache.constants.ts"
Cohesion: 0.13
Nodes (12): EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema(), EMBEDDING_CIRCUIT_COOLDOWN_MS, EMBEDDING_CIRCUIT_OPEN_AFTER, EMBEDDING_PROBE_TIMEOUT_MS (+4 more)

### Community 31 - "getAppConfig"
Cohesion: 0.19
Nodes (11): getAppConfig(), GatewayKeyGuard, Injectable, enrichRequestWithClientId(), AnthropicApiKeyGuard, readAnthropicApiKey(), Injectable, OpenAiBearerAuthGuard (+3 more)

### Community 32 - "ai-provider-gateway/src/main.ts"
Cohesion: 0.13
Nodes (15): AppModule, Module, bootstrap(), API_GLOBAL_PREFIX, PORT, setupApp(), exportOpenApi(), OPENAPI_OUTPUT_FILENAME (+7 more)

### Community 33 - "prisma.service.ts"
Cohesion: 0.11
Nodes (17): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, MetricsController, Controller, Get (+9 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "semantic-cache.service.ts"
Cohesion: 0.12
Nodes (19): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, isSingleTurnUserRequest(), lastUserMessageText(), embeddingProbeTimeoutMs() (+11 more)

### Community 36 - "AppMetricsService"
Cohesion: 0.12
Nodes (5): HttpMetricsMiddleware, Injectable, AppMetricsService, Injectable, HttpMethod

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "resilient-executor.ts"
Cohesion: 0.17
Nodes (18): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+10 more)

### Community 39 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.26
Nodes (10): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty, ApiPropertyOptional (+2 more)

### Community 40 - "api/src/app.module.ts"
Cohesion: 0.06
Nodes (46): CompanyContextModule, Module, ContentRunExecutor, isCanonicalOutlineSelection(), isMissingContentKind(), Inject, Injectable, ContentModule (+38 more)

### Community 41 - "ConfigInitCommand"
Cohesion: 0.31
Nodes (3): ConfigInitCommand, Command, Option

### Community 42 - ".completions"
Cohesion: 0.12
Nodes (20): ApiOpenAiErrorResponses(), ANTHROPIC_INTEGRATION_PATH, OPENAI_INTEGRATION_PATH, ApiBody, ApiOperation, ApiProduces, ApiResponse, Body (+12 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (28): brand, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createInvitationId(), createRequestId() (+20 more)

### Community 44 - "app-metrics.service.ts"
Cohesion: 0.13
Nodes (12): Inject, APP_METRICS_BACKEND, MetricsController, ApiOperation, ApiResponse, ApiTags, Controller, Get (+4 more)

### Community 45 - "create-feedback.use-case.ts"
Cohesion: 0.14
Nodes (15): agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_RUN_READER, FEEDBACK_BODY_MAX, FEEDBACK_REPOSITORY, FeedbackEntry, FeedbackRepository (+7 more)

### Community 46 - "should-include-redis-stack.ts"
Cohesion: 0.10
Nodes (23): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement() (+15 more)

### Community 47 - "AppMetricsModule"
Cohesion: 0.12
Nodes (13): AiMetricsModule, Global, Module, AppMetricsModule, Global, Module, ObservabilityModule, Global (+5 more)

### Community 48 - "config-generator.service.ts"
Cohesion: 0.11
Nodes (15): ConfigValidateCommand, Command, Option, CliGatewayValidatorService, Injectable, ConfigGeneratorService, Injectable, FileManagerService (+7 more)

### Community 49 - "ChatParamsDto"
Cohesion: 0.10
Nodes (22): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+14 more)

### Community 50 - "runs.controller.ts"
Cohesion: 0.03
Nodes (69): FinalizeReviewUseCase, Inject, Injectable, GetRunLogsOutput, GetRunLogsUseCase, Inject, Injectable, GetRunUseCase (+61 more)

### Community 51 - "logout-dialog.tsx"
Cohesion: 0.19
Nodes (11): logoutSession(), LogoutDialog(), confirm(), LogoutDialogProps, Dialog(), DialogContent(), DialogDescription(), DialogFooter() (+3 more)

### Community 52 - ".streamChat"
Cohesion: 0.13
Nodes (13): ChatStreamController, ApiBody, ApiOperation, ApiProduces, ApiResponse, ApiSecurity, ApiTags, Body (+5 more)

### Community 53 - "anthropic-models.controller.ts"
Cohesion: 0.13
Nodes (20): ApiAnthropicErrorResponses(), AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+12 more)

### Community 54 - "swagger.setup.ts"
Cohesion: 0.07
Nodes (38): ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString (+30 more)

### Community 55 - "company-context.controller.ts"
Cohesion: 0.14
Nodes (16): toPublicCompanyContext(), GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PatchCompanyContextUseCase (+8 more)

### Community 56 - "prisma-output-edited.adapter.ts"
Cohesion: 0.27
Nodes (6): Inject, OutputEditedWrite, OutputEditedWriter, applyWrite(), PrismaOutputEditedAdapter, Injectable

### Community 57 - "ModelAlias"
Cohesion: 0.08
Nodes (7): ProviderTestOptions, CliAiModel, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, AppMetricsBackend

### Community 58 - "HealthService"
Cohesion: 0.11
Nodes (11): HealthLivenessResponseDto, ApiProperty, HealthReadinessResponseDto, ApiProperty, HealthController, ApiTags, Controller, HealthService (+3 more)

### Community 59 - "HealthController"
Cohesion: 0.11
Nodes (14): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, HealthModule, Module (+6 more)

### Community 60 - "OllamaEmbeddingAdapter"
Cohesion: 0.27
Nodes (3): OllamaEmbeddingAdapter, Injectable, EmbeddingBackend

### Community 61 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 62 - "metrics.ts"
Cohesion: 0.07
Nodes (40): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+32 more)

### Community 63 - "LoggingService"
Cohesion: 0.09
Nodes (13): RedisCacheAdapter, Injectable, RedisConnectionService, Injectable, CacheRegistryService, Injectable, Inject, Inject (+5 more)

### Community 64 - ".info"
Cohesion: 0.11
Nodes (13): toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList(), ProviderTestCommand, Command, Option, ProviderTestService (+5 more)

### Community 65 - "GatewayModelsCatalogService"
Cohesion: 0.14
Nodes (12): ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+4 more)

### Community 67 - "CompanyContext"
Cohesion: 0.35
Nodes (3): CompanyContext, PrismaCompanyContextAdapter, Injectable

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.07
Nodes (31): IsStringOrArrayOfStrings(), OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray (+23 more)

### Community 69 - "users.controller.ts"
Cohesion: 0.08
Nodes (23): ListUsersUseCase, Inject, Injectable, ReactivateUserUseCase, Inject, Injectable, SoftDeleteUserUseCase, Inject (+15 more)

### Community 70 - "company-context-form.tsx"
Cohesion: 0.25
Nodes (8): CompanyContextExtras, GateSection, commaToList(), CompanyContextForm(), CompanyContextFormProps, extrasOrEmpty(), linesToList(), listToLines()

### Community 71 - "api-error.code.ts"
Cohesion: 0.17
Nodes (9): ApiErrorCode, DEFAULT_HTTP_STATUS_TO_CODE, ApiErrorPayload, GlobalExceptionFilter, isPayloadTooLargeError(), PayloadTooLargeError, RequestWithId, Catch (+1 more)

### Community 72 - "api/src/main.ts"
Cohesion: 0.33
Nodes (6): AppModule, Module, bootstrap(), parseCorsOrigins(), configureHttpApp(), buildSwaggerConfig()

### Community 73 - "prisma-invitation.adapter.ts"
Cohesion: 0.10
Nodes (23): Inject, InvitationListItem, Inject, RevokeInvitationUseCase, Inject, Injectable, AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult (+15 more)

### Community 74 - "ApiRequestIdHeader"
Cohesion: 0.15
Nodes (14): ApiRequestIdHeader(), ApiOkResponse, ApiOperation, Get, OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+6 more)

### Community 75 - "prisma-company-context.adapter.ts"
Cohesion: 0.16
Nodes (15): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, Completeness (+7 more)

### Community 76 - "AuthUserContext"
Cohesion: 0.06
Nodes (36): InviteUserDto, ApiProperty, IsEmail, InvitationsController, ApiCookieAuth, ApiTags, Body, Controller (+28 more)

### Community 77 - "auth.controller.ts"
Cohesion: 0.06
Nodes (34): MeUseCase, Inject, Injectable, Inject, Injectable, updateEmailSchema, UpdateMeEmailUseCase, AuthUser (+26 more)

### Community 78 - "company-context.mapper.ts"
Cohesion: 0.33
Nodes (5): companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.10
Nodes (23): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), GatewayChatResponse (+15 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - "CreateFeedbackUseCase"
Cohesion: 0.22
Nodes (7): CreateFeedbackUseCase, Inject, Injectable, FeedbackController, ApiCookieAuth, ApiTags, Controller

### Community 82 - "responses.adapter.ts"
Cohesion: 0.07
Nodes (62): toCachedChatResponse(), toHttpException(), asInputTokens(), asOutputTokens(), asSystemFingerprint(), asToolCallId(), getUsageMetadata(), buildGenerationConfig() (+54 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+2 more)

### Community 85 - "run-record.test-helpers.ts"
Cohesion: 0.19
Nodes (11): makeContentRun(), makeSocialRun(), makeSocialSnapshot(), SocialRunSnapshot, ErrorEnvelope, newConversationId(), newInvitationId(), newRequestId() (+3 more)

### Community 86 - "AuthController"
Cohesion: 0.14
Nodes (17): BootstrapStatusUseCase, Inject, Injectable, AuthController, ApiCookieAuth, ApiTags, Body, Controller (+9 more)

### Community 87 - "KeyGenerateCommand"
Cohesion: 0.33
Nodes (3): KeyGenerateCommand, Command, Option

### Community 88 - "acceptInvite"
Cohesion: 0.32
Nodes (5): AcceptInvitePageProps, acceptInvite(), AcceptInviteForm(), onSubmit(), passwordMeetsPolicy()

### Community 89 - "session-provider.tsx"
Cohesion: 0.12
Nodes (26): geistMono, geistSans, metadata, bootstrapAdmin(), Credentials, fetchBootstrapStatus(), fetchUserSession(), loginWithPassword() (+18 more)

### Community 91 - "RefreshSessionRepository"
Cohesion: 0.09
Nodes (11): Inject, Inject, LogoutUseCase, Inject, Injectable, REFRESH_SESSION_REPOSITORY, RefreshSessionRecord, RefreshSessionRepository (+3 more)

### Community 92 - ".create"
Cohesion: 0.20
Nodes (9): Body, HttpCode, Post, CreateFeedbackDto, IsIn, IsOptional, IsString, MaxLength (+1 more)

### Community 94 - "openai-params-provider.mapper.ts"
Cohesion: 0.12
Nodes (24): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+16 more)

### Community 95 - "PrometheusAppMetricsAdapter"
Cohesion: 0.11
Nodes (6): PrometheusAppMetricsAdapter, Injectable, resolveAppMetricsBackend(), AppProviderCallContext, AppProviderStreamScope, AppTokenUsage

### Community 96 - "SaveOutputEditedUseCase"
Cohesion: 0.43
Nodes (5): assertSameIds(), SaveOutputEditedUseCase, Injectable, validationFailed(), withCharacterCount()

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 99 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 100 - "openai-messages.mapper.ts"
Cohesion: 0.36
Nodes (7): mapOpenAiMessagesToGateway(), mapOpenAiToolCalls(), mapOpenAiChatRequestToGateway(), mapOpenAiToolChoice(), mapOpenAiToolsToGateway(), OpenAiFunctionTool, GatewayToolDefinition

### Community 101 - "prisma.feedback-run-reader.adapter.ts"
Cohesion: 0.33
Nodes (4): FeedbackRunLookup, FeedbackRunReader, PrismaFeedbackRunReaderAdapter, Injectable

### Community 102 - "company-context-view.tsx"
Cohesion: 0.15
Nodes (14): UsersPage(), HomeEntry(), useSession(), fetchCompanyContext(), putCompanyContext(), GATE_SECTION_LABELS, withDraftRows(), CompanyContextView() (+6 more)

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
Cohesion: 0.09
Nodes (29): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Injectable, comparePassword(), generateRefreshToken(), hashPassword(), hashRefreshToken() (+21 more)

### Community 112 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 113 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 114 - "app-header.tsx"
Cohesion: 0.11
Nodes (15): AppHeader(), AppHeaderProps, DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem() (+7 more)

### Community 115 - "CompanyContextController"
Cohesion: 0.14
Nodes (11): toCompanyContext(), toPartialCompanyContext(), CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Body, Controller (+3 more)

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 128 - "cn"
Cohesion: 0.14
Nodes (24): AcceptInviteFormProps, Button(), buttonVariants, Card(), CardAction(), CardContent(), CardDescription(), CardFooter() (+16 more)

### Community 129 - "InMemoryRunSseHub"
Cohesion: 0.29
Nodes (4): RunSseEvent, InMemoryRunSseHub, Inject, Injectable

### Community 145 - "dashboard-shell.tsx"
Cohesion: 0.14
Nodes (13): AppSidebar(), AppSidebarProps, CompletenessChipSlot(), FeedbackCtaSlot(), FloatingBoxSlot(), DashboardShell(), EventSourceRegistryContext, EventSourceRegistryProvider() (+5 more)

## Knowledge Gaps
- **315 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+310 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1010 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `LoggingService` connect `LoggingService` to `provider-instances.bootstrap.ts`, `logging.service.ts`, `branded.types.ts`, `chat-provider-call.service.ts`, `chat.service.ts`, `redis-vector-store.adapter.ts`, `ai-provider.interface.ts`, `response-cache.service.ts`, `ai-provider-gateway/src/app.module.ts`, `provider-registry.service.ts`, `ai-provider-gateway/src/main.ts`, `semantic-cache.service.ts`, `resilient-executor.ts`, `ai-provider-gateway/src/health/health.service.ts`, `swagger.setup.ts`, `HealthService`, `OllamaEmbeddingAdapter`, `api-error.code.ts`, `responses.adapter.ts`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Why does `GatewayConfig` connect `GatewayConfig` to `cli.module.ts`, `.info`, `GatewayModelsCatalogService`, `wizard-orchestrator.service.ts`, `chat.service.ts`, `models.controller.ts`, `configuration.ts`, `asProviderInstanceId`, `provider-registry.service.ts`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Why does `asProviderInstanceId()` connect `asProviderInstanceId` to `cli.module.ts`, `.info`, `GatewayModelsCatalogService`, `provider-instances.bootstrap.ts`, `branded.types.ts`, `wizard-orchestrator.service.ts`, `chat-provider-call.service.ts`, `chat.service.ts`, `models.controller.ts`, `responses.adapter.ts`, `GatewayConfig`, `configuration.ts`, `ai-provider.interface.ts`, `provider-registry.service.ts`, `metrics.ts`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _315 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `cli.module.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.066006600660066 - nodes in this community are weakly interconnected._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05232323232323232 - nodes in this community are weakly interconnected._