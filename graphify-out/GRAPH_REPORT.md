# Graph Report - content-chain  (2026-10-12)

## Corpus Check
- 698 files · ~237,243 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .css 1)

## Summary
- 4551 nodes · 13985 edges · 139 communities (123 shown, 15 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 419 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e0e6eb06`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- DomainException
- get-run.use-case.ts
- api/company-context.types.ts
- anthropic/anthropic-tools.mapper.ts
- asProviderInstanceId
- start-run-form.tsx
- provider-error.mapper.ts
- LogContext
- openai-stream.mapper.ts
- RunRepository
- chat.service.ts
- ai-provider-gateway/src/health/health.service.ts
- .info
- cli.module.ts
- ChatToolingDto
- ChatParamsDto
- PrometheusAppMetricsAdapter
- AppMetricsService
- archive-runs-view.tsx
- asClientId
- AuthController
- provider-registry.service.ts
- users-view.tsx
- UserRepository
- redis-vector-store.adapter.ts
- feedback-form.tsx
- GlobalExceptionFilter
- http-metrics.interceptor.ts
- cli-apply.types.ts
- models.controller.ts
- branded.types.ts
- HealthService
- agent-answers.schema.ts
- cache.module.ts
- AnthropicMessagesRequestDto
- start-run.use-case.ts
- runs.types.ts
- enums.ts
- runs-result.types.ts
- CompanyContext
- sentry-ai-metrics.adapter.ts
- prisma-run.adapter.ts
- openai-models.controller.ts
- ids.ts
- LoggingService
- api-error.code.ts
- save-output-edited.use-case.ts
- runs.controller.ts
- ai-provider-gateway/src/main.ts
- anthropic-response.mapper.ts
- ListRunsQueryDto
- ModelAlias
- auth.module.ts
- ConfigInitCommand
- llm-hop.ts
- config-generator.service.ts
- RolesGuard
- domain/company-context.types.ts
- OpenAiChatMessageDto
- HttpExceptionFilter
- chat-provider-call.service.ts
- types/index.ts
- guest-run-policy.service.ts
- app-metrics-backend.interface.ts
- anthropic-models.controller.ts
- ModelEditCommand
- app-metrics.service.ts
- event-source-registry-provider.tsx
- OpenAiChatCompletionRequestDto
- swagger.setup.ts
- semantic-cache.constants.ts
- demo-mode-provider.tsx
- prisma-invitation.adapter.ts
- PrismaContentResultAdapter
- InMemoryRunSseHub
- parse-verifier-log-message.ts
- company-context.mapper.ts
- api/src/health/health.service.ts
- ClientAddCommand
- llm-gateway.http.adapter.ts
- PrometheusService
- cn
- content.schemas.ts
- SPEC — README
- NoopAppMetricsAdapter
- run-review-panel.tsx
- GatewayConfig
- company-context.dto.ts
- ClientRemoveCommand
- ModelAddCommand
- AuthUserContext
- PublicConfigController
- anthropic-messages.controller.ts
- social.graph.ts
- InvitationsController
- StartRunDto
- ProviderEditCommand
- route.ts
- ProviderRemoveCommand
- RedisConnectionService
- CompanyContextController
- observability.module.ts
- VectorStore
- ProviderAddCommand
- HealthController
- PrismaService
- configure-swagger.ts
- ConfigShowCommand
- AccountActivationRepository
- ConfigValidateCommand
- should-include-redis-stack.ts
- isRecord
- responses.adapter.ts
- AppModule
- RefreshSessionRepository
- RunsModule
- EnvironmentVariables
- CompanyContextRepository
- api/src/app.module.ts
- Architektura
- brand
- ClientEditCommand
- health.api.ts
- ai-provider-gateway/src/app.module.ts
- ModelRemoveCommand
- PrismaSocialResultAdapter
- openai-chat-completion-response.dto.ts
- JwtAuthGuard
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
3. `DomainException` - 81 edges
4. `LoggingService` - 73 edges
5. `asProviderInstanceId()` - 67 edges
6. `isRecord()` - 66 edges
7. `GatewayConfig` - 65 edges
8. `cn()` - 65 edges
9. `GatewayKey` - 59 edges
10. `Env` - 59 edges

## Surprising Connections (you probably didn't know these)
- `mapChatResponseToOpenAi()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/openai/mappers/openai-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `RedisConnectionService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-connection.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `CacheRegistryService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/cache-registry.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `RedisVectorStoreAdapter` --implements--> `VectorStore`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/semantic/adapters/redis-vector-store.adapter.ts → apps/ai-provider-gateway/src/cache/semantic/vector-store.interface.ts

## Import Cycles
- None detected.

## Communities (139 total, 15 thin omitted)

### Community 0 - "DomainException"
Cohesion: 0.06
Nodes (61): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Injectable, ActivateAccountOutput, ActivateAccountUseCase, Injectable, comparePassword() (+53 more)

### Community 1 - "get-run.use-case.ts"
Cohesion: 0.06
Nodes (32): ContentPipelineInput, ContentRefineSnapshot, PageDocument, PageOutline, PageOutlineSection, PageOutlineSectionRole, VerifierVerdict, CompositeRunResultReader (+24 more)

### Community 2 - "api/company-context.types.ts"
Cohesion: 0.04
Nodes (88): metadata, fetchCompanyContext(), fetchCompleteness(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras (+80 more)

### Community 3 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.06
Nodes (65): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, toCachedChatResponse(), asInputTokens(), asOutputTokens(), asPromptCacheCreationTokens(), asPromptCacheHitTokens() (+57 more)

### Community 4 - "asProviderInstanceId"
Cohesion: 0.05
Nodes (81): WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, InitAnswers, CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema, convertClient() (+73 more)

### Community 5 - "start-run-form.tsx"
Cohesion: 0.09
Nodes (34): GuestLimitModal(), GUEST_ALLOWED_TASK_TYPES, GUEST_CONTACTS, GUEST_QUOTA_CODES, GuestAllowedTaskType, GuestContact, GuestQuotaCode, isGuestAllowedTaskType() (+26 more)

### Community 6 - "provider-error.mapper.ts"
Cohesion: 0.19
Nodes (20): MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isProviderRateLimitError(), isRateLimitStatus(), isServerError(), isTimeoutStatus() (+12 more)

### Community 7 - "LogContext"
Cohesion: 0.06
Nodes (22): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+14 more)

### Community 8 - "openai-stream.mapper.ts"
Cohesion: 0.30
Nodes (12): mapChatResponseToOpenAi(), mapFinishReasontoOpenAI(), mapGatewayToolCallsToOpenAi(), mapSystemFingerprintToOpenAi(), toOpenAiCompletionId(), baseChunkFields(), buildToolCallsDelta(), chunkLine() (+4 more)

### Community 9 - "RunRepository"
Cohesion: 0.05
Nodes (10): AutoFinalizeExpiredReviewsUseCase, Inject, Injectable, Inject, Inject, Inject, RunRepository, RunRecord (+2 more)

### Community 10 - "chat.service.ts"
Cohesion: 0.05
Nodes (60): SemanticStoreEmbedState, ChatCacheSource, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize (+52 more)

### Community 11 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.13
Nodes (18): EMBEDDING_BACKEND, VECTOR_STORE, RedisConsumer, HealthCheckItemDto, ApiProperty, HealthLivenessResponseDto, ApiProperty, HealthReadinessChecksDto (+10 more)

### Community 12 - ".info"
Cohesion: 0.12
Nodes (12): toSafeConfigSnapshot(), toSafeModelList(), ProviderTestCommand, Command, Option, WizardState, ProviderTestService, Injectable (+4 more)

### Community 13 - "cli.module.ts"
Cohesion: 0.09
Nodes (42): AgentReport, AgentReportStatus, emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), loadAnswers(), collectPendingSecrets(), assertAgentHasAnswers() (+34 more)

### Community 14 - "ChatToolingDto"
Cohesion: 0.16
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 15 - "ChatParamsDto"
Cohesion: 0.12
Nodes (17): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+9 more)

### Community 16 - "PrometheusAppMetricsAdapter"
Cohesion: 0.13
Nodes (5): PrometheusAppMetricsAdapter, Injectable, AppProviderCallContext, AppProviderStreamScope, AppTokenUsage

### Community 17 - "AppMetricsService"
Cohesion: 0.11
Nodes (6): HttpMetricsMiddleware, Injectable, AppMetricsService, Inject, Injectable, HttpMethod

### Community 18 - "archive-runs-view.tsx"
Cohesion: 0.06
Nodes (42): metadata, metadata, metadata, useSession(), useGuestLocked(), CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS (+34 more)

### Community 19 - "asClientId"
Cohesion: 0.09
Nodes (15): KeyGenerateCommand, Command, Option, EnvPatchService, Injectable, KeyGeneratorService, Injectable, ClientPromptService (+7 more)

### Community 20 - "AuthController"
Cohesion: 0.06
Nodes (40): AuthController, ApiCookieAuth, ApiTags, Body, Controller, Get, HttpCode, Patch (+32 more)

### Community 21 - "provider-registry.service.ts"
Cohesion: 0.09
Nodes (30): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+22 more)

### Community 22 - "users-view.tsx"
Cohesion: 0.06
Nodes (73): AcceptInvitePage(), metadata, tokenFromSearchParam(), ACCEPT_INVITE_DEMO_HINT, ACCEPT_INVITE_UNAUTHORIZED_HINT, AcceptInviteFormError, toAcceptInviteFormError(), acceptInvite() (+65 more)

### Community 23 - "UserRepository"
Cohesion: 0.05
Nodes (39): Inject, ListUsersUseCase, Inject, Injectable, Inject, ReactivateUserUseCase, Inject, Injectable (+31 more)

### Community 24 - "redis-vector-store.adapter.ts"
Cohesion: 0.16
Nodes (16): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), asString(), ParsedKnnHits, parseKnnHits() (+8 more)

### Community 25 - "feedback-form.tsx"
Cohesion: 0.19
Nodes (15): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody(), parseFeedbackCreated() (+7 more)

### Community 26 - "GlobalExceptionFilter"
Cohesion: 0.32
Nodes (4): GlobalExceptionFilter, isPayloadTooLargeError(), Catch, Injectable

### Community 27 - "http-metrics.interceptor.ts"
Cohesion: 0.11
Nodes (18): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, MetricsController, Controller, Get (+10 more)

### Community 28 - "cli-apply.types.ts"
Cohesion: 0.07
Nodes (48): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, CliAiModel, CliAiProvider, CliRateLimit, GatewayClient (+40 more)

### Community 29 - "models.controller.ts"
Cohesion: 0.10
Nodes (22): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+14 more)

### Community 30 - "branded.types.ts"
Cohesion: 0.11
Nodes (38): VectorStorePartition, VectorStoreUpsertInput, CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatResponseData, toChatResponseDto(), mapStopReasonToFinishReason() (+30 more)

### Community 31 - "HealthService"
Cohesion: 0.18
Nodes (5): HealthReadinessResponseDto, HealthService, Inject, Injectable, Optional

### Community 32 - "agent-answers.schema.ts"
Cohesion: 0.11
Nodes (21): ClientAddAnswers, ClientAddAnswersSchema, ClientEditAnswers, ClientEditAnswersSchema, ClientRemoveAnswers, ClientRemoveAnswersSchema, InitAnswersSchema, ModelAddAnswers (+13 more)

### Community 33 - "cache.module.ts"
Cohesion: 0.10
Nodes (17): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, CacheModule, CacheModuleOptions (+9 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "start-run.use-case.ts"
Cohesion: 0.12
Nodes (21): contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, socialBriefSchema (+13 more)

### Community 36 - "runs.types.ts"
Cohesion: 0.05
Nodes (72): metadata, filterFeedbackRunOptions(), ArchiveRunsQuery, fetchRunLogs(), fetchRunSnapshot(), fetchUserRuns(), HitlAccepted, parseNullableIso() (+64 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "runs-result.types.ts"
Cohesion: 0.04
Nodes (66): buildOutputEditedBody(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload(), RESULT_KEYS_BY_TASK_TYPE (+58 more)

### Community 39 - "CompanyContext"
Cohesion: 0.23
Nodes (6): CompanyContext, emptyCompanyContext(), jsonArray(), jsonRecord(), PrismaCompanyContextAdapter, Injectable

### Community 40 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.11
Nodes (27): CostUsd, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes() (+19 more)

### Community 41 - "prisma-run.adapter.ts"
Cohesion: 0.07
Nodes (19): LightRunItem, ListRunsResult, RunSnapshot, RunLogEntry, RunRecordBase, ALLOWED_RUN_STATES, assertTransition(), CANCELABLE_RUN_STATUSES (+11 more)

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.11
Nodes (23): ApiOpenAiErrorResponses(), ANTHROPIC_INTEGRATION_PATH, OPENAI_INTEGRATION_PATH, OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam (+15 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (23): ACCOUNT_ACTIVATION_ID_RE, AccountActivationId, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createRunId() (+15 more)

### Community 44 - "LoggingService"
Cohesion: 0.05
Nodes (33): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Inject, Injectable, OllamaEmbeddingAdapter, Injectable (+25 more)

### Community 45 - "api-error.code.ts"
Cohesion: 0.08
Nodes (27): ApiErrorCode, ApiErrorPayload, readGatewayKeyHeader(), resolveClientIdFromKey(), ResolvedGatewayClient, getAppConfig(), GatewayKeyGuard, Injectable (+19 more)

### Community 46 - "save-output-edited.use-case.ts"
Cohesion: 0.08
Nodes (36): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+28 more)

### Community 47 - "runs.controller.ts"
Cohesion: 0.05
Nodes (50): CancelRunUseCase, Inject, Injectable, FinalizeReviewUseCase, Injectable, GetRunLogsOutput, GetRunLogsUseCase, Inject (+42 more)

### Community 48 - "ai-provider-gateway/src/main.ts"
Cohesion: 0.13
Nodes (15): AppModule, Module, bootstrap(), API_GLOBAL_PREFIX, PORT, setupApp(), exportOpenApi(), OPENAPI_OUTPUT_FILENAME (+7 more)

### Community 49 - "anthropic-response.mapper.ts"
Cohesion: 0.14
Nodes (25): SseDoneEvent, fromGatewayToolCallDto(), asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto (+17 more)

### Community 50 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+2 more)

### Community 51 - "ModelAlias"
Cohesion: 0.08
Nodes (5): ProviderTestOptions, ModelAlias, ProviderInstanceId, MissingProviderBaseUrl, AppMetricsBackend

### Community 52 - "auth.module.ts"
Cohesion: 0.05
Nodes (51): Inject, resendActivationSchema, InviteUserResult, inviteUserSchema, InviteUserUseCase, Inject, Injectable, InvitationListItem (+43 more)

### Community 53 - "ConfigInitCommand"
Cohesion: 0.31
Nodes (3): ConfigInitCommand, Command, Option

### Community 54 - "llm-hop.ts"
Cohesion: 0.09
Nodes (45): ContentPipelineFacade, toOutcome(), Inject, Injectable, pageOutlineOutputSchema, ContentResultStore, ContentPipelineOutcome, ContentPipelinePhase (+37 more)

### Community 55 - "config-generator.service.ts"
Cohesion: 0.15
Nodes (11): ConfigGeneratorService, Injectable, FileManagerService, Injectable, WizardRunResult, EnvTemplateInput, generateEnvTemplate(), isEnvInputRedisRequired() (+3 more)

### Community 57 - "domain/company-context.types.ts"
Cohesion: 0.19
Nodes (17): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CompanyContextWriteDetail (+9 more)

### Community 58 - "OpenAiChatMessageDto"
Cohesion: 0.16
Nodes (12): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+4 more)

### Community 59 - "HttpExceptionFilter"
Cohesion: 0.20
Nodes (6): ErrorEnvelope, HttpExceptionFilter, Catch, newRequestId(), RequestIdMiddleware, Injectable

### Community 60 - "chat-provider-call.service.ts"
Cohesion: 0.08
Nodes (39): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+31 more)

### Community 61 - "types/index.ts"
Cohesion: 0.11
Nodes (30): BasicServerAnswers, CacheAnswers, MetricsAnswers, RateLimitAnswers, RedisAnswers, SentryAnswers, ServerPromptService, Injectable (+22 more)

### Community 62 - "guest-run-policy.service.ts"
Cohesion: 0.08
Nodes (20): GUEST_TASK_TYPES, GuestRunAdmit, isGuestTaskType(), Inject, Inject, GUEST_QUOTA, GuestQuotaAdmitResult, GuestQuotaPort (+12 more)

### Community 63 - "app-metrics-backend.interface.ts"
Cohesion: 0.17
Nodes (11): healthStatusToGaugeValue(), AppRequestLabels, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus, HttpRequestLabels (+3 more)

### Community 64 - "anthropic-models.controller.ts"
Cohesion: 0.13
Nodes (21): ApiAnthropicErrorResponses(), AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+13 more)

### Community 65 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 66 - "app-metrics.service.ts"
Cohesion: 0.15
Nodes (11): APP_METRICS_BACKEND, MetricsController, ApiOperation, ApiResponse, ApiTags, Controller, Get, PreMetricsScrapeHook (+3 more)

### Community 67 - "event-source-registry-provider.tsx"
Cohesion: 0.43
Nodes (5): EventSourceRegistryContext, EventSourceRegistryProvider(), createEventSourceRegistry(), EventSourceRegistry, RegistryEntry

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (19): IsStringOrArrayOfStrings(), OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray (+11 more)

### Community 69 - "swagger.setup.ts"
Cohesion: 0.09
Nodes (26): ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString (+18 more)

### Community 70 - "semantic-cache.constants.ts"
Cohesion: 0.13
Nodes (12): EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema(), EMBEDDING_CIRCUIT_COOLDOWN_MS, EMBEDDING_CIRCUIT_OPEN_AFTER, EMBEDDING_PROBE_TIMEOUT_MS (+4 more)

### Community 71 - "demo-mode-provider.tsx"
Cohesion: 0.22
Nodes (10): fetchAppConfig(), AppConfig, parseAppConfig(), DemoChip(), DemoModeContext, DemoModeContextValue, DemoModeProvider(), DemoModeState (+2 more)

### Community 72 - "prisma-invitation.adapter.ts"
Cohesion: 0.17
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 73 - "PrismaContentResultAdapter"
Cohesion: 0.20
Nodes (4): ContentPipelineState, PrismaContentResultAdapter, toContentPipelinePhase(), Injectable

### Community 74 - "InMemoryRunSseHub"
Cohesion: 0.27
Nodes (4): RunSseEvent, InMemoryRunSseHub, Inject, Injectable

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "company-context.mapper.ts"
Cohesion: 0.15
Nodes (11): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+3 more)

### Community 77 - "api/src/health/health.service.ts"
Cohesion: 0.08
Nodes (28): GATEWAY_PROBE_TIMEOUT_MS, GatewayLivenessBody, GatewayLivenessProbe, GatewayLivenessProbeReason, GatewayLivenessProbeResult, isRecord(), parseGatewayLivenessBody(), probeFailureReason() (+20 more)

### Community 78 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.10
Nodes (23): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), LlmGatewayError (+15 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - "cn"
Cohesion: 0.05
Nodes (47): FeedbackCta(), AppHeader(), AppHeaderProps, AppSidebar(), AppSidebarProps, CompletenessChipSlot(), FeedbackCtaSlot(), FloatingBoxSlot() (+39 more)

### Community 82 - "content.schemas.ts"
Cohesion: 0.24
Nodes (9): coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineSectionRoleSchema, pageOutlineSectionSchema, readNonEmptyString(), verifierIssueSchema (+1 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "NoopAppMetricsAdapter"
Cohesion: 0.14
Nodes (3): NoopAppMetricsAdapter, Injectable, resolveAppMetricsBackend()

### Community 85 - "run-review-panel.tsx"
Cohesion: 0.08
Nodes (32): canEditResult(), finalizeRunReview(), isUserRating(), patchRunRating(), saveOutputEdited(), UserRating, isCancelableRunStatus(), isReviewableRunStatus() (+24 more)

### Community 86 - "GatewayConfig"
Cohesion: 0.05
Nodes (44): PendingSecretsItem, assertInteractiveAllowed(), DEFAULT_MODELS, DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, ClientManagerService (+36 more)

### Community 87 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 88 - "ClientRemoveCommand"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

### Community 89 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 90 - "AuthUserContext"
Cohesion: 0.08
Nodes (32): Body, HttpCode, Post, CreateFeedbackDto, IsIn, IsOptional, IsString, MaxLength (+24 more)

### Community 91 - "PublicConfigController"
Cohesion: 0.22
Nodes (7): PublicConfigController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, Inject

### Community 92 - "anthropic-messages.controller.ts"
Cohesion: 0.03
Nodes (70): ApiHeader, GATEWAY_CACHE_HEADER, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags (+62 more)

### Community 93 - "social.graph.ts"
Cohesion: 0.12
Nodes (35): coercePassNoteVerdict(), isPassOnlyIssue(), toOutcome(), ideasOutputSchema, reelIdeasOutputSchema, isReelTaskType(), ReelTaskType, canRefine() (+27 more)

### Community 94 - "InvitationsController"
Cohesion: 0.12
Nodes (13): InviteUserDto, ApiProperty, IsEmail, InvitationsController, ApiCookieAuth, ApiTags, Body, Controller (+5 more)

### Community 95 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 96 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 98 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 99 - "RedisConnectionService"
Cohesion: 0.20
Nodes (5): RedisCacheModule, Module, RedisConnectionService, Injectable, isRedisRequiredFromConfig()

### Community 100 - "CompanyContextController"
Cohesion: 0.22
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 101 - "observability.module.ts"
Cohesion: 0.29
Nodes (6): AiMetricsModule, Global, Module, ObservabilityModule, Global, Module

### Community 103 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 104 - "HealthController"
Cohesion: 0.31
Nodes (6): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get

### Community 105 - "PrismaService"
Cohesion: 0.04
Nodes (44): DeleteUserResult, DeleteUserUseCase, Inject, Injectable, CreateFeedbackUseCase, Inject, Injectable, agentKeySchema (+36 more)

### Community 106 - "configure-swagger.ts"
Cohesion: 0.36
Nodes (6): bootstrap(), parseCorsOrigins(), configureHttpApp(), ACCESS_COOKIE_NAME, buildSwaggerConfig(), COOKIE_AUTH_NAME

### Community 107 - "ConfigShowCommand"
Cohesion: 0.40
Nodes (3): ConfigShowCommand, Command, Option

### Community 108 - "AccountActivationRepository"
Cohesion: 0.13
Nodes (9): Inject, AccountActivationRecord, AccountActivationRepository, CreatePendingUser, RotateActivationTokenInput, ActivationRow, PrismaAccountActivationAdapter, Injectable (+1 more)

### Community 109 - "ConfigValidateCommand"
Cohesion: 0.50
Nodes (3): ConfigValidateCommand, Command, Option

### Community 110 - "should-include-redis-stack.ts"
Cohesion: 0.18
Nodes (12): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement() (+4 more)

### Community 111 - "isRecord"
Cohesion: 0.05
Nodes (67): geistMono, geistSans, metadata, ACTIVATION_FAILED_HINT, activateAccount(), bootstrapAdmin(), Credentials, fetchBootstrapStatus() (+59 more)

### Community 112 - "responses.adapter.ts"
Cohesion: 0.06
Nodes (66): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, toHttpException(), asSystemFingerprint(), asToolCallId(), asWarningCode(), ProviderAssistantTurn, ProviderChatTurn (+58 more)

### Community 114 - "RefreshSessionRepository"
Cohesion: 0.10
Nodes (9): Inject, Inject, Inject, Inject, RefreshSessionRecord, RefreshSessionRepository, RotateRefreshSessionResult, PrismaRefreshSessionAdapter (+1 more)

### Community 116 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 117 - "CompanyContextRepository"
Cohesion: 0.15
Nodes (19): toPublicCompanyContext(), GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PatchCompanyContextUseCase (+11 more)

### Community 122 - "api/src/app.module.ts"
Cohesion: 0.06
Nodes (52): AuthModule, Module, CompanyContextModule, Module, ContentRunExecutor, isCanonicalOutlineSelection(), isMissingContentKind(), Inject (+44 more)

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 125 - "brand"
Cohesion: 0.17
Nodes (10): brand, unbrand, createAccountActivationId(), createInvitationId(), createRequestId(), createUserId(), isAccountActivationId(), isInvitationId() (+2 more)

### Community 126 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 127 - "health.api.ts"
Cohesion: 0.27
Nodes (11): fetchGatewayAlive(), fetchHealthReady(), HealthCheck, HealthCheckStatus, HealthReadyAggregate, HealthReadyResponse, isGatewayAlive(), isRecord() (+3 more)

### Community 128 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.08
Nodes (26): ChatModule, Module, RequestIdMiddleware, Injectable, HealthModule, Module, AnthropicModule, Module (+18 more)

### Community 129 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 130 - "PrismaSocialResultAdapter"
Cohesion: 0.09
Nodes (10): Inject, OutputEditedWrite, OutputEditedWriter, applyWrite(), PrismaOutputEditedAdapter, Injectable, toInputJson(), PipelineState (+2 more)

### Community 131 - "openai-chat-completion-response.dto.ts"
Cohesion: 0.39
Nodes (8): OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty, ApiPropertyOptional

## Knowledge Gaps
- **468 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+463 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1247 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ModelAlias` connect `ModelAlias` to `app-metrics.service.ts`, `asProviderInstanceId`, `sentry-ai-metrics.adapter.ts`, `chat.service.ts`, `LoggingService`, `api-error.code.ts`, `cli-apply.types.ts`, `PrometheusAppMetricsAdapter`, `AppMetricsService`, `models.controller.ts`, `NoopAppMetricsAdapter`, `provider-registry.service.ts`, `GatewayConfig`, `config-generator.service.ts`, `chat-provider-call.service.ts`, `types/index.ts`, `branded.types.ts`, `app-metrics-backend.interface.ts`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `ModelAlias` to `asProviderInstanceId`, `LogContext`, `chat.service.ts`, `.info`, `cli.module.ts`, `PrometheusAppMetricsAdapter`, `AppMetricsService`, `provider-registry.service.ts`, `cli-apply.types.ts`, `models.controller.ts`, `branded.types.ts`, `sentry-ai-metrics.adapter.ts`, `api-error.code.ts`, `config-generator.service.ts`, `chat-provider-call.service.ts`, `types/index.ts`, `app-metrics-backend.interface.ts`, `app-metrics.service.ts`, `NoopAppMetricsAdapter`, `GatewayConfig`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Why does `isRunId()` connect `ids.ts` to `start-run.use-case.ts`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _468 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `DomainException` be split into smaller, more focused modules?**
  _Cohesion score 0.0563487530934704 - nodes in this community are weakly interconnected._
- **Should `get-run.use-case.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05913978494623656 - nodes in this community are weakly interconnected._