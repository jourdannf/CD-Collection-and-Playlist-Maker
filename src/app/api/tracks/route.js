import pool from "@/lib/db";
//TODO: Make seed random on each login

export async function GET(request, {params}) {

    const searchParams = request.nextUrl.searchParams;
    let qSearch = `SELECT * FROM tracks `;
    const offsetVal = searchParams.get('limit') * searchParams.get('offset');

    const values = [searchParams.get("userId"), searchParams.get("search"), searchParams.get("limit"), offsetVal, searchParams.get("order")];

    //add check for the tracks that are in the user's database only
    qSearch = `
        SELECT 
            t.track_id, t.title, t.track_number, to_jsonb(alb) album, ar.artist_name
        FROM tracks t
            JOIN (SELECT 
                    album_id, title, release_date, artist_id, '/albums/' || album_id AS href
                FROM albums) AS alb ON t.album_id = alb.album_id
            JOIN artists ar ON alb.artist_id = ar.artist_id
        WHERE
            ($1::integer IS NULL OR t.track_id NOT IN (SELECT b.track_id FROM boombox b WHERE user_id = $1))
            AND ($2::text IS NULL OR t.title ILIKE $2 || '%' OR ar.artist_name ILIKE $2 || '%')
            AND ($1::integer IS NULL OR alb.album_id IN (SELECT alb_owned.album_id FROM user_albums alb_owned WHERE user_id = $1))
        ORDER BY 
            CASE 
                WHEN $5 = 'random' THEN RANDOM()::text
                WHEN $5 IS NULL THEN t.title    
            END
        LIMIT $3 OFFSET $4

    `;

    // if (searchParams.has('album-details')) {
    //     qSearch = `SELECT t.track_id, t.title, t.track_number, t.length, alb.title as album_title, ar.artist_name, alb.release_date FROM tracks t
    //         JOIN albums alb ON t.album_id = alb.album_id
    //         JOIN artists ar ON alb.artist_id = ar.artist_id `;
    // }

    // const filters = [];

    // if (searchParams.has("filter-boombox")) {
    //     filters.push(`t.track_id NOT IN (SELECT b.track_id FROM boombox b) `);
    // }

    // if (searchParams.has("search")) {
    //     const query = searchParams.get("search");
    //     if (query) {
    //         filters.push(`t.title ILIKE '${query}%' OR ar.artist_name ILIKE '${query}%' `);
    //     }
    // }

    // for (let i = 0; i < filters.length; i ++) {
    //     if (i == 0) {
    //         qSearch += `WHERE `;
    //     }

    //     qSearch += filters[i];

    //     if (i !== filters.length - 1) {
    //         qSearch += `AND `
    //     }
    // }
    
    // if (searchParams.get('order') === "random") {
    //     qSearch += `ORDER BY RANDOM() `
    // }

    // if (searchParams.has("limit")) {
    //     let offsetVal = 0;

    //     if (searchParams.has("offset")){
    //         offsetVal = Number(searchParams.get("limit")) * Number(searchParams.get("offset"))
    //     }

    //     qSearch += `LIMIT ${searchParams.get("limit")} OFFSET ${String(offsetVal)} `;
    // }

    try {
        await pool.query("BEGIN");
        await pool.query('SELECT setseed($1)', [0.5]);
        const res = await pool.query(qSearch, values);
        await pool.query("COMMIT");

        return Response.json(res.rows, {status: 200});
    }catch (e) {
        await pool.query("ROLLBACK")
        throw e;
    }

}