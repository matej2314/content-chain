# Graph Report - content-chain  (2026-09-28)

## Corpus Check
- 636 files · ~188,776 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .css 1)

## Summary
- 4109 nodes · 12638 edges · 136 communities (123 shown, 12 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 391 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2a8f3049`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- prisma-invitation.adapter.ts
- social.types.ts
- api/company-context.types.ts
- exitWithAgentReport
- runs.types.ts
- run-details-view.tsx
- ModelAlias
- logging.module.ts
- anthropic/anthropic-tools.mapper.ts
- KeyGenerateCommand
- config-generator.service.ts
- UserRepository
- social.graph.ts
- branded.types.ts
- GatewayConfig
- models.controller.ts
- anthropic-response.mapper.ts
- redis-vector-store.adapter.ts
- AuthUserContext
- model-manager.service.ts
- sentry-ai-metrics.adapter.ts
- cli.module.ts
- GatewayKey
- anthropic-messages.controller.ts
- PrometheusAppMetricsAdapter
- openai-params-provider.mapper.ts
- RunRepository
- runs.controller.ts
- save-output-edited.use-case.ts
- api/src/main.ts
- chat.service.ts
- ai-provider-gateway/src/health/health.service.ts
- swagger.setup.ts
- google-tools.mapper.ts
- AnthropicMessagesRequestDto
- runs-result.types.ts
- app-metrics.service.ts
- enums.ts
- feedback.api.ts
- LoginDto
- new-ids.ts
- prisma-run.adapter.ts
- openai-models.controller.ts
- ids.ts
- MetricsController
- auth.module.ts
- provider-registry.service.ts
- anthropic-models.controller.ts
- social-pipeline.facade.ts
- chat-params.dto.ts
- ListRunsQueryDto
- agent-answers.schema.ts
- provider-error.mapper.ts
- semantic-cache.service.ts
- isRecord
- CompanyContextRepository
- llm-hop.ts
- result-edit-payload.ts
- types/index.ts
- HealthController
- AppMetricsService
- company-context.dto.ts
- ai-provider-gateway/src/app.module.ts
- response-cache.service.ts
- asProviderInstanceId
- invite-user.use-case.ts
- metrics.ts
- ModelRemoveCommand
- OpenAiChatCompletionRequestDto
- DomainException
- responses.adapter.ts
- configuration.ts
- ClientAddCommand
- ClientRemoveCommand
- ConfigInitCommand
- parse-verifier-log-message.ts
- start-run.use-case.ts
- ChatParamsDto
- company-context.controller.ts
- llm-gateway.http.adapter.ts
- PrometheusService
- chat-completions.adapter.ts
- event-source-registry-provider.tsx
- SPEC — README
- ModelAddCommand
- api/src/app.module.ts
- openai-messages-provider.mapper.ts
- OpenAiChatMessageDto
- users.controller.ts
- apiFetch
- HealthController
- StartRunDto
- public.decorator.ts
- openai-messages.mapper.ts
- ChatToolingDto
- resolve-provider-call-options.ts
- PrismaRefreshSessionAdapter
- route.ts
- ProviderTestCommand
- ProviderAddCommand
- auth.schemas.ts
- PrismaService
- anthropic.module.ts
- ClientListCommand
- http-metrics.interceptor.ts
- metrics.module.ts
- ConfigSecretsStatusCommand
- ModelEditCommand
- EnvironmentVariables
- ProviderEditCommand
- LoggingService
- LlmGatewayHttpAdapter
- company-context.mapper.ts
- ProviderRemoveCommand
- cn
- ConfigShowCommand
- ModelListCommand
- domain/company-context.types.ts
- ProviderListCommand
- CompanyContextController
- openai-chat-message.dto.ts
- ClientEditCommand
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
7. `cn()` - 62 edges
8. `isRecord()` - 60 edges
9. `GatewayKey` - 59 edges
10. `ClientId` - 54 edges

## Surprising Connections (you probably didn't know these)
- `CardDescription()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/card.tsx → apps/frontend/src/shared/utils/utils.ts
- `CardAction()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/card.tsx → apps/frontend/src/shared/utils/utils.ts
- `CardFooter()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/card.tsx → apps/frontend/src/shared/utils/utils.ts
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `CacheRegistryService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/cache-registry.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (136 total, 12 thin omitted)

### Community 0 - "prisma-invitation.adapter.ts"
Cohesion: 0.17
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 1 - "social.types.ts"
Cohesion: 0.05
Nodes (40): ContentPipelineInput, ContentRefineSnapshot, PageDocument, PageOutlineSection, PageOutlineSectionRole, CompositeRunResultReader, GetRunOutput, orderItemsBySelectedIds() (+32 more)

### Community 2 - "api/company-context.types.ts"
Cohesion: 0.06
Nodes (68): metadata, fetchCompanyContext(), fetchCompleteness(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras (+60 more)

### Community 3 - "exitWithAgentReport"
Cohesion: 0.14
Nodes (25): AgentReport, AgentReportStatus, emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), loadAnswers(), assertAgentHasAnswers(), CliMode (+17 more)

### Community 4 - "runs.types.ts"
Cohesion: 0.04
Nodes (74): metadata, assertNever(), notifyProduct(), notifyRunTerminal(), EnvelopeRef, ProductToast, RunTerminalInput, RunTerminalOutcome (+66 more)

### Community 5 - "run-details-view.tsx"
Cohesion: 0.07
Nodes (49): metadata, metadata, FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, FALLBACK, FeedbackFormProps, CONTENT_KIND_LABELS, LANGUAGE_LABELS (+41 more)

### Community 6 - "ModelAlias"
Cohesion: 0.07
Nodes (6): ProviderTestOptions, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, AppMetricsBackend

### Community 7 - "logging.module.ts"
Cohesion: 0.06
Nodes (21): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+13 more)

### Community 8 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.09
Nodes (40): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent() (+32 more)

### Community 9 - "KeyGenerateCommand"
Cohesion: 0.31
Nodes (3): KeyGenerateCommand, Command, Option

### Community 10 - "config-generator.service.ts"
Cohesion: 0.14
Nodes (13): isRedisRequired(), ConfigGeneratorService, Injectable, FileManagerService, Injectable, WizardRunResult, ClientCli, EnvTemplateInput (+5 more)

### Community 11 - "UserRepository"
Cohesion: 0.09
Nodes (16): Inject, Inject, Inject, Inject, AuthUser, JwtPayload, UserListItem, CreateAdminIfNoneData (+8 more)

### Community 12 - "social.graph.ts"
Cohesion: 0.12
Nodes (33): loadPromptFromDir(), coercePassNoteVerdict(), isPassOnlyIssue(), ideasOutputSchema, reelIdeasOutputSchema, isReelTaskType(), ReelTaskType, canRefine() (+25 more)

### Community 13 - "branded.types.ts"
Cohesion: 0.07
Nodes (54): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatCacheSource, ChatResponseData, toChatResponseDto(), ChatWarningDto, ApiProperty (+46 more)

### Community 14 - "GatewayConfig"
Cohesion: 0.09
Nodes (15): ClientManagerService, Injectable, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable, EnvPatchService, Injectable, ProviderManagerService (+7 more)

### Community 15 - "models.controller.ts"
Cohesion: 0.10
Nodes (22): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+14 more)

### Community 16 - "anthropic-response.mapper.ts"
Cohesion: 0.07
Nodes (46): SseDoneEvent, fromGatewayToolCallDto(), asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto (+38 more)

### Community 17 - "redis-vector-store.adapter.ts"
Cohesion: 0.07
Nodes (31): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, EmbeddingCircuitBreaker, escapeRedisSearchTag(), normalizeEmbeddingModelForIndex(), semanticIndexName() (+23 more)

### Community 18 - "AuthUserContext"
Cohesion: 0.07
Nodes (32): ApiCookieAuth, Get, Patch, Body, Body, HttpCode, Post, CreateFeedbackDto (+24 more)

### Community 19 - "model-manager.service.ts"
Cohesion: 0.12
Nodes (25): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, defaultModelPolicy(), ModelEditField, ModelManagerService, Injectable (+17 more)

### Community 20 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.08
Nodes (33): CostUsd, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes() (+25 more)

### Community 21 - "cli.module.ts"
Cohesion: 0.06
Nodes (49): assertInteractiveAllowed(), CliModule, Module, WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, GatewayCommand, Command (+41 more)

### Community 22 - "GatewayKey"
Cohesion: 0.07
Nodes (26): ChatErrorHandlerService, Injectable, ChatProviderCooldownService, Injectable, ApiErrorCode, ApiErrorPayload, isProviderRateLimitError(), resolveClientIdFromKey() (+18 more)

### Community 23 - "anthropic-messages.controller.ts"
Cohesion: 0.03
Nodes (67): ApiHeader, GATEWAY_CACHE_HEADER, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags (+59 more)

### Community 24 - "PrometheusAppMetricsAdapter"
Cohesion: 0.10
Nodes (7): PrometheusAppMetricsAdapter, Injectable, resolveAppMetricsBackend(), AppProviderCallContext, AppProviderStreamScope, AppRequestLabels, AppTokenUsage

### Community 25 - "openai-params-provider.mapper.ts"
Cohesion: 0.12
Nodes (24): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+16 more)

### Community 26 - "RunRepository"
Cohesion: 0.05
Nodes (27): Inject, InProcessRunWorker, Inject, Injectable, RecoverInterruptedRunsUseCase, Inject, Injectable, Inject (+19 more)

### Community 27 - "runs.controller.ts"
Cohesion: 0.05
Nodes (46): FinalizeReviewUseCase, Inject, Injectable, GetRunLogsOutput, GetRunLogsUseCase, Inject, Injectable, GetRunUseCase (+38 more)

### Community 28 - "save-output-edited.use-case.ts"
Cohesion: 0.09
Nodes (32): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+24 more)

### Community 29 - "api/src/main.ts"
Cohesion: 0.33
Nodes (6): AppModule, Module, bootstrap(), parseCorsOrigins(), configureHttpApp(), buildSwaggerConfig()

### Community 30 - "chat.service.ts"
Cohesion: 0.07
Nodes (52): SemanticStoreEmbedState, VectorStorePartition, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize (+44 more)

### Community 31 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.09
Nodes (21): EMBEDDING_BACKEND, VECTOR_STORE, RedisConsumer, HealthCheckItemDto, ApiProperty, HealthLivenessResponseDto, ApiProperty, HealthReadinessChecksDto (+13 more)

### Community 32 - "swagger.setup.ts"
Cohesion: 0.08
Nodes (29): AppModule, Module, ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional (+21 more)

### Community 33 - "google-tools.mapper.ts"
Cohesion: 0.15
Nodes (26): mapProviderResponseToAiObservation(), toCachedChatResponse(), asInputTokens(), asOutputTokens(), buildGenerationConfig(), createGoogleProvider(), getFinalToolCalls(), getStopReason() (+18 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "runs-result.types.ts"
Cohesion: 0.06
Nodes (52): PAGE_OUTLINE_ROLE_LABELS, submitHitl(), isPageOutlineSectionRole(), isReelDuration(), PAGE_OUTLINE_SECTION_ROLES, PageDocument, PageOutline, PageOutlineSection (+44 more)

### Community 36 - "app-metrics.service.ts"
Cohesion: 0.13
Nodes (15): healthStatusToGaugeValue(), APP_METRICS_BACKEND, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus, HttpMethod (+7 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "feedback.api.ts"
Cohesion: 0.31
Nodes (9): createFeedback(), CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody(), parseFeedbackCreated(), FeedbackForm(), onSubmit() (+1 more)

### Community 39 - "LoginDto"
Cohesion: 0.33
Nodes (5): LoginDto, ApiProperty, IsEmail, IsString, MinLength

### Community 40 - "new-ids.ts"
Cohesion: 0.18
Nodes (7): ErrorEnvelope, HttpExceptionFilter, Catch, newInvitationId(), newRequestId(), RequestIdMiddleware, Injectable

### Community 41 - "prisma-run.adapter.ts"
Cohesion: 0.06
Nodes (24): contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, socialBriefSchema (+16 more)

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.13
Nodes (20): ApiOpenAiErrorResponses(), OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+12 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (28): brand, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createInvitationId(), createRequestId() (+20 more)

### Community 44 - "MetricsController"
Cohesion: 0.18
Nodes (7): MetricsController, ApiOperation, ApiResponse, ApiTags, Controller, Get, Header

### Community 45 - "auth.module.ts"
Cohesion: 0.04
Nodes (69): AcceptInviteUseCase, Injectable, comparePassword(), generateRefreshToken(), hashRefreshToken(), parseTtlMs(), parseTtlSeconds(), AuthTokenResult (+61 more)

### Community 46 - "provider-registry.service.ts"
Cohesion: 0.09
Nodes (29): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+21 more)

### Community 47 - "anthropic-models.controller.ts"
Cohesion: 0.11
Nodes (22): ApiAnthropicErrorResponses(), AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+14 more)

### Community 48 - "social-pipeline.facade.ts"
Cohesion: 0.13
Nodes (17): LlmGatewayError, isSocialRunRecord(), RunRecordBase, SocialRunRecord, SocialPipelineFacade, toOutcome(), Inject, Injectable (+9 more)

### Community 49 - "chat-params.dto.ts"
Cohesion: 0.24
Nodes (7): ResponseFormatDto, ApiProperty, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsThinkingBudget()

### Community 50 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+2 more)

### Community 51 - "agent-answers.schema.ts"
Cohesion: 0.11
Nodes (22): ClientAddAnswers, ClientAddAnswersSchema, ClientEditAnswers, ClientEditAnswersSchema, ClientRemoveAnswers, ClientRemoveAnswersSchema, InitAnswersSchema, ModelAddAnswers (+14 more)

### Community 52 - "provider-error.mapper.ts"
Cohesion: 0.21
Nodes (19): MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isRateLimitStatus(), isServerError(), isTimeoutStatus(), nameLooksLikeTimeout() (+11 more)

### Community 53 - "semantic-cache.service.ts"
Cohesion: 0.14
Nodes (16): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, isSingleTurnUserRequest(), lastUserMessageText(), embeddingProbeTimeoutMs() (+8 more)

### Community 54 - "isRecord"
Cohesion: 0.11
Nodes (30): metadata, parseReviewFields(), parseArchiveRunItem(), parseArchiveRunsPage(), parseRunCore(), parseRunSnapshot(), parseStartedBy(), parseUserRunItem() (+22 more)

### Community 55 - "CompanyContextRepository"
Cohesion: 0.14
Nodes (10): Inject, Inject, Inject, Inject, CompanyContextRepository, CompanyContext, jsonArray(), jsonRecord() (+2 more)

### Community 56 - "llm-hop.ts"
Cohesion: 0.11
Nodes (39): coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema, pageOutlineSectionSchema, readNonEmptyString() (+31 more)

### Community 57 - "result-edit-payload.ts"
Cohesion: 0.14
Nodes (18): buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload() (+10 more)

### Community 58 - "types/index.ts"
Cohesion: 0.11
Nodes (31): RequestIdMiddleware, Injectable, CONVERSATION_ID_PATTERN, createRequestId(), isAttemptNumber(), isBaseUrl(), isCacheTtlSeconds(), isConversationId() (+23 more)

### Community 59 - "HealthController"
Cohesion: 0.16
Nodes (11): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, HealthModule, Module (+3 more)

### Community 60 - "AppMetricsService"
Cohesion: 0.10
Nodes (5): HttpMetricsMiddleware, Injectable, AppMetricsService, Inject, Injectable

### Community 61 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 62 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.08
Nodes (25): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis() (+17 more)

### Community 63 - "response-cache.service.ts"
Cohesion: 0.09
Nodes (20): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+12 more)

### Community 64 - "asProviderInstanceId"
Cohesion: 0.06
Nodes (65): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, PendingSecretsItem, collectPendingSecrets(), DEFAULT_MODELS, convertProvider() (+57 more)

### Community 65 - "invite-user.use-case.ts"
Cohesion: 0.06
Nodes (35): Inject, InviteUserResult, inviteUserSchema, InviteUserUseCase, Inject, Injectable, InvitationListItem, ListInvitationsUseCase (+27 more)

### Community 66 - "metrics.ts"
Cohesion: 0.08
Nodes (38): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+30 more)

### Community 67 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (18): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+10 more)

### Community 69 - "DomainException"
Cohesion: 0.12
Nodes (16): AcceptInviteResult, acceptInviteSchema, hashPassword(), ReactivateUserUseCase, Injectable, updateEmailSchema, validatePasswordPolicy(), USER_REPOSITORY (+8 more)

### Community 70 - "responses.adapter.ts"
Cohesion: 0.26
Nodes (15): asToolCallId(), buildResponsesCreateParams(), createResponsesAdapter(), textStream(), mapGatewayMetadataToOpenAi(), extractResponsesToolCalls(), mapResponsesStopReason(), parseOpenAiResponse() (+7 more)

### Community 71 - "configuration.ts"
Cohesion: 0.08
Nodes (43): convertRateLimit(), CliValidateOptions, CliRateLimit, generateGatewayConfigTemplate(), AddClientInput, EditClientInput, PromptAddClientResult, RemoveClientInput (+35 more)

### Community 72 - "ClientAddCommand"
Cohesion: 0.33
Nodes (3): ClientAddCommand, Command, Option

### Community 73 - "ClientRemoveCommand"
Cohesion: 0.33
Nodes (3): ClientRemoveCommand, Command, Option

### Community 74 - "ConfigInitCommand"
Cohesion: 0.14
Nodes (8): ConfigInitCommand, Command, Option, ConfigValidateCommand, Command, Option, CliGatewayValidatorService, Injectable

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "start-run.use-case.ts"
Cohesion: 0.19
Nodes (14): isContentStartCommand(), isPlainRecord(), omitUndefinedDeep(), StartRunBriefInput, StartRunCommand, StartRunUseCase, Inject, Injectable (+6 more)

### Community 77 - "ChatParamsDto"
Cohesion: 0.20
Nodes (10): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+2 more)

### Community 78 - "company-context.controller.ts"
Cohesion: 0.29
Nodes (9): GetCompanyContextUseCase, Injectable, GetCompletenessUseCase, Injectable, PatchCompanyContextUseCase, Injectable, PutCompanyContextUseCase, Injectable (+1 more)

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.19
Nodes (16): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), GatewayChatResponse (+8 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - "chat-completions.adapter.ts"
Cohesion: 0.21
Nodes (19): toHttpException(), asSystemFingerprint(), ChatCompletionsAdapterOptions, createChatCompletionsAdapter(), textStream(), mapTurnsToOpenAiMessages(), accumulateOpenAiStreamToolCallDeltas(), extractOpenAiStreamDeltaText() (+11 more)

### Community 82 - "event-source-registry-provider.tsx"
Cohesion: 0.43
Nodes (5): EventSourceRegistryContext, EventSourceRegistryProvider(), createEventSourceRegistry(), EventSourceRegistry, RegistryEntry

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 85 - "api/src/app.module.ts"
Cohesion: 0.07
Nodes (35): CompanyContextModule, Module, ContentPipelineFacade, toOutcome(), Inject, Injectable, ContentRunExecutor, isCanonicalOutlineSelection() (+27 more)

### Community 86 - "openai-messages-provider.mapper.ts"
Cohesion: 0.27
Nodes (7): ProviderAssistantTurn, ProviderChatTurn, ProviderToolResultTurn, ChatCompletionMessageParam, mapAssistantTurn(), mapAssistantTurnToResponsesInput(), mapTurnsToResponsesInput()

### Community 87 - "OpenAiChatMessageDto"
Cohesion: 0.22
Nodes (9): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+1 more)

### Community 88 - "users.controller.ts"
Cohesion: 0.07
Nodes (24): ListUsersUseCase, Inject, Injectable, SoftDeleteUserUseCase, Inject, Injectable, PatchUserDto, ApiProperty (+16 more)

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

### Community 93 - "openai-messages.mapper.ts"
Cohesion: 0.42
Nodes (6): mapOpenAiMessagesToGateway(), mapOpenAiToolCalls(), mapOpenAiChatRequestToGateway(), mapOpenAiToolChoice(), mapOpenAiToolsToGateway(), OpenAiFunctionTool

### Community 94 - "ChatToolingDto"
Cohesion: 0.16
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 95 - "resolve-provider-call-options.ts"
Cohesion: 0.48
Nodes (5): clamp(), isOverrideKey(), resolveProviderCallOptions(), OVERRIDE_KEYS, OverrideKey

### Community 96 - "PrismaRefreshSessionAdapter"
Cohesion: 0.27
Nodes (4): RefreshSessionRecord, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 98 - "ProviderTestCommand"
Cohesion: 0.33
Nodes (3): ProviderTestCommand, Command, Option

### Community 99 - "ProviderAddCommand"
Cohesion: 0.31
Nodes (3): ProviderAddCommand, Command, Option

### Community 100 - "auth.schemas.ts"
Cohesion: 0.29
Nodes (6): BootstrapAdminInput, bootstrapAdminSchema, LoginInput, loginSchema, PatchUserCommand, patchUserSchema

### Community 101 - "PrismaService"
Cohesion: 0.06
Nodes (28): CreateFeedbackUseCase, Inject, Injectable, agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_RUN_READER, FeedbackRunLookup (+20 more)

### Community 102 - "anthropic.module.ts"
Cohesion: 0.21
Nodes (10): ChatModule, Module, AnthropicModule, Module, IntegrationsModule, Module, OpenAiModule, Module (+2 more)

### Community 103 - "ClientListCommand"
Cohesion: 0.40
Nodes (3): ClientListCommand, Command, Option

### Community 104 - "http-metrics.interceptor.ts"
Cohesion: 0.21
Nodes (10): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, gatewayErrorsTotal, httpRequestDurationSeconds, httpRequestsTotal (+2 more)

### Community 105 - "metrics.module.ts"
Cohesion: 0.19
Nodes (8): MetricsController, Controller, Get, Res, MetricsModule, Module, MetricsService, Injectable

### Community 106 - "ConfigSecretsStatusCommand"
Cohesion: 0.40
Nodes (3): ConfigSecretsStatusCommand, Command, Option

### Community 107 - "ModelEditCommand"
Cohesion: 0.33
Nodes (3): ModelEditCommand, Command, Option

### Community 108 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 109 - "ProviderEditCommand"
Cohesion: 0.33
Nodes (3): ProviderEditCommand, Command, Option

### Community 110 - "LoggingService"
Cohesion: 0.05
Nodes (25): RedisConnectionService, Injectable, Inject, OllamaEmbeddingAdapter, Injectable, EmbeddingBackend, Inject, isRedisRequiredFromConfig() (+17 more)

### Community 111 - "LlmGatewayHttpAdapter"
Cohesion: 0.21
Nodes (5): LlmGatewayHttpAdapter, Inject, Injectable, GATEWAY_ERROR_CODE_LABELS, toGatewayErrorCodeLabel()

### Community 112 - "company-context.mapper.ts"
Cohesion: 0.20
Nodes (11): toPublicCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, assertCompanyContextWritable(), PartialCompanyContext (+3 more)

### Community 113 - "ProviderRemoveCommand"
Cohesion: 0.33
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 114 - "cn"
Cohesion: 0.04
Nodes (62): logoutSession(), FeedbackCta(), FloatingRunsBox(), handleChevronClick(), toggleCollapsed(), StartAgentDialog(), EMPTY_START_DRAFT, StartRunDraft (+54 more)

### Community 115 - "ConfigShowCommand"
Cohesion: 0.40
Nodes (3): ConfigShowCommand, Command, Option

### Community 116 - "ModelListCommand"
Cohesion: 0.40
Nodes (3): ModelListCommand, Command, Option

### Community 117 - "domain/company-context.types.ts"
Cohesion: 0.19
Nodes (18): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, Completeness (+10 more)

### Community 118 - "ProviderListCommand"
Cohesion: 0.40
Nodes (3): ProviderListCommand, Command, Option

### Community 119 - "CompanyContextController"
Cohesion: 0.13
Nodes (11): toCompanyContext(), toPartialCompanyContext(), CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Body, Controller (+3 more)

### Community 120 - "openai-chat-message.dto.ts"
Cohesion: 0.60
Nodes (3): isTextContentItem(), normalizeOpenAiContent(), TextContentItem

### Community 121 - "ClientEditCommand"
Cohesion: 0.33
Nodes (3): ClientEditCommand, Command, Option

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

## Knowledge Gaps
- **376 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+371 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1088 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ModelAlias` connect `ModelAlias` to `asProviderInstanceId`, `metrics.ts`, `app-metrics.service.ts`, `configuration.ts`, `config-generator.service.ts`, `branded.types.ts`, `provider-registry.service.ts`, `models.controller.ts`, `redis-vector-store.adapter.ts`, `model-manager.service.ts`, `sentry-ai-metrics.adapter.ts`, `semantic-cache.service.ts`, `GatewayKey`, `cli.module.ts`, `PrometheusAppMetricsAdapter`, `types/index.ts`, `AppMetricsService`, `chat.service.ts`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `ModelAlias` to `exitWithAgentReport`, `logging.module.ts`, `config-generator.service.ts`, `branded.types.ts`, `GatewayConfig`, `models.controller.ts`, `model-manager.service.ts`, `sentry-ai-metrics.adapter.ts`, `cli.module.ts`, `GatewayKey`, `PrometheusAppMetricsAdapter`, `app-metrics.service.ts`, `provider-registry.service.ts`, `types/index.ts`, `AppMetricsService`, `asProviderInstanceId`, `metrics.ts`, `configuration.ts`, `ProviderTestCommand`, `LoggingService`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Why does `LoggingService` connect `LoggingService` to `swagger.setup.ts`, `google-tools.mapper.ts`, `asProviderInstanceId`, `responses.adapter.ts`, `logging.module.ts`, `anthropic/anthropic-tools.mapper.ts`, `branded.types.ts`, `provider-registry.service.ts`, `redis-vector-store.adapter.ts`, `chat-completions.adapter.ts`, `semantic-cache.service.ts`, `GatewayKey`, `ai-provider-gateway/src/health/health.service.ts`, `chat.service.ts`, `response-cache.service.ts`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _376 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04681467181467181 - nodes in this community are weakly interconnected._
- **Should `api/company-context.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05540499849442939 - nodes in this community are weakly interconnected._