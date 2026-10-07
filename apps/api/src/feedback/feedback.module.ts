import { Module } from '@nestjs/common';
import { FeedbackController } from './feedback.controller';
import { CreateFeedbackUseCase } from './application/create-feedback.use-case';
import { PrismaFeedbackAdapter } from './infrastructure/prisma-feedback.adapter';
import { PrismaFeedbackRunReaderAdapter } from './infrastructure/prisma.feedback-run-reader.adapter';
import { PrismaFeedbackPurgeAdapter } from './infrastructure/prisma-feedback-purge.adapter';
import { FEEDBACK_REPOSITORY } from './domain/feedback.types';
import { FEEDBACK_RUN_READER } from './domain/feedback-run.reader.port';
import { FEEDBACK_PURGE } from './domain/feedback-purge.port';
import { PrismaModule } from '../shared/persistence/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FeedbackController],
  providers: [
    CreateFeedbackUseCase,
    PrismaFeedbackAdapter,
    PrismaFeedbackRunReaderAdapter,
    PrismaFeedbackPurgeAdapter,
    { provide: FEEDBACK_REPOSITORY, useExisting: PrismaFeedbackAdapter },
    { provide: FEEDBACK_PURGE, useExisting: PrismaFeedbackPurgeAdapter },
    {
      provide: FEEDBACK_RUN_READER,
      useExisting: PrismaFeedbackRunReaderAdapter,
    },
  ],
  exports: [FEEDBACK_PURGE],
})
export class FeedbackModule {}
