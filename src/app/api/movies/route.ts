export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = searchParams.get('page');
  const pageSize = searchParams.get('pageSize');

  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    }
  );
  const data = await res.json();

  return Response.json(data);
}
