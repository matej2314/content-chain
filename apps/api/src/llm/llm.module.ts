import { Module } from '@nestjs/common';
import { LlmGatewayHttpAdapter } from './llm-gateway.http.adapter';
import { LLM_GATEWAY_PORT } from './llm.tokens';

@Module({
  providers: [{ provide: LLM_GATEWAY_PORT, useClass: LlmGatewayHttpAdapter }],
  exports: [LLM_GATEWAY_PORT],
})
export class LlmModule {}
