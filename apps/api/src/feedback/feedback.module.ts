import { Module } from '@nestjs/common';
import { FeedbackController } from './feedback.controller';
import { CreateFeedbackUseCase } from './application/create-feedback.use-case';
import { PrismaFeedbackAdapter } from './infrastructure/prisma-feedback.adapter';
import { PrismaFeedbackRunReaderAdapter } from './infrastructure/prisma.feedback-run-reader.adapter';
import { FEEDBACK_REPOSITORY } from './domain/feedback.types';
import { FEEDBACK_RUN_READER } from './domain/feedback-run.reader.port';
import { PrismaModule } from '../shared/persistence/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FeedbackController],
  providers: [
    CreateFeedbackUseCase,
    PrismaFeedbackAdapter,
    PrismaFeedbackRunReaderAdapter,
    { provide: FEEDBACK_REPOSITORY, useExisting: PrismaFeedbackAdapter },
    {
      provide: FEEDBACK_RUN_READER,
      useExisting: PrismaFeedbackRunReaderAdapter,
    },
  ],
})
export class FeedbackModule {}
