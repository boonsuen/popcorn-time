export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export enum SORT_FIELDS {
  POPULARITY = 'popularity',
  VOTE_AVERAGE = 'vote_average',
}

type SortFields = `${SORT_FIELDS}`;
type SortBy = `${SortFields}.${SortOrder}`;

export const sortOptions: {
  label: string;
  value: SortBy;
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
