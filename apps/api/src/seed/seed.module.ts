import { Module } from '@nestjs/common';
import { CompanyContextModule } from '../company-context/company-context.module';
import { SeedService } from './seed.service';

@Module({
  imports: [CompanyContextModule],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
