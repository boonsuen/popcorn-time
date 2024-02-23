export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export enum SORT_FIELDS {
  ORIGINAL_TITLE = 'title',
  POPULARITY = 'popularity',
  VOTE_AVERAGE = 'vote_average',
  RELEASE_DATE = 'primary_release_date',
}

export const ALL_SORT_BY = Object.values(SORT_FIELDS)
  .map((field) => {
    return Object.values(SortOrder).map(
      (order) => `${field}.${order}` as const
    );
  })
  .flat();

export type SortBy = (typeof ALL_SORT_BY)[number];

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
  {
    label: 'Title (A-Z)',
    value: 'title.asc',
  },
  {
    label: 'Title (Z-A)',
    value: 'title.desc',
  },
  {
    label: 'Release Date Descending',
    value: 'primary_release_date.desc',
  },
  {
    label: 'Release Date Ascending',
    value: 'primary_release_date.asc',
  },
];
