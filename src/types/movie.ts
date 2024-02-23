import { PaginationParams } from './pagination';

export interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
  backdrop_path: string | null;
  genres: { id: number; name: string }[];
  runtime: number;
  overview: string;
  credits: {
    cast: { id: number; name: string; profile_path: string }[];
  };
  vote_average: number;
  budget: number;
  revenue: number;
}

export interface MovieQuery extends PaginationParams {}
