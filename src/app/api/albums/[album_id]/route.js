import pool from "@/lib/db";

export async function GET(request, {params}) {
    const {album_id} = await params;

    try {
        const res = await pool.query(`
            SELECT 
                album_id, title, release_date, rating, album_art, artist_name, in_library, has_photobook, medium, plays
            FROM albums 
            JOIN artists ON albums.artist_id = artists.artist_id
            WHERE album_id = $1
            `, [album_id]);

        return Response.json(res.rows[0], {status: 200});
        
    } catch (e) {
        console.log(e);
        throw e;
    }

    
}

export async function DELETE(request, {params}) {
    const {album_id} = await params;

    const res = await pool.query(`DELETE FROM albums WHERE album_id = $1`, [album_id]);

    if (res.rowCount == 0) {
        return Response.json("Resource could not be deleted", {status: 400});
    }

    return Response.json(`Resource with album_id ${album_id} deleted from albums table`);
}

export async function PUT(request) {
    const {album_id} = await params;

}

