'use client';

import { useMovies } from '@/context/MovieContext';
import { Pagination as NextUIPagination } from '@nextui-org/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export const Pagination = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { moviesQuery, pagination } = useMovies();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', page.toString());
    }

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <div className="max-[600px]:min-h-[450px] flex justify-center items-center">
      {moviesQuery.data && (
        <NextUIPagination
          className="max-[600px]:rotate-90 max-[600px]:overflow-x-visible"
          classNames={{
            wrapper:
              '[&>span]:max-[600px]:[rotate:90deg] [&>span]:max-[600px]:[overflow-x:visible]',
            item: 'bg-white border-none rounded-full min-w-[36px] w-[unset] px-3 shadow-none max-[600px]:rotate-[-90deg] data-[active=true]:bg-white data-[active=true]:text-black data-[active=true]:border-solid data-[active=true]:border-[1px] data-[active=true]:border-black',
            cursor:
              'rounded-full bg-white text-black border border-black shadow-none min-w-[36px] w-[unset] px-3',
            next: 'bg-white border-none rounded-full shadow-none',
            prev: 'bg-white border-none rounded-full shadow-none',
          }}
          disableCursorAnimation
          showControls
          total={moviesQuery.data.total_pages}
          initialPage={pagination.page}
          onChange={handlePageChange}
        />
      )}
    </div>
  );
};
