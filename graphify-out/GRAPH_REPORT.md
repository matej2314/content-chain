# Graph Report - content-chain  (2026-09-28)

## Corpus Check
- 636 files · ~188,879 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .css 1)

## Summary
- 4113 nodes · 12643 edges · 129 communities (115 shown, 13 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 391 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0a5b3f36`
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
- branded.types.ts
- EnvRef
- config-generator.service.ts
- UserRepository
- social.graph.ts
- ai-provider.interface.ts
- GatewayConfig
- ApiRequestIdHeader
- anthropic-response.mapper.ts
- redis-vector-store.adapter.ts
- auth.controller.ts
- model-manager.service.ts
- sentry-ai-metrics.adapter.ts
- asClientId
- GatewayKey
- openai-chat-completions.controller.ts
- chat-stream.controller.ts
- openai-params-provider.mapper.ts
- runs.module.ts
- RunRepository
- save-output-edited.use-case.ts
- api/src/main.ts
- ClientId
- HealthService
- swagger.setup.ts
- provider-instances.bootstrap.ts
- AnthropicMessagesRequestDto
- runs-result.types.ts
- RunRecord
- enums.ts
- feedback.api.ts
- AuthController
- HttpExceptionFilter
- prisma-run.adapter.ts
- openai-models.controller.ts
- ids.ts
- .getMetrics
- bootstrap-admin.use-case.ts
- types/index.ts
- anthropic-messages.controller.ts
- getAppConfig
- ChatParamsDto
- ListRunsQueryDto
- cli.module.ts
- api-error.code.ts
- semantic-cache.service.ts
- isRecord
- CompanyContext
- content.graph.ts
- result-edit-payload.ts
- semantic-cache.constants.ts
- HealthController
- InvitationsController
- company-context.dto.ts
- ai-provider-gateway/src/health/health.service.ts
- cache.module.ts
- asProviderInstanceId
- auth.module.ts
- provider-input.ts
- ModelRemoveCommand
- OpenAiChatCompletionRequestDto
- RunSseHub
- company-context.mapper.ts
- configuration.ts
- ClientAddCommand
- ClientRemoveCommand
- ConfigInitCommand
- parse-verifier-log-message.ts
- run.types.ts
- openai-stream.mapper.ts
- company-context.controller.ts
- llm-gateway.http.adapter.ts
- PrometheusService
- responses.adapter.ts
- event-source-registry-provider.tsx
- SPEC — README
- run.schemas.ts
- api/src/app.module.ts
- RedisConnectionService
- OpenAiChatMessageDto
- DomainException
- apiFetch
- filters/http-exception.filter.ts
- runs.controller.ts
- public.decorator.ts
- prisma-output-edited.adapter.ts
- ChatToolingDto
- chat.service.ts
- PrismaRefreshSessionAdapter
- route.ts
- models.controller.ts
- ProviderAddCommand
- openai-chat-completion-response.dto.ts
- PrismaService
- ai-provider-gateway/src/app.module.ts
- ErrorEnvelopeDto
- http-metrics.interceptor.ts
- metrics.module.ts
- RolesGuard
- ModelEditCommand
- EnvironmentVariables
- LoggingService
- LlmGatewayHttpAdapter
- patch-company-context.use-case.ts
- cn
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
- `ProviderTestOptions` --references--> `ProviderInstanceId`  [EXTRACTED]
  apps/ai-provider-gateway/src/cli/commands/provider/provider-test.command.ts → apps/ai-provider-gateway/src/common/types/branded.types.ts
- `mapGatewayResponseToAnthropicFormat()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/anthropic/mappers/anthropic-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `optionalEnvRefSchema` --calls--> `asEnvRef()`  [EXTRACTED]
  apps/ai-provider-gateway/src/config/gateway-config.schema.ts → apps/ai-provider-gateway/src/common/types/branded.types.ts
- `CardDescription()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/card.tsx → apps/frontend/src/shared/utils/utils.ts
- `CardAction()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/card.tsx → apps/frontend/src/shared/utils/utils.ts

## Import Cycles
- None detected.

## Communities (129 total, 13 thin omitted)

### Community 0 - "prisma-invitation.adapter.ts"
Cohesion: 0.15
Nodes (16): JwtPayload, AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord (+8 more)

### Community 1 - "social.types.ts"
Cohesion: 0.06
Nodes (28): PageOutline, CompositeRunResultReader, GetRunOutput, RunResultReader, ContentBrief, SocialBrief, EmptyRunResultReader, Injectable (+20 more)

### Community 2 - "api/company-context.types.ts"
Cohesion: 0.06
Nodes (68): metadata, fetchCompanyContext(), fetchCompleteness(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras (+60 more)

### Community 3 - "exitWithAgentReport"
Cohesion: 0.13
Nodes (14): emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), resolveCliMode(), toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList() (+6 more)

### Community 4 - "runs.types.ts"
Cohesion: 0.04
Nodes (74): metadata, assertNever(), notifyProduct(), notifyRunTerminal(), EnvelopeRef, ProductToast, RunTerminalInput, RunTerminalOutcome (+66 more)

### Community 5 - "run-details-view.tsx"
Cohesion: 0.07
Nodes (49): metadata, metadata, FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, FALLBACK, FeedbackFormProps, CONTENT_KIND_LABELS, LANGUAGE_LABELS (+41 more)

### Community 6 - "ModelAlias"
Cohesion: 0.04
Nodes (36): AddModelInput, HttpMetricsMiddleware, Injectable, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, healthStatusToGaugeValue() (+28 more)

### Community 7 - "logging.module.ts"
Cohesion: 0.07
Nodes (22): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, SentryErrorReportingAdapter, Injectable (+14 more)

### Community 8 - "branded.types.ts"
Cohesion: 0.06
Nodes (70): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, toCachedChatResponse(), asInputTokens(), asOutputTokens(), asPromptCacheCreationTokens(), asPromptCacheHitTokens() (+62 more)

### Community 9 - "EnvRef"
Cohesion: 0.11
Nodes (12): KeyGenerateCommand, Command, Option, EnvPatchService, Injectable, KeyPromptService, Injectable, ClientCli (+4 more)

### Community 10 - "config-generator.service.ts"
Cohesion: 0.10
Nodes (18): CliGatewayValidatorService, Injectable, WizardState, ConfigGeneratorService, Injectable, FileManagerService, Injectable, Injectable (+10 more)

### Community 11 - "UserRepository"
Cohesion: 0.08
Nodes (17): BootstrapStatusUseCase, Inject, Injectable, Inject, Inject, Inject, Inject, AuthUser (+9 more)

### Community 12 - "social.graph.ts"
Cohesion: 0.12
Nodes (34): loadPromptFromDir(), coercePassNoteVerdict(), isPassOnlyIssue(), ideasOutputSchema, reelIdeasOutputSchema, verifierOutputSchema, isReelTaskType(), ReelTaskType (+26 more)

### Community 13 - "ai-provider.interface.ts"
Cohesion: 0.08
Nodes (47): serializeCallParamsForCache(), CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatResponseData, toChatResponseDto(), ChatWarningDto, ApiProperty (+39 more)

### Community 14 - "GatewayConfig"
Cohesion: 0.12
Nodes (11): ClientManagerService, Injectable, normalizeGatewayConfigForWrite(), ProviderManagerService, Injectable, ApplyMutationResult, EditProviderInput, RemoveProviderInput (+3 more)

### Community 15 - "ApiRequestIdHeader"
Cohesion: 0.09
Nodes (21): ApiBody, ApiOperation, ApiProduces, ApiResponse, Body, Post, Req, Res (+13 more)

### Community 16 - "anthropic-response.mapper.ts"
Cohesion: 0.14
Nodes (24): SseDoneEvent, asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto, AnthropicTextContentBlockDto (+16 more)

### Community 17 - "redis-vector-store.adapter.ts"
Cohesion: 0.12
Nodes (21): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), asString(), ParsedKnnHits, parseKnnHits() (+13 more)

### Community 18 - "auth.controller.ts"
Cohesion: 0.07
Nodes (30): MeUseCase, Injectable, AcceptInviteDto, ApiProperty, IsString, MinLength, BootstrapAdminDto, ApiProperty (+22 more)

### Community 19 - "model-manager.service.ts"
Cohesion: 0.08
Nodes (28): ModelAddCommand, Command, Option, DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, ConfigPersistenceService (+20 more)

### Community 20 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.08
Nodes (30): NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes(), clearLlmScopeContext() (+22 more)

### Community 21 - "asClientId"
Cohesion: 0.26
Nodes (16): convertClient(), convertRateLimit(), CliRateLimit, generateGatewayConfigTemplate(), AddClientInput, EditClientInput, PromptAddClientResult, RemoveClientInput (+8 more)

### Community 22 - "GatewayKey"
Cohesion: 0.13
Nodes (13): StreamCleanupInterceptor, Injectable, readClientGatewayKey(), readGatewayKeyHeader(), requireClientGatewayKey(), resolveClientIdFromKey(), GatewayKey, ResolvedGatewayClient (+5 more)

### Community 23 - "openai-chat-completions.controller.ts"
Cohesion: 0.08
Nodes (29): GATEWAY_CACHE_HEADER, ApiBody, ApiOperation, ApiResponse, Body, Post, Req, toChatResponseDtoFromCache() (+21 more)

### Community 24 - "chat-stream.controller.ts"
Cohesion: 0.12
Nodes (15): ChatController, ApiSecurity, ApiTags, Controller, ChatStreamController, ApiSecurity, ApiTags, Controller (+7 more)

### Community 25 - "openai-params-provider.mapper.ts"
Cohesion: 0.12
Nodes (24): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+16 more)

### Community 26 - "runs.module.ts"
Cohesion: 0.11
Nodes (22): Inject, RecoverInterruptedRunsUseCase, Inject, Injectable, ResumeHitlUseCase, Inject, Injectable, RunDispatchExecutor (+14 more)

### Community 27 - "RunRepository"
Cohesion: 0.05
Nodes (21): FinalizeReviewUseCase, Inject, Injectable, GetRunLogsUseCase, Inject, Injectable, GetRunUseCase, Inject (+13 more)

### Community 28 - "save-output-edited.use-case.ts"
Cohesion: 0.09
Nodes (32): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+24 more)

### Community 29 - "api/src/main.ts"
Cohesion: 0.60
Nodes (4): bootstrap(), parseCorsOrigins(), configureHttpApp(), buildSwaggerConfig()

### Community 30 - "ClientId"
Cohesion: 0.07
Nodes (38): SemanticStoreEmbedState, CacheIdentityMessage, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize (+30 more)

### Community 31 - "HealthService"
Cohesion: 0.10
Nodes (14): HealthLivenessResponseDto, ApiProperty, HealthReadinessResponseDto, ApiProperty, HealthController, ApiOkResponse, ApiOperation, ApiTags (+6 more)

### Community 32 - "swagger.setup.ts"
Cohesion: 0.08
Nodes (29): AppModule, Module, ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional (+21 more)

### Community 33 - "provider-instances.bootstrap.ts"
Cohesion: 0.14
Nodes (15): adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryContext, ProviderFactoryFn, FACTORIES (+7 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (38): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+30 more)

### Community 35 - "runs-result.types.ts"
Cohesion: 0.06
Nodes (52): PAGE_OUTLINE_ROLE_LABELS, submitHitl(), isPageOutlineSectionRole(), isReelDuration(), PAGE_OUTLINE_SECTION_ROLES, PageDocument, PageOutline, PageOutlineSection (+44 more)

### Community 36 - "RunRecord"
Cohesion: 0.15
Nodes (5): InProcessRunWorker, Injectable, isRetryable(), RetryReason, RunRecord

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "feedback.api.ts"
Cohesion: 0.31
Nodes (9): createFeedback(), CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody(), parseFeedbackCreated(), FeedbackForm(), onSubmit() (+1 more)

### Community 39 - "AuthController"
Cohesion: 0.13
Nodes (19): AuthController, ApiCookieAuth, ApiTags, Body, Controller, Get, HttpCode, Patch (+11 more)

### Community 40 - "HttpExceptionFilter"
Cohesion: 0.20
Nodes (6): ErrorEnvelope, HttpExceptionFilter, Catch, newRequestId(), RequestIdMiddleware, Injectable

### Community 41 - "prisma-run.adapter.ts"
Cohesion: 0.08
Nodes (18): ListRunsOutput, LightRunItem, ListRunsQuery, ListRunsResult, PAGE_SIZE, RunSnapshot, RunStartedBy, RunLogEntry (+10 more)

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.10
Nodes (22): ApiOpenAiErrorResponses(), OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+14 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (28): brand, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createInvitationId(), createRequestId() (+20 more)

### Community 44 - ".getMetrics"
Cohesion: 0.40
Nodes (4): ApiOperation, ApiResponse, Get, Header

### Community 45 - "bootstrap-admin.use-case.ts"
Cohesion: 0.06
Nodes (37): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Inject, Injectable, comparePassword(), generateRefreshToken(), hashPassword() (+29 more)

### Community 46 - "types/index.ts"
Cohesion: 0.08
Nodes (42): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+34 more)

### Community 47 - "anthropic-messages.controller.ts"
Cohesion: 0.07
Nodes (37): ApiHeader, ApiAnthropicErrorResponses(), AnthropicMessagesController, ApiBody, ApiOperation, ApiProduces, ApiResponse, ApiSecurity (+29 more)

### Community 48 - "getAppConfig"
Cohesion: 0.18
Nodes (11): getAppConfig(), GatewayKeyGuard, Injectable, enrichRequestWithClientId(), AnthropicApiKeyGuard, readAnthropicApiKey(), Injectable, OpenAiBearerAuthGuard (+3 more)

### Community 49 - "ChatParamsDto"
Cohesion: 0.12
Nodes (17): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+9 more)

### Community 50 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+2 more)

### Community 51 - "cli.module.ts"
Cohesion: 0.06
Nodes (61): AgentReport, AgentReportStatus, loadAnswers(), assertAgentHasAnswers(), CliMode, CliModeFlags, markAgentRuntime(), CliModule (+53 more)

### Community 52 - "api-error.code.ts"
Cohesion: 0.16
Nodes (22): ApiErrorCode, ApiErrorPayload, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isProviderRateLimitError(), isRateLimitStatus() (+14 more)

### Community 53 - "semantic-cache.service.ts"
Cohesion: 0.14
Nodes (16): computeSystemSignature(), hashCallParams(), ResponseCacheService, Injectable, isSingleTurnUserRequest(), lastUserMessageText(), embeddingProbeTimeoutMs(), SemanticCacheModule (+8 more)

### Community 54 - "isRecord"
Cohesion: 0.11
Nodes (30): metadata, parseReviewFields(), parseArchiveRunItem(), parseArchiveRunsPage(), parseRunCore(), parseRunSnapshot(), parseStartedBy(), parseUserRunItem() (+22 more)

### Community 55 - "CompanyContext"
Cohesion: 0.29
Nodes (5): CompanyContext, jsonArray(), jsonRecord(), PrismaCompanyContextAdapter, Injectable

### Community 56 - "content.graph.ts"
Cohesion: 0.08
Nodes (45): coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema, pageOutlineSectionSchema, readNonEmptyString() (+37 more)

### Community 57 - "result-edit-payload.ts"
Cohesion: 0.14
Nodes (18): buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload() (+10 more)

### Community 58 - "semantic-cache.constants.ts"
Cohesion: 0.13
Nodes (12): EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema(), EMBEDDING_CIRCUIT_COOLDOWN_MS, EMBEDDING_CIRCUIT_OPEN_AFTER, EMBEDDING_PROBE_TIMEOUT_MS (+4 more)

### Community 59 - "HealthController"
Cohesion: 0.16
Nodes (11): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, HealthModule, Module (+3 more)

### Community 60 - "InvitationsController"
Cohesion: 0.12
Nodes (13): InviteUserDto, ApiProperty, IsEmail, InvitationsController, ApiCookieAuth, ApiTags, Body, Controller (+5 more)

### Community 61 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 62 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.11
Nodes (23): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromConfig(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisConsumer (+15 more)

### Community 63 - "cache.module.ts"
Cohesion: 0.09
Nodes (18): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+10 more)

### Community 64 - "asProviderInstanceId"
Cohesion: 0.06
Nodes (74): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, PendingSecretsItem, assertInteractiveAllowed(), collectPendingSecrets(), DEFAULT_MODELS (+66 more)

### Community 65 - "auth.module.ts"
Cohesion: 0.07
Nodes (39): InviteUserResult, inviteUserSchema, InviteUserUseCase, Inject, Injectable, InvitationListItem, ListInvitationsUseCase, Inject (+31 more)

### Community 66 - "provider-input.ts"
Cohesion: 0.10
Nodes (25): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+17 more)

### Community 67 - "ModelRemoveCommand"
Cohesion: 0.33
Nodes (3): ModelRemoveCommand, Command, Option

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (19): IsStringOrArrayOfStrings(), OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray (+11 more)

### Community 69 - "RunSseHub"
Cohesion: 0.16
Nodes (6): Inject, RunSseEvent, RunSseHub, InMemoryRunSseHub, Inject, Injectable

### Community 70 - "company-context.mapper.ts"
Cohesion: 0.15
Nodes (11): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+3 more)

### Community 71 - "configuration.ts"
Cohesion: 0.07
Nodes (45): CliValidateOptions, asPort(), asSemanticCacheTtlSeconds(), MaxConcurrentStreams, RateLimitBurst, RateLimitRps, AppConfiguration, CacheRuntimeConfig (+37 more)

### Community 72 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 73 - "ClientRemoveCommand"
Cohesion: 0.33
Nodes (3): ClientRemoveCommand, Command, Option

### Community 74 - "ConfigInitCommand"
Cohesion: 0.17
Nodes (6): ConfigInitCommand, Command, Option, ConfigValidateCommand, Command, Option

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "run.types.ts"
Cohesion: 0.19
Nodes (16): isContentStartCommand(), isPlainRecord(), omitUndefinedDeep(), StartRunBriefInput, StartRunCommand, StartRunUseCase, Injectable, ContentRunRecord (+8 more)

### Community 77 - "openai-stream.mapper.ts"
Cohesion: 0.31
Nodes (12): fromGatewayToolCallDto(), mapChatResponseToOpenAi(), mapFinishReasontoOpenAI(), mapGatewayToolCallsToOpenAi(), mapSystemFingerprintToOpenAi(), toOpenAiCompletionId(), baseChunkFields(), buildToolCallsDelta() (+4 more)

### Community 78 - "company-context.controller.ts"
Cohesion: 0.16
Nodes (13): GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PatchCompanyContextUseCase, Inject (+5 more)

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.16
Nodes (17): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), GatewayChatResponse (+9 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - "responses.adapter.ts"
Cohesion: 0.10
Nodes (39): toHttpException(), asSystemFingerprint(), asToolCallId(), ProviderToolDefinition, ChatCompletionsAdapterOptions, createChatCompletionsAdapter(), textStream(), buildResponsesCreateParams() (+31 more)

### Community 82 - "event-source-registry-provider.tsx"
Cohesion: 0.43
Nodes (5): EventSourceRegistryContext, EventSourceRegistryProvider(), createEventSourceRegistry(), EventSourceRegistry, RegistryEntry

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "run.schemas.ts"
Cohesion: 0.16
Nodes (12): GetRunLogsOutput, contentBriefSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, runIdSchema (+4 more)

### Community 85 - "api/src/app.module.ts"
Cohesion: 0.06
Nodes (52): AppModule, Module, AuthModule, Module, CompanyContextModule, Module, CompanyContextRepository, ContentPipelineFacade (+44 more)

### Community 87 - "OpenAiChatMessageDto"
Cohesion: 0.16
Nodes (12): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+4 more)

### Community 88 - "DomainException"
Cohesion: 0.06
Nodes (37): ListUsersUseCase, Injectable, ReactivateUserUseCase, Injectable, SoftDeleteUserUseCase, Injectable, Injectable, updateEmailSchema (+29 more)

### Community 89 - "apiFetch"
Cohesion: 0.07
Nodes (46): metadata, geistMono, geistSans, metadata, acceptInvite(), bootstrapAdmin(), Credentials, fetchBootstrapStatus() (+38 more)

### Community 90 - "filters/http-exception.filter.ts"
Cohesion: 0.21
Nodes (7): DEFAULT_HTTP_STATUS_TO_CODE, GlobalExceptionFilter, isPayloadTooLargeError(), PayloadTooLargeError, RequestWithId, Catch, Injectable

### Community 91 - "runs.controller.ts"
Cohesion: 0.09
Nodes (23): ListRunsUserItem, ListRunsUserOutput, ListRunsUserUseCase, Injectable, HitlDto, IsArray, IsString, PatchRunRatingDto (+15 more)

### Community 92 - "public.decorator.ts"
Cohesion: 0.38
Nodes (3): IS_PUBLIC_KEY, JwtAuthGuard, Injectable

### Community 93 - "prisma-output-edited.adapter.ts"
Cohesion: 0.24
Nodes (6): Inject, OutputEditedWrite, OutputEditedWriter, applyWrite(), PrismaOutputEditedAdapter, Injectable

### Community 94 - "ChatToolingDto"
Cohesion: 0.16
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 95 - "chat.service.ts"
Cohesion: 0.05
Nodes (59): ChatCacheSource, SseMetaPayload, getClientConversationId(), getOrCreateConversationIdForResponse(), createInProcessSingleflight(), buildAppProviderMetricsContext(), buildLlmMetricsContext(), mapProviderResponseToAiObservation() (+51 more)

### Community 96 - "PrismaRefreshSessionAdapter"
Cohesion: 0.27
Nodes (4): RefreshSessionRecord, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 98 - "models.controller.ts"
Cohesion: 0.38
Nodes (6): GatewayModelCapabilitiesDto, GatewayModelDto, ApiProperty, ApiPropertyOptional, ModelsListResponseDto, ApiProperty

### Community 99 - "ProviderAddCommand"
Cohesion: 0.10
Nodes (9): ProviderAddCommand, Command, Option, ProviderEditCommand, Command, Option, ProviderRemoveCommand, Command (+1 more)

### Community 100 - "openai-chat-completion-response.dto.ts"
Cohesion: 0.39
Nodes (8): OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty, ApiPropertyOptional

### Community 101 - "PrismaService"
Cohesion: 0.05
Nodes (37): CreateFeedbackUseCase, Inject, Injectable, agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_RUN_READER, FeedbackRunLookup (+29 more)

### Community 102 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.15
Nodes (14): ChatModule, Module, AnthropicModule, Module, IntegrationsModule, Module, OpenAiModule, Module (+6 more)

### Community 103 - "ErrorEnvelopeDto"
Cohesion: 0.50
Nodes (3): ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional

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

### Community 110 - "LoggingService"
Cohesion: 0.07
Nodes (14): Inject, OllamaEmbeddingAdapter, Injectable, EmbeddingBackend, Inject, Inject, Optional, PinoLoggerAdapter (+6 more)

### Community 111 - "LlmGatewayHttpAdapter"
Cohesion: 0.21
Nodes (5): LlmGatewayHttpAdapter, Inject, Injectable, GATEWAY_ERROR_CODE_LABELS, toGatewayErrorCodeLabel()

### Community 112 - "patch-company-context.use-case.ts"
Cohesion: 0.44
Nodes (5): toPublicCompanyContext(), assertCompanyContextWritable(), PartialCompanyContext, isComplete(), mergeCompanyContext()

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
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1091 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ModelAlias` connect `ModelAlias` to `asProviderInstanceId`, `models.controller.ts`, `branded.types.ts`, `config-generator.service.ts`, `openai-models.controller.ts`, `ai-provider.interface.ts`, `types/index.ts`, `redis-vector-store.adapter.ts`, `model-manager.service.ts`, `asClientId`, `ClientId`, `chat.service.ts`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `ModelAlias` to `asProviderInstanceId`, `models.controller.ts`, `exitWithAgentReport`, `configuration.ts`, `branded.types.ts`, `EnvRef`, `config-generator.service.ts`, `logging.module.ts`, `openai-models.controller.ts`, `ai-provider.interface.ts`, `GatewayConfig`, `types/index.ts`, `LoggingService`, `cli.module.ts`, `model-manager.service.ts`, `asClientId`, `chat.service.ts`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Why does `LoggingService` connect `LoggingService` to `swagger.setup.ts`, `provider-instances.bootstrap.ts`, `logging.module.ts`, `branded.types.ts`, `ai-provider.interface.ts`, `types/index.ts`, `redis-vector-store.adapter.ts`, `responses.adapter.ts`, `ClientId`, `semantic-cache.service.ts`, `RedisConnectionService`, `chat.service.ts`, `api-error.code.ts`, `GatewayKey`, `filters/http-exception.filter.ts`, `HealthService`, `ai-provider-gateway/src/health/health.service.ts`, `cache.module.ts`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _375 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05627147766323024 - nodes in this community are weakly interconnected._
- **Should `api/company-context.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05540499849442939 - nodes in this community are weakly interconnected._