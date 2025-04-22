import pool from "@/lib/db";

export async function GET(request, {params}) {

    const {playlist_id} = params;

    try {
        const res = await pool.query(`
            SELECT * FROM tracks 
            WHERE track_id = (SELECT track_id FROM playlist_tracks WHERE playlist_id = $1)
            `, [playlist_id]);

        return Response.json(res.rows, {status: 200});
    } catch (e) {
        console.log(e);
        throw e;
    }
}

