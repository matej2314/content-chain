# Graph Report - content-chain  (2026-10-16)

## Corpus Check
- 704 files · ~241,707 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .css 1)

## Summary
- 4579 nodes · 14072 edges · 147 communities (130 shown, 16 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 419 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e25971be`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- DomainException
- social.types.ts
- company-context-form.tsx
- chat-completions.adapter.ts
- asProviderInstanceId
- start-run-form.tsx
- provider-error.mapper.ts
- LogContext
- AuthUserContext
- anthropic/anthropic-tools.mapper.ts
- ChatRequestDto
- EnvPatchService
- ConfigInitCommand
- cli.module.ts
- ChatMessageDto
- ChatParamsDto
- branded.types.ts
- app-metrics.service.ts
- archive-runs-view.tsx
- apiFetch
- Env
- GatewayKey
- auth.module.ts
- UserRepository
- redis-vector-store.adapter.ts
- feedback-form.tsx
- PrometheusAppMetricsAdapter
- wizard-orchestrator.service.ts
- LoggingService
- .getOne
- configuration.types.ts
- HealthService
- .constructor
- cache.module.ts
- AnthropicMessagesRequestDto
- google-tools.mapper.ts
- runs.types.ts
- enums.ts
- run-result-view.tsx
- parse-llm-json.ts
- sentry-ai-metrics.adapter.ts
- prisma-run.adapter.ts
- openai-models.controller.ts
- ids.ts
- semantic-cache.service.ts
- PageOutline
- save-output-edited.use-case.ts
- rate-run.use-case.ts
- swagger.setup.ts
- anthropic-response.mapper.ts
- ListRunsQueryDto
- ModelAlias
- RunRepository
- ai-provider-gateway/src/app.module.ts
- content.graph.ts
- FileManagerService
- prisma-invitation.adapter.ts
- domain/company-context.types.ts
- responses.adapter.ts
- provider-registry.service.ts
- metrics.ts
- exitWithAgentReport
- runs.controller.ts
- types/index.ts
- anthropic-models.controller.ts
- ModelEditCommand
- MetricsController
- RefreshSessionRepository
- OpenAiChatCompletionRequestDto
- start-run.use-case.ts
- InProcessRunWorker
- demo-mode-provider.tsx
- invitations.controller.ts
- configuration.ts
- InMemoryRunSseHub
- parse-verifier-log-message.ts
- company-context.mapper.ts
- api/src/health/health.service.ts
- ClientAddCommand
- llm-gateway.http.adapter.ts
- PrometheusService
- cn
- provider-instances.bootstrap.ts
- SPEC — README
- ChatResponseDto
- notify-product.tsx
- model-manager.service.ts
- company-context.dto.ts
- ClientRemoveCommand
- ModelAddCommand
- users.controller.ts
- invitations.api.ts
- anthropic-messages.controller.ts
- social.graph.ts
- CompanyContext
- StartRunDto
- ProviderEditCommand
- route.ts
- KeyGenerateCommand
- ChatToolingDto
- CompanyContextController
- configuration-validation.service.ts
- GatewayModelDto
- ProviderAddCommand
- openai-messages-provider.mapper.ts
- PrismaService
- api/src/main.ts
- guest.guard.ts
- .getOne
- HealthController
- should-include-redis-stack.ts
- users-view.tsx
- openai-params-provider.mapper.ts
- ModelRemoveCommand
- ProviderRemoveCommand
- HttpExceptionFilter
- EnvironmentVariables
- CompanyContextRepository
- .getOne
- HttpMetricsMiddleware
- CreateFeedbackDto
- page-document-body.tsx
- api/src/app.module.ts
- ConfigValidateCommand
- Architektura
- brand
- ClientEditCommand
- health.api.ts
- ai-provider-gateway/src/health/health.service.ts
- gateway-key.guard.branded-types.test-d.ts
- GatewayModelsCatalogService
- openai-stream.mapper.ts
- HitlDto
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
- PatchRunRatingDto
- ParseRunIdPipe
- RunsModule

## God Nodes (most connected - your core abstractions)
1. `ModelAlias` - 88 edges
2. `DomainException` - 83 edges
3. `ProviderInstanceId` - 81 edges
4. `LoggingService` - 73 edges
5. `asProviderInstanceId()` - 67 edges
6. `isRecord()` - 66 edges
7. `GatewayConfig` - 65 edges
8. `cn()` - 65 edges
9. `GatewayKey` - 59 edges
10. `Env` - 59 edges

## Surprising Connections (you probably didn't know these)
- `mapGatewayResponseToAnthropicFormat()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/anthropic/mappers/anthropic-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `RedisConnectionService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-connection.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `CacheRegistryService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/cache-registry.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `parseKnnHits()` --calls--> `isUnservableCachedReply()`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/semantic/parse-knn-hits.ts → apps/ai-provider-gateway/src/cache/helpers/is-unservable-cached-reply.ts

## Import Cycles
- None detected.

## Communities (147 total, 16 thin omitted)

### Community 0 - "DomainException"
Cohesion: 0.08
Nodes (43): AcceptInviteResult, acceptInviteSchema, ActivateAccountOutput, comparePassword(), generateRefreshToken(), hashPassword(), hashRefreshToken(), parseTtlMs() (+35 more)

### Community 1 - "social.types.ts"
Cohesion: 0.06
Nodes (26): CompositeRunResultReader, GetRunOutput, RunResultReader, SocialBrief, EmptyRunResultReader, Injectable, SocialResultStore, PipelineState (+18 more)

### Community 2 - "company-context-form.tsx"
Cohesion: 0.04
Nodes (91): metadata, fetchCompleteness(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras, companyContextForPut() (+83 more)

### Community 3 - "chat-completions.adapter.ts"
Cohesion: 0.21
Nodes (19): toHttpException(), asSystemFingerprint(), ChatCompletionsAdapterOptions, createChatCompletionsAdapter(), textStream(), mapTurnsToOpenAiMessages(), accumulateOpenAiStreamToolCallDeltas(), extractOpenAiStreamDeltaText() (+11 more)

### Community 4 - "asProviderInstanceId"
Cohesion: 0.12
Nodes (27): DEFAULT_MODELS, InitAnswers, ProviderPromptResult, ProviderPromptService, Injectable, EditProviderInput, validateProviderApiKey(), countActiveModelsAfterProviderChange() (+19 more)

### Community 5 - "start-run-form.tsx"
Cohesion: 0.09
Nodes (35): metadata, fetchCompanyContext(), GuestLimitModal(), GUEST_ALLOWED_TASK_TYPES, GUEST_CONTACTS, GUEST_QUOTA_CODES, GuestAllowedTaskType, GuestContact (+27 more)

### Community 6 - "provider-error.mapper.ts"
Cohesion: 0.21
Nodes (19): MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isRateLimitStatus(), isServerError(), isTimeoutStatus(), nameLooksLikeTimeout() (+11 more)

### Community 7 - "LogContext"
Cohesion: 0.07
Nodes (25): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+17 more)

### Community 8 - "AuthUserContext"
Cohesion: 0.10
Nodes (25): Body, HttpCode, Post, orderItemsBySelectedIds(), computeReviewExpiresAt(), isTerminalStatus(), RunsController, ApiCookieAuth (+17 more)

### Community 9 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.11
Nodes (34): ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent(), isAnthropicEffortLevel(), mapThinkingBudgetToAnthropicEffort(), mapThinkingToAnthropic(), resolveAnthropicOutputConfig(), ContentBlockParam (+26 more)

### Community 10 - "ChatRequestDto"
Cohesion: 0.06
Nodes (38): ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsObject, IsOptional (+30 more)

### Community 11 - "EnvPatchService"
Cohesion: 0.06
Nodes (17): PendingSecretsItem, ConfigSecretsStatusCommand, Command, Option, ClientManagerService, Injectable, ConfigPersistenceService, normalizeGatewayConfigForWrite() (+9 more)

### Community 12 - "ConfigInitCommand"
Cohesion: 0.31
Nodes (3): ConfigInitCommand, Command, Option

### Community 13 - "cli.module.ts"
Cohesion: 0.05
Nodes (69): AgentReport, AgentReportStatus, emitAgentReport(), exitCodeForReport(), loadAnswers(), collectPendingSecrets(), assertAgentHasAnswers(), CliMode (+61 more)

### Community 14 - "ChatMessageDto"
Cohesion: 0.08
Nodes (27): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+19 more)

### Community 15 - "ChatParamsDto"
Cohesion: 0.12
Nodes (17): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+9 more)

### Community 16 - "branded.types.ts"
Cohesion: 0.07
Nodes (63): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, SemanticStoreEmbedState, CachedChatResponse, CachedChatWarning, CachedFinishReason, CacheIdentityMessage (+55 more)

### Community 17 - "app-metrics.service.ts"
Cohesion: 0.14
Nodes (15): healthStatusToGaugeValue(), APP_METRICS_BACKEND, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus, HttpMethod (+7 more)

### Community 18 - "archive-runs-view.tsx"
Cohesion: 0.07
Nodes (43): metadata, metadata, metadata, useSession(), useGuestLocked(), CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS (+35 more)

### Community 19 - "apiFetch"
Cohesion: 0.06
Nodes (46): geistMono, geistSans, metadata, ACTIVATION_FAILED_HINT, activateAccount(), Credentials, fetchBootstrapStatus(), fetchUserSession() (+38 more)

### Community 20 - "Env"
Cohesion: 0.05
Nodes (57): AuthController, ApiCookieAuth, ApiTags, Body, Controller, Get, HttpCode, Patch (+49 more)

### Community 21 - "GatewayKey"
Cohesion: 0.10
Nodes (21): ChatService, Injectable, isCachedChatAllowedForModelAlias(), toChatCacheIdentity(), isToolingRequest(), ChatCachePipelineService, Injectable, ChatErrorHandlerService (+13 more)

### Community 22 - "auth.module.ts"
Cohesion: 0.09
Nodes (26): RESEND_ACTIVATION_RATE_LIMITER, ResendActivationOutput, ResendActivationUseCase, SUCCESS, Inject, Injectable, ResendInvitationUseCase, Inject (+18 more)

### Community 23 - "UserRepository"
Cohesion: 0.06
Nodes (20): Inject, Inject, AccountActivationRecord, AccountActivationRepository, CreatePendingUser, RotateActivationTokenInput, AuthUser, CreateAdminIfNoneData (+12 more)

### Community 24 - "redis-vector-store.adapter.ts"
Cohesion: 0.06
Nodes (29): RedisConnectionService, Injectable, RedisVectorStoreAdapter, Injectable, EmbeddingCircuitBreaker, escapeRedisSearchTag(), normalizeEmbeddingModelForIndex(), semanticIndexName() (+21 more)

### Community 25 - "feedback-form.tsx"
Cohesion: 0.16
Nodes (18): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, filterFeedbackRunOptions(), CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody() (+10 more)

### Community 26 - "PrometheusAppMetricsAdapter"
Cohesion: 0.09
Nodes (7): PrometheusAppMetricsAdapter, Injectable, resolveAppMetricsBackend(), AppProviderCallContext, AppProviderStreamScope, AppRequestLabels, AppTokenUsage

### Community 27 - "wizard-orchestrator.service.ts"
Cohesion: 0.06
Nodes (75): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, assertInteractiveAllowed(), WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep (+67 more)

### Community 28 - "LoggingService"
Cohesion: 0.08
Nodes (13): Inject, Inject, ChatProviderCooldownService, Injectable, StreamCacheReplayService, Injectable, GatewayModelConfig, LoggingService (+5 more)

### Community 29 - ".getOne"
Cohesion: 0.19
Nodes (11): ApiGatewayModelsErrorResponses(), ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+3 more)

### Community 30 - "configuration.types.ts"
Cohesion: 0.07
Nodes (34): ChatModule, Module, resolveClientIdFromKey(), ResolvedGatewayClient, getAppConfig(), GatewayKeyGuard, Injectable, enrichRequestWithClientId() (+26 more)

### Community 31 - "HealthService"
Cohesion: 0.15
Nodes (6): HealthReadinessResponseDto, ApiProperty, HealthService, Inject, Injectable, Optional

### Community 32 - ".constructor"
Cohesion: 0.06
Nodes (22): AcceptInviteUseCase, Inject, Injectable, ActivateAccountUseCase, Inject, Injectable, BootstrapStatusUseCase, Inject (+14 more)

### Community 33 - "cache.module.ts"
Cohesion: 0.10
Nodes (17): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+9 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "google-tools.mapper.ts"
Cohesion: 0.17
Nodes (21): buildGenerationConfig(), createGoogleProvider(), getFinalToolCalls(), getStopReason(), textStream(), mapStopSequences(), mapThinkingBudgetToGeminiLevel(), extractFromLegacyFields() (+13 more)

### Community 36 - "runs.types.ts"
Cohesion: 0.05
Nodes (92): ArchiveRunsQuery, fetchRunLogs(), fetchUserRuns(), InitiatorOption, isUserRating(), patchRunRating(), HitlAccepted, isPageOutlineSectionRole() (+84 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "run-result-view.tsx"
Cohesion: 0.04
Nodes (68): buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload() (+60 more)

### Community 40 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.10
Nodes (28): CostUsd, ToolCallId, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext() (+20 more)

### Community 41 - "prisma-run.adapter.ts"
Cohesion: 0.07
Nodes (19): LightRunItem, ListRunsResult, RunSnapshot, RunLogEntry, RunRecordBase, ALLOWED_RUN_STATES, assertTransition(), CANCELABLE_RUN_STATUSES (+11 more)

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.21
Nodes (12): ApiOpenAiErrorResponses(), ANTHROPIC_INTEGRATION_PATH, OPENAI_INTEGRATION_PATH, OpenAiErrorBodyDto, OpenAiErrorResponseDto, ApiProperty, ApiPropertyOptional, OpenAiModelDto (+4 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (23): ACCOUNT_ACTIVATION_ID_RE, AccountActivationId, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createRunId() (+15 more)

### Community 44 - "semantic-cache.service.ts"
Cohesion: 0.09
Nodes (25): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), isUnservableCachedReply(), ResponseCacheService, Injectable, parseCachedChatResponse(), OllamaEmbeddingAdapter (+17 more)

### Community 45 - "PageOutline"
Cohesion: 0.10
Nodes (11): ContentPipelineState, PageOutline, PrismaContentResultAdapter, toContentPipelinePhase(), Injectable, OutputEditedWrite, OutputEditedWriter, applyWrite() (+3 more)

### Community 46 - "save-output-edited.use-case.ts"
Cohesion: 0.08
Nodes (36): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+28 more)

### Community 47 - "rate-run.use-case.ts"
Cohesion: 0.08
Nodes (22): GUEST_TASK_TYPES, GuestRunAdmit, isGuestTaskType(), ratingSchema, assertRunReviewable(), ReviewWindowParams, GUEST_QUOTA, GuestQuotaAdmitResult (+14 more)

### Community 48 - "swagger.setup.ts"
Cohesion: 0.10
Nodes (21): AppModule, Module, ChatUsageDto, ApiPropertyOptional, SseDeltaPayloadDto, ApiProperty, bootstrap(), API_GLOBAL_PREFIX (+13 more)

### Community 49 - "anthropic-response.mapper.ts"
Cohesion: 0.13
Nodes (25): SseDoneEvent, asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto, AnthropicTextContentBlockDto (+17 more)

### Community 50 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+2 more)

### Community 51 - "ModelAlias"
Cohesion: 0.06
Nodes (9): ProviderTestOptions, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, AppMetricsService, Inject, Injectable (+1 more)

### Community 52 - "RunRepository"
Cohesion: 0.06
Nodes (10): Inject, Inject, Inject, Inject, Inject, Inject, Inject, Inject (+2 more)

### Community 53 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.08
Nodes (21): CacheModule, Module, HealthModule, Module, IntegrationsModule, Module, AiMetricsModule, Global (+13 more)

### Community 54 - "content.graph.ts"
Cohesion: 0.08
Nodes (45): Inject, coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema, pageOutlineSectionSchema (+37 more)

### Community 55 - "FileManagerService"
Cohesion: 0.14
Nodes (9): WizardState, ConfigGeneratorService, Injectable, FileManagerService, Injectable, Injectable, WizardOrchestratorService, Injectable (+1 more)

### Community 56 - "prisma-invitation.adapter.ts"
Cohesion: 0.14
Nodes (18): InvitationListItem, AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, INVITATION_REPOSITORY, InvitationListRecord, InvitationPurpose (+10 more)

### Community 57 - "domain/company-context.types.ts"
Cohesion: 0.15
Nodes (21): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CompanyContextWriteDetail (+13 more)

### Community 58 - "responses.adapter.ts"
Cohesion: 0.22
Nodes (19): asInputTokens(), asOutputTokens(), asToolCallId(), getUsageMetadata(), getUsageMetadata(), buildResponsesCreateParams(), createResponsesAdapter(), textStream() (+11 more)

### Community 59 - "provider-registry.service.ts"
Cohesion: 0.10
Nodes (26): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+18 more)

### Community 60 - "metrics.ts"
Cohesion: 0.11
Nodes (25): getClientConversationId(), getOrCreateConversationIdForResponse(), buildAppProviderMetricsContext(), buildLlmMetricsContext(), mapProviderResponseToAiObservation(), mapProviderResponseToUsage(), toMetricsMessages(), buildProviderInputForAlias() (+17 more)

### Community 61 - "exitWithAgentReport"
Cohesion: 0.18
Nodes (7): exitWithAgentReport(), resolveCliMode(), ProviderTestCommand, Command, Option, ProviderTestService, Injectable

### Community 62 - "runs.controller.ts"
Cohesion: 0.07
Nodes (50): AutoFinalizeExpiredReviewsUseCase, Injectable, CancelRunUseCase, Inject, Injectable, FinalizeReviewUseCase, Injectable, GetRunLogsOutput (+42 more)

### Community 63 - "types/index.ts"
Cohesion: 0.11
Nodes (28): GlobalExceptionFilter, isPayloadTooLargeError(), Catch, Injectable, RequestIdMiddleware, Injectable, CONVERSATION_ID_PATTERN, createRequestId() (+20 more)

### Community 64 - "anthropic-models.controller.ts"
Cohesion: 0.28
Nodes (10): ApiAnthropicErrorResponses(), AnthropicErrorBodyDto, AnthropicErrorResponseDto, ApiProperty, AnthropicModelDto, AnthropicModelsListResponseDto, ApiProperty, mapGatewayModelsListToAnthropic() (+2 more)

### Community 65 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 66 - "MetricsController"
Cohesion: 0.18
Nodes (7): MetricsController, ApiOperation, ApiResponse, ApiTags, Controller, Get, Header

### Community 67 - "RefreshSessionRepository"
Cohesion: 0.10
Nodes (11): BootstrapAdminUseCase, Inject, Injectable, LoginUseCase, Inject, Injectable, RefreshSessionRecord, RefreshSessionRepository (+3 more)

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.07
Nodes (31): IsStringOrArrayOfStrings(), OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray (+23 more)

### Community 69 - "start-run.use-case.ts"
Cohesion: 0.11
Nodes (23): contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, socialBriefSchema (+15 more)

### Community 70 - "InProcessRunWorker"
Cohesion: 0.11
Nodes (5): InProcessRunWorker, Injectable, Inject, StubRunExecutor, Injectable

### Community 71 - "demo-mode-provider.tsx"
Cohesion: 0.22
Nodes (10): fetchAppConfig(), AppConfig, parseAppConfig(), DemoChip(), DemoModeContext, DemoModeContextValue, DemoModeProvider(), DemoModeState (+2 more)

### Community 72 - "invitations.controller.ts"
Cohesion: 0.08
Nodes (22): InviteUserUseCase, Inject, Injectable, ListInvitationsUseCase, Inject, Injectable, RevokeInvitationUseCase, Inject (+14 more)

### Community 73 - "configuration.ts"
Cohesion: 0.14
Nodes (21): asCacheTtlSeconds(), asSemanticCacheTtlSeconds(), AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig, SemanticCacheRuntimeConfig, buildAppConfiguration() (+13 more)

### Community 74 - "InMemoryRunSseHub"
Cohesion: 0.27
Nodes (4): RunSseEvent, InMemoryRunSseHub, Inject, Injectable

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "company-context.mapper.ts"
Cohesion: 0.10
Nodes (15): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+7 more)

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
Cohesion: 0.05
Nodes (50): FeedbackCta(), AppHeader(), AppHeaderProps, AppSidebar(), AppSidebarProps, CompletenessChipSlot(), FeedbackCtaSlot(), FloatingBoxSlot() (+42 more)

### Community 82 - "provider-instances.bootstrap.ts"
Cohesion: 0.22
Nodes (12): GatewayProviderInstanceConfig, assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryFn (+4 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "ChatResponseDto"
Cohesion: 0.22
Nodes (8): ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString

### Community 85 - "notify-product.tsx"
Cohesion: 0.17
Nodes (15): assertNever(), notifyProduct(), notifyRunCancelled(), notifyRunTerminal(), EnvelopeRef, ProductToast, RunTerminalInput, RunTerminalOutcome (+7 more)

### Community 86 - "model-manager.service.ts"
Cohesion: 0.11
Nodes (28): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, convertModel(), defaultModelPolicy(), ModelEditField, ModelManagerService (+20 more)

### Community 87 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 88 - "ClientRemoveCommand"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

### Community 89 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 90 - "users.controller.ts"
Cohesion: 0.10
Nodes (18): ListUsersUseCase, Inject, Injectable, PatchUserDto, ApiProperty, IsBoolean, ApiCookieAuth, ApiTags (+10 more)

### Community 91 - "invitations.api.ts"
Cohesion: 0.23
Nodes (14): createInvitation(), fetchInvitations(), resendInvitation(), revokeInvitation(), InvitationListItem, InviteCreated, isInvitationExpired(), parseInvitationList() (+6 more)

### Community 92 - "anthropic-messages.controller.ts"
Cohesion: 0.04
Nodes (60): ApiHeader, GATEWAY_CACHE_HEADER, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags (+52 more)

### Community 93 - "social.graph.ts"
Cohesion: 0.12
Nodes (34): hopErrorLogMessage(), throwIfAborted(), coercePassNoteVerdict(), isPassOnlyIssue(), ideasOutputSchema, reelIdeasOutputSchema, isReelTaskType(), ReelTaskType (+26 more)

### Community 94 - "CompanyContext"
Cohesion: 0.18
Nodes (8): assertAudienceProfileNamesUnique(), CompanyContext, normalizeAudienceName(), withEffectiveAudience(), jsonArray(), jsonRecord(), PrismaCompanyContextAdapter, Injectable

### Community 95 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 96 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 98 - "KeyGenerateCommand"
Cohesion: 0.33
Nodes (3): KeyGenerateCommand, Command, Option

### Community 99 - "ChatToolingDto"
Cohesion: 0.16
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 100 - "CompanyContextController"
Cohesion: 0.22
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 101 - "configuration-validation.service.ts"
Cohesion: 0.14
Nodes (18): collectInactiveProviderWarnings(), formatZodIssues(), validateGatewayConfig(), ValidationOptions, buildEffectiveGatewayConfig(), assertEnabledProviderSecretsPresent(), assertMasterKeyPresent(), configurationValidation (+10 more)

### Community 102 - "GatewayModelDto"
Cohesion: 0.36
Nodes (6): GatewayModelCapabilitiesDto, GatewayModelDto, ApiProperty, ApiPropertyOptional, ModelsListResponseDto, ApiProperty

### Community 103 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 104 - "openai-messages-provider.mapper.ts"
Cohesion: 0.28
Nodes (6): ProviderAssistantTurn, ProviderToolResultTurn, ChatCompletionMessageParam, mapAssistantTurn(), mapAssistantTurnToResponsesInput(), mapTurnsToResponsesInput()

### Community 105 - "PrismaService"
Cohesion: 0.04
Nodes (44): DeleteUserResult, DeleteUserUseCase, Inject, Injectable, CreateFeedbackUseCase, Inject, Injectable, agentKeySchema (+36 more)

### Community 106 - "api/src/main.ts"
Cohesion: 0.33
Nodes (6): AppModule, Module, bootstrap(), parseCorsOrigins(), configureHttpApp(), buildSwaggerConfig()

### Community 107 - "guest.guard.ts"
Cohesion: 0.17
Nodes (7): ALLOW_GUEST_KEY, IS_PUBLIC_KEY, GuestGuard, Inject, Injectable, JwtAuthGuard, Injectable

### Community 108 - ".getOne"
Cohesion: 0.19
Nodes (10): AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+2 more)

### Community 109 - "HealthController"
Cohesion: 0.31
Nodes (6): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get

### Community 110 - "should-include-redis-stack.ts"
Cohesion: 0.18
Nodes (12): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement() (+4 more)

### Community 111 - "users-view.tsx"
Cohesion: 0.05
Nodes (80): AcceptInvitePage(), metadata, tokenFromSearchParam(), ACCEPT_INVITE_DEMO_HINT, ACCEPT_INVITE_UNAUTHORIZED_HINT, AcceptInviteFormError, toAcceptInviteFormError(), acceptInvite() (+72 more)

### Community 112 - "openai-params-provider.mapper.ts"
Cohesion: 0.12
Nodes (24): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+16 more)

### Community 113 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 114 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 115 - "HttpExceptionFilter"
Cohesion: 0.20
Nodes (6): ErrorEnvelope, HttpExceptionFilter, Catch, newRequestId(), RequestIdMiddleware, Injectable

### Community 116 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 117 - "CompanyContextRepository"
Cohesion: 0.15
Nodes (19): toPublicCompanyContext(), GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PatchCompanyContextUseCase (+11 more)

### Community 118 - ".getOne"
Cohesion: 0.19
Nodes (10): OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+2 more)

### Community 120 - "CreateFeedbackDto"
Cohesion: 0.33
Nodes (6): CreateFeedbackDto, IsIn, IsOptional, IsString, MaxLength, MinLength

### Community 121 - "page-document-body.tsx"
Cohesion: 0.47
Nodes (5): MdBlock, PageDocumentBody(), PageDocumentBodyProps, parseMarkdownBlocks(), renderInline()

### Community 122 - "api/src/app.module.ts"
Cohesion: 0.05
Nodes (57): AuthModule, Module, CompanyContextModule, Module, ContentPipelineFacade, toOutcome(), Injectable, ContentRunExecutor (+49 more)

### Community 123 - "ConfigValidateCommand"
Cohesion: 0.50
Nodes (3): ConfigValidateCommand, Command, Option

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

### Community 128 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.13
Nodes (17): EMBEDDING_BACKEND, VECTOR_STORE, RedisConsumer, HealthCheckItemDto, ApiProperty, HealthLivenessResponseDto, ApiProperty, HealthReadinessChecksDto (+9 more)

### Community 131 - "openai-stream.mapper.ts"
Cohesion: 0.18
Nodes (20): fromGatewayToolCallDto(), OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty (+12 more)

### Community 132 - "HitlDto"
Cohesion: 0.50
Nodes (3): HitlDto, IsArray, IsString

### Community 144 - "PatchRunRatingDto"
Cohesion: 0.50
Nodes (3): PatchRunRatingDto, IsIn, ValidateIf

## Knowledge Gaps
- **468 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+463 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1247 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ModelAlias` connect `ModelAlias` to `wizard-orchestrator.service.ts`, `sentry-ai-metrics.adapter.ts`, `ChatRequestDto`, `semantic-cache.service.ts`, `cli.module.ts`, `branded.types.ts`, `app-metrics.service.ts`, `GatewayKey`, `model-manager.service.ts`, `PrometheusAppMetricsAdapter`, `provider-registry.service.ts`, `metrics.ts`, `configuration.types.ts`, `types/index.ts`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `ModelAlias` to `asProviderInstanceId`, `LogContext`, `ChatRequestDto`, `EnvPatchService`, `cli.module.ts`, `branded.types.ts`, `app-metrics.service.ts`, `GatewayKey`, `PrometheusAppMetricsAdapter`, `wizard-orchestrator.service.ts`, `configuration.types.ts`, `sentry-ai-metrics.adapter.ts`, `provider-registry.service.ts`, `metrics.ts`, `exitWithAgentReport`, `types/index.ts`, `configuration.ts`, `model-manager.service.ts`, `configuration-validation.service.ts`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Why does `LoggingService` connect `LoggingService` to `ai-provider-gateway/src/health/health.service.ts`, `cache.module.ts`, `google-tools.mapper.ts`, `chat-completions.adapter.ts`, `LogContext`, `anthropic/anthropic-tools.mapper.ts`, `ChatRequestDto`, `semantic-cache.service.ts`, `branded.types.ts`, `swagger.setup.ts`, `provider-instances.bootstrap.ts`, `GatewayKey`, `redis-vector-store.adapter.ts`, `responses.adapter.ts`, `provider-registry.service.ts`, `HealthService`, `configuration.types.ts`, `types/index.ts`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _468 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `DomainException` be split into smaller, more focused modules?**
  _Cohesion score 0.08168147641831852 - nodes in this community are weakly interconnected._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.057967313585291114 - nodes in this community are weakly interconnected._