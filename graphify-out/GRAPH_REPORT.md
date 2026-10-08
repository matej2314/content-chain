# Graph Report - content-chain  (2026-10-08)

## Corpus Check
- 695 files · ~229,851 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .css 1)

## Summary
- 4496 nodes · 13881 edges · 142 communities (128 shown, 13 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 418 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `848da5e0`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- runs-result.types.ts
- social.types.ts
- api/company-context.types.ts
- anthropic/anthropic-tools.mapper.ts
- asClientId
- start-run-form.tsx
- provider-error.mapper.ts
- logging.module.ts
- responses.adapter.ts
- cli.module.ts
- getAppConfig
- provider-registry.service.ts
- social.graph.ts
- LoggingService
- ai-provider.interface.ts
- chat-params.dto.ts
- PrometheusAppMetricsAdapter
- response-cache.service.ts
- .createMessage
- apiFetch
- AuthController
- resilient-executor.ts
- isRecord
- delete-user.use-case.ts
- redis-vector-store.adapter.ts
- openai-params-provider.mapper.ts
- semantic-cache.service.ts
- notify-product.tsx
- swagger.setup.ts
- config-generator.service.ts
- guest.guard.ts
- HealthService
- ai-provider-gateway/src/main.ts
- cache.module.ts
- AnthropicMessagesRequestDto
- anthropic-response.mapper.ts
- runs.types.ts
- enums.ts
- run-review-panel.tsx
- http-metrics.interceptor.ts
- sentry-ai-metrics.adapter.ts
- RunRecord
- openai-chat-completions.controller.ts
- ids.ts
- GatewayKey
- ConfigInitCommand
- auth.module.ts
- RunRepository
- RunSseHub
- run-details-view.tsx
- ListRunsQueryDto
- ModelAlias
- gateway-key.guard.branded-types.test-d.ts
- exitWithAgentReport
- llm-hop.ts
- auth.schemas.ts
- content.graph.ts
- domain/company-context.types.ts
- HttpExceptionFilter
- health-readiness-response.dto.ts
- metrics.ts
- app-metrics.service.ts
- ProviderApiKey
- app-metrics-backend.interface.ts
- api/src/app.module.ts
- ModelRemoveCommand
- ChatToolingDto
- gateway-config.schema.ts
- OpenAiChatCompletionRequestDto
- config-validator.ts
- HealthController
- ConsoleLoggerAdapter
- openai-stream.mapper.ts
- models.controller.ts
- ClientEditCommand
- parse-verifier-log-message.ts
- company-context.mapper.ts
- api/src/health/health.service.ts
- should-include-redis-stack.ts
- llm-gateway.http.adapter.ts
- PrometheusService
- configuration-validation.service.ts
- ModelEditCommand
- SPEC — README
- MetricsController
- ChatMessageDto
- GatewayConfig
- company-context.dto.ts
- asProviderInstanceId
- ProviderRemoveCommand
- EnvironmentVariables
- ChatParamsDto
- chat.module.ts
- asGatewayKey
- PrismaService
- StartRunDto
- branded.types.ts
- route.ts
- OpenAiChatMessageDto
- types/index.ts
- CompanyContextController
- save-output-edited.use-case.ts
- api-error.code.ts
- ProviderAddCommand
- ProviderEditCommand
- openai-chat-completion-response.dto.ts
- DomainException
- ClientAddCommand
- UserRepository
- JwtAuthGuard
- chat.service.ts
- ModelAddCommand
- RedisConnectionService
- run-record.test-helpers.ts
- cn
- patch-company-context.use-case.ts
- GatewayToolDefinitionDto
- company-context.controller.ts
- prisma-invitation.adapter.ts
- event-source-registry-provider.tsx
- CompanyContext
- ClientRemoveCommand
- AppMetricsService
- Architektura
- brand
- configuration.ts
- health.api.ts
- ai-provider-gateway/src/app.module.ts
- anthropic-messages.controller.ts
- openai-chat-message.dto.ts
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
- openai-chat-completion-request.dto.ts

## God Nodes (most connected - your core abstractions)
1. `ModelAlias` - 88 edges
2. `ProviderInstanceId` - 81 edges
3. `DomainException` - 81 edges
4. `LoggingService` - 73 edges
5. `asProviderInstanceId()` - 67 edges
6. `isRecord()` - 66 edges
7. `GatewayConfig` - 65 edges
8. `cn()` - 62 edges
9. `GatewayKey` - 59 edges
10. `Env` - 59 edges

## Surprising Connections (you probably didn't know these)
- `toChatResponseDto()` --indirect_call--> `toGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/chat/dto/chat-response.dto.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
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

## Communities (142 total, 13 thin omitted)

### Community 0 - "runs-result.types.ts"
Cohesion: 0.06
Nodes (53): PAGE_OUTLINE_ROLE_LABELS, submitHitl(), isPageOutlineSectionRole(), isReelDuration(), PAGE_OUTLINE_SECTION_ROLES, PageDocument, PageOutline, PageOutlineSection (+45 more)

### Community 1 - "social.types.ts"
Cohesion: 0.06
Nodes (26): CompositeRunResultReader, GetRunOutput, RunResultReader, SocialBrief, EmptyRunResultReader, Injectable, toInputJson(), SocialResultStore (+18 more)

### Community 2 - "api/company-context.types.ts"
Cohesion: 0.05
Nodes (83): metadata, fetchCompanyContext(), fetchCompleteness(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras (+75 more)

### Community 3 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.11
Nodes (35): ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent(), isAnthropicEffortLevel(), mapThinkingBudgetToAnthropicEffort(), mapThinkingToAnthropic(), resolveAnthropicOutputConfig(), ContentBlockParam (+27 more)

### Community 4 - "asClientId"
Cohesion: 0.11
Nodes (34): PendingSecretsItem, WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema, convertClient() (+26 more)

### Community 5 - "start-run-form.tsx"
Cohesion: 0.07
Nodes (49): isGuestAllowedTaskType(), isGuestQuotaCode(), createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated (+41 more)

### Community 6 - "provider-error.mapper.ts"
Cohesion: 0.17
Nodes (21): ChatErrorHandlerService, Injectable, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isRateLimitStatus(), isServerError() (+13 more)

### Community 7 - "logging.module.ts"
Cohesion: 0.06
Nodes (20): NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable, SentryErrorReportingAdapter, Injectable, parseLogLevel() (+12 more)

### Community 8 - "responses.adapter.ts"
Cohesion: 0.09
Nodes (46): toCachedChatResponse(), toHttpException(), asInputTokens(), asOutputTokens(), asToolCallId(), mapOpenAiToolCalls(), buildGenerationConfig(), createGoogleProvider() (+38 more)

### Community 9 - "cli.module.ts"
Cohesion: 0.06
Nodes (57): AgentReport, AgentReportStatus, loadAnswers(), assertAgentHasAnswers(), CliMode, CliModeFlags, markAgentRuntime(), CliModule (+49 more)

### Community 10 - "getAppConfig"
Cohesion: 0.17
Nodes (11): getAppConfig(), GatewayKeyGuard, Injectable, enrichRequestWithClientId(), AnthropicApiKeyGuard, readAnthropicApiKey(), Injectable, OpenAiBearerAuthGuard (+3 more)

### Community 11 - "provider-registry.service.ts"
Cohesion: 0.09
Nodes (24): UnsupportedProviderException, ModelId, GatewayCapabilitiesConfig, GatewayModelConfig, GatewayParamsConfig, GatewayProviderInstanceConfig, adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance() (+16 more)

### Community 12 - "social.graph.ts"
Cohesion: 0.12
Nodes (33): loadPromptFromDir(), coercePassNoteVerdict(), isPassOnlyIssue(), ideasOutputSchema, reelIdeasOutputSchema, isReelTaskType(), ReelTaskType, canRefine() (+25 more)

### Community 13 - "LoggingService"
Cohesion: 0.09
Nodes (13): Inject, Inject, VectorStore, StreamCacheReplayService, Injectable, isProviderRateLimitError(), Inject, Optional (+5 more)

### Community 14 - "ai-provider.interface.ts"
Cohesion: 0.12
Nodes (28): asSystemFingerprint(), PromptCacheHitTokens, AssistantChatMessage, ProviderAssistantTurn, ProviderChatTurn, ProviderToolDefinition, ProviderToolResultTurn, UserChatMessage (+20 more)

### Community 15 - "chat-params.dto.ts"
Cohesion: 0.24
Nodes (7): ResponseFormatDto, ApiProperty, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsThinkingBudget()

### Community 16 - "PrometheusAppMetricsAdapter"
Cohesion: 0.12
Nodes (6): PrometheusAppMetricsAdapter, Injectable, resolveAppMetricsBackend(), AppProviderCallContext, AppProviderStreamScope, AppTokenUsage

### Community 17 - "response-cache.service.ts"
Cohesion: 0.14
Nodes (14): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), CACHE_BACKEND, ResponseCacheService, Injectable, isSingleTurnUserRequest(), lastUserMessageText() (+6 more)

### Community 18 - ".createMessage"
Cohesion: 0.08
Nodes (25): ApiHeader, ApiBody, ApiOperation, ApiResponse, Body, Post, Req, toChatResponseDto() (+17 more)

### Community 19 - "apiFetch"
Cohesion: 0.09
Nodes (41): metadata, createInvitation(), fetchInvitations(), resendInvitation(), revokeInvitation(), InvitationListItem, InviteCreated, isInvitationExpired() (+33 more)

### Community 20 - "AuthController"
Cohesion: 0.05
Nodes (44): AuthController, ApiTags, Body, Controller, Get, HttpCode, Post, Req (+36 more)

### Community 21 - "resilient-executor.ts"
Cohesion: 0.17
Nodes (18): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+10 more)

### Community 22 - "isRecord"
Cohesion: 0.05
Nodes (61): AcceptInvitePage(), metadata, tokenFromSearchParam(), ACCEPT_INVITE_DEMO_HINT, ACCEPT_INVITE_UNAUTHORIZED_HINT, AcceptInviteFormError, toAcceptInviteFormError(), ACTIVATION_FAILED_HINT (+53 more)

### Community 23 - "delete-user.use-case.ts"
Cohesion: 0.07
Nodes (21): DeleteUserResult, DeleteUserUseCase, Inject, Injectable, isGuestTaskType(), GuestPurgePort, GUEST_QUOTA, GuestQuotaAdmitResult (+13 more)

### Community 24 - "redis-vector-store.adapter.ts"
Cohesion: 0.14
Nodes (20): isUnservableCachedReply(), parseCachedChatResponse(), RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), asString(), ParsedKnnHits, parseKnnHits() (+12 more)

### Community 25 - "openai-params-provider.mapper.ts"
Cohesion: 0.12
Nodes (24): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses() (+16 more)

### Community 26 - "semantic-cache.service.ts"
Cohesion: 0.08
Nodes (21): OllamaEmbeddingAdapter, Injectable, EmbeddingBackend, EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema() (+13 more)

### Community 27 - "notify-product.tsx"
Cohesion: 0.21
Nodes (14): assertNever(), notifyProduct(), notifyRunCancelled(), notifyRunTerminal(), EnvelopeRef, ProductToast, RunTerminalInput, RunTerminalOutcome (+6 more)

### Community 28 - "swagger.setup.ts"
Cohesion: 0.09
Nodes (26): ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString (+18 more)

### Community 29 - "config-generator.service.ts"
Cohesion: 0.16
Nodes (12): WizardState, ConfigGeneratorService, Injectable, FileManagerService, Injectable, WizardRunResult, EnvTemplateInput, generateEnvTemplate() (+4 more)

### Community 30 - "guest.guard.ts"
Cohesion: 0.24
Nodes (5): ALLOW_GUEST_KEY, IS_PUBLIC_KEY, GuestGuard, Inject, Injectable

### Community 31 - "HealthService"
Cohesion: 0.17
Nodes (5): HealthLivenessResponseDto, ApiProperty, HealthReadinessResponseDto, HealthService, Injectable

### Community 32 - "ai-provider-gateway/src/main.ts"
Cohesion: 0.13
Nodes (15): AppModule, Module, bootstrap(), API_GLOBAL_PREFIX, PORT, setupApp(), exportOpenApi(), OPENAPI_OUTPUT_FILENAME (+7 more)

### Community 33 - "cache.module.ts"
Cohesion: 0.09
Nodes (16): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+8 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (38): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+30 more)

### Community 35 - "anthropic-response.mapper.ts"
Cohesion: 0.14
Nodes (24): SseDoneEvent, asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto, AnthropicTextContentBlockDto (+16 more)

### Community 36 - "runs.types.ts"
Cohesion: 0.05
Nodes (66): metadata, metadata, filterFeedbackRunOptions(), ArchiveRunsQuery, fetchArchiveRuns(), fetchInitiatorOptions(), fetchRunSnapshot(), fetchUserRuns() (+58 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "run-review-panel.tsx"
Cohesion: 0.07
Nodes (39): buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload() (+31 more)

### Community 39 - "http-metrics.interceptor.ts"
Cohesion: 0.11
Nodes (18): HttpMetricsInterceptor, httpRouteLabel(), statusLabel(), Injectable, UNMAPPED_HTTP_ROUTE, MetricsController, Controller, Get (+10 more)

### Community 40 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.10
Nodes (28): CostUsd, ToolCallId, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext() (+20 more)

### Community 41 - "RunRecord"
Cohesion: 0.06
Nodes (23): InProcessRunWorker, Injectable, Inject, LightRunItem, ListRunsResult, RunSnapshot, RunLogEntry, RunRecord (+15 more)

### Community 42 - "openai-chat-completions.controller.ts"
Cohesion: 0.09
Nodes (29): GATEWAY_CACHE_HEADER, ApiOpenAiErrorResponses(), OPENAI_INTEGRATION_PATH, OpenAiChatCompletionsController, ApiSecurity, ApiTags, Controller, OpenAiModelsController (+21 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (23): ACCOUNT_ACTIVATION_ID_RE, AccountActivationId, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createRunId() (+15 more)

### Community 44 - "GatewayKey"
Cohesion: 0.15
Nodes (11): ChatProviderCooldownService, Injectable, resolveClientIdFromKey(), asRequestId(), GatewayKey, ResolvedGatewayClient, SmartRateLimitGuard, Injectable (+3 more)

### Community 45 - "ConfigInitCommand"
Cohesion: 0.14
Nodes (8): ConfigInitCommand, Command, Option, ConfigValidateCommand, Command, Option, CliGatewayValidatorService, Injectable

### Community 46 - "auth.module.ts"
Cohesion: 0.04
Nodes (83): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Inject, Injectable, ActivateAccountOutput, ActivateAccountUseCase, Injectable (+75 more)

### Community 47 - "RunRepository"
Cohesion: 0.03
Nodes (72): Inject, CancelRunUseCase, Injectable, FinalizeReviewUseCase, Inject, Injectable, GetRunLogsOutput, GetRunLogsUseCase (+64 more)

### Community 48 - "RunSseHub"
Cohesion: 0.16
Nodes (6): Inject, RunSseEvent, RunSseHub, InMemoryRunSseHub, Inject, Injectable

### Community 49 - "run-details-view.tsx"
Cohesion: 0.10
Nodes (26): metadata, geistMono, geistSans, metadata, fetchUserSession(), patchOwnEmail(), AccountEmailForm(), onAccountSubmit() (+18 more)

### Community 50 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+2 more)

### Community 51 - "ModelAlias"
Cohesion: 0.08
Nodes (6): ProviderTestOptions, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, AppMetricsBackend

### Community 53 - "exitWithAgentReport"
Cohesion: 0.15
Nodes (13): emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), resolveCliMode(), toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList() (+5 more)

### Community 54 - "llm-hop.ts"
Cohesion: 0.09
Nodes (29): LlmModule, Module, LLM_GATEWAY_PORT, isRetryable(), RetryReason, isSocialRunRecord(), SocialRunRecord, isAbortError() (+21 more)

### Community 55 - "auth.schemas.ts"
Cohesion: 0.04
Nodes (47): ActivateAccountInput, activateAccountSchema, BootstrapAdminInput, bootstrapAdminSchema, LoginInput, loginSchema, PatchUserCommand, patchUserSchema (+39 more)

### Community 56 - "content.graph.ts"
Cohesion: 0.06
Nodes (51): CompanyContextRepository, Inject, coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema (+43 more)

### Community 57 - "domain/company-context.types.ts"
Cohesion: 0.18
Nodes (18): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CompanyContextWriteDetail (+10 more)

### Community 58 - "HttpExceptionFilter"
Cohesion: 0.20
Nodes (6): ErrorEnvelope, HttpExceptionFilter, Catch, newRequestId(), RequestIdMiddleware, Injectable

### Community 59 - "health-readiness-response.dto.ts"
Cohesion: 0.29
Nodes (9): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiProperty, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty (+1 more)

### Community 60 - "metrics.ts"
Cohesion: 0.14
Nodes (21): getClientConversationId(), getOrCreateConversationIdForResponse(), buildAppProviderMetricsContext(), buildLlmMetricsContext(), mapProviderResponseToAiObservation(), mapProviderResponseToUsage(), toMetricsMessages(), buildProviderInputForAlias() (+13 more)

### Community 61 - "app-metrics.service.ts"
Cohesion: 0.12
Nodes (17): HealthModule, Module, HealthCheckResult, HealthRedisCheckResult, AiMetricsModule, Global, Module, AppMetricsModule (+9 more)

### Community 62 - "ProviderApiKey"
Cohesion: 0.18
Nodes (7): ProviderTestCommand, Command, Option, ProviderTestService, Injectable, ProviderApiKey, ProviderFactoryContext

### Community 63 - "app-metrics-backend.interface.ts"
Cohesion: 0.12
Nodes (11): healthStatusToGaugeValue(), AppRequestLabels, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus, HttpRequestLabels (+3 more)

### Community 64 - "api/src/app.module.ts"
Cohesion: 0.05
Nodes (52): AppModule, Module, AuthModule, Module, CompanyContextModule, Module, ContentPipelineFacade, toOutcome() (+44 more)

### Community 65 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 66 - "ChatToolingDto"
Cohesion: 0.29
Nodes (9): ChatToolingDto, GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsArray, IsOptional, IsString, Type (+1 more)

### Community 67 - "gateway-config.schema.ts"
Cohesion: 0.10
Nodes (27): REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, collectPendingSecrets(), EnvPatchService, EnvPatchValue, Injectable, ClientCli (+19 more)

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (18): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+10 more)

### Community 69 - "config-validator.ts"
Cohesion: 0.30
Nodes (9): CliValidateOptions, collectInactiveProviderWarnings(), formatZodIssues(), validateGatewayConfig(), ValidationOptions, ValidationResult, assertMasterKeyPresent(), validateEnvironment() (+1 more)

### Community 70 - "HealthController"
Cohesion: 0.31
Nodes (6): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get

### Community 71 - "ConsoleLoggerAdapter"
Cohesion: 0.36
Nodes (4): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, LogLevel

### Community 72 - "openai-stream.mapper.ts"
Cohesion: 0.31
Nodes (12): fromGatewayToolCallDto(), mapChatResponseToOpenAi(), mapFinishReasontoOpenAI(), mapGatewayToolCallsToOpenAi(), mapSystemFingerprintToOpenAi(), toOpenAiCompletionId(), baseChunkFields(), buildToolCallsDelta() (+4 more)

### Community 73 - "models.controller.ts"
Cohesion: 0.10
Nodes (22): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation (+14 more)

### Community 74 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "company-context.mapper.ts"
Cohesion: 0.15
Nodes (11): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+3 more)

### Community 77 - "api/src/health/health.service.ts"
Cohesion: 0.08
Nodes (28): GATEWAY_PROBE_TIMEOUT_MS, GatewayLivenessBody, GatewayLivenessProbe, GatewayLivenessProbeReason, GatewayLivenessProbeResult, isRecord(), parseGatewayLivenessBody(), probeFailureReason() (+20 more)

### Community 78 - "should-include-redis-stack.ts"
Cohesion: 0.35
Nodes (10): getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis() (+2 more)

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.10
Nodes (23): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), LlmGatewayError (+15 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - "configuration-validation.service.ts"
Cohesion: 0.16
Nodes (7): CACHE_BACKEND_TYPE, configurationValidation, ConfigurationValidationService, CACHE_BACKEND_VALUES, validate(), ValidatedEnvironment, RawGatewayConfig

### Community 82 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "MetricsController"
Cohesion: 0.18
Nodes (7): MetricsController, ApiOperation, ApiResponse, ApiTags, Controller, Get, Header

### Community 85 - "ChatMessageDto"
Cohesion: 0.18
Nodes (11): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+3 more)

### Community 86 - "GatewayConfig"
Cohesion: 0.08
Nodes (30): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, ConfigPersistenceService, normalizeGatewayConfigForWrite(), Injectable, defaultModelPolicy() (+22 more)

### Community 87 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 88 - "asProviderInstanceId"
Cohesion: 0.07
Nodes (47): isRedisSearchTagSafeId(), assertInteractiveAllowed(), DEFAULT_MODELS, InitAnswers, convertModel(), convertProvider(), parseWizardState(), CliAiProvider (+39 more)

### Community 89 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 90 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 91 - "ChatParamsDto"
Cohesion: 0.20
Nodes (10): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+2 more)

### Community 92 - "chat.module.ts"
Cohesion: 0.07
Nodes (28): ChatController, ApiSecurity, ApiTags, Controller, ChatService, Injectable, ChatStreamController, ApiBody (+20 more)

### Community 93 - "asGatewayKey"
Cohesion: 0.12
Nodes (10): KeyGenerateCommand, Command, Option, KeyGeneratorService, Injectable, ClientPromptService, Injectable, KeyPromptService (+2 more)

### Community 94 - "PrismaService"
Cohesion: 0.04
Nodes (49): RefreshSessionRecord, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable, CreateFeedbackUseCase, Inject, Injectable, agentKeySchema (+41 more)

### Community 95 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 96 - "branded.types.ts"
Cohesion: 0.09
Nodes (43): CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatCacheSource, ChatResponseData (+35 more)

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 98 - "OpenAiChatMessageDto"
Cohesion: 0.22
Nodes (9): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+1 more)

### Community 99 - "types/index.ts"
Cohesion: 0.14
Nodes (26): RequestIdMiddleware, Injectable, CONVERSATION_ID_PATTERN, createRequestId(), isAttemptNumber(), isBaseUrl(), isCacheTtlSeconds(), isConversationId() (+18 more)

### Community 100 - "CompanyContextController"
Cohesion: 0.22
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 101 - "save-output-edited.use-case.ts"
Cohesion: 0.07
Nodes (38): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+30 more)

### Community 102 - "api-error.code.ts"
Cohesion: 0.13
Nodes (14): ApiErrorCode, DEFAULT_HTTP_STATUS_TO_CODE, ApiErrorPayload, GlobalExceptionFilter, isPayloadTooLargeError(), PayloadTooLargeError, RequestWithId, Catch (+6 more)

### Community 103 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 104 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 105 - "openai-chat-completion-response.dto.ts"
Cohesion: 0.39
Nodes (8): OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty, ApiPropertyOptional

### Community 106 - "DomainException"
Cohesion: 0.08
Nodes (33): ApiCookieAuth, Patch, isRecord(), Body, HttpCode, Post, orderItemsBySelectedIds(), assertSameIds() (+25 more)

### Community 107 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 108 - "UserRepository"
Cohesion: 0.06
Nodes (22): Inject, Inject, Inject, Inject, AccountActivationRecord, AccountActivationRepository, CreatePendingUser, RotateActivationTokenInput (+14 more)

### Community 110 - "chat.service.ts"
Cohesion: 0.06
Nodes (52): SemanticStoreEmbedState, CacheIdentityMessage, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray (+44 more)

### Community 111 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 112 - "RedisConnectionService"
Cohesion: 0.30
Nodes (3): RedisConnectionService, Injectable, isRedisRequiredFromConfig()

### Community 113 - "run-record.test-helpers.ts"
Cohesion: 0.52
Nodes (6): makeContentRun(), makeSocialRun(), makeSocialSnapshot(), SocialRunSnapshot, newConversationId(), newRunId()

### Community 114 - "cn"
Cohesion: 0.04
Nodes (66): logoutSession(), GuestLimitModal(), GuestLimitModalProps, GUEST_ALLOWED_TASK_TYPES, GUEST_CONTACTS, GUEST_QUOTA_CODES, GuestAllowedTaskType, GuestContact (+58 more)

### Community 115 - "patch-company-context.use-case.ts"
Cohesion: 0.27
Nodes (8): toPublicCompanyContext(), PatchCompanyContextUseCase, Inject, Injectable, assertCompanyContextWritable(), PartialCompanyContext, isComplete(), mergeCompanyContext()

### Community 116 - "GatewayToolDefinitionDto"
Cohesion: 0.29
Nodes (6): GatewayToolDefinitionDto, ApiProperty, ApiPropertyOptional, IsObject, IsOptional, IsString

### Community 117 - "company-context.controller.ts"
Cohesion: 0.19
Nodes (10): GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PutCompanyContextUseCase, Inject (+2 more)

### Community 118 - "prisma-invitation.adapter.ts"
Cohesion: 0.05
Nodes (40): InvitationListItem, ListInvitationsUseCase, Inject, Injectable, RevokeInvitationUseCase, Inject, Injectable, JwtPayload (+32 more)

### Community 119 - "event-source-registry-provider.tsx"
Cohesion: 0.43
Nodes (5): EventSourceRegistryContext, EventSourceRegistryProvider(), createEventSourceRegistry(), EventSourceRegistry, RegistryEntry

### Community 121 - "CompanyContext"
Cohesion: 0.26
Nodes (5): CompanyContext, jsonArray(), jsonRecord(), PrismaCompanyContextAdapter, Injectable

### Community 122 - "ClientRemoveCommand"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

### Community 123 - "AppMetricsService"
Cohesion: 0.11
Nodes (6): HttpMetricsMiddleware, Injectable, AppMetricsService, Inject, Injectable, HttpMethod

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 125 - "brand"
Cohesion: 0.17
Nodes (10): brand, unbrand, createAccountActivationId(), createInvitationId(), createRequestId(), createUserId(), isAccountActivationId(), isInvitationId() (+2 more)

### Community 126 - "configuration.ts"
Cohesion: 0.14
Nodes (21): asSemanticCacheTtlSeconds(), AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig, SemanticCacheRuntimeConfig, buildAppConfiguration(), buildEffectiveGatewayConfig() (+13 more)

### Community 127 - "health.api.ts"
Cohesion: 0.27
Nodes (11): fetchGatewayAlive(), fetchHealthReady(), HealthCheck, HealthCheckStatus, HealthReadyAggregate, HealthReadyResponse, isGatewayAlive(), isRecord() (+3 more)

### Community 128 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.11
Nodes (19): ChatModule, Module, AnthropicModule, Module, IntegrationsModule, Module, OpenAiModule, Module (+11 more)

### Community 129 - "anthropic-messages.controller.ts"
Cohesion: 0.10
Nodes (28): ApiAnthropicErrorResponses(), ApiRequestIdHeader(), AnthropicMessagesController, ApiSecurity, ApiTags, Controller, AnthropicModelsController, ApiNotFoundResponse (+20 more)

### Community 130 - "openai-chat-message.dto.ts"
Cohesion: 0.60
Nodes (3): isTextContentItem(), normalizeOpenAiContent(), TextContentItem

## Knowledge Gaps
- **430 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+425 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1205 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ModelAlias` connect `ModelAlias` to `asClientId`, `provider-registry.service.ts`, `PrometheusAppMetricsAdapter`, `response-cache.service.ts`, `resilient-executor.ts`, `redis-vector-store.adapter.ts`, `config-generator.service.ts`, `sentry-ai-metrics.adapter.ts`, `metrics.ts`, `app-metrics.service.ts`, `app-metrics-backend.interface.ts`, `models.controller.ts`, `GatewayConfig`, `asProviderInstanceId`, `branded.types.ts`, `types/index.ts`, `api-error.code.ts`, `chat.service.ts`, `AppMetricsService`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `ModelAlias` to `asClientId`, `logging.module.ts`, `provider-registry.service.ts`, `LoggingService`, `PrometheusAppMetricsAdapter`, `config-generator.service.ts`, `sentry-ai-metrics.adapter.ts`, `GatewayKey`, `exitWithAgentReport`, `metrics.ts`, `app-metrics.service.ts`, `ProviderApiKey`, `app-metrics-backend.interface.ts`, `gateway-config.schema.ts`, `models.controller.ts`, `GatewayConfig`, `asProviderInstanceId`, `branded.types.ts`, `types/index.ts`, `AppMetricsService`, `configuration.ts`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Why does `isRunId()` connect `ids.ts` to `RunRepository`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _430 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `runs-result.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05501165501165501 - nodes in this community are weakly interconnected._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05787545787545788 - nodes in this community are weakly interconnected._