import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import Image from 'next/image';
import { MovieModal } from './MovieModal';
import clsx from 'clsx';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <button
        key={movie.id}
        onClick={onOpen}
        className={clsx(
          'max-w-[250px] text-left p-4 mx-auto flex flex-col',
          'hover:opacity-60 transition-opacity duration-500 ease-in-out'
        )}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full object-cover aspect-[2:3]"
        />
        <h2 className="mt-2 font-medium uppercase text-base">{movie.title}</h2>
        <p className="mt-1 text-sm text-gray-600">{movie.release_date}</p>
      </button>
      <MovieModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        movieId={movie.id}
      />
    </>
  );
};