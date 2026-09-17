# Graph Report - content-chain  (2026-09-17)

## Corpus Check
- 596 files · ~168,589 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: (none) 3, .css 1)

## Summary
- 3859 nodes · 11860 edges · 132 communities (111 shown, 19 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 373 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8ef20c46`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- cli.module.ts
- social.types.ts
- api/company-context.types.ts
- .error
- runs.types.ts
- run-details-view.tsx
- app-metrics-backend.interface.ts
- LogContext
- anthropic/anthropic-tools.mapper.ts
- provider-error.mapper.ts
- content.graph.ts
- asClientId
- social.graph.ts
- ModelAlias
- semantic-cache.constants.ts
- models.controller.ts
- anthropic-response.mapper.ts
- redis-vector-store.adapter.ts
- GatewayConfig
- configuration.ts
- sentry-ai-metrics.adapter.ts
- asProviderInstanceId
- anthropic-messages.controller.ts
- responses.adapter.ts
- acceptInvite
- api/src/app.module.ts
- ai-provider-gateway/src/app.module.ts
- auth.controller.ts
- save-output-edited.use-case.ts
- chat.service.ts
- api-error.dto.ts
- ApiRequestIdHeader
- ai-provider-gateway/src/main.ts
- prisma-run.adapter.ts
- AnthropicMessagesRequestDto
- RedisConnectionService
- AppMetricsService
- enums.ts
- types/index.ts
- LoggingService
- runs.controller.ts
- public.decorator.ts
- openai-models.controller.ts
- ids.ts
- app-metrics.service.ts
- ConfigInitCommand
- swagger.setup.ts
- anthropic-models.controller.ts
- config-generator.service.ts
- ChatParamsDto
- StartRunDto
- NoopAppMetricsAdapter
- company-context-form.tsx
- logout-dialog.tsx
- response-cache.service.ts
- company-context.controller.ts
- provider-instances.bootstrap.ts
- AppMetricsBackend
- ai-provider-gateway/src/health/health.service.ts
- HealthController
- semantic-cache.service.ts
- company-context.dto.ts
- chat-provider-call.service.ts
- cache.module.ts
- AppMetricsModule
- .getOne
- users.controller.ts
- CompanyContext
- OpenAiChatCompletionRequestDto
- auth.module.ts
- InvitationsController
- openai-stream.mapper.ts
- ClientAddCommand
- prisma-invitation.adapter.ts
- OpenAiChatMessageDto
- prisma-company-context.adapter.ts
- AuthUserContext
- UserRepository
- company-context.mapper.ts
- llm-gateway.http.adapter.ts
- PrometheusService
- .getOne
- .getOne
- SPEC — README
- ListRunsQueryDto
- start-run.use-case.ts
- EnvironmentVariables
- EnvRef
- openai-chat-completion-response.dto.ts
- session-provider.tsx
- branded.types.ts
- RefreshSessionRepository
- GatewayModelsCatalogService
- ActiveStreamsTracker
- openai-params-provider.mapper.ts
- PrometheusAppMetricsAdapter
- .getMetrics
- route.ts
- event-source-registry-provider.tsx
- ProviderAddCommand
- AnthropicExceptionFilter
- PrismaService
- OpenAiExceptionFilter
- RolesGuard
- ClientEditCommand
- ClientRemoveCommand
- ModelAddCommand
- ModelEditCommand
- ProviderInstancesBootstrap
- ProviderEditCommand
- DomainException
- ModelRemoveCommand
- ProviderRemoveCommand
- cn
- CompanyContextController
- ChatResponseDto
- Architektura
- brand.ts
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
- `toChatResponseDto()` --indirect_call--> `toGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/chat/dto/chat-response.dto.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `mapGatewayResponseToAnthropicFormat()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/anthropic/mappers/anthropic-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `optionalEnvRefSchema` --calls--> `asEnvRef()`  [EXTRACTED]
  apps/ai-provider-gateway/src/config/gateway-config.schema.ts → apps/ai-provider-gateway/src/common/types/branded.types.ts
- `DialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/dialog.tsx → apps/frontend/src/shared/utils/utils.ts
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (132 total, 19 thin omitted)

### Community 0 - "cli.module.ts"
Cohesion: 0.07
Nodes (59): AgentReport, AgentReportStatus, emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), loadAnswers(), assertAgentHasAnswers(), CliMode (+51 more)

### Community 1 - "social.types.ts"
Cohesion: 0.06
Nodes (27): CompositeRunResultReader, GetRunOutput, orderItemsBySelectedIds(), RunResultReader, SocialBrief, EmptyRunResultReader, Injectable, toInputJson() (+19 more)

### Community 2 - "api/company-context.types.ts"
Cohesion: 0.09
Nodes (39): fetchCompanyContext(), fetchCompleteness(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, companyContextForPut(), CompanyContextObjection (+31 more)

### Community 3 - ".error"
Cohesion: 0.10
Nodes (14): toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList(), ProviderTestCommand, Command, Option, ProviderTestService (+6 more)

### Community 4 - "runs.types.ts"
Cohesion: 0.07
Nodes (46): ArchiveRunsQuery, fetchArchiveRuns(), fetchInitiatorOptions(), fetchRunLogs(), InitiatorOption, startRun(), ArchiveRunItem, ArchiveRunsPage (+38 more)

### Community 5 - "run-details-view.tsx"
Cohesion: 0.10
Nodes (29): CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS, RUN_TASK_TYPE_LABELS, fetchRunSnapshot(), fetchUserRuns() (+21 more)

### Community 6 - "app-metrics-backend.interface.ts"
Cohesion: 0.12
Nodes (11): healthStatusToGaugeValue(), AppRequestLabels, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus, HttpRequestLabels (+3 more)

### Community 7 - "LogContext"
Cohesion: 0.05
Nodes (26): GlobalExceptionFilter, isPayloadTooLargeError(), Catch, Injectable, ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter (+18 more)

### Community 8 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.09
Nodes (41): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, asInputTokens(), asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel (+33 more)

### Community 9 - "provider-error.mapper.ts"
Cohesion: 0.37
Nodes (14): isAuthError(), isClientError(), isInvalidRequestStatus(), isRateLimitStatus(), isServerError(), isTimeoutStatus(), nameLooksLikeTimeout(), readErrorMessage() (+6 more)

### Community 10 - "content.graph.ts"
Cohesion: 0.07
Nodes (46): coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema, pageOutlineSectionSchema, readNonEmptyString() (+38 more)

### Community 11 - "asClientId"
Cohesion: 0.08
Nodes (41): WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, InitAnswers, CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema, convertClient() (+33 more)

### Community 12 - "social.graph.ts"
Cohesion: 0.13
Nodes (34): loadPromptFromDir(), renderPrompt(), coercePassNoteVerdict(), isPassOnlyIssue(), ideasOutputSchema, reelIdeasOutputSchema, isReelTaskType(), ReelTaskType (+26 more)

### Community 13 - "ModelAlias"
Cohesion: 0.06
Nodes (49): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatCacheSource, ChatResponseData, SseMetaPayload, SseMetaPayloadDto, ApiProperty (+41 more)

### Community 14 - "semantic-cache.constants.ts"
Cohesion: 0.13
Nodes (12): EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema(), EMBEDDING_CIRCUIT_COOLDOWN_MS, EMBEDDING_CIRCUIT_OPEN_AFTER, EMBEDDING_PROBE_TIMEOUT_MS (+4 more)

### Community 15 - "models.controller.ts"
Cohesion: 0.24
Nodes (9): ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, GatewayModelCapabilitiesDto, GatewayModelDto, ApiProperty, ApiPropertyOptional, ModelsListResponseDto (+1 more)

### Community 16 - "anthropic-response.mapper.ts"
Cohesion: 0.13
Nodes (25): SseDoneEvent, asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto, AnthropicTextContentBlockDto (+17 more)

### Community 17 - "redis-vector-store.adapter.ts"
Cohesion: 0.15
Nodes (20): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), asString(), ParsedKnnHits, parseKnnHits() (+12 more)

### Community 18 - "GatewayConfig"
Cohesion: 0.06
Nodes (41): assertInteractiveAllowed(), DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, convertModel(), ConfigPersistenceService, normalizeGatewayConfigForWrite() (+33 more)

### Community 19 - "configuration.ts"
Cohesion: 0.06
Nodes (50): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, CliValidateOptions, asSemanticCacheTtlSeconds(), AppConfiguration, CacheRuntimeConfig (+42 more)

### Community 20 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.11
Nodes (21): NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes(), clearLlmScopeContext() (+13 more)

### Community 21 - "asProviderInstanceId"
Cohesion: 0.13
Nodes (31): PendingSecretsItem, collectPendingSecrets(), DEFAULT_MODELS, convertProvider(), CliAiProvider, ModelPromptResult, ModelPromptService, Injectable (+23 more)

### Community 22 - "anthropic-messages.controller.ts"
Cohesion: 0.04
Nodes (69): ApiHeader, GATEWAY_CACHE_HEADER, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags (+61 more)

### Community 23 - "responses.adapter.ts"
Cohesion: 0.06
Nodes (70): ChatToolingDto, IsArray, Type, ValidateNested, toHttpException(), asOutputTokens(), asSystemFingerprint(), asToolCallId() (+62 more)

### Community 24 - "acceptInvite"
Cohesion: 0.32
Nodes (5): AcceptInvitePageProps, acceptInvite(), AcceptInviteForm(), onSubmit(), passwordMeetsPolicy()

### Community 25 - "api/src/app.module.ts"
Cohesion: 0.06
Nodes (57): AuthModule, Module, Inject, CompanyContextModule, Module, CompanyContextRepository, ContentPipelineFacade, toOutcome() (+49 more)

### Community 26 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.12
Nodes (18): ChatModule, Module, AnthropicModule, Module, IntegrationsModule, Module, OpenAiModule, Module (+10 more)

### Community 27 - "auth.controller.ts"
Cohesion: 0.04
Nodes (53): AcceptInviteUseCase, Inject, Injectable, BootstrapAdminUseCase, Inject, Injectable, BootstrapStatusUseCase, Inject (+45 more)

### Community 28 - "save-output-edited.use-case.ts"
Cohesion: 0.06
Nodes (43): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+35 more)

### Community 29 - "chat.service.ts"
Cohesion: 0.05
Nodes (59): SemanticStoreEmbedState, CacheIdentityMessage, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize (+51 more)

### Community 31 - "ApiRequestIdHeader"
Cohesion: 0.10
Nodes (15): ApiRequestIdHeader(), HealthLivenessResponseDto, ApiProperty, HealthReadinessResponseDto, ApiProperty, HealthController, ApiOkResponse, ApiOperation (+7 more)

### Community 32 - "ai-provider-gateway/src/main.ts"
Cohesion: 0.13
Nodes (15): AppModule, Module, bootstrap(), API_GLOBAL_PREFIX, PORT, setupApp(), exportOpenApi(), OPENAPI_OUTPUT_FILENAME (+7 more)

### Community 33 - "prisma-run.adapter.ts"
Cohesion: 0.07
Nodes (22): contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, runIdSchema, socialBriefSchema (+14 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "RedisConnectionService"
Cohesion: 0.20
Nodes (5): RedisCacheModule, Module, RedisConnectionService, Injectable, isRedisRequiredFromConfig()

### Community 36 - "AppMetricsService"
Cohesion: 0.17
Nodes (5): HttpMetricsMiddleware, Injectable, AppMetricsService, Injectable, HttpMethod

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "types/index.ts"
Cohesion: 0.07
Nodes (45): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+37 more)

### Community 39 - "LoggingService"
Cohesion: 0.10
Nodes (9): Inject, Inject, VectorStore, Inject, Optional, LoggingService, Injectable, Inject (+1 more)

### Community 40 - "runs.controller.ts"
Cohesion: 0.03
Nodes (62): FinalizeReviewUseCase, Inject, Injectable, Inject, GetRunUseCase, Inject, Injectable, InProcessRunWorker (+54 more)

### Community 41 - "public.decorator.ts"
Cohesion: 0.38
Nodes (3): IS_PUBLIC_KEY, JwtAuthGuard, Injectable

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.21
Nodes (12): ApiOpenAiErrorResponses(), ANTHROPIC_INTEGRATION_PATH, OPENAI_INTEGRATION_PATH, OpenAiErrorBodyDto, OpenAiErrorResponseDto, ApiProperty, ApiPropertyOptional, OpenAiModelDto (+4 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (28): brand, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createInvitationId(), createRequestId() (+20 more)

### Community 44 - "app-metrics.service.ts"
Cohesion: 0.22
Nodes (7): APP_METRICS_BACKEND, MetricsController, ApiTags, Controller, PreMetricsScrapeHook, PreMetricsScrapeRegistry, Injectable

### Community 45 - "ConfigInitCommand"
Cohesion: 0.14
Nodes (8): ConfigInitCommand, Command, Option, ConfigValidateCommand, Command, Option, CliGatewayValidatorService, Injectable

### Community 46 - "swagger.setup.ts"
Cohesion: 0.11
Nodes (19): ChatOutputTextDto, ApiProperty, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsOptional, IsString, ChatUsageDto (+11 more)

### Community 47 - "anthropic-models.controller.ts"
Cohesion: 0.28
Nodes (10): ApiAnthropicErrorResponses(), AnthropicErrorBodyDto, AnthropicErrorResponseDto, ApiProperty, AnthropicModelDto, AnthropicModelsListResponseDto, ApiProperty, mapGatewayModelsListToAnthropic() (+2 more)

### Community 48 - "config-generator.service.ts"
Cohesion: 0.10
Nodes (23): isRedisRequired(), WizardState, ConfigGeneratorService, Injectable, FileManagerService, Injectable, BasicServerAnswers, CacheAnswers (+15 more)

### Community 49 - "ChatParamsDto"
Cohesion: 0.12
Nodes (17): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+9 more)

### Community 50 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 51 - "NoopAppMetricsAdapter"
Cohesion: 0.18
Nodes (3): NoopAppMetricsAdapter, Injectable, resolveAppMetricsBackend()

### Community 52 - "company-context-form.tsx"
Cohesion: 0.12
Nodes (21): CompanyContextExtras, CONTEXT_TAB_LABELS, ContextTab, DEFAULT_CONTEXT_TAB, GATE_SECTIONS, GateSection, gateTabIsMissing(), commaToList() (+13 more)

### Community 53 - "logout-dialog.tsx"
Cohesion: 0.19
Nodes (11): logoutSession(), LogoutDialog(), confirm(), LogoutDialogProps, Dialog(), DialogContent(), DialogDescription(), DialogFooter() (+3 more)

### Community 54 - "response-cache.service.ts"
Cohesion: 0.27
Nodes (7): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, ChatCacheIdentity, asCacheKey()

### Community 55 - "company-context.controller.ts"
Cohesion: 0.15
Nodes (15): toPublicCompanyContext(), GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Injectable, PatchCompanyContextUseCase, Inject (+7 more)

### Community 56 - "provider-instances.bootstrap.ts"
Cohesion: 0.27
Nodes (10): GatewayProviderInstanceConfig, assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryFn (+2 more)

### Community 58 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.11
Nodes (21): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisConsumer, RedisRequirementSnapshot, resolveCacheForRequirement() (+13 more)

### Community 59 - "HealthController"
Cohesion: 0.16
Nodes (11): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, HealthModule, Module (+3 more)

### Community 60 - "semantic-cache.service.ts"
Cohesion: 0.10
Nodes (15): OllamaEmbeddingAdapter, Injectable, EmbeddingBackend, isSingleTurnUserRequest(), lastUserMessageText(), embeddingProbeTimeoutMs(), SemanticCacheModule, Module (+7 more)

### Community 61 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 62 - "chat-provider-call.service.ts"
Cohesion: 0.07
Nodes (39): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+31 more)

### Community 63 - "cache.module.ts"
Cohesion: 0.10
Nodes (16): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, CacheModule, CacheModuleOptions (+8 more)

### Community 64 - "AppMetricsModule"
Cohesion: 0.12
Nodes (13): AiMetricsModule, Global, Module, AppMetricsModule, Global, Module, ObservabilityModule, Global (+5 more)

### Community 65 - ".getOne"
Cohesion: 0.19
Nodes (11): ApiGatewayModelsErrorResponses(), ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+3 more)

### Community 66 - "users.controller.ts"
Cohesion: 0.06
Nodes (30): AppModule, Module, ListUsersUseCase, Inject, Injectable, ReactivateUserUseCase, Inject, Injectable (+22 more)

### Community 67 - "CompanyContext"
Cohesion: 0.35
Nodes (3): CompanyContext, PrismaCompanyContextAdapter, Injectable

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (19): IsStringOrArrayOfStrings(), OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray (+11 more)

### Community 69 - "auth.module.ts"
Cohesion: 0.08
Nodes (34): InviteUserResult, inviteUserSchema, InviteUserUseCase, Inject, Injectable, ListInvitationsUseCase, Injectable, ResendInvitationUseCase (+26 more)

### Community 70 - "InvitationsController"
Cohesion: 0.13
Nodes (13): InviteUserDto, ApiProperty, IsEmail, InvitationsController, ApiCookieAuth, ApiTags, Body, Controller (+5 more)

### Community 71 - "openai-stream.mapper.ts"
Cohesion: 0.31
Nodes (12): fromGatewayToolCallDto(), mapChatResponseToOpenAi(), mapFinishReasontoOpenAI(), mapGatewayToolCallsToOpenAi(), mapSystemFingerprintToOpenAi(), toOpenAiCompletionId(), baseChunkFields(), buildToolCallsDelta() (+4 more)

### Community 72 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 73 - "prisma-invitation.adapter.ts"
Cohesion: 0.12
Nodes (20): InvitationListItem, Inject, Inject, AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, INVITATION_REPOSITORY (+12 more)

### Community 74 - "OpenAiChatMessageDto"
Cohesion: 0.16
Nodes (12): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+4 more)

### Community 75 - "prisma-company-context.adapter.ts"
Cohesion: 0.16
Nodes (15): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, Completeness (+7 more)

### Community 76 - "AuthUserContext"
Cohesion: 0.11
Nodes (18): isTerminalStatus(), RunsController, ApiCookieAuth, ApiTags, Body, Controller, Get, HttpCode (+10 more)

### Community 77 - "UserRepository"
Cohesion: 0.13
Nodes (10): AuthUser, CreateAdminIfNoneData, CreateAdminIfNoneResult, UserForAuth, UserRepository, CreateUserData, isUniqueConstraintViolation(), PrismaUserAdapter (+2 more)

### Community 78 - "company-context.mapper.ts"
Cohesion: 0.16
Nodes (11): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+3 more)

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.05
Nodes (41): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), LlmGatewayError (+33 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - ".getOne"
Cohesion: 0.19
Nodes (10): AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+2 more)

### Community 82 - ".getOne"
Cohesion: 0.19
Nodes (10): OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+2 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+2 more)

### Community 85 - "start-run.use-case.ts"
Cohesion: 0.10
Nodes (20): ParsedStartRunCommand, startRunCommandSchema, isContentStartCommand(), isPlainRecord(), omitUndefinedDeep(), StartRunBriefInput, StartRunCommand, makeContentRun() (+12 more)

### Community 86 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 87 - "EnvRef"
Cohesion: 0.12
Nodes (12): ConfigSecretsStatusCommand, Command, Option, KeyGenerateCommand, Command, Option, EnvPatchService, Injectable (+4 more)

### Community 88 - "openai-chat-completion-response.dto.ts"
Cohesion: 0.39
Nodes (8): OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty, ApiPropertyOptional

### Community 89 - "session-provider.tsx"
Cohesion: 0.12
Nodes (26): geistMono, geistSans, metadata, bootstrapAdmin(), Credentials, fetchBootstrapStatus(), fetchUserSession(), loginWithPassword() (+18 more)

### Community 90 - "branded.types.ts"
Cohesion: 0.05
Nodes (41): ChatErrorHandlerService, Injectable, isProviderRateLimitError(), StreamCleanupInterceptor, Injectable, readClientGatewayKey(), readGatewayKeyHeader(), resolveClientIdFromKey() (+33 more)

### Community 91 - "RefreshSessionRepository"
Cohesion: 0.13
Nodes (6): Inject, RefreshSessionRecord, RefreshSessionRepository, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable

### Community 94 - "openai-params-provider.mapper.ts"
Cohesion: 0.12
Nodes (24): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+16 more)

### Community 95 - "PrometheusAppMetricsAdapter"
Cohesion: 0.13
Nodes (5): PrometheusAppMetricsAdapter, Injectable, AppProviderCallContext, AppProviderStreamScope, AppTokenUsage

### Community 96 - ".getMetrics"
Cohesion: 0.29
Nodes (4): ApiOperation, ApiResponse, Get, Header

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 98 - "event-source-registry-provider.tsx"
Cohesion: 0.43
Nodes (5): EventSourceRegistryContext, EventSourceRegistryProvider(), createEventSourceRegistry(), EventSourceRegistry, RegistryEntry

### Community 99 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

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

### Community 109 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 110 - "DomainException"
Cohesion: 0.10
Nodes (30): AcceptInviteResult, acceptInviteSchema, comparePassword(), generateRefreshToken(), hashPassword(), hashRefreshToken(), parseTtlMs(), parseTtlSeconds() (+22 more)

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
Cohesion: 0.29
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 117 - "ChatResponseDto"
Cohesion: 0.13
Nodes (18): ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString, ChatWarningDto, ApiProperty (+10 more)

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 129 - "InMemoryRunSseHub"
Cohesion: 0.29
Nodes (4): RunSseEvent, InMemoryRunSseHub, Inject, Injectable

### Community 145 - "dashboard-shell.tsx"
Cohesion: 0.10
Nodes (18): UsersPage(), HomeEntry(), useSession(), GATE_SECTION_LABELS, CompletenessChip(), useCompleteness(), AppHeader(), AppSidebar() (+10 more)

## Knowledge Gaps
- **338 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+333 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1035 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **19 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `LoggingService` connect `LoggingService` to `LogContext`, `anthropic/anthropic-tools.mapper.ts`, `ModelAlias`, `redis-vector-store.adapter.ts`, `anthropic-messages.controller.ts`, `responses.adapter.ts`, `chat.service.ts`, `ApiRequestIdHeader`, `ai-provider-gateway/src/main.ts`, `RedisConnectionService`, `types/index.ts`, `swagger.setup.ts`, `response-cache.service.ts`, `provider-instances.bootstrap.ts`, `ai-provider-gateway/src/health/health.service.ts`, `semantic-cache.service.ts`, `chat-provider-call.service.ts`, `cache.module.ts`, `branded.types.ts`, `ProviderInstancesBootstrap`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Why does `GatewayConfig` connect `GatewayConfig` to `cli.module.ts`, `.error`, `asClientId`, `models.controller.ts`, `configuration.ts`, `asProviderInstanceId`, `anthropic-messages.controller.ts`, `GatewayModelsCatalogService`, `chat.service.ts`, `chat-provider-call.service.ts`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Why does `asProviderInstanceId()` connect `asProviderInstanceId` to `cli.module.ts`, `.error`, `types/index.ts`, `anthropic/anthropic-tools.mapper.ts`, `asClientId`, `ModelAlias`, `models.controller.ts`, `GatewayConfig`, `configuration.ts`, `anthropic-messages.controller.ts`, `provider-instances.bootstrap.ts`, `branded.types.ts`, `GatewayModelsCatalogService`, `chat.service.ts`, `chat-provider-call.service.ts`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _338 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `cli.module.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07008864151721295 - nodes in this community are weakly interconnected._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05643896976483763 - nodes in this community are weakly interconnected._