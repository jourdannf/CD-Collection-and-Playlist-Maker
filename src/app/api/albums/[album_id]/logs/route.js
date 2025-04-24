import pool from "@/lib/db";

export async function GET(request, {params}) {
    const {album_id} = params;

    const res = await pool.query(` 
        SELECT * FROM music_logs WHERE album_id = $1
        `, [album_id]);
    
    return Response.json(res.rows, {status: 200});
}

export async function POST(request, {params}) {
    const {album_id} = params;

    const req = await request.json();
    const body = req.body;
    const rating = req.rating;

    const values = [album_id, body, rating];

    const res = await pool.query(`
        INSERT INTO music_logs (album_id, body, rating)
        VALUES ($1, $2, $3) 
        `, values);
    
    return Response.json((await res.rows), {status: 201});
}