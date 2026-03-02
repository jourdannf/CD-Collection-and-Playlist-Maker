import pool from "@/lib/db";

export async function GET(request, {params}) {
    const searchParams = request.nextUrl.searchParams;

    const isUnique = searchParams.has("unique");
    const sortingBy = searchParams.get("sort") ?? "ASC";
    const order = searchParams.get("order");
    const limit = searchParams.get("limit");
    const offsetVal = limit * searchParams.get("offset");

    const values = [sortingBy, order, limit, offsetVal];

    // let fetchString = `
    //     SELECT
    //         music_logs.log_id,
    //         music_logs.album_id,
    //         albums.title,
    //         albums.release_date,
    //         albums.album_art,
    //         artist.artist_name,
    //         music_logs.body,
    //         music_logs.rating,
    //         music_logs.date_created
    //     FROM music_logs
    //     JOIN albums ON music_logs.album_id = albums.album_id
    //     JOIN artsits ON albums.artist_id = artists.artist_id
    // `;
    
    let qSearch = isUnique ? `
            SELECT 
                *, 
                albums.title,
                albums.release_date,
                albums.album_art,
                artists.artist_name 
            FROM (
                SELECT DISTINCT ON (album_id)
                    log_id,
                    album_id,
                    body,
                    rating,
                    date_created
                FROM music_logs

                ORDER BY album_id
            ) as music_logs

            JOIN albums ON music_logs.album_id = albums.album_id
            JOIN artists ON albums.aritst_id = artists.artist_id
            
        ` : 
        `
            SELECT
                music_logs.log_id,
                music_logs.album_id,
                albums.title,
                albums.release_date,
                albums.album_art,
                music_logs.body,
                music_logs.rating,
                music_logs.date_created,
                artists.artist_name
            FROM music_logs
            JOIN albums ON music_logs.album_id = albums.album_id
            JOIN artists ON albums.artist_id = artists.artist_id

        `
        ;

    qSearch += `
        ORDER BY
            CASE WHEN $2 = 'ASC' THEN 
                (CASE 
                    WHEN $1 = 'ratings' THEN music_logs.rating
                    WHEN $1 = 'createdate' THEN EXTRACT(EPOCH FROM date_created)
                END, date_created)
            END,
            CASE WHEN $2 = 'DESC' THEN
                CASE
                    WHEN $1 = 'createdate' THEN EXTRACT(EPOCH FROM date_created)
                    WHEN $1 = 'ratings' THEN music_logs.rating
                END
            END DESC,
            CASE WHEN $1 = 'ratings' AND $2='DESC' THEN date_created END

        LIMIT $3 OFFSET $4

    `

    const res = await pool.query(qSearch, values);
    
    return Response.json(res.rows, {status: 200});
}