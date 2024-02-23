'use client';

import { useMovies } from '@/context/MovieContext';
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
  useDisclosure,
} from '@nextui-org/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';

export const FilterSort = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { pagination } = useMovies();

  const [selectedSort, setSelectedSort] = useState<SortBy>(pagination.sortBy);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleSortChange = (sortBy: SortBy) => {
    setSelectedSort(sortBy);
  };

  const handleClear = () => {
    router.push(pathname, {
      scroll: false,
    });
  };

  const handleSearch = () => {
    router.push(pathname + '?' + createQueryString('sortBy', selectedSort), {
      scroll: false,
    });
  };

  return (
    <>
      <button
        onClick={onOpen}
        className="cursor-pointer uppercase mr-4 mb-10 block ml-auto mt-8 px-4 py-2 text-black border border-black rounded-full"
      >
        Filter / Sort
      </button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} data-lenis-prevent>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="border-b font-medium flex flex-col gap-1">
                Filter / Sort
              </ModalHeader>
              <ModalBody>
                <Select
                  disallowEmptySelection
                  variant="underlined"
                  label="Sort By"
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
