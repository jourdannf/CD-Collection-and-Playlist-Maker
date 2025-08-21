import pool from "@/lib/db";

export async function GET(request, {params}) {

    const searchParams = request.nextUrl.searchParams;
    let qSearch = `SELECT * FROM tracks `;


    if (searchParams.has('album-details')) {
        qSearch = `SELECT t.track_id, t.title, t.track_number, t.length, b.title as album_title, a.artist_name, b.release_date FROM tracks t
            JOIN albums b ON t.album_id = b.album_id
            JOIN artists a ON b.artist_id = a.artist_id `;
    }

    
    if (searchParams.get('order') === "random") {
        qSearch += `ORDER BY RANDOM() `
    }

    if (searchParams.has("limit")) {
        let offsetVal = 0;

        if (searchParams.has("offset")){
            offsetVal = Number(searchParams.get("limit")) * Number(searchParams.get("offset"))
        }

        qSearch += `LIMIT ${searchParams.get("limit")} OFFSET ${String(offsetVal)} `;
    }

    try {
        const res = await pool.query(qSearch);

        return Response.json(res.rows, {status: 200});
    }catch (e) {
        throw e;
    }

}