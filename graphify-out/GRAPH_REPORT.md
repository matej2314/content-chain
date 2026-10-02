# Graph Report - content-chain  (2026-10-02)

## Corpus Check
- 660 files · ~205,654 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .css 1)

## Summary
- 4277 nodes · 13213 edges · 128 communities (115 shown, 12 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 404 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `efda99f8`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- AuthUserContext
- get-run.use-case.ts
- api/company-context.types.ts
- cli.module.ts
- dashboard-shell.tsx
- run-details-view.tsx
- register-user.use-case.ts
- logging.service.ts
- anthropic/anthropic-tools.mapper.ts
- exitWithAgentReport
- RunRepository
- config-generator.service.ts
- social.graph.ts
- branded.types.ts
- run-review-panel.tsx
- chat-params.dto.ts
- anthropic-response.mapper.ts
- redis-vector-store.adapter.ts
- ChatMessageDto
- isRecord
- sentry-ai-metrics.adapter.ts
- env.schema.ts
- start-run-form.tsx
- model-manager.service.ts
- ai-provider-gateway/src/app.module.ts
- metrics.ts
- provider-registry.service.ts
- chat.module.ts
- semantic-cache.service.ts
- openai-stream.mapper.ts
- UsersController
- getAppConfigOrThrow
- ai-provider-gateway/src/main.ts
- types/index.ts
- AnthropicMessagesRequestDto
- runs-result.types.ts
- runs.types.ts
- enums.ts
- feedback-form.tsx
- auth.module.ts
- api-error.code.ts
- run.types.ts
- openai-models.controller.ts
- ids.ts
- google-tools.mapper.ts
- LoggingService
- provider-instances.bootstrap.ts
- anthropic-models.controller.ts
- AnthropicMessagesController
- anthropic-stream.mapper.ts
- ListRunsQueryDto
- ModelAlias
- CompanyContext
- GatewayConfig
- apiFetch
- models.controller.ts
- content.graph.ts
- ChatResponseDto
- http-metrics.interceptor.ts
- chat-completions.adapter.ts
- .getOne
- company-context.dto.ts
- openai-chat-completion-response.dto.ts
- response-cache.service.ts
- wizard-orchestrator.service.ts
- LoginDto
- swagger.setup.ts
- configuration.ts
- OpenAiChatCompletionRequestDto
- company-context.mapper.ts
- DomainException
- .getOne
- UserRepository
- parse-verifier-log-message.ts
- OpenAiChatMessageDto
- openai-params-provider.mapper.ts
- company-context.controller.ts
- llm-hop.ts
- PrometheusService
- .getOne
- SPEC — README
- Env
- api/src/app.module.ts
- prisma-content-result.adapter.ts
- .getMetrics
- EnvironmentVariables
- health-readiness-response.dto.ts
- StartRunDto
- anthropic-messages.controller.ts
- provider-error.mapper.ts
- ClientEditCommand
- getAppConfig
- route.ts
- asProviderInstanceId
- ModelEditCommand
- save-output-edited.use-case.ts
- ProviderAddCommand
- openai-messages-provider.mapper.ts
- ClientAddCommand
- responses.adapter.ts
- GatewayKey
- ModelRemoveCommand
- KeyGenerateCommand
- cn
- ConfigInitCommand
- domain/company-context.types.ts
- prisma-invitation.adapter.ts
- CompanyContextController
- PrismaService
- patch-company-context.use-case.ts
- Architektura
- brand
- ChatParamsDto
- ai-provider-gateway/src/health/health.controller.ts
- GatewayModelsCatalogService
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
- openai-chat-message.dto.ts
- openai-chat-completion-request.dto.ts

## God Nodes (most connected - your core abstractions)
1. `ModelAlias` - 88 edges
2. `ProviderInstanceId` - 81 edges
3. `DomainException` - 76 edges
4. `LoggingService` - 73 edges
5. `asProviderInstanceId()` - 67 edges
6. `GatewayConfig` - 65 edges
7. `cn()` - 62 edges
8. `isRecord()` - 60 edges
9. `GatewayKey` - 59 edges
10. `ClientId` - 54 edges

## Surprising Connections (you probably didn't know these)
- `mapGatewayResponseToAnthropicFormat()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/anthropic/mappers/anthropic-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `optionalEnvRefSchema` --calls--> `asEnvRef()`  [EXTRACTED]
  apps/ai-provider-gateway/src/config/gateway-config.schema.ts → apps/ai-provider-gateway/src/common/types/branded.types.ts
- `DialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/dialog.tsx → apps/frontend/src/shared/utils/utils.ts
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `CacheRegistryService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/cache-registry.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (128 total, 12 thin omitted)

### Community 0 - "AuthUserContext"
Cohesion: 0.06
Nodes (40): Get, InviteUserDto, ApiProperty, IsEmail, PatchUserDto, ApiProperty, IsBoolean, InvitationsController (+32 more)

### Community 1 - "get-run.use-case.ts"
Cohesion: 0.05
Nodes (34): ContentPipelineInput, ContentRefineSnapshot, PageDocument, PageOutline, PageOutlineSection, PageOutlineSectionRole, CompositeRunResultReader, GetRunOutput (+26 more)

### Community 2 - "api/company-context.types.ts"
Cohesion: 0.06
Nodes (68): metadata, fetchCompanyContext(), fetchCompleteness(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras (+60 more)

### Community 3 - "cli.module.ts"
Cohesion: 0.06
Nodes (60): AgentReport, AgentReportStatus, PendingSecretsItem, loadAnswers(), assertAgentHasAnswers(), CliMode, CliModeFlags, markAgentRuntime() (+52 more)

### Community 4 - "dashboard-shell.tsx"
Cohesion: 0.10
Nodes (18): FeedbackCta(), AppHeader(), AppSidebar(), AppSidebarProps, CompletenessChipSlot(), FeedbackCtaSlot(), FloatingBoxSlot(), DashboardShell() (+10 more)

### Community 5 - "run-details-view.tsx"
Cohesion: 0.09
Nodes (34): metadata, metadata, CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS, RUN_TASK_TYPE_LABELS (+26 more)

### Community 6 - "register-user.use-case.ts"
Cohesion: 0.06
Nodes (33): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Injectable, hashPassword(), ActivateAccountInput, activateAccountSchema, BootstrapAdminInput (+25 more)

### Community 7 - "logging.service.ts"
Cohesion: 0.07
Nodes (22): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+14 more)

### Community 8 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.11
Nodes (35): ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent(), isAnthropicEffortLevel(), mapThinkingBudgetToAnthropicEffort(), mapThinkingToAnthropic(), resolveAnthropicOutputConfig(), ContentBlockParam (+27 more)

### Community 9 - "exitWithAgentReport"
Cohesion: 0.14
Nodes (13): emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), resolveCliMode(), toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList() (+5 more)

### Community 10 - "RunRepository"
Cohesion: 0.04
Nodes (30): Inject, InProcessRunWorker, Inject, Injectable, Inject, Inject, RecoverInterruptedRunsUseCase, Inject (+22 more)

### Community 11 - "config-generator.service.ts"
Cohesion: 0.10
Nodes (17): ConfigValidateCommand, Command, Option, CliGatewayValidatorService, Injectable, ConfigGeneratorService, Injectable, FileManagerService (+9 more)

### Community 12 - "social.graph.ts"
Cohesion: 0.13
Nodes (34): loadPromptFromDir(), renderPrompt(), coercePassNoteVerdict(), isPassOnlyIssue(), ideasOutputSchema, reelIdeasOutputSchema, isReelTaskType(), ReelTaskType (+26 more)

### Community 13 - "branded.types.ts"
Cohesion: 0.06
Nodes (76): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, SemanticStoreEmbedState, CachedChatResponse, CachedChatWarning, CachedFinishReason, CacheIdentityMessage (+68 more)

### Community 14 - "run-review-panel.tsx"
Cohesion: 0.08
Nodes (39): buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload() (+31 more)

### Community 15 - "chat-params.dto.ts"
Cohesion: 0.24
Nodes (7): ResponseFormatDto, ApiProperty, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsThinkingBudget()

### Community 16 - "anthropic-response.mapper.ts"
Cohesion: 0.19
Nodes (16): SseDoneEvent, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto, AnthropicTextContentBlockDto, AnthropicThinkingContentBlockDto, AnthropicToolUseContentBlockDto (+8 more)

### Community 17 - "redis-vector-store.adapter.ts"
Cohesion: 0.12
Nodes (21): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), asString(), ParsedKnnHits, parseKnnHits() (+13 more)

### Community 18 - "ChatMessageDto"
Cohesion: 0.09
Nodes (27): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+19 more)

### Community 19 - "isRecord"
Cohesion: 0.15
Nodes (23): metadata, createInvitation(), fetchInvitations(), resendInvitation(), revokeInvitation(), InvitationListItem, InviteCreated, isInvitationExpired() (+15 more)

### Community 20 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.09
Nodes (29): CostUsd, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes() (+21 more)

### Community 21 - "env.schema.ts"
Cohesion: 0.17
Nodes (11): AppModule, Module, bootstrap(), EnvModule, Global, Module, envSchema, parseCorsOrigins() (+3 more)

### Community 22 - "start-run-form.tsx"
Cohesion: 0.07
Nodes (44): metadata, assertNever(), notifyProduct(), notifyRunCancelled(), notifyRunTerminal(), EnvelopeRef, ProductToast, RunTerminalInput (+36 more)

### Community 23 - "model-manager.service.ts"
Cohesion: 0.09
Nodes (36): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, DEFAULT_MODELS, DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel() (+28 more)

### Community 24 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.06
Nodes (39): getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisConsumer, RedisRequirementSnapshot, resolveCacheForRequirement() (+31 more)

### Community 25 - "metrics.ts"
Cohesion: 0.18
Nodes (13): getClientConversationId(), getOrCreateConversationIdForResponse(), buildAppProviderMetricsContext(), buildLlmMetricsContext(), mapProviderResponseToUsage(), clamp(), isOverrideKey(), resolveProviderCallOptions() (+5 more)

### Community 26 - "provider-registry.service.ts"
Cohesion: 0.10
Nodes (30): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+22 more)

### Community 27 - "chat.module.ts"
Cohesion: 0.09
Nodes (16): ChatCachePipelineService, Injectable, Optional, ChatErrorHandlerService, Injectable, ChatProviderCallService, Injectable, ChatProviderCooldownService (+8 more)

### Community 28 - "semantic-cache.service.ts"
Cohesion: 0.08
Nodes (29): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName() (+21 more)

### Community 29 - "openai-stream.mapper.ts"
Cohesion: 0.31
Nodes (12): fromGatewayToolCallDto(), mapChatResponseToOpenAi(), mapFinishReasontoOpenAI(), mapGatewayToolCallsToOpenAi(), mapSystemFingerprintToOpenAi(), toOpenAiCompletionId(), baseChunkFields(), buildToolCallsDelta() (+4 more)

### Community 30 - "UsersController"
Cohesion: 0.11
Nodes (15): ListUsersUseCase, Inject, Injectable, SoftDeleteUserUseCase, Injectable, ApiCookieAuth, ApiTags, Body (+7 more)

### Community 31 - "getAppConfigOrThrow"
Cohesion: 0.12
Nodes (8): OllamaEmbeddingAdapter, Injectable, EmbeddingBackend, getAppConfigOrThrow(), HealthReadinessResponseDto, ApiProperty, HealthService, Injectable

### Community 32 - "ai-provider-gateway/src/main.ts"
Cohesion: 0.13
Nodes (15): AppModule, Module, bootstrap(), API_GLOBAL_PREFIX, PORT, setupApp(), exportOpenApi(), OPENAPI_OUTPUT_FILENAME (+7 more)

### Community 33 - "types/index.ts"
Cohesion: 0.18
Nodes (19): CONVERSATION_ID_PATTERN, createRequestId(), isAttemptNumber(), isBaseUrl(), isCacheTtlSeconds(), isConversationId(), isFiniteNumber(), isMaxAttempts() (+11 more)

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
Cohesion: 0.04
Nodes (54): comparePassword(), generateRefreshToken(), hashRefreshToken(), parseTtlMs(), parseTtlSeconds(), AuthTokenResult, BootstrapAdminUseCase, Inject (+46 more)

### Community 40 - "api-error.code.ts"
Cohesion: 0.08
Nodes (27): buildProviderInputForAlias(), composeSystemPrompt(), getResolvedSystemPrompts(), SYSTEM_PROMPT_SECTION_JOINER, CHAT_MESSAGE_LIMITS, INGRESS_LIMITS, validateChatIngress(), IsPrimitiveMetadataRecord() (+19 more)

### Community 41 - "run.types.ts"
Cohesion: 0.07
Nodes (19): LightRunItem, ListRunsResult, RunSnapshot, RunLogEntry, RunRecordBase, ALLOWED_RUN_STATES, assertTransition(), CANCELABLE_RUN_STATUSES (+11 more)

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.27
Nodes (10): ApiOpenAiErrorResponses(), OpenAiErrorBodyDto, OpenAiErrorResponseDto, ApiProperty, ApiPropertyOptional, OpenAiModelDto, OpenAiModelsListResponseDto, ApiProperty (+2 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (23): ACCOUNT_ACTIVATION_ID_RE, AccountActivationId, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createRunId() (+15 more)

### Community 44 - "google-tools.mapper.ts"
Cohesion: 0.17
Nodes (21): buildGenerationConfig(), createGoogleProvider(), getFinalToolCalls(), getStopReason(), textStream(), mapStopSequences(), mapThinkingBudgetToGeminiLevel(), extractFromLegacyFields() (+13 more)

### Community 45 - "LoggingService"
Cohesion: 0.07
Nodes (16): RedisConnectionService, Injectable, Inject, Inject, isRedisRequiredFromConfig(), isProviderRateLimitError(), GlobalExceptionFilter, isPayloadTooLargeError() (+8 more)

### Community 46 - "provider-instances.bootstrap.ts"
Cohesion: 0.27
Nodes (10): GatewayProviderInstanceConfig, assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryFn (+2 more)

### Community 47 - "anthropic-models.controller.ts"
Cohesion: 0.22
Nodes (12): ApiAnthropicErrorResponses(), AnthropicErrorBodyDto, AnthropicErrorResponseDto, ApiProperty, AnthropicModelDto, AnthropicModelsListResponseDto, ApiProperty, mapGatewayModelsListToAnthropic() (+4 more)

### Community 48 - "AnthropicMessagesController"
Cohesion: 0.18
Nodes (9): AnthropicMessagesController, ApiSecurity, ApiTags, Controller, AnthropicModelsController, ApiSecurity, ApiTags, Controller (+1 more)

### Community 49 - "anthropic-stream.mapper.ts"
Cohesion: 0.36
Nodes (9): asMessageId(), MessageId, AnthropicStreamState, createAnthropicStreamState(), emitThinkingBlock(), eventLine(), mapSseEventToAnthropic(), nextToolBlockIndex() (+1 more)

### Community 50 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+2 more)

### Community 51 - "ModelAlias"
Cohesion: 0.04
Nodes (35): ProviderTestOptions, HttpMetricsMiddleware, Injectable, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, healthStatusToGaugeValue() (+27 more)

### Community 52 - "CompanyContext"
Cohesion: 0.26
Nodes (5): CompanyContext, jsonArray(), jsonRecord(), PrismaCompanyContextAdapter, Injectable

### Community 53 - "GatewayConfig"
Cohesion: 0.08
Nodes (13): ClientManagerService, Injectable, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable, EnvPatchService, Injectable, ProviderManagerService (+5 more)

### Community 54 - "apiFetch"
Cohesion: 0.09
Nodes (37): geistMono, geistSans, metadata, bootstrapAdmin(), Credentials, fetchBootstrapStatus(), fetchUserSession(), loginWithPassword() (+29 more)

### Community 55 - "models.controller.ts"
Cohesion: 0.23
Nodes (10): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, GatewayModelCapabilitiesDto, GatewayModelDto, ApiProperty, ApiPropertyOptional (+2 more)

### Community 56 - "content.graph.ts"
Cohesion: 0.10
Nodes (39): CompanyContextRepository, Inject, coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema (+31 more)

### Community 57 - "ChatResponseDto"
Cohesion: 0.22
Nodes (8): ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString

### Community 58 - "http-metrics.interceptor.ts"
Cohesion: 0.06
Nodes (32): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, HealthModule, Module (+24 more)

### Community 59 - "chat-completions.adapter.ts"
Cohesion: 0.21
Nodes (19): toHttpException(), asSystemFingerprint(), ChatCompletionsAdapterOptions, createChatCompletionsAdapter(), textStream(), mapTurnsToOpenAiMessages(), accumulateOpenAiStreamToolCallDeltas(), extractOpenAiStreamDeltaText() (+11 more)

### Community 60 - ".getOne"
Cohesion: 0.19
Nodes (10): ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+2 more)

### Community 61 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 62 - "openai-chat-completion-response.dto.ts"
Cohesion: 0.39
Nodes (8): OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty, ApiPropertyOptional

### Community 63 - "response-cache.service.ts"
Cohesion: 0.10
Nodes (18): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+10 more)

### Community 64 - "wizard-orchestrator.service.ts"
Cohesion: 0.06
Nodes (59): WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, InitAnswers, CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema, convertClient() (+51 more)

### Community 65 - "LoginDto"
Cohesion: 0.33
Nodes (5): LoginDto, ApiProperty, IsEmail, IsString, MinLength

### Community 66 - "swagger.setup.ts"
Cohesion: 0.12
Nodes (21): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+13 more)

### Community 67 - "configuration.ts"
Cohesion: 0.06
Nodes (51): CACHE_BACKEND_TYPE, collectPendingSecrets(), CliValidateOptions, asSemanticCacheTtlSeconds(), AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig (+43 more)

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (18): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+10 more)

### Community 70 - "company-context.mapper.ts"
Cohesion: 0.15
Nodes (11): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+3 more)

### Community 71 - "DomainException"
Cohesion: 0.04
Nodes (75): ActivateAccountOutput, ActivateAccountUseCase, Injectable, ReactivateUserUseCase, Injectable, CancelRunUseCase, Inject, Injectable (+67 more)

### Community 72 - ".getOne"
Cohesion: 0.32
Nodes (6): ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, Get, Param

### Community 74 - "UserRepository"
Cohesion: 0.05
Nodes (28): Inject, Inject, Inject, Inject, Inject, Inject, ACCOUNT_ACTIVATION_REPOSITORY, AccountActivationRecord (+20 more)

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "OpenAiChatMessageDto"
Cohesion: 0.22
Nodes (9): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+1 more)

### Community 77 - "openai-params-provider.mapper.ts"
Cohesion: 0.15
Nodes (18): mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses(), mapStopSequences(), OpenAiSharedChatCompletionParams, OpenAiSharedResponsesParams (+10 more)

### Community 78 - "company-context.controller.ts"
Cohesion: 0.19
Nodes (10): GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PutCompanyContextUseCase, Inject (+2 more)

### Community 79 - "llm-hop.ts"
Cohesion: 0.07
Nodes (35): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), LlmGatewayError (+27 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 82 - ".getOne"
Cohesion: 0.18
Nodes (11): OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+3 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "Env"
Cohesion: 0.04
Nodes (52): InviteUserResult, inviteUserSchema, InviteUserUseCase, Inject, Injectable, Inject, RESEND_ACTIVATION_RATE_LIMITER, ResendActivationOutput (+44 more)

### Community 85 - "api/src/app.module.ts"
Cohesion: 0.06
Nodes (46): AuthModule, Module, CompanyContextModule, Module, ContentPipelineFacade, toOutcome(), Injectable, ContentRunExecutor (+38 more)

### Community 86 - "prisma-content-result.adapter.ts"
Cohesion: 0.13
Nodes (5): ContentPipelineState, VerifierVerdict, PrismaContentResultAdapter, toContentPipelinePhase(), Injectable

### Community 87 - ".getMetrics"
Cohesion: 0.29
Nodes (4): ApiOperation, ApiResponse, Get, Header

### Community 88 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 90 - "health-readiness-response.dto.ts"
Cohesion: 0.36
Nodes (7): HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty, ApiPropertyOptional

### Community 91 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 92 - "anthropic-messages.controller.ts"
Cohesion: 0.04
Nodes (56): ApiHeader, GATEWAY_CACHE_HEADER, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags (+48 more)

### Community 93 - "provider-error.mapper.ts"
Cohesion: 0.21
Nodes (19): MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isRateLimitStatus(), isServerError(), isTimeoutStatus(), nameLooksLikeTimeout() (+11 more)

### Community 94 - "ClientEditCommand"
Cohesion: 0.07
Nodes (15): ClientEditCommand, Command, Option, ClientRemoveCommand, Command, Option, ModelAddCommand, Command (+7 more)

### Community 96 - "getAppConfig"
Cohesion: 0.06
Nodes (34): ChatModule, Module, StreamCleanupInterceptor, Injectable, readClientGatewayKey(), readGatewayKeyHeader(), resolveClientIdFromKey(), ResolvedGatewayClient (+26 more)

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 98 - "asProviderInstanceId"
Cohesion: 0.13
Nodes (29): assertInteractiveAllowed(), convertProvider(), CliAiProvider, ProviderPromptResult, ProviderPromptService, Injectable, ClientCli, ProviderCli (+21 more)

### Community 99 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 101 - "save-output-edited.use-case.ts"
Cohesion: 0.06
Nodes (41): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+33 more)

### Community 103 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 104 - "openai-messages-provider.mapper.ts"
Cohesion: 0.28
Nodes (6): ProviderAssistantTurn, ProviderToolResultTurn, ChatCompletionMessageParam, mapAssistantTurn(), mapAssistantTurnToResponsesInput(), mapTurnsToResponsesInput()

### Community 107 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 109 - "responses.adapter.ts"
Cohesion: 0.26
Nodes (15): asToolCallId(), buildResponsesCreateParams(), createResponsesAdapter(), textStream(), mapGatewayMetadataToOpenAi(), extractResponsesToolCalls(), mapResponsesStopReason(), parseOpenAiResponse() (+7 more)

### Community 110 - "GatewayKey"
Cohesion: 0.09
Nodes (26): ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray (+18 more)

### Community 112 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 113 - "KeyGenerateCommand"
Cohesion: 0.31
Nodes (3): KeyGenerateCommand, Command, Option

### Community 114 - "cn"
Cohesion: 0.06
Nodes (52): metadata, ACCEPT_INVITE_UNAUTHORIZED_HINT, AcceptInviteFormError, toAcceptInviteFormError(), acceptInvite(), AcceptInviteForm(), onSubmit(), AcceptInviteFormProps (+44 more)

### Community 115 - "ConfigInitCommand"
Cohesion: 0.31
Nodes (3): ConfigInitCommand, Command, Option

### Community 117 - "domain/company-context.types.ts"
Cohesion: 0.18
Nodes (18): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CompanyContextWriteDetail (+10 more)

### Community 118 - "prisma-invitation.adapter.ts"
Cohesion: 0.08
Nodes (26): Inject, InvitationListItem, ListInvitationsUseCase, Inject, Injectable, RevokeInvitationUseCase, Inject, Injectable (+18 more)

### Community 119 - "CompanyContextController"
Cohesion: 0.22
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 120 - "PrismaService"
Cohesion: 0.05
Nodes (35): CreateFeedbackUseCase, Inject, Injectable, agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_RUN_READER, FeedbackRunLookup (+27 more)

### Community 122 - "patch-company-context.use-case.ts"
Cohesion: 0.27
Nodes (8): toPublicCompanyContext(), PatchCompanyContextUseCase, Inject, Injectable, assertCompanyContextWritable(), PartialCompanyContext, isComplete(), mergeCompanyContext()

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 125 - "brand"
Cohesion: 0.17
Nodes (10): brand, unbrand, createAccountActivationId(), createInvitationId(), createRequestId(), createUserId(), isAccountActivationId(), isInvitationId() (+2 more)

### Community 129 - "ChatParamsDto"
Cohesion: 0.20
Nodes (10): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+2 more)

### Community 130 - "ai-provider-gateway/src/health/health.controller.ts"
Cohesion: 0.21
Nodes (8): HealthLivenessResponseDto, ApiProperty, HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get

### Community 147 - "openai-chat-message.dto.ts"
Cohesion: 0.60
Nodes (3): isTextContentItem(), normalizeOpenAiContent(), TextContentItem

## Knowledge Gaps
- **394 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+389 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1143 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ModelAlias` connect `ModelAlias` to `wizard-orchestrator.service.ts`, `types/index.ts`, `asProviderInstanceId`, `cli.module.ts`, `GatewayModelsCatalogService`, `api-error.code.ts`, `config-generator.service.ts`, `branded.types.ts`, `GatewayKey`, `redis-vector-store.adapter.ts`, `sentry-ai-metrics.adapter.ts`, `model-manager.service.ts`, `metrics.ts`, `provider-registry.service.ts`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `ModelAlias` to `wizard-orchestrator.service.ts`, `types/index.ts`, `asProviderInstanceId`, `configuration.ts`, `cli.module.ts`, `GatewayModelsCatalogService`, `logging.service.ts`, `api-error.code.ts`, `exitWithAgentReport`, `config-generator.service.ts`, `branded.types.ts`, `GatewayKey`, `sentry-ai-metrics.adapter.ts`, `model-manager.service.ts`, `metrics.ts`, `provider-registry.service.ts`, `chat.module.ts`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Why does `LoggingService` connect `LoggingService` to `logging.service.ts`, `anthropic/anthropic-tools.mapper.ts`, `branded.types.ts`, `redis-vector-store.adapter.ts`, `ai-provider-gateway/src/app.module.ts`, `provider-registry.service.ts`, `chat.module.ts`, `semantic-cache.service.ts`, `getAppConfigOrThrow`, `ai-provider-gateway/src/main.ts`, `api-error.code.ts`, `google-tools.mapper.ts`, `provider-instances.bootstrap.ts`, `chat-completions.adapter.ts`, `response-cache.service.ts`, `swagger.setup.ts`, `getAppConfig`, `responses.adapter.ts`, `GatewayKey`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _394 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `AuthUserContext` be split into smaller, more focused modules?**
  _Cohesion score 0.05548654244306418 - nodes in this community are weakly interconnected._
- **Should `get-run.use-case.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05406434418427565 - nodes in this community are weakly interconnected._