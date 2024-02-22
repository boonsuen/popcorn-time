import { useState } from 'react';
import {
  PaginationState,
  SortOrder,
  UsePaginationParams,
} from '@/types/pagination';

const usePagination = (init?: UsePaginationParams) => {
  const [enabled, setEnabled] = useState<boolean>(init?.enabled ?? true);

  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    pageSize: 10,
    total: 0,
    sortOrder: SortOrder.DESC,
    sortField: 'createdAt',
    ...init,
  });

  return [pagination, setPagination, enabled, setEnabled] as const;
};

export default usePagination;
