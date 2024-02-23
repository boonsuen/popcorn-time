import { useDisclosure } from '@nextui-org/react';
import { MovieModal } from './MovieModal';
import clsx from 'clsx';
import { Movie } from '@/types/movie';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="p-4">
      <button
        key={movie.id}
        onClick={onOpen}
        className={clsx(
          'max-w-[250px] w-full mx-auto text-left flex flex-col',
          'hover:opacity-60 transition-opacity duration-500 ease-in-out'
        )}
      >
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-cover aspect-[2/3]"
          />
        ) : (
          <div className="w-full h-full bg-[#FE531D] aspect-[2/3] flex p-4 justify-end items-end">
            <p className="text-sm font-light text-white">NO IMAGE</p>
          </div>
        )}
        <h2 className="mt-2 font-medium uppercase text-base">{movie.title}</h2>
        <p className="mt-1 text-sm text-gray-600">{movie.release_date}</p>
      </button>
      <MovieModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        movieId={movie.id}
      />
    </div>
  );
};
