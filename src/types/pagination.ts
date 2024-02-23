import { SORT_FIELDS, SortOrder } from './sort';

export interface PaginationParams {
  page: number;
  pageSize: number;
  sortBy: `${SORT_FIELDS}.${SortOrder}`;
}

export interface PaginationState extends PaginationParams {}

export interface PaginationResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export type UsePaginationParams = Partial<PaginationParams> & {
  enabled?: boolean;
};
