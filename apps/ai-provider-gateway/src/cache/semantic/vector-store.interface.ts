import type { CachedChatResponse } from '../types/cached-chat-response.type';
import type {
  ClientId,
  ConversationId,
  ModelAlias,
  SemanticCacheTtlSeconds,
} from '../../common/types/branded.types';

export type VectorSearchHit = {
  similarity: number;
  reply: CachedChatResponse;
};

export type VectorStoreProbeResult = {
  available: boolean;
  message: string;
};

/** TAG / HASH partition shared by KNN, HASH identity, and upsert. */
export interface VectorStorePartition {
  modelAlias: ModelAlias;
  clientId: ClientId;
  conversationId: ConversationId;
  systemSignature: string;
  callParams: string;
}

export interface VectorStoreKnnInput extends VectorStorePartition {
  vector: number[];
  k: number;
}

export interface VectorStoreUpsertInput extends VectorStorePartition {
  vector: number[];
  text: string;
  reply: CachedChatResponse;
  ttlSeconds: SemanticCacheTtlSeconds;
}

export interface VectorStoreTextIdentityInput extends VectorStorePartition {
  text: string;
}

export interface VectorStore {
  /** Idempotent: create index if missing; fail-open when Redis is down. */
  ensureIndex(): Promise<void>;
  /** Readiness probe for Redis Search + configured index (fail-open). */
  probeIndex(): Promise<VectorStoreProbeResult>;
  getByTextIdentity(
    input: VectorStoreTextIdentityInput,
  ): Promise<CachedChatResponse | null>;
  knn(input: VectorStoreKnnInput): Promise<VectorSearchHit[]>;
  upsert(input: VectorStoreUpsertInput): Promise<void>;
}
