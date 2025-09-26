import { getUserBySession } from "@/auth/core/session";
import pool from "@/lib/db";
import { revalidateTag } from "next/cache";

export async function GET (request, {params}) {
    try {
        const {id} = await params;
        const result = await pool.query(`
            SELECT t.track_id, t.title, t.track_number, t.album_id, to_jsonb(alb) album FROM boombox b
                JOIN tracks t ON b.track_id = t.track_id
                JOIN (SELECT 
                    album_id, title, release_date, artist_id, '/albums/' || album_id AS href
                FROM albums) AS alb ON t.album_id = alb.album_id
                
            `); // add where based on user id
        return Response.json(result.rows, {status: 200});
    }catch (e) {
        await pool.query("ROLLBACK");
        throw e;
    }
}

export async function POST (request, {params}) {
// add track id to boombox    

    try {
        const {id} = await params;
        const req = await request.json();
        const track_id = req.track_id;

        const res = await pool.query(` 
            INSERT INTO boombox (track_id, user_id)
            VALUES ($1, $2)
        `, [track_id, id]);

        if (!res.rowCount) return Response.json("Unable to add track to boombox", {status: 500});
        return Response.json(res.rows, {status: 201});
    }catch (e) {
        throw e;
    }
}

export async function DELETE (request, {params}) { // add for deleting specific track id later

    try {
        const {user_id} = await getUserBySession();
        await pool.query(`DELETE FROM boombox WHERE user_id = $1`, [user_id]);
        return new Response(null, {status: 204});

    }catch (e) {
        throw e;
    }

}