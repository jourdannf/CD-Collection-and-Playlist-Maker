import { getUserBySession } from "@/auth/core/session";



export async function fetchTracksFilter (query, limit, offset) {
    const {user_id} = await getUserBySession();
    
    let fetchString = `${process.env.NEXT_PUBLIC_BASE_API_URL}/tracks?order=random&limit=${limit}&offset=${offset}&search=${query}&userId=${user_id}`;

    const result = await fetch(fetchString);
    const tracks = await result.json();
    return tracks;
}

export async function fetchBoomboxTracks () {
    const {user_id} = await getUserBySession();
    if (!user_id) return;
    const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/users/${user_id}/boombox`);
    const tracks = await result.json();
    return tracks;
}