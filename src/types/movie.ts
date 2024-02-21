interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  backdrop_path: string;
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
