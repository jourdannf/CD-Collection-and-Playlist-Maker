export default async function fetchAlbums (limit, offset) {
    try {
        const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/albums?limit=${limit}&offset=${offset}`);
        const albums = await result.json();
        return albums
    }catch (e) {
        throw e;
    }
}