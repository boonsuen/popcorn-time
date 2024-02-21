export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits`,
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
