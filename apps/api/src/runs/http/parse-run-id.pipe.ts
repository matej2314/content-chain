import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { createRunId, isRunId } from '@content-chain/shared';

@Injectable()
export class ParseRunIdPipe implements PipeTransform<string> {
  transform(value: string) {
    if (!isRunId(value)) {
      throw new BadRequestException('Invalid runId');
    }
    return createRunId(value);
  }
}
