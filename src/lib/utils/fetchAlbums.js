export default async function fetchAlbums (limit, offset, query) {
    try {
        const fetchString = `${process.env.NEXT_PUBLIC_BASE_API_URL}/albums?limit=${limit}&offset=${offset}&search=${query}`;
        const result = await fetch(fetchString);
        const albums = await result.json();
        return albums
    }catch (e) {
        throw e;
    }
}