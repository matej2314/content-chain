# Graph Report - content-chain  (2026-09-29)

## Corpus Check
- 639 files · ~189,600 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .css 1)

## Summary
- 4134 nodes · 12726 edges · 129 communities (116 shown, 12 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 399 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `dc972a7b`
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
- ai-provider-gateway/src/app.module.ts
- responses.adapter.ts
- UserRepository
- social.graph.ts
- branded.types.ts
- runs.controller.ts
- models.controller.ts
- anthropic-response.mapper.ts
- redis-vector-store.adapter.ts
- AuthUserContext
- EnvRef
- sentry-ai-metrics.adapter.ts
- types/index.ts
- config-generator.service.ts
- app-metrics.service.ts
- DomainException
- PrometheusAppMetricsAdapter
- branded.guards.ts
- start-run.use-case.ts
- save-output-edited.use-case.ts
- env.schema.ts
- chat.service.ts
- ai-provider-gateway/src/health/health.service.ts
- ai-provider-gateway/src/main.ts
- GatewayProviderType
- AnthropicMessagesRequestDto
- runs-result.types.ts
- WizardState
- enums.ts
- feedback.api.ts
- AuthController
- HttpExceptionFilter
- run.port.ts
- openai-models.controller.ts
- ids.ts
- RunRepository
- RunRecord
- GatewayKey
- anthropic-models.controller.ts
- in-process-run.worker.ts
- chat-params.dto.ts
- ListRunsQueryDto
- cli.module.ts
- resilient-executor.ts
- semantic-cache.service.ts
- isRecord
- AppMetricsService
- content.graph.ts
- result-edit-payload.ts
- ChatParamsDto
- HealthController
- InvitationsController
- company-context.dto.ts
- should-include-redis-stack.ts
- cache.module.ts
- asProviderInstanceId
- auth.module.ts
- chat-provider-call.service.ts
- ModelRemoveCommand
- OpenAiChatCompletionRequestDto
- InMemoryRunSseHub
- company-context.mapper.ts
- configuration.ts
- ClientAddCommand
- ClientRemoveCommand
- RefreshSessionRepository
- parse-verifier-log-message.ts
- users.controller.ts
- OpenAiChatMessageDto
- CompanyContextRepository
- llm-gateway.http.adapter.ts
- PrometheusService
- patch-company-context.use-case.ts
- event-source-registry-provider.tsx
- SPEC — README
- .getOne
- api/src/app.module.ts
- MetricsController
- model-manager.service.ts
- openai-chat-message.dto.ts
- apiFetch
- openai-chat-completion-request.dto.ts
- StartRunDto
- public.decorator.ts
- provider-error.mapper.ts
- swagger.setup.ts
- .getOne
- api-error.code.ts
- route.ts
- KeyGenerateCommand
- ProviderAddCommand
- ModelAddCommand
- PrismaService
- .getOne
- ProviderEditCommand
- CompanyContext
- toInputJson
- ProviderRemoveCommand
- ModelEditCommand
- EnvironmentVariables
- HealthController
- LoggingService
- auth.schemas.ts
- cn
- domain/company-context.types.ts
- CompanyContextController
- asGatewayKey
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
- `optionalEnvRefSchema` --calls--> `asEnvRef()`  [EXTRACTED]
  apps/ai-provider-gateway/src/config/gateway-config.schema.ts → apps/ai-provider-gateway/src/common/types/branded.types.ts
- `CardDescription()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/card.tsx → apps/frontend/src/shared/utils/utils.ts
- `CardAction()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/card.tsx → apps/frontend/src/shared/utils/utils.ts
- `CardFooter()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/card.tsx → apps/frontend/src/shared/utils/utils.ts

## Import Cycles
- None detected.

## Communities (129 total, 12 thin omitted)

### Community 0 - "prisma-invitation.adapter.ts"
Cohesion: 0.17
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 1 - "social.types.ts"
Cohesion: 0.06
Nodes (26): CompositeRunResultReader, GetRunOutput, RunResultReader, ContentBrief, SocialBrief, EmptyRunResultReader, Injectable, SocialResultStore (+18 more)

### Community 2 - "api/company-context.types.ts"
Cohesion: 0.06
Nodes (68): metadata, fetchCompanyContext(), fetchCompleteness(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras (+60 more)

### Community 3 - "exitWithAgentReport"
Cohesion: 0.15
Nodes (12): emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), resolveCliMode(), toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList() (+4 more)

### Community 4 - "runs.types.ts"
Cohesion: 0.04
Nodes (74): metadata, assertNever(), notifyProduct(), notifyRunTerminal(), EnvelopeRef, ProductToast, RunTerminalInput, RunTerminalOutcome (+66 more)

### Community 5 - "run-details-view.tsx"
Cohesion: 0.07
Nodes (49): metadata, metadata, FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, FALLBACK, FeedbackFormProps, CONTENT_KIND_LABELS, LANGUAGE_LABELS (+41 more)

### Community 6 - "ModelAlias"
Cohesion: 0.07
Nodes (6): ProviderTestOptions, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, AppMetricsBackend

### Community 7 - "LogContext"
Cohesion: 0.05
Nodes (29): GlobalExceptionFilter, isPayloadTooLargeError(), Catch, Injectable, ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter (+21 more)

### Community 8 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.06
Nodes (66): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, toCachedChatResponse(), asInputTokens(), asOutputTokens(), asPromptCacheCreationTokens(), asPromptCacheHitTokens() (+58 more)

### Community 9 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.09
Nodes (23): CacheModule, Module, ChatModule, Module, HealthModule, Module, AnthropicModule, Module (+15 more)

### Community 10 - "responses.adapter.ts"
Cohesion: 0.06
Nodes (65): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, toHttpException(), asSystemFingerprint(), asToolCallId(), asWarningCode(), ProviderAssistantTurn, ProviderChatTurn (+57 more)

### Community 11 - "UserRepository"
Cohesion: 0.08
Nodes (18): Inject, MeUseCase, Inject, Injectable, Inject, Inject, AuthUser, JwtPayload (+10 more)

### Community 12 - "social.graph.ts"
Cohesion: 0.13
Nodes (36): LlmHopService, Injectable, renderPrompt(), coercePassNoteVerdict(), isPassOnlyIssue(), ideasOutputSchema, reelIdeasOutputSchema, isReelTaskType() (+28 more)

### Community 13 - "branded.types.ts"
Cohesion: 0.08
Nodes (47): VectorStorePartition, VectorStoreTextIdentityInput, VectorStoreUpsertInput, CachedChatResponse, CachedChatWarning, CachedFinishReason, CacheIdentityMessage, ChatCacheSource (+39 more)

### Community 14 - "runs.controller.ts"
Cohesion: 0.06
Nodes (37): CancelRunUseCase, Inject, Injectable, FinalizeReviewUseCase, Injectable, GetRunLogsUseCase, Injectable, GetRunUseCase (+29 more)

### Community 15 - "models.controller.ts"
Cohesion: 0.23
Nodes (10): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, GatewayModelCapabilitiesDto, GatewayModelDto, ApiProperty, ApiPropertyOptional (+2 more)

### Community 16 - "anthropic-response.mapper.ts"
Cohesion: 0.08
Nodes (44): SseDoneEvent, fromGatewayToolCallDto(), asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto (+36 more)

### Community 17 - "redis-vector-store.adapter.ts"
Cohesion: 0.07
Nodes (28): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, EmbeddingCircuitBreaker, escapeRedisSearchTag(), normalizeEmbeddingModelForIndex(), semanticIndexName() (+20 more)

### Community 18 - "AuthUserContext"
Cohesion: 0.06
Nodes (35): InviteUserDto, ApiProperty, IsEmail, Body, Body, HttpCode, Post, CreateFeedbackDto (+27 more)

### Community 19 - "EnvRef"
Cohesion: 0.11
Nodes (11): ConfigPersistenceService, Injectable, EnvPatchService, Injectable, ProviderManagerService, Injectable, AddProviderInput, EditProviderInput (+3 more)

### Community 20 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.08
Nodes (33): CostUsd, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes() (+25 more)

### Community 21 - "types/index.ts"
Cohesion: 0.11
Nodes (31): PendingSecretsItem, convertRateLimit(), CliRateLimit, GatewayClient, ClientManagerService, Injectable, ClientBasicAnswers, ClientPromptResult (+23 more)

### Community 22 - "config-generator.service.ts"
Cohesion: 0.14
Nodes (14): isRedisRequired(), ConfigGeneratorService, Injectable, FileManagerService, Injectable, WizardRunResult, ClientCli, EnvTemplateInput (+6 more)

### Community 23 - "app-metrics.service.ts"
Cohesion: 0.13
Nodes (15): healthStatusToGaugeValue(), APP_METRICS_BACKEND, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus, HttpMethod (+7 more)

### Community 24 - "DomainException"
Cohesion: 0.09
Nodes (23): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Inject, Injectable, hashPassword(), ReactivateUserUseCase, Injectable (+15 more)

### Community 25 - "PrometheusAppMetricsAdapter"
Cohesion: 0.10
Nodes (7): PrometheusAppMetricsAdapter, Injectable, resolveAppMetricsBackend(), AppProviderCallContext, AppProviderStreamScope, AppRequestLabels, AppTokenUsage

### Community 26 - "branded.guards.ts"
Cohesion: 0.13
Nodes (20): RequestIdMiddleware, Injectable, CONVERSATION_ID_PATTERN, createRequestId(), isAttemptNumber(), isBaseUrl(), isCacheTtlSeconds(), isConversationId() (+12 more)

### Community 27 - "start-run.use-case.ts"
Cohesion: 0.11
Nodes (23): GetRunLogsOutput, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, runIdSchema (+15 more)

### Community 28 - "save-output-edited.use-case.ts"
Cohesion: 0.06
Nodes (42): coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, pageDocumentOutputSchema, PageOutlineOutput, pageOutlineSectionRoleSchema, pageOutlineSectionSchema, readNonEmptyString() (+34 more)

### Community 29 - "env.schema.ts"
Cohesion: 0.17
Nodes (11): AppModule, Module, bootstrap(), EnvModule, Global, Module, envSchema, parseCorsOrigins() (+3 more)

### Community 30 - "chat.service.ts"
Cohesion: 0.07
Nodes (39): SemanticStoreEmbedState, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsObject (+31 more)

### Community 31 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.09
Nodes (21): EMBEDDING_BACKEND, VECTOR_STORE, RedisConsumer, HealthCheckItemDto, ApiProperty, HealthLivenessResponseDto, ApiProperty, HealthReadinessChecksDto (+13 more)

### Community 32 - "ai-provider-gateway/src/main.ts"
Cohesion: 0.13
Nodes (15): AppModule, Module, bootstrap(), API_GLOBAL_PREFIX, PORT, setupApp(), exportOpenApi(), OPENAPI_OUTPUT_FILENAME (+7 more)

### Community 33 - "GatewayProviderType"
Cohesion: 0.10
Nodes (25): CliAiModel, CliAiProvider, ProviderTestService, Injectable, ProviderCli, BaseUrl, ModelId, ProviderApiKey (+17 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "runs-result.types.ts"
Cohesion: 0.06
Nodes (52): PAGE_OUTLINE_ROLE_LABELS, submitHitl(), isPageOutlineSectionRole(), isReelDuration(), PAGE_OUTLINE_SECTION_ROLES, PageDocument, PageOutline, PageOutlineSection (+44 more)

### Community 36 - "WizardState"
Cohesion: 0.13
Nodes (11): ConfigInitCommand, Command, Option, WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, WizardState, Injectable (+3 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "feedback.api.ts"
Cohesion: 0.31
Nodes (9): createFeedback(), CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody(), parseFeedbackCreated(), FeedbackForm(), onSubmit() (+1 more)

### Community 39 - "AuthController"
Cohesion: 0.08
Nodes (27): AuthController, ApiCookieAuth, ApiTags, Body, Controller, Get, HttpCode, Patch (+19 more)

### Community 40 - "HttpExceptionFilter"
Cohesion: 0.20
Nodes (6): ErrorEnvelope, HttpExceptionFilter, Catch, newRequestId(), RequestIdMiddleware, Injectable

### Community 41 - "run.port.ts"
Cohesion: 0.07
Nodes (20): ListRunsOutput, contentBriefSchema, socialBriefSchema, LightRunItem, ListRunsQuery, ListRunsResult, PAGE_SIZE, RunSnapshot (+12 more)

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.21
Nodes (12): ApiOpenAiErrorResponses(), ANTHROPIC_INTEGRATION_PATH, OPENAI_INTEGRATION_PATH, OpenAiErrorBodyDto, OpenAiErrorResponseDto, ApiProperty, ApiPropertyOptional, OpenAiModelDto (+4 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (28): brand, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createInvitationId(), createRequestId() (+20 more)

### Community 44 - "RunRepository"
Cohesion: 0.07
Nodes (9): Inject, Inject, Inject, Inject, Inject, Inject, Inject, Inject (+1 more)

### Community 45 - "RunRecord"
Cohesion: 0.13
Nodes (5): InProcessRunWorker, Injectable, RunRecord, StubRunExecutor, Injectable

### Community 46 - "GatewayKey"
Cohesion: 0.03
Nodes (93): ApiHeader, GATEWAY_CACHE_HEADER, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags (+85 more)

### Community 47 - "anthropic-models.controller.ts"
Cohesion: 0.28
Nodes (10): ApiAnthropicErrorResponses(), AnthropicErrorBodyDto, AnthropicErrorResponseDto, ApiProperty, AnthropicModelDto, AnthropicModelsListResponseDto, ApiProperty, mapGatewayModelsListToAnthropic() (+2 more)

### Community 48 - "in-process-run.worker.ts"
Cohesion: 0.15
Nodes (13): Inject, RecoverInterruptedRunsUseCase, Inject, Injectable, RunLifecycleService, TransitionExtras, Inject, Injectable (+5 more)

### Community 49 - "chat-params.dto.ts"
Cohesion: 0.24
Nodes (7): ResponseFormatDto, ApiProperty, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsThinkingBudget()

### Community 50 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+2 more)

### Community 51 - "cli.module.ts"
Cohesion: 0.05
Nodes (66): AgentReport, AgentReportStatus, loadAnswers(), assertAgentHasAnswers(), CliMode, CliModeFlags, markAgentRuntime(), CliModule (+58 more)

### Community 52 - "resilient-executor.ts"
Cohesion: 0.17
Nodes (18): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+10 more)

### Community 53 - "semantic-cache.service.ts"
Cohesion: 0.15
Nodes (15): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, isSingleTurnUserRequest(), lastUserMessageText(), embeddingProbeTimeoutMs() (+7 more)

### Community 54 - "isRecord"
Cohesion: 0.11
Nodes (30): metadata, parseReviewFields(), parseArchiveRunItem(), parseArchiveRunsPage(), parseRunCore(), parseRunSnapshot(), parseStartedBy(), parseUserRunItem() (+22 more)

### Community 55 - "AppMetricsService"
Cohesion: 0.10
Nodes (5): HttpMetricsMiddleware, Injectable, AppMetricsService, Inject, Injectable

### Community 56 - "content.graph.ts"
Cohesion: 0.07
Nodes (50): ContentPipelineFacade, toOutcome(), Inject, Injectable, ContentRunExecutor, isCanonicalOutlineSelection(), isMissingContentKind(), Inject (+42 more)

### Community 57 - "result-edit-payload.ts"
Cohesion: 0.14
Nodes (18): buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload() (+10 more)

### Community 58 - "ChatParamsDto"
Cohesion: 0.20
Nodes (10): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+2 more)

### Community 59 - "HealthController"
Cohesion: 0.16
Nodes (11): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, HealthModule, Module (+3 more)

### Community 60 - "InvitationsController"
Cohesion: 0.10
Nodes (15): ListInvitationsUseCase, Inject, Injectable, RevokeInvitationUseCase, Inject, Injectable, InvitationsController, ApiCookieAuth (+7 more)

### Community 61 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 62 - "should-include-redis-stack.ts"
Cohesion: 0.18
Nodes (11): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis() (+3 more)

### Community 63 - "cache.module.ts"
Cohesion: 0.10
Nodes (18): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+10 more)

### Community 64 - "asProviderInstanceId"
Cohesion: 0.08
Nodes (49): assertInteractiveAllowed(), collectPendingSecrets(), DEFAULT_MODELS, InitAnswers, CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema, convertClient() (+41 more)

### Community 65 - "auth.module.ts"
Cohesion: 0.07
Nodes (50): comparePassword(), generateRefreshToken(), hashRefreshToken(), parseTtlMs(), parseTtlSeconds(), AuthTokenResult, BootstrapAdminUseCase, Injectable (+42 more)

### Community 66 - "chat-provider-call.service.ts"
Cohesion: 0.08
Nodes (40): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+32 more)

### Community 67 - "ModelRemoveCommand"
Cohesion: 0.33
Nodes (3): ModelRemoveCommand, Command, Option

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (18): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+10 more)

### Community 69 - "InMemoryRunSseHub"
Cohesion: 0.29
Nodes (4): RunSseEvent, InMemoryRunSseHub, Inject, Injectable

### Community 70 - "company-context.mapper.ts"
Cohesion: 0.16
Nodes (11): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+3 more)

### Community 71 - "configuration.ts"
Cohesion: 0.06
Nodes (51): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, normalizeGatewayConfigForWrite(), ValidationFormatter, asSemanticCacheTtlSeconds(), AppConfiguration (+43 more)

### Community 72 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 73 - "ClientRemoveCommand"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

### Community 74 - "RefreshSessionRepository"
Cohesion: 0.12
Nodes (6): Inject, Inject, Inject, Inject, Inject, RefreshSessionRepository

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "users.controller.ts"
Cohesion: 0.10
Nodes (19): ListUsersUseCase, Inject, Injectable, SoftDeleteUserUseCase, Injectable, PatchUserDto, ApiProperty, IsBoolean (+11 more)

### Community 77 - "OpenAiChatMessageDto"
Cohesion: 0.22
Nodes (9): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+1 more)

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

### Community 82 - "event-source-registry-provider.tsx"
Cohesion: 0.43
Nodes (5): EventSourceRegistryContext, EventSourceRegistryProvider(), createEventSourceRegistry(), EventSourceRegistry, RegistryEntry

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - ".getOne"
Cohesion: 0.19
Nodes (10): AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+2 more)

### Community 85 - "api/src/app.module.ts"
Cohesion: 0.07
Nodes (42): CompanyContextModule, Module, ContentModule, Module, LlmGatewayError, LlmModule, Module, LLM_GATEWAY_PORT (+34 more)

### Community 86 - "MetricsController"
Cohesion: 0.18
Nodes (7): MetricsController, ApiOperation, ApiResponse, ApiTags, Controller, Get, Header

### Community 87 - "model-manager.service.ts"
Cohesion: 0.10
Nodes (29): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, defaultModelPolicy(), ModelEditField, ModelManagerService, Injectable (+21 more)

### Community 88 - "openai-chat-message.dto.ts"
Cohesion: 0.60
Nodes (3): isTextContentItem(), normalizeOpenAiContent(), TextContentItem

### Community 89 - "apiFetch"
Cohesion: 0.07
Nodes (46): metadata, geistMono, geistSans, metadata, acceptInvite(), bootstrapAdmin(), Credentials, fetchBootstrapStatus() (+38 more)

### Community 91 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 92 - "public.decorator.ts"
Cohesion: 0.38
Nodes (3): IS_PUBLIC_KEY, JwtAuthGuard, Injectable

### Community 93 - "provider-error.mapper.ts"
Cohesion: 0.21
Nodes (19): MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isRateLimitStatus(), isServerError(), isTimeoutStatus(), nameLooksLikeTimeout() (+11 more)

### Community 94 - "swagger.setup.ts"
Cohesion: 0.06
Nodes (41): ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString (+33 more)

### Community 95 - ".getOne"
Cohesion: 0.19
Nodes (10): OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+2 more)

### Community 96 - "api-error.code.ts"
Cohesion: 0.08
Nodes (27): ApiErrorCode, DEFAULT_HTTP_STATUS_TO_CODE, ApiErrorPayload, PayloadTooLargeError, RequestWithId, getAppConfig(), GatewayKeyGuard, Injectable (+19 more)

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 98 - "KeyGenerateCommand"
Cohesion: 0.39
Nodes (3): KeyGenerateCommand, Command, Option

### Community 99 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 100 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 101 - "PrismaService"
Cohesion: 0.05
Nodes (32): RefreshSessionRecord, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable, CreateFeedbackUseCase, Inject, Injectable, agentKeySchema (+24 more)

### Community 102 - ".getOne"
Cohesion: 0.19
Nodes (10): ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+2 more)

### Community 103 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 104 - "CompanyContext"
Cohesion: 0.23
Nodes (6): CompanyContext, emptyCompanyContext(), jsonArray(), jsonRecord(), PrismaCompanyContextAdapter, Injectable

### Community 105 - "toInputJson"
Cohesion: 0.22
Nodes (7): Inject, OutputEditedWrite, OutputEditedWriter, applyWrite(), PrismaOutputEditedAdapter, Injectable, toInputJson()

### Community 106 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 107 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 108 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 109 - "HealthController"
Cohesion: 0.31
Nodes (6): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get

### Community 110 - "LoggingService"
Cohesion: 0.05
Nodes (21): RedisConnectionService, Injectable, Inject, OllamaEmbeddingAdapter, Injectable, EmbeddingBackend, Inject, isRedisRequiredFromConfig() (+13 more)

### Community 111 - "auth.schemas.ts"
Cohesion: 0.29
Nodes (6): BootstrapAdminInput, bootstrapAdminSchema, LoginInput, loginSchema, PatchUserCommand, patchUserSchema

### Community 114 - "cn"
Cohesion: 0.04
Nodes (62): logoutSession(), FeedbackCta(), FloatingRunsBox(), handleChevronClick(), toggleCollapsed(), StartAgentDialog(), EMPTY_START_DRAFT, StartRunDraft (+54 more)

### Community 117 - "domain/company-context.types.ts"
Cohesion: 0.18
Nodes (18): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CompanyContextWriteDetail (+10 more)

### Community 119 - "CompanyContextController"
Cohesion: 0.22
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 121 - "asGatewayKey"
Cohesion: 0.15
Nodes (6): ClientEditCommand, Command, Option, KeyGeneratorService, Injectable, asGatewayKey()

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

## Knowledge Gaps
- **375 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+370 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1094 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ModelAlias` connect `ModelAlias` to `api-error.code.ts`, `GatewayProviderType`, `chat-provider-call.service.ts`, `branded.types.ts`, `GatewayKey`, `EnvRef`, `resilient-executor.ts`, `types/index.ts`, `config-generator.service.ts`, `model-manager.service.ts`, `sentry-ai-metrics.adapter.ts`, `app-metrics.service.ts`, `PrometheusAppMetricsAdapter`, `AppMetricsService`, `chat.service.ts`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `ModelAlias` to `asProviderInstanceId`, `GatewayProviderType`, `chat-provider-call.service.ts`, `exitWithAgentReport`, `configuration.ts`, `LogContext`, `branded.types.ts`, `GatewayKey`, `EnvRef`, `sentry-ai-metrics.adapter.ts`, `types/index.ts`, `config-generator.service.ts`, `model-manager.service.ts`, `app-metrics.service.ts`, `PrometheusAppMetricsAdapter`, `AppMetricsService`, `chat.service.ts`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Why does `LoggingService` connect `LoggingService` to `api-error.code.ts`, `ai-provider-gateway/src/main.ts`, `GatewayProviderType`, `LogContext`, `anthropic/anthropic-tools.mapper.ts`, `responses.adapter.ts`, `branded.types.ts`, `GatewayKey`, `redis-vector-store.adapter.ts`, `resilient-executor.ts`, `semantic-cache.service.ts`, `swagger.setup.ts`, `ai-provider-gateway/src/health/health.service.ts`, `chat.service.ts`, `cache.module.ts`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _375 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05703599812996728 - nodes in this community are weakly interconnected._
- **Should `api/company-context.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05540499849442939 - nodes in this community are weakly interconnected._