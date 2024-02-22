import { createContext, useContext } from 'react';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { getMovies } from '@/services/movies';
import { PaginationResponse } from '@/types/pagination';

type MoviesContextType = {
  moviesQuery: UseQueryResult<PaginationResponse<Movie>, Error>;
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
  // const [selectedSort, setSelectedSort] = useState<Sorting>({});

  const moviesQuery = useQuery({
    queryKey: ['movies', { page: 1 }],
    queryFn: async () => {
      const res = await getMovies(1, 20);
      return res.data;
    },
  });

  return (
    <MoviesContext.Provider
      value={{
        moviesQuery,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};
