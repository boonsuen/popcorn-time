import { createContext, useContext, useEffect, useState } from 'react';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { getMovies } from '@/services/movies';
import { PaginationResponse, PaginationState } from '@/types/pagination';
import usePagination from '@/hooks/usePagination';
import { Movie } from '@/types/movie';
import { useSearchParams } from 'next/navigation';
import { ALL_SORT_BY, SortBy } from '@/types/sort';
import { DEFAULT_SORT_BY } from '@/config/const';

type MoviesContextType = {
  moviesQuery: UseQueryResult<PaginationResponse<Movie>, Error>;
  pagination: PaginationState;
  genres: number[];
  setGenres: React.Dispatch<React.SetStateAction<number[]>>;
  rating: [number, number];
  setRating: React.Dispatch<React.SetStateAction<[number, number]>>;
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
  const searchParams = useSearchParams();
  const paramPage = searchParams.get('page');
  const paramSortBy = searchParams.get('sortBy');
  const paramGenres = searchParams.get('genres');
  const paramMinRating = searchParams.get('minRating');
  const paramMaxRating = searchParams.get('maxRating');

  const [pagination, setPagination, enabled] = usePagination();
  const [genres, setGenres] = useState<number[]>(
    paramGenres ? paramGenres.split(',').map((genre) => parseInt(genre)) : []
  );
  const [rating, setRating] = useState<[number, number]>([
    paramMinRating ? parseInt(paramMinRating) : 0,
    paramMaxRating ? parseInt(paramMaxRating) : 10,
  ]);

  const moviesQuery = useQuery({
    queryKey: ['movies', pagination, genres, rating],
    queryFn: async () => {
      const query = {
        page: pagination.page,
        pageSize: pagination.pageSize,
        sortBy: pagination.sortBy,
        genres: genres.join(','),
        minRating: rating[0],
        maxRating: rating[1],
      };

      const res = await getMovies(query);
      return res.data;
    },
    enabled,
  });

  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      page: paramPage ? parseInt(paramPage) : 1,
      sortBy:
        typeof paramSortBy === 'string' &&
        ALL_SORT_BY.includes(paramSortBy as any)
          ? (paramSortBy as SortBy)
          : DEFAULT_SORT_BY,
    }));
  }, [paramPage, paramSortBy]);

  useEffect(() => {
    if (paramGenres) {
      setGenres(paramGenres.split(',').map((genre) => parseInt(genre)));
    }
  }, [paramGenres]);

  useEffect(() => {
    if (paramMinRating && paramMaxRating) {
      setRating([parseInt(paramMinRating), parseInt(paramMaxRating)]);
    }
  }, [paramMinRating, paramMaxRating]);

  return (
    <MoviesContext.Provider
      value={{
        moviesQuery,
        pagination,
        genres,
        setGenres,
        rating,
        setRating,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};
