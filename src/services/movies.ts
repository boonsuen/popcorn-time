import { axiosInstance } from '@/config/service';
import { Movie, MovieQuery } from '@/types/movie';
import { PaginationResponse } from '@/types/pagination';

export const getMovies = async (query: MovieQuery) => {
  return axiosInstance.get<PaginationResponse<Movie>>('/api/movies', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
    params: query,
  });
};

export const getMovieById = async (id: number) => {
  return axiosInstance.get<Movie>(`/api/movies/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  });
};
