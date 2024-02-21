'use client';

import { getMovies } from '@/services/getMovies';
import { useQuery } from '@tanstack/react-query';

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
      <div className="layout-container absolute w-full h-full top-0 left-0 bottom-0 right-0">
        <div
          style={{
            height: '100%',
            width: '100%',
            transformOrigin: 'left bottom',
            backgroundImage:
              'linear-gradient(90deg, rgb(0, 0, 0) 1px, transparent 1px)',
            backgroundSize: '33.31%',
            marginLeft: '-1px',
            opacity: 0.15,
            transform: 'none',
          }}
        ></div>
        <div className="layout-container top-0 bottom-0 left-0 right-0 w-full h-full absolute flex justify-between">
          <div
            style={{
              width: '10px',
              height: '100%',
              marginLeft: '-5px',
              background: 'white',
            }}
          ></div>
          <div
            style={{
              width: '10px',
              height: '100%',
              marginRight: '-5px',
              background: 'white',
            }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-[64px]">
        {moviesQuery.data?.results.map((movie) => (
          <div key={movie.id} className="max-w-[250px] p-4 mx-auto">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full object-cover rounded-md aspect-[2:3]"
            />
            <h2 className="mt-2 font-medium uppercase text-sm">
              {movie.title}
            </h2>
            <p className="mt-1 text-sm text-gray-600">{movie.release_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
