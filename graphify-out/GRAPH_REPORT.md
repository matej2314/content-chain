# Graph Report - content-chain  (2026-09-29)

## Corpus Check
- 640 files · ~190,246 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .css 1)

## Summary
- 4149 nodes · 12784 edges · 132 communities (115 shown, 16 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 399 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `03229372`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- prisma-invitation.adapter.ts
- social.types.ts
- api/company-context.types.ts
- exitWithAgentReport
- runs.types.ts
- run-details-view.tsx
- ModelAlias
- LogContext
- anthropic/anthropic-tools.mapper.ts
- anthropic.module.ts
- responses.adapter.ts
- auth.module.ts
- social.graph.ts
- branded.types.ts
- DomainException
- models.controller.ts
- anthropic-response.mapper.ts
- RedisVectorStoreAdapter
- AuthUserContext
- PrometheusAppMetricsAdapter
- sentry-ai-metrics.adapter.ts
- gateway-config.schema.ts
- config-generator.service.ts
- InvitationsController
- app-metrics-backend.interface.ts
- notify-product.tsx
- types/index.ts
- start-run.use-case.ts
- save-output-edited.use-case.ts
- configure-swagger.ts
- ChatRequestDto
- HealthService
- swagger.setup.ts
- provider-instances.bootstrap.ts
- AnthropicMessagesRequestDto
- runs-result.types.ts
- ConfigInitCommand
- enums.ts
- feedback-form.tsx
- auth.controller.ts
- new-ids.ts
- prisma-run.adapter.ts
- openai-models.controller.ts
- ids.ts
- runs.controller.ts
- cache.module.ts
- GatewayKey
- anthropic-models.controller.ts
- health-readiness-response.dto.ts
- ChatParamsDto
- ListRunsQueryDto
- cli.module.ts
- resilient-executor.ts
- semantic-cache.constants.ts
- isRecord
- AppMetricsBackend
- content.graph.ts
- InProcessRunWorker
- redis-vector-store.adapter.ts
- HealthController
- ProviderApiKey
- company-context.dto.ts
- should-include-redis-stack.ts
- redis-cache.adapter.ts
- provider-manager.service.ts
- RefreshSessionRepository
- metrics.ts
- ModelRemoveCommand
- OpenAiChatCompletionRequestDto
- openai-stream.mapper.ts
- company-context.mapper.ts
- config-validator.ts
- ClientAddCommand
- ClientRemoveCommand
- EnvPatchService
- parse-verifier-log-message.ts
- UserRepository
- ChatResponseDto
- CompanyContextRepository
- llm-gateway.http.adapter.ts
- PrometheusService
- patch-company-context.use-case.ts
- HttpMethod
- SPEC — README
- configuration.ts
- api/src/app.module.ts
- app-metrics.service.ts
- asProviderInstanceId
- EnvironmentVariables
- dialog.tsx
- InMemoryRunSseHub
- StartRunDto
- public.decorator.ts
- provider-error.mapper.ts
- ChatToolingDto
- .createMessage
- tooling-types.ts
- route.ts
- asGatewayKey
- ProviderAddCommand
- ModelAddCommand
- PrismaService
- ai-provider-gateway/src/app.module.ts
- ProviderEditCommand
- CompanyContext
- openai-chat-completion-response.dto.ts
- ProviderRemoveCommand
- ModelEditCommand
- GlobalExceptionFilter
- ApiRequestIdHeader
- LoggingService
- VectorStore
- ConfigValidateCommand
- AppProviderStreamScope
- cn
- gateway-key.guard.branded-types.test-d.ts
- domain/company-context.types.ts
- CompanyContextController
- ClientEditCommand
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
4. `DomainException` - 70 edges
5. `asProviderInstanceId()` - 67 edges
6. `GatewayConfig` - 65 edges
7. `cn()` - 62 edges
8. `isRecord()` - 60 edges
9. `GatewayKey` - 59 edges
10. `ClientId` - 54 edges

## Surprising Connections (you probably didn't know these)
- `toChatResponseDto()` --indirect_call--> `toGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/chat/dto/chat-response.dto.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `mapGatewayResponseToAnthropicFormat()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/anthropic/mappers/anthropic-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `DialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/dialog.tsx → apps/frontend/src/shared/utils/utils.ts
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `CacheRegistryService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/cache-registry.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (132 total, 16 thin omitted)

### Community 0 - "prisma-invitation.adapter.ts"
Cohesion: 0.17
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 1 - "social.types.ts"
Cohesion: 0.06
Nodes (26): CompositeRunResultReader, GetRunOutput, RunResultReader, SocialBrief, EmptyRunResultReader, Injectable, toInputJson(), SocialResultStore (+18 more)

### Community 2 - "api/company-context.types.ts"
Cohesion: 0.04
Nodes (86): metadata, HomeEntry(), SessionContext, SessionContextValue, SessionState, useSession(), fetchCompanyContext(), fetchCompleteness() (+78 more)

### Community 3 - "exitWithAgentReport"
Cohesion: 0.15
Nodes (13): emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), resolveCliMode(), toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList() (+5 more)

### Community 4 - "runs.types.ts"
Cohesion: 0.04
Nodes (73): metadata, ArchiveRunsQuery, fetchArchiveRuns(), fetchInitiatorOptions(), fetchRunLogs(), fetchUserRuns(), finalizeRunReview(), InitiatorOption (+65 more)

### Community 5 - "run-details-view.tsx"
Cohesion: 0.08
Nodes (40): metadata, metadata, CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS, RUN_TASK_TYPE_LABELS (+32 more)

### Community 6 - "ModelAlias"
Cohesion: 0.09
Nodes (7): ProviderTestOptions, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, AppMetricsService, Injectable

### Community 7 - "LogContext"
Cohesion: 0.07
Nodes (22): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+14 more)

### Community 8 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.06
Nodes (66): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, asInputTokens(), asOutputTokens(), asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS (+58 more)

### Community 9 - "anthropic.module.ts"
Cohesion: 0.21
Nodes (10): ChatModule, Module, AnthropicModule, Module, IntegrationsModule, Module, OpenAiModule, Module (+2 more)

### Community 10 - "responses.adapter.ts"
Cohesion: 0.06
Nodes (65): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, toHttpException(), asSystemFingerprint(), asToolCallId(), asWarningCode(), ProviderAssistantTurn, ProviderChatTurn (+57 more)

### Community 11 - "auth.module.ts"
Cohesion: 0.08
Nodes (32): InviteUserResult, inviteUserSchema, InviteUserUseCase, Inject, Injectable, InvitationListItem, ListInvitationsUseCase, Inject (+24 more)

### Community 12 - "social.graph.ts"
Cohesion: 0.07
Nodes (55): loadPromptFromDir(), renderPrompt(), coercePassNoteVerdict(), isPassOnlyIssue(), SocialPipelineFacade, toOutcome(), Inject, Injectable (+47 more)

### Community 13 - "branded.types.ts"
Cohesion: 0.07
Nodes (66): SemanticStoreEmbedState, CachedChatResponse, CachedChatWarning, CachedFinishReason, CacheIdentityMessage, ChatCacheSource, CachedChatResponseWithConversation, ChatResponseData (+58 more)

### Community 14 - "DomainException"
Cohesion: 0.10
Nodes (26): AcceptInviteResult, acceptInviteSchema, comparePassword(), generateRefreshToken(), hashPassword(), hashRefreshToken(), parseTtlMs(), parseTtlSeconds() (+18 more)

### Community 15 - "models.controller.ts"
Cohesion: 0.10
Nodes (22): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+14 more)

### Community 16 - "anthropic-response.mapper.ts"
Cohesion: 0.14
Nodes (24): SseDoneEvent, asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto, AnthropicTextContentBlockDto (+16 more)

### Community 17 - "RedisVectorStoreAdapter"
Cohesion: 0.24
Nodes (7): RedisVectorStoreAdapter, Injectable, isRedisSearchIndexAlreadyExistsError(), isRedisSearchMissingIndexError(), isRedisSearchModuleMissingError(), redisSearchErrorMessage(), VectorSearchHit

### Community 18 - "AuthUserContext"
Cohesion: 0.09
Nodes (26): Body, HttpCode, Post, CreateFeedbackDto, IsIn, IsOptional, IsString, MaxLength (+18 more)

### Community 19 - "PrometheusAppMetricsAdapter"
Cohesion: 0.14
Nodes (5): PrometheusAppMetricsAdapter, Injectable, resolveAppMetricsBackend(), AppProviderCallContext, AppTokenUsage

### Community 20 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.11
Nodes (27): CostUsd, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes() (+19 more)

### Community 21 - "gateway-config.schema.ts"
Cohesion: 0.08
Nodes (50): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, InitAnswers (+42 more)

### Community 22 - "config-generator.service.ts"
Cohesion: 0.06
Nodes (27): CliGatewayValidatorService, Injectable, ConfigGeneratorService, Injectable, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable, FileManagerService (+19 more)

### Community 23 - "InvitationsController"
Cohesion: 0.10
Nodes (14): InvitationsController, ApiCookieAuth, ApiTags, Body, Controller, Delete, Get, HttpCode (+6 more)

### Community 24 - "app-metrics-backend.interface.ts"
Cohesion: 0.17
Nodes (11): healthStatusToGaugeValue(), AppRequestLabels, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus, HttpRequestLabels (+3 more)

### Community 25 - "notify-product.tsx"
Cohesion: 0.16
Nodes (19): assertNever(), notifyProduct(), notifyRunCancelled(), notifyRunTerminal(), EnvelopeRef, ProductToast, RunTerminalInput, RunTerminalOutcome (+11 more)

### Community 26 - "types/index.ts"
Cohesion: 0.16
Nodes (23): RequestIdMiddleware, Injectable, CONVERSATION_ID_PATTERN, createRequestId(), isAttemptNumber(), isBaseUrl(), isCacheTtlSeconds(), isConversationId() (+15 more)

### Community 27 - "start-run.use-case.ts"
Cohesion: 0.12
Nodes (21): contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, socialBriefSchema (+13 more)

### Community 28 - "save-output-edited.use-case.ts"
Cohesion: 0.10
Nodes (27): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+19 more)

### Community 29 - "configure-swagger.ts"
Cohesion: 0.24
Nodes (8): AppModule, Module, bootstrap(), parseCorsOrigins(), configureHttpApp(), ACCESS_COOKIE_NAME, buildSwaggerConfig(), COOKIE_AUTH_NAME

### Community 30 - "ChatRequestDto"
Cohesion: 0.06
Nodes (34): ChatService, Injectable, ChatStreamController, ApiBody, ApiOperation, ApiProduces, ApiResponse, ApiSecurity (+26 more)

### Community 31 - "HealthService"
Cohesion: 0.16
Nodes (5): HealthLivenessResponseDto, ApiProperty, HealthReadinessResponseDto, HealthService, Injectable

### Community 32 - "swagger.setup.ts"
Cohesion: 0.12
Nodes (19): AppModule, Module, SseDeltaPayloadDto, ApiProperty, bootstrap(), API_GLOBAL_PREFIX, PORT, setupApp() (+11 more)

### Community 33 - "provider-instances.bootstrap.ts"
Cohesion: 0.19
Nodes (13): GatewayProviderInstanceConfig, assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryFn (+5 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "runs-result.types.ts"
Cohesion: 0.04
Nodes (74): buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload() (+66 more)

### Community 36 - "ConfigInitCommand"
Cohesion: 0.31
Nodes (3): ConfigInitCommand, Command, Option

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "feedback-form.tsx"
Cohesion: 0.23
Nodes (13): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody(), parseFeedbackCreated() (+5 more)

### Community 39 - "auth.controller.ts"
Cohesion: 0.07
Nodes (40): AuthController, ApiCookieAuth, ApiTags, Body, Controller, Get, HttpCode, Patch (+32 more)

### Community 40 - "new-ids.ts"
Cohesion: 0.18
Nodes (7): ErrorEnvelope, HttpExceptionFilter, Catch, newInvitationId(), newRequestId(), RequestIdMiddleware, Injectable

### Community 41 - "prisma-run.adapter.ts"
Cohesion: 0.08
Nodes (14): LightRunItem, ListRunsResult, RunSnapshot, RunLogEntry, ALLOWED_RUN_STATES, assertTransition(), CANCELABLE_RUN_STATUSES, PrismaRunAdapter (+6 more)

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.11
Nodes (22): ApiOpenAiErrorResponses(), ANTHROPIC_INTEGRATION_PATH, OPENAI_INTEGRATION_PATH, OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam (+14 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (28): brand, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createInvitationId(), createRequestId() (+20 more)

### Community 44 - "runs.controller.ts"
Cohesion: 0.03
Nodes (66): CancelRunUseCase, Inject, Injectable, FinalizeReviewUseCase, Inject, Injectable, GetRunLogsOutput, GetRunLogsUseCase (+58 more)

### Community 45 - "cache.module.ts"
Cohesion: 0.16
Nodes (10): NoopCacheModule, Module, RedisCacheModule, Module, CacheModule, CacheModuleOptions, Module, CACHE_BACKEND (+2 more)

### Community 46 - "GatewayKey"
Cohesion: 0.04
Nodes (71): GATEWAY_CACHE_HEADER, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags, Body (+63 more)

### Community 47 - "anthropic-models.controller.ts"
Cohesion: 0.13
Nodes (20): ApiAnthropicErrorResponses(), AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+12 more)

### Community 48 - "health-readiness-response.dto.ts"
Cohesion: 0.29
Nodes (9): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiProperty, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty (+1 more)

### Community 49 - "ChatParamsDto"
Cohesion: 0.12
Nodes (17): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+9 more)

### Community 50 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+2 more)

### Community 51 - "cli.module.ts"
Cohesion: 0.07
Nodes (56): AgentReport, AgentReportStatus, PendingSecretsItem, loadAnswers(), collectPendingSecrets(), assertAgentHasAnswers(), CliMode, CliModeFlags (+48 more)

### Community 52 - "resilient-executor.ts"
Cohesion: 0.17
Nodes (19): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+11 more)

### Community 53 - "semantic-cache.constants.ts"
Cohesion: 0.13
Nodes (12): EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema(), EMBEDDING_CIRCUIT_COOLDOWN_MS, EMBEDDING_CIRCUIT_OPEN_AFTER, EMBEDDING_PROBE_TIMEOUT_MS (+4 more)

### Community 54 - "isRecord"
Cohesion: 0.06
Nodes (53): metadata, metadata, geistMono, geistSans, metadata, acceptInvite(), bootstrapAdmin(), Credentials (+45 more)

### Community 56 - "content.graph.ts"
Cohesion: 0.06
Nodes (54): ContentPipelineFacade, toOutcome(), Inject, Injectable, Inject, coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput (+46 more)

### Community 58 - "redis-vector-store.adapter.ts"
Cohesion: 0.25
Nodes (12): isUnservableCachedReply(), parseCachedChatResponse(), escapeRedisSearchTag(), asString(), ParsedKnnHits, parseKnnHits(), VectorStoreKnnInput, VectorStorePartition (+4 more)

### Community 59 - "HealthController"
Cohesion: 0.16
Nodes (11): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, HealthModule, Module (+3 more)

### Community 60 - "ProviderApiKey"
Cohesion: 0.19
Nodes (7): ProviderTestCommand, Command, Option, ProviderTestService, Injectable, ProviderApiKey, ProviderFactoryContext

### Community 61 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 62 - "should-include-redis-stack.ts"
Cohesion: 0.15
Nodes (14): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement() (+6 more)

### Community 63 - "redis-cache.adapter.ts"
Cohesion: 0.14
Nodes (10): NoOpCacheBackend, Injectable, RedisCacheAdapter, Injectable, CacheRegistryService, Injectable, CacheBackend, asCacheTtlSeconds() (+2 more)

### Community 64 - "provider-manager.service.ts"
Cohesion: 0.09
Nodes (39): ClientPromptService, Injectable, KeyPromptService, Injectable, ModelPromptService, Injectable, ProviderPromptResult, ProviderPromptService (+31 more)

### Community 65 - "RefreshSessionRepository"
Cohesion: 0.05
Nodes (22): AcceptInviteUseCase, Inject, Injectable, BootstrapAdminUseCase, Inject, Injectable, BootstrapStatusUseCase, Inject (+14 more)

### Community 66 - "metrics.ts"
Cohesion: 0.05
Nodes (51): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+43 more)

### Community 67 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.07
Nodes (31): IsStringOrArrayOfStrings(), OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray (+23 more)

### Community 69 - "openai-stream.mapper.ts"
Cohesion: 0.31
Nodes (12): fromGatewayToolCallDto(), mapChatResponseToOpenAi(), mapFinishReasontoOpenAI(), mapGatewayToolCallsToOpenAi(), mapSystemFingerprintToOpenAi(), toOpenAiCompletionId(), baseChunkFields(), buildToolCallsDelta() (+4 more)

### Community 70 - "company-context.mapper.ts"
Cohesion: 0.15
Nodes (11): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+3 more)

### Community 71 - "config-validator.ts"
Cohesion: 0.21
Nodes (12): CliValidateOptions, collectInactiveProviderWarnings(), formatZodIssues(), validateGatewayConfig(), ValidationOptions, ValidationResult, buildEffectiveGatewayConfig(), assertEnabledProviderSecretsPresent() (+4 more)

### Community 72 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 73 - "ClientRemoveCommand"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

### Community 74 - "EnvPatchService"
Cohesion: 0.24
Nodes (5): ConfigSecretsStatusCommand, Command, Option, EnvPatchService, Injectable

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "UserRepository"
Cohesion: 0.05
Nodes (37): ListUsersUseCase, Inject, Injectable, ReactivateUserUseCase, Inject, Injectable, SoftDeleteUserUseCase, Inject (+29 more)

### Community 77 - "ChatResponseDto"
Cohesion: 0.17
Nodes (10): ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString (+2 more)

### Community 78 - "CompanyContextRepository"
Cohesion: 0.21
Nodes (11): GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PutCompanyContextUseCase, Inject (+3 more)

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.06
Nodes (39): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), GatewayChatResponse (+31 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - "patch-company-context.use-case.ts"
Cohesion: 0.27
Nodes (8): toPublicCompanyContext(), PatchCompanyContextUseCase, Inject, Injectable, assertCompanyContextWritable(), PartialCompanyContext, isComplete(), mergeCompanyContext()

### Community 82 - "HttpMethod"
Cohesion: 0.22
Nodes (3): HttpMetricsMiddleware, Injectable, HttpMethod

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "configuration.ts"
Cohesion: 0.15
Nodes (19): asSemanticCacheTtlSeconds(), AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig, SemanticCacheRuntimeConfig, buildAppConfiguration(), BuildEffectiveGatewayConfigOptions (+11 more)

### Community 85 - "api/src/app.module.ts"
Cohesion: 0.06
Nodes (50): CompanyContextModule, Module, ContentRunExecutor, isCanonicalOutlineSelection(), isMissingContentKind(), Injectable, ContentModule, Module (+42 more)

### Community 86 - "app-metrics.service.ts"
Cohesion: 0.15
Nodes (11): APP_METRICS_BACKEND, MetricsController, ApiOperation, ApiResponse, ApiTags, Controller, Get, PreMetricsScrapeHook (+3 more)

### Community 87 - "asProviderInstanceId"
Cohesion: 0.07
Nodes (38): assertInteractiveAllowed(), DEFAULT_MODELS, DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, convertModel(), defaultModelPolicy() (+30 more)

### Community 88 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 89 - "dialog.tsx"
Cohesion: 0.12
Nodes (20): logoutSession(), StartAgentDialog(), EMPTY_START_DRAFT, StartRunDraft, AgentsGateTooltip(), useStartRunGate(), LogoutDialog(), confirm() (+12 more)

### Community 90 - "InMemoryRunSseHub"
Cohesion: 0.29
Nodes (4): RunSseEvent, InMemoryRunSseHub, Inject, Injectable

### Community 91 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 92 - "public.decorator.ts"
Cohesion: 0.38
Nodes (3): IS_PUBLIC_KEY, JwtAuthGuard, Injectable

### Community 93 - "provider-error.mapper.ts"
Cohesion: 0.21
Nodes (19): MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isRateLimitStatus(), isServerError(), isTimeoutStatus(), nameLooksLikeTimeout() (+11 more)

### Community 94 - "ChatToolingDto"
Cohesion: 0.16
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 95 - ".createMessage"
Cohesion: 0.20
Nodes (9): ApiHeader, ApiBody, ApiOperation, ApiProduces, ApiResponse, Body, Post, Req (+1 more)

### Community 96 - "tooling-types.ts"
Cohesion: 0.19
Nodes (14): ToolCallId, mapAnthropicRequestToGateway(), AnthropicTool, mapAnthropicContentBlockToGateway(), mapAnthropicToolChoice(), mapAnthropicToolsToGateway(), mapOpenAiMessagesToGateway(), mapOpenAiToolCalls() (+6 more)

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 98 - "asGatewayKey"
Cohesion: 0.13
Nodes (8): KeyGenerateCommand, Command, Option, ClientManagerService, Injectable, KeyGeneratorService, Injectable, asGatewayKey()

### Community 99 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 100 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 101 - "PrismaService"
Cohesion: 0.05
Nodes (32): RefreshSessionRecord, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable, CreateFeedbackUseCase, Inject, Injectable, agentKeySchema (+24 more)

### Community 102 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.08
Nodes (23): HealthModule, Module, LoggingModule, Global, Module, AiMetricsModule, Global, Module (+15 more)

### Community 103 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 104 - "CompanyContext"
Cohesion: 0.29
Nodes (5): CompanyContext, jsonArray(), jsonRecord(), PrismaCompanyContextAdapter, Injectable

### Community 105 - "openai-chat-completion-response.dto.ts"
Cohesion: 0.39
Nodes (8): OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty, ApiPropertyOptional

### Community 106 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 107 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 108 - "GlobalExceptionFilter"
Cohesion: 0.32
Nodes (4): GlobalExceptionFilter, isPayloadTooLargeError(), Catch, Injectable

### Community 109 - "ApiRequestIdHeader"
Cohesion: 0.29
Nodes (7): ApiRequestIdHeader(), HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get

### Community 110 - "LoggingService"
Cohesion: 0.04
Nodes (50): RedisConnectionService, Injectable, computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Inject, Injectable (+42 more)

### Community 112 - "ConfigValidateCommand"
Cohesion: 0.40
Nodes (3): ConfigValidateCommand, Command, Option

### Community 114 - "cn"
Cohesion: 0.06
Nodes (49): AcceptInviteFormProps, FALLBACK, AppHeaderProps, AppSidebar(), AppSidebarProps, APP_NAV, AppNavItem, navItemsForRole() (+41 more)

### Community 117 - "domain/company-context.types.ts"
Cohesion: 0.18
Nodes (18): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CompanyContextWriteDetail (+10 more)

### Community 119 - "CompanyContextController"
Cohesion: 0.22
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 121 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

## Knowledge Gaps
- **382 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+377 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1101 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ModelAlias` connect `ModelAlias` to `provider-manager.service.ts`, `metrics.ts`, `types/index.ts`, `branded.types.ts`, `GatewayKey`, `models.controller.ts`, `LoggingService`, `PrometheusAppMetricsAdapter`, `resilient-executor.ts`, `gateway-config.schema.ts`, `config-generator.service.ts`, `asProviderInstanceId`, `sentry-ai-metrics.adapter.ts`, `app-metrics-backend.interface.ts`, `redis-vector-store.adapter.ts`, `app-metrics.service.ts`, `AppMetricsBackend`, `ChatRequestDto`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `ModelAlias` to `exitWithAgentReport`, `LogContext`, `branded.types.ts`, `models.controller.ts`, `PrometheusAppMetricsAdapter`, `sentry-ai-metrics.adapter.ts`, `gateway-config.schema.ts`, `config-generator.service.ts`, `app-metrics-backend.interface.ts`, `types/index.ts`, `GatewayKey`, `cli.module.ts`, `AppMetricsBackend`, `ProviderApiKey`, `provider-manager.service.ts`, `metrics.ts`, `configuration.ts`, `app-metrics.service.ts`, `asProviderInstanceId`, `LoggingService`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Why does `LoggingService` connect `LoggingService` to `swagger.setup.ts`, `provider-instances.bootstrap.ts`, `LogContext`, `anthropic/anthropic-tools.mapper.ts`, `responses.adapter.ts`, `GlobalExceptionFilter`, `branded.types.ts`, `GatewayKey`, `RedisVectorStoreAdapter`, `resilient-executor.ts`, `redis-vector-store.adapter.ts`, `HealthService`, `ChatRequestDto`, `redis-cache.adapter.ts`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _382 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05742393045069778 - nodes in this community are weakly interconnected._
- **Should `api/company-context.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.03792667509481669 - nodes in this community are weakly interconnected._