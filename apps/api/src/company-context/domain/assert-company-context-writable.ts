import { DomainException } from '../../shared/exceptions/domain.exception';
import { assertAudienceProfileNamesUnique } from './assert-audience-profile-names-unique';
import { collectGateItemPaths, isComplete } from './is-complete';
import type {
  CompanyContext,
  CompanyContextWriteDetail,
} from './company-context.types';

export function assertCompanyContextWritable(context: CompanyContext): void {
  const { complete, missing } = isComplete(context);
  if (!complete) {
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
  assertAudienceProfileNamesUnique(context);
}
