import { createGatewayModelAlias } from '@content-chain/shared';
import { Test } from '@nestjs/testing';
import {
  LLM_GATEWAY_PORT,
  LlmModule,
  type LlmGatewayPort,
} from '@content-chain/run-pipelines';
import { ENV, validateWorkerEnv } from '@content-chain/runs-kernel';
import { newConversationId } from '../src/shared/http/new-ids';

const enabled = process.env.SMOKE_GATEWAY === '1';

(enabled ? describe : describe.skip)('smoke worker LLM → gateway', () => {
  it('completes native chat through LlmGatewayPort', async () => {
    const env = validateWorkerEnv(process.env);
    const moduleRef = await Test.createTestingModule({
      imports: [LlmModule],
      providers: [{ provide: ENV, useValue: env }],
    }).compile();
    const port = moduleRef.get<LlmGatewayPort>(LLM_GATEWAY_PORT);
    const result = await port.chat({
      modelAlias: createGatewayModelAlias(
        process.env.GATEWAY_MODEL_ALIAS ?? 'chat-default',
      ),
      conversationId: newConversationId(),
      messages: [{ role: 'user', content: 'Reply with the single word pong.' }],
    });
    expect(result.text.length).toBeGreaterThan(0);
    expect(result.requestId.startsWith('req_')).toBe(true);
    expect(JSON.stringify(result)).not.toMatch(/X-Gateway-Key|GATEWAY_KEY/i);
    await moduleRef.close();
  });
});
