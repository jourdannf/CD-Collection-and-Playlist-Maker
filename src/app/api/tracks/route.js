import pool from "@/lib/db";

export async function GET(request, {params}) {

    const searchParams = request.nextUrl.searchParams;
    let qSearch = `SELECT * FROM tracks `;

    if (searchParams.has('artist')) {
        qSearch = `SELECT t.track_id, t.title, t.track_number, t.length, a.artist_name FROM tracks t
            JOIN albums b ON t.album_id = b.album_id
            JOIN artists a ON b.artist_id = a.artist_id `;
    }

    if (searchParams.get('order') === "random") {
        qSearch += `ORDER BY RANDOM()`
    }

    console.log(qSearch)

    try {
        const res = await pool.query(qSearch);

        return Response.json(res.rows, {status: 200});
    }catch (e) {
        console.log(e);
        throw e;
    }

}