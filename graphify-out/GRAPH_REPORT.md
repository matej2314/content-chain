# Graph Report - content-chain  (2026-10-17)

## Corpus Check
- 704 files · ~243,446 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .css 1)

## Summary
- 4583 nodes · 14080 edges · 135 communities (120 shown, 14 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 420 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `90afb553`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- auth.module.ts
- social.types.ts
- company-context-form.tsx
- chat-completions.adapter.ts
- asProviderInstanceId
- chat.service.ts
- provider-error.mapper.ts
- logging.module.ts
- AuthUserContext
- anthropic/anthropic-tools.mapper.ts
- ChatRequestDto
- GatewayConfig
- ConfigInitCommand
- cli.module.ts
- ChatMessageDto
- chat-params.dto.ts
- ai-provider.interface.ts
- app-metrics-backend.interface.ts
- start-run-form.tsx
- dashboard-shell.tsx
- AuthController
- GatewayKey
- semantic-cache.constants.ts
- AuthUser
- RedisVectorStoreAdapter
- feedback-form.tsx
- PrometheusAppMetricsAdapter
- wizard-orchestrator.service.ts
- LoggingService
- .getOne
- ai-provider-gateway/src/app.module.ts
- HealthService
- redis-vector-store.adapter.ts
- cache.module.ts
- AnthropicMessagesRequestDto
- google-tools.mapper.ts
- runs.types.ts
- enums.ts
- run-result-view.tsx
- RedisConnectionService
- sentry-ai-metrics.adapter.ts
- prisma-run.adapter.ts
- openai-models.controller.ts
- ids.ts
- semantic-cache.service.ts
- ChatParamsDto
- save-output-edited.use-case.ts
- Env
- swagger.setup.ts
- anthropic-response.mapper.ts
- ListRunsQueryDto
- ModelAlias
- .execute
- VectorStore
- llm-hop.ts
- FileManagerService
- prisma-invitation.adapter.ts
- domain/company-context.types.ts
- responses.adapter.ts
- branded.types.ts
- resolve-provider-call-options.ts
- exitWithAgentReport
- RunRepository
- anthropic-messages.controller.ts
- anthropic-models.controller.ts
- ModelEditCommand
- app-metrics.service.ts
- RefreshSessionRepository
- OpenAiChatCompletionRequestDto
- .execute
- OpenAiChatMessageDto
- PublicConfigController
- assert-audience-profile-names-unique.ts
- openai-chat-message.dto.ts
- InMemoryRunSseHub
- parse-verifier-log-message.ts
- company-context.port.ts
- api/src/health/health.service.ts
- ClientAddCommand
- llm-gateway.http.adapter.ts
- PrometheusService
- cn
- provider-instances.bootstrap.ts
- SPEC — README
- ChatResponseDto
- button.tsx
- model-manager.service.ts
- company-context.dto.ts
- ClientRemoveCommand
- ModelAddCommand
- UsersController
- users-view.tsx
- openai-chat-completions.controller.ts
- social.graph.ts
- CompanyContextRepository
- StartRunDto
- ProviderEditCommand
- route.ts
- asGatewayKey
- ChatToolingDto
- RolesGuard
- configuration.ts
- GatewayProviderType
- ProviderAddCommand
- openai-messages-provider.mapper.ts
- PrismaService
- openai-chat-completion-request.dto.ts
- JwtAuthGuard
- should-include-redis-stack.ts
- auth.api.ts
- openai-params-provider.mapper.ts
- ModelRemoveCommand
- ProviderRemoveCommand
- EnvironmentVariables
- company-context.controller.ts
- AppMetricsService
- api/src/app.module.ts
- Architektura
- brand
- ClientEditCommand
- health.api.ts
- ai-provider-gateway/src/health/health.service.ts
- openai-stream.mapper.ts
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
- RunsModule

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

## Communities (135 total, 14 thin omitted)

### Community 0 - "auth.module.ts"
Cohesion: 0.04
Nodes (93): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Injectable, ActivateAccountOutput, ActivateAccountUseCase, Injectable, comparePassword() (+85 more)

### Community 1 - "social.types.ts"
Cohesion: 0.06
Nodes (26): CompositeRunResultReader, GetRunOutput, RunResultReader, SocialBrief, EmptyRunResultReader, Injectable, toInputJson(), SocialResultStore (+18 more)

### Community 2 - "company-context-form.tsx"
Cohesion: 0.05
Nodes (73): metadata, putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras, companyContextForPut(), CompanyContextObjection (+65 more)

### Community 3 - "chat-completions.adapter.ts"
Cohesion: 0.21
Nodes (19): toHttpException(), asSystemFingerprint(), ChatCompletionsAdapterOptions, createChatCompletionsAdapter(), textStream(), mapTurnsToOpenAiMessages(), accumulateOpenAiStreamToolCallDeltas(), extractOpenAiStreamDeltaText() (+11 more)

### Community 4 - "asProviderInstanceId"
Cohesion: 0.13
Nodes (33): collectPendingSecrets(), CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema, convertClient(), convertModel(), convertProvider(), GatewayClientSchema (+25 more)

### Community 5 - "chat.service.ts"
Cohesion: 0.11
Nodes (27): SemanticStoreEmbedState, CacheIdentityMessage, CachedChatResponseWithConversation, isCachedChatAllowedForModelAlias(), shouldStoreChatResponse(), createInProcessSingleflight(), getResolvedSystemPrompts(), SYSTEM_PROMPT_SECTION_JOINER (+19 more)

### Community 6 - "provider-error.mapper.ts"
Cohesion: 0.16
Nodes (21): ApiErrorPayload, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isRateLimitStatus(), isServerError(), isTimeoutStatus() (+13 more)

### Community 7 - "logging.module.ts"
Cohesion: 0.06
Nodes (24): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+16 more)

### Community 8 - "AuthUserContext"
Cohesion: 0.06
Nodes (45): InviteUserDto, ApiProperty, IsEmail, InvitationsController, ApiCookieAuth, ApiTags, Body, Controller (+37 more)

### Community 9 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.09
Nodes (40): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent() (+32 more)

### Community 10 - "ChatRequestDto"
Cohesion: 0.08
Nodes (33): ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsObject, IsOptional (+25 more)

### Community 11 - "GatewayConfig"
Cohesion: 0.07
Nodes (20): PendingSecretsItem, ClientManagerService, Injectable, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable, EnvPatchService, EnvPatchValue (+12 more)

### Community 12 - "ConfigInitCommand"
Cohesion: 0.31
Nodes (3): ConfigInitCommand, Command, Option

### Community 13 - "cli.module.ts"
Cohesion: 0.06
Nodes (63): AgentReport, AgentReportStatus, loadAnswers(), assertAgentHasAnswers(), CliMode, CliModeFlags, markAgentRuntime(), resolveCliMode() (+55 more)

### Community 14 - "ChatMessageDto"
Cohesion: 0.08
Nodes (28): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+20 more)

### Community 15 - "chat-params.dto.ts"
Cohesion: 0.24
Nodes (7): ResponseFormatDto, ApiProperty, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsThinkingBudget()

### Community 16 - "ai-provider.interface.ts"
Cohesion: 0.10
Nodes (42): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatCacheSource, GATEWAY_CACHE_HEADER, ChatResponseData, SseMetaPayload, SseMetaPayloadDto (+34 more)

### Community 17 - "app-metrics-backend.interface.ts"
Cohesion: 0.17
Nodes (11): healthStatusToGaugeValue(), AppProviderStreamScope, AppRequestLabels, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus, HttpRequestLabels (+3 more)

### Community 18 - "start-run-form.tsx"
Cohesion: 0.04
Nodes (78): metadata, metadata, metadata, fetchCompanyContext(), GUEST_ALLOWED_TASK_TYPES, GUEST_CONTACTS, GUEST_QUOTA_CODES, GuestAllowedTaskType (+70 more)

### Community 19 - "dashboard-shell.tsx"
Cohesion: 0.09
Nodes (30): fetchCompleteness(), CompletenessState, CompletenessChip(), CompletenessContext, CompletenessContextValue, CompletenessProvider(), FALLBACK_ENVELOPE, useCompleteness() (+22 more)

### Community 20 - "AuthController"
Cohesion: 0.05
Nodes (42): AuthController, ApiCookieAuth, ApiTags, Body, Controller, Get, HttpCode, Patch (+34 more)

### Community 21 - "GatewayKey"
Cohesion: 0.07
Nodes (28): ChatService, Injectable, ApiBody, ApiOperation, ApiProduces, ApiResponse, Body, Post (+20 more)

### Community 22 - "semantic-cache.constants.ts"
Cohesion: 0.13
Nodes (12): EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema(), EMBEDDING_CIRCUIT_COOLDOWN_MS, EMBEDDING_CIRCUIT_OPEN_AFTER, EMBEDDING_PROBE_TIMEOUT_MS (+4 more)

### Community 23 - "AuthUser"
Cohesion: 0.08
Nodes (13): Inject, AccountActivationRecord, AccountActivationRepository, CreatePendingUser, RotateActivationTokenInput, AuthUser, ActivationRow, PrismaAccountActivationAdapter (+5 more)

### Community 24 - "RedisVectorStoreAdapter"
Cohesion: 0.24
Nodes (7): RedisVectorStoreAdapter, Injectable, isRedisSearchIndexAlreadyExistsError(), isRedisSearchMissingIndexError(), isRedisSearchModuleMissingError(), redisSearchErrorMessage(), VectorSearchHit

### Community 25 - "feedback-form.tsx"
Cohesion: 0.19
Nodes (15): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody(), parseFeedbackCreated() (+7 more)

### Community 26 - "PrometheusAppMetricsAdapter"
Cohesion: 0.12
Nodes (5): PrometheusAppMetricsAdapter, Injectable, resolveAppMetricsBackend(), AppProviderCallContext, AppTokenUsage

### Community 27 - "wizard-orchestrator.service.ts"
Cohesion: 0.06
Nodes (61): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, assertInteractiveAllowed(), DEFAULT_MODELS, WIZARD_INIT_STEPS, WIZARD_STEPS (+53 more)

### Community 28 - "LoggingService"
Cohesion: 0.08
Nodes (17): Inject, Inject, ChatProviderCallService, Injectable, ChatProviderCooldownService, Injectable, StreamCacheReplayService, Injectable (+9 more)

### Community 29 - ".getOne"
Cohesion: 0.19
Nodes (11): ApiGatewayModelsErrorResponses(), ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+3 more)

### Community 30 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.06
Nodes (37): ChatModule, Module, resolveClientIdFromKey(), ResolvedGatewayClient, getAppConfig(), GatewayKeyGuard, Injectable, enrichRequestWithClientId() (+29 more)

### Community 31 - "HealthService"
Cohesion: 0.10
Nodes (13): HealthLivenessResponseDto, ApiProperty, HealthReadinessResponseDto, HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller (+5 more)

### Community 32 - "redis-vector-store.adapter.ts"
Cohesion: 0.25
Nodes (12): isUnservableCachedReply(), parseCachedChatResponse(), escapeRedisSearchTag(), asString(), ParsedKnnHits, parseKnnHits(), VectorStoreKnnInput, VectorStorePartition (+4 more)

### Community 33 - "cache.module.ts"
Cohesion: 0.10
Nodes (17): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, CacheModule, CacheModuleOptions (+9 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "google-tools.mapper.ts"
Cohesion: 0.17
Nodes (21): buildGenerationConfig(), createGoogleProvider(), getFinalToolCalls(), getStopReason(), textStream(), mapStopSequences(), mapThinkingBudgetToGeminiLevel(), extractFromLegacyFields() (+13 more)

### Community 36 - "runs.types.ts"
Cohesion: 0.05
Nodes (94): filterFeedbackRunOptions(), ArchiveRunsQuery, fetchRunLogs(), fetchRunSnapshot(), fetchUserRuns(), isUserRating(), patchRunRating(), startRun() (+86 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "run-result-view.tsx"
Cohesion: 0.04
Nodes (66): buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload() (+58 more)

### Community 39 - "RedisConnectionService"
Cohesion: 0.20
Nodes (5): RedisCacheModule, Module, RedisConnectionService, Injectable, isRedisRequiredFromConfig()

### Community 40 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.08
Nodes (34): CostUsd, ToolCallId, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext() (+26 more)

### Community 41 - "prisma-run.adapter.ts"
Cohesion: 0.08
Nodes (18): LightRunItem, ListRunsResult, RunSnapshot, RunLogEntry, RunRecordBase, assertTransition(), CANCELABLE_RUN_STATUSES, PrismaRunAdapter (+10 more)

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.13
Nodes (20): ApiOpenAiErrorResponses(), OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+12 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (23): ACCOUNT_ACTIVATION_ID_RE, AccountActivationId, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createRunId() (+15 more)

### Community 44 - "semantic-cache.service.ts"
Cohesion: 0.10
Nodes (20): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, OllamaEmbeddingAdapter, Injectable, EmbeddingBackend (+12 more)

### Community 45 - "ChatParamsDto"
Cohesion: 0.20
Nodes (10): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+2 more)

### Community 46 - "save-output-edited.use-case.ts"
Cohesion: 0.06
Nodes (46): coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, pageDocumentOutputSchema, PageOutlineOutput, pageOutlineSectionRoleSchema, pageOutlineSectionSchema, readNonEmptyString() (+38 more)

### Community 47 - "Env"
Cohesion: 0.04
Nodes (42): AppModule, Module, TransactionalMail, NodemailerSmtpMailerAdapter, readSmtpConfig(), SmtpConfig, Inject, Injectable (+34 more)

### Community 48 - "swagger.setup.ts"
Cohesion: 0.09
Nodes (23): AppModule, Module, ChatOutputTextDto, ApiProperty, ChatUsageDto, ApiPropertyOptional, SseDeltaPayloadDto, ApiProperty (+15 more)

### Community 49 - "anthropic-response.mapper.ts"
Cohesion: 0.13
Nodes (25): SseDoneEvent, asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto, AnthropicTextContentBlockDto (+17 more)

### Community 50 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+2 more)

### Community 51 - "ModelAlias"
Cohesion: 0.07
Nodes (6): ProviderTestOptions, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, AppMetricsBackend

### Community 52 - ".execute"
Cohesion: 0.31
Nodes (6): assertSameIds(), SaveOutputEditedUseCase, Inject, Injectable, validationFailed(), withCharacterCount()

### Community 53 - "VectorStore"
Cohesion: 0.22
Nodes (3): VectorStore, Inject, Optional

### Community 54 - "llm-hop.ts"
Cohesion: 0.07
Nodes (51): Inject, pageOutlineOutputSchema, ContentResultStore, ContentPipelineInput, ContentPipelineState, ContentRefineSnapshot, PageDocument, PageOutline (+43 more)

### Community 55 - "FileManagerService"
Cohesion: 0.21
Nodes (4): ConfigGeneratorService, Injectable, FileManagerService, Injectable

### Community 56 - "prisma-invitation.adapter.ts"
Cohesion: 0.07
Nodes (30): Inject, InviteUserUseCase, Inject, Injectable, InvitationListItem, ListInvitationsUseCase, Inject, Injectable (+22 more)

### Community 57 - "domain/company-context.types.ts"
Cohesion: 0.15
Nodes (21): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CompanyContextWriteDetail (+13 more)

### Community 58 - "responses.adapter.ts"
Cohesion: 0.22
Nodes (19): toCachedChatResponse(), asInputTokens(), asOutputTokens(), asToolCallId(), getUsageMetadata(), buildResponsesCreateParams(), createResponsesAdapter(), textStream() (+11 more)

### Community 59 - "branded.types.ts"
Cohesion: 0.07
Nodes (51): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+43 more)

### Community 60 - "resolve-provider-call-options.ts"
Cohesion: 0.39
Nodes (6): clamp(), isOverrideKey(), resolveProviderCallOptions(), OVERRIDE_KEYS, OverrideKey, GatewayParamsConfig

### Community 61 - "exitWithAgentReport"
Cohesion: 0.16
Nodes (10): emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList(), ProviderTestCommand (+2 more)

### Community 62 - "RunRepository"
Cohesion: 0.03
Nodes (86): AutoFinalizeExpiredReviewsUseCase, Inject, Injectable, CancelRunUseCase, Inject, Injectable, FinalizeReviewUseCase, Inject (+78 more)

### Community 63 - "anthropic-messages.controller.ts"
Cohesion: 0.09
Nodes (22): ApiErrorCode, DEFAULT_HTTP_STATUS_TO_CODE, GlobalExceptionFilter, isPayloadTooLargeError(), PayloadTooLargeError, RequestWithId, Catch, Injectable (+14 more)

### Community 64 - "anthropic-models.controller.ts"
Cohesion: 0.13
Nodes (20): ApiAnthropicErrorResponses(), AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+12 more)

### Community 65 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 66 - "app-metrics.service.ts"
Cohesion: 0.15
Nodes (11): APP_METRICS_BACKEND, MetricsController, ApiOperation, ApiResponse, ApiTags, Controller, Get, PreMetricsScrapeHook (+3 more)

### Community 67 - "RefreshSessionRepository"
Cohesion: 0.10
Nodes (9): Inject, Inject, Inject, Inject, RefreshSessionRecord, RefreshSessionRepository, RotateRefreshSessionResult, PrismaRefreshSessionAdapter (+1 more)

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (18): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+10 more)

### Community 69 - ".execute"
Cohesion: 0.15
Nodes (13): isContentStartCommand(), isPlainRecord(), omitUndefinedDeep(), makeContentRun(), makeSocialRun(), makeSocialSnapshot(), SocialRunSnapshot, ErrorEnvelope (+5 more)

### Community 70 - "OpenAiChatMessageDto"
Cohesion: 0.22
Nodes (9): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+1 more)

### Community 71 - "PublicConfigController"
Cohesion: 0.22
Nodes (7): PublicConfigController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, Inject

### Community 72 - "assert-audience-profile-names-unique.ts"
Cohesion: 0.60
Nodes (3): assertAudienceProfileNamesUnique(), normalizeAudienceName(), withEffectiveAudience()

### Community 73 - "openai-chat-message.dto.ts"
Cohesion: 0.60
Nodes (3): isTextContentItem(), normalizeOpenAiContent(), TextContentItem

### Community 74 - "InMemoryRunSseHub"
Cohesion: 0.16
Nodes (6): RunSseEvent, InMemoryRunSseHub, Inject, Injectable, HttpExceptionFilter, Catch

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "company-context.port.ts"
Cohesion: 0.20
Nodes (12): toPublicCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, PutCompanyContextUseCase, Injectable (+4 more)

### Community 77 - "api/src/health/health.service.ts"
Cohesion: 0.08
Nodes (28): GATEWAY_PROBE_TIMEOUT_MS, GatewayLivenessBody, GatewayLivenessProbe, GatewayLivenessProbeReason, GatewayLivenessProbeResult, isRecord(), parseGatewayLivenessBody(), probeFailureReason() (+20 more)

### Community 78 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.06
Nodes (39): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), GatewayChatResponse (+31 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - "cn"
Cohesion: 0.06
Nodes (41): AppHeader(), AppHeaderProps, AppSidebar(), AppSidebarProps, CompletenessChipSlot(), APP_NAV, AppNavItem, navItemsForRole() (+33 more)

### Community 82 - "provider-instances.bootstrap.ts"
Cohesion: 0.19
Nodes (12): GatewayProviderInstanceConfig, assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryFn (+4 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "ChatResponseDto"
Cohesion: 0.33
Nodes (6): ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString

### Community 85 - "button.tsx"
Cohesion: 0.09
Nodes (36): logoutSession(), GuestLimitModal(), GuestLimitModalProps, FeedbackCta(), assertNever(), notifyRunCancelled(), notifyRunTerminal(), EnvelopeRef (+28 more)

### Community 86 - "model-manager.service.ts"
Cohesion: 0.10
Nodes (28): buildAppProviderMetricsContext(), DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, defaultModelPolicy(), ModelEditField, ModelManagerService (+20 more)

### Community 87 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 88 - "ClientRemoveCommand"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

### Community 89 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 90 - "UsersController"
Cohesion: 0.09
Nodes (18): ReactivateUserUseCase, Inject, Injectable, PatchUserDto, ApiProperty, IsBoolean, ApiCookieAuth, ApiTags (+10 more)

### Community 91 - "users-view.tsx"
Cohesion: 0.06
Nodes (57): metadata, fetchAppConfig(), AppConfig, parseAppConfig(), DemoChip(), DemoModeContext, DemoModeContextValue, DemoModeProvider() (+49 more)

### Community 92 - "openai-chat-completions.controller.ts"
Cohesion: 0.05
Nodes (48): ApiHeader, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags, Body (+40 more)

### Community 93 - "social.graph.ts"
Cohesion: 0.13
Nodes (32): coercePassNoteVerdict(), isPassOnlyIssue(), ideasOutputSchema, reelIdeasOutputSchema, isReelTaskType(), ReelTaskType, canRefine(), MAX_REFINE (+24 more)

### Community 94 - "CompanyContextRepository"
Cohesion: 0.13
Nodes (11): Inject, Inject, Inject, CompanyContextRepository, CompanyContext, emptyCompanyContext(), jsonArray(), jsonRecord() (+3 more)

### Community 95 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 96 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 98 - "asGatewayKey"
Cohesion: 0.19
Nodes (6): KeyGenerateCommand, Command, Option, KeyGeneratorService, Injectable, asGatewayKey()

### Community 99 - "ChatToolingDto"
Cohesion: 0.16
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 101 - "configuration.ts"
Cohesion: 0.07
Nodes (45): CliValidateOptions, asSemanticCacheTtlSeconds(), AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig, SemanticCacheRuntimeConfig, collectInactiveProviderWarnings() (+37 more)

### Community 102 - "GatewayProviderType"
Cohesion: 0.12
Nodes (17): CliAiProvider, ProviderTestService, Injectable, ProviderCli, AddProviderInput, BaseUrl, ProviderApiKey, GatewayProviderType (+9 more)

### Community 103 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 104 - "openai-messages-provider.mapper.ts"
Cohesion: 0.27
Nodes (7): ProviderAssistantTurn, ProviderChatTurn, ProviderToolResultTurn, ChatCompletionMessageParam, mapAssistantTurn(), mapAssistantTurnToResponsesInput(), mapTurnsToResponsesInput()

### Community 105 - "PrismaService"
Cohesion: 0.04
Nodes (44): DeleteUserResult, DeleteUserUseCase, Inject, Injectable, CreateFeedbackUseCase, Inject, Injectable, agentKeySchema (+36 more)

### Community 110 - "should-include-redis-stack.ts"
Cohesion: 0.18
Nodes (12): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement() (+4 more)

### Community 111 - "auth.api.ts"
Cohesion: 0.05
Nodes (78): AcceptInvitePage(), metadata, tokenFromSearchParam(), geistMono, geistSans, metadata, ACCEPT_INVITE_DEMO_HINT, ACCEPT_INVITE_UNAUTHORIZED_HINT (+70 more)

### Community 112 - "openai-params-provider.mapper.ts"
Cohesion: 0.12
Nodes (24): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+16 more)

### Community 113 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 114 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 116 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 117 - "company-context.controller.ts"
Cohesion: 0.11
Nodes (19): toCompanyContext(), toPartialCompanyContext(), GetCompanyContextUseCase, Injectable, GetCompletenessUseCase, Inject, Injectable, PatchCompanyContextUseCase (+11 more)

### Community 119 - "AppMetricsService"
Cohesion: 0.09
Nodes (6): HttpMetricsMiddleware, Injectable, AppMetricsService, Inject, Injectable, HttpMethod

### Community 122 - "api/src/app.module.ts"
Cohesion: 0.05
Nodes (58): AuthModule, Module, CompanyContextModule, Module, ContentPipelineFacade, toOutcome(), Injectable, ContentRunExecutor (+50 more)

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
Cohesion: 0.30
Nodes (10): fetchGatewayAlive(), fetchHealthReady(), HealthCheck, HealthCheckStatus, HealthReadyAggregate, HealthReadyResponse, isGatewayAlive(), isRecord() (+2 more)

### Community 128 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.15
Nodes (16): EMBEDDING_BACKEND, VECTOR_STORE, RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiProperty, ApiPropertyOptional (+8 more)

### Community 131 - "openai-stream.mapper.ts"
Cohesion: 0.18
Nodes (20): fromGatewayToolCallDto(), OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty (+12 more)

## Knowledge Gaps
- **470 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+465 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1249 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ModelAlias` connect `ModelAlias` to `redis-vector-store.adapter.ts`, `app-metrics.service.ts`, `chat.service.ts`, `GatewayProviderType`, `wizard-orchestrator.service.ts`, `sentry-ai-metrics.adapter.ts`, `ChatRequestDto`, `semantic-cache.service.ts`, `ai-provider.interface.ts`, `app-metrics-backend.interface.ts`, `model-manager.service.ts`, `AppMetricsService`, `PrometheusAppMetricsAdapter`, `branded.types.ts`, `anthropic-messages.controller.ts`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `ModelAlias` to `asProviderInstanceId`, `chat.service.ts`, `logging.module.ts`, `ChatRequestDto`, `GatewayConfig`, `ai-provider.interface.ts`, `app-metrics-backend.interface.ts`, `GatewayKey`, `PrometheusAppMetricsAdapter`, `wizard-orchestrator.service.ts`, `LoggingService`, `sentry-ai-metrics.adapter.ts`, `branded.types.ts`, `exitWithAgentReport`, `anthropic-messages.controller.ts`, `app-metrics.service.ts`, `provider-instances.bootstrap.ts`, `model-manager.service.ts`, `configuration.ts`, `GatewayProviderType`, `AppMetricsService`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Why does `Env` connect `Env` to `auth.module.ts`, `RefreshSessionRepository`, `PublicConfigController`, `InMemoryRunSseHub`, `api/src/health/health.service.ts`, `save-output-edited.use-case.ts`, `llm-gateway.http.adapter.ts`, `AuthController`, `.execute`, `llm-hop.ts`, `prisma-invitation.adapter.ts`, `api/src/app.module.ts`, `RunRepository`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _470 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `auth.module.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.03911481300016332 - nodes in this community are weakly interconnected._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.056100981767180924 - nodes in this community are weakly interconnected._