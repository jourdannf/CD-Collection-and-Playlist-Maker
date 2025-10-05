import pool from "@/lib/db";

export async function GET(request, {params}) {
    const {album_id} = await params;
    let qSearch = `SELECT * FROM music_logs WHERE album_id = $1 `;
    const searchParams = request.nextUrl.searchParams;
    const offsetVal = Number(searchParams.get("limit")) * Number(searchParams.get("offset"));
    
    // if (searchParams.get("sort") === "ratings") {
    //     if (searchParams.get("order") == "ASC") {
    //         qSearch += "ORDER BY rating DESC, date_created ASC"
    //     }else if (searchParams.get("order" == "DESC")) {
    //         qSearch += "ORDER BY rating ASC, date_created ASC"
    //     }
        
    // }

    // if (searchParams.has("limit")) {
    //     let offsetVal = 0;

    //     if (searchParams.has("offset")){
    //         offsetVal = Number(searchParams.get("limit")) * Number(searchParams.get("offset"))
    //     }

    //     qSearch += `LIMIT ${searchParams.get("limit")} OFFSET ${String(offsetVal)}`
    // }

    const values = [album_id, searchParams.get("sort"), searchParams.get("order"), searchParams.get("limit"), offsetVal];

    qSearch = `
    SELECT log_id, body, rating, date_created, to_jsonb(alb) AS album 
    FROM music_logs m
    JOIN (SELECT
            album_id, title, album_art, artist_name, '/albums/' || album_id AS href
        FROM albums 
        JOIN artists ON artists.artist_id = albums.artist_id) AS alb ON alb.album_id = m.album_id
    WHERE m.album_id = $1
    ORDER BY
        CASE WHEN $2 = 'ratings' AND $3 = 'ASC' THEN rating END,
        CASE WHEN $2 = 'ratings' AND $3 = 'DESC' THEN rating END DESC,
        date_created
    LIMIT $4 OFFSET $5
    `;


    const res = await pool.query(qSearch, values);
    
    return Response.json(res.rows, {status: 200});
}

export async function POST(request, {params}) {
    const {album_id} = await params;

    const req = await request.json();
    const body = req.body;
    const rating = req.rating;

    const values = [album_id, body, rating];

    const res = await pool.query(`
        INSERT INTO music_logs (album_id, body, rating)
        VALUES ($1, $2, $3) 
        `, values);
    
    return Response.json(res.rows, {status: 201});
}