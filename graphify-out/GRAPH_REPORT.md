# Graph Report - content-chain  (2026-10-07)

## Corpus Check
- 688 files · ~222,608 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .css 1)

## Summary
- 4448 nodes · 13738 edges · 139 communities (126 shown, 12 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 412 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `063e08b1`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- users.controller.ts
- social.types.ts
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
- http-metrics.interceptor.ts
- InvitationsController
- ChatParamsDto
- PrometheusAppMetricsAdapter
- semantic-cache.service.ts
- run-review-panel.tsx
- apiFetch
- AuthController
- AppMetricsService
- content.types.ts
- guest-quota.module.ts
- redis-vector-store.adapter.ts
- own-runs-provider.tsx
- provider-registry.service.ts
- button.tsx
- openai-thinking-provider.mapper.ts
- ModelAddCommand
- auth.module.ts
- HealthService
- ai-provider-gateway/src/main.ts
- response-cache.service.ts
- AnthropicMessagesRequestDto
- anthropic-response.mapper.ts
- runs.types.ts
- enums.ts
- feedback-form.tsx
- exitWithAgentReport
- sentry-ai-metrics.adapter.ts
- RunRecord
- openai-models.controller.ts
- ids.ts
- openai-stream.mapper.ts
- chat.module.ts
- DomainException
- anthropic-models.controller.ts
- RunRepository
- auth.api.ts
- ListRunsQueryDto
- ModelAlias
- branded.types.ts
- config-generator.service.ts
- PublicConfigController
- anthropic/anthropic-tools.mapper.ts
- llm-hop.ts
- domain/company-context.types.ts
- chat-completions.adapter.ts
- ai-provider-gateway/src/health/health.service.ts
- metrics.ts
- getAppConfig
- app-metrics.service.ts
- app-metrics-backend.interface.ts
- api/src/app.module.ts
- ChatToolingDto
- CompanyContext
- asProviderInstanceId
- OpenAiChatCompletionRequestDto
- .execute
- LoggingService
- RedisConnectionService
- openai-messages.mapper.ts
- patch-company-context.use-case.ts
- HttpExceptionFilter
- parse-verifier-log-message.ts
- company-context.mapper.ts
- api/src/health/health.service.ts
- .streamChat
- llm-gateway.http.adapter.ts
- PrometheusService
- .create
- ClientEditCommand
- SPEC — README
- OllamaEmbeddingAdapter
- responses.adapter.ts
- GatewayConfig
- company-context.dto.ts
- ChatMessageDto
- ProviderRemoveCommand
- openai-chat-completion-response.dto.ts
- prisma.feedback-run-reader.adapter.ts
- anthropic-messages.controller.ts
- GatewayKey
- create-feedback.use-case.ts
- StartRunDto
- ai-provider.interface.ts
- route.ts
- start-run-form.tsx
- GuestGuard
- CompanyContextController
- save-output-edited.use-case.ts
- filters/http-exception.filter.ts
- ProviderAddCommand
- ProviderEditCommand
- AppMetricsModule
- AuthUserContext
- ClientAddCommand
- UserRepository
- JwtAuthGuard
- chat.service.ts
- prisma.service.ts
- cn
- company-context.controller.ts
- prisma-invitation.adapter.ts
- PrismaService
- should-include-redis-stack.ts
- WizardState
- ClientRemoveCommand
- Architektura
- brand
- configuration.ts
- ai-provider-gateway/src/app.module.ts
- .getOne
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
- health.api.ts
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
- `LiveItemSubscription()` --calls--> `useRunEventSource()`  [EXTRACTED]
  apps/frontend/src/modules/runs/components/own-runs-provider.tsx → apps/frontend/src/modules/runs/components/use-run-event-source.ts
- `DialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/dialog.tsx → apps/frontend/src/shared/utils/utils.ts
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `RedisConnectionService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-connection.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (139 total, 12 thin omitted)

### Community 0 - "users.controller.ts"
Cohesion: 0.06
Nodes (32): ListUsersUseCase, Inject, Injectable, SoftDeleteUserUseCase, Inject, Injectable, PatchUserDto, ApiProperty (+24 more)

### Community 1 - "social.types.ts"
Cohesion: 0.06
Nodes (26): CompositeRunResultReader, GetRunOutput, RunResultReader, SocialBrief, EmptyRunResultReader, Injectable, toInputJson(), SocialResultStore (+18 more)

### Community 2 - "api/company-context.types.ts"
Cohesion: 0.06
Nodes (66): metadata, fetchCompanyContext(), fetchCompleteness(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras (+58 more)

### Community 3 - "EnvRef"
Cohesion: 0.32
Nodes (6): EnvPatchService, Injectable, ClientCli, EnvRef, MissingProviderApiKey, MissingProviderBaseUrl

### Community 4 - "asClientId"
Cohesion: 0.08
Nodes (38): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, KeyGenerateCommand, Command, Option, InitAnswers (+30 more)

### Community 5 - "run-details-view.tsx"
Cohesion: 0.09
Nodes (36): metadata, metadata, useSession(), useGuestLocked(), CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS (+28 more)

### Community 6 - "api-error.code.ts"
Cohesion: 0.16
Nodes (22): ApiErrorCode, ApiErrorPayload, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isProviderRateLimitError(), isRateLimitStatus() (+14 more)

### Community 7 - "logging.service.ts"
Cohesion: 0.07
Nodes (19): LEVEL_ORDER, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable, SentryErrorReportingAdapter, Injectable (+11 more)

### Community 8 - "google-tools.mapper.ts"
Cohesion: 0.15
Nodes (26): toCachedChatResponse(), asInputTokens(), asOutputTokens(), getUsageMetadata(), buildGenerationConfig(), createGoogleProvider(), getFinalToolCalls(), getStopReason() (+18 more)

### Community 9 - "cli.module.ts"
Cohesion: 0.06
Nodes (60): AgentReport, AgentReportStatus, PendingSecretsItem, loadAnswers(), assertAgentHasAnswers(), CliMode, CliModeFlags, markAgentRuntime() (+52 more)

### Community 10 - "InMemoryRunSseHub"
Cohesion: 0.27
Nodes (4): RunSseEvent, InMemoryRunSseHub, Inject, Injectable

### Community 11 - "swagger.setup.ts"
Cohesion: 0.09
Nodes (25): ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString (+17 more)

### Community 12 - "social.graph.ts"
Cohesion: 0.09
Nodes (48): CompanyContextRepository, Inject, CompileContentGraphOptions, RunLifecyclePort, isSocialRunRecord(), LlmHopService, Inject, Injectable (+40 more)

### Community 13 - "http-metrics.interceptor.ts"
Cohesion: 0.11
Nodes (18): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, MetricsController, Controller, Get (+10 more)

### Community 14 - "InvitationsController"
Cohesion: 0.12
Nodes (13): InviteUserDto, ApiProperty, IsEmail, InvitationsController, ApiCookieAuth, ApiTags, Body, Controller (+5 more)

### Community 15 - "ChatParamsDto"
Cohesion: 0.12
Nodes (17): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+9 more)

### Community 16 - "PrometheusAppMetricsAdapter"
Cohesion: 0.11
Nodes (6): PrometheusAppMetricsAdapter, Injectable, resolveAppMetricsBackend(), AppProviderCallContext, AppProviderStreamScope, AppTokenUsage

### Community 17 - "semantic-cache.service.ts"
Cohesion: 0.07
Nodes (31): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName() (+23 more)

### Community 18 - "run-review-panel.tsx"
Cohesion: 0.05
Nodes (52): buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload() (+44 more)

### Community 19 - "apiFetch"
Cohesion: 0.07
Nodes (42): metadata, ACCEPT_INVITE_UNAUTHORIZED_HINT, AcceptInviteFormError, RegisterFieldErrors, fetchAppConfig(), AppConfig, parseAppConfig(), DemoModeContext (+34 more)

### Community 20 - "AuthController"
Cohesion: 0.06
Nodes (39): AuthController, ApiCookieAuth, ApiTags, Body, Controller, Get, HttpCode, Patch (+31 more)

### Community 21 - "AppMetricsService"
Cohesion: 0.11
Nodes (5): HttpMetricsMiddleware, Injectable, AppMetricsService, Inject, Injectable

### Community 22 - "content.types.ts"
Cohesion: 0.15
Nodes (12): ContentResultStore, ContentPipelineInput, ContentPipelineState, ContentRefineSnapshot, PageDocument, PageOutline, PageOutlineSection, PageOutlineSectionRole (+4 more)

### Community 23 - "guest-quota.module.ts"
Cohesion: 0.10
Nodes (17): isGuestTaskType(), Inject, Inject, GuestQuotaAdmitResult, GuestQuotaPort, GuestQuotaModule, Module, createRedis() (+9 more)

### Community 24 - "redis-vector-store.adapter.ts"
Cohesion: 0.12
Nodes (21): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), asString(), ParsedKnnHits, parseKnnHits() (+13 more)

### Community 25 - "own-runs-provider.tsx"
Cohesion: 0.13
Nodes (20): assertNever(), notifyRunCancelled(), notifyRunTerminal(), EnvelopeRef, ProductToast, RunTerminalInput, RunTerminalOutcome, runTerminalToastId() (+12 more)

### Community 26 - "provider-registry.service.ts"
Cohesion: 0.15
Nodes (17): ProviderApiKey, ProviderInstanceRuntime, assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn (+9 more)

### Community 27 - "button.tsx"
Cohesion: 0.07
Nodes (52): AcceptInvitePage(), metadata, tokenFromSearchParam(), ACCEPT_INVITE_DEMO_HINT, toAcceptInviteFormError(), acceptInvite(), logoutSession(), registerAccount() (+44 more)

### Community 28 - "openai-thinking-provider.mapper.ts"
Cohesion: 0.23
Nodes (13): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), ChatCompletionThinkingParam, isOpenAiEffortLevel(), isOpenAiReasoningRequested(), mapThinkingBudgetToEffort(), mapThinkingToResponsesReasoning() (+5 more)

### Community 29 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 30 - "auth.module.ts"
Cohesion: 0.04
Nodes (73): AcceptInviteUseCase, Inject, Injectable, ActivateAccountUseCase, Injectable, BootstrapAdminUseCase, Inject, Injectable (+65 more)

### Community 31 - "HealthService"
Cohesion: 0.11
Nodes (11): HealthLivenessResponseDto, ApiProperty, HealthReadinessResponseDto, HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller (+3 more)

### Community 32 - "ai-provider-gateway/src/main.ts"
Cohesion: 0.13
Nodes (15): AppModule, Module, bootstrap(), API_GLOBAL_PREFIX, PORT, setupApp(), exportOpenApi(), OPENAPI_OUTPUT_FILENAME (+7 more)

### Community 33 - "response-cache.service.ts"
Cohesion: 0.10
Nodes (16): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, CacheModule, CacheModuleOptions (+8 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "anthropic-response.mapper.ts"
Cohesion: 0.15
Nodes (23): asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto, AnthropicTextContentBlockDto, AnthropicThinkingContentBlockDto (+15 more)

### Community 36 - "runs.types.ts"
Cohesion: 0.06
Nodes (76): ArchiveRunsQuery, fetchUserRuns(), InitiatorOption, isUserRating(), patchRunRating(), HitlAccepted, isPageOutlineSectionRole(), isReelDuration() (+68 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "feedback-form.tsx"
Cohesion: 0.09
Nodes (29): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, filterFeedbackRunOptions(), CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody() (+21 more)

### Community 39 - "exitWithAgentReport"
Cohesion: 0.11
Nodes (12): emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList(), ProviderTestCommand (+4 more)

### Community 40 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.11
Nodes (27): CostUsd, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes() (+19 more)

### Community 41 - "RunRecord"
Cohesion: 0.04
Nodes (34): InProcessRunWorker, Injectable, RunLifecycleService, Injectable, contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds (+26 more)

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.13
Nodes (21): ApiOpenAiErrorResponses(), OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+13 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (23): ACCOUNT_ACTIVATION_ID_RE, AccountActivationId, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createRunId() (+15 more)

### Community 44 - "openai-stream.mapper.ts"
Cohesion: 0.25
Nodes (14): SseDoneEvent, fromGatewayToolCallDto(), mapChatResponseToOpenAi(), mapFinishReasontoOpenAI(), mapGatewayToolCallsToOpenAi(), mapSystemFingerprintToOpenAi(), toOpenAiCompletionId(), baseChunkFields() (+6 more)

### Community 45 - "chat.module.ts"
Cohesion: 0.11
Nodes (12): ChatErrorHandlerService, Injectable, ChatProviderCallService, Injectable, ChatProviderCooldownService, Injectable, ChatValidationService, Injectable (+4 more)

### Community 46 - "DomainException"
Cohesion: 0.06
Nodes (45): AcceptInviteResult, acceptInviteSchema, ActivateAccountOutput, comparePassword(), generateRefreshToken(), hashPassword(), hashRefreshToken(), parseTtlMs() (+37 more)

### Community 47 - "anthropic-models.controller.ts"
Cohesion: 0.30
Nodes (9): AnthropicErrorBodyDto, AnthropicErrorResponseDto, ApiProperty, AnthropicModelDto, AnthropicModelsListResponseDto, ApiProperty, mapGatewayModelsListToAnthropic(), mapGatewayModelToAnthropic() (+1 more)

### Community 48 - "RunRepository"
Cohesion: 0.03
Nodes (74): PublicConfigResponse, AutoFinalizeExpiredReviewsUseCase, Inject, Injectable, CancelRunUseCase, Inject, Injectable, FinalizeReviewUseCase (+66 more)

### Community 49 - "auth.api.ts"
Cohesion: 0.06
Nodes (42): geistMono, geistSans, metadata, ACTIVATION_FAILED_HINT, activateAccount(), bootstrapAdmin(), Credentials, fetchBootstrapStatus() (+34 more)

### Community 50 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+2 more)

### Community 51 - "ModelAlias"
Cohesion: 0.07
Nodes (7): ProviderTestOptions, CliAiModel, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, AppMetricsBackend

### Community 52 - "branded.types.ts"
Cohesion: 0.08
Nodes (45): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+37 more)

### Community 53 - "config-generator.service.ts"
Cohesion: 0.16
Nodes (11): ConfigGeneratorService, Injectable, FileManagerService, Injectable, WizardRunResult, EnvTemplateInput, generateEnvTemplate(), isEnvInputRedisRequired() (+3 more)

### Community 54 - "PublicConfigController"
Cohesion: 0.22
Nodes (7): PublicConfigController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, Inject

### Community 55 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.09
Nodes (39): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent() (+31 more)

### Community 56 - "llm-hop.ts"
Cohesion: 0.09
Nodes (43): coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema, pageOutlineSectionSchema, readNonEmptyString() (+35 more)

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
Cohesion: 0.16
Nodes (19): getClientConversationId(), getOrCreateConversationIdForResponse(), buildAppProviderMetricsContext(), buildLlmMetricsContext(), mapProviderResponseToAiObservation(), mapProviderResponseToUsage(), toMetricsMessages(), buildProviderInputForAlias() (+11 more)

### Community 61 - "getAppConfig"
Cohesion: 0.19
Nodes (11): getAppConfig(), GatewayKeyGuard, Injectable, enrichRequestWithClientId(), AnthropicApiKeyGuard, readAnthropicApiKey(), Injectable, OpenAiBearerAuthGuard (+3 more)

### Community 62 - "app-metrics.service.ts"
Cohesion: 0.14
Nodes (11): APP_METRICS_BACKEND, MetricsController, ApiOperation, ApiResponse, ApiTags, Controller, Get, PreMetricsScrapeHook (+3 more)

### Community 63 - "app-metrics-backend.interface.ts"
Cohesion: 0.17
Nodes (12): healthStatusToGaugeValue(), AppRequestLabels, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus, HttpMethod (+4 more)

### Community 64 - "api/src/app.module.ts"
Cohesion: 0.05
Nodes (49): AppModule, Module, AuthModule, Module, CompanyContextModule, Module, ContentPipelineFacade, toOutcome() (+41 more)

### Community 65 - "ChatToolingDto"
Cohesion: 0.16
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 66 - "CompanyContext"
Cohesion: 0.29
Nodes (5): CompanyContext, jsonArray(), jsonRecord(), PrismaCompanyContextAdapter, Injectable

### Community 67 - "asProviderInstanceId"
Cohesion: 0.08
Nodes (40): assertInteractiveAllowed(), DEFAULT_MODELS, CliAiProvider, KeyPromptService, Injectable, ModelPromptResult, ModelPromptService, Injectable (+32 more)

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.07
Nodes (31): IsStringOrArrayOfStrings(), OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray (+23 more)

### Community 69 - ".execute"
Cohesion: 0.18
Nodes (12): isContentStartCommand(), makeContentRun(), makeSocialRun(), makeSocialSnapshot(), SocialRunSnapshot, ErrorEnvelope, newConversationId(), newInvitationId() (+4 more)

### Community 70 - "LoggingService"
Cohesion: 0.11
Nodes (11): Inject, Inject, Inject, Optional, ConsoleLoggerAdapter, Injectable, LogContext, LoggingService (+3 more)

### Community 71 - "RedisConnectionService"
Cohesion: 0.18
Nodes (5): RedisCacheModule, Module, RedisConnectionService, Injectable, isRedisRequiredFromConfig()

### Community 72 - "openai-messages.mapper.ts"
Cohesion: 0.42
Nodes (6): mapOpenAiMessagesToGateway(), mapOpenAiToolCalls(), mapOpenAiChatRequestToGateway(), mapOpenAiToolChoice(), mapOpenAiToolsToGateway(), OpenAiFunctionTool

### Community 73 - "patch-company-context.use-case.ts"
Cohesion: 0.44
Nodes (5): toPublicCompanyContext(), assertCompanyContextWritable(), PartialCompanyContext, isComplete(), mergeCompanyContext()

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "company-context.mapper.ts"
Cohesion: 0.15
Nodes (11): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+3 more)

### Community 77 - "api/src/health/health.service.ts"
Cohesion: 0.08
Nodes (28): GATEWAY_PROBE_TIMEOUT_MS, GatewayLivenessBody, GatewayLivenessProbe, GatewayLivenessProbeReason, GatewayLivenessProbeResult, isRecord(), parseGatewayLivenessBody(), probeFailureReason() (+20 more)

### Community 78 - ".streamChat"
Cohesion: 0.13
Nodes (13): ChatStreamController, ApiBody, ApiOperation, ApiProduces, ApiResponse, ApiSecurity, ApiTags, Body (+5 more)

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.12
Nodes (21): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), GatewayChatResponse (+13 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - ".create"
Cohesion: 0.13
Nodes (13): FeedbackController, ApiCookieAuth, ApiTags, Body, Controller, HttpCode, Post, CreateFeedbackDto (+5 more)

### Community 82 - "ClientEditCommand"
Cohesion: 0.11
Nodes (9): ClientEditCommand, Command, Option, ModelEditCommand, Command, Option, ModelRemoveCommand, Command (+1 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "OllamaEmbeddingAdapter"
Cohesion: 0.24
Nodes (3): OllamaEmbeddingAdapter, Injectable, EmbeddingBackend

### Community 85 - "responses.adapter.ts"
Cohesion: 0.26
Nodes (15): asToolCallId(), buildResponsesCreateParams(), createResponsesAdapter(), textStream(), mapGatewayMetadataToOpenAi(), extractResponsesToolCalls(), mapResponsesStopReason(), parseOpenAiResponse() (+7 more)

### Community 86 - "GatewayConfig"
Cohesion: 0.07
Nodes (36): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, ClientManagerService, Injectable, ConfigPersistenceService, normalizeGatewayConfigForWrite() (+28 more)

### Community 87 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 88 - "ChatMessageDto"
Cohesion: 0.18
Nodes (11): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+3 more)

### Community 89 - "ProviderRemoveCommand"
Cohesion: 0.33
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 90 - "openai-chat-completion-response.dto.ts"
Cohesion: 0.39
Nodes (8): OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty, ApiPropertyOptional

### Community 91 - "prisma.feedback-run-reader.adapter.ts"
Cohesion: 0.36
Nodes (4): FeedbackRunLookup, FeedbackRunReader, PrismaFeedbackRunReaderAdapter, Injectable

### Community 92 - "anthropic-messages.controller.ts"
Cohesion: 0.04
Nodes (58): ApiHeader, GATEWAY_CACHE_HEADER, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags (+50 more)

### Community 93 - "GatewayKey"
Cohesion: 0.08
Nodes (30): CliRateLimit, GatewayClient, AddClientInput, EditClientInput, PromptAddClientResult, RemoveClientInput, resolveClientIdFromKey(), ClientId (+22 more)

### Community 94 - "create-feedback.use-case.ts"
Cohesion: 0.14
Nodes (15): CreateFeedbackUseCase, Inject, Injectable, agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_RUN_READER, FEEDBACK_BODY_MAX (+7 more)

### Community 95 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 96 - "ai-provider.interface.ts"
Cohesion: 0.12
Nodes (37): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatResponseData, ChatWarningDto, ApiProperty, ApiPropertyOptional, IsOptional (+29 more)

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 98 - "start-run-form.tsx"
Cohesion: 0.09
Nodes (34): metadata, CompletenessChip(), useCompleteness(), isGuestAllowedTaskType(), isGuestQuotaCode(), FALLBACK_ENVELOPE, GatewayAliveContext, GatewayAliveContextValue (+26 more)

### Community 99 - "GuestGuard"
Cohesion: 0.40
Nodes (3): GuestGuard, Inject, Injectable

### Community 100 - "CompanyContextController"
Cohesion: 0.22
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 101 - "save-output-edited.use-case.ts"
Cohesion: 0.07
Nodes (38): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+30 more)

### Community 102 - "filters/http-exception.filter.ts"
Cohesion: 0.21
Nodes (7): DEFAULT_HTTP_STATUS_TO_CODE, GlobalExceptionFilter, isPayloadTooLargeError(), PayloadTooLargeError, RequestWithId, Catch, Injectable

### Community 103 - "ProviderAddCommand"
Cohesion: 0.31
Nodes (3): ProviderAddCommand, Command, Option

### Community 104 - "ProviderEditCommand"
Cohesion: 0.33
Nodes (3): ProviderEditCommand, Command, Option

### Community 105 - "AppMetricsModule"
Cohesion: 0.12
Nodes (13): AiMetricsModule, Global, Module, AppMetricsModule, Global, Module, ObservabilityModule, Global (+5 more)

### Community 106 - "AuthUserContext"
Cohesion: 0.11
Nodes (24): HitlDto, IsArray, IsString, PatchRunRatingDto, IsIn, ValidateIf, isTerminalStatus(), RunsController (+16 more)

### Community 107 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 108 - "UserRepository"
Cohesion: 0.06
Nodes (23): Inject, Inject, Inject, Inject, Inject, AccountActivationRecord, AccountActivationRepository, CreatePendingUser (+15 more)

### Community 110 - "chat.service.ts"
Cohesion: 0.06
Nodes (56): SemanticStoreEmbedState, CacheIdentityMessage, ChatCacheSource, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional (+48 more)

### Community 112 - "prisma.service.ts"
Cohesion: 0.24
Nodes (4): RefreshSessionRecord, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable

### Community 114 - "cn"
Cohesion: 0.06
Nodes (41): DemoChip(), useDemoMode(), FeedbackCta(), AppHeaderProps, AppSidebar(), AppSidebarProps, CompletenessChipSlot(), FeedbackCtaSlot() (+33 more)

### Community 117 - "company-context.controller.ts"
Cohesion: 0.16
Nodes (13): GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PatchCompanyContextUseCase, Inject (+5 more)

### Community 118 - "prisma-invitation.adapter.ts"
Cohesion: 0.17
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 119 - "PrismaService"
Cohesion: 0.12
Nodes (5): PrismaModule, Global, Module, PrismaService, Injectable

### Community 120 - "should-include-redis-stack.ts"
Cohesion: 0.10
Nodes (23): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement() (+15 more)

### Community 121 - "WizardState"
Cohesion: 0.09
Nodes (16): ConfigInitCommand, Command, Option, ConfigValidateCommand, Command, Option, WIZARD_INIT_STEPS, WIZARD_STEPS (+8 more)

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
Cohesion: 0.09
Nodes (22): ChatModule, Module, HealthModule, Module, AnthropicModule, Module, IntegrationsModule, Module (+14 more)

### Community 129 - ".getOne"
Cohesion: 0.17
Nodes (12): ApiAnthropicErrorResponses(), AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+4 more)

### Community 131 - "models.controller.ts"
Cohesion: 0.10
Nodes (22): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+14 more)

### Community 132 - "openai-params-provider.mapper.ts"
Cohesion: 0.24
Nodes (11): mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses(), mapStopSequences(), OpenAiSharedChatCompletionParams, OpenAiSharedResponsesParams (+3 more)

### Community 144 - "health.api.ts"
Cohesion: 0.30
Nodes (10): fetchGatewayAlive(), fetchHealthReady(), HealthCheck, HealthCheckStatus, HealthReadyAggregate, HealthReadyResponse, isGatewayAlive(), isRecord() (+2 more)

### Community 145 - "openai-messages-provider.mapper.ts"
Cohesion: 0.27
Nodes (7): ProviderAssistantTurn, ProviderChatTurn, ProviderToolResultTurn, ChatCompletionMessageParam, mapAssistantTurn(), mapAssistantTurnToResponsesInput(), mapTurnsToResponsesInput()

## Knowledge Gaps
- **426 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+421 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1192 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ModelAlias` connect `ModelAlias` to `ai-provider.interface.ts`, `asProviderInstanceId`, `asClientId`, `models.controller.ts`, `api-error.code.ts`, `sentry-ai-metrics.adapter.ts`, `chat.service.ts`, `PrometheusAppMetricsAdapter`, `branded.types.ts`, `config-generator.service.ts`, `GatewayConfig`, `AppMetricsService`, `redis-vector-store.adapter.ts`, `provider-registry.service.ts`, `metrics.ts`, `GatewayKey`, `app-metrics.service.ts`, `app-metrics-backend.interface.ts`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `ModelAlias` to `EnvRef`, `asClientId`, `models.controller.ts`, `logging.service.ts`, `cli.module.ts`, `PrometheusAppMetricsAdapter`, `AppMetricsService`, `provider-registry.service.ts`, `exitWithAgentReport`, `sentry-ai-metrics.adapter.ts`, `chat.module.ts`, `branded.types.ts`, `config-generator.service.ts`, `metrics.ts`, `app-metrics.service.ts`, `app-metrics-backend.interface.ts`, `asProviderInstanceId`, `LoggingService`, `GatewayConfig`, `GatewayKey`, `ai-provider.interface.ts`, `chat.service.ts`, `configuration.ts`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Why does `isRunId()` connect `ids.ts` to `RunRecord`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _426 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `users.controller.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05697278911564626 - nodes in this community are weakly interconnected._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05513612445664608 - nodes in this community are weakly interconnected._