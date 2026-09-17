# Graph Report - content-chain  (2026-09-17)

## Corpus Check
- 589 files · ~166,093 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: (none) 3, .css 1)

## Summary
- 3823 nodes · 11728 edges · 148 communities (124 shown, 20 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 373 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `eb2efd13`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- cli.module.ts
- social.types.ts
- api/company-context.types.ts
- ProviderApiKey
- runs.types.ts
- StartRunDto
- app-metrics-backend.interface.ts
- LogContext
- types/index.ts
- provider-error.mapper.ts
- content.graph.ts
- wizard-orchestrator.service.ts
- social.graph.ts
- branded.types.ts
- chat.service.ts
- models.controller.ts
- anthropic-response.mapper.ts
- redis-vector-store.adapter.ts
- GatewayConfig
- configuration.ts
- sentry-ai-metrics.adapter.ts
- asProviderInstanceId
- ChatRequestDto
- anthropic/anthropic-tools.mapper.ts
- prisma-run.adapter.ts
- logout-dialog.tsx
- ai-provider-gateway/src/app.module.ts
- auth.module.ts
- save-output-edited.use-case.ts
- provider-registry.service.ts
- semantic-cache.constants.ts
- HealthService
- swagger.setup.ts
- http-metrics.interceptor.ts
- AnthropicMessagesRequestDto
- RedisConnectionService
- HttpMethod
- enums.ts
- anthropic.module.ts
- configuration-validation.service.ts
- RunRecord
- api/src/app.module.ts
- openai-models.controller.ts
- ids.ts
- app-metrics.service.ts
- create-feedback.use-case.ts
- should-include-redis-stack.ts
- .getOne
- config-generator.service.ts
- chat-params.dto.ts
- runs.controller.ts
- llm-hop.ts
- InProcessRunWorker
- anthropic-models.controller.ts
- api-error.code.ts
- company-context.controller.ts
- PrismaSocialResultAdapter
- ModelAlias
- ai-provider-gateway/src/health/health.service.ts
- HealthController
- RedisVectorStoreAdapter
- company-context.dto.ts
- metrics.ts
- cache.module.ts
- exitWithAgentReport
- .getOne
- UsersController
- CompanyContext
- OpenAiChatCompletionRequestDto
- InvitationsController
- chat-completions.adapter.ts
- NoopAppMetricsAdapter
- configure-swagger.ts
- prisma-invitation.adapter.ts
- GatewayModelsCatalogService
- prisma-company-context.adapter.ts
- AuthUserContext
- UserRepository
- company-context.schemas.ts
- llm-gateway.http.adapter.ts
- PrometheusService
- CreateFeedbackUseCase
- responses.adapter.ts
- SPEC — README
- ListRunsQueryDto
- start-run.use-case.ts
- EnvironmentVariables
- KeyGenerateCommand
- ChatParamsDto
- apiFetch
- GatewayKey
- RefreshSessionRepository
- .create
- HttpExceptionFilter
- openai-thinking-provider.mapper.ts
- PrometheusAppMetricsAdapter
- HealthController
- route.ts
- OpenAiChatMessageDto
- ProviderAddCommand
- provider-instances.bootstrap.ts
- PrismaService
- openai-params-provider.mapper.ts
- ClientAddCommand
- ClientEditCommand
- ClientRemoveCommand
- ModelAddCommand
- ModelEditCommand
- ConfigInitCommand
- ProviderEditCommand
- DomainException
- run-labels.ts
- ModelRemoveCommand
- ProviderRemoveCommand
- cn
- CompanyContextController
- VectorStore
- BootstrapAdminDto
- LoginDto
- openai-chat-message.dto.ts
- openai-chat-completion-request.dto.ts
- GatewayToolDefinitionDto
- Architektura
- brand.ts
- ConfigValidateCommand
- OpenAiExceptionFilter
- acceptInvite
- InMemoryRunSseHub
- RolesGuard
- SseMetaPayloadDto
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
- .constructor
- dashboard-shell.tsx
- .constructor
- .constructor

## God Nodes (most connected - your core abstractions)
1. `ModelAlias` - 88 edges
2. `ProviderInstanceId` - 81 edges
3. `LoggingService` - 73 edges
4. `asProviderInstanceId()` - 67 edges
5. `DomainException` - 66 edges
6. `GatewayConfig` - 65 edges
7. `GatewayKey` - 59 edges
8. `ClientId` - 54 edges
9. `cn()` - 51 edges
10. `ChatRequestDto` - 48 edges

## Surprising Connections (you probably didn't know these)
- `toChatResponseDto()` --indirect_call--> `toGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/chat/dto/chat-response.dto.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `RunStatusView()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/modules/runs/components/run-status.tsx → apps/frontend/src/shared/utils/utils.ts
- `DialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/dialog.tsx → apps/frontend/src/shared/utils/utils.ts
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `RedisConnectionService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-connection.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (148 total, 20 thin omitted)

### Community 0 - "cli.module.ts"
Cohesion: 0.06
Nodes (59): AgentReport, AgentReportStatus, loadAnswers(), assertAgentHasAnswers(), CliMode, CliModeFlags, markAgentRuntime(), resolveCliMode() (+51 more)

### Community 1 - "social.types.ts"
Cohesion: 0.07
Nodes (30): ContentPipelineInput, ContentRefineSnapshot, PageDocument, PageOutlineSection, PageOutlineSectionRole, CompositeRunResultReader, GetRunOutput, orderItemsBySelectedIds() (+22 more)

### Community 2 - "api/company-context.types.ts"
Cohesion: 0.09
Nodes (40): fetchCompanyContext(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras, companyContextForPut(), CompanyContextObjection (+32 more)

### Community 3 - "ProviderApiKey"
Cohesion: 0.20
Nodes (6): ProviderTestCommand, Command, Option, ProviderTestService, Injectable, ProviderApiKey

### Community 4 - "runs.types.ts"
Cohesion: 0.07
Nodes (54): ArchiveRunsQuery, fetchArchiveRuns(), fetchInitiatorOptions(), fetchRunLogs(), fetchRunSnapshot(), fetchUserRuns(), InitiatorOption, startRun() (+46 more)

### Community 5 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 6 - "app-metrics-backend.interface.ts"
Cohesion: 0.18
Nodes (11): healthStatusToGaugeValue(), AppRequestLabels, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus, HttpRequestLabels (+3 more)

### Community 7 - "LogContext"
Cohesion: 0.05
Nodes (26): GlobalExceptionFilter, isPayloadTooLargeError(), Catch, Injectable, ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter (+18 more)

### Community 8 - "types/index.ts"
Cohesion: 0.08
Nodes (44): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+36 more)

### Community 9 - "provider-error.mapper.ts"
Cohesion: 0.26
Nodes (17): MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isRateLimitStatus(), isServerError(), isTimeoutStatus(), nameLooksLikeTimeout() (+9 more)

### Community 10 - "content.graph.ts"
Cohesion: 0.12
Nodes (32): coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema, pageOutlineSectionSchema, readNonEmptyString() (+24 more)

### Community 11 - "wizard-orchestrator.service.ts"
Cohesion: 0.06
Nodes (60): WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, InitAnswers, CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema, convertClient() (+52 more)

### Community 12 - "social.graph.ts"
Cohesion: 0.11
Nodes (37): CompanyContextRepository, LlmHopService, Injectable, coercePassNoteVerdict(), isPassOnlyIssue(), Inject, ideasOutputSchema, reelIdeasOutputSchema (+29 more)

### Community 13 - "branded.types.ts"
Cohesion: 0.10
Nodes (43): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatResponseData, SseMetaPayload (+35 more)

### Community 14 - "chat.service.ts"
Cohesion: 0.05
Nodes (54): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Inject, Injectable, OllamaEmbeddingAdapter, Injectable (+46 more)

### Community 15 - "models.controller.ts"
Cohesion: 0.24
Nodes (9): ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, GatewayModelCapabilitiesDto, GatewayModelDto, ApiProperty, ApiPropertyOptional, ModelsListResponseDto (+1 more)

### Community 16 - "anthropic-response.mapper.ts"
Cohesion: 0.07
Nodes (51): ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString, SseDoneEvent, fromGatewayToolCallDto() (+43 more)

### Community 17 - "redis-vector-store.adapter.ts"
Cohesion: 0.20
Nodes (16): isUnservableCachedReply(), parseCachedChatResponse(), escapeRedisSearchTag(), asString(), ParsedKnnHits, parseKnnHits(), isRedisSearchIndexAlreadyExistsError(), isRedisSearchMissingIndexError() (+8 more)

### Community 18 - "GatewayConfig"
Cohesion: 0.08
Nodes (23): PendingSecretsItem, assertInteractiveAllowed(), convertModel(), EnvPatchService, Injectable, defaultModelPolicy(), ModelManagerService, Injectable (+15 more)

### Community 19 - "configuration.ts"
Cohesion: 0.11
Nodes (19): asSemanticCacheTtlSeconds(), AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig, SemanticCacheRuntimeConfig, BuildEffectiveGatewayConfigOptions, readRequiredPrompt() (+11 more)

### Community 20 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.09
Nodes (28): NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes(), clearLlmScopeContext() (+20 more)

### Community 21 - "asProviderInstanceId"
Cohesion: 0.07
Nodes (62): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, collectPendingSecrets(), DEFAULT_MODELS, DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens() (+54 more)

### Community 22 - "ChatRequestDto"
Cohesion: 0.04
Nodes (58): ApiHeader, ApiBody, ApiOperation, ApiResponse, Body, Post, Req, ChatService (+50 more)

### Community 23 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.11
Nodes (35): ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent(), isAnthropicEffortLevel(), mapThinkingBudgetToAnthropicEffort(), mapThinkingToAnthropic(), resolveAnthropicOutputConfig(), ContentBlockParam (+27 more)

### Community 24 - "prisma-run.adapter.ts"
Cohesion: 0.10
Nodes (13): socialBriefSchema, LightRunItem, ListRunsResult, RunSnapshot, RunLogEntry, assertTransition(), PrismaRunAdapter, RunLogRow (+5 more)

### Community 25 - "logout-dialog.tsx"
Cohesion: 0.13
Nodes (14): UsersPage(), logoutSession(), HomeEntry(), useSession(), LogoutDialog(), confirm(), LogoutDialogProps, Dialog() (+6 more)

### Community 26 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.09
Nodes (19): HealthModule, Module, LoggingModule, Global, Module, ObservabilityModule, Global, Module (+11 more)

### Community 27 - "auth.module.ts"
Cohesion: 0.04
Nodes (73): comparePassword(), generateRefreshToken(), hashRefreshToken(), parseTtlMs(), parseTtlSeconds(), AuthTokenResult, BootstrapStatusUseCase, Injectable (+65 more)

### Community 28 - "save-output-edited.use-case.ts"
Cohesion: 0.09
Nodes (33): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+25 more)

### Community 29 - "provider-registry.service.ts"
Cohesion: 0.11
Nodes (16): CompleteOnceResult, ChatValidationService, Injectable, UnsupportedProviderException, ModelId, GatewayCapabilitiesConfig, GatewayModelConfig, GatewayParamsConfig (+8 more)

### Community 30 - "semantic-cache.constants.ts"
Cohesion: 0.14
Nodes (11): EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema(), EMBEDDING_CIRCUIT_COOLDOWN_MS, EMBEDDING_CIRCUIT_OPEN_AFTER, EMBEDDING_PROBE_TIMEOUT_MS (+3 more)

### Community 31 - "HealthService"
Cohesion: 0.15
Nodes (6): HealthReadinessResponseDto, ApiProperty, HealthService, Inject, Injectable, Optional

### Community 32 - "swagger.setup.ts"
Cohesion: 0.09
Nodes (28): AppModule, Module, ChatOutputTextDto, ApiProperty, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsOptional (+20 more)

### Community 33 - "http-metrics.interceptor.ts"
Cohesion: 0.11
Nodes (18): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, MetricsController, Controller, Get (+10 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "RedisConnectionService"
Cohesion: 0.20
Nodes (5): RedisCacheModule, Module, RedisConnectionService, Injectable, isRedisRequiredFromConfig()

### Community 36 - "HttpMethod"
Cohesion: 0.24
Nodes (3): HttpMetricsMiddleware, Injectable, HttpMethod

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "anthropic.module.ts"
Cohesion: 0.21
Nodes (10): ChatModule, Module, AnthropicModule, Module, IntegrationsModule, Module, OpenAiModule, Module (+2 more)

### Community 39 - "configuration-validation.service.ts"
Cohesion: 0.19
Nodes (14): CliValidateOptions, collectInactiveProviderWarnings(), formatZodIssues(), validateGatewayConfig(), ValidationOptions, ValidationResult, buildEffectiveGatewayConfig(), assertEnabledProviderSecretsPresent() (+6 more)

### Community 40 - "RunRecord"
Cohesion: 0.13
Nodes (20): RunDispatchExecutor, RunExecutorPort, isSocialRunRecord(), RunRecord, RunRecordBase, SocialRunRecord, StubRunExecutor, Injectable (+12 more)

### Community 41 - "api/src/app.module.ts"
Cohesion: 0.06
Nodes (38): AuthModule, Module, CompanyContextModule, Module, ContentPipelineFacade, toOutcome(), Inject, Injectable (+30 more)

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.27
Nodes (10): ApiOpenAiErrorResponses(), OpenAiErrorBodyDto, OpenAiErrorResponseDto, ApiProperty, ApiPropertyOptional, OpenAiModelDto, OpenAiModelsListResponseDto, ApiProperty (+2 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (28): brand, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createInvitationId(), createRequestId() (+20 more)

### Community 44 - "app-metrics.service.ts"
Cohesion: 0.11
Nodes (13): ActiveStreamsTracker, Injectable, APP_METRICS_BACKEND, MetricsController, ApiOperation, ApiResponse, ApiTags, Controller (+5 more)

### Community 45 - "create-feedback.use-case.ts"
Cohesion: 0.18
Nodes (12): agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_RUN_READER, FEEDBACK_BODY_MAX, FEEDBACK_REPOSITORY, FeedbackEntry, FeedbackRepository (+4 more)

### Community 46 - "should-include-redis-stack.ts"
Cohesion: 0.18
Nodes (12): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement() (+4 more)

### Community 47 - ".getOne"
Cohesion: 0.19
Nodes (11): ApiAnthropicErrorResponses(), AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+3 more)

### Community 48 - "config-generator.service.ts"
Cohesion: 0.09
Nodes (15): ConfigGeneratorService, Injectable, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable, FileManagerService, Injectable, WizardRunResult (+7 more)

### Community 49 - "chat-params.dto.ts"
Cohesion: 0.24
Nodes (7): ResponseFormatDto, ApiProperty, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsThinkingBudget()

### Community 50 - "runs.controller.ts"
Cohesion: 0.04
Nodes (60): FinalizeReviewUseCase, Inject, Injectable, GetRunLogsOutput, GetRunLogsUseCase, Inject, Injectable, GetRunUseCase (+52 more)

### Community 51 - "llm-hop.ts"
Cohesion: 0.18
Nodes (11): LLM_GATEWAY_PORT, isRetryable(), RetryReason, ChatJsonInput, hopErrorLogMessage(), hopUserContent(), isHopRetryable(), isStructuredOutputInvalid() (+3 more)

### Community 53 - "anthropic-models.controller.ts"
Cohesion: 0.23
Nodes (11): AnthropicErrorBodyDto, AnthropicErrorResponseDto, ApiProperty, AnthropicModelDto, AnthropicModelsListResponseDto, ApiProperty, mapGatewayModelsListToAnthropic(), mapGatewayModelToAnthropic() (+3 more)

### Community 54 - "api-error.code.ts"
Cohesion: 0.06
Nodes (37): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+29 more)

### Community 55 - "company-context.controller.ts"
Cohesion: 0.18
Nodes (15): toCompanyContext(), toPartialCompanyContext(), toPublicCompanyContext(), GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Injectable (+7 more)

### Community 56 - "PrismaSocialResultAdapter"
Cohesion: 0.09
Nodes (10): Inject, OutputEditedWrite, OutputEditedWriter, applyWrite(), PrismaOutputEditedAdapter, Injectable, toInputJson(), PipelineState (+2 more)

### Community 57 - "ModelAlias"
Cohesion: 0.08
Nodes (7): ProviderTestOptions, ModelAlias, ProviderInstanceId, AppMetricsService, Inject, Injectable, AppMetricsBackend

### Community 58 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.13
Nodes (17): EMBEDDING_BACKEND, VECTOR_STORE, RedisConsumer, HealthCheckItemDto, ApiProperty, HealthLivenessResponseDto, ApiProperty, HealthReadinessChecksDto (+9 more)

### Community 59 - "HealthController"
Cohesion: 0.11
Nodes (14): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, HealthModule, Module (+6 more)

### Community 60 - "RedisVectorStoreAdapter"
Cohesion: 0.26
Nodes (4): RedisVectorStoreAdapter, Injectable, VectorSearchHit, VectorStoreKnnInput

### Community 61 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 62 - "metrics.ts"
Cohesion: 0.12
Nodes (25): getClientConversationId(), getOrCreateConversationIdForResponse(), buildAppProviderMetricsContext(), buildLlmMetricsContext(), mapProviderResponseToAiObservation(), mapProviderResponseToUsage(), toMetricsMessages(), buildProviderInputForAlias() (+17 more)

### Community 63 - "cache.module.ts"
Cohesion: 0.10
Nodes (17): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, CacheModule, CacheModuleOptions (+9 more)

### Community 64 - "exitWithAgentReport"
Cohesion: 0.14
Nodes (14): emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList(), CliGatewayValidatorService (+6 more)

### Community 65 - ".getOne"
Cohesion: 0.19
Nodes (11): ApiGatewayModelsErrorResponses(), ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+3 more)

### Community 66 - "UsersController"
Cohesion: 0.13
Nodes (14): PatchUserDto, ApiProperty, IsBoolean, ApiCookieAuth, ApiTags, Body, Controller, Delete (+6 more)

### Community 67 - "CompanyContext"
Cohesion: 0.30
Nodes (3): CompanyContext, PrismaCompanyContextAdapter, Injectable

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (18): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+10 more)

### Community 69 - "InvitationsController"
Cohesion: 0.13
Nodes (13): InviteUserDto, ApiProperty, IsEmail, InvitationsController, ApiCookieAuth, ApiTags, Body, Controller (+5 more)

### Community 70 - "chat-completions.adapter.ts"
Cohesion: 0.26
Nodes (13): toHttpException(), ChatCompletionsAdapterOptions, createChatCompletionsAdapter(), textStream(), ChatCompletionMessageParam, mapAssistantTurn(), mapTurnsToOpenAiMessages(), accumulateOpenAiStreamToolCallDeltas() (+5 more)

### Community 71 - "NoopAppMetricsAdapter"
Cohesion: 0.12
Nodes (3): NoopAppMetricsAdapter, Injectable, resolveAppMetricsBackend()

### Community 72 - "configure-swagger.ts"
Cohesion: 0.24
Nodes (8): AppModule, Module, bootstrap(), parseCorsOrigins(), configureHttpApp(), ACCESS_COOKIE_NAME, buildSwaggerConfig(), COOKIE_AUTH_NAME

### Community 73 - "prisma-invitation.adapter.ts"
Cohesion: 0.17
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 74 - "GatewayModelsCatalogService"
Cohesion: 0.14
Nodes (12): OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+4 more)

### Community 75 - "prisma-company-context.adapter.ts"
Cohesion: 0.16
Nodes (15): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, Completeness (+7 more)

### Community 76 - "AuthUserContext"
Cohesion: 0.09
Nodes (23): MeUseCase, Injectable, Get, isRecord(), isTerminalStatus(), RunsController, ApiCookieAuth, ApiTags (+15 more)

### Community 77 - "UserRepository"
Cohesion: 0.07
Nodes (18): Inject, Inject, Inject, Inject, Inject, Inject, Inject, Inject (+10 more)

### Community 78 - "company-context.schemas.ts"
Cohesion: 0.33
Nodes (5): companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.11
Nodes (22): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), LlmGatewayError (+14 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - "CreateFeedbackUseCase"
Cohesion: 0.22
Nodes (7): CreateFeedbackUseCase, Inject, Injectable, FeedbackController, ApiCookieAuth, ApiTags, Controller

### Community 82 - "responses.adapter.ts"
Cohesion: 0.08
Nodes (54): toCachedChatResponse(), asInputTokens(), asOutputTokens(), asSystemFingerprint(), asToolCallId(), buildGenerationConfig(), createGoogleProvider(), getFinalToolCalls() (+46 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+2 more)

### Community 85 - "start-run.use-case.ts"
Cohesion: 0.10
Nodes (24): contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, socialStartRunSchema (+16 more)

### Community 86 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 87 - "KeyGenerateCommand"
Cohesion: 0.33
Nodes (3): KeyGenerateCommand, Command, Option

### Community 88 - "ChatParamsDto"
Cohesion: 0.20
Nodes (10): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+2 more)

### Community 89 - "apiFetch"
Cohesion: 0.12
Nodes (26): geistMono, geistSans, metadata, bootstrapAdmin(), Credentials, fetchBootstrapStatus(), fetchUserSession(), loginWithPassword() (+18 more)

### Community 90 - "GatewayKey"
Cohesion: 0.05
Nodes (50): GATEWAY_CACHE_HEADER, ChatController, ApiSecurity, ApiTags, Controller, CHAT_STREAM_API_DESCRIPTION, SseSerializer, ApiGatewayChatErrorResponses() (+42 more)

### Community 91 - "RefreshSessionRepository"
Cohesion: 0.14
Nodes (6): Inject, RefreshSessionRecord, RefreshSessionRepository, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable

### Community 92 - ".create"
Cohesion: 0.20
Nodes (9): Body, HttpCode, Post, CreateFeedbackDto, IsIn, IsOptional, IsString, MaxLength (+1 more)

### Community 94 - "openai-thinking-provider.mapper.ts"
Cohesion: 0.11
Nodes (24): ChatWarningDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString, SseDonePayloadDto, SseDoneUsageDto, ApiPropertyOptional (+16 more)

### Community 95 - "PrometheusAppMetricsAdapter"
Cohesion: 0.11
Nodes (5): PrometheusAppMetricsAdapter, Injectable, AppProviderCallContext, AppProviderStreamScope, AppTokenUsage

### Community 96 - "HealthController"
Cohesion: 0.31
Nodes (6): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 98 - "OpenAiChatMessageDto"
Cohesion: 0.22
Nodes (9): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+1 more)

### Community 99 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 100 - "provider-instances.bootstrap.ts"
Cohesion: 0.30
Nodes (9): assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryFn, OpenAiProviderConfig (+1 more)

### Community 101 - "PrismaService"
Cohesion: 0.11
Nodes (9): FeedbackRunLookup, FeedbackRunReader, PrismaFeedbackRunReaderAdapter, Injectable, PrismaModule, Global, Module, PrismaService (+1 more)

### Community 102 - "openai-params-provider.mapper.ts"
Cohesion: 0.22
Nodes (12): mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses(), mapStopSequences(), OpenAiSharedChatCompletionParams, OpenAiSharedResponsesParams (+4 more)

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

### Community 108 - "ConfigInitCommand"
Cohesion: 0.31
Nodes (3): ConfigInitCommand, Command, Option

### Community 109 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 110 - "DomainException"
Cohesion: 0.07
Nodes (34): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Inject, Injectable, hashPassword(), BootstrapAdminInput, bootstrapAdminSchema (+26 more)

### Community 111 - "run-labels.ts"
Cohesion: 0.24
Nodes (8): CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS, RUN_TASK_TYPE_LABELS, RunStatusView(), RunStatusViewProps

### Community 112 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 113 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 114 - "cn"
Cohesion: 0.08
Nodes (38): AcceptInviteFormProps, AppHeaderProps, Button(), buttonVariants, Card(), CardAction(), CardContent(), CardDescription() (+30 more)

### Community 115 - "CompanyContextController"
Cohesion: 0.16
Nodes (9): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Body, Controller, Get, Patch (+1 more)

### Community 117 - "BootstrapAdminDto"
Cohesion: 0.33
Nodes (5): BootstrapAdminDto, ApiProperty, IsEmail, IsString, MinLength

### Community 119 - "LoginDto"
Cohesion: 0.33
Nodes (5): LoginDto, ApiProperty, IsEmail, IsString, MinLength

### Community 120 - "openai-chat-message.dto.ts"
Cohesion: 0.60
Nodes (3): isTextContentItem(), normalizeOpenAiContent(), TextContentItem

### Community 123 - "GatewayToolDefinitionDto"
Cohesion: 0.29
Nodes (6): GatewayToolDefinitionDto, ApiProperty, ApiPropertyOptional, IsObject, IsOptional, IsString

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 126 - "ConfigValidateCommand"
Cohesion: 0.40
Nodes (3): ConfigValidateCommand, Command, Option

### Community 128 - "acceptInvite"
Cohesion: 0.32
Nodes (5): AcceptInvitePageProps, acceptInvite(), AcceptInviteForm(), onSubmit(), passwordMeetsPolicy()

### Community 129 - "InMemoryRunSseHub"
Cohesion: 0.27
Nodes (4): RunSseEvent, InMemoryRunSseHub, Inject, Injectable

### Community 131 - "SseMetaPayloadDto"
Cohesion: 0.67
Nodes (3): SseMetaPayloadDto, ApiProperty, ApiPropertyOptional

### Community 145 - "dashboard-shell.tsx"
Cohesion: 0.08
Nodes (26): fetchCompleteness(), CompletenessState, GATE_SECTION_LABELS, CompletenessChip(), CompletenessContext, CompletenessContextValue, CompletenessProvider(), FALLBACK_ENVELOPE (+18 more)

## Knowledge Gaps
- **337 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+332 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1033 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `LoggingService` connect `chat.service.ts` to `swagger.setup.ts`, `RedisConnectionService`, `ai-provider-gateway/src/health/health.service.ts`, `provider-instances.bootstrap.ts`, `chat-completions.adapter.ts`, `LogContext`, `types/index.ts`, `ai-provider-gateway/src/app.module.ts`, `HealthService`, `redis-vector-store.adapter.ts`, `responses.adapter.ts`, `anthropic/anthropic-tools.mapper.ts`, `ChatRequestDto`, `api-error.code.ts`, `GatewayKey`, `RedisVectorStoreAdapter`, `provider-registry.service.ts`, `cache.module.ts`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Why does `GatewayConfig` connect `GatewayConfig` to `cli.module.ts`, `exitWithAgentReport`, `ProviderApiKey`, `configuration-validation.service.ts`, `GatewayModelsCatalogService`, `wizard-orchestrator.service.ts`, `chat.service.ts`, `models.controller.ts`, `config-generator.service.ts`, `configuration.ts`, `asProviderInstanceId`, `provider-registry.service.ts`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Why does `asProviderInstanceId()` connect `asProviderInstanceId` to `cli.module.ts`, `exitWithAgentReport`, `ProviderApiKey`, `provider-instances.bootstrap.ts`, `types/index.ts`, `GatewayModelsCatalogService`, `wizard-orchestrator.service.ts`, `branded.types.ts`, `chat.service.ts`, `models.controller.ts`, `responses.adapter.ts`, `GatewayConfig`, `configuration.ts`, `ChatRequestDto`, `GatewayKey`, `provider-registry.service.ts`, `metrics.ts`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _337 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `cli.module.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06459078476751526 - nodes in this community are weakly interconnected._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06641198942109904 - nodes in this community are weakly interconnected._