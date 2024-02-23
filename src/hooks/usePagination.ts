import { useEffect, useState } from 'react';
import { PaginationState, UsePaginationParams } from '@/types/pagination';
import { DEFAULT_SORT_BY, PAGE_SIZE } from '@/config/const';
import { useSearchParams } from 'next/navigation';

const usePagination = (init?: UsePaginationParams) => {
  const [enabled, setEnabled] = useState<boolean>(init?.enabled ?? true);

  const searchParams = useSearchParams();
  const paramPage = searchParams.get('page');

  const [pagination, setPagination] = useState<PaginationState>({
    page: paramPage ? parseInt(paramPage) : 1,
    pageSize: PAGE_SIZE,
    sortBy: DEFAULT_SORT_BY,
    ...init,
  });

  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      page: paramPage ? parseInt(paramPage) : 1,
    }));
  }, [paramPage]);

  return [pagination, setPagination, enabled, setEnabled] as const;
};

export default usePagination;
