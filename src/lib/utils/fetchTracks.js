import { getUserBySession } from "@/auth/core/session";

export async function fetchTracksFilter (query, limit, offset, cookies, filterBoombox) {
    // const {user_id} = await getUserBySession();

    if (!query && !filterBoombox) {
        //call delete function

        const options = {
            method: "DELETE",
            ...(cookies ? {headers: {"Cookie": cookies}} : {})
        }
        await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/users/${17}/boombox`, options);
    }
    
    let fetchString = `${process.env.NEXT_PUBLIC_BASE_API_URL}/tracks?order=random&limit=${limit}&offset=${offset}&search=${query}&userId=${17}`;

    const result = cookies ? await fetch(fetchString, {headers: {"Cookie": cookies}, next: {tags: 'fetchTracks'}}) : await fetch(fetchString);
    const tracks = await result.json();
    return tracks;
}

export async function fetchBoomboxTracks () {
    // const {user_id} = await getUserBySession();
    // if (!user_id) return;
    const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/users/${17}/boombox`);
    const tracks = await result.json();
    return tracks;
}

export async function fetchTracks(album) {
    const {album_id} = album;

    const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/albums/${album_id}/tracks`)
    const tracks = await result.json();
    return tracks;
}