import { axiosInstance } from '@/config/service';
import { PaginationResponse } from '@/types/pagination';

export const getMovies = async (page: number, pageSize: number) => {
  return axiosInstance.get<PaginationResponse<Movie>>('/api/movies', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
    params: {
      page,
      pageSize,
    },
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
