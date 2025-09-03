export async function fetchTracksFilter (query, limit, offset) {
    let fetchString = `${process.env.NEXT_PUBLIC_BASE_API_URL}/tracks?order=random&album-details&limit=${limit}&offset=${offset}&search=${query}&filter-boombox`;

    const result = await fetch(fetchString);
    const tracks = await result.json();
    return tracks;
}