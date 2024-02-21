import { axiosInstance } from '@/config/service';
import { PaginationResponse } from '@/types/pagination';

export const getMovies = async (page: number, pageSize: number) => {
  return axiosInstance.get<PaginationResponse<Movie>>('/api/movies', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  });
};
