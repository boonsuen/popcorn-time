'use client';

import { useMovies } from '@/context/MovieContext';
import { MovieCard } from './MovieCard';

export const MovieGrid = () => {
  const { moviesQuery } = useMovies();

  const movies = moviesQuery.data;

  return (
    <div className="md:layout-container relative">
      <div className="grid relative grid-cols-2 md:grid-cols-3 gap-y-[84px] py-[84px] content-start">
        {movies?.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};
