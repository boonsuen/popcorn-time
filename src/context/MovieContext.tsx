import { createContext, useContext } from 'react';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { getMovies } from '@/services/movies';
import { PaginationResponse, PaginationState } from '@/types/pagination';
import usePagination from '@/hooks/usePagination';
import { Movie } from '@/types/movie';

type MoviesContextType = {
  moviesQuery: UseQueryResult<PaginationResponse<Movie>, Error>;
  pagination: PaginationState;
};

const MoviesContext = createContext<MoviesContextType | null>(null);

export const useMovies = () => {
  const moviesContext = useContext(MoviesContext);

  if (!moviesContext) {
    throw new Error('useMovies has to be used within <MoviesContext.Provider>');
  }

  return moviesContext;
};

export const MoviesProvider = ({ children }: { children: React.ReactNode }) => {
  const [pagination, setPagination, enabled] = usePagination();

  const moviesQuery = useQuery({
    queryKey: ['movies', pagination],
    queryFn: async () => {
      const query = {
        page: pagination.page,
        pageSize: pagination.pageSize,
        sortBy: pagination.sortBy,
      };

      const res = await getMovies(query);
      return res.data;
    },
    enabled,
  });

  return (
    <MoviesContext.Provider
      value={{
        moviesQuery,
        pagination,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};
