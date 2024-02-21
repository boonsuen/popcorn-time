import {
  CircularProgress,
  Modal,
  ModalBody,
  ModalContent,
} from '@nextui-org/react';
import { getMovieById } from '@/services/movies';
import { useQuery } from '@tanstack/react-query';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

interface MovieModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  movieId: number;
}

export const MovieModal = ({
  isOpen,
  onOpenChange,
  movieId,
}: MovieModalProps) => {
  const movieDetailsQuery = useQuery({
    queryKey: ['movies', { movieId }],
    queryFn: async () => {
      const res = await getMovieById(movieId);
      return res.data;
    },
    enabled: isOpen,
  });

  const movie = movieDetailsQuery.data;

  return (
    <Modal
      data-lenis-prevent
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="full"
      classNames={{
        base: 'py-10 overflow-y-scroll',
        body: 'py-10 px-0 lg:px-10 max-w-[800px] mx-auto',
        closeButton: 'top-8 left-8 right-[unset]',
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody>
              {movieDetailsQuery.isLoading || !movie ? (
                <CircularProgress aria-label="Loading..." />
              ) : (
                <>
                  <img
                    src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
                    alt={movie?.title}
                    className="w-full object-cover aspect-video"
                  />
                  <div>
                    <h1 className="text-4xl uppercase font-medium mt-4 mb-4">
                      {movie.title}
                    </h1>
                    <div>
                      <div className="flex items-center gap-3">
                        <p className="my-3">{movie.release_date}</p>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {movie.genres.map((genre) => (
                          <div className="border py-1 px-3 rounded-full">
                            {genre.name}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-12">
                      <ul>
                        <li className="border-t border-[#C7C7C7] flex py-[10px]">
                          <h2 className="text-base text-[rgba(0,0,0,0.5)] flex-1">
                            Overview
                          </h2>
                          <div className="flex-1">{movie.overview}</div>
                        </li>
                        <li className="border-t border-[#C7C7C7] flex py-[10px]">
                          <h2 className="text-base text-[rgba(0,0,0,0.5)] flex-1">
                            Runtime
                          </h2>
                          <div className="flex-1">{movie.runtime} minutes</div>
                        </li>
                        <li className="border-t border-[#C7C7C7] flex py-[10px]">
                          <h2 className="text-base text-[rgba(0,0,0,0.5)] flex-1">
                            User Score
                          </h2>
                          <div className="flex-1">
                            <CircularProgress
                              size="lg"
                              value={movie.vote_average * 10}
                              color={
                                movie.vote_average > 7 ? 'success' : 'warning'
                              }
                              formatOptions={{
                                style: 'percent',
                                minimumFractionDigits: 0,
                              }}
                              showValueLabel={true}
                            />
                          </div>
                        </li>
                        <li className="border-t border-[#C7C7C7] flex py-[10px]">
                          <h2 className="text-base text-[rgba(0,0,0,0.5)] flex-1">
                            Budget
                          </h2>
                          <div className="flex-1">
                            {formatter.format(movie.budget)}
                          </div>
                        </li>
                        <li className="border-t border-[#C7C7C7] flex py-[10px]">
                          <h2 className="text-base text-[rgba(0,0,0,0.5)] flex-1">
                            Revenue
                          </h2>
                          <div className="flex-1">
                            {formatter.format(movie.revenue)}
                          </div>
                        </li>
                        <li className="border-t border-[#C7C7C7] flex py-[10px]">
                          <h2 className="text-base text-[rgba(0,0,0,0.5)] flex-1">
                            Cast
                          </h2>
                          <div className="flex-1">
                            {movie.credits.cast
                              .map((cast) => cast.name)
                              .join(', ')}
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </>
              )}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
