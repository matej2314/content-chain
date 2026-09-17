# Graph Report - content-chain  (2026-09-17)

## Corpus Check
- 594 files · ~167,704 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: (none) 3, .css 1)

## Summary
- 3843 nodes · 11818 edges · 130 communities (115 shown, 13 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 373 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b83ce18b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- cli.module.ts
- social.types.ts
- api/company-context.types.ts
- ProviderApiKey
- runs.types.ts
- run-details-view.tsx
- app-metrics.service.ts
- logging.service.ts
- types/index.ts
- provider-error.mapper.ts
- content.graph.ts
- asProviderInstanceId
- social.graph.ts
- branded.types.ts
- semantic-cache.service.ts
- models.controller.ts
- anthropic-messages.controller.ts
- redis-vector-store.adapter.ts
- GatewayConfig
- configuration-validation.service.ts
- sentry-ai-metrics.adapter.ts
- model-manager.service.ts
- GatewayKey
- anthropic/anthropic-tools.mapper.ts
- run.port.ts
- ContentResultStore
- ai-provider-gateway/src/app.module.ts
- AuthController
- save-output-edited.use-case.ts
- chat.service.ts
- config-generator.service.ts
- HealthService
- swagger.setup.ts
- ErrorReportingBackend
- AnthropicMessagesRequestDto
- RedisConnectionService
- AppMetricsService
- enums.ts
- anthropic.module.ts
- provider-registry.service.ts
- RunRepository
- api/src/app.module.ts
- openai-models.controller.ts
- ids.ts
- app-metrics.module.ts
- openai-chat-completions.controller.ts
- should-include-redis-stack.ts
- anthropic-models.controller.ts
- exitWithAgentReport
- chat-params.dto.ts
- StartRunDto
- LogContext
- InProcessRunWorker
- DomainException
- LoggingService
- company-context.controller.ts
- .getOne
- ModelAlias
- ai-provider-gateway/src/health/health.service.ts
- HealthController
- response-cache.service.ts
- company-context.dto.ts
- chat-provider-call.service.ts
- cache.module.ts
- ConsoleLoggerAdapter
- LoggerBackend
- reactivate-user.use-case.ts
- CompanyContextRepository
- OpenAiChatCompletionRequestDto
- auth.module.ts
- InvitationsController
- GlobalExceptionFilter
- prisma-invitation.adapter.ts
- logout-dialog.tsx
- prisma-company-context.adapter.ts
- runs.controller.ts
- UserRepository
- company-context.schemas.ts
- llm-gateway.http.adapter.ts
- PrometheusService
- public.decorator.ts
- responses.adapter.ts
- SPEC — README
- ListRunsQueryDto
- start-run.use-case.ts
- EnvironmentVariables
- KeyGeneratorService
- ChatParamsDto
- login-card.tsx
- getAppConfig
- PrismaRefreshSessionAdapter
- HttpExceptionFilter
- openai-params-provider.mapper.ts
- PrometheusAppMetricsAdapter
- route.ts
- OpenAiChatMessageDto
- ProviderAddCommand
- provider-instances.bootstrap.ts
- PrismaService
- ClientEditCommand
- ClientRemoveCommand
- ModelAddCommand
- ModelEditCommand
- configure-swagger.ts
- ProviderEditCommand
- auth.controller.ts
- ModelRemoveCommand
- ProviderRemoveCommand
- cn
- CompanyContextController
- ChatResponseDto
- openai-chat-message.dto.ts
- openai-chat-completion-request.dto.ts
- Architektura
- brand.ts
- FileManagerService
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
9. `cn()` - 53 edges
10. `ChatRequestDto` - 48 edges

## Surprising Connections (you probably didn't know these)
- `mapGatewayResponseToAnthropicFormat()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/anthropic/mappers/anthropic-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `DialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/dialog.tsx → apps/frontend/src/shared/utils/utils.ts
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `RedisConnectionService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-connection.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `CacheRegistryService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/cache-registry.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (130 total, 13 thin omitted)

### Community 0 - "cli.module.ts"
Cohesion: 0.06
Nodes (62): AgentReport, AgentReportStatus, emitAgentReport(), PendingSecretsItem, loadAnswers(), assertAgentHasAnswers(), CliMode, CliModeFlags (+54 more)

### Community 1 - "social.types.ts"
Cohesion: 0.05
Nodes (34): ContentPipelineInput, ContentRefineSnapshot, PageDocument, PageOutline, PageOutlineSection, PageOutlineSectionRole, CompositeRunResultReader, GetRunOutput (+26 more)

### Community 2 - "api/company-context.types.ts"
Cohesion: 0.07
Nodes (49): fetchCompanyContext(), fetchCompleteness(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras, companyContextForPut() (+41 more)

### Community 3 - "ProviderApiKey"
Cohesion: 0.17
Nodes (10): ProviderTestCommand, Command, Option, CliAiProvider, ProviderTestService, Injectable, ProviderCli, AddProviderInput (+2 more)

### Community 4 - "runs.types.ts"
Cohesion: 0.07
Nodes (55): ArchiveRunsQuery, fetchArchiveRuns(), fetchInitiatorOptions(), fetchRunSnapshot(), fetchUserRuns(), InitiatorOption, startRun(), ArchiveRunItem (+47 more)

### Community 5 - "run-details-view.tsx"
Cohesion: 0.11
Nodes (22): CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS, RUN_TASK_TYPE_LABELS, fetchRunLogs(), AccountStartSection() (+14 more)

### Community 6 - "app-metrics.service.ts"
Cohesion: 0.20
Nodes (13): healthStatusToGaugeValue(), AppProviderStreamScope, AppRequestLabels, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus (+5 more)

### Community 7 - "logging.service.ts"
Cohesion: 0.22
Nodes (9): LEVEL_ORDER, LEVEL_RANK, parseLogLevel(), LoggerOptions, isSentryEnabled(), resolveErrorReportingBackend(), ERROR_REPORTING_BACKEND, LOGGER_BACKEND (+1 more)

### Community 8 - "types/index.ts"
Cohesion: 0.08
Nodes (42): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+34 more)

### Community 9 - "provider-error.mapper.ts"
Cohesion: 0.19
Nodes (20): MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isProviderRateLimitError(), isRateLimitStatus(), isServerError(), isTimeoutStatus() (+12 more)

### Community 10 - "content.graph.ts"
Cohesion: 0.10
Nodes (38): coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, pageDocumentOutputSchema, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema, pageOutlineSectionSchema (+30 more)

### Community 11 - "asProviderInstanceId"
Cohesion: 0.05
Nodes (103): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, assertInteractiveAllowed(), collectPendingSecrets(), WIZARD_INIT_STEPS, WIZARD_STEPS (+95 more)

### Community 12 - "social.graph.ts"
Cohesion: 0.09
Nodes (48): coercePassNoteVerdict(), isPassOnlyIssue(), coerceVerifierIssue(), ContentOutput, contentOutputSchema, IdeasOutput, ideasOutputSchema, isPlainRecord() (+40 more)

### Community 13 - "branded.types.ts"
Cohesion: 0.15
Nodes (28): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatResponseData, mapStopReasonToFinishReason(), CompleteOnceResult, StreamOnceResult, ProviderResponse (+20 more)

### Community 14 - "semantic-cache.service.ts"
Cohesion: 0.08
Nodes (22): OllamaEmbeddingAdapter, Injectable, EmbeddingBackend, EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema() (+14 more)

### Community 15 - "models.controller.ts"
Cohesion: 0.10
Nodes (22): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+14 more)

### Community 16 - "anthropic-messages.controller.ts"
Cohesion: 0.13
Nodes (25): SseDoneEvent, asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto, AnthropicTextContentBlockDto (+17 more)

### Community 17 - "redis-vector-store.adapter.ts"
Cohesion: 0.14
Nodes (20): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), asString(), ParsedKnnHits, parseKnnHits() (+12 more)

### Community 18 - "GatewayConfig"
Cohesion: 0.08
Nodes (16): ClientManagerService, Injectable, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable, EnvPatchService, Injectable, ProviderManagerService (+8 more)

### Community 19 - "configuration-validation.service.ts"
Cohesion: 0.13
Nodes (20): CliValidateOptions, collectInactiveProviderWarnings(), formatZodIssues(), validateGatewayConfig(), ValidationOptions, ValidationResult, buildEffectiveGatewayConfig(), assertEnabledProviderSecretsPresent() (+12 more)

### Community 20 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.11
Nodes (27): CostUsd, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes() (+19 more)

### Community 21 - "model-manager.service.ts"
Cohesion: 0.12
Nodes (26): DEFAULT_MODELS, DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, defaultModelPolicy(), ModelEditField, ModelManagerService (+18 more)

### Community 22 - "GatewayKey"
Cohesion: 0.03
Nodes (74): ApiHeader, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags, Body (+66 more)

### Community 23 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.09
Nodes (39): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent() (+31 more)

### Community 24 - "run.port.ts"
Cohesion: 0.09
Nodes (17): ListRunsOutput, LightRunItem, ListRunsQuery, ListRunsResult, PAGE_SIZE, RunSnapshot, RunStartedBy, RunLogEntry (+9 more)

### Community 25 - "ContentResultStore"
Cohesion: 0.12
Nodes (7): Inject, ContentResultStore, ContentPipelineState, VerifierVerdict, PrismaContentResultAdapter, toContentPipelinePhase(), Injectable

### Community 26 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.07
Nodes (25): HealthModule, Module, LoggingModule, Global, Module, AiMetricsModule, Global, Module (+17 more)

### Community 27 - "AuthController"
Cohesion: 0.09
Nodes (25): AuthController, ApiTags, Body, Controller, Get, HttpCode, Post, Req (+17 more)

### Community 28 - "save-output-edited.use-case.ts"
Cohesion: 0.09
Nodes (27): contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema, ideasArraySchema (+19 more)

### Community 29 - "chat.service.ts"
Cohesion: 0.05
Nodes (70): SemanticStoreEmbedState, CacheIdentityMessage, ChatCacheSource, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional (+62 more)

### Community 30 - "config-generator.service.ts"
Cohesion: 0.16
Nodes (15): isRedisRequired(), BasicServerAnswers, CacheAnswers, MetricsAnswers, RateLimitAnswers, RedisAnswers, SentryAnswers, WizardRunResult (+7 more)

### Community 31 - "HealthService"
Cohesion: 0.10
Nodes (12): HealthLivenessResponseDto, ApiProperty, HealthReadinessResponseDto, ApiProperty, HealthController, ApiOkResponse, ApiOperation, ApiTags (+4 more)

### Community 32 - "swagger.setup.ts"
Cohesion: 0.07
Nodes (34): AppModule, Module, ChatOutputTextDto, ApiProperty, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsOptional (+26 more)

### Community 33 - "ErrorReportingBackend"
Cohesion: 0.14
Nodes (5): NoopErrorReportingAdapter, Injectable, SentryErrorReportingAdapter, Injectable, ErrorReportingBackend

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "RedisConnectionService"
Cohesion: 0.20
Nodes (5): RedisCacheModule, Module, RedisConnectionService, Injectable, isRedisRequiredFromConfig()

### Community 36 - "AppMetricsService"
Cohesion: 0.09
Nodes (6): HttpMetricsMiddleware, Injectable, ActiveStreamsTracker, Injectable, AppMetricsService, Injectable

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "anthropic.module.ts"
Cohesion: 0.21
Nodes (10): ChatModule, Module, AnthropicModule, Module, IntegrationsModule, Module, OpenAiModule, Module (+2 more)

### Community 39 - "provider-registry.service.ts"
Cohesion: 0.07
Nodes (29): ChatToolingDto, IsArray, Type, ValidateNested, ApiErrorCode, DEFAULT_HTTP_STATUS_TO_CODE, ApiErrorPayload, UnsupportedProviderException (+21 more)

### Community 40 - "RunRepository"
Cohesion: 0.06
Nodes (25): Inject, Inject, Inject, Inject, Inject, Inject, RecoverInterruptedRunsUseCase, Inject (+17 more)

### Community 41 - "api/src/app.module.ts"
Cohesion: 0.06
Nodes (52): CompanyContextModule, Module, ContentPipelineFacade, toOutcome(), Injectable, ContentRunExecutor, isCanonicalOutlineSelection(), isMissingContentKind() (+44 more)

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.12
Nodes (21): ApiOpenAiErrorResponses(), OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+13 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (28): brand, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createInvitationId(), createRequestId() (+20 more)

### Community 44 - "app-metrics.module.ts"
Cohesion: 0.10
Nodes (13): resolveAppMetricsBackend(), Inject, APP_METRICS_BACKEND, MetricsController, ApiOperation, ApiResponse, ApiTags, Controller (+5 more)

### Community 45 - "openai-chat-completions.controller.ts"
Cohesion: 0.15
Nodes (23): GATEWAY_CACHE_HEADER, fromGatewayToolCallDto(), OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto (+15 more)

### Community 46 - "should-include-redis-stack.ts"
Cohesion: 0.18
Nodes (11): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis() (+3 more)

### Community 47 - "anthropic-models.controller.ts"
Cohesion: 0.23
Nodes (11): AnthropicErrorBodyDto, AnthropicErrorResponseDto, ApiProperty, AnthropicModelDto, AnthropicModelsListResponseDto, ApiProperty, mapGatewayModelsListToAnthropic(), mapGatewayModelToAnthropic() (+3 more)

### Community 48 - "exitWithAgentReport"
Cohesion: 0.13
Nodes (9): exitCodeForReport(), exitWithAgentReport(), toSafeClientList(), toSafeProviderList(), WizardState, Injectable, WizardOrchestratorService, Injectable (+1 more)

### Community 49 - "chat-params.dto.ts"
Cohesion: 0.24
Nodes (7): ResponseFormatDto, ApiProperty, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsThinkingBudget()

### Community 50 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 51 - "LogContext"
Cohesion: 0.26
Nodes (3): PinoLoggerAdapter, Injectable, LogContext

### Community 52 - "InProcessRunWorker"
Cohesion: 0.17
Nodes (5): InProcessRunWorker, Injectable, Inject, StubRunExecutor, Injectable

### Community 53 - "DomainException"
Cohesion: 0.10
Nodes (24): AcceptInviteResult, acceptInviteSchema, hashPassword(), validatePasswordPolicy(), FinalizeReviewUseCase, Injectable, GetRunLogsOutput, GetRunLogsUseCase (+16 more)

### Community 54 - "LoggingService"
Cohesion: 0.10
Nodes (9): Inject, Inject, VectorStore, Inject, Optional, LoggingService, Injectable, Inject (+1 more)

### Community 55 - "company-context.controller.ts"
Cohesion: 0.21
Nodes (14): toCompanyContext(), toPartialCompanyContext(), toPublicCompanyContext(), GetCompanyContextUseCase, Injectable, GetCompletenessUseCase, Injectable, PatchCompanyContextUseCase (+6 more)

### Community 56 - ".getOne"
Cohesion: 0.19
Nodes (11): ApiAnthropicErrorResponses(), AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+3 more)

### Community 57 - "ModelAlias"
Cohesion: 0.06
Nodes (6): ProviderTestOptions, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, AppMetricsBackend

### Community 58 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.26
Nodes (10): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty, ApiPropertyOptional (+2 more)

### Community 59 - "HealthController"
Cohesion: 0.16
Nodes (11): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, HealthModule, Module (+3 more)

### Community 60 - "response-cache.service.ts"
Cohesion: 0.16
Nodes (13): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), CACHE_BACKEND, ResponseCacheService, Injectable, isSingleTurnUserRequest(), lastUserMessageText() (+5 more)

### Community 61 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 62 - "chat-provider-call.service.ts"
Cohesion: 0.09
Nodes (35): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+27 more)

### Community 63 - "cache.module.ts"
Cohesion: 0.11
Nodes (15): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, CacheModule, CacheModuleOptions (+7 more)

### Community 64 - "ConsoleLoggerAdapter"
Cohesion: 0.45
Nodes (3): ConsoleLoggerAdapter, Injectable, LogLevel

### Community 66 - "reactivate-user.use-case.ts"
Cohesion: 0.05
Nodes (34): BootstrapAdminInput, bootstrapAdminSchema, LoginInput, loginSchema, PatchUserCommand, patchUserSchema, ListUsersUseCase, Inject (+26 more)

### Community 67 - "CompanyContextRepository"
Cohesion: 0.16
Nodes (8): Inject, Inject, Inject, Inject, CompanyContextRepository, CompanyContext, PrismaCompanyContextAdapter, Injectable

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (18): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+10 more)

### Community 69 - "auth.module.ts"
Cohesion: 0.07
Nodes (36): AcceptInviteUseCase, Inject, Injectable, InviteUserResult, inviteUserSchema, InviteUserUseCase, Inject, Injectable (+28 more)

### Community 70 - "InvitationsController"
Cohesion: 0.16
Nodes (9): InvitationsController, ApiCookieAuth, ApiTags, Controller, Delete, Get, HttpCode, Param (+1 more)

### Community 71 - "GlobalExceptionFilter"
Cohesion: 0.32
Nodes (4): GlobalExceptionFilter, isPayloadTooLargeError(), Catch, Injectable

### Community 73 - "prisma-invitation.adapter.ts"
Cohesion: 0.15
Nodes (16): JwtPayload, AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord (+8 more)

### Community 74 - "logout-dialog.tsx"
Cohesion: 0.19
Nodes (11): logoutSession(), LogoutDialog(), confirm(), LogoutDialogProps, Dialog(), DialogContent(), DialogDescription(), DialogFooter() (+3 more)

### Community 75 - "prisma-company-context.adapter.ts"
Cohesion: 0.16
Nodes (15): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, Completeness (+7 more)

### Community 76 - "runs.controller.ts"
Cohesion: 0.07
Nodes (31): ApiCookieAuth, Patch, Body, ListRunsUserItem, ListRunsUserOutput, ListRunsUserUseCase, Injectable, HitlDto (+23 more)

### Community 77 - "UserRepository"
Cohesion: 0.08
Nodes (20): BootstrapStatusUseCase, Inject, Injectable, MeUseCase, Inject, Injectable, Inject, Injectable (+12 more)

### Community 78 - "company-context.schemas.ts"
Cohesion: 0.33
Nodes (5): companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.06
Nodes (39): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), GatewayChatResponse (+31 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - "public.decorator.ts"
Cohesion: 0.38
Nodes (3): IS_PUBLIC_KEY, JwtAuthGuard, Injectable

### Community 82 - "responses.adapter.ts"
Cohesion: 0.06
Nodes (69): toCachedChatResponse(), toHttpException(), asInputTokens(), asOutputTokens(), asSystemFingerprint(), asToolCallId(), getUsageMetadata(), buildGenerationConfig() (+61 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "ListRunsQueryDto"
Cohesion: 0.11
Nodes (14): ListRunsUseCase, Inject, Injectable, ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional (+6 more)

### Community 85 - "start-run.use-case.ts"
Cohesion: 0.12
Nodes (23): contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, socialBriefSchema (+15 more)

### Community 86 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 87 - "KeyGeneratorService"
Cohesion: 0.09
Nodes (14): ClientAddCommand, Command, Option, KeyGenerateCommand, Command, Option, KeyGeneratorService, Injectable (+6 more)

### Community 88 - "ChatParamsDto"
Cohesion: 0.20
Nodes (10): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+2 more)

### Community 89 - "login-card.tsx"
Cohesion: 0.11
Nodes (30): UsersPage(), geistMono, geistSans, metadata, acceptInvite(), bootstrapAdmin(), Credentials, fetchBootstrapStatus() (+22 more)

### Community 90 - "getAppConfig"
Cohesion: 0.19
Nodes (11): getAppConfig(), GatewayKeyGuard, Injectable, enrichRequestWithClientId(), AnthropicApiKeyGuard, readAnthropicApiKey(), Injectable, OpenAiBearerAuthGuard (+3 more)

### Community 91 - "PrismaRefreshSessionAdapter"
Cohesion: 0.27
Nodes (4): RefreshSessionRecord, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable

### Community 93 - "HttpExceptionFilter"
Cohesion: 0.20
Nodes (6): ErrorEnvelope, HttpExceptionFilter, Catch, newRequestId(), RequestIdMiddleware, Injectable

### Community 94 - "openai-params-provider.mapper.ts"
Cohesion: 0.12
Nodes (24): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+16 more)

### Community 95 - "PrometheusAppMetricsAdapter"
Cohesion: 0.14
Nodes (4): PrometheusAppMetricsAdapter, Injectable, AppProviderCallContext, AppTokenUsage

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
Cohesion: 0.05
Nodes (37): CreateFeedbackUseCase, Inject, Injectable, agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_RUN_READER, FeedbackRunLookup (+29 more)

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

### Community 108 - "configure-swagger.ts"
Cohesion: 0.15
Nodes (13): AppModule, Module, bootstrap(), EnvModule, Global, Module, envSchema, parseCorsOrigins() (+5 more)

### Community 109 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 110 - "auth.controller.ts"
Cohesion: 0.08
Nodes (31): comparePassword(), generateRefreshToken(), hashRefreshToken(), parseTtlMs(), parseTtlSeconds(), AuthTokenResult, BootstrapAdminUseCase, Inject (+23 more)

### Community 112 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 113 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 114 - "cn"
Cohesion: 0.06
Nodes (43): AcceptInvitePageProps, AcceptInviteForm(), onSubmit(), AcceptInviteFormProps, passwordMeetsPolicy(), AppHeaderProps, Button(), buttonVariants (+35 more)

### Community 115 - "CompanyContextController"
Cohesion: 0.15
Nodes (9): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Body, Controller, Get, Patch (+1 more)

### Community 117 - "ChatResponseDto"
Cohesion: 0.12
Nodes (18): ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString, ChatWarningDto, ApiProperty (+10 more)

### Community 120 - "openai-chat-message.dto.ts"
Cohesion: 0.60
Nodes (3): isTextContentItem(), normalizeOpenAiContent(), TextContentItem

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 126 - "FileManagerService"
Cohesion: 0.10
Nodes (12): ConfigInitCommand, Command, Option, ConfigValidateCommand, Command, Option, CliGatewayValidatorService, Injectable (+4 more)

### Community 129 - "InMemoryRunSseHub"
Cohesion: 0.39
Nodes (3): RunSseEvent, InMemoryRunSseHub, Injectable

### Community 145 - "dashboard-shell.tsx"
Cohesion: 0.12
Nodes (15): AppHeader(), AppSidebar(), AppSidebarProps, CompletenessChipSlot(), FeedbackCtaSlot(), FloatingBoxSlot(), DashboardShell(), EventSourceRegistryContext (+7 more)

## Knowledge Gaps
- **337 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+332 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1033 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `LoggingService` connect `LoggingService` to `logging.service.ts`, `types/index.ts`, `provider-error.mapper.ts`, `semantic-cache.service.ts`, `redis-vector-store.adapter.ts`, `GatewayKey`, `anthropic/anthropic-tools.mapper.ts`, `ai-provider-gateway/src/app.module.ts`, `chat.service.ts`, `HealthService`, `swagger.setup.ts`, `RedisConnectionService`, `provider-registry.service.ts`, `LogContext`, `ai-provider-gateway/src/health/health.service.ts`, `response-cache.service.ts`, `cache.module.ts`, `LoggerBackend`, `GlobalExceptionFilter`, `responses.adapter.ts`, `provider-instances.bootstrap.ts`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Why does `GatewayConfig` connect `GatewayConfig` to `cli.module.ts`, `ProviderApiKey`, `provider-registry.service.ts`, `asProviderInstanceId`, `models.controller.ts`, `exitWithAgentReport`, `configuration-validation.service.ts`, `model-manager.service.ts`, `chat.service.ts`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Why does `asProviderInstanceId()` connect `asProviderInstanceId` to `cli.module.ts`, `ProviderApiKey`, `provider-instances.bootstrap.ts`, `types/index.ts`, `provider-error.mapper.ts`, `branded.types.ts`, `models.controller.ts`, `exitWithAgentReport`, `responses.adapter.ts`, `GatewayConfig`, `model-manager.service.ts`, `anthropic/anthropic-tools.mapper.ts`, `chat.service.ts`, `chat-provider-call.service.ts`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _337 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `cli.module.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0618694079573577 - nodes in this community are weakly interconnected._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05353535353535353 - nodes in this community are weakly interconnected._