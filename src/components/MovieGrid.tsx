'use client';

import { getMovies } from '@/services/movies';
import { useQuery } from '@tanstack/react-query';
import { MovieCard } from './MovieCard';

export const MovieGrid = () => {
  const moviesQuery = useQuery({
    queryKey: ['movies', { page: 1 }],
    queryFn: async () => {
      const res = await getMovies(1, 20);
      return res.data;
    },
  });

  return (
    <div className="layout-container relative">
      <div className="grid z-10 relative grid-cols-2 md:grid-cols-3 gap-y-[84px] py-[84px] content-start">
        {moviesQuery.data?.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <div className="layout-container absolute top-0 left-0 bottom-0 right-0">
        <div className="w-full h-full flex justify-between">
          <div className="bg-black opacity-15 h-full w-[0px]"></div>
          <div className="bg-black opacity-15 h-full w-[1px]"></div>
          <div className="bg-black opacity-15 h-full w-[1px]"></div>
          <div className="bg-black opacity-15 h-full w-[0px]"></div>
        </div>
      </div>
    </div>
  );
};
