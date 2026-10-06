# Graph Report - content-chain  (2026-10-06)

## Corpus Check
- 675 files · ~216,114 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .css 1)

## Summary
- 4376 nodes · 13490 edges · 143 communities (126 shown, 16 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 405 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d02398a8`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- api/src/app.module.ts
- get-run.use-case.ts
- api/company-context.types.ts
- ai-provider-gateway/src/app.module.ts
- branded.types.ts
- run-details-view.tsx
- provider-error.mapper.ts
- logging.service.ts
- anthropic/anthropic-tools.mapper.ts
- cli.module.ts
- InMemoryRunSseHub
- GatewayKey
- social.graph.ts
- ai-provider.interface.ts
- run-result-editor.tsx
- chat-params.dto.ts
- semantic-cache.constants.ts
- RedisVectorStoreAdapter
- GatewayConfig
- users-view.tsx
- AuthController
- .error
- redis-vector-store.adapter.ts
- KeyGenerateCommand
- google-tools.mapper.ts
- start-run-form.tsx
- types/index.ts
- http-metrics.interceptor.ts
- PrometheusAppMetricsAdapter
- ModelAddCommand
- users.controller.ts
- ai-provider-gateway/src/health/health.service.ts
- swagger.setup.ts
- provider-registry.service.ts
- AnthropicMessagesRequestDto
- app-metrics.module.ts
- runs.types.ts
- enums.ts
- feedback-form.tsx
- DomainException
- sentry-ai-metrics.adapter.ts
- prisma-run.adapter.ts
- openai-models.controller.ts
- ids.ts
- openai-chat-completions.controller.ts
- LoggingService
- agent-answers.schema.ts
- anthropic-models.controller.ts
- RefreshSessionRepository
- filters/http-exception.filter.ts
- ListRunsQueryDto
- ModelAlias
- CompanyContext
- .info
- apiFetch
- ActiveStreamsTracker
- llm-hop.ts
- health.api.ts
- metrics.ts
- semantic-cache.service.ts
- models.controller.ts
- company-context.dto.ts
- responses.adapter.ts
- response-cache.service.ts
- auth.module.ts
- app-metrics.service.ts
- NoopAppMetricsAdapter
- asProviderInstanceId
- OpenAiChatCompletionRequestDto
- HttpExceptionFilter
- company-context.mapper.ts
- PrismaService
- InvitationsController
- provider-instances.bootstrap.ts
- chat-completions.adapter.ts
- parse-verifier-log-message.ts
- .create
- api/src/health/health.service.ts
- CompanyContextRepository
- llm-gateway.http.adapter.ts
- PrometheusService
- patch-company-context.use-case.ts
- ClientEditCommand
- SPEC — README
- Env
- metrics.module.ts
- model-manager.service.ts
- .getOne
- should-include-redis-stack.ts
- ProviderRemoveCommand
- openai-params-provider.mapper.ts
- .getOne
- chat-stream.controller.ts
- .getOne
- GatewayModelsCatalogService
- StartRunDto
- resolve-provider-call-options.ts
- route.ts
- envelope.ts
- ModelEditCommand
- ClientRemoveCommand
- save-output-edited.use-case.ts
- openai-messages-provider.mapper.ts
- ProviderAddCommand
- ProviderEditCommand
- CompanyContextController
- auth.controller.ts
- ClientAddCommand
- UserRepository
- anthropic-messages.controller.ts
- chat.service.ts
- domain/feedback.types.ts
- ModelRemoveCommand
- ai-provider-gateway/src/main.ts
- cn
- EnvironmentVariables
- OllamaEmbeddingAdapter
- domain/company-context.types.ts
- prisma-invitation.adapter.ts
- HealthController
- create-feedback.use-case.ts
- ConfigInitCommand
- start-run.use-case.ts
- HttpMetricsMiddleware
- Architektura
- brand
- GatewayCommand
- api/src/main.ts
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
3. `DomainException` - 78 edges
4. `LoggingService` - 73 edges
5. `asProviderInstanceId()` - 67 edges
6. `GatewayConfig` - 65 edges
7. `isRecord()` - 62 edges
8. `cn()` - 62 edges
9. `GatewayKey` - 59 edges
10. `ClientId` - 54 edges

## Surprising Connections (you probably didn't know these)
- `mapChatResponseToOpenAi()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/openai/mappers/openai-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `optionalEnvRefSchema` --calls--> `asEnvRef()`  [EXTRACTED]
  apps/ai-provider-gateway/src/config/gateway-config.schema.ts → apps/ai-provider-gateway/src/common/types/branded.types.ts
- `DialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/dialog.tsx → apps/frontend/src/shared/utils/utils.ts
- `RedisCacheAdapter` --implements--> `CacheBackend`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/cache/interfaces/cache-backend-interface.ts
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (143 total, 16 thin omitted)

### Community 0 - "api/src/app.module.ts"
Cohesion: 0.03
Nodes (86): CompanyContextModule, Module, ContentModule, Module, AutoFinalizeExpiredReviewsUseCase, Inject, Injectable, CancelRunUseCase (+78 more)

### Community 1 - "get-run.use-case.ts"
Cohesion: 0.05
Nodes (39): CompositeRunResultReader, GetRunOutput, RunResultReader, ContentBrief, isSocialRunRecord(), SocialBrief, SocialRunRecord, EmptyRunResultReader (+31 more)

### Community 2 - "api/company-context.types.ts"
Cohesion: 0.06
Nodes (59): metadata, fetchCompanyContext(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras, companyContextForPut() (+51 more)

### Community 3 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.08
Nodes (25): ChatModule, Module, RequestIdMiddleware, Injectable, HealthModule, Module, AnthropicModule, Module (+17 more)

### Community 4 - "branded.types.ts"
Cohesion: 0.06
Nodes (56): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, assertInteractiveAllowed(), WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep (+48 more)

### Community 5 - "run-details-view.tsx"
Cohesion: 0.06
Nodes (56): metadata, metadata, useSession(), CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS (+48 more)

### Community 6 - "provider-error.mapper.ts"
Cohesion: 0.20
Nodes (20): MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isProviderRateLimitError(), isRateLimitStatus(), isServerError(), isTimeoutStatus() (+12 more)

### Community 7 - "logging.service.ts"
Cohesion: 0.06
Nodes (25): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+17 more)

### Community 8 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.11
Nodes (36): asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent(), isAnthropicEffortLevel(), mapThinkingBudgetToAnthropicEffort(), mapThinkingToAnthropic() (+28 more)

### Community 9 - "cli.module.ts"
Cohesion: 0.08
Nodes (45): AgentReport, AgentReportStatus, emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), loadAnswers(), assertAgentHasAnswers(), CliMode (+37 more)

### Community 10 - "InMemoryRunSseHub"
Cohesion: 0.29
Nodes (4): RunSseEvent, InMemoryRunSseHub, Inject, Injectable

### Community 11 - "GatewayKey"
Cohesion: 0.08
Nodes (20): resolveClientIdFromKey(), asRequestId(), GatewayKey, ResolvedGatewayClient, getAppConfig(), GatewayKeyGuard, Injectable, enrichRequestWithClientId() (+12 more)

### Community 12 - "social.graph.ts"
Cohesion: 0.13
Nodes (34): loadPromptFromDir(), renderPrompt(), coercePassNoteVerdict(), isPassOnlyIssue(), ideasOutputSchema, reelIdeasOutputSchema, isReelTaskType(), ReelTaskType (+26 more)

### Community 13 - "ai-provider.interface.ts"
Cohesion: 0.09
Nodes (46): ChatResponseData, ChatWarningDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString, buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS (+38 more)

### Community 14 - "run-result-editor.tsx"
Cohesion: 0.04
Nodes (62): buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload() (+54 more)

### Community 15 - "chat-params.dto.ts"
Cohesion: 0.24
Nodes (7): ResponseFormatDto, ApiProperty, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsThinkingBudget()

### Community 16 - "semantic-cache.constants.ts"
Cohesion: 0.13
Nodes (12): EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema(), EMBEDDING_CIRCUIT_COOLDOWN_MS, EMBEDDING_CIRCUIT_OPEN_AFTER, EMBEDDING_PROBE_TIMEOUT_MS (+4 more)

### Community 17 - "RedisVectorStoreAdapter"
Cohesion: 0.15
Nodes (11): RedisCacheAdapter, Injectable, RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), isRedisSearchIndexAlreadyExistsError(), isRedisSearchMissingIndexError(), isRedisSearchModuleMissingError() (+3 more)

### Community 18 - "GatewayConfig"
Cohesion: 0.06
Nodes (22): PendingSecretsItem, ClientManagerService, Injectable, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable, EnvPatchService, EnvPatchValue (+14 more)

### Community 19 - "users-view.tsx"
Cohesion: 0.14
Nodes (22): metadata, createInvitation(), fetchInvitations(), resendInvitation(), revokeInvitation(), InvitationListItem, InviteCreated, isInvitationExpired() (+14 more)

### Community 20 - "AuthController"
Cohesion: 0.08
Nodes (30): AuthController, ApiTags, Body, Controller, Get, HttpCode, Post, Req (+22 more)

### Community 21 - ".error"
Cohesion: 0.19
Nodes (6): ProviderTestCommand, Command, Option, ProviderTestService, Injectable, ProviderApiKey

### Community 22 - "redis-vector-store.adapter.ts"
Cohesion: 0.15
Nodes (16): isUnservableCachedReply(), CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, parseCachedChatResponse(), asString(), ParsedKnnHits, parseKnnHits() (+8 more)

### Community 23 - "KeyGenerateCommand"
Cohesion: 0.33
Nodes (3): KeyGenerateCommand, Command, Option

### Community 24 - "google-tools.mapper.ts"
Cohesion: 0.14
Nodes (28): mapProviderResponseToAiObservation(), toCachedChatResponse(), asInputTokens(), asOutputTokens(), getUsageMetadata(), buildGenerationConfig(), createGoogleProvider(), getFinalToolCalls() (+20 more)

### Community 25 - "start-run-form.tsx"
Cohesion: 0.09
Nodes (39): metadata, assertNever(), notifyProduct(), notifyRunCancelled(), notifyRunTerminal(), EnvelopeRef, ProductToast, RunTerminalInput (+31 more)

### Community 26 - "types/index.ts"
Cohesion: 0.11
Nodes (35): CliRateLimit, AddClientInput, EditClientInput, CONVERSATION_ID_PATTERN, createConversationId(), createRequestId(), isAttemptNumber(), isBaseUrl() (+27 more)

### Community 27 - "http-metrics.interceptor.ts"
Cohesion: 0.21
Nodes (10): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, gatewayErrorsTotal, httpRequestDurationSeconds, httpRequestsTotal (+2 more)

### Community 28 - "PrometheusAppMetricsAdapter"
Cohesion: 0.12
Nodes (4): PrometheusAppMetricsAdapter, Injectable, AppProviderCallContext, AppTokenUsage

### Community 29 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 30 - "users.controller.ts"
Cohesion: 0.07
Nodes (26): ListUsersUseCase, Inject, Injectable, ReactivateUserUseCase, Inject, Injectable, SoftDeleteUserUseCase, Injectable (+18 more)

### Community 31 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.10
Nodes (16): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthLivenessResponseDto, ApiProperty, HealthReadinessChecksDto, HealthReadinessResponseDto, ApiProperty (+8 more)

### Community 32 - "swagger.setup.ts"
Cohesion: 0.07
Nodes (35): ChatCacheSource, GATEWAY_CACHE_HEADER, ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional (+27 more)

### Community 33 - "provider-registry.service.ts"
Cohesion: 0.09
Nodes (31): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+23 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "app-metrics.module.ts"
Cohesion: 0.10
Nodes (15): AppMetricsModule, resolveAppMetricsBackend(), Global, Module, APP_METRICS_BACKEND, MetricsController, ApiOperation, ApiResponse (+7 more)

### Community 36 - "runs.types.ts"
Cohesion: 0.07
Nodes (66): ArchiveRunsQuery, isUserRating(), patchRunRating(), HitlAccepted, isPageOutlineSectionRole(), isReelDuration(), PageOutlineSection, parseArray() (+58 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "feedback-form.tsx"
Cohesion: 0.19
Nodes (16): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, filterFeedbackRunOptions(), CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody() (+8 more)

### Community 39 - "DomainException"
Cohesion: 0.07
Nodes (51): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Injectable, ActivateAccountOutput, ActivateAccountUseCase, Injectable, comparePassword() (+43 more)

### Community 40 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.08
Nodes (34): CostUsd, ToolCallId, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext() (+26 more)

### Community 41 - "prisma-run.adapter.ts"
Cohesion: 0.07
Nodes (19): LightRunItem, ListRunsResult, RunSnapshot, RunLogEntry, RunRecordBase, ALLOWED_RUN_STATES, assertTransition(), CANCELABLE_RUN_STATUSES (+11 more)

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.27
Nodes (10): ApiOpenAiErrorResponses(), OpenAiErrorBodyDto, OpenAiErrorResponseDto, ApiProperty, ApiPropertyOptional, OpenAiModelDto, OpenAiModelsListResponseDto, ApiProperty (+2 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (23): ACCOUNT_ACTIVATION_ID_RE, AccountActivationId, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createRunId() (+15 more)

### Community 44 - "openai-chat-completions.controller.ts"
Cohesion: 0.11
Nodes (28): ANTHROPIC_INTEGRATION_PATH, OPENAI_INTEGRATION_PATH, OpenAiChatCompletionsController, ApiSecurity, ApiTags, Controller, OpenAiAuth(), OpenAiChatCompletionChoiceDto (+20 more)

### Community 45 - "LoggingService"
Cohesion: 0.06
Nodes (26): RedisConnectionService, Injectable, Inject, Inject, isRedisRequiredFromConfig(), ChatErrorHandlerService, Injectable, ChatProviderCallService (+18 more)

### Community 46 - "agent-answers.schema.ts"
Cohesion: 0.11
Nodes (21): ClientAddAnswers, ClientAddAnswersSchema, ClientEditAnswers, ClientEditAnswersSchema, ClientRemoveAnswers, ClientRemoveAnswersSchema, InitAnswersSchema, ModelAddAnswers (+13 more)

### Community 47 - "anthropic-models.controller.ts"
Cohesion: 0.28
Nodes (10): ApiAnthropicErrorResponses(), AnthropicErrorBodyDto, AnthropicErrorResponseDto, ApiProperty, AnthropicModelDto, AnthropicModelsListResponseDto, ApiProperty, mapGatewayModelsListToAnthropic() (+2 more)

### Community 48 - "RefreshSessionRepository"
Cohesion: 0.08
Nodes (12): Inject, Inject, LogoutUseCase, Inject, Injectable, Inject, Inject, RefreshSessionRecord (+4 more)

### Community 49 - "filters/http-exception.filter.ts"
Cohesion: 0.21
Nodes (7): DEFAULT_HTTP_STATUS_TO_CODE, GlobalExceptionFilter, isPayloadTooLargeError(), PayloadTooLargeError, RequestWithId, Catch, Injectable

### Community 50 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+2 more)

### Community 51 - "ModelAlias"
Cohesion: 0.08
Nodes (7): ProviderTestOptions, ModelAlias, ProviderInstanceId, AppMetricsService, Inject, Injectable, AppMetricsBackend

### Community 52 - "CompanyContext"
Cohesion: 0.23
Nodes (6): CompanyContext, emptyCompanyContext(), jsonArray(), jsonRecord(), PrismaCompanyContextAdapter, Injectable

### Community 53 - ".info"
Cohesion: 0.09
Nodes (19): CliGatewayValidatorService, Injectable, WizardState, ConfigGeneratorService, Injectable, FileManagerService, Injectable, Injectable (+11 more)

### Community 54 - "apiFetch"
Cohesion: 0.08
Nodes (44): geistMono, geistSans, metadata, acceptInvite(), activateAccount(), bootstrapAdmin(), Credentials, fetchBootstrapStatus() (+36 more)

### Community 56 - "llm-hop.ts"
Cohesion: 0.05
Nodes (74): ContentPipelineFacade, toOutcome(), Inject, Injectable, ContentRunExecutor, isCanonicalOutlineSelection(), isMissingContentKind(), Inject (+66 more)

### Community 57 - "health.api.ts"
Cohesion: 0.27
Nodes (11): fetchGatewayAlive(), fetchHealthReady(), HealthCheck, HealthCheckStatus, HealthReadyAggregate, HealthReadyResponse, isGatewayAlive(), isRecord() (+3 more)

### Community 58 - "metrics.ts"
Cohesion: 0.08
Nodes (40): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+32 more)

### Community 59 - "semantic-cache.service.ts"
Cohesion: 0.12
Nodes (19): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, isSingleTurnUserRequest(), lastUserMessageText(), embeddingProbeTimeoutMs() (+11 more)

### Community 60 - "models.controller.ts"
Cohesion: 0.23
Nodes (10): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, GatewayModelCapabilitiesDto, GatewayModelDto, ApiProperty, ApiPropertyOptional (+2 more)

### Community 61 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 62 - "responses.adapter.ts"
Cohesion: 0.23
Nodes (16): toHttpException(), buildResponsesCreateParams(), createResponsesAdapter(), textStream(), mapGatewayMetadataToOpenAi(), extractResponsesToolCalls(), mapResponsesStopReason(), parseOpenAiResponse() (+8 more)

### Community 63 - "response-cache.service.ts"
Cohesion: 0.12
Nodes (15): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheModule, Module, CacheModule, CacheModuleOptions (+7 more)

### Community 64 - "auth.module.ts"
Cohesion: 0.06
Nodes (41): Inject, resendActivationSchema, InviteUserResult, inviteUserSchema, InviteUserUseCase, Inject, Injectable, InvitationListItem (+33 more)

### Community 65 - "app-metrics.service.ts"
Cohesion: 0.21
Nodes (12): healthStatusToGaugeValue(), AppProviderStreamScope, AppRequestLabels, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus, HttpMethod (+4 more)

### Community 67 - "asProviderInstanceId"
Cohesion: 0.06
Nodes (69): collectPendingSecrets(), DEFAULT_MODELS, convertProvider(), CliValidateOptions, CliAiProvider, ProviderPromptResult, ProviderCli, AddProviderInput (+61 more)

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (18): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+10 more)

### Community 69 - "HttpExceptionFilter"
Cohesion: 0.31
Nodes (3): ErrorEnvelope, HttpExceptionFilter, Catch

### Community 70 - "company-context.mapper.ts"
Cohesion: 0.16
Nodes (11): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+3 more)

### Community 71 - "PrismaService"
Cohesion: 0.16
Nodes (6): FeedbackEntry, FeedbackRepository, PrismaFeedbackAdapter, Injectable, PrismaService, Injectable

### Community 72 - "InvitationsController"
Cohesion: 0.16
Nodes (10): InvitationsController, ApiCookieAuth, ApiTags, Body, Controller, Delete, Get, HttpCode (+2 more)

### Community 73 - "provider-instances.bootstrap.ts"
Cohesion: 0.17
Nodes (13): GatewayProviderInstanceConfig, assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryFn (+5 more)

### Community 74 - "chat-completions.adapter.ts"
Cohesion: 0.21
Nodes (18): asSystemFingerprint(), ChatCompletionsAdapterOptions, createChatCompletionsAdapter(), textStream(), mapTurnsToOpenAiMessages(), accumulateOpenAiStreamToolCallDeltas(), extractOpenAiStreamDeltaText(), finalizeOpenAiStreamToolCalls() (+10 more)

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - ".create"
Cohesion: 0.15
Nodes (10): CreateFeedbackUseCase, Inject, Injectable, FeedbackController, ApiCookieAuth, ApiTags, Body, Controller (+2 more)

### Community 77 - "api/src/health/health.service.ts"
Cohesion: 0.08
Nodes (28): GATEWAY_PROBE_TIMEOUT_MS, GatewayLivenessBody, GatewayLivenessProbe, GatewayLivenessProbeReason, GatewayLivenessProbeResult, isRecord(), parseGatewayLivenessBody(), probeFailureReason() (+20 more)

### Community 78 - "CompanyContextRepository"
Cohesion: 0.21
Nodes (11): GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PutCompanyContextUseCase, Inject (+3 more)

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.09
Nodes (25): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), LlmGatewayError (+17 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - "patch-company-context.use-case.ts"
Cohesion: 0.27
Nodes (8): toPublicCompanyContext(), PatchCompanyContextUseCase, Inject, Injectable, assertCompanyContextWritable(), PartialCompanyContext, isComplete(), mergeCompanyContext()

### Community 82 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "Env"
Cohesion: 0.05
Nodes (39): readCookie(), isRecord(), JwtCookieStrategy, Inject, Injectable, readSmtpConfig(), SmtpConfig, Inject (+31 more)

### Community 85 - "metrics.module.ts"
Cohesion: 0.19
Nodes (8): MetricsController, Controller, Get, Res, MetricsModule, Module, MetricsService, Injectable

### Community 86 - "model-manager.service.ts"
Cohesion: 0.11
Nodes (29): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, convertModel(), defaultModelPolicy(), ModelEditField, ModelManagerService (+21 more)

### Community 87 - ".getOne"
Cohesion: 0.19
Nodes (10): AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+2 more)

### Community 88 - "should-include-redis-stack.ts"
Cohesion: 0.18
Nodes (12): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement() (+4 more)

### Community 89 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 90 - "openai-params-provider.mapper.ts"
Cohesion: 0.24
Nodes (11): mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses(), mapStopSequences(), OpenAiSharedChatCompletionParams, OpenAiSharedResponsesParams (+3 more)

### Community 91 - ".getOne"
Cohesion: 0.19
Nodes (10): OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+2 more)

### Community 92 - "chat-stream.controller.ts"
Cohesion: 0.04
Nodes (53): ApiHeader, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags, Body (+45 more)

### Community 93 - ".getOne"
Cohesion: 0.19
Nodes (10): ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+2 more)

### Community 95 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 96 - "resolve-provider-call-options.ts"
Cohesion: 0.48
Nodes (5): clamp(), isOverrideKey(), resolveProviderCallOptions(), OVERRIDE_KEYS, OverrideKey

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 98 - "envelope.ts"
Cohesion: 0.06
Nodes (41): ACTIVATION_FAILED_HINT, GuestView, HomeEntry(), RegisterSuccess, RegisterFieldErrors, fetchCompleteness(), CompletenessState, CompletenessChip() (+33 more)

### Community 99 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 100 - "ClientRemoveCommand"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

### Community 101 - "save-output-edited.use-case.ts"
Cohesion: 0.07
Nodes (41): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+33 more)

### Community 102 - "openai-messages-provider.mapper.ts"
Cohesion: 0.27
Nodes (7): ProviderAssistantTurn, ProviderChatTurn, ProviderToolResultTurn, ChatCompletionMessageParam, mapAssistantTurn(), mapAssistantTurnToResponsesInput(), mapTurnsToResponsesInput()

### Community 103 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 104 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 105 - "CompanyContextController"
Cohesion: 0.22
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 106 - "auth.controller.ts"
Cohesion: 0.07
Nodes (33): MeUseCase, Injectable, ApiCookieAuth, Patch, JwtPayload, AcceptInviteDto, ApiProperty, IsString (+25 more)

### Community 107 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 108 - "UserRepository"
Cohesion: 0.05
Nodes (24): Inject, BootstrapStatusUseCase, Inject, Injectable, Inject, Inject, AccountActivationRecord, AccountActivationRepository (+16 more)

### Community 109 - "anthropic-messages.controller.ts"
Cohesion: 0.10
Nodes (31): SseDoneEvent, fromGatewayToolCallDto(), asMessageId(), MessageId, AnthropicMessagesController, ApiSecurity, ApiTags, Controller (+23 more)

### Community 110 - "chat.service.ts"
Cohesion: 0.07
Nodes (50): SemanticStoreEmbedState, CacheIdentityMessage, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize (+42 more)

### Community 111 - "domain/feedback.types.ts"
Cohesion: 0.18
Nodes (10): agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_BODY_MAX, CreateFeedbackDto, IsIn, IsOptional, IsString (+2 more)

### Community 112 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 113 - "ai-provider-gateway/src/main.ts"
Cohesion: 0.13
Nodes (15): AppModule, Module, bootstrap(), API_GLOBAL_PREFIX, PORT, setupApp(), exportOpenApi(), OPENAPI_OUTPUT_FILENAME (+7 more)

### Community 114 - "cn"
Cohesion: 0.05
Nodes (60): metadata, ACCEPT_INVITE_UNAUTHORIZED_HINT, AcceptInviteFormError, toAcceptInviteFormError(), AcceptInviteForm(), onSubmit(), AcceptInviteFormProps, LoginCardProps (+52 more)

### Community 115 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 116 - "OllamaEmbeddingAdapter"
Cohesion: 0.27
Nodes (3): OllamaEmbeddingAdapter, Injectable, EmbeddingBackend

### Community 117 - "domain/company-context.types.ts"
Cohesion: 0.18
Nodes (18): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CompanyContextWriteDetail (+10 more)

### Community 118 - "prisma-invitation.adapter.ts"
Cohesion: 0.17
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 119 - "HealthController"
Cohesion: 0.31
Nodes (6): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get

### Community 120 - "create-feedback.use-case.ts"
Cohesion: 0.17
Nodes (11): FEEDBACK_RUN_READER, FeedbackRunLookup, FeedbackRunReader, FEEDBACK_REPOSITORY, FeedbackModule, Module, PrismaFeedbackRunReaderAdapter, Injectable (+3 more)

### Community 121 - "ConfigInitCommand"
Cohesion: 0.31
Nodes (3): ConfigInitCommand, Command, Option

### Community 122 - "start-run.use-case.ts"
Cohesion: 0.09
Nodes (26): contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, socialBriefSchema (+18 more)

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 125 - "brand"
Cohesion: 0.17
Nodes (10): brand, unbrand, createAccountActivationId(), createInvitationId(), createRequestId(), createUserId(), isAccountActivationId(), isInvitationId() (+2 more)

### Community 128 - "api/src/main.ts"
Cohesion: 0.33
Nodes (6): AppModule, Module, bootstrap(), parseCorsOrigins(), configureHttpApp(), buildSwaggerConfig()

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
- **413 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+408 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1173 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ModelAlias` connect `ModelAlias` to `swagger.setup.ts`, `provider-registry.service.ts`, `app-metrics.service.ts`, `types/index.ts`, `branded.types.ts`, `asProviderInstanceId`, `NoopAppMetricsAdapter`, `sentry-ai-metrics.adapter.ts`, `ai-provider.interface.ts`, `chat.service.ts`, `.info`, `redis-vector-store.adapter.ts`, `model-manager.service.ts`, `metrics.ts`, `PrometheusAppMetricsAdapter`, `GatewayModelsCatalogService`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `ModelAlias` to `branded.types.ts`, `logging.service.ts`, `GatewayKey`, `ai-provider.interface.ts`, `GatewayConfig`, `.error`, `redis-vector-store.adapter.ts`, `types/index.ts`, `PrometheusAppMetricsAdapter`, `swagger.setup.ts`, `provider-registry.service.ts`, `sentry-ai-metrics.adapter.ts`, `LoggingService`, `.info`, `metrics.ts`, `app-metrics.service.ts`, `NoopAppMetricsAdapter`, `asProviderInstanceId`, `provider-instances.bootstrap.ts`, `model-manager.service.ts`, `GatewayModelsCatalogService`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Why does `LoggingService` connect `LoggingService` to `ai-provider-gateway/src/app.module.ts`, `provider-error.mapper.ts`, `logging.service.ts`, `anthropic/anthropic-tools.mapper.ts`, `GatewayKey`, `RedisVectorStoreAdapter`, `redis-vector-store.adapter.ts`, `google-tools.mapper.ts`, `ai-provider-gateway/src/health/health.service.ts`, `swagger.setup.ts`, `provider-registry.service.ts`, `filters/http-exception.filter.ts`, `semantic-cache.service.ts`, `responses.adapter.ts`, `response-cache.service.ts`, `provider-instances.bootstrap.ts`, `chat-completions.adapter.ts`, `chat.service.ts`, `ai-provider-gateway/src/main.ts`, `OllamaEmbeddingAdapter`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _413 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `api/src/app.module.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.02563579491364069 - nodes in this community are weakly interconnected._
- **Should `get-run.use-case.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04698703279938978 - nodes in this community are weakly interconnected._