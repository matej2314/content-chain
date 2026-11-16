import { Test } from '@nestjs/testing';
import { WorkerAppModule } from './worker-app.module';

describe('WorkerAppModule', () => {
  it('boots an application context without HTTP server', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [WorkerAppModule],
    }).compile();
    await moduleRef.init();
    expect(moduleRef).toBeDefined();
    await moduleRef.close();
  });
});
