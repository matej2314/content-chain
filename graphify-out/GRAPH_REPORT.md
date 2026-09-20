# Graph Report - content-chain  (2026-09-20)

## Corpus Check
- 636 files · ~184,350 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .css 1)

## Summary
- 4108 nodes · 12637 edges · 130 communities (115 shown, 14 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 391 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e2913f60`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- prisma-invitation.adapter.ts
- SocialResultStore
- api/company-context.types.ts
- cli.module.ts
- runs.types.ts
- run-details-view.tsx
- ModelAlias
- logging.service.ts
- anthropic/anthropic-tools.mapper.ts
- client-prompt.service.ts
- .info
- UserRepository
- social.graph.ts
- ai-provider.interface.ts
- GatewayConfig
- .getOne
- anthropic-response.mapper.ts
- redis-vector-store.adapter.ts
- AuthUserContext
- model-manager.service.ts
- sentry-ai-metrics.adapter.ts
- asProviderInstanceId
- GatewayKey
- asClientId
- PrometheusAppMetricsAdapter
- openai-params-provider.mapper.ts
- RunRepository
- DomainException
- save-output-edited.use-case.ts
- env.schema.ts
- chat.service.ts
- ai-provider-gateway/src/health/health.service.ts
- ai-provider-gateway/src/main.ts
- google-tools.mapper.ts
- AnthropicMessagesRequestDto
- runs-result.types.ts
- app-metrics-backend.interface.ts
- enums.ts
- feedback.api.ts
- AuthController
- new-ids.ts
- openai-stream.mapper.ts
- openai-models.controller.ts
- ids.ts
- app-metrics.service.ts
- auth.module.ts
- types/index.ts
- anthropic-models.controller.ts
- api/src/app.module.ts
- ChatParamsDto
- ListRunsQueryDto
- agent-answers.schema.ts
- chat-error-handler.service.ts
- semantic-cache.service.ts
- isRecord
- CompanyContext
- llm-hop.ts
- result-edit-payload.ts
- RedisConnectionService
- HealthController
- AppMetricsService
- company-context.dto.ts
- ai-provider-gateway/src/app.module.ts
- response-cache.service.ts
- configuration.ts
- InvitationsController
- anthropic-messages.controller.ts
- ModelRemoveCommand
- OpenAiChatCompletionRequestDto
- should-include-redis-stack.ts
- provider-error.mapper.ts
- branded.types.ts
- ClientAddCommand
- ClientRemoveCommand
- .getOne
- parse-verifier-log-message.ts
- .getOne
- filters/http-exception.filter.ts
- CompanyContextRepository
- llm-gateway.http.adapter.ts
- PrometheusService
- metrics.ts
- event-source-registry-provider.tsx
- SPEC — README
- ModelAddCommand
- social.types.ts
- getAppConfig
- semantic-cache.constants.ts
- company-context.mapper.ts
- apiFetch
- HealthController
- StartRunDto
- public.decorator.ts
- OllamaEmbeddingAdapter
- swagger.setup.ts
- GatewayModelDto
- RefreshSessionRepository
- route.ts
- GatewayModelsCatalogService
- ProviderAddCommand
- ProviderRegistryService
- PrismaService
- anthropic.module.ts
- http-metrics.interceptor.ts
- metrics.module.ts
- ModelEditCommand
- EnvironmentVariables
- ProviderEditCommand
- LoggingService
- LlmGatewayHttpAdapter
- patch-company-context.use-case.ts
- ProviderRemoveCommand
- cn
- GatewayCommand
- domain/company-context.types.ts
- CompanyContextController
- ClientEditCommand
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
7. `cn()` - 62 edges
8. `isRecord()` - 60 edges
9. `GatewayKey` - 59 edges
10. `ClientId` - 54 edges

## Surprising Connections (you probably didn't know these)
- `mapGatewayResponseToAnthropicFormat()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/anthropic/mappers/anthropic-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `CardDescription()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/card.tsx → apps/frontend/src/shared/utils/utils.ts
- `CardAction()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/card.tsx → apps/frontend/src/shared/utils/utils.ts
- `CardFooter()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/card.tsx → apps/frontend/src/shared/utils/utils.ts
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (130 total, 14 thin omitted)

### Community 0 - "prisma-invitation.adapter.ts"
Cohesion: 0.13
Nodes (19): Inject, InvitationListItem, AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, INVITATION_REPOSITORY, InvitationListRecord (+11 more)

### Community 1 - "SocialResultStore"
Cohesion: 0.07
Nodes (15): toInputJson(), SocialResultStore, PipelineState, ReelIdea, ReelScript, ReelScriptSegment, SocialContent, VerifierVerdict (+7 more)

### Community 2 - "api/company-context.types.ts"
Cohesion: 0.06
Nodes (68): metadata, fetchCompanyContext(), fetchCompleteness(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras (+60 more)

### Community 3 - "cli.module.ts"
Cohesion: 0.08
Nodes (47): AgentReport, AgentReportStatus, emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), loadAnswers(), assertAgentHasAnswers(), CliMode (+39 more)

### Community 4 - "runs.types.ts"
Cohesion: 0.04
Nodes (74): metadata, assertNever(), notifyProduct(), notifyRunTerminal(), EnvelopeRef, ProductToast, RunTerminalInput, RunTerminalOutcome (+66 more)

### Community 5 - "run-details-view.tsx"
Cohesion: 0.07
Nodes (49): metadata, metadata, FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, FALLBACK, FeedbackFormProps, CONTENT_KIND_LABELS, LANGUAGE_LABELS (+41 more)

### Community 6 - "ModelAlias"
Cohesion: 0.07
Nodes (7): ProviderTestOptions, AddModelInput, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, AppMetricsBackend

### Community 7 - "logging.service.ts"
Cohesion: 0.07
Nodes (22): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+14 more)

### Community 8 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.10
Nodes (38): toHttpException(), asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent(), isAnthropicEffortLevel(), mapThinkingBudgetToAnthropicEffort() (+30 more)

### Community 9 - "client-prompt.service.ts"
Cohesion: 0.10
Nodes (20): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, KeyGenerateCommand, Command, Option, convertClient() (+12 more)

### Community 10 - ".info"
Cohesion: 0.06
Nodes (30): isRedisRequired(), ConfigInitCommand, Command, Option, WizardState, ConfigGeneratorService, Injectable, FileManagerService (+22 more)

### Community 11 - "UserRepository"
Cohesion: 0.04
Nodes (46): BootstrapAdminInput, bootstrapAdminSchema, LoginInput, loginSchema, PatchUserCommand, patchUserSchema, Inject, ListUsersUseCase (+38 more)

### Community 12 - "social.graph.ts"
Cohesion: 0.13
Nodes (34): loadPromptFromDir(), renderPrompt(), coercePassNoteVerdict(), isPassOnlyIssue(), ideasOutputSchema, reelIdeasOutputSchema, isReelTaskType(), ReelTaskType (+26 more)

### Community 13 - "ai-provider.interface.ts"
Cohesion: 0.11
Nodes (39): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatResponseData, ChatWarningDto, ApiProperty, ApiPropertyOptional, IsOptional (+31 more)

### Community 14 - "GatewayConfig"
Cohesion: 0.11
Nodes (14): PendingSecretsItem, ProviderTestCommand, Command, Option, ProviderManagerService, Injectable, ProviderTestService, Injectable (+6 more)

### Community 15 - ".getOne"
Cohesion: 0.19
Nodes (11): ApiGatewayModelsErrorResponses(), ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+3 more)

### Community 16 - "anthropic-response.mapper.ts"
Cohesion: 0.14
Nodes (24): SseDoneEvent, asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto, AnthropicTextContentBlockDto (+16 more)

### Community 17 - "redis-vector-store.adapter.ts"
Cohesion: 0.12
Nodes (24): isUnservableCachedReply(), CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag() (+16 more)

### Community 18 - "AuthUserContext"
Cohesion: 0.07
Nodes (32): InviteUserDto, ApiProperty, IsEmail, Body, HttpCode, Post, CreateFeedbackDto, IsIn (+24 more)

### Community 19 - "model-manager.service.ts"
Cohesion: 0.08
Nodes (27): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable, defaultModelPolicy() (+19 more)

### Community 20 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.08
Nodes (34): CostUsd, ToolCallId, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext() (+26 more)

### Community 21 - "asProviderInstanceId"
Cohesion: 0.10
Nodes (42): assertInteractiveAllowed(), DEFAULT_MODELS, WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, InitAnswers, CliAiModelSchema, CliAiProviderSchema (+34 more)

### Community 22 - "GatewayKey"
Cohesion: 0.06
Nodes (34): ChatService, Injectable, ChatErrorHandlerService, Injectable, ChatProviderCooldownService, Injectable, StreamCacheReplayService, Injectable (+26 more)

### Community 23 - "asClientId"
Cohesion: 0.04
Nodes (55): ApiHeader, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags, Body (+47 more)

### Community 24 - "PrometheusAppMetricsAdapter"
Cohesion: 0.10
Nodes (6): PrometheusAppMetricsAdapter, Injectable, resolveAppMetricsBackend(), AppProviderCallContext, AppProviderStreamScope, AppTokenUsage

### Community 25 - "openai-params-provider.mapper.ts"
Cohesion: 0.12
Nodes (24): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+16 more)

### Community 26 - "RunRepository"
Cohesion: 0.03
Nodes (68): Inject, GetRunLogsOutput, Inject, Inject, InProcessRunWorker, Inject, Injectable, ListRunsOutput (+60 more)

### Community 27 - "DomainException"
Cohesion: 0.06
Nodes (42): AcceptInviteResult, acceptInviteSchema, hashPassword(), validatePasswordPolicy(), FinalizeReviewUseCase, Injectable, GetRunLogsUseCase, Injectable (+34 more)

### Community 28 - "save-output-edited.use-case.ts"
Cohesion: 0.06
Nodes (39): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+31 more)

### Community 29 - "env.schema.ts"
Cohesion: 0.36
Nodes (6): bootstrap(), envSchema, parseCorsOrigins(), validateEnv(), configureHttpApp(), buildSwaggerConfig()

### Community 30 - "chat.service.ts"
Cohesion: 0.08
Nodes (42): SemanticStoreEmbedState, CacheIdentityMessage, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray (+34 more)

### Community 31 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.09
Nodes (19): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthLivenessResponseDto, ApiProperty, HealthReadinessChecksDto, HealthReadinessResponseDto, ApiProperty (+11 more)

### Community 32 - "ai-provider-gateway/src/main.ts"
Cohesion: 0.13
Nodes (15): AppModule, Module, bootstrap(), API_GLOBAL_PREFIX, PORT, setupApp(), exportOpenApi(), OPENAPI_OUTPUT_FILENAME (+7 more)

### Community 33 - "google-tools.mapper.ts"
Cohesion: 0.16
Nodes (22): buildGenerationConfig(), createGoogleProvider(), getFinalToolCalls(), getStopReason(), textStream(), mapStopSequences(), mapThinkingBudgetToGeminiLevel(), extractFromLegacyFields() (+14 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "runs-result.types.ts"
Cohesion: 0.06
Nodes (52): PAGE_OUTLINE_ROLE_LABELS, submitHitl(), isPageOutlineSectionRole(), isReelDuration(), PAGE_OUTLINE_SECTION_ROLES, PageDocument, PageOutline, PageOutlineSection (+44 more)

### Community 36 - "app-metrics-backend.interface.ts"
Cohesion: 0.16
Nodes (12): healthStatusToGaugeValue(), AppRequestLabels, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus, HttpMethod (+4 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "feedback.api.ts"
Cohesion: 0.31
Nodes (9): createFeedback(), CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody(), parseFeedbackCreated(), FeedbackForm(), onSubmit() (+1 more)

### Community 39 - "AuthController"
Cohesion: 0.09
Nodes (27): AuthController, ApiCookieAuth, ApiTags, Body, Controller, Get, HttpCode, Patch (+19 more)

### Community 40 - "new-ids.ts"
Cohesion: 0.20
Nodes (6): ErrorEnvelope, HttpExceptionFilter, Catch, newRequestId(), RequestIdMiddleware, Injectable

### Community 41 - "openai-stream.mapper.ts"
Cohesion: 0.17
Nodes (21): fromGatewayToolCallDto(), OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty (+13 more)

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.29
Nodes (9): OpenAiErrorBodyDto, OpenAiErrorResponseDto, ApiProperty, ApiPropertyOptional, OpenAiModelDto, OpenAiModelsListResponseDto, ApiProperty, mapGatewayModelsListToOpenAi() (+1 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (28): brand, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createInvitationId(), createRequestId() (+20 more)

### Community 44 - "app-metrics.service.ts"
Cohesion: 0.14
Nodes (11): APP_METRICS_BACKEND, MetricsController, ApiOperation, ApiResponse, ApiTags, Controller, Get, PreMetricsScrapeHook (+3 more)

### Community 45 - "auth.module.ts"
Cohesion: 0.06
Nodes (56): AcceptInviteUseCase, Injectable, comparePassword(), generateRefreshToken(), hashRefreshToken(), parseTtlMs(), parseTtlSeconds(), AuthTokenResult (+48 more)

### Community 46 - "types/index.ts"
Cohesion: 0.08
Nodes (42): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+34 more)

### Community 47 - "anthropic-models.controller.ts"
Cohesion: 0.30
Nodes (9): AnthropicErrorBodyDto, AnthropicErrorResponseDto, ApiProperty, AnthropicModelDto, AnthropicModelsListResponseDto, ApiProperty, mapGatewayModelsListToAnthropic(), mapGatewayModelToAnthropic() (+1 more)

### Community 48 - "api/src/app.module.ts"
Cohesion: 0.06
Nodes (40): AppModule, Module, AuthModule, Module, CompanyContextModule, Module, ContentModule, Module (+32 more)

### Community 49 - "ChatParamsDto"
Cohesion: 0.09
Nodes (23): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+15 more)

### Community 50 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+2 more)

### Community 51 - "agent-answers.schema.ts"
Cohesion: 0.11
Nodes (21): ClientAddAnswers, ClientAddAnswersSchema, ClientEditAnswers, ClientEditAnswersSchema, ClientRemoveAnswers, ClientRemoveAnswersSchema, InitAnswersSchema, ModelAddAnswers (+13 more)

### Community 52 - "chat-error-handler.service.ts"
Cohesion: 0.23
Nodes (11): isAuthError(), isClientError(), isInvalidRequestStatus(), isProviderRateLimitError(), isRateLimitStatus(), isServerError(), mapAnthropicSdkError(), AnthropicExceptionFilter (+3 more)

### Community 53 - "semantic-cache.service.ts"
Cohesion: 0.12
Nodes (19): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, isSingleTurnUserRequest(), lastUserMessageText(), embeddingProbeTimeoutMs() (+11 more)

### Community 54 - "isRecord"
Cohesion: 0.11
Nodes (30): metadata, parseReviewFields(), parseArchiveRunItem(), parseArchiveRunsPage(), parseRunCore(), parseRunSnapshot(), parseStartedBy(), parseUserRunItem() (+22 more)

### Community 55 - "CompanyContext"
Cohesion: 0.23
Nodes (6): CompanyContext, emptyCompanyContext(), jsonArray(), jsonRecord(), PrismaCompanyContextAdapter, Injectable

### Community 56 - "llm-hop.ts"
Cohesion: 0.08
Nodes (45): Inject, coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema, pageOutlineSectionSchema (+37 more)

### Community 57 - "result-edit-payload.ts"
Cohesion: 0.14
Nodes (18): buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload() (+10 more)

### Community 58 - "RedisConnectionService"
Cohesion: 0.30
Nodes (3): RedisConnectionService, Injectable, isRedisRequiredFromConfig()

### Community 59 - "HealthController"
Cohesion: 0.16
Nodes (11): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, HealthModule, Module (+3 more)

### Community 60 - "AppMetricsService"
Cohesion: 0.12
Nodes (5): HttpMetricsMiddleware, Injectable, AppMetricsService, Inject, Injectable

### Community 61 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 62 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.11
Nodes (16): HealthModule, Module, LoggingModule, Global, Module, ProviderInstancesBootstrap, Injectable, ProviderRegistryModule (+8 more)

### Community 63 - "response-cache.service.ts"
Cohesion: 0.11
Nodes (14): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+6 more)

### Community 64 - "configuration.ts"
Cohesion: 0.05
Nodes (62): collectPendingSecrets(), CliValidateOptions, UnsupportedProviderException, ModelId, collectInactiveProviderWarnings(), formatZodIssues(), validateGatewayConfig(), ValidationOptions (+54 more)

### Community 65 - "InvitationsController"
Cohesion: 0.10
Nodes (16): ListInvitationsUseCase, Inject, Injectable, RevokeInvitationUseCase, Inject, Injectable, InvitationsController, ApiCookieAuth (+8 more)

### Community 66 - "anthropic-messages.controller.ts"
Cohesion: 0.06
Nodes (41): GATEWAY_CACHE_HEADER, ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength (+33 more)

### Community 67 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.07
Nodes (30): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+22 more)

### Community 69 - "should-include-redis-stack.ts"
Cohesion: 0.18
Nodes (11): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis() (+3 more)

### Community 70 - "provider-error.mapper.ts"
Cohesion: 0.31
Nodes (10): ApiErrorPayload, MappedProviderError, isTimeoutStatus(), nameLooksLikeTimeout(), readErrorMessage(), readNumericStatus(), mapGoogleGenAiError(), payloadOf() (+2 more)

### Community 71 - "branded.types.ts"
Cohesion: 0.08
Nodes (37): convertRateLimit(), CliRateLimit, GatewayClient, ClientManagerService, Injectable, EnvPatchService, EnvPatchValue, Injectable (+29 more)

### Community 72 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 73 - "ClientRemoveCommand"
Cohesion: 0.33
Nodes (3): ClientRemoveCommand, Command, Option

### Community 74 - ".getOne"
Cohesion: 0.19
Nodes (11): ApiAnthropicErrorResponses(), AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+3 more)

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - ".getOne"
Cohesion: 0.19
Nodes (10): OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+2 more)

### Community 77 - "filters/http-exception.filter.ts"
Cohesion: 0.21
Nodes (7): DEFAULT_HTTP_STATUS_TO_CODE, GlobalExceptionFilter, isPayloadTooLargeError(), PayloadTooLargeError, RequestWithId, Catch, Injectable

### Community 78 - "CompanyContextRepository"
Cohesion: 0.21
Nodes (11): GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PutCompanyContextUseCase, Inject (+3 more)

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.16
Nodes (17): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), GatewayChatResponse (+9 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - "metrics.ts"
Cohesion: 0.06
Nodes (62): getClientConversationId(), getOrCreateConversationIdForResponse(), buildAppProviderMetricsContext(), buildLlmMetricsContext(), mapProviderResponseToAiObservation(), mapProviderResponseToUsage(), toMetricsMessages(), buildProviderInputForAlias() (+54 more)

### Community 82 - "event-source-registry-provider.tsx"
Cohesion: 0.43
Nodes (5): EventSourceRegistryContext, EventSourceRegistryProvider(), createEventSourceRegistry(), EventSourceRegistry, RegistryEntry

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 85 - "social.types.ts"
Cohesion: 0.06
Nodes (41): ContentPipelineFacade, toOutcome(), Injectable, ContentRunExecutor, isCanonicalOutlineSelection(), isMissingContentKind(), Inject, Injectable (+33 more)

### Community 86 - "getAppConfig"
Cohesion: 0.17
Nodes (12): readGatewayKeyHeader(), getAppConfig(), GatewayKeyGuard, Injectable, enrichRequestWithClientId(), AnthropicApiKeyGuard, readAnthropicApiKey(), Injectable (+4 more)

### Community 87 - "semantic-cache.constants.ts"
Cohesion: 0.14
Nodes (11): EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema(), EMBEDDING_CIRCUIT_COOLDOWN_MS, EMBEDDING_CIRCUIT_OPEN_AFTER, EMBEDDING_PROBE_TIMEOUT_MS (+3 more)

### Community 88 - "company-context.mapper.ts"
Cohesion: 0.16
Nodes (11): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+3 more)

### Community 89 - "apiFetch"
Cohesion: 0.07
Nodes (46): metadata, geistMono, geistSans, metadata, acceptInvite(), bootstrapAdmin(), Credentials, fetchBootstrapStatus() (+38 more)

### Community 90 - "HealthController"
Cohesion: 0.31
Nodes (6): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get

### Community 91 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 92 - "public.decorator.ts"
Cohesion: 0.38
Nodes (3): IS_PUBLIC_KEY, JwtAuthGuard, Injectable

### Community 93 - "OllamaEmbeddingAdapter"
Cohesion: 0.24
Nodes (3): OllamaEmbeddingAdapter, Injectable, EmbeddingBackend

### Community 94 - "swagger.setup.ts"
Cohesion: 0.07
Nodes (34): ChatCacheSource, ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional (+26 more)

### Community 95 - "GatewayModelDto"
Cohesion: 0.36
Nodes (6): GatewayModelCapabilitiesDto, GatewayModelDto, ApiProperty, ApiPropertyOptional, ModelsListResponseDto, ApiProperty

### Community 96 - "RefreshSessionRepository"
Cohesion: 0.12
Nodes (7): Inject, Inject, RefreshSessionRecord, RefreshSessionRepository, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 99 - "ProviderAddCommand"
Cohesion: 0.31
Nodes (3): ProviderAddCommand, Command, Option

### Community 101 - "PrismaService"
Cohesion: 0.07
Nodes (28): CreateFeedbackUseCase, Inject, Injectable, agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_RUN_READER, FeedbackRunLookup (+20 more)

### Community 102 - "anthropic.module.ts"
Cohesion: 0.21
Nodes (10): ChatModule, Module, AnthropicModule, Module, IntegrationsModule, Module, OpenAiModule, Module (+2 more)

### Community 104 - "http-metrics.interceptor.ts"
Cohesion: 0.21
Nodes (10): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, gatewayErrorsTotal, httpRequestDurationSeconds, httpRequestsTotal (+2 more)

### Community 105 - "metrics.module.ts"
Cohesion: 0.19
Nodes (8): MetricsController, Controller, Get, Res, MetricsModule, Module, MetricsService, Injectable

### Community 107 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 108 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 109 - "ProviderEditCommand"
Cohesion: 0.33
Nodes (3): ProviderEditCommand, Command, Option

### Community 110 - "LoggingService"
Cohesion: 0.08
Nodes (13): CacheModule, Module, CacheRegistryService, Injectable, Inject, Inject, VectorStore, Inject (+5 more)

### Community 111 - "LlmGatewayHttpAdapter"
Cohesion: 0.21
Nodes (5): LlmGatewayHttpAdapter, Inject, Injectable, GATEWAY_ERROR_CODE_LABELS, toGatewayErrorCodeLabel()

### Community 112 - "patch-company-context.use-case.ts"
Cohesion: 0.27
Nodes (8): toPublicCompanyContext(), PatchCompanyContextUseCase, Inject, Injectable, assertCompanyContextWritable(), PartialCompanyContext, isComplete(), mergeCompanyContext()

### Community 113 - "ProviderRemoveCommand"
Cohesion: 0.33
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 114 - "cn"
Cohesion: 0.04
Nodes (62): logoutSession(), FeedbackCta(), FloatingRunsBox(), handleChevronClick(), toggleCollapsed(), StartAgentDialog(), EMPTY_START_DRAFT, StartRunDraft (+54 more)

### Community 117 - "domain/company-context.types.ts"
Cohesion: 0.18
Nodes (18): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CompanyContextWriteDetail (+10 more)

### Community 119 - "CompanyContextController"
Cohesion: 0.22
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 121 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

## Knowledge Gaps
- **375 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+370 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1087 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ModelAlias` connect `ModelAlias` to `configuration.ts`, `GatewayModelsCatalogService`, `app-metrics-backend.interface.ts`, `branded.types.ts`, `.info`, `app-metrics.service.ts`, `ai-provider.interface.ts`, `types/index.ts`, `metrics.ts`, `redis-vector-store.adapter.ts`, `model-manager.service.ts`, `sentry-ai-metrics.adapter.ts`, `asProviderInstanceId`, `GatewayKey`, `PrometheusAppMetricsAdapter`, `swagger.setup.ts`, `AppMetricsService`, `chat.service.ts`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `ModelAlias` to `logging.service.ts`, `.info`, `ai-provider.interface.ts`, `GatewayConfig`, `model-manager.service.ts`, `sentry-ai-metrics.adapter.ts`, `asProviderInstanceId`, `GatewayKey`, `PrometheusAppMetricsAdapter`, `chat.service.ts`, `app-metrics-backend.interface.ts`, `app-metrics.service.ts`, `types/index.ts`, `AppMetricsService`, `configuration.ts`, `branded.types.ts`, `metrics.ts`, `swagger.setup.ts`, `GatewayModelsCatalogService`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Why does `LoggingService` connect `LoggingService` to `logging.service.ts`, `anthropic/anthropic-tools.mapper.ts`, `ai-provider.interface.ts`, `redis-vector-store.adapter.ts`, `GatewayKey`, `chat.service.ts`, `ai-provider-gateway/src/health/health.service.ts`, `ai-provider-gateway/src/main.ts`, `google-tools.mapper.ts`, `types/index.ts`, `chat-error-handler.service.ts`, `semantic-cache.service.ts`, `RedisConnectionService`, `ai-provider-gateway/src/app.module.ts`, `response-cache.service.ts`, `configuration.ts`, `filters/http-exception.filter.ts`, `metrics.ts`, `OllamaEmbeddingAdapter`, `swagger.setup.ts`, `ProviderRegistryService`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _375 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `prisma-invitation.adapter.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1265597147950089 - nodes in this community are weakly interconnected._
- **Should `SocialResultStore` be split into smaller, more focused modules?**
  _Cohesion score 0.06954997077732321 - nodes in this community are weakly interconnected._