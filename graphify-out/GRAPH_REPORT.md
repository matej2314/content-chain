# Graph Report - content-chain  (2026-09-28)

## Corpus Check
- 638 files · ~189,287 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .css 1)

## Summary
- 4126 nodes · 12685 edges · 136 communities (120 shown, 15 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 394 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6a8837cb`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- prisma-invitation.adapter.ts
- social.types.ts
- api/company-context.types.ts
- .info
- runs.types.ts
- run-details-view.tsx
- ModelAlias
- LogContext
- anthropic/anthropic-tools.mapper.ts
- server-prompt.service.ts
- chat-completions.adapter.ts
- UserRepository
- social.graph.ts
- ai-provider.interface.ts
- RunRecord
- GatewayModelsCatalogService
- anthropic-response.mapper.ts
- redis-vector-store.adapter.ts
- AuthUserContext
- asProviderInstanceId
- sentry-ai-metrics.adapter.ts
- branded.types.ts
- google-tools.mapper.ts
- GatewayKey
- auth.controller.ts
- openai-params-provider.mapper.ts
- app-metrics.service.ts
- AppMetricsService
- save-output-edited.use-case.ts
- configure-swagger.ts
- chat.service.ts
- ai-provider-gateway/src/health/health.service.ts
- swagger.setup.ts
- create-openai-provider.core.ts
- AnthropicMessagesRequestDto
- runs-result.types.ts
- config-generator.service.ts
- enums.ts
- feedback.api.ts
- AuthController
- HttpExceptionFilter
- PrismaRunAdapter
- openai-models.controller.ts
- ids.ts
- app-metrics.module.ts
- PrismaService
- chat-stream.controller.ts
- anthropic-models.controller.ts
- api-error.code.ts
- ChatParamsDto
- ListRunsQueryDto
- cli.module.ts
- resilient-executor.ts
- semantic-cache.service.ts
- isRecord
- CompanyContext
- content.graph.ts
- result-edit-payload.ts
- semantic-cache.constants.ts
- HealthController
- InvitationsController
- company-context.dto.ts
- ai-provider-gateway/src/app.module.ts
- response-cache.service.ts
- provider-manager.service.ts
- auth.module.ts
- chat-provider-call.service.ts
- ModelRemoveCommand
- OpenAiChatCompletionRequestDto
- run-lifecycle.module.ts
- company-context.mapper.ts
- configuration-validation.service.ts
- ClientAddCommand
- ClientRemoveCommand
- ConfigInitCommand
- parse-verifier-log-message.ts
- auth-user.types.ts
- openai-stream.mapper.ts
- company-context.controller.ts
- llm-gateway.http.adapter.ts
- PrometheusService
- responses.adapter.ts
- event-source-registry-provider.tsx
- SPEC — README
- openai-messages-provider.mapper.ts
- api/src/app.module.ts
- PrismaSocialResultAdapter
- model-manager.service.ts
- DomainException
- apiFetch
- start-run.use-case.ts
- StartRunDto
- public.decorator.ts
- provider-error.mapper.ts
- ChatToolingDto
- RunRepository
- openai-messages.mapper.ts
- route.ts
- KeyGenerateCommand
- ProviderAddCommand
- ModelAddCommand
- create-feedback.use-case.ts
- AppMetricsBackend
- ProviderEditCommand
- RefreshSessionRepository
- ChatWarningDto
- ProviderRemoveCommand
- ModelEditCommand
- EnvironmentVariables
- GlobalExceptionFilter
- LoggingService
- BootstrapAdminDto
- patch-company-context.use-case.ts
- VectorStore
- cn
- HitlDto
- PatchRunRatingDto
- domain/company-context.types.ts
- ParseRunIdPipe
- CompanyContextController
- llm-hop.ts
- ClientEditCommand
- RunsModule
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

## Communities (136 total, 15 thin omitted)

### Community 0 - "prisma-invitation.adapter.ts"
Cohesion: 0.17
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 1 - "social.types.ts"
Cohesion: 0.07
Nodes (33): CompositeRunResultReader, GetRunOutput, RunResultReader, SocialBrief, EmptyRunResultReader, Injectable, toOutcome(), ideasOutputSchema (+25 more)

### Community 2 - "api/company-context.types.ts"
Cohesion: 0.06
Nodes (68): metadata, fetchCompanyContext(), fetchCompleteness(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras (+60 more)

### Community 3 - ".info"
Cohesion: 0.15
Nodes (9): toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList(), ProviderTestCommand, Command, Option, ProviderTestService (+1 more)

### Community 4 - "runs.types.ts"
Cohesion: 0.04
Nodes (74): metadata, assertNever(), notifyProduct(), notifyRunTerminal(), EnvelopeRef, ProductToast, RunTerminalInput, RunTerminalOutcome (+66 more)

### Community 5 - "run-details-view.tsx"
Cohesion: 0.07
Nodes (49): metadata, metadata, FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, FALLBACK, FeedbackFormProps, CONTENT_KIND_LABELS, LANGUAGE_LABELS (+41 more)

### Community 6 - "ModelAlias"
Cohesion: 0.07
Nodes (9): ProviderTestOptions, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, PrometheusAppMetricsAdapter, Injectable, AppProviderCallContext (+1 more)

### Community 7 - "LogContext"
Cohesion: 0.07
Nodes (22): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+14 more)

### Community 8 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.09
Nodes (40): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent() (+32 more)

### Community 9 - "server-prompt.service.ts"
Cohesion: 0.09
Nodes (22): WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, InitAnswers, WizardState, ClientPromptService, Injectable, KeyPromptService (+14 more)

### Community 10 - "chat-completions.adapter.ts"
Cohesion: 0.22
Nodes (17): asSystemFingerprint(), ChatCompletionsAdapterOptions, createChatCompletionsAdapter(), textStream(), accumulateOpenAiStreamToolCallDeltas(), extractOpenAiStreamDeltaText(), finalizeOpenAiStreamToolCalls(), OpenAiStreamToolCallAccumulator (+9 more)

### Community 11 - "UserRepository"
Cohesion: 0.09
Nodes (15): BootstrapStatusUseCase, Inject, Injectable, Inject, Inject, AuthUser, CreateAdminIfNoneData, CreateAdminIfNoneResult (+7 more)

### Community 12 - "social.graph.ts"
Cohesion: 0.12
Nodes (25): loadPromptFromDir(), coercePassNoteVerdict(), isPassOnlyIssue(), canRefine(), MAX_REFINE, nextRefineCount(), createContentWriterNode(), filterBySelection() (+17 more)

### Community 13 - "ai-provider.interface.ts"
Cohesion: 0.11
Nodes (37): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatCacheSource, ChatResponseData, toChatResponseDto(), SseMetaPayload, SseMetaPayloadDto (+29 more)

### Community 14 - "RunRecord"
Cohesion: 0.08
Nodes (18): InProcessRunWorker, Inject, Injectable, RecoverInterruptedRunsUseCase, Inject, Injectable, Inject, RunAbortRegistry (+10 more)

### Community 15 - "GatewayModelsCatalogService"
Cohesion: 0.11
Nodes (19): ApiGatewayModelsErrorResponses(), ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+11 more)

### Community 16 - "anthropic-response.mapper.ts"
Cohesion: 0.10
Nodes (31): ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString, SseDoneEvent, asMessageId() (+23 more)

### Community 17 - "redis-vector-store.adapter.ts"
Cohesion: 0.15
Nodes (19): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), asString(), ParsedKnnHits, parseKnnHits() (+11 more)

### Community 18 - "AuthUserContext"
Cohesion: 0.09
Nodes (22): isRecord(), ListRunsUserItem, ListRunsUserOutput, isTerminalStatus(), RunsController, ApiCookieAuth, ApiTags, Body (+14 more)

### Community 19 - "asProviderInstanceId"
Cohesion: 0.07
Nodes (24): assertInteractiveAllowed(), convertModel(), ClientManagerService, Injectable, ConfigPersistenceService, Injectable, EnvPatchService, Injectable (+16 more)

### Community 20 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.10
Nodes (28): CostUsd, ToolCallId, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext() (+20 more)

### Community 21 - "branded.types.ts"
Cohesion: 0.05
Nodes (85): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema, convertClient() (+77 more)

### Community 22 - "google-tools.mapper.ts"
Cohesion: 0.16
Nodes (23): asOutputTokens(), buildGenerationConfig(), createGoogleProvider(), getFinalToolCalls(), getStopReason(), getUsageMetadata(), textStream(), mapStopSequences() (+15 more)

### Community 23 - "GatewayKey"
Cohesion: 0.05
Nodes (50): ApiHeader, GATEWAY_CACHE_HEADER, toChatResponseDtoFromCache(), ApiOpenAiErrorResponses(), StreamCleanupInterceptor, Injectable, readClientGatewayKey(), readGatewayKeyHeader() (+42 more)

### Community 24 - "auth.controller.ts"
Cohesion: 0.09
Nodes (32): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Injectable, comparePassword(), generateRefreshToken(), hashPassword(), hashRefreshToken() (+24 more)

### Community 25 - "openai-params-provider.mapper.ts"
Cohesion: 0.12
Nodes (24): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+16 more)

### Community 26 - "app-metrics.service.ts"
Cohesion: 0.20
Nodes (13): healthStatusToGaugeValue(), AppProviderStreamScope, AppRequestLabels, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus (+5 more)

### Community 27 - "AppMetricsService"
Cohesion: 0.11
Nodes (4): HttpMetricsMiddleware, Injectable, AppMetricsService, Injectable

### Community 28 - "save-output-edited.use-case.ts"
Cohesion: 0.09
Nodes (33): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+25 more)

### Community 29 - "configure-swagger.ts"
Cohesion: 0.24
Nodes (8): AppModule, Module, bootstrap(), parseCorsOrigins(), configureHttpApp(), ACCESS_COOKIE_NAME, buildSwaggerConfig(), COOKIE_AUTH_NAME

### Community 30 - "chat.service.ts"
Cohesion: 0.06
Nodes (52): SemanticStoreEmbedState, CacheIdentityMessage, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray (+44 more)

### Community 31 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.08
Nodes (24): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthLivenessResponseDto, ApiProperty, HealthReadinessChecksDto, HealthReadinessResponseDto, ApiProperty (+16 more)

### Community 32 - "swagger.setup.ts"
Cohesion: 0.09
Nodes (23): AppModule, Module, ChatOutputTextDto, ApiProperty, ChatUsageDto, ApiPropertyOptional, SseDeltaPayloadDto, ApiProperty (+15 more)

### Community 33 - "create-openai-provider.core.ts"
Cohesion: 0.23
Nodes (7): assertOpenAiProviderType(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), AIProvider, openAiCompatibleApiSurface, OpenAiProviderConfig, RegisteredProviderInstance

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "runs-result.types.ts"
Cohesion: 0.06
Nodes (52): PAGE_OUTLINE_ROLE_LABELS, submitHitl(), isPageOutlineSectionRole(), isReelDuration(), PAGE_OUTLINE_SECTION_ROLES, PageDocument, PageOutline, PageOutlineSection (+44 more)

### Community 36 - "config-generator.service.ts"
Cohesion: 0.14
Nodes (13): isRedisRequired(), ConfigGeneratorService, Injectable, FileManagerService, Injectable, WizardRunResult, ClientCli, EnvTemplateInput (+5 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "feedback.api.ts"
Cohesion: 0.31
Nodes (9): createFeedback(), CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody(), parseFeedbackCreated(), FeedbackForm(), onSubmit() (+1 more)

### Community 39 - "AuthController"
Cohesion: 0.10
Nodes (23): AuthController, ApiCookieAuth, ApiTags, Body, Controller, Get, HttpCode, Patch (+15 more)

### Community 40 - "HttpExceptionFilter"
Cohesion: 0.20
Nodes (6): ErrorEnvelope, HttpExceptionFilter, Catch, newRequestId(), RequestIdMiddleware, Injectable

### Community 41 - "PrismaRunAdapter"
Cohesion: 0.09
Nodes (9): LightRunItem, ListRunsResult, RunSnapshot, RunLogEntry, assertTransition(), PrismaRunAdapter, toPipelinePhase(), toSelectedIdeaIds() (+1 more)

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.13
Nodes (19): OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+11 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (28): brand, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createInvitationId(), createRequestId() (+20 more)

### Community 44 - "app-metrics.module.ts"
Cohesion: 0.06
Nodes (27): Inject, Optional, AiMetricsModule, Global, Module, AppMetricsModule, resolveAppMetricsBackend(), Global (+19 more)

### Community 45 - "PrismaService"
Cohesion: 0.11
Nodes (9): RefreshSessionRecord, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable, PrismaModule, Global, Module, PrismaService (+1 more)

### Community 46 - "chat-stream.controller.ts"
Cohesion: 0.06
Nodes (33): ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags, Body, Controller (+25 more)

### Community 47 - "anthropic-models.controller.ts"
Cohesion: 0.13
Nodes (20): ApiAnthropicErrorResponses(), AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+12 more)

### Community 48 - "api-error.code.ts"
Cohesion: 0.08
Nodes (29): ChatModule, Module, ApiErrorCode, DEFAULT_HTTP_STATUS_TO_CODE, ApiErrorPayload, PayloadTooLargeError, RequestWithId, getAppConfig() (+21 more)

### Community 49 - "ChatParamsDto"
Cohesion: 0.12
Nodes (17): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+9 more)

### Community 50 - "ListRunsQueryDto"
Cohesion: 0.13
Nodes (11): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+3 more)

### Community 51 - "cli.module.ts"
Cohesion: 0.06
Nodes (61): AgentReport, AgentReportStatus, emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), loadAnswers(), assertAgentHasAnswers(), CliMode (+53 more)

### Community 52 - "resilient-executor.ts"
Cohesion: 0.17
Nodes (18): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+10 more)

### Community 53 - "semantic-cache.service.ts"
Cohesion: 0.13
Nodes (18): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, isSingleTurnUserRequest(), lastUserMessageText(), embeddingProbeTimeoutMs() (+10 more)

### Community 54 - "isRecord"
Cohesion: 0.11
Nodes (30): metadata, parseReviewFields(), parseArchiveRunItem(), parseArchiveRunsPage(), parseRunCore(), parseRunSnapshot(), parseStartedBy(), parseUserRunItem() (+22 more)

### Community 55 - "CompanyContext"
Cohesion: 0.29
Nodes (5): CompanyContext, jsonArray(), jsonRecord(), PrismaCompanyContextAdapter, Injectable

### Community 56 - "content.graph.ts"
Cohesion: 0.08
Nodes (44): coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema, pageOutlineSectionSchema, readNonEmptyString() (+36 more)

### Community 57 - "result-edit-payload.ts"
Cohesion: 0.14
Nodes (18): buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload() (+10 more)

### Community 58 - "semantic-cache.constants.ts"
Cohesion: 0.14
Nodes (11): EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema(), EMBEDDING_CIRCUIT_COOLDOWN_MS, EMBEDDING_CIRCUIT_OPEN_AFTER, EMBEDDING_PROBE_TIMEOUT_MS (+3 more)

### Community 59 - "HealthController"
Cohesion: 0.16
Nodes (11): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, HealthModule, Module (+3 more)

### Community 60 - "InvitationsController"
Cohesion: 0.12
Nodes (13): InviteUserDto, ApiProperty, IsEmail, InvitationsController, ApiCookieAuth, ApiTags, Body, Controller (+5 more)

### Community 61 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 62 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.08
Nodes (25): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis() (+17 more)

### Community 63 - "response-cache.service.ts"
Cohesion: 0.10
Nodes (18): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+10 more)

### Community 64 - "provider-manager.service.ts"
Cohesion: 0.08
Nodes (49): PendingSecretsItem, collectPendingSecrets(), DEFAULT_MODELS, CliAiModel, CliAiProvider, GatewayClient, EnvPatchValue, ModelPromptResult (+41 more)

### Community 65 - "auth.module.ts"
Cohesion: 0.07
Nodes (39): Inject, InviteUserResult, inviteUserSchema, InviteUserUseCase, Inject, Injectable, InvitationListItem, ListInvitationsUseCase (+31 more)

### Community 66 - "chat-provider-call.service.ts"
Cohesion: 0.06
Nodes (48): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+40 more)

### Community 67 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.07
Nodes (31): IsStringOrArrayOfStrings(), OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray (+23 more)

### Community 69 - "run-lifecycle.module.ts"
Cohesion: 0.17
Nodes (7): TransitionExtras, RUN_SSE_HUB, RunSseEvent, RunSseHub, InMemoryRunSseHub, Inject, Injectable

### Community 70 - "company-context.mapper.ts"
Cohesion: 0.15
Nodes (11): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+3 more)

### Community 71 - "configuration-validation.service.ts"
Cohesion: 0.12
Nodes (22): CliValidateOptions, collectInactiveProviderWarnings(), formatZodIssues(), validateGatewayConfig(), ValidationOptions, ValidationResult, buildEffectiveGatewayConfig(), assertEnabledProviderSecretsPresent() (+14 more)

### Community 72 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 73 - "ClientRemoveCommand"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

### Community 74 - "ConfigInitCommand"
Cohesion: 0.14
Nodes (8): ConfigInitCommand, Command, Option, ConfigValidateCommand, Command, Option, CliGatewayValidatorService, Injectable

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "auth-user.types.ts"
Cohesion: 0.06
Nodes (31): BootstrapAdminInput, bootstrapAdminSchema, LoginInput, loginSchema, PatchUserCommand, patchUserSchema, ListUsersUseCase, Inject (+23 more)

### Community 77 - "openai-stream.mapper.ts"
Cohesion: 0.18
Nodes (20): fromGatewayToolCallDto(), OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty (+12 more)

### Community 78 - "company-context.controller.ts"
Cohesion: 0.16
Nodes (13): GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PatchCompanyContextUseCase, Inject (+5 more)

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.06
Nodes (40): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), LlmGatewayError (+32 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - "responses.adapter.ts"
Cohesion: 0.23
Nodes (18): toCachedChatResponse(), toHttpException(), asInputTokens(), asToolCallId(), buildResponsesCreateParams(), createResponsesAdapter(), textStream(), mapGatewayMetadataToOpenAi() (+10 more)

### Community 82 - "event-source-registry-provider.tsx"
Cohesion: 0.43
Nodes (5): EventSourceRegistryContext, EventSourceRegistryProvider(), createEventSourceRegistry(), EventSourceRegistry, RegistryEntry

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "openai-messages-provider.mapper.ts"
Cohesion: 0.25
Nodes (8): ProviderAssistantTurn, ProviderChatTurn, ProviderToolResultTurn, ChatCompletionMessageParam, mapAssistantTurn(), mapTurnsToOpenAiMessages(), mapAssistantTurnToResponsesInput(), mapTurnsToResponsesInput()

### Community 85 - "api/src/app.module.ts"
Cohesion: 0.07
Nodes (46): CompanyContextModule, Module, CompanyContextRepository, ContentPipelineFacade, toOutcome(), Inject, Injectable, ContentRunExecutor (+38 more)

### Community 86 - "PrismaSocialResultAdapter"
Cohesion: 0.09
Nodes (10): Inject, OutputEditedWrite, OutputEditedWriter, applyWrite(), PrismaOutputEditedAdapter, Injectable, toInputJson(), PipelineState (+2 more)

### Community 87 - "model-manager.service.ts"
Cohesion: 0.13
Nodes (19): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, normalizeGatewayConfigForWrite(), ModelEditField, buildDefaultModelCapabilities(), buildDefaultModelPolicy() (+11 more)

### Community 88 - "DomainException"
Cohesion: 0.09
Nodes (37): FinalizeReviewUseCase, Injectable, GetRunLogsOutput, GetRunLogsUseCase, Injectable, GetRunUseCase, orderItemsBySelectedIds(), Injectable (+29 more)

### Community 89 - "apiFetch"
Cohesion: 0.07
Nodes (46): metadata, geistMono, geistSans, metadata, acceptInvite(), bootstrapAdmin(), Credentials, fetchBootstrapStatus() (+38 more)

### Community 90 - "start-run.use-case.ts"
Cohesion: 0.09
Nodes (26): contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, socialBriefSchema (+18 more)

### Community 91 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 92 - "public.decorator.ts"
Cohesion: 0.38
Nodes (3): IS_PUBLIC_KEY, JwtAuthGuard, Injectable

### Community 93 - "provider-error.mapper.ts"
Cohesion: 0.21
Nodes (19): MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isRateLimitStatus(), isServerError(), isTimeoutStatus(), nameLooksLikeTimeout() (+11 more)

### Community 94 - "ChatToolingDto"
Cohesion: 0.16
Nodes (15): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+7 more)

### Community 95 - "RunRepository"
Cohesion: 0.08
Nodes (8): Inject, Inject, Inject, Inject, Inject, Inject, Inject, RunRepository

### Community 96 - "openai-messages.mapper.ts"
Cohesion: 0.42
Nodes (6): mapOpenAiMessagesToGateway(), mapOpenAiToolCalls(), mapOpenAiChatRequestToGateway(), mapOpenAiToolChoice(), mapOpenAiToolsToGateway(), OpenAiFunctionTool

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 98 - "KeyGenerateCommand"
Cohesion: 0.39
Nodes (3): KeyGenerateCommand, Command, Option

### Community 99 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 100 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 101 - "create-feedback.use-case.ts"
Cohesion: 0.07
Nodes (32): CreateFeedbackUseCase, Inject, Injectable, agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_RUN_READER, FeedbackRunLookup (+24 more)

### Community 103 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 104 - "RefreshSessionRepository"
Cohesion: 0.12
Nodes (6): Inject, Inject, Inject, Inject, Inject, RefreshSessionRepository

### Community 105 - "ChatWarningDto"
Cohesion: 0.24
Nodes (9): ChatWarningDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString, SseDonePayloadDto, SseDoneUsageDto, ApiPropertyOptional (+1 more)

### Community 106 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 107 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 108 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 109 - "GlobalExceptionFilter"
Cohesion: 0.32
Nodes (4): GlobalExceptionFilter, isPayloadTooLargeError(), Catch, Injectable

### Community 110 - "LoggingService"
Cohesion: 0.06
Nodes (21): RedisConnectionService, Injectable, Inject, OllamaEmbeddingAdapter, Injectable, EmbeddingBackend, Inject, isRedisRequiredFromConfig() (+13 more)

### Community 111 - "BootstrapAdminDto"
Cohesion: 0.33
Nodes (5): BootstrapAdminDto, ApiProperty, IsEmail, IsString, MinLength

### Community 112 - "patch-company-context.use-case.ts"
Cohesion: 0.44
Nodes (5): toPublicCompanyContext(), assertCompanyContextWritable(), PartialCompanyContext, isComplete(), mergeCompanyContext()

### Community 114 - "cn"
Cohesion: 0.04
Nodes (62): logoutSession(), FeedbackCta(), FloatingRunsBox(), handleChevronClick(), toggleCollapsed(), StartAgentDialog(), EMPTY_START_DRAFT, StartRunDraft (+54 more)

### Community 115 - "HitlDto"
Cohesion: 0.50
Nodes (3): HitlDto, IsArray, IsString

### Community 116 - "PatchRunRatingDto"
Cohesion: 0.50
Nodes (3): PatchRunRatingDto, IsIn, ValidateIf

### Community 117 - "domain/company-context.types.ts"
Cohesion: 0.18
Nodes (18): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CompanyContextWriteDetail (+10 more)

### Community 119 - "CompanyContextController"
Cohesion: 0.22
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 120 - "llm-hop.ts"
Cohesion: 0.21
Nodes (12): LLM_GATEWAY_PORT, isRetryable(), RetryReason, ChatJsonInput, hopErrorLogMessage(), hopUserContent(), isHopRetryable(), isStructuredOutputInvalid() (+4 more)

### Community 121 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

## Knowledge Gaps
- **375 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+370 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1093 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ModelAlias` connect `ModelAlias` to `provider-manager.service.ts`, `chat-provider-call.service.ts`, `config-generator.service.ts`, `AppMetricsBackend`, `ai-provider.interface.ts`, `GatewayModelsCatalogService`, `redis-vector-store.adapter.ts`, `asProviderInstanceId`, `resilient-executor.ts`, `branded.types.ts`, `sentry-ai-metrics.adapter.ts`, `app-metrics.service.ts`, `AppMetricsService`, `chat.service.ts`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `ModelAlias` to `provider-manager.service.ts`, `create-openai-provider.core.ts`, `chat-provider-call.service.ts`, `.info`, `config-generator.service.ts`, `AppMetricsBackend`, `configuration-validation.service.ts`, `LogContext`, `ai-provider.interface.ts`, `LoggingService`, `GatewayModelsCatalogService`, `cli.module.ts`, `asProviderInstanceId`, `branded.types.ts`, `sentry-ai-metrics.adapter.ts`, `GatewayKey`, `app-metrics.service.ts`, `AppMetricsService`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Why does `LoggingService` connect `LoggingService` to `LogContext`, `anthropic/anthropic-tools.mapper.ts`, `chat-completions.adapter.ts`, `redis-vector-store.adapter.ts`, `google-tools.mapper.ts`, `GatewayKey`, `chat.service.ts`, `ai-provider-gateway/src/health/health.service.ts`, `swagger.setup.ts`, `create-openai-provider.core.ts`, `app-metrics.module.ts`, `api-error.code.ts`, `resilient-executor.ts`, `semantic-cache.service.ts`, `ai-provider-gateway/src/app.module.ts`, `response-cache.service.ts`, `provider-manager.service.ts`, `chat-provider-call.service.ts`, `responses.adapter.ts`, `GlobalExceptionFilter`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _375 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06544566544566545 - nodes in this community are weakly interconnected._
- **Should `api/company-context.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05540499849442939 - nodes in this community are weakly interconnected._