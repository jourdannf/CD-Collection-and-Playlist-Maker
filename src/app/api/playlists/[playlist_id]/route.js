import pool from "@/lib/db";

export async function DELETE(request, {params}) {
    const {playlist_id} = params;

    try {
        let values = [playlist_id]

        const res = await pool.query(`
                DELETE FROM playlists WHERE playlist_id = $1;
            `, values);

        if (res.rowCount == 0) {
            return Response.json('Resource does not exist', {status: 400})
        }

        pool.query(`DELETE FROM playlist_tracks WHERE playlist_id = $1`, values);

        return Response.json('Resource inserted into playlists', {status: 200})
    }catch (e) {
        console.log(e);
        throw e;
    }

}