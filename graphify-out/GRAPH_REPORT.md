# Graph Report - content-chain  (2026-10-01)

## Corpus Check
- 650 files · ~196,853 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .css 1)

## Summary
- 4186 nodes · 12938 edges · 129 communities (115 shown, 12 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 400 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ef19b96b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- auth.module.ts
- get-run.use-case.ts
- api/company-context.types.ts
- cli.module.ts
- dashboard-shell.tsx
- run-details-view.tsx
- save-output-edited.use-case.ts
- logging.service.ts
- anthropic/anthropic-tools.mapper.ts
- asProviderInstanceId
- notify-product.tsx
- wizard-orchestrator.service.ts
- social.graph.ts
- branded.types.ts
- result-edit-payload.ts
- RunRepository
- anthropic-messages.controller.ts
- redis-vector-store.adapter.ts
- AuthUserContext
- users-view.tsx
- sentry-ai-metrics.adapter.ts
- configuration.ts
- ConfigInitCommand
- ProviderApiKey
- content.types.ts
- metrics.ts
- LoggingService
- start-run.use-case.ts
- semantic-cache.service.ts
- RunRecord
- UsersController
- ai-provider-gateway/src/health/health.service.ts
- swagger.setup.ts
- config-validator.ts
- AnthropicMessagesRequestDto
- runs-result.types.ts
- runs.types.ts
- enums.ts
- feedback-form.tsx
- RefreshSessionRepository
- new-ids.ts
- run.types.ts
- openai-models.controller.ts
- ids.ts
- types/index.ts
- provider-registry.service.ts
- getAppConfig
- anthropic-models.controller.ts
- run.port.ts
- ChatParamsDto
- ListRunsQueryDto
- ModelAlias
- CompanyContext
- InvitationsController
- apiFetch
- ApiRequestIdHeader
- content.graph.ts
- api-error.code.ts
- HealthController
- responses.adapter.ts
- models.controller.ts
- company-context.dto.ts
- should-include-redis-stack.ts
- response-cache.service.ts
- provider-manager.service.ts
- auth.controller.ts
- ChatToolingDto
- provider-instances.bootstrap.ts
- OpenAiChatCompletionRequestDto
- DomainException
- company-context.mapper.ts
- runs.controller.ts
- ai-provider-gateway/src/app.module.ts
- http-metrics.interceptor.ts
- InProcessRunWorker
- parse-verifier-log-message.ts
- UserRepository
- RedisConnectionService
- CompanyContextRepository
- llm-hop.ts
- PrometheusService
- .completions
- openai-stream.mapper.ts
- SPEC — README
- api/src/app.module.ts
- GatewayConfig
- EnvironmentVariables
- provider-base-url.validation.ts
- RunSseHub
- StartRunDto
- provider-error.mapper.ts
- ClientEditCommand
- ModelAddCommand
- openai-chat-completions.controller.ts
- route.ts
- gateway-config.schema.ts
- ModelEditCommand
- ClientRemoveCommand
- PrismaService
- ProviderEditCommand
- ProviderAddCommand
- ProviderRemoveCommand
- configure-swagger.ts
- ClientAddCommand
- filters/http-exception.filter.ts
- chat.service.ts
- semantic-cache.constants.ts
- ModelRemoveCommand
- cn
- configuration-validation.service.ts
- domain/company-context.types.ts
- prisma-invitation.adapter.ts
- CompanyContextController
- anthropic.module.ts
- Architektura
- brand.ts
- gateway-key.guard.branded-types.test-d.ts
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
4. `DomainException` - 70 edges
5. `asProviderInstanceId()` - 67 edges
6. `GatewayConfig` - 65 edges
7. `cn()` - 62 edges
8. `isRecord()` - 60 edges
9. `GatewayKey` - 59 edges
10. `ClientId` - 54 edges

## Surprising Connections (you probably didn't know these)
- `mapChatResponseToOpenAi()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/openai/mappers/openai-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `RedisConnectionService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-connection.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `CacheRegistryService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/cache-registry.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `ResponseCacheService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/response-cache.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (129 total, 12 thin omitted)

### Community 0 - "auth.module.ts"
Cohesion: 0.07
Nodes (41): InviteUserResult, inviteUserSchema, InviteUserUseCase, Inject, Injectable, InvitationListItem, ListInvitationsUseCase, Inject (+33 more)

### Community 1 - "get-run.use-case.ts"
Cohesion: 0.05
Nodes (35): PageOutline, CompositeRunResultReader, GetRunOutput, orderItemsBySelectedIds(), Inject, Inject, OutputEditedWrite, OutputEditedWriter (+27 more)

### Community 2 - "api/company-context.types.ts"
Cohesion: 0.06
Nodes (66): metadata, fetchCompanyContext(), fetchCompleteness(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras (+58 more)

### Community 3 - "cli.module.ts"
Cohesion: 0.07
Nodes (61): AgentReport, AgentReportStatus, emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), loadAnswers(), assertAgentHasAnswers(), CliMode (+53 more)

### Community 4 - "dashboard-shell.tsx"
Cohesion: 0.13
Nodes (13): AgentsGateTooltip(), AppHeader(), DashboardShell(), EventSourceRegistryContext, EventSourceRegistryProvider(), createEventSourceRegistry(), EventSourceRegistry, RegistryEntry (+5 more)

### Community 5 - "run-details-view.tsx"
Cohesion: 0.06
Nodes (53): metadata, metadata, metadata, CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS (+45 more)

### Community 6 - "save-output-edited.use-case.ts"
Cohesion: 0.09
Nodes (33): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+25 more)

### Community 7 - "logging.service.ts"
Cohesion: 0.07
Nodes (22): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+14 more)

### Community 8 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.06
Nodes (66): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, mapProviderResponseToAiObservation(), toCachedChatResponse(), asInputTokens(), asOutputTokens(), asPromptCacheCreationTokens() (+58 more)

### Community 9 - "asProviderInstanceId"
Cohesion: 0.12
Nodes (15): toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList(), convertModel(), defaultModelPolicy(), ModelManagerService, Injectable (+7 more)

### Community 10 - "notify-product.tsx"
Cohesion: 0.18
Nodes (14): assertNever(), notifyRunCancelled(), notifyRunTerminal(), EnvelopeRef, ProductToast, RunTerminalInput, RunTerminalOutcome, runTerminalToastId() (+6 more)

### Community 11 - "wizard-orchestrator.service.ts"
Cohesion: 0.06
Nodes (36): ConfigValidateCommand, Command, Option, WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, InitAnswers, parseWizardState() (+28 more)

### Community 12 - "social.graph.ts"
Cohesion: 0.14
Nodes (33): renderPrompt(), coercePassNoteVerdict(), isPassOnlyIssue(), ideasOutputSchema, reelIdeasOutputSchema, isReelTaskType(), ReelTaskType, canRefine() (+25 more)

### Community 13 - "branded.types.ts"
Cohesion: 0.08
Nodes (53): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatResponseData, ChatResponseDto, ChatUsageDetailsDto, toChatResponseDto(), ApiProperty (+45 more)

### Community 14 - "result-edit-payload.ts"
Cohesion: 0.10
Nodes (29): buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload() (+21 more)

### Community 15 - "RunRepository"
Cohesion: 0.07
Nodes (10): AutoFinalizeExpiredReviewsUseCase, Inject, Injectable, Inject, Inject, Inject, Inject, Inject (+2 more)

### Community 16 - "anthropic-messages.controller.ts"
Cohesion: 0.10
Nodes (32): SseDoneEvent, fromGatewayToolCallDto(), asMessageId(), MessageId, AnthropicMessagesController, ApiSecurity, ApiTags, Controller (+24 more)

### Community 17 - "redis-vector-store.adapter.ts"
Cohesion: 0.14
Nodes (20): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), asString(), ParsedKnnHits, parseKnnHits() (+12 more)

### Community 18 - "AuthUserContext"
Cohesion: 0.12
Nodes (20): FinalizeReviewUseCase, Inject, Injectable, isTerminalStatus(), RunsController, ApiCookieAuth, ApiTags, Body (+12 more)

### Community 19 - "users-view.tsx"
Cohesion: 0.14
Nodes (22): metadata, createInvitation(), fetchInvitations(), resendInvitation(), revokeInvitation(), InvitationListItem, InviteCreated, isInvitationExpired() (+14 more)

### Community 20 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.09
Nodes (27): NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes(), clearLlmScopeContext() (+19 more)

### Community 21 - "configuration.ts"
Cohesion: 0.14
Nodes (19): asSemanticCacheTtlSeconds(), AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig, SemanticCacheRuntimeConfig, buildAppConfiguration(), BuildEffectiveGatewayConfigOptions (+11 more)

### Community 22 - "ConfigInitCommand"
Cohesion: 0.31
Nodes (3): ConfigInitCommand, Command, Option

### Community 23 - "ProviderApiKey"
Cohesion: 0.20
Nodes (7): ProviderTestCommand, Command, Option, ProviderTestService, Injectable, ProviderApiKey, ProviderFactoryContext

### Community 24 - "content.types.ts"
Cohesion: 0.13
Nodes (10): ContentPipelineInput, ContentPipelineState, ContentRefineSnapshot, PageDocument, PageOutlineSection, PageOutlineSectionRole, VerifierVerdict, PrismaContentResultAdapter (+2 more)

### Community 25 - "metrics.ts"
Cohesion: 0.08
Nodes (34): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+26 more)

### Community 26 - "LoggingService"
Cohesion: 0.09
Nodes (9): Inject, Inject, VectorStore, Inject, Optional, LoggingService, Injectable, Inject (+1 more)

### Community 27 - "start-run.use-case.ts"
Cohesion: 0.11
Nodes (24): GetRunLogsOutput, contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand (+16 more)

### Community 28 - "semantic-cache.service.ts"
Cohesion: 0.10
Nodes (22): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, OllamaEmbeddingAdapter, Injectable, EmbeddingBackend (+14 more)

### Community 29 - "RunRecord"
Cohesion: 0.14
Nodes (8): RunDispatchExecutor, RUN_EXECUTOR, RunExecuteOptions, RunExecutorPort, isSocialRunRecord(), RunRecord, StubRunExecutor, Injectable

### Community 30 - "UsersController"
Cohesion: 0.11
Nodes (14): ApiCookieAuth, ApiTags, Body, Controller, Delete, Get, HttpCode, Param (+6 more)

### Community 31 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.08
Nodes (24): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthLivenessResponseDto, ApiProperty, HealthReadinessChecksDto, HealthReadinessResponseDto, ApiProperty (+16 more)

### Community 32 - "swagger.setup.ts"
Cohesion: 0.09
Nodes (23): AppModule, Module, ChatOutputTextDto, ApiProperty, ChatUsageDto, ApiPropertyOptional, SseDeltaPayloadDto, ApiProperty (+15 more)

### Community 33 - "config-validator.ts"
Cohesion: 0.32
Nodes (9): CliValidateOptions, collectInactiveProviderWarnings(), formatZodIssues(), validateGatewayConfig(), ValidationOptions, ValidationResult, buildEffectiveGatewayConfig(), assertMasterKeyPresent() (+1 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "runs-result.types.ts"
Cohesion: 0.06
Nodes (53): PAGE_OUTLINE_ROLE_LABELS, submitHitl(), HitlAccepted, isPageOutlineSectionRole(), isReelDuration(), PAGE_OUTLINE_SECTION_ROLES, PageDocument, PageOutline (+45 more)

### Community 36 - "runs.types.ts"
Cohesion: 0.05
Nodes (71): parseAudienceProfile(), parseCaseStudy(), parseCompanyContext(), parseCtaItem(), parseExtras(), parseObjection(), parseOfferItem(), parseStringArray() (+63 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "feedback-form.tsx"
Cohesion: 0.22
Nodes (14): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, filterFeedbackRunOptions(), CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody() (+6 more)

### Community 39 - "RefreshSessionRepository"
Cohesion: 0.09
Nodes (12): Inject, LoginUseCase, Inject, Injectable, RefreshUseCase, Inject, Injectable, RefreshSessionRecord (+4 more)

### Community 40 - "new-ids.ts"
Cohesion: 0.18
Nodes (7): ErrorEnvelope, HttpExceptionFilter, Catch, newInvitationId(), newRequestId(), RequestIdMiddleware, Injectable

### Community 41 - "run.types.ts"
Cohesion: 0.07
Nodes (21): LightRunItem, ListRunsQuery, ListRunsResult, RunSnapshot, RunLogEntry, RunRecordBase, SocialRunRecord, ALLOWED_RUN_STATES (+13 more)

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.13
Nodes (20): ApiOpenAiErrorResponses(), OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+12 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (28): brand, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createInvitationId(), createRequestId() (+20 more)

### Community 44 - "types/index.ts"
Cohesion: 0.08
Nodes (44): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+36 more)

### Community 45 - "provider-registry.service.ts"
Cohesion: 0.13
Nodes (14): CompleteOnceResult, CliAiModel, UnsupportedProviderException, ModelId, GatewayCapabilitiesConfig, GatewayModelConfig, GatewayParamsConfig, AIProvider (+6 more)

### Community 46 - "getAppConfig"
Cohesion: 0.22
Nodes (9): getAppConfig(), enrichRequestWithClientId(), AnthropicApiKeyGuard, readAnthropicApiKey(), Injectable, OpenAiBearerAuthGuard, readAuthorizationHeader(), readBearerToken() (+1 more)

### Community 47 - "anthropic-models.controller.ts"
Cohesion: 0.22
Nodes (12): ApiAnthropicErrorResponses(), AnthropicErrorBodyDto, AnthropicErrorResponseDto, ApiProperty, AnthropicModelDto, AnthropicModelsListResponseDto, ApiProperty, mapGatewayModelsListToAnthropic() (+4 more)

### Community 48 - "run.port.ts"
Cohesion: 0.21
Nodes (12): ListRunsOutput, RecoverInterruptedRunsUseCase, Inject, Injectable, RunLifecycleService, TransitionExtras, Injectable, PAGE_SIZE (+4 more)

### Community 49 - "ChatParamsDto"
Cohesion: 0.12
Nodes (17): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+9 more)

### Community 50 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+2 more)

### Community 51 - "ModelAlias"
Cohesion: 0.03
Nodes (39): ProviderTestOptions, HttpMetricsMiddleware, Injectable, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, healthStatusToGaugeValue() (+31 more)

### Community 52 - "CompanyContext"
Cohesion: 0.23
Nodes (6): CompanyContext, emptyCompanyContext(), jsonArray(), jsonRecord(), PrismaCompanyContextAdapter, Injectable

### Community 53 - "InvitationsController"
Cohesion: 0.12
Nodes (13): InviteUserDto, ApiProperty, IsEmail, InvitationsController, ApiCookieAuth, ApiTags, Body, Controller (+5 more)

### Community 54 - "apiFetch"
Cohesion: 0.07
Nodes (41): metadata, geistMono, geistSans, metadata, acceptInvite(), bootstrapAdmin(), Credentials, fetchBootstrapStatus() (+33 more)

### Community 55 - "ApiRequestIdHeader"
Cohesion: 0.15
Nodes (14): ApiRequestIdHeader(), ApiOkResponse, ApiOperation, Get, AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+6 more)

### Community 56 - "content.graph.ts"
Cohesion: 0.09
Nodes (40): Inject, Inject, coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema (+32 more)

### Community 57 - "api-error.code.ts"
Cohesion: 0.12
Nodes (19): clamp(), isOverrideKey(), resolveProviderCallOptions(), OVERRIDE_KEYS, OverrideKey, ApiErrorCode, GatewayKeyGuard, Injectable (+11 more)

### Community 58 - "HealthController"
Cohesion: 0.16
Nodes (11): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, HealthModule, Module (+3 more)

### Community 59 - "responses.adapter.ts"
Cohesion: 0.06
Nodes (65): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, toHttpException(), asSystemFingerprint(), asToolCallId(), asWarningCode(), ProviderAssistantTurn, ProviderChatTurn (+57 more)

### Community 60 - "models.controller.ts"
Cohesion: 0.10
Nodes (22): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+14 more)

### Community 61 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 62 - "should-include-redis-stack.ts"
Cohesion: 0.35
Nodes (10): getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis() (+2 more)

### Community 63 - "response-cache.service.ts"
Cohesion: 0.10
Nodes (16): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, CacheModule, CacheModuleOptions (+8 more)

### Community 64 - "provider-manager.service.ts"
Cohesion: 0.07
Nodes (52): assertInteractiveAllowed(), collectPendingSecrets(), DEFAULT_MODELS, DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, convertProvider() (+44 more)

### Community 65 - "auth.controller.ts"
Cohesion: 0.05
Nodes (47): AcceptInviteUseCase, Inject, Injectable, BootstrapStatusUseCase, Inject, Injectable, LogoutUseCase, Inject (+39 more)

### Community 66 - "ChatToolingDto"
Cohesion: 0.16
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 67 - "provider-instances.bootstrap.ts"
Cohesion: 0.19
Nodes (12): assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryFn, openAiCompatibleApiSurface (+4 more)

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.07
Nodes (31): IsStringOrArrayOfStrings(), OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray (+23 more)

### Community 69 - "DomainException"
Cohesion: 0.09
Nodes (34): AcceptInviteResult, acceptInviteSchema, comparePassword(), generateRefreshToken(), hashPassword(), hashRefreshToken(), parseTtlMs(), parseTtlSeconds() (+26 more)

### Community 70 - "company-context.mapper.ts"
Cohesion: 0.15
Nodes (11): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+3 more)

### Community 71 - "runs.controller.ts"
Cohesion: 0.07
Nodes (35): CancelRunUseCase, Inject, Injectable, GetRunLogsUseCase, Injectable, GetRunUseCase, Injectable, ListRunsUseCase (+27 more)

### Community 72 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.14
Nodes (12): LoggingModule, Global, Module, ProviderRegistryModule, Global, Module, ProvidersModule, Module (+4 more)

### Community 73 - "http-metrics.interceptor.ts"
Cohesion: 0.11
Nodes (18): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, MetricsController, Controller, Get (+10 more)

### Community 74 - "InProcessRunWorker"
Cohesion: 0.13
Nodes (4): InProcessRunWorker, Injectable, isRetryable(), RetryReason

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "UserRepository"
Cohesion: 0.07
Nodes (26): ListUsersUseCase, Inject, Injectable, ReactivateUserUseCase, Inject, Injectable, SoftDeleteUserUseCase, Inject (+18 more)

### Community 77 - "RedisConnectionService"
Cohesion: 0.22
Nodes (5): RedisCacheModule, Module, RedisConnectionService, Injectable, isRedisRequiredFromConfig()

### Community 78 - "CompanyContextRepository"
Cohesion: 0.15
Nodes (19): toPublicCompanyContext(), GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PatchCompanyContextUseCase (+11 more)

### Community 79 - "llm-hop.ts"
Cohesion: 0.08
Nodes (32): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), LlmGatewayError (+24 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - ".completions"
Cohesion: 0.14
Nodes (13): OpenAiChatCompletionsController, ApiBody, ApiOperation, ApiProduces, ApiResponse, ApiSecurity, ApiTags, Body (+5 more)

### Community 82 - "openai-stream.mapper.ts"
Cohesion: 0.19
Nodes (19): OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty, ApiPropertyOptional (+11 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 85 - "api/src/app.module.ts"
Cohesion: 0.07
Nodes (36): CompanyContextModule, Module, ContentPipelineFacade, toOutcome(), Injectable, ContentRunExecutor, isCanonicalOutlineSelection(), isMissingContentKind() (+28 more)

### Community 87 - "GatewayConfig"
Cohesion: 0.07
Nodes (23): PendingSecretsItem, CliRateLimit, ClientManagerService, Injectable, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable, EnvPatchService (+15 more)

### Community 88 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 89 - "provider-base-url.validation.ts"
Cohesion: 0.43
Nodes (6): assertEnabledProviderBaseUrlPresent(), collectMissingBaseUrlErrors(), formatMissingBaseUrlError(), MissingProviderBaseUrl, RawGatewayConfig, resolveBaseUrlFromEnv()

### Community 90 - "RunSseHub"
Cohesion: 0.16
Nodes (6): Inject, RunSseEvent, RunSseHub, InMemoryRunSseHub, Inject, Injectable

### Community 91 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 93 - "provider-error.mapper.ts"
Cohesion: 0.17
Nodes (21): ApiErrorPayload, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isProviderRateLimitError(), isRateLimitStatus(), isServerError() (+13 more)

### Community 94 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 95 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 96 - "openai-chat-completions.controller.ts"
Cohesion: 0.04
Nodes (51): ApiHeader, ChatCacheSource, GATEWAY_CACHE_HEADER, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity (+43 more)

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 98 - "gateway-config.schema.ts"
Cohesion: 0.07
Nodes (41): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, KeyGenerateCommand, Command, Option, CliAiModelSchema (+33 more)

### Community 99 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 100 - "ClientRemoveCommand"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

### Community 101 - "PrismaService"
Cohesion: 0.05
Nodes (37): CreateFeedbackUseCase, Inject, Injectable, agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_RUN_READER, FeedbackRunLookup (+29 more)

### Community 102 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 103 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 105 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 106 - "configure-swagger.ts"
Cohesion: 0.24
Nodes (8): AppModule, Module, bootstrap(), parseCorsOrigins(), configureHttpApp(), ACCESS_COOKIE_NAME, buildSwaggerConfig(), COOKIE_AUTH_NAME

### Community 107 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 108 - "filters/http-exception.filter.ts"
Cohesion: 0.21
Nodes (7): DEFAULT_HTTP_STATUS_TO_CODE, GlobalExceptionFilter, isPayloadTooLargeError(), PayloadTooLargeError, RequestWithId, Catch, Injectable

### Community 110 - "chat.service.ts"
Cohesion: 0.04
Nodes (72): SemanticStoreEmbedState, CacheIdentityMessage, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize (+64 more)

### Community 111 - "semantic-cache.constants.ts"
Cohesion: 0.14
Nodes (11): EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema(), EMBEDDING_CIRCUIT_COOLDOWN_MS, EMBEDDING_CIRCUIT_OPEN_AFTER, EMBEDDING_PROBE_TIMEOUT_MS (+3 more)

### Community 112 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 114 - "cn"
Cohesion: 0.06
Nodes (58): AcceptInviteFormProps, FeedbackCta(), CancelRunDialogProps, FALLBACK, RunResultEditActionsProps, AppHeaderProps, AppSidebar(), AppSidebarProps (+50 more)

### Community 115 - "configuration-validation.service.ts"
Cohesion: 0.16
Nodes (8): CACHE_BACKEND_TYPE, assertEnabledProviderSecretsPresent(), configurationValidation, ConfigurationValidationService, CACHE_BACKEND_VALUES, validate(), ValidatedEnvironment, RawGatewayConfig

### Community 117 - "domain/company-context.types.ts"
Cohesion: 0.19
Nodes (17): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CompanyContextWriteDetail (+9 more)

### Community 118 - "prisma-invitation.adapter.ts"
Cohesion: 0.17
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 119 - "CompanyContextController"
Cohesion: 0.22
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 123 - "anthropic.module.ts"
Cohesion: 0.21
Nodes (10): ChatModule, Module, AnthropicModule, Module, IntegrationsModule, Module, OpenAiModule, Module (+2 more)

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

## Knowledge Gaps
- **381 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+376 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1110 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ModelAlias` connect `ModelAlias` to `openai-chat-completions.controller.ts`, `provider-manager.service.ts`, `gateway-config.schema.ts`, `asProviderInstanceId`, `wizard-orchestrator.service.ts`, `types/index.ts`, `branded.types.ts`, `chat.service.ts`, `provider-registry.service.ts`, `redis-vector-store.adapter.ts`, `GatewayConfig`, `metrics.ts`, `models.controller.ts`, `api-error.code.ts`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `ModelAlias` to `openai-chat-completions.controller.ts`, `provider-manager.service.ts`, `gateway-config.schema.ts`, `provider-base-url.validation.ts`, `logging.service.ts`, `asProviderInstanceId`, `wizard-orchestrator.service.ts`, `types/index.ts`, `provider-registry.service.ts`, `branded.types.ts`, `chat.service.ts`, `configuration.ts`, `GatewayConfig`, `ProviderApiKey`, `metrics.ts`, `models.controller.ts`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Why does `LoggingService` connect `LoggingService` to `swagger.setup.ts`, `provider-instances.bootstrap.ts`, `logging.service.ts`, `anthropic/anthropic-tools.mapper.ts`, `types/index.ts`, `RedisConnectionService`, `chat.service.ts`, `provider-registry.service.ts`, `filters/http-exception.filter.ts`, `redis-vector-store.adapter.ts`, `ai-provider-gateway/src/health/health.service.ts`, `responses.adapter.ts`, `semantic-cache.service.ts`, `provider-error.mapper.ts`, `response-cache.service.ts`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _381 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `auth.module.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06853146853146853 - nodes in this community are weakly interconnected._
- **Should `get-run.use-case.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05089108910891089 - nodes in this community are weakly interconnected._