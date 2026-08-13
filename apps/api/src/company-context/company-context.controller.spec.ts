import { Test, type TestingModule } from '@nestjs/testing';
import { CompanyContextController } from './company-context.controller';

describe('CompanyContextController', () => {
  let controller: CompanyContextController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyContextController],
    }).compile();

    controller = module.get<CompanyContextController>(CompanyContextController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
