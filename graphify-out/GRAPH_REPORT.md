# Graph Report - content-chain  (2026-09-18)

## Corpus Check
- 608 files · ~174,009 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 2, .css 1)

## Summary
- 3911 nodes · 12066 edges · 129 communities (112 shown, 15 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 374 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `49fd7f96`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- prisma-invitation.adapter.ts
- social.types.ts
- api/company-context.types.ts
- exitWithAgentReport
- runs.types.ts
- start-run-form.tsx
- app-metrics.service.ts
- logging.service.ts
- anthropic/anthropic-tools.mapper.ts
- provider-error.mapper.ts
- content.graph.ts
- users.controller.ts
- social.graph.ts
- branded.types.ts
- semantic-cache.service.ts
- models.controller.ts
- anthropic-response.mapper.ts
- redis-vector-store.adapter.ts
- runs.controller.ts
- model-manager.service.ts
- sentry-ai-metrics.adapter.ts
- asProviderInstanceId
- anthropic-messages.controller.ts
- response-cache.service.ts
- AnthropicMessagesController
- api/src/app.module.ts
- RunRepository
- auth.module.ts
- save-output-edited.use-case.ts
- chat.service.ts
- types/index.ts
- HealthService
- swagger.setup.ts
- getAppConfig
- AnthropicMessagesRequestDto
- LoggingService
- NoopAppMetricsAdapter
- enums.ts
- resilient-executor.ts
- provider-registry.service.ts
- start-run.use-case.ts
- new-ids.ts
- openai-models.controller.ts
- ids.ts
- app-metrics.module.ts
- filters/http-exception.filter.ts
- ai-provider-gateway/src/health/health.service.ts
- anthropic-models.controller.ts
- .info
- chat-params.dto.ts
- StartRunDto
- prisma.service.ts
- own-runs-provider.tsx
- patch-company-context.use-case.ts
- public.decorator.ts
- CompanyContext
- asGatewayKey
- ModelAlias
- ai-provider-gateway/src/app.module.ts
- HealthController
- AppMetricsService
- company-context.dto.ts
- should-include-redis-stack.ts
- cache.module.ts
- configuration.ts
- provider-input.ts
- invite-user.use-case.ts
- ModelRemoveCommand
- OpenAiChatCompletionRequestDto
- auth.schemas.ts
- ai-provider-gateway/src/health/health.controller.ts
- openai-stream.mapper.ts
- cli.module.ts
- ClientRemoveCommand
- OpenAiChatMessageDto
- ModelAddCommand
- ProviderApiKey
- EnvironmentVariables
- company-context.controller.ts
- llm-gateway.http.adapter.ts
- PrometheusService
- responses.adapter.ts
- AppMetricsBackend
- SPEC — README
- ListRunsQueryDto
- DomainException
- env.schema.ts
- UserRepository
- company-context.mapper.ts
- session-provider.tsx
- .run
- PrismaRefreshSessionAdapter
- ChatToolingDto
- openai-params-provider.mapper.ts
- PrometheusAppMetricsAdapter
- BootstrapAdminDto
- route.ts
- ConfigValidateCommand
- ProviderAddCommand
- LoginDto
- PrismaService
- RolesGuard
- RedisConnectionService
- GatewayConfig
- ModelEditCommand
- ProviderEditCommand
- ProviderRemoveCommand
- cn
- ChatParamsDto
- domain/company-context.types.ts
- CompanyContextController
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
4. `DomainException` - 68 edges
5. `asProviderInstanceId()` - 67 edges
6. `GatewayConfig` - 65 edges
7. `cn()` - 60 edges
8. `GatewayKey` - 59 edges
9. `ClientId` - 54 edges
10. `ChatRequestDto` - 48 edges

## Surprising Connections (you probably didn't know these)
- `toChatResponseDto()` --indirect_call--> `toGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/chat/dto/chat-response.dto.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `ProviderTestOptions` --references--> `ProviderInstanceId`  [EXTRACTED]
  apps/ai-provider-gateway/src/cli/commands/provider/provider-test.command.ts → apps/ai-provider-gateway/src/common/types/branded.types.ts
- `mapGatewayResponseToAnthropicFormat()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/anthropic/mappers/anthropic-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `LiveItemSubscription()` --calls--> `useRunEventSource()`  [EXTRACTED]
  apps/frontend/src/modules/runs/components/own-runs-provider.tsx → apps/frontend/src/modules/runs/components/use-run-event-source.ts
- `CardDescription()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/card.tsx → apps/frontend/src/shared/utils/utils.ts

## Import Cycles
- None detected.

## Communities (129 total, 15 thin omitted)

### Community 0 - "prisma-invitation.adapter.ts"
Cohesion: 0.17
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 1 - "social.types.ts"
Cohesion: 0.06
Nodes (28): CompositeRunResultReader, GetRunOutput, RUN_RESULT_READER, RunResultReader, ContentBrief, SocialBrief, EmptyRunResultReader, Injectable (+20 more)

### Community 2 - "api/company-context.types.ts"
Cohesion: 0.07
Nodes (57): fetchCompanyContext(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras, companyContextForPut(), CompanyContextObjection (+49 more)

### Community 3 - "exitWithAgentReport"
Cohesion: 0.10
Nodes (46): AgentReport, AgentReportStatus, emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), loadAnswers(), assertAgentHasAnswers(), CliMode (+38 more)

### Community 4 - "runs.types.ts"
Cohesion: 0.08
Nodes (54): ArchiveRunsQuery, fetchInitiatorOptions(), fetchRunLogs(), fetchRunSnapshot(), fetchUserRuns(), ArchiveRunItem, ArchiveRunsPage, ContentBrief (+46 more)

### Community 5 - "start-run-form.tsx"
Cohesion: 0.09
Nodes (33): notifyProduct(), CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS, RUN_TASK_TYPE_LABELS, fetchArchiveRuns() (+25 more)

### Community 6 - "app-metrics.service.ts"
Cohesion: 0.24
Nodes (12): healthStatusToGaugeValue(), AppRequestLabels, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus, HttpMethod (+4 more)

### Community 7 - "logging.service.ts"
Cohesion: 0.06
Nodes (25): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+17 more)

### Community 8 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.09
Nodes (39): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent() (+31 more)

### Community 9 - "provider-error.mapper.ts"
Cohesion: 0.19
Nodes (20): MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isProviderRateLimitError(), isRateLimitStatus(), isServerError(), isTimeoutStatus() (+12 more)

### Community 10 - "content.graph.ts"
Cohesion: 0.07
Nodes (52): CompanyContextRepository, Inject, coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema (+44 more)

### Community 11 - "users.controller.ts"
Cohesion: 0.08
Nodes (22): ListUsersUseCase, Inject, Injectable, SoftDeleteUserUseCase, Inject, Injectable, PatchUserDto, ApiProperty (+14 more)

### Community 12 - "social.graph.ts"
Cohesion: 0.13
Nodes (32): coercePassNoteVerdict(), isPassOnlyIssue(), ideasOutputSchema, reelIdeasOutputSchema, isReelTaskType(), ReelTaskType, canRefine(), MAX_REFINE (+24 more)

### Community 13 - "branded.types.ts"
Cohesion: 0.10
Nodes (43): VectorStorePartition, VectorStoreTextIdentityInput, VectorStoreUpsertInput, CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatCacheSource, ChatResponseData (+35 more)

### Community 14 - "semantic-cache.service.ts"
Cohesion: 0.10
Nodes (19): EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema(), EMBEDDING_CIRCUIT_COOLDOWN_MS, EMBEDDING_CIRCUIT_OPEN_AFTER, EMBEDDING_PROBE_TIMEOUT_MS (+11 more)

### Community 15 - "models.controller.ts"
Cohesion: 0.10
Nodes (22): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+14 more)

### Community 16 - "anthropic-response.mapper.ts"
Cohesion: 0.11
Nodes (30): ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString, SseDoneEvent, asMessageId() (+22 more)

### Community 17 - "redis-vector-store.adapter.ts"
Cohesion: 0.16
Nodes (16): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), asString(), ParsedKnnHits, parseKnnHits() (+8 more)

### Community 18 - "runs.controller.ts"
Cohesion: 0.06
Nodes (37): ApiCookieAuth, Patch, JwtPayload, Body, ListRunsUseCase, Injectable, ListRunsUserItem, ListRunsUserOutput (+29 more)

### Community 19 - "model-manager.service.ts"
Cohesion: 0.13
Nodes (25): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, defaultModelPolicy(), ModelEditField, ModelManagerService, Injectable (+17 more)

### Community 20 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.09
Nodes (27): NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes(), clearLlmScopeContext() (+19 more)

### Community 21 - "asProviderInstanceId"
Cohesion: 0.13
Nodes (27): WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, InitAnswers, CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema, convertClient() (+19 more)

### Community 22 - "anthropic-messages.controller.ts"
Cohesion: 0.05
Nodes (54): ApiHeader, GATEWAY_CACHE_HEADER, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags (+46 more)

### Community 23 - "response-cache.service.ts"
Cohesion: 0.15
Nodes (13): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), CACHE_BACKEND, ResponseCacheService, Injectable, isSingleTurnUserRequest(), lastUserMessageText() (+5 more)

### Community 24 - "AnthropicMessagesController"
Cohesion: 0.18
Nodes (8): AnthropicMessagesController, ApiSecurity, ApiTags, Controller, OpenAiChatCompletionsController, ApiSecurity, ApiTags, Controller

### Community 25 - "api/src/app.module.ts"
Cohesion: 0.06
Nodes (55): AuthModule, Module, CompanyContextModule, Module, ContentPipelineFacade, toOutcome(), Injectable, ContentRunExecutor (+47 more)

### Community 26 - "RunRepository"
Cohesion: 0.04
Nodes (45): Inject, Inject, Inject, Inject, ListRunsOutput, Inject, Inject, Inject (+37 more)

### Community 27 - "auth.module.ts"
Cohesion: 0.06
Nodes (51): AcceptInviteUseCase, Injectable, comparePassword(), generateRefreshToken(), hashRefreshToken(), parseTtlMs(), parseTtlSeconds(), AuthTokenResult (+43 more)

### Community 28 - "save-output-edited.use-case.ts"
Cohesion: 0.09
Nodes (33): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+25 more)

### Community 29 - "chat.service.ts"
Cohesion: 0.05
Nodes (55): SemanticStoreEmbedState, CacheIdentityMessage, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray (+47 more)

### Community 30 - "types/index.ts"
Cohesion: 0.07
Nodes (54): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, convertRateLimit(), CliRateLimit, GatewayClient, ClientBasicAnswers (+46 more)

### Community 31 - "HealthService"
Cohesion: 0.26
Nodes (3): HealthReadinessResponseDto, HealthService, Injectable

### Community 32 - "swagger.setup.ts"
Cohesion: 0.11
Nodes (23): AppModule, Module, ChatOutputTextDto, ApiProperty, ChatUsageDto, ApiPropertyOptional, SseDeltaPayloadDto, ApiProperty (+15 more)

### Community 33 - "getAppConfig"
Cohesion: 0.10
Nodes (18): resolveClientIdFromKey(), ResolvedGatewayClient, getAppConfig(), GatewayKeyGuard, Injectable, enrichRequestWithClientId(), SmartRateLimitGuard, Injectable (+10 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "LoggingService"
Cohesion: 0.08
Nodes (10): Inject, OllamaEmbeddingAdapter, Injectable, EmbeddingBackend, Inject, VectorStore, LoggingService, Injectable (+2 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "resilient-executor.ts"
Cohesion: 0.17
Nodes (18): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+10 more)

### Community 39 - "provider-registry.service.ts"
Cohesion: 0.09
Nodes (18): clamp(), isOverrideKey(), resolveProviderCallOptions(), OVERRIDE_KEYS, OverrideKey, ApiErrorCode, ApiErrorPayload, UnsupportedProviderException (+10 more)

### Community 40 - "start-run.use-case.ts"
Cohesion: 0.10
Nodes (18): InProcessRunWorker, Injectable, ParsedStartRunCommand, startRunCommandSchema, isContentStartCommand(), isPlainRecord(), omitUndefinedDeep(), StartRunBriefInput (+10 more)

### Community 41 - "new-ids.ts"
Cohesion: 0.18
Nodes (7): ErrorEnvelope, HttpExceptionFilter, Catch, newInvitationId(), newRequestId(), RequestIdMiddleware, Injectable

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.13
Nodes (21): ApiOpenAiErrorResponses(), OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+13 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (28): brand, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createInvitationId(), createRequestId() (+20 more)

### Community 44 - "app-metrics.module.ts"
Cohesion: 0.12
Nodes (11): APP_METRICS_BACKEND, MetricsController, ApiOperation, ApiResponse, ApiTags, Controller, Get, PreMetricsScrapeHook (+3 more)

### Community 45 - "filters/http-exception.filter.ts"
Cohesion: 0.21
Nodes (7): DEFAULT_HTTP_STATUS_TO_CODE, GlobalExceptionFilter, isPayloadTooLargeError(), PayloadTooLargeError, RequestWithId, Catch, Injectable

### Community 46 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.24
Nodes (11): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiProperty, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty (+3 more)

### Community 47 - "anthropic-models.controller.ts"
Cohesion: 0.11
Nodes (23): ApiAnthropicErrorResponses(), AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+15 more)

### Community 48 - ".info"
Cohesion: 0.07
Nodes (22): ConfigInitCommand, Command, Option, CliGatewayValidatorService, Injectable, WizardState, ConfigGeneratorService, Injectable (+14 more)

### Community 49 - "chat-params.dto.ts"
Cohesion: 0.24
Nodes (7): ResponseFormatDto, ApiProperty, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsThinkingBudget()

### Community 50 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 51 - "prisma.service.ts"
Cohesion: 0.24
Nodes (6): Inject, OutputEditedWrite, OutputEditedWriter, applyWrite(), PrismaOutputEditedAdapter, Injectable

### Community 52 - "own-runs-provider.tsx"
Cohesion: 0.15
Nodes (15): assertNever(), notifyRunTerminal(), EnvelopeRef, ProductToast, RunTerminalInput, RunTerminalOutcome, runTerminalToastId(), viewingRunIdFromPathname() (+7 more)

### Community 53 - "patch-company-context.use-case.ts"
Cohesion: 0.27
Nodes (8): toPublicCompanyContext(), PatchCompanyContextUseCase, Inject, Injectable, assertCompanyContextWritable(), PartialCompanyContext, isComplete(), mergeCompanyContext()

### Community 54 - "public.decorator.ts"
Cohesion: 0.38
Nodes (3): IS_PUBLIC_KEY, JwtAuthGuard, Injectable

### Community 55 - "CompanyContext"
Cohesion: 0.26
Nodes (5): CompanyContext, jsonArray(), jsonRecord(), PrismaCompanyContextAdapter, Injectable

### Community 56 - "asGatewayKey"
Cohesion: 0.36
Nodes (5): StreamCleanupInterceptor, Injectable, readClientGatewayKey(), readGatewayKeyHeader(), asGatewayKey()

### Community 57 - "ModelAlias"
Cohesion: 0.08
Nodes (22): getClientConversationId(), getOrCreateConversationIdForResponse(), buildAppProviderMetricsContext(), buildLlmMetricsContext(), mapProviderResponseToUsage(), ChatProviderCallService, CompleteOnceResult, Injectable (+14 more)

### Community 58 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.10
Nodes (21): ChatModule, Module, HealthModule, Module, AnthropicModule, Module, IntegrationsModule, Module (+13 more)

### Community 59 - "HealthController"
Cohesion: 0.16
Nodes (11): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, HealthModule, Module (+3 more)

### Community 60 - "AppMetricsService"
Cohesion: 0.12
Nodes (6): HttpMetricsMiddleware, Injectable, Inject, Optional, AppMetricsService, Injectable

### Community 61 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 62 - "should-include-redis-stack.ts"
Cohesion: 0.18
Nodes (12): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement() (+4 more)

### Community 63 - "cache.module.ts"
Cohesion: 0.10
Nodes (17): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+9 more)

### Community 64 - "configuration.ts"
Cohesion: 0.05
Nodes (63): collectPendingSecrets(), ProviderTestOptions, CliValidateOptions, AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig, SemanticCacheRuntimeConfig (+55 more)

### Community 65 - "provider-input.ts"
Cohesion: 0.05
Nodes (51): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+43 more)

### Community 66 - "invite-user.use-case.ts"
Cohesion: 0.05
Nodes (40): Inject, InviteUserResult, inviteUserSchema, InviteUserUseCase, Inject, Injectable, InvitationListItem, ListInvitationsUseCase (+32 more)

### Community 67 - "ModelRemoveCommand"
Cohesion: 0.33
Nodes (3): ModelRemoveCommand, Command, Option

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (18): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+10 more)

### Community 69 - "auth.schemas.ts"
Cohesion: 0.29
Nodes (6): BootstrapAdminInput, bootstrapAdminSchema, LoginInput, loginSchema, PatchUserCommand, patchUserSchema

### Community 70 - "ai-provider-gateway/src/health/health.controller.ts"
Cohesion: 0.15
Nodes (11): HealthLivenessResponseDto, ApiProperty, HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get (+3 more)

### Community 71 - "openai-stream.mapper.ts"
Cohesion: 0.17
Nodes (21): fromGatewayToolCallDto(), OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty (+13 more)

### Community 72 - "cli.module.ts"
Cohesion: 0.04
Nodes (47): CliModule, Module, ClientAddCommand, Command, Option, ClientEditCommand, Command, Option (+39 more)

### Community 73 - "ClientRemoveCommand"
Cohesion: 0.33
Nodes (3): ClientRemoveCommand, Command, Option

### Community 74 - "OpenAiChatMessageDto"
Cohesion: 0.22
Nodes (9): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+1 more)

### Community 75 - "ModelAddCommand"
Cohesion: 0.33
Nodes (3): ModelAddCommand, Command, Option

### Community 76 - "ProviderApiKey"
Cohesion: 0.16
Nodes (9): ProviderTestCommand, Command, Option, CliAiProvider, ProviderTestService, Injectable, ProviderCli, BaseUrl (+1 more)

### Community 77 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 78 - "company-context.controller.ts"
Cohesion: 0.19
Nodes (10): GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PutCompanyContextUseCase, Inject (+2 more)

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.05
Nodes (40): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), GatewayChatResponse (+32 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - "responses.adapter.ts"
Cohesion: 0.06
Nodes (68): mapProviderResponseToAiObservation(), toHttpException(), asInputTokens(), asOutputTokens(), asSystemFingerprint(), asToolCallId(), getUsageMetadata(), buildGenerationConfig() (+60 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+2 more)

### Community 85 - "DomainException"
Cohesion: 0.06
Nodes (40): AcceptInviteResult, acceptInviteSchema, hashPassword(), ReactivateUserUseCase, Injectable, Injectable, updateEmailSchema, UpdateMeEmailUseCase (+32 more)

### Community 86 - "env.schema.ts"
Cohesion: 0.17
Nodes (11): AppModule, Module, bootstrap(), EnvModule, Global, Module, envSchema, parseCorsOrigins() (+3 more)

### Community 87 - "UserRepository"
Cohesion: 0.09
Nodes (14): Inject, Inject, Inject, Inject, AuthUser, CreateAdminIfNoneData, CreateAdminIfNoneResult, UserForAuth (+6 more)

### Community 88 - "company-context.mapper.ts"
Cohesion: 0.15
Nodes (11): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+3 more)

### Community 89 - "session-provider.tsx"
Cohesion: 0.07
Nodes (46): UsersPage(), AcceptInvitePageProps, geistMono, geistSans, metadata, acceptInvite(), bootstrapAdmin(), Credentials (+38 more)

### Community 90 - ".run"
Cohesion: 0.23
Nodes (3): KeyGenerateCommand, Command, Option

### Community 91 - "PrismaRefreshSessionAdapter"
Cohesion: 0.27
Nodes (4): RefreshSessionRecord, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable

### Community 93 - "ChatToolingDto"
Cohesion: 0.16
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 94 - "openai-params-provider.mapper.ts"
Cohesion: 0.12
Nodes (24): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+16 more)

### Community 95 - "PrometheusAppMetricsAdapter"
Cohesion: 0.12
Nodes (5): PrometheusAppMetricsAdapter, Injectable, resolveAppMetricsBackend(), AppProviderCallContext, AppProviderStreamScope

### Community 96 - "BootstrapAdminDto"
Cohesion: 0.33
Nodes (5): BootstrapAdminDto, ApiProperty, IsEmail, IsString, MinLength

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 98 - "ConfigValidateCommand"
Cohesion: 0.40
Nodes (3): ConfigValidateCommand, Command, Option

### Community 99 - "ProviderAddCommand"
Cohesion: 0.31
Nodes (3): ProviderAddCommand, Command, Option

### Community 100 - "LoginDto"
Cohesion: 0.33
Nodes (5): LoginDto, ApiProperty, IsEmail, IsString, MinLength

### Community 101 - "PrismaService"
Cohesion: 0.05
Nodes (37): CreateFeedbackUseCase, Inject, Injectable, agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_RUN_READER, FeedbackRunLookup (+29 more)

### Community 104 - "RedisConnectionService"
Cohesion: 0.30
Nodes (3): RedisConnectionService, Injectable, isRedisRequiredFromConfig()

### Community 105 - "GatewayConfig"
Cohesion: 0.08
Nodes (22): PendingSecretsItem, assertInteractiveAllowed(), ClientManagerService, Injectable, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable, EnvPatchService (+14 more)

### Community 107 - "ModelEditCommand"
Cohesion: 0.33
Nodes (3): ModelEditCommand, Command, Option

### Community 109 - "ProviderEditCommand"
Cohesion: 0.33
Nodes (3): ProviderEditCommand, Command, Option

### Community 113 - "ProviderRemoveCommand"
Cohesion: 0.33
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 114 - "cn"
Cohesion: 0.06
Nodes (48): AppHeaderProps, AppSidebar(), AppSidebarProps, CompletenessChipSlot(), LogoutDialogProps, APP_NAV, AppNavItem, navItemsForRole() (+40 more)

### Community 116 - "ChatParamsDto"
Cohesion: 0.20
Nodes (10): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+2 more)

### Community 117 - "domain/company-context.types.ts"
Cohesion: 0.18
Nodes (18): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CompanyContextWriteDetail (+10 more)

### Community 119 - "CompanyContextController"
Cohesion: 0.22
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

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
Cohesion: 0.10
Nodes (20): fetchCompleteness(), CompletenessState, GATE_SECTION_LABELS, CompletenessChip(), CompletenessContext, CompletenessContextValue, CompletenessProvider(), FALLBACK_ENVELOPE (+12 more)

## Knowledge Gaps
- **342 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+337 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1037 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `LoggingService` connect `LoggingService` to `logging.service.ts`, `anthropic/anthropic-tools.mapper.ts`, `provider-error.mapper.ts`, `branded.types.ts`, `semantic-cache.service.ts`, `redis-vector-store.adapter.ts`, `response-cache.service.ts`, `chat.service.ts`, `HealthService`, `swagger.setup.ts`, `getAppConfig`, `resilient-executor.ts`, `provider-registry.service.ts`, `filters/http-exception.filter.ts`, `ai-provider-gateway/src/health/health.service.ts`, `AppMetricsService`, `cache.module.ts`, `configuration.ts`, `responses.adapter.ts`, `RedisConnectionService`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Why does `GatewayConfig` connect `GatewayConfig` to `configuration.ts`, `exitWithAgentReport`, `provider-registry.service.ts`, `ProviderApiKey`, `models.controller.ts`, `model-manager.service.ts`, `chat.service.ts`, `types/index.ts`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Why does `asProviderInstanceId()` connect `asProviderInstanceId` to `configuration.ts`, `exitWithAgentReport`, `provider-registry.service.ts`, `anthropic/anthropic-tools.mapper.ts`, `provider-error.mapper.ts`, `cli.module.ts`, `GatewayConfig`, `ProviderApiKey`, `branded.types.ts`, `models.controller.ts`, `.info`, `responses.adapter.ts`, `model-manager.service.ts`, `ModelAlias`, `chat.service.ts`, `types/index.ts`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _342 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05592105263157895 - nodes in this community are weakly interconnected._
- **Should `api/company-context.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06692242114236999 - nodes in this community are weakly interconnected._