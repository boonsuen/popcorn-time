import { Header } from '@/components/Header';
import { MovieGrid } from '@/components/MovieGrid';
import { getMovies } from '@/services/getMovies';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['movies', { page: 1 }],
    queryFn: () => getMovies(1, 20),
  });

  return (
    <main className="min-h-screen">
      <Header />
      <div className="relative">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <div className="md:my-20">
            <hr className="mx-auto border-t border-gray-800 opacity-15" />
            <button className="mb-10 block ml-auto mt-8 px-4 py-2 text-white bg-gray-800 rounded-md">
              Filter
            </button>
            <MovieGrid />
          </div>
        </HydrationBoundary>
      </div>
    </main>
  );
}
