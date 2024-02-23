export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = searchParams.get('page');
  const pageSize = searchParams.get('pageSize');

  if (!page || !pageSize) {
    return new Response('Missing page or pageSize query parameter', {
      status: 400,
    });
  }

  // TMDB API does not support custom page size, it always returns 20 items per page

  // For example, if page is 2 and pageSize is 30
  // Then, the startIndex will be 30 and endIndex will be 60
  // Thus, the tmdbPage to fetch will start from 2 and end at 3
  // (Fetch index 20 to 40 and 40 to 60 since we want 30 to 60)

  const startIndex = (parseInt(page) - 1) * parseInt(pageSize);

  const tmdbPage = Math.floor(startIndex / 20) + 1;

  const allResults = [];
  let totalResults;
  const totalPages = Math.ceil((500 * 20) / parseInt(pageSize));

  // Ensure does not exceed 500 pages
  for (let i = 0; i < Math.ceil(parseInt(pageSize) / 20); i++) {
    if (tmdbPage + i > 500) {
      break;
    }

    const url = `https://api.themoviedb.org/3/discover/movie?with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}&page=${
      tmdbPage + i
    }`;

    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    });
    const result = await res.json();

    if (!totalResults || !totalPages) {
      totalResults = result.total_results;
    }

    console.log('result', result);
    console.log('tmdbPage', tmdbPage + i);

    allResults.push(...result.results);
  }

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
