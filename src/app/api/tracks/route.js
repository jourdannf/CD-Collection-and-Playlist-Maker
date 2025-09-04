import pool from "@/lib/db";

export async function GET(request, {params}) {

    const searchParams = request.nextUrl.searchParams;
    let qSearch = `SELECT * FROM tracks `;

    if (searchParams.has('album-details')) {
        qSearch = `SELECT t.track_id, t.title, t.track_number, t.length, alb.title as album_title, ar.artist_name, alb.release_date FROM tracks t
            JOIN albums alb ON t.album_id = alb.album_id
            JOIN artists ar ON alb.artist_id = ar.artist_id `;
    }

    const filters = [];

    console.log(searchParams)

    if (searchParams.has("filter-boombox")) {
        filters.push(`t.track_id NOT IN (SELECT b.track_id FROM boombox b) `);
    }

    if (searchParams.has("search")) {
        const query = searchParams.get("search");
        if (query) {
            filters.push(`t.title ILIKE '${query}%' OR ar.artist_name ILIKE '${query}%' `);
        }
    }

    for (let i = 0; i < filters.length; i ++) {
        if (i == 0) {
            qSearch += `WHERE `;
        }

        qSearch += filters[i];

        if (i !== filters.length - 1) {
            qSearch += `AND `
        }
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
        await pool.query("BEGIN");
        await pool.query('SELECT setseed($1)', [0.5]);
        const res = await pool.query(qSearch);
        await pool.query("COMMIT");

        return Response.json(res.rows, {status: 200});
    }catch (e) {
        await pool.query("ROLLBACK")
        throw e;
    }

}