import {
  createRunId,
  createConversationId,
  isUserId,
  createUserId,
  isRunStatus,
  isContentLanguage,
  isRunTaskType,
  isUserRole,
} from '@content-chain/shared';
import { toSelectedIdeaIds } from './to-selected-idea-ids';
import { toPipelinePhase } from './to-pipeline-phase';
import type { RunRow } from './prisma-run-row.types';
import type { RunRecordBase } from '../../domain/run.types';
import type { RunReviewFields } from './prisma-run-row.types';

export type RunSnapshotBase = RunRecordBase &
  Pick<
    RunReviewFields,
    | 'startedBy'
    | 'userRating'
    | 'outputEdited'
    | 'reviewFinalizedAt'
    | 'pipelineFinishedAt'
  >;

export const toRunSnapshotBase = (row: RunRow): RunSnapshotBase => {
  if (!isRunTaskType(row.taskType)) {
    throw new Error(`Run.taskType is not a RunTaskType: ${row.taskType}`);
  }
  if (!isContentLanguage(row.language)) {
    throw new Error(`Run.language is not a ContentLanguage: ${row.language}`);
  }
  if (!isRunStatus(row.status)) {
    throw new Error(`Run.status is not a RunStatus: ${row.status}`);
  }

  return {
    id: createRunId(row.id),
    conversationId: createConversationId(row.conversationId),
    language: row.language,
    status: row.status,
    selectedIdeaIds: toSelectedIdeaIds(row.selectedIdeaIds),
    startedByUserId:
      row.startedByUserId && isUserId(row.startedByUserId)
        ? createUserId(row.startedByUserId)
        : null,
    pipelinePhase: toPipelinePhase(row.pipelinePhase),
    ideasRefineCount: row.ideasRefineCount,
    contentRefineCount: row.contentRefineCount,
    outlineRefineCount: row.outlineRefineCount,
    copyRefineCount: row.copyRefineCount,
    recoveryAttempts: row.recoveryAttempts,
    cancelRequested: row.cancelRequested,
    userRating: row.userRating,
    outputEdited: row.outputEdited,
    reviewFinalizedAt: row.reviewFinalizedAt,
    pipelineFinishedAt: row.pipelineFinishedAt,
    createdAt: row.createdAt,
    startedBy:
      row.startedBy === null
        ? null
        : {
            id: row.startedBy.id,
            email: row.startedBy.email,
            role: (() => {
              if (!isUserRole(row.startedBy.role)) {
                throw new Error(
                  `Run.startedBy.role is not a UserRole: ${row.startedBy.role}`,
                );
              }
              return row.startedBy.role;
            })(),
          },
  };
};
