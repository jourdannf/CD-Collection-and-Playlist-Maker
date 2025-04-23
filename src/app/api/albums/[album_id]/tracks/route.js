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

export async function PUT(request) {
    const values = [request.track_id, request.title, request.album_id, request.track_number];
    
    try {
        const res = await pool.query(`
                update_album_tracks($1, $2, $3, $4)
            `, values);
 
        if (res.command = "UPDATE") {
            return Response.json(res.rows, {status: 204});
        }else if (res.command = "INSERT") {
            return Response.json('Resource added', {status: 201});
        }

        return Response.json('PUT unsuccessful', {status: 400})
    } catch (e) {
        console.log(e);
        throw e;
    }
} 