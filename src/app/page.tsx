import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { MovieGrid } from '@/components/MovieGrid';
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
    queryFn: () => getMovies(1, 20),
  });

  return (
    <main className="min-h-screen">
      <Header />
      <div className="relative">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <div className="md:mt-20">
            <hr className="mx-auto border-t border-gray-800 opacity-15" />
            <div className="layout-container">
              <button className="uppercase mb-10 block ml-auto mt-8 px-4 py-2 text-black border border-black rounded-full">
                Filter
              </button>
            </div>
            <MovieGrid />
          </div>
        </HydrationBoundary>
      </div>
      <Footer />
    </main>
  );
}
