# Graph Report - content-chain  (2026-10-06)

## Corpus Check
- 680 files · ~217,041 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .css 1)

## Summary
- 4417 nodes · 13637 edges · 135 communities (121 shown, 13 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 412 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `983bbbbe`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- RunRepository
- SocialResultStore
- api/company-context.types.ts
- anthropic.module.ts
- cli.module.ts
- run-details-view.tsx
- provider-error.mapper.ts
- LogContext
- responses.adapter.ts
- exitWithAgentReport
- InMemoryRunSseHub
- GatewayKey
- social.graph.ts
- ai-provider.interface.ts
- run-result-editor.tsx
- chat-params.dto.ts
- app-metrics-backend.interface.ts
- semantic-cache.service.ts
- EnvRef
- users-view.tsx
- AuthController
- AppMetricsService
- PrometheusAppMetricsAdapter
- guest-quota.module.ts
- redis-vector-store.adapter.ts
- start-run-form.tsx
- GatewayProviderType
- ai-provider-gateway/src/app.module.ts
- auth.schemas.ts
- ModelAddCommand
- invitations.controller.ts
- HealthService
- ai-provider-gateway/src/main.ts
- redis-cache.adapter.ts
- AnthropicMessagesRequestDto
- app-metrics.service.ts
- runs.types.ts
- enums.ts
- feedback-form.tsx
- http-metrics.interceptor.ts
- sentry-ai-metrics.adapter.ts
- run.port.ts
- openai-chat-completions.controller.ts
- ids.ts
- openai-stream.mapper.ts
- chat.service.ts
- PublicConfigController
- anthropic-models.controller.ts
- auth.module.ts
- api-error.code.ts
- ListRunsQueryDto
- ModelAlias
- branded.types.ts
- config-generator.service.ts
- apiFetch
- anthropic/anthropic-tools.mapper.ts
- content.graph.ts
- health.api.ts
- swagger.setup.ts
- resilient-executor.ts
- models.controller.ts
- InProcessRunWorker
- agent-answers.schema.ts
- AppMetricsBackend
- api/src/app.module.ts
- ConfigInitCommand
- .createMessage
- asProviderInstanceId
- OpenAiChatCompletionRequestDto
- new-ids.ts
- cache.module.ts
- PrismaService
- ChatMessageDto
- configuration.ts
- .execute
- parse-verifier-log-message.ts
- DomainException
- api/src/health/health.service.ts
- openai-chat-completion-response.dto.ts
- llm-gateway.http.adapter.ts
- PrometheusService
- openai-params-provider.mapper.ts
- ClientEditCommand
- SPEC — README
- HttpExceptionFilter
- health-readiness-response.dto.ts
- model-manager.service.ts
- GatewayToolDefinitionDto
- should-include-redis-stack.ts
- ProviderRemoveCommand
- ClientListCommand
- ModelListCommand
- anthropic-messages.controller.ts
- ChatToolingDto
- ProviderListCommand
- StartRunDto
- metrics.ts
- route.ts
- envelope.ts
- ModelEditCommand
- save-output-edited.use-case.ts
- ProviderAddCommand
- ProviderEditCommand
- AllowGuest
- ClientAddCommand
- UserRepository
- anthropic-response.mapper.ts
- ClientId
- .create
- cn
- EnvironmentVariables
- guest.guard.ts
- domain/company-context.types.ts
- prisma-invitation.adapter.ts
- HealthController
- create-feedback.use-case.ts
- company-context.controller.ts
- Architektura
- brand
- env.schema.ts
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
- ChatParamsDto
- OpenAiChatMessageDto
- openai-chat-message.dto.ts
- openai-chat-completion-request.dto.ts

## God Nodes (most connected - your core abstractions)
1. `ModelAlias` - 88 edges
2. `ProviderInstanceId` - 81 edges
3. `DomainException` - 81 edges
4. `LoggingService` - 73 edges
5. `asProviderInstanceId()` - 67 edges
6. `GatewayConfig` - 65 edges
7. `isRecord()` - 62 edges
8. `cn()` - 62 edges
9. `GatewayKey` - 59 edges
10. `Env` - 57 edges

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

## Communities (135 total, 13 thin omitted)

### Community 0 - "RunRepository"
Cohesion: 0.03
Nodes (72): AutoFinalizeExpiredReviewsUseCase, Inject, Injectable, CancelRunUseCase, Inject, Injectable, GetRunLogsOutput, GetRunLogsUseCase (+64 more)

### Community 1 - "SocialResultStore"
Cohesion: 0.04
Nodes (41): ContentResultStore, ContentPipelineInput, ContentPipelineState, ContentRefineSnapshot, PageDocument, PageOutline, PageOutlineSection, PageOutlineSectionRole (+33 more)

### Community 2 - "api/company-context.types.ts"
Cohesion: 0.06
Nodes (59): metadata, fetchCompanyContext(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras, companyContextForPut() (+51 more)

### Community 3 - "anthropic.module.ts"
Cohesion: 0.15
Nodes (12): ChatModule, Module, GatewayKeyGuard, Injectable, AnthropicModule, Module, OpenAiBearerAuthGuard, Injectable (+4 more)

### Community 4 - "cli.module.ts"
Cohesion: 0.06
Nodes (51): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, CliModule, Module, DEFAULT_MODELS, WIZARD_INIT_STEPS (+43 more)

### Community 5 - "run-details-view.tsx"
Cohesion: 0.06
Nodes (56): metadata, metadata, useSession(), CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS (+48 more)

### Community 6 - "provider-error.mapper.ts"
Cohesion: 0.21
Nodes (19): MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isRateLimitStatus(), isServerError(), isTimeoutStatus(), nameLooksLikeTimeout() (+11 more)

### Community 7 - "LogContext"
Cohesion: 0.06
Nodes (22): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+14 more)

### Community 8 - "responses.adapter.ts"
Cohesion: 0.07
Nodes (61): toCachedChatResponse(), toHttpException(), asInputTokens(), asOutputTokens(), asSystemFingerprint(), asToolCallId(), getUsageMetadata(), buildGenerationConfig() (+53 more)

### Community 9 - "exitWithAgentReport"
Cohesion: 0.11
Nodes (37): AgentReport, AgentReportStatus, emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), loadAnswers(), assertAgentHasAnswers(), CliMode (+29 more)

### Community 10 - "InMemoryRunSseHub"
Cohesion: 0.29
Nodes (4): RunSseEvent, InMemoryRunSseHub, Inject, Injectable

### Community 11 - "GatewayKey"
Cohesion: 0.09
Nodes (20): isProviderRateLimitError(), StreamCleanupInterceptor, Injectable, readClientGatewayKey(), readGatewayKeyHeader(), resolveClientIdFromKey(), GatewayKey, ResolvedGatewayClient (+12 more)

### Community 12 - "social.graph.ts"
Cohesion: 0.10
Nodes (42): SocialBrief, loadPromptFromDir(), coercePassNoteVerdict(), isPassOnlyIssue(), SocialPipelineFacade, toOutcome(), Injectable, isReelTaskType() (+34 more)

### Community 13 - "ai-provider.interface.ts"
Cohesion: 0.12
Nodes (32): mapStopReasonToFinishReason(), CompleteOnceResult, StreamOnceResult, ProviderResponse, SseDeltaEvent, SseEvent, SseFinishReason, SseMetaEvent (+24 more)

### Community 14 - "run-result-editor.tsx"
Cohesion: 0.04
Nodes (62): buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload() (+54 more)

### Community 15 - "chat-params.dto.ts"
Cohesion: 0.24
Nodes (7): ResponseFormatDto, ApiProperty, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsThinkingBudget()

### Community 16 - "app-metrics-backend.interface.ts"
Cohesion: 0.11
Nodes (11): healthStatusToGaugeValue(), AppProviderStreamScope, AppRequestLabels, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus (+3 more)

### Community 17 - "semantic-cache.service.ts"
Cohesion: 0.06
Nodes (32): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, OllamaEmbeddingAdapter, Injectable, EmbeddingBackend (+24 more)

### Community 18 - "EnvRef"
Cohesion: 0.06
Nodes (19): ClientRemoveCommand, Command, Option, ConfigSecretsStatusCommand, Command, Option, KeyGenerateCommand, Command (+11 more)

### Community 19 - "users-view.tsx"
Cohesion: 0.14
Nodes (22): metadata, createInvitation(), fetchInvitations(), resendInvitation(), revokeInvitation(), InvitationListItem, InviteCreated, isInvitationExpired() (+14 more)

### Community 20 - "AuthController"
Cohesion: 0.06
Nodes (39): AuthController, ApiCookieAuth, ApiTags, Body, Controller, Get, HttpCode, Patch (+31 more)

### Community 21 - "AppMetricsService"
Cohesion: 0.11
Nodes (5): HttpMetricsMiddleware, Injectable, AppMetricsService, Injectable, HttpMethod

### Community 22 - "PrometheusAppMetricsAdapter"
Cohesion: 0.15
Nodes (5): PrometheusAppMetricsAdapter, Injectable, resolveAppMetricsBackend(), AppProviderCallContext, AppTokenUsage

### Community 23 - "guest-quota.module.ts"
Cohesion: 0.09
Nodes (18): isGuestTaskType(), Inject, Inject, GUEST_QUOTA, GuestQuotaAdmitResult, GuestQuotaPort, GuestQuotaModule, Module (+10 more)

### Community 24 - "redis-vector-store.adapter.ts"
Cohesion: 0.10
Nodes (26): isUnservableCachedReply(), CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag() (+18 more)

### Community 25 - "start-run-form.tsx"
Cohesion: 0.09
Nodes (39): metadata, assertNever(), notifyProduct(), notifyRunCancelled(), notifyRunTerminal(), EnvelopeRef, ProductToast, RunTerminalInput (+31 more)

### Community 26 - "GatewayProviderType"
Cohesion: 0.08
Nodes (30): ProviderTestCommand, Command, Option, CliAiModel, CliAiProvider, EnvPatchValue, ProviderTestService, Injectable (+22 more)

### Community 27 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.07
Nodes (28): RequestIdMiddleware, Injectable, createRequestId(), HealthModule, Module, IntegrationsModule, Module, LoggingModule (+20 more)

### Community 28 - "auth.schemas.ts"
Cohesion: 0.05
Nodes (35): ActivateAccountInput, activateAccountSchema, BootstrapAdminInput, bootstrapAdminSchema, LoginInput, loginSchema, PatchUserCommand, patchUserSchema (+27 more)

### Community 29 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 30 - "invitations.controller.ts"
Cohesion: 0.05
Nodes (35): InviteUserUseCase, Inject, Injectable, ListInvitationsUseCase, Inject, Injectable, ResendInvitationUseCase, Inject (+27 more)

### Community 31 - "HealthService"
Cohesion: 0.16
Nodes (6): HealthLivenessResponseDto, ApiProperty, HealthReadinessResponseDto, ApiProperty, HealthService, Injectable

### Community 32 - "ai-provider-gateway/src/main.ts"
Cohesion: 0.13
Nodes (15): AppModule, Module, bootstrap(), API_GLOBAL_PREFIX, PORT, setupApp(), exportOpenApi(), OPENAPI_OUTPUT_FILENAME (+7 more)

### Community 33 - "redis-cache.adapter.ts"
Cohesion: 0.14
Nodes (9): NoOpCacheBackend, Injectable, RedisCacheAdapter, Injectable, CacheRegistryService, Injectable, CacheBackend, CacheKey (+1 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "app-metrics.service.ts"
Cohesion: 0.14
Nodes (11): APP_METRICS_BACKEND, MetricsController, ApiOperation, ApiResponse, ApiTags, Controller, Get, PreMetricsScrapeHook (+3 more)

### Community 36 - "runs.types.ts"
Cohesion: 0.07
Nodes (66): ArchiveRunsQuery, isUserRating(), patchRunRating(), HitlAccepted, isPageOutlineSectionRole(), isReelDuration(), PageOutlineSection, parseArray() (+58 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "feedback-form.tsx"
Cohesion: 0.19
Nodes (16): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, filterFeedbackRunOptions(), CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody() (+8 more)

### Community 39 - "http-metrics.interceptor.ts"
Cohesion: 0.11
Nodes (18): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, MetricsController, Controller, Get (+10 more)

### Community 40 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.10
Nodes (28): CostUsd, ToolCallId, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext() (+20 more)

### Community 41 - "run.port.ts"
Cohesion: 0.06
Nodes (25): ListRunsOutput, contentBriefSchema, socialBriefSchema, LightRunItem, ListRunsQuery, ListRunsResult, PAGE_SIZE, RunSnapshot (+17 more)

### Community 42 - "openai-chat-completions.controller.ts"
Cohesion: 0.08
Nodes (29): GATEWAY_CACHE_HEADER, ApiOpenAiErrorResponses(), OPENAI_INTEGRATION_PATH, OpenAiChatCompletionsController, ApiSecurity, ApiTags, Controller, OpenAiModelsController (+21 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (23): ACCOUNT_ACTIVATION_ID_RE, AccountActivationId, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createRunId() (+15 more)

### Community 44 - "openai-stream.mapper.ts"
Cohesion: 0.28
Nodes (13): SseDoneEvent, fromGatewayToolCallDto(), mapChatResponseToOpenAi(), mapFinishReasontoOpenAI(), mapGatewayToolCallsToOpenAi(), mapSystemFingerprintToOpenAi(), toOpenAiCompletionId(), baseChunkFields() (+5 more)

### Community 45 - "chat.service.ts"
Cohesion: 0.05
Nodes (36): RedisConnectionService, Injectable, Inject, Inject, isRedisRequiredFromConfig(), CachedChatResponseWithConversation, createInProcessSingleflight(), ChatErrorHandlerService (+28 more)

### Community 46 - "PublicConfigController"
Cohesion: 0.17
Nodes (9): PublicConfigController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, Inject, PublicConfigModule (+1 more)

### Community 47 - "anthropic-models.controller.ts"
Cohesion: 0.12
Nodes (21): ApiAnthropicErrorResponses(), AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+13 more)

### Community 48 - "auth.module.ts"
Cohesion: 0.05
Nodes (59): ActivateAccountUseCase, Injectable, AuthTokenResult, BootstrapAdminUseCase, Inject, Injectable, BootstrapStatusUseCase, Injectable (+51 more)

### Community 49 - "api-error.code.ts"
Cohesion: 0.11
Nodes (20): ApiErrorCode, DEFAULT_HTTP_STATUS_TO_CODE, ApiErrorPayload, GlobalExceptionFilter, isPayloadTooLargeError(), PayloadTooLargeError, RequestWithId, Catch (+12 more)

### Community 50 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+2 more)

### Community 51 - "ModelAlias"
Cohesion: 0.12
Nodes (6): ProviderTestOptions, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, TokenDirection

### Community 52 - "branded.types.ts"
Cohesion: 0.11
Nodes (32): CliRateLimit, CONVERSATION_ID_PATTERN, isAttemptNumber(), isBaseUrl(), isCacheTtlSeconds(), isConversationId(), isFiniteNumber(), isMaxAttempts() (+24 more)

### Community 53 - "config-generator.service.ts"
Cohesion: 0.09
Nodes (18): isRedisRequired(), ConfigValidateCommand, Command, Option, CliGatewayValidatorService, Injectable, ConfigGeneratorService, Injectable (+10 more)

### Community 54 - "apiFetch"
Cohesion: 0.08
Nodes (44): geistMono, geistSans, metadata, acceptInvite(), activateAccount(), bootstrapAdmin(), Credentials, fetchBootstrapStatus() (+36 more)

### Community 55 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.11
Nodes (36): asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent(), isAnthropicEffortLevel(), mapThinkingBudgetToAnthropicEffort(), mapThinkingToAnthropic() (+28 more)

### Community 56 - "content.graph.ts"
Cohesion: 0.09
Nodes (42): CompanyContextRepository, Inject, coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema (+34 more)

### Community 57 - "health.api.ts"
Cohesion: 0.27
Nodes (11): fetchGatewayAlive(), fetchHealthReady(), HealthCheck, HealthCheckStatus, HealthReadyAggregate, HealthReadyResponse, isGatewayAlive(), isRecord() (+3 more)

### Community 58 - "swagger.setup.ts"
Cohesion: 0.08
Nodes (31): ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString (+23 more)

### Community 59 - "resilient-executor.ts"
Cohesion: 0.17
Nodes (18): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+10 more)

### Community 60 - "models.controller.ts"
Cohesion: 0.10
Nodes (22): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+14 more)

### Community 61 - "InProcessRunWorker"
Cohesion: 0.13
Nodes (4): InProcessRunWorker, Injectable, isRetryable(), RetryReason

### Community 62 - "agent-answers.schema.ts"
Cohesion: 0.11
Nodes (21): ClientAddAnswers, ClientAddAnswersSchema, ClientEditAnswers, ClientEditAnswersSchema, ClientRemoveAnswers, ClientRemoveAnswersSchema, InitAnswersSchema, ModelAddAnswers (+13 more)

### Community 64 - "api/src/app.module.ts"
Cohesion: 0.07
Nodes (45): CompanyContextModule, Module, ContentPipelineFacade, toOutcome(), Injectable, ContentRunExecutor, isCanonicalOutlineSelection(), isMissingContentKind() (+37 more)

### Community 65 - "ConfigInitCommand"
Cohesion: 0.31
Nodes (3): ConfigInitCommand, Command, Option

### Community 66 - ".createMessage"
Cohesion: 0.12
Nodes (14): ApiHeader, AnthropicMessagesController, ApiBody, ApiOperation, ApiProduces, ApiResponse, ApiSecurity, ApiTags (+6 more)

### Community 67 - "asProviderInstanceId"
Cohesion: 0.11
Nodes (34): PendingSecretsItem, assertInteractiveAllowed(), collectPendingSecrets(), convertProvider(), ProviderPromptResult, ProviderPromptService, Injectable, ProviderManagerService (+26 more)

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (18): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+10 more)

### Community 69 - "new-ids.ts"
Cohesion: 0.25
Nodes (6): ErrorEnvelope, newAccountActivationId(), newInvitationId(), newRequestId(), RequestIdMiddleware, Injectable

### Community 70 - "cache.module.ts"
Cohesion: 0.16
Nodes (10): NoopCacheModule, Module, RedisCacheModule, Module, CacheModule, CacheModuleOptions, Module, CACHE_BACKEND (+2 more)

### Community 71 - "PrismaService"
Cohesion: 0.11
Nodes (9): RefreshSessionRecord, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable, PrismaModule, Global, Module, PrismaService (+1 more)

### Community 72 - "ChatMessageDto"
Cohesion: 0.18
Nodes (11): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+3 more)

### Community 73 - "configuration.ts"
Cohesion: 0.06
Nodes (49): CliValidateOptions, normalizeGatewayConfigForWrite(), ValidationFormatter, UnsupportedProviderException, asCacheTtlSeconds(), asSemanticCacheTtlSeconds(), AppConfiguration, RedisRuntimeConfig (+41 more)

### Community 74 - ".execute"
Cohesion: 0.31
Nodes (9): isContentStartCommand(), isPlainRecord(), omitUndefinedDeep(), makeContentRun(), makeSocialRun(), makeSocialSnapshot(), SocialRunSnapshot, newConversationId() (+1 more)

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "DomainException"
Cohesion: 0.07
Nodes (35): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Injectable, comparePassword(), generateRefreshToken(), hashPassword(), hashRefreshToken() (+27 more)

### Community 77 - "api/src/health/health.service.ts"
Cohesion: 0.08
Nodes (28): GATEWAY_PROBE_TIMEOUT_MS, GatewayLivenessBody, GatewayLivenessProbe, GatewayLivenessProbeReason, GatewayLivenessProbeResult, isRecord(), parseGatewayLivenessBody(), probeFailureReason() (+20 more)

### Community 78 - "openai-chat-completion-response.dto.ts"
Cohesion: 0.39
Nodes (8): OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty, ApiPropertyOptional

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.11
Nodes (22): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), GatewayChatResponse (+14 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - "openai-params-provider.mapper.ts"
Cohesion: 0.12
Nodes (24): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+16 more)

### Community 82 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 85 - "health-readiness-response.dto.ts"
Cohesion: 0.33
Nodes (8): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty, ApiPropertyOptional

### Community 86 - "model-manager.service.ts"
Cohesion: 0.11
Nodes (29): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, convertModel(), defaultModelPolicy(), ModelEditField, ModelManagerService (+21 more)

### Community 87 - "GatewayToolDefinitionDto"
Cohesion: 0.29
Nodes (6): GatewayToolDefinitionDto, ApiProperty, ApiPropertyOptional, IsObject, IsOptional, IsString

### Community 88 - "should-include-redis-stack.ts"
Cohesion: 0.18
Nodes (11): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis() (+3 more)

### Community 89 - "ProviderRemoveCommand"
Cohesion: 0.33
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 90 - "ClientListCommand"
Cohesion: 0.40
Nodes (3): ClientListCommand, Command, Option

### Community 91 - "ModelListCommand"
Cohesion: 0.40
Nodes (3): ModelListCommand, Command, Option

### Community 92 - "anthropic-messages.controller.ts"
Cohesion: 0.06
Nodes (41): ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags, Body, Controller (+33 more)

### Community 93 - "ChatToolingDto"
Cohesion: 0.29
Nodes (9): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+1 more)

### Community 94 - "ProviderListCommand"
Cohesion: 0.40
Nodes (3): ProviderListCommand, Command, Option

### Community 95 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 96 - "metrics.ts"
Cohesion: 0.14
Nodes (21): getClientConversationId(), getOrCreateConversationIdForResponse(), buildAppProviderMetricsContext(), buildLlmMetricsContext(), mapProviderResponseToAiObservation(), mapProviderResponseToUsage(), toMetricsMessages(), buildProviderInputForAlias() (+13 more)

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 98 - "envelope.ts"
Cohesion: 0.06
Nodes (41): ACTIVATION_FAILED_HINT, GuestView, HomeEntry(), RegisterSuccess, RegisterFieldErrors, fetchCompleteness(), CompletenessState, CompletenessChip() (+33 more)

### Community 99 - "ModelEditCommand"
Cohesion: 0.16
Nodes (6): ModelEditCommand, Command, Option, ModelRemoveCommand, Command, Option

### Community 101 - "save-output-edited.use-case.ts"
Cohesion: 0.08
Nodes (37): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+29 more)

### Community 103 - "ProviderAddCommand"
Cohesion: 0.31
Nodes (3): ProviderAddCommand, Command, Option

### Community 104 - "ProviderEditCommand"
Cohesion: 0.33
Nodes (3): ProviderEditCommand, Command, Option

### Community 106 - "AllowGuest"
Cohesion: 0.20
Nodes (15): isTerminalStatus(), RunsController, ApiCookieAuth, ApiTags, Body, Controller, Get, HttpCode (+7 more)

### Community 107 - "ClientAddCommand"
Cohesion: 0.33
Nodes (3): ClientAddCommand, Command, Option

### Community 108 - "UserRepository"
Cohesion: 0.06
Nodes (23): ActivateAccountOutput, Inject, Inject, Inject, Inject, AccountActivationRecord, AccountActivationRepository, CreatePendingUser (+15 more)

### Community 109 - "anthropic-response.mapper.ts"
Cohesion: 0.15
Nodes (23): asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto, AnthropicTextContentBlockDto, AnthropicThinkingContentBlockDto (+15 more)

### Community 110 - "ClientId"
Cohesion: 0.07
Nodes (49): SemanticStoreEmbedState, CacheIdentityMessage, ChatCacheSource, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional (+41 more)

### Community 111 - ".create"
Cohesion: 0.12
Nodes (15): CreateFeedbackUseCase, Injectable, FeedbackController, ApiCookieAuth, ApiTags, Body, Controller, HttpCode (+7 more)

### Community 114 - "cn"
Cohesion: 0.05
Nodes (60): metadata, ACCEPT_INVITE_UNAUTHORIZED_HINT, AcceptInviteFormError, toAcceptInviteFormError(), AcceptInviteForm(), onSubmit(), AcceptInviteFormProps, LoginCardProps (+52 more)

### Community 115 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 116 - "guest.guard.ts"
Cohesion: 0.17
Nodes (7): ALLOW_GUEST_KEY, IS_PUBLIC_KEY, GuestGuard, Inject, Injectable, JwtAuthGuard, Injectable

### Community 117 - "domain/company-context.types.ts"
Cohesion: 0.05
Nodes (62): toCompanyContext(), toPartialCompanyContext(), toPublicCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema (+54 more)

### Community 118 - "prisma-invitation.adapter.ts"
Cohesion: 0.13
Nodes (19): Inject, InvitationListItem, AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, INVITATION_REPOSITORY, InvitationListRecord (+11 more)

### Community 119 - "HealthController"
Cohesion: 0.31
Nodes (6): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get

### Community 120 - "create-feedback.use-case.ts"
Cohesion: 0.11
Nodes (17): Inject, agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_RUN_READER, FeedbackRunLookup, FeedbackRunReader, FEEDBACK_BODY_MAX (+9 more)

### Community 122 - "company-context.controller.ts"
Cohesion: 0.12
Nodes (16): GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PatchCompanyContextUseCase, Inject (+8 more)

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 125 - "brand"
Cohesion: 0.17
Nodes (10): brand, unbrand, createAccountActivationId(), createInvitationId(), createRequestId(), createUserId(), isAccountActivationId(), isInvitationId() (+2 more)

### Community 128 - "env.schema.ts"
Cohesion: 0.17
Nodes (11): AppModule, Module, bootstrap(), EnvModule, Global, Module, envSchema, parseCorsOrigins() (+3 more)

### Community 146 - "ChatParamsDto"
Cohesion: 0.20
Nodes (10): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+2 more)

### Community 147 - "OpenAiChatMessageDto"
Cohesion: 0.22
Nodes (9): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+1 more)

### Community 150 - "openai-chat-message.dto.ts"
Cohesion: 0.60
Nodes (3): isTextContentItem(), normalizeOpenAiContent(), TextContentItem

## Knowledge Gaps
- **416 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+411 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1183 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ModelAlias` connect `ModelAlias` to `cli.module.ts`, `exitWithAgentReport`, `ai-provider.interface.ts`, `app-metrics-backend.interface.ts`, `AppMetricsService`, `PrometheusAppMetricsAdapter`, `redis-vector-store.adapter.ts`, `GatewayProviderType`, `app-metrics.service.ts`, `sentry-ai-metrics.adapter.ts`, `chat.service.ts`, `api-error.code.ts`, `branded.types.ts`, `config-generator.service.ts`, `resilient-executor.ts`, `models.controller.ts`, `AppMetricsBackend`, `asProviderInstanceId`, `configuration.ts`, `model-manager.service.ts`, `metrics.ts`, `ClientId`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `ModelAlias` to `cli.module.ts`, `LogContext`, `exitWithAgentReport`, `ai-provider.interface.ts`, `app-metrics-backend.interface.ts`, `EnvRef`, `AppMetricsService`, `PrometheusAppMetricsAdapter`, `redis-vector-store.adapter.ts`, `GatewayProviderType`, `app-metrics.service.ts`, `sentry-ai-metrics.adapter.ts`, `chat.service.ts`, `branded.types.ts`, `config-generator.service.ts`, `models.controller.ts`, `AppMetricsBackend`, `asProviderInstanceId`, `configuration.ts`, `model-manager.service.ts`, `metrics.ts`, `ClientId`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Why does `LoggingService` connect `chat.service.ts` to `ai-provider-gateway/src/main.ts`, `redis-cache.adapter.ts`, `swagger.setup.ts`, `LogContext`, `responses.adapter.ts`, `configuration.ts`, `GatewayKey`, `ClientId`, `semantic-cache.service.ts`, `api-error.code.ts`, `anthropic/anthropic-tools.mapper.ts`, `redis-vector-store.adapter.ts`, `GatewayProviderType`, `resilient-executor.ts`, `HealthService`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _416 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `RunRepository` be split into smaller, more focused modules?**
  _Cohesion score 0.032849409448818895 - nodes in this community are weakly interconnected._
- **Should `SocialResultStore` be split into smaller, more focused modules?**
  _Cohesion score 0.0380952380952381 - nodes in this community are weakly interconnected._