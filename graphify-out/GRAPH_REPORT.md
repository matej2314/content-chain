# Graph Report - content-chain  (2026-10-07)

## Corpus Check
- 688 files · ~222,608 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .css 1)

## Summary
- 4448 nodes · 13738 edges · 133 communities (120 shown, 12 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 412 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `103b3691`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- users.controller.ts
- get-run.use-case.ts
- api/company-context.types.ts
- EnvRef
- asClientId
- run-details-view.tsx
- api-error.code.ts
- logging.service.ts
- google-tools.mapper.ts
- cli.module.ts
- InMemoryRunSseHub
- swagger.setup.ts
- social.graph.ts
- runs-result.types.ts
- invitations.controller.ts
- chat-params.dto.ts
- PrometheusAppMetricsAdapter
- semantic-cache.service.ts
- run-review-panel.tsx
- apiFetch
- AuthController
- AppMetricsService
- register-form.tsx
- guest-quota.module.ts
- redis-vector-store.adapter.ts
- SemanticCacheService
- provider-registry.service.ts
- start-run-form.tsx
- openai-thinking-provider.mapper.ts
- ModelAddCommand
- auth.module.ts
- HealthService
- ai-provider-gateway/src/main.ts
- response-cache.service.ts
- AnthropicMessagesRequestDto
- anthropic-messages.controller.ts
- runs.types.ts
- enums.ts
- feedback-form.tsx
- exitWithAgentReport
- sentry-ai-metrics.adapter.ts
- prisma-run.adapter.ts
- openai-models.controller.ts
- ids.ts
- openai-chat-completions.controller.ts
- anthropic.module.ts
- DomainException
- ChatParamsDto
- RunRepository
- isRecord
- ListRunsQueryDto
- ModelAlias
- branded.types.ts
- config-generator.service.ts
- PublicConfigController
- anthropic/anthropic-tools.mapper.ts
- content.graph.ts
- domain/company-context.types.ts
- chat-completions.adapter.ts
- ai-provider-gateway/src/health/health.service.ts
- metrics.ts
- getAppConfig
- app-metrics.module.ts
- app-metrics.service.ts
- api/src/app.module.ts
- ModelRemoveCommand
- CompanyContext
- asProviderInstanceId
- OpenAiChatCompletionRequestDto
- HttpExceptionFilter
- LoggingService
- OpenAiChatMessageDto
- openai-messages.mapper.ts
- company-context.port.ts
- ClientEditCommand
- parse-verifier-log-message.ts
- company-context.mapper.ts
- api/src/health/health.service.ts
- KeyGenerateCommand
- llm-gateway.http.adapter.ts
- PrometheusService
- resolve-provider-call-options.ts
- ModelEditCommand
- SPEC — README
- event-source-registry-provider.tsx
- responses.adapter.ts
- GatewayConfig
- company-context.dto.ts
- openai-chat-message.dto.ts
- ProviderRemoveCommand
- openai-chat-completion-request.dto.ts
- chat-stream.controller.ts
- GatewayKey
- PrismaService
- StartRunDto
- ai-provider.interface.ts
- route.ts
- guest.guard.ts
- CompanyContextController
- save-output-edited.use-case.ts
- filters/http-exception.filter.ts
- ProviderAddCommand
- ProviderEditCommand
- AuthUserContext
- ClientAddCommand
- UserRepository
- JwtAuthGuard
- chat.service.ts
- cn
- company-context.controller.ts
- prisma-invitation.adapter.ts
- should-include-redis-stack.ts
- ConfigInitCommand
- ClientRemoveCommand
- Architektura
- brand
- configuration.ts
- ai-provider-gateway/src/app.module.ts
- anthropic-models.controller.ts
- models.controller.ts
- openai-params-provider.mapper.ts
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
- openai-messages-provider.mapper.ts

## God Nodes (most connected - your core abstractions)
1. `ModelAlias` - 88 edges
2. `ProviderInstanceId` - 81 edges
3. `DomainException` - 81 edges
4. `LoggingService` - 73 edges
5. `asProviderInstanceId()` - 67 edges
6. `GatewayConfig` - 65 edges
7. `isRecord()` - 64 edges
8. `cn()` - 62 edges
9. `GatewayKey` - 59 edges
10. `Env` - 59 edges

## Surprising Connections (you probably didn't know these)
- `mapGatewayResponseToAnthropicFormat()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/anthropic/mappers/anthropic-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `DialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/dialog.tsx → apps/frontend/src/shared/utils/utils.ts
- `RedisCacheAdapter` --implements--> `CacheBackend`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/cache/interfaces/cache-backend-interface.ts
- `CacheRegistryService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/cache-registry.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `ResponseCacheService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/response-cache.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (133 total, 12 thin omitted)

### Community 0 - "users.controller.ts"
Cohesion: 0.08
Nodes (22): ListUsersUseCase, Inject, Injectable, ReactivateUserUseCase, Inject, Injectable, SoftDeleteUserUseCase, Injectable (+14 more)

### Community 1 - "get-run.use-case.ts"
Cohesion: 0.06
Nodes (30): PageDocument, CompositeRunResultReader, GetRunOutput, orderItemsBySelectedIds(), RUN_RESULT_READER, RunResultReader, ContentBrief, SocialBrief (+22 more)

### Community 2 - "api/company-context.types.ts"
Cohesion: 0.05
Nodes (82): metadata, fetchCompanyContext(), fetchCompleteness(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras (+74 more)

### Community 3 - "EnvRef"
Cohesion: 0.32
Nodes (6): EnvPatchService, Injectable, ClientCli, EnvRef, MissingProviderApiKey, MissingProviderBaseUrl

### Community 4 - "asClientId"
Cohesion: 0.08
Nodes (39): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, InitAnswers (+31 more)

### Community 5 - "run-details-view.tsx"
Cohesion: 0.06
Nodes (51): metadata, metadata, assertNever(), notifyRunCancelled(), notifyRunTerminal(), EnvelopeRef, ProductToast, RunTerminalInput (+43 more)

### Community 6 - "api-error.code.ts"
Cohesion: 0.16
Nodes (22): ApiErrorCode, ApiErrorPayload, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isProviderRateLimitError(), isRateLimitStatus() (+14 more)

### Community 7 - "logging.service.ts"
Cohesion: 0.07
Nodes (22): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+14 more)

### Community 8 - "google-tools.mapper.ts"
Cohesion: 0.15
Nodes (26): toCachedChatResponse(), asInputTokens(), asOutputTokens(), getUsageMetadata(), buildGenerationConfig(), createGoogleProvider(), getFinalToolCalls(), getStopReason() (+18 more)

### Community 9 - "cli.module.ts"
Cohesion: 0.06
Nodes (66): AgentReport, AgentReportStatus, PendingSecretsItem, loadAnswers(), assertAgentHasAnswers(), CliMode, CliModeFlags, markAgentRuntime() (+58 more)

### Community 10 - "InMemoryRunSseHub"
Cohesion: 0.29
Nodes (4): RunSseEvent, InMemoryRunSseHub, Inject, Injectable

### Community 11 - "swagger.setup.ts"
Cohesion: 0.06
Nodes (43): ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString (+35 more)

### Community 12 - "social.graph.ts"
Cohesion: 0.13
Nodes (32): coercePassNoteVerdict(), isPassOnlyIssue(), ideasOutputSchema, reelIdeasOutputSchema, isReelTaskType(), ReelTaskType, canRefine(), MAX_REFINE (+24 more)

### Community 13 - "runs-result.types.ts"
Cohesion: 0.05
Nodes (53): PAGE_OUTLINE_ROLE_LABELS, submitHitl(), HitlAccepted, isPageOutlineSectionRole(), isReelDuration(), PAGE_OUTLINE_SECTION_ROLES, PageDocument, PageOutline (+45 more)

### Community 14 - "invitations.controller.ts"
Cohesion: 0.07
Nodes (25): ListInvitationsUseCase, Inject, Injectable, RevokeInvitationUseCase, Inject, Injectable, InviteUserDto, ApiProperty (+17 more)

### Community 15 - "chat-params.dto.ts"
Cohesion: 0.24
Nodes (7): ResponseFormatDto, ApiProperty, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsThinkingBudget()

### Community 16 - "PrometheusAppMetricsAdapter"
Cohesion: 0.14
Nodes (4): PrometheusAppMetricsAdapter, Injectable, AppProviderCallContext, AppTokenUsage

### Community 17 - "semantic-cache.service.ts"
Cohesion: 0.08
Nodes (22): OllamaEmbeddingAdapter, Injectable, EmbeddingBackend, EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema() (+14 more)

### Community 18 - "run-review-panel.tsx"
Cohesion: 0.08
Nodes (39): buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload() (+31 more)

### Community 19 - "apiFetch"
Cohesion: 0.08
Nodes (40): metadata, fetchGatewayAlive(), fetchHealthReady(), HealthCheck, HealthCheckStatus, HealthReadyAggregate, HealthReadyResponse, isGatewayAlive() (+32 more)

### Community 20 - "AuthController"
Cohesion: 0.05
Nodes (41): BootstrapStatusUseCase, Inject, Injectable, AuthController, ApiTags, Body, Controller, Get (+33 more)

### Community 21 - "AppMetricsService"
Cohesion: 0.10
Nodes (6): HttpMetricsMiddleware, Injectable, ActiveStreamsTracker, Injectable, AppMetricsService, Injectable

### Community 22 - "register-form.tsx"
Cohesion: 0.10
Nodes (27): AcceptInvitePage(), metadata, tokenFromSearchParam(), ACCEPT_INVITE_DEMO_HINT, ACCEPT_INVITE_UNAUTHORIZED_HINT, AcceptInviteFormError, toAcceptInviteFormError(), acceptInvite() (+19 more)

### Community 23 - "guest-quota.module.ts"
Cohesion: 0.13
Nodes (15): GUEST_QUOTA, GuestQuotaAdmitResult, GuestQuotaPort, GuestQuotaModule, Module, createRedis(), IoredisGuestQuotaAdapter, msUntilNextMidnight() (+7 more)

### Community 24 - "redis-vector-store.adapter.ts"
Cohesion: 0.11
Nodes (21): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), asString(), ParsedKnnHits, parseKnnHits() (+13 more)

### Community 25 - "SemanticCacheService"
Cohesion: 0.16
Nodes (12): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, isSingleTurnUserRequest(), lastUserMessageText(), SemanticCacheService (+4 more)

### Community 26 - "provider-registry.service.ts"
Cohesion: 0.15
Nodes (17): ProviderApiKey, ProviderInstanceRuntime, assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn (+9 more)

### Community 27 - "start-run-form.tsx"
Cohesion: 0.10
Nodes (34): logoutSession(), GuestLimitModal(), GuestLimitModalProps, GUEST_ALLOWED_TASK_TYPES, GUEST_CONTACTS, GUEST_QUOTA_CODES, GuestAllowedTaskType, GuestContact (+26 more)

### Community 28 - "openai-thinking-provider.mapper.ts"
Cohesion: 0.23
Nodes (13): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), ChatCompletionThinkingParam, isOpenAiEffortLevel(), isOpenAiReasoningRequested(), mapThinkingBudgetToEffort(), mapThinkingToResponsesReasoning() (+5 more)

### Community 29 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 30 - "auth.module.ts"
Cohesion: 0.06
Nodes (43): parseTtlMs(), parseTtlSeconds(), InviteUserResult, inviteUserSchema, InviteUserUseCase, Inject, Injectable, RESEND_ACTIVATION_RATE_LIMITER (+35 more)

### Community 31 - "HealthService"
Cohesion: 0.12
Nodes (11): HealthLivenessResponseDto, ApiProperty, HealthReadinessResponseDto, HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller (+3 more)

### Community 32 - "ai-provider-gateway/src/main.ts"
Cohesion: 0.13
Nodes (15): AppModule, Module, bootstrap(), API_GLOBAL_PREFIX, PORT, setupApp(), exportOpenApi(), OPENAPI_OUTPUT_FILENAME (+7 more)

### Community 33 - "response-cache.service.ts"
Cohesion: 0.12
Nodes (14): NoOpCacheBackend, Injectable, NoopCacheModule, Module, CacheModule, CacheModuleOptions, Module, CacheRegistryService (+6 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "anthropic-messages.controller.ts"
Cohesion: 0.11
Nodes (29): SseDoneEvent, asMessageId(), MessageId, AnthropicMessagesController, ApiSecurity, ApiTags, Controller, AnthropicContentBlock (+21 more)

### Community 36 - "runs.types.ts"
Cohesion: 0.05
Nodes (63): metadata, filterFeedbackRunOptions(), ArchiveRunsQuery, fetchRunSnapshot(), fetchUserRuns(), InitiatorOption, parseNullableIso(), parseReviewFields() (+55 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "feedback-form.tsx"
Cohesion: 0.21
Nodes (14): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody(), parseFeedbackCreated() (+6 more)

### Community 39 - "exitWithAgentReport"
Cohesion: 0.11
Nodes (9): emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), toSafeConfigSnapshot(), ProviderTestCommand, Command, Option, ProviderTestService (+1 more)

### Community 40 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.11
Nodes (27): CostUsd, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes() (+19 more)

### Community 41 - "prisma-run.adapter.ts"
Cohesion: 0.07
Nodes (19): LightRunItem, ListRunsResult, RunSnapshot, RunLogEntry, RunRecordBase, ALLOWED_RUN_STATES, assertTransition(), CANCELABLE_RUN_STATUSES (+11 more)

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.13
Nodes (21): ApiOpenAiErrorResponses(), OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+13 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (23): ACCOUNT_ACTIVATION_ID_RE, AccountActivationId, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createRunId() (+15 more)

### Community 44 - "openai-chat-completions.controller.ts"
Cohesion: 0.11
Nodes (29): GATEWAY_CACHE_HEADER, fromGatewayToolCallDto(), ANTHROPIC_INTEGRATION_PATH, OPENAI_INTEGRATION_PATH, OpenAiChatCompletionsController, ApiSecurity, ApiTags, Controller (+21 more)

### Community 45 - "anthropic.module.ts"
Cohesion: 0.21
Nodes (10): ChatModule, Module, AnthropicModule, Module, IntegrationsModule, Module, OpenAiModule, Module (+2 more)

### Community 46 - "DomainException"
Cohesion: 0.07
Nodes (54): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Injectable, ActivateAccountOutput, ActivateAccountUseCase, Injectable, comparePassword() (+46 more)

### Community 47 - "ChatParamsDto"
Cohesion: 0.20
Nodes (10): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+2 more)

### Community 48 - "RunRepository"
Cohesion: 0.02
Nodes (95): AutoFinalizeExpiredReviewsUseCase, Inject, Injectable, CancelRunUseCase, Inject, Injectable, FinalizeReviewUseCase, Inject (+87 more)

### Community 49 - "isRecord"
Cohesion: 0.08
Nodes (38): geistMono, geistSans, metadata, ACTIVATION_FAILED_HINT, activateAccount(), bootstrapAdmin(), Credentials, fetchBootstrapStatus() (+30 more)

### Community 50 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+2 more)

### Community 51 - "ModelAlias"
Cohesion: 0.07
Nodes (7): ProviderTestOptions, CliAiModel, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, AppMetricsBackend

### Community 52 - "branded.types.ts"
Cohesion: 0.08
Nodes (49): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+41 more)

### Community 53 - "config-generator.service.ts"
Cohesion: 0.16
Nodes (11): ConfigGeneratorService, Injectable, FileManagerService, Injectable, WizardRunResult, EnvTemplateInput, generateEnvTemplate(), isEnvInputRedisRequired() (+3 more)

### Community 54 - "PublicConfigController"
Cohesion: 0.22
Nodes (7): PublicConfigController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, Inject

### Community 55 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.09
Nodes (39): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent() (+31 more)

### Community 56 - "content.graph.ts"
Cohesion: 0.06
Nodes (53): CompanyContextRepository, Inject, coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema (+45 more)

### Community 57 - "domain/company-context.types.ts"
Cohesion: 0.18
Nodes (18): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CompanyContextWriteDetail (+10 more)

### Community 58 - "chat-completions.adapter.ts"
Cohesion: 0.19
Nodes (20): toHttpException(), asSystemFingerprint(), ProviderToolDefinition, ChatCompletionsAdapterOptions, createChatCompletionsAdapter(), textStream(), mapTurnsToOpenAiMessages(), accumulateOpenAiStreamToolCallDeltas() (+12 more)

### Community 59 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.24
Nodes (11): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiProperty, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty (+3 more)

### Community 60 - "metrics.ts"
Cohesion: 0.08
Nodes (36): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+28 more)

### Community 61 - "getAppConfig"
Cohesion: 0.13
Nodes (16): AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig, SemanticCacheRuntimeConfig, getAppConfig(), GatewayKeyGuard, Injectable (+8 more)

### Community 62 - "app-metrics.module.ts"
Cohesion: 0.09
Nodes (15): Inject, Optional, resolveAppMetricsBackend(), Inject, APP_METRICS_BACKEND, MetricsController, ApiOperation, ApiResponse (+7 more)

### Community 63 - "app-metrics.service.ts"
Cohesion: 0.15
Nodes (13): healthStatusToGaugeValue(), AppProviderStreamScope, AppRequestLabels, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus (+5 more)

### Community 64 - "api/src/app.module.ts"
Cohesion: 0.05
Nodes (64): AppModule, Module, AuthModule, Module, CompanyContextModule, Module, ContentPipelineFacade, toOutcome() (+56 more)

### Community 65 - "ModelRemoveCommand"
Cohesion: 0.33
Nodes (3): ModelRemoveCommand, Command, Option

### Community 66 - "CompanyContext"
Cohesion: 0.29
Nodes (5): CompanyContext, jsonArray(), jsonRecord(), PrismaCompanyContextAdapter, Injectable

### Community 67 - "asProviderInstanceId"
Cohesion: 0.08
Nodes (42): assertInteractiveAllowed(), DEFAULT_MODELS, CliAiProvider, ClientPromptService, Injectable, KeyPromptService, Injectable, ModelPromptResult (+34 more)

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (18): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+10 more)

### Community 69 - "HttpExceptionFilter"
Cohesion: 0.20
Nodes (6): ErrorEnvelope, HttpExceptionFilter, Catch, newRequestId(), RequestIdMiddleware, Injectable

### Community 70 - "LoggingService"
Cohesion: 0.08
Nodes (13): RedisCacheAdapter, Injectable, RedisCacheModule, Module, RedisConnectionService, Injectable, Inject, Inject (+5 more)

### Community 71 - "OpenAiChatMessageDto"
Cohesion: 0.22
Nodes (9): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+1 more)

### Community 72 - "openai-messages.mapper.ts"
Cohesion: 0.42
Nodes (6): mapOpenAiMessagesToGateway(), mapOpenAiToolCalls(), mapOpenAiChatRequestToGateway(), mapOpenAiToolChoice(), mapOpenAiToolsToGateway(), OpenAiFunctionTool

### Community 73 - "company-context.port.ts"
Cohesion: 0.42
Nodes (5): toPublicCompanyContext(), assertCompanyContextWritable(), PartialCompanyContext, isComplete(), mergeCompanyContext()

### Community 74 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "company-context.mapper.ts"
Cohesion: 0.10
Nodes (15): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+7 more)

### Community 77 - "api/src/health/health.service.ts"
Cohesion: 0.08
Nodes (28): GATEWAY_PROBE_TIMEOUT_MS, GatewayLivenessBody, GatewayLivenessProbe, GatewayLivenessProbeReason, GatewayLivenessProbeResult, isRecord(), parseGatewayLivenessBody(), probeFailureReason() (+20 more)

### Community 78 - "KeyGenerateCommand"
Cohesion: 0.39
Nodes (3): KeyGenerateCommand, Command, Option

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.06
Nodes (39): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), GatewayChatResponse (+31 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - "resolve-provider-call-options.ts"
Cohesion: 0.48
Nodes (5): clamp(), isOverrideKey(), resolveProviderCallOptions(), OVERRIDE_KEYS, OverrideKey

### Community 82 - "ModelEditCommand"
Cohesion: 0.33
Nodes (3): ModelEditCommand, Command, Option

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "event-source-registry-provider.tsx"
Cohesion: 0.43
Nodes (5): EventSourceRegistryContext, EventSourceRegistryProvider(), createEventSourceRegistry(), EventSourceRegistry, RegistryEntry

### Community 85 - "responses.adapter.ts"
Cohesion: 0.26
Nodes (15): asToolCallId(), buildResponsesCreateParams(), createResponsesAdapter(), textStream(), mapGatewayMetadataToOpenAi(), extractResponsesToolCalls(), mapResponsesStopReason(), parseOpenAiResponse() (+7 more)

### Community 86 - "GatewayConfig"
Cohesion: 0.07
Nodes (35): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, ClientManagerService, Injectable, ConfigPersistenceService, normalizeGatewayConfigForWrite() (+27 more)

### Community 87 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 88 - "openai-chat-message.dto.ts"
Cohesion: 0.60
Nodes (3): isTextContentItem(), normalizeOpenAiContent(), TextContentItem

### Community 89 - "ProviderRemoveCommand"
Cohesion: 0.33
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 92 - "chat-stream.controller.ts"
Cohesion: 0.04
Nodes (53): ApiHeader, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags, Body (+45 more)

### Community 93 - "GatewayKey"
Cohesion: 0.08
Nodes (26): ChatService, Injectable, CachedChatResponseWithConversation, ChatExecutionContext, ChatIngressProfile, CliRateLimit, GatewayClient, AddClientInput (+18 more)

### Community 94 - "PrismaService"
Cohesion: 0.05
Nodes (38): RefreshSessionRecord, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable, CreateFeedbackUseCase, Inject, Injectable, agentKeySchema (+30 more)

### Community 95 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 96 - "ai-provider.interface.ts"
Cohesion: 0.10
Nodes (40): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatCacheSource, ChatResponseData, SseMetaPayload, SseMetaPayloadDto, ApiProperty (+32 more)

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 99 - "guest.guard.ts"
Cohesion: 0.24
Nodes (5): ALLOW_GUEST_KEY, IS_PUBLIC_KEY, GuestGuard, Inject, Injectable

### Community 100 - "CompanyContextController"
Cohesion: 0.22
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 101 - "save-output-edited.use-case.ts"
Cohesion: 0.06
Nodes (42): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+34 more)

### Community 102 - "filters/http-exception.filter.ts"
Cohesion: 0.21
Nodes (7): DEFAULT_HTTP_STATUS_TO_CODE, GlobalExceptionFilter, isPayloadTooLargeError(), PayloadTooLargeError, RequestWithId, Catch, Injectable

### Community 103 - "ProviderAddCommand"
Cohesion: 0.31
Nodes (3): ProviderAddCommand, Command, Option

### Community 104 - "ProviderEditCommand"
Cohesion: 0.33
Nodes (3): ProviderEditCommand, Command, Option

### Community 106 - "AuthUserContext"
Cohesion: 0.08
Nodes (28): ApiCookieAuth, Patch, Body, HttpCode, Post, ratingSchema, assertRunReviewable(), ReviewWindowParams (+20 more)

### Community 107 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 108 - "UserRepository"
Cohesion: 0.04
Nodes (28): Inject, Inject, Inject, Inject, Inject, Inject, Inject, Inject (+20 more)

### Community 110 - "chat.service.ts"
Cohesion: 0.06
Nodes (49): SemanticStoreEmbedState, CacheIdentityMessage, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray (+41 more)

### Community 114 - "cn"
Cohesion: 0.05
Nodes (54): resendActivation(), RegistrationThankYou(), onResend(), RegistrationThankYouProps, DemoChip(), useDemoMode(), AppHeader(), AppHeaderProps (+46 more)

### Community 117 - "company-context.controller.ts"
Cohesion: 0.15
Nodes (13): GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PatchCompanyContextUseCase, Inject (+5 more)

### Community 118 - "prisma-invitation.adapter.ts"
Cohesion: 0.13
Nodes (19): Inject, InvitationListItem, AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, INVITATION_REPOSITORY, InvitationListRecord (+11 more)

### Community 120 - "should-include-redis-stack.ts"
Cohesion: 0.10
Nodes (23): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement() (+15 more)

### Community 121 - "ConfigInitCommand"
Cohesion: 0.14
Nodes (8): ConfigInitCommand, Command, Option, ConfigValidateCommand, Command, Option, CliGatewayValidatorService, Injectable

### Community 122 - "ClientRemoveCommand"
Cohesion: 0.33
Nodes (3): ClientRemoveCommand, Command, Option

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 125 - "brand"
Cohesion: 0.17
Nodes (10): brand, unbrand, createAccountActivationId(), createInvitationId(), createRequestId(), createUserId(), isAccountActivationId(), isInvitationId() (+2 more)

### Community 126 - "configuration.ts"
Cohesion: 0.08
Nodes (45): collectPendingSecrets(), CliValidateOptions, asSemanticCacheTtlSeconds(), collectInactiveProviderWarnings(), formatZodIssues(), validateGatewayConfig(), ValidationOptions, ValidationResult (+37 more)

### Community 128 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.07
Nodes (25): HealthModule, Module, LoggingModule, Global, Module, AiMetricsModule, Global, Module (+17 more)

### Community 129 - "anthropic-models.controller.ts"
Cohesion: 0.13
Nodes (21): ApiAnthropicErrorResponses(), AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+13 more)

### Community 131 - "models.controller.ts"
Cohesion: 0.10
Nodes (22): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+14 more)

### Community 132 - "openai-params-provider.mapper.ts"
Cohesion: 0.24
Nodes (11): mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses(), mapStopSequences(), OpenAiSharedChatCompletionParams, OpenAiSharedResponsesParams (+3 more)

### Community 145 - "openai-messages-provider.mapper.ts"
Cohesion: 0.27
Nodes (7): ProviderAssistantTurn, ProviderChatTurn, ProviderToolResultTurn, ChatCompletionMessageParam, mapAssistantTurn(), mapAssistantTurnToResponsesInput(), mapTurnsToResponsesInput()

## Knowledge Gaps
- **426 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+421 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1192 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ModelAlias` connect `ModelAlias` to `ai-provider.interface.ts`, `asProviderInstanceId`, `asClientId`, `models.controller.ts`, `api-error.code.ts`, `sentry-ai-metrics.adapter.ts`, `chat.service.ts`, `PrometheusAppMetricsAdapter`, `branded.types.ts`, `config-generator.service.ts`, `GatewayConfig`, `AppMetricsService`, `redis-vector-store.adapter.ts`, `provider-registry.service.ts`, `metrics.ts`, `GatewayKey`, `app-metrics.service.ts`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `ModelAlias` to `EnvRef`, `asClientId`, `models.controller.ts`, `logging.service.ts`, `cli.module.ts`, `PrometheusAppMetricsAdapter`, `AppMetricsService`, `provider-registry.service.ts`, `exitWithAgentReport`, `sentry-ai-metrics.adapter.ts`, `branded.types.ts`, `config-generator.service.ts`, `metrics.ts`, `getAppConfig`, `app-metrics.service.ts`, `asProviderInstanceId`, `GatewayConfig`, `GatewayKey`, `ai-provider.interface.ts`, `chat.service.ts`, `configuration.ts`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Why does `isRunId()` connect `ids.ts` to `RunRepository`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _426 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `users.controller.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08266129032258064 - nodes in this community are weakly interconnected._
- **Should `get-run.use-case.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.055964653902798235 - nodes in this community are weakly interconnected._