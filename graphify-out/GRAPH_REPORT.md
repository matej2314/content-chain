# Graph Report - content-chain  (2026-10-17)

## Corpus Check
- 707 files · ~247,137 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .css 1)

## Summary
- 4718 nodes · 15370 edges · 137 communities (120 shown, 17 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 421 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f4e5cee1`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- DomainException
- SocialResultStore
- isRecord
- responses.adapter.ts
- branded.types.ts
- chat.service.ts
- provider-error.mapper.ts
- logging.module.ts
- AuthUserContext
- anthropic/anthropic-tools.mapper.ts
- run-review-panel.tsx
- GatewayConfig
- archive-runs-view.tsx
- cli.module.ts
- ChatMessageDto
- ChatParamsDto
- ai-provider.interface.ts
- app-metrics-backend.interface.ts
- exitWithAgentReport
- dashboard-shell.tsx
- AuthController
- api-error.code.ts
- semantic-cache.constants.ts
- UserRepository
- redis-vector-store.adapter.ts
- feedback-form.tsx
- PrometheusAppMetricsAdapter
- gateway-config.schema.ts
- LoggingService
- asProviderInstanceId
- anthropic-messages.controller.ts
- HealthService
- chat-completions.adapter.ts
- cache.module.ts
- AnthropicMessagesRequestDto
- google-tools.mapper.ts
- runs.types.ts
- enums.ts
- runs-result.types.ts
- RedisConnectionService
- sentry-ai-metrics.adapter.ts
- run.schemas.ts
- openai-models.controller.ts
- ids.ts
- semantic-cache.service.ts
- ai-provider-gateway/src/app.module.ts
- save-output-edited.use-case.ts
- packages_shared_dist_index
- swagger.setup.ts
- anthropic-response.mapper.ts
- ListRunsQueryDto
- ModelAlias
- GatewayKey
- VectorStore
- llm-hop.ts
- config-generator.service.ts
- ref_nestjs_common
- start-run-form.tsx
- cancel-run-dialog.tsx
- resilient-executor.ts
- metrics.ts
- ref_nestjs_swagger
- get-run.use-case.ts
- openai-chat-completions.controller.ts
- anthropic-models.controller.ts
- ModelEditCommand
- MetricsController
- RefreshSessionRepository
- OpenAiChatCompletionRequestDto
- http/http-exception.filter.ts
- health.api.ts
- prisma-invitation.adapter.ts
- PrismaService
- api/src/app.module.ts
- InMemoryRunSseHub
- parse-verifier-log-message.ts
- transactional-mailer.port.ts
- api/src/health/health.service.ts
- ClientAddCommand
- llm-gateway.http.adapter.ts
- PrometheusService
- cn
- provider-instances.bootstrap.ts
- SPEC — README
- HealthController
- users-view.tsx
- model-manager.service.ts
- company-context.controller.ts
- ProviderRemoveCommand
- ModelAddCommand
- api/src/main.ts
- AppMetricsBackend
- AnthropicContentBlockDto
- social.types.ts
- guest.guard.ts
- StartRunDto
- ConfigInitCommand
- route.ts
- KeyGenerateCommand
- ChatToolingDto
- ClientEditCommand
- configuration.ts
- models.controller.ts
- ProviderAddCommand
- BootstrapAdminDto
- LoginDto
- RegisterUserDto
- AcceptInviteDto
- ActivateAccountDto
- app-metrics.service.ts
- should-include-redis-stack.ts
- ref_react
- openai-params-provider.mapper.ts
- ClientRemoveCommand
- ModelRemoveCommand
- ProviderEditCommand
- EnvironmentVariables
- domain/company-context.types.ts
- JwtAuthGuard
- HttpMetricsMiddleware
- RolesGuard
- HttpExceptionFilter
- RunRepository
- Architektura
- brand.ts
- ai-provider-gateway/src/health/health.controller.ts
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
9. `AuthUserContext` - 62 edges
10. `GatewayKey` - 59 edges

## Surprising Connections (you probably didn't know these)
- `mapChatResponseToOpenAi()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/openai/mappers/openai-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `Request` --references--> `AuthUserContext`  [EXTRACTED]
  apps/api/src/shared/http/express.d.ts → apps/api/src/shared/types/auth-user-context.ts
- `RedisCacheAdapter` --implements--> `CacheBackend`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/cache/interfaces/cache-backend-interface.ts
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `RedisConnectionService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-connection.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (137 total, 17 thin omitted)

### Community 0 - "DomainException"
Cohesion: 0.05
Nodes (79): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Inject, Injectable, ActivateAccountOutput, ActivateAccountUseCase, Injectable (+71 more)

### Community 1 - "SocialResultStore"
Cohesion: 0.04
Nodes (29): ContentPipelineState, PageDocument, PageOutline, PrismaContentResultAdapter, toContentPipelinePhase(), Injectable, CompositeRunResultReader, RUN_RESULT_READER (+21 more)

### Community 2 - "isRecord"
Cohesion: 0.06
Nodes (72): metadata, putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras, companyContextForPut(), CompanyContextObjection (+64 more)

### Community 3 - "responses.adapter.ts"
Cohesion: 0.22
Nodes (18): asToolCallId(), buildResponsesCreateParams(), createResponsesAdapter(), textStream(), mapGatewayMetadataToOpenAi(), mapAssistantTurnToResponsesInput(), mapTurnsToResponsesInput(), extractResponsesToolCalls() (+10 more)

### Community 4 - "branded.types.ts"
Cohesion: 0.08
Nodes (46): CliAiModel, CliAiProvider, CliRateLimit, GatewayClient, ProviderTestService, Injectable, ClientCli, ProviderCli (+38 more)

### Community 5 - "chat.service.ts"
Cohesion: 0.07
Nodes (45): SemanticStoreEmbedState, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize (+37 more)

### Community 6 - "provider-error.mapper.ts"
Cohesion: 0.24
Nodes (17): MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isRateLimitStatus(), isServerError(), isTimeoutStatus(), nameLooksLikeTimeout() (+9 more)

### Community 7 - "logging.module.ts"
Cohesion: 0.06
Nodes (25): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+17 more)

### Community 8 - "AuthUserContext"
Cohesion: 0.04
Nodes (60): Body, HttpCode, Post, CreateFeedbackDto, IsIn, IsOptional, IsString, MaxLength (+52 more)

### Community 9 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.09
Nodes (47): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, mapProviderResponseToAiObservation(), toCachedChatResponse(), toHttpException(), asInputTokens(), asOutputTokens() (+39 more)

### Community 10 - "run-review-panel.tsx"
Cohesion: 0.09
Nodes (28): canEditResult(), finalizeRunReview(), isUserRating(), patchRunRating(), saveOutputEdited(), UserRating, isReviewableRunStatus(), RunSnapshot (+20 more)

### Community 11 - "GatewayConfig"
Cohesion: 0.06
Nodes (20): PendingSecretsItem, ClientManagerService, Injectable, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable, EnvPatchService, Injectable (+12 more)

### Community 12 - "archive-runs-view.tsx"
Cohesion: 0.05
Nodes (56): metadata, metadata, useSession(), DemoChip(), useDemoMode(), useGuestLocked(), FeedbackCta(), CONTENT_KIND_LABELS (+48 more)

### Community 13 - "cli.module.ts"
Cohesion: 0.06
Nodes (65): AgentReport, AgentReportStatus, loadAnswers(), assertAgentHasAnswers(), CliMode, CliModeFlags, markAgentRuntime(), CliModule (+57 more)

### Community 14 - "ChatMessageDto"
Cohesion: 0.07
Nodes (33): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+25 more)

### Community 15 - "ChatParamsDto"
Cohesion: 0.12
Nodes (16): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+8 more)

### Community 16 - "ai-provider.interface.ts"
Cohesion: 0.10
Nodes (44): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatCacheSource, GATEWAY_CACHE_HEADER, ChatResponseData, SseMetaPayload, SseMetaPayloadDto (+36 more)

### Community 17 - "app-metrics-backend.interface.ts"
Cohesion: 0.15
Nodes (12): healthStatusToGaugeValue(), AppRequestLabels, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus, HttpMethod (+4 more)

### Community 18 - "exitWithAgentReport"
Cohesion: 0.12
Nodes (15): emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), resolveCliMode(), toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList() (+7 more)

### Community 19 - "dashboard-shell.tsx"
Cohesion: 0.09
Nodes (31): fetchCompleteness(), CompletenessState, GATE_SECTION_LABELS, CompletenessChip(), CompletenessContext, CompletenessContextValue, CompletenessProvider(), FALLBACK_ENVELOPE (+23 more)

### Community 20 - "AuthController"
Cohesion: 0.10
Nodes (24): AuthController, ApiCookieAuth, ApiTags, Body, Controller, Get, HttpCode, Patch (+16 more)

### Community 21 - "api-error.code.ts"
Cohesion: 0.10
Nodes (21): ApiErrorCode, DEFAULT_HTTP_STATUS_TO_CODE, ApiErrorPayload, GlobalExceptionFilter, isPayloadTooLargeError(), PayloadTooLargeError, RequestWithId, Catch (+13 more)

### Community 22 - "semantic-cache.constants.ts"
Cohesion: 0.12
Nodes (13): EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema(), EMBEDDING_CIRCUIT_COOLDOWN_MS, EMBEDDING_CIRCUIT_OPEN_AFTER, EMBEDDING_PROBE_TIMEOUT_MS (+5 more)

### Community 23 - "UserRepository"
Cohesion: 0.05
Nodes (26): Inject, Inject, Inject, Inject, Inject, Inject, Inject, AccountActivationRecord (+18 more)

### Community 24 - "redis-vector-store.adapter.ts"
Cohesion: 0.14
Nodes (20): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), asString(), ParsedKnnHits, parseKnnHits() (+12 more)

### Community 25 - "feedback-form.tsx"
Cohesion: 0.12
Nodes (25): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, filterFeedbackRunOptions(), CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody() (+17 more)

### Community 26 - "PrometheusAppMetricsAdapter"
Cohesion: 0.11
Nodes (6): PrometheusAppMetricsAdapter, Injectable, resolveAppMetricsBackend(), AppProviderCallContext, AppProviderStreamScope, AppTokenUsage

### Community 27 - "gateway-config.schema.ts"
Cohesion: 0.11
Nodes (36): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, assertInteractiveAllowed(), CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema (+28 more)

### Community 28 - "LoggingService"
Cohesion: 0.07
Nodes (17): Inject, OllamaEmbeddingAdapter, Injectable, Inject, ChatProviderCooldownService, Injectable, StreamCacheReplayService, Injectable (+9 more)

### Community 29 - "asProviderInstanceId"
Cohesion: 0.07
Nodes (52): collectPendingSecrets(), DEFAULT_MODELS, InitAnswers, convertModel(), convertProvider(), ClientPromptService, Injectable, KeyPromptService (+44 more)

### Community 30 - "anthropic-messages.controller.ts"
Cohesion: 0.04
Nodes (58): ApiHeader, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags, Body (+50 more)

### Community 31 - "HealthService"
Cohesion: 0.17
Nodes (6): HealthReadinessResponseDto, ApiProperty, HealthService, Inject, Injectable, Optional

### Community 32 - "chat-completions.adapter.ts"
Cohesion: 0.20
Nodes (19): asSystemFingerprint(), ChatCompletionsAdapterOptions, createChatCompletionsAdapter(), textStream(), mapAssistantTurn(), mapTurnsToOpenAiMessages(), accumulateOpenAiStreamToolCallDeltas(), extractOpenAiStreamDeltaText() (+11 more)

### Community 33 - "cache.module.ts"
Cohesion: 0.10
Nodes (17): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheModule, Module, CacheModule, CacheModuleOptions (+9 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.13
Nodes (19): AnthropicMessagesRequestDto, AnthropicThinkingDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+11 more)

### Community 35 - "google-tools.mapper.ts"
Cohesion: 0.15
Nodes (24): buildGenerationConfig(), createGoogleProvider(), getFinalToolCalls(), getStopReason(), textStream(), mapStopSequences(), mapThinkingBudgetToGeminiLevel(), extractFromLegacyFields() (+16 more)

### Community 36 - "runs.types.ts"
Cohesion: 0.05
Nodes (62): ArchiveRunsQuery, fetchRunLogs(), fetchUserRuns(), HitlAccepted, parseNullableIso(), parseReviewFields(), RunHitl, RunReviewFields (+54 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (21): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+13 more)

### Community 38 - "runs-result.types.ts"
Cohesion: 0.04
Nodes (66): buildOutputEditedBody(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload(), RESULT_KEYS_BY_TASK_TYPE (+58 more)

### Community 39 - "RedisConnectionService"
Cohesion: 0.19
Nodes (5): RedisCacheAdapter, Injectable, RedisConnectionService, Injectable, isRedisRequiredFromConfig()

### Community 40 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.10
Nodes (29): CostUsd, ToolCallId, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext() (+21 more)

### Community 41 - "run.schemas.ts"
Cohesion: 0.13
Nodes (15): contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, socialBriefSchema (+7 more)

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.13
Nodes (21): ApiOpenAiErrorResponses(), OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+13 more)

### Community 43 - "ids.ts"
Cohesion: 0.09
Nodes (32): brand, ACCOUNT_ACTIVATION_ID_RE, AccountActivationId, CONV_ID_RE, ConversationId, createAccountActivationId(), createConversationId(), createFeedbackId() (+24 more)

### Community 44 - "semantic-cache.service.ts"
Cohesion: 0.13
Nodes (16): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, EmbeddingBackend, isSingleTurnUserRequest(), lastUserMessageText() (+8 more)

### Community 45 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.06
Nodes (34): ChatModule, Module, RequestIdMiddleware, Injectable, createRequestId(), AnthropicModule, Module, AnthropicMessagesController (+26 more)

### Community 46 - "save-output-edited.use-case.ts"
Cohesion: 0.06
Nodes (44): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+36 more)

### Community 47 - "packages_shared_dist_index"
Cohesion: 0.06
Nodes (35): DeleteUserResult, RotateRefreshSessionResult, GetRunLogsOutput, Inject, GUEST_ARCHIVE_STATUSES, GUEST_TASK_TYPES, GuestRunAdmit, GuestRunPolicyService (+27 more)

### Community 48 - "swagger.setup.ts"
Cohesion: 0.09
Nodes (25): AppModule, Module, ChatOutputTextDto, ApiProperty, ChatUsageDto, ApiPropertyOptional, SseDeltaPayloadDto, ApiProperty (+17 more)

### Community 49 - "anthropic-response.mapper.ts"
Cohesion: 0.13
Nodes (25): fromGatewayToolCallDto(), asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto, AnthropicTextContentBlockDto (+17 more)

### Community 50 - "ListRunsQueryDto"
Cohesion: 0.14
Nodes (12): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+4 more)

### Community 51 - "ModelAlias"
Cohesion: 0.08
Nodes (7): ProviderTestOptions, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, AppMetricsService, Injectable

### Community 52 - "GatewayKey"
Cohesion: 0.08
Nodes (24): ChatErrorHandlerService, Injectable, isProviderRateLimitError(), resolveClientIdFromKey(), GatewayKey, Express, Request, ResolvedGatewayClient (+16 more)

### Community 54 - "llm-hop.ts"
Cohesion: 0.06
Nodes (67): CompanyContextRepository, ContentPipelineFacade, toOutcome(), Inject, Injectable, Inject, coerceVerifierIssue(), isPlainRecord() (+59 more)

### Community 55 - "config-generator.service.ts"
Cohesion: 0.09
Nodes (20): ConfigValidateCommand, Command, Option, WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, CliGatewayValidatorService, Injectable (+12 more)

### Community 56 - "ref_nestjs_common"
Cohesion: 0.03
Nodes (73): BootstrapStatusUseCase, Injectable, DeleteUserUseCase, Injectable, InviteUserUseCase, Injectable, ListInvitationsUseCase, Inject (+65 more)

### Community 57 - "start-run-form.tsx"
Cohesion: 0.11
Nodes (32): fetchCompanyContext(), GUEST_ALLOWED_TASK_TYPES, GUEST_CONTACTS, GUEST_QUOTA_CODES, GuestAllowedTaskType, GuestContact, GuestQuotaCode, isGuestAllowedTaskType() (+24 more)

### Community 58 - "cancel-run-dialog.tsx"
Cohesion: 0.19
Nodes (16): assertNever(), notifyProduct(), notifyRunCancelled(), notifyRunTerminal(), EnvelopeRef, ProductToast, RunTerminalInput, RunTerminalOutcome (+8 more)

### Community 59 - "resilient-executor.ts"
Cohesion: 0.17
Nodes (18): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+10 more)

### Community 60 - "metrics.ts"
Cohesion: 0.12
Nodes (23): getClientConversationId(), getOrCreateConversationIdForResponse(), buildAppProviderMetricsContext(), buildLlmMetricsContext(), mapProviderResponseToUsage(), toMetricsMessages(), buildProviderInputForAlias(), toProviderTurns() (+15 more)

### Community 61 - "ref_nestjs_swagger"
Cohesion: 0.15
Nodes (8): IsStringOrArrayOfStrings(), IsThinkingBudget(), isTextContentItem(), normalizeOpenAiContent(), TextContentItem, ref_class_transformer, ref_class_validator, ref_nestjs_swagger

### Community 62 - "get-run.use-case.ts"
Cohesion: 0.04
Nodes (80): AutoFinalizeExpiredReviewsUseCase, Injectable, CancelRunUseCase, Inject, Injectable, GetRunGuestAccess, GetRunOutput, GetRunUseCase (+72 more)

### Community 63 - "openai-chat-completions.controller.ts"
Cohesion: 0.11
Nodes (27): SseDeltaEvent, SseDoneEvent, SseFinishReason, SseMetaEvent, ANTHROPIC_INTEGRATION_PATH, OPENAI_INTEGRATION_PATH, OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto (+19 more)

### Community 64 - "anthropic-models.controller.ts"
Cohesion: 0.13
Nodes (21): ApiAnthropicErrorResponses(), AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+13 more)

### Community 65 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 66 - "MetricsController"
Cohesion: 0.18
Nodes (7): MetricsController, ApiOperation, ApiResponse, ApiTags, Controller, Get, Header

### Community 67 - "RefreshSessionRepository"
Cohesion: 0.11
Nodes (7): LogoutUseCase, Inject, Injectable, RefreshSessionRecord, RefreshSessionRepository, PrismaRefreshSessionAdapter, Injectable

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.08
Nodes (27): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+19 more)

### Community 69 - "http/http-exception.filter.ts"
Cohesion: 0.20
Nodes (7): ErrorEnvelope, Express, Request, newRequestId(), RequestIdMiddleware, Injectable, packages_shared_dist_index_requestid

### Community 70 - "health.api.ts"
Cohesion: 0.30
Nodes (10): fetchGatewayAlive(), fetchHealthReady(), HealthCheck, HealthCheckStatus, HealthReadyAggregate, HealthReadyResponse, isGatewayAlive(), isRecord() (+2 more)

### Community 71 - "prisma-invitation.adapter.ts"
Cohesion: 0.14
Nodes (18): InvitationListItem, AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord (+10 more)

### Community 72 - "PrismaService"
Cohesion: 0.04
Nodes (41): Inject, CreateFeedbackUseCase, Inject, Injectable, agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_PURGE (+33 more)

### Community 73 - "api/src/app.module.ts"
Cohesion: 0.07
Nodes (42): AuthModule, Module, CompanyContextModule, Module, ContentRunExecutor, isCanonicalOutlineSelection(), isMissingContentKind(), Injectable (+34 more)

### Community 74 - "InMemoryRunSseHub"
Cohesion: 0.27
Nodes (4): RunSseEvent, InMemoryRunSseHub, Inject, Injectable

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "transactional-mailer.port.ts"
Cohesion: 0.12
Nodes (15): Inject, Inject, TransactionalMail, TransactionalMailer, UserActivationMail, UserInvitedMail, LoggingMailerAdapter, Injectable (+7 more)

### Community 77 - "api/src/health/health.service.ts"
Cohesion: 0.08
Nodes (28): GATEWAY_PROBE_TIMEOUT_MS, GatewayLivenessBody, GatewayLivenessProbe, GatewayLivenessProbeReason, GatewayLivenessProbeResult, isRecord(), parseGatewayLivenessBody(), probeFailureReason() (+20 more)

### Community 78 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.05
Nodes (42): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), GatewayChatResponse (+34 more)

### Community 80 - "PrometheusService"
Cohesion: 0.20
Nodes (4): PrometheusService, Injectable, PrometheusMetrics, ref_prom_client

### Community 81 - "cn"
Cohesion: 0.05
Nodes (64): logoutSession(), GuestLimitModal(), GuestLimitModalProps, EMPTY_START_DRAFT, StartRunDraft, AgentsGateTooltip(), AppHeader(), AppHeaderProps (+56 more)

### Community 82 - "provider-instances.bootstrap.ts"
Cohesion: 0.17
Nodes (13): GatewayProviderInstanceConfig, assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryFn (+5 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "HealthController"
Cohesion: 0.31
Nodes (6): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get

### Community 85 - "users-view.tsx"
Cohesion: 0.06
Nodes (55): metadata, fetchAppConfig(), AppConfig, parseAppConfig(), DemoModeContext, DemoModeContextValue, DemoModeProvider(), DemoModeState (+47 more)

### Community 86 - "model-manager.service.ts"
Cohesion: 0.16
Nodes (21): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, defaultModelPolicy(), ModelEditField, EditModelInput, buildDefaultModelCapabilities() (+13 more)

### Community 87 - "company-context.controller.ts"
Cohesion: 0.11
Nodes (34): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, CompanyContextController (+26 more)

### Community 88 - "ProviderRemoveCommand"
Cohesion: 0.33
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 89 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 90 - "api/src/main.ts"
Cohesion: 0.21
Nodes (10): AppModule, Module, bootstrap(), parseCorsOrigins(), configureHttpApp(), buildSwaggerConfig(), ref_cookie_parser, ref_helmet (+2 more)

### Community 92 - "AnthropicContentBlockDto"
Cohesion: 0.14
Nodes (14): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+6 more)

### Community 93 - "social.types.ts"
Cohesion: 0.12
Nodes (37): coercePassNoteVerdict(), isPassOnlyIssue(), ideasOutputSchema, reelIdeasOutputSchema, isReelTaskType(), ReelTaskType, canRefine(), MAX_REFINE (+29 more)

### Community 94 - "guest.guard.ts"
Cohesion: 0.21
Nodes (7): ALLOW_GUEST_KEY, IS_PUBLIC_KEY, GuestGuard, Inject, Injectable, ref_nestjs_core, ref_nestjs_passport

### Community 95 - "StartRunDto"
Cohesion: 0.22
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 96 - "ConfigInitCommand"
Cohesion: 0.31
Nodes (3): ConfigInitCommand, Command, Option

### Community 97 - "route.ts"
Cohesion: 0.13
Nodes (17): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+9 more)

### Community 98 - "KeyGenerateCommand"
Cohesion: 0.33
Nodes (3): KeyGenerateCommand, Command, Option

### Community 99 - "ChatToolingDto"
Cohesion: 0.15
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 100 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 101 - "configuration.ts"
Cohesion: 0.08
Nodes (36): CliValidateOptions, asCacheTtlSeconds(), asSemanticCacheTtlSeconds(), AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig, SemanticCacheRuntimeConfig (+28 more)

### Community 102 - "models.controller.ts"
Cohesion: 0.10
Nodes (22): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+14 more)

### Community 103 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 104 - "BootstrapAdminDto"
Cohesion: 0.40
Nodes (5): BootstrapAdminDto, ApiProperty, IsEmail, IsString, MinLength

### Community 105 - "LoginDto"
Cohesion: 0.40
Nodes (5): LoginDto, ApiProperty, IsEmail, IsString, MinLength

### Community 106 - "RegisterUserDto"
Cohesion: 0.40
Nodes (5): RegisterUserDto, ApiProperty, IsEmail, IsString, MinLength

### Community 107 - "AcceptInviteDto"
Cohesion: 0.50
Nodes (4): AcceptInviteDto, ApiProperty, IsString, MinLength

### Community 108 - "ActivateAccountDto"
Cohesion: 0.50
Nodes (4): ActivateAccountDto, ApiProperty, IsString, MinLength

### Community 109 - "app-metrics.service.ts"
Cohesion: 0.11
Nodes (19): EMBEDDING_BACKEND, VECTOR_STORE, HealthModule, Module, HealthCheckResult, HealthRedisCheckResult, AiMetricsModule, Global (+11 more)

### Community 110 - "should-include-redis-stack.ts"
Cohesion: 0.18
Nodes (12): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement() (+4 more)

### Community 111 - "ref_react"
Cohesion: 0.05
Nodes (83): metadata, apps_frontend_src_app_globals, AcceptInvitePage(), metadata, tokenFromSearchParam(), geistMono, geistSans, metadata (+75 more)

### Community 112 - "openai-params-provider.mapper.ts"
Cohesion: 0.12
Nodes (24): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+16 more)

### Community 113 - "ClientRemoveCommand"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

### Community 114 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 115 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 116 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 117 - "domain/company-context.types.ts"
Cohesion: 0.05
Nodes (51): toPublicCompanyContext(), GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PatchCompanyContextUseCase (+43 more)

### Community 122 - "RunRepository"
Cohesion: 0.04
Nodes (15): Inject, Inject, InProcessRunWorker, Injectable, Inject, Inject, Inject, Inject (+7 more)

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 125 - "brand.ts"
Cohesion: 0.33
Nodes (3): unbrand, RunTaskType, RunsSummaryResponse

### Community 128 - "ai-provider-gateway/src/health/health.controller.ts"
Cohesion: 0.22
Nodes (10): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthLivenessResponseDto, ApiProperty, HealthReadinessChecksDto, ApiPropertyOptional, HealthRedisCheckItemDto (+2 more)

## Knowledge Gaps
- **474 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+469 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1278 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `isRunId()` connect `ids.ts` to `run.schemas.ts`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **Why does `ModelAlias` connect `ModelAlias` to `branded.types.ts`, `chat.service.ts`, `GatewayConfig`, `ai-provider.interface.ts`, `app-metrics-backend.interface.ts`, `api-error.code.ts`, `redis-vector-store.adapter.ts`, `PrometheusAppMetricsAdapter`, `gateway-config.schema.ts`, `asProviderInstanceId`, `sentry-ai-metrics.adapter.ts`, `semantic-cache.service.ts`, `config-generator.service.ts`, `resilient-executor.ts`, `metrics.ts`, `openai-chat-completions.controller.ts`, `model-manager.service.ts`, `AppMetricsBackend`, `models.controller.ts`, `app-metrics.service.ts`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Why does `AuthUserContext` connect `AuthUserContext` to `DomainException`, `http/http-exception.filter.ts`, `PrismaService`, `save-output-edited.use-case.ts`, `packages_shared_dist_index`, `AuthController`, `ref_nestjs_common`, `guest.guard.ts`, `get-run.use-case.ts`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _474 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `DomainException` be split into smaller, more focused modules?**
  _Cohesion score 0.048634920634920635 - nodes in this community are weakly interconnected._
- **Should `SocialResultStore` be split into smaller, more focused modules?**
  _Cohesion score 0.042407906558849955 - nodes in this community are weakly interconnected._
- **Should `isRecord` be split into smaller, more focused modules?**
  _Cohesion score 0.05518207282913165 - nodes in this community are weakly interconnected._