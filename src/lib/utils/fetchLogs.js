export async function fetchLogsByAlbum (album) {

    const {album_id} = album;
    const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/albums/${album_id}/logs`);
    return await result.json();
}