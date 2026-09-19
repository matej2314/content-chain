# Graph Report - content-chain  (2026-09-19)

## Corpus Check
- 611 files · ~176,747 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 2, .css 1)

## Summary
- 3973 nodes · 12222 edges · 132 communities (116 shown, 14 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 383 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `aa308309`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- prisma-invitation.adapter.ts
- social.types.ts
- api/company-context.types.ts
- cli.module.ts
- runs.types.ts
- run-details-view.tsx
- ModelAlias
- LogContext
- anthropic/anthropic-tools.mapper.ts
- ai-provider-gateway/src/app.module.ts
- content.graph.ts
- users.controller.ts
- social.graph.ts
- branded.types.ts
- runs.module.ts
- models.controller.ts
- anthropic-response.mapper.ts
- redis-vector-store.adapter.ts
- RunsController
- asProviderInstanceId
- ai-metrics.module.ts
- wizard-orchestrator.service.ts
- GatewayKey
- LoggingService
- runs-result.types.ts
- api/src/app.module.ts
- run.port.ts
- auth.module.ts
- save-output-edited.use-case.ts
- chat.service.ts
- types/index.ts
- HealthService
- swagger.setup.ts
- .completions
- AnthropicMessagesRequestDto
- run-result-view.tsx
- exitWithAgentReport
- enums.ts
- .constructor
- provider-instances.bootstrap.ts
- start-run.use-case.ts
- HttpExceptionFilter
- openai-models.controller.ts
- ids.ts
- MetricsController
- TransactionalMailer
- health-readiness-response.dto.ts
- anthropic-models.controller.ts
- config-generator.service.ts
- chat-params.dto.ts
- runs.controller.ts
- content.types.ts
- notify-product.tsx
- metrics.ts
- public.decorator.ts
- CompanyContext
- domain.exception.ts
- .createMessage
- should-include-redis-stack.ts
- HealthController
- HttpMetricsMiddleware
- company-context.dto.ts
- responses.adapter.ts
- redis-cache.adapter.ts
- configuration.ts
- provider-error.mapper.ts
- InvitationsController
- ModelRemoveCommand
- OpenAiChatCompletionRequestDto
- sentry-ai-metrics.adapter.ts
- ConfigInitCommand
- openai-stream.mapper.ts
- ClientAddCommand
- ClientRemoveCommand
- OpenAiChatMessageDto
- ModelAddCommand
- EnvRef
- ApiRequestIdHeader
- CompanyContextRepository
- llm-gateway.http.adapter.ts
- PrometheusService
- chat-completions.adapter.ts
- openai-params-provider.mapper.ts
- SPEC — README
- anthropic.module.ts
- RunRepository
- configure-swagger.ts
- UserRepository
- company-context.mapper.ts
- session-provider.tsx
- .getOne
- .getOne
- EnvironmentVariables
- ChatToolingDto
- chat-provider-call.service.ts
- ChatResponseDto
- auth.controller.ts
- route.ts
- openai-chat-completion-response.dto.ts
- ProviderAddCommand
- get-run-logs.use-case.ts
- create-feedback.use-case.ts
- UnsupportedProviderException
- cache.module.ts
- GatewayConfig
- PrismaService
- ModelEditCommand
- ProviderEditCommand
- ProviderRemoveCommand
- cn
- ChatParamsDto
- domain/company-context.types.ts
- CompanyContextController
- ClientEditCommand
- openai-chat-message.dto.ts
- Architektura
- brand.ts
- openai-chat-completion-request.dto.ts
- InMemoryRunSseHub
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
- dashboard-shell.tsx

## God Nodes (most connected - your core abstractions)
1. `ModelAlias` - 88 edges
2. `ProviderInstanceId` - 81 edges
3. `LoggingService` - 73 edges
4. `DomainException` - 68 edges
5. `asProviderInstanceId()` - 67 edges
6. `GatewayConfig` - 65 edges
7. `cn()` - 60 edges
8. `GatewayKey` - 59 edges
9. `ClientId` - 54 edges
10. `ChatRequestDto` - 48 edges

## Surprising Connections (you probably didn't know these)
- `toChatResponseDto()` --indirect_call--> `toGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/chat/dto/chat-response.dto.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `ProviderTestOptions` --references--> `ProviderInstanceId`  [EXTRACTED]
  apps/ai-provider-gateway/src/cli/commands/provider/provider-test.command.ts → apps/ai-provider-gateway/src/common/types/branded.types.ts
- `mapChatResponseToOpenAi()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/openai/mappers/openai-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `optionalEnvRefSchema` --calls--> `asEnvRef()`  [EXTRACTED]
  apps/ai-provider-gateway/src/config/gateway-config.schema.ts → apps/ai-provider-gateway/src/common/types/branded.types.ts
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (132 total, 14 thin omitted)

### Community 0 - "prisma-invitation.adapter.ts"
Cohesion: 0.10
Nodes (23): Inject, InvitationListItem, Inject, RevokeInvitationUseCase, Inject, Injectable, AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult (+15 more)

### Community 1 - "social.types.ts"
Cohesion: 0.06
Nodes (27): CompositeRunResultReader, GetRunOutput, RunResultReader, ContentBrief, SocialBrief, EmptyRunResultReader, Injectable, SocialResultStore (+19 more)

### Community 2 - "api/company-context.types.ts"
Cohesion: 0.06
Nodes (62): fetchCompanyContext(), fetchCompleteness(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras, companyContextForPut() (+54 more)

### Community 3 - "cli.module.ts"
Cohesion: 0.06
Nodes (58): AgentReport, AgentReportStatus, PendingSecretsItem, loadAnswers(), assertAgentHasAnswers(), CliMode, CliModeFlags, markAgentRuntime() (+50 more)

### Community 4 - "runs.types.ts"
Cohesion: 0.06
Nodes (56): ArchiveRunsQuery, fetchArchiveRuns(), fetchInitiatorOptions(), fetchUserRuns(), InitiatorOption, HitlAccepted, parseReviewFields(), ArchiveRunItem (+48 more)

### Community 5 - "run-details-view.tsx"
Cohesion: 0.08
Nodes (41): CompletenessChip(), useCompleteness(), notifyProduct(), CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS (+33 more)

### Community 6 - "ModelAlias"
Cohesion: 0.04
Nodes (29): ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, healthStatusToGaugeValue(), PrometheusAppMetricsAdapter, Injectable, resolveAppMetricsBackend() (+21 more)

### Community 7 - "LogContext"
Cohesion: 0.05
Nodes (26): GlobalExceptionFilter, isPayloadTooLargeError(), Catch, Injectable, ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter (+18 more)

### Community 8 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.06
Nodes (68): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, mapProviderResponseToAiObservation(), toCachedChatResponse(), asInputTokens(), asOutputTokens(), asPromptCacheCreationTokens() (+60 more)

### Community 9 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.08
Nodes (25): HealthModule, Module, LoggingModule, Global, Module, AiMetricsModule, Global, Module (+17 more)

### Community 10 - "content.graph.ts"
Cohesion: 0.11
Nodes (37): Inject, coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema, pageOutlineSectionSchema (+29 more)

### Community 11 - "users.controller.ts"
Cohesion: 0.09
Nodes (21): ListUsersUseCase, Injectable, ReactivateUserUseCase, Injectable, SoftDeleteUserUseCase, Injectable, PatchUserDto, ApiProperty (+13 more)

### Community 12 - "social.graph.ts"
Cohesion: 0.13
Nodes (32): coercePassNoteVerdict(), isPassOnlyIssue(), ideasOutputSchema, reelIdeasOutputSchema, isReelTaskType(), ReelTaskType, canRefine(), MAX_REFINE (+24 more)

### Community 13 - "branded.types.ts"
Cohesion: 0.10
Nodes (41): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatResponseData, mapStopReasonToFinishReason(), StreamOnceResult, ChatResponseBuilderService, ProviderResponse (+33 more)

### Community 14 - "runs.module.ts"
Cohesion: 0.10
Nodes (23): Inject, RecoverInterruptedRunsUseCase, Inject, Injectable, RunDispatchExecutor, RunLifecycleService, TransitionExtras, Inject (+15 more)

### Community 15 - "models.controller.ts"
Cohesion: 0.10
Nodes (22): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+14 more)

### Community 16 - "anthropic-response.mapper.ts"
Cohesion: 0.14
Nodes (25): SseDoneEvent, fromGatewayToolCallDto(), asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto (+17 more)

### Community 17 - "redis-vector-store.adapter.ts"
Cohesion: 0.09
Nodes (28): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, EmbeddingCircuitBreaker, escapeRedisSearchTag(), normalizeEmbeddingModelForIndex(), semanticIndexName() (+20 more)

### Community 18 - "RunsController"
Cohesion: 0.14
Nodes (15): ListRunsUserOutput, isTerminalStatus(), RunsController, ApiCookieAuth, ApiTags, Body, Controller, Get (+7 more)

### Community 19 - "asProviderInstanceId"
Cohesion: 0.08
Nodes (47): assertInteractiveAllowed(), DEFAULT_MODELS, DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, convertModel(), defaultModelPolicy() (+39 more)

### Community 20 - "ai-metrics.module.ts"
Cohesion: 0.15
Nodes (9): NoopAiMetricsAdapter, Injectable, SentryAiMetricsAdapter, Injectable, resolveAiMetricsBackend(), Inject, AI_METRICS_BACKEND, AiMetricsBackend (+1 more)

### Community 21 - "wizard-orchestrator.service.ts"
Cohesion: 0.07
Nodes (49): isRedisSearchTagSafeId(), WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, InitAnswers, CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema (+41 more)

### Community 22 - "GatewayKey"
Cohesion: 0.04
Nodes (70): GATEWAY_CACHE_HEADER, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags, Body (+62 more)

### Community 23 - "LoggingService"
Cohesion: 0.04
Nodes (39): RedisConnectionService, Injectable, computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Inject, Injectable (+31 more)

### Community 24 - "runs-result.types.ts"
Cohesion: 0.11
Nodes (39): parseAudienceProfile(), parseCaseStudy(), parseCompanyContext(), parseCtaItem(), parseExtras(), parseObjection(), parseOfferItem(), parseStringArray() (+31 more)

### Community 25 - "api/src/app.module.ts"
Cohesion: 0.06
Nodes (50): CompanyContextModule, Module, ContentPipelineFacade, toOutcome(), Injectable, ContentRunExecutor, isCanonicalOutlineSelection(), isMissingContentKind() (+42 more)

### Community 26 - "run.port.ts"
Cohesion: 0.08
Nodes (19): ListRunsOutput, contentBriefSchema, socialBriefSchema, LightRunItem, ListRunsQuery, ListRunsResult, PAGE_SIZE, RunSnapshot (+11 more)

### Community 27 - "auth.module.ts"
Cohesion: 0.08
Nodes (42): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Injectable, comparePassword(), generateRefreshToken(), hashPassword(), hashRefreshToken() (+34 more)

### Community 28 - "save-output-edited.use-case.ts"
Cohesion: 0.09
Nodes (32): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+24 more)

### Community 29 - "chat.service.ts"
Cohesion: 0.05
Nodes (56): SemanticStoreEmbedState, CacheIdentityMessage, ChatCacheSource, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize (+48 more)

### Community 30 - "types/index.ts"
Cohesion: 0.07
Nodes (47): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+39 more)

### Community 31 - "HealthService"
Cohesion: 0.17
Nodes (6): HealthLivenessResponseDto, ApiProperty, HealthReadinessResponseDto, ApiProperty, HealthService, Injectable

### Community 32 - "swagger.setup.ts"
Cohesion: 0.11
Nodes (23): AppModule, Module, ChatOutputTextDto, ApiProperty, SseDeltaPayloadDto, ApiProperty, SseDoneUsageDto, ApiPropertyOptional (+15 more)

### Community 33 - ".completions"
Cohesion: 0.11
Nodes (15): OpenAiChatCompletionsController, ApiBody, ApiOperation, ApiProduces, ApiResponse, ApiSecurity, ApiTags, Body (+7 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "run-result-view.tsx"
Cohesion: 0.09
Nodes (19): PAGE_OUTLINE_ROLE_LABELS, submitHitl(), PageDocument, PageOutline, parseHitlAccepted(), ReelIdea, ReelScript, runResultHasArtifacts() (+11 more)

### Community 36 - "exitWithAgentReport"
Cohesion: 0.19
Nodes (10): emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), resolveCliMode(), toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList() (+2 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - ".constructor"
Cohesion: 0.11
Nodes (15): FinalizeReviewUseCase, Inject, Injectable, GetRunUseCase, Inject, Injectable, ListRunsUseCase, Inject (+7 more)

### Community 39 - "provider-instances.bootstrap.ts"
Cohesion: 0.30
Nodes (9): assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryFn, OpenAiProviderConfig (+1 more)

### Community 40 - "start-run.use-case.ts"
Cohesion: 0.11
Nodes (24): pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, socialStartRunSchema, startRunCommandSchema, isContentStartCommand() (+16 more)

### Community 41 - "HttpExceptionFilter"
Cohesion: 0.31
Nodes (3): ErrorEnvelope, HttpExceptionFilter, Catch

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.21
Nodes (12): ApiOpenAiErrorResponses(), ANTHROPIC_INTEGRATION_PATH, OPENAI_INTEGRATION_PATH, OpenAiErrorBodyDto, OpenAiErrorResponseDto, ApiProperty, ApiPropertyOptional, OpenAiModelDto (+4 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (28): brand, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createInvitationId(), createRequestId() (+20 more)

### Community 44 - "MetricsController"
Cohesion: 0.18
Nodes (7): MetricsController, ApiOperation, ApiResponse, ApiTags, Controller, Get, Header

### Community 45 - "TransactionalMailer"
Cohesion: 0.15
Nodes (11): Inject, Inject, TransactionalMailer, UserInvitedMail, LoggingMailerAdapter, Injectable, NodemailerSmtpMailerAdapter, readSmtpConfig() (+3 more)

### Community 46 - "health-readiness-response.dto.ts"
Cohesion: 0.26
Nodes (10): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty, ApiPropertyOptional (+2 more)

### Community 47 - "anthropic-models.controller.ts"
Cohesion: 0.28
Nodes (10): ApiAnthropicErrorResponses(), AnthropicErrorBodyDto, AnthropicErrorResponseDto, ApiProperty, AnthropicModelDto, AnthropicModelsListResponseDto, ApiProperty, mapGatewayModelsListToAnthropic() (+2 more)

### Community 48 - "config-generator.service.ts"
Cohesion: 0.09
Nodes (21): isRedisRequired(), ConfigGeneratorService, Injectable, ConfigPersistenceService, Injectable, FileManagerService, Injectable, BasicServerAnswers (+13 more)

### Community 49 - "chat-params.dto.ts"
Cohesion: 0.24
Nodes (7): ResponseFormatDto, ApiProperty, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsThinkingBudget()

### Community 50 - "runs.controller.ts"
Cohesion: 0.07
Nodes (29): HitlDto, IsArray, IsString, ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional (+21 more)

### Community 51 - "content.types.ts"
Cohesion: 0.08
Nodes (19): ContentPipelineInput, ContentPipelineState, ContentRefineSnapshot, PageDocument, PageOutline, PageOutlineSection, PageOutlineSectionRole, VerifierVerdict (+11 more)

### Community 52 - "notify-product.tsx"
Cohesion: 0.20
Nodes (10): assertNever(), notifyRunTerminal(), EnvelopeRef, ProductToast, RunTerminalInput, RunTerminalOutcome, runTerminalToastId(), viewingRunIdFromPathname() (+2 more)

### Community 53 - "metrics.ts"
Cohesion: 0.06
Nodes (49): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+41 more)

### Community 54 - "public.decorator.ts"
Cohesion: 0.38
Nodes (3): IS_PUBLIC_KEY, JwtAuthGuard, Injectable

### Community 55 - "CompanyContext"
Cohesion: 0.26
Nodes (5): CompanyContext, jsonArray(), jsonRecord(), PrismaCompanyContextAdapter, Injectable

### Community 56 - "domain.exception.ts"
Cohesion: 0.18
Nodes (10): ListRunsUserItem, ListRunsUserUseCase, Injectable, RateRunUseCase, ratingSchema, Injectable, assertRunReviewable(), Express (+2 more)

### Community 57 - ".createMessage"
Cohesion: 0.11
Nodes (16): ApiHeader, AnthropicMessagesController, ApiBody, ApiOperation, ApiProduces, ApiResponse, ApiSecurity, ApiTags (+8 more)

### Community 58 - "should-include-redis-stack.ts"
Cohesion: 0.18
Nodes (11): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis() (+3 more)

### Community 59 - "HealthController"
Cohesion: 0.16
Nodes (11): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, HealthModule, Module (+3 more)

### Community 61 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 62 - "responses.adapter.ts"
Cohesion: 0.24
Nodes (15): buildResponsesCreateParams(), createResponsesAdapter(), textStream(), mapGatewayMetadataToOpenAi(), mapAssistantTurnToResponsesInput(), mapTurnsToResponsesInput(), mapResponsesStopReason(), parseOpenAiResponse() (+7 more)

### Community 63 - "redis-cache.adapter.ts"
Cohesion: 0.14
Nodes (10): NoOpCacheBackend, Injectable, RedisCacheAdapter, Injectable, CacheRegistryService, Injectable, CacheBackend, asCacheTtlSeconds() (+2 more)

### Community 64 - "configuration.ts"
Cohesion: 0.07
Nodes (50): REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, CliValidateOptions, asPort(), asSemanticCacheTtlSeconds(), AppConfiguration, CacheRuntimeConfig (+42 more)

### Community 65 - "provider-error.mapper.ts"
Cohesion: 0.18
Nodes (20): ApiErrorPayload, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isRateLimitStatus(), isServerError(), isTimeoutStatus() (+12 more)

### Community 66 - "InvitationsController"
Cohesion: 0.13
Nodes (13): InviteUserDto, ApiProperty, IsEmail, InvitationsController, ApiCookieAuth, ApiTags, Body, Controller (+5 more)

### Community 67 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (18): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+10 more)

### Community 69 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.29
Nodes (12): applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes(), clearLlmScopeContext(), clearRequestMetadataContext(), shouldRecordPrompts() (+4 more)

### Community 70 - "ConfigInitCommand"
Cohesion: 0.14
Nodes (8): ConfigInitCommand, Command, Option, ConfigValidateCommand, Command, Option, CliGatewayValidatorService, Injectable

### Community 71 - "openai-stream.mapper.ts"
Cohesion: 0.33
Nodes (11): mapChatResponseToOpenAi(), mapFinishReasontoOpenAI(), mapGatewayToolCallsToOpenAi(), mapSystemFingerprintToOpenAi(), toOpenAiCompletionId(), baseChunkFields(), buildToolCallsDelta(), chunkLine() (+3 more)

### Community 72 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 73 - "ClientRemoveCommand"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

### Community 74 - "OpenAiChatMessageDto"
Cohesion: 0.22
Nodes (9): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+1 more)

### Community 75 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 76 - "EnvRef"
Cohesion: 0.07
Nodes (27): collectPendingSecrets(), KeyGenerateCommand, Command, Option, ProviderTestCommand, ProviderTestOptions, Command, Option (+19 more)

### Community 77 - "ApiRequestIdHeader"
Cohesion: 0.29
Nodes (7): ApiRequestIdHeader(), HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get

### Community 78 - "CompanyContextRepository"
Cohesion: 0.15
Nodes (19): toPublicCompanyContext(), GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PatchCompanyContextUseCase (+11 more)

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.06
Nodes (40): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), LlmGatewayError (+32 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - "chat-completions.adapter.ts"
Cohesion: 0.17
Nodes (21): toHttpException(), asSystemFingerprint(), ChatCompletionsAdapterOptions, createChatCompletionsAdapter(), textStream(), ChatCompletionMessageParam, mapAssistantTurn(), mapTurnsToOpenAiMessages() (+13 more)

### Community 82 - "openai-params-provider.mapper.ts"
Cohesion: 0.22
Nodes (12): mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses(), mapStopSequences(), OpenAiSharedChatCompletionParams, OpenAiSharedResponsesParams (+4 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "anthropic.module.ts"
Cohesion: 0.21
Nodes (10): ChatModule, Module, AnthropicModule, Module, IntegrationsModule, Module, OpenAiModule, Module (+2 more)

### Community 85 - "RunRepository"
Cohesion: 0.08
Nodes (10): InProcessRunWorker, Injectable, Inject, Inject, ResumeHitlUseCase, Inject, Injectable, Inject (+2 more)

### Community 86 - "configure-swagger.ts"
Cohesion: 0.16
Nodes (12): AppModule, Module, bootstrap(), EnvModule, Global, Module, envSchema, parseCorsOrigins() (+4 more)

### Community 87 - "UserRepository"
Cohesion: 0.06
Nodes (17): Inject, Inject, Inject, Inject, Inject, Inject, AuthUser, RefreshSessionRepository (+9 more)

### Community 88 - "company-context.mapper.ts"
Cohesion: 0.10
Nodes (15): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+7 more)

### Community 89 - "session-provider.tsx"
Cohesion: 0.08
Nodes (34): UsersPage(), AcceptInvitePageProps, geistMono, geistSans, metadata, acceptInvite(), bootstrapAdmin(), Credentials (+26 more)

### Community 90 - ".getOne"
Cohesion: 0.19
Nodes (10): AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+2 more)

### Community 91 - ".getOne"
Cohesion: 0.19
Nodes (10): OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+2 more)

### Community 92 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 93 - "ChatToolingDto"
Cohesion: 0.16
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 94 - "chat-provider-call.service.ts"
Cohesion: 0.09
Nodes (29): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, clamp(), isOverrideKey(), resolveProviderCallOptions(), CompleteOnceResult, ChatValidationService, Injectable (+21 more)

### Community 95 - "ChatResponseDto"
Cohesion: 0.22
Nodes (8): ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString, ChatUsageDto, ApiPropertyOptional

### Community 96 - "auth.controller.ts"
Cohesion: 0.05
Nodes (50): BootstrapAdminUseCase, Injectable, BootstrapStatusUseCase, Inject, Injectable, LogoutUseCase, Inject, Injectable (+42 more)

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 98 - "openai-chat-completion-response.dto.ts"
Cohesion: 0.39
Nodes (8): OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty, ApiPropertyOptional

### Community 99 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 100 - "get-run-logs.use-case.ts"
Cohesion: 0.29
Nodes (6): GetRunLogsOutput, GetRunLogsUseCase, Inject, Injectable, runIdSchema, RunLogLevel

### Community 101 - "create-feedback.use-case.ts"
Cohesion: 0.07
Nodes (32): CreateFeedbackUseCase, Inject, Injectable, agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_RUN_READER, FeedbackRunLookup (+24 more)

### Community 104 - "cache.module.ts"
Cohesion: 0.16
Nodes (10): NoopCacheModule, Module, RedisCacheModule, Module, CacheModule, CacheModuleOptions, Module, CACHE_BACKEND (+2 more)

### Community 105 - "GatewayConfig"
Cohesion: 0.10
Nodes (12): normalizeGatewayConfigForWrite(), ProviderManagerService, Injectable, AddProviderInput, EditProviderInput, RemoveClientInput, RemoveProviderInput, countActiveModelsAfterProviderChange() (+4 more)

### Community 106 - "PrismaService"
Cohesion: 0.11
Nodes (9): RefreshSessionRecord, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable, PrismaModule, Global, Module, PrismaService (+1 more)

### Community 107 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 109 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 113 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 114 - "cn"
Cohesion: 0.06
Nodes (53): logoutSession(), AcceptInviteFormProps, AppHeaderProps, AppSidebar(), AppSidebarProps, LogoutDialog(), confirm(), LogoutDialogProps (+45 more)

### Community 116 - "ChatParamsDto"
Cohesion: 0.20
Nodes (10): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+2 more)

### Community 117 - "domain/company-context.types.ts"
Cohesion: 0.18
Nodes (18): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CompanyContextWriteDetail (+10 more)

### Community 119 - "CompanyContextController"
Cohesion: 0.22
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 121 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 123 - "openai-chat-message.dto.ts"
Cohesion: 0.60
Nodes (3): isTextContentItem(), normalizeOpenAiContent(), TextContentItem

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 129 - "InMemoryRunSseHub"
Cohesion: 0.29
Nodes (4): RunSseEvent, InMemoryRunSseHub, Inject, Injectable

### Community 145 - "dashboard-shell.tsx"
Cohesion: 0.17
Nodes (9): CompletenessProvider(), AppHeader(), DashboardShell(), EventSourceRegistryContext, EventSourceRegistryProvider(), createEventSourceRegistry(), EventSourceRegistry, RegistryEntry (+1 more)

## Knowledge Gaps
- **352 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+347 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1056 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `LoggingService` connect `LoggingService` to `swagger.setup.ts`, `LogContext`, `anthropic/anthropic-tools.mapper.ts`, `provider-instances.bootstrap.ts`, `redis-vector-store.adapter.ts`, `chat-completions.adapter.ts`, `GatewayKey`, `responses.adapter.ts`, `chat-provider-call.service.ts`, `HealthService`, `chat.service.ts`, `types/index.ts`, `redis-cache.adapter.ts`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Why does `GatewayConfig` connect `GatewayConfig` to `configuration.ts`, `cli.module.ts`, `exitWithAgentReport`, `EnvRef`, `models.controller.ts`, `asProviderInstanceId`, `wizard-orchestrator.service.ts`, `LoggingService`, `chat.service.ts`, `chat-provider-call.service.ts`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Why does `DomainException` connect `auth.module.ts` to `prisma-invitation.adapter.ts`, `social.types.ts`, `users.controller.ts`, `runs.module.ts`, `RunsController`, `api/src/app.module.ts`, `run.port.ts`, `save-output-edited.use-case.ts`, `.constructor`, `start-run.use-case.ts`, `HttpExceptionFilter`, `domain.exception.ts`, `CompanyContextRepository`, `llm-gateway.http.adapter.ts`, `RunRepository`, `UserRepository`, `auth.controller.ts`, `get-run-logs.use-case.ts`, `create-feedback.use-case.ts`, `domain/company-context.types.ts`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _352 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `prisma-invitation.adapter.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09634146341463415 - nodes in this community are weakly interconnected._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05714285714285714 - nodes in this community are weakly interconnected._