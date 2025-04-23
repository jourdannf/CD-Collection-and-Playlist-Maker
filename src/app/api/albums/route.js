import pool from "@/lib/db";

export async function GET() {
    const res = await pool.query('SELECT * FROM albums');

    if (res.rows.length == 0) {
        return Response.json('', {status: 400});
    }

    return Response.json(res.rows, {status: 200});
}

export async function POST(request) {
    // If album is not already in the db, add it and return success
    // Otherwise if in the db, don't add it and return fail

    let res;

    try {
        const req = await request.json();
        const artist_id = await pool.query(`SELECT add_new_artist($1)`, [req.artist_name]);

        // Check that the release date is in correct format
        // Check that artist is a name that's actually registered in artist databased from rec software
        
        
        if (typeof req.has_photobook != "boolean" || typeof req.in_library != "boolean" ) {

            return Response.json("Data is invalid", {status: 400})
        }

        if (typeof req.medium != "string" || !(["CD", "VINYL"].includes(req.medium.toUpperCase()))) {
            return Response.json("Data is invalid", {status: 400});
        }

        const values = [req.title, req.release_date, req.rating, req.album_art, artist_id.rows[0].add_new_artist, req.in_library, req.has_photobook, req.medium];


        res = await pool.query(`
            SELECT insert_album_into_collection($1, $2, $3, $4, $5, $6, $7, $8);
            `
        , values);
    }catch (e) {
        console.log(e);
        throw e;
    }

    const id = res.rows[0].insert_album_into_collection;

    if (id == null) {
        return Response.json("Resource already exists", {status:400});
    }
    
    return Response.json(res.rows, {status: 201});
}

