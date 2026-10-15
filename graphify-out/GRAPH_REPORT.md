# Graph Report - content-chain  (2026-10-15)

## Corpus Check
- 704 files · ~240,970 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .css 1)

## Summary
- 4577 nodes · 14068 edges · 140 communities (126 shown, 13 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 419 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b106170d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- DomainException
- get-run.use-case.ts
- api/company-context.types.ts
- chat-completions.adapter.ts
- asProviderInstanceId
- start-run-form.tsx
- provider-error.mapper.ts
- logging.module.ts
- AuthUserContext
- anthropic/anthropic-tools.mapper.ts
- chat.service.ts
- asClientId
- ConfigInitCommand
- cli.module.ts
- ChatMessageDto
- ChatParamsDto
- ai-provider.interface.ts
- app-metrics.service.ts
- archive-runs-view.tsx
- isRecord
- Env
- GatewayKey
- users-view.tsx
- auth.module.ts
- redis-vector-store.adapter.ts
- feedback-form.tsx
- PrometheusAppMetricsAdapter
- wizard-orchestrator.service.ts
- LoggingService
- .getOne
- ai-provider-gateway/src/app.module.ts
- HealthService
- run-review-panel.tsx
- cache.module.ts
- AnthropicMessagesRequestDto
- google-tools.mapper.ts
- runs.types.ts
- enums.ts
- runs-result.types.ts
- llm-hop.ts
- sentry-ai-metrics.adapter.ts
- prisma-run.adapter.ts
- openai-models.controller.ts
- ids.ts
- response-cache.service.ts
- PageDocument
- save-output-edited.use-case.ts
- GuestQuotaPort
- swagger.setup.ts
- anthropic-response.mapper.ts
- ListRunsQueryDto
- ModelAlias
- semantic-cache.module.ts
- provider-registry.service.ts
- content.graph.ts
- config-generator.service.ts
- prisma-invitation.adapter.ts
- domain/company-context.types.ts
- responses.adapter.ts
- branded.types.ts
- metrics.ts
- .info
- RunRepository
- api-error.code.ts
- anthropic-models.controller.ts
- ModelEditCommand
- AppMetricsService
- RedisConnectionService
- OpenAiChatCompletionRequestDto
- .execute
- semantic-cache.constants.ts
- dashboard-shell.tsx
- invite-user.use-case.ts
- openai-params-provider.mapper.ts
- InMemoryRunSseHub
- parse-verifier-log-message.ts
- company-context.mapper.ts
- api/src/health/health.service.ts
- ClientAddCommand
- llm-gateway.http.adapter.ts
- PrometheusService
- cn
- provider-instances.bootstrap.ts
- SPEC — README
- ChatResponseDto
- assert-audience-profile-names-unique.ts
- model-manager.service.ts
- company-context.dto.ts
- ClientRemoveCommand
- ModelAddCommand
- UsersController
- PublicConfigController
- anthropic-messages.controller.ts
- social.graph.ts
- CompanyContextRepository
- StartRunDto
- ProviderEditCommand
- route.ts
- KeyGenerateCommand
- GatewayToolDefinitionDto
- CompanyContextController
- configuration.ts
- GatewayModelDto
- ProviderAddCommand
- openai-messages-provider.mapper.ts
- PrismaService
- api/src/main.ts
- VectorStore
- .getOne
- GatewayNamedToolChoiceFunctionDto
- should-include-redis-stack.ts
- envelope.ts
- openai-thinking-provider.mapper.ts
- ModelRemoveCommand
- ProviderRemoveCommand
- HttpExceptionFilter
- EnvironmentVariables
- company-context.controller.ts
- .getOne
- ErrorEnvelopeDto
- api/src/app.module.ts
- Architektura
- brand
- ClientEditCommand
- health.api.ts
- ai-provider-gateway/src/health/health.service.ts
- openai-chat-completion-response.dto.ts
- GatewayModelsCatalogService
- openai-stream.mapper.ts
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
2. `DomainException` - 83 edges
3. `ProviderInstanceId` - 81 edges
4. `LoggingService` - 73 edges
5. `asProviderInstanceId()` - 67 edges
6. `isRecord()` - 66 edges
7. `GatewayConfig` - 65 edges
8. `cn()` - 65 edges
9. `GatewayKey` - 59 edges
10. `Env` - 59 edges

## Surprising Connections (you probably didn't know these)
- `toChatResponseDto()` --indirect_call--> `toGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/chat/dto/chat-response.dto.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `mapGatewayResponseToAnthropicFormat()` --indirect_call--> `fromGatewayToolCallDto()`  [INFERRED]
  apps/ai-provider-gateway/src/integrations/anthropic/mappers/anthropic-response.mapper.ts → apps/ai-provider-gateway/src/common/dtos/gateway-tool-call.dto.ts
- `RedisCacheAdapter` --implements--> `CacheBackend`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/cache/interfaces/cache-backend-interface.ts
- `RedisCacheAdapter` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-cache.adapter.ts → apps/ai-provider-gateway/src/logging/logging.service.ts
- `RedisConnectionService` --references--> `LoggingService`  [EXTRACTED]
  apps/ai-provider-gateway/src/cache/adapters/redis-cache/redis-connection.service.ts → apps/ai-provider-gateway/src/logging/logging.service.ts

## Import Cycles
- None detected.

## Communities (140 total, 13 thin omitted)

### Community 0 - "DomainException"
Cohesion: 0.05
Nodes (60): AcceptInviteResult, acceptInviteSchema, AcceptInviteUseCase, Injectable, ActivateAccountOutput, ActivateAccountUseCase, Injectable, comparePassword() (+52 more)

### Community 1 - "get-run.use-case.ts"
Cohesion: 0.06
Nodes (28): PageOutline, CompositeRunResultReader, GetRunOutput, orderItemsBySelectedIds(), RunResultReader, ContentBrief, SocialBrief, EmptyRunResultReader (+20 more)

### Community 2 - "api/company-context.types.ts"
Cohesion: 0.05
Nodes (81): metadata, fetchCompleteness(), putCompanyContext(), AudienceProfile, CompanyContext, CompanyContextCaseStudy, CompanyContextExtras, companyContextForPut() (+73 more)

### Community 3 - "chat-completions.adapter.ts"
Cohesion: 0.19
Nodes (20): toHttpException(), asSystemFingerprint(), ProviderToolDefinition, ChatCompletionsAdapterOptions, createChatCompletionsAdapter(), textStream(), mapTurnsToOpenAiMessages(), accumulateOpenAiStreamToolCallDeltas() (+12 more)

### Community 4 - "asProviderInstanceId"
Cohesion: 0.08
Nodes (34): DEFAULT_MODELS, convertProvider(), CliAiProvider, ProviderPromptResult, ProviderManagerService, Injectable, ProviderTestService, Injectable (+26 more)

### Community 5 - "start-run-form.tsx"
Cohesion: 0.09
Nodes (36): metadata, fetchCompanyContext(), GuestLimitModal(), GUEST_ALLOWED_TASK_TYPES, GUEST_CONTACTS, GUEST_QUOTA_CODES, GuestAllowedTaskType, GuestContact (+28 more)

### Community 6 - "provider-error.mapper.ts"
Cohesion: 0.18
Nodes (20): ApiErrorPayload, MappedProviderError, isAuthError(), isClientError(), isInvalidRequestStatus(), isRateLimitStatus(), isServerError(), isTimeoutStatus() (+12 more)

### Community 7 - "logging.module.ts"
Cohesion: 0.06
Nodes (24): ConsoleLoggerAdapter, LEVEL_ORDER, Injectable, NoopErrorReportingAdapter, Injectable, LEVEL_RANK, PinoLoggerAdapter, Injectable (+16 more)

### Community 8 - "AuthUserContext"
Cohesion: 0.10
Nodes (27): Body, HttpCode, Post, CreateFeedbackDto, IsIn, IsOptional, IsString, MaxLength (+19 more)

### Community 9 - "anthropic/anthropic-tools.mapper.ts"
Cohesion: 0.11
Nodes (35): ANTHROPIC_EFFORT_LEVELS, AnthropicEffortLevel, extractAnthropicThinkingContent(), isAnthropicEffortLevel(), mapThinkingBudgetToAnthropicEffort(), mapThinkingToAnthropic(), resolveAnthropicOutputConfig(), ContentBlockParam (+27 more)

### Community 10 - "chat.service.ts"
Cohesion: 0.07
Nodes (39): EMBED_NOT_ATTEMPTED, SemanticLookupResult, SemanticStoreEmbedState, ChatRequestDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize (+31 more)

### Community 11 - "asClientId"
Cohesion: 0.09
Nodes (36): PendingSecretsItem, WIZARD_INIT_STEPS, WIZARD_STEPS, WizardStep, CliAiModelSchema, CliAiProviderSchema, CliRateLimitSchema, convertClient() (+28 more)

### Community 12 - "ConfigInitCommand"
Cohesion: 0.31
Nodes (3): ConfigInitCommand, Command, Option

### Community 13 - "cli.module.ts"
Cohesion: 0.06
Nodes (67): AgentReport, AgentReportStatus, emitAgentReport(), exitCodeForReport(), exitWithAgentReport(), loadAnswers(), assertAgentHasAnswers(), CliMode (+59 more)

### Community 14 - "ChatMessageDto"
Cohesion: 0.08
Nodes (28): ChatMessageDto, ApiProperty, ApiPropertyOptional, IsIn, IsOptional, IsString, MaxLength, Type (+20 more)

### Community 15 - "ChatParamsDto"
Cohesion: 0.12
Nodes (17): ChatParamsDto, ApiPropertyOptional, IsBoolean, IsInt, IsNumber, IsOptional, Max, Min (+9 more)

### Community 16 - "ai-provider.interface.ts"
Cohesion: 0.12
Nodes (38): VectorStorePartition, CachedChatResponse, CachedChatWarning, CachedFinishReason, ChatCacheSource, ChatResponseData, SseMetaPayload, SseMetaPayloadDto (+30 more)

### Community 17 - "app-metrics.service.ts"
Cohesion: 0.18
Nodes (12): healthStatusToGaugeValue(), AppRequestLabels, AppRequestMethod, AppRequestStatus, HealthComponent, HealthMetricsSnapshot, HealthStatus, HttpMethod (+4 more)

### Community 18 - "archive-runs-view.tsx"
Cohesion: 0.06
Nodes (46): metadata, metadata, useSession(), CONTENT_KIND_LABELS, LANGUAGE_LABELS, RUN_PLATFORM_LABELS, RUN_STATUS_LABELS, RUN_STATUS_SHORT_LABELS (+38 more)

### Community 19 - "isRecord"
Cohesion: 0.05
Nodes (63): geistMono, geistSans, metadata, ACTIVATION_FAILED_HINT, activateAccount(), Credentials, fetchBootstrapStatus(), fetchUserSession() (+55 more)

### Community 20 - "Env"
Cohesion: 0.05
Nodes (55): AuthController, ApiCookieAuth, ApiTags, Body, Controller, Get, HttpCode, Patch (+47 more)

### Community 21 - "GatewayKey"
Cohesion: 0.10
Nodes (23): ChatService, Injectable, ChatErrorHandlerService, Injectable, ChatIngressProfile, isProviderRateLimitError(), ClientId, GatewayKey (+15 more)

### Community 22 - "users-view.tsx"
Cohesion: 0.10
Nodes (38): metadata, AccountEmailFormState, GuestLimitModalProps, CancelRunDialogProps, FALLBACK, LogoutDialogProps, deleteUser(), fetchUsers() (+30 more)

### Community 23 - "auth.module.ts"
Cohesion: 0.04
Nodes (50): Inject, BootstrapStatusUseCase, Inject, Injectable, DeleteUserResult, DeleteUserUseCase, Inject, Injectable (+42 more)

### Community 24 - "redis-vector-store.adapter.ts"
Cohesion: 0.16
Nodes (15): RedisVectorStoreAdapter, Injectable, escapeRedisSearchTag(), asString(), parseKnnHits(), isRedisSearchIndexAlreadyExistsError(), isRedisSearchMissingIndexError(), isRedisSearchModuleMissingError() (+7 more)

### Community 25 - "feedback-form.tsx"
Cohesion: 0.15
Nodes (18): createFeedback(), FEEDBACK_AGENT_LABELS, FEEDBACK_TARGET_LABELS, filterFeedbackRunOptions(), CreateFeedbackInput, FEEDBACK_BODY_MAX, FeedbackCreated, feedbackRequestBody() (+10 more)

### Community 26 - "PrometheusAppMetricsAdapter"
Cohesion: 0.12
Nodes (5): PrometheusAppMetricsAdapter, Injectable, AppProviderCallContext, AppProviderStreamScope, AppTokenUsage

### Community 27 - "wizard-orchestrator.service.ts"
Cohesion: 0.08
Nodes (31): isRedisSearchTagSafeId(), REDIS_SEARCH_TAG_ID_FORBIDDEN, REDIS_SEARCH_TAG_ID_MESSAGE, REDIS_SEARCH_TAG_SPECIAL_CHARS, assertInteractiveAllowed(), InitAnswers, CliAiModel, KeyGeneratorService (+23 more)

### Community 28 - "LoggingService"
Cohesion: 0.08
Nodes (16): Inject, OllamaEmbeddingAdapter, Injectable, EmbeddingBackend, embeddingProbeTimeoutMs(), Inject, ChatProviderCooldownService, Injectable (+8 more)

### Community 29 - ".getOne"
Cohesion: 0.19
Nodes (11): ApiGatewayModelsErrorResponses(), ModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags (+3 more)

### Community 30 - "ai-provider-gateway/src/app.module.ts"
Cohesion: 0.05
Nodes (47): ChatModule, Module, resolveClientIdFromKey(), GatewayKeyRuntimeConfig, ResolvedGatewayClient, getAppConfig(), _badRuntimeConfig, GatewayKeyGuard (+39 more)

### Community 31 - "HealthService"
Cohesion: 0.11
Nodes (13): HealthLivenessResponseDto, ApiProperty, HealthReadinessResponseDto, HealthController, ApiOkResponse, ApiOperation, ApiTags, Controller (+5 more)

### Community 32 - "run-review-panel.tsx"
Cohesion: 0.09
Nodes (29): useGuestLocked(), canEditResult(), finalizeRunReview(), isUserRating(), patchRunRating(), saveOutputEdited(), UserRating, isReviewableRunStatus() (+21 more)

### Community 33 - "cache.module.ts"
Cohesion: 0.12
Nodes (13): NoOpCacheBackend, Injectable, NoopCacheModule, Module, CacheModule, CacheModuleOptions, Module, CacheRegistryService (+5 more)

### Community 34 - "AnthropicMessagesRequestDto"
Cohesion: 0.07
Nodes (33): AnthropicContentBlockDto, ApiPropertyOptional, IsIn, IsObject, IsOptional, IsString, MaxLength, AnthropicMessageDto (+25 more)

### Community 35 - "google-tools.mapper.ts"
Cohesion: 0.17
Nodes (21): buildGenerationConfig(), createGoogleProvider(), getFinalToolCalls(), getStopReason(), textStream(), mapStopSequences(), mapThinkingBudgetToGeminiLevel(), extractFromLegacyFields() (+13 more)

### Community 36 - "runs.types.ts"
Cohesion: 0.05
Nodes (72): assertNever(), notifyProduct(), notifyRunCancelled(), notifyRunTerminal(), EnvelopeRef, ProductToast, RunTerminalInput, RunTerminalOutcome (+64 more)

### Community 37 - "enums.ts"
Cohesion: 0.06
Nodes (22): CONTENT_KINDS, CONTENT_LANGUAGES, CONTENT_TASK_TYPES, ContentKind, ContentLanguage, ContentTaskType, FEEDBACK_AGENT_KEYS, FEEDBACK_TARGET_TYPES (+14 more)

### Community 38 - "runs-result.types.ts"
Cohesion: 0.04
Nodes (70): buildOutputEditedBody(), contentPayload(), documentPayload(), ideaPayload(), omitEmptyCta(), outlinePayload(), reelIdeaPayload(), RESULT_KEYS_BY_TASK_TYPE (+62 more)

### Community 39 - "llm-hop.ts"
Cohesion: 0.19
Nodes (13): LLM_GATEWAY_PORT, isRetryable(), RetryReason, isAbortError(), ChatJsonInput, hopErrorLogMessage(), hopUserContent(), isHopRetryable() (+5 more)

### Community 40 - "sentry-ai-metrics.adapter.ts"
Cohesion: 0.10
Nodes (28): CostUsd, ToolCallId, NoopAiMetricsAdapter, Injectable, applyGenAiConversationIdToSpan(), applyGenAiMessagesToSpan(), applyObservationToSpan(), applyRequestMetadataContext() (+20 more)

### Community 41 - "prisma-run.adapter.ts"
Cohesion: 0.05
Nodes (29): contentBriefSchema, hitlSelectedIdeaIdsSchema, pageStartRunSchema, ParsedHitlSelectedIdeaIds, ParsedRunId, ParsedSocialBrief, ParsedStartRunCommand, socialBriefSchema (+21 more)

### Community 42 - "openai-models.controller.ts"
Cohesion: 0.27
Nodes (10): ApiOpenAiErrorResponses(), OpenAiErrorBodyDto, OpenAiErrorResponseDto, ApiProperty, ApiPropertyOptional, OpenAiModelDto, OpenAiModelsListResponseDto, ApiProperty (+2 more)

### Community 43 - "ids.ts"
Cohesion: 0.10
Nodes (23): ACCOUNT_ACTIVATION_ID_RE, AccountActivationId, CONV_ID_RE, ConversationId, createConversationId(), createFeedbackId(), createGatewayModelAlias(), createRunId() (+15 more)

### Community 44 - "response-cache.service.ts"
Cohesion: 0.11
Nodes (22): computeSystemSignature(), hashCallParams(), serializeCallParamsForCache(), isUnservableCachedReply(), ResponseCacheService, Injectable, CachedChatResponseSchema, ChatWarningSchema (+14 more)

### Community 45 - "PageDocument"
Cohesion: 0.10
Nodes (13): ContentPipelineState, PageDocument, VerifierVerdict, PrismaContentResultAdapter, toContentPipelinePhase(), Injectable, Inject, OutputEditedWrite (+5 more)

### Community 46 - "save-output-edited.use-case.ts"
Cohesion: 0.13
Nodes (22): pageDocumentOutputSchema, contentsArraySchema, editedContentItemSchema, editedContentSchema, editedPageDocumentSchema, editedPageOutlineSchema, editedReelScriptItemSchema, ideaPersistedSchema (+14 more)

### Community 47 - "GuestQuotaPort"
Cohesion: 0.10
Nodes (16): isGuestTaskType(), GUEST_QUOTA, GuestQuotaAdmitResult, GuestQuotaPort, GuestQuotaModule, Module, createRedis(), IoredisGuestQuotaAdapter (+8 more)

### Community 48 - "swagger.setup.ts"
Cohesion: 0.12
Nodes (19): AppModule, Module, SseDeltaPayloadDto, ApiProperty, bootstrap(), API_GLOBAL_PREFIX, PORT, setupApp() (+11 more)

### Community 49 - "anthropic-response.mapper.ts"
Cohesion: 0.15
Nodes (23): asMessageId(), MessageId, AnthropicContentBlock, AnthropicContentBlockDto, AnthropicMessagesResponseDto, AnthropicMessagesUsageDto, AnthropicTextContentBlockDto, AnthropicThinkingContentBlockDto (+15 more)

### Community 50 - "ListRunsQueryDto"
Cohesion: 0.17
Nodes (10): ListRunsQueryDto, IsArray, IsIn, IsInt, IsOptional, IsString, Min, Transform (+2 more)

### Community 51 - "ModelAlias"
Cohesion: 0.06
Nodes (6): ProviderTestOptions, ModelAlias, ProviderInstanceId, NoopAppMetricsAdapter, Injectable, AppMetricsBackend

### Community 52 - "semantic-cache.module.ts"
Cohesion: 0.28
Nodes (7): SemanticCacheModule, Module, EMBEDDING_BACKEND, VECTOR_STORE, AppMetricsModule, Global, Module

### Community 53 - "provider-registry.service.ts"
Cohesion: 0.12
Nodes (15): CompleteOnceResult, ChatValidationService, Injectable, UnsupportedProviderException, ModelId, GatewayCapabilitiesConfig, GatewayModelConfig, GatewayParamsConfig (+7 more)

### Community 54 - "content.graph.ts"
Cohesion: 0.08
Nodes (49): ContentPipelineFacade, Inject, Injectable, Inject, coerceVerifierIssue(), isPlainRecord(), PageDocumentOutput, PageOutlineOutput (+41 more)

### Community 55 - "config-generator.service.ts"
Cohesion: 0.10
Nodes (18): WizardState, ConfigGeneratorService, Injectable, FileManagerService, Injectable, Injectable, WizardOrchestratorService, WizardRunResult (+10 more)

### Community 56 - "prisma-invitation.adapter.ts"
Cohesion: 0.17
Nodes (15): AcceptInviteAndCreateUserInput, AcceptInviteAndCreateUserResult, CreateInvitationInput, CreatePendingResult, InvitationListRecord, InvitationPurpose, InvitationRecord, InvitationStatus (+7 more)

### Community 57 - "domain/company-context.types.ts"
Cohesion: 0.15
Nodes (21): COMPANY_CONTEXT_SINGLETON_ID, GATE_SECTIONS, GateSection, AudienceProfile, CompanyContextCaseStudy, CompanyContextExtras, CompanyContextObjection, CompanyContextWriteDetail (+13 more)

### Community 58 - "responses.adapter.ts"
Cohesion: 0.26
Nodes (15): asToolCallId(), buildResponsesCreateParams(), createResponsesAdapter(), textStream(), mapGatewayMetadataToOpenAi(), extractResponsesToolCalls(), mapResponsesStopReason(), parseOpenAiResponse() (+7 more)

### Community 59 - "branded.types.ts"
Cohesion: 0.07
Nodes (51): buildRetryPolicyFromResolved(), ModelRetrySource, resolveMaxAttempts(), resolveTimeoutMs(), assertNoFallbackCycle(), isRetryableHttpError(), AttemptResult, ResilientExecutionOptions (+43 more)

### Community 60 - "metrics.ts"
Cohesion: 0.12
Nodes (26): getClientConversationId(), getOrCreateConversationIdForResponse(), buildAppProviderMetricsContext(), buildLlmMetricsContext(), mapProviderResponseToAiObservation(), mapProviderResponseToUsage(), toMetricsMessages(), buildProviderInputForAlias() (+18 more)

### Community 61 - ".info"
Cohesion: 0.18
Nodes (7): toSafeClientList(), toSafeConfigSnapshot(), toSafeModelList(), toSafeProviderList(), ProviderTestCommand, Command, Option

### Community 62 - "RunRepository"
Cohesion: 0.03
Nodes (76): AutoFinalizeExpiredReviewsUseCase, Inject, Injectable, CancelRunUseCase, Inject, Injectable, FinalizeReviewUseCase, Inject (+68 more)

### Community 63 - "api-error.code.ts"
Cohesion: 0.09
Nodes (26): ChatToolingDto, IsArray, Type, ValidateNested, ApiErrorCode, DEFAULT_HTTP_STATUS_TO_CODE, GlobalExceptionFilter, isPayloadTooLargeError() (+18 more)

### Community 64 - "anthropic-models.controller.ts"
Cohesion: 0.22
Nodes (12): ApiAnthropicErrorResponses(), AnthropicErrorBodyDto, AnthropicErrorResponseDto, ApiProperty, AnthropicModelDto, AnthropicModelsListResponseDto, ApiProperty, mapGatewayModelsListToAnthropic() (+4 more)

### Community 65 - "ModelEditCommand"
Cohesion: 0.39
Nodes (3): ModelEditCommand, Command, Option

### Community 66 - "AppMetricsService"
Cohesion: 0.06
Nodes (19): HttpMetricsMiddleware, Injectable, Inject, Optional, resolveAppMetricsBackend(), AppMetricsService, Inject, Injectable (+11 more)

### Community 67 - "RedisConnectionService"
Cohesion: 0.16
Nodes (7): RedisCacheAdapter, Injectable, RedisCacheModule, Module, RedisConnectionService, Injectable, isRedisRequiredFromConfig()

### Community 68 - "OpenAiChatCompletionRequestDto"
Cohesion: 0.07
Nodes (31): IsStringOrArrayOfStrings(), OpenAiChatCompletionRequestDto, OpenAiStreamOptionsDto, ApiProperty, ApiPropertyOptional, ArrayMaxSize, ArrayMinSize, IsArray (+23 more)

### Community 69 - ".execute"
Cohesion: 0.16
Nodes (14): isContentStartCommand(), isPlainRecord(), omitUndefinedDeep(), makeContentRun(), makeSocialRun(), makeSocialSnapshot(), SocialRunSnapshot, ErrorEnvelope (+6 more)

### Community 70 - "semantic-cache.constants.ts"
Cohesion: 0.14
Nodes (11): EmbeddingCircuitBreaker, normalizeEmbeddingModelForIndex(), semanticIndexName(), SemanticIndexNameOptions, canonicalSemanticSchema(), EMBEDDING_CIRCUIT_COOLDOWN_MS, EMBEDDING_CIRCUIT_OPEN_AFTER, EMBEDDING_PROBE_TIMEOUT_MS (+3 more)

### Community 71 - "dashboard-shell.tsx"
Cohesion: 0.07
Nodes (35): CompletenessChip(), useCompleteness(), DemoChip(), DemoModeContext, DemoModeContextValue, DemoModeProvider(), DemoModeState, FALLBACK_ENVELOPE (+27 more)

### Community 72 - "invite-user.use-case.ts"
Cohesion: 0.04
Nodes (48): Inject, InviteUserResult, inviteUserSchema, InviteUserUseCase, Inject, Injectable, InvitationListItem, ListInvitationsUseCase (+40 more)

### Community 73 - "openai-params-provider.mapper.ts"
Cohesion: 0.24
Nodes (11): mapCallOptionsToChatCompletionParams(), mapCallOptionsToResponsesParams(), mapMaxOutputTokensForChatCompletions(), mapResponseFormatToChatCompletion(), mapResponseFormatToResponses(), mapStopSequences(), OpenAiSharedChatCompletionParams, OpenAiSharedResponsesParams (+3 more)

### Community 74 - "InMemoryRunSseHub"
Cohesion: 0.29
Nodes (4): RunSseEvent, InMemoryRunSseHub, Inject, Injectable

### Community 75 - "parse-verifier-log-message.ts"
Cohesion: 0.19
Nodes (12): isStringArray(), parseStringArrayAt(), parseVerifierIssuesSuffix(), parseVerifierLogMessage(), PlainLog, RunLogMessageView, scanJsonArrayEnd(), TEMPLATES (+4 more)

### Community 76 - "company-context.mapper.ts"
Cohesion: 0.15
Nodes (11): toCompanyContext(), toPartialCompanyContext(), companyContextCaseStudySchema, companyContextExtrasInputSchema, CompanyContextExtrasParsed, companyContextExtrasSchema, companyContextObjectionSchema, Body (+3 more)

### Community 77 - "api/src/health/health.service.ts"
Cohesion: 0.08
Nodes (28): GATEWAY_PROBE_TIMEOUT_MS, GatewayLivenessBody, GatewayLivenessProbe, GatewayLivenessProbeReason, GatewayLivenessProbeResult, isRecord(), parseGatewayLivenessBody(), probeFailureReason() (+20 more)

### Community 78 - "ClientAddCommand"
Cohesion: 0.39
Nodes (3): ClientAddCommand, Command, Option

### Community 79 - "llm-gateway.http.adapter.ts"
Cohesion: 0.06
Nodes (39): buildGatewayChatErrorLog(), buildGatewayChatRequestLog(), buildGatewayChatResponseLog(), GatewayChatErrorLog, GatewayChatRequestLog, GatewayChatResponseLog, redactGatewaySecret(), GatewayChatResponse (+31 more)

### Community 80 - "PrometheusService"
Cohesion: 0.21
Nodes (3): PrometheusService, Injectable, PrometheusMetrics

### Community 81 - "cn"
Cohesion: 0.08
Nodes (33): AppHeader(), AppHeaderProps, AppSidebar(), AppSidebarProps, CompletenessChipSlot(), APP_NAV, AppNavItem, navItemsForRole() (+25 more)

### Community 82 - "provider-instances.bootstrap.ts"
Cohesion: 0.27
Nodes (10): GatewayProviderInstanceConfig, assertOpenAiProviderType(), adaptApiKeyProviderFactory(), createOpenAiCompatibleProviderInstance(), createOpenAiProviderCore(), createOpenAiProvider(), ApiKeyProviderFactoryFn, ProviderFactoryFn (+2 more)

### Community 83 - "SPEC — README"
Cohesion: 0.15
Nodes (13): SPEC — Auth, SPEC — Bezpieczeństwo i self-host ops, SPEC — Content (BC), SPEC — Feedback (opinie tekstowe), SPEC — Frontend, SPEC — Komunikacja (HTTP / SSE / gateway), SPEC — Kontekst firmy, SPEC — Monorepo (+5 more)

### Community 84 - "ChatResponseDto"
Cohesion: 0.17
Nodes (10): ChatOutputTextDto, ApiProperty, ChatResponseDto, ChatUsageDetailsDto, ApiProperty, ApiPropertyOptional, IsOptional, IsString (+2 more)

### Community 85 - "assert-audience-profile-names-unique.ts"
Cohesion: 0.60
Nodes (3): assertAudienceProfileNamesUnique(), normalizeAudienceName(), withEffectiveAudience()

### Community 86 - "model-manager.service.ts"
Cohesion: 0.10
Nodes (28): DEFAULT_MODEL_ALLOW_OVERRIDES, getRecommendedMaxOutputTokens(), isThinkingCapableModel(), THINKING_CAPABLE_MODEL_PATTERNS, convertModel(), ConfigPersistenceService, Injectable, defaultModelPolicy() (+20 more)

### Community 87 - "company-context.dto.ts"
Cohesion: 0.26
Nodes (20): AudienceDto, AudienceProfileDto, CtaDto, CtaItemDto, IdentityDto, OfferDto, OfferItemDto, PatchCompanyContextDto (+12 more)

### Community 88 - "ClientRemoveCommand"
Cohesion: 0.39
Nodes (3): ClientRemoveCommand, Command, Option

### Community 89 - "ModelAddCommand"
Cohesion: 0.39
Nodes (3): ModelAddCommand, Command, Option

### Community 90 - "UsersController"
Cohesion: 0.12
Nodes (15): PatchUserDto, ApiProperty, IsBoolean, ApiCookieAuth, ApiTags, Body, Controller, Delete (+7 more)

### Community 91 - "PublicConfigController"
Cohesion: 0.22
Nodes (7): PublicConfigController, ApiOkResponse, ApiOperation, ApiTags, Controller, Get, Inject

### Community 92 - "anthropic-messages.controller.ts"
Cohesion: 0.04
Nodes (60): ApiHeader, GATEWAY_CACHE_HEADER, ChatController, ApiBody, ApiOperation, ApiResponse, ApiSecurity, ApiTags (+52 more)

### Community 93 - "social.graph.ts"
Cohesion: 0.08
Nodes (47): loadPromptFromDir(), coercePassNoteVerdict(), isPassOnlyIssue(), coerceVerifierIssue(), ContentOutput, IdeasOutput, ideasOutputSchema, isPlainRecord() (+39 more)

### Community 94 - "CompanyContextRepository"
Cohesion: 0.13
Nodes (10): Inject, Inject, Inject, Inject, CompanyContextRepository, CompanyContext, jsonArray(), jsonRecord() (+2 more)

### Community 95 - "StartRunDto"
Cohesion: 0.21
Nodes (11): RunBriefDto, StartRunDto, ApiProperty, IsArray, IsIn, IsInt, IsOptional, IsString (+3 more)

### Community 96 - "ProviderEditCommand"
Cohesion: 0.39
Nodes (3): ProviderEditCommand, Command, Option

### Community 97 - "route.ts"
Cohesion: 0.14
Nodes (16): DELETE, dynamic, GET, handle(), HEAD, OPTIONS, PATCH, POST (+8 more)

### Community 98 - "KeyGenerateCommand"
Cohesion: 0.27
Nodes (3): KeyGenerateCommand, Command, Option

### Community 99 - "GatewayToolDefinitionDto"
Cohesion: 0.29
Nodes (6): GatewayToolDefinitionDto, ApiProperty, ApiPropertyOptional, IsObject, IsOptional, IsString

### Community 100 - "CompanyContextController"
Cohesion: 0.22
Nodes (6): CompanyContextController, ApiCookieAuth, ApiOkResponse, ApiTags, Controller, Get

### Community 101 - "configuration.ts"
Cohesion: 0.07
Nodes (45): collectPendingSecrets(), CliValidateOptions, normalizeGatewayConfigForWrite(), ValidationFormatter, asPort(), asSemanticCacheTtlSeconds(), collectInactiveProviderWarnings(), formatZodIssues() (+37 more)

### Community 102 - "GatewayModelDto"
Cohesion: 0.36
Nodes (6): GatewayModelCapabilitiesDto, GatewayModelDto, ApiProperty, ApiPropertyOptional, ModelsListResponseDto, ApiProperty

### Community 103 - "ProviderAddCommand"
Cohesion: 0.36
Nodes (3): ProviderAddCommand, Command, Option

### Community 104 - "openai-messages-provider.mapper.ts"
Cohesion: 0.28
Nodes (6): ProviderAssistantTurn, ProviderToolResultTurn, ChatCompletionMessageParam, mapAssistantTurn(), mapAssistantTurnToResponsesInput(), mapTurnsToResponsesInput()

### Community 105 - "PrismaService"
Cohesion: 0.04
Nodes (44): RefreshSessionRecord, RotateRefreshSessionResult, PrismaRefreshSessionAdapter, Injectable, CreateFeedbackUseCase, Inject, Injectable, agentKeySchema (+36 more)

### Community 106 - "api/src/main.ts"
Cohesion: 0.33
Nodes (6): AppModule, Module, bootstrap(), parseCorsOrigins(), configureHttpApp(), buildSwaggerConfig()

### Community 108 - ".getOne"
Cohesion: 0.19
Nodes (10): AnthropicModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+2 more)

### Community 109 - "GatewayNamedToolChoiceFunctionDto"
Cohesion: 0.50
Nodes (5): GatewayNamedToolChoiceDto, GatewayNamedToolChoiceFunctionDto, ApiPropertyOptional, IsOptional, IsString

### Community 110 - "should-include-redis-stack.ts"
Cohesion: 0.18
Nodes (12): CACHE_BACKEND_TYPE, getRedisConsumers(), getRedisConsumersFromConfig(), isRedisRequired(), isRedisRequiredFromEnv(), isSemanticCacheEnabledFromEnv(), RedisRequirementSnapshot, resolveCacheForRequirement() (+4 more)

### Community 111 - "envelope.ts"
Cohesion: 0.08
Nodes (45): AcceptInvitePage(), metadata, tokenFromSearchParam(), ACCEPT_INVITE_DEMO_HINT, ACCEPT_INVITE_UNAUTHORIZED_HINT, AcceptInviteFormError, toAcceptInviteFormError(), acceptInvite() (+37 more)

### Community 112 - "openai-thinking-provider.mapper.ts"
Cohesion: 0.23
Nodes (13): buildGenerationWarnings(), OPENAI_RESPONSES_UNSUPPORTED_PARAMS, asWarningCode(), ChatCompletionThinkingParam, isOpenAiEffortLevel(), isOpenAiReasoningRequested(), mapThinkingBudgetToEffort(), mapThinkingToResponsesReasoning() (+5 more)

### Community 113 - "ModelRemoveCommand"
Cohesion: 0.39
Nodes (3): ModelRemoveCommand, Command, Option

### Community 114 - "ProviderRemoveCommand"
Cohesion: 0.39
Nodes (3): ProviderRemoveCommand, Command, Option

### Community 116 - "EnvironmentVariables"
Cohesion: 0.18
Nodes (11): EnvironmentVariables, IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, Max (+3 more)

### Community 117 - "company-context.controller.ts"
Cohesion: 0.22
Nodes (14): toPublicCompanyContext(), GetCompanyContextUseCase, Injectable, GetCompletenessUseCase, Injectable, PatchCompanyContextUseCase, Injectable, PutCompanyContextUseCase (+6 more)

### Community 118 - ".getOne"
Cohesion: 0.19
Nodes (10): OpenAiModelsController, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, Controller (+2 more)

### Community 119 - "ErrorEnvelopeDto"
Cohesion: 0.50
Nodes (3): ErrorEnvelopeDto, ApiProperty, ApiPropertyOptional

### Community 122 - "api/src/app.module.ts"
Cohesion: 0.06
Nodes (49): AuthModule, Module, CompanyContextModule, Module, toOutcome(), ContentRunExecutor, isCanonicalOutlineSelection(), isMissingContentKind() (+41 more)

### Community 124 - "Architektura"
Cohesion: 0.67
Nodes (3): Architektura, Architektura katalogów i plików, Dokumentacja komunikacji

### Community 125 - "brand"
Cohesion: 0.17
Nodes (10): brand, unbrand, createAccountActivationId(), createInvitationId(), createRequestId(), createUserId(), isAccountActivationId(), isInvitationId() (+2 more)

### Community 126 - "ClientEditCommand"
Cohesion: 0.39
Nodes (3): ClientEditCommand, Command, Option

### Community 127 - "health.api.ts"
Cohesion: 0.30
Nodes (10): fetchGatewayAlive(), fetchHealthReady(), HealthCheck, HealthCheckStatus, HealthReadyAggregate, HealthReadyResponse, isGatewayAlive(), isRecord() (+2 more)

### Community 128 - "ai-provider-gateway/src/health/health.service.ts"
Cohesion: 0.24
Nodes (11): RedisConsumer, HealthCheckItemDto, ApiProperty, HealthReadinessChecksDto, ApiProperty, ApiPropertyOptional, HealthRedisCheckItemDto, ApiProperty (+3 more)

### Community 129 - "openai-chat-completion-response.dto.ts"
Cohesion: 0.39
Nodes (8): OpenAiChatCompletionChoiceDto, OpenAiChatCompletionMessageDto, OpenAiChatCompletionResponseDto, OpenAiChatCompletionUsageDto, OpenAiToolCallDto, OpenAiToolCallFunctionDto, ApiProperty, ApiPropertyOptional

### Community 131 - "openai-stream.mapper.ts"
Cohesion: 0.28
Nodes (13): SseDoneEvent, fromGatewayToolCallDto(), mapChatResponseToOpenAi(), mapFinishReasontoOpenAI(), mapGatewayToolCallsToOpenAi(), mapSystemFingerprintToOpenAi(), toOpenAiCompletionId(), baseChunkFields() (+5 more)

## Knowledge Gaps
- **468 isolated node(s):** `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema`, `CachedChatResponseSchema`, `REDIS_SEARCH_TAG_SPECIAL_CHARS` (+463 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1247 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ModelAlias` connect `ModelAlias` to `GatewayModelsCatalogService`, `AppMetricsService`, `asProviderInstanceId`, `wizard-orchestrator.service.ts`, `sentry-ai-metrics.adapter.ts`, `chat.service.ts`, `asClientId`, `response-cache.service.ts`, `ai-provider.interface.ts`, `app-metrics.service.ts`, `provider-registry.service.ts`, `model-manager.service.ts`, `config-generator.service.ts`, `PrometheusAppMetricsAdapter`, `branded.types.ts`, `metrics.ts`, `api-error.code.ts`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **Why does `ProviderInstanceId` connect `ModelAlias` to `GatewayModelsCatalogService`, `asProviderInstanceId`, `logging.module.ts`, `asClientId`, `cli.module.ts`, `ai-provider.interface.ts`, `app-metrics.service.ts`, `GatewayKey`, `PrometheusAppMetricsAdapter`, `wizard-orchestrator.service.ts`, `LoggingService`, `ai-provider-gateway/src/app.module.ts`, `sentry-ai-metrics.adapter.ts`, `provider-registry.service.ts`, `config-generator.service.ts`, `branded.types.ts`, `metrics.ts`, `.info`, `api-error.code.ts`, `AppMetricsService`, `model-manager.service.ts`, `configuration.ts`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Why does `LoggingService` connect `LoggingService` to `ai-provider-gateway/src/health/health.service.ts`, `chat-completions.adapter.ts`, `logging.module.ts`, `anthropic/anthropic-tools.mapper.ts`, `chat.service.ts`, `ai-provider.interface.ts`, `GatewayKey`, `redis-vector-store.adapter.ts`, `ai-provider-gateway/src/app.module.ts`, `HealthService`, `cache.module.ts`, `google-tools.mapper.ts`, `response-cache.service.ts`, `swagger.setup.ts`, `provider-registry.service.ts`, `responses.adapter.ts`, `branded.types.ts`, `api-error.code.ts`, `AppMetricsService`, `RedisConnectionService`, `provider-instances.bootstrap.ts`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `asProviderInstanceId()` (e.g. with `cached-chat-response.schema.ts` and `gateway-config.schema.ts`) actually correct?**
  _`asProviderInstanceId()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CacheModuleOptions`, `ChatWarningSchema`, `FinishReasonSchema` to the rest of the system?**
  _468 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `DomainException` be split into smaller, more focused modules?**
  _Cohesion score 0.04811353409484251 - nodes in this community are weakly interconnected._
- **Should `get-run.use-case.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05621500559910415 - nodes in this community are weakly interconnected._