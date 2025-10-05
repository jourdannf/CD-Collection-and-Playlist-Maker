import { getUserBySession } from "@/auth/core/session";

export async function fetchAlbums (limit, offset, query) { // fetches all the albums for a user
    try {
        const user = await getUserBySession();

        const fetchString = `${process.env.NEXT_PUBLIC_BASE_API_URL}/albums?limit=${limit}&offset=${offset}&search=${query}&userId=${user.user_id}`;
        const response = await fetch(fetchString);
        if (!response.ok) throw new Error(await response.json())
        const albums = await response.json();
        return albums
    }catch (e) {
        throw e;
    }
}

export default async function fetchAlbum(album_id, cookies) { // fetches a singular album for a user
    try {
        const options = {...(cookies ? {headers: {"Cookie": cookies}} : {})}

        const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/albums/${album_id}`, options);

        const album = await result.json();

        return album;
    }catch (e) {
        console.log(e);
    }
}