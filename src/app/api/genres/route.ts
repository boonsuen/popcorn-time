export async function GET() {
  const res = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?language=en`,
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
