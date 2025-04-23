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

export async function POST(request, {params}) {
    const {playlist_id} = [params];
    const req = await request.json();

    try {

        let result = [];

        for (let i = 0; i < req.tracks.length; i ++) {
            const res = await pool.query(`
                INSERT INTO playlist_tracks (playlist_id, track_id)
                VALUES($1, $2)
                `, [playlist_id, req.tracks[i]]);
            
            result.concat(res.rows);
        }
        

        return Response.json(result.rows, {status: 201})
    } catch (e) {
        console.log(e);
        throw e;
    }
}