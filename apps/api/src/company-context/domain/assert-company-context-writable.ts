import { DomainException } from '../../shared/exceptions/domain.exception';
import type {
  CompanyContext,
  CompanyContextWriteDetail,
} from './company-context.types';
import { collectGateItemPaths, isComplete } from './is-complete';

export function assertCompanyContextWritable(context: CompanyContext): void {
  const { complete, missing } = isComplete(context);
  if (complete) {
    return;
  }
  const details: CompanyContextWriteDetail[] = [
    ...missing.map((section) => ({ section })),
    ...collectGateItemPaths(context),
  ];
  throw new DomainException(
    'VALIDATION_FAILED',
    'Cannot persist incomplete company context',
    400,
    details,
  );
}
