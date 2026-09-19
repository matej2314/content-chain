# Graph Report - content-chain  (2026-09-19)

## Corpus Check
- 627 files · ~181,869 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .css 1)

## Summary
- 4055 nodes · 12523 edges · 137 communities (121 shown, 15 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 387 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6865a746`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- prisma-invitation.adapter.ts
- social.types.ts
- isRecord
- cli.module.ts
- runs.types.ts
- run-details-view.tsx
- ModelAlias
- LogContext
- anthropic/anthropic-tools.mapper.ts
- swagger.setup.ts
- content.types.ts
- users.controller.ts
- social.graph.ts
- branded.types.ts
- http-metrics.interceptor.ts
- models.controller.ts
- anthropic-response.mapper.ts
- redis-vector-store.adapter.ts
- DomainException
- asProviderInstanceId
- sentry-ai-metrics.adapter.ts
- wizard-orchestrator.service.ts
- anthropic-messages.controller.ts
- GatewayKey
- RunRepository
- api/src/app.module.ts
- prisma-run.adapter.ts
- AuthController
- save-output-edited.use-case.ts
- semantic-cache.service.ts
- types/index.ts
- HealthService
- ai-provider-gateway/src/main.ts
- openai-stream.mapper.ts
- AnthropicMessagesRequestDto
- runs-result.types.ts
- .info
- enums.ts
- feedback-form.tsx
- RunsController
- start-run.use-case.ts
- HttpExceptionFilter
- openai-models.controller.ts
- ids.ts
- app-metrics.service.ts
- invite-user.use-case.ts
- agent-answers.schema.ts
- anthropic-models.controller.ts
- llm-hop.ts
- chat-params.dto.ts
- ListRunsQueryDto
- toInputJson
- provider-error.mapper.ts
- LoggingService
- users-view.tsx
- CompanyContext
- PrometheusAppMetricsAdapter
- patch-company-context.use-case.ts
- should-include-redis-stack.ts
- HealthController
- LlmGatewayHttpAdapter
- company-context.dto.ts
- ai-provider-gateway/src/app.module.ts
- response-cache.service.ts
- configuration.ts
- metrics.module.ts
- AppMetricsService
- ModelRemoveCommand
- OpenAiChatCompletionRequestDto
- in-process-run.worker.ts
- RunSseHub
- KeyGenerateCommand
- ClientAddCommand
- ClientRemoveCommand
- OpenAiChatMessageDto
- GatewayConfig
- AppMetricsBackend
- .getOne
- CompanyContextRepository
- llm-gateway.http.adapter.ts
- PrometheusService
- responses.adapter.ts
- openai-params-provider.mapper.ts
- SPEC — README
- ModelAddCommand
- public.decorator.ts
- accept-invite.use-case.ts
- prisma-user.adapter.ts
- company-context.mapper.ts
- session-provider.tsx
- app-metrics-backend.interface.ts
- StartRunDto
- RunRecord
- chat-request.dto.ts
- configure-swagger.ts
- getAppConfig
- auth.module.ts
- route.ts
- ai-provider-gateway/src/health/health.service.ts
- ProviderAddCommand
- .getOne
- PrismaService
- .getOne
- RedisConnectionService
- semantic-cache.constants.ts
- GatewayCommand
- PrismaRefreshSessionAdapter
- ModelEditCommand
- EnvironmentVariables
- ProviderEditCommand
- resume-hitl.use-case.ts
- OllamaEmbeddingAdapter
- ChatParamsDto
- ProviderRemoveCommand
- cn
- GatewayModelsCatalogService
- resolve-provider-call-options.ts
- domain/company-context.types.ts
- JwtCookieStrategy
- CompanyContextController
- run.port.ts
- ClientEditCommand
- openai-chat-message.dto.ts
- openai-chat-completion-request.dto.ts
- Architektura
- brand.ts
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
3. `LoggingService` - 73 edges
4. `DomainException` - 68 edges
5. `asProviderInstanceId()` - 67 edges
6. `GatewayConfig` - 65 edges
7. `isRecord()` - 60 edges
8. `cn()` - 60 edges
9. `GatewayKey` - 59 edges
10. `ClientId` - 54 edges

## Surprising Connections (you probably didn't know these)
- `toChatResponseDto()` --indirect_call--> `toGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/chat/dto/chat-response.dto.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `mapChatResponseToOpenAi()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/openai/mappers/openai-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `optionalEnvRefSchema` --calls--> `asEnvRef()`  [EXTRACTED]
  apps/ai-provider-gateway/src/config/gateway-config.schema.ts → apps/ai-provider-gateway/src/common/types/branded.types.ts
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `RedisConnectionService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-connection.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (137 total, 15 thin omitted)

### Community 0 - "prisma-invitation.adapter.ts"
Cohesion: 0.17
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 1 - "social.types.ts"
Cohesion: 0.06
Nodes (29): PageDocument, CompositeRunResultReader, GetRunOutput, RUN_RESULT_READER, RunResultReader, ContentBrief, SocialBrief, EmptyRunResultReader (+21 more)

### Community 2 - "isRecord"
Cohesion: 0.06
Nodes (68): fetchCompanyContext(), fetchCompleteness(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras, companyContextForPut() (+60 more)

### Community 3 - "cli.module.ts"
Cohesion: 0.09
Nodes (42): AgentReport, AgentReportStatus, emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), loadAnswers(), assertAgentHasAnswers(), CliMode (+34 more)

### Community 4 - "runs.types.ts"
Cohesion: 0.05
Nodes (61): assertNever(), notifyRunTerminal(), EnvelopeRef, ProductToast, RunTerminalInput, RunTerminalOutcome, runTerminalToastId(), viewingRunIdFromPathname() (+53 more)

### Community 5 - "run-details-view.tsx"
Cohesion: 0.07
Nodes (44): CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS, RUN_TASK_TYPE_LABELS, fetchArchiveRuns(), fetchInitiatorOptions() (+36 more)

### Community 6 - "ModelAlias"
Cohesion: 0.09
Nodes (7): ProviderTestOptions, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, resolveAppMetricsBackend(), SemanticCacheLookupResult

### Community 7 - "LogContext"
Cohesion: 0.05
Nodes (29): GlobalExceptionFilter, isPayloadTooLargeError(), Catch, Injectable, ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter (+21 more)

### Community 8 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.09
Nodes (40): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent() (+32 more)

### Community 9 - "swagger.setup.ts"
Cohesion: 0.05
Nodes (57): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+49 more)

### Community 10 - "content.types.ts"
Cohesion: 0.08
Nodes (28): ContentPipelineFacade, toOutcome(), Inject, Injectable, ContentRunExecutor, isCanonicalOutlineSelection(), isMissingContentKind(), Inject (+20 more)

### Community 11 - "users.controller.ts"
Cohesion: 0.08
Nodes (23): ListUsersUseCase, Inject, Injectable, ReactivateUserUseCase, Inject, Injectable, SoftDeleteUserUseCase, Injectable (+15 more)

### Community 12 - "social.graph.ts"
Cohesion: 0.13
Nodes (33): coercePassNoteVerdict(), isPassOnlyIssue(), ideasOutputSchema, reelIdeasOutputSchema, verifierOutputSchema, isReelTaskType(), ReelTaskType, canRefine() (+25 more)

### Community 13 - "branded.types.ts"
Cohesion: 0.09
Nodes (52): SemanticStoreEmbedState, CachedChatResponse, CachedChatWarning, CachedFinishReason, CacheIdentityMessage, ChatCacheSource, CachedChatResponseWithConversation, ChatResponseData (+44 more)

### Community 14 - "http-metrics.interceptor.ts"
Cohesion: 0.25
Nodes (8): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, gatewayErrorsTotal, httpRequestDurationSeconds, httpRequestsTotal

### Community 15 - "models.controller.ts"
Cohesion: 0.24
Nodes (9): ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, GatewayModelCapabilitiesDto, GatewayModelDto, ApiProperty, ApiPropertyOptional, ModelsListResponseDto (+1 more)

### Community 16 - "anthropic-response.mapper.ts"
Cohesion: 0.13
Nodes (26): SseDoneEvent, fromGatewayToolCallDto(), asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto (+18 more)

### Community 17 - "redis-vector-store.adapter.ts"
Cohesion: 0.12
Nodes (21): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), asString(), ParsedKnnHits, parseKnnHits() (+13 more)

### Community 18 - "DomainException"
Cohesion: 0.07
Nodes (40): FinalizeReviewUseCase, Injectable, GetRunLogsOutput, GetRunLogsUseCase, Injectable, GetRunUseCase, orderItemsBySelectedIds(), Injectable (+32 more)

### Community 19 - "asProviderInstanceId"
Cohesion: 0.07
Nodes (53): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, DEFAULT_MODELS, DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel() (+45 more)

### Community 20 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.08
Nodes (33): CostUsd, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes() (+25 more)

### Community 21 - "wizard-orchestrator.service.ts"
Cohesion: 0.06
Nodes (58): assertInteractiveAllowed(), WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, InitAnswers, CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema (+50 more)

### Community 22 - "anthropic-messages.controller.ts"
Cohesion: 0.04
Nodes (72): ApiHeader, GATEWAY_CACHE_HEADER, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags (+64 more)

### Community 23 - "GatewayKey"
Cohesion: 0.06
Nodes (41): ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray (+33 more)

### Community 24 - "RunRepository"
Cohesion: 0.07
Nodes (9): Inject, Inject, Inject, Inject, Inject, Inject, Inject, Inject (+1 more)

### Community 25 - "api/src/app.module.ts"
Cohesion: 0.07
Nodes (37): AppModule, Module, AuthModule, Module, CompanyContextModule, Module, LlmGatewayError, LlmModule (+29 more)

### Community 26 - "prisma-run.adapter.ts"
Cohesion: 0.09
Nodes (15): contentBriefSchema, socialBriefSchema, LightRunItem, ListRunsResult, RunSnapshot, RunLogEntry, ALLOWED, assertTransition() (+7 more)

### Community 27 - "AuthController"
Cohesion: 0.08
Nodes (28): AuthController, ApiCookieAuth, ApiTags, Body, Controller, Get, HttpCode, Patch (+20 more)

### Community 28 - "save-output-edited.use-case.ts"
Cohesion: 0.09
Nodes (32): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+24 more)

### Community 29 - "semantic-cache.service.ts"
Cohesion: 0.12
Nodes (19): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, isSingleTurnUserRequest(), lastUserMessageText(), embeddingProbeTimeoutMs() (+11 more)

### Community 30 - "types/index.ts"
Cohesion: 0.07
Nodes (45): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+37 more)

### Community 31 - "HealthService"
Cohesion: 0.11
Nodes (11): HealthLivenessResponseDto, ApiProperty, HealthReadinessResponseDto, HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller (+3 more)

### Community 32 - "ai-provider-gateway/src/main.ts"
Cohesion: 0.13
Nodes (15): AppModule, Module, bootstrap(), API_GLOBAL_PREFIX, PORT, setupApp(), exportOpenApi(), OPENAPI_OUTPUT_FILENAME (+7 more)

### Community 33 - "openai-stream.mapper.ts"
Cohesion: 0.17
Nodes (20): OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty, ApiPropertyOptional (+12 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "runs-result.types.ts"
Cohesion: 0.04
Nodes (72): buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload() (+64 more)

### Community 36 - ".info"
Cohesion: 0.07
Nodes (19): ConfigInitCommand, Command, Option, ProviderTestCommand, Command, Option, WizardState, ConfigGeneratorService (+11 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "feedback-form.tsx"
Cohesion: 0.20
Nodes (14): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody(), parseFeedbackCreated() (+6 more)

### Community 39 - "RunsController"
Cohesion: 0.11
Nodes (20): HitlDto, IsArray, IsString, PatchRunRatingDto, IsIn, ValidateIf, isTerminalStatus(), RunsController (+12 more)

### Community 40 - "start-run.use-case.ts"
Cohesion: 0.17
Nodes (15): isContentStartCommand(), isPlainRecord(), omitUndefinedDeep(), StartRunBriefInput, StartRunCommand, makeContentRun(), makeSocialRun(), makeSocialSnapshot() (+7 more)

### Community 41 - "HttpExceptionFilter"
Cohesion: 0.31
Nodes (3): ErrorEnvelope, HttpExceptionFilter, Catch

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.21
Nodes (12): ApiOpenAiErrorResponses(), ANTHROPIC_INTEGRATION_PATH, OPENAI_INTEGRATION_PATH, OpenAiErrorBodyDto, OpenAiErrorResponseDto, ApiProperty, ApiPropertyOptional, OpenAiModelDto (+4 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (28): brand, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createInvitationId(), createRequestId() (+20 more)

### Community 44 - "app-metrics.service.ts"
Cohesion: 0.16
Nodes (11): APP_METRICS_BACKEND, MetricsController, ApiOperation, ApiResponse, ApiTags, Controller, Get, PreMetricsScrapeHook (+3 more)

### Community 45 - "invite-user.use-case.ts"
Cohesion: 0.05
Nodes (40): Inject, InviteUserResult, inviteUserSchema, InviteUserUseCase, Inject, Injectable, InvitationListItem, ListInvitationsUseCase (+32 more)

### Community 46 - "agent-answers.schema.ts"
Cohesion: 0.11
Nodes (21): ClientAddAnswers, ClientAddAnswersSchema, ClientEditAnswers, ClientEditAnswersSchema, ClientRemoveAnswers, ClientRemoveAnswersSchema, InitAnswersSchema, ModelAddAnswers (+13 more)

### Community 47 - "anthropic-models.controller.ts"
Cohesion: 0.28
Nodes (10): ApiAnthropicErrorResponses(), AnthropicErrorBodyDto, AnthropicErrorResponseDto, ApiProperty, AnthropicModelDto, AnthropicModelsListResponseDto, ApiProperty, mapGatewayModelsListToAnthropic() (+2 more)

### Community 48 - "llm-hop.ts"
Cohesion: 0.10
Nodes (41): coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema, pageOutlineSectionSchema, readNonEmptyString() (+33 more)

### Community 49 - "chat-params.dto.ts"
Cohesion: 0.24
Nodes (7): ResponseFormatDto, ApiProperty, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsThinkingBudget()

### Community 50 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+2 more)

### Community 51 - "toInputJson"
Cohesion: 0.22
Nodes (7): Inject, OutputEditedWrite, OutputEditedWriter, applyWrite(), PrismaOutputEditedAdapter, Injectable, toInputJson()

### Community 52 - "provider-error.mapper.ts"
Cohesion: 0.21
Nodes (19): MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isRateLimitStatus(), isServerError(), isTimeoutStatus(), nameLooksLikeTimeout() (+11 more)

### Community 53 - "LoggingService"
Cohesion: 0.05
Nodes (41): Inject, Inject, ChatErrorHandlerService, Injectable, ChatProviderCallService, CompleteOnceResult, Injectable, ChatProviderCooldownService (+33 more)

### Community 54 - "users-view.tsx"
Cohesion: 0.13
Nodes (28): createInvitation(), fetchInvitations(), resendInvitation(), revokeInvitation(), InvitationListItem, InviteCreated, isInvitationExpired(), parseInvitationList() (+20 more)

### Community 55 - "CompanyContext"
Cohesion: 0.23
Nodes (6): CompanyContext, emptyCompanyContext(), jsonArray(), jsonRecord(), PrismaCompanyContextAdapter, Injectable

### Community 56 - "PrometheusAppMetricsAdapter"
Cohesion: 0.13
Nodes (5): PrometheusAppMetricsAdapter, Injectable, AppProviderCallContext, AppProviderStreamScope, AppTokenUsage

### Community 57 - "patch-company-context.use-case.ts"
Cohesion: 0.27
Nodes (8): toPublicCompanyContext(), PatchCompanyContextUseCase, Inject, Injectable, assertCompanyContextWritable(), PartialCompanyContext, isComplete(), mergeCompanyContext()

### Community 58 - "should-include-redis-stack.ts"
Cohesion: 0.18
Nodes (11): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis() (+3 more)

### Community 59 - "HealthController"
Cohesion: 0.16
Nodes (11): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, HealthModule, Module (+3 more)

### Community 60 - "LlmGatewayHttpAdapter"
Cohesion: 0.31
Nodes (3): LlmGatewayHttpAdapter, Inject, Injectable

### Community 61 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 62 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.09
Nodes (24): ChatModule, Module, HealthModule, Module, AnthropicModule, Module, IntegrationsModule, Module (+16 more)

### Community 63 - "response-cache.service.ts"
Cohesion: 0.10
Nodes (16): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, CacheModule, CacheModuleOptions (+8 more)

### Community 64 - "configuration.ts"
Cohesion: 0.05
Nodes (54): isRedisRequired(), ConfigValidateCommand, Command, Option, CliGatewayValidatorService, CliValidateOptions, Injectable, normalizeGatewayConfigForWrite() (+46 more)

### Community 65 - "metrics.module.ts"
Cohesion: 0.19
Nodes (8): MetricsController, Controller, Get, Res, MetricsModule, Module, MetricsService, Injectable

### Community 66 - "AppMetricsService"
Cohesion: 0.09
Nodes (7): HttpMetricsMiddleware, Injectable, Inject, Optional, AppMetricsService, Injectable, HttpMethod

### Community 67 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (18): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+10 more)

### Community 69 - "in-process-run.worker.ts"
Cohesion: 0.16
Nodes (13): Inject, RecoverInterruptedRunsUseCase, Inject, Injectable, RunLifecycleService, TransitionExtras, Injectable, isRetryable() (+5 more)

### Community 70 - "RunSseHub"
Cohesion: 0.16
Nodes (6): Inject, RunSseEvent, RunSseHub, InMemoryRunSseHub, Inject, Injectable

### Community 71 - "KeyGenerateCommand"
Cohesion: 0.33
Nodes (3): KeyGenerateCommand, Command, Option

### Community 72 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 73 - "ClientRemoveCommand"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

### Community 74 - "OpenAiChatMessageDto"
Cohesion: 0.22
Nodes (9): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+1 more)

### Community 75 - "GatewayConfig"
Cohesion: 0.08
Nodes (29): PendingSecretsItem, collectPendingSecrets(), CliAiProvider, EnvPatchService, EnvPatchValue, Injectable, ProviderManagerService, Injectable (+21 more)

### Community 77 - ".getOne"
Cohesion: 0.19
Nodes (11): ApiGatewayModelsErrorResponses(), ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+3 more)

### Community 78 - "CompanyContextRepository"
Cohesion: 0.21
Nodes (11): GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PutCompanyContextUseCase, Inject (+3 more)

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.16
Nodes (18): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), GatewayChatResponse (+10 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - "responses.adapter.ts"
Cohesion: 0.06
Nodes (68): mapProviderResponseToAiObservation(), toCachedChatResponse(), toHttpException(), asInputTokens(), asOutputTokens(), asSystemFingerprint(), asToolCallId(), buildGenerationConfig() (+60 more)

### Community 82 - "openai-params-provider.mapper.ts"
Cohesion: 0.12
Nodes (24): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+16 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 85 - "public.decorator.ts"
Cohesion: 0.38
Nodes (3): IS_PUBLIC_KEY, JwtAuthGuard, Injectable

### Community 86 - "accept-invite.use-case.ts"
Cohesion: 0.18
Nodes (10): AcceptInviteResult, acceptInviteSchema, comparePassword(), generateRefreshToken(), hashPassword(), hashRefreshToken(), parseTtlMs(), parseTtlSeconds() (+2 more)

### Community 87 - "prisma-user.adapter.ts"
Cohesion: 0.15
Nodes (9): AuthUser, CreateAdminIfNoneData, CreateAdminIfNoneResult, UserForAuth, CreateUserData, isUniqueConstraintViolation(), PrismaUserAdapter, Injectable (+1 more)

### Community 88 - "company-context.mapper.ts"
Cohesion: 0.16
Nodes (11): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+3 more)

### Community 89 - "session-provider.tsx"
Cohesion: 0.07
Nodes (33): UsersPage(), geistMono, geistSans, metadata, bootstrapAdmin(), Credentials, fetchBootstrapStatus(), fetchUserSession() (+25 more)

### Community 90 - "app-metrics-backend.interface.ts"
Cohesion: 0.21
Nodes (10): healthStatusToGaugeValue(), AppRequestLabels, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus, HttpRequestLabels (+2 more)

### Community 91 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 92 - "RunRecord"
Cohesion: 0.25
Nodes (3): InProcessRunWorker, Injectable, RunRecord

### Community 93 - "chat-request.dto.ts"
Cohesion: 0.08
Nodes (28): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+20 more)

### Community 94 - "configure-swagger.ts"
Cohesion: 0.18
Nodes (11): bootstrap(), EnvModule, Global, Module, envSchema, parseCorsOrigins(), validateEnv(), configureHttpApp() (+3 more)

### Community 95 - "getAppConfig"
Cohesion: 0.17
Nodes (11): getAppConfig(), GatewayKeyGuard, Injectable, enrichRequestWithClientId(), AnthropicApiKeyGuard, readAnthropicApiKey(), Injectable, OpenAiBearerAuthGuard (+3 more)

### Community 96 - "auth.module.ts"
Cohesion: 0.06
Nodes (43): AcceptInviteUseCase, Injectable, BootstrapAdminInput, bootstrapAdminSchema, LoginInput, loginSchema, PatchUserCommand, patchUserSchema (+35 more)

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 98 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.24
Nodes (11): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiProperty, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty (+3 more)

### Community 99 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 100 - ".getOne"
Cohesion: 0.19
Nodes (10): AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+2 more)

### Community 101 - "PrismaService"
Cohesion: 0.05
Nodes (39): CreateFeedbackUseCase, Inject, Injectable, agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_RUN_READER, FeedbackRunLookup (+31 more)

### Community 102 - ".getOne"
Cohesion: 0.19
Nodes (10): OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+2 more)

### Community 103 - "RedisConnectionService"
Cohesion: 0.20
Nodes (5): RedisCacheModule, Module, RedisConnectionService, Injectable, isRedisRequiredFromConfig()

### Community 104 - "semantic-cache.constants.ts"
Cohesion: 0.13
Nodes (12): EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema(), EMBEDDING_CIRCUIT_COOLDOWN_MS, EMBEDDING_CIRCUIT_OPEN_AFTER, EMBEDDING_PROBE_TIMEOUT_MS (+4 more)

### Community 106 - "PrismaRefreshSessionAdapter"
Cohesion: 0.27
Nodes (4): RefreshSessionRecord, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable

### Community 107 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 108 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 109 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 110 - "resume-hitl.use-case.ts"
Cohesion: 0.22
Nodes (9): hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, runIdSchema, socialStartRunSchema (+1 more)

### Community 111 - "OllamaEmbeddingAdapter"
Cohesion: 0.27
Nodes (3): OllamaEmbeddingAdapter, Injectable, EmbeddingBackend

### Community 112 - "ChatParamsDto"
Cohesion: 0.20
Nodes (10): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+2 more)

### Community 113 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 114 - "cn"
Cohesion: 0.05
Nodes (67): AcceptInvitePageProps, acceptInvite(), logoutSession(), AcceptInviteForm(), onSubmit(), AcceptInviteFormProps, FALLBACK, passwordMeetsPolicy() (+59 more)

### Community 116 - "resolve-provider-call-options.ts"
Cohesion: 0.48
Nodes (5): clamp(), isOverrideKey(), resolveProviderCallOptions(), OVERRIDE_KEYS, OverrideKey

### Community 117 - "domain/company-context.types.ts"
Cohesion: 0.18
Nodes (18): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CompanyContextWriteDetail (+10 more)

### Community 118 - "JwtCookieStrategy"
Cohesion: 0.33
Nodes (4): isRecord(), JwtCookieStrategy, Inject, Injectable

### Community 119 - "CompanyContextController"
Cohesion: 0.22
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 120 - "run.port.ts"
Cohesion: 0.60
Nodes (4): ListRunsOutput, ListRunsQuery, PAGE_SIZE, RunStartedBy

### Community 121 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 122 - "openai-chat-message.dto.ts"
Cohesion: 0.60
Nodes (3): isTextContentItem(), normalizeOpenAiContent(), TextContentItem

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

## Knowledge Gaps
- **358 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+353 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1064 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `LoggingService` connect `LoggingService` to `ai-provider-gateway/src/main.ts`, `ai-provider-gateway/src/health/health.service.ts`, `AppMetricsService`, `RedisConnectionService`, `LogContext`, `anthropic/anthropic-tools.mapper.ts`, `swagger.setup.ts`, `branded.types.ts`, `OllamaEmbeddingAdapter`, `redis-vector-store.adapter.ts`, `responses.adapter.ts`, `anthropic-messages.controller.ts`, `GatewayKey`, `HealthService`, `semantic-cache.service.ts`, `types/index.ts`, `response-cache.service.ts`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Why does `GatewayConfig` connect `GatewayConfig` to `configuration.ts`, `cli.module.ts`, `.info`, `branded.types.ts`, `models.controller.ts`, `asProviderInstanceId`, `GatewayModelsCatalogService`, `wizard-orchestrator.service.ts`, `LoggingService`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Why does `DomainException` connect `DomainException` to `prisma-invitation.adapter.ts`, `social.types.ts`, `content.types.ts`, `users.controller.ts`, `http-metrics.interceptor.ts`, `api/src/app.module.ts`, `prisma-run.adapter.ts`, `save-output-edited.use-case.ts`, `start-run.use-case.ts`, `HttpExceptionFilter`, `invite-user.use-case.ts`, `llm-hop.ts`, `patch-company-context.use-case.ts`, `accept-invite.use-case.ts`, `prisma-user.adapter.ts`, `auth.module.ts`, `PrismaService`, `resume-hitl.use-case.ts`, `JwtCookieStrategy`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _358 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05711086226203808 - nodes in this community are weakly interconnected._
- **Should `isRecord` be split into smaller, more focused modules?**
  _Cohesion score 0.058416139716952725 - nodes in this community are weakly interconnected._