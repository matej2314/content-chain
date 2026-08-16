import { Controller, Body, Get, Patch, Put } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetCompanyContextUseCase } from './application/get-company-context.use-case';
import { GetCompletenessUseCase } from './application/get-completeness.use-case';
import { PatchCompanyContextUseCase } from './application/patch-company-context.use-case';
import { PutCompanyContextUseCase } from './application/put-company-context.use-case';
import {
  toCompanyContext,
  toPartialCompanyContext,
} from './application/company-context.mapper';
import {
  PatchCompanyContextDto,
  PutCompanyContextDto,
} from './http/dto/company-context.dto';

@ApiTags('company-context')
@Controller('company-context')
export class CompanyContextController {
  constructor(
    private readonly getContext: GetCompanyContextUseCase,
    private readonly getCompleteness: GetCompletenessUseCase,
    private readonly patchContext: PatchCompanyContextUseCase,
    private readonly putContext: PutCompanyContextUseCase,
  ) {}

  @Get('completeness')
  completeness() {
    return this.getCompleteness.execute();
  }

  @Get()
  @ApiOkResponse({ description: 'Canonical company context + completeness' })
  get() {
    return this.getContext.execute();
  }

  @Put()
  put(@Body() body: PutCompanyContextDto) {
    return this.putContext.execute(toCompanyContext(body));
  }

  @Patch()
  patch(@Body() body: PatchCompanyContextDto) {
    return this.patchContext.execute(toPartialCompanyContext(body));
  }
}
