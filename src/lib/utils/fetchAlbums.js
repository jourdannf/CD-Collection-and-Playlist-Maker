import { getUserBySession } from "@/auth/core/session";

export default async function fetchAlbums (limit, offset, query) {
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