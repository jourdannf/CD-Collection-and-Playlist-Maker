import pool from "@/lib/db";

export async function GET() {

    try {
        const res = await pool.query(`SELECT * FROM playlists`);

        return Response.json(res.rows, {status: 200});
    }catch (e) {
        console.log(e);
        throw e;
    }
    
}

/**REQUEST Body has the following format
 * {
 *  name: title of the playlist
 *  tracks[]: list of tracks you want to add to the playlist
 * }
 */

export async function POST(request) {
    try{
        const req = await request.json();

        if (typeof req.name != "string") {
            return Response.json("Invalid Data", {status: 400});
        }

        let result = [];

        const values = [request.name];
        const res = await pool.query(`
            INSERT INTO playlists (playlist_name) VALUES ($1);            
            `, values);

        let playlist_id = res.rows[0].playlist_id;

        for (let i = 0; i < req.tracks.length; i ++) {
            const r = await pool.query(`
                INSERT INTO playlist_tracks (playlist_id, track_id)
                VALUES($1, $2)
                `, [playlist_id, req.tracks[i]]);
            
            result = result.concat(r.rows);
        }

        return Response.json(res.rows, {status: 201});
    }catch (e) {
        console.log(e);
        throw e;
    }
}