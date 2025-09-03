import pool from "@/lib/db";

export async function GET () {
    try {
        const result = await pool.query(`SELECT * FROM boombox`);
        return Response.json(result.rows, {status: 200});
    }catch (e) {
        await pool.query("ROLLBACK");
        throw e;
    }
}

export async function POST (request) {
// add track id to boombox    

    try {
        const req = await request.json();
        const track_id = req.track_id;

        const res = await pool.query(`
            INSERT INTO boombox (track_id)
            VALUES ($1)
        `, [track_id]);

        return Response.json(res.rows, {status: 201, statusText: "Track added to boombox"});
    }catch (e) {
        throw e;
    }
}