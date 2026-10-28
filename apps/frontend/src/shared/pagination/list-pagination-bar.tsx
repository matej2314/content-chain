'use client';

import { Button } from '@/shared/ui/button';
import { FormField } from '@/shared/ui/form-field';
import { NativeSelect } from '@/shared/ui/native-select';
import {
  PAGE_SIZES,
  isPageSize,
  type PageSize,
} from '@/shared/pagination/page-size';

const SELECT_LIST_CLASS = '[&_option]:bg-popover';

type ListPaginationBarProps = {
  readonly page: number;
  readonly pageSize: PageSize;
  readonly total: number;
  readonly totalPages: number;
  readonly disabled?: boolean;
  readonly onPageChange: (page: number) => void;
  readonly onPageSizeChange: (pageSize: PageSize) => void;
  readonly sizeSelectId: string;
};

export function ListPaginationBar({
  page,
  pageSize,
  total,
  totalPages,
  disabled = false,
  onPageChange,
  onPageSizeChange,
  sizeSelectId,
}: ListPaginationBarProps) {
  return (
    <div className="flex flex-wrap items-end gap-3 text-sm">
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={disabled || page <= 1}
          onClick={() => onPageChange(Math.max(1, page - 1))}
        >
          Poprzednia
        </Button>
        <p className="tabular-nums text-muted-foreground">
          {page} / {totalPages} ({total})
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={disabled || page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Następna
        </Button>
      </div>
      <FormField label="Na stronie" htmlFor={sizeSelectId} className="mb-0 min-w-28">
        <NativeSelect
          id={sizeSelectId}
          className={SELECT_LIST_CLASS}
          value={String(pageSize)}
          disabled={disabled}
          onChange={(event) => {
            const raw = Number(event.target.value);
            if (isPageSize(raw)) {
              onPageSizeChange(raw);
            }
          }}
        >
          {PAGE_SIZES.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </NativeSelect>
      </FormField>
    </div>
  );
}
