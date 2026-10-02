# Graph Report - content-chain  (2026-10-02)

## Corpus Check
- 653 files · ~204,529 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .css 1)

## Summary
- 4225 nodes · 13033 edges · 138 communities (124 shown, 13 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 400 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `beefaf0b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- invite-user.use-case.ts
- social.types.ts
- api/company-context.types.ts
- cli.module.ts
- dashboard-shell.tsx
- run-details-view.tsx
- DomainException
- logging.module.ts
- anthropic/anthropic-tools.mapper.ts
- exitWithAgentReport
- prisma.service.ts
- config-generator.service.ts
- social.graph.ts
- branded.types.ts
- run-review-panel.tsx
- ChatParamsDto
- anthropic-response.mapper.ts
- RedisVectorStoreAdapter
- AuthUserContext
- isRecord
- sentry-ai-metrics.adapter.ts
- configuration.ts
- start-run-form.tsx
- model-manager.service.ts
- ai-provider-gateway/src/app.module.ts
- chat-provider-call.service.ts
- types/index.ts
- configure-swagger.ts
- semantic-cache.service.ts
- openai-stream.mapper.ts
- users.controller.ts
- HealthService
- swagger.setup.ts
- configuration-validation.service.ts
- AnthropicMessagesRequestDto
- runs-result.types.ts
- runs.types.ts
- enums.ts
- feedback-form.tsx
- auth.module.ts
- .create
- prisma-run.adapter.ts
- openai-models.controller.ts
- ids.ts
- google-tools.mapper.ts
- LoggingService
- configuration.types.ts
- anthropic-models.controller.ts
- PrometheusAppMetricsAdapter
- PageDocument
- ListRunsQueryDto
- ModelAlias
- CompanyContext
- GatewayConfig
- apiFetch
- AppMetricsModule
- content.graph.ts
- GlobalExceptionFilter
- HealthController
- chat-completions.adapter.ts
- models.controller.ts
- company-context.dto.ts
- should-include-redis-stack.ts
- response-cache.service.ts
- asProviderInstanceId
- AuthController
- ChatToolingDto
- provider-instances.bootstrap.ts
- OpenAiChatCompletionRequestDto
- run-record.test-helpers.ts
- company-context.mapper.ts
- RunRepository
- provider-base-url.validation.ts
- http-metrics.interceptor.ts
- UserRepository
- parse-verifier-log-message.ts
- openai-messages.mapper.ts
- openai-params-provider.mapper.ts
- CompanyContextRepository
- llm-hop.ts
- PrometheusService
- ChatMessageDto
- redis-vector-store.adapter.ts
- SPEC — README
- ProviderRegistryService
- api/src/app.module.ts
- patch-company-context.use-case.ts
- app-metrics.service.ts
- EnvironmentVariables
- sse-meta-payload.dto.ts
- ai-provider-gateway/src/health/health.service.ts
- StartRunDto
- ActiveStreamsTracker
- api-error.code.ts
- ClientEditCommand
- ModelAddCommand
- anthropic-messages.controller.ts
- route.ts
- wizard-orchestrator.service.ts
- ModelEditCommand
- ClientRemoveCommand
- PrismaService
- ProviderEditCommand
- ProviderAddCommand
- AppMetricsBackend
- ProviderRemoveCommand
- InMemoryRunSseHub
- ClientAddCommand
- semantic-cache.constants.ts
- responses.adapter.ts
- chat.service.ts
- app-metrics-backend.interface.ts
- ModelRemoveCommand
- feedback.module.ts
- cn
- ConfigInitCommand
- domain/company-context.types.ts
- prisma-invitation.adapter.ts
- CompanyContextController
- domain/feedback.types.ts
- RolesGuard
- app-configuration.types.ts
- config-validator.ts
- Architektura
- brand
- HttpMethod
- resolve-provider-call-options.ts
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
4. `DomainException` - 72 edges
5. `asProviderInstanceId()` - 67 edges
6. `GatewayConfig` - 65 edges
7. `cn()` - 62 edges
8. `isRecord()` - 60 edges
9. `GatewayKey` - 59 edges
10. `ClientId` - 54 edges

## Surprising Connections (you probably didn't know these)
- `toChatResponseDto()` --indirect_call--> `toGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/chat/dto/chat-response.dto.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `mapChatResponseToOpenAi()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/openai/mappers/openai-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `DialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/dialog.tsx → apps/frontend/src/shared/utils/utils.ts
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `CacheRegistryService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/cache-registry.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (138 total, 13 thin omitted)

### Community 0 - "invite-user.use-case.ts"
Cohesion: 0.05
Nodes (38): Inject, InviteUserResult, inviteUserSchema, InviteUserUseCase, Inject, Injectable, InvitationListItem, ListInvitationsUseCase (+30 more)

### Community 1 - "social.types.ts"
Cohesion: 0.06
Nodes (26): CompositeRunResultReader, GetRunOutput, RunResultReader, SocialBrief, EmptyRunResultReader, Injectable, SocialResultStore, PipelineState (+18 more)

### Community 2 - "api/company-context.types.ts"
Cohesion: 0.06
Nodes (68): metadata, fetchCompanyContext(), fetchCompleteness(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras (+60 more)

### Community 3 - "cli.module.ts"
Cohesion: 0.07
Nodes (58): AgentReport, AgentReportStatus, loadAnswers(), assertAgentHasAnswers(), CliMode, CliModeFlags, markAgentRuntime(), resolveCliMode() (+50 more)

### Community 4 - "dashboard-shell.tsx"
Cohesion: 0.10
Nodes (18): FeedbackCta(), AppHeader(), AppSidebar(), AppSidebarProps, CompletenessChipSlot(), FeedbackCtaSlot(), FloatingBoxSlot(), DashboardShell() (+10 more)

### Community 5 - "run-details-view.tsx"
Cohesion: 0.09
Nodes (34): metadata, metadata, CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS, RUN_TASK_TYPE_LABELS (+26 more)

### Community 6 - "DomainException"
Cohesion: 0.08
Nodes (35): AcceptInviteResult, acceptInviteSchema, hashPassword(), validatePasswordPolicy(), orderItemsBySelectedIds(), contentsArraySchema, editedContentItemSchema, editedContentSchema (+27 more)

### Community 7 - "logging.module.ts"
Cohesion: 0.06
Nodes (24): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+16 more)

### Community 8 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.11
Nodes (35): ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent(), isAnthropicEffortLevel(), mapThinkingBudgetToAnthropicEffort(), mapThinkingToAnthropic(), resolveAnthropicOutputConfig(), ContentBlockParam (+27 more)

### Community 9 - "exitWithAgentReport"
Cohesion: 0.14
Nodes (11): emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList(), Injectable (+3 more)

### Community 10 - "prisma.service.ts"
Cohesion: 0.24
Nodes (4): RefreshSessionRecord, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable

### Community 11 - "config-generator.service.ts"
Cohesion: 0.17
Nodes (8): ConfigGeneratorService, Injectable, FileManagerService, Injectable, generateEnvTemplate(), isEnvInputRedisRequired(), MASTER_PROMPT_TEMPLATE, generateModelPromptTemplate()

### Community 12 - "social.graph.ts"
Cohesion: 0.08
Nodes (49): loadPromptFromDir(), coercePassNoteVerdict(), isPassOnlyIssue(), coerceVerifierIssue(), ContentOutput, contentOutputSchema, IdeasOutput, ideasOutputSchema (+41 more)

### Community 13 - "branded.types.ts"
Cohesion: 0.13
Nodes (33): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatResponseData, mapStopReasonToFinishReason() (+25 more)

### Community 14 - "run-review-panel.tsx"
Cohesion: 0.08
Nodes (39): buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload() (+31 more)

### Community 15 - "ChatParamsDto"
Cohesion: 0.12
Nodes (17): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+9 more)

### Community 16 - "anthropic-response.mapper.ts"
Cohesion: 0.14
Nodes (25): SseDoneEvent, fromGatewayToolCallDto(), asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto (+17 more)

### Community 17 - "RedisVectorStoreAdapter"
Cohesion: 0.22
Nodes (7): RedisVectorStoreAdapter, Injectable, isRedisSearchIndexAlreadyExistsError(), isRedisSearchMissingIndexError(), isRedisSearchModuleMissingError(), redisSearchErrorMessage(), VectorStoreKnnInput

### Community 18 - "AuthUserContext"
Cohesion: 0.08
Nodes (27): CreateFeedbackUseCase, Injectable, FeedbackEntry, HitlDto, IsArray, IsString, PatchRunRatingDto, IsIn (+19 more)

### Community 19 - "isRecord"
Cohesion: 0.15
Nodes (23): metadata, createInvitation(), fetchInvitations(), resendInvitation(), revokeInvitation(), InvitationListItem, InviteCreated, isInvitationExpired() (+15 more)

### Community 20 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.10
Nodes (28): CostUsd, ToolCallId, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext() (+20 more)

### Community 21 - "configuration.ts"
Cohesion: 0.26
Nodes (11): asSemanticCacheTtlSeconds(), buildAppConfiguration(), BuildEffectiveGatewayConfigOptions, buildGatewayKeyRuntime(), readRequiredPrompt(), stripHtmlComments(), tryReadOptionalPrompts(), loadGatewayConfigFromFile() (+3 more)

### Community 22 - "start-run-form.tsx"
Cohesion: 0.07
Nodes (44): metadata, assertNever(), notifyProduct(), notifyRunCancelled(), notifyRunTerminal(), EnvelopeRef, ProductToast, RunTerminalInput (+36 more)

### Community 23 - "model-manager.service.ts"
Cohesion: 0.12
Nodes (25): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, convertModel(), defaultModelPolicy(), ModelEditField, ModelManagerService (+17 more)

### Community 24 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.09
Nodes (23): ChatModule, Module, ChatResponseBuilderService, Injectable, GatewayKeyGuard, Injectable, AnthropicModule, Module (+15 more)

### Community 25 - "chat-provider-call.service.ts"
Cohesion: 0.14
Nodes (24): buildAppProviderMetricsContext(), buildLlmMetricsContext(), mapProviderResponseToAiObservation(), mapProviderResponseToUsage(), toMetricsMessages(), buildProviderInputForAlias(), toProviderTurns(), composeSystemPrompt() (+16 more)

### Community 26 - "types/index.ts"
Cohesion: 0.08
Nodes (45): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+37 more)

### Community 27 - "configure-swagger.ts"
Cohesion: 0.15
Nodes (13): AppModule, Module, bootstrap(), EnvModule, Global, Module, envSchema, parseCorsOrigins() (+5 more)

### Community 28 - "semantic-cache.service.ts"
Cohesion: 0.12
Nodes (19): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, isSingleTurnUserRequest(), lastUserMessageText(), embeddingProbeTimeoutMs() (+11 more)

### Community 29 - "openai-stream.mapper.ts"
Cohesion: 0.19
Nodes (19): OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty, ApiPropertyOptional (+11 more)

### Community 30 - "users.controller.ts"
Cohesion: 0.08
Nodes (23): ListUsersUseCase, Inject, Injectable, ReactivateUserUseCase, Inject, Injectable, SoftDeleteUserUseCase, Inject (+15 more)

### Community 31 - "HealthService"
Cohesion: 0.10
Nodes (13): HealthLivenessResponseDto, ApiProperty, HealthReadinessResponseDto, HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller (+5 more)

### Community 32 - "swagger.setup.ts"
Cohesion: 0.12
Nodes (19): AppModule, Module, SseDeltaPayloadDto, ApiProperty, bootstrap(), API_GLOBAL_PREFIX, PORT, setupApp() (+11 more)

### Community 33 - "configuration-validation.service.ts"
Cohesion: 0.18
Nodes (7): assertEnabledProviderSecretsPresent(), configurationValidation, ConfigurationValidationService, CACHE_BACKEND_VALUES, validate(), ValidatedEnvironment, RawGatewayConfig

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "runs-result.types.ts"
Cohesion: 0.05
Nodes (55): PAGE_OUTLINE_ROLE_LABELS, submitHitl(), HitlAccepted, isPageOutlineSectionRole(), isReelDuration(), PAGE_OUTLINE_SECTION_ROLES, PageDocument, PageOutline (+47 more)

### Community 36 - "runs.types.ts"
Cohesion: 0.06
Nodes (54): ArchiveRunsQuery, fetchRunLogs(), fetchUserRuns(), InitiatorOption, ArchiveRunItem, ArchiveRunsPage, CANCELABLE_STATUSES, CancelableRunStatus (+46 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "feedback-form.tsx"
Cohesion: 0.22
Nodes (14): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, filterFeedbackRunOptions(), CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody() (+6 more)

### Community 39 - "auth.module.ts"
Cohesion: 0.06
Nodes (54): AcceptInviteUseCase, Injectable, comparePassword(), generateRefreshToken(), hashRefreshToken(), parseTtlMs(), parseTtlSeconds(), BootstrapAdminInput (+46 more)

### Community 40 - ".create"
Cohesion: 0.13
Nodes (13): FeedbackController, ApiCookieAuth, ApiTags, Body, Controller, HttpCode, Post, CreateFeedbackDto (+5 more)

### Community 41 - "prisma-run.adapter.ts"
Cohesion: 0.06
Nodes (28): contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, socialBriefSchema (+20 more)

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.13
Nodes (20): ApiOpenAiErrorResponses(), OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+12 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (23): ACCOUNT_ACTIVATION_ID_RE, AccountActivationId, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createRunId() (+15 more)

### Community 44 - "google-tools.mapper.ts"
Cohesion: 0.16
Nodes (25): toCachedChatResponse(), asInputTokens(), asOutputTokens(), buildGenerationConfig(), createGoogleProvider(), getFinalToolCalls(), getStopReason(), getUsageMetadata() (+17 more)

### Community 45 - "LoggingService"
Cohesion: 0.06
Nodes (22): RedisConnectionService, Injectable, Inject, OllamaEmbeddingAdapter, Injectable, EmbeddingBackend, Inject, isRedisRequiredFromConfig() (+14 more)

### Community 46 - "configuration.types.ts"
Cohesion: 0.09
Nodes (26): resolveClientIdFromKey(), ResolvedGatewayClient, getAppConfig(), enrichRequestWithClientId(), SmartRateLimitGuard, Injectable, AnthropicMessagesController, ApiSecurity (+18 more)

### Community 47 - "anthropic-models.controller.ts"
Cohesion: 0.13
Nodes (20): ApiAnthropicErrorResponses(), AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+12 more)

### Community 48 - "PrometheusAppMetricsAdapter"
Cohesion: 0.12
Nodes (5): PrometheusAppMetricsAdapter, Injectable, resolveAppMetricsBackend(), AppProviderCallContext, AppProviderStreamScope

### Community 49 - "PageDocument"
Cohesion: 0.13
Nodes (7): ContentPipelineState, PageDocument, VerifierVerdict, PrismaContentResultAdapter, toContentPipelinePhase(), Injectable, toInputJson()

### Community 50 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+2 more)

### Community 51 - "ModelAlias"
Cohesion: 0.07
Nodes (8): ProviderTestOptions, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, AppMetricsService, Injectable, AppTokenUsage

### Community 52 - "CompanyContext"
Cohesion: 0.23
Nodes (6): CompanyContext, emptyCompanyContext(), jsonArray(), jsonRecord(), PrismaCompanyContextAdapter, Injectable

### Community 53 - "GatewayConfig"
Cohesion: 0.07
Nodes (17): ClientManagerService, Injectable, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable, EnvPatchService, Injectable, ProviderManagerService (+9 more)

### Community 54 - "apiFetch"
Cohesion: 0.09
Nodes (37): geistMono, geistSans, metadata, bootstrapAdmin(), Credentials, fetchBootstrapStatus(), fetchUserSession(), loginWithPassword() (+29 more)

### Community 55 - "AppMetricsModule"
Cohesion: 0.20
Nodes (9): AiMetricsModule, Global, Module, AppMetricsModule, Global, Module, ObservabilityModule, Global (+1 more)

### Community 56 - "content.graph.ts"
Cohesion: 0.08
Nodes (49): ContentPipelineFacade, toOutcome(), Inject, Injectable, coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, pageDocumentOutputSchema (+41 more)

### Community 57 - "GlobalExceptionFilter"
Cohesion: 0.32
Nodes (4): GlobalExceptionFilter, isPayloadTooLargeError(), Catch, Injectable

### Community 58 - "HealthController"
Cohesion: 0.11
Nodes (14): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, HealthModule, Module (+6 more)

### Community 59 - "chat-completions.adapter.ts"
Cohesion: 0.17
Nodes (22): toHttpException(), asSystemFingerprint(), ProviderChatInput, ProviderToolDefinition, ChatCompletionsAdapterOptions, createChatCompletionsAdapter(), textStream(), mapTurnsToOpenAiMessages() (+14 more)

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
Nodes (18): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+10 more)

### Community 64 - "asProviderInstanceId"
Cohesion: 0.08
Nodes (45): PendingSecretsItem, collectPendingSecrets(), ProviderTestCommand, Command, Option, convertProvider(), CliAiProvider, EnvPatchValue (+37 more)

### Community 65 - "AuthController"
Cohesion: 0.08
Nodes (26): AuthController, ApiCookieAuth, ApiTags, Body, Controller, Get, HttpCode, Patch (+18 more)

### Community 66 - "ChatToolingDto"
Cohesion: 0.16
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 67 - "provider-instances.bootstrap.ts"
Cohesion: 0.23
Nodes (11): GatewayProviderInstanceConfig, assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryFn (+3 more)

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.07
Nodes (31): IsStringOrArrayOfStrings(), OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray (+23 more)

### Community 69 - "run-record.test-helpers.ts"
Cohesion: 0.11
Nodes (16): isContentStartCommand(), isPlainRecord(), omitUndefinedDeep(), makeContentRun(), makeSocialRun(), makeSocialSnapshot(), SocialRunSnapshot, ErrorEnvelope (+8 more)

### Community 70 - "company-context.mapper.ts"
Cohesion: 0.16
Nodes (11): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+3 more)

### Community 71 - "RunRepository"
Cohesion: 0.03
Nodes (67): AutoFinalizeExpiredReviewsUseCase, Inject, Injectable, CancelRunUseCase, Inject, Injectable, FinalizeReviewUseCase, Inject (+59 more)

### Community 72 - "provider-base-url.validation.ts"
Cohesion: 0.43
Nodes (6): assertEnabledProviderBaseUrlPresent(), collectMissingBaseUrlErrors(), formatMissingBaseUrlError(), MissingProviderBaseUrl, RawGatewayConfig, resolveBaseUrlFromEnv()

### Community 73 - "http-metrics.interceptor.ts"
Cohesion: 0.11
Nodes (18): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, MetricsController, Controller, Get (+10 more)

### Community 74 - "UserRepository"
Cohesion: 0.06
Nodes (22): Inject, Inject, Inject, ACCOUNT_ACTIVATION_REPOSITORY, AccountActivationRecord, AccountActivationRepository, CreatePendingUser, RotateActivationTokenInput (+14 more)

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "openai-messages.mapper.ts"
Cohesion: 0.42
Nodes (6): mapOpenAiMessagesToGateway(), mapOpenAiToolCalls(), mapOpenAiChatRequestToGateway(), mapOpenAiToolChoice(), mapOpenAiToolsToGateway(), OpenAiFunctionTool

### Community 77 - "openai-params-provider.mapper.ts"
Cohesion: 0.12
Nodes (24): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+16 more)

### Community 78 - "CompanyContextRepository"
Cohesion: 0.21
Nodes (11): GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PutCompanyContextUseCase, Inject (+3 more)

### Community 79 - "llm-hop.ts"
Cohesion: 0.07
Nodes (36): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), LlmGatewayError (+28 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - "ChatMessageDto"
Cohesion: 0.06
Nodes (39): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+31 more)

### Community 82 - "redis-vector-store.adapter.ts"
Cohesion: 0.17
Nodes (13): isUnservableCachedReply(), parseCachedChatResponse(), escapeRedisSearchTag(), asString(), ParsedKnnHits, parseKnnHits(), VectorSearchHit, VectorStore (+5 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "ProviderRegistryService"
Cohesion: 0.12
Nodes (10): ChatProviderCallService, Injectable, ChatValidationService, Injectable, UnsupportedProviderException, GatewayModelConfig, ProviderInstancesBootstrap, Injectable (+2 more)

### Community 85 - "api/src/app.module.ts"
Cohesion: 0.07
Nodes (40): AuthModule, Module, CompanyContextModule, Module, ContentRunExecutor, isCanonicalOutlineSelection(), isMissingContentKind(), Inject (+32 more)

### Community 86 - "patch-company-context.use-case.ts"
Cohesion: 0.27
Nodes (8): toPublicCompanyContext(), PatchCompanyContextUseCase, Inject, Injectable, assertCompanyContextWritable(), PartialCompanyContext, isComplete(), mergeCompanyContext()

### Community 87 - "app-metrics.service.ts"
Cohesion: 0.14
Nodes (11): APP_METRICS_BACKEND, MetricsController, ApiOperation, ApiResponse, ApiTags, Controller, Get, PreMetricsScrapeHook (+3 more)

### Community 88 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 89 - "sse-meta-payload.dto.ts"
Cohesion: 0.36
Nodes (5): ChatCacheSource, SseMetaPayload, SseMetaPayloadDto, ApiProperty, ApiPropertyOptional

### Community 90 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.24
Nodes (11): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiProperty, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty (+3 more)

### Community 91 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 93 - "api-error.code.ts"
Cohesion: 0.15
Nodes (24): ChatErrorHandlerService, Injectable, ApiErrorCode, ApiErrorPayload, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus() (+16 more)

### Community 94 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 95 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 96 - "anthropic-messages.controller.ts"
Cohesion: 0.04
Nodes (62): ApiHeader, GATEWAY_CACHE_HEADER, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags (+54 more)

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 98 - "wizard-orchestrator.service.ts"
Cohesion: 0.05
Nodes (66): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, assertInteractiveAllowed(), KeyGenerateCommand, Command, Option (+58 more)

### Community 99 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 100 - "ClientRemoveCommand"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

### Community 101 - "PrismaService"
Cohesion: 0.12
Nodes (7): OutputEditedWrite, OutputEditedWriter, applyWrite(), PrismaOutputEditedAdapter, Injectable, PrismaService, Injectable

### Community 102 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 103 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 105 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 106 - "InMemoryRunSseHub"
Cohesion: 0.27
Nodes (4): RunSseEvent, InMemoryRunSseHub, Inject, Injectable

### Community 107 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 108 - "semantic-cache.constants.ts"
Cohesion: 0.13
Nodes (12): EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema(), EMBEDDING_CIRCUIT_COOLDOWN_MS, EMBEDDING_CIRCUIT_OPEN_AFTER, EMBEDDING_PROBE_TIMEOUT_MS (+4 more)

### Community 109 - "responses.adapter.ts"
Cohesion: 0.15
Nodes (22): asToolCallId(), ProviderAssistantTurn, ProviderChatTurn, ProviderToolResultTurn, buildResponsesCreateParams(), createResponsesAdapter(), textStream(), mapGatewayMetadataToOpenAi() (+14 more)

### Community 110 - "chat.service.ts"
Cohesion: 0.06
Nodes (52): SemanticStoreEmbedState, CacheIdentityMessage, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize (+44 more)

### Community 111 - "app-metrics-backend.interface.ts"
Cohesion: 0.21
Nodes (11): healthStatusToGaugeValue(), AppRequestLabels, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus, HttpRequestLabels (+3 more)

### Community 112 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 113 - "feedback.module.ts"
Cohesion: 0.18
Nodes (10): FEEDBACK_RUN_READER, FeedbackRunLookup, FeedbackRunReader, FeedbackModule, Module, PrismaFeedbackRunReaderAdapter, Injectable, PrismaModule (+2 more)

### Community 114 - "cn"
Cohesion: 0.06
Nodes (52): metadata, ACCEPT_INVITE_UNAUTHORIZED_HINT, AcceptInviteFormError, toAcceptInviteFormError(), acceptInvite(), AcceptInviteForm(), onSubmit(), AcceptInviteFormProps (+44 more)

### Community 115 - "ConfigInitCommand"
Cohesion: 0.14
Nodes (8): ConfigInitCommand, Command, Option, ConfigValidateCommand, Command, Option, CliGatewayValidatorService, Injectable

### Community 117 - "domain/company-context.types.ts"
Cohesion: 0.18
Nodes (18): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CompanyContextWriteDetail (+10 more)

### Community 118 - "prisma-invitation.adapter.ts"
Cohesion: 0.17
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 119 - "CompanyContextController"
Cohesion: 0.22
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 120 - "domain/feedback.types.ts"
Cohesion: 0.15
Nodes (9): Inject, agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_BODY_MAX, FEEDBACK_REPOSITORY, FeedbackRepository, PrismaFeedbackAdapter (+1 more)

### Community 122 - "app-configuration.types.ts"
Cohesion: 0.15
Nodes (9): CACHE_BACKEND_TYPE, AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig, SemanticCacheRuntimeConfig, ProviderInstanceRuntime, GatewayKeyRuntimeConfig (+1 more)

### Community 123 - "config-validator.ts"
Cohesion: 0.29
Nodes (10): CliValidateOptions, collectInactiveProviderWarnings(), formatZodIssues(), validateGatewayConfig(), ValidationOptions, ValidationResult, buildEffectiveGatewayConfig(), assertMasterKeyPresent() (+2 more)

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 125 - "brand"
Cohesion: 0.17
Nodes (10): brand, unbrand, createAccountActivationId(), createInvitationId(), createRequestId(), createUserId(), isAccountActivationId(), isInvitationId() (+2 more)

### Community 126 - "HttpMethod"
Cohesion: 0.24
Nodes (3): HttpMetricsMiddleware, Injectable, HttpMethod

### Community 128 - "resolve-provider-call-options.ts"
Cohesion: 0.48
Nodes (5): clamp(), isOverrideKey(), resolveProviderCallOptions(), OVERRIDE_KEYS, OverrideKey

## Knowledge Gaps
- **387 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+382 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1121 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ModelAlias` connect `ModelAlias` to `asProviderInstanceId`, `wizard-orchestrator.service.ts`, `AppMetricsBackend`, `branded.types.ts`, `chat.service.ts`, `app-metrics-backend.interface.ts`, `PrometheusAppMetricsAdapter`, `redis-vector-store.adapter.ts`, `sentry-ai-metrics.adapter.ts`, `GatewayConfig`, `app-metrics.service.ts`, `model-manager.service.ts`, `sse-meta-payload.dto.ts`, `types/index.ts`, `models.controller.ts`, `chat-provider-call.service.ts`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `ModelAlias` to `logging.module.ts`, `exitWithAgentReport`, `branded.types.ts`, `sentry-ai-metrics.adapter.ts`, `model-manager.service.ts`, `chat-provider-call.service.ts`, `types/index.ts`, `LoggingService`, `configuration.types.ts`, `PrometheusAppMetricsAdapter`, `GatewayConfig`, `models.controller.ts`, `asProviderInstanceId`, `provider-base-url.validation.ts`, `app-metrics.service.ts`, `sse-meta-payload.dto.ts`, `wizard-orchestrator.service.ts`, `AppMetricsBackend`, `chat.service.ts`, `app-metrics-backend.interface.ts`, `app-configuration.types.ts`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Why does `LoggingService` connect `LoggingService` to `logging.module.ts`, `anthropic/anthropic-tools.mapper.ts`, `RedisVectorStoreAdapter`, `chat-provider-call.service.ts`, `types/index.ts`, `semantic-cache.service.ts`, `HealthService`, `swagger.setup.ts`, `google-tools.mapper.ts`, `configuration.types.ts`, `GlobalExceptionFilter`, `chat-completions.adapter.ts`, `response-cache.service.ts`, `provider-instances.bootstrap.ts`, `redis-vector-store.adapter.ts`, `ProviderRegistryService`, `ai-provider-gateway/src/health/health.service.ts`, `api-error.code.ts`, `anthropic-messages.controller.ts`, `responses.adapter.ts`, `chat.service.ts`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _387 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `invite-user.use-case.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.053939714436805924 - nodes in this community are weakly interconnected._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06073871409028728 - nodes in this community are weakly interconnected._