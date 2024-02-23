import dayjs from 'dayjs';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = searchParams.get('page');
  const pageSize = searchParams.get('pageSize');
  const sortBy = searchParams.get('sortBy');
  const genres = searchParams.get('genres');

  if (!page || !pageSize || !sortBy) {
    return new Response('Missing required parameters', {
      status: 400,
    });
  }

  // Calculate min_date and max_date
  // max_date will be the next Wednesday from today
  // min_date will be the date 6 weeks ago from max_date
  // e.g. If todat is 23 Feb Friday, then max_date will be 28 Feb Tuesday and min_date will be 17 Jan Tuesday
  const today = dayjs();
  const max_date = today.day(3).add(1, 'week').format('YYYY-MM-DD');
  const min_date = today.subtract(6, 'week').day(3).format('YYYY-MM-DD');

  // If page is 2 and pageSize is 30
  // Then, the startIndex will be 30 and endIndex will be 60
  // Thus, the tmdbPage to fetch will start from 2 and end at 3
  // (Fetch index 20 to 40 and 40 to 60 since we want 30 to 60)

  const startIndex = (parseInt(page) - 1) * parseInt(pageSize);

  const tmdbPage = Math.floor(startIndex / 20) + 1;

  const allResults = [];
  let totalResults;

  // Ensure does not exceed 500 pages
  for (let i = 0; i < Math.ceil(parseInt(pageSize) / 20); i++) {
    if (tmdbPage + i > 500) {
      break;
    }

    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&with_release_type=2|3&release_date.gte=${min_date}&release_date.lte=${max_date}&page=${
      tmdbPage + i
    }&sort_by=${sortBy}${genres ? `&with_genres=${genres}` : ''}`;

    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    });
    const result = await res.json();

    if (!totalResults) {
      totalResults = result.total_results;
    }

    allResults.push(...result.results);
  }

  const totalPages = Math.ceil(totalResults / parseInt(pageSize));

  const newData = {
    results: allResults.slice(
      startIndex % 20,
      (startIndex % 20) + parseInt(pageSize)
    ),
    total_results: totalResults,
    total_pages: totalPages,
    page: parseInt(page),
  };

  return new Response(JSON.stringify(newData), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
