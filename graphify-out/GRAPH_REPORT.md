# Graph Report - content-chain  (2026-10-08)

## Corpus Check
- 693 files · ~228,659 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .css 1)

## Summary
- 4477 nodes · 13788 edges · 146 communities (130 shown, 15 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 412 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `21ad454d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- runs-result.types.ts
- social.types.ts
- api/company-context.types.ts
- cli-apply.types.ts
- asClientId
- run-details-view.tsx
- provider-error.mapper.ts
- LogContext
- anthropic/anthropic-tools.mapper.ts
- exitWithAgentReport
- RunSseHub
- ChatToolingDto
- social.graph.ts
- cli.module.ts
- InvitationsController
- ChatParamsDto
- PrometheusAppMetricsAdapter
- semantic-cache.constants.ts
- run-review-panel.tsx
- apiFetch
- auth.controller.ts
- AppMetricsService
- register-form.tsx
- GuestQuotaPort
- RedisVectorStoreAdapter
- SemanticCacheService
- LoggingService
- start-run-form.tsx
- openai-params-provider.mapper.ts
- ModelAddCommand
- auth.module.ts
- HealthService
- swagger.setup.ts
- response-cache.service.ts
- AnthropicMessagesRequestDto
- anthropic-messages.controller.ts
- runs.types.ts
- enums.ts
- feedback-form.tsx
- GatewayConfig
- sentry-ai-metrics.adapter.ts
- prisma-run.adapter.ts
- openai-models.controller.ts
- ids.ts
- openai-chat-completion-response.dto.ts
- anthropic.module.ts
- DomainException
- RunRepository
- runs.module.ts
- isRecord
- runs.controller.ts
- ModelAlias
- types/index.ts
- .info
- PublicConfigController
- users.controller.ts
- llm-hop.ts
- domain/company-context.types.ts
- RefreshSessionRepository
- health-readiness-response.dto.ts
- metrics.ts
- app-metrics.service.ts
- MetricsController
- app-metrics-backend.interface.ts
- api/src/app.module.ts
- ModelRemoveCommand
- .executeViaExecutor
- asProviderInstanceId
- OpenAiChatCompletionRequestDto
- start-run.use-case.ts
- RedisConnectionService
- configuration-validation.service.ts
- openai-chat-completions.controller.ts
- prisma-guest-purge.adapter.ts
- ClientEditCommand
- parse-verifier-log-message.ts
- company-context.mapper.ts
- api/src/health/health.service.ts
- finalize-review.use-case.ts
- llm-gateway.http.adapter.ts
- PrometheusService
- resolve-provider-call-options.ts
- ModelEditCommand
- SPEC — README
- google-tools.mapper.ts
- redis-vector-store.adapter.ts
- model-manager.service.ts
- company-context.dto.ts
- agent-answers.schema.ts
- ProviderRemoveCommand
- EnvironmentVariables
- content.types.ts
- configuration.types.ts
- getAppConfig
- PrismaService
- StartRunDto
- branded.types.ts
- route.ts
- AnthropicContentBlockDto
- HttpExceptionFilter
- CompanyContextController
- save-output-edited.use-case.ts
- GlobalExceptionFilter
- ProviderAddCommand
- ProviderEditCommand
- observability.module.ts
- AuthUserContext
- ClientAddCommand
- UserRepository
- JwtAuthGuard
- chat.service.ts
- VectorStore
- ConfigSecretsStatusCommand
- OpenAiChatMessageDto
- cn
- guest.guard.ts
- api/src/main.ts
- CompanyContextRepository
- prisma-invitation.adapter.ts
- patch-company-context.use-case.ts
- should-include-redis-stack.ts
- CompanyContext
- ClientRemoveCommand
- env.validation.ts
- Architektura
- brand
- configuration.ts
- event-source-registry-provider.tsx
- ai-provider-gateway/src/app.module.ts
- anthropic-models.controller.ts
- rate-limit.module.ts
- models.controller.ts
- ModelListCommand
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
- ProviderListCommand
- RunsModule

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
- `optionalEnvRefSchema` --calls--> `asEnvRef()`  [EXTRACTED]
  apps/ai-provider-gateway/src/config/gateway-config.schema.ts → apps/ai-provider-gateway/src/common/types/branded.types.ts
- `DialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/dialog.tsx → apps/frontend/src/shared/utils/utils.ts
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `RedisConnectionService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-connection.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (146 total, 15 thin omitted)

### Community 0 - "runs-result.types.ts"
Cohesion: 0.05
Nodes (53): PAGE_OUTLINE_ROLE_LABELS, submitHitl(), HitlAccepted, isPageOutlineSectionRole(), isReelDuration(), PAGE_OUTLINE_SECTION_ROLES, PageDocument, PageOutline (+45 more)

### Community 1 - "social.types.ts"
Cohesion: 0.06
Nodes (25): CompositeRunResultReader, GetRunOutput, RunResultReader, SocialBrief, EmptyRunResultReader, Injectable, SocialResultStore, PipelineState (+17 more)

### Community 2 - "api/company-context.types.ts"
Cohesion: 0.05
Nodes (82): metadata, fetchCompanyContext(), fetchCompleteness(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras (+74 more)

### Community 3 - "cli-apply.types.ts"
Cohesion: 0.15
Nodes (26): CliAiProvider, CliRateLimit, GatewayClient, EnvPatchValue, ServerConfigPromptResult, WizardRunResult, ClientCli, EnvTemplateInput (+18 more)

### Community 4 - "asClientId"
Cohesion: 0.10
Nodes (23): KeyGenerateCommand, Command, Option, InitAnswers, CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema, convertClient() (+15 more)

### Community 5 - "run-details-view.tsx"
Cohesion: 0.06
Nodes (51): metadata, metadata, assertNever(), notifyRunCancelled(), notifyRunTerminal(), EnvelopeRef, ProductToast, RunTerminalInput (+43 more)

### Community 6 - "provider-error.mapper.ts"
Cohesion: 0.19
Nodes (20): ApiErrorPayload, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isRateLimitStatus(), isServerError(), isTimeoutStatus() (+12 more)

### Community 7 - "LogContext"
Cohesion: 0.07
Nodes (22): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+14 more)

### Community 8 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.05
Nodes (86): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, toCachedChatResponse(), toHttpException(), asInputTokens(), asOutputTokens(), asPromptCacheCreationTokens() (+78 more)

### Community 9 - "exitWithAgentReport"
Cohesion: 0.13
Nodes (24): AgentReportStatus, emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), loadAnswers(), assertAgentHasAnswers(), CliMode, CliModeFlags (+16 more)

### Community 10 - "RunSseHub"
Cohesion: 0.16
Nodes (6): Inject, RunSseEvent, RunSseHub, InMemoryRunSseHub, Inject, Injectable

### Community 11 - "ChatToolingDto"
Cohesion: 0.16
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 12 - "social.graph.ts"
Cohesion: 0.12
Nodes (36): hopErrorLogMessage(), throwIfAborted(), loadPromptFromDir(), renderPrompt(), coercePassNoteVerdict(), isPassOnlyIssue(), ideasOutputSchema, reelIdeasOutputSchema (+28 more)

### Community 13 - "cli.module.ts"
Cohesion: 0.06
Nodes (40): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, CliModule, Module, ClientListCommand, Command (+32 more)

### Community 14 - "InvitationsController"
Cohesion: 0.12
Nodes (13): InviteUserDto, ApiProperty, IsEmail, InvitationsController, ApiCookieAuth, ApiTags, Body, Controller (+5 more)

### Community 15 - "ChatParamsDto"
Cohesion: 0.12
Nodes (17): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+9 more)

### Community 16 - "PrometheusAppMetricsAdapter"
Cohesion: 0.11
Nodes (5): healthStatusToGaugeValue(), PrometheusAppMetricsAdapter, Injectable, resolveAppMetricsBackend(), AppRequestLabels

### Community 17 - "semantic-cache.constants.ts"
Cohesion: 0.13
Nodes (12): EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema(), EMBEDDING_CIRCUIT_COOLDOWN_MS, EMBEDDING_CIRCUIT_OPEN_AFTER, EMBEDDING_PROBE_TIMEOUT_MS (+4 more)

### Community 18 - "run-review-panel.tsx"
Cohesion: 0.08
Nodes (39): buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload() (+31 more)

### Community 19 - "apiFetch"
Cohesion: 0.08
Nodes (40): metadata, fetchGatewayAlive(), fetchHealthReady(), HealthCheck, HealthCheckStatus, HealthReadyAggregate, HealthReadyResponse, isGatewayAlive() (+32 more)

### Community 20 - "auth.controller.ts"
Cohesion: 0.06
Nodes (43): BootstrapStatusUseCase, Inject, Injectable, AuthController, ApiCookieAuth, ApiTags, Body, Controller (+35 more)

### Community 21 - "AppMetricsService"
Cohesion: 0.09
Nodes (8): HttpMetricsMiddleware, Injectable, Inject, Optional, AppMetricsService, Inject, Injectable, HttpMethod

### Community 22 - "register-form.tsx"
Cohesion: 0.10
Nodes (27): AcceptInvitePage(), metadata, tokenFromSearchParam(), ACCEPT_INVITE_DEMO_HINT, ACCEPT_INVITE_UNAUTHORIZED_HINT, AcceptInviteFormError, toAcceptInviteFormError(), acceptInvite() (+19 more)

### Community 23 - "GuestQuotaPort"
Cohesion: 0.10
Nodes (16): isGuestTaskType(), GUEST_QUOTA, GuestQuotaAdmitResult, GuestQuotaPort, GuestQuotaModule, Module, createRedis(), IoredisGuestQuotaAdapter (+8 more)

### Community 24 - "RedisVectorStoreAdapter"
Cohesion: 0.23
Nodes (7): RedisVectorStoreAdapter, Injectable, isRedisSearchIndexAlreadyExistsError(), isRedisSearchMissingIndexError(), isRedisSearchModuleMissingError(), redisSearchErrorMessage(), VectorStoreKnnInput

### Community 25 - "SemanticCacheService"
Cohesion: 0.14
Nodes (14): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Inject, Injectable, isSingleTurnUserRequest(), lastUserMessageText() (+6 more)

### Community 26 - "LoggingService"
Cohesion: 0.05
Nodes (36): OllamaEmbeddingAdapter, Injectable, EmbeddingBackend, Inject, ChatProviderCooldownService, Injectable, StreamCacheReplayService, Injectable (+28 more)

### Community 27 - "start-run-form.tsx"
Cohesion: 0.10
Nodes (34): logoutSession(), GuestLimitModal(), GuestLimitModalProps, GUEST_ALLOWED_TASK_TYPES, GUEST_CONTACTS, GUEST_QUOTA_CODES, GuestAllowedTaskType, GuestContact (+26 more)

### Community 28 - "openai-params-provider.mapper.ts"
Cohesion: 0.12
Nodes (24): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+16 more)

### Community 29 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 30 - "auth.module.ts"
Cohesion: 0.05
Nodes (54): AcceptInviteUseCase, Inject, Injectable, resendActivationSchema, InviteUserResult, inviteUserSchema, InviteUserUseCase, Inject (+46 more)

### Community 31 - "HealthService"
Cohesion: 0.11
Nodes (12): HealthLivenessResponseDto, ApiProperty, HealthReadinessResponseDto, ApiProperty, HealthController, ApiOkResponse, ApiOperation, ApiTags (+4 more)

### Community 32 - "swagger.setup.ts"
Cohesion: 0.09
Nodes (23): AppModule, Module, ChatOutputTextDto, ApiProperty, ChatUsageDto, ApiPropertyOptional, SseDeltaPayloadDto, ApiProperty (+15 more)

### Community 33 - "response-cache.service.ts"
Cohesion: 0.09
Nodes (20): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+12 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.13
Nodes (19): AnthropicMessagesRequestDto, AnthropicThinkingDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+11 more)

### Community 35 - "anthropic-messages.controller.ts"
Cohesion: 0.11
Nodes (31): ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString, SseDoneEvent, asMessageId() (+23 more)

### Community 36 - "runs.types.ts"
Cohesion: 0.05
Nodes (63): metadata, filterFeedbackRunOptions(), ArchiveRunsQuery, fetchRunSnapshot(), fetchUserRuns(), InitiatorOption, parseNullableIso(), parseReviewFields() (+55 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "feedback-form.tsx"
Cohesion: 0.21
Nodes (14): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody(), parseFeedbackCreated() (+6 more)

### Community 39 - "GatewayConfig"
Cohesion: 0.09
Nodes (15): PendingSecretsItem, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable, EnvPatchService, Injectable, ProviderManagerService, Injectable (+7 more)

### Community 40 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.10
Nodes (28): CostUsd, ToolCallId, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext() (+20 more)

### Community 41 - "prisma-run.adapter.ts"
Cohesion: 0.07
Nodes (20): LightRunItem, ListRunsQuery, ListRunsResult, RunSnapshot, RunLogEntry, RunRecordBase, ALLOWED_RUN_STATES, assertTransition() (+12 more)

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.11
Nodes (22): ApiOpenAiErrorResponses(), ANTHROPIC_INTEGRATION_PATH, OPENAI_INTEGRATION_PATH, OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam (+14 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (23): ACCOUNT_ACTIVATION_ID_RE, AccountActivationId, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createRunId() (+15 more)

### Community 44 - "openai-chat-completion-response.dto.ts"
Cohesion: 0.39
Nodes (8): OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty, ApiPropertyOptional

### Community 45 - "anthropic.module.ts"
Cohesion: 0.19
Nodes (10): ChatModule, Module, GatewayKeyGuard, Injectable, AnthropicModule, Module, OpenAiModule, Module (+2 more)

### Community 46 - "DomainException"
Cohesion: 0.09
Nodes (39): AcceptInviteResult, acceptInviteSchema, ActivateAccountOutput, comparePassword(), generateRefreshToken(), hashPassword(), hashRefreshToken(), parseTtlMs() (+31 more)

### Community 47 - "RunRepository"
Cohesion: 0.06
Nodes (10): Inject, GetRunLogsUseCase, Inject, Injectable, Inject, ListRunsUseCase, Inject, Injectable (+2 more)

### Community 48 - "runs.module.ts"
Cohesion: 0.08
Nodes (38): AutoFinalizeExpiredReviewsUseCase, Injectable, CancelRunUseCase, Inject, Injectable, GetRunLogsOutput, GetRunUseCase, Inject (+30 more)

### Community 49 - "isRecord"
Cohesion: 0.08
Nodes (38): geistMono, geistSans, metadata, ACTIVATION_FAILED_HINT, activateAccount(), bootstrapAdmin(), Credentials, fetchBootstrapStatus() (+30 more)

### Community 50 - "runs.controller.ts"
Cohesion: 0.08
Nodes (23): ListRunsUserItem, ListRunsUserOutput, ListRunsUserUseCase, Injectable, HitlDto, IsArray, IsString, ListRunsQueryDto (+15 more)

### Community 51 - "ModelAlias"
Cohesion: 0.07
Nodes (7): ProviderTestOptions, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, AppMetricsBackend, AppTokenUsage

### Community 52 - "types/index.ts"
Cohesion: 0.06
Nodes (52): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+44 more)

### Community 53 - ".info"
Cohesion: 0.10
Nodes (12): ConfigInitCommand, Command, Option, WizardState, ConfigGeneratorService, Injectable, FileManagerService, Injectable (+4 more)

### Community 54 - "PublicConfigController"
Cohesion: 0.22
Nodes (7): PublicConfigController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, Inject

### Community 55 - "users.controller.ts"
Cohesion: 0.08
Nodes (22): ListUsersUseCase, Inject, Injectable, ReactivateUserUseCase, Inject, Injectable, SoftDeleteUserUseCase, Injectable (+14 more)

### Community 56 - "llm-hop.ts"
Cohesion: 0.07
Nodes (52): ContentPipelineFacade, Inject, Injectable, Inject, coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput (+44 more)

### Community 57 - "domain/company-context.types.ts"
Cohesion: 0.16
Nodes (20): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CompanyContextWriteDetail (+12 more)

### Community 58 - "RefreshSessionRepository"
Cohesion: 0.05
Nodes (29): ActivateAccountUseCase, Inject, Injectable, BootstrapAdminUseCase, Inject, Injectable, LoginUseCase, Inject (+21 more)

### Community 59 - "health-readiness-response.dto.ts"
Cohesion: 0.33
Nodes (8): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty, ApiPropertyOptional

### Community 60 - "metrics.ts"
Cohesion: 0.07
Nodes (42): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+34 more)

### Community 61 - "app-metrics.service.ts"
Cohesion: 0.19
Nodes (11): EMBEDDING_BACKEND, VECTOR_STORE, HealthCheckResult, HealthRedisCheckResult, AppMetricsModule, Global, Module, APP_METRICS_BACKEND (+3 more)

### Community 62 - "MetricsController"
Cohesion: 0.18
Nodes (7): MetricsController, ApiOperation, ApiResponse, ApiTags, Controller, Get, Header

### Community 63 - "app-metrics-backend.interface.ts"
Cohesion: 0.15
Nodes (11): AppProviderCallContext, AppProviderStreamScope, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus, HttpRequestLabels (+3 more)

### Community 64 - "api/src/app.module.ts"
Cohesion: 0.07
Nodes (45): AuthModule, Module, CompanyContextModule, Module, toOutcome(), ContentRunExecutor, isCanonicalOutlineSelection(), isMissingContentKind() (+37 more)

### Community 65 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 67 - "asProviderInstanceId"
Cohesion: 0.10
Nodes (29): AgentReport, collectPendingSecrets(), ProviderTestCommand, Command, Option, DEFAULT_MODELS, convertProvider(), ProviderPromptResult (+21 more)

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (19): IsStringOrArrayOfStrings(), OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray (+11 more)

### Community 69 - "start-run.use-case.ts"
Cohesion: 0.11
Nodes (23): contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, socialBriefSchema (+15 more)

### Community 70 - "RedisConnectionService"
Cohesion: 0.27
Nodes (3): RedisConnectionService, Injectable, isRedisRequiredFromConfig()

### Community 71 - "configuration-validation.service.ts"
Cohesion: 0.29
Nodes (6): assertEnabledProviderSecretsPresent(), configurationValidation, ConfigurationValidationService, validate(), ValidatedEnvironment, RawGatewayConfig

### Community 72 - "openai-chat-completions.controller.ts"
Cohesion: 0.11
Nodes (26): GATEWAY_CACHE_HEADER, fromGatewayToolCallDto(), OpenAiChatCompletionsController, ApiSecurity, ApiTags, Controller, OpenAiAuth(), OPENAI_STREAM_API_DESCRIPTION (+18 more)

### Community 73 - "prisma-guest-purge.adapter.ts"
Cohesion: 0.16
Nodes (8): GUEST_PURGE, GuestPurgeDeleteStats, GuestPurgePort, LIVE_RUN_STATUSES, GuestPurgeModule, Module, PrismaGuestPurgeAdapter, Injectable

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

### Community 78 - "finalize-review.use-case.ts"
Cohesion: 0.11
Nodes (16): FinalizeReviewUseCase, Inject, Injectable, RateRunUseCase, Inject, Injectable, assertSameIds(), SaveOutputEditedUseCase (+8 more)

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.06
Nodes (39): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), GatewayChatResponse (+31 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - "resolve-provider-call-options.ts"
Cohesion: 0.39
Nodes (6): clamp(), isOverrideKey(), resolveProviderCallOptions(), OVERRIDE_KEYS, OverrideKey, GatewayParamsConfig

### Community 82 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "google-tools.mapper.ts"
Cohesion: 0.17
Nodes (21): buildGenerationConfig(), createGoogleProvider(), getFinalToolCalls(), getStopReason(), textStream(), mapStopSequences(), mapThinkingBudgetToGeminiLevel(), extractFromLegacyFields() (+13 more)

### Community 85 - "redis-vector-store.adapter.ts"
Cohesion: 0.32
Nodes (9): isUnservableCachedReply(), parseCachedChatResponse(), escapeRedisSearchTag(), asString(), ParsedKnnHits, parseKnnHits(), VectorSearchHit, VectorStoreProbeResult (+1 more)

### Community 86 - "model-manager.service.ts"
Cohesion: 0.11
Nodes (30): assertInteractiveAllowed(), DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, convertModel(), defaultModelPolicy(), ModelEditField (+22 more)

### Community 87 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 88 - "agent-answers.schema.ts"
Cohesion: 0.11
Nodes (21): ClientAddAnswers, ClientAddAnswersSchema, ClientEditAnswers, ClientEditAnswersSchema, ClientRemoveAnswers, ClientRemoveAnswersSchema, InitAnswersSchema, ModelAddAnswers (+13 more)

### Community 89 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 90 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 91 - "content.types.ts"
Cohesion: 0.07
Nodes (20): ContentPipelineInput, ContentPipelineOutcome, ContentPipelineState, ContentRefineSnapshot, PageDocument, PageOutline, PageOutlineSection, PageOutlineSectionRole (+12 more)

### Community 92 - "configuration.types.ts"
Cohesion: 0.04
Nodes (62): ApiHeader, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags, Body (+54 more)

### Community 93 - "getAppConfig"
Cohesion: 0.21
Nodes (9): getAppConfig(), enrichRequestWithClientId(), AnthropicApiKeyGuard, readAnthropicApiKey(), Injectable, OpenAiBearerAuthGuard, readAuthorizationHeader(), readBearerToken() (+1 more)

### Community 94 - "PrismaService"
Cohesion: 0.05
Nodes (38): CreateFeedbackUseCase, Inject, Injectable, agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_PURGE, FeedbackPurgePort (+30 more)

### Community 95 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 96 - "branded.types.ts"
Cohesion: 0.08
Nodes (49): EMBED_NOT_ATTEMPTED, SemanticLookupResult, VectorStorePartition, VectorStoreUpsertInput, CachedChatResponse, CachedChatWarning, CachedFinishReason, CacheIdentityMessage (+41 more)

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 98 - "AnthropicContentBlockDto"
Cohesion: 0.14
Nodes (14): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+6 more)

### Community 99 - "HttpExceptionFilter"
Cohesion: 0.20
Nodes (6): ErrorEnvelope, HttpExceptionFilter, Catch, newRequestId(), RequestIdMiddleware, Injectable

### Community 100 - "CompanyContextController"
Cohesion: 0.22
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 101 - "save-output-edited.use-case.ts"
Cohesion: 0.09
Nodes (33): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+25 more)

### Community 102 - "GlobalExceptionFilter"
Cohesion: 0.32
Nodes (4): GlobalExceptionFilter, isPayloadTooLargeError(), Catch, Injectable

### Community 103 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 104 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 105 - "observability.module.ts"
Cohesion: 0.29
Nodes (6): AiMetricsModule, Global, Module, ObservabilityModule, Global, Module

### Community 106 - "AuthUserContext"
Cohesion: 0.12
Nodes (21): Body, HttpCode, Post, orderItemsBySelectedIds(), RunsController, ApiCookieAuth, ApiTags, Body (+13 more)

### Community 107 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 108 - "UserRepository"
Cohesion: 0.07
Nodes (18): Inject, AccountActivationRecord, AccountActivationRepository, CreatePendingUser, RotateActivationTokenInput, AuthUser, CreateAdminIfNoneData, CreateAdminIfNoneResult (+10 more)

### Community 110 - "chat.service.ts"
Cohesion: 0.06
Nodes (60): SemanticStoreEmbedState, ChatCacheSource, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize (+52 more)

### Community 112 - "ConfigSecretsStatusCommand"
Cohesion: 0.40
Nodes (3): ConfigSecretsStatusCommand, Command, Option

### Community 113 - "OpenAiChatMessageDto"
Cohesion: 0.16
Nodes (12): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+4 more)

### Community 114 - "cn"
Cohesion: 0.05
Nodes (54): resendActivation(), RegistrationThankYou(), onResend(), RegistrationThankYouProps, DemoChip(), useDemoMode(), AppHeader(), AppHeaderProps (+46 more)

### Community 115 - "guest.guard.ts"
Cohesion: 0.24
Nodes (5): ALLOW_GUEST_KEY, IS_PUBLIC_KEY, GuestGuard, Inject, Injectable

### Community 116 - "api/src/main.ts"
Cohesion: 0.33
Nodes (6): AppModule, Module, bootstrap(), parseCorsOrigins(), configureHttpApp(), buildSwaggerConfig()

### Community 117 - "CompanyContextRepository"
Cohesion: 0.17
Nodes (14): GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PatchCompanyContextUseCase, Inject (+6 more)

### Community 118 - "prisma-invitation.adapter.ts"
Cohesion: 0.16
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 119 - "patch-company-context.use-case.ts"
Cohesion: 0.47
Nodes (5): toPublicCompanyContext(), assertCompanyContextWritable(), PartialCompanyContext, isComplete(), mergeCompanyContext()

### Community 120 - "should-include-redis-stack.ts"
Cohesion: 0.35
Nodes (10): getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis() (+2 more)

### Community 121 - "CompanyContext"
Cohesion: 0.39
Nodes (3): CompanyContext, PrismaCompanyContextAdapter, Injectable

### Community 122 - "ClientRemoveCommand"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 125 - "brand"
Cohesion: 0.17
Nodes (10): brand, unbrand, createAccountActivationId(), createInvitationId(), createRequestId(), createUserId(), isAccountActivationId(), isInvitationId() (+2 more)

### Community 126 - "configuration.ts"
Cohesion: 0.08
Nodes (37): ConfigValidateCommand, Command, Option, CliGatewayValidatorService, CliValidateOptions, Injectable, asPort(), asSemanticCacheTtlSeconds() (+29 more)

### Community 127 - "event-source-registry-provider.tsx"
Cohesion: 0.43
Nodes (5): EventSourceRegistryContext, EventSourceRegistryProvider(), createEventSourceRegistry(), EventSourceRegistry, RegistryEntry

### Community 128 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.14
Nodes (14): HealthModule, Module, IntegrationsModule, Module, LoggingModule, Global, Module, ProviderInstancesBootstrap (+6 more)

### Community 129 - "anthropic-models.controller.ts"
Cohesion: 0.10
Nodes (25): ApiAnthropicErrorResponses(), AnthropicMessagesController, ApiSecurity, ApiTags, Controller, AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse (+17 more)

### Community 130 - "rate-limit.module.ts"
Cohesion: 0.33
Nodes (4): RATE_LIMIT_MODULE_OPTIONS, RateLimitModule, RateLimitModuleOptions, Module

### Community 131 - "models.controller.ts"
Cohesion: 0.10
Nodes (22): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+14 more)

### Community 132 - "ModelListCommand"
Cohesion: 0.40
Nodes (3): ModelListCommand, Command, Option

### Community 144 - "ProviderListCommand"
Cohesion: 0.40
Nodes (3): ProviderListCommand, Command, Option

## Knowledge Gaps
- **426 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+421 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1205 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ModelAlias` connect `ModelAlias` to `branded.types.ts`, `cli-apply.types.ts`, `models.controller.ts`, `sentry-ai-metrics.adapter.ts`, `cli.module.ts`, `chat.service.ts`, `PrometheusAppMetricsAdapter`, `types/index.ts`, `AppMetricsService`, `model-manager.service.ts`, `LoggingService`, `metrics.ts`, `app-metrics.service.ts`, `app-metrics-backend.interface.ts`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `ModelAlias` to `cli-apply.types.ts`, `models.controller.ts`, `LogContext`, `exitWithAgentReport`, `cli.module.ts`, `PrometheusAppMetricsAdapter`, `AppMetricsService`, `LoggingService`, `GatewayConfig`, `sentry-ai-metrics.adapter.ts`, `types/index.ts`, `metrics.ts`, `app-metrics.service.ts`, `app-metrics-backend.interface.ts`, `asProviderInstanceId`, `model-manager.service.ts`, `configuration.types.ts`, `branded.types.ts`, `chat.service.ts`, `configuration.ts`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Why does `DomainException` connect `DomainException` to `InvitationsController`, `GuestQuotaPort`, `auth.module.ts`, `prisma-run.adapter.ts`, `runs.module.ts`, `runs.controller.ts`, `users.controller.ts`, `llm-hop.ts`, `domain/company-context.types.ts`, `RefreshSessionRepository`, `api/src/app.module.ts`, `start-run.use-case.ts`, `finalize-review.use-case.ts`, `llm-gateway.http.adapter.ts`, `PrismaService`, `HttpExceptionFilter`, `save-output-edited.use-case.ts`, `AuthUserContext`, `UserRepository`, `prisma-invitation.adapter.ts`, `patch-company-context.use-case.ts`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _426 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `runs-result.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.053821800090456805 - nodes in this community are weakly interconnected._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05903866248693835 - nodes in this community are weakly interconnected._