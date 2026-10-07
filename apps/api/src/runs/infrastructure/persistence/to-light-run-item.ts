import {
  createRunId,
  isContentLanguage,
  isRunPlatform,
  isRunStatus,
  isRunTaskType,
} from '@content-chain/shared';
import type { LightRunItem } from '../../domain/run.port';

export type LightRunRow = {
  id: string;
  taskType: string;
  platform: string;
  language: string;
  status: string;
  createdAt: Date;
};

export function toLightRunItem(row: LightRunRow): LightRunItem {
  if (!isRunTaskType(row.taskType)) {
    throw new Error(`Run taskType is not a RunTaskType: ${row.taskType}`);
  }
  if (!isRunPlatform(row.platform)) {
    throw new Error(`Run platform is not a RunPlatform: ${row.platform}`);
  }
  if (!isContentLanguage(row.language)) {
    throw new Error(`Run language is not a ContentLanguage: ${row.language}`);
  }
  if (!isRunStatus(row.status)) {
    throw new Error(`Run status is not a RunStatus: ${row.status}`);
  }
  return {
    runId: createRunId(row.id),
    taskType: row.taskType,
    platform: row.platform,
    language: row.language,
    status: row.status,
    createdAt: row.createdAt,
  };
}
