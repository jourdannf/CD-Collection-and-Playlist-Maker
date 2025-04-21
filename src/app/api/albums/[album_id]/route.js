import pool from "@/lib/db";

export async function DELETE(request, {params}) {
    const {album_id} = await params;

    const res = await pool.query(`DELETE FROM albums WHERE album_id = $1`, [album_id]);

    console.log(res);

    if (res.rowCount == 0) {
        return Response.json("Resource could not be deleted", {status: 400});
    }

    return Response.json(`Resource with album_id ${album_id} deleted from albums table`);
}