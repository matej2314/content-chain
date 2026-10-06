# Graph Report - content-chain  (2026-10-06)

## Corpus Check
- 687 files · ~219,513 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .css 1)

## Summary
- 4446 nodes · 13728 edges · 147 communities (131 shown, 15 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 412 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `95621fe4`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- users.controller.ts
- social.types.ts
- api/company-context.types.ts
- GatewayProviderType
- asClientId
- run-details-view.tsx
- api-error.code.ts
- logging.module.ts
- google-tools.mapper.ts
- cli.module.ts
- InMemoryRunSseHub
- ChatMessageDto
- social.graph.ts
- branded.types.ts
- LoggingService
- chat-params.dto.ts
- PrometheusAppMetricsAdapter
- semantic-cache.service.ts
- run-review-panel.tsx
- apiFetch
- Env
- AppMetricsService
- WizardState
- rate-run.use-case.ts
- RedisVectorStoreAdapter
- cancel-run-dialog.tsx
- provider-instances.bootstrap.ts
- button.tsx
- openai-thinking-provider.mapper.ts
- ModelAddCommand
- auth.module.ts
- ai-provider-gateway/src/health/health.service.ts
- ai-provider-gateway/src/main.ts
- cache.module.ts
- AnthropicMessagesRequestDto
- anthropic-messages.controller.ts
- runs.types.ts
- enums.ts
- feedback-form.tsx
- exitWithAgentReport
- sentry-ai-metrics.adapter.ts
- prisma-run.adapter.ts
- openai-models.controller.ts
- ids.ts
- openai-chat-completions.controller.ts
- configuration-validation.service.ts
- DomainException
- anthropic-models.controller.ts
- runs.controller.ts
- auth.api.ts
- ListRunsQueryDto
- ModelAlias
- types/index.ts
- config-generator.service.ts
- configure-swagger.ts
- anthropic/anthropic-tools.mapper.ts
- content.graph.ts
- domain/company-context.types.ts
- chat-completions.adapter.ts
- resilient-executor.ts
- GatewayModelsCatalogService
- RunRepository
- MetricsController
- app-metrics.service.ts
- api/src/app.module.ts
- swagger.setup.ts
- CompanyContext
- asProviderInstanceId
- OpenAiChatCompletionRequestDto
- HttpExceptionFilter
- RedisConnectionService
- ChatParamsDto
- llm-hop.ts
- patch-company-context.use-case.ts
- OllamaEmbeddingAdapter
- parse-verifier-log-message.ts
- company-context.mapper.ts
- api/src/health/health.service.ts
- OpenAiChatMessageDto
- llm-gateway.http.adapter.ts
- PrometheusService
- ConsoleLoggerAdapter
- ClientEditCommand
- SPEC — README
- openai-chat-message.dto.ts
- responses.adapter.ts
- GatewayConfig
- company-context.dto.ts
- .getOne
- ProviderRemoveCommand
- semantic-cache.constants.ts
- env.validation.ts
- GatewayKey
- configuration.ts
- create-feedback.use-case.ts
- StartRunDto
- chat-provider-call.service.ts
- route.ts
- start-run-form.tsx
- ModelEditCommand
- CompanyContextController
- save-output-edited.use-case.ts
- filters/http-exception.filter.ts
- ProviderAddCommand
- ProviderEditCommand
- ai-provider-gateway/src/app.module.ts
- AuthUserContext
- ClientAddCommand
- UserRepository
- openai-chat-completion-request.dto.ts
- chat.service.ts
- HealthController
- RefreshSessionRepository
- VectorStore
- cn
- EnvironmentVariables
- JwtAuthGuard
- CompanyContextRepository
- prisma-invitation.adapter.ts
- PrismaService
- should-include-redis-stack.ts
- ConfigInitCommand
- ClientRemoveCommand
- ModelRemoveCommand
- Architektura
- brand
- provider-base-url.validation.ts
- redis-vector-store.adapter.ts
- anthropic.module.ts
- .getOne
- .getOne
- models.controller.ts
- openai-params-provider.mapper.ts
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
- health.api.ts
- openai-messages-provider.mapper.ts
- gateway-key.guard.branded-types.test-d.ts

## God Nodes (most connected - your core abstractions)
1. `ModelAlias` - 88 edges
2. `ProviderInstanceId` - 81 edges
3. `DomainException` - 81 edges
4. `LoggingService` - 73 edges
5. `asProviderInstanceId()` - 67 edges
6. `GatewayConfig` - 65 edges
7. `isRecord()` - 64 edges
8. `cn()` - 62 edges
9. `GatewayKey` - 59 edges
10. `Env` - 57 edges

## Surprising Connections (you probably didn't know these)
- `toChatResponseDto()` --indirect_call--> `toGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/chat/dto/chat-response.dto.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `mapGatewayResponseToAnthropicFormat()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/anthropic/mappers/anthropic-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `optionalEnvRefSchema` --calls--> `asEnvRef()`  [EXTRACTED]
  apps/ai-provider-gateway/src/config/gateway-config.schema.ts → apps/ai-provider-gateway/src/common/types/branded.types.ts
- `DialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  apps/frontend/src/shared/ui/dialog.tsx → apps/frontend/src/shared/utils/utils.ts
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (147 total, 15 thin omitted)

### Community 0 - "users.controller.ts"
Cohesion: 0.07
Nodes (25): ListUsersUseCase, Inject, Injectable, ReactivateUserUseCase, Inject, Injectable, SoftDeleteUserUseCase, Injectable (+17 more)

### Community 1 - "social.types.ts"
Cohesion: 0.06
Nodes (26): CompositeRunResultReader, GetRunOutput, RunResultReader, SocialBrief, EmptyRunResultReader, Injectable, toInputJson(), SocialResultStore (+18 more)

### Community 2 - "api/company-context.types.ts"
Cohesion: 0.06
Nodes (64): metadata, fetchCompanyContext(), fetchCompleteness(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras (+56 more)

### Community 3 - "GatewayProviderType"
Cohesion: 0.09
Nodes (27): ProviderTestCommand, Command, Option, CliAiProvider, GatewayClient, EnvPatchService, EnvPatchValue, Injectable (+19 more)

### Community 4 - "asClientId"
Cohesion: 0.08
Nodes (39): PendingSecretsItem, assertInteractiveAllowed(), KeyGenerateCommand, Command, Option, CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema (+31 more)

### Community 5 - "run-details-view.tsx"
Cohesion: 0.06
Nodes (54): metadata, metadata, CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS, RUN_TASK_TYPE_LABELS (+46 more)

### Community 6 - "api-error.code.ts"
Cohesion: 0.16
Nodes (22): ApiErrorCode, ApiErrorPayload, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isProviderRateLimitError(), isRateLimitStatus() (+14 more)

### Community 7 - "logging.module.ts"
Cohesion: 0.08
Nodes (20): LEVEL_ORDER, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, SentryErrorReportingAdapter, Injectable, parseLogLevel(), ErrorReportingBackend (+12 more)

### Community 8 - "google-tools.mapper.ts"
Cohesion: 0.16
Nodes (24): asInputTokens(), asOutputTokens(), buildGenerationConfig(), createGoogleProvider(), getFinalToolCalls(), getStopReason(), getUsageMetadata(), textStream() (+16 more)

### Community 9 - "cli.module.ts"
Cohesion: 0.04
Nodes (67): AgentReport, AgentReportStatus, emitAgentReport(), exitCodeForReport(), CliMode, CliModeFlags, CliModule, Module (+59 more)

### Community 10 - "InMemoryRunSseHub"
Cohesion: 0.29
Nodes (4): RunSseEvent, InMemoryRunSseHub, Inject, Injectable

### Community 11 - "ChatMessageDto"
Cohesion: 0.12
Nodes (22): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+14 more)

### Community 12 - "social.graph.ts"
Cohesion: 0.10
Nodes (43): isSocialRunRecord(), LlmHopService, Injectable, coercePassNoteVerdict(), isPassOnlyIssue(), SocialPipelineFacade, toOutcome(), Inject (+35 more)

### Community 13 - "branded.types.ts"
Cohesion: 0.09
Nodes (42): CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatCacheSource, GATEWAY_CACHE_HEADER, ChatResponseData, SseMetaPayload, SseMetaPayloadDto (+34 more)

### Community 14 - "LoggingService"
Cohesion: 0.11
Nodes (9): Inject, Inject, PinoLoggerAdapter, Injectable, LogContext, LoggingService, Injectable, ProviderInstancesBootstrap (+1 more)

### Community 15 - "chat-params.dto.ts"
Cohesion: 0.24
Nodes (7): ResponseFormatDto, ApiProperty, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsThinkingBudget()

### Community 16 - "PrometheusAppMetricsAdapter"
Cohesion: 0.10
Nodes (7): PrometheusAppMetricsAdapter, Injectable, resolveAppMetricsBackend(), AppProviderCallContext, AppProviderStreamScope, AppRequestLabels, AppTokenUsage

### Community 17 - "semantic-cache.service.ts"
Cohesion: 0.12
Nodes (21): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), ResponseCacheService, Injectable, isSingleTurnUserRequest(), lastUserMessageText(), embeddingProbeTimeoutMs() (+13 more)

### Community 18 - "run-review-panel.tsx"
Cohesion: 0.07
Nodes (41): DemoChip(), useDemoMode(), useGuestLocked(), buildOutputEditedBody(), canEditResult(), contentPayload(), documentPayload(), ideaPayload() (+33 more)

### Community 19 - "apiFetch"
Cohesion: 0.08
Nodes (38): metadata, fetchAppConfig(), AppConfig, parseAppConfig(), DemoModeContext, DemoModeContextValue, DemoModeProvider(), DemoModeState (+30 more)

### Community 20 - "Env"
Cohesion: 0.03
Nodes (73): ActivateAccountUseCase, Inject, Injectable, BootstrapAdminUseCase, Inject, Injectable, BootstrapStatusUseCase, Injectable (+65 more)

### Community 21 - "AppMetricsService"
Cohesion: 0.10
Nodes (5): HttpMetricsMiddleware, Injectable, AppMetricsService, Inject, Injectable

### Community 22 - "WizardState"
Cohesion: 0.13
Nodes (14): WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, convertModel(), parseWizardState(), WizardState, ModelPromptService, Injectable (+6 more)

### Community 23 - "rate-run.use-case.ts"
Cohesion: 0.07
Nodes (28): isGuestTaskType(), Inject, ratingSchema, Inject, assertSameIds(), SaveOutputEditedUseCase, Injectable, validationFailed() (+20 more)

### Community 24 - "RedisVectorStoreAdapter"
Cohesion: 0.19
Nodes (10): RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), isRedisSearchIndexAlreadyExistsError(), isRedisSearchMissingIndexError(), isRedisSearchModuleMissingError(), redisSearchErrorMessage(), VectorSearchHit (+2 more)

### Community 25 - "cancel-run-dialog.tsx"
Cohesion: 0.11
Nodes (29): logoutSession(), GuestLimitModal(), GuestLimitModalProps, assertNever(), notifyProduct(), notifyRunCancelled(), notifyRunTerminal(), EnvelopeRef (+21 more)

### Community 26 - "provider-instances.bootstrap.ts"
Cohesion: 0.27
Nodes (10): GatewayProviderInstanceConfig, assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryFn (+2 more)

### Community 27 - "button.tsx"
Cohesion: 0.10
Nodes (34): AcceptInvitePage(), metadata, tokenFromSearchParam(), ACCEPT_INVITE_UNAUTHORIZED_HINT, AcceptInviteFormError, toAcceptInviteFormError(), acceptInvite(), registerAccount() (+26 more)

### Community 28 - "openai-thinking-provider.mapper.ts"
Cohesion: 0.23
Nodes (13): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), ChatCompletionThinkingParam, isOpenAiEffortLevel(), isOpenAiReasoningRequested(), mapThinkingBudgetToEffort(), mapThinkingToResponsesReasoning() (+5 more)

### Community 29 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 30 - "auth.module.ts"
Cohesion: 0.04
Nodes (52): AcceptInviteUseCase, Inject, Injectable, InviteUserResult, inviteUserSchema, InviteUserUseCase, Inject, Injectable (+44 more)

### Community 31 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.09
Nodes (21): EMBEDDING_BACKEND, VECTOR_STORE, RedisConsumer, HealthCheckItemDto, ApiProperty, HealthLivenessResponseDto, ApiProperty, HealthReadinessChecksDto (+13 more)

### Community 32 - "ai-provider-gateway/src/main.ts"
Cohesion: 0.13
Nodes (15): AppModule, Module, bootstrap(), API_GLOBAL_PREFIX, PORT, setupApp(), exportOpenApi(), OPENAPI_OUTPUT_FILENAME (+7 more)

### Community 33 - "cache.module.ts"
Cohesion: 0.09
Nodes (19): NoOpCacheBackend, Injectable, NoopCacheModule, Module, RedisCacheAdapter, Injectable, RedisCacheModule, Module (+11 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "anthropic-messages.controller.ts"
Cohesion: 0.14
Nodes (25): SseDoneEvent, asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto, AnthropicTextContentBlockDto (+17 more)

### Community 36 - "runs.types.ts"
Cohesion: 0.05
Nodes (83): PAGE_OUTLINE_ROLE_LABELS, ArchiveRunsQuery, fetchUserRuns(), InitiatorOption, submitHitl(), HitlAccepted, isPageOutlineSectionRole(), isReelDuration() (+75 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "feedback-form.tsx"
Cohesion: 0.10
Nodes (28): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, filterFeedbackRunOptions(), CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody() (+20 more)

### Community 39 - "exitWithAgentReport"
Cohesion: 0.28
Nodes (5): exitWithAgentReport(), loadAnswers(), assertAgentHasAnswers(), markAgentRuntime(), resolveCliMode()

### Community 40 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.11
Nodes (27): CostUsd, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext(), buildGenAiChatSpanAttributes() (+19 more)

### Community 41 - "prisma-run.adapter.ts"
Cohesion: 0.07
Nodes (18): LightRunItem, ListRunsResult, RunSnapshot, RunRecordBase, ALLOWED_RUN_STATES, assertTransition(), CANCELABLE_RUN_STATUSES, PrismaRunAdapter (+10 more)

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.27
Nodes (10): ApiOpenAiErrorResponses(), OpenAiErrorBodyDto, OpenAiErrorResponseDto, ApiProperty, ApiPropertyOptional, OpenAiModelDto, OpenAiModelsListResponseDto, ApiProperty (+2 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (23): ACCOUNT_ACTIVATION_ID_RE, AccountActivationId, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createRunId() (+15 more)

### Community 44 - "openai-chat-completions.controller.ts"
Cohesion: 0.14
Nodes (24): fromGatewayToolCallDto(), ANTHROPIC_INTEGRATION_PATH, OPENAI_INTEGRATION_PATH, OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto (+16 more)

### Community 45 - "configuration-validation.service.ts"
Cohesion: 0.17
Nodes (14): CliValidateOptions, collectInactiveProviderWarnings(), formatZodIssues(), validateGatewayConfig(), ValidationOptions, ValidationResult, assertMasterKeyPresent(), configurationValidation (+6 more)

### Community 46 - "DomainException"
Cohesion: 0.08
Nodes (42): AcceptInviteResult, acceptInviteSchema, ActivateAccountOutput, comparePassword(), generateRefreshToken(), hashPassword(), hashRefreshToken(), parseTtlMs() (+34 more)

### Community 47 - "anthropic-models.controller.ts"
Cohesion: 0.30
Nodes (9): AnthropicErrorBodyDto, AnthropicErrorResponseDto, ApiProperty, AnthropicModelDto, AnthropicModelsListResponseDto, ApiProperty, mapGatewayModelsListToAnthropic(), mapGatewayModelToAnthropic() (+1 more)

### Community 48 - "runs.controller.ts"
Cohesion: 0.04
Nodes (74): CancelRunUseCase, Inject, Injectable, FinalizeReviewUseCase, Inject, Injectable, GetRunLogsOutput, GetRunLogsUseCase (+66 more)

### Community 49 - "auth.api.ts"
Cohesion: 0.06
Nodes (38): geistMono, geistSans, metadata, ACTIVATION_FAILED_HINT, activateAccount(), bootstrapAdmin(), Credentials, fetchBootstrapStatus() (+30 more)

### Community 50 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+2 more)

### Community 51 - "ModelAlias"
Cohesion: 0.07
Nodes (6): ProviderTestOptions, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, AppMetricsBackend

### Community 52 - "types/index.ts"
Cohesion: 0.14
Nodes (26): RequestIdMiddleware, Injectable, CONVERSATION_ID_PATTERN, createRequestId(), isAttemptNumber(), isBaseUrl(), isCacheTtlSeconds(), isConversationId() (+18 more)

### Community 53 - "config-generator.service.ts"
Cohesion: 0.12
Nodes (13): ConfigGeneratorService, Injectable, ConfigPersistenceService, Injectable, FileManagerService, Injectable, WizardRunResult, EnvTemplateInput (+5 more)

### Community 54 - "configure-swagger.ts"
Cohesion: 0.16
Nodes (12): AppModule, Module, bootstrap(), EnvModule, Global, Module, envSchema, parseCorsOrigins() (+4 more)

### Community 55 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.10
Nodes (37): asPromptCacheCreationTokens(), asPromptCacheHitTokens(), ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent(), isAnthropicEffortLevel(), mapThinkingBudgetToAnthropicEffort(), mapThinkingToAnthropic() (+29 more)

### Community 56 - "content.graph.ts"
Cohesion: 0.07
Nodes (46): coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput, pageOutlineOutputSchema, pageOutlineSectionRoleSchema, pageOutlineSectionSchema, readNonEmptyString() (+38 more)

### Community 57 - "domain/company-context.types.ts"
Cohesion: 0.18
Nodes (18): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CompanyContextWriteDetail (+10 more)

### Community 58 - "chat-completions.adapter.ts"
Cohesion: 0.19
Nodes (20): toHttpException(), asSystemFingerprint(), ProviderToolDefinition, ChatCompletionsAdapterOptions, createChatCompletionsAdapter(), textStream(), mapTurnsToOpenAiMessages(), accumulateOpenAiStreamToolCallDeltas() (+12 more)

### Community 59 - "resilient-executor.ts"
Cohesion: 0.17
Nodes (18): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+10 more)

### Community 60 - "GatewayModelsCatalogService"
Cohesion: 0.36
Nodes (4): GatewayModelDto, ApiProperty, GatewayModelsCatalogService, Injectable

### Community 61 - "RunRepository"
Cohesion: 0.05
Nodes (24): AutoFinalizeExpiredReviewsUseCase, Inject, Injectable, InProcessRunWorker, Inject, Injectable, Inject, Inject (+16 more)

### Community 62 - "MetricsController"
Cohesion: 0.18
Nodes (7): MetricsController, ApiOperation, ApiResponse, ApiTags, Controller, Get, Header

### Community 63 - "app-metrics.service.ts"
Cohesion: 0.13
Nodes (15): healthStatusToGaugeValue(), APP_METRICS_BACKEND, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus, HttpMethod (+7 more)

### Community 64 - "api/src/app.module.ts"
Cohesion: 0.06
Nodes (45): AuthModule, Module, CompanyContextModule, Module, ContentPipelineFacade, toOutcome(), Inject, Injectable (+37 more)

### Community 65 - "swagger.setup.ts"
Cohesion: 0.06
Nodes (41): ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString (+33 more)

### Community 66 - "CompanyContext"
Cohesion: 0.29
Nodes (5): CompanyContext, jsonArray(), jsonRecord(), PrismaCompanyContextAdapter, Injectable

### Community 67 - "asProviderInstanceId"
Cohesion: 0.12
Nodes (33): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, collectPendingSecrets(), InitAnswers, convertProvider(), ModelPromptResult (+25 more)

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.12
Nodes (18): OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean (+10 more)

### Community 69 - "HttpExceptionFilter"
Cohesion: 0.20
Nodes (6): ErrorEnvelope, HttpExceptionFilter, Catch, newRequestId(), RequestIdMiddleware, Injectable

### Community 70 - "RedisConnectionService"
Cohesion: 0.15
Nodes (7): RedisConnectionService, Injectable, isRedisRequiredFromConfig(), Inject, Optional, Inject, Optional

### Community 71 - "ChatParamsDto"
Cohesion: 0.20
Nodes (10): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+2 more)

### Community 72 - "llm-hop.ts"
Cohesion: 0.19
Nodes (13): LLM_GATEWAY_PORT, isRetryable(), RetryReason, isAbortError(), ChatJsonInput, hopErrorLogMessage(), hopUserContent(), isHopRetryable() (+5 more)

### Community 73 - "patch-company-context.use-case.ts"
Cohesion: 0.27
Nodes (8): toPublicCompanyContext(), PatchCompanyContextUseCase, Inject, Injectable, assertCompanyContextWritable(), PartialCompanyContext, isComplete(), mergeCompanyContext()

### Community 74 - "OllamaEmbeddingAdapter"
Cohesion: 0.24
Nodes (3): OllamaEmbeddingAdapter, Injectable, EmbeddingBackend

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "company-context.mapper.ts"
Cohesion: 0.15
Nodes (11): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+3 more)

### Community 77 - "api/src/health/health.service.ts"
Cohesion: 0.08
Nodes (28): GATEWAY_PROBE_TIMEOUT_MS, GatewayLivenessBody, GatewayLivenessProbe, GatewayLivenessProbeReason, GatewayLivenessProbeResult, isRecord(), parseGatewayLivenessBody(), probeFailureReason() (+20 more)

### Community 78 - "OpenAiChatMessageDto"
Cohesion: 0.22
Nodes (9): OpenAiChatMessageDto, ApiProperty, ApiPropertyOptional, IsArray, IsIn, IsOptional, IsString, MaxLength (+1 more)

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.06
Nodes (39): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), GatewayChatResponse (+31 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 82 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "openai-chat-message.dto.ts"
Cohesion: 0.60
Nodes (3): isTextContentItem(), normalizeOpenAiContent(), TextContentItem

### Community 85 - "responses.adapter.ts"
Cohesion: 0.26
Nodes (15): asToolCallId(), buildResponsesCreateParams(), createResponsesAdapter(), textStream(), mapGatewayMetadataToOpenAi(), extractResponsesToolCalls(), mapResponsesStopReason(), parseOpenAiResponse() (+7 more)

### Community 86 - "GatewayConfig"
Cohesion: 0.07
Nodes (36): DEFAULT_MODELS, DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, normalizeGatewayConfigForWrite(), defaultModelPolicy(), ModelEditField (+28 more)

### Community 87 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 88 - ".getOne"
Cohesion: 0.19
Nodes (10): ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+2 more)

### Community 89 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 90 - "semantic-cache.constants.ts"
Cohesion: 0.13
Nodes (12): EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema(), EMBEDDING_CIRCUIT_COOLDOWN_MS, EMBEDDING_CIRCUIT_OPEN_AFTER, EMBEDDING_PROBE_TIMEOUT_MS (+4 more)

### Community 91 - "env.validation.ts"
Cohesion: 0.22
Nodes (4): CACHE_BACKEND_TYPE, CACHE_BACKEND_VALUES, validate(), ValidatedEnvironment

### Community 92 - "GatewayKey"
Cohesion: 0.03
Nodes (85): ApiHeader, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags, Body (+77 more)

### Community 93 - "configuration.ts"
Cohesion: 0.16
Nodes (19): asSemanticCacheTtlSeconds(), AppConfiguration, CacheRuntimeConfig, RateLimitRuntimeConfig, RedisRuntimeConfig, SemanticCacheRuntimeConfig, buildAppConfiguration(), buildEffectiveGatewayConfig() (+11 more)

### Community 94 - "create-feedback.use-case.ts"
Cohesion: 0.07
Nodes (29): CreateFeedbackUseCase, Inject, Injectable, agentKeySchema, CreateFeedbackCommand, createFeedbackSchema, FEEDBACK_RUN_READER, FeedbackRunLookup (+21 more)

### Community 95 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 96 - "chat-provider-call.service.ts"
Cohesion: 0.07
Nodes (38): buildAppProviderMetricsContext(), buildLlmMetricsContext(), mapProviderResponseToAiObservation(), mapProviderResponseToUsage(), toMetricsMessages(), buildProviderInputForAlias(), toProviderTurns(), clamp() (+30 more)

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 98 - "start-run-form.tsx"
Cohesion: 0.08
Nodes (40): metadata, GATE_SECTION_LABELS, CompletenessChip(), useCompleteness(), GUEST_ALLOWED_TASK_TYPES, GUEST_CONTACTS, GUEST_QUOTA_CODES, GuestAllowedTaskType (+32 more)

### Community 99 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 100 - "CompanyContextController"
Cohesion: 0.22
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 101 - "save-output-edited.use-case.ts"
Cohesion: 0.09
Nodes (33): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+25 more)

### Community 102 - "filters/http-exception.filter.ts"
Cohesion: 0.21
Nodes (7): DEFAULT_HTTP_STATUS_TO_CODE, GlobalExceptionFilter, isPayloadTooLargeError(), PayloadTooLargeError, RequestWithId, Catch, Injectable

### Community 103 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 104 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 105 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.11
Nodes (17): HealthModule, Module, AiMetricsModule, Global, Module, ObservabilityModule, Global, Module (+9 more)

### Community 106 - "AuthUserContext"
Cohesion: 0.12
Nodes (21): Body, HttpCode, Post, RunsController, ApiCookieAuth, ApiTags, Body, Controller (+13 more)

### Community 107 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 108 - "UserRepository"
Cohesion: 0.06
Nodes (25): Inject, MeUseCase, Inject, Injectable, Inject, AccountActivationRecord, AccountActivationRepository, CreatePendingUser (+17 more)

### Community 110 - "chat.service.ts"
Cohesion: 0.06
Nodes (55): SemanticStoreEmbedState, ChatService, Injectable, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize (+47 more)

### Community 111 - "HealthController"
Cohesion: 0.31
Nodes (6): HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get

### Community 112 - "RefreshSessionRepository"
Cohesion: 0.11
Nodes (8): Inject, Inject, Inject, RefreshSessionRecord, RefreshSessionRepository, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable

### Community 114 - "cn"
Cohesion: 0.07
Nodes (39): FeedbackCta(), AppHeaderProps, AppSidebar(), AppSidebarProps, CompletenessChipSlot(), FeedbackCtaSlot(), FloatingBoxSlot(), APP_NAV (+31 more)

### Community 115 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 117 - "CompanyContextRepository"
Cohesion: 0.21
Nodes (11): GetCompanyContextUseCase, Inject, Injectable, GetCompletenessUseCase, Inject, Injectable, PutCompanyContextUseCase, Inject (+3 more)

### Community 118 - "prisma-invitation.adapter.ts"
Cohesion: 0.17
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 119 - "PrismaService"
Cohesion: 0.11
Nodes (11): Inject, OutputEditedWrite, OutputEditedWriter, applyWrite(), PrismaOutputEditedAdapter, Injectable, PrismaModule, Global (+3 more)

### Community 120 - "should-include-redis-stack.ts"
Cohesion: 0.35
Nodes (10): getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement(), shouldConnectRedis() (+2 more)

### Community 121 - "ConfigInitCommand"
Cohesion: 0.31
Nodes (3): ConfigInitCommand, Command, Option

### Community 122 - "ClientRemoveCommand"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

### Community 123 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 125 - "brand"
Cohesion: 0.17
Nodes (10): brand, unbrand, createAccountActivationId(), createInvitationId(), createRequestId(), createUserId(), isAccountActivationId(), isInvitationId() (+2 more)

### Community 126 - "provider-base-url.validation.ts"
Cohesion: 0.43
Nodes (6): assertEnabledProviderBaseUrlPresent(), collectMissingBaseUrlErrors(), formatMissingBaseUrlError(), MissingProviderBaseUrl, RawGatewayConfig, resolveBaseUrlFromEnv()

### Community 127 - "redis-vector-store.adapter.ts"
Cohesion: 0.30
Nodes (9): isUnservableCachedReply(), CachedChatResponseSchema, ChatWarningSchema, FinishReasonSchema, parseCachedChatResponse(), asString(), ParsedKnnHits, parseKnnHits() (+1 more)

### Community 128 - "anthropic.module.ts"
Cohesion: 0.21
Nodes (10): ChatModule, Module, AnthropicModule, Module, IntegrationsModule, Module, OpenAiModule, Module (+2 more)

### Community 129 - ".getOne"
Cohesion: 0.19
Nodes (11): ApiAnthropicErrorResponses(), AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+3 more)

### Community 130 - ".getOne"
Cohesion: 0.18
Nodes (11): OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+3 more)

### Community 131 - "models.controller.ts"
Cohesion: 0.23
Nodes (8): ApiGatewayModelsErrorResponses(), ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional, GatewayModelCapabilitiesDto, ApiPropertyOptional, ModelsListResponseDto, ApiProperty

### Community 132 - "openai-params-provider.mapper.ts"
Cohesion: 0.24
Nodes (11): mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses(), mapStopSequences(), OpenAiSharedChatCompletionParams, OpenAiSharedResponsesParams (+3 more)

### Community 144 - "health.api.ts"
Cohesion: 0.27
Nodes (11): fetchGatewayAlive(), fetchHealthReady(), HealthCheck, HealthCheckStatus, HealthReadyAggregate, HealthReadyResponse, isGatewayAlive(), isRecord() (+3 more)

### Community 145 - "openai-messages-provider.mapper.ts"
Cohesion: 0.27
Nodes (7): ProviderAssistantTurn, ProviderChatTurn, ProviderToolResultTurn, ChatCompletionMessageParam, mapAssistantTurn(), mapAssistantTurnToResponsesInput(), mapTurnsToResponsesInput()

## Knowledge Gaps
- **426 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+421 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1192 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ModelAlias` connect `ModelAlias` to `chat-provider-call.service.ts`, `GatewayProviderType`, `asClientId`, `api-error.code.ts`, `sentry-ai-metrics.adapter.ts`, `branded.types.ts`, `chat.service.ts`, `PrometheusAppMetricsAdapter`, `semantic-cache.service.ts`, `types/index.ts`, `config-generator.service.ts`, `GatewayConfig`, `AppMetricsService`, `resilient-executor.ts`, `GatewayModelsCatalogService`, `app-metrics.service.ts`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `ModelAlias` to `GatewayProviderType`, `asClientId`, `logging.module.ts`, `branded.types.ts`, `LoggingService`, `PrometheusAppMetricsAdapter`, `AppMetricsService`, `exitWithAgentReport`, `sentry-ai-metrics.adapter.ts`, `types/index.ts`, `config-generator.service.ts`, `GatewayModelsCatalogService`, `app-metrics.service.ts`, `asProviderInstanceId`, `GatewayConfig`, `GatewayKey`, `configuration.ts`, `chat-provider-call.service.ts`, `chat.service.ts`, `provider-base-url.validation.ts`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Why does `isRunId()` connect `ids.ts` to `runs.controller.ts`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _426 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `users.controller.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07357357357357357 - nodes in this community are weakly interconnected._
- **Should `social.types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.056100981767180924 - nodes in this community are weakly interconnected._