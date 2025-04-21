import pool from "@/lib/db";

export async function GET(request, {params}) {

    const {album_id} = params;

    try {
        const res = await pool.query(`
            SELECT * FROM tracks WHERE album_id = $1
            `, [album_id]);

        return Response.json(res.rows, {status: 200});
    } catch (e) {
        console.log(e);
        throw e;
    }
}