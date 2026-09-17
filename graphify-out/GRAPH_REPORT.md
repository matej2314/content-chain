# Graph Report - content-chain  (2026-09-17)

## Corpus Check
- 592 files · ~167,030 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: (none) 3, .css 1)

## Summary
- 3835 nodes · 11776 edges · 135 communities (121 shown, 12 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 373 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `17be8429`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- cli.module.ts
- social.types.ts
- api/company-context.types.ts
- provider-manager.service.ts
- runs.types.ts
- StartRunDto
- app-metrics-backend.interface.ts
- logging.service.ts
- types/index.ts
- provider-error.mapper.ts
- llm-hop.ts
- wizard-orchestrator.service.ts
- social.graph.ts
- branded.types.ts
- semantic-cache.service.ts
- models.controller.ts
- anthropic-response.mapper.ts
- redis-vector-store.adapter.ts
- asProviderInstanceId
- configuration.ts
- sentry-ai-metrics.adapter.ts
- gateway-config.schema.ts
- anthropic-messages.controller.ts
- anthropic/anthropic-tools.mapper.ts
- run.port.ts
- content.types.ts
- ai-provider-gateway/src/app.module.ts
- auth.controller.ts
- save-output-edited.use-case.ts
- chat.service.ts
- semantic-cache.constants.ts
- HealthService
- swagger.setup.ts
- http-metrics.interceptor.ts
- AnthropicMessagesRequestDto
- RedisConnectionService
- AppMetricsService
- enums.ts
- anthropic.module.ts
- ChatResponseDto
- runs.module.ts
- api/src/app.module.ts
- openai-models.controller.ts
- ids.ts
- app-metrics.service.ts
- openai-stream.mapper.ts
- should-include-redis-stack.ts
- anthropic-models.controller.ts
- config-generator.service.ts
- chat-params.dto.ts
- runs.controller.ts
- LlmGatewayHttpAdapter
- RunRepository
- run.schemas.ts
- LoggingService
- company-context.controller.ts
- prisma-output-edited.adapter.ts
- ModelAlias
- health-readiness-response.dto.ts
- HealthController
- metrics.module.ts
- company-context.dto.ts
- metrics.ts
- response-cache.service.ts
- .error
- content.schemas.ts
- users.controller.ts
- CompanyContextRepository
- OpenAiChatCompletionRequestDto
- auth.module.ts
- resolve-provider-call-options.ts
- ClientId
- auth.schemas.ts
- prisma-invitation.adapter.ts
- BootstrapStatusUseCase
- prisma-company-context.adapter.ts
- AuthUserContext
- UserRepository
- company-context.mapper.ts
- llm-gateway.http.adapter.ts
- PrometheusService
- public.decorator.ts
- responses.adapter.ts
- SPEC — README
- ListRunsQueryDto
- run.types.ts
- EnvironmentVariables
- KeyGenerateCommand
- ChatParamsDto
- apiFetch
- getAppConfig
- PrismaRefreshSessionAdapter
- GatewayNamedToolChoiceFunctionDto
- new-ids.ts
- ProviderCallOptions
- PrometheusAppMetricsAdapter
- HealthController
- route.ts
- OpenAiChatMessageDto
- ProviderAddCommand
- provider-instances.bootstrap.ts
- PrismaService
- ClientAddCommand
- ClientEditCommand
- ClientRemoveCommand
- ModelAddCommand
- ModelEditCommand
- ConfigInitCommand
- ProviderEditCommand
- DomainException
- start-run-form.tsx
- ModelRemoveCommand
- ProviderRemoveCommand
- cn
- CompanyContextController
- openai-chat-message.dto.ts
- openai-chat-completion-request.dto.ts
- Architektura
- brand.ts
- ConfigValidateCommand
- login-card.tsx
- RunSseHub
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
9. `cn()` - 53 edges
10. `ChatRequestDto` - 48 edges

## Surprising Connections (you probably didn't know these)
- `toChatResponseDto()` --indirect_call--> `toGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/chat/dto/chat-response.dto.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `mapGatewayResponseToAnthropicFormat()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/anthropic/mappers/anthropic-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `optionalEnvRefSchema` --calls--> `asEnvRef()`  [EXTRACTED]
  apps/ai-provider-gateway/src/config/gateway-config.schema.ts → apps/ai-provider-gateway/src/common/types/branded.types.ts
- `RunStatusView()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/modules/runs/components/run-status.tsx → apps/frontend/src/shared/utils/utils.ts
- `CardDescription()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/card.tsx → apps/frontend/src/shared/utils/utils.ts

## Import Cycles
- None detected.

## Communities (135 total, 12 thin omitted)

### Community 0 - "cli.module.ts"
Cohesion: 0.07
Nodes (61): AgentReport, AgentReportStatus, emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), loadAnswers(), assertAgentHasAnswers(), CliMode (+53 more)

### Community 1 - "social.types.ts"
Cohesion: 0.06
Nodes (29): CompositeRunResultReader, GetRunOutput, orderItemsBySelectedIds(), RunResultReader, ContentBrief, SocialBrief, EmptyRunResultReader, Injectable (+21 more)

### Community 2 - "api/company-context.types.ts"
Cohesion: 0.07
Nodes (46): fetchCompanyContext(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras, companyContextForPut(), CompanyContextObjection (+38 more)

### Community 3 - "provider-manager.service.ts"
Cohesion: 0.07
Nodes (39): PendingSecretsItem, collectPendingSecrets(), ProviderTestCommand, Command, Option, convertProvider(), CliAiProvider, EnvPatchService (+31 more)

### Community 4 - "runs.types.ts"
Cohesion: 0.07
Nodes (51): ArchiveRunsQuery, fetchArchiveRuns(), fetchRunLogs(), fetchRunSnapshot(), fetchUserRuns(), InitiatorOption, ArchiveRunItem, ArchiveRunsPage (+43 more)

### Community 5 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 6 - "app-metrics-backend.interface.ts"
Cohesion: 0.17
Nodes (10): healthStatusToGaugeValue(), AppRequestLabels, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus, HttpMethod (+2 more)

### Community 7 - "logging.service.ts"
Cohesion: 0.07
Nodes (25): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+17 more)

### Community 8 - "types/index.ts"
Cohesion: 0.08
Nodes (44): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+36 more)

### Community 9 - "provider-error.mapper.ts"
Cohesion: 0.19
Nodes (20): MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isProviderRateLimitError(), isRateLimitStatus(), isServerError(), isTimeoutStatus() (+12 more)

### Community 10 - "llm-hop.ts"
Cohesion: 0.10
Nodes (40): ContentPipelineFacade, Inject, Injectable, Inject, pageOutlineOutputSchema, ContentResultStore, canRefine(), MAX_REFINE (+32 more)

### Community 11 - "wizard-orchestrator.service.ts"
Cohesion: 0.06
Nodes (57): WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, InitAnswers, CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema, convertClient() (+49 more)

### Community 12 - "social.graph.ts"
Cohesion: 0.13
Nodes (32): coercePassNoteVerdict(), isPassOnlyIssue(), ideasOutputSchema, reelIdeasOutputSchema, isReelTaskType(), ReelTaskType, canRefine(), MAX_REFINE (+24 more)

### Community 13 - "branded.types.ts"
Cohesion: 0.08
Nodes (53): CachedChatResponse, CachedChatWarning, CachedFinishReason, CacheIdentityMessage, ChatCacheSource, ChatResponseData, SseMetaPayload, SseMetaPayloadDto (+45 more)

### Community 14 - "semantic-cache.service.ts"
Cohesion: 0.10
Nodes (23): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, OllamaEmbeddingAdapter, Injectable, EmbeddingBackend (+15 more)

### Community 15 - "models.controller.ts"
Cohesion: 0.10
Nodes (22): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+14 more)

### Community 16 - "anthropic-response.mapper.ts"
Cohesion: 0.13
Nodes (25): SseDoneEvent, asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto, AnthropicTextContentBlockDto (+17 more)

### Community 17 - "redis-vector-store.adapter.ts"
Cohesion: 0.12
Nodes (21): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), asString(), ParsedKnnHits, parseKnnHits() (+13 more)

### Community 18 - "asProviderInstanceId"
Cohesion: 0.10
Nodes (21): assertInteractiveAllowed(), convertModel(), defaultModelPolicy(), ModelManagerService, Injectable, ProviderManagerService, Injectable, AddModelInput (+13 more)

### Community 19 - "configuration.ts"
Cohesion: 0.08
Nodes (32): CliValidateOptions, asSemanticCacheTtlSeconds(), AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig, SemanticCacheRuntimeConfig, collectInactiveProviderWarnings() (+24 more)

### Community 20 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.11
Nodes (27): CostUsd, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes() (+19 more)

### Community 21 - "gateway-config.schema.ts"
Cohesion: 0.08
Nodes (37): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, DEFAULT_MODELS, DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel() (+29 more)

### Community 22 - "anthropic-messages.controller.ts"
Cohesion: 0.04
Nodes (70): ApiHeader, GATEWAY_CACHE_HEADER, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags (+62 more)

### Community 23 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.09
Nodes (39): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent() (+31 more)

### Community 24 - "run.port.ts"
Cohesion: 0.09
Nodes (17): ListRunsOutput, LightRunItem, ListRunsQuery, ListRunsResult, PAGE_SIZE, RunSnapshot, RunStartedBy, RunLogEntry (+9 more)

### Community 25 - "content.types.ts"
Cohesion: 0.11
Nodes (13): toOutcome(), ContentPipelineInput, ContentPipelineOutcome, ContentPipelineState, ContentRefineSnapshot, PageDocument, PageOutline, PageOutlineSection (+5 more)

### Community 26 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.09
Nodes (22): HealthModule, Module, IntegrationsModule, Module, AiMetricsModule, Global, Module, AppMetricsModule (+14 more)

### Community 27 - "auth.controller.ts"
Cohesion: 0.05
Nodes (59): comparePassword(), generateRefreshToken(), hashRefreshToken(), parseTtlMs(), parseTtlSeconds(), AuthTokenResult, BootstrapAdminUseCase, Inject (+51 more)

### Community 28 - "save-output-edited.use-case.ts"
Cohesion: 0.09
Nodes (33): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+25 more)

### Community 29 - "chat.service.ts"
Cohesion: 0.04
Nodes (60): SemanticStoreEmbedState, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize (+52 more)

### Community 30 - "semantic-cache.constants.ts"
Cohesion: 0.14
Nodes (11): EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema(), EMBEDDING_CIRCUIT_COOLDOWN_MS, EMBEDDING_CIRCUIT_OPEN_AFTER, EMBEDDING_PROBE_TIMEOUT_MS (+3 more)

### Community 31 - "HealthService"
Cohesion: 0.17
Nodes (5): HealthLivenessResponseDto, ApiProperty, HealthReadinessResponseDto, HealthService, Injectable

### Community 32 - "swagger.setup.ts"
Cohesion: 0.09
Nodes (25): AppModule, Module, SseDeltaPayloadDto, ApiProperty, GatewayToolDefinitionDto, ApiProperty, ApiPropertyOptional, IsObject (+17 more)

### Community 33 - "http-metrics.interceptor.ts"
Cohesion: 0.21
Nodes (10): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, gatewayErrorsTotal, httpRequestDurationSeconds, httpRequestsTotal (+2 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "RedisConnectionService"
Cohesion: 0.30
Nodes (3): RedisConnectionService, Injectable, isRedisRequiredFromConfig()

### Community 36 - "AppMetricsService"
Cohesion: 0.11
Nodes (7): HttpMetricsMiddleware, Injectable, Inject, Optional, AppMetricsService, Inject, Injectable

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "anthropic.module.ts"
Cohesion: 0.25
Nodes (8): ChatModule, Module, AnthropicModule, Module, OpenAiModule, Module, ModelsModule, Module

### Community 39 - "ChatResponseDto"
Cohesion: 0.09
Nodes (22): ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString (+14 more)

### Community 40 - "runs.module.ts"
Cohesion: 0.12
Nodes (19): Inject, RecoverInterruptedRunsUseCase, Inject, Injectable, RunDispatchExecutor, RunLifecycleService, TransitionExtras, Injectable (+11 more)

### Community 41 - "api/src/app.module.ts"
Cohesion: 0.07
Nodes (38): AuthModule, Module, CompanyContextModule, Module, ContentRunExecutor, isCanonicalOutlineSelection(), isMissingContentKind(), Injectable (+30 more)

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.13
Nodes (21): ApiOpenAiErrorResponses(), OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+13 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (28): brand, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createInvitationId(), createRequestId() (+20 more)

### Community 44 - "app-metrics.service.ts"
Cohesion: 0.13
Nodes (13): HealthCheckResult, HealthRedisCheckResult, APP_METRICS_BACKEND, MetricsController, ApiOperation, ApiResponse, ApiTags, Controller (+5 more)

### Community 45 - "openai-stream.mapper.ts"
Cohesion: 0.17
Nodes (21): fromGatewayToolCallDto(), OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty (+13 more)

### Community 46 - "should-include-redis-stack.ts"
Cohesion: 0.18
Nodes (11): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis() (+3 more)

### Community 47 - "anthropic-models.controller.ts"
Cohesion: 0.13
Nodes (21): ApiAnthropicErrorResponses(), AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+13 more)

### Community 48 - "config-generator.service.ts"
Cohesion: 0.08
Nodes (21): isRedisRequired(), CliGatewayValidatorService, Injectable, WizardState, ConfigGeneratorService, Injectable, ConfigPersistenceService, Injectable (+13 more)

### Community 49 - "chat-params.dto.ts"
Cohesion: 0.24
Nodes (7): ResponseFormatDto, ApiProperty, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsThinkingBudget()

### Community 50 - "runs.controller.ts"
Cohesion: 0.06
Nodes (28): FinalizeReviewUseCase, Inject, Injectable, GetRunUseCase, Inject, Injectable, ListRunsUseCase, Inject (+20 more)

### Community 51 - "LlmGatewayHttpAdapter"
Cohesion: 0.15
Nodes (6): LlmGatewayError, LlmGatewayHttpAdapter, Inject, Injectable, GATEWAY_ERROR_CODE_LABELS, toGatewayErrorCodeLabel()

### Community 52 - "RunRepository"
Cohesion: 0.09
Nodes (8): InProcessRunWorker, Injectable, ResumeHitlUseCase, Inject, Injectable, Inject, RunRepository, RunRecord

### Community 53 - "run.schemas.ts"
Cohesion: 0.12
Nodes (15): GetRunLogsOutput, GetRunLogsUseCase, Inject, Injectable, contentBriefSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId (+7 more)

### Community 54 - "LoggingService"
Cohesion: 0.09
Nodes (13): Inject, Inject, DEFAULT_HTTP_STATUS_TO_CODE, GlobalExceptionFilter, isPayloadTooLargeError(), PayloadTooLargeError, RequestWithId, Catch (+5 more)

### Community 55 - "company-context.controller.ts"
Cohesion: 0.21
Nodes (12): toPublicCompanyContext(), GetCompanyContextUseCase, Injectable, GetCompletenessUseCase, Injectable, PatchCompanyContextUseCase, Injectable, PutCompanyContextUseCase (+4 more)

### Community 56 - "prisma-output-edited.adapter.ts"
Cohesion: 0.24
Nodes (6): Inject, OutputEditedWrite, OutputEditedWriter, applyWrite(), PrismaOutputEditedAdapter, Injectable

### Community 57 - "ModelAlias"
Cohesion: 0.06
Nodes (8): ProviderTestOptions, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, resolveAppMetricsBackend(), AppMetricsBackend, SemanticCacheLookupResult

### Community 58 - "health-readiness-response.dto.ts"
Cohesion: 0.29
Nodes (9): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiProperty, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty (+1 more)

### Community 59 - "HealthController"
Cohesion: 0.16
Nodes (11): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, HealthModule, Module (+3 more)

### Community 60 - "metrics.module.ts"
Cohesion: 0.19
Nodes (8): MetricsController, Controller, Get, Res, MetricsModule, Module, MetricsService, Injectable

### Community 61 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 62 - "metrics.ts"
Cohesion: 0.08
Nodes (34): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+26 more)

### Community 63 - "response-cache.service.ts"
Cohesion: 0.09
Nodes (18): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+10 more)

### Community 64 - ".error"
Cohesion: 0.23
Nodes (4): toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList()

### Community 65 - "content.schemas.ts"
Cohesion: 0.24
Nodes (9): coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineSectionRoleSchema, pageOutlineSectionSchema, readNonEmptyString(), verifierIssueSchema (+1 more)

### Community 66 - "users.controller.ts"
Cohesion: 0.06
Nodes (31): AppModule, Module, ListUsersUseCase, Inject, Injectable, ReactivateUserUseCase, Inject, Injectable (+23 more)

### Community 67 - "CompanyContextRepository"
Cohesion: 0.16
Nodes (8): Inject, Inject, Inject, Inject, CompanyContextRepository, CompanyContext, PrismaCompanyContextAdapter, Injectable

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (18): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+10 more)

### Community 69 - "auth.module.ts"
Cohesion: 0.05
Nodes (45): Inject, InviteUserResult, inviteUserSchema, InviteUserUseCase, Inject, Injectable, InvitationListItem, ListInvitationsUseCase (+37 more)

### Community 70 - "resolve-provider-call-options.ts"
Cohesion: 0.48
Nodes (5): clamp(), isOverrideKey(), resolveProviderCallOptions(), OVERRIDE_KEYS, OverrideKey

### Community 71 - "ClientId"
Cohesion: 0.19
Nodes (4): ClientId, ActiveStreamsTracker, Injectable, RateLimitReason

### Community 72 - "auth.schemas.ts"
Cohesion: 0.29
Nodes (6): BootstrapAdminInput, bootstrapAdminSchema, LoginInput, loginSchema, PatchUserCommand, patchUserSchema

### Community 73 - "prisma-invitation.adapter.ts"
Cohesion: 0.17
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 74 - "BootstrapStatusUseCase"
Cohesion: 0.29
Nodes (4): BootstrapStatusUseCase, Inject, Injectable, Get

### Community 75 - "prisma-company-context.adapter.ts"
Cohesion: 0.16
Nodes (15): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, Completeness (+7 more)

### Community 76 - "AuthUserContext"
Cohesion: 0.07
Nodes (29): Body, HttpCode, Post, CreateFeedbackDto, IsIn, IsOptional, IsString, MaxLength (+21 more)

### Community 77 - "UserRepository"
Cohesion: 0.11
Nodes (8): MeUseCase, Inject, Injectable, Inject, AuthUser, UserRepository, PrismaUserAdapter, Injectable

### Community 78 - "company-context.mapper.ts"
Cohesion: 0.16
Nodes (11): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+3 more)

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.19
Nodes (16): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), GatewayChatResponse (+8 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - "public.decorator.ts"
Cohesion: 0.38
Nodes (3): IS_PUBLIC_KEY, JwtAuthGuard, Injectable

### Community 82 - "responses.adapter.ts"
Cohesion: 0.06
Nodes (76): ChatToolingDto, IsArray, Type, ValidateNested, mapProviderResponseToAiObservation(), toCachedChatResponse(), toHttpException(), asInputTokens() (+68 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+2 more)

### Community 85 - "run.types.ts"
Cohesion: 0.19
Nodes (15): isContentStartCommand(), isPlainRecord(), omitUndefinedDeep(), StartRunBriefInput, StartRunCommand, StartRunUseCase, Injectable, RunRecordBase (+7 more)

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
Cohesion: 0.09
Nodes (34): geistMono, geistSans, metadata, bootstrapAdmin(), Credentials, fetchBootstrapStatus(), fetchUserSession(), loginWithPassword() (+26 more)

### Community 90 - "getAppConfig"
Cohesion: 0.11
Nodes (18): readClientGatewayKey(), readGatewayKeyHeader(), resolveClientIdFromKey(), ResolvedGatewayClient, getAppConfig(), GatewayKeyGuard, Injectable, enrichRequestWithClientId() (+10 more)

### Community 91 - "PrismaRefreshSessionAdapter"
Cohesion: 0.27
Nodes (4): RefreshSessionRecord, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable

### Community 92 - "GatewayNamedToolChoiceFunctionDto"
Cohesion: 0.50
Nodes (5): GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsOptional, IsString

### Community 93 - "new-ids.ts"
Cohesion: 0.20
Nodes (6): ErrorEnvelope, HttpExceptionFilter, Catch, newRequestId(), RequestIdMiddleware, Injectable

### Community 94 - "ProviderCallOptions"
Cohesion: 0.13
Nodes (23): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), ProviderCallOptions, mapCallOptionsToChatCompletionParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapStopSequences() (+15 more)

### Community 95 - "PrometheusAppMetricsAdapter"
Cohesion: 0.15
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
Cohesion: 0.20
Nodes (12): GatewayProviderInstanceConfig, assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryFn (+4 more)

### Community 101 - "PrismaService"
Cohesion: 0.07
Nodes (26): CreateFeedbackUseCase, Inject, Injectable, agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_RUN_READER, FeedbackRunLookup (+18 more)

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
Cohesion: 0.09
Nodes (26): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Injectable, hashPassword(), updateEmailSchema, JwtPayload, UserListItem (+18 more)

### Community 111 - "start-run-form.tsx"
Cohesion: 0.13
Nodes (18): CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS, RUN_TASK_TYPE_LABELS, startRun(), parseStartRunAccepted() (+10 more)

### Community 112 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 113 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 114 - "cn"
Cohesion: 0.06
Nodes (45): logoutSession(), AppHeaderProps, AppSidebar(), AppSidebarProps, CompletenessChipSlot(), FeedbackCtaSlot(), FloatingBoxSlot(), LogoutDialog() (+37 more)

### Community 115 - "CompanyContextController"
Cohesion: 0.29
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 120 - "openai-chat-message.dto.ts"
Cohesion: 0.60
Nodes (3): isTextContentItem(), normalizeOpenAiContent(), TextContentItem

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 126 - "ConfigValidateCommand"
Cohesion: 0.40
Nodes (3): ConfigValidateCommand, Command, Option

### Community 128 - "login-card.tsx"
Cohesion: 0.17
Nodes (15): AcceptInvitePageProps, acceptInvite(), AcceptInviteForm(), onSubmit(), AcceptInviteFormProps, passwordMeetsPolicy(), Card(), CardAction() (+7 more)

### Community 129 - "RunSseHub"
Cohesion: 0.16
Nodes (6): Inject, RunSseEvent, RunSseHub, InMemoryRunSseHub, Inject, Injectable

### Community 145 - "dashboard-shell.tsx"
Cohesion: 0.14
Nodes (11): UsersPage(), HomeEntry(), useSession(), AppHeader(), DashboardShell(), EventSourceRegistryContext, EventSourceRegistryProvider(), createEventSourceRegistry() (+3 more)

## Knowledge Gaps
- **335 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+330 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1030 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `LoggingService` connect `LoggingService` to `swagger.setup.ts`, `RedisConnectionService`, `AppMetricsService`, `provider-instances.bootstrap.ts`, `logging.service.ts`, `types/index.ts`, `provider-error.mapper.ts`, `app-metrics.service.ts`, `branded.types.ts`, `semantic-cache.service.ts`, `redis-vector-store.adapter.ts`, `responses.adapter.ts`, `anthropic/anthropic-tools.mapper.ts`, `getAppConfig`, `HealthService`, `chat.service.ts`, `ProviderCallOptions`, `response-cache.service.ts`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Why does `GatewayConfig` connect `asProviderInstanceId` to `cli.module.ts`, `.error`, `provider-manager.service.ts`, `wizard-orchestrator.service.ts`, `branded.types.ts`, `models.controller.ts`, `configuration.ts`, `gateway-config.schema.ts`, `chat.service.ts`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Why does `asProviderInstanceId()` connect `asProviderInstanceId` to `cli.module.ts`, `.error`, `provider-manager.service.ts`, `provider-instances.bootstrap.ts`, `types/index.ts`, `provider-error.mapper.ts`, `wizard-orchestrator.service.ts`, `branded.types.ts`, `models.controller.ts`, `responses.adapter.ts`, `configuration.ts`, `gateway-config.schema.ts`, `anthropic/anthropic-tools.mapper.ts`, `ProviderCallOptions`, `chat.service.ts`, `metrics.ts`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _335 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `cli.module.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06626262626262626 - nodes in this community are weakly interconnected._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.055482456140350876 - nodes in this community are weakly interconnected._