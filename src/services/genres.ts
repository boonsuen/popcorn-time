import { axiosInstance } from '@/config/service';
import { Genre } from '@/types/genre';

export const getGenres = async () => {
  return axiosInstance.get<{
    genres: Genre[];
  }>('/api/genres');
};
