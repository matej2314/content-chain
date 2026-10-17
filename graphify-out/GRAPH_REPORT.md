# Graph Report - content-chain  (2026-10-17)

## Corpus Check
- 705 files · ~243,492 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .css 1)

## Summary
- 4586 nodes · 14085 edges · 141 communities (125 shown, 15 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 420 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `79175991`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- DomainException
- social.types.ts
- company-context-form.tsx
- responses.adapter.ts
- provider-manager.service.ts
- chat.service.ts
- api-error.code.ts
- logging.service.ts
- AuthUserContext
- anthropic/anthropic-tools.mapper.ts
- run-review-panel.tsx
- EnvRef
- start-run-form.tsx
- cli.module.ts
- metrics.ts
- ChatParamsDto
- branded.types.ts
- app-metrics-backend.interface.ts
- archive-runs-view.tsx
- completeness-provider.tsx
- AuthController
- GatewayKey
- semantic-cache.constants.ts
- UserRepository
- redis-vector-store.adapter.ts
- feedback-form.tsx
- PrometheusAppMetricsAdapter
- wizard-orchestrator.service.ts
- LoggingService
- types/index.ts
- getAppConfig
- HealthService
- ai-provider-gateway/src/app.module.ts
- response-cache.service.ts
- AnthropicMessagesRequestDto
- google-tools.mapper.ts
- runs.types.ts
- enums.ts
- isRecord
- RedisConnectionService
- sentry-ai-metrics.adapter.ts
- RunRecord
- openai-models.controller.ts
- ids.ts
- semantic-cache.service.ts
- .createMessage
- save-output-edited.use-case.ts
- delete-user.use-case.ts
- ai-provider-gateway/src/main.ts
- anthropic-response.mapper.ts
- ListRunsQueryDto
- ModelAlias
- http-metrics.interceptor.ts
- prisma-invitation.adapter.ts
- content.graph.ts
- config-generator.service.ts
- auth.module.ts
- domain/company-context.types.ts
- agent-answers.schema.ts
- resilient-executor.ts
- resolve-provider-call-options.ts
- AnthropicContentBlockDto
- Env
- prisma.service.ts
- anthropic-messages.controller.ts
- ModelEditCommand
- app-metrics.service.ts
- RefreshSessionRepository
- OpenAiChatCompletionRequestDto
- .execute
- OpenAiChatMessageDto
- PublicConfigController
- create-feedback.use-case.ts
- llm-hop.ts
- InMemoryRunSseHub
- parse-verifier-log-message.ts
- patch-company-context.use-case.ts
- api/src/health/health.service.ts
- ClientAddCommand
- llm-gateway.http.adapter.ts
- PrometheusService
- cn
- provider-registry.service.ts
- SPEC — README
- swagger.setup.ts
- users-view.tsx
- asProviderInstanceId
- company-context.dto.ts
- ClientRemoveCommand
- ModelAddCommand
- env.schema.ts
- apiFetch
- chat-stream.controller.ts
- social.graph.ts
- PrismaService
- StartRunDto
- ProviderEditCommand
- route.ts
- company-context.mapper.ts
- ChatToolingDto
- RolesGuard
- configuration.ts
- models.controller.ts
- ProviderAddCommand
- domain/is-complete.ts
- guest-purge.module.ts
- feedback.module.ts
- JwtAuthGuard
- guest.guard.ts
- AppMetricsModule
- should-include-redis-stack.ts
- form-field.tsx
- openai-params-provider.mapper.ts
- ModelRemoveCommand
- ProviderRemoveCommand
- CompanyContextController
- EnvironmentVariables
- CompanyContextRepository
- prisma.feedback-run-reader.adapter.ts
- AppMetricsService
- CreateFeedbackUseCase
- HttpExceptionFilter
- api/src/app.module.ts
- CreateFeedbackDto
- Architektura
- brand
- ClientEditCommand
- GatewayCommand
- ai-provider-gateway/src/health/health.service.ts
- openai-chat-completion-response.dto.ts
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
2. `DomainException` - 84 edges
3. `ProviderInstanceId` - 81 edges
4. `LoggingService` - 73 edges
5. `asProviderInstanceId()` - 67 edges
6. `isRecord()` - 66 edges
7. `GatewayConfig` - 65 edges
8. `cn()` - 65 edges
9. `GatewayKey` - 59 edges
10. `Env` - 59 edges

## Surprising Connections (you probably didn't know these)
- `toChatResponseDto()` --indirect_call--> `toGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/chat/dto/chat-response.dto.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `optionalEnvRefSchema` --calls--> `asEnvRef()`  [EXTRACTED]
  apps/ai-provider-gateway/src/config/gateway-config.schema.ts → apps/ai-provider-gateway/src/common/types/branded.types.ts
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `RedisConnectionService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-connection.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `CacheRegistryService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/cache-registry.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (141 total, 15 thin omitted)

### Community 0 - "DomainException"
Cohesion: 0.06
Nodes (58): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Injectable, ActivateAccountOutput, ActivateAccountUseCase, Injectable, comparePassword() (+50 more)

### Community 1 - "social.types.ts"
Cohesion: 0.06
Nodes (26): CompositeRunResultReader, GetRunOutput, RunResultReader, SocialBrief, EmptyRunResultReader, Injectable, toInputJson(), SocialResultStore (+18 more)

### Community 2 - "company-context-form.tsx"
Cohesion: 0.05
Nodes (71): metadata, putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras, companyContextForPut(), CompanyContextObjection (+63 more)

### Community 3 - "responses.adapter.ts"
Cohesion: 0.09
Nodes (44): toHttpException(), asSystemFingerprint(), asToolCallId(), mapOpenAiToolCalls(), ProviderAssistantTurn, ProviderChatTurn, ProviderToolResultTurn, ChatCompletionsAdapterOptions (+36 more)

### Community 4 - "provider-manager.service.ts"
Cohesion: 0.07
Nodes (40): PendingSecretsItem, ProviderTestCommand, Command, Option, DEFAULT_MODELS, convertProvider(), CliAiProvider, ProviderPromptResult (+32 more)

### Community 5 - "chat.service.ts"
Cohesion: 0.06
Nodes (52): SemanticStoreEmbedState, CacheIdentityMessage, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray (+44 more)

### Community 6 - "api-error.code.ts"
Cohesion: 0.14
Nodes (24): ChatErrorHandlerService, Injectable, ApiErrorCode, ApiErrorPayload, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus() (+16 more)

### Community 7 - "logging.service.ts"
Cohesion: 0.05
Nodes (28): OllamaEmbeddingAdapter, Injectable, EmbeddingBackend, ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable (+20 more)

### Community 8 - "AuthUserContext"
Cohesion: 0.04
Nodes (55): ListUsersUseCase, Injectable, ReactivateUserUseCase, Inject, Injectable, ApiCookieAuth, Patch, JwtPayload (+47 more)

### Community 9 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.08
Nodes (45): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, mapProviderResponseToAiObservation(), toCachedChatResponse(), asInputTokens(), asOutputTokens(), asPromptCacheCreationTokens() (+37 more)

### Community 10 - "run-review-panel.tsx"
Cohesion: 0.07
Nodes (38): DemoChip(), useDemoMode(), useGuestLocked(), buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload() (+30 more)

### Community 11 - "EnvRef"
Cohesion: 0.18
Nodes (7): KeyGenerateCommand, Command, Option, EnvPatchService, Injectable, ClientCli, EnvRef

### Community 12 - "start-run-form.tsx"
Cohesion: 0.09
Nodes (36): metadata, fetchCompanyContext(), GuestLimitModal(), GUEST_ALLOWED_TASK_TYPES, GUEST_CONTACTS, GUEST_QUOTA_CODES, GuestAllowedTaskType, GuestContact (+28 more)

### Community 13 - "cli.module.ts"
Cohesion: 0.09
Nodes (44): AgentReport, AgentReportStatus, emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), loadAnswers(), collectPendingSecrets(), assertAgentHasAnswers() (+36 more)

### Community 14 - "metrics.ts"
Cohesion: 0.09
Nodes (33): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+25 more)

### Community 15 - "ChatParamsDto"
Cohesion: 0.12
Nodes (17): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+9 more)

### Community 16 - "branded.types.ts"
Cohesion: 0.10
Nodes (43): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatCacheSource, ChatResponseData, SseMetaPayload, SseMetaPayloadDto, ApiProperty (+35 more)

### Community 17 - "app-metrics-backend.interface.ts"
Cohesion: 0.13
Nodes (12): healthStatusToGaugeValue(), AppRequestLabels, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus, HttpMethod (+4 more)

### Community 18 - "archive-runs-view.tsx"
Cohesion: 0.06
Nodes (53): metadata, metadata, useSession(), CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS (+45 more)

### Community 19 - "completeness-provider.tsx"
Cohesion: 0.09
Nodes (34): fetchCompleteness(), CompletenessState, GATE_SECTION_LABELS, CompletenessChip(), CompletenessContext, CompletenessContextValue, CompletenessProvider(), FALLBACK_ENVELOPE (+26 more)

### Community 20 - "AuthController"
Cohesion: 0.06
Nodes (39): AuthController, ApiTags, Body, Controller, Get, HttpCode, Post, Req (+31 more)

### Community 21 - "GatewayKey"
Cohesion: 0.12
Nodes (17): ChatService, Injectable, asRequestId(), GatewayKey, OpenAiChatCompletionsController, ApiSecurity, ApiTags, Controller (+9 more)

### Community 22 - "semantic-cache.constants.ts"
Cohesion: 0.13
Nodes (12): EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema(), EMBEDDING_CIRCUIT_COOLDOWN_MS, EMBEDDING_CIRCUIT_OPEN_AFTER, EMBEDDING_PROBE_TIMEOUT_MS (+4 more)

### Community 23 - "UserRepository"
Cohesion: 0.08
Nodes (18): Inject, Inject, Inject, Inject, AuthUser, CreateAdminIfNoneData, CreateAdminIfNoneResult, CreateUserData (+10 more)

### Community 24 - "redis-vector-store.adapter.ts"
Cohesion: 0.12
Nodes (20): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), asString(), ParsedKnnHits, parseKnnHits() (+12 more)

### Community 25 - "feedback-form.tsx"
Cohesion: 0.16
Nodes (18): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, filterFeedbackRunOptions(), CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody() (+10 more)

### Community 26 - "PrometheusAppMetricsAdapter"
Cohesion: 0.12
Nodes (6): PrometheusAppMetricsAdapter, Injectable, resolveAppMetricsBackend(), AppProviderCallContext, AppProviderStreamScope, AppTokenUsage

### Community 27 - "wizard-orchestrator.service.ts"
Cohesion: 0.06
Nodes (61): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, InitAnswers (+53 more)

### Community 28 - "LoggingService"
Cohesion: 0.07
Nodes (19): Inject, Inject, ChatProviderCooldownService, Injectable, StreamCacheReplayService, Injectable, DEFAULT_HTTP_STATUS_TO_CODE, GlobalExceptionFilter (+11 more)

### Community 29 - "types/index.ts"
Cohesion: 0.11
Nodes (30): CONVERSATION_ID_PATTERN, createRequestId(), isAttemptNumber(), isBaseUrl(), isCacheTtlSeconds(), isConversationId(), isFiniteNumber(), isMaxAttempts() (+22 more)

### Community 30 - "getAppConfig"
Cohesion: 0.14
Nodes (14): resolveClientIdFromKey(), ResolvedGatewayClient, getAppConfig(), enrichRequestWithClientId(), SmartRateLimitGuard, Injectable, AnthropicApiKeyGuard, readAnthropicApiKey() (+6 more)

### Community 31 - "HealthService"
Cohesion: 0.10
Nodes (13): HealthLivenessResponseDto, ApiProperty, HealthReadinessResponseDto, HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller (+5 more)

### Community 32 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.09
Nodes (23): ChatModule, Module, RequestIdMiddleware, Injectable, GatewayKeyGuard, Injectable, AnthropicModule, Module (+15 more)

### Community 33 - "response-cache.service.ts"
Cohesion: 0.10
Nodes (17): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, CacheModule, CacheModuleOptions (+9 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.13
Nodes (19): AnthropicMessagesRequestDto, AnthropicThinkingDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+11 more)

### Community 35 - "google-tools.mapper.ts"
Cohesion: 0.16
Nodes (22): buildGenerationConfig(), createGoogleProvider(), getFinalToolCalls(), getStopReason(), textStream(), mapStopSequences(), mapThinkingBudgetToGeminiLevel(), extractFromLegacyFields() (+14 more)

### Community 36 - "runs.types.ts"
Cohesion: 0.05
Nodes (71): assertNever(), notifyProduct(), notifyRunCancelled(), notifyRunTerminal(), EnvelopeRef, ProductToast, RunTerminalInput, RunTerminalOutcome (+63 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "isRecord"
Cohesion: 0.05
Nodes (68): activateAccount(), Credentials, fetchBootstrapStatus(), parseAuthUserWrapper(), parseRegisteredUser(), parseRegisteredUserWrapper(), parseSessionUser(), RegisteredUser (+60 more)

### Community 39 - "RedisConnectionService"
Cohesion: 0.20
Nodes (5): RedisCacheModule, Module, RedisConnectionService, Injectable, isRedisRequiredFromConfig()

### Community 40 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.10
Nodes (28): CostUsd, ToolCallId, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext() (+20 more)

### Community 41 - "RunRecord"
Cohesion: 0.06
Nodes (26): RunLifecycleService, TransitionExtras, Injectable, LightRunItem, ListRunsResult, RunSnapshot, RUN_SSE_HUB, RunLogEntry (+18 more)

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.13
Nodes (21): ApiOpenAiErrorResponses(), OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+13 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (23): ACCOUNT_ACTIVATION_ID_RE, AccountActivationId, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createRunId() (+15 more)

### Community 44 - "semantic-cache.service.ts"
Cohesion: 0.13
Nodes (18): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, isSingleTurnUserRequest(), lastUserMessageText(), embeddingProbeTimeoutMs() (+10 more)

### Community 45 - ".createMessage"
Cohesion: 0.08
Nodes (25): ApiHeader, ApiBody, ApiOperation, ApiResponse, Body, Post, Req, toChatResponseDto() (+17 more)

### Community 46 - "save-output-edited.use-case.ts"
Cohesion: 0.06
Nodes (42): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+34 more)

### Community 47 - "delete-user.use-case.ts"
Cohesion: 0.07
Nodes (23): DeleteUserResult, DeleteUserUseCase, Inject, Injectable, isGuestTaskType(), RunAbortRegistry, Injectable, GuestPurgePort (+15 more)

### Community 48 - "ai-provider-gateway/src/main.ts"
Cohesion: 0.16
Nodes (12): AppModule, Module, bootstrap(), API_GLOBAL_PREFIX, PORT, setupApp(), exportOpenApi(), OPENAPI_OUTPUT_FILENAME (+4 more)

### Community 49 - "anthropic-response.mapper.ts"
Cohesion: 0.06
Nodes (54): ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString, ChatWarningDto, ApiProperty (+46 more)

### Community 50 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+2 more)

### Community 51 - "ModelAlias"
Cohesion: 0.07
Nodes (6): ProviderTestOptions, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, AppMetricsBackend

### Community 52 - "http-metrics.interceptor.ts"
Cohesion: 0.11
Nodes (18): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, MetricsController, Controller, Get (+10 more)

### Community 53 - "prisma-invitation.adapter.ts"
Cohesion: 0.14
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 54 - "content.graph.ts"
Cohesion: 0.07
Nodes (52): toOutcome(), Inject, coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema (+44 more)

### Community 55 - "config-generator.service.ts"
Cohesion: 0.08
Nodes (19): ConfigInitCommand, Command, Option, ConfigValidateCommand, Command, Option, CliGatewayValidatorService, Injectable (+11 more)

### Community 56 - "auth.module.ts"
Cohesion: 0.04
Nodes (52): Inject, Inject, InviteUserResult, inviteUserSchema, InviteUserUseCase, Inject, Injectable, InvitationListItem (+44 more)

### Community 57 - "domain/company-context.types.ts"
Cohesion: 0.16
Nodes (17): AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CompanyContextWriteDetail, CtaItem, emptyCompanyContext() (+9 more)

### Community 58 - "agent-answers.schema.ts"
Cohesion: 0.11
Nodes (21): ClientAddAnswers, ClientAddAnswersSchema, ClientEditAnswers, ClientEditAnswersSchema, ClientRemoveAnswers, ClientRemoveAnswersSchema, InitAnswersSchema, ModelAddAnswers (+13 more)

### Community 59 - "resilient-executor.ts"
Cohesion: 0.17
Nodes (18): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+10 more)

### Community 60 - "resolve-provider-call-options.ts"
Cohesion: 0.48
Nodes (5): clamp(), isOverrideKey(), resolveProviderCallOptions(), OVERRIDE_KEYS, OverrideKey

### Community 61 - "AnthropicContentBlockDto"
Cohesion: 0.14
Nodes (14): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+6 more)

### Community 62 - "Env"
Cohesion: 0.03
Nodes (84): PublicConfigResponse, AutoFinalizeExpiredReviewsUseCase, Inject, Injectable, CancelRunUseCase, Inject, Injectable, FinalizeReviewUseCase (+76 more)

### Community 63 - "prisma.service.ts"
Cohesion: 0.20
Nodes (7): AccountActivationRecord, CreatePendingUser, RotateActivationTokenInput, ActivationRow, PrismaAccountActivationAdapter, Injectable, UserRow

### Community 64 - "anthropic-messages.controller.ts"
Cohesion: 0.09
Nodes (30): GATEWAY_CACHE_HEADER, ApiAnthropicErrorResponses(), ApiRequestIdHeader(), AnthropicMessagesController, ApiSecurity, ApiTags, Controller, AnthropicModelsController (+22 more)

### Community 65 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 66 - "app-metrics.service.ts"
Cohesion: 0.14
Nodes (11): APP_METRICS_BACKEND, MetricsController, ApiOperation, ApiResponse, ApiTags, Controller, Get, PreMetricsScrapeHook (+3 more)

### Community 67 - "RefreshSessionRepository"
Cohesion: 0.10
Nodes (9): Inject, Inject, Inject, Inject, RefreshSessionRecord, RefreshSessionRepository, RotateRefreshSessionResult, PrismaRefreshSessionAdapter (+1 more)

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (19): IsStringOrArrayOfStrings(), OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray (+11 more)

### Community 69 - ".execute"
Cohesion: 0.16
Nodes (14): isContentStartCommand(), isPlainRecord(), omitUndefinedDeep(), makeContentRun(), makeSocialRun(), makeSocialSnapshot(), SocialRunSnapshot, ErrorEnvelope (+6 more)

### Community 70 - "OpenAiChatMessageDto"
Cohesion: 0.16
Nodes (12): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+4 more)

### Community 71 - "PublicConfigController"
Cohesion: 0.22
Nodes (7): PublicConfigController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, Inject

### Community 72 - "create-feedback.use-case.ts"
Cohesion: 0.20
Nodes (10): agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_RUN_READER, FEEDBACK_BODY_MAX, FEEDBACK_REPOSITORY, FeedbackEntry, FeedbackRepository (+2 more)

### Community 73 - "llm-hop.ts"
Cohesion: 0.21
Nodes (12): LLM_GATEWAY_PORT, isRetryable(), RetryReason, ChatJsonInput, hopErrorLogMessage(), hopUserContent(), isHopRetryable(), isStructuredOutputInvalid() (+4 more)

### Community 74 - "InMemoryRunSseHub"
Cohesion: 0.29
Nodes (4): RunSseEvent, InMemoryRunSseHub, Inject, Injectable

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "patch-company-context.use-case.ts"
Cohesion: 0.24
Nodes (9): toPublicCompanyContext(), assertAudienceProfileNamesUnique(), assertCompanyContextWritable(), PartialCompanyContext, isComplete(), mergeCompanyContext(), normalizeAudienceName(), withEffectiveAudience() (+1 more)

### Community 77 - "api/src/health/health.service.ts"
Cohesion: 0.08
Nodes (28): GATEWAY_PROBE_TIMEOUT_MS, GatewayLivenessBody, GatewayLivenessProbe, GatewayLivenessProbeReason, GatewayLivenessProbeResult, isRecord(), parseGatewayLivenessBody(), probeFailureReason() (+20 more)

### Community 78 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.12
Nodes (21): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), GatewayChatResponse (+13 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - "cn"
Cohesion: 0.05
Nodes (52): FeedbackCta(), AppHeader(), AppHeaderProps, AppSidebar(), AppSidebarProps, CompletenessChipSlot(), FeedbackCtaSlot(), FloatingBoxSlot() (+44 more)

### Community 82 - "provider-registry.service.ts"
Cohesion: 0.11
Nodes (15): ChatProviderCallService, CompleteOnceResult, Injectable, UnsupportedProviderException, ModelId, GatewayModelConfig, GatewayParamsConfig, AIProvider (+7 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "swagger.setup.ts"
Cohesion: 0.17
Nodes (11): ChatOutputTextDto, ApiProperty, ChatUsageDto, ApiPropertyOptional, SseDeltaPayloadDto, ApiProperty, OPENAPI_VERSION, SWAGGER_UI_PATH (+3 more)

### Community 85 - "users-view.tsx"
Cohesion: 0.09
Nodes (41): metadata, logoutSession(), AccountEmailFormState, GuestLimitModalProps, CancelRunDialogProps, FALLBACK, LogoutDialog(), confirm() (+33 more)

### Community 86 - "asProviderInstanceId"
Cohesion: 0.07
Nodes (41): assertInteractiveAllowed(), DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, convertModel(), ClientManagerService, Injectable (+33 more)

### Community 87 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 88 - "ClientRemoveCommand"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

### Community 89 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 90 - "env.schema.ts"
Cohesion: 0.17
Nodes (11): AppModule, Module, bootstrap(), EnvModule, Global, Module, envSchema, parseCorsOrigins() (+3 more)

### Community 91 - "apiFetch"
Cohesion: 0.06
Nodes (46): geistMono, geistSans, metadata, fetchUserSession(), patchOwnEmail(), AccountEmailForm(), onAccountSubmit(), onConfirm() (+38 more)

### Community 92 - "chat-stream.controller.ts"
Cohesion: 0.06
Nodes (29): ChatController, ApiSecurity, ApiTags, Controller, ChatStreamController, ApiBody, ApiOperation, ApiProduces (+21 more)

### Community 93 - "social.graph.ts"
Cohesion: 0.13
Nodes (34): loadPromptFromDir(), renderPrompt(), coercePassNoteVerdict(), isPassOnlyIssue(), ideasOutputSchema, reelIdeasOutputSchema, isReelTaskType(), ReelTaskType (+26 more)

### Community 95 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 96 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 98 - "company-context.mapper.ts"
Cohesion: 0.15
Nodes (12): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+4 more)

### Community 99 - "ChatToolingDto"
Cohesion: 0.16
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 101 - "configuration.ts"
Cohesion: 0.06
Nodes (46): CliValidateOptions, normalizeGatewayConfigForWrite(), ValidationFormatter, asSemanticCacheTtlSeconds(), collectInactiveProviderWarnings(), formatZodIssues(), validateGatewayConfig(), ValidationOptions (+38 more)

### Community 102 - "models.controller.ts"
Cohesion: 0.12
Nodes (19): ApiGatewayModelsErrorResponses(), ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+11 more)

### Community 103 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 104 - "domain/is-complete.ts"
Cohesion: 0.35
Nodes (9): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, collectGateItemPaths(), isCompleteAudienceProfile(), isCompleteCtaItem(), isCompleteOfferItem(), nonEmpty() (+1 more)

### Community 105 - "guest-purge.module.ts"
Cohesion: 0.16
Nodes (10): GUEST_PURGE, GuestPurgeDeleteStats, LIVE_RUN_STATUSES, GuestPurgeModule, Module, PrismaGuestPurgeAdapter, Injectable, PrismaModule (+2 more)

### Community 106 - "feedback.module.ts"
Cohesion: 0.27
Nodes (6): FEEDBACK_PURGE, FeedbackPurgePort, FeedbackModule, Module, PrismaFeedbackPurgeAdapter, Injectable

### Community 108 - "guest.guard.ts"
Cohesion: 0.24
Nodes (5): ALLOW_GUEST_KEY, IS_PUBLIC_KEY, GuestGuard, Inject, Injectable

### Community 109 - "AppMetricsModule"
Cohesion: 0.20
Nodes (9): AiMetricsModule, Global, Module, AppMetricsModule, Global, Module, ObservabilityModule, Global (+1 more)

### Community 110 - "should-include-redis-stack.ts"
Cohesion: 0.18
Nodes (12): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement() (+4 more)

### Community 111 - "form-field.tsx"
Cohesion: 0.07
Nodes (52): AcceptInvitePage(), metadata, tokenFromSearchParam(), ACCEPT_INVITE_DEMO_HINT, ACCEPT_INVITE_UNAUTHORIZED_HINT, AcceptInviteFormError, toAcceptInviteFormError(), ACTIVATION_FAILED_HINT (+44 more)

### Community 112 - "openai-params-provider.mapper.ts"
Cohesion: 0.14
Nodes (22): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapStopSequences(), OpenAiSharedChatCompletionParams (+14 more)

### Community 113 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 114 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 115 - "CompanyContextController"
Cohesion: 0.22
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 116 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 117 - "CompanyContextRepository"
Cohesion: 0.15
Nodes (14): GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PatchCompanyContextUseCase, Inject (+6 more)

### Community 118 - "prisma.feedback-run-reader.adapter.ts"
Cohesion: 0.31
Nodes (4): FeedbackRunLookup, FeedbackRunReader, PrismaFeedbackRunReaderAdapter, Injectable

### Community 119 - "AppMetricsService"
Cohesion: 0.09
Nodes (7): HttpMetricsMiddleware, Injectable, Inject, Optional, AppMetricsService, Inject, Injectable

### Community 120 - "CreateFeedbackUseCase"
Cohesion: 0.22
Nodes (7): CreateFeedbackUseCase, Inject, Injectable, FeedbackController, ApiCookieAuth, ApiTags, Controller

### Community 122 - "api/src/app.module.ts"
Cohesion: 0.06
Nodes (46): AuthModule, Module, CompanyContextModule, Module, ContentPipelineFacade, Injectable, ContentRunExecutor, isCanonicalOutlineSelection() (+38 more)

### Community 123 - "CreateFeedbackDto"
Cohesion: 0.33
Nodes (6): CreateFeedbackDto, IsIn, IsOptional, IsString, MaxLength, MinLength

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 125 - "brand"
Cohesion: 0.17
Nodes (10): brand, unbrand, createAccountActivationId(), createInvitationId(), createRequestId(), createUserId(), isAccountActivationId(), isInvitationId() (+2 more)

### Community 126 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 128 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.24
Nodes (11): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiProperty, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty (+3 more)

### Community 131 - "openai-chat-completion-response.dto.ts"
Cohesion: 0.39
Nodes (8): OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty, ApiPropertyOptional

## Knowledge Gaps
- **471 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+466 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1250 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ModelAlias` connect `ModelAlias` to `app-metrics.service.ts`, `provider-manager.service.ts`, `chat.service.ts`, `api-error.code.ts`, `models.controller.ts`, `wizard-orchestrator.service.ts`, `sentry-ai-metrics.adapter.ts`, `metrics.ts`, `branded.types.ts`, `app-metrics-backend.interface.ts`, `provider-registry.service.ts`, `AppMetricsService`, `asProviderInstanceId`, `config-generator.service.ts`, `redis-vector-store.adapter.ts`, `PrometheusAppMetricsAdapter`, `resilient-executor.ts`, `types/index.ts`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `ModelAlias` to `provider-manager.service.ts`, `api-error.code.ts`, `logging.service.ts`, `cli.module.ts`, `metrics.ts`, `branded.types.ts`, `app-metrics-backend.interface.ts`, `GatewayKey`, `PrometheusAppMetricsAdapter`, `wizard-orchestrator.service.ts`, `types/index.ts`, `sentry-ai-metrics.adapter.ts`, `config-generator.service.ts`, `app-metrics.service.ts`, `provider-registry.service.ts`, `asProviderInstanceId`, `configuration.ts`, `models.controller.ts`, `AppMetricsService`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Why does `Env` connect `Env` to `DomainException`, `RefreshSessionRepository`, `api/src/app.module.ts`, `PublicConfigController`, `llm-hop.ts`, `InMemoryRunSseHub`, `guest.guard.ts`, `api/src/health/health.service.ts`, `save-output-edited.use-case.ts`, `llm-gateway.http.adapter.ts`, `delete-user.use-case.ts`, `AuthController`, `UserRepository`, `auth.module.ts`, `env.schema.ts`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _471 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `DomainException` be split into smaller, more focused modules?**
  _Cohesion score 0.05986842105263158 - nodes in this community are weakly interconnected._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05513612445664608 - nodes in this community are weakly interconnected._