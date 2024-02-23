import { useState } from 'react';
import { PaginationState, UsePaginationParams } from '@/types/pagination';
import { DEFAULT_SORT_BY, PAGE_SIZE } from '@/config/const';
import { useSearchParams } from 'next/navigation';
import { ALL_SORT_BY, SortBy } from '@/types/sort';

const usePagination = (init?: UsePaginationParams) => {
  const [enabled, setEnabled] = useState<boolean>(init?.enabled ?? true);

  const searchParams = useSearchParams();
  const paramPage = searchParams.get('page');
  const paramSortBy = searchParams.get('sortBy');

  const [pagination, setPagination] = useState<PaginationState>({
    page: paramPage ? parseInt(paramPage) : 1,
    pageSize: PAGE_SIZE,
    sortBy:
      typeof paramSortBy === 'string' &&
      ALL_SORT_BY.includes(paramSortBy as any)
        ? (paramSortBy as SortBy)
        : DEFAULT_SORT_BY,
    ...init,
  });

  return [pagination, setPagination, enabled, setEnabled] as const;
};

export default usePagination;
