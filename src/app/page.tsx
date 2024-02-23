import { FilterSort } from '@/components/FilterSort';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { MovieGrid } from '@/components/MovieGrid';
import { Pagination } from '@/components/Pagination';
import { getMovies } from '@/services/movies';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['movies', { page: 1 }],
    queryFn: () =>
      getMovies({
        page: 1,
        pageSize: 20,
        sortBy: 'popularity.desc',
      }),
  });

  return (
    <main className="min-h-screen">
      <Header />
      <div className="relative">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <div className="md:mt-20">
            <hr className="mx-auto border-t border-gray-800 opacity-15" />
            <div className="md:layout-container">
              <FilterSort />
              <div className="md:layout-container z-[-1] absolute top-0 left-0 bottom-0 right-0">
                <div className="w-full h-full flex justify-between">
                  <div className="bg-black opacity-15 h-full w-[0px]"></div>
                  <div className="bg-black opacity-15 h-full w-[1px]"></div>
                  <div className="hidden md:block bg-black opacity-15 h-full w-[1px]"></div>
                  <div className="bg-black opacity-15 h-full w-[0px]"></div>
                </div>
              </div>
            </div>
            <MovieGrid />
            <hr className="mx-auto border-t border-gray-800 opacity-15" />
            <div className="md:layout-container">
              <div className="w-full flex justify-center md:justify-end bg-white py-10 px-4 md:px-0">
                <Pagination />
              </div>
            </div>
          </div>
        </HydrationBoundary>
      </div>
      <Footer />
    </main>
  );
}
