export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export interface PaginationParams {
  page: number;
  pageSize: number;
  sortField: string;
  sortOrder: SortOrder;
}

export interface PaginationState extends PaginationParams {
  total: number;
}

export interface PaginationResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export type UsePaginationParams = Partial<PaginationParams> & {
  enabled?: boolean;
};
