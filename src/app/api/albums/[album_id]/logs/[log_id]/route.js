import pool from "@/lib/db";

export async function DELETE(request, {params}) {
    const {album_id, log_id} = params;

    const res = await pool.query(`
        DELETE FROM music_logs WHERE album_id = $1 AND log_id = $2
        `, [album_id, log_id]);

    if (res.rowCount == 0) {
        return Response.json("Resource could not be deleted", {status: 400});
    }
    
    return Response.json(res.rows, {status: 204})
}