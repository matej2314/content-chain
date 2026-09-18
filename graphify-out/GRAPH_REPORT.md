# Graph Report - content-chain  (2026-09-18)

## Corpus Check
- 598 files · ~169,165 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 2, .css 1)

## Summary
- 3865 nodes · 11902 edges · 131 communities (115 shown, 14 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 373 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `322c140c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ConfigShowCommand
- social.types.ts
- api/company-context.types.ts
- cli.module.ts
- runs.types.ts
- run-details-view.tsx
- app-metrics.service.ts
- logging.service.ts
- anthropic/anthropic-tools.mapper.ts
- api-error.code.ts
- llm-hop.ts
- gateway-config.schema.ts
- social.graph.ts
- ai-provider.interface.ts
- semantic-cache.constants.ts
- models.controller.ts
- branded.types.ts
- redis-vector-store.adapter.ts
- GatewayConfig
- configuration.ts
- sentry-ai-metrics.adapter.ts
- asProviderInstanceId
- GatewayKey
- responses.adapter.ts
- login-card.tsx
- api/src/app.module.ts
- runs.module.ts
- auth.controller.ts
- save-output-edited.use-case.ts
- chat.service.ts
- PrismaSocialResultAdapter
- HealthService
- ai-provider-gateway/src/main.ts
- prisma-run.adapter.ts
- AnthropicMessagesRequestDto
- RedisConnectionService
- AppMetricsService
- enums.ts
- types/index.ts
- LoggingService
- RunRepository
- start-run.use-case.ts
- openai-models.controller.ts
- ids.ts
- app-metrics.module.ts
- company-context-form.tsx
- ai-provider-gateway/src/health/health.service.ts
- anthropic-models.controller.ts
- .info
- chat-params.dto.ts
- StartRunDto
- getAppConfig
- config-generator.service.ts
- social-pipeline.facade.ts
- swagger.setup.ts
- company-context.controller.ts
- .getOne
- ModelAlias
- ai-provider-gateway/src/app.module.ts
- HealthController
- semantic-cache.service.ts
- company-context.dto.ts
- metrics.ts
- response-cache.service.ts
- LlmGatewayHttpAdapter
- .getOne
- UserRepository
- CompanyContextRepository
- OpenAiChatCompletionRequestDto
- auth.module.ts
- .getOne
- openai-chat-completions.controller.ts
- ClientAddCommand
- prisma-invitation.adapter.ts
- OpenAiChatMessageDto
- prisma-company-context.adapter.ts
- AuthUserContext
- list-runs.use-case.ts
- company-context.mapper.ts
- llm-gateway.http.adapter.ts
- PrometheusService
- GatewayModelsCatalogService
- HttpExceptionFilter
- SPEC — README
- ListRunsQueryDto
- runs.controller.ts
- public.decorator.ts
- KeyGenerateCommand
- ConfigValidateCommand
- session-provider.tsx
- RunsModule
- RefreshSessionRepository
- openai-params-provider.mapper.ts
- PrometheusAppMetricsAdapter
- route.ts
- http-metrics.interceptor.ts
- ProviderAddCommand
- PrismaService
- metrics.module.ts
- configure-swagger.ts
- ClientEditCommand
- ClientRemoveCommand
- ModelAddCommand
- ModelEditCommand
- OllamaEmbeddingAdapter
- ProviderEditCommand
- DomainException
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
- dashboard-shell.tsx

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
- `mapGatewayResponseToAnthropicFormat()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/anthropic/mappers/anthropic-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
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

## Communities (131 total, 14 thin omitted)

### Community 0 - "ConfigShowCommand"
Cohesion: 0.11
Nodes (9): ConfigShowCommand, Command, Option, ModelListCommand, Command, Option, ProviderListCommand, Command (+1 more)

### Community 1 - "social.types.ts"
Cohesion: 0.07
Nodes (26): PageOutline, CompositeRunResultReader, GetRunOutput, orderItemsBySelectedIds(), RunResultReader, ContentBrief, SocialBrief, EmptyRunResultReader (+18 more)

### Community 2 - "api/company-context.types.ts"
Cohesion: 0.08
Nodes (41): fetchCompanyContext(), fetchCompleteness(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, companyContextForPut(), CompanyContextObjection (+33 more)

### Community 3 - "cli.module.ts"
Cohesion: 0.08
Nodes (55): AgentReport, AgentReportStatus, emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), loadAnswers(), assertAgentHasAnswers(), CliMode (+47 more)

### Community 4 - "runs.types.ts"
Cohesion: 0.08
Nodes (53): ArchiveRunsQuery, fetchArchiveRuns(), fetchInitiatorOptions(), fetchUserRuns(), InitiatorOption, startRun(), ArchiveRunItem, ArchiveRunsPage (+45 more)

### Community 5 - "run-details-view.tsx"
Cohesion: 0.11
Nodes (28): CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS, RUN_TASK_TYPE_LABELS, fetchRunLogs(), fetchRunSnapshot() (+20 more)

### Community 6 - "app-metrics.service.ts"
Cohesion: 0.20
Nodes (13): healthStatusToGaugeValue(), AppProviderStreamScope, AppRequestLabels, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus (+5 more)

### Community 7 - "logging.service.ts"
Cohesion: 0.07
Nodes (19): LEVEL_ORDER, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable, SentryErrorReportingAdapter, Injectable (+11 more)

### Community 8 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.06
Nodes (67): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, mapProviderResponseToAiObservation(), toCachedChatResponse(), asInputTokens(), asOutputTokens(), asPromptCacheCreationTokens() (+59 more)

### Community 9 - "api-error.code.ts"
Cohesion: 0.13
Nodes (25): ChatErrorHandlerService, Injectable, ApiErrorCode, ApiErrorPayload, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus() (+17 more)

### Community 10 - "llm-hop.ts"
Cohesion: 0.09
Nodes (44): coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema, pageOutlineSectionSchema, readNonEmptyString() (+36 more)

### Community 11 - "gateway-config.schema.ts"
Cohesion: 0.07
Nodes (51): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, assertInteractiveAllowed(), WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep (+43 more)

### Community 12 - "social.graph.ts"
Cohesion: 0.13
Nodes (32): coercePassNoteVerdict(), isPassOnlyIssue(), ideasOutputSchema, reelIdeasOutputSchema, isReelTaskType(), ReelTaskType, canRefine(), MAX_REFINE (+24 more)

### Community 13 - "ai-provider.interface.ts"
Cohesion: 0.12
Nodes (38): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatResponseData, mapStopReasonToFinishReason(), CompleteOnceResult, StreamOnceResult, ChatResponseBuilderService (+30 more)

### Community 14 - "semantic-cache.constants.ts"
Cohesion: 0.13
Nodes (12): EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema(), EMBEDDING_CIRCUIT_COOLDOWN_MS, EMBEDDING_CIRCUIT_OPEN_AFTER, EMBEDDING_PROBE_TIMEOUT_MS (+4 more)

### Community 15 - "models.controller.ts"
Cohesion: 0.23
Nodes (10): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, GatewayModelCapabilitiesDto, GatewayModelDto, ApiProperty, ApiPropertyOptional (+2 more)

### Community 16 - "branded.types.ts"
Cohesion: 0.11
Nodes (27): SseDoneEvent, asMessageId(), JsonSchemaName, MessageId, ThinkingBudgetTokens, WarningCode, AnthropicContentBlock, AnthropicContentBlockDto (+19 more)

### Community 17 - "redis-vector-store.adapter.ts"
Cohesion: 0.15
Nodes (20): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), asString(), ParsedKnnHits, parseKnnHits() (+12 more)

### Community 18 - "GatewayConfig"
Cohesion: 0.05
Nodes (45): PendingSecretsItem, DEFAULT_MODELS, DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, convertModel(), ConfigPersistenceService (+37 more)

### Community 19 - "configuration.ts"
Cohesion: 0.09
Nodes (35): CliValidateOptions, asPort(), asSemanticCacheTtlSeconds(), collectInactiveProviderWarnings(), formatZodIssues(), validateGatewayConfig(), ValidationOptions, ValidationResult (+27 more)

### Community 20 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.11
Nodes (27): CostUsd, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes() (+19 more)

### Community 21 - "asProviderInstanceId"
Cohesion: 0.07
Nodes (51): collectPendingSecrets(), ProviderTestCommand, Command, Option, convertProvider(), CliAiProvider, EnvPatchService, EnvPatchValue (+43 more)

### Community 22 - "GatewayKey"
Cohesion: 0.03
Nodes (71): ApiHeader, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags, Body (+63 more)

### Community 23 - "responses.adapter.ts"
Cohesion: 0.08
Nodes (48): toHttpException(), asSystemFingerprint(), asToolCallId(), mapOpenAiMessagesToGateway(), mapOpenAiToolCalls(), mapOpenAiChatRequestToGateway(), mapOpenAiToolChoice(), mapOpenAiToolsToGateway() (+40 more)

### Community 24 - "login-card.tsx"
Cohesion: 0.15
Nodes (17): AcceptInvitePageProps, acceptInvite(), AcceptInviteForm(), onSubmit(), AcceptInviteFormProps, passwordMeetsPolicy(), Card(), CardAction() (+9 more)

### Community 25 - "api/src/app.module.ts"
Cohesion: 0.07
Nodes (41): CompanyContextModule, Module, ContentPipelineFacade, toOutcome(), Inject, Injectable, ContentRunExecutor, isCanonicalOutlineSelection() (+33 more)

### Community 26 - "runs.module.ts"
Cohesion: 0.12
Nodes (19): GetRunLogsOutput, Inject, RecoverInterruptedRunsUseCase, Inject, Injectable, RunLifecycleService, TransitionExtras, Inject (+11 more)

### Community 27 - "auth.controller.ts"
Cohesion: 0.05
Nodes (52): AcceptInviteUseCase, Injectable, BootstrapAdminUseCase, Inject, Injectable, BootstrapStatusUseCase, Injectable, LogoutUseCase (+44 more)

### Community 28 - "save-output-edited.use-case.ts"
Cohesion: 0.09
Nodes (33): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+25 more)

### Community 29 - "chat.service.ts"
Cohesion: 0.05
Nodes (64): SemanticStoreEmbedState, CacheIdentityMessage, ChatCacheSource, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional (+56 more)

### Community 30 - "PrismaSocialResultAdapter"
Cohesion: 0.09
Nodes (10): Inject, OutputEditedWrite, OutputEditedWriter, applyWrite(), PrismaOutputEditedAdapter, Injectable, toInputJson(), PipelineState (+2 more)

### Community 31 - "HealthService"
Cohesion: 0.10
Nodes (12): HealthLivenessResponseDto, ApiProperty, HealthReadinessResponseDto, ApiProperty, HealthController, ApiOkResponse, ApiOperation, ApiTags (+4 more)

### Community 32 - "ai-provider-gateway/src/main.ts"
Cohesion: 0.13
Nodes (15): AppModule, Module, bootstrap(), API_GLOBAL_PREFIX, PORT, setupApp(), exportOpenApi(), OPENAPI_OUTPUT_FILENAME (+7 more)

### Community 33 - "prisma-run.adapter.ts"
Cohesion: 0.09
Nodes (13): LightRunItem, ListRunsResult, RunSnapshot, RunLogEntry, ALLOWED, assertTransition(), PrismaRunAdapter, RunLogRow (+5 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "RedisConnectionService"
Cohesion: 0.13
Nodes (6): RedisConnectionService, Injectable, VectorStore, isRedisRequiredFromConfig(), Inject, Optional

### Community 36 - "AppMetricsService"
Cohesion: 0.09
Nodes (6): HttpMetricsMiddleware, Injectable, ActiveStreamsTracker, Injectable, AppMetricsService, Injectable

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "types/index.ts"
Cohesion: 0.07
Nodes (46): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+38 more)

### Community 39 - "LoggingService"
Cohesion: 0.09
Nodes (13): Inject, Inject, ConsoleLoggerAdapter, Injectable, LogContext, LoggingService, Injectable, ProviderInstancesBootstrap (+5 more)

### Community 40 - "RunRepository"
Cohesion: 0.09
Nodes (7): InProcessRunWorker, Injectable, Inject, RunRepository, RunRecord, StubRunExecutor, Injectable

### Community 41 - "start-run.use-case.ts"
Cohesion: 0.11
Nodes (24): contentBriefSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, socialBriefSchema, socialStartRunSchema (+16 more)

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.27
Nodes (10): ApiOpenAiErrorResponses(), OpenAiErrorBodyDto, OpenAiErrorResponseDto, ApiProperty, ApiPropertyOptional, OpenAiModelDto, OpenAiModelsListResponseDto, ApiProperty (+2 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (28): brand, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createInvitationId(), createRequestId() (+20 more)

### Community 44 - "app-metrics.module.ts"
Cohesion: 0.10
Nodes (13): resolveAppMetricsBackend(), Inject, APP_METRICS_BACKEND, MetricsController, ApiOperation, ApiResponse, ApiTags, Controller (+5 more)

### Community 45 - "company-context-form.tsx"
Cohesion: 0.12
Nodes (21): CompanyContextExtras, CONTEXT_TAB_LABELS, ContextTab, DEFAULT_CONTEXT_TAB, GATE_SECTIONS, GateSection, gateTabIsMissing(), commaToList() (+13 more)

### Community 46 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.26
Nodes (10): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty, ApiPropertyOptional (+2 more)

### Community 47 - "anthropic-models.controller.ts"
Cohesion: 0.28
Nodes (10): ApiAnthropicErrorResponses(), AnthropicErrorBodyDto, AnthropicErrorResponseDto, ApiProperty, AnthropicModelDto, AnthropicModelsListResponseDto, ApiProperty, mapGatewayModelsListToAnthropic() (+2 more)

### Community 48 - ".info"
Cohesion: 0.08
Nodes (17): ConfigInitCommand, Command, Option, toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList(), WizardState, ConfigGeneratorService (+9 more)

### Community 49 - "chat-params.dto.ts"
Cohesion: 0.24
Nodes (7): ResponseFormatDto, ApiProperty, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsThinkingBudget()

### Community 50 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 51 - "getAppConfig"
Cohesion: 0.11
Nodes (18): RedisCacheModule, Module, AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig, SemanticCacheRuntimeConfig, getAppConfig() (+10 more)

### Community 52 - "config-generator.service.ts"
Cohesion: 0.15
Nodes (16): isRedisRequired(), BasicServerAnswers, CacheAnswers, MetricsAnswers, RateLimitAnswers, RedisAnswers, SentryAnswers, WizardRunResult (+8 more)

### Community 53 - "social-pipeline.facade.ts"
Cohesion: 0.18
Nodes (11): isSocialRunRecord(), SocialPipelineFacade, toOutcome(), Inject, Injectable, SocialRunExecutor, Inject, Injectable (+3 more)

### Community 54 - "swagger.setup.ts"
Cohesion: 0.06
Nodes (43): ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString (+35 more)

### Community 55 - "company-context.controller.ts"
Cohesion: 0.21
Nodes (12): toPublicCompanyContext(), GetCompanyContextUseCase, Injectable, GetCompletenessUseCase, Injectable, PatchCompanyContextUseCase, Injectable, PutCompanyContextUseCase (+4 more)

### Community 56 - ".getOne"
Cohesion: 0.18
Nodes (11): OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+3 more)

### Community 57 - "ModelAlias"
Cohesion: 0.06
Nodes (6): ProviderTestOptions, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, AppMetricsBackend

### Community 58 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.04
Nodes (55): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis() (+47 more)

### Community 59 - "HealthController"
Cohesion: 0.16
Nodes (11): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, HealthModule, Module (+3 more)

### Community 60 - "semantic-cache.service.ts"
Cohesion: 0.12
Nodes (19): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, isSingleTurnUserRequest(), lastUserMessageText(), embeddingProbeTimeoutMs() (+11 more)

### Community 61 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 62 - "metrics.ts"
Cohesion: 0.08
Nodes (37): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+29 more)

### Community 63 - "response-cache.service.ts"
Cohesion: 0.10
Nodes (16): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, CacheModule, CacheModuleOptions (+8 more)

### Community 64 - "LlmGatewayHttpAdapter"
Cohesion: 0.20
Nodes (6): LlmGatewayError, LlmGatewayHttpAdapter, Inject, Injectable, GATEWAY_ERROR_CODE_LABELS, toGatewayErrorCodeLabel()

### Community 65 - ".getOne"
Cohesion: 0.19
Nodes (10): AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+2 more)

### Community 66 - "UserRepository"
Cohesion: 0.05
Nodes (39): Inject, ListUsersUseCase, Inject, Injectable, Inject, ReactivateUserUseCase, Inject, Injectable (+31 more)

### Community 67 - "CompanyContextRepository"
Cohesion: 0.16
Nodes (8): Inject, Inject, Inject, Inject, CompanyContextRepository, CompanyContext, PrismaCompanyContextAdapter, Injectable

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (18): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+10 more)

### Community 69 - "auth.module.ts"
Cohesion: 0.06
Nodes (38): Inject, InviteUserResult, inviteUserSchema, InviteUserUseCase, Inject, Injectable, InvitationListItem, ListInvitationsUseCase (+30 more)

### Community 70 - ".getOne"
Cohesion: 0.19
Nodes (10): ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+2 more)

### Community 71 - "openai-chat-completions.controller.ts"
Cohesion: 0.13
Nodes (25): GATEWAY_CACHE_HEADER, fromGatewayToolCallDto(), ANTHROPIC_INTEGRATION_PATH, OPENAI_INTEGRATION_PATH, OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto (+17 more)

### Community 72 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

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
Cohesion: 0.08
Nodes (25): Body, Delete, HttpCode, Param, Post, isTerminalStatus(), RunsController, ApiCookieAuth (+17 more)

### Community 77 - "list-runs.use-case.ts"
Cohesion: 0.24
Nodes (7): ListRunsOutput, ListRunsUseCase, Inject, Injectable, ListRunsQuery, PAGE_SIZE, RunStartedBy

### Community 78 - "company-context.mapper.ts"
Cohesion: 0.16
Nodes (11): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+3 more)

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.16
Nodes (17): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), GatewayChatResponse (+9 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 82 - "HttpExceptionFilter"
Cohesion: 0.20
Nodes (6): ErrorEnvelope, HttpExceptionFilter, Catch, newRequestId(), RequestIdMiddleware, Injectable

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+2 more)

### Community 85 - "runs.controller.ts"
Cohesion: 0.06
Nodes (29): FinalizeReviewUseCase, Inject, Injectable, GetRunLogsUseCase, Inject, Injectable, GetRunUseCase, Inject (+21 more)

### Community 86 - "public.decorator.ts"
Cohesion: 0.38
Nodes (3): IS_PUBLIC_KEY, JwtAuthGuard, Injectable

### Community 87 - "KeyGenerateCommand"
Cohesion: 0.33
Nodes (3): KeyGenerateCommand, Command, Option

### Community 88 - "ConfigValidateCommand"
Cohesion: 0.50
Nodes (3): ConfigValidateCommand, Command, Option

### Community 89 - "session-provider.tsx"
Cohesion: 0.10
Nodes (29): UsersPage(), geistMono, geistSans, metadata, bootstrapAdmin(), Credentials, fetchBootstrapStatus(), fetchUserSession() (+21 more)

### Community 91 - "RefreshSessionRepository"
Cohesion: 0.12
Nodes (7): Inject, Inject, RefreshSessionRecord, RefreshSessionRepository, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable

### Community 94 - "openai-params-provider.mapper.ts"
Cohesion: 0.12
Nodes (24): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+16 more)

### Community 95 - "PrometheusAppMetricsAdapter"
Cohesion: 0.14
Nodes (4): PrometheusAppMetricsAdapter, Injectable, AppProviderCallContext, AppTokenUsage

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 98 - "http-metrics.interceptor.ts"
Cohesion: 0.21
Nodes (10): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, gatewayErrorsTotal, httpRequestDurationSeconds, httpRequestsTotal (+2 more)

### Community 99 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 101 - "PrismaService"
Cohesion: 0.05
Nodes (37): CreateFeedbackUseCase, Inject, Injectable, agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_RUN_READER, FeedbackRunLookup (+29 more)

### Community 102 - "metrics.module.ts"
Cohesion: 0.19
Nodes (8): MetricsController, Controller, Get, Res, MetricsModule, Module, MetricsService, Injectable

### Community 103 - "configure-swagger.ts"
Cohesion: 0.15
Nodes (13): AppModule, Module, bootstrap(), EnvModule, Global, Module, envSchema, parseCorsOrigins() (+5 more)

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

### Community 108 - "OllamaEmbeddingAdapter"
Cohesion: 0.24
Nodes (3): OllamaEmbeddingAdapter, Injectable, EmbeddingBackend

### Community 109 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 110 - "DomainException"
Cohesion: 0.09
Nodes (32): AcceptInviteResult, acceptInviteSchema, comparePassword(), generateRefreshToken(), hashPassword(), hashRefreshToken(), parseTtlMs(), parseTtlSeconds() (+24 more)

### Community 112 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 113 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 114 - "cn"
Cohesion: 0.07
Nodes (38): logoutSession(), AppHeaderProps, LogoutDialog(), confirm(), LogoutDialogProps, Button(), buttonVariants, Dialog() (+30 more)

### Community 115 - "CompanyContextController"
Cohesion: 0.29
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

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

### Community 145 - "dashboard-shell.tsx"
Cohesion: 0.11
Nodes (16): AppHeader(), AppSidebar(), AppSidebarProps, CompletenessChipSlot(), FeedbackCtaSlot(), FloatingBoxSlot(), DashboardShell(), EventSourceRegistryContext (+8 more)

## Knowledge Gaps
- **339 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+334 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1035 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `LoggingService` connect `LoggingService` to `logging.service.ts`, `anthropic/anthropic-tools.mapper.ts`, `api-error.code.ts`, `ai-provider.interface.ts`, `redis-vector-store.adapter.ts`, `asProviderInstanceId`, `GatewayKey`, `responses.adapter.ts`, `chat.service.ts`, `HealthService`, `ai-provider-gateway/src/main.ts`, `RedisConnectionService`, `types/index.ts`, `ai-provider-gateway/src/health/health.service.ts`, `getAppConfig`, `swagger.setup.ts`, `semantic-cache.service.ts`, `response-cache.service.ts`, `OllamaEmbeddingAdapter`, `filters/http-exception.filter.ts`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Why does `GatewayConfig` connect `GatewayConfig` to `cli.module.ts`, `gateway-config.schema.ts`, `ai-provider.interface.ts`, `models.controller.ts`, `.info`, `GatewayModelsCatalogService`, `getAppConfig`, `configuration.ts`, `asProviderInstanceId`, `chat.service.ts`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Why does `asProviderInstanceId()` connect `asProviderInstanceId` to `cli.module.ts`, `types/index.ts`, `anthropic/anthropic-tools.mapper.ts`, `api-error.code.ts`, `gateway-config.schema.ts`, `ai-provider.interface.ts`, `models.controller.ts`, `.info`, `branded.types.ts`, `GatewayConfig`, `configuration.ts`, `GatewayModelsCatalogService`, `chat.service.ts`, `metrics.ts`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _339 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `ConfigShowCommand` be split into smaller, more focused modules?**
  _Cohesion score 0.11428571428571428 - nodes in this community are weakly interconnected._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07126207126207126 - nodes in this community are weakly interconnected._