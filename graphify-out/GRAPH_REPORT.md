# Graph Report - content-chain  (2026-10-01)

## Corpus Check
- 641 files · ~195,924 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .css 1)

## Summary
- 4157 nodes · 12820 edges · 137 communities (122 shown, 14 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 399 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `37b381c9`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- prisma-invitation.adapter.ts
- social.types.ts
- api/company-context.types.ts
- exitWithAgentReport
- dashboard-shell.tsx
- run-details-view.tsx
- ModelAlias
- logging.module.ts
- anthropic/anthropic-tools.mapper.ts
- anthropic.module.ts
- cancel-run-dialog.tsx
- invite-user.use-case.ts
- social.graph.ts
- branded.types.ts
- run-result-view.tsx
- types/index.ts
- anthropic-response.mapper.ts
- redis-vector-store.adapter.ts
- AuthUserContext
- DomainException
- sentry-ai-metrics.adapter.ts
- configuration.ts
- ConfigInitCommand
- FileManagerService
- GatewayConfig
- openai-thinking-provider.mapper.ts
- LoggingService
- run-record.test-helpers.ts
- save-output-edited.use-case.ts
- google-tools.mapper.ts
- auth-user.types.ts
- HealthService
- swagger.setup.ts
- InvitationsController
- AnthropicMessagesRequestDto
- run-result-editor.tsx
- runs.types.ts
- enums.ts
- feedback-form.tsx
- AuthController
- HttpExceptionFilter
- prisma-run.adapter.ts
- openai-models.controller.ts
- ids.ts
- semantic-cache.constants.ts
- model-manager.service.ts
- getAppConfig
- anthropic-models.controller.ts
- health-readiness-response.dto.ts
- chat-params.dto.ts
- ListRunsQueryDto
- agent-answers.schema.ts
- provider-registry.service.ts
- api/src/main.ts
- users-view.tsx
- ChatToolingDto
- content.graph.ts
- chat-completions.adapter.ts
- HealthController
- responses.adapter.ts
- models.controller.ts
- company-context.dto.ts
- should-include-redis-stack.ts
- cache.module.ts
- asProviderInstanceId
- .createMessage
- metrics.ts
- provider-instances.bootstrap.ts
- OpenAiChatCompletionRequestDto
- auth.module.ts
- company-context.mapper.ts
- runs.controller.ts
- openai-params-provider.mapper.ts
- patch-company-context.use-case.ts
- RedisConnectionService
- parse-verifier-log-message.ts
- UserRepository
- SmartRateLimiterService
- CompanyContextRepository
- llm-gateway.http.adapter.ts
- PrometheusService
- api-error.code.ts
- ChatParamsDto
- SPEC — README
- PinoLoggerAdapter
- api/src/app.module.ts
- VectorStore
- gateway-config.schema.ts
- EnvironmentVariables
- readClientGatewayKey.ts
- InMemoryRunSseHub
- StartRunDto
- public.decorator.ts
- provider-error.mapper.ts
- ClientEditCommand
- ModelAddCommand
- anthropic-messages.controller.ts
- route.ts
- cli.module.ts
- ModelEditCommand
- ClientListCommand
- create-feedback.use-case.ts
- ConfigSecretsStatusCommand
- ProviderAddCommand
- CompanyContext
- ConfigShowCommand
- ModelListCommand
- ClientAddCommand
- ProviderListCommand
- ApiRequestIdHeader
- chat.service.ts
- semantic-cache.service.ts
- ModelRemoveCommand
- OpenAiChatMessageDto
- cn
- openai-chat-message.dto.ts
- openai-chat-completion-request.dto.ts
- domain/company-context.types.ts
- PrismaRefreshSessionAdapter
- CompanyContextController
- GlobalExceptionFilter
- .getMetrics
- ai-provider-gateway/src/app.module.ts
- Architektura
- brand.ts
- RunsModule
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
- `ProviderTestOptions` --references--> `ProviderInstanceId`  [EXTRACTED]
  apps/ai-provider-gateway/src/cli/commands/provider/provider-test.command.ts → apps/ai-provider-gateway/src/common/types/branded.types.ts
- `DialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/dialog.tsx → apps/frontend/src/shared/utils/utils.ts
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `RedisConnectionService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-connection.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `CacheRegistryService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/cache-registry.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (137 total, 14 thin omitted)

### Community 0 - "prisma-invitation.adapter.ts"
Cohesion: 0.11
Nodes (22): Inject, InvitationListItem, RevokeInvitationUseCase, Inject, Injectable, AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput (+14 more)

### Community 1 - "social.types.ts"
Cohesion: 0.05
Nodes (41): ContentPipelineInput, ContentRefineSnapshot, PageDocument, PageOutline, PageOutlineSection, PageOutlineSectionRole, VerifierVerdict, PrismaContentResultAdapter (+33 more)

### Community 2 - "api/company-context.types.ts"
Cohesion: 0.05
Nodes (69): metadata, fetchCompanyContext(), fetchCompleteness(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras (+61 more)

### Community 3 - "exitWithAgentReport"
Cohesion: 0.14
Nodes (26): AgentReport, AgentReportStatus, emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), loadAnswers(), assertAgentHasAnswers(), CliMode (+18 more)

### Community 4 - "dashboard-shell.tsx"
Cohesion: 0.13
Nodes (14): AgentsGateTooltip(), AppHeader(), FloatingBoxSlot(), DashboardShell(), EventSourceRegistryContext, EventSourceRegistryProvider(), createEventSourceRegistry(), EventSourceRegistry (+6 more)

### Community 5 - "run-details-view.tsx"
Cohesion: 0.06
Nodes (49): metadata, metadata, metadata, CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS (+41 more)

### Community 6 - "ModelAlias"
Cohesion: 0.03
Nodes (36): HttpMetricsMiddleware, Injectable, ModelAlias, ProviderInstanceId, HealthCheckResult, HealthRedisCheckResult, NoopAppMetricsAdapter, Injectable (+28 more)

### Community 7 - "logging.module.ts"
Cohesion: 0.07
Nodes (19): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, SentryErrorReportingAdapter, Injectable (+11 more)

### Community 8 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.11
Nodes (35): ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent(), isAnthropicEffortLevel(), mapThinkingBudgetToAnthropicEffort(), mapThinkingToAnthropic(), resolveAnthropicOutputConfig(), ContentBlockParam (+27 more)

### Community 9 - "anthropic.module.ts"
Cohesion: 0.15
Nodes (12): ChatModule, Module, AnthropicModule, Module, AnthropicApiKeyGuard, Injectable, OpenAiBearerAuthGuard, Injectable (+4 more)

### Community 10 - "cancel-run-dialog.tsx"
Cohesion: 0.10
Nodes (31): CompletenessChip(), FeedbackCta(), assertNever(), notifyRunCancelled(), notifyRunTerminal(), EnvelopeRef, ProductToast, RunTerminalInput (+23 more)

### Community 11 - "invite-user.use-case.ts"
Cohesion: 0.12
Nodes (16): generateRefreshToken(), parseTtlMs(), parseTtlSeconds(), InviteUserResult, inviteUserSchema, InviteUserUseCase, Inject, Injectable (+8 more)

### Community 12 - "social.graph.ts"
Cohesion: 0.13
Nodes (32): coercePassNoteVerdict(), isPassOnlyIssue(), ideasOutputSchema, reelIdeasOutputSchema, isReelTaskType(), ReelTaskType, canRefine(), MAX_REFINE (+24 more)

### Community 13 - "branded.types.ts"
Cohesion: 0.08
Nodes (50): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatCacheSource, ChatResponseData, ChatWarningDto, ApiProperty, ApiPropertyOptional (+42 more)

### Community 14 - "run-result-view.tsx"
Cohesion: 0.06
Nodes (41): buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload() (+33 more)

### Community 15 - "types/index.ts"
Cohesion: 0.16
Nodes (23): RequestIdMiddleware, Injectable, CONVERSATION_ID_PATTERN, createRequestId(), isAttemptNumber(), isBaseUrl(), isCacheTtlSeconds(), isConversationId() (+15 more)

### Community 16 - "anthropic-response.mapper.ts"
Cohesion: 0.07
Nodes (50): ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString, SseDoneEvent, fromGatewayToolCallDto() (+42 more)

### Community 17 - "redis-vector-store.adapter.ts"
Cohesion: 0.16
Nodes (16): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), asString(), ParsedKnnHits, parseKnnHits() (+8 more)

### Community 18 - "AuthUserContext"
Cohesion: 0.09
Nodes (25): InviteUserDto, ApiProperty, IsEmail, isTerminalStatus(), RunsController, ApiCookieAuth, ApiTags, Body (+17 more)

### Community 19 - "DomainException"
Cohesion: 0.08
Nodes (29): AcceptInviteResult, acceptInviteSchema, comparePassword(), hashPassword(), hashRefreshToken(), BootstrapAdminInput, bootstrapAdminSchema, LoginInput (+21 more)

### Community 20 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.08
Nodes (30): NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes(), clearLlmScopeContext() (+22 more)

### Community 21 - "configuration.ts"
Cohesion: 0.07
Nodes (39): CliValidateOptions, asCacheTtlSeconds(), asSemanticCacheTtlSeconds(), AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig, SemanticCacheRuntimeConfig (+31 more)

### Community 22 - "ConfigInitCommand"
Cohesion: 0.14
Nodes (8): ConfigInitCommand, Command, Option, ConfigValidateCommand, Command, Option, CliGatewayValidatorService, Injectable

### Community 23 - "FileManagerService"
Cohesion: 0.23
Nodes (4): ConfigGeneratorService, Injectable, FileManagerService, Injectable

### Community 24 - "GatewayConfig"
Cohesion: 0.09
Nodes (15): PendingSecretsItem, ClientManagerService, Injectable, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable, EnvPatchService, Injectable (+7 more)

### Community 25 - "openai-thinking-provider.mapper.ts"
Cohesion: 0.25
Nodes (12): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), isOpenAiEffortLevel(), isOpenAiReasoningRequested(), mapThinkingBudgetToEffort(), mapThinkingToResponsesReasoning(), OPENAI_EFFORT_LEVELS (+4 more)

### Community 26 - "LoggingService"
Cohesion: 0.09
Nodes (13): OllamaEmbeddingAdapter, Injectable, EmbeddingBackend, Inject, LogContext, LoggingService, Injectable, ProviderInstancesBootstrap (+5 more)

### Community 27 - "run-record.test-helpers.ts"
Cohesion: 0.27
Nodes (10): isContentStartCommand(), isPlainRecord(), omitUndefinedDeep(), makeContentRun(), makeSocialRun(), makeSocialSnapshot(), SocialRunSnapshot, newConversationId() (+2 more)

### Community 28 - "save-output-edited.use-case.ts"
Cohesion: 0.09
Nodes (33): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+25 more)

### Community 29 - "google-tools.mapper.ts"
Cohesion: 0.17
Nodes (22): toHttpException(), buildGenerationConfig(), createGoogleProvider(), getFinalToolCalls(), getStopReason(), textStream(), mapStopSequences(), mapThinkingBudgetToGeminiLevel() (+14 more)

### Community 30 - "auth-user.types.ts"
Cohesion: 0.09
Nodes (21): ListUsersUseCase, Inject, Injectable, SoftDeleteUserUseCase, Injectable, JwtPayload, UserListItem, PatchUserDto (+13 more)

### Community 31 - "HealthService"
Cohesion: 0.23
Nodes (3): HealthReadinessResponseDto, HealthService, Injectable

### Community 32 - "swagger.setup.ts"
Cohesion: 0.09
Nodes (23): AppModule, Module, ChatOutputTextDto, ApiProperty, ChatUsageDto, ApiPropertyOptional, SseDeltaPayloadDto, ApiProperty (+15 more)

### Community 33 - "InvitationsController"
Cohesion: 0.12
Nodes (13): ListInvitationsUseCase, Inject, Injectable, InvitationsController, ApiCookieAuth, ApiTags, Body, Controller (+5 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "run-result-editor.tsx"
Cohesion: 0.10
Nodes (25): metadata, acceptInvite(), AcceptInviteForm(), onSubmit(), AcceptInviteFormProps, passwordMeetsPolicy(), PAGE_OUTLINE_SECTION_ROLES, PageOutlineSectionRole (+17 more)

### Community 36 - "runs.types.ts"
Cohesion: 0.05
Nodes (90): ArchiveRunsQuery, fetchUserRuns(), finalizeRunReview(), InitiatorOption, isUserRating(), patchRunRating(), HitlAccepted, isPageOutlineSectionRole() (+82 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "feedback-form.tsx"
Cohesion: 0.19
Nodes (16): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, filterFeedbackRunOptions(), CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody() (+8 more)

### Community 39 - "AuthController"
Cohesion: 0.08
Nodes (27): AuthController, ApiCookieAuth, ApiTags, Body, Controller, Get, HttpCode, Patch (+19 more)

### Community 40 - "HttpExceptionFilter"
Cohesion: 0.20
Nodes (6): ErrorEnvelope, HttpExceptionFilter, Catch, newRequestId(), RequestIdMiddleware, Injectable

### Community 41 - "prisma-run.adapter.ts"
Cohesion: 0.04
Nodes (31): contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, socialBriefSchema (+23 more)

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.11
Nodes (23): ApiOpenAiErrorResponses(), ANTHROPIC_INTEGRATION_PATH, OPENAI_INTEGRATION_PATH, OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam (+15 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (28): brand, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createInvitationId(), createRequestId() (+20 more)

### Community 44 - "semantic-cache.constants.ts"
Cohesion: 0.14
Nodes (11): EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema(), EMBEDDING_CIRCUIT_COOLDOWN_MS, EMBEDDING_CIRCUIT_OPEN_AFTER, EMBEDDING_PROBE_TIMEOUT_MS (+3 more)

### Community 45 - "model-manager.service.ts"
Cohesion: 0.08
Nodes (36): DEFAULT_MODELS, DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, defaultModelPolicy(), ModelEditField, ModelManagerService (+28 more)

### Community 46 - "getAppConfig"
Cohesion: 0.16
Nodes (12): resolveClientIdFromKey(), ResolvedGatewayClient, getAppConfig(), GatewayKeyGuard, Injectable, enrichRequestWithClientId(), SmartRateLimitGuard, Injectable (+4 more)

### Community 47 - "anthropic-models.controller.ts"
Cohesion: 0.13
Nodes (20): ApiAnthropicErrorResponses(), AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+12 more)

### Community 48 - "health-readiness-response.dto.ts"
Cohesion: 0.29
Nodes (9): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiProperty, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty (+1 more)

### Community 49 - "chat-params.dto.ts"
Cohesion: 0.24
Nodes (7): ResponseFormatDto, ApiProperty, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsThinkingBudget()

### Community 50 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+2 more)

### Community 51 - "agent-answers.schema.ts"
Cohesion: 0.11
Nodes (21): ClientAddAnswers, ClientAddAnswersSchema, ClientEditAnswers, ClientEditAnswersSchema, ClientRemoveAnswers, ClientRemoveAnswersSchema, InitAnswersSchema, ModelAddAnswers (+13 more)

### Community 52 - "provider-registry.service.ts"
Cohesion: 0.11
Nodes (26): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+18 more)

### Community 53 - "api/src/main.ts"
Cohesion: 0.33
Nodes (6): AppModule, Module, bootstrap(), parseCorsOrigins(), configureHttpApp(), buildSwaggerConfig()

### Community 54 - "users-view.tsx"
Cohesion: 0.06
Nodes (58): metadata, geistMono, geistSans, metadata, bootstrapAdmin(), Credentials, fetchBootstrapStatus(), fetchUserSession() (+50 more)

### Community 55 - "ChatToolingDto"
Cohesion: 0.16
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 56 - "content.graph.ts"
Cohesion: 0.08
Nodes (41): Inject, coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema, pageOutlineSectionSchema (+33 more)

### Community 57 - "chat-completions.adapter.ts"
Cohesion: 0.24
Nodes (13): ProviderAssistantTurn, ChatCompletionsAdapterOptions, createChatCompletionsAdapter(), textStream(), ChatCompletionMessageParam, mapAssistantTurn(), mapTurnsToOpenAiMessages(), accumulateOpenAiStreamToolCallDeltas() (+5 more)

### Community 58 - "HealthController"
Cohesion: 0.16
Nodes (11): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, HealthModule, Module (+3 more)

### Community 59 - "responses.adapter.ts"
Cohesion: 0.10
Nodes (38): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, mapProviderResponseToAiObservation(), toCachedChatResponse(), asInputTokens(), asOutputTokens(), asPromptCacheCreationTokens() (+30 more)

### Community 60 - "models.controller.ts"
Cohesion: 0.10
Nodes (22): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+14 more)

### Community 61 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 62 - "should-include-redis-stack.ts"
Cohesion: 0.18
Nodes (12): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement() (+4 more)

### Community 63 - "cache.module.ts"
Cohesion: 0.08
Nodes (19): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+11 more)

### Community 64 - "asProviderInstanceId"
Cohesion: 0.08
Nodes (38): assertInteractiveAllowed(), collectPendingSecrets(), ProviderTestCommand, ProviderTestOptions, Command, Option, convertProvider(), CliAiProvider (+30 more)

### Community 65 - ".createMessage"
Cohesion: 0.12
Nodes (14): ApiHeader, AnthropicMessagesController, ApiBody, ApiOperation, ApiProduces, ApiResponse, ApiSecurity, ApiTags (+6 more)

### Community 66 - "metrics.ts"
Cohesion: 0.08
Nodes (38): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+30 more)

### Community 67 - "provider-instances.bootstrap.ts"
Cohesion: 0.27
Nodes (10): GatewayProviderInstanceConfig, assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryFn (+2 more)

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (18): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+10 more)

### Community 69 - "auth.module.ts"
Cohesion: 0.06
Nodes (46): AcceptInviteUseCase, Injectable, AuthTokenResult, BootstrapAdminUseCase, Inject, Injectable, BootstrapStatusUseCase, Injectable (+38 more)

### Community 70 - "company-context.mapper.ts"
Cohesion: 0.16
Nodes (11): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+3 more)

### Community 71 - "runs.controller.ts"
Cohesion: 0.03
Nodes (66): CancelRunUseCase, Inject, Injectable, FinalizeReviewUseCase, Inject, Injectable, GetRunLogsOutput, GetRunLogsUseCase (+58 more)

### Community 72 - "openai-params-provider.mapper.ts"
Cohesion: 0.22
Nodes (12): mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses(), mapStopSequences(), OpenAiSharedChatCompletionParams, OpenAiSharedResponsesParams (+4 more)

### Community 73 - "patch-company-context.use-case.ts"
Cohesion: 0.27
Nodes (8): toPublicCompanyContext(), PatchCompanyContextUseCase, Inject, Injectable, assertCompanyContextWritable(), PartialCompanyContext, isComplete(), mergeCompanyContext()

### Community 74 - "RedisConnectionService"
Cohesion: 0.27
Nodes (3): RedisConnectionService, Injectable, isRedisRequiredFromConfig()

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "UserRepository"
Cohesion: 0.09
Nodes (14): Inject, Inject, Inject, Inject, AuthUser, CreateAdminIfNoneData, CreateAdminIfNoneResult, UserForAuth (+6 more)

### Community 77 - "SmartRateLimiterService"
Cohesion: 0.20
Nodes (6): OpenAiChatCompletionsController, ApiSecurity, ApiTags, Controller, SmartRateLimiterService, Injectable

### Community 78 - "CompanyContextRepository"
Cohesion: 0.21
Nodes (11): GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PutCompanyContextUseCase, Inject (+3 more)

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.06
Nodes (39): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), GatewayChatResponse (+31 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - "api-error.code.ts"
Cohesion: 0.10
Nodes (24): clamp(), isOverrideKey(), resolveProviderCallOptions(), OVERRIDE_KEYS, OverrideKey, ApiErrorCode, DEFAULT_HTTP_STATUS_TO_CODE, UnsupportedProviderException (+16 more)

### Community 82 - "ChatParamsDto"
Cohesion: 0.20
Nodes (10): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+2 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 85 - "api/src/app.module.ts"
Cohesion: 0.06
Nodes (54): CompanyContextModule, Module, ContentPipelineFacade, toOutcome(), Injectable, ContentRunExecutor, isCanonicalOutlineSelection(), isMissingContentKind() (+46 more)

### Community 86 - "VectorStore"
Cohesion: 0.22
Nodes (3): VectorStore, Inject, Optional

### Community 87 - "gateway-config.schema.ts"
Cohesion: 0.09
Nodes (44): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema, convertClient() (+36 more)

### Community 88 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 89 - "readClientGatewayKey.ts"
Cohesion: 0.33
Nodes (4): StreamCleanupInterceptor, Injectable, readClientGatewayKey(), readGatewayKeyHeader()

### Community 90 - "InMemoryRunSseHub"
Cohesion: 0.29
Nodes (4): RunSseEvent, InMemoryRunSseHub, Inject, Injectable

### Community 91 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 92 - "public.decorator.ts"
Cohesion: 0.38
Nodes (3): IS_PUBLIC_KEY, JwtAuthGuard, Injectable

### Community 93 - "provider-error.mapper.ts"
Cohesion: 0.15
Nodes (23): ChatErrorHandlerService, Injectable, ApiErrorPayload, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isProviderRateLimitError() (+15 more)

### Community 94 - "ClientEditCommand"
Cohesion: 0.18
Nodes (6): ClientEditCommand, Command, Option, ClientRemoveCommand, Command, Option

### Community 95 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 96 - "anthropic-messages.controller.ts"
Cohesion: 0.05
Nodes (44): GATEWAY_CACHE_HEADER, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags, Body (+36 more)

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 98 - "cli.module.ts"
Cohesion: 0.06
Nodes (39): CliModule, Module, KeyGenerateCommand, Command, Option, WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep (+31 more)

### Community 99 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 100 - "ClientListCommand"
Cohesion: 0.40
Nodes (3): ClientListCommand, Command, Option

### Community 101 - "create-feedback.use-case.ts"
Cohesion: 0.06
Nodes (35): CreateFeedbackUseCase, Inject, Injectable, agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_RUN_READER, FeedbackRunLookup (+27 more)

### Community 102 - "ConfigSecretsStatusCommand"
Cohesion: 0.40
Nodes (3): ConfigSecretsStatusCommand, Command, Option

### Community 103 - "ProviderAddCommand"
Cohesion: 0.10
Nodes (9): ProviderAddCommand, Command, Option, ProviderEditCommand, Command, Option, ProviderRemoveCommand, Command (+1 more)

### Community 104 - "CompanyContext"
Cohesion: 0.23
Nodes (6): CompanyContext, emptyCompanyContext(), jsonArray(), jsonRecord(), PrismaCompanyContextAdapter, Injectable

### Community 105 - "ConfigShowCommand"
Cohesion: 0.40
Nodes (3): ConfigShowCommand, Command, Option

### Community 106 - "ModelListCommand"
Cohesion: 0.40
Nodes (3): ModelListCommand, Command, Option

### Community 107 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 108 - "ProviderListCommand"
Cohesion: 0.40
Nodes (3): ProviderListCommand, Command, Option

### Community 109 - "ApiRequestIdHeader"
Cohesion: 0.17
Nodes (11): ApiRequestIdHeader(), HealthLivenessResponseDto, ApiProperty, HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller (+3 more)

### Community 110 - "chat.service.ts"
Cohesion: 0.06
Nodes (58): SemanticStoreEmbedState, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize (+50 more)

### Community 111 - "semantic-cache.service.ts"
Cohesion: 0.11
Nodes (24): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Inject, Injectable, isSingleTurnUserRequest(), lastUserMessageText() (+16 more)

### Community 112 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 113 - "OpenAiChatMessageDto"
Cohesion: 0.22
Nodes (9): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+1 more)

### Community 114 - "cn"
Cohesion: 0.07
Nodes (37): AppHeaderProps, AppSidebar(), AppSidebarProps, APP_NAV, AppNavItem, navItemsForRole(), CardAction(), CardDescription() (+29 more)

### Community 115 - "openai-chat-message.dto.ts"
Cohesion: 0.60
Nodes (3): isTextContentItem(), normalizeOpenAiContent(), TextContentItem

### Community 117 - "domain/company-context.types.ts"
Cohesion: 0.18
Nodes (18): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CompanyContextWriteDetail (+10 more)

### Community 118 - "PrismaRefreshSessionAdapter"
Cohesion: 0.31
Nodes (4): RefreshSessionRecord, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable

### Community 119 - "CompanyContextController"
Cohesion: 0.22
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 120 - "GlobalExceptionFilter"
Cohesion: 0.38
Nodes (3): GlobalExceptionFilter, Catch, Injectable

### Community 121 - ".getMetrics"
Cohesion: 0.40
Nodes (4): ApiOperation, ApiResponse, Get, Header

### Community 123 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.13
Nodes (14): IntegrationsModule, Module, LoggingModule, Global, Module, ProviderRegistryModule, Global, Module (+6 more)

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

## Knowledge Gaps
- **381 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+376 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1103 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ModelAlias` connect `ModelAlias` to `asProviderInstanceId`, `metrics.ts`, `branded.types.ts`, `chat.service.ts`, `semantic-cache.service.ts`, `model-manager.service.ts`, `api-error.code.ts`, `types/index.ts`, `provider-registry.service.ts`, `gateway-config.schema.ts`, `models.controller.ts`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `ModelAlias` to `asProviderInstanceId`, `metrics.ts`, `exitWithAgentReport`, `logging.module.ts`, `branded.types.ts`, `chat.service.ts`, `model-manager.service.ts`, `types/index.ts`, `provider-registry.service.ts`, `configuration.ts`, `gateway-config.schema.ts`, `GatewayConfig`, `LoggingService`, `models.controller.ts`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Why does `LoggingService` connect `LoggingService` to `ModelAlias`, `logging.module.ts`, `anthropic/anthropic-tools.mapper.ts`, `branded.types.ts`, `redis-vector-store.adapter.ts`, `google-tools.mapper.ts`, `HealthService`, `swagger.setup.ts`, `getAppConfig`, `provider-registry.service.ts`, `chat-completions.adapter.ts`, `responses.adapter.ts`, `cache.module.ts`, `provider-instances.bootstrap.ts`, `RedisConnectionService`, `SmartRateLimiterService`, `api-error.code.ts`, `VectorStore`, `provider-error.mapper.ts`, `chat.service.ts`, `semantic-cache.service.ts`, `GlobalExceptionFilter`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _381 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `prisma-invitation.adapter.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10810810810810811 - nodes in this community are weakly interconnected._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0454351232018231 - nodes in this community are weakly interconnected._