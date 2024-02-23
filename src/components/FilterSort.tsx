'use client';

import { useMovies } from '@/context/MovieContext';
import { getGenres } from '@/services/genres';
import { SortBy, sortOptions } from '@/types/sort';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Slider,
  useDisclosure,
} from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export const FilterSort = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { pagination, genres, setGenres, rating, setRating } = useMovies();

  const [selectedSort, setSelectedSort] = useState<SortBy>(pagination.sortBy);
  const [selectedGenres, setSelectedGenres] = useState<number[]>(genres);
  const [selectedRating, setSelectedRating] = useState(rating);

  const handleSortChange = (sortBy: SortBy) => {
    setSelectedSort(sortBy);
  };

  const handleClear = () => {
    // Clear all filters
    setSelectedSort('popularity.desc');
    setSelectedGenres([]);
    setGenres([]);
    setSelectedRating([0, 10]);
    setRating([0, 10]);

    const params = new URLSearchParams(searchParams.toString());
    params.delete('sortBy');
    params.delete('genres');
    params.delete('page');
    params.delete('minRating');
    params.delete('maxRating');

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedSort !== 'popularity.desc') {
      params.set('sortBy', selectedSort);
    } else {
      params.delete('sortBy');
    }

    if (selectedGenres.length > 0) {
      params.set('genres', selectedGenres.join(','));
    } else {
      params.delete('genres');
    }

    if (selectedRating[0] !== 0 || selectedRating[1] !== 10) {
      params.set('minRating', selectedRating[0].toString());
      params.set('maxRating', selectedRating[1].toString());
    } else {
      params.delete('minRating');
      params.delete('maxRating');
    }

    // Reset page when filter changes
    params.delete('page');

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  const genreListQuery = useQuery({
    queryKey: ['genres'],
    queryFn: async () => {
      const res = await getGenres();
      return res.data;
    },
  });

  return (
    <>
      <button
        onClick={onOpen}
        className="cursor-pointer uppercase mr-4 mb-10 block ml-auto mt-8 px-4 py-2 text-black border border-black rounded-full"
      >
        Filter / Sort
      </button>
      <Modal
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: 'easeOut',
              },
            },
            exit: {
              y: 20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: 'easeIn',
              },
            },
          },
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        data-lenis-prevent
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="border-b font-medium flex flex-col gap-1">
                Filter / Sort
              </ModalHeader>
              <ModalBody>
                <div className="mt-4 mb-4">
                  <h3>Sort By</h3>
                  <Select
                    disallowEmptySelection
                    variant="underlined"
                    aria-label="Sort by"
                    classNames={{
                      trigger: 'pt-0',
                    }}
                    className="w-full"
                    selectedKeys={new Set([selectedSort])}
                    onSelectionChange={(key) => {
                      handleSortChange(Array.from(key)[0] as SortBy);
                    }}
                    listboxProps={{
                      // @ts-ignore
                      'data-lenis-prevent': 'true',
                    }}
                  >
                    {sortOptions.map((op) => (
                      <SelectItem key={op.value} value={op.value}>
                        {op.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>

                <div className="mb-4">
                  <h3 className="mb-2">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {genreListQuery.data?.genres.map((genre) => (
                      <button
                        className={clsx(
                          'text-black bg-white rounded-full text-sm px-3 py-1 border-solid border-black border',
                          'transition-colors duration-200 ease-in-out',
                          {
                            '!bg-black text-white': selectedGenres.includes(
                              genre.id
                            ),
                          }
                        )}
                        key={genre.id}
                        onClick={() => {
                          if (selectedGenres.includes(genre.id)) {
                            setSelectedGenres((prev) =>
                              prev.filter((id) => id !== genre.id)
                            );
                          } else {
                            setSelectedGenres((prev) => [...prev, genre.id]);
                          }
                        }}
                      >
                        {genre.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="mb-2">Rating</h3>
                  <div>
                    <Slider
                      showTooltip
                      showOutline
                      color="foreground"
                      startContent={<p className="text-sm">0</p>}
                      endContent={<p className="text-sm">10</p>}
                      aria-label="Rating"
                      step={1}
                      minValue={0}
                      maxValue={10}
                      value={selectedRating}
                      onChange={(value) => {
                        setSelectedRating(value as [number, number]);
                      }}
                      className="max-w-md"
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-between gap-4 p-4 border-t">
                <Button
                  className="rounded-full"
                  variant="light"
                  onPress={() => {
                    handleClear();
                    onClose();
                  }}
                >
                  Clear All
                </Button>
                <Button
                  className="text-white bg-black rounded-full"
                  onPress={() => {
                    handleSearch();
                    onClose();
                  }}
                >
                  Search
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
