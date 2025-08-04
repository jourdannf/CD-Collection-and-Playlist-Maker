import pool from "@/lib/db";

export async function GET(request, {params}) {
    const searchParams = request.nextUrl.searchParams;
    
    let qSearch = `SELECT
        music_logs.log_id,
        music_logs.album_id,
        albums.title,
        albums.release_date,
        albums.album_art,
        artists.artist_name,
        music_logs.body,
        music_logs.rating,
        music_logs.date_created

        FROM music_logs 
        JOIN albums ON music_logs.album_id = albums.album_id
        JOIN artists ON albums.artist_id = artists.artist_id `;
    
        const unique = searchParams.has("unique");

    if (unique) {
        qSearch = `SELECT
            logs.log_id,
            logs.album_id,
            albums.title,
            albums.release_date,
            albums.album_art,
            artists.artist_name,
            logs.body,
            logs.rating,
            logs.date_created
            
            FROM ( SELECT DISTINCT ON (album_id) * FROM music_logs 
            `;
    }
    
    
    if (searchParams.get("sort") === "ratings") {
        qSearch += "ORDER BY "
        if (unique) {
            qSearch += "album_id, "
        }

        if (searchParams.get("order") == "ASC") {
            qSearch += "rating, date_created "
            
        }else if (searchParams.get("order") == "DESC") {            
            qSearch += "rating DESC, date_created " 
            
        }
        
    }

    if (searchParams.has("limit")) {
        let offsetVal = 0;

        if (searchParams.has("offset")){
            offsetVal = Number(searchParams.get("limit")) * Number(searchParams.get("offset"))
        }

        qSearch += `LIMIT ${searchParams.get("limit")} OFFSET ${String(offsetVal)}`;
    }

    if (unique) {
        qSearch += `) logs
        JOIN albums ON logs.album_id = albums.album_id
        JOIN artists ON albums.artist_id = artists.artist_id `;
    }


    const res = await pool.query(qSearch);
    
    return Response.json(res.rows, {status: 200});
}