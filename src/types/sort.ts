export enum SORT_OPTIONS {
  POPULARITY_DESC = 'popularity.desc',
  POPULARITY_ASC = 'popularity.asc',
  RATING_DESC = 'vote_average.desc',
  RATING_ASC = 'vote_average.asc',
}

type SortOptions = `${SORT_OPTIONS}`;

export const sortOptions: {
  label: string;
  value: SortOptions;
}[] = [
  {
    label: 'Popularity Descending',
    value: 'popularity.desc',
  },
  {
    label: 'Popularity Ascending',
    value: 'popularity.asc',
  },
  {
    label: 'Rating Descending',
    value: 'vote_average.desc',
  },
  {
    label: 'Rating Ascending',
    value: 'vote_average.asc',
  },
];
